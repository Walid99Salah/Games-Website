"use strict";

const getAllData = document.getElementById("getAllData");
const rowDetails = document.getElementById("rowDetails");
const games = document.querySelector(".games");
const gameDetails = document.querySelector(".gameDetails");
const closeBtn = document.querySelector(".closeBtn");
const elements = document.querySelectorAll(".morp");

const url =
  "https://free-to-play-games-database.p.rapidapi.com/api/games?category=MMORPG";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "98a55ac188mshaeb96be176a0535p176514jsn0fa6dbc30349",
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
  },
};

var allGames = [];

async function getData(newApi = "mmorpg") {
  try {
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${newApi}`,
      options
    );
    const result = await response.json();
    allGames = result;
    console.log(allGames);
    displayData();
  } catch (error) {
    console.error(error);
  }
}

getData();

function displayData() {
  var cartoon = ``;

  for (let i = 0; i < allGames.length; i++) {
    cartoon += `<div class="col-lg-3 col-md-6">
            <div onclick="cardClick(${i})" class="card bg-transparent h-100 cardborder cardhover">
              <img loading="lazy" src="${
                allGames[i].thumbnail
              }" class="card-img-top px-3 pt-3" alt="game image"/>
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title text-white small">${
                    allGames[i].title
                  }</h5>
                  <span class="badge text-bg-primary align-items-center d-flex px-2" >Free</span>
                </div>
                <p class="card-text small text-center opacity-50 text-secondary"> ${allGames[
                  i
                ].short_description
                  .split(" ")
                  .slice(0, 8)
                  .join(",")}</p>
              </div>
              <div class="card-footer hstack justify-content-between pb-2 align-items-center">
                <span class="badge badge-color bg-dark">${
                  allGames[i].genre
                }</span>
                <span class="badge badge-color bg-dark">${
                  allGames[i].platform
                }</span>
              </div>
            </div>
          </div>`;
  }
  getAllData.innerHTML = cartoon;
}

function cardClick(index) {
  games.classList.add("d-none");
  gameDetails.classList.remove("d-none");
  let cartoon = `<div class="col-lg-4">
            <img src="${allGames[index].thumbnail}" class="w-100 h-100" alt="toptop">
          </div>
          <div class="col-lg-8">
            <div class="details">
              <h3 class=" pt-2 text-white">Title: ${allGames[index].title}</h3>
              <p class="text-white">Category: <span class="badge text-bg-info"> ${allGames[index].genre}</span></p>
              <p class="text-white">Platform: <span class="badge text-bg-info"> ${allGames[index].platform}</span></p>
              <p class="text-white">Status: <span class="badge text-bg-info"> Live</span></p>
              <p class="text-white small">Tarisland is a free-to-play cross-platform MMORPG developed by Level Infinite and Published by Tencent. Available on PC and mobile devices, the game allows players to easily move between both, taking the game with them when they can’t be at their desk. The game is designed to appeal to players of MMOs like World of Warcraft, offering players nine playable classes and 18 specializations. Each class features an extensive talent tree system and can be customized. Players of existing MMOs will be familiar with the standard tank, DPS, and healer lineup, necessary for the game’s classic raid and dungeon system. Explore a vast game world and solve mysteries. Pick up various trades such as gathering, mining, and crafting, and sell your items on the auction house.</p>
              <a href="${allGames[index].game_url}" target="_blank" class="btn btn-outline-warning text-white">Show Game </a>
            </div>
          </div>`;

  rowDetails.innerHTML = cartoon;
}

let newApi;

elements.forEach((element) => {
  element.addEventListener("click", function (e) {
    newApi = e.srcElement.innerHTML;
    getData(newApi);
  });
});

closeBtn.addEventListener("click", function (e) {
  games.classList.remove("d-none");
  gameDetails.classList.add("d-none");
});
