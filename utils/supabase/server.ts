// utils/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        /**
         * We explicitly type cookiesToSet to satisfy TypeScript's strict mode.
         * The structure matches the standard Cookie object from Supabase SSR.
         */
        setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // This error occurs if setAll is called from a Server Component.
            // In a Route Handler or Middleware, it should work fine.
          }
        },
      },
    }
  );
}