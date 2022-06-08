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
import {useDispatch, useSelector} from 'react-redux';
import {musicAlreadyPlaying} from '../store/action';
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
      url: 'https://firebasestorage.googleapis.com/v0/b/instagram-563fe.appspot.com/o/Qayamat%20Hai%20Zaalim%20Ki%20Neechi%20Nigahein%20_%20Remix%20%20_%20Nusrat%20Fateh%20Ali%20Khan%20(MP3_320K).mp3.mp3?alt=media&token=00b6b5ab-020c-433f-b2f4-7d9ad4e2f0fd',
      cover: images.musicPlay,
      name: 'Qayamat Hai Zaalim...',
      author: 'Nustrat Fathe Ali...',
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
  const [musicPause, setMusicPause] = useState(false);
  const [index, setIndex] = useState(0);
  const width = Dimensions.get('window').width;
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  const dispatch = useDispatch();
  const isAlready = useSelector(state => state);

  useEffect(() => {
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      setIndex(index);
    });
  }, []);

  const start = url => {
    dispatch(musicAlreadyPlaying(true));
    setMusicAlready(true);
    setIsPlaying(true);

    if (!musicAlready) {
      console.log('-----Play---');
      let playMusic = new Sound(url, Sound.MAIN_BUNDLE, error => {
        if (error) {
          alert('failed to load the sound', error);
          return;
        }
        setTimeout(() => {
          playMusic.play(success => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        }, 600);
        setMusic(playMusic);
        setTimeout(() => {
          setDuration(playMusic.getDuration());
        }, 500);
      });
    } else {
      //resume music
      music.play();
    }
  };

  const pause = () => {
    setIsPlaying(false);
    setMusicPause(true);
    music.pause();
  };

  useEffect(() => {
    if (music) {
      console.log('============timeoit=======');
      let id = setInterval(() => {
        setTimeout(() => {
          music.getCurrentTime((seconds, play) => {
            if (seconds > 0) {
              setSecond(seconds);
            }
          });
        }, 500);
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

  const nextSong = () => {
    if (index !== songs.length - 1) {
      setIndex(songs[index + 1]);
    }
    if (isPlaying || musicPause) {
      music.stop(() => {
        console.log('music has been stopped...');
      });
    }
    dispatch(musicAlreadyPlaying(false));
    setMusicAlready(false);
    setIsPlaying(false);
    setMusic('');
    songSlider.current.scrollToOffset({
      offset: (index + 1) * width,
    });
  };

  const prevSong = () => {
    if (index > 0) {
      setIndex(songs[index - 1]);
    }

    if (isPlaying) {
      music.stop(() => {
        console.log('music has been stopped...');
      });
    }

    setMusicAlready(false);
    setIsPlaying(false);
    setMusic('');

    songSlider.current.scrollToOffset({
      offset: (index - 1) * width,
    });
  };

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
            onPress={() => {
              navigation.navigate('Detail');
              if (isAlready || isPlaying) {
                music.stop();
              }
            }}>
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
          ref={songSlider}
          data={songs}
          horizontal={true}
          scrollEnabled={false}
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
            <TouchableOpacity onPress={prevSong}>
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
            <TouchableOpacity onPress={nextSong}>
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
