import {createBoardTemplate} from './components/board.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmPopupTemplate} from './components/film-popup.js';
import {createFilterTemplate} from './components/filter.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createProfileTemplate} from './components/profile.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {generateFilmCards} from './mock/film-card.js';

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

const filmCards = generateFilmCards(15);
filmsListElements.forEach(
    (element) => {
      if (element.parentNode.classList.contains(`films-list`)) {
        filmCards.forEach(
            (filmCard) => renderDOMElement(element, createFilmCardTemplate(filmCard))
        );
      } else if (element.parentNode.classList.contains(`films-list--extra`)) {
        filmCards.forEach(
            (filmCard) => renderDOMElement(element, createFilmCardTemplate(filmCard))
        );
      }
    }
);

renderDOMElement(filmsListAllElement, createShowMoreButtonTemplate());
renderDOMElement(document.body, createFilmPopupTemplate(filmCards[0]));
