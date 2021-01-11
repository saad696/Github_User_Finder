const USERAPI = "https://api.github.com/users/";


const form = document.getElementById("form");
const inputBox = document.getElementById("input-box");
// const searchBtn = document.getElementById("search");
getUser("saad696")
async function getUser(username){
    const response = await fetch(USERAPI + username);
    const responseData = await response.json();

    createUserCard(responseData);
    getRepository(username);
}

async function getRepository(username){
    const response = await fetch(USERAPI + username + "/repos");
    const responseData = await response.json();

    addReposToCard(responseData);
    console.log(responseData)
}

const createUserCard = (user) => {
    const cardHTML = 
    `
    
    <div class="card">
        <div class="avatar-container">
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar animate__animated animate__pulse animate__infinite	infinite">
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <h4>[${user.login}]</h4>
            <p>${user.bio}</p>
      
        <ul class="info">
            <li>${user.followers}<strong>Followers</strong></li>
            <li>${user.following}<strong>Following</strong></li>
            <li>${user.public_repos}<strong>Public Repos</strong></li>
        </ul>
        <div id="repos">
        <h4>User's Public Repos :</h4>
            </div>
        </div>
    </div>
    `
    document.getElementById("main").innerHTML = cardHTML
}

const addReposToCard = (repos) => {
    const reposEl = document.getElementById("repos");
    repos.slice(0,10).forEach(repo => {
        const repoEl = document.createElement("a")
        repoEl.classList.add("repo")
        repoEl.href = repo.html_url;
        repoEl.target = "_blank"
        repoEl.innerText = repo.name

        reposEl.append(repoEl);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
});