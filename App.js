import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabs from './src/components/HomeTabs';
import Detail from './src/Screens/Detail';
import Music from './src/Screens/Music';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="homeTabs" component={HomeTabs} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Music" component={Music} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
