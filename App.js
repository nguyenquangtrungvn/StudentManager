import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StudentProvider } from './src/context/StudentContext';
import StudentListScreen from './src/screens/StudentListScreen';
import StudentDetailScreen from './src/screens/StudentDetailScreen';
import StudentFormScreen from './src/screens/StudentFormScreen';
import { t } from './src/i18n';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StudentProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="StudentList"
              component={StudentListScreen}
              options={{ title: t('appTitle') }}
            />
            <Stack.Screen
              name="StudentDetail"
              component={StudentDetailScreen}
              options={{ title: t('detailTitle') }}
            />
            <Stack.Screen
              name="StudentForm"
              component={StudentFormScreen}
              options={({ route }) => ({
                title: route.params?.id ? t('editTitle') : t('addTitle'),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </StudentProvider>
    </SafeAreaProvider>
  );
}
