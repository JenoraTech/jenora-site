import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  // FIXED: params must be defined as a Promise to satisfy Next.js 15 type checking
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Manual Supabase client setup using request cookies
    // This ensures the user's session is validated server-side
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            // Cookie setting is usually handled by middleware
          },
          remove(name: string, options: CookieOptions) {
            // Cookie removal is usually handled by middleware
          },
        },
      }
    );

    // 2. Immediate Auth Check
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" }, 
        { status: 401 }
      );
    }

    // 3. Await the dynamic route params (Next.js 15 fix)
    const { id } = await params;

    // 4. Get type from body and validate
    const body = await request.json();
    const { type } = body;

    if (!type || (type !== 'contact' && type !== 'demo')) {
      return NextResponse.json(
        { error: "Invalid type. Expected 'contact' or 'demo'." }, 
        { status: 400 }
      );
    }

    const tableName = type === 'contact' ? 'contacts' : 'demo_requests';

    // 5. Update status to 'responded'
    const { error: updateError } = await supabase
      .from(tableName)
      .update({ status: 'responded' })
      .eq('id', id);

    if (updateError) {
      console.error(`Update Error (${tableName}):`, updateError.message);
      return NextResponse.json(
        { error: updateError.message }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Status updated to responded" 
    });

  } catch (err: any) {
    console.error("Internal Responded API Error:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}