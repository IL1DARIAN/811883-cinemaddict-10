import {createBoardTemplate} from './components/board.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmPopupTemplate} from './components/film-popup.js';
import {createFilterTemplate} from './components/filter.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createProfileTemplate} from './components/profile.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';

const MAIN_FILMS_COUNT = 5;
const POPULAR_FILMS_COUNT = 2;

const renderDOMElement = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
renderDOMElement(headerElement, createProfileTemplate());

const mainElement = document.querySelector(`.main`);
renderDOMElement(mainElement, createNavigationTemplate());
renderDOMElement(mainElement, createFilterTemplate());
renderDOMElement(mainElement, createBoardTemplate());

const filmsListAllElement = mainElement.querySelector(`.films-list`);
const filmsListElements = mainElement.querySelectorAll(`.films-list__container`);
filmsListElements.forEach(
    (element) => {
      if (element.parentNode.classList.contains(`films-list`)) {
        const mainFilms = new Array(MAIN_FILMS_COUNT);
        mainFilms.fill(``).forEach(
            () => renderDOMElement(element, createFilmCardTemplate())
        );
      } else if (element.parentNode.classList.contains(`films-list--extra`)) {
        const mainFilms = new Array(POPULAR_FILMS_COUNT);
        mainFilms.fill(``).forEach(
            () => renderDOMElement(element, createFilmCardTemplate())
        );
      }
    }
);

renderDOMElement(filmsListAllElement, createShowMoreButtonTemplate());
renderDOMElement(document.body, createFilmPopupTemplate());
