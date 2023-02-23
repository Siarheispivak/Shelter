const burgerMenu = document.querySelector(".burger__menu");
if (burgerMenu) {
    const menu = document.querySelector(".menu");
    // const screenLock = document.querySelector('.screen__lock');

    burgerMenu.addEventListener("click", function (e) {
        burgerMenu.classList.toggle("_active");
        menu.classList.toggle("_active");

        // screenLock.classList.toggle('_active');
    });
}
// const slideCard = document.querySelector('katerine');

let sliderPets;

fetch("./dataPets.json")
    .then((response) => response.json())
    .then((dataPets) => (sliderPets = dataPets));

const BTN_LEFT = document.querySelector("#btn-left");
const BTN_RIGHT = document.querySelector("#btn-right");
const CAROUSEL = document.querySelector("#carousel");
const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_RIGHT = document.querySelector("#item-right");
const ITEM_ACTIVE = document.querySelector("#item-active");



createCardTemplate = (petNumber, cardNumber) => {
    const card = document.createElement("div");
    card.classList.add("card-test");
    const petsCardInner = document.createElement("div");
    petsCardInner.classList.add("pets__card-inner");
    const petsInner = document.createElement("div");
    petsInner.classList.add("pets__inner");
    petsInner.classList.add(`card-${cardNumber}`);
    petsInner.classList.add(sliderPets[petNumber].name.toLowerCase());
    console.log(sliderPets[petNumber].name);
    const imgAnimal = document.createElement("img");
    imgAnimal.classList.add("animal");
    imgAnimal.src = sliderPets[petNumber].img;
    const petsName = document.createElement("p");
    petsName.classList.add("pets__name");
    petsName.innerHTML = sliderPets[petNumber].name;
    const learnMoreBtn = document.createElement("button");
    learnMoreBtn.classList.add("learn__more");
    learnMoreBtn.innerText = "Learn more";
    petsInner.appendChild(imgAnimal);
    petsInner.appendChild(petsName);
    petsInner.appendChild(learnMoreBtn);
    petsCardInner.appendChild(petsInner);
    card.appendChild(petsCardInner);
    return card;
};

function generateNewCarusel() {
    let changedItem = ITEM_ACTIVE.cloneNode();//тут мы клонировали нод листв айтем ченджес
    let activeCards = document.querySelectorAll(
        "#item-active .card-test .pets__card-inner .pets__inner"
    );
    let banedAnimals = getBanedAnimals(activeCards);
    console.log(banedAnimals, activeCards);
    changedItem.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        let petsIndex = getUniqueNumber(banedAnimals);
        const card = createCardTemplate(petsIndex, i + 1);
        banedAnimals.push(petsIndex);
        changedItem.appendChild(card);
    }
    return changedItem;
}

const moveLeft = () => {
    const newGeneratedCarusel = generateNewCarusel();
    //ITEM_ACTIVE.innerHTML = newGeneratedCarusel.innerHTML;
    ITEM_LEFT.innerHTML = newGeneratedCarusel.innerHTML;
    CAROUSEL.classList.add("transition-left");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
    const newGeneratedCarusel = generateNewCarusel();
    //ITEM_ACTIVE.innerHTML = newGeneratedCarusel.innerHTML;
    ITEM_RIGHT.innerHTML = newGeneratedCarusel.innerHTML;
    CAROUSEL.classList.add("transition-right");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

BTN_LEFT.addEventListener("click", moveLeft);
BTN_RIGHT.addEventListener("click", moveRight);

function getRandomNumber() {
    return Math.floor(Math.random() * 8);
}

function getBanedAnimals(divsCard) {
    let petsIndexNumbers = [];
    for (let i = 0; i < sliderPets.length; i++) {
        for (let j = 0; j < divsCard.length; j++) {
            if (divsCard[j].classList.contains(sliderPets[i].name.toLowerCase())) {
                petsIndexNumbers.push(i);
            }
        }
    }
    return petsIndexNumbers;
}

CAROUSEL.addEventListener("animationend", (animationEvent) => {
    // console.log(banedAnimals, activeCards);

    if (animationEvent.animationName === "move-left") {
        CAROUSEL.classList.remove("transition-left");
        ITEM_ACTIVE.innerHTML = ITEM_LEFT.innerHTML;//вот это мы добавили
    } else {
        CAROUSEL.classList.remove("transition-right");
        ITEM_ACTIVE.innerHTML = ITEM_RIGHT.innerHTML;//вот это мы добавили тоже
    }
    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);
});

function getUniqueNumber(banedAnimalsArr) {
    let i = getRandomNumber();
    while (banedAnimalsArr.includes(i)) {
        i = getRandomNumber();
    }
    return i;
}

// changedItem.innerHTML = "";
// for (let i = 0; i < 3; i++) {
//     const card = createCardTemplate();
//     card.innerText = Math.floor(Math.random() * 8);

//     changedItem.appendChild(card);

// }

// (async () => {
//     let DB = await (await fetch('dataPets.json')).json();

//     console.log(DB);
// })();

// const popupLinks = document.querySelectorAll(".popup-link");
// // присвоить каждому животному
// const body = document.querySelector("body");
// const lockPadding = document.querySelectorAll(".lock-padding");

// let unlock = true;

// const timeout = 800;

// if (popupLinks.length > 0) {
//     for (let index = 0; index < popupLinks.length; index++) {
//         const popupLink = popupLinks[index];
//         popupLink.addEventListener("click", function (e) {
//             const popupName = popupLink.getAttribute("href").replace("#", "");
//             const curentPopup = document.getElementById(popupName);
//             popupOpen(curentPopup);
//             e.preventDefault();
//         });
//     }
// }

// const popupCloseIcon = document.querySelectorAll(".close-popup");
// if (popupCloseIcon.length > 0) {
//     for (let index = 0; index < popupCloseIcon.length; index++) {
//         const el = popupCloseIcon[index];
//         el.addEventListener("click", function (e) {
//             popupCloseIcon(el.closest(".popup"));
//             e.preventDefault();
//         })
//     }
// }

// function popupOpen(curentPopup) {
//     if (curentPopup && unlock) {
//         const popupActive = document.querySelector(".popup.open");
//         if (popupActive) {
//             popupCloseIcon(popupActive, false);
//         } else {
//             bodyLock();
//         }
//         curentPopup.classList.add("open");
//         curentPopup.addEventListener("click", function (e) {
//             if (!e.target.closest(".popup__content")) {
//                 popupClose(e.target.closest(".popup"));
//             }
//         });
//     }
// }
// function popupClose(popupActive, doUnlock = true) {
//     if (unlock) {
//         popupActive.classList.remove("open");
//         if (doUnlock) {
//             bodyLock();
//         }
//     }
// }
