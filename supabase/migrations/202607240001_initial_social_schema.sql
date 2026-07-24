create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (char_length(username) between 3 and 24),
  display_name text check (char_length(display_name) <= 60),
  bio text check (char_length(bio) <= 500),
  pronouns text check (char_length(pronouns) <= 40),
  avatar_url text,
  banner_url text,
  theme_color text not null default '#8b5cf6',
  interests text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 5000),
  visibility text not null default 'public' check (visibility in ('public','followers','private')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_author_created_idx on public.posts(author_id, created_at desc);
create index if not exists posts_created_idx on public.posts(created_at desc);

alter table public.profiles enable row level security;
alter table public.posts enable row level security;

create policy "profiles_are_public" on public.profiles for select using (true);
create policy "users_insert_own_profile" on public.profiles for insert with check (auth.uid() = id);
create policy "users_update_own_profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "public_posts_are_readable" on public.posts for select using (visibility = 'public' or auth.uid() = author_id);
create policy "users_create_own_posts" on public.posts for insert with check (auth.uid() = author_id);
create policy "users_update_own_posts" on public.posts for update using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "users_delete_own_posts" on public.posts for delete using (auth.uid() = author_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', 'user_' || substr(new.id::text, 1, 8)),
    coalesce(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'username')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();
