import { supabase } from "../lib/supabase";

// ==========================
// Save AI Policy Session
// ==========================
export async function saveLLMSession({
  title,
  prompt,
  closure,
  response,

}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { error } = await supabase
    .from("llm_history")
    .insert({
      user_id: user.id,
      title,
      prompt,
      response,
      closure,
    });

  if (error) {
    console.error(error);
    throw error;
  }
}

// ==========================
// Get User Sessions
// ==========================
export async function getLLMHistory() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("llm_history")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

// ==========================
// Get One Session
// ==========================
export async function getLLMSessionById(id) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("llm_history")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ==========================
// Delete Session
// ==========================
export async function deleteLLMSession(id) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { error } = await supabase
    .from("llm_history")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }
}