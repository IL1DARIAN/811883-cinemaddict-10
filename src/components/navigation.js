import AbstractComponent from './abstract-component.js';

const createNavigationTemplate = (menuNames) => {
  const menuCountNames = menuNames.map((menuName) => {
    const {name, count} = menuName;
    return `<a href="#${name.toLowerCase()}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`;
  });

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${menuCountNames.join(`\n`)}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenu extends AbstractComponent {
  constructor(menuNames) {
    super();
    this._menuNames = menuNames;
  }

  getTemplate() {
    return createNavigationTemplate(this._menuNames);
  }
}
