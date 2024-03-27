$(document).ready(function () {
  $('.custom-dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      $(this).find('.custom-dropdown-menu').slideDown(300);
    } else {
      $(this).find('.custom-dropdown-menu').delay(100).slideUp(300);
    }
    $(this).find('.chevrondown').toggleClass('invisible');
    $(this).find('.chevronup').toggleClass('invisible');
  });
  $('.custom-dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.custom-dropdown-menu').delay(100).slideUp(300);
    $(this).find('.chevrondown').addClass('invisible');
    $(this).find('.chevronup').removeClass('invisible');
  });

  $('#version-dropdown-new .custom-dropdown-menu li, ' + 
    '#language-dropdown .custom-dropdown-menu li, ' + 
    '#contribute-dropdown .custom-dropdown-menu li, ' +
    '#allnetapp-dropdown .custom-dropdown-menu li').click(function () {
    var link = $(this).find('a').attr("href");
    var target = $(this).find('a').attr("target");
    var win = window.open(link, target);
    if (win) {
      win.focus();
    }
  });

  $('#version-dropdown-new a').eq(0).parent('li').addClass('hide');

  $('#flavor-dropdown .custom-dropdown-menu li').click(function () {
    var flavor_url = $(this).data('url');
    if (flavor_url) {
      window.location = flavor_url;
    }
  });
  $('#remove-flavor').click(function (e) {
    e.preventDefault();
    window.location = $('#flavor-dropdown').data('url')
  });
});
