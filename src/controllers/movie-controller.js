import FilmPopupComponent from '../components/film-popup.js';
import FilmCardComponent from '../components/film-card.js';
import {renderDOMElement, RenderPosition} from '../utils.js';

export default class MovieController {
  constructor(container) {
    this._container = container;
  }

  render(filmCard) {
    const filmCardCopy = new FilmCardComponent(filmCard);
    filmCardCopy.setClickFilmCardHandler((evt) => {
      const filmCardPopup = new FilmPopupComponent(filmCard);
      const escKeyDownHandler = () => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
        if (isEscKey) {
          filmCardPopup.getElement().remove();
          filmCardPopup.removeElement();
          document.removeEventListener(`keydown`, escKeyDownHandler);
        }
      };
      if (evt.target === filmCardCopy.getElement().querySelector(`.film-card__poster`) || evt.target === filmCardCopy.getElement().querySelector(`.film-card__title`) || evt.target === filmCardCopy.getElement().querySelector(`.film-card__comments`)) {
        if (filmCardPopup.getElement()) {
          filmCardPopup.getElement().remove();
          filmCardPopup.removeElement();
        }
        renderDOMElement(document.body, filmCardPopup, RenderPosition.BEFOREEND);
        document.addEventListener(`keydown`, escKeyDownHandler);
      }
      filmCardPopup.setClickCloseButtonHandler(() => {
        filmCardPopup.getElement().remove();
        filmCardPopup.removeElement();
        document.removeEventListener(`keydown`, escKeyDownHandler);
      });
    });
    renderDOMElement(this._container, filmCardCopy, RenderPosition.BEFOREEND);
  }
}
