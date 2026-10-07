import React, { useMemo, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator,
} from 'react-native';
import { useStudents } from '../context/StudentContext';
import Avatar from '../components/Avatar';
import { t } from '../i18n';

export default function StudentListScreen({ navigation }) {
  const { students, loading } = useStudents();
  const [query, setQuery] = useState('');

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) => s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q)
    );
  }, [students, query]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder={t('searchPlaceholder')}
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.empty}>{students.length ? t('noResult') : t('emptyList')}</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('StudentDetail', { id: item.id })}
          >
            <Avatar uri={item.avatar} name={item.name} size={52} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>{item.studentId}</Text>
              <Text style={styles.sub}>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('StudentForm')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  search: {
    margin: 12, padding: 12, backgroundColor: '#fff', borderRadius: 10,
    borderWidth: 1, borderColor: '#dde1ea',
  },
  item: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    marginHorizontal: 12, marginBottom: 8, padding: 12, borderRadius: 12,
  },
  info: { marginLeft: 12, flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  sub: { color: '#666', marginTop: 2 },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },
  fab: {
    position: 'absolute', right: 20, bottom: 30, width: 58, height: 58, borderRadius: 29,
    backgroundColor: '#4f7cff', alignItems: 'center', justifyContent: 'center', elevation: 5,
  },
  fabText: { color: '#fff', fontSize: 32, marginTop: -2 },
});
