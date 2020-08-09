export const addColor = ({ color }) => {
  return {
    type: 'ADD_COLOR',
    color,
  };
};

export const deleteColor = ({ color }) => {
  return {
    type: 'DELETE_COLOR',
    color,
  };
};
