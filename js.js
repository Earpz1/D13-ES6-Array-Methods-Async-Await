const cart = []
let books = []

window.onload = function () {
  getBooks()
}

const getBooks = async () => {
  try {
    const response = await fetch('https://striveschool-api.herokuapp.com/books')
    const list = await response.json()

    list.forEach((element) => {
      books.push(element)
      createCard(element)
    })
  } catch (error) {
    console.log(error)
  }
}

const getFilterBooks = async () => {
  books = []
  document.querySelector('.row').innerHTML = ''

  const searchTerm = document.querySelector('#search-bar').value
  try {
    const response = await fetch('https://striveschool-api.herokuapp.com/books')
    const list = await response.json()

    console.log(list)
    const filterList = list.filter((book) => book.title.includes(searchTerm))

    console.log(filterList)

    list.forEach((element) => {
      if (element.title.includes(searchTerm)) {
        books.push(element)
        createCard(element)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const addToCart = function (event) {
  cart.push(event.target.id)
  console.log(cart)

  event.target.innerHTML = 'Added to cart'
  event.target.classList.remove('btn-primary')
  event.target.classList.add('btn-success')
}

const removeBook = function (event) {
  event.target.parentNode.parentNode.remove()
}

const createCard = function (element) {
  const container = document.querySelector('.row')

  const newCol = document.createElement('div')
  const newCard = document.createElement('div')
  const newImage = document.createElement('img')
  const newCardbody = document.createElement('div')
  const newTitle = document.createElement('h5')
  const price = document.createElement('a')
  const hideBook = document.createElement('a')

  hideBook.classList.add('btn')
  hideBook.classList.add('btn-danger')
  hideBook.innerHTML = 'Remove'
  hideBook.setAttribute('onclick', 'removeBook(event)')
  price.classList.add('btn')
  price.classList.add('btn-primary')
  price.innerHTML = 'Add to cart: $' + element.price
  price.setAttribute('onclick', 'addToCart(event)')
  price.setAttribute('id', element.title)

  newTitle.classList.add('card-title')
  newCardbody.classList.add('card-body')
  newCardbody.classList.add('text-center')
  newTitle.innerText = element.title
  newImage.setAttribute('src', element.img)
  newImage.setAttribute('alt', element.title)
  newImage.classList.add('card-img-top')
  newCard.classList.add('card')
  newCol.classList.add('col-3')

  newCard.appendChild(newImage)
  newCardbody.appendChild(newTitle)
  newCardbody.appendChild(price)
  newCardbody.appendChild(hideBook)
  newCard.appendChild(newCardbody)
  newCol.appendChild(newCard)
  container.appendChild(newCol)
}

console.log(books)
