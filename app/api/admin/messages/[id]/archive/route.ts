import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  // FIXED: params is a Promise in Next.js 15
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Manually create the Supabase client using the REQUEST'S cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            // Handled by middleware
          },
          remove(name: string, options: CookieOptions) {
            // Handled by middleware
          },
        },
      }
    );

    // 2. Immediate Manual User/Auth Check
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("DEBUG: Archive Auth Check Failed:", authError?.message);
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 401 }
      );
    }

    // 3. Await the dynamic route params (Next.js 15 fix)
    const { id } = await params;

    // 4. Get the message type from the body
    const body = await request.json();
    const { type } = body;

    if (!type || (type !== 'contact' && type !== 'demo')) {
      return NextResponse.json(
        { error: "Invalid message type. Expected 'contact' or 'demo'." },
        { status: 400 }
      );
    }

    const tableName = type === 'contact' ? 'contacts' : 'demo_requests';

    // 5. Update status to 'archived'
    const { error: updateError } = await supabase
      .from(tableName)
      .update({ status: 'archived' })
      .eq('id', id);

    if (updateError) {
      console.error(`Update Error (${tableName}):`, updateError.message);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Archived successfully" });

  } catch (err: any) {
    console.error("Archive API Error:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}