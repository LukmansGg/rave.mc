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
    const starObj = document.createElement("div");
    starObj.innerHTML =  `<input id="rating-${i}" class="rating__input rating__input-${i}" type="radio" name="rating" value="${i}"><label class="rating__label" for="rating-${i}">
                <svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                    <g transform="translate(16,16)">
                        <circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
                    </g>
                    <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <g transform="translate(16,16) rotate(180)">
                            <polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
                            <polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
                        </g>
                        <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                            <polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                            <polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                            <polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                            <polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                            <polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
                        </g>
                    </g>
                </svg>
                <span class="rating__sr">${i} star—Terrible</span>
            </label>`;
    star_panel.appendChild(starObj);
  }
  const ratings = [
            "Terrible",
            "Bad",
            "OK",
            "Good",
            "Excellent"
        ];
        const label = document.querySelector(".rating__display");
        let count = 0;
        const rating =setInterval(() => {
            if(count >= ratings.length) return clearInterval(rating);
            label.innerText = ratings[count];
            console.log(ratings[count])
            count += 1;
        }, 500)

  const rp = document.querySelector(".hot_content_rp")
  rp.setAttribute("href", hotAddon.download.resource)
  const bp = document.querySelector(".hot_content_bp")
  bp.setAttribute("href", hotAddon.download.behavior)

  const updates = document.querySelector(".updates")
  document.body.classList.toggle("no-scroll");
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
  document.body.classList.toggle("no-scroll");
}

function closeUpdate() {
  document.querySelector('.updates').style.display = 'none';
  document.body.classList.toggle("no-scroll");
}
