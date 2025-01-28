// Animation Toggles
const loader_container = document.querySelector(".loader-container")

// Main Processing Logic

const digimon_input = document.querySelector(".digimon");
const geometryInput = document.querySelector(".geometry");
const geoResult = document.querySelector(".geo_result");

function process() {
  try {
    const geoData = JSON.parse(geometryInput.value);
    geoData["minecraft:geometry"].forEach(item => {
      if (item.description && item.description.identifier) {
        item.description.identifier = digimon_input.value;
      }
    });
    geoResult.innerText = "Analyze the process...";
    geometry = JSON.stringify(geoData,
      null,
      2);
    processing(true);
    digimon = digimon_input.value;
  } catch {
    geoResult.innerText = "Analyze the process...";
    processing(false);
  }
}

function processing(sucess) {
  if (sucess === true) {
    loader_container.innerHTML = `
    <div class="loader-item loader-1">
    <i class="material-icons loader-check-icon"></i>
    </div>`;
    setTimeout(function() {
      let loader1 = document.querySelector(".loader-1");
      //let loader2 = document.querySelector(".loader-2");
      let loaderCheckIcon = document.querySelector(".loader-check-icon");
      // let loaderFailureIcon = document.querySelector(".loader-failure-icon");
      loader1.classList.toggle("loader-success-completed");
      loaderCheckIcon.classList.toggle("loader-check-icon-completed");
      loaderCheckIcon.innerText = "check";
      const data = {
        digimon: digimon, geometry: geometry
      };
      const queryString = new URLSearchParams(data).toString();
      window.location.href = `/behavior.html?${queryString}`;
    },
      Math.floor(Math.random()*5000));
  } else {
    loader_container.innerHTML = `
    <div class="loader-item loader-2">
    <i class="material-icons loader-failure-icon"></i>
    </div>`;
    setTimeout(function() {
      geoResult.innerText = "Invalid JSON input.";
      //  let loader1 = document.querySelector(".loader-1");
      let loader2 = document.querySelector(".loader-2");
      // let loaderCheckIcon = document.querySelector(".loader-check-icon");
      let loaderFailureIcon = document.querySelector(".loader-failure-icon");

      loader2.classList.toggle("loader-failure-completed");
      loaderFailureIcon.classList.toggle("loader-failure-icon-completed");
      loaderFailureIcon.innerText = "clear";
    },
      Math.floor(Math.random()*5000));
  }
}
