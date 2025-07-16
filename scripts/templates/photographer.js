function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data

    const picture = `assets/photographers/${portrait}`

    function getUserCardDOM() {
        const a = document.createElement('a')
        a.setAttribute("href", "./photographer.html?id=" + id)
        const article = document.createElement('article')
        const img = document.createElement('img')
        img.setAttribute("src", picture)
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
        photoDiv.appendChild(img)
        return { textDiv, photoDiv }
    }

    return { getPhotographerHeaderDOM }
}

function mediaTemplate(media, photographerName) {
    const article = document.createElement("article")
    article.classList.add("media-card")
    const photographerFirstName = photographerName.split(" ")[0]

    let mediaElement
    let mediaSrc
    if (media.image) {
        mediaElement = document.createElement("img")
        mediaSrc = `assets/images/${photographerFirstName}/${media.image}`
        mediaElement.setAttribute("src", mediaSrc)
    }

    else if (media.video) {
        mediaElement = document.createElement("video");
        mediaSrc = `assets/images/${photographerFirstName}/${media.video}`
        mediaElement.setAttribute("src", mediaSrc)
    }

    mediaElement.addEventListener("click", () => {
        let mediaType;
        if (media.image) {
            mediaType = "image"
        } else {
            mediaType = "video"
        }

        openMediaModal(mediaSrc, mediaType, media.title);
    });

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
    likes.textContent = media.likes

    const iconeLike = document.createElement("i")
    iconeLike.classList.add("fa-regular", "fa-heart")

    iconeLike.addEventListener("click", () => {
        if (iconeLike.classList.contains("fa-solid")) {
            media.likes -= 1
            likes.textContent = media.likes
            iconeLike.classList.remove("fa-solid", "liked")
            iconeLike.classList.add("fa-regular")
        } else {
            media.likes += 1
            likes.textContent = media.likes
            iconeLike.classList.remove("fa-regular")
            iconeLike.classList.add("fa-solid", "liked")
        }

        totalLikes();
    });

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

    mediaTitle.textContent = title

    mediaContent.appendChild(mediaElement)
    mediaModal.classList.remove("hidden")
}

function closeMediaModal() {
    document.getElementById("media-modal").classList.add("hidden")
}

function previousMedia() {
    let actualId = document.querySelector("#actualMedia")
    let actualSrc = actualId.getAttribute("src")
    let allMedia = document.querySelectorAll(".media-card img, .media-card video")
    let mediaTitle = document.querySelector(".media-title")

    for (let i = 0; i < allMedia.length; i++) {
        let actualMedia = allMedia[i]
        let actualMediaSrc = actualMedia.getAttribute("src")

        if (actualSrc === actualMediaSrc) {
            let index = i === 0 ? allMedia.length - 1 : i - 1
            actualId.src = allMedia[index].getAttribute("src")
        }

    }

}

function nextMedia() {
    let actualId = document.querySelector("#actualMedia")
    let actualSrc = actualId.getAttribute("src")
    let allMedia = document.querySelectorAll(".media-card img, .media-card video")
    let mediaTitle = document.querySelector(".media-title")

    for (let i = 0; i < allMedia.length; i++) {
        let actualMedia = allMedia[i]
        let actualMediaSrc = actualMedia.getAttribute("src")

        if (actualSrc === actualMediaSrc) {
            let index = allMedia.length == i + 1 ? 0 : i + 1
            actualId.src = allMedia[index].getAttribute("src")
        }

    }
}