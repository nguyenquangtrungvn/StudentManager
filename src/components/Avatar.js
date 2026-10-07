import React from 'react';
import { Image, Text, View } from 'react-native';

export default function Avatar({ uri, name = '', size = 48 }) {
  const style = { width: size, height: size, borderRadius: size / 2 };
  if (uri) {
    return <Image source={{ uri }} style={[style, { backgroundColor: '#ddd' }]} />;
  }
  return (
    <View
      style={[style, { backgroundColor: '#4f7cff', alignItems: 'center', justifyContent: 'center' }]}
    >
      <Text style={{ color: '#fff', fontSize: size / 2.2, fontWeight: '700' }}>
        {name.trim().charAt(0).toUpperCase() || '?'}
      </Text>
    </View>
  );
}
