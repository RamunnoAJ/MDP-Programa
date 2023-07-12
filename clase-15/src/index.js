const $form = document.querySelector('#form')

$form.addEventListener('submit', (e) => {
  e.preventDefault()
  const $input = document.querySelector('.input-container input')
  const value = $input.value
  const item = createItem(value)
  $input.value = ''
  const $list = document.querySelector('#itemsList')
  $list.appendChild(item)
})

function createItem(value) {
  const $item = document.createElement('li')
  $item.className = 'list__item'
  const $itemText = document.createElement('span')
  $itemText.innerText = value

  $itemText.addEventListener('click', () => {
    $itemText.classList.toggle('marked')
  })

  const $removeBtn = document.createElement('button')
  $removeBtn.className = 'btn-remove'
  $removeBtn.innerText = 'X'
  $removeBtn.addEventListener('click', () => {
    $item.remove()
  })

  $item.appendChild($itemText)
  $item.appendChild($removeBtn)

  return $item
}
