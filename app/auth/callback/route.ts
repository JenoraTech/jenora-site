import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

/**
 * This Route Handler is the "landing zone" for Supabase Auth events.
 * It exchanges the temporary 'code' for a permanent user session.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  
  // 'next' is the redirect path after successful login. 
  // We default to '/admin' since that is your dashboard.
  const next = searchParams.get('next') ?? '/admin';

  if (code) {
    const supabase = await createClient();
    
    // Safety check: if server client failed to initialize
    if (!supabase) {
      return NextResponse.redirect(`${origin}/login?error=Configuration Error`);
    }

    /**
     * exchangeCodeForSession: 
     * This is the magic line that takes the URL code and 
     * turns it into a set of browser cookies.
     */
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Logic to handle forwardedFrom param if you want to be extra precise
      const forwardedFrom = searchParams.get('forwardedFrom');
      if (forwardedFrom) {
        return NextResponse.redirect(`${origin}${forwardedFrom}`);
      }
      
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If no code is present or an error occurred, return user to login
  // with a generic error message.
  return NextResponse.redirect(`${origin}/login?error=Authentication Failed`);
}