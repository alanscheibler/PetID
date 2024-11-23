import { supabase } from './supabase';

export async function registerUser(userData) {
  const { email, senha, nome, cpf, telefone, endereco,  receberNotificacoes, aceitaTermos  } = userData;

  try {
    const { data: user, error: authError } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (authError) {
      return { success: false, message: authError.message };
    }

    const { error: dbError, data: userData } = await supabase
      .from('usuario')
      .insert([
        {
          nome,
          email,
          cpf,
          telefone,
          endereco,
          senha,
          id_usuario: user.user.id,
          receberNotificacoes,
          aceitaTermos
        },
      ])
      .select();

    if (dbError) {
      throw dbError;
    }

    return { success: true, message: "Cadastro realizado com sucesso!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function loginUser(email, senha) {
    try {
      const { data: authUser, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });
  
      if (authError) {
        return { success: false, message: "E-mail ou senha incorretos. Verifique e tente novamente." };
      }
  
      const { data: userData, error: userError } = await supabase
        .from('usuario')
        .select('*')
        .eq("id_usuario", authUser.user.id)
        .single();
        
      if (userError) {
        throw new Error(userError.message || "Erro ao buscar dados do usuário.");
      }
  
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, message: userError.message };
    }
  }

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

export async function updateUserData(id_usuario, updateData) {
  const { data, error } = await supabase
    .from("usuario")
    .update(updateData)
    .eq("id_usuario", id_usuario)
    .select();

  if (error) {
    console.log("Erro ao atualizar dados:", error.message);
    return { success: false, error };
   }
      
  console.log("Dados atualizados com sucesso:", data);
  return { success: true, data };
}

export async function uploadPhoto (uri, usuario) {
  const fileExt = uri.split('.').pop(); 
  const fileName = `${usuario.id_usuario}_foto.${fileExt}`; 

  console.log(fileExt, fileName, uri)

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
