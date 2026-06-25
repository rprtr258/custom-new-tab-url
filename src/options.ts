function saveOptions(): void {
  const enabled = (document.getElementById("enabled-parameter") as HTMLInputElement).checked;
  const url = (document.getElementById("url-parameter") as HTMLInputElement).value;
  chrome.storage.local.set({enabled, url}, () => {
    const status = document.getElementById("status")!;
    status.classList.add("visible");
    setTimeout(() => status.classList.remove("visible"), 1500);
  });
}

function restoreOptions(): void {
  chrome.storage.local.get({enabled: false, url: ""}, (items: {enabled: boolean; url: string}) => {
    (document.getElementById("enabled-parameter") as HTMLInputElement).checked = items.enabled;
    (document.getElementById("url-parameter") as HTMLInputElement).value = items.url;
    document.getElementById("status")!.classList.remove("visible");
    toggleUrlSection();
  });
}

function toggleUrlSection(): void {
  const divUrl = document.getElementById("div-url")!;
  const enabled = (document.getElementById("enabled-parameter") as HTMLInputElement).checked;
  divUrl.style.display = enabled ? "block" : "none";
}

function setUrl(url: string): void {
  (document.getElementById("url-parameter") as HTMLInputElement).value = url;
  saveOptions();
}

document.addEventListener("DOMContentLoaded", () => {
  restoreOptions();

  document.getElementById("save-button")!.addEventListener("click", saveOptions);
  document.getElementById("cancel-button")!.addEventListener("click", () => window.close());
  (document.getElementById("enabled-parameter") as HTMLInputElement).addEventListener("change", () => {
    toggleUrlSection();
    saveOptions();
  });

  const quickLinks: Record<string, string> = {
    "chrome-pages-blank":      "about:blank",
    "chrome-pages-apps":       "chrome://apps",
    "chrome-pages-bookmarks":  "chrome://bookmarks",
    "chrome-pages-downloads":  "chrome://downloads",
    "chrome-pages-extensions": "chrome://extensions",
    "chrome-pages-history":    "chrome://history",
    "chrome-pages-version":    "chrome://version",
  };

  for (const [id, url] of Object.entries(quickLinks)) {
    const el = document.getElementById(id);
    el?.addEventListener("click", () => setUrl(url));
  }
});
