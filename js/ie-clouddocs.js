/**/

/* returns the size of an element in px visible in the viewport */
function PXinViewport($el) {
  var elH = $el.outerHeight(),
      H = $(window).height(),
      r = $el[0].getBoundingClientRect(), t = r.top, b = r.bottom;
  return Math.max(0, t > 0 ? Math.min(elH, H - t) : Math.min(b, H));
}


function netapp_mailto(subjectType) {
  subjectType = subjectType || "";
  var pageurl = "" + window.location;

  if (pageurl.indexOf("?") > -1) {
    pageurl = pageurl.substring(0, pageurl.indexOf("?"));
  }

  var email = "doccomments@netapp.com";
  var loc = email + "?subject=docs_feedback:%20" + pageurl;
  window.location = "mailto:" + loc;
}
/*
function redirectToWebserver(pathChunks, originUrl, proxyUrl) {
  originUrl = originUrl || "clouddocs.netapp.com";
  proxyUrl = proxyUrl || "https://docs.netapp.com";
  var pathChanged = pathChunks.join("/") !== location.pathname;
  var originServer = location.href.search(originUrl) !== -1;
  if (originServer) {
    if (pathChunks.length > 2) {
      pathChunks.splice(1, 2, pathChunks[2], pathChunks[1]);
    }
    location.href = proxyUrl + pathChunks.join("/");
  } else if (pathChanged) {
    location.pathname = pathChunks.join("/");
  }
}

function getBrowserLocale(browserLocales, siteLocales) {
  for (var s = 0; s < browserLocales.length; s++) {
    if (siteLocales.indexOf(browserLocales[s]) != -1) {
      return browserLocales[s] !== "en" ? browserLocales[s] : "us-en";
    }
  }

  return "us-en";
}

function standardizeUrl(siteLocales, originUrl, proxyUrl) {
  var browserLocales = navigator.languages || "us-en"; // IE does not support navigator
  var localeIndex = -1;
  var pathChunks = location.pathname.split("/");
  for (var a = 0; a < pathChunks.length; a++) {
    if (
      pathChunks[a].match(/^[a-zA-Z]{2}-[a-zA-Z]{2}$/) ||
      pathChunks[a] == "en"
    ) {
      localeIndex = a;
      break;
    }
  }

  var browserLocale = getBrowserLocale(browserLocales, siteLocales);
  if (localeIndex == -1) {
    if (pathChunks.length > 2) {
      pathChunks.splice(2, 0, browserLocale);
    } else if (pathChunks.length > 1) {
      pathChunks.splice(1, 0, browserLocale);
    } else {
      pathChunks.unshift(browserLocale);
    }
  }

  localeIndex = pathChunks.indexOf("en");
  if (localeIndex != -1) {
    pathChunks[localeIndex] = "us-en";
  }

  redirectToWebserver(pathChunks, originUrl, proxyUrl);
}
*/
// Handles the Anchor Tags with Fixed Header
$(document).ready(function () {
/*	
  const OFFSET = 175;
  $("a[href*=#]:not([href=#])").click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html,body").animate({
          scrollTop: target.offset().top - OFFSET,
        });
        return false;
      }
    }
  });
  //Executed on page load with URL containing an anchor tag.
  setTimeout(function () {
    if ($(location.href.split("#")[1])) {
      //event.preventDefault();

      var target = $("#" + location.href.split("#")[1]);

      if (target.length) {
        var scrollval = target.offset().top - OFFSET;
        //console.log(scrollval);
        $("html,body").animate({
          scrollTop: scrollval,
        });
        return false;
        $(".col-md-3").animate({
          scrollTop: 0,
        });
      }
    }
  }, 1000);

  
  setTimeout(function () {

    var newtarget = $(".nav > li.active");
    if ($(".nav > li").hasClass("active")) {
      let scrollnewval = newtarget.offset().top - 200;

      //console.log(scrollnewval);
      $(".col-md-3").animate({
        scrollTop: scrollnewval,
      });
    }
  }, 100);
  */

  /*
  ("use strict");

  function luciTooltip() {
    const clickableTooltips = document.querySelectorAll(".luci-tooltip"),
      tooltipVisibleClass = "luci-tooltip--visible";

    function toggleTooltipVisibility(tooltip) {
      if (tooltip.classList.contains(tooltipVisibleClass)) {
        tooltip.classList.remove(tooltipVisibleClass);
      } else {
        tooltip.classList.add(tooltipVisibleClass);
      }
    }

    function handleClickableTooltipClick() {
      toggleTooltipVisibility(this);
    }

    clickableTooltips.forEach(function (t) {
      t.addEventListener("click", handleClickableTooltipClick);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    luciTooltip();
  });
*/
/* code from na-utility.js */
/*
	document.addEventListener('DOMContentLoaded', function() {
			luciTooltip();
	});
*/


});

/* END code from www-ntap.js */
