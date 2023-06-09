//
/*
The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.
Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)
Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.
Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.
*/

const githubForm = document.getElementById("github-form");

githubForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("search").value;
    
    fetch(`https://api.github.com/search/users?q=${username}`, {
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const users = data.items;
        users.forEach(user => {
            const userDiv = document.createElement("div");
            userDiv.className = "user";
            const userImg = document.createElement("img");
            userImg.src = user.avatar_url;
            const userLink = document.createElement("a");
            userLink.href = user.html_url;
            userLink.innerText = user.login;
            userDiv.append(userImg, userLink);
            document.getElementById("user-list").append(userDiv);
        });
    })
    .catch(err => console.log(err));
});

function getRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const repos = data;
        repos.forEach(repo => {
            const repoDiv = document.createElement("div");
            repoDiv.className = "repo";
            const repoLink = document.createElement("a");
            repoLink.href = repo.html_url;
            repoLink.innerText = repo.name;
            repoDiv.append(repoLink);
            document.getElementById("repos-list").append(repoDiv);
        });
    })
    .catch(err => console.log(err));
}

document.getElementById("user-list").addEventListener("click", (e) => {
    e.preventDefault();
    const username = e.target.innerText;
    getRepos(username);
});
