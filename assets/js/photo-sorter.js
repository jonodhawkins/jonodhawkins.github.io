$(document).ready(function () {

  // Open script when document has loaded
  photos = $('.jh-photo');

  console.log('Iterating over photos');

  // Create empty object for tags
  var tags = {};

  photos.each(function (index) {
    // Find tags for current photo
    currentTags = $(this).find('.jh-photo-tags');
    // Check whether tags are available
    if (currentTags.length == 1) {
      console.log('Found tags for image [' + index + ']:');

      // Read tags
      if (currentTags.html().length > 0) {

        // Split values by comma
        indvTags = currentTags.html().split(',');
        console.log(indvTags);

        // Iterate over tags and assign index to each
        indvTags.forEach(function (tag) {
          tag = tag.toLowerCase().trim();
          // Search for ampersand and replace - add other escapes as necessary
          tag = tag.replace('&amp;', '&');

          if (!(tag in tags)) {
            console.log('Adding ' + tag + ' to tags...');
            tags[tag] = [index];
          } else {
            console.log('Already found ' + tag + ' in tags...');
            tags[tag].push(index);
          }
        });

      } else {
        console.log('No tag content');
      }

    } else {
      console.log('No tags found for image [' + index + ']');
    }
  });

  // Create updatePhotoSorter update function for checkbox events
  updatePhotoSorter = function () {
    console.log('Something changed');
    //  Create an empty zero array
    var index = new Array(photos.length).fill(0);
    //  Hide all photos
    $('.jh-photo').hide();
    //  Check whether each checkbox is checked
    $('.jh-photo-sorter :checkbox').each(function () {
      if ($(this).is(":checked")) {
        tag = $(this).attr('name');
        // Iterate over the indices in the tag array and switch to 1
        tags[tag].forEach(function (element) {
            index[element] = 1;
        });
      }
    });

    index.forEach(function (valid, photoIndex) {
      // Show elements if index is 1
      if (valid) {
        photos.eq(photoIndex).show();
      }
    });

    // Iterate over index - if the sum is zero then no tags are ticked so show all photos
    var sum = 0;
    for (var k = 0; k < index.length; k++) {
      sum = sum + index[k];
    }

    if (sum == 0) {
      $('.jh-photo').show()
    }

    // Finally update the UIkit grid
    UIkit.update($('.jh-photo-grid'));

  }

  // Now create a list of radio buttons
  Object.keys(tags).forEach(function (tag) {

    $('.jh-photo-sorter').append('<label><input class="uk-checkbox" type="checkbox" name="'+tag+'"> ' + tag + '</label>').css('text-transform', 'capitalize')

  });

  $('.jh-photo-sorter :checkbox').click(updatePhotoSorter);

});
