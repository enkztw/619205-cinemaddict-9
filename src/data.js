import {getRandomNumber} from './utils';
import {getRandomElement} from './utils';
import {getRandomBoolean} from './utils';
import {getShuffledArray} from './utils';

const FILMS_AMOUNT = 9;

const names = [`A Beautiful Mind`, `Atonement`, `The Great Gatsby`, `Once Upon a Time ... in Hollywood`, `Jagten`, `Dunkirk`];
const posters = [`a-beautiful-mind.jpg`, `atonement.jpg`, `the-great-gatsby.jpg`, `once-upon-a-time-in-hollywood.jpg`, `jagten.jpg`, `dunkirk.jpg`];

const months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

const descriptions = [
  `After John Nash, a brilliant but asocial mathematician, accepts secret work in cryptography, his life takes a turn for the nightmarish.`,
  `Fledgling writer Briony Tallis, as a thirteen-date-old, irrevocably changes the course of several lives when she accuses her older sister's lover of a crime he did not commit.`,
  `A writer and wall street trader, Nick, finds himself drawn to the past and lifestyle of his millionaire neighbor, Jay Gatsby.`,
  `A faded television actor and his stunt double strive to achieve fame and success in the film industry during the final dates of Hollywood's Golden Age in 1969 Los Angeles.`,
  `A teacher lives a lonely life, all the while struggling over his son's custody. His life slowly gets better as he finds love and receives good news from his son, but his new luck is about to be brutally shattered by an innocent little lie.`,
  `Allied soldiers from Belgium, the British Empire, and France are surrounded by the German Army, and evacuated during a fierce battle in World War II.`
];

const directors = [`Ron Howard`, `Joe Wright`, `Baz Luhrmann`, `Quentin Tarantino`, `Thomas Vinterberg`, `Christopher Nolan`];
const comments = [`Awesome! Loves this film so much!`, `Boooooring`, `Another crap love story`, `Can't wait it to come out!`, `Greteast movie about UK history so far`];
const reactions = [`smile`, `sleeping`, `puke`, `angry`];
const actors = [`Russell Crowe`, `Ed Harris`, `Jennifer Connelly`, `Fionn Whitehead`, `Barry Keoghan`, `Mark Rylance`, `Mads Mikkelsen`, `Thomas Bo Larsen`, `Annika Wedderkopp`];
const countries = [`USA`, `UK`, `Russia`, `Japan`, `Denmark`, `Germany`];
const genres = [`Drama`, `Comedy`, `Mystery`, `Romance`, `History`];

const generateComment = () => {
  const comment = {
    author: getRandomElement(directors),
    comment: getRandomElement(comments),
    reaction: getRandomElement(reactions),
    ago: getRandomNumber(0, 69)
  };

  return comment;
};

const genereateComments = (amount) => [...Array(amount)].map(generateComment);

const generateFilmData = (id) => {
  const film = {
    id,
    name: getRandomElement(names),
    poster: getRandomElement(posters),
    rating: parseInt(((getRandomNumber(0, 8) + parseInt(Math.random() * 100, 10) / 100).toFixed(2) * 100), 10) / 100,
    date: new Date(`${getRandomElement(months)} ${getRandomNumber(1, 31)}, ${getRandomNumber(1995, 2020)}`),
    duration: getRandomNumber(60, 180),
    genres: new Set(getShuffledArray(genres).slice(0, 3)),
    description: getRandomElement(descriptions),
    comments: genereateComments(getRandomNumber(0, 7)),
    isAdded: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
    userScore: getRandomNumber(1, 9),
    director: getRandomElement(directors),
    writers: new Set(getShuffledArray(actors).slice(0, 3)),
    actors: new Set(getShuffledArray(actors).slice(0, 3)),
    country: getRandomElement(countries),
  };

  return film;
};

const genreateFilmsData = (amount) => [...Array(amount)].map((film, id) => generateFilmData(id));

const films = genreateFilmsData(FILMS_AMOUNT);

export {months};
export {films};
