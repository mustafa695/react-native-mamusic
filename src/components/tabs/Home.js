import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import {colors} from '../../constant/colors';
import fonts from '../../constant/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Entypo';
import images from '../../constant/images';

const Home = ({navigation}) => {
  const featuredData = [
    {
      id: 1,
      songName: 'Follow The Leader ft. Jennifer',
      songSub: 'Wisin & Yandel | Featured Song | 11.12.2021',
      banner: images.feat1,
    },
    {
      id: 2,
      songName: 'On The Floor ft. Jennifer',
      songSub: 'Wisin & Yandel | Featured Song | 11.12.2021',
      banner: images.feat2,
    },
    {
      id: 3,
      songName: 'On The Floor ft. Jennifer',
      songSub: 'Wisin & Yandel | Featured Song | 11.12.2021',
      banner: images.feat1,
    },
  ];

  const newSongs = [
    {
      id: 1,
      name: 'Urgent Siege',
      artist: 'Damned Anthem',
      cover: images.song1,
    },
    {
      id: 2,
      name: 'Urgent Siege',
      artist: 'Damned Anthem',
      cover: images.song2,
    },
    {
      id: 3,
      name: 'Urgent Siege',
      artist: 'Damned Anthem',
      cover: images.song3,
    },
    {
      id: 4,
      name: 'Urgent Siege',
      artist: 'Damned Anthem',
      cover: images.song4,
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.body}
        translucent={true}
      />
      <View style={styles.searchWrapp}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={colors.white}
        />
        <TouchableOpacity style={styles.iconSearch}>
          <MaterialIcons name="search" color={colors.white} size={17} />
        </TouchableOpacity>
      </View>

      {/* Banner Slider */}

      <View style={styles.featureSlide}>
        <FlatList
          data={featuredData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Detail")}
              style={[
                styles.featWrapp,
                {marginRight: index === featuredData.length - 1 ? 0 : 10},
              ]}>
              <Image
                source={item.banner}
                resizeMode="cover"
                style={{height: '100%', width: '100%', borderRadius: 11}}
              />
              <View
                style={{
                  backgroundColor: '#11153659',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '100%',
                  width: '100%',
                  zIndex: 0,
                }}></View>

              <View style={styles.featContentTitle}>
                <Text style={styles.featTitle}>Featured Song</Text>
              </View>
              <View style={styles.featBottom}>
                <Text style={styles.featBottomH}>{item.songName}</Text>
                <Text style={styles.featBottomP}>{item.songSub}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      {/*New Songs*/}

      <View style={styles.sContainer}>
        <Text style={styles.mainTitle}>New Songs</Text>
        <FlatList
          data={newSongs}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[
                styles.sMainBox,
                {marginRight: index === newSongs.length - 1 ? 0 : 10},
              ]}>
              <View style={styles.sBox}>
                <Image
                  source={item.cover}
                  resizeMode="cover"
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <Text style={styles.sTit}>{item.name}</Text>
              <Text style={styles.sSubTit}>{item.artist}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      {/* favourite artist */}

      <View style={styles.favWrap}>
        <Text style={styles.mainTitle}>Favourite Artist</Text>
        <TouchableOpacity style={[styles.collapse, {marginTop: 10}]}>
          <Text style={styles.collapseTit}>Add Your Artist</Text>
          <Entypo name="plus" size={24} color={colors.pink} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.collapse}>
          <Text style={styles.collapseTit}>Taylor Swift</Text>
          <Feather name="chevron-right" size={24} color={colors.pink} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.collapse}>
          <Text style={styles.collapseTit}>Taylor Swift</Text>
          <Feather name="chevron-right" size={24} color={colors.pink} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.body,
    marginTop: StatusBar.currentHeight,
    paddingBottom: 200,
  },
  searchWrapp: {
    flex: 1,
    backgroundColor: colors.foreground,
    borderRadius: 18,
    height: 37,
    borderWidth: 1,
    borderColor: colors.pink,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 25,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontFamily: fonts.semibold,
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  iconSearch: {
    marginRight: 11,
    justifyContent: 'center',
  },
  featureSlide: {
    marginTop: 10,
    backgroundColor: colors.foreground,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  featWrapp: {
    width: Dimensions.get('window').width * 0.8,
    height: 198,
    position: 'relative',
  },
  featContentTitle: {
    position: 'absolute',
    top: 13,
    left: 18,
  },
  featTitle: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: 20,
  },
  featBottom: {
    position: 'absolute',
    bottom: 20,
    left: 18,
    flex: 1,
  },
  featBottomH: {
    fontSize: 14,
    fontFamily: fonts.semibold,
    color: colors.white,
  },
  featBottomP: {
    fontSize: 10,
    fontFamily: fonts.regular,
    color: colors.white,
    marginTop: 3,
  },
  mainTitle: {
    fontFamily: fonts.bold,
    fontSize: 19,
    color: colors.white,
  },
  sContainer: {
    paddingHorizontal: 29,
    marginTop: 13,
  },
  sMainBox: {
    width: 120,
    marginTop: 10,
  },
  sBox: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  sTit: {
    fontFamily: fonts.semibold,
    color: colors.white,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 2,
  },
  sSubTit: {
    fontFamily: fonts.light,
    fontSize: 10,
    color: colors.silver,
    textAlign: 'center',
  },
  favWrap: {
    paddingHorizontal: 29,
    marginTop: 20,
    marginBottom: Dimensions.get('window').height * 0.15,
  },
  collapse: {
    backgroundColor: colors.foreground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 11,
    marginBottom: 10,
  },
  collapseTit: {
    color: colors.pink,
    fontFamily: fonts.bold,
    fontSize: 14,
  },
});

export default Home;
