;(function($, window, document, undefined) {

    var pluginName = "treeManipulator";
        defaults = {
            depth: Infinity
        };

    function Plugin(element, options) {
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;
        this.$elem = $(element);

        this.init();
    }

    // find depth, build out methods
    Plugin.prototype.init = function() {
        this.depth = 0;
        this.discover();
    }

    // depth-first search of the tree, based on the selector structure
    Plugin.prototype.descend = function(action, limit, $elem, depth) {

        // default parameters
        if (!limit) limit = that.options.depth;
        if (!$elem) $elem = this.$elem;
        if (!depth) depth = 0;

        // invoke the action before traversing
        if (typeof action === "function") action($elem, depth);

        var $children = $elem.find(this.options.structure);

        // if there's children, perform the action, then recurse
        if ($children.length > 0) {
            depth++;
            if (depth > limit) return;
            var that = this;
            $children.each(function() {
                that.descend(action, limit, $(this), depth);
            });
        } else {
            depth--;
        }
    }

    Plugin.prototype.discover = function() {
        this.descend(function($elem, depth) {
            if (that.depth < depth) that.depth = depth;
        });
    }

    Plugin.prototype.open = function(limit) {
        this.descend(function($elem, depth) {
            $elem.children(that.options.closed).click();
        }, limit);
    }

    Plugin.prototype.close = function(limit) {
        this.descend(function($elem, depth) {
            $elem.children(that.options.opened).click();
        }, limit);
    }

    $.fn[pluginName] = function ( options ) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var _name = "plugin_" + pluginName;
            var instance = $.data(this, _name);
            if (!instance) {
                $.data(this, _name, new Plugin( this, options ));
            } else if (options) {
                return instance[options].apply(instance, args);
            }
        });
    };

})(jQuery, window, document);
