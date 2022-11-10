
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
        img.src = file.type == 'directory' ? "https://badcoffee.club/wp-content/uploads/2020/02/macOS-Default-Folder-Icon-150x150.png" : "https://i.ibb.co/mvVC80j/whitefile.png"
        if(file.ext && file.ext == '.mp4' || file.ext == '.mov') {
            img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/VLC_Icon.svg/794px-VLC_Icon.svg.png"
        }
        if(file.ext == '.exe' || file.ext == '.lnk') {
            img.src = "https://findicons.com/files/icons/684/vistoon/256/exe_file.png"
        }
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