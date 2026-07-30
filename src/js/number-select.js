export function initNumberSelects() {
  const roots = document.querySelectorAll('[data-number-select]')

  roots.forEach((root) => {
    const input = root.querySelector('[data-number-select-input]')
    const toggle = root.querySelector('[data-number-select-toggle]')
    const list = root.querySelector('[data-number-select-list]')
    if (!input || !toggle || !list) return

    const min = Number(root.dataset.min)
    const max = Number(root.dataset.max)

    const close = () => {
      list.hidden = true
      toggle.setAttribute('aria-expanded', 'false')
    }

    const render = () => {
      const current = Number(input.value)

      list.innerHTML = Array.from({ length: max - min + 1 })
        .map((_, index) => {
          const value = min + index
          const isSelected = value === current
          return `
            <li role="option" aria-selected="${isSelected}">
              <button type="button" class="search-form__number-option${isSelected ? ' search-form__number-option--selected' : ''}" data-value="${value}">${value}</button>
            </li>
          `
        })
        .join('')

      list.querySelectorAll('[data-value]').forEach((button) => {
        button.addEventListener('click', () => {
          input.value = button.dataset.value
          input.dispatchEvent(new Event('change', { bubbles: true }))
          close()
        })
      })
    }

    const open = () => {
      document.querySelectorAll('[data-number-select-list]').forEach((otherList) => {
        if (otherList !== list) otherList.hidden = true
      })

      render()
      list.hidden = false
      toggle.setAttribute('aria-expanded', 'true')
    }

    toggle.addEventListener('click', () => {
      if (list.hidden) open()
      else close()
    })

    document.addEventListener('click', (event) => {
      if (!list.hidden && !root.contains(event.target)) close()
    })

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close()
    })
  })
}
