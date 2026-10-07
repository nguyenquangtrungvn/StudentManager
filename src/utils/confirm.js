import { Alert, Platform } from 'react-native';

// Hộp thoại xác nhận chạy được trên cả web và điện thoại
export function confirmDialog(title, message, yesText, noText, onYes, destructive = false) {
  if (Platform.OS === 'web') {
    if (window.confirm(`${title}\n\n${message}`)) onYes();
    return;
  }
  Alert.alert(title, message, [
    { text: noText, style: 'cancel' },
    { text: yesText, style: destructive ? 'destructive' : 'default', onPress: onYes },
  ]);
}
