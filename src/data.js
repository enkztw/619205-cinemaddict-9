import {getRandomNumber} from './utils';
import {getRandomBoolean} from './utils';

const films = [{
  name: `A Beautiful Mind`,
  image: `a-beautiful-mind.jpg`,
  rating: 8.3,
  date: new Date(`February 27, 2002`),
  duration: 90,
  genres: new Set([`Drama`]),
  description: `After John Nash, a brilliant but asocial mathematician, accepts secret work in cryptography, his life takes a turn for the nightmarish.`,
  comments: [{
    author: `Max Kuznetsov`,
    comment: `Awesome! Loves this film so much!`,
    reaction: `smile`,
    ago: getRandomNumber(0, 69)
  },
  {
    author: `Victoria Shelekhova`,
    comment: `Boooooring`,
    reaction: `sleeping`,
    ago: getRandomNumber(0, 69)
  }],
  isAdded: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  isFavorite: getRandomBoolean(),
  userScore: getRandomNumber(1, 9),
  director: `Ron Howard`,
  writers: new Set([`Akiva Goldsman`, `Sylvia Nasar`]),
  actors: new Set([`Russell Crowe`, `Ed Harris`, `Jennifer Connelly`]),
  country: `USA`
},
{
  name: `Atonement`,
  image: `atonement.jpg`,
  rating: 7.8,
  date: new Date(`January 17, 2007`),
  duration: 123,
  genres: new Set([`Drama`, `Mystery`, `Romance`]),
  description: `Fledgling writer Briony Tallis, as a thirteen-date-old, irrevocably changes the course of several lives when she accuses her older sister's lover of a crime he did not commit.`,
  comments: [
    {
      author: `Victoria Shelekhova`,
      comment: `Another crap love story`,
      reaction: `puke`,
      ago: getRandomNumber(0, 69)
    }],
  isAdded: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  isFavorite: getRandomBoolean(),
  userScore: getRandomNumber(1, 9),
  director: `Joe Wright`,
  writers: new Set([`Ian McEwan`, `Christopher Hampton`]),
  actors: new Set([`Keira Knightley`, `James McAvoy`, `Brenda Blethyn`]),
  country: `USA`
},
{
  name: `The Great Gatsby`,
  image: `the-great-gatsby.jpg`,
  rating: 7.3,
  date: new Date(`May 16, 2013`),
  duration: 143,
  genres: new Set([`Drama`, `Romance`]),
  description: `A writer and wall street trader, Nick, finds himself drawn to the past and lifestyle of his millionaire neighbor, Jay Gatsby.`,
  comments: [
    {
      author: `Victoria Shelekhova`,
      comment: `This film inspired me so bad`,
      reaction: `smile`,
      ago: getRandomNumber(0, 69)
    },
    {
      author: `Alexander Brez`,
      comment: `Picture and colors are INSANE`,
      reaction: `smile`,
      ago: getRandomNumber(0, 69)
    }],
  isAdded: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  isFavorite: getRandomBoolean(),
  userScore: getRandomNumber(1, 9),
  director: `Baz Luhrmann`,
  writers: new Set([`Baz Luhrmann`, `Craig Pearce`]),
  actors: new Set([`Leonardo DiCaprio`, `Carey Mulligan`, `Joel Edgerton`]),
  country: `USA`
},
{
  name: `Once Upon a Time ... in Hollywood`,
  image: `once-upon-a-time-in-hollywood.jpg`,
  rating: 8.4,
  date: new Date(`August 8, 2019`),
  duration: 161,
  genres: new Set([`Comedy`, `Drama`]),
  description: `A faded television actor and his stunt double strive to achieve fame and success in the film industry during the final dates of Hollywood's Golden Age in 1969 Los Angeles.`,
  comments: [
    {
      author: `Max Kuznetsov`,
      comment: `Can't wait it to come out!`,
      reaction: `sleeping`,
      ago: getRandomNumber(0, 69)
    }],
  isAdded: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  isFavorite: getRandomBoolean(),
  userScore: getRandomNumber(1, 9),
  director: `Quentin Tarantino`,
  writers: new Set([`Quentin Tarantino`]),
  actors: new Set([`Leonardo DiCaprio`, `Brad Pitt`, `Margot Robbie`]),
  country: `USA`
},
{
  name: `Jagten`,
  image: `jagten.jpg`,
  rating: 8.3,
  date: new Date(`February 21, 2013`),
  duration: 115,
  genres: new Set([`Drama`]),
  description: `A teacher lives a lonely life, all the while struggling over his son's custody. His life slowly gets better as he finds love and receives good news from his son, but his new luck is about to be brutally shattered by an innocent little lie.`,
  comments: [],
  isAdded: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  isFavorite: getRandomBoolean(),
  userScore: getRandomNumber(1, 9),
  director: `Thomas Vinterberg`,
  writers: new Set([`Tobias Lindholm`, `Thomas Vinterberg`]),
  actors: new Set([`Mads Mikkelsen`, `Thomas Bo Larsen`, `Annika Wedderkopp`]),
  country: `Denmark`
},
{
  name: `Dunkirk`,
  image: `dunkirk.jpg`,
  rating: 7.9,
  date: new Date(`July 20, 2017`),
  duration: 106,
  genres: new Set([`Drama`, `History`]),
  description: `Allied soldiers from Belgium, the British Empire, and France are surrounded by the German Army, and evacuated during a fierce battle in World War II.`,
  comments: [{
    author: `Max Kuznetsov`,
    comment: `Nolan is genius`,
    reaction: `smile`,
    ago: getRandomNumber(0, 69)
  },
  {
    author: `Christian Bale`,
    comment: `Can confirm, Prestige was mindblowing!`,
    reaction: `smile`,
    ago: getRandomNumber(0, 69)
  },
  {
    author: `Daniel Kallen`,
    comment: `Greteast movie about UK history so far`,
    reaction: `smile`,
    ago: getRandomNumber(0, 69)
  }],
  isAdded: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  isFavorite: getRandomBoolean(),
  userScore: getRandomNumber(1, 9),
  director: `Christopher Nolan`,
  writers: new Set([`Christopher Nolan`]),
  actors: new Set([`Fionn Whitehead`, `Barry Keoghan`, `Mark Rylance`]),
  country: `UK`
}];

export {films};
