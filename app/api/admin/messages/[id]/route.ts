import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  // FIXED: The signature must define params as a Promise in Next.js 15
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {},
          remove(name: string, options: CookieOptions) {},
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 401 }
      );
    }

    // This part was already correct, but now it matches the signature above
    const { id } = await params;

    const { searchParams } = new URL(request.url);
    let type = searchParams.get('type');

    if (!type) {
      try {
        const body = await request.json();
        type = body.type;
      } catch (e) {}
    }

    if (!type || (type !== 'contact' && type !== 'demo')) {
      return NextResponse.json(
        { error: "Invalid message type. Expected 'contact' or 'demo'." },
        { status: 400 }
      );
    }

    const tableName = type === 'contact' ? 'contacts' : 'demo_requests';

    const { error: deleteError } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);

    if (deleteError) {
      return NextResponse.json(
        { error: `Database error: ${deleteError.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: `Successfully deleted ${type} message.` },
      { status: 200 }
    );

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}