function musicAlreadyPlaying(isAlready) {
  return {
    type: 'MUSIC_ALREADY_PLAYING',
    isAlready: isAlready,
  };
}

export {musicAlreadyPlaying};
