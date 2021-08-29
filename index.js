document.getElementById("results-text").style.display = "none";
document.getElementById("clubDetailsContainer").style.display = "none";
const searchTeam = () => {
  document.getElementById("clubDetailsContainer").style.display = "none";
  const searchBox = document.getElementById("searchBox");
  const searchText = searchBox.value;
  searchBox.value = "";
  if (searchText == "") {
    const result = document.getElementById("results-text");
    result.style.display = "block";
    result.innerText = "Please Enter Your Favourite Team Name";
    return;
  } else {
    document.getElementById("results-text").style.display = "none";
  }

  const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTeamsInformation(data.teams));
};

const displayTeamsInformation = (teamsinfo) => {
  if (teamsinfo == null) {
    const clubContainer = document.getElementById("clubcontainer");
    clubContainer.textContent = "";
    const result = document.getElementById("results-text");
    result.style.display = "block";
    result.innerText = "No Results Found";
    return;
  } else {
    document.getElementById("results-text").style.display = "none";
  }
  const clubContainer = document.getElementById("clubcontainer");
  clubContainer.textContent = "";
  teamsinfo.forEach((team) => {
    const div = document.createElement("div");
    div.classList.add("col");
    if (team.strTeamLogo == null) {
      div.innerHTML = `
        <div onclick="clubDetails(${team.idTeam})" class="card">
                <img width="50%" class="mx-auto" height="176px"  src="./images/sports-holder.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${team.strTeam}</h5>
                  <p class="card-text">${team.strDescriptionEN.slice(
                    0,
                    250
                  )}</p>
                </div>
              </div>
        `;
    } else {
      div.innerHTML = `
        <div onclick="clubDetails(${team.idTeam})" class="card">
                <img  src="${team.strTeamLogo}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${team.strTeam}</h5>
                  <p class="card-text">${team.strDescriptionEN.slice(
                    0,
                    250
                  )}</p>
                </div>
              </div>
        `;
    }
    clubContainer.append(div);
  });
};

const clubDetails = async (id) => {
  document.getElementById("clubDetailsContainer").style.display = "block";

  const clubsContainer = document.getElementById("clubDetailsContainer");
  clubsContainer.textContent = "";

  const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`;

  const res = await fetch(url);
  const data = await res.json();

  const div = document.createElement("div");
  const imagUrl = data.teams[0].strTeamLogo;
  if (imagUrl == null) {
    div.innerHTML = `
    <div class="card">
                  <img  src="./images/sports-holder.jpg" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${data.teams[0].strTeam}</h5>
                    <p class="card-text">${data.teams[0].strDescriptionEN}</p>
                  </div>
                </div>
    
    `;
  } else {
    div.innerHTML = `
  <div class="card">
                <img  src="${data.teams[0].strTeamLogo}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${data.teams[0].strTeam}</h5>
                  <p class="card-text">${data.teams[0].strDescriptionEN}</p>
                </div>
              </div>
  
  `;
  }

  clubsContainer.appendChild(div);
};
