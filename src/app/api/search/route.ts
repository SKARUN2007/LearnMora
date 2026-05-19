import { NextResponse } from 'next/server';
import Fuse from 'fuse.js';
import { GENERATED_COURSES } from '@/lib/generated5000Courses';
import { COURSES } from '@/lib/courses';
import { searchCourses } from '@/lib/supabase';

// De-duplicate by ID for fallback local search
const allCoursesMap = new Map();
[...COURSES, ...GENERATED_COURSES].forEach(c => allCoursesMap.set(c.id, c));
const allCourses = Array.from(allCoursesMap.values());

const searchableCourses = allCourses.map(c => ({
  ...c,
  searchTags: `${c.isFree || c.price === 'FREE' ? 'Free Free Cert' : ''}`
}));

const fuse = new Fuse(searchableCourses, {
  keys: [
    "title",
    "provider",
    "university",
    "category",
    "niche",
    "careerPath",
    "searchTags"
  ],
  threshold: 0.4,
  ignoreLocation: true,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  // 1. Try Supabase Search First (for migrated db scale)
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");
  if (isSupabaseConfigured) {
    const dbResults = await searchCourses(query);
    if (dbResults && dbResults.length > 0) {
      return NextResponse.json({ results: dbResults.slice(0, 6) });
    }
  }

  // 2. Fallback to local Fuse.js search (before DB is seeded)
  const results = fuse.search(query).map(result => result.item).slice(0, 6);
  return NextResponse.json({ results });
}
