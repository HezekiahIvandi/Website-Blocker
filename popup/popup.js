window.onload = function () {
  const currentBtn = document.getElementById("block-current-btn");
  const addBtn = document.querySelector(".add-btn");
  const input = document.getElementById("blacklist-input");
  const clearBtn = document.getElementById("clear-btn");

  //block current website event
  currentBtn.addEventListener("click", blackListCurrent);

  //block input website event
  addBtn.addEventListener("click", () => {
    addBlackLists(input.value);
  });

  //clear all blacklist event
  clearBtn.addEventListener("click", clearAllList);
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
  }
};

const clearAllList = async () => {
  chrome.storage.sync.set({ blackLists: [] }, function () {
    alert("BLACKLIST IS CLEARED");
  });
};

const blackListCurrent = () => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      let currentTab = tabs[0]; // The active tab in the current window
      let currentUrl = parseURL(currentTab.url);
      addBlackLists(currentUrl);
    }
  );
};

const parseURL = (url) => {
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
};

const checkForDuplicates = async (site, list) => {
  isDuplicate = false;

  list.forEach((element) => {
    if (element === site) {
      isDuplicate = true;
      alert(element + " alread in the blacklist");
      return isDuplicate;
    }
  });

  return isDuplicate;
};
