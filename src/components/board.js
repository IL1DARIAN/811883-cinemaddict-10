import AbstractComponent from './abstract-component.js';

const createBoardTemplate = () => {
  return (
    `<section class="board-controller"></section>`
  );

};

export default class Board extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createBoardTemplate();
  }
}
