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
            backgroundColor: '#8995ffff'
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 35,
            fontFamily: 'Avenir Next',
          },
          headerTitleAlign: 'center',
          headerBackVisible: false,
        }}
      />
      <BoardsList />
    </>
  );
}