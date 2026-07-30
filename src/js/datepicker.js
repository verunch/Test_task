const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function pad(value) {
  return String(value).padStart(2, '0')
}

function formatDate(date) {
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`
}

function parseDate(value) {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value.trim())
  if (!match) return null

  const [, day, month, year] = match
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  return Number.isNaN(date.getTime()) ? null : date
}

function renderCalendar(panel, viewDate, selectedDate, minDate, onSelect) {
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7

  const emptyCells = Array.from({ length: startOffset })
    .map(() => '<span class="search-form__calendar-day search-form__calendar-day--empty"></span>')
    .join('')

  const dayCells = Array.from({ length: daysInMonth })
    .map((_, index) => {
      const day = index + 1
      const cellDate = new Date(year, month, day)
      const isSelected =
        selectedDate &&
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month &&
        selectedDate.getDate() === day
      const isDisabled = minDate && cellDate < minDate

      return `<button type="button" class="search-form__calendar-day${isSelected ? ' search-form__calendar-day--selected' : ''}${isDisabled ? ' search-form__calendar-day--disabled' : ''}" data-day="${day}"${isDisabled ? ' disabled' : ''}>${day}</button>`
    })
    .join('')

  panel.innerHTML = `
    <div class="search-form__calendar-header">
      <button type="button" class="search-form__calendar-nav search-form__calendar-nav--prev" aria-label="Предыдущий месяц">
        <img src="/src/assets/icons/chevron-down-gray.svg" alt="" />
      </button>
      <span class="search-form__calendar-title">${MONTHS[month]} ${year}</span>
      <button type="button" class="search-form__calendar-nav search-form__calendar-nav--next" aria-label="Следующий месяц">
        <img src="/src/assets/icons/chevron-down-gray.svg" alt="" />
      </button>
    </div>
    <div class="search-form__calendar-weekdays">${WEEKDAYS.map((day) => `<span>${day}</span>`).join('')}</div>
    <div class="search-form__calendar-days">${emptyCells}${dayCells}</div>
  `

  panel.querySelector('.search-form__calendar-nav--prev').addEventListener('click', () => {
    viewDate.setMonth(viewDate.getMonth() - 1)
    renderCalendar(panel, viewDate, selectedDate, minDate, onSelect)
  })

  panel.querySelector('.search-form__calendar-nav--next').addEventListener('click', () => {
    viewDate.setMonth(viewDate.getMonth() + 1)
    renderCalendar(panel, viewDate, selectedDate, minDate, onSelect)
  })

  panel.querySelectorAll('[data-day]:not(:disabled)').forEach((button) => {
    button.addEventListener('click', () => {
      onSelect(new Date(year, month, Number(button.dataset.day)))
    })
  })
}

export function initDatepickers() {
  const roots = document.querySelectorAll('[data-datepicker]')

  roots.forEach((root) => {
    const input = root.querySelector('[data-datepicker-input]')
    const toggle = root.querySelector('[data-datepicker-toggle]')
    const panel = root.querySelector('[data-datepicker-panel]')
    if (!input || !toggle || !panel) return

    let selectedDate = parseDate(input.value)
    const minDate = new Date()
    minDate.setHours(0, 0, 0, 0)

    const close = () => {
      panel.hidden = true
    }

    const open = () => {
      document.querySelectorAll('[data-datepicker-panel]').forEach((otherPanel) => {
        if (otherPanel !== panel) otherPanel.hidden = true
      })

      const viewDate = selectedDate ? new Date(selectedDate) : new Date()
      renderCalendar(panel, viewDate, selectedDate, minDate, (date) => {
        selectedDate = date
        input.value = formatDate(date)
        input.dispatchEvent(new Event('change', { bubbles: true }))
        close()
      })
      panel.hidden = false
    }

    toggle.addEventListener('click', () => {
      if (panel.hidden) open()
      else close()
    })

    input.addEventListener('focus', open)

    document.addEventListener('click', (event) => {
      if (!panel.hidden && !root.contains(event.target)) close()
    })

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close()
    })
  })
}
