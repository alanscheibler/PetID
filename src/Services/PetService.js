import { supabase } from './supabase';

export async function registerPet(petData) {
  const { nome, especie, raca, dataNascimento, sexo, petCastrado } = petData;
  
  try {

    const user = supabase.auth.user();

    if (!user) {
      return { success: false, message: "Usuário não autenticado." };
    }

    const { error: dbError, data: petData } = await supabase
      .from('pets')
      .insert([
        {
          nome,
          especie,
          raca,
          dataNascimento,
          sexo,
          petCastrado,
          id_usuario: user.id,  // será que utiliza o id_usuario ou id_pet?
        },
      ])
      .select();  

    if (dbError) {
      return { success: false, message: dbError.message };
    }

    return { success: true, message: "Pet registrado com sucesso!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
