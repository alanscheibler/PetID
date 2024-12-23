import { supabase } from './supabase';

export async function registerVacina(vacinaData) {
  const { procedimento, nome_proc, data_realizacao, data_renovacao, id_pet } = vacinaData;

  try {
    const { data: vacina, error: vacinaError } = await supabase
      .from('vacina')
      .insert([
        {
          procedimento,
          nome_proc,
          data_realizacao,
          data_renovacao,
          id_pet,
        },
      ])
      .select()
      .single();

    if (vacinaError) {
      console.error('Erro ao inserir no banco:', vacinaError);
      throw vacinaError;
    }

    return { success: true, vacina };
  } catch (error) {
    console.error('Erro ao registrar a vacina:', error);
    return { success: false, error: error.message };
  }
}

export const getVacinaData = async (petId) => {
  try {
    const { data, error } = await supabase
      .from('vacina')
      .select('*')
      .eq('id_pet', petId);

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export async function updateVacinaData(id_vacina, updateData) {
  try {
    const { data, error } = await supabase
      .from('vacina')
      .update(updateData)
      .eq('id_vacina', id_vacina)
      .select();

    if (error) {
      console.error('Erro ao atualizar dados:', error.message);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Erro ao atualizar vacina:', error.message);
    return { success: false, error: error.message };
  }
}

export async function deleteVacinaData(id) {
  try {
    const { data, error } = await supabase.from('vacina').delete().eq('id_vacina', id);

    if (error) {
      console.error('Erro ao deletar vacina:', error.message);
      return { success: false, error };
    }

    console.log('Vacina deletada com sucesso:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Erro ao deletar vacina:', error.message);
    return { success: false, error: error.message };
  }
}
