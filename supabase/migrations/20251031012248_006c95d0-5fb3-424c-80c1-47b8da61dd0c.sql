-- Create profiles table for user data
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text NOT NULL,
  church_branch text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create prayer_requests table
CREATE TABLE public.prayer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

-- Policies for prayer_requests (users can view their own, admins can view all)
CREATE POLICY "Users can view own prayer requests"
  ON public.prayer_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own prayer requests"
  ON public.prayer_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create devotionals table
CREATE TABLE public.devotionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  whatsapp_link text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS - devotionals are public
ALTER TABLE public.devotionals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view devotionals"
  ON public.devotionals FOR SELECT
  USING (true);

-- Create media_links table
CREATE TABLE public.media_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  youtube_link text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS - media links are public
ALTER TABLE public.media_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view media links"
  ON public.media_links FOR SELECT
  USING (true);

-- Create about_content table
CREATE TABLE public.about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL UNIQUE,
  content text NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS - about content is public
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view about content"
  ON public.about_content FOR SELECT
  USING (true);

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, church_branch)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', ''),
    COALESCE(NEW.raw_user_meta_data->>'church_branch', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();