const loadTeam = () => {
  // spinner
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";

  const inputFeild = document.getElementById("search-box");
  const inputText = inputFeild.value;

  const notify = document.getElementById("notify1");
  if (inputFeild.value == "") {
    notify.style.display = "block";
  } else {
    notify.style.display = "none";
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayTeam(data.teams));
  }
  inputFeild.value = "";
};

const displayTeam = (teams) => {
  // spinner
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
  const teamBox = document.getElementById("team-box");
  teamBox.textContent = "";
  const notify = document.getElementById("notify");
  if (teams == null) {
    notify.style.display = "block";
  } else {
    teams.forEach((team) => {
      notify.style.display = "none";
      // console.log(team.strTeamBadge);
      const teamDiv = document.createElement("div");
      teamDiv.classList.add("col-md-3", "col-sm-1", "w-25");
      const teamWebsite = `${team.strWebsite}`;
      // console.log(teamWebsite);
      teamDiv.innerHTML = `
      <div onclick="displayTeamByName('${
        team.idTeam
      }')" class="card border border-3 border-success">
      <div class="card-body">
      <img src="${team.strTeamBadge}" class=" mt-2 img-fluid" alt="..." />
        <h4 class="card-title text-success">Club Name: ${team.strTeam}</h4>
        <h5 class="card-title text-primary">Country Name: ${
          team.strCountry
        }</h5>
        <p class="card-text">
          ${team.strDescriptionEN.slice(0, 100)}
        </p>
        <a href="#" onclick="displayTeamByName('${
          team.idTeam
        }')"  class="btn btn-outline-success">See Details</a>
      </div>
      </div>
      `;
      teamBox.appendChild(teamDiv);
    });
  }
};

const displayTeamByName = async (id) => {
  const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`;

  const res = await fetch(url);
  const data = await res.json();
  showTeam(data.teams[0]);
};

const showTeam = (team) => {
  const showTeam = document.getElementById("show-team");
  console.log(team);
  showTeam.textContent = "";

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card">
        <div class="card-body">
          <img src="${team.strTeamBadge}" class="mt-2 img-fluid" alt="..." />
          <h4 class="text-success">Club Name: ${team.strTeam}</h4>
          <h5 class="text-primary">Country Name: ${team.strCountry}</h5>
          <p class="card-text">
          ${team.strDescriptionEN.slice(0, 200)}
          </p>
          <a href="https://${
            team.strWebsite
          }" class="btn btn-outline-primary">View Website</a>
        </div>
      </div>
  `;
  showTeam.appendChild(div);
};
