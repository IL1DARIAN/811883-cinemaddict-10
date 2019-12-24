import SiteMenuComponent from './components/navigation.js';
import BoardComponent from './components/board.js';
import FiltersComponent from './components/filter.js';
import ProfileComponent from './components/profile.js';
import FilmsCardsComponent from './components/film-card.js';
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

const mainElement = document.querySelector(`.main`);
renderDOMElement(mainElement, new SiteMenuComponent(generateMenu(filmsCards)).getElement(), RenderPosition.BEFOREEND);
renderDOMElement(mainElement, new FiltersComponent().getElement(), RenderPosition.BEFOREEND);
renderDOMElement(mainElement, new BoardComponent().getElement(), RenderPosition.BEFOREEND);

const filmsListElement = mainElement.querySelector(`.films`);
const filmsListAllElement = filmsListElement.querySelector(`.films-list`);
const allFilmsContainer = filmsListAllElement.querySelector(`.films-list__container`);
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

renderDOMElement(allFilmsContainer, new FilmsCardsComponent(filmsCards.slice(0, showingTasksCount)).getElementAll(), RenderPosition.BEFOREEND);

renderDOMElement(filmsListAllElement, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  renderDOMElement(allFilmsContainer, new FilmsCardsComponent(filmsCards.slice(prevTasksCount, showingTasksCount)).getElementAll(), RenderPosition.BEFOREEND);

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

renderDOMElement(filmsListElement, new FilmsCardsComponent(getTopRatedFilms(filmsCards).slice(0, 2), `Top rated`).getElementExtra(), RenderPosition.BEFOREEND);
renderDOMElement(filmsListElement, new FilmsCardsComponent(getMostComentedFilms(filmsCards).slice(0, 2), `Most comented`).getElementExtra(), RenderPosition.BEFOREEND);

renderDOMElement(document.body, new FilmPopupComponent(filmsCards[0]).getElement(), RenderPosition.BEFOREEND);

const allFilmCount = document.querySelector(`.footer__statistics`);
allFilmCount.innerHTML = `<p>${filmsCards.length} movies inside</p>`;
