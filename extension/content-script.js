const MAX_TEXT_LENGTH = 1_000;

function parseTextContent(maxLen) {
  if (!document.body?.innerText) {
    return "";
  }
  return Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6"))
    .map((el) => (el.innerText || el.textContent || "").trim())
    .filter(Boolean)
    .join(" ")
    .trim()
    .slice(0, maxLen);
}

window.addEventListener('load', (event) => {
  const payload = {
    type: "view",
    url: location.href,
    title: document.title || "",
    lang: document.documentElement?.lang || "",
    text: parseTextContent(MAX_TEXT_LENGTH)
  };

  chrome.runtime.sendMessage(payload);
});
