import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const TermsOfUse = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container(colors)}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text(colors)}>
          Bem-vindo ao nosso aplicativo! Ao utilizá-lo, você concorda com os seguintes termos:
        </Text>
        <Text style={styles.sectionTitle(colors)}>1. Uso Geral</Text>
        <Text style={styles.text(colors)}>
          O aplicativo foi desenvolvido para facilitar o dia a dia do tutor, tendo na palma da mão as informações relacionadas à saúde do seu pet. Ao utilizá-lo, você
          concorda em não explorar vulnerabilidades ou usá-lo de forma que possa causar danos a
          outros usuários ou ao sistema.
        </Text>
        <Text style={styles.sectionTitle(colors)}>2. Dados do Usuário</Text>
        <Text style={styles.text(colors)}>
          Todos os dados fornecidos pelos usuários são tratados com segurança e utilizados
          exclusivamente para melhorar a experiência no aplicativo, conforme descrito na nossa
          política de privacidade.
        </Text>
        <Text style={styles.sectionTitle(colors)}>3. Alterações nos Termos</Text>
        <Text style={styles.text(colors)}>
          Reservamos o direito de alterar estes Termos de Uso a qualquer momento. Recomendamos
          revisar esta página periodicamente.
        </Text>
        <Text style={styles.sectionTitle(colors)}>4. Contato</Text>
        <Text style={styles.text(colors)}>
          Em caso de dúvidas, entre em contato pelo e-mail: 1135147@atitus.com.br com o assunto SUPORTE PEDIT.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (colors)=> ({
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  }),
  scrollView: {
    marginBottom: 20,
  },
  sectionTitle: (colors)=> ({
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: colors.green
  }),
  text: (colors)=> ({
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 10,
    textAlign: 'justify',
  }),
});

export default TermsOfUse;