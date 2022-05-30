import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopSong from './TopTabs/TopSong';
import AllSong from './TopTabs/AllSong';
import {NavigationContainer} from '@react-navigation/native';
import {colors} from '../constant/colors';
import fonts from '../constant/fonts';

const Tab = createMaterialTopTabNavigator();

const tabBarOptions = {
  activeTintColor: colors.pink,
  inactiveTintColor: colors.white,
  tabStyle: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  indicatorStyle: {
    backgroundColor: colors.foreground,
    height: '100%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },

  style: {
    backgroundColor: '#111536',
    width: '100%',
    elevation: 0,
  },
};

function TopTabsNavigator({setTabHeight, setOpenDorpdown, openDorpdown}) {
  return (
    <Tab.Navigator
      tabBarOptions={tabBarOptions}
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 16,
          textTransform: 'capitalize',
          fontFamily: fonts.bold,
        },
      }}>
      <Tab.Screen
        name="TopSongs"
        // component={TopSong}
        children={() => (
          <TopSong
            setTabHeight={setTabHeight}
            openDorpdown={openDorpdown}
            setOpenDorpdown={setOpenDorpdown}
          />
        )}
        options={{tabBarLabel: 'Top Songs'}}
      />
      <Tab.Screen
        name="AllSongs"
        component={AllSong}
        options={{tabBarLabel: 'All Songs'}}
      />
    </Tab.Navigator>
  );
}
export default TopTabsNavigator;
