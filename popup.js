document.addEventListener("DOMContentLoaded", () => {
    const shortcutList = document.getElementById("shortcut-list");
    const form = document.getElementById("add-shortcut-form");
    const keyInput = document.getElementById("shortcut-key");
    const urlInput = document.getElementById("shortcut-url");
  
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
            chrome.storage.sync.set({ shortcuts }, renderShortcuts);
          });
        });
      });
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const key = keyInput.value.trim();
      const url = urlInput.value.trim();
      if (!key || !url) return alert("Fields required!");
  
      chrome.storage.sync.get("shortcuts", (data) => {
        const shortcuts = data.shortcuts || {};
        shortcuts[key] = url;
        chrome.storage.sync.set({ shortcuts }, renderShortcuts);
        keyInput.value = "";
        urlInput.value = "";
      });
    });
  
    renderShortcuts();
  });
  