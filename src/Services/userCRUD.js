import { supabase } from './supabase';

export async function getUserData(id) {
    try {
      const { data, error } = await supabase.from('usuario').select('*').eq("id_usuario", id).single();
      if (error) {
        throw new Error(error.message);
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
export async function updateBrand(id, updateData) {
    const { data, error } = await supabase
      .from("usuario")
      .update(updateData)
      .eq("id_usuario", id)
      .select();
  
    return { data, error };
}
