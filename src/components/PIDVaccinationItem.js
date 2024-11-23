import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getVacinaData } from '../Services/VacinaService';
import colors from '../styles/colors';

export default function PIDVaccinationItem({ petId }) {
  const [vacinas, setVacinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVacinas = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { success, data, message } = await getVacinaData(petId);
    if (success) {
      setVacinas(data);
    } else {
      setError(message);
    }

    setLoading(false);
  }, [petId]);

  useEffect(() => {
    fetchVacinas();
  }, [petId, fetchVacinas]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.colors.primary} />
        <Text>Carregando vacinas...</Text>
      </View>
    );
  }

  if (error) {
    return <Text>Erro ao carregar vacinas: {error}</Text>;
  }

  // Renderizando uma vacina por vez
  return (
    <View style={styles.container}>
      {vacinas.length > 0 ? (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>
            <Text style={styles.label}>Procedimento: </Text>
            {vacinas[0].procedimento}
          </Text>
          <Text style={styles.itemText}>
            <Text style={styles.label}>Nome: </Text>
            {vacinas[0].nome_proc}
          </Text>
          <Text style={styles.itemText}>
            <Text style={styles.label}>Data de Realização: </Text>
            {vacinas[0].data_realizacao}
          </Text>
          {vacinas[0].data_renovacao && (
            <Text style={styles.itemText}>
              <Text style={styles.label}>Data de Renovação: </Text>
              {vacinas[0].data_renovacao}
            </Text>
          )}
        </View>
      ) : (
        <Text>Sem vacinas registradas.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 4,
    alignItems: 'center',
    
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: '90%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: colors.colors.componentBG,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color: colors.colors.text,
  },
  label: {
    fontWeight: 'bold',
  },
});
