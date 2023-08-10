class Persona {
  constructor(dni, nombre, apellido, edad, genero) {
    this.dni = dni
    this.nombre = nombre
    this.apellido = apellido
    this.edad = edad
    this.genero = genero
  }
}

let personas = []

const $buscar = document.querySelector('#buscar')
$buscar.addEventListener('keyup', () => {
  const input = $buscar.value.toLowerCase().trim()
  const personasFiltradas = filtrarPersona(input)
  renderPersonas(personasFiltradas)
})

const $form = document.querySelector('#form')
$form.addEventListener('submit', e => {
  e.preventDefault()
  agregarPersona(
    $form.dni.value,
    $form.nombre.value,
    $form.apellido.value,
    $form.edad.value,
    $form.genero.value,
  )
  $form.reset()
  $form.dni.focus()
})

function agregarPersona(dni, nombre, apellido, edad, genero) {
  const persona = new Persona(dni, nombre, apellido, edad, genero)
  validarFormulario()
  if (!verificarRepetidos(dni)) {
    personas.push(persona)
    renderPersonas(personas)
    mostrarExito('Registro agregado correctamente')
  }
  renderPersonas(personas)
}

function eliminarPersona(persona) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!',
  }).then(result => {
    if (result.isConfirmed) {
      personas = personas.filter(object => object.dni !== persona.dni)

      mostrarExito('Registro eliminado correctamente')
      renderPersonas(personas)
    }
  })
}

function obtenerGenero(genero) {
  if (genero === '1') {
    return 'Masculino'
  } else if (genero === '2') {
    return 'Femenino'
  } else {
    return 'Otro'
  }
}

function renderPersonas(personas) {
  const $tableBody = document.querySelector('#table-body')
  if (personas.length > 0) {
    $tableBody.innerHTML = ''
    personas.forEach(persona => {
      const $tr = createRow(persona)
      $tableBody.appendChild($tr)
    })
  } else {
    $tableBody.innerHTML =
      '<tr><td class="text-center" colspan="5">Sin registros</td></tr>'
  }
}

function createRow(persona) {
  const $tr = document.createElement('tr')
  const $dni = document.createElement('td')
  const $nombre = document.createElement('td')
  const $edad = document.createElement('td')
  const $genero = document.createElement('td')
  const $button = document.createElement('td')

  $dni.textContent = persona.dni
  $nombre.textContent = `${persona.nombre} ${persona.apellido}`
  $edad.textContent = persona.edad
  $genero.textContent = obtenerGenero(persona.genero)
  $button.innerHTML =
    '<button class="btn btn-danger"><i class="fas fa-trash"></i></button></td>'

  $button.querySelector('button').addEventListener('click', () => {
    eliminarPersona(persona)
  })

  $tr.appendChild($dni)
  $tr.appendChild($nombre)
  $tr.appendChild($edad)
  $tr.appendChild($genero)
  $tr.appendChild($button)

  return $tr
}

function validarFormulario() {
  const $dni = $form.dni.value
  const $nombre = $form.nombre.value
  const $apellido = $form.apellido.value
  const $edad = $form.edad.value
  const $genero = $form.genero.value

  const errors = []
  if (!$dni) errors.push('El DNI es requerido')
  if (!$nombre) errors.push('El nombre es requerido')
  if (!$apellido) errors.push('El apellido es requerido')
  if (!$edad) errors.push('La edad es requerida')
  if (!$genero) errors.push('El genero es requerido')

  if (errors.length > 0) {
    errors.forEach(error => mostrarErrores(error))
    throw new Error('Hay errores en el formulario')
  }
}

function mostrarErrores(error) {
  Toastify({
    text: error,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
    style: {
      background: 'linear-gradient(to right, #CF4E3A, #DF897C)',
    },
  }).showToast()
}

function mostrarExito(mensaje) {
  Toastify({
    text: mensaje,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
    style: {
      background: 'linear-gradient(to right, #2EDC76, #85EAAF)',
    },
  }).showToast()
}

function verificarRepetidos(dni) {
  const repetido = personas.some(persona => persona.dni === dni)
  if (repetido) {
    mostrarErrores('Ya existe una persona con ese DNI')
  }
  return repetido
}

function filtrarPersona(input) {
  return personas.filter(
    persona =>
      persona.nombre.toLowerCase().includes(input) ||
      persona.apellido.toLowerCase().includes(input.toLowerCase()) ||
      (
        persona.nombre.toLowerCase() +
        ' ' +
        persona.apellido.toLowerCase()
      ).includes(input),
  )
}
