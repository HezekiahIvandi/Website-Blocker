document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (
      tabs.length > 0 &&
      tabs[0].url &&
      !tabs[0].url.startsWith("chrome://")
    ) {
      try {
        let url = new URL(tabs[0].url);
        let domain = url.origin;
        let faviconUrl = `${domain}/favicon.ico`;

        // Set the src attribute of the img tag to the favicon URL
        document.getElementById("favicon").src = faviconUrl;
        document.getElementById("current-url").style.display = "none";
      } catch (error) {
        console.error("Error parsing URL:", error);
        document.getElementById("url").textContent = "Invalid URL";
      }
    } else {
      document.getElementById("favicon").style.display = "none";
      document.getElementById("current-url").textContent =
        "No valid URL or restricted page";
    }
  });
});

window.onload = function () {
  const addBtn = document.querySelector(".add-btn");
  const input = document.getElementById("blacklist-input");
  const clearBtn = document.getElementById("clear-btn");
  const removeInput = document.getElementById("remove-blacklist-input");
  const removeBtn = document.querySelector(".remove-btn");
  //block/unblock current website event
  addEventCurrent();
  //block input website event
  addBtn.addEventListener("click", () => {
    addBlackLists(input.value);
    input.value = "";
  });

  //clear all blacklist event
  clearBtn.addEventListener("click", clearAllList);

  //delete from blacklist
  removeBtn.addEventListener("click", () => {
    deleteFromBlackList(removeInput.value);
    removeInput.value = "";
  });
};

const getBlackLists = async () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("blackLists", function (data) {
      resolve(data.blackLists || []);
    });
  });
};

const addBlackLists = async (site) => {
  let blackLists = (await getBlackLists()) || [];
  console.log("Retrieved lists: ", blackLists);
  const isDuplicate = await checkForDuplicates(site, blackLists);
  if (!isDuplicate) {
    blackLists.push(site.toLowerCase());
    chrome.storage.sync.set(
      {
        blackLists: blackLists,
      },
      function () {
        alert(site.toLowerCase() + " added to the blacklists");
        console.log(blackLists);
      }
    );
  } else {
    alert(site + " is already on the blacklist");
  }
};

const clearAllList = async () => {
  chrome.storage.sync.set({ blackLists: [] }, function () {
    alert("blacklist is cleared");
  });
};

const deleteFromBlackList = async (site) => {
  let parsedSite = parseURL(site);
  let newList = await getBlackLists();

  if (newList.includes(parsedSite)) {
    newList = newList.filter((item) => item !== parsedSite);
    chrome.storage.sync.set({ blackLists: newList }, function () {
      alert(parsedSite + " is removed from the black list");
    });
  } else {
    alert(parsedSite + " has not been on the list");
  }
};

const parseURL = (url) => {
  try {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url; // Prepend "http://" if no protocol is found
    }
    // Create a new URL object
    let urlObject = new URL(url);

    // Get the hostname (e.g., www.domain.com)
    let hostname = urlObject.hostname;

    // Remove "www." if it exists
    if (hostname.startsWith("www.")) {
      hostname = hostname.substring(4);
    }

    // Convert the hostname to lowercase
    return hostname.toLowerCase();
  } catch (error) {
    console.error("Invalid URL provided: ", error);
    return null;
  }
};

const checkForDuplicates = async (site, list) => {
  isDuplicate = false;

  list.forEach((element) => {
    if (element === site) {
      isDuplicate = true;
      return isDuplicate;
    }
  });

  return isDuplicate;
};

const reloadCurrentSite = () => {
  // Reload the current active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
};
const addEventCurrent = async () => {
  const currentBtn = document.getElementById("block-current-btn");
  const list = await getBlackLists();
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      let currentTab = tabs[0]; // The active tab in the current window
      let currentUrl = parseURL(currentTab.url);
      if (currentUrl.startsWith("chrome")) {
        currentBtn.style.display = "none";
      } else if (!list.includes(currentUrl)) {
        currentBtn.innerText = "Block";
        currentBtn.addEventListener("click", () => {
          addBlackLists(currentUrl);
          reloadCurrentSite();
          location.reload();
        });
      } else {
        currentBtn.innerText = "Unblock";
        currentBtn.addEventListener("click", () => {
          deleteFromBlackList(currentUrl);
          reloadCurrentSite();
          location.reload();
        });
      }
    }
  );
};


// theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === 'light') {
    themeToggle.innerHTML = '<img id="theme-icon" src="../assets/moon.png" alt="">'
  } else {
    themeToggle.innerHTML = '<img id="theme-icon" src="../assets/sun.png" alt="">'
  }
}