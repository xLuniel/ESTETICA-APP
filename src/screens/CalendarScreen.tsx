// src/screens/CalendarScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const handleDayPress = (day: { dateString: string }) => {
    console.log('Selected day', day.dateString);
    // Lógica para manejar la selección de una fecha
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Agenda de Citas</Text>
      <Calendar onDayPress={handleDayPress} />
    </View>
  );
};

export default CalendarScreen;
