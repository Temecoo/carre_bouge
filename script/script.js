// Lance la variable mouvement() quand n'importe quelle touche du clavier est enfoncé
document.addEventListener("keydown", mouvement);

function DefinitionTaillePage() {
    // Calcule de la place que prendra la zone de jeu en fonction de la taille visibile de la fenetre
    let NombreTailleHorizontal = Math.floor(window.innerWidth / 100) * 100 - 200;
    let NombreTailleVertical = Math.floor(window.innerHeight / 100) * 100 - 100;

    // Modification de la taille de la zone de jeu
    document.querySelector(".jeu").style = "width:" + NombreTailleHorizontal + "px; height:" + NombreTailleVertical + "px";
}


DefinitionTaillePage();

// On regarde quand on change la taille de la fenetre
window.addEventListener("resize", RedimentionPage);

function RedimentionPage() {
    // On recalcule la taille de la zone de jeu
    DefinitionTaillePage();
}

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
toix = 0;
toiy = 0;
portex = 0;
portey = 0;
zonetop = "";
zonebot = "";
zoneright = "";
zoneleft = "";
let dash = 1;
DashCooldown = 0;
CristalCooldown = 0;
ApparitionCristal = 0;
CristalTop = "";
CristalRight = "";
SuperDash = "FALSE";

// Je met le cristal de dash en dehors de la zone de jeu
// document.querySelector(".cristal").style="transform: translateY(-100%)";

// Initialisation de la taille de la zone de jeu
zonetop = document.querySelector(".jeu").getBoundingClientRect().top;
zonebot = document.querySelector(".jeu").getBoundingClientRect().bottom;
zoneright = document.querySelector(".jeu").getBoundingClientRect().right;
zoneleft = document.querySelector(".jeu").getBoundingClientRect().left;

let zonelarge = zoneright - zoneleft - 200;
let zonehauteur = zonebot - zonetop - 200;
// Placement des deux cubes au chargement de la page
document.querySelector(".cube").style = "transform: translateY(100%)";
document.querySelector(".cube2").style = "transform: translateX(" + zonelarge + "px) translateY(" + zonehauteur + "px)";

// Placement du cristal en dehors de l'écran
document.querySelector(".cristal").style= "transform: translateY(-100%)";

// On rentre dans la fonction quand on touche à une touche
function mouvement(event) {


    AnalyseTailleZoneDeJeu();

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

    if (touche == " " && DashCooldown == 0) {
        UtilisationDuDash();
    }

    // Si la touche appuyée est l'une des flèches directionnelle, on ajoute un translate à la variable "bouger" qui sera utilisée plus bas
    if (touche == "ArrowRight") {
        if (toiright < zoneright) {
            toix = toix + dash;
            carrerouge();
        }
    }

    else if (touche == "ArrowLeft") {
        if (toileft > zoneleft) {
            toix = toix - dash;
            carrerouge();
        }
    }

    else if (touche == "ArrowUp") {
        if (toitop > zonetop) {
            toiy = toiy - dash;
            carrerouge();
        }
    }

    else if (touche == "ArrowDown") {
        if (toibot < zonebot) {
            toiy = toiy + dash;
            carrerouge();
        }
    }



    // L'endroit où l'on ajoute les variables "bouger" et "bouger2" à la position des cubes pour qu'ils se déplacent
    document.querySelector(".cube").style = "transform: translateY(100%) translate(" + toix * 100 + "%, " + toiy * 100 + "%)";
    // document.querySelector(".cube2").style = "transform: translateX(100vw) translateX(-200%) translateY(100vh) translateY(-200%) translate(" + portex * 100 + "%, " + portey * 100 + "%)";
    document.querySelector(".cube2").style = "transform: translateX(" + zonelarge + "px) translateY(" + zonehauteur + "px) translate(" + portex * 100 + "%, " + portey * 100 + "%)";


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

    CristalAttraper();

    if (toileft == porteleft
        && toiright == porteright
        && toitop == portetop
        && toibot == portebot) {
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
        if (porteright < zoneright) {
            portex++;
        }
    }
    else if (porte <= 50) {
        if (porteleft > zoneleft) {
            portex--;
        }
    }
    else if (porte <= 75) {
        if (portetop > zonetop) {
            portey--;
        }
    }
    else if (porte > 75) {
        if (portebot < zonebot) {
            portey++
        }
    }

    if (DashCooldown != 0) {
        DashCooldown--;
    }

    CristalDoubleDash();
    ManagementDuDash();
}

function AnalyseTailleZoneDeJeu() {
    // Initialisation de la taille de la zone du jeu
    zonetop = document.querySelector(".jeu").getBoundingClientRect().top;
    zonebot = document.querySelector(".jeu").getBoundingClientRect().bottom;
    zoneright = document.querySelector(".jeu").getBoundingClientRect().right;
    zoneleft = document.querySelector(".jeu").getBoundingClientRect().left;
}

function UtilisationDuDash() {
    if (dash == 1) {
        if (SuperDash == "TRUE") {
            dash = 3;
        }
        else {
            dash = 2;
        }
    }
    else if (dash != 1) {
        dash = 1;
    }
}

function ManagementDuDash() {
    if (dash != 1) {
        // J'initialise le cooldown du dash
        DashCooldown = 3;
        // Je remet le dash égal à 1 pour pas qu'il ne soit spam
        dash = 1;
        SuperDash = "FALSE";
        // Je met l'apparence cheveux bleu de madeline pour montrer qu'elle n'a plus son dash
        document.querySelector(".cube").innerHTML = "<img src='img/dash.png'>";
    }
    if (DashCooldown == 0) {
        // Je remet l'apparence normale de madeline
        document.querySelector(".cube").innerHTML = "<img src='img/madeline.png'>";
        if (SuperDash == "TRUE") {
            // Je met l'apparence cheveux rose de madeline pour montrer qu'elle a son superdash de dispo
            document.querySelector(".cube").innerHTML = "<img src='img/superdash.png'>";
        }
    }
}

document.querySelector(".entetecommande").addEventListener("click", AfficheCommande);

function AfficheCommande() {
    document.querySelector(".casecommande").classList.toggle("CommandeAffichée");
    document.querySelector(".entetecommande").classList.toggle("EnteteCollé");
}


function CristalDoubleDash() {
    // On vérifie que le cristal peut bouger
    if (CristalCooldown == 0) {

        // Disparition du cristal car son temps est fini
        document.querySelector(".cristal").style = "transform: translateY(-100%)";

        // Tirage d'un chiffre aléatoire
        ApparitionCristal = Math.random() * 100;
        if (ApparitionCristal < 10) {

            // On tire la position aléatoirement du cristal
            let PositionXcristal = Math.floor(Math.random() * zonelarge / 100) * 100;
            let PositionYcristal = Math.floor(Math.random() * zonehauteur / 100) * 100;
            document.querySelector(".cristal").style = "transform: translate(" + PositionXcristal + "px, " + PositionYcristal + "px)";

            // Initialisation du cooldown à 5
            CristalCooldown = 5;
        }
    }
    else {
        // Vu que le cooldown est pas a 0 ça veut dire que le cristal est déjà là donc on fait baisser son temps
        CristalCooldown--;
    }
}

function CristalAttraper() {
    // On regarde où se trouve le cristal
    CristalTop = document.querySelector(".cristal").getBoundingClientRect().top;
    CristalRight = document.querySelector(".cristal").getBoundingClientRect().right;
    // console.log("CristalTop = "+CristalTop+", CristalRight = "+CristalRight+", ToiTop = "+toitop+", toiright = "+toiright);

    // Vérification que le personnage et le cristal sont sur la même case
    if (toitop == CristalTop
        && toiright == CristalRight) {
        // Le superdash est maintenant activé
        console.log("Activation du superdash");
        SuperDash = "TRUE";
        DashCooldown = 0;
        document.querySelector(".cube").innerHTML = "<img src='img/superdash.png'>";
    }
}