const baseURL = "https://ign-apis.herokuapp.com";
const minIndex = 0;
const maxIndex = 300;
const numFetch = 10;
const contentTypes = ["video", "article"];

/**
 * Collection of Media, which is either a video, or an article.
 * @constructor
 */
var MediaCollection = function() {
  this.media = {};
  this.filteredMedia = [];
  this.filterType = "";
  this.subscribers = [];
  this.startIndex = 0;
  this.isFetching = false;
};

/**
 * Adds a callback function that accepts a snapshot of new MediaCollection instances.
 * @param {function} callback Accepts a single parameter, a snapshot of the MediaCollection
 */
MediaCollection.prototype.subscribe = function(callback) {
  this.subscribers.push({
    callback: callback,
  });
};

/**
 * Passes a copy of this to all subscribers.
 */
MediaCollection.prototype.notifySubscribers = function() {
  for (var i = 0 ; i < this.subscribers.length; i++) {
    this.subscribers[i].callback(Object.assign({ }, this));
  }
}

/**
 * Filters the data by contentType. If type doesn't match any known contentTypes,
 * then all media is included.
 * @param {string} type contentType
 * @returns {MediaCollection}
 */
MediaCollection.prototype.filter = function(type) {
  const self = this;
  this.filteredMedia = Object.keys(self.media);

  if (type !== undefined && type !== "") {
    contentTypes.forEach(function(val) {
      if (val === type) {
        self.filterType = type;
      }
    });

    self.filteredMedia = self.filteredMedia.filter(function(el) {
      if (self.media[el].contentType === self.filterType) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    self.filterType = "";
  }

  this.filteredMedia.sort(function(a, b) {
    a.publishDate < b.publishDate;
  });

  this.notifySubscribers();
  return Object.assign({ }, this);
}

/**
 * Returns a snapshot.
 * @returns {MediaCollection} 
 */
MediaCollection.prototype.get = function() {
  return Object.assign({ }, this);
};

/**
 * Initiates a fetch from IGN's heroku app.
 * Encapsulates requests to the '/content' and '/comments' endpoints.
 */
MediaCollection.prototype.fetch = function() {
  if (this.isFetching === false) {
    this.isFetching = true;
    const self = this;
    const contentURI = baseURL + '/content';
    const commentsURI = baseURL + '/comments';

    /**
     * Helper function that accepts the response from fetching the contentURI,
     * retrieves each content's comment data and updates the collection, then notifies
     * all subscribers.
     * @param {Object} response Response from retrieving contentURI 
     */
    function fetchComments(response) {
      const me = self;
      response.data.forEach(function(el) {
        const keys = Object.keys(el);
        const content = {};
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] !== "contentId") {
            content[keys[i]] = el[keys[i]];
          }
        }
        me.media[el.contentId] = content;
      });

      self.startIndex = response.startIndex + response.count;

      const contentIDs = response.data.map(el => el.contentId);

      $.ajax({
        url: commentsURI,
        jsonp: "callback",
        dataType: "jsonp",
        data: {
          ids: contentIDs.join(','),
        },
        success: function (response) {
          response.content.forEach(el => self.media[el.id].commentCount = el.count);
          self.filter(self.filterType);
          self.isFetching = false;
        }
      })
    }

    $.ajax({
      url: contentURI,
      jsonp: "callback",
      dataType: "jsonp",
      data: {
        startIndex: self.startIndex,
      },
      success: fetchComments, 
    });
  }
};
