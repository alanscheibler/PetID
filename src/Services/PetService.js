import { supabase } from './supabase';

export const registerPet = async (petData) => {
  try {
    const { data: user, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error("Erro ao obter o usuário autenticado:", authError.message);
      return { success: false, error: 'Usuário não autenticado' };
    }

    if (!user) {
      return { success: false, error: 'Usuário não autenticado' };
    }

    console.log("Usuário autenticado:", user);

    const { nome, especie, raca, dataNascimento, sexo, petCastrado, fotoPerfil } = petData;

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
          id_usuario: user.id, 
        },
      ])
      .single();

    if (petError) {
      console.error("Erro ao inserir no banco:", petError);
      throw petError;
    }

    console.log("Pet registrado com sucesso:", pet);
    return { success: true, pet };

  } catch (error) {
    console.error('Erro ao registrar o pet: ', error);
    return { success: false, error: error.message };
  }
};
