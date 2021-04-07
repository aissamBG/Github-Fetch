/*
[1]Use this fake api ( https://jsonplaceholder.okami101.io/ ) to create a website without input field

//get main variable
let theInput = document.querySelector('.repos-container input');
let getButton = document.querySelector('.get-button');
let reposData = document.querySelector('.show-data');

getButton.onclick = function () {
    getRepos();
}
//Get repos function
function getRepos() {
    if (theInput.value == '') {
        reposData.innerHTML = '<span>Please write Github Username.</span>'
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`).then((response) => response.json()).then((repositories) => {
            //empty the conainer
            reposData.innerHTML = '';
            //Loop on repositories
            repositories.forEach(repo => {
                //Create maindiv element
                let mainDiv = document.createElement(`div`);
                //Create repo name text
                let repoName = document.createTextNode(repo.name);
                //Append the text to main div
                mainDiv.appendChild(repoName);
                //Create repo url anchor
                let theUrl = document.createElement(`a`);
                //Create repo url text
                let theUrlText = document.createTextNode(`Viste`);
                //Append url text to anchor tag
                theUrl.appendChild(theUrlText);
                //Add the hyperText href
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
                //Set attribute blank
                theUrl.setAttribute(`target`, `_blank`);
                //Append url anchor to main div
                mainDiv.appendChild(theUrl);
                //Create stars count span
                let starsSpan = document.createElement(`span`);
                //Create stars count text
                let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
                //Add stars count text to starsSpan
                starsSpan.appendChild(starsText);
                //Add starsSpan to mainDiv
                mainDiv.appendChild(starsSpan);
                //Add class on mainDiv
                mainDiv.className = `repo-box`
                //Add maindiv to container
                reposData.appendChild(mainDiv);
            })
        }
        )
    }
}

window.onload = function () {
    theInput.focus();
}
*/

let theInput = document.querySelector(`.repos-name input`);
let button = document.querySelector(`.repos-name span`);
let reposBox = document.querySelector(`.repos`);
function getRepos() {

    if (theInput.value !== '') {

        fetch(`https://api.github.com/users/${theInput.value}/repos`).then(response => response.json()).then(data => {

            reposBox.innerHTML = `<span class='repos-count'><b>${data.length} repositries found</b></span>`;
            for (let repos of data) {
                //reposBox.innerHTML += `${repos.name}<br>`
                let reposSpan = document.createElement(`span`);
                let spanText = document.createTextNode(repos.full_name);

                let createAt = document.createElement(`span`);
                let createAtText = document.createTextNode(repos.created_at.substring(0, 10));
                createAt.append(createAtText);
                createAt.className = `creation`;

                let stars = document.createElement(`span`);
                let starsText = document.createTextNode(repos.stargazers_count + ' stars');
                stars.appendChild(starsText);
                stars.className = `stars`;

                let link = document.createElement(`a`);
                let textLink = document.createTextNode(`Viste`);
                link.appendChild(textLink);
                link.className = `link`;
                link.setAttribute(`href`, repos.clone_url);
                link.setAttribute(`target`, `_blank`)

                reposSpan.appendChild(spanText);

                reposBox.appendChild(reposSpan);
                reposSpan.appendChild(stars);
                reposSpan.appendChild(link);
                reposSpan.appendChild(createAt);
            }
        })
    } else {
        reposBox.innerHTML = 'The field is empty, please gave a Github username';
        console.log(`else!!!!`)
    }
}

button.onclick = function () {
    getRepos();
}

window.onload = function () {
    theInput.focus()
}

