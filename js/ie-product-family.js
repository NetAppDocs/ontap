$(document).ready(function () {
  try {
    let linkTags = [];
    let tileTags = [];
    let tagsMatched = [];
    const tiles = $(".product-family-tile");
    $("#ie-product-family-links a").click(function (event) {
      $("#ie-product-family-links>li.active").removeClass("active");
        $(event.target).parent().addClass("active");
        $('#selected-sidelink span').text(event.target.text);
      linkTags = event.target
      .getAttribute("data-tags")
      .split(",")
      .map((linkTag) => linkTag.trim());
      if (tiles.length > 0) {
        tiles.each(function (idx, tile) {
          if ($(tile).hasClass("hide")) $(tile).removeClass("hide");
          tileTags = $(tile)
            .attr("data-tags")
            .split(",")
            .map((tag) => tag.trim());
          tagsMatched = linkTags.filter((lTag) => tileTags.includes(lTag));
          if (tagsMatched.length === 0) $(tile).addClass("hide");
        });
      }
      event.stopImmediatePropagation();
    });
  } catch (err) {
    console.log(err);
  }
});
