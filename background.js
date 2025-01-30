chrome.omnibox.setDefaultSuggestion({ description: "Type 'go <b>shortcut</b>' to navigate quickly!" });

chrome.omnibox.onInputEntered.addListener((text) => {
    chrome.storage.sync.get("shortcuts", (data) => {
        const shortcuts = data.shortcuts || {};
        const [shortcut, ...args] = text.split(" ");
        let url = shortcuts[shortcut];

        if (url) {
            url = url.replace("{query}", args.join(" "));
            chrome.tabs.update({ url });
        } else {
            chrome.tabs.create({ url: `https://www.google.com/search?q=${text}` });
        }
    });
});
chrome.commands.onCommand.addListener((command) => {
    if (command === "open_shortcut_prompt") {
        chrome.tabs.create({ url: "chrome-extension://odpcbcojgpegddnjhblianmlaabgjkoa/popup.html" });
    }
});