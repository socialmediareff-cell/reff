alter table public.profiles
  add column if not exists onboarding_completed boolean not null default false,
  add column if not exists location text check (char_length(location) <= 80),
  add column if not exists website text check (char_length(website) <= 200);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();
