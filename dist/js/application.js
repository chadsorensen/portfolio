jQuery(document).ready(function(event) {
  var $header, $hello, $nav, changePage, controller, firstLoad, isAnimating, loadNewContent, newLocation, transitionsSupported;
  isAnimating = false;
  newLocation = '';
  $nav = $('.nav-item');
  $header = $('#header nav');
  $hello = $('#hello');
  $hello.addClass('active');
  controller = new ScrollMagic.Controller;
  new ScrollMagic.Scene({
    triggerElement: '#work'
  }).setClassToggle('#work', 'active').addTo(controller);
  new ScrollMagic.Scene({
    triggerElement: '#contact',
    offset: -50
  }).setClassToggle('#contact', 'active').addTo(controller);
  new ScrollMagic.Scene({
    triggerElement: '#about',
    offset: -100
  }).addTo(controller).on('enter', function(e) {
    return $('#about').addClass('active');
  });
  controller.scrollTo(function(newpos) {
    TweenMax.to(window, 0.75, {
      scrollTo: {
        y: newpos
      }
    });
  });
  $(document).on('click', 'a[href^=\'#\']', function(e) {
    var id;
    id = $(this).attr('href');
    console.log('id', id);
    if ($(id).length > 0) {
      e.preventDefault();
      controller.scrollTo(id);
      if (window.history && window.history.pushState) {
        history.pushState('', document.title, id);
      }
    }
  });
  changePage = (function(_this) {
    return function(url, bool, $click) {
      isAnimating = true;
      $('body').addClass('page-is-changing');
      $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        loadNewContent(url, bool, $click);
        newLocation = url;
        return $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      });
      if (!transitionsSupported()) {
        loadNewContent(url, bool, $click);
        return newLocation = url;
      }
    };
  })(this);
  loadNewContent = (function(_this) {
    return function(url, bool, $click) {
      var newSection, section;
      url = '' === url ? 'index' : url;
      newSection = 'cd-' + url.replace('.html', '');
      section = $('<div class="cd-main-content ' + newSection + '"></div>');
      return section.load(url + ' .cd-main-content > *', function(event) {
        var delay;
        $('main').html(section);
        delay = transitionsSupported() ? 1200 : 0;
        setTimeout((function() {
          var $active;
          if (section.hasClass('cd-template')) {
            $('body').addClass('cd-template');
          } else {
            $('body').removeClass('cd-template');
          }
          $nav.removeClass('active');
          $active = $(".nav-item[href='" + url + "']");
          $active.addClass('active');
          if ($click.hasClass('index')) {
            $header.addClass('hide');
          } else {
            $header.removeClass('hide');
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
  })(this);
  transitionsSupported = function() {
    return $('html').hasClass('csstransitions');
  };
  firstLoad = false;
  $('body').on('click', '[data-type="page-transition"]', function(event) {
    var $click, newPage;
    event.preventDefault();
    $click = $(event.currentTarget);
    if (!$click.hasClass('active')) {
      newPage = $(this).attr('href');
      if (!isAnimating) {
        changePage(newPage, true, $click);
      }
    }
    return firstLoad = true;
  });
  return $(window).on('popstate', function() {
    var newPage, newPageArray;
    if (firstLoad) {

      /*
      Safari emits a popstate event on page load - check if firstLoad is true before animating
      if it's false - the page has just been loaded
       */
      newPageArray = location.pathname.split('/');
      newPage = newPageArray[newPageArray.length - 1];
      if (!isAnimating && newLocation !== newPage) {
        changePage(newPage, false, $('.index'));
      }
    }
    return firstLoad = true;
  });
});
