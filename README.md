 PetID - Carteirinha de Vacinação Digital para Pets 🐾

## Descrição do Projeto
O **PetID** é uma aplicação mobile desenvolvida para facilitar a vida dos tutores de animais de estimação, centralizando todas as informações de vacinação dos pets em um único lugar. Através do aplicativo, os usuários podem acessar rapidamente o histórico de vacinas, obter a localização de clínicas veterinárias próximas e manter os cuidados com a saúde do seu pet sempre em dia.

## Objetivo
A proposta do PetID é oferecer uma solução prática e eficiente para o gerenciamento da saúde dos animais de estimação, substituindo as tradicionais carteirinhas de papel por uma versão digital acessível em qualquer lugar, a qualquer momento.

## Tecnologias Utilizadas
- **Frontend**: React Native (usando Expo)
- **Backend**: Supabase
- **Autenticação e Banco de Dados**: Gerenciados pelo Supabase

## Funcionalidades
- Registro e consulta de informações sobre os pets (nome, idade, raça, etc.).
- Histórico de vacinação digital.
- Upload de imagens do pet.
- Cadastro de múltiplos pets por usuário.
- Sincronização de dados em tempo real com o Supabase.

## Requisitos
- **Node.js** 16.x ou superior.
- **Expo CLI**: Para rodar o projeto localmente.
- Conta no **Supabase** para acesso ao backend.

## Como Rodar o Projeto

### 1. Clonar o Repositório
```bash
git clone https://github.com/alanscheibler/PetID
cd PetID
```
### 2. Instalar as dependências
```bash
npm install
```
### 3. Configurar as variáveis de ambiente
```bash
SUPABASE_URL=Sua_URL_do_Supabase
SUPABASE_KEY=Sua_Chave_de_API
```
### 4. Iniciar o projeto
```bash
npx expo start
```
Escaneie o QR code com o aplicativo Expo Go para rodar o projeto no seu dispositivo móvel ou use um emulador.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Desenvolvedores
A aplicação PetID foi idealizada e desenvolvida pelos acadêmicos Alan Scheibler, Bruno Pasquetti, Bruno Silveira, Pedro de Bortoli, Rhayra Fiorentin e Stefano Mossi.
