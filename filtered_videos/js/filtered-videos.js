/**
 * @file
 * Loads filtered videos.
 */

(function ($) {
  Drupal.behaviors.uniqueName = {
    attach: function (context, settings) {

      var button = document.getElementsByClassName('handle-load-videos'),
          container = document.getElementById('filtered-videos'),
          auto = settings.filtered_videos.auto,
          sport = settings.filtered_videos.sport,
          school = settings.filtered_videos.school,
          path = 'http://XXX=' + sport + '&school=' + school;

      console.log('update path');

      // Check auto.
      if (auto == 1) {
        $(container).ready(function () {
          loadVideos(path);
        })
      }
      else {
        // Wait for a button click.
        $(button).show();
        $(button).on('click', function () {
          loadVideos(path);
        });
      }

      // Video factory.
      var videoFactory = function (videoArray) {
        if (videoArray.length >= 1) {
          $.each(videoArray, function (key, val) {
            $(container).append(val);
          })
        }
      }

      // Api Call.
      var loadVideos = function (path) {
        var videoArray = [];
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
          if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
              var data = JSON.parse(this.responseText);
              var programs = data.programs;
              // Make sure we have data.
              if (programs) {
                $.each(programs, function(i) {
                  var title = programs[i].title;
                  var url = programs[i].url;
                  var img = programs[i].images.small;

                  if (typeof title != 'undefined' && typeof url != 'undefined' && typeof img != 'undefined') {
                    var content = '<a title="' + title + '" href="' + url + '"><img alt="' + title + '" src="' + img + '"></a>';
                    videoArray.push(content);
                  }

                })
                videoFactory(videoArray);
              }
            }
          }
        };
        request.open("GET", path , true);
        request.send();
      };
    }
  }

})(jQuery);
