import {getRandomNumber} from './utils';
import {getRandomBoolean} from './utils';

const films = [{
  name: `A Beautiful Mind`,
  image: `a-beautiful-mind.jpg`,
  rating: 8.3,
  year: 2001,
  duration: {
    hours: 1,
    minutes: 30
  },
  genres: [`Drama`],
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
  writers: `Akiva Goldsman, Sylvia Nasar`,
  actors: `Russell Crowe, Ed Harris, Jennifer Connelly`,
  country: `USA`
},
{
  name: `Atonement`,
  image: `atonement.jpg`,
  rating: 7.8,
  year: 2007,
  duration: {
    hours: 2,
    minutes: 3
  },
  genres: [`Drama`, `Mystery`, `Romance`],
  description: `Fledgling writer Briony Tallis, as a thirteen-year-old, irrevocably changes the course of several lives when she accuses her older sister's lover of a crime he did not commit.`,
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
  writers: `Ian McEwan, Christopher Hampton`,
  actors: `Keira Knightley, James McAvoy, Brenda Blethyn`,
  country: `USA`
},
{
  name: `The Great Gatsby`,
  image: `the-great-gatsby.jpg`,
  rating: 7.3,
  year: 2013,
  duration: {
    hours: 2,
    minutes: 23
  },
  genres: [`Drama`, `Romance`],
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
  writers: `Baz Luhrmann, Craig Pearce`,
  actors: ` Leonardo DiCaprio, Carey Mulligan, Joel Edgerton`,
  country: `USA`
},
{
  name: `Once Upon a Time ... in Hollywood`,
  image: `once-upon-a-time-in-hollywood.jpg`,
  rating: 8.4,
  year: 2019,
  duration: {
    hours: 2,
    minutes: 41
  },
  genres: [`Comedy`, `Drama`],
  description: `A faded television actor and his stunt double strive to achieve fame and success in the film industry during the final years of Hollywood's Golden Age in 1969 Los Angeles.`,
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
  writers: `Quentin Tarantino`,
  actors: `Leonardo DiCaprio, Brad Pitt, Margot Robbie`,
  country: `USA`
},
{
  name: `Jagten`,
  image: `jagten.jpg`,
  rating: 8.3,
  year: 2013,
  duration: {
    hours: 1,
    minutes: 55
  },
  genres: [`Drama`],
  description: `A teacher lives a lonely life, all the while struggling over his son's custody. His life slowly gets better as he finds love and receives good news from his son, but his new luck is about to be brutally shattered by an innocent little lie.`,
  comments: [],
  isAdded: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  isFavorite: getRandomBoolean(),
  userScore: getRandomNumber(1, 9),
  director: `Thomas Vinterberg`,
  writers: `Tobias Lindholm, Thomas Vinterberg`,
  actors: `Mads Mikkelsen, Thomas Bo Larsen, Annika Wedderkopp`,
  country: `Denmark`
}];

export {films};
