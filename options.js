document.addEventListener("DOMContentLoaded", () => {
    const shortcutList = document.getElementById("shortcut-list");
  
    function renderShortcuts() {
      chrome.storage.sync.get("shortcuts", (data) => {
        const shortcuts = data.shortcuts || {};
        shortcutList.innerHTML = "";
  
        for (const key in shortcuts) {
          const div = document.createElement("div");
          div.className = "shortcut-item";
          div.innerHTML = `
            <span>${key} → ${shortcuts[key]}</span>
            <button data-key="${key}" class="delete-btn">X</button>
          `;
          shortcutList.appendChild(div);
        }
  
        document.querySelectorAll(".delete-btn").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const keyToDelete = e.target.dataset.key;
            delete shortcuts[keyToDelete];
            chrome.storage.sync.set({ shortcuts });
            renderShortcuts();
          });
        });
      });
    }
  
    renderShortcuts();
  });