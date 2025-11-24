// import React from 'react';
// import BoardsList from '../components/BoardsList';

// export default function HomeScreen() {
//   return <BoardsList />;
// }

import React from 'react';
import { Stack } from 'expo-router';
import BoardsList from '../components/BoardsList';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Toodler',
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
          headerTitleAlign: 'center',
          headerBackVisible: false,
        }}
      />
      <BoardsList />
    </>
  );
}