function redirectTab(tabId: number): void {
  chrome.storage.local.get({enabled: false, url: ""}, (items: {enabled: boolean; url: string}) => {
    if (items.enabled && items.url) {
      chrome.tabs.update(tabId, {url: items.url});
    }
  });
}

// Intercept new tabs (Ctrl+T, + button) before Chrome shows the NTP
chrome.tabs.onCreated.addListener((tab: chrome.tabs.Tab) => {
  if (tab.pendingUrl === "chrome://newtab/" || tab.url === "chrome://newtab/") {
    redirectTab(tab.id!);
  }
});
