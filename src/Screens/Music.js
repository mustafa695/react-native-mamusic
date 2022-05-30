import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import images from '../constant/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../constant/colors';
import fonts from '../constant/fonts';

const Music = ({navigation}) => {
  const songs = [
    {
      id: 1,
      url: 'https://firebasestorage.googleapis.com/v0/b/instagram-563fe.appspot.com/o/lost-sky.mp3?alt=media&token=a2fcbceb-0556-4bab-beba-fd4ba04245d2',
      cover: images.musicPlay,
      name: 'Imagine Dragons',
      author: 'Thunder',
    },
    {
      id: 2,
      url: 'https://bit.ly/3lTcOsz',
      cover: images.musicPlay,
      name: 'On the flooor',
      author: 'Jennefier Lopez',
    },
    {
      id: 3,
      url: 'https://firebasestorage.googleapis.com/v0/b/instagram-563fe.appspot.com/o/lost-sky.mp3?alt=media&token=a2fcbceb-0556-4bab-beba-fd4ba04245d2',
      cover: images.musicPlay,
      name: 'Dance On The Floor',
      author: 'Pitbull',
    },
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [music, setMusic] = useState('');
  const [second, setSecond] = useState(0);
  const [duration, setDuration] = useState(0);
  const [musicAlready, setMusicAlready] = useState(false);
  const [index, setIndex] = useState(0);
  const width = Dimensions.get('window').width;
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      setIndex(index);
    });
  }, []);

  const start = url => {
    
    setMusicAlready(true);
    if (!musicAlready) {
      console.log('-----Play---');
      let playMusic = new Sound(url, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        playMusic.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
        setMusic(playMusic);
        setTimeout(() => {
          setDuration(playMusic.getDuration());
        }, 500);
      });
    } else {
      music.play();
    }
  };

  const pause = () => {
    music.pause();
  };
  useEffect(() => {
    if (music) {
      let id = setInterval(() => {
        music.getCurrentTime((seconds, play) => {
          setIsPlaying(play);
          setSecond(seconds);
        });
      }, 100);
    }
  }, [music]);

  function padTo2Digits(num) {
    if (second !== 0) {
      return num.toString().padStart(2, '0');
    }
  }

  useEffect(() => {
    padTo2Digits();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <ImageBackground
        source={images.musicCover}
        resizeMode="cover"
        style={styles.bgCover}>
        <View style={styles.iconWrapp}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => navigation.navigate('Detail')}>
            <Ionicons name="arrow-back" size={22} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.rightIconWrap}>
            <TouchableOpacity style={{marginRight: 10}}>
              <FontAwesome name="share-alt" size={22} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={28}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* music  */}
        <Animated.FlatList
          data={songs}
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: true},
          )}
          renderItem={({item, index}) => (
            <Animated.View style={styles.musicWrapp}>
              <View
                style={{
                  alignItems: 'center',
                  marginBottom: Dimensions.get('window').height * 0.13,
                }}>
                <Image
                  source={item.cover}
                  resizeMode="contain"
                  style={{
                    width: Dimensions.get('window').width * 0.5,
                    height: Dimensions.get('window').width * 0.5,
                  }}
                />
              </View>
              <View>
                <Text style={styles.songTitle}>{item.name}...</Text>
                <Text style={styles.songSub}>{item.author}</Text>
              </View>
            </Animated.View>
          )}
          keyExtractor={item => item.id}
        />

        {/* slider */}
        <View style={styles.playWrapp}>
          <Slider
            style={{width: '100%'}}
            value={second}
            minimumValue={0}
            maximumValue={musicAlready ? duration : 1}
            minimumTrackTintColor={colors.pink}
            maximumTrackTintColor={colors.silver}
            thumbTintColor={colors.pink}
            onSlidingComplete={value => {
              music.setCurrentTime(value);
            }}
          />
          <View style={styles.timeWrapp}>
            <Text style={styles.playTime}>
              {second != 0
                ? `${`${padTo2Digits(Math.floor(second / 60))}:${padTo2Digits(
                    second % 60,
                  )}`}`.split('.')[0]
                : '0:00'}
            </Text>
            <Text style={styles.playTime}>
              {second != 0
                ? `${`${padTo2Digits(Math.floor(duration / 60))}:${padTo2Digits(
                    duration % 60,
                  )}`}`.split('.')[0]
                : '0:00'}
            </Text>
          </View>
        </View>

        <View style={styles.bottomWrap}>
          <TouchableOpacity>
            <Image
              source={images.filter}
              resizeMode="contain"
              style={styles.filterIcn}
            />
          </TouchableOpacity>
          <View style={styles.centerPlay}>
            <TouchableOpacity>
              <Ionicons
                name="play-skip-back-sharp"
                size={24}
                color={colors.pink}
                style={{marginRight: 30}}
              />
            </TouchableOpacity>
            {!isPlaying ? (
              <TouchableOpacity
                style={styles.play}
                onPress={() => start(songs[index].url)}>
                <Ionicons name="play" size={26} color={colors.body} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.play} onPress={pause}>
                <Ionicons name="pause" size={26} color={colors.body} />
              </TouchableOpacity>
            )}
            <TouchableOpacity>
              <Ionicons
                name="play-skip-forward-sharp"
                size={24}
                color={colors.pink}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Entypo
              name="dots-three-horizontal"
              color={colors.pink}
              size={20}
              style={{opacity: 0.5}}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.body,
  },
  bgCover: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 30,
  },
  backArrow: {
    backgroundColor: colors.foreground,
    width: 32,
    height: 32,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapp: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightIconWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicWrapp: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  songTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    textAlign: 'center',
    color: colors.white,
  },
  songSub: {
    marginTop: 14,
    fontFamily: fonts.bold,
    textAlign: 'center',
    color: colors.silver,
  },
  playWrapp: {
    paddingHorizontal: 20,
  },
  timeWrapp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  playTime: {
    fontFamily: fonts.light,
    color: colors.white,
    fontSize: 13,
  },
  bottomWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 40,
  },
  filterIcn: {
    width: 20,
    height: 20,
  },
  centerPlay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  play: {
    backgroundColor: colors.pink,
    marginRight: 30,
    width: 70,
    height: 70,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Music;
