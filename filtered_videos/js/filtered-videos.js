/**
 * @file
 * Loads filtered videos.
 */

(function ($) {
  Drupal.behaviors.uniqueName = {
    attach: function (context, settings) {

      var button = $('.handle-load-videos'),
          container = $('#filtered-videos'),
          auto = settings.filtered_videos.auto,
          sport = settings.filtered_videos.sport,
          school = settings.filtered_videos.school,
          apiKey = '--ADD-API-KEY--',
          path = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + apiKey + '&language=en-US&page=1';

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
          $(container).empty();
          loadVideos(path);
        });
      }

      // Video factory.
      var videoFactory = function (videoArray) {
        if (videoArray.length >= 1) {
          $(container).append($('<ul>', {
            'class': 'videoList'
          }));
          $.each(videoArray, function (key, val) {
            $('.videoList').append(val);
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
              var programs = data.results;
              // Make sure we have data.
              if (programs) {
                $.each(programs, function(i) {
                  var title = programs[i].title;
                  var url = '#';
                  var img = 'https://image.tmdb.org/t/p/w500/' + programs[i].poster_path;
                  if (typeof title != 'undefined' && typeof url != 'undefined' && typeof img != 'undefined') {
                    var $li = $('<li/>').append($('<h1>' + title + '</h1>')
                      ).append($('<a/>',  {
                        title: title,
                        href: url,
                      }).append($('<img/>', {
                        alt: title,
                        src: img
                      }))
                    );
                    videoArray.push($li);
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
