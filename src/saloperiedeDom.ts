export const createCards = (data : any) => {
    let ParentElement = document.createElement('div')
    ParentElement.id = "card-content"
    ParentElement.classList.add('d-flex')
    ParentElement.classList.add('justify-content-center')
    ParentElement.classList.add('items-center')
    ParentElement.classList.add('flex-wrap')

    data.array.forEach((file:any) => {
        let card = document.createElement('div')
        card.classList.add('card')
        let img = document.createElement('img')
        img.src = file.type == 'directory' ? "https://badcoffee.club/wp-content/uploads/2020/02/macOS-Default-Folder-Icon-150x150.png" : "https://www.shareicon.net/data/2015/08/11/83725_file_256x256.png"
        img.id = file.type
        img.width = 150
        let name = document.createElement('p')
        name.textContent = file.name
        card.appendChild(img)
        card.appendChild(name)
        ParentElement.appendChild(card)
    });
    return ParentElement
}