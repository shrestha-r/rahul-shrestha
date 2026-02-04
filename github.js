const USERNAME = "shrestha-r";

async function loadGitHub() {
  const profileRes = await fetch(
    `https://api.github.com/users/${USERNAME}`
  );

  const reposRes = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?sort=updated`
  );

  const profile = await profileRes.json();
  const repos = await reposRes.json();

  renderProfile(profile);
  renderRepos(repos);
}

function renderProfile(data) {
  document.getElementById("github-profile").innerHTML = `
    <img src="${data.avatar_url}" width="80">
    <h3>${data.name}</h3>
    <p>${data.public_repos} Repositories</p>
    <p>${data.followers} Followers</p>
  `;
}

function renderRepos(repos) {
  const top = repos.slice(0, 6);

  const html = top.map(repo => `
    <div class="repo">
      <h4>${repo.name}</h4>
      <p>${repo.description || "No description"}</p>
      <p>⭐ ${repo.stargazers_count}</p>
      <a href="${repo.html_url}" target="_blank">View</a>
    </div>
  `).join("");

  document.getElementById("repo-list").innerHTML = html;
}

loadGitHub();
