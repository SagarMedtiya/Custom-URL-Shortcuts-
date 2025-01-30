document.addEventListener("DOMContentLoaded", () => {
    const shortcutList = document.getElementById("shortcut-list");
    const form = document.getElementById("add-shortcut-form");
    const keyInput = document.getElementById("shortcut-key");
    const urlInput = document.getElementById("shortcut-url");
    const categoryInput = document.getElementById("shortcut-category");
    const categoryFilter = document.getElementById("category");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const searchInput = document.getElementById("search-input");
    const groupToggle = document.getElementById("group-toggle");
  
    let shortcuts = {};
  
    // Predefined suggested shortcuts
    const suggestedShortcuts = {
      work: {
        g: "https://google.com",
        gh: "https://github.com",
      },
      social: {
        fb: "https://facebook.com",
        tw: "https://twitter.com",
      },
      entertainment: {
        yt: "https://youtube.com",
        netflix: "https://netflix.com",
      },
    };
  
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
      const advancedUrl = document.getElementById("advanced-url").value.trim();
      const groupEnabled = groupToggle.checked;
  
      if (!key || !(url || advancedUrl)) return alert("Fields required!");
  
      if (!shortcuts[category]) {
        shortcuts[category] = {};
      }
  
      shortcuts[category][key] = {
        url: advancedUrl || url,
        groupEnabled,
      };
      chrome.storage.sync.set({ shortcuts }, () => {
        renderShortcuts();
        keyInput.value = "";
        urlInput.value = "";
        document.getElementById("advanced-url").value = "";
      });
    });
  
    // Render shortcuts
    function renderShortcuts(query = "") {
      const selectedCategory = categoryFilter.value;
      shortcutList.innerHTML = "";
  
      for (const category in shortcuts) {
        if (selectedCategory !== "all" && selectedCategory !== category) continue;
  
        for (const key in shortcuts[category]) {
          if (query && !key.toLowerCase().includes(query)) continue;
  
          const div = document.createElement("div");
          div.className = "shortcut-item";
          div.innerHTML = `
            <span>${key} → ${shortcuts[category][key].url}</span>
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
    function trackShortcutUsage(key) {
        chrome.storage.sync.get("shortcuts", (data) => {
          const shortcuts = data.shortcuts || {};
      
          for (const category in shortcuts) {
            if (shortcuts[category][key]) {
              shortcuts[category][key].usage = (shortcuts[category][key].usage || 0) + 1;
              break;
            }
          }
      
          chrome.storage.sync.set({ shortcuts });
        });
      }
      
      // Example: Track usage when a shortcut is used
      chrome.omnibox.onInputEntered.addListener((text) => {
        const [shortcut] = text.split(" ");
        trackShortcutUsage(shortcut);
      });
    // Render suggested shortcuts
    function renderSuggestedShortcuts() {
      const suggestedShortcutList = document.getElementById("suggested-shortcut-list");
      suggestedShortcutList.innerHTML = "";
  
      for (const category in suggestedShortcuts) {
        for (const key in suggestedShortcuts[category]) {
          const div = document.createElement("div");
          div.className = "shortcut-item";
          div.innerHTML = `
            <span>${key} → ${suggestedShortcuts[category][key]}</span>
            <button data-category="${category}" data-key="${key}" class="add-suggested-btn">Add</button>
          `;
          suggestedShortcutList.appendChild(div);
        }
      }
      
      // Add suggested shortcuts
      document.querySelectorAll(".add-suggested-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const category = e.target.dataset.category;
          const key = e.target.dataset.key;
          const url = suggestedShortcuts[category][key];
  
          if (!shortcuts[category]) {
            shortcuts[category] = {};
          }
  
          shortcuts[category][key] = { url, groupEnabled: false };
          chrome.storage.sync.set({ shortcuts }, renderShortcuts);
        });
      });
    }
  
    // Filter shortcuts by category
    categoryFilter.addEventListener("change", renderShortcuts);
  
    // Search shortcuts
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      renderShortcuts(query);
    });
  
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
  
    // Render suggested shortcuts on load
    renderSuggestedShortcuts();
  });