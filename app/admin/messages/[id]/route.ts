import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Manually create the Supabase client using the REQUEST'S cookies
    // This ensures the auth session is correctly identified from the incoming request
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            // Set logic is handled by the response middleware if necessary
          },
          remove(name: string, options: CookieOptions) {
            // Remove logic is handled by the response middleware if necessary
          },
        },
      }
    );

    // 2. Immediate User/Auth Check
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("DEBUG: Delete Auth Check Failed:", authError?.message);
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 401 }
      );
    }

    // 3. Await the dynamic route params (FIXED)
    const { id } = await params;

    // 4. Determine message type
    // We check URL search params first, then try the request body
    const { searchParams } = new URL(request.url);
    let type = searchParams.get('type');

    if (!type) {
      try {
        const body = await request.json();
        type = body.type;
      } catch (e) {
        // Fallback if body is empty or not JSON
      }
    }

    if (!type || (type !== 'contact' && type !== 'demo')) {
      return NextResponse.json(
        { error: "Invalid message type. Expected 'contact' or 'demo'." },
        { status: 400 }
      );
    }

    // 5. Database Delete Logic
    const tableName = type === 'contact' ? 'contacts' : 'demo_requests';

    const { error: deleteError } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error(`DB Error deleting from ${tableName}:`, deleteError.message);
      return NextResponse.json(
        { error: `Database error: ${deleteError.message}` },
        { status: 400 }
      );
    }

    // 6. Return success
    return NextResponse.json(
      { success: true, message: `Successfully deleted ${type} message.` },
      { status: 200 }
    );

  } catch (err: any) {
    console.error("Internal Delete API Error:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}