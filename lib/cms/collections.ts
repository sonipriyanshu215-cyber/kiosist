import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { clients as DEFAULT_CLIENTS, type Client } from "@/content/clients";
import { faqs as DEFAULT_FAQS, type FAQ } from "@/content/faqs";
import { milestones as DEFAULT_MILESTONES, journeyYears as DEFAULT_JOURNEY_YEARS, type Milestone } from "@/content/milestones";
import { perks as DEFAULT_PERKS, type Perk } from "@/content/perks";
import { roleOptions as DEFAULT_ROLE_OPTIONS } from "@/content/roles";
import { values as DEFAULT_VALUES, type Value } from "@/content/values";
import { team as DEFAULT_TEAM } from "@/content/team";

export type JourneyYear = { year: string; caption: string; body: string };
export type TeamMember = { name: string; img?: string; tag: string; pos?: string };

export type CollectionName =
  | "values"
  | "faqs"
  | "milestones"
  | "journey_years"
  | "perks"
  | "clients"
  | "team"
  | "roles";

// Generic reader shared by every typed getter below and by the admin CRUD
// routes. Falls back to the matching content/*.ts default whenever Supabase
// is unreachable or the collection hasn't been seeded yet, so the public
// site never breaks on a backend outage/misconfiguration.
export async function getCollection<T>(collection: CollectionName, fallback: T[]): Promise<T[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("content_items")
    .select("data")
    .eq("collection", collection)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallback;
  return data.map((row) => row.data as T);
}

export const getValues = () => getCollection<Value>("values", DEFAULT_VALUES);
export const getFaqs = () => getCollection<FAQ>("faqs", DEFAULT_FAQS);
export const getMilestones = () => getCollection<Milestone>("milestones", DEFAULT_MILESTONES);
export const getJourneyYears = () => getCollection<JourneyYear>("journey_years", DEFAULT_JOURNEY_YEARS);
export const getPerks = () => getCollection<Perk>("perks", DEFAULT_PERKS);
export const getClients = () => getCollection<Client>("clients", DEFAULT_CLIENTS);
export const getTeam = () => getCollection<TeamMember>("team", DEFAULT_TEAM);
export const getRoleOptions = () => getCollection<string>("roles", DEFAULT_ROLE_OPTIONS);
