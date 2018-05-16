/**
 * VideoCocoon
 */
window.VideoCocoon = (function(scope)
{
    scope.players = {};

    /**
     * Parse URL
     * @param  {String}
     * @param  {null}
     * @return {Object}
     */
    scope.url = function(url, a)
    {
        a = document.createElement('a'); a.href = url;
        for (var k = 'origin protocol hostname host pathname port search hash href username password'.split(' '), u = {}, i = 0; i < k.length; i++) {
            u[k[i]] = a[k[i]];
        }
        return u;
    };

    /**
     * @param  {Object} object to be encoded
     * @return {String} encoded query string
     */
    scope.serialize = function(o)
    {
        var s = [], e = encodeURIComponent;
        for (var k in o) {
            if (o.hasOwnProperty(k)) s.push(e(k) + '=' + e(o[k]));
        }
        return s.join("&");
    }

    /**
     * @param {Object} any number of objects can be passed to the function
     * @return {Object}
     */
    scope.extend = function()
    {
        for (var o = {}, i = 0; i < arguments.length; i++) {
            // if (arguments[i].constructor !== Object) continue;
            for (var k in arguments[i]) {
                if (arguments[i].hasOwnProperty(k)) {
                    o[k] = arguments[i][k].constructor === Object ? scope.extend(o[k] || {}, arguments[i][k]) : arguments[i][k];
                }
            }
        }
        return o;
    };

    /**
     * Create attribute
     * @param  {String}
     * @param  {String}
     * @param  {null}
     * @return {Attr}
     */
    scope.attr = function(name, val, a)
    {
        a = document.createAttribute(name);
        if (val) a.value = val;
        return a;
    };

    /**
     * @param  {String} uid
     * @return {String|Boolean}
     */
    scope.getPlayer = function(uid)
    {
        return this.players[uid] || {};
    };

    /**
     * Load Provider API
     * @param  {String}
     * @param  {null} a
     * @param  {null} js
     * @param  {null} t
     * @param  {null} c
     */
    scope.getApi = function(uid, v, p, js, callback)
    {
        v = scope.getPlayer(uid);
        p = scope.providers[v.type];

        if (p.api) {
            callback = function() {
                v.trigger('onApiLoaded');
                p.setPlayer(uid);
            };

            if (typeof define === 'function' && define.amd && p.amd && p.export) {
                require([p.api], function(api) {
                    window[p.export] = api;
                    callback();
                });
            } else {
                if (document.getElementById(v.type + 'VCApi')) return callback();

                js = document.createElement('script');
                js.id = v.type + 'VCApi';
                js.onload = callback;
                js.src = p.api;
                document.getElementsByTagName('script')[0].parentNode.appendChild(js);
            }
        }
    };

    /**
     * @return {String|null} video source url
     */
    scope.getSrc = function(uid)
    {
        if (typeof scope.getPlayer(uid).src === 'undefined') {
            switch (true) {
                case !!scope.getPlayer(uid).options.src:
                    scope.getPlayer(uid).src = scope.getPlayer(uid).options.src.trim();
                    break;
                case scope.getTarget(uid).hasAttribute('data-src'):
                    scope.getPlayer(uid).src = scope.getTarget(uid).getAttribute('data-src').trim();
                    break;
            }
        }
        return scope.getPlayer(uid).src || false;
    };

    /**
     * Get element by selector / Node with default
     * @param  {Node|string}
     * @param  {Node}
     * @return {Node}
     */
    scope.getElement = function(e, d)
    {
        if (e) e = (e instanceof Node && e.nodeType === 1) ? e : document.querySelector(e);
        return e || d;
    }

    /**
     * Get target element
     * @return {Node|boolean}
     */
    scope.getTarget = function(uid)
    {
        return scope.getElement(scope.getPlayer(uid).options.target, document.body);
    };

    /**
     * Build iFrame element
     * @return {Node}
     */
    scope.getFrame = function(uid, f)
    {
        if (typeof scope.getPlayer(uid).frame === 'undefined') {
            f = document.createElement('iframe');
            f.src = scope.providers[scope.getPlayer(uid).type].getUrl(uid) || '';
            f.id = uid;
            f.className = scope.getPlayer(uid).options.class.frame || null;
            f.setAttributeNode(scope.attr('allowfullscreen'));
            f.setAttributeNode(scope.attr('mozallowfullscreen'));
            f.setAttributeNode(scope.attr('webkitallowfullscreen'));
            f.setAttributeNode(scope.attr('oallowfullscreen'));
            f.setAttributeNode(scope.attr('msallowfullscreen'));

            scope.getPlayer(uid).frame = f;
        }

        return scope.getPlayer(uid).frame || false;
    };

    /**
     * Frame video and initialize API
     * @param {String}
     */
    scope.embed = function(uid)
    {
        scope.getTarget(uid).appendChild(scope.getFrame(uid));
        scope.trigger('onFrameEmbed', uid);
        scope.getApi(uid);
    };

    /**
     * Build unique identifier
     * @return {String}
     */
    scope.unique = function()
    {
        return 'vc-' + Math.random().toString(36).substr(2,9);
    };

    /**
     * Trigger function
     * @param {String} name
     * @param {String} uid
     * @param {null}   p
     */
    scope.trigger = function(name, uid, p) {
        p = scope.getPlayer(uid || this.uid);
        p.events = p.events || {};
        for (var i in p.events[name] || []) p.events[name][i].call(p);
    };

    /**
     * Register callback functions
     * @param  {String}   name
     * @param  {Function} callback
     * @param  {String}   uid
     * @return {Object}
     */
    scope.on = function(name, callback, uid, p) {
        p = scope.getPlayer(uid || this.uid);
        p.events[name] = p.events[name] || [];
        p.events[name].push(callback);
        return p;
    };

    /**
     * Create a player instance
     * @param {Object} params
     * @param {null}   uid
     */
    scope.init = function(params, uid)
    {
        uid = scope.unique();
        scope.players[uid] = {
            uid: uid,
            options: scope.extend({
                params: {},
                class: {},
                events: params.events || {}
            }, params),
            trigger: scope.trigger,
            on: scope.on,
            events: {}
        };

        for (var i in scope.getPlayer(uid).options.events) {
            scope.on(i, scope.getPlayer(uid).options.events[i], uid);
        }

        for (var i in scope.providers) {
            if (scope.providers[i].pattern[0].test(scope.getSrc(uid))) {
                scope.getPlayer(uid).type = i;
                scope.embed(uid);
                scope.trigger('onPlayerInitialized');
                return scope.getPlayer(uid);
            }
        }

        return false;
    };

    return scope;
}(window.VideoCocoon || {}));
