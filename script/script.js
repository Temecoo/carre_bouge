// Lance la variable mouvement() quand n'importe quelle touche du clavier est enfoncé
document.addEventListener("keydown", mouvement);

// Initialisation de toutes les variables dont j'aurais besoin plus tard
bouger = "";
bouger2 = "";
toitop = "";
toibot = "";
toiright = "";
toileft = "";
portetop = "";
portebot = "";
porteright = "";
porteleft = "";
toix = "0";
toiy = "0";
portex = "0";
portey = "0";


// Placement des deux cubes au chargement de la page
document.querySelector(".cube").style = "transform: translateY(100%)";
document.querySelector(".cube2").style = "transform: translateX(100vw) translateX(-200%) translateY(100vh) translateY(-200%)";

// On rentre dans la fonction quand on touche à une touche
function mouvement(event) {

    // On met dans la variable touche quelle à été la dernière touche qu'on a utilisé
    let touche = event.key;
    // console.log(touche);

    // J'ai fais que le cube change de couleur a chaque fois qu'on appuis sur un bouton
    document.querySelector(".cube").classList.toggle("bouge");


    // Récupération de toutes les informations sur la position des cubes 1 et 2 pour vérifier s'ils peuvent bouger
    toitop = document.querySelector(".cube").getBoundingClientRect().top;
    portetop = document.querySelector(".cube2").getBoundingClientRect().top;
    toibot = document.querySelector(".cube").getBoundingClientRect().bottom;
    portebot = document.querySelector(".cube2").getBoundingClientRect().bottom;
    toileft = document.querySelector(".cube").getBoundingClientRect().left;
    porteleft = document.querySelector(".cube2").getBoundingClientRect().left;
    toiright = document.querySelector(".cube").getBoundingClientRect().right;
    porteright = document.querySelector(".cube2").getBoundingClientRect().right;


    // Si la touche appuyée est l'une des flèches directionnelle, on ajoute un translate à la variable "bouger" qui sera utilisée plus bas
    if (touche == "ArrowRight") {
        if (toiright < screen.width-30) {
            toix++;
            carrerouge();
        }
    }

    else if (touche == "ArrowLeft") {
        if (toileft > 80) {
            toix--;
            carrerouge();
        }
    }

    else if (touche == "ArrowUp") {
        if (toitop > 80) {
            toiy--;
            carrerouge();
        }
    }

    else if (touche == "ArrowDown") {
        if (toibot < screen.height - 200) {
            toiy++;
            carrerouge();
        }
    }


    console.log(porte);

    // L'endroit où l'on ajoute les variables "bouger" et "bouger2" à la position des cubes pour qu'ils se déplacent
    document.querySelector(".cube").style = "transform: translateY(100%) translate(" + toix * 100 + "%, " + toiy * 100 + "%)";
    document.querySelector(".cube2").style = "transform: translateX(100vw) translateX(-300%) translateY(100vh) translateY(-200%) translate(" + portex * 100 + "%, " + portey * 100 + "%)";

    // On cache le message de victoire
    document.querySelector(".win").style = "opacity: 0%";

    // Récupération de toutes les informations sur la position des cubes 1 et 2
    toitop = document.querySelector(".cube").getBoundingClientRect().top;
    portetop = document.querySelector(".cube2").getBoundingClientRect().top;
    toibot = document.querySelector(".cube").getBoundingClientRect().bottom;
    portebot = document.querySelector(".cube2").getBoundingClientRect().bottom;
    toileft = document.querySelector(".cube").getBoundingClientRect().left;
    porteleft = document.querySelector(".cube2").getBoundingClientRect().left;
    toiright = document.querySelector(".cube").getBoundingClientRect().right;
    porteright = document.querySelector(".cube2").getBoundingClientRect().right;


    if (toileft <= porteright
        && toiright >= porteleft
        && toitop <= portebot
        && toibot >= portetop) {
        console.log("tu as gagnée");
        document.querySelector(".win").style = "opacity: 100%";
    }
}

function carrerouge() {
    //Le carré rouge change de couleur
    document.querySelector(".cube2").classList.toggle("bouge2");


    // La variable porte stock un nombre aléatoire qui change à chaque appuis sur une touche
    porte = Math.random() * 100;

    // En fonction du nombre aléatoire tiré, le 2eme cube se déplace dans une position différente
    // La direction est stockée dans la variable bouger2
    if (porte <= 25) {
        if (porteright < screen.width) {
            portex++;
        }
    }
    else if (porte <= 50) {
        if (porteleft > 80) {
            portex--;
        }
    }
    else if (porte <= 75) {
        if (portetop > 80) {
            portey--;
        }
    }
    else if (porte > 75) {
        if (portebot < screen.height - 200) {
            portey++
        }
    }
}