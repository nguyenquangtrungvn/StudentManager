import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'students_v1';

export async function loadStudents() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('loadStudents error', e);
    return [];
  }
}

export async function saveStudents(list) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('saveStudents error', e);
  }
}
