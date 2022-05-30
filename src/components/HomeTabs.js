import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../components/tabs/Home';
import Profile from '../components/tabs/Profile';
import Radio from './tabs/Radio';
import {colors} from '../constant/colors';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TabIcon from '../components/tabIcon';

const Tab = createBottomTabNavigator();

function HomeTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            paddingHorizontal: 20,
            backgroundColor: colors.foreground,
            borderTopColor: 'transparent',
            height: 60,
          },
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon
                focused={focused}
                icon={
                  <MaterialIcons
                    name="radio"
                    size={22}
                    color={`${focused ? colors.white : colors.silver}`}
                  />
                }
              />
            ),
          }}
          name="Radio"
          component={Radio}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon
                focused={focused}
                icon={
                  <MaterialIcons
                    name="home"
                    size={26}
                    color={`${focused ? colors.white : colors.silver}`}
                  />
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon
                focused={focused}
                icon={
                  <IconIonicons
                    name="md-person-circle-sharp"
                    size={26}
                    color={`${focused ? colors.white : colors.silver}`}
                  />
                }
              />
            ),
          }}
          component={Profile}
        />
      </Tab.Navigator>
    );
  }

  export default HomeTabs;