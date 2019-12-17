const menuNames = [`Watchlist`, `History`, `Favorites`];

export const generateMenu = (filmCards) => {
  return menuNames.map((it) => {
    let count;
    if (it === `Watchlist`) {
      count = filmCards.filter((filmCard) => filmCard.filmCardUserRating).length;
    } else if (it === `History`) {
      count = filmCards.filter((filmCard) => filmCard.filmCardUserRating <= 6 && filmCard.filmCardUserRating > 0).length;
    } else if (it === `Favorites`) {
      count = filmCards.filter((filmCard) => filmCard.filmCardUserRating > 6).length;
    }
    return {
      name: it,
      count
    };
  });
};
