function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data

    const picture = `assets/photographers/${portrait}`

    function getUserCardDOM() {
        const a = document.createElement('a')
        a.setAttribute("href", "./photographer.html?id=" + id)
        const article = document.createElement('article')
        const img = document.createElement('img')
        img.setAttribute("src", picture)
        img.setAttribute('aria-label', `${name}, ${country}, ${city}, ${price}€/jour`)
        const h2 = document.createElement('h2')
        h2.textContent = name
        const pCity = document.createElement('p')
        pCity.classList.add("pCity")
        pCity.textContent = city + ", " + country
        const pTag = document.createElement('p')
        pTag.classList.add("pTag")
        pTag.textContent = tagline
        const pPrix = document.createElement('p')
        pPrix.classList.add("pPrix")
        pPrix.textContent = price + "€/jour"
        a.appendChild(img)
        a.appendChild(h2)
        article.appendChild(a)
        article.appendChild(pCity)
        article.appendChild(pTag)
        article.appendChild(pPrix)
        return article
    }

    return { getUserCardDOM }
}

function photographerHeaderTemplate(data) {
    const { name, portrait, city, country, tagline } = data
    const picture = `assets/photographers/${portrait}`

    function getPhotographerHeaderDOM() {
        const textDiv = document.createElement('div')
        textDiv.classList.add('infoPhotographer')
        const h1 = document.createElement('h1')
        h1.textContent = name
        const location = document.createElement('p')
        location.classList.add('location')
        location.textContent = `${city}, ${country}`
        const tag = document.createElement('p')
        tag.classList.add('tagline')
        tag.textContent = tagline
        textDiv.appendChild(h1)
        textDiv.appendChild(location)
        textDiv.appendChild(tag)
        const photoDiv = document.createElement('div')
        photoDiv.classList.add('photoPhotographer')
        const img = document.createElement('img')
        img.setAttribute('src', picture)
        img.setAttribute('aria-label', 'Portrait du photographe')
        photoDiv.appendChild(img)
        return { textDiv, photoDiv }
    }

    return { getPhotographerHeaderDOM }
}

function mediaTemplate(media, photographerName) {
    const article = document.createElement("article")
    article.classList.add("media-card")
    article.setAttribute('tabindex', '0')
    const photographerFirstName = photographerName.split(" ")[0]

    let mediaElement
    let mediaSrc
    if (media.image) {
        mediaElement = document.createElement("img")
        mediaSrc = `assets/images/${photographerFirstName}/${media.image}`
        mediaElement.setAttribute("src", mediaSrc)
        mediaElement.setAttribute("aria-label", media.title)
    }

    else if (media.video) {
        mediaElement = document.createElement("video");
        mediaSrc = `assets/images/${photographerFirstName}/${media.video}`
        mediaElement.setAttribute("src", mediaSrc)
        mediaElement.setAttribute("aria-label", media.title)
    }

    mediaElement.addEventListener("click", typeOfMedia)
    article.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            mediaElement.click()
        }
    })

    function typeOfMedia() {
        let mediaType;
        if (media.image) {
            mediaType = "image"
        }
        else {
            mediaType = "video"
        }

        openMediaModal(mediaSrc, mediaType, media.title)
    }

    mediaElement.setAttribute('aria-label', `${media.title} de ${photographerName}`)
    const mediaInfo = document.createElement("div")
    mediaInfo.classList.add("media-info")

    const mediaTitre = document.createElement("p")
    mediaTitre.classList.add("media-titre")
    mediaTitre.textContent = media.title

    const likeContainer = document.createElement("div")
    likeContainer.classList.add("media-like")
    likeContainer.style.position = "relative"

    const likes = document.createElement("p")
    likes.classList.add("count-likes")
    likes.dataset.likes = media.likes
    likes.textContent = media.likes

    const iconeLike = document.createElement("i")
    iconeLike.classList.add("fa-regular", "fa-heart")
    iconeLike.setAttribute('tabindex', '0')
    iconeLike.setAttribute('aria-label', 'Bouton like')

    iconeLike.addEventListener("click", Like);
    iconeLike.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            Like()
        }
    })

    function Like() {
        if (iconeLike.classList.contains("fa-solid")) {
            media.likes -= 1
            likes.dataset.likes -= 1
            likes.textContent = media.likes
            iconeLike.classList.remove("fa-solid", "liked")
            iconeLike.classList.add("fa-regular")
        } else {
            media.likes += 1
            likes.dataset.likes = parseInt(likes.dataset.likes) + 1
            likes.textContent = media.likes
            iconeLike.classList.remove("fa-regular")
            iconeLike.classList.add("fa-solid", "liked")
        }
        totalLikes();
    }


    likeContainer.appendChild(likes)
    likeContainer.appendChild(iconeLike)
    mediaInfo.appendChild(mediaTitre)
    mediaInfo.appendChild(likeContainer)
    article.appendChild(mediaElement)
    article.appendChild(mediaInfo)

    document.getElementById("media-section").appendChild(article)
}

function totalLikes() {
    const likeNumber = document.querySelectorAll(".count-likes")
    let total = 0;

    likeNumber.forEach(like => {
        total += parseInt(like.textContent)
    });


    const rectangleLikes = document.querySelector(".total-likes")
    rectangleLikes.innerHTML = `${total} <i class="fa-solid fa-heart"></i>`
}

function openMediaModal(mediaSrc, type, title) {
    const mediaModal = document.getElementById("media-modal")
    const mediaTitle = document.querySelector(".media-title")
    const mediaContent = document.querySelector(".media-content")
    mediaContent.innerHTML = ""

    let mediaElement;
    if (type === "image") {
        mediaElement = document.createElement("img")
    } else if (type === "video") {
        mediaElement = document.createElement("video")
        mediaElement.setAttribute("controls", true)
    }
    mediaElement.setAttribute("src", mediaSrc)
    mediaElement.id = "actualMedia"

    let photographerName = document.querySelector("h1").textContent
    mediaElement.setAttribute("aria-label", `${title} de ${photographerName}`)

    mediaTitle.textContent = title

    mediaContent.appendChild(mediaElement)
    mediaModal.classList.remove("hidden")
}

function closeMediaModal() {
    document.getElementById("media-modal").classList.add("hidden")
}

function previousMedia() {
    let modalContent = document.querySelector(".media-content")
    let actualSrc = modalContent.firstChild.getAttribute("src")
    let allMedia = document.querySelectorAll(".media-card img, .media-card video")
    let allTitle = document.querySelectorAll(".media-titre")

    for (let i = 0; i < allMedia.length; i++) {
        let actualMedia = allMedia[i]
        let actualMediaSrc = actualMedia.getAttribute("src")

        if (actualSrc === actualMediaSrc) {
            let index = i === 0 ? allMedia.length - 1 : i - 1
            document.querySelector(".media-title").textContent = allTitle[index].textContent
            modalContent.textContent = ""
            modalContent.appendChild(allMedia[index].cloneNode())
            modalContent.firstChild.setAttribute("controls", true)
        }
    }
}

function nextMedia() {
    let modalContent = document.querySelector(".media-content")
    let actualSrc = modalContent.firstChild.getAttribute("src")
    let allMedia = document.querySelectorAll(".media-card img, .media-card video")
    let allTitle = document.querySelectorAll(".media-titre")

    for (let i = 0; i < allMedia.length; i++) {
        let actualMedia = allMedia[i]
        let actualMediaSrc = actualMedia.getAttribute("src")

        if (actualSrc === actualMediaSrc) {
            let index = allMedia.length == i + 1 ? 0 : i + 1
            document.querySelector(".media-title").textContent = allTitle[index].textContent
            modalContent.textContent = ""
            modalContent.appendChild(allMedia[index].cloneNode())
            modalContent.firstChild.setAttribute("controls", true)
        }
    }
}

document.addEventListener("keydown", (e) => {
    const mediaModal = document.getElementById("media-modal")
    const mediaModalOpen = !mediaModal.classList.contains("hidden")

    if (!mediaModalOpen) return
    if (e.key === "ArrowRight") {
        nextMedia()
    }

    else if (e.key === "ArrowLeft") {
        previousMedia()
    }

    else if (e.key === "Escape") {
        closeMediaModal()
    }
})

const selectOption = document.getElementById("sort")

selectOption.addEventListener('change', () => {
    const selectedValue = selectOption.value

    if (selectedValue === "popularite") {
        init("likes")
    }

    if (selectedValue === "date") {
        init("date")
    }

    if (selectedValue === "titre") {
        init("title")
    }

})