import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import colors from '../styles/colors';

const TermsOfUse = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          Bem-vindo ao nosso aplicativo! Ao utilizá-lo, você concorda com os seguintes termos:
        </Text>
        <Text style={styles.sectionTitle}>1. Uso Geral</Text>
        <Text style={styles.text}>
          O aplicativo foi desenvolvido para facilitar o dia a dia do tutor, tendo na palma da mão as informações relacionadas à saúde do seu pet. Ao utilizá-lo, você
          concorda em não explorar vulnerabilidades ou usá-lo de forma que possa causar danos a
          outros usuários ou ao sistema.
        </Text>
        <Text style={styles.sectionTitle}>2. Dados do Usuário</Text>
        <Text style={styles.text}>
          Todos os dados fornecidos pelos usuários são tratados com segurança e utilizados
          exclusivamente para melhorar a experiência no aplicativo, conforme descrito na nossa
          política de privacidade.
        </Text>
        <Text style={styles.sectionTitle}>3. Alterações nos Termos</Text>
        <Text style={styles.text}>
          Reservamos o direito de alterar estes Termos de Uso a qualquer momento. Recomendamos
          revisar esta página periodicamente.
        </Text>
        <Text style={styles.sectionTitle}>4. Contato</Text>
        <Text style={styles.text}>
          Em caso de dúvidas, entre em contato pelo e-mail: 1135147@atitus.com.br com o assunto SUPORTE PEDIT.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colors.background,
    padding: 20,

  },
  scrollView: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: colors.colors.text,
    lineHeight: 20,
    marginBottom: 10,
    textAlign: 'justify',
  },
});

export default TermsOfUse;