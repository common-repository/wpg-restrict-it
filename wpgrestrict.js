(function() {
    tinymce.create('tinymce.plugins.WPGRestrict', {
        /**
         * Initializes the plugin, this will be executed after the plugin has been created.
         * This call is done before the editor instance has finished it's initialization so use the onInit event
         * of the editor instance to intercept that event.
         *
         * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
        init : function(ed, url) {
            ed.addCommand('wpgrestrict', function() {
                var selected_text = ed.selection.getContent();
                var return_text = '';
                return_text = '[wpgrestrict]' + selected_text + '[/wpgrestrict]';
                ed.execCommand('mceInsertContent', 0, return_text);
            });

            
            ed.addButton('wpgrestrict', {
                title : 'Restrict',
                cmd : 'wpgrestrict',
                image : url + '/restrict.png'
            });

        },

        /**
         * Creates control instances based in the incomming name. This method is normally not
         * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
         * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
         * method can be used to create those.
         *
         * @param {String} n Name of the control to create.
         * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
         * @return {tinymce.ui.Control} New control instance or null if no control was created.
         */
        createControl : function(n, cm) {
            return null;
        },

        /**
         * Returns information about the plugin as a name/value array.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
        getInfo : function() {
            return {
                    longname : 'WPG Restrict - Comments Edition',
                    author : 'Rakesh Raja',
                    authorurl : 'http://wpguru.in',
                    infourl : 'http://wpguru.in',
                    version : "1.0"
            };
        }
    });

    // Register plugin
    tinymce.PluginManager.add('wpgrestrict', tinymce.plugins.WPGRestrict);
})();