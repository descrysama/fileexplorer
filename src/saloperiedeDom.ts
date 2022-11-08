export const createCards = (data : any) => {
    let ParentElement = document.createElement('div')
    ParentElement.id = "card-content"
    ParentElement.classList.add('d-flex')
    ParentElement.classList.add('justify-content-center')
    ParentElement.classList.add('items-center')
    ParentElement.classList.add('flex-wrap')

    data.data.forEach((file:any) => {
        let card = document.createElement('div')
        card.classList.add('card')
        let img = document.createElement('img')
        img.src = 'https://badcoffee.club/wp-content/uploads/2020/02/macOS-Default-Folder-Icon-150x150.png'
        let name = document.createElement('p')
        name.textContent = file
        card.appendChild(img)
        card.appendChild(name)
        ParentElement.appendChild(card)
    });
    return ParentElement
}