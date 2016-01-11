jQuery(document).ready (event) ->
  isAnimating = false
  newLocation = ''

  $header = $('#header nav')
  $hello = $('#hello')

  $hello.addClass 'active'

  controller = new (ScrollMagic.Controller)
  new (ScrollMagic.Scene)(triggerElement: '#work').setClassToggle('#work', 'active').addTo controller

  new (ScrollMagic.Scene)(triggerElement: '#about', offset: -100).addTo(controller).on('enter', (e) ->
    $('#about').addClass 'active'
  )
  new (ScrollMagic.Scene)(triggerElement: '#contact', offset: -100).addTo(controller).on('enter', (e) ->
    $('#contact').addClass 'active'
  )




jQuery(document).ready ($) ->
  scrolling = false
  contentSections = $('section')
  verticalNavigation = $('.cd-vertical-nav')
  helloNavigation = $('#hello')
  navigationItems = verticalNavigation.find('a')
  navTrigger = $('.cd-nav-trigger')

  checkScroll = ->
    if !scrolling
      scrolling = true
      if !window.requestAnimationFrame then setTimeout(updateSections, 300) else window.requestAnimationFrame(updateSections)
    return

  updateSections = ->
    halfWindowHeight = $(window).height() / 2
    scrollTop = $(window).scrollTop()
    contentSections.each ->
      section = $(this)
      sectionId = section.attr('id')
      navigationItem = navigationItems.filter('[href^="#' + sectionId + '"]')
      if section.offset().top - halfWindowHeight < scrollTop and section.offset().top + section.height() - halfWindowHeight > scrollTop then navigationItem.addClass('active') else navigationItem.removeClass('active')
    scrolling = false

  smoothScroll = (target) ->
    $('body,html').animate { 'scrollTop': target.offset().top }, 500
    return

  $(window).on 'scroll', checkScroll
  #smooth scroll to the selected section
  helloNavigation.on 'click', 'a', (event) ->
    event.preventDefault()
    smoothScroll $(@hash)
  verticalNavigation.on 'click', 'a', (event) ->
    event.preventDefault()
    smoothScroll $(@hash)
    verticalNavigation.removeClass 'open'

  # open navigation if user clicks the .cd-nav-trigger - small devices only
  navTrigger.on 'click', (event) ->
    event.preventDefault()
    verticalNavigation.toggleClass 'open'
