let frontButtonArrow = document.querySelector(".front-button-array");
let frontButton = document.querySelector(".front-button");
let skillButtons = document.querySelectorAll(".skills-table-button");

//eventListeners
frontButton.addEventListener("mouseover", function(e) {
  frontButtonArrow.innerHTML = "&darr;";
});
frontButton.addEventListener("mouseout", function(e) {
  frontButtonArrow.innerHTML = "&rarr;";
});

skillButtons.forEach(button => {
  button.addEventListener("click", event => {
    //remove active button highlight and let css focus do the rest
    document.querySelector(".table-active").classList.remove("table-active");
    event.target.classList.add("table-active");
    getData(event.target.textContent, showResults);
  });
});

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
