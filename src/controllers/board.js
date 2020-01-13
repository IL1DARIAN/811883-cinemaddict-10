import FilmPopupComponent from '../components/film-popup.js';
import FilmCardComponent from '../components/film-card.js';
import FilmsExtraComponents from '../components/film-extra.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import NoFilmsComponent from '../components/no-films.js';
import FilmsContainerComponent from '../components/films-container.js';
import SiteMenuComponent from '../components/navigation.js';
import FiltersComponent from '../components/filter.js';
import {renderDOMElement, RenderPosition, remove} from '../utils.js';
import {generateMenu} from '../mock/menu.js';

const SHOWING_TASKS_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

const renderFilmCard = (filmCard, filmsContainer) => {
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

  renderDOMElement(filmsContainer, filmCardCopy, RenderPosition.BEFOREEND);
};

export default class BoardController {
  constructor(container, array) {
    this._container = container;
    this._siteMenuComponent = new SiteMenuComponent(generateMenu(array));
    this._sortingComponent = new FiltersComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._filmsExtraTopRated = new FilmsExtraComponents(`Top rated`);
    this._filmsExtraMostComented = new FilmsExtraComponents(`Most comented`);
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(filmsCards) {
    const container = this._container.getElement();
    renderDOMElement(container, this._siteMenuComponent, RenderPosition.BEFOREEND);
    if (filmsCards.length === 0) {
      renderDOMElement(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }
    renderDOMElement(container, this._sortingComponent, RenderPosition.BEFOREEND);
    renderDOMElement(container, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    const filmsListAllElement = this._filmsContainerComponent.getElement().querySelector(`.films-list`);
    const allFilmsContainer = this._filmsContainerComponent.getElement().querySelector(`.films-list__container`);
    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    filmsCards.slice(0, showingTasksCount).map((filmCard) => {
      renderFilmCard(filmCard, allFilmsContainer);
    });
    renderDOMElement(filmsListAllElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      filmsCards.slice(prevTasksCount, showingTasksCount).map((filmCard) => {
        renderFilmCard(filmCard, allFilmsContainer);
      });

      if (showingTasksCount >= filmsCards.length) {
        remove(this._showMoreButtonComponent);
      }
    });
    const getTopRatedFilms = (films) => {
      return [...films].sort((film1, film2) => {
        return film2.filmCardRating - film1.filmCardRating;
      });
    };

    const getMostComentedFilms = (films) => {
      return [...films].sort((film1, film2) => {
        return film2.filmCardComments.length - film1.filmCardComments.length;
      });
    };

    renderDOMElement(this._filmsContainerComponent.getElement(), this._filmsExtraTopRated, RenderPosition.BEFOREEND);
    renderDOMElement(this._filmsContainerComponent.getElement(), this._filmsExtraMostComented, RenderPosition.BEFOREEND);

    getTopRatedFilms(filmsCards).slice(0, 2).map((filmCard) => {
      renderFilmCard(filmCard, this._filmsExtraTopRated.getElement().querySelector(`.films-list__container`));
    });
    getMostComentedFilms(filmsCards).slice(0, 2).map((filmCard) => {
      renderFilmCard(filmCard, this._filmsExtraMostComented.getElement().querySelector(`.films-list__container`));
    });
  }
}
