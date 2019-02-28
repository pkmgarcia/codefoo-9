/**
 * Presenter.
 * @param {MediaCollection} mediaCollection 
 */
var MediaView = function(mediaCollection) {
  this.mediaCollection = mediaCollection;
  this.media = [];
  var self = this;
  this.mediaCollection.subscribe(function(snapshot) {
    snapshot.filteredMedia.forEach(function(el) {
      self.media.push(Object.assign({ contentId: el }, snapshot.media[el]));
    });
    self.render();
  });
}

MediaView.prototype.commentCount2html = function(commentCount) {
  const html = [];
  
  html.push('<span class="media-view-item-comment-count">');

  html.push(commentCount);

  html.push('</span>');

  return html.join('');
}

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
 * Helper function that, given media whose contentType is 'article',
 * will return the HTML representation in a string.
 * @param article
 * @returns {string} HTML representation of the article.
 */
MediaView.prototype.article2html = function(article) {
  const html = [];

  html.push('<section class="media-view-item">')
  html.push('<div class="image-container">');
  html.push('<img alt="' + article.metadata.headline + '" src="' + article.thumbnails[0].url + '">');
  html.push('</div>')
  html.push('<div class="media-view-item-details">');
  html.push('<div class="media-view-item-metrics">');
  html.push(this.commentCount2html(article.commentCount));
  html.push(this.publishDate2html(article.metadata.publishDate));
  html.push('</div>');
  html.push('<h3>' + article.metadata.headline + '</h3>');
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

  html.push('<section class="media-view-item">')
  html.push('<div class="image-container">');
  html.push('<img alt="' + video.metadata.headline + '" src="' + video.thumbnails[0].url + '">');
  html.push('</div>');
  html.push('<div class="media-view-item-details">');
  html.push('<div class="media-view-item-metrics">');
  html.push(this.commentCount2html(video.commentCount));
  html.push(this.publishDate2html(video.metadata.publishDate));
  html.push('</div>');
  html.push('<h3>' + video.metadata.title + '</h3>');
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
