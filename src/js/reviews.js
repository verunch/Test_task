export function initReviewsToggles() {
  document.querySelectorAll('[data-reviews-toggle]').forEach((button) => {
    const card = button.closest('.reviews__card')
    const text = card?.querySelector('[data-reviews-text]')
    if (!text) return

    const isOverflowing = text.scrollHeight > text.clientHeight + 1

    if (!isOverflowing) {
      const placeholder = document.createElement('div')
      placeholder.className = 'reviews__toggle-placeholder'
      placeholder.style.height = `${button.offsetHeight}px`
      placeholder.style.marginTop = getComputedStyle(button).marginTop
      button.replaceWith(placeholder)
      return
    }

    button.classList.remove('reviews__toggle--hidden')

    button.addEventListener('click', () => {
      const isExpanded = text.classList.toggle('reviews__text--expanded')
      button.textContent = isExpanded ? 'свернуть' : 'далее...'
    })
  })
}

export function initReviewsSlider() {
  const viewport = document.querySelector('[data-reviews-viewport]')
  const prevButton = document.querySelector('[data-reviews-prev]')
  const nextButton = document.querySelector('[data-reviews-next]')
  if (!viewport || !prevButton || !nextButton) return

  const updateNavState = () => {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth
    prevButton.disabled = viewport.scrollLeft <= 0
    nextButton.disabled = viewport.scrollLeft >= maxScroll - 1
  }

  prevButton.addEventListener('click', () => {
    viewport.scrollBy({ left: -viewport.clientWidth, behavior: 'smooth' })
  })

  nextButton.addEventListener('click', () => {
    viewport.scrollBy({ left: viewport.clientWidth, behavior: 'smooth' })
  })

  viewport.addEventListener('scroll', updateNavState)
  window.addEventListener('resize', updateNavState)
  updateNavState()
}
