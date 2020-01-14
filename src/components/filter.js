import AbstractComponent from './abstract-component.js';

export const SortType = {
  SORT_DATE: `sort-date`,
  SORT_RATING: `sort-rating`,
  DEFAULT: `default`
};

const createFilterTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.SORT_DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.SORT_RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class Filters extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createFilterTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortTypes = this.getElement().querySelectorAll(`A`);
      sortTypes.forEach((type) => {
        type.classList.remove(`sort__button--active`);
      });
      evt.target.classList.add(`sort__button--active`);
      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
