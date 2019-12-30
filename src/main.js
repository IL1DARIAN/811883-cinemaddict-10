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
renderDOMElement(headerElement, new ProfileComponent(), RenderPosition.BEFOREEND);

const filmsCards = generateFilmCards(TASK_COUNT);
const renderFilmCard = (filmCard) => {
  const filmCardCopy = new FilmCardComponent(filmCard);
  const filmCardPopup = new FilmPopupComponent(filmCard);

  filmCardCopy.setClickFilmCardHandler((evt) => {
    if (evt.target === filmCardCopy.getElement().querySelector(`.film-card__poster`) || evt.target === filmCardCopy.getElement().querySelector(`.film-card__title`) || evt.target === filmCardCopy.getElement().querySelector(`.film-card__comments`)) {
      if (filmCardPopup.getElement()) {
        filmCardPopup.getElement().remove();
      }
      renderDOMElement(document.body, filmCardPopup, RenderPosition.BEFOREEND);
    }
  });

  filmCardPopup.setClickCloseButtonHandler(() => {
    filmCardPopup.getElement().remove();
  });

  renderDOMElement(allFilmsContainer, filmCardCopy, RenderPosition.BEFOREEND);
};

const mainElement = document.querySelector(`.main`);
renderDOMElement(mainElement, new SiteMenuComponent(generateMenu(filmsCards)), RenderPosition.BEFOREEND);
renderDOMElement(mainElement, new FiltersComponent(), RenderPosition.BEFOREEND);
renderDOMElement(mainElement, new BoardComponent(), RenderPosition.BEFOREEND);

const filmsListElement = mainElement.querySelector(`.films`);
const filmsListAllElement = filmsListElement.querySelector(`.films-list`);
const allFilmsContainer = filmsListAllElement.querySelector(`.films-list__container`);
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

filmsCards.slice(0, showingTasksCount).map((filmCard) => {
  renderFilmCard(filmCard);
});

const showMoreButtonComponent = new ShowMoreButtonComponent();
renderDOMElement(filmsListAllElement, showMoreButtonComponent, RenderPosition.BEFOREEND);

showMoreButtonComponent.setClickHandler(() => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  filmsCards.slice(prevTasksCount, showingTasksCount).map((filmCard) => {
    renderFilmCard(filmCard);
  });

  if (showingTasksCount >= filmsCards.length) {
    showMoreButtonComponent.getElement().remove();
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

const topRated = new FilmsExtraComponents(`Top rated`);
const mostComented = new FilmsExtraComponents(`Most comented`);

renderDOMElement(filmsListElement, topRated, RenderPosition.BEFOREEND);
renderDOMElement(filmsListElement, mostComented, RenderPosition.BEFOREEND);

const renderTopRatedCard = (filmCard) => {
  const filmCardCopy = new FilmCardComponent(filmCard);
  const filmCardPopup = new FilmPopupComponent(filmCard);

  filmCardCopy.setClickFilmCardHandler((evt) => {
    if (evt.target === filmCardCopy.getElement().querySelector(`.film-card__poster`) || evt.target === filmCardCopy.getElement().querySelector(`.film-card__title`) || evt.target === filmCardCopy.getElement().querySelector(`.film-card__comments`)) {
      if (filmCardPopup.getElement()) {
        filmCardPopup.getElement().remove();
      }
      renderDOMElement(document.body, filmCardPopup, RenderPosition.BEFOREEND);
    }
  });

  filmCardPopup.setClickCloseButtonHandler(() => {
    filmCardPopup.getElement().remove();
  });

  renderDOMElement(topRated.getElement().querySelector(`.films-list__container`), filmCardCopy, RenderPosition.BEFOREEND);
};

getTopRatedFilms(filmsCards).slice(0, 2).map((filmCard) => {
  renderTopRatedCard(filmCard);
});

const renderMostComentedCard = (filmCard) => {
  const filmCardCopy = new FilmCardComponent(filmCard);
  const filmCardPopup = new FilmPopupComponent(filmCard);

  filmCardCopy.setClickFilmCardHandler((evt) => {
    if (evt.target === filmCardCopy.getElement().querySelector(`.film-card__poster`) || evt.target === filmCardCopy.getElement().querySelector(`.film-card__title`) || evt.target === filmCardCopy.getElement().querySelector(`.film-card__comments`)) {
      if (filmCardPopup.getElement()) {
        filmCardPopup.getElement().remove();
      }
      renderDOMElement(document.body, filmCardPopup, RenderPosition.BEFOREEND);
    }
  });

  filmCardPopup.setClickCloseButtonHandler(() => {
    filmCardPopup.getElement().remove();
  });

  renderDOMElement(mostComented.getElement().querySelector(`.films-list__container`), filmCardCopy, RenderPosition.BEFOREEND);
};

getMostComentedFilms(filmsCards).slice(0, 2).map((filmCard) => {
  renderMostComentedCard(filmCard);
});

const allFilmCount = document.querySelector(`.footer__statistics`);
allFilmCount.innerHTML = `<p>${filmsCards.length} movies inside</p>`;
