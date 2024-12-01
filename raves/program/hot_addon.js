const hot_panel = document.querySelector(".hots_content");

function convertToDate([day, month, year]) {
  return new Date(year, month - 1, day);
}

async function findHotAddon(addons) {
  const data = [];

  for (let addon of addons) {
    try {
      const response = await fetch(`raves/assets/addons/${addon}/metadata`);
      const metadata = await response.json();
      metadata.location = addon;
      data.push(metadata);
    } catch (error) {
      console.error(`Error fetching metadata for ${addon}:`, error);
    }
  }

  return data.sort((a, b) => convertToDate(b.upload) - convertToDate(a.upload))[0];
}

async function updateHotAddon() {
  const hotAddon = await findHotAddon(addons);

  document.querySelector(".hot_addon_title").innerText = hotAddon.name;
  document.querySelector(".description_text").innerText = hotAddon.description;
  document.querySelector(".hot_addon_version").innerText = hotAddon.version;

  const star_panel = document.querySelector(".star_panel");
  const starCount = Math.floor(hotAddon.star);

  for (let i = 0; i < starCount; i++) {
    const starObj = document.createElement("i");
    starObj.classList.add("fa-solid", "fa-star");
    star_panel.appendChild(starObj);
  }

  const rp = document.querySelector(".hot_content_rp")
  rp.setAttribute("href", hotAddon.download.resource)
  const bp = document.querySelector(".hot_content_bp")
  bp.setAttribute("href", hotAddon.download.behavior)

  const updates = document.querySelector(".updates")
  for (let update of hotAddon.update) {
    if(update.includes("$")) {
      let element = await queryElement(update)
      await element.classList.add("update_image");
      await updates.appendChild(element);
      continue;
    }


    let text = document.createElement("p");
    text.classList.add("update_poin");
    if(update.toLowerCase().includes("new")) {
      text.innerHTML = `<i class="fa-solid fa-bell"></i> ${update}`
    } else if(update.toLowerCase().includes("fix")) {
      text.innerHTML = `<i class="fa-solid fa-wrench"></i> ${update}`
    } else if(update.toLowerCase().includes("improve")) {
      text.innerHTML = `<i class="fa-solid fa-pen"></i> ${update}`
    } else if(update.toLowerCase().includes("remove")) {
      text.innerHTML = `<i class="fa-solid fa-trash"></i> ${update}`
    } else {
      text.innerText = update;
    }
    updates.appendChild(text);
  }

  document
  .querySelector(".pack_icon")
  .setAttribute("src", `../raves/assets/addons/${hotAddon.location}/icon.png`);
}

updateHotAddon();

function queryElement(string) {
  const regex = /^\$([a-zA-Z]+):(.+)$/;
  if(!regex.test(string)) return console.warn(`invalid string query element at ${string}`);
  string = string.replace("$", "");
  let type = string.split(":")[0]
  let element = document.createElement(type)
  if(type.toLowerCase() === "img") {
    let src = string.split(":")[1]
    element.setAttribute("src", src);
  } else if(type.toLowerCase() === "p") {
    let text = string.split(":")[1]
    element.innerText = text
  }
  return element;
}

function showUpdate() {
  document.querySelector('.updates').style.display = 'block';
}

function closeUpdate() {
  document.querySelector('.updates').style.display = 'none';
}
