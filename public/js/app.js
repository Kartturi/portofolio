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


      globSkills = skills.concat(result.frontEnd, result.backEnd, result.marketing).map(item => {
        return item.skill;
      }).sort(function () {
        return 0.5 - Math.random();
      });
      setTimeout(moveOut, 1000);
    })
    .catch(err => console.log(err));

  //skilldata init
  getData("Front-end", showResults);


});

buttons.forEach(button => {
  button.addEventListener("mouseover", function (e) {

    e.target.querySelector(
      ".transition-arrow"
    ).innerHTML = `<i class="fas fa-arrow-down"></i>`;
  });
});

buttons.forEach(button => {
  button.addEventListener("mouseout", function (e) {
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
  let statusMessage = document.querySelector(".about-form-status-message");
  let formInput = [];
  let formData = {
    name: "",
    email: "",
    phone: "",
    message: ""
  };
  event.preventDefault();
  document.querySelectorAll(".form-item").forEach(item => {
    formInput.push(item.value);
  });

  formData.name = formInput[0];
  formData.email = formInput[1];
  formData.phone = formInput[2];
  formData.message = formInput[3];
  if (formData.name === "") {
    console.log("hype");
    statusMessage.textContent = "fill the blanks will ya";
    setTimeout(() => {
      statusMessage.textContent = "";
    }, 4000);
    return;
  }
  console.log(formData, "from from data");
  fetch(`/contact`, {
    headers: {
      "Content-Type": "application/json"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(result => {
      console.log(result, "from result");

      statusMessage.textContent = result.message;

      setTimeout(() => {
        statusMessage.textContent = "";
      }, 4000);
    });
});

if (window.innerWidth < 820) {
  let projectFrontSide = document.querySelectorAll(".project-front-side");

  projectFrontSide.forEach(project => {
    project.addEventListener("click", event => {
      console.log(event);
      let project = event.path[3];
      let front = project.querySelector(".project-front-side");
      let back = project.querySelector(".project-back-side");
      front.style.transform = "rotateY(-180deg)";
      back.style.transform = "rotateY(0)";
    });
  });

  let projectBackButton = document.querySelectorAll(
    ".project-side-mobile-button"
  );

  projectBackButton.forEach(button => {
    button.addEventListener("click", event => {
      let project = event.path[3];
      let front = project.querySelector(".project-front-side");
      let back = project.querySelector(".project-back-side");
      front.style.transform = "rotateY(0)";
      back.style.transform = "rotateY(180deg)";
    });
  });
}

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
  switch (button) {
    case "Back-end":
      showSkills(result.backEnd);
      break;

    case "Marketing & Others":
      showSkills(result.marketing);
      break;

    default:
      showSkills(result.frontEnd);
  }
}

function showFrontEndSkills() { }
function showSkills(item) {

  let table = document.querySelector(".skills-table");

  deleteRows(table);


  for (let prop of item) {
    let row = table.insertRow();
    let skillName = row.insertCell(0);
    skillName.innerHTML = prop.skill
    for (let i = 1; i <= 3; i++) {
      let text = ""
      let cell = row.insertCell(-1)
      console.log(prop.score);
      if (prop.score === i) {
        text = randomBalls();
      }
      cell.innerHTML = text;


    }
  }


}

function randomBalls() {
  let balls = [
    "volleyball-ball",
    "football-ball",

    "basketball-ball",
    "baseball-ball",
    "golf-ball",
    "table-tennis"
  ]

  let randomball = balls[Math.floor(Math.random() * (balls.length + 1))] || "football-ball"
  console.log(randomball);
  return `<i class="fas fa-${randomball}"></i>`
}

function deleteRows(table) {
  let rowLength = table.rows.length;

  for (let i = rowLength - 1; i > 0; i--) {
    table.deleteRow(i);
  }
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

  setTimeout(moveOut, 1000);
}

function moveOut() {
  document.querySelector(".front-skills-span").style.opacity = 1;
  document.querySelector(".front-skills-span").style.opacity = 0;

  setTimeout(moveIn, 1000);
}
