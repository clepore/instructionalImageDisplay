/**
*
* Created By: Christopher Lepore
* 11/21/2011
*
* A plugin to dynamically show a series of images with specific positioning
*
* @param options            An optional options object.
* @param options.images     Array of objects to be positioned and shown (see example)
*
*
**/

(function($) {
  var methods = {
    init: function(options) {
      options = $.extend({}, $.fn.listDisplay.defaults, options);

      return this.each(function() {
        var self = $(this);

        // Set options to be accesible across functions
        self.data('listDisplay', { 
          options: options ,
          currentIndex: 0
        });
        
        functions.setup.call(self);
      });
    }
  };
      
  var functions = {
    setup: function() {
      var self = $(this),
       data = self.data('listDisplay');
       
       // Create dynamic
       self.append($('<img class="dynamic" src="" />'));
       data.dynamic = self.find('.dynamic');
       data.dynamic.css('position', 'absolute');
       
       // Set click
       self.bind('click', function() {
         functions.changeObject.call(self);
       });
       
       data.currentIndex = 0;
       functions.changeObject.call(self);
    },
  
    changeObject: function() {
      var self = $(this),
       data = self.data('listDisplay');
       
       // Hide conatiner
       if (data.currentIndex == data.options.images.length) {
         data.dynamic.remove();
       } else {
         // Set the attributes of the next image
         data.dynamic.attr('src', data.options.images[data.currentIndex].src);
         data.dynamic.css(data.options.images[data.currentIndex].position);
       
        // Set the current index
        data.currentIndex++;
      }
    }
  };
    
  jQuery.fn.listDisplay = function(method) {
    // Method calling logic
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist');
    }
  };
    
  jQuery.fn.listDisplay.defaults = {
    images: []
  };
})(jQuery);