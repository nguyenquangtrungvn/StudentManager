import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useStudents } from '../context/StudentContext';
import Avatar from '../components/Avatar';
import { t } from '../i18n';
import { confirmDialog } from '../utils/confirm';

export default function StudentDetailScreen({ navigation, route }) {
  const { getStudent, deleteStudent } = useStudents();
  const student = getStudent(route.params.id);

  // Sau khi xóa, student = undefined trong chốc lát
  if (!student) {
    return (
      <View style={styles.center}>
        <Text>{t('notFound')}</Text>
      </View>
    );
  }

  const confirmDelete = () => {
    confirmDialog(
      t('confirmTitle'),
      t('confirmDelete'),
      t('yes'),
      t('no'),
      async () => {
        await deleteStudent(student.id);
        navigation.goBack();
      },
      true
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Avatar uri={student.avatar} name={student.name} size={120} />
      </View>

      <Text style={styles.label}>{t('fullName')}</Text>
      <Text style={styles.value}>{student.name}</Text>

      <Text style={styles.label}>{t('studentId')}</Text>
      <Text style={styles.value}>{student.studentId}</Text>

      <Text style={styles.label}>{t('email')}</Text>
      <Text style={styles.value}>{student.email}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#4f7cff' }]}
          onPress={() => navigation.navigate('StudentForm', { id: student.id })}
        >
          <Text style={styles.btnText}>{t('edit')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#e5484d' }]} onPress={confirmDelete}>
          <Text style={styles.btnText}>{t('delete')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  center: { alignItems: 'center', justifyContent: 'center', marginVertical: 16 },
  label: { color: '#888', marginTop: 14, fontSize: 13 },
  value: { fontSize: 18, fontWeight: '500', marginTop: 2 },
  row: { flexDirection: 'row', gap: 12, marginTop: 36 },
  btn: { flex: 1, padding: 14, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
