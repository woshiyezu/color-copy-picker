export const makeColor = (code) => {
  return {
    key: parseInt(Math.random() * 100000),
    code: code,
  };
};

export const getColor = (key, code) => {
  return {
    key: key,
    code: code,
  };
};
