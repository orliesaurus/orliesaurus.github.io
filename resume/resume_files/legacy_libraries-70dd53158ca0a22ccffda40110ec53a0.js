(function($){
  'use strict';

  $(document).on('open.ft.dropdown', '.dropdown', function(event){
    var $dropdown = $(this),
        dropdownIdentifier = $dropdown.data('ftDropdown');

    $dropdown.ftTransitionWith({
      dataAttr: 'ftShowClass',
      endEvent: 'opened.ft.dropdown'
    }).then(function(){
      $dropdown.prop('checked', true);
    });

    if(dropdownIdentifier){
      $('[data-ft-dropdown="' + dropdownIdentifier + '"]').each(function(){
        var $element = $(this);
        if(!$element.is($dropdown)){
          $element.trigger('close.ft.dropdown');
        }
      });
    }
  });

  $(document).on('close.ft.dropdown', '.dropdown', function(event){
    $(this).ftTransitionWith({
             dataAttr: 'ftHideClass'
           }).then(function(){
             $(this).find('.dropdown__toggle').prop('checked', false);
             $(this).trigger('closed.ft.dropdown');
           });
  });

  $(document).on('change', '.dropdown > .dropdown__toggle', function(event){
    var $this = $(this);
    if($this.is(':checked')){
      $(this).closest('.dropdown').trigger('open.ft.dropdown');
    } else {
      $(this).closest('.dropdown').trigger('close.ft.dropdown');
    }

  });

})(jQuery);
(function($) {
  'use strict';
  
  $(document).on('close.ft.flashbar', '.flashbar', function(event) {
    $(this).ftTransitionWith({
      dataAttr: 'ftHideClass',
      addClass: 'flashbar--closed',
      endEvent: 'closed.ft.flashbar'
    });
  });

  $(document).on('open.ft.flashbar', '.flashbar', function(event){
    $(this).ftTransitionWith({
      dataAttr: 'ftShowClass',
      removeClass: 'flashbar--closed',
      endEvent: 'opened.ft.flashbar'
    });
  });

  $(document).on('click', '.flashbar__close', function(event){
    $(this).closest('.flashbar').trigger('close.ft.flashbar');
  });

})(jQuery);
(function($) {
  'use strict';

  $(document).on('open.ft.modal', '.modal', function(event) {
    var $this = $(this);

    $.screenLock(true);
    $('.shade').trigger('open.ft.shade');
    $('.container--fixed-top').css({
      paddingRight: $.measureScrollBar()
    });

    $this.ftTransitionWith({
      dataAttr: 'ftShowClass',
      addClass: 'modal--is-active',
      endEvent: 'opened.ft.modal'
    });
  });

  $(document).on('close.ft.modal', '.modal', function(event) {
    var $this = $(this);

    $.screenLock(false);
    $('.shade').trigger('close.ft.shade');
    $('.container--fixed-top').css({
      paddingRight: $.measureScrollBar()
    });

    $this.ftTransitionWith({
      dataAttr: 'ftHideClass',
      removeClass: 'modal--is-active',
      endEvent: 'closed.ft.modal'
    });
  });

  $(document).on('click', '[data-ft-modal]', function(){
    var $target = $.ftGetTarget($(this), 'ftModal');
    $target.trigger('open.ft.modal');
  });

  $(document).on('click', '[data-ft-modal-close]', function(){
    var $target = $.ftGetTarget($(this), 'ftModalClose');
    $target.trigger('close.ft.modal');
  });

  $(document).on('click', '.shade', function(){
    $('.modal--is-active').trigger('close.ft.modal');
  });

})(jQuery);
(function($) {
  'use strict';

  $(document).on('change', '.navigationbar__toggle__helper', function(){
    if($(this).prop('checked')){
      $('.shade').trigger('open.ft.shade');
    } else {
      $('.shade').trigger('close.ft.shade');
    }
  });
})(jQuery);
(function($) {
  'use strict';

  var $document = $(document);

  var setClassName = function() {
    var $this = $(this),
        className = $this.find(':selected').attr('class') || "",
        data = $this.data('ftSelect') || {};
    
    if (className !== data.previousClass) {
      $this
        .addClass(className)
        .removeClass(data.previousClass)
        .data('ftSelect', $.merge({previousClass: className}, data));
    }
  };

  var setupSelectInputs = function(){
    $document
      .find('.select-input')
      .data('ftSelect', {previousClass: ""})
      .each(setClassName);
  };

  $document.on('change.ft.select', 'select:not([multiple])', setClassName);

  $document.on('DOMContentLoaded', function() {
    setupSelectInputs();
  });

  $document.on('setup.ft.select', function(){
    setupSelectInputs();
  });

  setTimeout(setupSelectInputs, 0);

})(jQuery);
(function($) {
  'use strict';

  $(document).on('open.ft.shade', '.shade', function(event) {
    $(this).ftTransitionWith({
      dataAttr: 'ftShowClass',
      addClass: 'shade--is-active',
      endEvent: 'opened.ft.shade'
    });
  });

  $(document).on('close.ft.shade', '.shade', function(event) {
    $(this).ftTransitionWith({
      dataAttr: 'ftHideClass',
      removeClass: 'shade--is-active',
      endEvent: 'closed.ft.shade'
    });
  });

  $(document).on('click', '.shade', function(event) {
    $(this).trigger('close.ft.shade');
  });

  $(document).on('click', '[data-ft-shade]', function(event) {
    $('.shade').trigger('open.ft.shade');
  });

})(jQuery);
(function($){
  'use strict';

  var itemActive = 'tabs-navigation__item--is-active',
      targetActive = 'tabs__target--is-active',
      tabItem = '.tabs-navigation__item[data-ft-tab]';

  var selectTab = function($element){
    var $target = $.ftGetTarget($element, 'ftTab'),
        $siblings, activeClass;

    $element.siblings().each(function(){
      var $this = $(this),
          $otherTarget = $.ftGetTarget($this, 'ftTab');

      $this.ftTransitionWith({
        dataAttr: 'ftHideClass',
        removeClass: itemActive,
        endEvent: 'deselected.ft.tab'
      });

      $otherTarget.ftTransitionWith({
        dataAttr: 'ftHideClass',
        removeClass: targetActive,
        endEvent: 'closed.ft.tabtarget'
      });
    });

    $element.ftTransitionWith({
      dataAttr: 'ftShowClass',
      addClass: itemActive,
      endEvent: 'opened.ft.tab'
    });

    return $target.ftTransitionWith({
      dataAttr: 'ftShowClass',
      addClass: targetActive,
      endEvent: 'opened.ft.tabtarget'
    });
  };

  $(document).on('select.ft.tab', tabItem, function(event){
    selectTab($(this));
  });

  $(document).on('click', tabItem, function(){
    $(this).trigger('select.ft.tab');
  });

})(jQuery);
(function($){
  $.ftGetTarget = function($element, field){
    field = field || 'ft-target';
    
    var targetId = $element.data(field) || '';
    
    if( !targetId.match(/^#/) ){
      targetId = '#' + targetId;
    }
    
    return $(targetId);
  };
})(jQuery);
(function($) {
  'use strict';

  $.measureScrollBar = function() {
    var $body = $('body'),
        element = document.createElement('div'),
        scrollbarWidth = element.offsetWidth - element.clientWidth;
    
    element.setAttribute('style', 
      'position: absolute; ' +
      'top: -9999px; ' + 
      'width: 50px; ' +
      'height: 50px; ' + 
      'overflow: scroll;'
    );
    
    $body.append(element);
    $body.get(0).removeChild(element);
    return scrollbarWidth;
  };
})(jQuery);
(function($) {
  'use strict';

  $.screenLock = function(locking) {
    var $html = $('html'),
        $body = $('body');

    if(typeof(locking) === 'undefined'){
      locking = true;
    }
    
    if (locking) {
      $html.addClass('html--is-locked');
      $body.css({paddingRight: $.measureScrollBar()});
    } else {
      $html.removeClass('html--is-locked');
      $body.css({paddingRight: ''});
    }
  };

})(jQuery);
(function($){
  'use strict';

  $.fn.ftTransitionWith = function(opts){
    opts = opts || {};

    var $this = $(this),
        deferred = $.Deferred(),
        endEvent = opts.endEvent,
        addClass = opts.addClass,
        removeClass = opts.removeClass,
        dataAttr = opts.dataAttr,
        callback = opts.callback,
        existing = $this.data('ftTransitionWith'),
        transitionClass;

    if(existing) {
      existing.reject('Initiated another ftTransitionWith');
    }

    transitionClass = $this.data(dataAttr);

    if(transitionClass){
      $this.addClass(transitionClass + ' ' + addClass)
           .waitForAnimation()
           .then(function(){
             if(deferred.state() !== 'rejected'){
               $this.removeClass(transitionClass);
               if(addClass)    { $this.addClass(addClass); }
               if(removeClass) { $this.removeClass(removeClass); }
               if(endEvent)    { $this.trigger(endEvent); }
               deferred.resolveWith($this);
             }
           });

      deferred.fail(function(){
        $this.removeClass(transitionClass);
      });

    } else {

      // 1ms timeout so we can keep the promise interface
      setTimeout(function(){
        if(deferred.state() !== 'rejected'){
          if(addClass)    { $this.addClass(addClass); }
          if(removeClass) { $this.removeClass(removeClass); }
          if(endEvent)    { $this.trigger(endEvent); }
          deferred.resolveWith($this);
        }
      }, 1);
    }

    $this.data('ftTransitionWith', deferred);
    return deferred.promise();
  };

})(jQuery);
(function($) {
  'use strict';

  // zoom fix on input elements
  $(document).on('focus blur', ':input', function(event) {
    var $viewport = $('meta[name="viewport"]'),
        content = 'width=device-width, initial-scale=1.0';

    if(event.type === 'focusout' ||
       event.type === 'blur'){

      content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0';
    }

    $viewport.attr('content', content);
  });
})(jQuery);
(function($){
  'use strict';

  $.fn.waitForAnimation = function(){
    var deferred = $.Deferred(),
        $this = $(this),
        existing = $this.data('ft-waiting');


    if(existing){
      existing.reject('Added second animation wait.');
    }

    $this.data('ft-waiting', deferred);

    $this.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
      deferred.resolveWith($this);
    });

    $this.one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
      deferred.resolveWith($this);
    });

    return deferred.promise();
  };

})(jQuery);
/*
  NOTE: using this file is NOT preferred!

  If there is an npm package for the library, please install it that way.

  If not:

  To ensure your library is loaded when it's needed,
  please require the library into the file that is using it if you can. eg:

    // in app/assets/javascripts/my_new_component.js:
    `import 'vendor/my-jquery-lib.min.js';`

    // and copy the js lib to:
    // vendor/assets/javascripts/my-jquery-lib.min.js

  (really, the only time you should enter something below is when there's a gem
  and we can't use the plain javascript file)

*/



;
