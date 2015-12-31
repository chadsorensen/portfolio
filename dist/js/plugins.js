/**
 * uiMorphingButton_inflow.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;( function( window ) {

  'use strict';

  var transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    support = { transitions : Modernizr.csstransitions };

  function extend( a, b ) {
    for( var key in b ) {
      if( b.hasOwnProperty( key ) ) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function UIMorphingButton( el, options ) {
    this.el = el;
    this.options = extend( {}, this.options );
    extend( this.options, options );
    this._init();
  }

  UIMorphingButton.prototype.options = {
    closeEl : '',
    onBeforeOpen : function() { return false; },
    onAfterOpen : function() { return false; },
    onBeforeClose : function() { return false; },
    onAfterClose : function() { return false; }
  }

  UIMorphingButton.prototype._init = function() {
    // save element height
    this.elH = this.el.offsetHeight;
    // the button
    this.button = this.el.querySelector( 'button' );
    // state
    this.expanded = false;
    // content el
    this.contentEl = this.el.querySelector( '.morph-content' );
    // init events
    this._initEvents();
  }

  UIMorphingButton.prototype._initEvents = function() {
    var self = this;
    // open
    this.button.addEventListener( 'click', function() { self.toggle(); } );
    // close
    if( this.options.closeEl !== '' ) {
      var closeEl = this.el.querySelector( this.options.closeEl );
      if( closeEl ) {
        closeEl.addEventListener( 'click', function() { self.toggle(); } );
      }
    }
  }

  UIMorphingButton.prototype.toggle = function() {
    if( this.isAnimating ) return false;

    // callback
    if( this.expanded ) {
      this.options.onBeforeClose();
    }
    else {
      // add class active (solves z-index problem when more than one button is in the page)
      classie.addClass( this.el, 'active' );
      this.options.onBeforeOpen();
    }

    this.isAnimating = true;

    var self = this,
      onEndTransitionFn = function( ev ) {
        if( ev.target !== this ) return false;

        if( support.transitions ) {
          this.removeEventListener( transEndEventName, onEndTransitionFn );
        }
        self.isAnimating = false;

        // callback
        if( self.expanded ) {
          // remove class active (after closing)
          classie.removeClass( self.el, 'active' );
          self.options.onAfterClose();
        }
        else {
          self.options.onAfterOpen();
        }

        self.expanded = !self.expanded;
      };

    if( support.transitions ) {
      this.el.addEventListener( transEndEventName, onEndTransitionFn );
    }
    else {
      onEndTransitionFn();
    }

    // add/remove class "open" to the button wraper
    this.el.style.height = this.expanded ? this.elH + 'px' : this.contentEl.offsetHeight + 'px';

    if( this.expanded ) {
      classie.removeClass( this.el, 'open' );
    }
    else {
      classie.addClass( this.el, 'open' );
    }
  }

  // add to global namespace
  window.UIMorphingButton = UIMorphingButton;

})( window );

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
