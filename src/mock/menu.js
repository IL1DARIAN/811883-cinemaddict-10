const menuNames = [`Watchlist`, `History`, `Favorites`];

export const generateMenu = (filmsCards) => {
  return menuNames.map((it) => {
    let count;
    if (it === `Watchlist`) {
      count = filmsCards.filter((filmCard) => filmCard.isWatchlist).length;
    } else if (it === `History`) {
      count = filmsCards.filter((filmCard) => filmCard.isHistory).length;
    } else if (it === `Favorites`) {
      count = filmsCards.filter((filmCard) => filmCard.isFavorite).length;
    }
    return {
      name: it,
      count
    };
  });
};
