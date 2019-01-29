let buttons = document.querySelectorAll(".transition-button");
let form = document.querySelector("form");
let globSkills;
let globSkillsCounter = 0;
let skillButtons = document.querySelectorAll(".skills-table-button");
//eventListeners

document.addEventListener("DOMContentLoaded", () => {
  fetch(`/skills`)
    .then(response => {
      return response.json();
    })
    .then(result => {
      console.log(result);
      let skills = [];
      let emptyArr = Object.values(result).map(obj => {
        return Object.keys(obj);
      });

      globSkills = skills
        .concat(emptyArr[0], emptyArr[1], emptyArr[2])
        .sort(function() {
          return 0.5 - Math.random();
        });

      setTimeout(moveOut, 2000);
    })
    .catch(err => console.log(err));
});

buttons.forEach(button => {
  button.addEventListener("mouseover", function(e) {
    console.log(e.target.innerHTML, "true");

    e.target.querySelector(
      ".transition-arrow"
    ).innerHTML = `<i class="fas fa-arrow-down"></i>`;
  });
});

buttons.forEach(button => {
  button.addEventListener("mouseout", function(e) {
    console.log("false");
    e.target.querySelector(
      ".transition-arrow"
    ).innerHTML = `<i class="fas fa-arrow-right"></i>`;
  });
});

skillButtons.forEach(button => {
  button.addEventListener("click", event => {
    //remove active button highlight and let css focus do the rest
    document.querySelector(".table-active").classList.remove("table-active");
    event.target.classList.add("table-active");
    getData(event.target.textContent, showResults);
  });
});

form.addEventListener("submit", event => {
  event.preventDefault();
  document.querySelectorAll(".form-item").forEach(item => {
    item.value = "";
  });
});

//functions
function getData(button, callback) {
  fetch(`/skills`)
    .then(response => {
      return response.json();
    })
    .then(result => {
      callback(button, result);
    })
    .catch(err => console.log(err));
}

function showResults(button, result) {
  console.log(button, "from showResults");
  switch (button) {
    case "Back-end":
      showSkills(result.backEnd);
      break;

    case "Marketing":
      showSkills(result.marketing);
      break;

    case "Other":
      showSkills(result.other);
      break;

    default:
      showSkills(result.frontEnd);
  }
}

function showFrontEndSkills() {}
function showSkills(item) {
  let skills = [];

  for (let prop in item) {
    skills.push(prop);
  }
  document.querySelectorAll(".item-empty").forEach(cell => {
    cell.textContent = "";
  });
  skills.map((skill, index) => {
    let cycle = 0;

    document.querySelector(`.subject-${index + 1}`).textContent = skill;
    document.querySelectorAll(`.item-row-${index + 2}`).forEach(cell => {
      cycle++;
      let score = item[skill];

      if (cycle > score) {
        cell.innerHTML = "";
      } else {
        //check if mobile site
        let winWidth = window.innerWidth;

        if (winWidth < 820) {
          console.log("working");
          cell.innerHTML = `<i class="fas fa-futbol fa-xs"></i>`;
          return;
        }
        switch (cycle) {
          case 1:
            cell.innerHTML = `<i class="fas fa-futbol fa-xs"></i>`;
            break;
          case 2:
            cell.innerHTML = `<i class="fas fa-futbol fa-sm"></i>`;
            break;
          case 3:
            cell.innerHTML = `<i class="fas fa-futbol fa-lg"></i>`;
            break;
          case 4:
            cell.innerHTML = `<i class="fas fa-futbol fa-2x"></i>`;
            break;
          case 5:
            cell.innerHTML = `<i class="fas fa-futbol fa-3x"></i>`;
            break;
        }
      }
    });
  });
}

function moveIn() {
  if (globSkillsCounter === globSkills.length - 1) {
    globSkillsCounter = 0;
  }
  document.querySelector(".front-skills-span").textContent =
    globSkills[globSkillsCounter];

  globSkillsCounter++;
  document.querySelector(".front-skills-span").style.opacity = 0;
  document.querySelector(".front-skills-span").style.opacity = 1;

  setTimeout(moveOut, 2000);
}

function moveOut() {
  document.querySelector(".front-skills-span").style.opacity = 1;
  document.querySelector(".front-skills-span").style.opacity = 0;

  setTimeout(moveIn, 1500);
}
