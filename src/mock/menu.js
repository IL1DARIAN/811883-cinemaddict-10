const menuNames = [`Watchlist`, `History`, `Favorites`];

export const generateMenu = (filmCards) => {
  return menuNames.map((it) => {
    if (it === `Watchlist`) {
      const count = filmCards.filter(filmCard => filmCard.filmCardUserRating).length;
      return {
        name: it,
        count
      };
    } else if (it === `History`) {
      const count = filmCards.filter(filmCard => filmCard.filmCardUserRating <= 6 && filmCard.filmCardUserRating > 0).length;
      return {
        name: it,
        count
      }
    } else if (it === `Favorites`) {
      const count = filmCards.filter(filmCard => filmCard.filmCardUserRating > 6).length;
      return {
        name: it,
        count
      }
    }
  });
};
