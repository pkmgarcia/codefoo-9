/**
 * Presenter.
 * @param {MediaCollection} mediaCollection 
 */
var MediaView = function(mediaCollection) {
  this.mediaCollection = mediaCollection;
  var self = this;
  this.mediaCollection.subscribe(function(snapshot) {
    self.media = [];
    snapshot.filteredMedia.forEach(function(el) {
      self.media.push(Object.assign({ contentId: el }, snapshot.media[el]));
    });
    self.render();
  });
}

/**
 * Converts commentCount (integer) to html (string).
 * @returns {string} html
 * @param {int} commentCount
 */
MediaView.prototype.commentCount2html = function(commentCount) {
  const html = [];
  html.push('<span class="media-view-item-comment-count">');
  html.push('<svg width="18px" height="18px">');
  html.push('<ellipse cx="8" cy="11" rx="7" ry="4" stroke-width="2" stroke="#bf1313" fill="white">');
  html.push('</ellipse>');
  html.push('<polyline points="7,15 4,16 5,14" stroke-width="2" stroke="#bf1313">')
  html.push('</polyline>');
  html.push('</svg>');
  html.push(commentCount);
  html.push('</span>');
  return html.join('');
}

/**
 * Converts publishDate (string) to html (string).
 * @returns {string} html
 * @param {string} publishDate Date in ISO 8601 notation
 */
MediaView.prototype.publishDate2html = function(publishDate) {
  const html = [];
  const then = new Date(publishDate);
  const now = new Date();
  const millisecondsPerSecond = 1000;
  const secondsPerMinute = 60;
  const minutesPerHour = 60;
  const hoursPerDay = 24;
  const daysPerMonth = 30;
  const monthsPerYear = 12;
  var numConversions = 0;

  html.push('<span class="media-view-item-age">');

  var age = (
              Date.UTC(now.getFullYear(),
                       now.getMonth(),
                       now.getDate(),
                       now.getHours(),
                       now.getMinutes())
            - Date.UTC(then.getFullYear(),
                       then.getMonth(),
                       then.getDate(),
                       then.getHours(),
                       then.getMinutes())
            ) / (millisecondsPerSecond * secondsPerMinute);
  numConversions++;

  if (age > minutesPerHour) {
    age /= minutesPerHour;
    numConversions++;
    if (age > hoursPerDay) {
      age /= hoursPerDay;
      numConversions++;
      if (age > daysPerMonth) {
        age /= daysPerMonth;
        numConversions++;
        if (age > monthsPerYear) {
          age /= monthsPerYear;
          numConversions++;
        }
      }
    }
  }
  html.push(Math.floor(age));

  switch (numConversions) {
    case 1:
      html.push('m');
      break;
    case 2:
      html.push('h');
      break;
    case 3:
      html.push('d');
      break;
    case 4:
      html.push('mo');
      break;
    case 5:
      html.push('y');
    default:
  }
  html.push('</span>');
  return html.join('');
}

/**
 * Converts duration (int) to html (string).
 * @returns {string} html
 * @param {int} duration Length of video in seconds.
 */
MediaView.prototype.duration2html = function(duration) {
  const html = [];
  const secondsPerMinute = 60;

  const minutes = Math.floor(duration / secondsPerMinute);
  const seconds = duration % secondsPerMinute;

  html.push('<div class="duration">');
  html.push('<svg class="icon" width="32px" height="32px">');
  html.push('<circle cx="16" cy="16" r="15" stroke-width="2" stroke="white" fill="white"></circle>');
  html.push('<polygon points="11,10 23,16 11,22" fill="#bf1313"</polygon>');
  html.push('</svg>');
  html.push('<span>');
  html.push(minutes.toString() + ':' + seconds.toString().padStart(2, '0'));
  html.push('</span>');
  html.push('</div>');

  return html.join('');
}

/**
 * Helper function that, given media whose contentType is 'article',
 * will return the HTML representation in a string.
 * @param article
 * @returns {string} HTML representation of the article.
 */
MediaView.prototype.article2html = function(article) {
  const html = [];

  html.push('<section class="media-view-item">');

  html.push('<div class="media-view-image">');
  html.push('<img alt="' + article.metadata.headline + '" src="' + article.thumbnails[0].url + '">');
  html.push('</div>')

  html.push('<div class="media-view-item-details">');
  html.push('<div class="media-view-item-metrics">');
  html.push(this.publishDate2html(article.metadata.publishDate));
  html.push(' - ');
  html.push(this.commentCount2html(article.commentCount));
  html.push('</div>');
  html.push('<div class="media-view-item-header">' + article.metadata.headline + '</div>');
  html.push('</div>')

  html.push('</section>');

  html.push('<hr>');

  return html.join('');
}
/**
 * Helper function that, given media whose contentType is 'video',
 * will return the HTML representation in a string.
 * @param video 
 * @returns {string} HTML representation of the video.
 */
MediaView.prototype.video2html = function (video) {
  const html = [];

  html.push('<section class="media-view-item">');

  html.push('<div class="media-view-image">');
  html.push('<img alt="' + video.metadata.title + '" src="' + video.thumbnails[0].url + '">');
  html.push('<div class="media-view-image-overlay">')
  html.push(this.duration2html(video.metadata.duration));
  html.push('</div>');
  html.push('</div>');

  html.push('<div class="media-view-item-details">');
  html.push('<div class="media-view-item-metrics">');
  html.push(this.publishDate2html(video.metadata.publishDate));
  html.push(' - ');
  html.push(this.commentCount2html(video.commentCount));
  html.push('</div>');
  html.push('<div class="media-view-item-header">' + video.metadata.title + '</div>');
  html.push('</div>')
  html.push('</section>');

  html.push('<hr>');

  return html.join('');
}

/**
 * Renders mediaCollection using jQuery.
 */
MediaView.prototype.render = function () {
  const media = this.media.slice();
  const self = this;

  $('#media-list').html('');
  const html = [];

  media.map(function(item) {
    html.push('<li>');
    switch (item.contentType) {
      case "article":
        html.push(self.article2html(item));
        break;
      case "video":
        html.push(self.video2html(item));
        break;
      default:
    }
    html.push('</li>');
  });

  $('#media-list').html(html.join(''));
};
