const messages = [
  "This site is restricted to help you stay on track.",
  "Access to this website is currently blocked to keep you focused.",
  "We’ve blocked this site to help you maintain productivity.",
  "This website is inaccessible right now to support your concentration.",
  "We’re keeping this site off-limits to help you focus on your goals.",
  "To assist with your productivity, access to this site is currently restricted.",
  "This site is unavailable to help you stay engaged with your tasks.",
  "We’ve temporarily blocked this website to help you stay on task.",
  "Access to this website is limited to help you avoid distractions.",
  "We’re blocking this site to support your focus and efficiency.",
  "This website is restricted to aid in maintaining your concentration.",
  "For better focus, this website is currently off-limits.",
  "To help you stay productive, this site is currently blocked.",
  "This website is not accessible right now to support your work.",
  "We’ve put this site on hold to help you stay focused on your priorities.",
  "This site is temporarily blocked to enhance your work focus.",
  "To boost your productivity, we’ve restricted access to this website.",
  "This website is blocked to help you avoid unnecessary distractions.",
  "We’re limiting access to this site to support your concentration efforts.",
  "For improved focus, this website is currently unavailable.",
];

let blockedSites = ["twitter.com", "twitch.tv", "x.com", "twitch.com"];

let currentSite = parseURL(window.location.hostname);

if (blockedSites.includes(currentSite)) {
  injectHTML();
}

//Inject html to black listed sites
function injectHTML() {
  //generate random integer
  const randomInt = Math.floor(Math.random() * messages.length);
  const message = messages[randomInt];

  //get assets
  const iconURL = getAssetURL("disconnected.png");
  const bgURL = getAssetURL("night-sky.jpg");

  //inject html and css
  const newHtml = generateHTML(iconURL, message, currentSite);
  document.querySelector("html").innerHTML = newHtml;
  generateCSS(bgURL);
}

function generateHTML(iconURL, message, siteName) {
  return `
  <body>
    <div id="clouds">
      <div class="cloud x1"></div>
      <div class="cloud x1_5"></div>
      <div class="cloud x2"></div>
      <div class="cloud x3"></div>
      <div class="cloud x4"></div>
      <div class="cloud x5"></div>
    </div>
    <div class="center">
      <h2>${siteName}</h2>

      <img src="${iconURL}" alt="" />

      <div class="block-sign">
        <h1>🚫 Access Restricted</h1>
        <p>
         ${message}
        </p>
      </div>
    </div>
  </body>
  `;
}

function generateCSS(backgroundURL) {
  document.head.appendChild(document.createElement("style")).innerHTML = `
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f4f8;
        display: flex;
        justify-content: center;
        height: 100vh;
        background-image: url(${backgroundURL});
      }
      h1 {
        font-size: 32px;
        color: #333;
      }
      p {
        font-size: 24px;
        color: #2b2d2e;
        font-weight: 500;
      }
      h2 {
        color: #424546;
        font-weight: 500;
        margin: 0;
        backdrop-filter: blur(2px);
        background-color: rgba(223, 223, 223, 0.5);
        padding: 10px 15px;
        border-radius: 20px;
        width: fit-content;
      }
      .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 40%;
      }
      .block-sign {
        line-height: 30px;
        width: 100%;
        height: fit-content;
        padding: 10px 20px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        backdrop-filter: blur(2px);
        background-color: rgba(223, 223, 223, 0.5);
      }
      img {
        width: 50px;
        margin: 10px 0;
      }
      @media (max-width: 724px) {
        p {
          font-size: 18px;
        }
        h1,
        h2 {
          font-size: 24px;
        }
      }
        .cloud {
    width: 350px;
    height: 120px;
  
    background: #fff;
    background: linear-gradient(top, #fff 100%);
    background: -webkit-linear-gradient(top, #fff 100%);
    background: -moz-linear-gradient(top, #fff 100%);
    background: -ms-linear-gradient(top, #fff 100%);
    background: -o-linear-gradient(top, #fff 100%);
  
    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
  
    position: absolute;
    margin: 120px auto 20px;
    z-index: -1;
    transition: ease 1s;
  }
  
  .cloud:after,
  .cloud:before {
    content: "";
    position: absolute;
    background: #fff;
    z-index: -1;
  }
  
  .cloud:after {
    width: 100px;
    height: 100px;
    top: -50px;
    left: 50px;
  
    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
  }
  
  .cloud:before {
    width: 180px;
    height: 180px;
    top: -90px;
    right: 50px;
  
    border-radius: 200px;
    -webkit-border-radius: 200px;
    -moz-border-radius: 200px;
  }
  
  .x1 {
    top: -50px;
    left: 100px;
    -webkit-transform: scale(0.3);
    -moz-transform: scale(0.3);
    transform: scale(0.3);
    opacity: 0.9;
    -webkit-animation: moveclouds 15s linear infinite;
    -moz-animation: moveclouds 15s linear infinite;
    -o-animation: moveclouds 15s linear infinite;
  }
  
  .x1_5 {
    top: -80px;
    left: 250px;
    -webkit-transform: scale(0.3);
    -moz-transform: scale(0.3);
    transform: scale(0.3);
    -webkit-animation: moveclouds 17s linear infinite;
    -moz-animation: moveclouds 17s linear infinite;
    -o-animation: moveclouds 17s linear infinite;
  }
  
  .x2 {
    left: 250px;
    top: 30px;
    -webkit-transform: scale(0.6);
    -moz-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 0.6;
    -webkit-animation: moveclouds 25s linear infinite;
    -moz-animation: moveclouds 25s linear infinite;
    -o-animation: moveclouds 25s linear infinite;
  }
  
  .x3 {
    left: 250px;
    bottom: -70px;
  
    -webkit-transform: scale(0.6);
    -moz-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 0.8;
  
    -webkit-animation: moveclouds 25s linear infinite;
    -moz-animation: moveclouds 25s linear infinite;
    -o-animation: moveclouds 25s linear infinite;
  }
  
  .x4 {
    left: 470px;
    botttom: 20px;
  
    -webkit-transform: scale(0.75);
    -moz-transform: scale(0.75);
    transform: scale(0.75);
    opacity: 0.75;
  
    -webkit-animation: moveclouds 18s linear infinite;
    -moz-animation: moveclouds 18s linear infinite;
    -o-animation: moveclouds 18s linear infinite;
  }
  
  .x5 {
    left: 200px;
    top: 300px;
  
    -webkit-transform: scale(0.5);
    -moz-transform: scale(0.5);
    transform: scale(0.5);
    opacity: 0.8;
  
    -webkit-animation: moveclouds 20s linear infinite;
    -moz-animation: moveclouds 20s linear infinite;
    -o-animation: moveclouds 20s linear infinite;
  }
  
  @-webkit-keyframes moveclouds {
    0% {
      margin-left: 1000px;
    }
    100% {
      margin-left: -1000px;
    }
  }
  @-moz-keyframes moveclouds {
    0% {
      margin-left: 1000px;
    }
    100% {
      margin-left: -1000px;
    }
  }
  @-o-keyframes moveclouds {
    0% {
      margin-left: 1000px;
    }
    100% {
      margin-left: -1000px;
    }
  }
  `;
}

//get the desired url format
function parseURL(url) {
  if (url.startsWith("www.")) {
    return url.slice(4);
  }
  return url;
}

//access assets
function getAssetURL(fileName) {
  return chrome.runtime.getURL(`assets/${fileName}`);
}
