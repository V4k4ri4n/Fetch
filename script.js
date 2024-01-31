const divGitHub   = document.getElementById("github-user");
const btnGet      = document.getElementById("get-user");
const inputUser   = document.getElementById("user");
const errorFetch  = document.getElementById("error");
const gitUsername = document.getElementById("name");
const avatar      = document.getElementById("avatar");
inputUser.value = "";

inputUser.onkeydown = () => {
    if(inputUser.className = "error") inputUser.classList = "";
    if(errorFetch.style.display != "none") errorFetch.style.display = "none";
}

btnGet.onclick = async () => { 
    if(inputUser.value === ""){
        erreurInputUser("Merci de saisir une valeur avant de récupérer le profil GitHub");
    }else{
        fetch("https://api.github.com/users/"+inputUser.value)
        .then((response) => {
            if(!response.ok) throw new Error(`Impossible de récupérer l'utilisateur github une erreur ${response.status} est survenue !`);
            return response.json();
        }).then((user) => {
            if(errorFetch.style.display != "none") errorFetch.style.display = "none";
            avatar.style.display = "block";
            divGitHub.style.display = "block";
            gitUsername.textContent = user.login
            avatar.setAttribute('src',user.avatar_url);
        }).catch((error) => {
            erreurInputUser(error);
        });
    }
};

/**
 * Affiche un message d'erreur dans l'input de saisie du login github
 * 
 * @param {String} message - Message d'erreur
 */
function erreurInputUser(textError){
    if(avatar.style.display != "none") avatar.style.display = "none";
    if(divGitHub.style.display != "none") divGitHub.style.display = "none";
    errorFetch.style.display = "block";
    errorFetch.textContent = textError;
    inputUser.classList.add("error");
}