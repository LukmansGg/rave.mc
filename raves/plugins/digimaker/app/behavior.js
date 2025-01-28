const params = new URLSearchParams(window.location.search);
const __digimon__ = params.get('digimon');
const __geometry__ = params.get('geometry');

const digimon_name = document.querySelector(".digimon");
digimon_name.innerHTML = __digimon__;

let __stage__ = "rookie";
let __element__ = "none";
let __type__ = "none";

const stage_button = document.querySelectorAll(".btn-type");
const element_button = document.querySelectorAll(".btn-element");
const type_button = document.querySelectorAll(".btn-property");

const default_health_element = document.getElementById("default-health");
const level_health_element = document.getElementById("level-health");
const max_level_element = document.getElementById("max-level");
const max_health = document.querySelector(".simulated-max-health");

element_button.forEach((button) => {
  button.addEventListener("click", (event) => {
    element_button.forEach((btn) => btn.classList.remove("btn-element-selected"));
    event.target.classList.add("btn-element-selected");
    __element__ = event.target.innerText.toLowerCase().replaceAll(" ", "");
    refresh();
  })
})

type_button.forEach((button) => {
  button.addEventListener("click", (event) => {
    type_button.forEach((btn) => btn.classList.remove("btn-property-selected"));
    event.target.classList.add("btn-property-selected");
    __type__ = event.target.innerText.toLowerCase().replaceAll(" ", "");
    refresh();
  })
})

stage_button.forEach((button) => {
  button.addEventListener("click", (event) => {
    stage_button.forEach((btn) => btn.classList.remove("type_selected"));
    event.target.classList.add("type_selected");
    __stage__ = event.target.innerText.toLowerCase().replaceAll(" ", "");
    refresh();
  });
});

async function refresh() {
  if (__stage__ === "Baby" || __stage__ === "In Training") {
    await element_button.forEach((button) => {
      if (button.innerText.toLowerCase() !== "none") {
        button.style.display = "none";
      }
    });
    await type_button.forEach((button) => {
      if (button.innerText.toLowerCase() !== "none") {
        button.style.display = "none";
      }
    });
  } else {
    await element_button.forEach((button) => {
      if (button.innerText.toLowerCase() !== "none") {
        button.style.display = "block";
      }
    });
    await type_button.forEach((button) => {
      if (button.innerText.toLowerCase() !== "none") {
        button.style.display = "block";
      }
    });
  }
}

let __description__ = {
  "description": {
    "identifier": `digimobs:${__digimon__.toLowerCase()}`,
    "is_spawnable": true,
    "is_summonable": true,
    "is_experimental": false
  }
}
let __component_groups__ = []
let __components__ = []
let __events__ = []

let __raw__ = `{
"format_version": "1.20.80",
"minecraft:entity":`;

function health_system(index, health) {
  let component = {
    [`health_level_${index}`]: {
      "minecraft:health": {
        "value": health,
        "max": health
      }
    }
  };
}

function default_health(value) {
  let component = {
    "default_health": {
      "minecraft:health": {
        "value": value,
        "max": value
      }
    }
  };
}

function generate() {
  console.log(__raw__ + JSON.stringify(__description__));
}

// Correct the setInterval logic:
const family_input = document.querySelector(".family-input");
const current_family = document.querySelector(".current-family");
let __current_family__ = ["mob", "digimon"]

family_input.addEventListener("keypress", function(event) {
  // Periksa jika tombol yang ditekan adalah Enter (kode 13)
  if (event.key === "Enter") {
    event.preventDefault(); // Mencegah perilaku default (jika diperlukan)
    __current_family__.push(family_input.value);
    let family = document.createElement("p");
    family.classList.add("family");
    family.innerText = family_input.value;
    current_family.appendChild(family);
    family_input.value = ""; // Mengosongkan input setelah Enter
  }
});

setInterval(() => {
  const defaultHealthValue = parseInt(default_health_element.value, 10);
  const levelHealthValue = parseInt(level_health_element.value, 10);
  const maxLevelValue = parseInt(max_level_element.value, 10);

  if (defaultHealthValue && levelHealthValue && maxLevelValue) {
    max_health.innerText = `Max Health : ${defaultHealthValue + levelHealthValue * (maxLevelValue - 1)}`;
  }
}, 100);

// Mengelola Event Delegation
document.addEventListener("click", (event) => {
  // Pastikan klik terjadi pada elemen tombol dengan kelas "component"
  if (event.target.classList.contains("component")) {
    const button = event.target;
    const wrapper = button.closest(".component-wrapper"); // Cari elemen pembungkusnya
    const detailComponent = wrapper.querySelector(".detail-component"); // Temukan detail component

    // Tampilkan atau sembunyikan detail component
    if (detailComponent) {
      detailComponent.classList.toggle("show-component");
      detailComponent.classList.toggle("hide-component");
    }
  }
});