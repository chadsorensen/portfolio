jQuery(document).ready(function(event) {
  var $header, $hello, controller, isAnimating, newLocation;
  isAnimating = false;
  newLocation = '';
  $header = $('#header nav');
  $hello = $('#hello');
  $hello.addClass('active');
  controller = new ScrollMagic.Controller;
  new ScrollMagic.Scene({
    triggerElement: '#work'
  }).setClassToggle('#work', 'active').addTo(controller);
  new ScrollMagic.Scene({
    triggerElement: '#about',
    offset: -100
  }).addTo(controller).on('enter', function(e) {
    return $('#about').addClass('active');
  });
  return new ScrollMagic.Scene({
    triggerElement: '#contact',
    offset: -100
  }).addTo(controller).on('enter', function(e) {
    return $('#contact').addClass('active');
  });
});

jQuery(document).ready(function($) {
  var checkScroll, contentSections, helloNavigation, navTrigger, navigationItems, scrolling, smoothScroll, updateSections, verticalNavigation;
  scrolling = false;
  contentSections = $('section');
  verticalNavigation = $('.cd-vertical-nav');
  helloNavigation = $('#hello');
  navigationItems = verticalNavigation.find('a');
  navTrigger = $('.cd-nav-trigger');
  checkScroll = function() {
    if (!scrolling) {
      scrolling = true;
      if (!window.requestAnimationFrame) {
        setTimeout(updateSections, 300);
      } else {
        window.requestAnimationFrame(updateSections);
      }
    }
  };
  updateSections = function() {
    var halfWindowHeight, scrollTop;
    halfWindowHeight = $(window).height() / 2;
    scrollTop = $(window).scrollTop();
    contentSections.each(function() {
      var navigationItem, section, sectionId;
      section = $(this);
      sectionId = section.attr('id');
      navigationItem = navigationItems.filter('[href^="#' + sectionId + '"]');
      if (section.offset().top - halfWindowHeight < scrollTop && section.offset().top + section.height() - halfWindowHeight > scrollTop) {
        return navigationItem.addClass('active');
      } else {
        return navigationItem.removeClass('active');
      }
    });
    return scrolling = false;
  };
  smoothScroll = function(target) {
    $('body,html').animate({
      'scrollTop': target.offset().top
    }, 500);
  };
  $(window).on('scroll', checkScroll);
  helloNavigation.on('click', 'a', function(event) {
    event.preventDefault();
    return smoothScroll($(this.hash));
  });
  verticalNavigation.on('click', 'a', function(event) {
    event.preventDefault();
    smoothScroll($(this.hash));
    return verticalNavigation.removeClass('open');
  });
  return navTrigger.on('click', function(event) {
    event.preventDefault();
    return verticalNavigation.toggleClass('open');
  });
});
