/**
 * VideoCocoon
 * 
 * YouTube Provider
 * Ref: https://developers.google.com/youtube/iframe_api_reference
 */
window.VideoCocoon = (function(scope)
{
    scope.providers = scope.providers || {};

    /**
     * YouTube iFrame API Callback
     */
    window.onYouTubeIframeAPIReady = function(p) {
        p = scope.providers.youtube;
        p.ready = 1;
        for (var i in p.queue) p.setPlayer(p.queue[i]);
    };

    scope.providers.youtube = {
        ready: 0,
        pattern: {
            0: /youtu(\.be|be\.com)/,
            'be': /youtu\.be/,
            'com': /youtube\.com/
        },
        api: 'https://www.youtube.com/iframe_api',
        events: ['onReady','onStateChange','onPlaybackQualityChange','onPlaybackRateChange','onError','onApiChange'],
        queue: [],

        /**
         * Get video ID
         * @param {String}
         * @return {String}
         */
        getId: function(uid)
        {
            this.id = '';
            switch (true) {
                case this.pattern.be.test(scope.getSrc(uid)):
                    this.id = scope.url(scope.getSrc(uid)).pathname.split('/')[1] || '';
                    break;
                case this.pattern.com.test(scope.getSrc(uid)):
                    for (var u = scope.url(scope.getSrc(uid)).search.split('?'), i = 0; i < u.length; i++) {
                        if (u[i].split('=')[0] === 'v') this.id = u[i].split('=')[1] || '';
                    }
                    break;
            }
            return this.id;
        },

        /**
         * Get the iFrame source URL
         * @param {String}
         * @return {String}
         */
        getUrl: function(uid)
        {
            return 'https://www.youtube.com/embed/' + this.getId(uid) + '?' + scope.serialize(scope.extend({
                enablejsapi: 1
            }, scope.getPlayer(uid).options.params.query || {}));
        },

        /**
         * Bind API to iFrame
         * @param {String}
         * @param {null}
         */
        setPlayer: function(uid, s)
        {
            s = this;
            if (!s.ready) return s.queue.push(uid);

            scope.getPlayer(uid).player = new YT.Player(uid, {
                playerVars: scope.getPlayer(uid).options.params.api || {},
                events: {
                    onReady: function(y, p) {
                        y = y.target || y;
                        p = scope.getPlayer(uid);
                        p.play = y.playVideo.bind(y);
                        p.pause = y.pauseVideo.bind(y);
                        p.stop = y.stopVideo.bind(y);
                        p.seek = y.seekTo.bind(y);
                        p.toggle = function() {
                            return p[p.state == 'playing' ? 'pause' : 'play']();
                        };

                        for (var e in s.events) {
                            p.player.addEventListener(s.events[e], p.options.events[s.events[e]] || function(){});
                        }
                    },
                    onStateChange: function(s) {
                        for (var k in YT.PlayerState) {
                            if (YT.PlayerState[k] == s.data) scope.getPlayer(uid).state = k.toLowerCase();
                        }
                    },
                }
            });
        }
    };

    return scope;
}(window.VideoCocoon || {}));
