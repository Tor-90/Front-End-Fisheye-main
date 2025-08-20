const url = new URLSearchParams(window.location.search);
const idUrl = url.get('id')

async function getMedia() {
    let response = await fetch("./data/photographers.json")
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

    const rectanglePrice = document.querySelector(".price")
    rectanglePrice.innerHTML += `${photographers.price}€/jour`
}

async function init(triSort = false) {
    const data = await getMedia()
    const photographer = getPhotographerById(data.photographers)
    const filterMedia = await getMediasById(data.media)

    if (triSort) {
        filterMedia.sort((a, b) => {
            return a[triSort] > b[triSort] ? 1:-1
        })
        document.getElementById("media-section").textContent = ""
    }
    else {
        await displayData(photographer, filterMedia)
    }

    filterMedia.forEach((media) => {
        mediaTemplate(media, photographer.name)
    })
    totalLikes()
}

init()