jQuery(document).ready ($) ->
  scrolling = false
  isAnimating = false

  $header = $('#header nav')
  $hello = $('#hello')
  $contentSections = $('section')
  $verticalNavigation = $('.cd-vertical-nav')
  $navigationItems = $verticalNavigation.find('a')
  $helloNavigation = $('#hello')
  $navTrigger = $('.cd-nav-trigger')

  $hello.addClass 'active'
  
  scrollMagic()
  helloNavigation($helloNavigation)
  verticalNavigation($verticalNavigation)
  mobileNavigation($navTrigger, $verticalNavigation)


  checkScroll = ->
    if !scrolling
      scrolling = true
      if !window.requestAnimationFrame then setTimeout(updateSections, 300) else window.requestAnimationFrame(updateSections)

  updateSections = ->
    halfWindowHeight = $(window).height() / 2
    scrollTop = $(window).scrollTop()
    $contentSections.each ->
      $section = $(this)
      sectionId = $section.attr('id')
      $navigationItem = $navigationItems.filter('[href^="#' + sectionId + '"]')
      if $section.offset().top - halfWindowHeight < scrollTop and $section.offset().top + $section.height() - halfWindowHeight > scrollTop then $navigationItem.addClass('active') else $navigationItem.removeClass('active')
      if $(window).scrollTop() + $(window).height() > $(document).height() - 50
        $navigationItem.removeClass('active')
        $activeSection = $('#contact')
        $activeNav = $navigationItems.filter('[href^="#contact"]')
        $activeNav.addClass('active')
        $activeSection.addClass('active')

    scrolling = false

  $(window).on 'scroll', checkScroll

smoothScroll = (target) ->
  $('body,html').animate { 'scrollTop': target.offset().top }, 500

scrollMagic = ->
  controller = new (ScrollMagic.Controller)
  new (ScrollMagic.Scene)(triggerElement: '#work').setClassToggle('#work', 'active').addTo controller

  new (ScrollMagic.Scene)(triggerElement: '#about', offset: -100).addTo(controller).on('enter', (e) ->
    $('#about').addClass 'active'
  )
  # new (ScrollMagic.Scene)(triggerElement: '#contact').addTo(controller).on('enter', (e) ->
  #   $('#contact').addClass 'active'
  # )

helloNavigation = ($helloNavigation) ->
  $helloNavigation.on 'click', 'a', (event) ->
    event.preventDefault()
    smoothScroll $(@hash)

verticalNavigation = ($verticalNavigation) ->
  $verticalNavigation.on 'click', 'a', (event) ->
    event.preventDefault()
    smoothScroll $(@hash)
    $verticalNavigation.removeClass 'open'

mobileNavigation =  ($navTrigger, $verticalNavigation) ->
  $navTrigger.on 'click', (event) ->
    event.preventDefault()
    $verticalNavigation.toggleClass 'open'