function createTabs() {
    $('div.tabbed-block').each(function(index) {
      const block = $(this);
      const panelContainer = createPanel();
      const panel = panelContainer.find('div.panel');
      block.replaceWith(panelContainer);
      const container = $(block.find('div.content')[0]);  // contains all the content that's supposed to be in the tabs
      container.children().each(function(index) {  //
        const potentialBlock = $(this);
        if (!potentialBlock.has('div.title').length) { // if the section isn't titled ignore it, a title is required for a tab heading
          return;
        }
        const content = createTabContent(potentialBlock, panel);
        panel.append(content);
        const tabLinkText = content.attr('data-tab-title');
        if (index == 0 || getCookie('tabPreference') == tabLinkText) {  // set initial active tab based
          panel.find(`.tab-link[data-tab-title="${tabLinkText}"]`).addClass('selected');
          panel.find('.tab-link').not(`[data-tab-title="${tabLinkText}"]`).removeClass('selected');
          content.siblings('.tab-content').hide();
        } else {
          content.hide();
        }
      });
      createMoreTab(panel);
    });
}

// Rendering Functions

function createPanel() {  // creates the outer structure that houses the tab content and headers
    const container = $('<div class="tab-container ie-feature-block ie-feature-block__align--center ie-layout-flex__item ie-feature-block"></div>');
    const panel = $(`<div class="panel ie-feature-block__content"></div>`);
    const tabBar = $('<div class="tabs ie-feature-block__header"></div>');
    container.append(panel);
    panel.append(tabBar);
    panel.on('click', '.tab-link', handleTabClick);
    panel.on('click','.tab-link-more', handleMoreTabClick);
    panel.on('click', '.dropdown-item', handleDropdownItemClick);
    return container;
}

function createTabContent(block, panel) {
    var container = $(`<div class="tab-content ie-feature-block__section"></div>`);
    block.remove();
    container.append(block);
    const tabTitle = block.find('div.title').first();  // grabs first title, allows for other titles to be used within the tab content
    container.attr('data-tab-title', tabTitle.text());
    // Next few lines are for removing the title from the content, configuring it into a working tab link, and appending it to the tab bar
    tabTitle.remove();
    const tabBar = panel.find('.tabs');
    const tabLink = $(`<div class="tab-link ie-feature-block__text">${tabTitle.text()}</div>`);
    tabLink.attr('data-tab-title', tabTitle.text());
    tabBar.append(tabLink);
    return container;
}

function createMoreTab(panel) {  // Creates a tab for showing/hiding content whose tabs have overflowed and been hidden
  const tabBar = panel.find('div.tabs');
  const tabOverflow = $(`<div class="tab-overflow ie-feature-block__text"><div class="tab-link-more"><span class="overflow-label">More</span><i class="fa fa-caret-down"></i></div></div>`);
  tabOverflow.hide();
  const dropdownMenu = $('<div class="dropdown-menu"></div>');
  dropdownMenu.hide();
  tabOverflow.append(dropdownMenu);
  tabBar.find('.tab-link').each(function(index) {  // add each tab title to the dropdown
    dropdownItem = $(`<div class="dropdown-item" data-tab-title="${$(this).text()}">${$(this).text()}</div>`);
    dropdownItem.hide();
    dropdownMenu.append(dropdownItem);
  });
  tabBar.append(tabOverflow);
}

// Event Handlers

let handleTabClick = function (e) {
  const tabLink = $(this);
  const requestedTab = tabLink.text();
  $('body').find('div.tabs').each(function(index) {  // checks all tabbed sections to see if they have a matching tab
      tabBar = $(this);
      if (tabBar.has(`.tab-link[data-tab-title="${requestedTab}"]`).length) {  // checks if any links with the right title are in a tab bar
        const link = tabBar.find(`.tab-link[data-tab-title="${requestedTab}"]`);
        link.addClass('selected');
        link.siblings().removeClass('selected');
        link.parent().find('.overflow-label').removeClass('selected');
        link.parent().find('.overflow-label').text('More');
        const panel = link.parent().parent().parent();
        const tabContent = panel.find(`.tab-content[data-tab-title="${requestedTab}"]`);
        document.cookie = `tabPreference=${requestedTab}; path=/`;
        tabContent.siblings('.tab-content').hide();
        tabContent.show();
      }
  });
}

let handleMoreTabClick = function(e) {
  const moreTab = $(this);
  if (moreTab.siblings('.dropdown-menu').is(':visible')) {  // this condition block changes the icon on the more tab based on whether it's visible
    moreTab.find('i').replaceWith($('<i class="fa fa-caret-down"></i>'));
  } else {
    moreTab.find('i').replaceWith($('<i class="fa fa-caret-up"></i>'));
  }
  moreTab.siblings('.dropdown-menu').toggle();
  e.stopPropagation();  // prevents dropdown menu from being hidden on opening
}

let handleDropdownItemClick = function(e) {
  const dropdownItem = $(this);
  const requestedTab = dropdownItem.attr('data-tab-title');
  $('body').find('div.tabs').each(function(index) {  // basically runs the "handlTabClick" function with whatever tab title was in the dropdown item
      tabBar = $(this);
      if (tabBar.has(`.tab-link[data-tab-title="${requestedTab}"]`).length) {  // checks if any links with the right title are in a tab bar
        const link = tabBar.find(`.tab-link[data-tab-title="${requestedTab}"]`);
        link.addClass('selected');
        link.siblings().removeClass('selected');
        const panel = tabBar.parent('.panel');
        const tabContent = panel.find(`.tab-content[data-tab-title="${requestedTab}"]`);
        document.cookie = `tabPreference=${requestedTab}; path=/`;
        tabContent.siblings('.tab-content').hide();
        tabContent.show();
        const overflowTab = tabBar.find('.tab-overflow');
        overflowTab.find('.overflow-label').text(requestedTab);  // makes the more tab show whatever title was selected instead of "more"
        overflowTab.addClass("selected");
        overflowTab.find('.overflow-label').addClass('selected');
      }
  });
}

function adjustTabs() {  // runs whenever the window is resized to dynamically hide tab overflow
  $('body').find('div.tabs').each(function(index) {
    const tabBar = $(this);
    const tabOverflow = tabBar.find('.tab-overflow');
    const dropdownMenu = tabOverflow.find('.dropdown-menu');
    const containerWidth = tabBar.width();
    var runningWidth = 0;  // keeps track of the total width of all tab links
    var lastHidden = -1;
    tabBar.find('.tab-link').each(function(tabIndex) {
      const tab = $(this);
      runningWidth += tab.outerWidth(true);  // optional parameter indicates that we want to include margin in width
      if (runningWidth >= (containerWidth-10)) {  // once the total width of the tab links starts exceeding that of the container, hide them, includes a 10 pixel buffer
        tab.hide();
        lastHidden = lastHidden == -1 ? tabIndex : lastHidden;
        dropdownMenu.find(`.dropdown-item[data-tab-title="${tab.text()}"]`).show();
        return;
      } else {
        tab.show();
        dropdownMenu.find(`.dropdown-item[data-tab-title="${tab.text()}"]`).hide();
      }
    });
    if (lastHidden != -1) {  // if any links have been hidden insert a "more" tab
      const targetTab = $(tabBar.find('.tab-link')[lastHidden - 1]);
      targetTab.hide();
      dropdownMenu.find(`.dropdown-item[data-tab-title="${targetTab.text()}"]`).show();
      tabOverflow.show();
    } else {
      tabOverflow.hide();
    }
    if (tabBar.find(`.tab-link[data-tab-title="${tabBar.find('.overflow-label').text()}"]`).is(':visible')) {  // if the active tab has been removed from overflow, change UI accordingly
      tabOverflow.find('.overflow-label').text("More");
      tabOverflow.removeClass('selected');
      tabOverflow.find('.overflow-label').removeClass('selected');
    } else if (tabBar.find('.tab-link.selected').is(':hidden')) {  // if the active tab has been absorbed by the overflow, adjust UI accordingly
      tabOverflow.find('.overflow-label').text(tabBar.find('.tab-link.selected').text());
      tabOverflow.addClass('selected');
      tabOverflow.find('.overflow-label').addClass('selected');
    }
  });
}

// Helper Functions

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Initialization

/*
$(document).on('click', function() {  // automatically closes dropdown menus if user clicks elsewhere on screen
  $('.dropdown-menu').hide();
  $('.tab-overflow').find('i').replaceWith('<i class="fa fa-caret-down"></i>');
});
*/
createTabs();
adjustTabs();
window.onresize = adjustTabs;
