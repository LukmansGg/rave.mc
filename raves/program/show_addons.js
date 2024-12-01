
const mods_stack_panel = document.querySelector(".all_mods");
const hot_addon_title = document.querySelector(".hot_addon_title");
const hot_addon_version = document.querySelector(".hot_addon_version");

async function getCollection() {
  for (let addon of addons) {
    try {
      const response = await fetch(`raves/assets/addons/${addon}/metadata`);
      const metadata = await response.json();

      if (
        metadata.name !== hot_addon_title.innerText ||
        metadata.version !== hot_addon_version.innerText
      ) {
        const panel = document.createElement("div");
        panel.classList.add("addons_panel");

        const icon = document.createElement("img");
        icon.src = `raves/assets/addons/${addon}/icon.png`;
        icon.classList.add("addon_icon");

        const title = document.createElement("p");
        title.innerText = `${metadata.name} (v${metadata.version})`;
        title.classList.add("addon_title");

        panel.appendChild(icon);
        panel.appendChild(title)
        mods_stack_panel.appendChild(panel);
      }
    } catch (error) {
      console.error(`Error fetching metadata for ${addon}:`, error);
    }
  }
}

setTimeout(getCollection, 1000);