const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomBoolean = () => Math.random() >= 0.5;

export {getRandomNumber};
export {getRandomElement};
export {getRandomBoolean};
