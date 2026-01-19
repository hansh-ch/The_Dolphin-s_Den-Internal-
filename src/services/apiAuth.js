import { supabase } from "./supabase";

export async function loginUser({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    throw new Error("Login failed");
  }
  return data;
}

export async function getCurrentUser() {
  // Checking if session is active from local storage
  let { data: activeSession } = await supabase.auth.getSession();
  if (!activeSession.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
    throw new Error("You are not logged in");
  }

  return data?.user;
}
