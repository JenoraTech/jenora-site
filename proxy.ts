import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // --- DIAGNOSTIC LOGS START ---
  const { pathname } = request.nextUrl;
  const allCookies = request.cookies.getAll();
  
  if (pathname.startsWith("/api/admin")) {
    console.log("--- PROXY DEBUG START ---");
    console.log("Path:", pathname);
    console.log("Cookies Present:", allCookies.map(c => c.name));
    // Check for the specific Supabase auth cookie (usually starts with 'sb-')
    const authCookie = allCookies.find(c => c.name.includes("-auth-token"));
    console.log("Auth Cookie Found:", !!authCookie);
  }
  // --- DIAGNOSTIC LOGS END ---

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  const sessionUser = user;

  if (pathname.startsWith("/api/admin") && !sessionUser) {
    console.error("PROXY AUTH FAILURE:", authError?.message || "No user found");
    console.log("--- PROXY DEBUG END ---");
  }

  const isProtectedApi = pathname.startsWith("/api/admin");
  const isProtectedUi = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/login";
  const isAuthCallback = pathname.startsWith("/auth");

  if (!sessionUser && isProtectedUi) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("forwardedFrom", pathname);
    return NextResponse.redirect(url);
  }

  if (!sessionUser && isProtectedApi) {
    return NextResponse.json(
      { error: "Auth session missing or invalid!" },
      { status: 401 }
    );
  }

  if (isLoginPage || isAuthCallback) {
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};