import {createBoardTemplate} from './components/board.js';
import {createFilmCardTemplate, createFilmCardExtraTemplate} from './components/film-card.js';
import {createFilmPopupTemplate} from './components/film-popup.js';
import {createFilterTemplate} from './components/filter.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createProfileTemplate} from './components/profile.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {generateFilmCards} from './mock/film-card.js';
import {generateMenu} from './mock/menu.js';

const TASK_COUNT = 15;
const SHOWING_TASKS_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

const renderDOMElement = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
renderDOMElement(headerElement, createProfileTemplate());

const filmCards = generateFilmCards(TASK_COUNT);

const mainElement = document.querySelector(`.main`);
renderDOMElement(mainElement, createNavigationTemplate(generateMenu(filmCards)));
renderDOMElement(mainElement, createFilterTemplate());
renderDOMElement(mainElement, createBoardTemplate());

const filmsListElement = mainElement.querySelector(`.films`);
const filmsListAllElement = filmsListElement.querySelector(`.films-list`);
const allFilmsContainer = filmsListAllElement.querySelector(`.films-list__container`);
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

renderDOMElement(allFilmsContainer, createFilmCardTemplate(filmCards.slice(0, showingTasksCount)));

renderDOMElement(filmsListAllElement, createShowMoreButtonTemplate());

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  renderDOMElement(allFilmsContainer, createFilmCardTemplate(filmCards.slice(prevTasksCount, showingTasksCount)));

  if (showingTasksCount >= filmCards.length) {
    showMoreButton.remove();
  }
});

const topRatedFilms = (array) => {
  return array.sort((a, b) => {
    return b.filmCardRating - a.filmCardRating;
  });
};

const mostComentedFilms = (array) => {
  return array.sort((a, b) => {
    return b.filmCardComment.length - a.filmCardComment.length;
  });
};

renderDOMElement(filmsListElement, createFilmCardExtraTemplate(topRatedFilms(filmCards).slice(0, 2), `Top rated`));
renderDOMElement(filmsListElement, createFilmCardExtraTemplate(mostComentedFilms(filmCards).slice(0, 2), `Most comented`));

renderDOMElement(document.body, createFilmPopupTemplate(filmCards[0]));

const allFilmCount = document.querySelector(`.footer__statistics`);
allFilmCount.innerHTML = `<p>${filmCards.length} movies inside</p>`;
