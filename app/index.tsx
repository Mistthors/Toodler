import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import BoardsList from '../components/BoardsList';
import { loadDataFromStorage } from '../utils/dataManager';

export default function HomeScreen() {
  useEffect(() => {
    const initializeData = async () => {
      await loadDataFromStorage();
    };
    
    initializeData();
  }, []);

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Toodler',
          headerStyle: {
            backgroundColor: '#8995ffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 35,
            fontFamily: 'AvenirNext-DemiBold',
          },
          headerTitleAlign: 'center',
          headerBackVisible: false,
        }}
      />
      <BoardsList />
    </>
  );
}