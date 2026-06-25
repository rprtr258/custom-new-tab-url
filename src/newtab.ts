function goToUrl(url: string): void {
  location.href = url;
}

function openSavedUrl(): void {
  chrome.storage.local.get({enabled: false, url: ""}, (items: {enabled: boolean; url: string}) => {
    if (items.enabled && items.url) {
      goToUrl(items.url);
    }
  });
}

function showNewTab(): void {
  document.getElementById("header")!.classList.add("visible");
  document.getElementById("actions")!.classList.add("visible");
  document.getElementById("footer")!.classList.add("visible");

  document.getElementById("options-link")!.addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });

  document.getElementById("open-url-link")!.addEventListener("click", () => {
    openSavedUrl();
  });
}

chrome.storage.local.get({enabled: false, url: ""}, (items: {enabled: boolean; url: string}) => {
  if (items.enabled && items.url) {
    // ponytail: body hidden via CSS, redirect happens before any paint
    goToUrl(items.url);
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.classList.add("ready");
      showNewTab();
    });
  }
});
