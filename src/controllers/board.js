import FilmPopupComponent from '../components/film-popup.js';
import FilmCardComponent from '../components/film-card.js';
import FilmsExtraComponents from '../components/film-extra.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import BoardComponent from '../components/board.js';
import {renderDOMElement, RenderPosition, remove} from '../utils.js';

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

export default class BoardController {

}
