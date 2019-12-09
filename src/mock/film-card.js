const FilmsName = [`Стрела`, `Флэш`, `Железный человек`, `Мстители`, `Капитан Марвел`, `Агент Картер`, `Агенты ЩИТ`, `Сверхъестественное`, `Мастера меча`, `Тетрадь смерти`, `Блич`, `Маска`, `Ходячие мертвецы`, `Алдноа Зеро`, `Темнее черного`];

const Description = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
`Cras aliquet varius magna, non porta ligula feugiat eget.`,
`Fusce tristique felis at fermentum pharetra.`,
`Aliquam id orci ut lectus varius viverra.`,
`Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
`Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
`Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
`Sed sed nisi sed augue convallis suscipit in sed felis.`,
`Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];

const Posters = ['./images/posters/popeye-meets-sinbad.png',
'./images/posters/made-for-each-other.png',
'./images/posters/sagebrush-trail.jpg',
'./images/posters/santa-claus-conquers-the-martians.jpg',
'./images/posters/the-dance-of-life.jpg',
'./images/posters/the-great-flamarion.jpg',
'./images/posters/the-man-with-the-golden-arm.jpg'];

const Genres = [`Мультфильм`, `Ужасы`, `Фэнтези`, `Триллер`, `Комедия`, `Боевик`, `Пародия`];

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length-1);

  return array[randomIndex];
};

const shuffle = (array) => {
  let step;
  let tempoparyVariable;
  for (let i = array.length - 1; i > 0; i--) {
    step = Math.floor(Math.random() * (i + 1));
    tempoparyVariable = array[step];
    array[step] = array[i];
    array[i] = tempoparyVariable;
  }
  return array;
};

const generateFilmCard = () => {
  return {
    filmCardTitle: getRandomArrayItem(FilmsName),
    filmCardRating: getRandomIntegerNumber(0, 10),
    filmCardYear: getRandomIntegerNumber(1960, 2019),
    filmCardDurationHours: getRandomIntegerNumber(1, 2),
    filmCardDurationMinutes: getRandomIntegerNumber(0, 59),
    filmCardGenre: getRandomArrayItem(Genres),
    filmCardPoster: getRandomArrayItem(Posters),
    filmCardDescription: shuffle(Description).slice(0,3).join(`\n`),
    filmCardComment: getRandomIntegerNumber(0, 50)
  };
};

const generateFilmCards = (count) => {
  return new Array(count).fill(``).map(generateFilmCard);
};

export {generateFilmCard, generateFilmCards};
