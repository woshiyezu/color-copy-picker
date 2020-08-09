const initialState = {
  colors: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COLOR':
      return {
        ...state,
        colors: [...state.colors, action.color],
      };
    case 'DELETE_COLOR':
      return {
        ...state,
        colors: state.colors.filter((color) => color.key !== action.color.key),
      };
    default:
      return state;
  }
};

export default reducer;
