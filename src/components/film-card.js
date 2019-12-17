const allFilmCards = (filmCards) => {
  return filmCards.map((filmCard) => {
    const {filmCardTitle, filmCardRating, filmCardDate, filmCardDurationHours, filmCardDurationMinutes, filmCardGenre, filmCardPoster, filmCardDescription, filmCardComment} = filmCard;

    return (
      `<article class="film-card">
        <h3 class="film-card__title">${filmCardTitle}</h3>
        <p class="film-card__rating">${filmCardRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${filmCardDate.getFullYear()}</span>
          <span class="film-card__duration">${filmCardDurationHours}h ${filmCardDurationMinutes}m</span>
          <span class="film-card__genre">${filmCardGenre.join(`\n`)}</span>
        </p>
        <img src="${filmCardPoster}" alt="" class="film-card__poster">
        <p class="film-card__description">${filmCardDescription}</p>
        <a class="film-card__comments">${filmCardComment.length} комментариев</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
        </form>
      </article>`
    );
  });
};

const createFilmCardTemplate = (filmCards) => {
  return (
    `${allFilmCards(filmCards).join(`\n`)}`
  );
};

const createFilmCardExtraTemplate = (filmCards, title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">
        ${allFilmCards(filmCards).join(`\n`)}
      </div>
    </section>`
  );
};

export {createFilmCardTemplate, createFilmCardExtraTemplate};
