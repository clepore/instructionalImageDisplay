/**
*
* Created By: Christopher Lepore
* 11/21/2011
*
* A plugin to dynamically show a series of images with specific positioning
*
* @param options          An optional options object.
* @param options.images   Array of images be positioned and shown (see example)
* @param options.callBack A callback function to be called when the images are finished
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

       functions.preloadImages.call(self);

       data.currentIndex = 0;
       functions.changeObject.call(self);
    },

    changeObject: function() {
      var self = $(this),
        data = self.data('listDisplay');

      if (data.currentIndex == data.options.images.length) {
        // Remove dynamic object and run the callback
        data.dynamic.remove();
        data.options.callBack.call(self);

        // Remove click event
        self.unbind('click');
      } else {
        // Set image position
        data.dynamic.css(data.options.images[data.currentIndex].position);

        // Set the image source to the next url
        data.dynamic.attr('src', data.options.images[data.currentIndex].src);

        // Set the current index
        data.currentIndex++;
      }
    },

    preloadImages: function() {
      var self = $(this),
       data = self.data('listDisplay'),
       tempImage = [];

      $.each(data.options.images, function(i, item) {
        tempImage[i] = new Image();
        tempImage[i].src = item.src;
      });
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
    images: [],
    callBack: function(){ }
  };
})(jQuery);

