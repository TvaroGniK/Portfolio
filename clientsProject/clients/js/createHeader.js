export const createClientsHeader = () => {
  // create headerElements
  const header = document.createElement('header'),
        container = document.createElement('div'),
        wrap = document.createElement('div'),
        inner = document.createElement('div'),
        logo = document.createElement('a'),
        logoImg  = document.createElement('img'),
        form = document.createElement('form'),
        input = document.createElement('input');


  //add classList
  header.classList.add('header');
  container.classList.add('container-fluid', 'header__container');
  logo.classList.add('logo');
  logoImg.classList.add('logo__img');
  form.classList.add('header__form');
  input.classList.add('header__input');
  wrap.classList.add('header_wrapper');
  inner.classList.add('header__inner');

  // filling content
  logoImg.src = 'img/logo.svg';
  logoImg.alt = 'Логотип ';
  input.placeholder = 'Введите запрос';

  // search clients elements
  const findList = document.createElement('ul');
  findList.classList.add('find-list', 'hide');
  inner.append(input, findList);

  // create DOM
  header.append(container);
  logo.append(logoImg);
  form.append(inner);
  container.append(logo, form);


  return header;
}