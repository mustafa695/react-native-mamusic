import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabs from './src/components/HomeTabs';
import Detail from './src/Screens/Detail';
import Music from './src/Screens/Music';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="homeTabs" component={HomeTabs} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Music" component={Music} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
