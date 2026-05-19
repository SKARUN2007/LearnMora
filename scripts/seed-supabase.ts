import { createClient } from '@supabase/supabase-js';
import { GENERATED_COURSES } from '../src/lib/generatedCourses';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // MUST use service role key to bypass RLS for insert

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase URL or Service Role Key in .env.local");
  console.error("Please add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedCourses() {
  console.log(`Starting migration of ${GENERATED_COURSES.length} courses to Supabase...`);

  // Batch insert into Supabase to avoid timeouts
  const BATCH_SIZE = 1000;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < GENERATED_COURSES.length; i += BATCH_SIZE) {
    const batch = GENERATED_COURSES.slice(i, i + BATCH_SIZE);
    
    // Format payload
    const payload = batch.map(course => ({
      id: course.id,
      title: course.title,
      provider: course.provider,
      rating: course.rating,
      duration: course.duration,
      price: course.price,
      roi: course.roi,
      isFree: course.isFree,
      category: course.category,
      subCategory: course.subCategory,
      niche: course.niche,
      description: course.description
    }));

    const { error } = await supabase
      .from('courses')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Error inserting batch ${i / BATCH_SIZE + 1}:`, error.message);
      errorCount += batch.length;
    } else {
      console.log(`✅ Inserted batch ${i / BATCH_SIZE + 1} (${batch.length} courses)`);
      successCount += batch.length;
    }
  }

  console.log('--- Migration Summary ---');
  console.log(`Total Courses: ${GENERATED_COURSES.length}`);
  console.log(`Successfully Migrated: ${successCount}`);
  console.log(`Failed: ${errorCount}`);
  console.log('-------------------------');
}

seedCourses();
