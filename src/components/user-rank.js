const user = {
  rank: ``,
  avatar: `bitmap@2x.png`
};

const getUserRank = (filmsWatched) => {
  if (filmsWatched.length > 0 && filmsWatched.length <= 10) {
    return `Novice`;
  } else if (filmsWatched.length >= 11 && filmsWatched.length <= 20) {
    return `Fan`;
  } else {
    return `Movie buff`;
  }
};

const generateUserRankTemplate = ({rank, avatar}) => {
  const userProfileTemplate =
  `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/${avatar}" alt="Avatar" width="35" height="35">
  </section>`.trim();

  return userProfileTemplate;
};

export {user};
export {getUserRank};
export {generateUserRankTemplate};
