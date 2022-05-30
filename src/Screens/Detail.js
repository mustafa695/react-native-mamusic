import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../constant/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../constant/colors';
import fonts from '../constant/fonts';
import TopTabsNavigator from '../components/TopTabsNavigator';

const Detail = ({navigation}) => {
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
  const [tabHeight, setTabHeight] = useState(null);
  const [openDorpdown, setOpenDorpdown] = useState(false);

  return (
    <ScrollView
      style={{backgroundColor: colors.body}}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <TouchableOpacity style={styles.headImagWrap} onPress={() => navigation.navigate("Music")}>
        <Image
          style={{width: '100%', height: '100%', zIndex: 1}}
          source={images.headCover}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['#11153680', '#11153666', '#11153680', '#111536']}
          locations={[0, 0.4, 0, 0.8]}
          style={styles.lienarBg}></LinearGradient>

        <View style={styles.headIcons}>
          <View style={styles.headIconItem}>
            <TouchableOpacity style={styles.backArrow} onPress={() => navigation.navigate("homeTabs")}>
              <Ionicons name="arrow-back" size={22} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={26}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headBtmWrap}>
          <View style={styles.headBtmRow}>
            <View
              style={{
                marginRight: 8,
              }}>
              <Text style={styles.headBtmTit}>Olivia Rodrigo</Text>
              <Text style={styles.headSubTit}>
                5K Followers | 2.5K Listeners | 10 Following
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                <Text style={styles.btnFollow}>Follow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{height: 350, backgroundColor: colors.body}}>
        <TopTabsNavigator
          setTabHeight={setTabHeight}
          openDorpdown={openDorpdown}
          setOpenDorpdown={setOpenDorpdown}
        />
      </View>
      <View style={styles.sContainer}>
        <Text style={styles.mainTitle}>Albums</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  lienarBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2,
  },
  headImagWrap: {
    position: 'relative',
    height: 280,
  },
  headIcons: {
    position: 'absolute',
    top: StatusBar.currentHeight,
    width: '100%',
    zIndex: 5,
  },
  headIconItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backArrow: {
    backgroundColor: colors.foreground,
    width: 32,
    height: 32,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headBtmWrap: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headBtmRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headBtmTit: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  headSubTit: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 10,
  },
  btnFollow: {
    backgroundColor: colors.pink,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 12,
    textAlign: 'center',
  },
  mainTitle: {
    fontFamily: fonts.bold,
    fontSize: 19,
    color: colors.white,
  },
  sContainer: {
    paddingHorizontal: 29,
    marginTop:15,
    marginBottom:30,
    backgroundColor: colors.body,
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
});

export default Detail;
