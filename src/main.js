import BoardComponent from './components/board.js';
import ProfileComponent from './components/profile.js';
import BoardController from './controllers/board.js';

import {generateFilmCards} from './mock/film-card.js';
import {renderDOMElement, RenderPosition} from './utils.js';

const TASK_COUNT = 15;

const headerElement = document.querySelector(`.header`);
renderDOMElement(headerElement, new ProfileComponent(), RenderPosition.BEFOREEND);

const filmsCards = generateFilmCards(TASK_COUNT);
const mainElement = document.querySelector(`.main`);
const boardComponent = new BoardComponent();
renderDOMElement(mainElement, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent, filmsCards);
boardController.render(filmsCards);

const allFilmCount = document.querySelector(`.footer__statistics`);
allFilmCount.innerHTML = `<p>${filmsCards.length} movies inside</p>`;
