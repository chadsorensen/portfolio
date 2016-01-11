var helloNavigation, mobileNavigation, scrollMagic, smoothScroll, verticalNavigation;

jQuery(document).ready(function($) {
  var $contentSections, $header, $hello, $helloNavigation, $navTrigger, $navigationItems, $verticalNavigation, checkScroll, isAnimating, scrolling, updateSections;
  scrolling = false;
  isAnimating = false;
  $header = $('#header nav');
  $hello = $('#hello');
  $contentSections = $('section');
  $verticalNavigation = $('.cd-vertical-nav');
  $navigationItems = $verticalNavigation.find('a');
  $helloNavigation = $('#hello');
  $navTrigger = $('.cd-nav-trigger');
  $hello.addClass('active');
  scrollMagic();
  helloNavigation($helloNavigation);
  verticalNavigation($verticalNavigation);
  mobileNavigation($navTrigger, $verticalNavigation);
  checkScroll = function() {
    if (!scrolling) {
      scrolling = true;
      if (!window.requestAnimationFrame) {
        return setTimeout(updateSections, 300);
      } else {
        return window.requestAnimationFrame(updateSections);
      }
    }
  };
  updateSections = function() {
    var halfWindowHeight, scrollTop;
    halfWindowHeight = $(window).height() / 2;
    scrollTop = $(window).scrollTop();
    $contentSections.each(function() {
      var $activeNav, $activeSection, $navigationItem, $section, sectionId;
      $section = $(this);
      sectionId = $section.attr('id');
      $navigationItem = $navigationItems.filter('[href^="#' + sectionId + '"]');
      if ($section.offset().top - halfWindowHeight < scrollTop && $section.offset().top + $section.height() - halfWindowHeight > scrollTop) {
        $navigationItem.addClass('active');
      } else {
        $navigationItem.removeClass('active');
      }
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
        $navigationItem.removeClass('active');
        $activeSection = $('#contact');
        $activeNav = $navigationItems.filter('[href^="#contact"]');
        $activeNav.addClass('active');
        return $activeSection.addClass('active');
      }
    });
    return scrolling = false;
  };
  return $(window).on('scroll', checkScroll);
});

smoothScroll = function(target) {
  return $('body,html').animate({
    'scrollTop': target.offset().top
  }, 500);
};

scrollMagic = function() {
  var controller;
  controller = new ScrollMagic.Controller;
  new ScrollMagic.Scene({
    triggerElement: '#work'
  }).setClassToggle('#work', 'active').addTo(controller);
  return new ScrollMagic.Scene({
    triggerElement: '#about',
    offset: -100
  }).addTo(controller).on('enter', function(e) {
    return $('#about').addClass('active');
  });
};

helloNavigation = function($helloNavigation) {
  return $helloNavigation.on('click', 'a', function(event) {
    event.preventDefault();
    return smoothScroll($(this.hash));
  });
};

verticalNavigation = function($verticalNavigation) {
  return $verticalNavigation.on('click', 'a', function(event) {
    event.preventDefault();
    smoothScroll($(this.hash));
    return $verticalNavigation.removeClass('open');
  });
};

mobileNavigation = function($navTrigger, $verticalNavigation) {
  return $navTrigger.on('click', function(event) {
    event.preventDefault();
    return $verticalNavigation.toggleClass('open');
  });
};
