import { supabase } from "./supabase";

export async function getSettings() {
  let { data, error } = await supabase.from("settings").select("*").single();
  if (error) {
    throw new Error("Cannot fetch settings");
  }

  return data;
}

export async function updateSettings(body) {
  const { data, error } = await supabase
    .from("settings")
    .update(body)
    .eq("id", 1) // update only one row as there is one row only
    .select()
    .single();
  if (error) {
    throw new Error("Cannot update settings");
  }
  return data;
}
