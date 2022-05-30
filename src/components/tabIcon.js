import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../constant/colors';

const TabIcon = ({focused, icon}) => {
  return (
    
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          width:53,
          height:53,
          borderRadius:55,
          marginBottom: focused ? 40 : 0,
          backgroundColor: focused ? colors.pink : "transparent"
        }}>
        {icon}
      </View>
 
  );
};

export default TabIcon;
