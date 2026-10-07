import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useStudents } from '../context/StudentContext';
import Avatar from '../components/Avatar';
import { t } from '../i18n';
import { confirmDialog } from '../utils/confirm';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function StudentFormScreen({ navigation, route }) {
  const id = route.params?.id;
  const isEdit = !!id;
  const { students, getStudent, addStudent, updateStudent } = useStudents();
  const existing = isEdit ? getStudent(id) : null;

  const [name, setName] = useState(existing?.name ?? '');
  const [studentId, setStudentId] = useState(existing?.studentId ?? '');
  const [email, setEmail] = useState(existing?.email ?? '');
  const [avatar, setAvatar] = useState(existing?.avatar ?? '');
  const [errors, setErrors] = useState({});

  const isDataUri = avatar.startsWith('data:');

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.4,
      base64: true,
    });
    if (!res.canceled) {
      const a = res.assets[0];
      setAvatar(a.base64 ? `data:${a.mimeType || 'image/jpeg'};base64,${a.base64}` : a.uri);
    }
  };

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = t('errName');
    if (!studentId.trim()) e.studentId = t('errStudentId');
    else if (
      students.some(
        (s) => s.id !== id && s.studentId.toLowerCase() === studentId.trim().toLowerCase()
      )
    )
      e.studentId = t('errStudentIdDup');
    if (!email.trim()) e.email = t('errEmail');
    else if (!EMAIL_REGEX.test(email.trim())) e.email = t('errEmailInvalid');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const doSave = async () => {
    const data = {
      name: name.trim(),
      studentId: studentId.trim(),
      email: email.trim(),
      avatar: avatar.trim(),
    };
    if (isEdit) await updateStudent(id, data);
    else await addStudent(data);
    navigation.goBack();
  };

  const onSave = () => {
    if (!validate()) return;
    if (isEdit) {
      // Xác nhận trước khi sửa
      confirmDialog(t('confirmTitle'), t('confirmEdit'), t('yes'), t('no'), doSave);
    } else {
      doSave();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.center}>
          <Avatar uri={avatar} name={name} size={110} />
          <View style={styles.row}>
            <TouchableOpacity style={styles.smallBtn} onPress={pickImage}>
              <Text style={styles.smallBtnText}>{t('pickImage')}</Text>
            </TouchableOpacity>
            {!!avatar && (
              <TouchableOpacity style={[styles.smallBtn, styles.grayBtn]} onPress={() => setAvatar('')}>
                <Text style={styles.smallBtnText}>{t('removeImage')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.label}>{t('fullName')}</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        <Text style={styles.label}>{t('studentId')}</Text>
        <TextInput
          style={styles.input}
          value={studentId}
          onChangeText={setStudentId}
          autoCapitalize="characters"
        />
        {errors.studentId && <Text style={styles.error}>{errors.studentId}</Text>}

        <Text style={styles.label}>{t('email')}</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <Text style={styles.label}>{t('avatarUrl')}</Text>
        <TextInput
          style={styles.input}
          value={isDataUri ? t('photoFromDevice') : avatar}
          editable={!isDataUri}
          onChangeText={setAvatar}
          autoCapitalize="none"
          keyboardType="url"
        />

        <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
          <Text style={styles.saveText}>{t('save')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  center: { alignItems: 'center', marginBottom: 8 },
  row: { flexDirection: 'row', gap: 8, marginTop: 12 },
  smallBtn: { backgroundColor: '#4f7cff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  grayBtn: { backgroundColor: '#888' },
  smallBtnText: { color: '#fff', fontWeight: '600' },
  label: { marginTop: 14, color: '#555', fontSize: 13 },
  input: {
    borderWidth: 1, borderColor: '#ccd1dc', borderRadius: 8, padding: 12, marginTop: 4, fontSize: 16,
  },
  error: { color: '#e5484d', marginTop: 4 },
  saveBtn: { backgroundColor: '#4f7cff', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 28 },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
