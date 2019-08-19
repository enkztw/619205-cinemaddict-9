const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomBoolean = () => Math.random() >= 0.5;

const getShuffledArray = (array) => {
  let j;
  let x;
  let i;

  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }

  return array;
};

export {getRandomNumber};
export {getRandomElement};
export {getRandomBoolean};
export {getShuffledArray};
