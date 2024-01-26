import axios from 'axios';

const FILTER_IMG_CONTAINER = document.querySelector(
  '.exersizes-cards-container'
);
let filter = 'Muscles';
let page = 1;
let parameters = {
  params: {
    filter: filter,
    page: page,
    limit: 12,
  },
};

const filterListener = document.querySelector('.exersizes-list');
const paginationListener = document.querySelector('.exersizes-paginftion-list');
const paginftionBtn = document.querySelector('.exersizes-pagination-btn');

// ============ Запуск фільтрації при завантаженні сторінки ============

document.addEventListener('DOMContentLoaded', filterFetch(parameters));

// ============ Запуск фільтрації при кліку на кнопку ============

filterListener.addEventListener('click', e => {
  e.preventDefault();
  if (!e.target.nodeName === 'BUTTON') {
    return;
  }
  filter = encodeURIComponent(e.target.value);
  console.log(filter);
  parameters = {
    params: {
      filter: filter,
      page: page,
      limit: 12,
    },
  };
  filterFetch(parameters);

  // fetchExersizes(parameters);
});

// ============ Запуск фільтрації при кліку на загальну картку ============

FILTER_IMG_CONTAINER.addEventListener('click', e => {});

paginationListener.addEventListener('click', e => {
  e.preventDefault();

  if (paginftionBtn) {
    page = e.target.textContent;
  }
});

filterListener.addEventListener('click', e => {
  e.preventDefault();
  if (!e.target.nodeName === 'BUTTON') {
    return;
  }

  filter = e.target.textContent;
  parameters = {
    params: {
      filter: filter,
      page: page,
      limit: 12,
    },
  };
  fetchExersizes(parameters);
});

async function fetchExersizes() {
  // axios.defaults.baseURL = '<https://energyflow.b.goit.study/api>';

  return parameters;
}

//  ===================== Запрос по фільтру  =====================

async function filterFetch(params, e) {
  // const response = await axios.get(
  //   'https://energyflow.b.goit.study/api/filters',
  //   params
  // );

  // try {
  //   if (response.data.results.length === 0) {
  //     throw new Error('No results found...');
  //   }
  //   renderFilterImg(response);
  //   console.log(response);
  // } catch (error) {
  //   console.log(error);
  //   renderMessage();
  // }

  const response = await fetch(
    `https://energyflow.b.goit.study/api/filters?filter=${filter}&page=1&limit=12`
  )
    .then(response => {
      return response.json();
    })
    .then(api => {
      if (response.data.results.length === 0) {
        throw new Error(
          `There are no images matching your search query. Please try again!`
        );
      }
    })
    .catch(error => {
      console.log(error);
    });
}

//  ===================== Вставлення карток по фільтру =====================

async function renderFilterImg(resp) {
  const results = resp.data.results;
  FILTER_IMG_CONTAINER.style.display = 'flex';
  FILTER_IMG_CONTAINER.innerHTML = '';
  const markup = results
    .map(el => {
      return `<div class="exersizes-card-bytype" style="background: linear-gradient(
    0deg,
    rgba(16, 16, 16, 0.7) 0%,
    rgba(16, 16, 16, 0.7) 100%
  ), url(${el.imgUrl}) center center no-repeat; background-size: cover;">
        <h3 class="exersizes-card-bytype-header">
          ${el.name[0].toUpperCase() + el.name.slice(1)}
        </h3>
        <p class="exersizes-card-bytype-text">${el.filter}</p>
      </div>`;
    })
    .join('');
  FILTER_IMG_CONTAINER.insertAdjacentHTML('beforeend', markup);
}

async function renderMessage() {
  FILTER_IMG_CONTAINER.style.display = 'none';
  const MESSAGE_CONTAINER = document.querySelector(
    '.exersizes-message-container'
  );
  MESSAGE_CONTAINER.innerHTML = '';
  const markupMessage = `<p class="noresult-message" >Unfortunately, <em class="span-strong">no results</em> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</p>`;

  MESSAGE_CONTAINER.insertAdjacentHTML('beforeend', markupMessage);
}
