$(document).ready(function() {
  const mediaCollection = new MediaCollection();
  const mediaView = new MediaView(mediaCollection);

  // Fetch initial data
  mediaCollection.fetch();

  // Set click events to filter between latest, videos, and articles
  $("#filter-latest").click(function() {
    mediaCollection.filter();
  });
  $("#filter-videos").click(function() {
    mediaCollection.filter("video");
  });
  $("#filter-articles").click(function() {
    mediaCollection.filter("article");
  });

  // Set click event for fetching more media into the collection
  $("#load-more-button").click(function() {
    mediaCollection.fetch();
  });
});
