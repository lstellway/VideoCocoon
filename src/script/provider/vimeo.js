/**
 * VideoCocoon
 * 
 * Vimeo Provider
 * Ref: https://github.com/vimeo/player.js/
 */
window.VideoCocoon = (function(scope)
{
    scope.providers = scope.providers || {};
    scope.providers.vimeo = {
        pattern: {
            0: /vimeo\.com/
        },
        api: 'https://player.vimeo.com/api/player.js',
        events: ['play','pause','ended','timeupdate','progress','seeked','texttrackchange','cuechange','cuepoint','volumechange','playbackratechange','bufferstart','bufferend','error','loaded'],

        /**
         * Get video ID
         * @param {string}
         * @return {string}
         */
        getId: function(uid)
        {
            return scope.url(scope.getSrc(uid)).pathname.split('/')[1] || '';
        },

        /*
         * Get the iFrame source URL
         * @param {string}
         * @return {string}
         */
        getUrl: function(uid)
        {
            return 'https://player.vimeo.com/video/' + this.getId(uid) + '?' + scope.serialize(scope.getPlayer(uid).options.params.query || {});
        },

        /**
         * Bind API to iFrame
         * @param {string}
         * @param {null}
         */
        setPlayer: function(uid, p, v)
        {
            p = scope.getPlayer(uid);
            p.player = new Vimeo.Player(scope.getFrame(uid), p.options.params.api || {});
            v = p.player;
            p.play = v.play.bind(v);
            p.pause = v.pause.bind(v);
            p.stop = v.unload.bind(v);
            p.seek = v.setCurrentTime.bind(v);
            p.toggle = function() {
                return p[p.state == 'playing' ? 'pause' : 'play']();
            };

            p.player.on('play', function() {
                p.state = 'playing';
            });
            p.player.on('pause', function() {
                p.state = 'paused';
            });
            p.player.on('ended', function() {
                p.state = 'ended';
            });

            for (var e in this.events) {
                p.player.on(this.events[e], p.options.events[this.events[e]] || function(){});
            }
        }
    };

    return scope;
}(window.VideoCocoon || {}));
