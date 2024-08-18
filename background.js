let blockedSites = ["twitter.com", "twitch.tv", "x.com", "twitch.com"];
let currentSite = parseURL(window.location.hostname);

if (blockedSites.includes(currentSite)) {
  injectHTML();
}

//Inject html to black listed sites
function injectHTML() {
  const newHtml = generateHTML();
  document.querySelector("html").innerHTML = newHtml;
  generateCSS();
}

function generateHTML() {
  return `
   <div class="block-sign">
      <h1>WEB PAGE UNDER BLOCK</h1>
    </div>
  `;
}

function generateCSS() {
  document.head.appendChild(document.createElement("style")).innerHTML = `
      h1 {
        color: red;
      }
      .block-sign {
        width: fit-content;
        height: fit-content;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 20%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: auto;
        margin-top: auto;
        display: flex;
      }
  `;
}

function parseURL(url) {
  if (url.startsWith("www.")) {
    return url.slice(4);
  }
  return url;
}
