import { useEffect, useState } from 'react';
import { db } from './firebaseConnection'; 
import { doc, getDoc, onSnapshot, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

export default function userSevice() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState(''); 
  const [endereco, setEndereco] = useState(''); 
  const [senha, setSenha] = useState(''); 
  const [fotoPerfil, setFotoPerfil] = useState(null); 

  const [usuario, setUsuario] = setState([]);

  useEffect(() => {

    async function getDados() {

      const usuarioRef = collection(db, "usuario");
      onSnapshot(usuarioRef, (snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            email: doc.data().email,
            cpf: doc.data().cpf,
            telefone: doc.data().telefone,
            endereco: doc.data().endereco,
            senha: doc.data().senha,
            fotoPerfil: doc.data().fotoPerfil
          })
        })

        setUsuario(lista);
      })      
      .catch((err) =>{
        console.log(err)
      })
    }

    getDados();
  }), []

  async function handleRegister(){
    await addDoc(collection(db, "usuario"), {
      nome: nome,
      email: email,
      cpf: cpf,
      telefone: telefone,
      endereco: endereco,
      senha: senha,
      fotoPerfil: fotoPerfil
    })
    .then(() => {
      console.log("CADASTRO COM SUCESSO")
      setNome("")
      setEmail("")
      setCpf("")
      setTelefone("")
      setEndereco("")
      setSenha("")
      setFotoPerfil(null)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function editUsuario(data){
    setNome(data.nome);
    setEmail(data.email);
    setCpf(data.cpf);
    setTelefone(data.telefone);
    setEndereco(data.endereco);
    setSenha(data.senha);
    setFotoPerfil(data.fotoPerfil);
  }


}
