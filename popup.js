document.addEventListener("DOMContentLoaded", () => {
    const shortcutList = document.getElementById("shortcut-list");
    const form = document.getElementById("add-shortcut-form");
    const keyInput = document.getElementById("shortcut-key");
    const urlInput = document.getElementById("shortcut-url");
    const categoryInput = document.getElementById("shortcut-category");
    const categoryFilter = document.getElementById("category");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
  
    let shortcuts = {};
  
    // Load saved shortcuts
    chrome.storage.sync.get("shortcuts", (data) => {
      shortcuts = data.shortcuts || {};
      renderShortcuts();
    });
  
    // Add new shortcut
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const key = keyInput.value.trim();
      const url = urlInput.value.trim();
      const category = categoryInput.value;
  
      if (!key || !url) return alert("Fields required!");
  
      if (!shortcuts[category]) {
        shortcuts[category] = {};
      }
  
      shortcuts[category][key] = url;
      chrome.storage.sync.set({ shortcuts }, () => {
        renderShortcuts();
        keyInput.value = "";
        urlInput.value = "";
      });
    });
  
    // Render shortcuts
    function renderShortcuts() {
      const selectedCategory = categoryFilter.value;
      shortcutList.innerHTML = "";
  
      for (const category in shortcuts) {
        if (selectedCategory !== "all" && selectedCategory !== category) continue;
  
        for (const key in shortcuts[category]) {
          const div = document.createElement("div");
          div.className = "shortcut-item";
          div.innerHTML = `
            <span>${key} → ${shortcuts[category][key]}</span>
            <button data-category="${category}" data-key="${key}" class="delete-btn">X</button>
          `;
          shortcutList.appendChild(div);
        }
      }
  
      // Add delete functionality
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const categoryToDelete = e.target.dataset.category;
          const keyToDelete = e.target.dataset.key;
          delete shortcuts[categoryToDelete][keyToDelete];
          chrome.storage.sync.set({ shortcuts }, renderShortcuts);
        });
      });
    }
  
    // Filter shortcuts by category
    categoryFilter.addEventListener("change", renderShortcuts);
  
    // Dark mode toggle
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      chrome.storage.sync.set({ darkMode: document.body.classList.contains("dark-mode") });
    });
  
    // Load dark mode preference
    chrome.storage.sync.get("darkMode", (data) => {
      if (data.darkMode) {
        document.body.classList.add("dark-mode");
      }
    });
  });