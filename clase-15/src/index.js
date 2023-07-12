const $btnAdd = document.querySelector('#btnAdd')

$btnAdd.addEventListener('click', () => {
  const inputValue = getInputValue()
  const item = createItem(inputValue)
  const $list = document.querySelector('#itemsList')
  $list.appendChild(item)
})

function getInputValue() {
  const value = document.querySelector('.input-container input').value
  return value
}

function createItem(value) {
  const $item = document.createElement('li')
  $item.className = 'list__item'
  $item.innerText = value
  return $item
}
