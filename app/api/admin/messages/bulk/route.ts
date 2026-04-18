import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    // 1. Initialize the client (ensure it is NOT a naked promise)
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

    // 2. Auth Check - supabase is now the client, so .auth will exist
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3. Get the IDs from the request body
    const { contacts, demoRequests } = await request.json();

    // 4. Perform Bulk Deletes
    if (contacts && contacts.length > 0) {
      await supabase.from('contacts').delete().in('id', contacts);
    }

    if (demoRequests && demoRequests.length > 0) {
      await supabase.from('demo_requests').delete().in('id', demoRequests);
    }

    return NextResponse.json({ success: true, message: "Messages deleted successfully" });

  } catch (err: any) {
    console.error("Bulk Delete API Error:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}