const url = new URLSearchParams(window.location.search);
const idUrl = url.get('id')
console.log("ID de l'url :", idUrl)

async function getMedia() {
    let response = await fetch("/data/photographers.json")
    let data = await response.json()
    return data
}

function getPhotographerById(photographers) {
    return photographers.find(photographer => photographer.id == idUrl)
}

async function getMediasById(mediaList) {
    return mediaList.filter(media => media.photographerId == idUrl)
}

async function displayData(photographers) {
    const headerTemplate = photographerHeaderTemplate(photographers)
    const { textDiv, photoDiv } = headerTemplate.getPhotographerHeaderDOM()
    const headerSection = document.querySelector(".photograph-header")
    const button = document.querySelector(".contact_button")
    headerSection.appendChild(textDiv)
    headerSection.appendChild(button)
    headerSection.appendChild(photoDiv)

    const headerName = document.getElementById("headerName")
    headerName.innerHTML += `<br><span>${photographers.name}</span>`
    
    const rectangle = document.querySelector(".rectangle-fixe")
    rectangle.innerHTML += `${photographers.price}€/jour`
}

async function init() {
    const data = await getMedia()
    const photographers = getPhotographerById(data.photographers)
    const filterMedia = await getMediasById(data.media)
    console.log(photographers, filterMedia)
    await displayData(photographers, filterMedia)
    filterMedia.forEach((media) => {
        mediaTemplate(media, photographers.name)
    })
    totalLikes()
}

init()