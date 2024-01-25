import axios from 'axios';

let filter;
let page = 1;

const parameters = {
  params: {
    filter: filter,
    page: page,
    _limit: 12,
  },
};

axios.defaults.baseURL = '<https://energyflow.b.goit.study/api>';

function filterring() {
  filter = document
    .querySelector('.exersizes-list')
    .addEventListener('click', e => {
      e.preventDefault();

      // if (!e.currentTarget.nodeName === 'BUTTON') {
      //   return;
      // }
      filter = encodeURIComponent(e.currentTarget.value);
    });
  console.log(filter);
}

filterring();
