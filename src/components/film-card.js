import {createElement} from '../utils.js';

const allFilmCards = (filmsCards) => {
  return filmsCards.map((filmCard) => {
    const {filmCardTitle, filmCardRating, filmCardDate, filmCardDurationHours, isInWatchlist, isAlreadyWatched, isFavorite, filmCardDurationMinutes, filmCardGenre, filmCardPoster, filmCardDescription, filmCardComments} = filmCard;

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
        <a class="film-card__comments">${filmCardComments.length} комментариев</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isAlreadyWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
        </form>
      </article>`
    );
  });
};

const createFilmCardTemplate = (filmsCards) => {
  return (
    `${allFilmCards(filmsCards).join(`\n`)}`
  );
};

const createFilmCardExtraTemplate = (filmsCards, title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">
        ${allFilmCards(filmsCards).join(`\n`)}
      </div>
    </section>`
  );
};

export default class FilmsCards {
  constructor(filmsCards, title) {
    this._filmsCards = filmsCards;
    this._title = title;
    this._element = null;
  }

  getTemplateAll() {
    return createFilmCardTemplate(this._filmsCards);
  }

  getTemplateExtra() {
    return createFilmCardExtraTemplate(this._filmsCards, this._title);
  }

  getElementAll() {
    if (!this._element) {
      this._element = createElement(this.getTemplateAll());
    }

    return this._element;
  }

  getElementExtra() {
    if (!this._element) {
      this._element = createElement(this.getTemplateExtra());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
