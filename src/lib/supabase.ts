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
