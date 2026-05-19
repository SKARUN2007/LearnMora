-- ==============================================================================
-- LEARNMORA: PRODUCTION DATABASE SCHEMA (SUPABASE)
-- Execute this script in your Supabase SQL Editor before directing live traffic.
-- ==============================================================================

-- 1. Create Profiles Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create UserLibrary Table (For tracking Interested, In-Progress, Completed)
CREATE TABLE IF NOT EXISTS public.user_courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('interested', 'in-progress', 'completed')),
    added_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, course_id)
);

-- 3. Create Follows Table (For email capture and subject tracking)
CREATE TABLE IF NOT EXISTS public.follows (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(email, subject)
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile
CREATE POLICY "Users can view own profile" 
    ON public.profiles FOR SELECT 
    USING ( auth.uid() = id );

-- Profiles: Users can update their own profile
CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING ( auth.uid() = id );

-- UserCourses: Users can manage their own library
CREATE POLICY "Users can manage own course library" 
    ON public.user_courses FOR ALL 
    USING ( auth.uid() = user_id );

-- Follows: Anyone can insert (anonymous email capture), but only admins can read
CREATE POLICY "Anyone can insert follows" 
    ON public.follows FOR INSERT 
    WITH CHECK ( true );

-- ==============================================================================
-- 4. Create Courses Table (For 1M+ Course Database Migration)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    provider TEXT NOT NULL,
    rating NUMERIC NOT NULL,
    duration TEXT,
    price TEXT,
    roi TEXT,
    "isFree" BOOLEAN DEFAULT false,
    category TEXT NOT NULL,
    "subCategory" TEXT,
    "niche" TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add indexes to support millions of rows and fast filtering
CREATE INDEX IF NOT EXISTS courses_category_idx ON public.courses(category);
CREATE INDEX IF NOT EXISTS courses_subcategory_idx ON public.courses("subCategory");
CREATE INDEX IF NOT EXISTS courses_provider_idx ON public.courses(provider);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Courses: Anyone can read courses
CREATE POLICY "Anyone can read courses" 
    ON public.courses FOR SELECT 
    USING ( true );

-- Courses: Only authenticated admins can insert/update (requires custom claim or service role)
-- The seed script will use the service_role key to bypass RLS.

