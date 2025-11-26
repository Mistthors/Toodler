import React from 'react';
import { Stack } from 'expo-router';
import Board from '../components/Board';

export default function BoardScreen() {
  return (
    <>
      <Stack.Screen 
        options={{
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: '#8995ffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Board />
    </>
  );
}