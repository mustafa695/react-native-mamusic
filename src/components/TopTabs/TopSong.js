import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../constant/colors';
import images from '../../constant/images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../../constant/fonts';

const TopSong = ({openDorpdown, navigation}) => {
  const topSong = [
    {
      id: 1,
      cover: images.topSong1,
      name: 'Imagine Dragons',
      artist: 'Cameron Williamson',
    },
    {
      id: 2,
      cover: images.topSong2,
      name: 'Renaissance',
      artist: 'Podval Caplella',
    },
    {
      id: 3,
      cover: images.topSong3,
      name: 'Ivar’s Revenge',
      artist: 'Ivar’s Revenge',
    },
    {
      id: 4,
      cover: images.topSong4,
      name: 'Imagine Dragons',
      artist: 'Cameron Williamson',
    },
    {
      id: 5,
      cover: images.topSong1,
      name: 'Imagine Dragons',
      artist: 'Cameron Williamson',
    },
  ];

  return (
    <View style={styles.container}>
      {topSong.map((item, ind) => {
        return (
          <View style={styles.wrapper} key={ind}>
            <View style={styles.row}>
              <View style={styles.numbBox}>
                <Text style={styles.numbTxt}>{ind + 1}</Text>
              </View>
              <View style={styles.imgWrap}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={item.cover}
                  resizeMode="cover"
                />
              </View>
              <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subTitle}>{item.artist}</Text>
              </View>
            </View>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={26}
                color={colors.pink}
              />
            </TouchableOpacity>
          </View>
        );
      })}
      <View
        style={[
          styles.arrowDown,
          {display: openDorpdown ? 'none' : undefined},
        ]}>
        <TouchableOpacity>
          <Image
            source={images.arrow}
            resizeMode="contain"
            style={{
              width: 35,
              height: 35,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.foreground,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
    overflow: 'hidden',
    height: 400,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numbBox: {
    width: 22,
    height: 22,
    borderRadius: 55,
    marginRight: 20,
    borderWidth: 1,
    borderColor: colors.pink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numbTxt: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 10,
  },
  imgWrap: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 14,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.white,
  },
  subTitle: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.white,
    marginTop: 1,
  },
  arrowDown: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: colors.foreground,
  },
});

export default TopSong;
