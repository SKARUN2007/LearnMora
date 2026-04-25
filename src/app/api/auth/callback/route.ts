import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )
    const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && user && !user.user_metadata?.initialized) {
      const headline = user.user_metadata?.full_name || "";
      let detectedTrack = "Elite Command";
      
      if (headline.toLowerCase().includes("engineer") || headline.toLowerCase().includes("tech")) {
        detectedTrack = "Technical Architecture";
      } else if (headline.toLowerCase().includes("manager") || headline.toLowerCase().includes("product")) {
        detectedTrack = "Strategy & Ops";
      }

      await supabase.auth.updateUser({
        data: { 
          initialized: true,
          track: detectedTrack,
          matrix_level: "Intermediate" 
        }
      });
    }
  }

  return NextResponse.redirect(`${origin}${next}`)
}
