-- Toronto Fire Crew — Supabase Schema
-- Run this in your Supabase SQL editor

-- Announcements (admin only)
create table tfc_announcements (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  body text not null,
  pinned boolean default false,
  created_at timestamp with time zone default now()
);

-- Forum posts
create table tfc_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null default 'General',
  body text not null,
  author_id uuid references auth.users(id),
  author_name text,
  created_at timestamp with time zone default now()
);

-- Shift swap board
create table tfc_shifts (
  id uuid default gen_random_uuid() primary key,
  shift_date date not null,
  platoon text not null,
  station text not null,
  notes text,
  posted_by_id uuid references auth.users(id),
  posted_by_name text,
  status text default 'open',
  claimed_by_id uuid references auth.users(id),
  claimed_by_name text,
  created_at timestamp with time zone default now()
);

-- Access requests
create table tfc_access_requests (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  badge text not null,
  station text not null,
  notes text,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

-- RLS: members can read everything, only authenticated users can insert
alter table tfc_announcements enable row level security;
alter table tfc_posts enable row level security;
alter table tfc_shifts enable row level security;
alter table tfc_access_requests enable row level security;

create policy "Members can read announcements" on tfc_announcements for select to authenticated using (true);
create policy "Members can read posts" on tfc_posts for select to authenticated using (true);
create policy "Members can insert posts" on tfc_posts for insert to authenticated with check (true);
create policy "Members can read shifts" on tfc_shifts for select to authenticated using (true);
create policy "Members can insert shifts" on tfc_shifts for insert to authenticated with check (true);
create policy "Members can update shifts" on tfc_shifts for update to authenticated using (true);
create policy "Anyone can insert access request" on tfc_access_requests for insert with check (true);
create policy "Admin can read access requests" on tfc_access_requests for select to authenticated using (true);
