window.onload = async () => {
  try {
    const response = await fetch('https://striveschool-api.herokuapp.com/books')
    const list = await response.json()
    console.log(list)

    const container = document.querySelector('.row')

    list.forEach((element) => {
      const newCol = document.createElement('div')
      const newCard = document.createElement('div')
      const newImage = document.createElement('img')
      const newCardbody = document.createElement('div')
      const newTitle = document.createElement('h5')
      const price = document.createElement('a')

      price.classList.add('btn')
      price.classList.add('btn-primary')
      price.innerHTML = 'Add to cart: $' + element.price

      newTitle.classList.add('card-title')
      newCardbody.classList.add('card-body')
      newTitle.innerText = element.title
      newImage.setAttribute('src', element.img)
      newImage.setAttribute('alt', element.title)
      newImage.classList.add('card-img-top')
      newCard.classList.add('card')

      newCol.classList.add('col-3')

      newCard.appendChild(newImage)
      newCardbody.appendChild(newTitle)
      newCardbody.appendChild(price)
      newCard.appendChild(newCardbody)
      newCol.appendChild(newCard)
      container.appendChild(newCol)
    })

    let titles = list.map((list) => `<li> Book Title: ${list.title} </li>`)
  } catch (error) {
    console.log(error)
  }
}
