/**
 * VideoCocoon
 * 
 * Provider Template
 */
window.VideoCocoon = (function(scope)
{
    scope.providers = scope.providers || {};
    scope.providers.template = {
        pattern: {
            0: /example\.com)/
        },
        api: 'https://www.example.com/player_api',

        /**
         * Get the iFrame source URL
         * @param {String}
         * @return {String}
         */
        getUrl: function(uid)
        {},

        /**
         * Bind API to iFrame
         * @param {String}
         * @param {null}
         */
        setPlayer: function(uid, s)
        {}
    };

    return scope;
}(window.VideoCocoon || {}));
