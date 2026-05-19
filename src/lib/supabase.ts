import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return { data, error };
}

export async function fetchUserLibrary(userId: string) {
  const { data, error } = await supabase
    .from("user_courses")
    .select("course_id, status")
    .eq("user_id", userId);
  
  if (error) return {};
  
  const library: { [id: string]: any } = {};
  data.forEach(item => {
    library[item.course_id] = item.status;
  });
  return library;
}

export async function syncCourseStatus(userId: string, courseId: string, status: string) {
  const { error } = await supabase
    .from("user_courses")
    .upsert({ user_id: userId, course_id: courseId, status });
  return { error };
}

// ============================================================================
// DATABASE MIGRATION: DATA FETCHING LAYER WITH FALLBACK
// ============================================================================
import { GENERATED_COURSES, ExtendedCourse } from "./generatedCourses";

// Utility to check if Supabase is actually configured
const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

export async function getCoursesBySubCategory(subCategory: string): Promise<ExtendedCourse[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("subCategory", subCategory);
        
      if (!error && data && data.length > 0) {
        return data as ExtendedCourse[];
      }
    } catch (e) {
      console.warn("Supabase fetch failed, falling back to static generated courses.", e);
    }
  }
  
  // Fallback to static data
  return GENERATED_COURSES.filter(c => c.subCategory === subCategory);
}

export async function searchCourses(query: string): Promise<ExtendedCourse[]> {
  if (isSupabaseConfigured) {
    try {
      // Postgres ILIKE search for title or provider
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .or(`title.ilike.%${query}%,provider.ilike.%${query}%`);
        
      if (!error && data) {
        return data as ExtendedCourse[];
      }
    } catch (e) {
      console.warn("Supabase search failed, falling back to static generated courses.", e);
    }
  }

  // Fallback to static array search
  const lowerQuery = query.toLowerCase();
  return GENERATED_COURSES.filter(c => 
    c.title.toLowerCase().includes(lowerQuery) || 
    c.provider.toLowerCase().includes(lowerQuery)
  );
}
