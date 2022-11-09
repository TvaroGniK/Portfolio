function createHeader() {
  const header = document.createElement('header');
  header.classList.add('header');
  const headerTitle = document.createElement('h1');
  headerTitle.classList.add('header__title');
  const headerLink = document.createElement('a');
  headerLink.classList.add('header__link');
  // headerLink.setAttribute('href', '/index.html');
  headerLink.href = `/index.html`;
  headerLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.go(-1)
  })
  headerLink.textContent = 'STAR WARS';
  headerTitle.append(headerLink);
  header.append(headerTitle);
  return header;
}

export function createHeaderWrapper() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('header-wrapper');
  wrapper.append(createHeader());
  return wrapper;
}