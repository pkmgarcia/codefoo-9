$(document).ready(function() {
  const mediaCollection = new MediaCollection();
  const mediaView = new MediaView(mediaCollection);

  // Initialize last active tag ("latest")
  $("#filter-latest").addClass("active-nav-button");
  var lastActive = $("#filter-latest");

  // Fetch initial data
  mediaCollection.fetch();

  // Set click events to filter between latest, videos, and articles
  $("#filter-latest").click(function() {
      lastActive.removeClass("active-nav-button");
      $(this).addClass("active-nav-button");
      lastActive = $(this);
    $('#media-list').fadeOut(500, function() {
      mediaCollection.filter();
      $(this).fadeIn(1);
    });
  });
  $("#filter-videos").click(function() {
      lastActive.removeClass("active-nav-button");
      $(this).addClass("active-nav-button");
      lastActive = $(this);
    $('#media-list').fadeOut(500, function() {
      mediaCollection.filter("video");
      $(this).fadeIn(1);
    });
  });
  $("#filter-articles").click(function() {
      lastActive.removeClass("active-nav-button");
      $(this).addClass("active-nav-button");
      lastActive = $(this);
    $('#media-list').fadeOut(500, function() {
      mediaCollection.filter("article");
      $(this).fadeIn(1);
    });
  });

  // Set click event for fetching more media into the collection
  $("#load-more-button").click(function() {
    $('#media-list').fadeOut(500, function() {
      mediaCollection.fetch();
      $(this).fadeIn(1);
    });
  });
});
