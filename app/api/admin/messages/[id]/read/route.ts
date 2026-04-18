import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  // The signature must match the internal RouteHandlerContext type exactly
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Manual Supabase client setup using request cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            // Placeholder for middleware handling
          },
          remove(name: string, options: CookieOptions) {
            // Placeholder for middleware handling
          },
        },
      }
    );

    // 2. Immediate Manual Auth Check
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 401 }
      );
    }

    // 3. Await the dynamic route params (Next.js 15 Requirement)
    const { id } = await params;

    // 4. Get type from body
    const body = await request.json();
    const { type } = body;

    if (!type || (type !== 'contact' && type !== 'demo')) {
      return NextResponse.json(
        { error: "Invalid type" },
        { status: 400 }
      );
    }

    const tableName = type === 'contact' ? 'contacts' : 'demo_requests';

    // 5. Update status to 'read'
    const { error: updateError } = await supabase
      .from(tableName)
      .update({ status: 'read' })
      .eq('id', id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Marked as read" 
    });

  } catch (err: any) {
    console.error("Internal Read API Error:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}