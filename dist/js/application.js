jQuery(document).ready(function(event) {
  var changePage, firstLoad, isAnimating, loadNewContent, newLocation, transitionsSupported;
  isAnimating = false;
  newLocation = '';
  changePage = function(url, bool) {
    isAnimating = true;
    $('body').addClass('page-is-changing');
    $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      loadNewContent(url, bool);
      newLocation = url;
      return $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    });
    if (!transitionsSupported()) {
      loadNewContent(url, bool);
      return newLocation = url;
    }
  };
  loadNewContent = function(url, bool) {
    var newSection, section;
    url = '' === url ? 'index.html' : url;
    newSection = 'cd-' + url.replace('.html', '');
    section = $('<div class="cd-main-content ' + newSection + '"></div>');
    return section.load(url + ' .cd-main-content > *', function(event) {
      var delay;
      $('main').html(section);
      delay = transitionsSupported() ? 1200 : 0;
      setTimeout((function() {
        if (section.hasClass('cd-template')) {
          $('body').addClass('cd-template');
        } else {
          $('body').removeClass('cd-template');
        }
        $('body').removeClass('page-is-changing');
        $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
          isAnimating = false;
          return $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        });
        if (!transitionsSupported()) {
          return isAnimating = false;
        }
      }), delay);
      if (url !== window.location && bool) {
        return window.history.pushState({
          path: url
        }, '', url);
      }
    });
  };
  transitionsSupported = function() {
    return $('html').hasClass('csstransitions');
  };
  firstLoad = false;
  $('body').on('click', '[data-type="page-transition"]', function(event) {
    var $click, $header, $nav, newPage;
    event.preventDefault();
    $click = $(event.currentTarget);
    $nav = $('.nav-item');
    $header = $('#header nav');
    if (!$click.hasClass('active')) {
      newPage = $(this).attr('href');
      if (!isAnimating) {
        changePage(newPage, true);
      }
      $nav.removeClass('active');
      $click.addClass('active');
      if ($click.hasClass('index')) {
        $header.addClass('hide');
      } else {
        $header.removeClass('hide');
      }
    }
    return firstLoad = true;
  });
  $(window).on('popstate', function() {
    var newPage, newPageArray;
    if (firstLoad) {

      /*
      Safari emits a popstate event on page load - check if firstLoad is true before animating
      if it's false - the page has just been loaded
       */
      newPageArray = location.pathname.split('/');
      newPage = newPageArray[newPageArray.length - 1];
      if (!isAnimating && newLocation !== newPage) {
        changePage(newPage, false);
      }
    }
    return firstLoad = true;
  });
  return new UIMorphingButton(document.querySelector('.morph-button'));
});
