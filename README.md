# Custom URL Shortcuts 🚀

**Custom URL Shortcuts** is a Chrome extension that allows you to define your own keyboard shortcuts for quick navigation to your favorite websites. Save time and streamline your browsing experience with custom shortcuts like `g` for Google or `yt cats` for YouTube cat videos!

---

## Features ✨

- **Custom Shortcuts**: Define your own shortcuts for any URL.
- **Dynamic URLs**: Use placeholders like `{query}` for dynamic URLs (e.g., `gh {query}` → `https://github.com/{query}`).
- **Sync Across Devices**: Shortcuts are synced across all your devices using Chrome Sync.
- **Easy Management**: Add, edit, or delete shortcuts with a simple and intuitive interface.
- **Omnibox Integration**: Type `go <shortcut>` in the Chrome address bar to navigate quickly.

---

## Installation 🛠️

### From Source Code
1. Clone this repository or download the source code.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer Mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the folder containing the extension files.

---

## Usage 🖱️

### Adding a Shortcut
1. Click the extension icon in the Chrome toolbar.
2. Enter a **shortcut** (e.g., `g`) and the corresponding **URL** (e.g., `https://google.com`).
3. Click **Add Shortcut**.

### Using a Shortcut
- **Omnibox**: Type `go <shortcut>` in the Chrome address bar (e.g., `go g`).
- **Dynamic URLs**: Use placeholders like `{query}` (e.g., `go gh sagarmedtiya` → `https://github.com/SagarMedtiya`).

### Managing Shortcuts
- Open the extension popup to view, edit, or delete shortcuts.
- Click **Manage Shortcuts** to access the full management interface.

---

## Examples 🌟

| Shortcut | URL                                      | Usage               |
|----------|------------------------------------------|---------------------|
| `g`      | `https://google.com`                     | `go g`              |
| `yt`     | `https://youtube.com`                    | `go yt`             |
| `gh`     | `https://github.com/{query}`             | `go gh deepseek`    |
| `maps`   | `https://maps.google.com?q={query}`      | `go maps New York`  |

---

## Screenshots 📸

### Popup Interface
![Popup Interface](screenshots/popup.png)

### Options Page
![Options Page](screenshots/options.png)

---

## Contributing 🤝

Contributions are welcome! If you'd like to improve **Custom URL Shortcuts**, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License 📜

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---


## Credits 🙏

- Developed by **[Sagar Medtiya](https://github.com/SagarMedtiya)**.
- Inspired by the need for faster web navigation.

---

Happy browsing! 🎉