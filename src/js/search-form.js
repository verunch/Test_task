function parseDate(value) {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value.trim())
  if (!match) return null

  const [, day, month, year] = match
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  return Number.isNaN(date.getTime()) ? null : date
}

export function initSearchForm() {
  const form = document.querySelector('.search-form')
  if (!form) return

  const message = form.querySelector('[data-search-message]')
  const dateFromInput = form.querySelector('#date-from')
  const dateToInput = form.querySelector('#date-to')
  const adultsInput = form.querySelector('#adults')
  const cards = document.querySelectorAll('.tour-card')

  const showMessage = (text, isError) => {
    message.textContent = text
    message.classList.toggle('search-form__message--error', isError)
    message.hidden = false
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const dateFrom = parseDate(dateFromInput.value)
    const dateTo = parseDate(dateToInput.value)
    const adults = Number(adultsInput.value)

    if (!dateFrom || !dateTo) {
      showMessage('Пожалуйста, укажите обе даты в формате Дд.Мм.Гггг.', true)
      return
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (dateFrom < today || dateTo < today) {
      showMessage('Нельзя выбрать прошедшую дату.', true)
      return
    }

    if (dateFrom > dateTo) {
      showMessage('Дата "с" не может быть позже даты "по".', true)
      return
    }

    if (!adults || adults < 1) {
      showMessage('Укажите количество взрослых — минимум 1.', true)
      return
    }

    let visibleCount = 0

    cards.forEach((card) => {
      const dateText = card.querySelector('.tour-card__date')?.textContent ?? ''
      const cardDateMatch = /(\d{2})\.(\d{2})\.(\d{4})/.exec(dateText)
      let matches = true

      if (cardDateMatch) {
        const [, day, month, year] = cardDateMatch
        const cardDate = new Date(Number(year), Number(month) - 1, Number(day))
        matches = cardDate >= dateFrom && cardDate <= dateTo
      }

      card.hidden = !matches
      if (matches) visibleCount += 1
    })

    showMessage(
      visibleCount > 0
        ? `Поиск выполнен: найдено экскурсий — ${visibleCount}.`
        : 'По заданным датам экскурсий не найдено.',
      visibleCount === 0,
    )
  })
}
