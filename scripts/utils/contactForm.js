function displayModal() {
    const modal = document.getElementById("contact_modal")
    modal.style.display = "flex"
}

function closeModal() {
    const modal = document.getElementById("contact_modal")
    modal.style.display = "none"
}

const modalbg = document.getElementById("modal")
const firstName = document.getElementById("first")
const lastName = document.getElementById("last")
const email = document.getElementById("email")
const message = document.getElementById("message")

function verifFormulaire() {
    let valide = true

    const errorFirst = document.getElementById("errorFirst")
    if (firstName.value.length < 2 || firstName.value == null) {
        errorFirst.innerText = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.'
        valide = false
    }

    else {
        errorFirst.innerText = ''
    };

    const errorLast = document.getElementById("errorLast")
    if (lastName.value.length < 2 || lastName.value == null) {
        errorLast.innerText = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.'
        valide = false
    }

    else {
        errorLast.innerText = ''
    };

    const errorEmail = document.getElementById("errorEmail");
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email.value)) {
        valide = false
        errorEmail.innerText = 'Veuillez entrer une adresse email valide'
    }

    else {
        errorEmail.innerText = ''
    };

    const errorMessage = document.getElementById("errorMessage")
    if (message.value.length < 2 || message.value == null) {
        errorMessage.innerText = 'Veuillez entrer 2 caractères ou plus pour votre message.'
        valide = false
    }

    else {
        errorMessage.innerText = ''
    };

}


const modal = document.getElementById("contact_modal");
modal.addEventListener("submit", (event) => {
    event.preventDefault()
    if (verifFormulaire()) {
        console.log("Validé.")
        modal.style.display = "none"
    }
    else {
        console.log("Erreur.")
    };

})