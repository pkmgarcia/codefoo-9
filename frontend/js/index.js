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
    mediaCollection.filter();
  });
  $("#filter-videos").click(function() {
    lastActive.removeClass("active-nav-button");
    $(this).addClass("active-nav-button");
    lastActive = $(this);
    mediaCollection.filter("video");
  });
  $("#filter-articles").click(function() {
    lastActive.removeClass("active-nav-button");
    $(this).addClass("active-nav-button");
    lastActive = $(this);
    mediaCollection.filter("article");
  });

  // Set click event for fetching more media into the collection
  $("#load-more-button").click(function() {
    mediaCollection.fetch();
  });
});
