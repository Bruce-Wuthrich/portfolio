/*
============================================================
NOTES IMPORTANTES POUR RELIRE CE FICHIER
============================================================

1. Une variable mémorise une information :
   var nom = "Bruce";

2. Une fonction regroupe des instructions réutilisables :
   function direBonjour() { ... }

3. Une condition choisit quoi faire :
   if (condition) { ... } else { ... }

4. Un événement attend une action de l'utilisateur :
   click, change, submit, keydown, load, etc.

5. En JavaScript classique, on cherche souvent un élément avec :
   document.getElementById("monId");

6. En jQuery, le signe $ permet de chercher et modifier un élément :
   $("#monId") cherche un id.
   $(".maClasse") cherche une classe.

7. Ce même fichier est chargé sur plusieurs pages.
   On vérifie donc qu'un élément existe avant de l'utiliser.
============================================================
*/


// ==========================================================
// 1. ANNÉE AUTOMATIQUE DU PIED DE PAGE
// ==========================================================

// querySelectorAll cherche tous les éléments ayant la classe current-year.
document.querySelectorAll(".current-year").forEach(function (element) {
  // new Date().getFullYear() récupère l'année actuelle.
  element.textContent = new Date().getFullYear();
});


// ==========================================================
// 2. ANIMATION DE LA PAGE D'ACCUEIL
// ==========================================================

// L'événement load se déclenche quand la page est complètement chargée.
window.addEventListener("load", function () {
  // On récupère tous les éléments qui ont la classe reveal.
  document.querySelectorAll(".reveal").forEach(function (element, index) {
    // setTimeout attend un petit moment avant d'ajouter la classe visible.
    // index vaut 0 pour le premier élément, 1 pour le deuxième, etc.
    setTimeout(function () {
      element.classList.add("visible");
    }, index * 250);
  });
});


// ==========================================================
// 3. MINI-PROJET : TO-DO LIST
// ==========================================================

// On mémorise les éléments HTML dont la To-do List a besoin.
var taskInput = document.getElementById("taskInput");
var addTaskButton = document.getElementById("addTask");
var taskList = document.getElementById("taskList");
var taskCount = document.getElementById("taskCount");

// Cette fonction compte les tâches qui ne sont pas terminées.
function updateTaskCount() {
  // Si taskList n'existe pas sur cette page, on arrête la fonction.
  if (!taskList) {
    return;
  }

  // :not(.completed) signifie : sans la classe completed.
  var remaining = taskList.querySelectorAll("li:not(.completed)").length;

  // On affiche un texte différent quand il reste plusieurs tâches.
  if (remaining > 1) {
    taskCount.textContent = remaining + " tâches restantes";
  } else {
    taskCount.textContent = remaining + " tâche restante";
  }
}

// Cette fonction crée une nouvelle tâche.
function addTask() {
  // .value récupère le texte du champ.
  // .trim() retire les espaces inutiles au début et à la fin.
  var text = taskInput.value.trim();

  // On refuse une tâche vide.
  if (text === "") {
    return;
  }

  // createElement crée de nouveaux éléments HTML avec JavaScript.
  var item = document.createElement("li");
  var check = document.createElement("input");
  var label = document.createElement("span");
  var remove = document.createElement("button");

  // On prépare la case, le texte et le bouton Supprimer.
  check.type = "checkbox";
  label.textContent = text;
  remove.textContent = "Supprimer";
  remove.className = "btn btn-sm btn-outline-danger";

  // L'événement change se produit quand la case est cochée ou décochée.
  check.addEventListener("change", function () {
    // toggle ajoute la classe si elle manque, ou la retire si elle existe.
    item.classList.toggle("completed");
    label.classList.toggle("done");
    updateTaskCount();
  });

  // Un clic sur Supprimer retire la tâche.
  remove.addEventListener("click", function () {
    item.remove();
    updateTaskCount();
  });

  // append place la case, le texte et le bouton dans le li.
  item.append(check, label, remove);

  // appendChild place le nouveau li dans la liste.
  taskList.appendChild(item);

  // On vide le champ après l'ajout.
  taskInput.value = "";
  updateTaskCount();
}

// On vérifie que le bouton existe avant d'écouter son clic.
if (addTaskButton) {
  addTaskButton.addEventListener("click", addTask);
}

// On permet aussi d'ajouter une tâche avec la touche Entrée.
if (taskInput) {
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
}


// ==========================================================
// 4. MINI-PROJET : QUIZ
// ==========================================================

// Un tableau [] contient plusieurs questions.
// Chaque question est un objet {} avec un texte, des choix et une réponse.
// correct contient le numéro de la bonne réponse. Le comptage commence à 0.
var questions = [
  {
    text: "Quelle balise contient le titre principal ?",
    choices: ["<p>", "<h1>", "<img>"],
    correct: 1
  },
  {
    text: "Quel langage ajoute le style ?",
    choices: ["CSS", "HTML", "SQL"],
    correct: 0
  },
  {
    text: "Quel langage rend la page interactive ?",
    choices: ["Bootstrap", "JavaScript", "Leaflet"],
    correct: 1
  }
];

// Le quiz commence à la première question avec un score de zéro.
var questionNumber = 0;
var score = 0;
var startQuiz = document.getElementById("startQuiz");

// Cette fonction affiche la question actuelle et ses boutons de réponse.
function showQuestion() {
  var question = questions[questionNumber];
  document.getElementById("question").textContent = question.text;

  var answers = document.getElementById("answers");

  // innerHTML = "" vide les anciennes réponses.
  answers.innerHTML = "";

  // forEach répète le code pour chaque réponse possible.
  question.choices.forEach(function (choice, index) {
    var button = document.createElement("button");
    button.className = "btn btn-outline-primary";
    button.textContent = choice;

    button.addEventListener("click", function () {
      checkAnswer(index);
    });

    answers.appendChild(button);
  });
}

// Cette fonction vérifie la réponse choisie.
function checkAnswer(answer) {
  // Si le numéro choisi correspond à correct, le score augmente de 1.
  if (answer === questions[questionNumber].correct) {
    score++;
  }

  // On passe à la question suivante.
  questionNumber++;

  // S'il reste une question, on l'affiche.
  if (questionNumber < questions.length) {
    showQuestion();
  } else {
    // Sinon, le quiz est terminé et on affiche le résultat.
    document.getElementById("question").textContent = "Quiz terminé !";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("quizResult").textContent =
      "Votre score : " + score + " / " + questions.length;

    startQuiz.textContent = "Recommencer";
    startQuiz.style.display = "inline-block";
  }
}

// Le bouton initialise ou recommence le quiz.
if (startQuiz) {
  startQuiz.addEventListener("click", function () {
    questionNumber = 0;
    score = 0;
    startQuiz.style.display = "none";
    document.getElementById("quizResult").textContent = "";
    showQuestion();
  });
}


// ==========================================================
// 5. MINI-PROJET : GALERIE AVEC JQUERY
// ==========================================================

// window.jQuery vérifie que la bibliothèque jQuery est bien chargée.
if (window.jQuery) {
  // .on("click") attend un clic sur un bouton de filtre.
  $(".gallery-filter").on("click", function () {
    // $(this) représente le bouton qui vient d'être cliqué.
    // .data("filter") lit son attribut data-filter.
    var filter = $(this).data("filter");

    // fadeOut cache progressivement toutes les images en 200 ms.
    $(".gallery img").fadeOut(200);

    // On attend la fin de fadeOut avant de montrer les bonnes images.
    setTimeout(function () {
      if (filter === "all") {
        $(".gallery img").fadeIn(300);
      } else {
        // Cette sélection cherche les images ayant la bonne data-category.
        $('.gallery img[data-category="' + filter + '"]').fadeIn(300);
      }
    }, 220);
  });

  // Un clic sur une image ouvre la grande image dans la lightbox.
  $(".gallery img").on("click", function () {
    // .attr("src") lit ou modifie l'adresse de l'image.
    $("#lightbox img").attr("src", $(this).attr("src"));

    // La lightbox utilise flex, puis apparaît avec fadeIn.
    $("#lightbox").css("display", "flex").hide().fadeIn();
  });

  // Un clic sur la croix ou le fond ferme la lightbox.
  $("#lightbox button, #lightbox").on("click", function () {
    $("#lightbox").fadeOut();
  });
}


// ==========================================================
// 6. MINI-PROJET : ANIMATION JQUERY
// ==========================================================

if (window.jQuery) {
  // Bouton Gauche / Droite.
  $("#boutonHorizontal").click(function () {
    // On calcule la place disponible dans le carré.
    // On retire 70 : 60 px pour le cercle et 10 px de marge.
    var limiteDroite = $("#carreNoir").width() - 70;

    // stop(true) arrête une ancienne animation avant d'en commencer une autre.
    // animate modifie progressivement la position left.
    // 800 signifie que le mouvement dure 800 millisecondes.
    $("#cercleRouge")
      .stop(true)
      .animate({ left: limiteDroite + "px" }, 800)
      .animate({ left: "10px" }, 800);
  });

  // Bouton Haut / Bas.
  $("#boutonVertical").click(function () {
    var limiteBas = $("#carreNoir").height() - 70;

    // La propriété top déplace le cercle verticalement.
    $("#cercleRouge")
      .stop(true)
      .animate({ top: limiteBas + "px" }, 800)
      .animate({ top: "10px" }, 800);
  });

  // Le bouton Reset remet top et left à 10 px.
  $("#boutonReset").click(function () {
    $("#cercleRouge")
      .stop(true)
      .animate({ top: "10px", left: "10px" }, 300);
  });
}


// ==========================================================
// 7. MINI-PROJET : CARTE LEAFLET
// ==========================================================

// On vérifie que le div map existe et que Leaflet (L) est chargé.
if (document.getElementById("map") && window.L) {
  // setView reçoit les coordonnées de Bruxelles et le niveau de zoom.
  var map = L.map("map").setView([50.8467, 4.3525], 13);

  // tileLayer ajoute le fond de carte provenant d'OpenStreetMap.
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

  // marker place un marqueur grâce à une latitude et une longitude.
  // bindPopup ajoute le petit texte qui apparaît au clic.
  L.marker([50.8467, 4.3525])
    .addTo(map)
    .bindPopup("<b>Grand-Place</b><br>Le cœur historique de Bruxelles.");

  L.marker([50.8949, 4.3415])
    .addTo(map)
    .bindPopup("<b>Atomium</b><br>Un symbole incontournable de la ville.");

  L.marker([50.8419, 4.3599])
    .addTo(map)
    .bindPopup("<b>Mont des Arts</b><br>Une belle vue et de nombreux musées.");
}


// ==========================================================
// 8. FORMULAIRE DE CONTACT : JQUERY ET REGEX
// ==========================================================

if (window.jQuery) {
  // ready attend que tout le HTML soit chargé.
  $(document).ready(function () {
    // submit se déclenche quand on envoie le formulaire.
    $("#contactForm").submit(function (event) {
      // preventDefault empêche le rechargement normal de la page.
      event.preventDefault();

      // .val() récupère les valeurs des champs.
      var nom = $("#name").val().trim();
      var email = $("#email").val().trim();
      var message = $("#message").val().trim();

      /*
      REGEX DU NOM :
      ^ et $ marquent le début et la fin.
      [A-Za-zÀ-ÖØ-öø-ÿ' -] autorise lettres, accents, espace, ' et -.
      {2,} demande au moins 2 caractères.
      */
      var regexNom = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/;

      /*
      REGEX DE L'E-MAIL :
      La première partie accepte lettres, chiffres et certains signes.
      @ est obligatoire.
      Le domaine est suivi d'un point et d'au moins 2 lettres.
      Exemple accepté : bruce@email.com
      */
      var regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

      /*
      REGEX DU MESSAGE :
      [\s\S] accepte tous les caractères, même les retours à la ligne.
      {10,} demande au moins 10 caractères.
      */
      var regexMessage = /^[\s\S]{10,}$/;

      // .test() renvoie true si la valeur respecte la regex, sinon false.
      var nomValide = regexNom.test(nom);
      var emailValide = regexEmail.test(email);
      var messageValide = regexMessage.test(message);

      // On utilise la même fonction pour vérifier les trois champs.
      afficherErreur(
        "#name",
        "#nameError",
        nomValide,
        "Utilisez au moins 2 lettres pour votre nom."
      );

      afficherErreur(
        "#email",
        "#emailError",
        emailValide,
        "Écrivez une adresse comme nom@email.com."
      );

      afficherErreur(
        "#message",
        "#messageError",
        messageValide,
        "Écrivez au moins 10 caractères."
      );

      // && signifie ET : les trois conditions doivent être vraies.
      if (nomValide && emailValide && messageValide) {
        $("#formSuccess")
          .text("Merci ! Le formulaire est correctement rempli.")
          .hide()
          .fadeIn();

        // [0] récupère le vrai formulaire HTML pour utiliser reset().
        $("#contactForm")[0].reset();

        // On retire les bordures vertes après avoir vidé le formulaire.
        $("#contactForm .form-control").removeClass("is-valid");
      } else {
        // Si un champ est faux, on retire le message de réussite.
        $("#formSuccess").text("");
      }
    });
  });
}

// Cette fonction évite de répéter le même code pour chaque champ.
function afficherErreur(champ, zoneErreur, estValide, texteErreur) {
  if (estValide) {
    // Champ correct : on vide l'erreur et on ajoute la bordure verte.
    $(zoneErreur).text("");
    $(champ).removeClass("is-invalid").addClass("is-valid");
  } else {
    // Champ incorrect : on affiche l'erreur et la bordure rouge.
    $(zoneErreur).text(texteErreur);
    $(champ).removeClass("is-valid").addClass("is-invalid");
  }
}
