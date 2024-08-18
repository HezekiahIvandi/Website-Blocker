let blockedSites = ["twitter.com", "twitch.com", "x.com", "github.com"];
let currentSite = window.location.hostname;
//alert(currentSite + "" + site);
if (blockedSites.includes(currentSite)) {
  alert("Blocked");
}

//Inject html to black listed sites
function injectHTML() {}
