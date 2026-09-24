-- Website enquiries. Public visitors can only INSERT; only the project owner (dashboard / service role) can read them.
create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254 and email like '%_@_%._%'),
  business text check (char_length(business) <= 160),
  service text check (char_length(service) <= 80),
  message text not null check (char_length(message) between 1 and 4000)
);

alter table public.enquiries enable row level security;

-- New tables are no longer exposed to the Data API by default, so grant explicitly.
-- Insert only: anon gets no select/update/delete.
grant insert on table public.enquiries to anon;

create policy "Visitors can send an enquiry"
  on public.enquiries for insert
  to anon
  with check (true);
