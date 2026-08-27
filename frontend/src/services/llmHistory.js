import { supabase } from "../lib/supabase";

// ==========================
// Save LLM / Economist Session
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

  const { data, error } = await supabase
    .from("llm_history")
    .insert({
      user_id: user.id,
      title,
      prompt,
      response,
      closure,
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving LLM history:", error);
    throw error;
  }

  return data;
}

// ==========================
// Get ONLY current user's
// LLM / Economist history
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
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Error loading LLM history:", error);
    throw error;
  }

  return data || [];
}

// ==========================
// Get one LLM session
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
    console.error(
      "Error loading LLM session:",
      error
    );

    throw error;
  }

  return data;
}

// ==========================
// Delete LLM session
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
    console.error(
      "Error deleting LLM session:",
      error
    );

    throw error;
  }
}