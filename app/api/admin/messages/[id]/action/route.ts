import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// Define the correct shape based on your folder structure [id]/action
type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // 1. Await the params (Required in newer Next.js versions)
    const { id } = await context.params;

    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database Connection Error" }, { status: 500 });
    }

    // 2. Verify Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3. Parse the body (e.g., updating a status or marking as read)
    const body = await request.json();
    
    /**
     * Example logic: Update the contact or demo request.
     * Since this is a generic 'action' route, we assume 'id' 
     * refers to the message ID you're targeting.
     */
    const { error: updateError } = await supabase
      .from("contacts") // or your relevant table
      .update({ ...body })
      .eq("id", id);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("Action Error:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}