import SiteMenuComponent from './components/navigation.js';
import BoardComponent from './components/board.js';
import FiltersComponent from './components/filter.js';
import ProfileComponent from './components/profile.js';
import FilmCardComponent from './components/film-card.js';
import FilmsExtraComponents from './components/film-extra.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import FilmPopupComponent from './components/film-popup.js';

import {generateFilmCards} from './mock/film-card.js';
import {generateMenu} from './mock/menu.js';
import {renderDOMElement, RenderPosition} from './utils.js';

const TASK_COUNT = 15;
const SHOWING_TASKS_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

const headerElement = document.querySelector(`.header`);
renderDOMElement(headerElement, new ProfileComponent().getElement(), RenderPosition.BEFOREEND);

const filmsCards = generateFilmCards(TASK_COUNT);
const renderFilmCard = (filmCard) => {
  const filmCardCopy = new FilmCardComponent(filmCard);
  const filmCardPopup = new FilmPopupComponent(filmCard);

  filmCardCopy.getElement().addEventListener(`click`, () => {
    filmCardPopup.removeElement();
    renderDOMElement(document.body, filmCardPopup.getElement(), RenderPosition.BEFOREEND);
  });

  filmCardPopup.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    filmCardPopup.removeElement();
  });

  renderDOMElement(allFilmsContainer, filmCardCopy.getElement(), RenderPosition.BEFOREEND);
};

const mainElement = document.querySelector(`.main`);
renderDOMElement(mainElement, new SiteMenuComponent(generateMenu(filmsCards)).getElement(), RenderPosition.BEFOREEND);
renderDOMElement(mainElement, new FiltersComponent().getElement(), RenderPosition.BEFOREEND);
renderDOMElement(mainElement, new BoardComponent().getElement(), RenderPosition.BEFOREEND);

const filmsListElement = mainElement.querySelector(`.films`);
const filmsListAllElement = filmsListElement.querySelector(`.films-list`);
const allFilmsContainer = filmsListAllElement.querySelector(`.films-list__container`);
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

filmsCards.slice(0, showingTasksCount).map((filmCard) => {
  renderFilmCard(filmCard);
});

renderDOMElement(filmsListAllElement, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  filmsCards.slice(prevTasksCount, showingTasksCount).map((filmCard) => {
    renderFilmCard(filmCard);
  });

  if (showingTasksCount >= filmsCards.length) {
    showMoreButton.remove();
  }
});

const getTopRatedFilms = (array) => {
  return [...array].sort((a, b) => {
    return b.filmCardRating - a.filmCardRating;
  });
};

const getMostComentedFilms = (array) => {
  return [...array].sort((a, b) => {
    return b.filmCardComments.length - a.filmCardComments.length;
  });
};

const topRatedFilmsCardsComponents = getTopRatedFilms(filmsCards).slice(0, 2).map((filmCard) => {
  return new FilmCardComponent(filmCard);
});

const mostComentedFilmsCardsComponents = getMostComentedFilms(filmsCards).slice(0, 2).map((filmCard) => {
  return new FilmCardComponent(filmCard);
});

const topRated = new FilmsExtraComponents(`Top rated`);
const mostComented = new FilmsExtraComponents(`Most comented`);

renderDOMElement(filmsListElement, topRated.getElement(), RenderPosition.BEFOREEND);
renderDOMElement(filmsListElement, mostComented.getElement(), RenderPosition.BEFOREEND);

const topRatedElement = topRated.getElement().querySelector(`.films-list__container`);
const mostComentedElement = mostComented.getElement().querySelector(`.films-list__container`);

topRatedFilmsCardsComponents.map((DOMElement) => {
  renderDOMElement(topRatedElement, DOMElement.getElement(), RenderPosition.BEFOREEND);
});

mostComentedFilmsCardsComponents.map((DOMElement) => {
  renderDOMElement(mostComentedElement, DOMElement.getElement(), RenderPosition.BEFOREEND);
});

//renderDOMElement(document.body, new FilmPopupComponent(filmsCards[0]).getElement(), RenderPosition.BEFOREEND);

const allFilmCount = document.querySelector(`.footer__statistics`);
allFilmCount.innerHTML = `<p>${filmsCards.length} movies inside</p>`;
