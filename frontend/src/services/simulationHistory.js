import { supabase } from "../lib/supabase";

export async function saveSimulation({
  mode,
  policyName,
  results,
  inputs,
}) {
  // Get logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { error } = await supabase
    .from("simulation_history")
    .insert({
      user_id: user.id,
      mode: mode,
      policy_name: policyName,
      gdp: results.policy.GDP,
      inflation: results.policy.inflation,
      unemployment: results.policy.unemployment,
      inputs: inputs,
    });

  if (error) {
    console.error(error);
    throw error;
  }
}

export async function getSimulationHistory(mode) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("simulation_history")
    .select("*")
    .eq("user_id", user.id)
    .eq("mode", mode)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}


export async function getSimulationById(id) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("simulation_history")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
export async function deleteSimulation(id) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { error } = await supabase
    .from("simulation_history")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }
}