'use strict';

function createSelectElements() {
  var selectBoxes = Array.prototype.slice.call(document.querySelectorAll('.select__item'));
  selectBoxes.map(function (el) {
    var selectBoxWidth = el.offsetWidth;
    var selectInstance = new Select({
      el: el,
      className: 'select-theme-default'
    });
    setSize(selectBoxWidth);
  });
}

function setSize(selectBoxWidth) {
  var dropDownBoxes = Array.prototype.slice.call(document.querySelectorAll('.select.select-theme-default'));
  dropDownBoxes.map(function (el) {
    el.style.width = selectBoxWidth + 'px';
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  createSelectElements();
});
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

!function t(e, i, n) {
    function s(o, a) {
        if (!i[o]) {
            if (!e[o]) {
                var h = "function" == typeof require && require;
                if (!a && h) return h(o, !0);
                if (r) return r(o, !0);
                var u = new Error("Cannot find module '" + o + "'");
                throw u.code = "MODULE_NOT_FOUND", u;
            }
            var c = i[o] = {
                exports: {}
            };
            e[o][0].call(c.exports, function (t) {
                var i = e[o][1][t];
                return s(i ? i : t);
            }, c, c.exports, t, e, i, n);
        }
        return i[o].exports;
    }
    for (var r = "function" == typeof require && require, o = 0; o < n.length; o++) {
        s(n[o]);
    }return s;
}({
    1: [function (t, e, i) {
        "use strict";

        function n(t) {
            this._ev = new a(), this.options = o({}, this.options, t);
        }
        if (!mapboxgl) throw new Error("include mapboxgl before mapbox-gl-geocoder.js");
        var s = t("suggestions"),
            r = t("lodash.debounce"),
            o = t("xtend"),
            a = t("events").EventEmitter,
            h = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
        n.prototype = mapboxgl.util.inherit(mapboxgl.Control, {
            options: {
                position: "top-left",
                zoom: 16,
                flyTo: !0

            },

            onAdd: function onAdd(t) {
                this.request = new XMLHttpRequest(), this.container = this.options.container ? "string" == typeof this.options.container ? document.getElementById(this.options.container) : this.options.container : t.getContainer();
                var e = document.createElement("div");
                e.className = "mapboxgl-ctrl-geocoder";
                var i = document.createElement("span");
                i.className = "geocoder-icon geocoder-icon-search";
                var n = this._inputEl = document.createElement("input");
                n.type = "text", n.placeholder = this.options.placeholder, n.addEventListener("keydown", r(function (t) {
                    return t.target.value ? void (t.metaKey || [9, 27, 37, 39, 13, 38, 40].indexOf(t.keyCode) !== -1 || this._queryFromInput(t.target.value)) : this._clearEl.classList.remove("active");
                }.bind(this)), 200), n.addEventListener("change", function (e) {
                    e.target.value && this._clearEl.classList.add("active");
                    var i = this._typeahead.selected;
                    if (i) {
                        if (this.options.flyTo) if (i.bbox && i.context && i.context.length <= 3 || i.bbox && !i.context) {
                            var n = i.bbox;
                            t.fitBounds([[n[0], n[1]], [n[2], n[3]]]);
                        } else t.flyTo({
                            center: i.center,
                            zoom: this.options.zoom,
                            speed: 0.5
                        });
                        this._input = i, this.fire("result", {
                            result: i
                        });
                    }
                }.bind(this));
                var o = document.createElement("div");
                o.classList.add("geocoder-pin-right");
                var a = this._clearEl = document.createElement("button");
                a.className = "geocoder-icon geocoder-icon-close", a.addEventListener("click", this._clear.bind(this));
                var h = this._loadingEl = document.createElement("span");
                return h.className = "geocoder-icon geocoder-icon-loading", o.appendChild(a), o.appendChild(h), e.appendChild(i), e.appendChild(n), e.appendChild(o), this.container.appendChild(e), this.options.container && (this.options.position = !1), this._typeahead = new s(n, [], {
                    filter: !1
                }), this._typeahead.getItemValue = function (t) {
                    return t.place_name;
                }, e;
            },
            _geocode: function _geocode(t, e) {
                this._loadingEl.classList.add("active"), this.fire("loading");
                var i = [];
                this.options.proximity && i.push("proximity=" + this.options.proximity.join()), this.options.bbox && i.push("bbox=" + this.options.bbox.join()), this.options.country && i.push("country=" + this.options.country), this.options.types && i.push("types=" + this.options.types);
                var n = this.options.accessToken ? this.options.accessToken : mapboxgl.accessToken;
                i.push("access_token=" + n), this.request.abort(), this.request.open("GET", h + encodeURIComponent(t.trim()) + ".json?" + i.join("&"), !0), this.request.onload = function () {
                    if (this._loadingEl.classList.remove("active"), this.request.status >= 200 && this.request.status < 400) {
                        var t = JSON.parse(this.request.responseText);
                        return t.features.length ? this._clearEl.classList.add("active") : (this._clearEl.classList.remove("active"), this._typeahead.selected = null), this.fire("results", {
                            results: t.features
                        }), this._typeahead.update(t.features), e(t.features);
                    }
                    this.fire("error", {
                        error: JSON.parse(this.request.responseText).message
                    });
                }.bind(this), this.request.onerror = function () {
                    this._loadingEl.classList.remove("active"), this.fire("error", {
                        error: JSON.parse(this.request.responseText).message
                    });
                }.bind(this), this.request.send();
            },
            _queryFromInput: function _queryFromInput(t) {
                t = t.trim(), t || this._clear(), t.length > 2 && this._geocode(t, function (t) {
                    this._results = t;
                }.bind(this));
            },
            _change: function _change() {
                var t = document.createEvent("HTMLEvents");
                t.initEvent("change", !0, !1), this._inputEl.dispatchEvent(t);
            },
            _query: function _query(t) {
                t && ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t.length && (t = [mapboxgl.util.wrap(t[0], -180, 180), mapboxgl.util.wrap(t[1], -180, 180)].join()), this._geocode(t, function (t) {
                    if (t.length) {
                        var e = t[0];
                        this._results = t, this._typeahead.selected = e, this._inputEl.value = e.place_name, this._change();
                    }
                }.bind(this)));
            },
            _setInput: function _setInput(t) {
                t && ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t.length && (t = [mapboxgl.util.wrap(t[0], -180, 180), mapboxgl.util.wrap(t[1], -180, 180)].join()), this._inputEl.value = t, this._input = null, this._typeahead.selected = null, this._typeahead.clear(), this._change());
            },
            _clear: function _clear() {
                this._input = null, this._inputEl.value = "", this._typeahead.selected = null, this._typeahead.clear(), this._change(), this._inputEl.focus(), this._clearEl.classList.remove("active"), this.fire("clear");
            },
            getResult: function getResult() {
                return this._input;
            },
            query: function query(t) {
                return this._query(t), this;
            },
            setInput: function setInput(t) {
                return this._setInput(t), this;
            },
            on: function on(t, e) {
                return this._ev.on(t, e), this;
            },
            fire: function fire(t, e) {
                return this._ev.emit(t, e), this;
            },
            off: function off(t, e) {
                return this._ev.removeListener(t, e), this;
            }
        }), window.mapboxgl ? mapboxgl.Geocoder = n : "undefined" != typeof e && (e.exports = n);
    }, {
        events: 2,
        "lodash.debounce": 4,
        suggestions: 5,
        xtend: 8
    }],
    2: [function (t, e, i) {
        function n() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
        }

        function s(t) {
            return "function" == typeof t;
        }

        function r(t) {
            return "number" == typeof t;
        }

        function o(t) {
            return "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && null !== t;
        }

        function a(t) {
            return void 0 === t;
        }
        e.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function (t) {
            if (!r(t) || t < 0 || isNaN(t)) throw TypeError("n must be a positive number");
            return this._maxListeners = t, this;
        }, n.prototype.emit = function (t) {
            var e, i, n, r, h, u;
            if (this._events || (this._events = {}), "error" === t && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
                if (e = arguments[1], e instanceof Error) throw e;
                var c = new Error('Uncaught, unspecified "error" event. (' + e + ")");
                throw c.context = e, c;
            }
            if (i = this._events[t], a(i)) return !1;
            if (s(i)) switch (arguments.length) {
                case 1:
                    i.call(this);
                    break;
                case 2:
                    i.call(this, arguments[1]);
                    break;
                case 3:
                    i.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    r = Array.prototype.slice.call(arguments, 1), i.apply(this, r);
            } else if (o(i)) for (r = Array.prototype.slice.call(arguments, 1), u = i.slice(), n = u.length, h = 0; h < n; h++) {
                u[h].apply(this, r);
            }return !0;
        }, n.prototype.addListener = function (t, e) {
            var i;
            if (!s(e)) throw TypeError("listener must be a function");
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, s(e.listener) ? e.listener : e), this._events[t] ? o(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, o(this._events[t]) && !this._events[t].warned && (i = a(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners, i && i > 0 && this._events[t].length > i && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace())), this;
        }, n.prototype.on = n.prototype.addListener, n.prototype.once = function (t, e) {
            function i() {
                this.removeListener(t, i), n || (n = !0, e.apply(this, arguments));
            }
            if (!s(e)) throw TypeError("listener must be a function");
            var n = !1;
            return i.listener = e, this.on(t, i), this;
        }, n.prototype.removeListener = function (t, e) {
            var i, n, r, a;
            if (!s(e)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[t]) return this;
            if (i = this._events[t], r = i.length, n = -1, i === e || s(i.listener) && i.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);else if (o(i)) {
                for (a = r; a-- > 0;) {
                    if (i[a] === e || i[a].listener && i[a].listener === e) {
                        n = a;
                        break;
                    }
                }if (n < 0) return this;
                1 === i.length ? (i.length = 0, delete this._events[t]) : i.splice(n, 1), this._events.removeListener && this.emit("removeListener", t, e);
            }
            return this;
        }, n.prototype.removeAllListeners = function (t) {
            var e, i;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
            if (0 === arguments.length) {
                for (e in this._events) {
                    "removeListener" !== e && this.removeAllListeners(e);
                }return this.removeAllListeners("removeListener"), this._events = {}, this;
            }
            if (i = this._events[t], s(i)) this.removeListener(t, i);else if (i) for (; i.length;) {
                this.removeListener(t, i[i.length - 1]);
            }return delete this._events[t], this;
        }, n.prototype.listeners = function (t) {
            var e;
            return e = this._events && this._events[t] ? s(this._events[t]) ? [this._events[t]] : this._events[t].slice() : [];
        }, n.prototype.listenerCount = function (t) {
            if (this._events) {
                var e = this._events[t];
                if (s(e)) return 1;
                if (e) return e.length;
            }
            return 0;
        }, n.listenerCount = function (t, e) {
            return t.listenerCount(e);
        };
    }, {}],
    3: [function (t, e, i) {
        !function () {
            var t = this,
                n = {};
            "undefined" != typeof i ? e.exports = n : t.fuzzy = n, n.simpleFilter = function (t, e) {
                return e.filter(function (e) {
                    return n.test(t, e);
                });
            }, n.test = function (t, e) {
                return null !== n.match(t, e);
            }, n.match = function (t, e, i) {
                i = i || {};
                var n,
                    s = 0,
                    r = [],
                    o = e.length,
                    a = 0,
                    h = 0,
                    u = i.pre || "",
                    c = i.post || "",
                    l = i.caseSensitive && e || e.toLowerCase();
                t = i.caseSensitive && t || t.toLowerCase();
                for (var p = 0; p < o; p++) {
                    n = e[p], l[p] === t[s] ? (n = u + n + c, s += 1, h += 1 + h) : h = 0, a += h, r[r.length] = n;
                }return s === t.length ? {
                    rendered: r.join(""),
                    score: a
                } : null;
            }, n.filter = function (t, e, i) {
                return i = i || {}, e.reduce(function (e, s, r, o) {
                    var a = s;
                    i.extract && (a = i.extract(s));
                    var h = n.match(t, a, i);
                    return null != h && (e[e.length] = {
                        string: h.rendered,
                        score: h.score,
                        index: r,
                        original: s
                    }), e;
                }, []).sort(function (t, e) {
                    var i = e.score - t.score;
                    return i ? i : t.index - e.index;
                });
            };
        }();
    }, {}],
    4: [function (t, e, i) {
        function n(t, e, i) {
            function n(e) {
                var i = v,
                    n = m;
                return v = m = void 0, L = e, g = t.apply(n, i);
            }

            function s(t) {
                return L = t, _ = setTimeout(c, e), T ? n(t) : g;
            }

            function o(t) {
                var i = t - b,
                    n = t - L,
                    s = e - i;
                return q ? E(s, y - n) : s;
            }

            function a(t) {
                var i = t - b,
                    n = t - L;
                return !b || i >= e || i < 0 || q && n >= y;
            }

            function c() {
                var t = w();
                return a(t) ? l(t) : void (_ = setTimeout(c, o(t)));
            }

            function l(t) {
                return clearTimeout(_), _ = void 0, C && v ? n(t) : (v = m = void 0, g);
            }

            function p() {
                void 0 !== _ && clearTimeout(_), b = L = 0, v = m = _ = void 0;
            }

            function d() {
                return void 0 === _ ? g : l(w());
            }

            function f() {
                var t = w(),
                    i = a(t);
                if (v = arguments, m = this, b = t, i) {
                    if (void 0 === _) return s(b);
                    if (q) return clearTimeout(_), _ = setTimeout(c, e), n(b);
                }
                return void 0 === _ && (_ = setTimeout(c, e)), g;
            }
            var v,
                m,
                y,
                g,
                _,
                b = 0,
                L = 0,
                T = !1,
                q = !1,
                C = !0;
            if ("function" != typeof t) throw new TypeError(u);
            return e = h(e) || 0, r(i) && (T = !!i.leading, q = "maxWait" in i, y = q ? x(h(i.maxWait) || 0, e) : y, C = "trailing" in i ? !!i.trailing : C), f.cancel = p, f.flush = d, f;
        }

        function s(t) {
            var e = r(t) ? b.call(t) : "";
            return e == l || e == p;
        }

        function r(t) {
            var e = typeof t === "undefined" ? "undefined" : _typeof(t);
            return !!t && ("object" == e || "function" == e);
        }

        function o(t) {
            return !!t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t));
        }

        function a(t) {
            return "symbol" == (typeof t === "undefined" ? "undefined" : _typeof(t)) || o(t) && b.call(t) == d;
        }

        function h(t) {
            if ("number" == typeof t) return t;
            if (a(t)) return c;
            if (r(t)) {
                var e = s(t.valueOf) ? t.valueOf() : t;
                t = r(e) ? e + "" : e;
            }
            if ("string" != typeof t) return 0 === t ? t : +t;
            t = t.replace(f, "");
            var i = m.test(t);
            return i || y.test(t) ? g(t.slice(2), i ? 2 : 8) : v.test(t) ? c : +t;
        }
        var u = "Expected a function",
            c = NaN,
            l = "[object Function]",
            p = "[object GeneratorFunction]",
            d = "[object Symbol]",
            f = /^\s+|\s+$/g,
            v = /^[-+]0x[0-9a-f]+$/i,
            m = /^0b[01]+$/i,
            y = /^0o[0-7]+$/i,
            g = parseInt,
            _ = Object.prototype,
            b = _.toString,
            x = Math.max,
            E = Math.min,
            w = Date.now;
        e.exports = n;
    }, {}],
    5: [function (t, e, i) {
        "use strict";

        var n = t("./src/suggestions");
        window.Suggestions = e.exports = n;
    }, {
        "./src/suggestions": 7
    }],
    6: [function (t, e, i) {
        "Use strict";

        var n = function n(t) {
            return this.component = t, this.items = [], this.active = 0, this.element = document.createElement("ul"), this.element.className = "suggestions", t.el.parentNode.insertBefore(this.element, t.el.nextSibling), this;
        };
        n.prototype.show = function () {
            this.element.style.display = "block";
        }, n.prototype.hide = function () {
            this.element.style.display = "none";
        }, n.prototype.add = function (t) {
            this.items.push(t);
        }, n.prototype.clear = function () {
            this.items = [], this.active = 0;
        }, n.prototype.isEmpty = function () {
            return !this.items.length;
        }, n.prototype.draw = function () {
            if (this.element.innerHTML = "", 0 === this.items.length) return void this.hide();
            for (var t = 0; t < this.items.length; t++) {
                this.drawItem(this.items[t], this.active === t);
            }this.show();
        }, n.prototype.drawItem = function (t, e) {
            var i = document.createElement("li"),
                n = document.createElement("a");
            e && (i.className += " active"), n.innerHTML = t.string, i.appendChild(n), this.element.appendChild(i), i.addEventListener("mousedown", function () {
                this.handleMouseDown.call(this, t);
            }.bind(this));
        }, n.prototype.handleMouseDown = function (t) {
            this.component.value(t.original), this.clear(), this.draw();
        }, n.prototype.move = function (t) {
            this.active = t, this.draw();
        }, n.prototype.previous = function () {
            this.move(0 === this.active ? this.items.length - 1 : this.active - 1);
        }, n.prototype.next = function () {
            this.move(this.active === this.items.length - 1 ? 0 : this.active + 1);
        }, e.exports = n;
    }, {}],
    7: [function (t, e, i) {
        "use strict";

        var n = t("xtend"),
            s = t("fuzzy"),
            r = t("./list"),
            o = function o(t, e, i) {
            return i = i || {}, this.options = n({
                minLength: 2,
                limit: 5,
                filter: !0
            }, i), this.el = t, this.data = e || [], this.list = new r(this), this.query = "", this.selected = null, this.list.draw(), this.el.addEventListener("keyup", function (t) {
                this.handleKeyUp(t.keyCode);
            }.bind(this), !1), this.el.addEventListener("keydown", function (t) {
                this.handleKeyDown(t);
            }.bind(this)), this.el.addEventListener("focus", function () {
                this.handleFocus();
            }.bind(this)), this.el.addEventListener("blur", function () {
                this.handleBlur();
            }.bind(this)), this;
        };
        o.prototype.handleKeyUp = function (t) {
            if (40 !== t && 38 !== t && 27 !== t && 13 !== t && 9 !== t) return this.query = this.normalize(this.el.value), this.list.clear(), this.query.length < this.options.minLength ? void this.list.draw() : void this.getCandidates(function (t) {
                for (var e = 0; e < t.length && (this.list.add(t[e]), e !== this.options.limit - 1); e++) {}
                this.list.draw();
            }.bind(this));
        }, o.prototype.handleKeyDown = function (t) {
            switch (t.keyCode) {
                case 13:
                case 9:
                    this.list.isEmpty() || (this.value(this.list.items[this.list.active].original), this.list.hide());
                    break;
                case 27:
                    this.list.isEmpty() || this.list.hide();
                    break;
                case 38:
                    this.list.previous();
                    break;
                case 40:
                    this.list.next();
            }
        }, o.prototype.handleBlur = function () {
            this.list.hide();
        }, o.prototype.handleFocus = function () {
            this.list.isEmpty() || this.list.show();
        }, o.prototype.update = function (t) {
            this.data = t, this.list.draw();
        }, o.prototype.clear = function () {
            this.data = [], this.list.clear();
        }, o.prototype.normalize = function (t) {
            return t = t.toLowerCase();
        }, o.prototype.match = function (t, e) {
            return t.indexOf(e) > -1;
        }, o.prototype.value = function (t) {
            if (this.selected = t, this.el.value = this.getItemValue(t), document.createEvent) {
                var e = document.createEvent("HTMLEvents");
                e.initEvent("change", !0, !1), this.el.dispatchEvent(e);
            } else this.el.fireEvent("onchange");
        }, o.prototype.getCandidates = function (t) {
            var e = {
                pre: "<strong>",
                post: "</strong>",
                extract: function (t) {
                    return this.getItemValue(t);
                }.bind(this)
            },
                i = this.options.filter ? s.filter(this.query, this.data, e) : this.data.map(function (t) {
                return {
                    original: t,
                    string: this.getItemValue(t).replace(new RegExp("(" + this.query + ")", "ig"), function (t, e) {
                        return "<strong>" + e + "</strong>";
                    })
                };
            }.bind(this));
            t(i);
        }, o.prototype.getItemValue = function (t) {
            return t;
        }, e.exports = o;
    }, {
        "./list": 6,
        fuzzy: 3,
        xtend: 8
    }],
    8: [function (t, e, i) {
        function n() {
            for (var t = {}, e = 0; e < arguments.length; e++) {
                var i = arguments[e];
                for (var n in i) {
                    s.call(i, n) && (t[n] = i[n]);
                }
            }
            return t;
        }
        e.exports = n;
        var s = Object.prototype.hasOwnProperty;
    }, {}]
}, {}, [1]);
'use strict';

var language = {
    en: {
        title: 'Points of sale',
        body: 'Find a Secrid retail location near you. Navigate on the map or type in a search term to start.',
        placeholder: 'Address, Town/City, Country',
        route: 'Directions',
        phone: 'Phone Number',
        results: 'Show results in list',
        hide: 'Hide list'
    }
};
"use strict";

(function () {
  var languages = {
    "en": {
      "title": "Points of sale",
      "body": "Find a Secrid retail location near you. Navigate on the map or type in a search term to start.",
      "placeholder": "Address, Town/City, Country",
      "website": "Website",
      "route": "Directions",
      "phone": "Phone Number",
      "results": "Show results in list",
      "hide": "Hide list",
      "call": "call"
    },
    "nl": {
      "title": "Verkooppunten",
      "body": "Vind één van onze retail locaties bij u in de buurt. Navigeer op de kaart of type een zoekterm om te starten.",
      "placeholder": "Adres, plaats, land",
      "website": "Website",
      "route": "Route",
      "phone": "Telefoon",
      "results": "Toon resultaten in lijst",
      "hide": "Hide list",
      "call": "Bellen"
    },
    "it": {
      "title": "Punti di vendita",
      "body": "Trova un rivenditore locale Secrid vicino a te. Cerca sulla mappa o digita uno dei termini chiave per iniziare.",
      "placeholder": "Indirizzo, Città, Paese",
      "website": "Sito Web",
      "route": "Direzioni",
      "phone": "Numero di telefono",
      "results": "Mostra risultati in una lista",
      "hide": "Nascondi risultati",
      "call": "Bellen"
    },
    "de": {
      "title": "Verkaufsstellen",
      "body": "Finden Sie eine Secrid Verkaufsstelle in Ihrer Nähe. Benutzen Sie die Karte oder typen Sie im Suchfenster.",
      "placeholder": "Adresse, Ort, Land",
      "website": "Webseite",
      "route": "Anfahrt",
      "phone": "Telefonnummer",
      "results": "Ergebnisse in einer Liste zeigen",
      "hide": "Ergebnisse verbergen",
      "call": "Bellen"
    },
    "zhs": {
      "title": "销售点",
      "body": "找出离你最近的 Secrid （塞卡瑞迪）零售点。浏览地图或输入搜索字词。",
      "placeholder": "地址",
      "website": "网站",
      "route": "导航说明",
      "phone": "电话号码",
      "results": "以列表形式显示结果",
      "hide": "隐藏结果",
      "call": "Bellen"
    },
    "zh": {
      "title": "銷售點",
      "body": "找出離你最近的 Secrid （塞卡瑞迪）零售點。瀏覽地圖或輸入搜索字詞。",
      "placeholder": "地址",
      "website": "網站",
      "route": "導航說明",
      "phone": "電話號碼",
      "results": "以列表形式顯示結果",
      "hide": "隱藏結果",
      "call": "Bellen"
    },
    "fi": {
      "title": "Myyntipisteet",
      "body": "Etsi lähelläsi olevia Secridin jälleenmyyntipisteitä. Navigoi kartalla tai kirjoita hakusana.",
      "placeholder": "Osoite",
      "website": "Nettisivu",
      "route": "Reittiohjeet",
      "phone": "Puhelinnumero",
      "results": "Näytä tulokset listalla",
      "hide": "Piilota lista",
      "call": "Bellen"
    },
    "pt": {
      "title": "Localizador de lojas",
      "body": "Encontre um representante da Secrid perto de você. Navegue no mapa ou digite uma palavra de busca para começar.",
      "placeholder": "Endereço",
      "website": "Site",
      "route": "Como chegar",
      "phone": "Telefone",
      "results": "Mostrar resultados na lista",
      "hide": "Ocultar lista",
      "call": "Bellen"
    },
    "tr": {
      "title": "Satış noktaları",
      "body": "Burada yakınınızdaki bayilerimizden birini bulabilirsiniz. Başlamak için haritada yeri işaretleyiniz veya bir arama terimi yazınız.",
      "placeholder": "Adres",
      "website": "İnternet sitesi",
      "route": "Güzergah",
      "phone": "Arama",
      "results": "Sonuçları listede göster",
      "hide": "Listeyi gizle",
      "call": "Bellen"
    },
    "es": {
      "title": "Puntos de venta",
      "body": "Encuentre aquí una de nuestras localizaciones con comercio minorista en la zona. Navegue por el mapa o teclee un término de búsqueda para comenzar.",
      "placeholder": "Dirección",
      "website": "Sitio web",
      "route": "Ruta",
      "phone": "Contacto",
      "results": "Mostrar lista de resultados",
      "hide": "Ocultar lista",
      "call": "Bellen"
    },
    "da": {
      "title": "Salgssteder",
      "body": "Find et af vores detailhandelssteder i dit nærområde. Navigér på kortet eller indtast et søgeord for at starte.",
      "placeholder": "Adresse",
      "website": "Hjemmeside",
      "route": "Rute",
      "phone": "Ringe",
      "results": "Vis resultater på liste",
      "hide": "Skjul liste",
      "call": "Bellen"
    },
    "no": {
      "title": "Salgssteder",
      "body": "Finn en av våre utsalgssteder i nærheten. Naviger på kartet eller skriv inn et søkeord for å starte",
      "placeholder": "Adresse",
      "website": "Website",
      "route": "Rute",
      "phone": "Ringe",
      "results": "Vis resultatene i listen",
      "hide": "Skjul listen",
      "call": "Bellen"
    },
    "sv": {
      "title": "Försäljningspunkter",
      "body": "Hitta här en av våra återförsäljningsplatser i närheten av dig. Navigera på kartan och skriv in ett sökord för att starta.",
      "placeholder": "Adress",
      "website": "Website",
      "route": "Rutt",
      "phone": "Ringa",
      "results": "Visa resultaten i listan",
      "hide": "Göm listan",
      "call": "Bellen"
    },
    "pl": {
      "title": "Punkty sprzedaży",
      "body": "Tutaj znajdziesz jeden z naszych punktów detalicznych w Twojej okolicy. Znajdź na mapie albo wpisz szukaną frazę, aby zacząć wyszukiwanie.",
      "placeholder": "Adres",
      "website": "Witryna internetowa",
      "route": "Trasa",
      "phone": "Kontakt telefoniczny",
      "results": "Pokaż wyniki w postaci listy",
      "hide": "Ukryj",
      "call": "Bellen"
    }
  };

  var currentLanguage = languages.nl;

  document.getElementById('languagedrop').addEventListener("change", function () {

    var currentOption = this.options[this.selectedIndex].value;
    var selectedLang = this.options[this.selectedIndex].value;
    currentLanguage = languages[selectedLang];

    loadLanguage();

    return;
  });

  function loadLanguage() {
    document.querySelector('.storelocator__sidebar__header h1').innerHTML = "" + currentLanguage.title;
    document.querySelector('.storelocator__sidebar__header p').innerHTML = "" + currentLanguage.body;
    document.querySelector('.mapboxgl-ctrl-geocoder input').placeholder = "" + currentLanguage.placeholder;
    document.querySelector('.mobile__results').innerHTML = currentLanguage.results + " <span class=\"down__icon\"></span>";
  }

  mapboxgl.accessToken = 'pk.eyJ1IjoibGV4aXMiLCJhIjoiUXA2MVFYSSJ9.2LIrKSEKKZtCJKxe81xf_g';
  var flyToSpeed = 0.8;
  var ListActive = false;
  var bounds = [[-180, 82], [180, -82]];

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lexis/ciqm41fi50009cfkvx7oyl7vt',
    center: [5.3770023, 52.1626588],
    zoom: 6,
    minZoom: 2.5,
    pitch: 25
  });

  var sidebar = document.querySelector('#geocoder__container');
  var sideBarList = document.querySelector('.storelocator__sidebar__list');

  var geocoder = new mapboxgl.Geocoder({
    flyTo: true,
    zoom: 16,
    container: sidebar,
    placeholder: "" + currentLanguage.placeholder
  });

  map.addControl(geocoder);
  document.querySelector('.mobile__results').addEventListener('click', showMobileResults);

  map.on('load', function () {
    map.addSource("stores", {
      type: "geojson",
      data: "https://sharksoftware.nl/boomi_json/ALL.json",
      cluster: true,
      clusterMaxZoom: 12, // Max zoom to cluster points on
      clusterRadius: 95 // Radius of each cluster when clustering points (defaults to 50)
    });

    // Use the stores source to create five layers:
    // One for unclustered points, three for each cluster category,
    // and one for cluster labels.
    map.addLayer({
      "id": "markers",
      "type": "symbol",
      "source": "stores",
      "layout": {
        "icon-image": "marker-15",
        "icon-size": 1
      }
    });

    // Display the earthquake data in three layers, each filtered to a range of
    // count values. Each range gets a different fill color.
    var layers = [[150, 'rgba(0, 0, 0, 0.8)', 36], [20, 'rgba(0, 0, 0, 0.7)', 26], [0, 'rgba(0, 0, 0, 0.6)', 16]];

    layers.forEach(function (layer, i) {
      map.addLayer({
        "id": "cluster-" + i,
        "type": "circle",
        "source": "stores",
        "paint": {
          "circle-color": layer[1],
          "circle-radius": layer[2]
        },
        "filter": i === 0 ? [">=", "point_count", layer[0]] : ["all", [">=", "point_count", layer[0]], ["<", "point_count", layers[i - 1][0]]]
      });
    });

    // Add a layer for the clusters' count labels
    map.addLayer({
      "id": "cluster-count",
      "type": "symbol",
      "source": "stores",
      "paint": {
        "text-color": "white"
      },
      "layout": {
        "text-field": "{point_count}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 15
      }
    });

    // When a click event occurs near a place, open a popup at the location of
    // the feature, with description HTML from its properties.
    map.on('click', function (e) {
      popUpAction(e.point);
    });

    function popUpAction(point) {
      var features = map.queryRenderedFeatures(point, { layers: ['markers'] });

      if (!features.length) {
        return;
      }
      var feature = features[0];
      managePopUp(feature);
    }

    map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['markers'], radius: 1000 });
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    });

    map.on('click', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['cluster-count'] });
      if (features.length) {
        map.flyTo({
          center: features[0].geometry.coordinates,
          zoom: map.getZoom() + 3,
          speed: flyToSpeed
        });
      }
      map.fire('flystart');
    });
  });

  function makeListItem(feature) {
    var listItem = document.createElement('li'),
        listItemTitle = document.createElement('h2'),
        listItemTelephone = document.createElement('p'),
        listItemAddress = document.createElement('p'),
        routeLink = document.createElement('a'),
        websiteLink = document.createElement('a');

    routeLink.href = 'https://maps.google.com?saddr=Current+Location&daddr=' + feature.geometry.coordinates[1] + ',' + feature.geometry.coordinates[0] + '';
    routeLink.classList.add('route__link');
    routeLink.setAttribute('target', '_blank');
    routeLink.innerHTML = "<span class=\"route__icon\"></span> " + currentLanguage.route;

    websiteLink.href = feature.properties.website;
    websiteLink.classList.add('website__link');
    websiteLink.setAttribute('target', '_blank');
    websiteLink.innerHTML = "<span class=\"website__icon\"></span> " + currentLanguage.website;

    listItemAddress.textContent = feature.properties.address;
    listItemTelephone.textContent = 'Tel: ' + feature.properties.phone;
    listItemTitle.textContent = feature.properties.name;
    listItem.appendChild(listItemTitle);
    listItem.appendChild(listItemAddress);

    if (feature.properties.phone) {
      listItem.appendChild(listItemTelephone);
    }
    listItem.appendChild(websiteLink);
    listItem.appendChild(routeLink);
    listItem.addEventListener("click", function (e) {
      managePopUp(feature);
      showMobileResults();
    });
    sideBarList.insertBefore(listItem, sideBarList.firstChild);
  }

  var currentPops = [];

  function managePopUp(feature) {

    currentPops.forEach(function (popup) {
      popup._closeButton.click();
    });

    currentPops = [];

    var popup = new mapboxgl.Popup();
    popup.setLngLat(feature.geometry.coordinates);

    popup.setHTML("<div class=\"pop__flex\">\n        <div class=\"main__pop\">\n        <h2>" + feature.properties.name + "</h2>\n        <p>" + feature.properties.address + "</p>\n        " + (feature.properties.phone ? "<p>" + feature.properties.phone + "</p>" : '') + "\n      </div>\n      <div class=\"pop__links\">\n      " + (feature.properties.website ? "<a class=\"websiteBtn\" href=\"" + feature.properties.website + "\"><div><span class=\"website__icon\"></span><span>" + currentLanguage.website + "</span></div></a>" : '') + "\n      " + (feature.properties.phone ? "<a class=\"callBtn\" href=\"tel:" + feature.properties.phone + "\"><div><span class=\"bellen__icon\"></span><span>" + currentLanguage.call + "</span></div></a>" : '') + "\n      <a href=\"https://maps.google.com?saddr=Current+Location&daddr=" + feature.geometry.coordinates[1] + "," + feature.geometry.coordinates[0] + "\"><div><span class=\"route__icon\"></span><span>" + currentLanguage.route + "</span></div></a>\n      </div>");

    if (window.innerWidth < 1024) {
      map.flyTo({ center: feature.geometry.coordinates });
    }

    currentPops.push(popup);
    popup.addTo(map);
  }

  // var AllFeatures = [];

  function getCurrentInView() {
    sideBarList.innerHTML = "";

    var clientRect = document.getElementById('map').getBoundingClientRect();

    var canvas = map.getCanvasContainer();
    var rect = canvas.getBoundingClientRect();
    var bounds = map.getBounds();
    var box = [{ x: 0, y: 0 }, { x: rect.width, y: clientRect.bottom }];

    var features = map.queryRenderedFeatures(box, { layers: ['markers'] });

    var uniqueNames = uniqueByPropertiesName(features);
    console.log('filtered features', uniqueNames);

    function uniqueByPropertiesName() {
      var array = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];


      var nameMap = {};

      return array.filter(findInMap);

      function findInMap() {
        var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var value = object['properties']['name'];
        var notUnique = nameMap[value];
        if (notUnique) return false;else {
          nameMap[value] = true;
          return true;
        }
      }
    }

    uniqueNames.map(function (feature) {
      makeListItem(feature);
    });
  }

  map.on('moveend', function () {
    map.fire('flyend');
  });

  map.on('flyend', function () {
    getCurrentInView();
  });

  map.on('flystart', function () {});

  map.on('zoomed', function () {
    getCurrentInView();
  });

  map.on('load', function () {
    setTimeout(getCurrentInView, 400);
  });

  map.addControl(new mapboxgl.Navigation({ position: 'top-left' }));

  function calculateSidebarPosition() {
    var headerHeight = document.querySelector('.storelocator__sidebar__header').offsetHeight;
    var sideBarList = document.querySelector('.storelocator__sidebar__list');
    var mapHeight = document.getElementById('map').offsetHeight;
    sideBarList.style.height = mapHeight - (headerHeight + 20) + 'px';
  }

  function showMobileResults() {
    if (!ListActive) {
      document.querySelector('.storelocator__sidebar__list').classList.add('active');
      document.querySelector('.mobile__results').innerHTML = currentLanguage.hide + " <span class='down__icon active'></span>";
      // document.getElementById('map').style.transform = 'translate(0,' + queryElementHeight('.storelocator__sidebar') + 'px)';

      document.body.style.overflow = "hidden";
      ListActive = true;
    } else if (ListActive) {
      document.querySelector('.storelocator__sidebar__list').classList.remove('active');
      document.querySelector('.mobile__results').innerHTML = currentLanguage.results + " <span class='down__icon'></span>";
      // document.getElementById('map').style.transform = 'translate(0,' + queryElementHeight('.storelocator__sidebar') + 'px)';
      document.body.style.overflow = "auto";
      ListActive = false;
    }
  }
})();

function queryElementHeight(e) {
  var x = document.querySelector(e).offsetHeight;
  return x;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  alert("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
}

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}