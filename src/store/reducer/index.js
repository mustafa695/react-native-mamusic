const initialState = {
  condition: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MUSIC_ALREADY_PLAYING': {
      return {
        ...state,
        condition: action.isAlready,
      };
    }

    default:
      return state;
  }
};
export default reducer;
