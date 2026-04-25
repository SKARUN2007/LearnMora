import { NextResponse } from 'next/server';
import Fuse from 'fuse.js';
import { GENERATED_COURSES } from '@/lib/generatedCourses';
import { COURSES } from '@/lib/courses';

// De-duplicate by ID
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

  const results = fuse.search(query).map(result => result.item).slice(0, 6);

  return NextResponse.json({ results });
}
