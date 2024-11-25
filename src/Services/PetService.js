import { supabase } from './supabase';

export async function registerPet(petData) {
  const { nome, especie, raca, dataNascimento, sexo, petCastrado, fotoPerfil } = petData;

  try {
    const { data: user, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error("Erro ao obter o usuário autenticado:", authError.message);
      return { success: false, error: 'Usuário não autenticado' };
    }

    if (!user) {
      return { success: false, error: 'Usuário não autenticado' };
    }

    const { data: pet, error: petError } = await supabase
      .from('pet')
      .insert([
        {
          nome,
          especie,
          raca,
          dataNascimento,
          sexo,
          petCastrado,
          fotoPerfil,
          id_usuario: user.user.id, 
        },
      ])
      .single();

    if (petError) {
      console.error("Erro ao inserir no banco:", petError);
      throw petError;
    }

    return { success: true, pet };

  } catch (error) {
    console.error('Erro ao registrar o pet: ', error);
    return { success: false, error: error.message };
  }
};

export async function getPetData(id) {
  try {
    const { data, error } = await supabase.from('pet').select('*').eq("id_pet", id).single();
    if (error) {
      throw new Error(error.message);
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function updatePetData(id_pet, updateData) {
  const { data, error } = await supabase
    .from("pet")
    .update(updateData)
    .eq("id_pet", id_pet)
    .select();

  if (error) {
    return { success: false, error };
  }  
  return { success: true, data };
}

export async function deletePetData(id) {
  const { data, error } = await supabase.from("pet").delete().eq("id_pet", id);

  return { data, error };
}

export async function uploadPhoto (uri, usuario) {
  const fileExt = uri.split('.').pop(); 
  const fileName = `${usuario.id_usuario}_foto.${fileExt}`; 

  const response = await fetch(uri);
  const blob = await response.blob(); 

  const { data, error } = await supabase.storage
    .from('petId') 
    .upload(fileName, blob, { contentType: `image/${fileExt}` });

  if (error) {
    console.error("Erro no upload:", error.message);
    return null;
  }

  const publicURL = supabase.storage
    .from('petId')
    .getPublicUrl(fileName).publicURL;

  return publicURL; 
};
export async function getPetsByUser() {
  try {
    const { data: user, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Erro ao obter o usuário autenticado:", authError?.message);
      return { success: false, error: 'Usuário não autenticado' };
    }

    const { data: pets, error } = await supabase
      .from('pet')
      .select('*')
      .eq('id_usuario', user.user.id);

    if (error) {
      console.error("Erro ao buscar pets:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: pets };
  } catch (error) {
    console.error("Erro ao buscar pets:", error.message);
    return { success: false, error: error.message };
  }
}
