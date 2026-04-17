import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // 1. Manually create the client using the REQUEST'S cookies
    // This bypasses the utility file and potential Next.js 'headers' sync issues
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            // Options for set are handled by Next.js response if needed
          },
          remove(name: string, options: CookieOptions) {
            // Options for remove are handled by Next.js response if needed
          },
        },
      }
    );

    // 2. Immediate User Check
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("DEBUG: Manual Auth Check Failed:", authError?.message);
      return NextResponse.json(
        { error: "Unauthorized: Auth session missing!" },
        { status: 401 }
      );
    }

    // 3. Database Fetch
    // Fetching both tables in parallel for better performance
    const [contacts, demos] = await Promise.all([
      supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("demo_requests")
        .select("*")
        .order("created_at", { ascending: false })
    ]);

    // Check for database errors
    if (contacts.error) console.error("Contacts Fetch Error:", contacts.error);
    if (demos.error) console.error("Demos Fetch Error:", demos.error);

    // 4. Combine and Label Logic
    // We map the internal database results to match the 'Message' interface in your frontend
    const messages = [
      ...(contacts.data || []).map(m => ({ 
        ...m, 
        type: "contact", // Matches your frontend interface 'contact' | 'demo'
        status: m.status || "new" // Safety fallback for the charAt(0) logic
      })),
      ...(demos.data || []).map(m => ({ 
        ...m, 
        type: "demo", 
        status: m.status || "new" // Safety fallback
      }))
    ].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // 5. Return Response with cache busting
    return NextResponse.json(
      { messages },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0, must-revalidate',
        },
      }
    );

  } catch (err: any) {
    console.error("Internal API Error:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}