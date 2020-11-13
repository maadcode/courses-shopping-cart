// Variables
const $carrito = document.querySelector('#carrito')
const $carContainer = document.querySelector('#lista-carrito tbody')
const $courseList = document.querySelector('#lista-cursos')
const $btnClean = document.querySelector('#vaciar-carrito')

let carArticles = []

bindEvents()
function bindEvents() {
    $courseList.addEventListener('click', addCourse)
    $carrito.addEventListener('click', deleteCourse)
    $btnClean.addEventListener('click', cleanCar)
    document.addEventListener('DOMContentLoaded', () => {
        carArticles = JSON.parse(localStorage.getItem('cart')) || [];
        htmlCar()
    })
}

// Functions
function addCourse(e) {
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')) {
        const selectedCourse = e.target.parentElement.parentElement
        readCourseData(selectedCourse)
    }
}

function readCourseData(course) {
    const courseInfo = {
        image: course.querySelector('img').src,
        name: course.querySelector('h4').textContent,
        price:course.querySelector('.precio span').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    const itemExist = carArticles.some(course => course.id === courseInfo.id)
    if(itemExist) {
        const courses = carArticles.map(course => {
            if(course.id === courseInfo.id) {
                course.amount++
                return course
            } else {
                return course
            }
        })
        carArticles = [...courses]
    } else {
        carArticles = [...carArticles, courseInfo]
    }

    htmlCar()
}

function htmlCar() {
    cleanHtml()

    carArticles.forEach(course => {
        const {image, name, price, amount, id} = course
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${image}" width="100">
            </td>
            <td>${name}</td>
            <td>${price}</td>
            <td>${amount}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `
        $carContainer.appendChild(row)
    })

    updateLocalStorage()
}

function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(carArticles))
}

function cleanHtml() {
    while($carContainer.firstChild) {
        $carContainer.removeChild($carContainer.firstChild)
    }
}

function deleteCourse(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const courseId = e.target.getAttribute('data-id')

        carArticles = carArticles.filter(course => course.id !== courseId)
        htmlCar()
    }
}

function cleanCar() {
    carArticles = []
    localStorage.clear()
    cleanHtml()
}