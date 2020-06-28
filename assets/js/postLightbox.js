var lastTag = null;

$(document).ready(function () {

  var img = $("div.post img");
  //
  img.each(function (idx) {
    $(this).attr('uk-img', '');
    if ($(this).attr('data-src') !== undefined) {
      $(this).attr('data-src', $(this).attr('data-src'));
    } else if ($(this).attr('src') !== undefined) {
      $(this).attr('data-src', $(this).attr('src'));
    } else {
      $(this).attr('data-src', '');
    }
  });

  var lightboxItems = [];
  var anchors = [];

  img.each(function (index) {

    // Wrap each image in an anchor tag
    anchors.push($(this).wrap("<a href=\"#\" name=\"" + index + "\" lightbox-button></a>"));

    // Caption
    captionText = '';
    if ($(this).attr('alt') !== undefined) {
      captionText = $(this).attr('alt');
    }

    lightboxItems.push({
      source: $(this).attr('data-src'),
      caption: captionText,
      container: 'div.post'
    })

  });

  $(anchors).each(function (index) {
    $(this).click(function () {
      lastTag = index;
      UIkit.lightboxPanel({
        items: lightboxItems,
        preload: 2
      }).show(index);
    })
  });

  $(document).on('hide', 'div.uk-lightbox', function () {
    tag = $("a[name='"+ lastTag + "']");
    $("html,body").animate({scrollTop: tag.offset().top}, {duration: 0});
  });


});
