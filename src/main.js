'use strict';

const MAIN_FILMS_COUNT = 5;

const createProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

const createNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

const createFilterTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

const createBoardTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
      </section>
    </section>`
  );
};

const createFilmCardTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">Popeye the Sailor Meets Sindbad the Sailor</h3>
      <p class="film-card__rating">6.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1936</span>
        <span class="film-card__duration">16m</span>
        <span class="film-card__genre">Cartoon</span>
      </p>
      <img src="./images/posters/popeye-meets-sinbad.png" alt="" class="film-card__poster">
      <p class="film-card__description">In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…</p>
      <a class="film-card__comments">0 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
      </form>
    </article>`
  );
};

const createShowMoreButtonElement = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const renderDOMElement = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
renderDOMElement(headerElement, createProfileTemplate());

const mainElement = document.querySelector(`.main`);
renderDOMElement(mainElement, createNavigationTemplate());
renderDOMElement(mainElement, createFilterTemplate());
renderDOMElement(mainElement, createBoardTemplate());

const filmsListElement = mainElement.querySelector(`.films-list`);
const filmsListAllElement = filmsListElement.querySelector(`.films-list__container`);
const mainFilms = new Array(MAIN_FILMS_COUNT);
mainFilms.fill(``).forEach(
    () => renderDOMElement(filmsListAllElement, createFilmCardTemplate())
);
renderDOMElement(filmsListElement, createShowMoreButtonElement());
