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
    Plugin.prototype.descend = function($elem, action, limit, depth) {

        if (!depth) depth = 0;

        var that = this;

        if (typeof action === "function") action($elem, depth);
        var $children = $elem.find(this.options.structure);

        // if there's children, perform the action, then recurse
        if ($children.length > 0) {
            depth++;
            if (depth > that.options.depth || depth > limit) return;
            $children.each(function() {
                that.descend($(this), depth, action, limit);
            });
        } else {
            depth--;
        }
    }

    Plugin.prototype.discover = function() {
        var that = this;
        this.descend(this.$elem, function($elem, depth) {
            if (that.depth < depth) that.depth = depth;
        });
    }

    Plugin.prototype.open = function(limit) {
        var that = this;
        this.descend(this.$elem, function($elem, depth) {
            $elem.children(that.options.closed).click();
        }, limit);
    }

    Plugin.prototype.close = function(limit) {
        var that = this;
        this.descend(this.$elem, function($elem, depth) {
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
