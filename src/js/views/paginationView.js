import View from './View.js';
import icons from 'url:../../img/icons.svg'; //Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkUpButtons(direction) {
    const svg = `<svg class="search__icon">
      <use href="${icons}#icon-arrow-${
      direction === `next` ? `right` : `left`
    }"></use>
        </svg>`;

    const beginning = `<button data-goto="${
      direction === `next` ? this._data.page + 1 : this._data.page - 1
    }" class="btn--inline pagination__btn--${
      direction === `next` ? `next` : `prev`
    }">`;

    const ending = `</button>`;

    const span = `<span>Page ${
      direction === `next` ? this._data.page + 1 : this._data.page - 1
    }</span>`;

    const output =
      beginning + (direction === 'prev' ? svg + span : span + svg) + ending;

    return output;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkUpButtons('next');
    }

    //Last page
    if (curPage === numPages && curPage > 1) {
      return this._generateMarkUpButtons('prev');
    }
    //Other Pages
    if (curPage < numPages && curPage > 1) {
      return (
        this._generateMarkUpButtons('prev') +
        this._generateMarkUpButtons('next')
      );
    }

    //Page 1 and there are NO other pages
    if (numPages === 1) {
      return '';
    }
  }
}

export default new PaginationView();
