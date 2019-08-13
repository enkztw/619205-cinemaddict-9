const user = {
  rating: `Movie Buff`,
  avatar: `bitmap@2x.png`
};

const generateUserProfileTemplate = ({rating, avatar}) => {
  const userProfileTemplate =
  `<section class="header__profile profile">
    <p class="profile__rating">${rating}</p>
    <img class="profile__avatar" src="images/${avatar}" alt="Avatar" width="35" height="35">
  </section>`.trim();

  return userProfileTemplate;
};

export {user};
export {generateUserProfileTemplate};
