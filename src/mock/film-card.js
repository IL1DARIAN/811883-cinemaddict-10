const FilmNames = [
  {filmName: `Стрела`, filmOriginalName: `Arrow`},
  {filmName: `Флэш`, filmOriginalName: `Flash`},
  {filmName: `Железный человек`, filmOriginalName: `IRON MAN`},
  {filmName: `Мстители`, filmOriginalName: `Avengers`},
  {filmName: `Капитан Марвел`, filmOriginalName: `Captain Marvel`},
  {filmName: `Агент Картер`, filmOriginalName: `Agent Carter`},
  {filmName: `Агенты ЩИТ`, filmOriginalName: `Agents of S.H.I.E.L.D.`},
  {filmName: `Сверхъестественное`, filmOriginalName: `Supernatural`},
  {filmName: `Мастера меча`, filmOriginalName: `Sword Art Online`},
  {filmName: `Тетрадь смерти`, filmOriginalName: `Death note`},
  {filmName: `Блич`, filmOriginalName: `Bleach`},
  {filmName: `Маска`, filmOriginalName: `Mask`},
  {filmName: `Ходячие мертвецы`, filmOriginalName: `The Walking Dead`},
  {filmName: `Алдноа Зеро`, filmOriginalName: `Aldnoa Zero`},
  {filmName: `Темнее черного`, filmOriginalName: `Darker than black`}
];

const producers = [`Роджер Земекис`, `Кристофер Нолан`, `Зак Брафф`, `Питер Джексон`, `Джордж Дукас`, `Стивен Спилберг`, `Сильвестр Сталлоне`, `М.Найт Шьямалан`, `Квентин Тарантино`, `Никита Михалков`];

const actors = [`Стивен Аммел`, `Грант Гастингс`, `Анджелина Джоли`, `Микки Рурк`, `Роберт Дауни Младший`, `Роберт ДеНиро`, `Бредли Купер`, `Кристин Кройк`, `Агния Дитковските`, `Владимир Машков`];

const screenwriters = [`Хаяо Миядзаки`, `Билли Уайлдер`, `Роберт Таун`, `Фрэнсис Форд Коппола`, `Вуди Аллен`, `Джон Карпентер`];

const countries = [`США`, `Великобритания`, `Россия`, `Япония`, `Франция`];

const ageRating = [`0+`, `8+`, `12+`, `16+`, `18+`];

const Description = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];

const Posters = [`./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/made-for-each-other.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`];

const Genres = [`Мультфильм`, `Ужасы`, `Фэнтези`, `Триллер`, `Комедия`, `Боевик`, `Пародия`];

const UserEmojies = [`./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`,
  `./images/emoji/trophy.png`
];

const UserNames = [`Сара Конор`, `Вася Лопухов`, `Джон Малкович`, `Алина Звездова`, `Рюрик Рюрикович`, `Иван Грозный`];

const UserCommentDates = [`3 дня назад`, `2 дня назад`, `Вчера`, `Сегодня`];

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

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
  const {filmName, filmOriginalName} = getRandomArrayItem(FilmNames);
  const filmCardDate = new Date(getRandomIntegerNumber(1960, 2019), getRandomIntegerNumber(0, 11), getRandomIntegerNumber(1, 28));
  const filmCardComment = new Array(getRandomIntegerNumber(0, 10)).fill(``).map(() => {
    return {
      commentUserEmoji: getRandomArrayItem(UserEmojies),
      commentDescription: getRandomArrayItem(Description),
      commentUserName: getRandomArrayItem(UserNames),
      commentDate: getRandomArrayItem(UserCommentDates)
    };
  });
  const filmCardUserRating = Math.random() > 0.5 ? getRandomIntegerNumber(1, 9) : 0;
  return {
    filmCardTitle: filmName,
    filmCardOriginalName: filmOriginalName,
    filmCardRating: getRandomIntegerNumber(0, 10),
    filmCardUserRating,
    filmCardProducer: getRandomArrayItem(producers),
    filmCardScreenwriter: shuffle(screenwriters).slice(0, getRandomIntegerNumber(1, 2)).join(`,\n`),
    filmCardActor: shuffle(actors).slice(0, getRandomIntegerNumber(1, 4)).join(`,\n`),
    filmCardDate,
    filmCardDurationHours: getRandomIntegerNumber(1, 2),
    filmCardDurationMinutes: getRandomIntegerNumber(0, 59),
    filmCardGenre: shuffle(Genres).slice(0, getRandomIntegerNumber(1, 3)),
    filmCardPoster: getRandomArrayItem(Posters),
    filmCardCountry: shuffle(countries).slice(0, getRandomIntegerNumber(1, 3)).join(`,\n`),
    filmCardDescription: shuffle(Description).slice(0, 3).join(`\n`),
    filmCardAgeRating: getRandomArrayItem(ageRating),
    filmCardComment
  };
};

const generateFilmCards = (count) => {
  return new Array(count).fill(``).map(generateFilmCard);
};

export {generateFilmCard, generateFilmCards};
