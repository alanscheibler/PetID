import { supabase } from './supabase';

export async function registerVacina(vacinaData) {
    console.log(vacinaData)
    const { procedimento, nome_proc, data_realizacao, data_renovacao} = vacinaData;
  
    try {
      const { data: user, error: authError } = await supabase.auth.getUser();
  
      if (authError) {
        console.error("Erro ao obter o usuário autenticado:", authError.message);
        return { success: false, error: 'Usuário não autenticado' };
      }
  
      console.log(user, "teste")
  
      if (!user) {
        return { success: false, error: 'Usuário não autenticado' };
      }
  
      console.log("Usuário autenticado:", user);
  
      const { data: vacina, error: vacinaError } = await supabase
        .from('vacina')
        .insert([
          {
            procedimento,
            nome_proc, 
            data_realizacao,
            data_renovacao,
            id_pet: user.user.id, 
          },
        ])
        .single();
  
      if (vacinaError) {
        console.error("Erro ao inserir no banco:", vacinaError);
        throw vacinaError;
      }
  
      console.log("vacina registrado com sucesso:", vacina);
      return { success: true, vacina };
  
    } catch (error) {
      console.error('Erro ao registrar o vacina: ', error);
      return { success: false, error: error.message };
    }
  };
  
  export async function getVacinaData(id) {
    try {
      const { data, error } = await supabase.from('vacina').select('*').eq("id_vacina", id).single();
      if (error) {
        throw new Error(error.message);
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  
  export async function updateVacinaData(id_vacina, updateData) {
    const { data, error } = await supabase
      .from("vacina")
      .update(updateData)
      .eq("id_vacina", id_vacina)
      .select();
  
    if (error) {
      console.log("Erro ao atualizar dados:", error.message);
      return { success: false, error };
    }
        
    console.log("Dados atualizados com sucesso:", data);
    return { success: true, data };
  }
  
  export async function deleteVacinaData(id) {
    const { data, error } = await supabase.from("vacina").delete().eq("id_vacina", id);
    
    return { data, error };
  }
