import { supabase } from './supabase';

export async function registerUser(userData) {
  const { email, senha, nome, cpf, telefone, endereco } = userData;

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
        throw new Error(authError.message);
      }
  
      return { success: true, user: authUser };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

export async function getUserData() {
    try {
      const { data, error } = await supabase.from('usuario').select('*').single();
      if (error) {
        throw new Error(error.message);
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  
export async function updateUserData(userId, data) {
    try {
      const { error } = await supabase
        .from('usuario')
        .update(data)
        .match({ id: userId });
  
      if (error) {
        throw new Error(error.message);
      }
  
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }