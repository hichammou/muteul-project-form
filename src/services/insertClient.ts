import { supabase } from "./supabase";

export const insertClient = async (clientData: never[]) => {
  const { data, error } = await supabase
    .from("clients")
    .insert([clientData])
    .select();

  return { data, error };
};
