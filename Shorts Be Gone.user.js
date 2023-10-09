// ==UserScript==
// @name         Shorts Be Gone
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  stop google from making everyone a pedophile by pushing little girls twerking 30 seconds videos.
// @author       Lightheart
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/dbf5c200/img/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function removeShorts() {
    var aTags = document.querySelectorAll("a");
    var shelfList = document.querySelectorAll(
      "ytd-reel-shelf-renderer.style-scope.ytd-item-section-renderer"
    );

    for (let shelf of shelfList) {
      shelf.remove();
    }

    for (var i = 0; i < aTags.length; i++) {
      if (aTags[i].href.startsWith("https://www.youtube.com/shorts")) {
        var element = aTags[i];

        while (
          element.parentElement &&
          (element.className != "style-scope ytd-rich-grid-renderer" ||
            element.nodeName != "YTD-RICH-SECTION-RENDERER")
        ) {
          element = element.parentElement;
        }

        if (
          element.className == "style-scope ytd-rich-grid-renderer" &&
          element.nodeName == "YTD-RICH-SECTION-RENDERER"
        ) {
          element.remove();
        }
      } else if (aTags[i].title === "Shorts") {
        aTags[i].parentElement.remove();
      }
    }
  }

  setInterval(function () {
    requestAnimationFrame(removeShorts);
  }, 1000);
})();
