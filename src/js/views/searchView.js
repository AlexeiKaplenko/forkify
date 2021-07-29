import View from './View.js';
class searchView extends View {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    console.log('query', query);
    this._clear();
    return query;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
    //   [('change', 'load')].forEach(ev => window.addEventListener(ev, handler));
  }

  _clear() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new searchView();
