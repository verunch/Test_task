import '../scss/main.scss'
import { initDatepickers } from './datepicker.js'
import { initNumberSelects } from './number-select.js'
import { initReviewsToggles, initReviewsSlider } from './reviews.js'
import { initSearchForm } from './search-form.js'

const burger = document.querySelector('[data-header-burger]')
const nav = document.querySelector('[data-header-nav]')

if (burger && nav) {
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('header__nav--open')
    burger.setAttribute('aria-expanded', String(isOpen))
  })
}

initDatepickers()
initNumberSelects()
initReviewsToggles()
initReviewsSlider()
initSearchForm()
