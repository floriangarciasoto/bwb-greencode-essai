/*
=========================================================================
|| DARK MODE
=========================================================================
*/

// Récuperation du mode par localStorage
let darkMode = localStorage.darkMode;

// Si le mode dans le localStorage n'est pas définit, on prend une valeur par défaut (ici thème clair)
if (darkMode === undefined) darkMode = false;

// Le localStorage ne peut stocker que des paires clé–valeur sous forme de chaînes de caractères (string).
// Il faut donc convertir la valeur en booléen afin de pouvoir correctement l'utiliser par la suite.
if (darkMode === "false") darkMode = false;
if (darkMode === "true") darkMode = true;


/**
 * Inverse la variable représentant le thème de la page
 */
function toggleDarkMode() {
    // Inversion du booléen stockant le thème de la page
    darkMode = !darkMode;
    // On stocke aussi la variable dans le localStorage
    localStorage.darkMode = darkMode;
}

/**
 * Applique le thème sur la page en fonction de la variable représentant le thème de la page
 */
function applyMode() {
    // On prend la balise HTML
    let html = document.documentElement;
    // Et la balise body
    let body = document.body;
    // Si l'on est en thème sombre
    if (darkMode) {
        // On ajoute l'attribut permettant à Bootstrap de faire un dark mode sur le document
        html.setAttribute("data-bs-theme", "dark");
        // On ajoute aussi une classe au body afin d'aider le CSS custom pour les éléments restants à traiter
        body.className = "dark-mode";
    }
    // Sinon, on est forcément en thème clair
    else {
        // On peut directement retirer l'attribut
        html.removeAttribute("data-bs-theme");
        // Le body ne peut avoir qu'une classe dark-mode pour le moment,
        // on peut donc se contenter de retirer directement l'attribut class
        body.removeAttribute("class");
    }
}


// On applique d'abord le thème laissé par localStorage ou celui par défaut
applyMode();

// Ajout d'un évènement au clic sur tout le document,
// l'évènement se déclenchera donc peut importe l'endroit où l'utilisateur clique
document.addEventListener('click', e => {
    // On récupere donc l'élément sur lequel on a cliqué,
    // en vérifiant si la classe "toggle-dark-mode" est présente,
    // ce qui veut dire que l'on a cliqué sur un bouton
    if (e.target.classList.contains('toggle-dark-mode')) {
        // On change la valeur de la variable booléenne
        toggleDarkMode();
        // Puis on applique le thème à la page
        applyMode();
    }
});



/*
=========================================================================
|| MENU BURGER
=========================================================================
*/

// On sélectionne le menu burger sur mobile
let burgerMenu = document.getElementById("burger-menu");
// On sélectionne le bouton burger sur mobile
let burgerButton = document.getElementById("burger-button");


/**
 * Fait apparaître ou disparaitre le menu burger sur mobile avec une animation
 */
function toogleBurgerMenu() {
    // On sélectionne uniquement les classes du menu mobile
    let burgerMenuClassList = burgerMenu.classList;
    // On ajoute une classe qui va permettre d'imposer une durée lorsque
    // l'on va faire un changement de style sur le menu, ici on va modifier sa hauteur
    burgerMenuClassList.add("animate");

    // La classe "opened" va donner une valeur arbitraire à la nav afin de pouvoir
    // passer de 0 (valeur initiale) à quelque chose, ce qui permet de faire une transition
    // entre ces deux hauteurs.
    // Il suffit alors de switcher la présence de la classe.
    if (burgerMenuClassList.contains("opened")) burgerMenuClassList.remove("opened");
    else burgerMenuClassList.add("opened");

    // Durant la transition, il est important de garder la classe "animate" afin qu'elle puisse
    // permettre l'animation de transition, il ne faut alors pas l'enlever tout de suite,
    // on donne un délai de 500 ms
    setTimeout(()=>{
        // Une fois que ce délai est terminé, on peut enfin retirer la classe
        burgerMenuClassList.remove("animate");
    },500);
}


// On ajoute l'évènement au clic sur le bouton burger afin d'appeler notre fonction
// qui va le faire apparaître ou disparaître
burgerButton.onclick = function() {
    // Appel de la fonction
    toogleBurgerMenu();
}
