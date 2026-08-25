-- Kiosist backend schema. Run this once in the Supabase SQL editor
-- (Project -> SQL Editor -> New query -> paste -> Run).

create extension if not exists pgcrypto;

-- Form submissions (contact + career applications).
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('contact', 'career')),
  name text not null,
  email text not null,
  phone text,
  company text,
  properties text,
  role text,
  experience text,
  message text,
  resume_path text,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);
create index if not exists inquiries_created_at_idx on inquiries (created_at desc);
create index if not exists inquiries_type_status_idx on inquiries (type, status);

-- Structured content collections (values, faqs, milestones, journey_years,
-- perks, clients, brand_logos, roles). One row per item; `data` mirrors the
-- shape of the matching content/*.ts TS type.
create table if not exists content_items (
  id uuid primary key default gen_random_uuid(),
  collection text not null,
  data jsonb not null,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);
create index if not exists content_items_collection_idx on content_items (collection, sort_order);

-- Freeform editable text (hero headlines/subheadings, nav CTA label, etc.),
-- keyed by a dotted slug like "home.hero.title".
create table if not exists content_text (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

-- Uploaded images. `slot_key` is set for a fixed one-image "slot" (logo,
-- hero, a team headshot); `collection` is set for a free add/remove/reorder
-- gallery (culture photos, brand logos). Exactly one of the two is set.
create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  slot_key text unique,
  collection text,
  url text not null,
  storage_path text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists media_collection_idx on media (collection, sort_order);

alter table inquiries enable row level security;
alter table content_items enable row level security;
alter table content_text enable row level security;
alter table media enable row level security;
-- No policies are added on purpose: this leaves every table default-deny for
-- the anon/authenticated roles. The Next.js app never uses the anon key- all
-- reads and writes go through the service-role key on the server, which
-- bypasses RLS entirely. If a client-side Supabase call is ever added later,
-- explicit read-only policies must be added here first.

-- Storage buckets: `media` (public, for site images) and `resumes` (private,
-- for career-application PDFs). Create these from the Supabase dashboard
-- (Storage -> New bucket) rather than SQL, since bucket creation there also
-- wires up the CDN correctly. Mark `media` "Public bucket" = on, `resumes`
-- "Public bucket" = off.
