$(document).ready(function () {
  console.log("Wrapping all images in lightbox.")
  $("div.post img").each(function (idx) {
    $(this).attr('uk-img', '');
    if ($(this).attr('data-src') !== undefined) {
      $(this).attr('data-src', $(this).attr('data-src'));
    } else if ($(this).attr('src') !== undefined) {
      $(this).attr('data-src', $(this).attr('src'));
    } else {
      $(this).attr('data-src', '');
    }
  });

  $("div.post img").wrap(
    function () {
      console.log("Replacing " + $(this).attr("src"));
      return "<div uk-lightbox class=\"img-lightbox\"><a href=\"" + $(this).attr("data-src") + "\" data-alt=\"" + $(this).attr("alt") + "\" data-caption=\"" + $(this).attr("alt") + "\"></a></div>";
    }
  );
  UIkit.lightbox($("div.img-lightbox"));
  UIkit.lightboxPanel($())
  //replaceWith("<div uk-lightbox><a href=\"" + $(this).attr("src") + "\" data-alt=\"" + $(this).attr("alt") + "\"></a></div>");
});
