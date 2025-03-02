// Buttons
const btnAdd = document.querySelector('.btn-svg-add')
const btnExit = document.querySelector('.btn-svg-exit')

// Form
const addTaskInput = document.querySelector('.add-task-input-container')
const addFormTask = document.getElementById('add-form-task')
const selectState = document.getElementById('form-task-state')
const taskDate = document.getElementById('form-task-date')
const taskTitle = document.getElementById('form-task-title')
// Task state
const stateBtn = document.querySelector('div.dropdown button')
const stateOngoing = document.querySelector('span.task-ongoing')
const stateComplete = document.querySelector('span.task-complete')

// console.log(stateBtn);
// Afficher le formulaire pour ajouter une tâche
btnAdd.addEventListener('click', () =>{
    addTaskInput.classList.remove('hide');
});
// Cacher le formulaire d'ajout d'une tâche
btnExit.addEventListener('click',() =>{
    addTaskInput.classList.add('hide');
});

minDate();
// Créer une <li> d'une tâche après avoir rempli le formulaire
addFormTask.addEventListener('submit', (event) =>{
    event.preventDefault();
    let date = taskDate.value.trim();
    let title = taskTitle.value.trim();
    if(date === '' || title === '')
        console.log("Ne pas laisser de champs vide !")
    else{
        addTaskInput.classList.add('hide');
        // console.log(displayDate(date),title);
        addTask(displayDate(date),title);
        taskDate.value = '';
        taskTitle.value = '';
        

    }
});

/* ************************************************ */
/* FONCTIONS */
/**
 * affiche la date au format (DD/MM/YYYY)
 */
function displayDate(date){
    let d = new Date(date);
    return d.toLocaleDateString();
}
/**
 * bloque la sélection de la date du formulaire à partir de la date du jour
 */
function minDate(){
    // Récupère la date du jour
    let d = new Date();
    // Convertit la date au format ISO (YYYY-MM-DDTHH:MM:SSZ)
    let dateISO = d.toISOString();
    // Récupère seulement la date (YYYY-MM-DD)
    let id = dateISO.indexOf('T');
    let minDate = dateISO.slice(0,id);
    taskDate.min = minDate;
}
/**
 * le bouton state affiche les états diponible
 * Lorsqu'on clique sur le bouton, l'état est mis à jour dans la liste 
 */
function stateUpdate(span){
    span.addEventListener('click',() =>{
        let dropdownLists = document.querySelector('.dropdown-state');
        dropdownLists.classList.toggle('hide');
    });
} 
/**
 * Créer une <li> d'une nouvelle tâche
 * 
 * @param {Date} date 
 * @param {string} title 
 * @returns - une <li>
 */
function createTask(date,title){
    // Crée une <li> avec des classes
    let newLi = document.createElement('li');
    newLi.classList.add('li-task','li-updated');
    // Crée des <span> pour le status, la date et le titre de la tâche
    newLi.innerHTML = 
    `<div class="dropdown">
        <span class="task-state task-to-do" type="button">A faire</span>
        <div class="dropdown-state hide">
            <span class="task-state task-ongoing">En cours</span>
            <span class="task-state task-complete">Fini</span>
        </div>
    </div>
    <span>${date}</span>
    <span>${title}</span>`;
    let span = newLi.children[0].children[0];
    stateUpdate(span);
    return newLi;
}
/**
 * Créer une <div> avec une <li> et des boutons à sa droite
*/
function addTask(date,title){
    //Créer une div avec la classe "task-container"
    let newDiv = document.createElement('div');
    newDiv.classList.add('task-container');
    let newLi = createTask(date,title);
    // Ajoute la liste dans la div
    newDiv.appendChild(newLi);
    // Ajoute un bouton modifier dans la div
    // let editBtn = createBtn('button','edit','modifier',30);
    // newDiv.appendChild(editBtn);
    // Ajoute un bouton supprimer dans la div
    let trashBtn = createBtn('button','trash','supprimer',30);
    newDiv.appendChild(trashBtn);
    // Supprimer la liste
    trashBtn.addEventListener('click',() =>{
        newDiv.remove();
    })
    // Ajoute la div dans la liste ul
    let ul = document.querySelector('.hero-section ul');
    ul.appendChild(newDiv);

}
function archivedTask(state){
    /**
     * déplacer la liste avec le status "fini" dans la <ul> archive
     * désactive les boutons modifier et supprimer
     */
}
function sortTask(filter){
    /**
     * trier les tâches par date ou par état
     * possibilité de choisir l'ordre croissant ou décroissant
     */
}
function saveTaskLocal(task){
    /**
     * enregistrer les informations de l'utilisateur avec localhost
     * seul l'utilisateur peux voir ses informations
     * possibilité de connexion avec un compte ?
     */
}
/**
 * Créer un bouton à partir des images .svg
 * 
 * @param {string} btnAttribute :type = ['button','submit','reset']
 * @param {string} btnClass :nom du bouton = ['add','edit','trash','save','exit']
 * @param {string} imgName : nom de l'image = ['ajouter','modifier','supprimer','sauvegarder','annuler']
 * @param {number} dimension :width et height
 */
function createBtn(btnAttribute,btnClass,imgName,dimension){
    let btn = document.createElement('button');
    //    Ajoute un type à <button>
    btn.setAttribute('type', btnAttribute);
    //    Ajoute des classes à <button>
    btn.classList.add('btn-svg','btn-hide-text',`btn-svg-${btnClass}`);
    // Créé un élément object
    btn.innerHTML = `<object 
    data="btn_${imgName}.svg" 
    type="image/svg+xml" 
    width="${dimension}" 
    height="${dimension}">
    </object> 
    ${imgName}`;
    return btn;
}
/* *
 * Modifier le status dans le spanState
 * 
 * @param {HTMLElement} span : le <span> à modifier
 * @param {String} newClass : choisir une classe entre: task-to-do, task-ongoing, task-complete
 * @param {String} state : état: A faire, En cours, Fini
 */
/* function stateUpdate(span,newClass,state){
    // Créer un tableau de la liste des classes et récupérer la dernière classe de stateSpan
    let spanClasses = span.classList;
    let lastClass = spanClasses[spanClasses.length-1];
    span.classList.replace(lastClass, newClass);
    span.innerText = state;
    return span;
} */