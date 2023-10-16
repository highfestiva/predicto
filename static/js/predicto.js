!function() {
    var e = {
        892: function(e) {
            e.exports = function() {
                "use strict";
                var e = 1e3
                  , t = 6e4
                  , n = 36e5
                  , r = "millisecond"
                  , a = "second"
                  , o = "minute"
                  , i = "hour"
                  , l = "day"
                  , s = "week"
                  , u = "month"
                  , c = "quarter"
                  , d = "year"
                  , f = "date"
                  , p = "Invalid Date"
                  , h = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
                  , g = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
                  , m = {
                    name: "en",
                    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
                }
                  , v = function(e, t, n) {
                    var r = String(e);
                    return !r || r.length >= t ? e : "" + Array(t + 1 - r.length).join(n) + e
                }
                  , y = {
                    s: v,
                    z: function(e) {
                        var t = -e.utcOffset()
                          , n = Math.abs(t)
                          , r = Math.floor(n / 60)
                          , a = n % 60;
                        return (t <= 0 ? "+" : "-") + v(r, 2, "0") + ":" + v(a, 2, "0")
                    },
                    m: function e(t, n) {
                        if (t.date() < n.date())
                            return -e(n, t);
                        var r = 12 * (n.year() - t.year()) + (n.month() - t.month())
                          , a = t.clone().add(r, u)
                          , o = n - a < 0
                          , i = t.clone().add(r + (o ? -1 : 1), u);
                        return +(-(r + (n - a) / (o ? a - i : i - a)) || 0)
                    },
                    a: function(e) {
                        return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
                    },
                    p: function(e) {
                        return {
                            M: u,
                            y: d,
                            w: s,
                            d: l,
                            D: f,
                            h: i,
                            m: o,
                            s: a,
                            ms: r,
                            Q: c
                        }[e] || String(e || "").toLowerCase().replace(/s$/, "")
                    },
                    u: function(e) {
                        return void 0 === e
                    }
                }
                  , b = "en"
                  , w = {};
                w[b] = m;
                var x = function(e) {
                    return e instanceof S
                }
                  , k = function(e, t, n) {
                    var r;
                    if (!e)
                        return b;
                    if ("string" == typeof e)
                        w[e] && (r = e),
                        t && (w[e] = t,
                        r = e);
                    else {
                        var a = e.name;
                        w[a] = e,
                        r = a
                    }
                    return !n && r && (b = r),
                    r || !n && b
                }
                  , _ = function(e, t) {
                    if (x(e))
                        return e.clone();
                    var n = "object" == typeof t ? t : {};
                    return n.date = e,
                    n.args = arguments,
                    new S(n)
                }
                  , C = y;
                C.l = k,
                C.i = x,
                C.w = function(e, t) {
                    return _(e, {
                        locale: t.$L,
                        utc: t.$u,
                        x: t.$x,
                        $offset: t.$offset
                    })
                }
                ;
                var S = function() {
                    function m(e) {
                        this.$L = k(e.locale, null, !0),
                        this.parse(e)
                    }
                    var v = m.prototype;
                    return v.parse = function(e) {
                        this.$d = function(e) {
                            var t = e.date
                              , n = e.utc;
                            if (null === t)
                                return new Date(NaN);
                            if (C.u(t))
                                return new Date;
                            if (t instanceof Date)
                                return new Date(t);
                            if ("string" == typeof t && !/Z$/i.test(t)) {
                                var r = t.match(h);
                                if (r) {
                                    var a = r[2] - 1 || 0
                                      , o = (r[7] || "0").substring(0, 3);
                                    return n ? new Date(Date.UTC(r[1], a, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, o)) : new Date(r[1],a,r[3] || 1,r[4] || 0,r[5] || 0,r[6] || 0,o)
                                }
                            }
                            return new Date(t)
                        }(e),
                        this.$x = e.x || {},
                        this.init()
                    }
                    ,
                    v.init = function() {
                        var e = this.$d;
                        this.$y = e.getFullYear(),
                        this.$M = e.getMonth(),
                        this.$D = e.getDate(),
                        this.$W = e.getDay(),
                        this.$H = e.getHours(),
                        this.$m = e.getMinutes(),
                        this.$s = e.getSeconds(),
                        this.$ms = e.getMilliseconds()
                    }
                    ,
                    v.$utils = function() {
                        return C
                    }
                    ,
                    v.isValid = function() {
                        return !(this.$d.toString() === p)
                    }
                    ,
                    v.isSame = function(e, t) {
                        var n = _(e);
                        return this.startOf(t) <= n && n <= this.endOf(t)
                    }
                    ,
                    v.isAfter = function(e, t) {
                        return _(e) < this.startOf(t)
                    }
                    ,
                    v.isBefore = function(e, t) {
                        return this.endOf(t) < _(e)
                    }
                    ,
                    v.$g = function(e, t, n) {
                        return C.u(e) ? this[t] : this.set(n, e)
                    }
                    ,
                    v.unix = function() {
                        return Math.floor(this.valueOf() / 1e3)
                    }
                    ,
                    v.valueOf = function() {
                        return this.$d.getTime()
                    }
                    ,
                    v.startOf = function(e, t) {
                        var n = this
                          , r = !!C.u(t) || t
                          , c = C.p(e)
                          , p = function(e, t) {
                            var a = C.w(n.$u ? Date.UTC(n.$y, t, e) : new Date(n.$y,t,e), n);
                            return r ? a : a.endOf(l)
                        }
                          , h = function(e, t) {
                            return C.w(n.toDate()[e].apply(n.toDate("s"), (r ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(t)), n)
                        }
                          , g = this.$W
                          , m = this.$M
                          , v = this.$D
                          , y = "set" + (this.$u ? "UTC" : "");
                        switch (c) {
                        case d:
                            return r ? p(1, 0) : p(31, 11);
                        case u:
                            return r ? p(1, m) : p(0, m + 1);
                        case s:
                            var b = this.$locale().weekStart || 0
                              , w = (g < b ? g + 7 : g) - b;
                            return p(r ? v - w : v + (6 - w), m);
                        case l:
                        case f:
                            return h(y + "Hours", 0);
                        case i:
                            return h(y + "Minutes", 1);
                        case o:
                            return h(y + "Seconds", 2);
                        case a:
                            return h(y + "Milliseconds", 3);
                        default:
                            return this.clone()
                        }
                    }
                    ,
                    v.endOf = function(e) {
                        return this.startOf(e, !1)
                    }
                    ,
                    v.$set = function(e, t) {
                        var n, s = C.p(e), c = "set" + (this.$u ? "UTC" : ""), p = (n = {},
                        n[l] = c + "Date",
                        n[f] = c + "Date",
                        n[u] = c + "Month",
                        n[d] = c + "FullYear",
                        n[i] = c + "Hours",
                        n[o] = c + "Minutes",
                        n[a] = c + "Seconds",
                        n[r] = c + "Milliseconds",
                        n)[s], h = s === l ? this.$D + (t - this.$W) : t;
                        if (s === u || s === d) {
                            var g = this.clone().set(f, 1);
                            g.$d[p](h),
                            g.init(),
                            this.$d = g.set(f, Math.min(this.$D, g.daysInMonth())).$d
                        } else
                            p && this.$d[p](h);
                        return this.init(),
                        this
                    }
                    ,
                    v.set = function(e, t) {
                        return this.clone().$set(e, t)
                    }
                    ,
                    v.get = function(e) {
                        return this[C.p(e)]()
                    }
                    ,
                    v.add = function(r, c) {
                        var f, p = this;
                        r = Number(r);
                        var h = C.p(c)
                          , g = function(e) {
                            var t = _(p);
                            return C.w(t.date(t.date() + Math.round(e * r)), p)
                        };
                        if (h === u)
                            return this.set(u, this.$M + r);
                        if (h === d)
                            return this.set(d, this.$y + r);
                        if (h === l)
                            return g(1);
                        if (h === s)
                            return g(7);
                        var m = (f = {},
                        f[o] = t,
                        f[i] = n,
                        f[a] = e,
                        f)[h] || 1
                          , v = this.$d.getTime() + r * m;
                        return C.w(v, this)
                    }
                    ,
                    v.subtract = function(e, t) {
                        return this.add(-1 * e, t)
                    }
                    ,
                    v.format = function(e) {
                        var t = this
                          , n = this.$locale();
                        if (!this.isValid())
                            return n.invalidDate || p;
                        var r = e || "YYYY-MM-DDTHH:mm:ssZ"
                          , a = C.z(this)
                          , o = this.$H
                          , i = this.$m
                          , l = this.$M
                          , s = n.weekdays
                          , u = n.months
                          , c = function(e, n, a, o) {
                            return e && (e[n] || e(t, r)) || a[n].substr(0, o)
                        }
                          , d = function(e) {
                            return C.s(o % 12 || 12, e, "0")
                        }
                          , f = n.meridiem || function(e, t, n) {
                            var r = e < 12 ? "AM" : "PM";
                            return n ? r.toLowerCase() : r
                        }
                          , h = {
                            YY: String(this.$y).slice(-2),
                            YYYY: this.$y,
                            M: l + 1,
                            MM: C.s(l + 1, 2, "0"),
                            MMM: c(n.monthsShort, l, u, 3),
                            MMMM: c(u, l),
                            D: this.$D,
                            DD: C.s(this.$D, 2, "0"),
                            d: String(this.$W),
                            dd: c(n.weekdaysMin, this.$W, s, 2),
                            ddd: c(n.weekdaysShort, this.$W, s, 3),
                            dddd: s[this.$W],
                            H: String(o),
                            HH: C.s(o, 2, "0"),
                            h: d(1),
                            hh: d(2),
                            a: f(o, i, !0),
                            A: f(o, i, !1),
                            m: String(i),
                            mm: C.s(i, 2, "0"),
                            s: String(this.$s),
                            ss: C.s(this.$s, 2, "0"),
                            SSS: C.s(this.$ms, 3, "0"),
                            Z: a
                        };
                        return r.replace(g, (function(e, t) {
                            return t || h[e] || a.replace(":", "")
                        }
                        ))
                    }
                    ,
                    v.utcOffset = function() {
                        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
                    }
                    ,
                    v.diff = function(r, f, p) {
                        var h, g = C.p(f), m = _(r), v = (m.utcOffset() - this.utcOffset()) * t, y = this - m, b = C.m(this, m);
                        return b = (h = {},
                        h[d] = b / 12,
                        h[u] = b,
                        h[c] = b / 3,
                        h[s] = (y - v) / 6048e5,
                        h[l] = (y - v) / 864e5,
                        h[i] = y / n,
                        h[o] = y / t,
                        h[a] = y / e,
                        h)[g] || y,
                        p ? b : C.a(b)
                    }
                    ,
                    v.daysInMonth = function() {
                        return this.endOf(u).$D
                    }
                    ,
                    v.$locale = function() {
                        return w[this.$L]
                    }
                    ,
                    v.locale = function(e, t) {
                        if (!e)
                            return this.$L;
                        var n = this.clone()
                          , r = k(e, t, !0);
                        return r && (n.$L = r),
                        n
                    }
                    ,
                    v.clone = function() {
                        return C.w(this.$d, this)
                    }
                    ,
                    v.toDate = function() {
                        return new Date(this.valueOf())
                    }
                    ,
                    v.toJSON = function() {
                        return this.isValid() ? this.toISOString() : null
                    }
                    ,
                    v.toISOString = function() {
                        return this.$d.toISOString()
                    }
                    ,
                    v.toString = function() {
                        return this.$d.toUTCString()
                    }
                    ,
                    m
                }()
                  , j = S.prototype;
                return _.prototype = j,
                [["$ms", r], ["$s", a], ["$m", o], ["$H", i], ["$W", l], ["$M", u], ["$y", d], ["$D", f]].forEach((function(e) {
                    j[e[1]] = function(t) {
                        return this.$g(t, e[0], e[1])
                    }
                }
                )),
                _.extend = function(e, t) {
                    return e.$i || (e(t, S, _),
                    e.$i = !0),
                    _
                }
                ,
                _.locale = k,
                _.isDayjs = x,
                _.unix = function(e) {
                    return _(1e3 * e)
                }
                ,
                _.en = w[b],
                _.Ls = w,
                _.p = {},
                _
            }()
        },
        563: function(e, t, n) {
            e.exports = function(e) {
                "use strict";
                function t(e) {
                    return e && "object" == typeof e && "default"in e ? e : {
                        default: e
                    }
                }
                var n = t(e)
                  , r = {
                    name: "es",
                    monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
                    weekdays: "domingo_lunes_martes_mi\xe9rcoles_jueves_viernes_s\xe1bado".split("_"),
                    weekdaysShort: "dom._lun._mar._mi\xe9._jue._vie._s\xe1b.".split("_"),
                    weekdaysMin: "do_lu_ma_mi_ju_vi_s\xe1".split("_"),
                    months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
                    weekStart: 1,
                    formats: {
                        LT: "H:mm",
                        LTS: "H:mm:ss",
                        L: "DD/MM/YYYY",
                        LL: "D [de] MMMM [de] YYYY",
                        LLL: "D [de] MMMM [de] YYYY H:mm",
                        LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
                    },
                    relativeTime: {
                        future: "en %s",
                        past: "hace %s",
                        s: "unos segundos",
                        m: "un minuto",
                        mm: "%d minutos",
                        h: "una hora",
                        hh: "%d horas",
                        d: "un d\xeda",
                        dd: "%d d\xedas",
                        M: "un mes",
                        MM: "%d meses",
                        y: "un a\xf1o",
                        yy: "%d a\xf1os"
                    },
                    ordinal: function(e) {
                        return e + "\xba"
                    }
                };
                return n.default.locale(r, null, !0),
                r
            }(n(892))
        },
        30: function(e, t, n) {
            e.exports = function(e) {
                "use strict";
                function t(e) {
                    return e && "object" == typeof e && "default"in e ? e : {
                        default: e
                    }
                }
                var n = t(e)
                  , r = {
                    name: "pt",
                    weekdays: "Domingo_Segunda-feira_Ter\xe7a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S\xe1bado".split("_"),
                    weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sab".split("_"),
                    weekdaysMin: "Do_2\xaa_3\xaa_4\xaa_5\xaa_6\xaa_Sa".split("_"),
                    months: "Janeiro_Fevereiro_Mar\xe7o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
                    monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
                    ordinal: function(e) {
                        return e + "\xba"
                    },
                    weekStart: 1,
                    yearStart: 4,
                    formats: {
                        LT: "HH:mm",
                        LTS: "HH:mm:ss",
                        L: "DD/MM/YYYY",
                        LL: "D [de] MMMM [de] YYYY",
                        LLL: "D [de] MMMM [de] YYYY [\xe0s] HH:mm",
                        LLLL: "dddd, D [de] MMMM [de] YYYY [\xe0s] HH:mm"
                    },
                    relativeTime: {
                        future: "em %s",
                        past: "h\xe1 %s",
                        s: "alguns segundos",
                        m: "um minuto",
                        mm: "%d minutos",
                        h: "uma hora",
                        hh: "%d horas",
                        d: "um dia",
                        dd: "%d dias",
                        M: "um m\xeas",
                        MM: "%d meses",
                        y: "um ano",
                        yy: "%d anos"
                    }
                };
                return n.default.locale(r, null, !0),
                r
            }(n(892))
        },
        725: function(e) {
            "use strict";
            var t = Object.getOwnPropertySymbols
              , n = Object.prototype.hasOwnProperty
              , r = Object.prototype.propertyIsEnumerable;
            function a(e) {
                if (null === e || void 0 === e)
                    throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(e)
            }
            e.exports = function() {
                try {
                    if (!Object.assign)
                        return !1;
                    var e = new String("abc");
                    if (e[5] = "de",
                    "5" === Object.getOwnPropertyNames(e)[0])
                        return !1;
                    for (var t = {}, n = 0; n < 10; n++)
                        t["_" + String.fromCharCode(n)] = n;
                    if ("0123456789" !== Object.getOwnPropertyNames(t).map((function(e) {
                        return t[e]
                    }
                    )).join(""))
                        return !1;
                    var r = {};
                    return "abcdefghijklmnopqrst".split("").forEach((function(e) {
                        r[e] = e
                    }
                    )),
                    "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
                } catch (a) {
                    return !1
                }
            }() ? Object.assign : function(e, o) {
                for (var i, l, s = a(e), u = 1; u < arguments.length; u++) {
                    for (var c in i = Object(arguments[u]))
                        n.call(i, c) && (s[c] = i[c]);
                    if (t) {
                        l = t(i);
                        for (var d = 0; d < l.length; d++)
                            r.call(i, l[d]) && (s[l[d]] = i[l[d]])
                    }
                }
                return s
            }
        },
        888: function(e, t, n) {
            "use strict";
            var r = n(47);
            function a() {}
            function o() {}
            o.resetWarningCache = a,
            e.exports = function() {
                function e(e, t, n, a, o, i) {
                    if (i !== r) {
                        var l = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                        throw l.name = "Invariant Violation",
                        l
                    }
                }
                function t() {
                    return e
                }
                e.isRequired = e;
                var n = {
                    array: e,
                    bigint: e,
                    bool: e,
                    func: e,
                    number: e,
                    object: e,
                    string: e,
                    symbol: e,
                    any: e,
                    arrayOf: t,
                    element: e,
                    elementType: e,
                    instanceOf: t,
                    node: e,
                    objectOf: t,
                    oneOf: t,
                    oneOfType: t,
                    shape: t,
                    exact: t,
                    checkPropTypes: o,
                    resetWarningCache: a
                };
                return n.PropTypes = n,
                n
            }
        },
        7: function(e, t, n) {
            e.exports = n(888)()
        },
        47: function(e) {
            "use strict";
            e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
        },
        463: function(e, t, n) {
            "use strict";
            var r = n(791)
              , a = n(725)
              , o = n(296);
            function i(e) {
                for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
                    t += "&args[]=" + encodeURIComponent(arguments[n]);
                return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
            }
            if (!r)
                throw Error(i(227));
            var l = new Set
              , s = {};
            function u(e, t) {
                c(e, t),
                c(e + "Capture", t)
            }
            function c(e, t) {
                for (s[e] = t,
                e = 0; e < t.length; e++)
                    l.add(t[e])
            }
            var d = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement)
              , f = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/
              , p = Object.prototype.hasOwnProperty
              , h = {}
              , g = {};
            function m(e, t, n, r, a, o, i) {
                this.acceptsBooleans = 2 === t || 3 === t || 4 === t,
                this.attributeName = r,
                this.attributeNamespace = a,
                this.mustUseProperty = n,
                this.propertyName = e,
                this.type = t,
                this.sanitizeURL = o,
                this.removeEmptyString = i
            }
            var v = {};
            "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e) {
                v[e] = new m(e,0,!1,e,null,!1,!1)
            }
            )),
            [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach((function(e) {
                var t = e[0];
                v[t] = new m(t,1,!1,e[1],null,!1,!1)
            }
            )),
            ["contentEditable", "draggable", "spellCheck", "value"].forEach((function(e) {
                v[e] = new m(e,2,!1,e.toLowerCase(),null,!1,!1)
            }
            )),
            ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach((function(e) {
                v[e] = new m(e,2,!1,e,null,!1,!1)
            }
            )),
            "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e) {
                v[e] = new m(e,3,!1,e.toLowerCase(),null,!1,!1)
            }
            )),
            ["checked", "multiple", "muted", "selected"].forEach((function(e) {
                v[e] = new m(e,3,!0,e,null,!1,!1)
            }
            )),
            ["capture", "download"].forEach((function(e) {
                v[e] = new m(e,4,!1,e,null,!1,!1)
            }
            )),
            ["cols", "rows", "size", "span"].forEach((function(e) {
                v[e] = new m(e,6,!1,e,null,!1,!1)
            }
            )),
            ["rowSpan", "start"].forEach((function(e) {
                v[e] = new m(e,5,!1,e.toLowerCase(),null,!1,!1)
            }
            ));
            var y = /[\-:]([a-z])/g;
            function b(e) {
                return e[1].toUpperCase()
            }
            function w(e, t, n, r) {
                var a = v.hasOwnProperty(t) ? v[t] : null;
                (null !== a ? 0 === a.type : !r && (2 < t.length && ("o" === t[0] || "O" === t[0]) && ("n" === t[1] || "N" === t[1]))) || (function(e, t, n, r) {
                    if (null === t || "undefined" === typeof t || function(e, t, n, r) {
                        if (null !== n && 0 === n.type)
                            return !1;
                        switch (typeof t) {
                        case "function":
                        case "symbol":
                            return !0;
                        case "boolean":
                            return !r && (null !== n ? !n.acceptsBooleans : "data-" !== (e = e.toLowerCase().slice(0, 5)) && "aria-" !== e);
                        default:
                            return !1
                        }
                    }(e, t, n, r))
                        return !0;
                    if (r)
                        return !1;
                    if (null !== n)
                        switch (n.type) {
                        case 3:
                            return !t;
                        case 4:
                            return !1 === t;
                        case 5:
                            return isNaN(t);
                        case 6:
                            return isNaN(t) || 1 > t
                        }
                    return !1
                }(t, n, a, r) && (n = null),
                r || null === a ? function(e) {
                    return !!p.call(g, e) || !p.call(h, e) && (f.test(e) ? g[e] = !0 : (h[e] = !0,
                    !1))
                }(t) && (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : a.mustUseProperty ? e[a.propertyName] = null === n ? 3 !== a.type && "" : n : (t = a.attributeName,
                r = a.attributeNamespace,
                null === n ? e.removeAttribute(t) : (n = 3 === (a = a.type) || 4 === a && !0 === n ? "" : "" + n,
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
            }
            "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e) {
                var t = e.replace(y, b);
                v[t] = new m(t,1,!1,e,null,!1,!1)
            }
            )),
            "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e) {
                var t = e.replace(y, b);
                v[t] = new m(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)
            }
            )),
            ["xml:base", "xml:lang", "xml:space"].forEach((function(e) {
                var t = e.replace(y, b);
                v[t] = new m(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)
            }
            )),
            ["tabIndex", "crossOrigin"].forEach((function(e) {
                v[e] = new m(e,1,!1,e.toLowerCase(),null,!1,!1)
            }
            )),
            v.xlinkHref = new m("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),
            ["src", "href", "action", "formAction"].forEach((function(e) {
                v[e] = new m(e,1,!1,e.toLowerCase(),null,!0,!0)
            }
            ));
            var x = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
              , k = 60103
              , _ = 60106
              , C = 60107
              , S = 60108
              , j = 60114
              , O = 60109
              , E = 60110
              , P = 60112
              , N = 60113
              , L = 60120
              , M = 60115
              , T = 60116
              , D = 60121
              , R = 60128
              , z = 60129
              , I = 60130
              , A = 60131;
            if ("function" === typeof Symbol && Symbol.for) {
                var F = Symbol.for;
                k = F("react.element"),
                _ = F("react.portal"),
                C = F("react.fragment"),
                S = F("react.strict_mode"),
                j = F("react.profiler"),
                O = F("react.provider"),
                E = F("react.context"),
                P = F("react.forward_ref"),
                N = F("react.suspense"),
                L = F("react.suspense_list"),
                M = F("react.memo"),
                T = F("react.lazy"),
                D = F("react.block"),
                F("react.scope"),
                R = F("react.opaque.id"),
                z = F("react.debug_trace_mode"),
                I = F("react.offscreen"),
                A = F("react.legacy_hidden")
            }
            var U, q = "function" === typeof Symbol && Symbol.iterator;
            function V(e) {
                return null === e || "object" !== typeof e ? null : "function" === typeof (e = q && e[q] || e["@@iterator"]) ? e : null
            }
            function H(e) {
                if (void 0 === U)
                    try {
                        throw Error()
                    } catch (n) {
                        var t = n.stack.trim().match(/\n( *(at )?)/);
                        U = t && t[1] || ""
                    }
                return "\n" + U + e
            }
            var B = !1;
            function $(e, t) {
                if (!e || B)
                    return "";
                B = !0;
                var n = Error.prepareStackTrace;
                Error.prepareStackTrace = void 0;
                try {
                    if (t)
                        if (t = function() {
                            throw Error()
                        }
                        ,
                        Object.defineProperty(t.prototype, "props", {
                            set: function() {
                                throw Error()
                            }
                        }),
                        "object" === typeof Reflect && Reflect.construct) {
                            try {
                                Reflect.construct(t, [])
                            } catch (s) {
                                var r = s
                            }
                            Reflect.construct(e, [], t)
                        } else {
                            try {
                                t.call()
                            } catch (s) {
                                r = s
                            }
                            e.call(t.prototype)
                        }
                    else {
                        try {
                            throw Error()
                        } catch (s) {
                            r = s
                        }
                        e()
                    }
                } catch (s) {
                    if (s && r && "string" === typeof s.stack) {
                        for (var a = s.stack.split("\n"), o = r.stack.split("\n"), i = a.length - 1, l = o.length - 1; 1 <= i && 0 <= l && a[i] !== o[l]; )
                            l--;
                        for (; 1 <= i && 0 <= l; i--,
                        l--)
                            if (a[i] !== o[l]) {
                                if (1 !== i || 1 !== l)
                                    do {
                                        if (i--,
                                        0 > --l || a[i] !== o[l])
                                            return "\n" + a[i].replace(" at new ", " at ")
                                    } while (1 <= i && 0 <= l);
                                break
                            }
                    }
                } finally {
                    B = !1,
                    Error.prepareStackTrace = n
                }
                return (e = e ? e.displayName || e.name : "") ? H(e) : ""
            }
            function Y(e) {
                switch (e.tag) {
                case 5:
                    return H(e.type);
                case 16:
                    return H("Lazy");
                case 13:
                    return H("Suspense");
                case 19:
                    return H("SuspenseList");
                case 0:
                case 2:
                case 15:
                    return e = $(e.type, !1);
                case 11:
                    return e = $(e.type.render, !1);
                case 22:
                    return e = $(e.type._render, !1);
                case 1:
                    return e = $(e.type, !0);
                default:
                    return ""
                }
            }
            function W(e) {
                if (null == e)
                    return null;
                if ("function" === typeof e)
                    return e.displayName || e.name || null;
                if ("string" === typeof e)
                    return e;
                switch (e) {
                case C:
                    return "Fragment";
                case _:
                    return "Portal";
                case j:
                    return "Profiler";
                case S:
                    return "StrictMode";
                case N:
                    return "Suspense";
                case L:
                    return "SuspenseList"
                }
                if ("object" === typeof e)
                    switch (e.$$typeof) {
                    case E:
                        return (e.displayName || "Context") + ".Consumer";
                    case O:
                        return (e._context.displayName || "Context") + ".Provider";
                    case P:
                        var t = e.render;
                        return t = t.displayName || t.name || "",
                        e.displayName || ("" !== t ? "ForwardRef(" + t + ")" : "ForwardRef");
                    case M:
                        return W(e.type);
                    case D:
                        return W(e._render);
                    case T:
                        t = e._payload,
                        e = e._init;
                        try {
                            return W(e(t))
                        } catch (n) {}
                    }
                return null
            }
            function G(e) {
                switch (typeof e) {
                case "boolean":
                case "number":
                case "object":
                case "string":
                case "undefined":
                    return e;
                default:
                    return ""
                }
            }
            function Q(e) {
                var t = e.type;
                return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t)
            }
            function K(e) {
                e._valueTracker || (e._valueTracker = function(e) {
                    var t = Q(e) ? "checked" : "value"
                      , n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t)
                      , r = "" + e[t];
                    if (!e.hasOwnProperty(t) && "undefined" !== typeof n && "function" === typeof n.get && "function" === typeof n.set) {
                        var a = n.get
                          , o = n.set;
                        return Object.defineProperty(e, t, {
                            configurable: !0,
                            get: function() {
                                return a.call(this)
                            },
                            set: function(e) {
                                r = "" + e,
                                o.call(this, e)
                            }
                        }),
                        Object.defineProperty(e, t, {
                            enumerable: n.enumerable
                        }),
                        {
                            getValue: function() {
                                return r
                            },
                            setValue: function(e) {
                                r = "" + e
                            },
                            stopTracking: function() {
                                e._valueTracker = null,
                                delete e[t]
                            }
                        }
                    }
                }(e))
            }
            function J(e) {
                if (!e)
                    return !1;
                var t = e._valueTracker;
                if (!t)
                    return !0;
                var n = t.getValue()
                  , r = "";
                return e && (r = Q(e) ? e.checked ? "true" : "false" : e.value),
                (e = r) !== n && (t.setValue(e),
                !0)
            }
            function Z(e) {
                if ("undefined" === typeof (e = e || ("undefined" !== typeof document ? document : void 0)))
                    return null;
                try {
                    return e.activeElement || e.body
                } catch (t) {
                    return e.body
                }
            }
            function X(e, t) {
                var n = t.checked;
                return a({}, t, {
                    defaultChecked: void 0,
                    defaultValue: void 0,
                    value: void 0,
                    checked: null != n ? n : e._wrapperState.initialChecked
                })
            }
            function ee(e, t) {
                var n = null == t.defaultValue ? "" : t.defaultValue
                  , r = null != t.checked ? t.checked : t.defaultChecked;
                n = G(null != t.value ? t.value : n),
                e._wrapperState = {
                    initialChecked: r,
                    initialValue: n,
                    controlled: "checkbox" === t.type || "radio" === t.type ? null != t.checked : null != t.value
                }
            }
            function te(e, t) {
                null != (t = t.checked) && w(e, "checked", t, !1)
            }
            function ne(e, t) {
                te(e, t);
                var n = G(t.value)
                  , r = t.type;
                if (null != n)
                    "number" === r ? (0 === n && "" === e.value || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
                else if ("submit" === r || "reset" === r)
                    return void e.removeAttribute("value");
                t.hasOwnProperty("value") ? ae(e, t.type, n) : t.hasOwnProperty("defaultValue") && ae(e, t.type, G(t.defaultValue)),
                null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked)
            }
            function re(e, t, n) {
                if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
                    var r = t.type;
                    if (!("submit" !== r && "reset" !== r || void 0 !== t.value && null !== t.value))
                        return;
                    t = "" + e._wrapperState.initialValue,
                    n || t === e.value || (e.value = t),
                    e.defaultValue = t
                }
                "" !== (n = e.name) && (e.name = ""),
                e.defaultChecked = !!e._wrapperState.initialChecked,
                "" !== n && (e.name = n)
            }
            function ae(e, t, n) {
                "number" === t && Z(e.ownerDocument) === e || (null == n ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
            }
            function oe(e, t) {
                return e = a({
                    children: void 0
                }, t),
                (t = function(e) {
                    var t = "";
                    return r.Children.forEach(e, (function(e) {
                        null != e && (t += e)
                    }
                    )),
                    t
                }(t.children)) && (e.children = t),
                e
            }
            function ie(e, t, n, r) {
                if (e = e.options,
                t) {
                    t = {};
                    for (var a = 0; a < n.length; a++)
                        t["$" + n[a]] = !0;
                    for (n = 0; n < e.length; n++)
                        a = t.hasOwnProperty("$" + e[n].value),
                        e[n].selected !== a && (e[n].selected = a),
                        a && r && (e[n].defaultSelected = !0)
                } else {
                    for (n = "" + G(n),
                    t = null,
                    a = 0; a < e.length; a++) {
                        if (e[a].value === n)
                            return e[a].selected = !0,
                            void (r && (e[a].defaultSelected = !0));
                        null !== t || e[a].disabled || (t = e[a])
                    }
                    null !== t && (t.selected = !0)
                }
            }
            function le(e, t) {
                if (null != t.dangerouslySetInnerHTML)
                    throw Error(i(91));
                return a({}, t, {
                    value: void 0,
                    defaultValue: void 0,
                    children: "" + e._wrapperState.initialValue
                })
            }
            function se(e, t) {
                var n = t.value;
                if (null == n) {
                    if (n = t.children,
                    t = t.defaultValue,
                    null != n) {
                        if (null != t)
                            throw Error(i(92));
                        if (Array.isArray(n)) {
                            if (!(1 >= n.length))
                                throw Error(i(93));
                            n = n[0]
                        }
                        t = n
                    }
                    null == t && (t = ""),
                    n = t
                }
                e._wrapperState = {
                    initialValue: G(n)
                }
            }
            function ue(e, t) {
                var n = G(t.value)
                  , r = G(t.defaultValue);
                null != n && ((n = "" + n) !== e.value && (e.value = n),
                null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)),
                null != r && (e.defaultValue = "" + r)
            }
            function ce(e) {
                var t = e.textContent;
                t === e._wrapperState.initialValue && "" !== t && null !== t && (e.value = t)
            }
            var de = "http://www.w3.org/1999/xhtml"
              , fe = "http://www.w3.org/2000/svg";
            function pe(e) {
                switch (e) {
                case "svg":
                    return "http://www.w3.org/2000/svg";
                case "math":
                    return "http://www.w3.org/1998/Math/MathML";
                default:
                    return "http://www.w3.org/1999/xhtml"
                }
            }
            function he(e, t) {
                return null == e || "http://www.w3.org/1999/xhtml" === e ? pe(t) : "http://www.w3.org/2000/svg" === e && "foreignObject" === t ? "http://www.w3.org/1999/xhtml" : e
            }
            var ge, me, ve = (me = function(e, t) {
                if (e.namespaceURI !== fe || "innerHTML"in e)
                    e.innerHTML = t;
                else {
                    for ((ge = ge || document.createElement("div")).innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
                    t = ge.firstChild; e.firstChild; )
                        e.removeChild(e.firstChild);
                    for (; t.firstChild; )
                        e.appendChild(t.firstChild)
                }
            }
            ,
            "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(e, t, n, r) {
                MSApp.execUnsafeLocalFunction((function() {
                    return me(e, t)
                }
                ))
            }
            : me);
            function ye(e, t) {
                if (t) {
                    var n = e.firstChild;
                    if (n && n === e.lastChild && 3 === n.nodeType)
                        return void (n.nodeValue = t)
                }
                e.textContent = t
            }
            var be = {
                animationIterationCount: !0,
                borderImageOutset: !0,
                borderImageSlice: !0,
                borderImageWidth: !0,
                boxFlex: !0,
                boxFlexGroup: !0,
                boxOrdinalGroup: !0,
                columnCount: !0,
                columns: !0,
                flex: !0,
                flexGrow: !0,
                flexPositive: !0,
                flexShrink: !0,
                flexNegative: !0,
                flexOrder: !0,
                gridArea: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowSpan: !0,
                gridRowStart: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnSpan: !0,
                gridColumnStart: !0,
                fontWeight: !0,
                lineClamp: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                tabSize: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0,
                fillOpacity: !0,
                floodOpacity: !0,
                stopOpacity: !0,
                strokeDasharray: !0,
                strokeDashoffset: !0,
                strokeMiterlimit: !0,
                strokeOpacity: !0,
                strokeWidth: !0
            }
              , we = ["Webkit", "ms", "Moz", "O"];
            function xe(e, t, n) {
                return null == t || "boolean" === typeof t || "" === t ? "" : n || "number" !== typeof t || 0 === t || be.hasOwnProperty(e) && be[e] ? ("" + t).trim() : t + "px"
            }
            function ke(e, t) {
                for (var n in e = e.style,
                t)
                    if (t.hasOwnProperty(n)) {
                        var r = 0 === n.indexOf("--")
                          , a = xe(n, t[n], r);
                        "float" === n && (n = "cssFloat"),
                        r ? e.setProperty(n, a) : e[n] = a
                    }
            }
            Object.keys(be).forEach((function(e) {
                we.forEach((function(t) {
                    t = t + e.charAt(0).toUpperCase() + e.substring(1),
                    be[t] = be[e]
                }
                ))
            }
            ));
            var _e = a({
                menuitem: !0
            }, {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                embed: !0,
                hr: !0,
                img: !0,
                input: !0,
                keygen: !0,
                link: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0
            });
            function Ce(e, t) {
                if (t) {
                    if (_e[e] && (null != t.children || null != t.dangerouslySetInnerHTML))
                        throw Error(i(137, e));
                    if (null != t.dangerouslySetInnerHTML) {
                        if (null != t.children)
                            throw Error(i(60));
                        if ("object" !== typeof t.dangerouslySetInnerHTML || !("__html"in t.dangerouslySetInnerHTML))
                            throw Error(i(61))
                    }
                    if (null != t.style && "object" !== typeof t.style)
                        throw Error(i(62))
                }
            }
            function Se(e, t) {
                if (-1 === e.indexOf("-"))
                    return "string" === typeof t.is;
                switch (e) {
                case "annotation-xml":
                case "color-profile":
                case "font-face":
                case "font-face-src":
                case "font-face-uri":
                case "font-face-format":
                case "font-face-name":
                case "missing-glyph":
                    return !1;
                default:
                    return !0
                }
            }
            function je(e) {
                return (e = e.target || e.srcElement || window).correspondingUseElement && (e = e.correspondingUseElement),
                3 === e.nodeType ? e.parentNode : e
            }
            var Oe = null
              , Ee = null
              , Pe = null;
            function Ne(e) {
                if (e = ra(e)) {
                    if ("function" !== typeof Oe)
                        throw Error(i(280));
                    var t = e.stateNode;
                    t && (t = oa(t),
                    Oe(e.stateNode, e.type, t))
                }
            }
            function Le(e) {
                Ee ? Pe ? Pe.push(e) : Pe = [e] : Ee = e
            }
            function Me() {
                if (Ee) {
                    var e = Ee
                      , t = Pe;
                    if (Pe = Ee = null,
                    Ne(e),
                    t)
                        for (e = 0; e < t.length; e++)
                            Ne(t[e])
                }
            }
            function Te(e, t) {
                return e(t)
            }
            function De(e, t, n, r, a) {
                return e(t, n, r, a)
            }
            function Re() {}
            var ze = Te
              , Ie = !1
              , Ae = !1;
            function Fe() {
                null === Ee && null === Pe || (Re(),
                Me())
            }
            function Ue(e, t) {
                var n = e.stateNode;
                if (null === n)
                    return null;
                var r = oa(n);
                if (null === r)
                    return null;
                n = r[t];
                e: switch (t) {
                case "onClick":
                case "onClickCapture":
                case "onDoubleClick":
                case "onDoubleClickCapture":
                case "onMouseDown":
                case "onMouseDownCapture":
                case "onMouseMove":
                case "onMouseMoveCapture":
                case "onMouseUp":
                case "onMouseUpCapture":
                case "onMouseEnter":
                    (r = !r.disabled) || (r = !("button" === (e = e.type) || "input" === e || "select" === e || "textarea" === e)),
                    e = !r;
                    break e;
                default:
                    e = !1
                }
                if (e)
                    return null;
                if (n && "function" !== typeof n)
                    throw Error(i(231, t, typeof n));
                return n
            }
            var qe = !1;
            if (d)
                try {
                    var Ve = {};
                    Object.defineProperty(Ve, "passive", {
                        get: function() {
                            qe = !0
                        }
                    }),
                    window.addEventListener("test", Ve, Ve),
                    window.removeEventListener("test", Ve, Ve)
                } catch (me) {
                    qe = !1
                }
            function He(e, t, n, r, a, o, i, l, s) {
                var u = Array.prototype.slice.call(arguments, 3);
                try {
                    t.apply(n, u)
                } catch (c) {
                    this.onError(c)
                }
            }
            var Be = !1
              , $e = null
              , Ye = !1
              , We = null
              , Ge = {
                onError: function(e) {
                    Be = !0,
                    $e = e
                }
            };
            function Qe(e, t, n, r, a, o, i, l, s) {
                Be = !1,
                $e = null,
                He.apply(Ge, arguments)
            }
            function Ke(e) {
                var t = e
                  , n = e;
                if (e.alternate)
                    for (; t.return; )
                        t = t.return;
                else {
                    e = t;
                    do {
                        0 !== (1026 & (t = e).flags) && (n = t.return),
                        e = t.return
                    } while (e)
                }
                return 3 === t.tag ? n : null
            }
            function Je(e) {
                if (13 === e.tag) {
                    var t = e.memoizedState;
                    if (null === t && (null !== (e = e.alternate) && (t = e.memoizedState)),
                    null !== t)
                        return t.dehydrated
                }
                return null
            }
            function Ze(e) {
                if (Ke(e) !== e)
                    throw Error(i(188))
            }
            function Xe(e) {
                if (e = function(e) {
                    var t = e.alternate;
                    if (!t) {
                        if (null === (t = Ke(e)))
                            throw Error(i(188));
                        return t !== e ? null : e
                    }
                    for (var n = e, r = t; ; ) {
                        var a = n.return;
                        if (null === a)
                            break;
                        var o = a.alternate;
                        if (null === o) {
                            if (null !== (r = a.return)) {
                                n = r;
                                continue
                            }
                            break
                        }
                        if (a.child === o.child) {
                            for (o = a.child; o; ) {
                                if (o === n)
                                    return Ze(a),
                                    e;
                                if (o === r)
                                    return Ze(a),
                                    t;
                                o = o.sibling
                            }
                            throw Error(i(188))
                        }
                        if (n.return !== r.return)
                            n = a,
                            r = o;
                        else {
                            for (var l = !1, s = a.child; s; ) {
                                if (s === n) {
                                    l = !0,
                                    n = a,
                                    r = o;
                                    break
                                }
                                if (s === r) {
                                    l = !0,
                                    r = a,
                                    n = o;
                                    break
                                }
                                s = s.sibling
                            }
                            if (!l) {
                                for (s = o.child; s; ) {
                                    if (s === n) {
                                        l = !0,
                                        n = o,
                                        r = a;
                                        break
                                    }
                                    if (s === r) {
                                        l = !0,
                                        r = o,
                                        n = a;
                                        break
                                    }
                                    s = s.sibling
                                }
                                if (!l)
                                    throw Error(i(189))
                            }
                        }
                        if (n.alternate !== r)
                            throw Error(i(190))
                    }
                    if (3 !== n.tag)
                        throw Error(i(188));
                    return n.stateNode.current === n ? e : t
                }(e),
                !e)
                    return null;
                for (var t = e; ; ) {
                    if (5 === t.tag || 6 === t.tag)
                        return t;
                    if (t.child)
                        t.child.return = t,
                        t = t.child;
                    else {
                        if (t === e)
                            break;
                        for (; !t.sibling; ) {
                            if (!t.return || t.return === e)
                                return null;
                            t = t.return
                        }
                        t.sibling.return = t.return,
                        t = t.sibling
                    }
                }
                return null
            }
            function et(e, t) {
                for (var n = e.alternate; null !== t; ) {
                    if (t === e || t === n)
                        return !0;
                    t = t.return
                }
                return !1
            }
            var tt, nt, rt, at, ot = !1, it = [], lt = null, st = null, ut = null, ct = new Map, dt = new Map, ft = [], pt = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
            function ht(e, t, n, r, a) {
                return {
                    blockedOn: e,
                    domEventName: t,
                    eventSystemFlags: 16 | n,
                    nativeEvent: a,
                    targetContainers: [r]
                }
            }
            function gt(e, t) {
                switch (e) {
                case "focusin":
                case "focusout":
                    lt = null;
                    break;
                case "dragenter":
                case "dragleave":
                    st = null;
                    break;
                case "mouseover":
                case "mouseout":
                    ut = null;
                    break;
                case "pointerover":
                case "pointerout":
                    ct.delete(t.pointerId);
                    break;
                case "gotpointercapture":
                case "lostpointercapture":
                    dt.delete(t.pointerId)
                }
            }
            function mt(e, t, n, r, a, o) {
                return null === e || e.nativeEvent !== o ? (e = ht(t, n, r, a, o),
                null !== t && (null !== (t = ra(t)) && nt(t)),
                e) : (e.eventSystemFlags |= r,
                t = e.targetContainers,
                null !== a && -1 === t.indexOf(a) && t.push(a),
                e)
            }
            function vt(e) {
                var t = na(e.target);
                if (null !== t) {
                    var n = Ke(t);
                    if (null !== n)
                        if (13 === (t = n.tag)) {
                            if (null !== (t = Je(n)))
                                return e.blockedOn = t,
                                void at(e.lanePriority, (function() {
                                    o.unstable_runWithPriority(e.priority, (function() {
                                        rt(n)
                                    }
                                    ))
                                }
                                ))
                        } else if (3 === t && n.stateNode.hydrate)
                            return void (e.blockedOn = 3 === n.tag ? n.stateNode.containerInfo : null)
                }
                e.blockedOn = null
            }
            function yt(e) {
                if (null !== e.blockedOn)
                    return !1;
                for (var t = e.targetContainers; 0 < t.length; ) {
                    var n = Xt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
                    if (null !== n)
                        return null !== (t = ra(n)) && nt(t),
                        e.blockedOn = n,
                        !1;
                    t.shift()
                }
                return !0
            }
            function bt(e, t, n) {
                yt(e) && n.delete(t)
            }
            function wt() {
                for (ot = !1; 0 < it.length; ) {
                    var e = it[0];
                    if (null !== e.blockedOn) {
                        null !== (e = ra(e.blockedOn)) && tt(e);
                        break
                    }
                    for (var t = e.targetContainers; 0 < t.length; ) {
                        var n = Xt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
                        if (null !== n) {
                            e.blockedOn = n;
                            break
                        }
                        t.shift()
                    }
                    null === e.blockedOn && it.shift()
                }
                null !== lt && yt(lt) && (lt = null),
                null !== st && yt(st) && (st = null),
                null !== ut && yt(ut) && (ut = null),
                ct.forEach(bt),
                dt.forEach(bt)
            }
            function xt(e, t) {
                e.blockedOn === t && (e.blockedOn = null,
                ot || (ot = !0,
                o.unstable_scheduleCallback(o.unstable_NormalPriority, wt)))
            }
            function kt(e) {
                function t(t) {
                    return xt(t, e)
                }
                if (0 < it.length) {
                    xt(it[0], e);
                    for (var n = 1; n < it.length; n++) {
                        var r = it[n];
                        r.blockedOn === e && (r.blockedOn = null)
                    }
                }
                for (null !== lt && xt(lt, e),
                null !== st && xt(st, e),
                null !== ut && xt(ut, e),
                ct.forEach(t),
                dt.forEach(t),
                n = 0; n < ft.length; n++)
                    (r = ft[n]).blockedOn === e && (r.blockedOn = null);
                for (; 0 < ft.length && null === (n = ft[0]).blockedOn; )
                    vt(n),
                    null === n.blockedOn && ft.shift()
            }
            function _t(e, t) {
                var n = {};
                return n[e.toLowerCase()] = t.toLowerCase(),
                n["Webkit" + e] = "webkit" + t,
                n["Moz" + e] = "moz" + t,
                n
            }
            var Ct = {
                animationend: _t("Animation", "AnimationEnd"),
                animationiteration: _t("Animation", "AnimationIteration"),
                animationstart: _t("Animation", "AnimationStart"),
                transitionend: _t("Transition", "TransitionEnd")
            }
              , St = {}
              , jt = {};
            function Ot(e) {
                if (St[e])
                    return St[e];
                if (!Ct[e])
                    return e;
                var t, n = Ct[e];
                for (t in n)
                    if (n.hasOwnProperty(t) && t in jt)
                        return St[e] = n[t];
                return e
            }
            d && (jt = document.createElement("div").style,
            "AnimationEvent"in window || (delete Ct.animationend.animation,
            delete Ct.animationiteration.animation,
            delete Ct.animationstart.animation),
            "TransitionEvent"in window || delete Ct.transitionend.transition);
            var Et = Ot("animationend")
              , Pt = Ot("animationiteration")
              , Nt = Ot("animationstart")
              , Lt = Ot("transitionend")
              , Mt = new Map
              , Tt = new Map
              , Dt = ["abort", "abort", Et, "animationEnd", Pt, "animationIteration", Nt, "animationStart", "canplay", "canPlay", "canplaythrough", "canPlayThrough", "durationchange", "durationChange", "emptied", "emptied", "encrypted", "encrypted", "ended", "ended", "error", "error", "gotpointercapture", "gotPointerCapture", "load", "load", "loadeddata", "loadedData", "loadedmetadata", "loadedMetadata", "loadstart", "loadStart", "lostpointercapture", "lostPointerCapture", "playing", "playing", "progress", "progress", "seeking", "seeking", "stalled", "stalled", "suspend", "suspend", "timeupdate", "timeUpdate", Lt, "transitionEnd", "waiting", "waiting"];
            function Rt(e, t) {
                for (var n = 0; n < e.length; n += 2) {
                    var r = e[n]
                      , a = e[n + 1];
                    a = "on" + (a[0].toUpperCase() + a.slice(1)),
                    Tt.set(r, t),
                    Mt.set(r, a),
                    u(a, [r])
                }
            }
            (0,
            o.unstable_now)();
            var zt = 8;
            function It(e) {
                if (0 !== (1 & e))
                    return zt = 15,
                    1;
                if (0 !== (2 & e))
                    return zt = 14,
                    2;
                if (0 !== (4 & e))
                    return zt = 13,
                    4;
                var t = 24 & e;
                return 0 !== t ? (zt = 12,
                t) : 0 !== (32 & e) ? (zt = 11,
                32) : 0 !== (t = 192 & e) ? (zt = 10,
                t) : 0 !== (256 & e) ? (zt = 9,
                256) : 0 !== (t = 3584 & e) ? (zt = 8,
                t) : 0 !== (4096 & e) ? (zt = 7,
                4096) : 0 !== (t = 4186112 & e) ? (zt = 6,
                t) : 0 !== (t = 62914560 & e) ? (zt = 5,
                t) : 67108864 & e ? (zt = 4,
                67108864) : 0 !== (134217728 & e) ? (zt = 3,
                134217728) : 0 !== (t = 805306368 & e) ? (zt = 2,
                t) : 0 !== (1073741824 & e) ? (zt = 1,
                1073741824) : (zt = 8,
                e)
            }
            function At(e, t) {
                var n = e.pendingLanes;
                if (0 === n)
                    return zt = 0;
                var r = 0
                  , a = 0
                  , o = e.expiredLanes
                  , i = e.suspendedLanes
                  , l = e.pingedLanes;
                if (0 !== o)
                    r = o,
                    a = zt = 15;
                else if (0 !== (o = 134217727 & n)) {
                    var s = o & ~i;
                    0 !== s ? (r = It(s),
                    a = zt) : 0 !== (l &= o) && (r = It(l),
                    a = zt)
                } else
                    0 !== (o = n & ~i) ? (r = It(o),
                    a = zt) : 0 !== l && (r = It(l),
                    a = zt);
                if (0 === r)
                    return 0;
                if (r = n & ((0 > (r = 31 - Bt(r)) ? 0 : 1 << r) << 1) - 1,
                0 !== t && t !== r && 0 === (t & i)) {
                    if (It(t),
                    a <= zt)
                        return t;
                    zt = a
                }
                if (0 !== (t = e.entangledLanes))
                    for (e = e.entanglements,
                    t &= r; 0 < t; )
                        a = 1 << (n = 31 - Bt(t)),
                        r |= e[n],
                        t &= ~a;
                return r
            }
            function Ft(e) {
                return 0 !== (e = -1073741825 & e.pendingLanes) ? e : 1073741824 & e ? 1073741824 : 0
            }
            function Ut(e, t) {
                switch (e) {
                case 15:
                    return 1;
                case 14:
                    return 2;
                case 12:
                    return 0 === (e = qt(24 & ~t)) ? Ut(10, t) : e;
                case 10:
                    return 0 === (e = qt(192 & ~t)) ? Ut(8, t) : e;
                case 8:
                    return 0 === (e = qt(3584 & ~t)) && (0 === (e = qt(4186112 & ~t)) && (e = 512)),
                    e;
                case 2:
                    return 0 === (t = qt(805306368 & ~t)) && (t = 268435456),
                    t
                }
                throw Error(i(358, e))
            }
            function qt(e) {
                return e & -e
            }
            function Vt(e) {
                for (var t = [], n = 0; 31 > n; n++)
                    t.push(e);
                return t
            }
            function Ht(e, t, n) {
                e.pendingLanes |= t;
                var r = t - 1;
                e.suspendedLanes &= r,
                e.pingedLanes &= r,
                (e = e.eventTimes)[t = 31 - Bt(t)] = n
            }
            var Bt = Math.clz32 ? Math.clz32 : function(e) {
                return 0 === e ? 32 : 31 - ($t(e) / Yt | 0) | 0
            }
              , $t = Math.log
              , Yt = Math.LN2;
            var Wt = o.unstable_UserBlockingPriority
              , Gt = o.unstable_runWithPriority
              , Qt = !0;
            function Kt(e, t, n, r) {
                Ie || Re();
                var a = Zt
                  , o = Ie;
                Ie = !0;
                try {
                    De(a, e, t, n, r)
                } finally {
                    (Ie = o) || Fe()
                }
            }
            function Jt(e, t, n, r) {
                Gt(Wt, Zt.bind(null, e, t, n, r))
            }
            function Zt(e, t, n, r) {
                var a;
                if (Qt)
                    if ((a = 0 === (4 & t)) && 0 < it.length && -1 < pt.indexOf(e))
                        e = ht(null, e, t, n, r),
                        it.push(e);
                    else {
                        var o = Xt(e, t, n, r);
                        if (null === o)
                            a && gt(e, r);
                        else {
                            if (a) {
                                if (-1 < pt.indexOf(e))
                                    return e = ht(o, e, t, n, r),
                                    void it.push(e);
                                if (function(e, t, n, r, a) {
                                    switch (t) {
                                    case "focusin":
                                        return lt = mt(lt, e, t, n, r, a),
                                        !0;
                                    case "dragenter":
                                        return st = mt(st, e, t, n, r, a),
                                        !0;
                                    case "mouseover":
                                        return ut = mt(ut, e, t, n, r, a),
                                        !0;
                                    case "pointerover":
                                        var o = a.pointerId;
                                        return ct.set(o, mt(ct.get(o) || null, e, t, n, r, a)),
                                        !0;
                                    case "gotpointercapture":
                                        return o = a.pointerId,
                                        dt.set(o, mt(dt.get(o) || null, e, t, n, r, a)),
                                        !0
                                    }
                                    return !1
                                }(o, e, t, n, r))
                                    return;
                                gt(e, r)
                            }
                            Rr(e, t, r, null, n)
                        }
                    }
            }
            function Xt(e, t, n, r) {
                var a = je(r);
                if (null !== (a = na(a))) {
                    var o = Ke(a);
                    if (null === o)
                        a = null;
                    else {
                        var i = o.tag;
                        if (13 === i) {
                            if (null !== (a = Je(o)))
                                return a;
                            a = null
                        } else if (3 === i) {
                            if (o.stateNode.hydrate)
                                return 3 === o.tag ? o.stateNode.containerInfo : null;
                            a = null
                        } else
                            o !== a && (a = null)
                    }
                }
                return Rr(e, t, r, a, n),
                null
            }
            var en = null
              , tn = null
              , nn = null;
            function rn() {
                if (nn)
                    return nn;
                var e, t, n = tn, r = n.length, a = "value"in en ? en.value : en.textContent, o = a.length;
                for (e = 0; e < r && n[e] === a[e]; e++)
                    ;
                var i = r - e;
                for (t = 1; t <= i && n[r - t] === a[o - t]; t++)
                    ;
                return nn = a.slice(e, 1 < t ? 1 - t : void 0)
            }
            function an(e) {
                var t = e.keyCode;
                return "charCode"in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : e = t,
                10 === e && (e = 13),
                32 <= e || 13 === e ? e : 0
            }
            function on() {
                return !0
            }
            function ln() {
                return !1
            }
            function sn(e) {
                function t(t, n, r, a, o) {
                    for (var i in this._reactName = t,
                    this._targetInst = r,
                    this.type = n,
                    this.nativeEvent = a,
                    this.target = o,
                    this.currentTarget = null,
                    e)
                        e.hasOwnProperty(i) && (t = e[i],
                        this[i] = t ? t(a) : a[i]);
                    return this.isDefaultPrevented = (null != a.defaultPrevented ? a.defaultPrevented : !1 === a.returnValue) ? on : ln,
                    this.isPropagationStopped = ln,
                    this
                }
                return a(t.prototype, {
                    preventDefault: function() {
                        this.defaultPrevented = !0;
                        var e = this.nativeEvent;
                        e && (e.preventDefault ? e.preventDefault() : "unknown" !== typeof e.returnValue && (e.returnValue = !1),
                        this.isDefaultPrevented = on)
                    },
                    stopPropagation: function() {
                        var e = this.nativeEvent;
                        e && (e.stopPropagation ? e.stopPropagation() : "unknown" !== typeof e.cancelBubble && (e.cancelBubble = !0),
                        this.isPropagationStopped = on)
                    },
                    persist: function() {},
                    isPersistent: on
                }),
                t
            }
            var un, cn, dn, fn = {
                eventPhase: 0,
                bubbles: 0,
                cancelable: 0,
                timeStamp: function(e) {
                    return e.timeStamp || Date.now()
                },
                defaultPrevented: 0,
                isTrusted: 0
            }, pn = sn(fn), hn = a({}, fn, {
                view: 0,
                detail: 0
            }), gn = sn(hn), mn = a({}, hn, {
                screenX: 0,
                screenY: 0,
                clientX: 0,
                clientY: 0,
                pageX: 0,
                pageY: 0,
                ctrlKey: 0,
                shiftKey: 0,
                altKey: 0,
                metaKey: 0,
                getModifierState: En,
                button: 0,
                buttons: 0,
                relatedTarget: function(e) {
                    return void 0 === e.relatedTarget ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
                },
                movementX: function(e) {
                    return "movementX"in e ? e.movementX : (e !== dn && (dn && "mousemove" === e.type ? (un = e.screenX - dn.screenX,
                    cn = e.screenY - dn.screenY) : cn = un = 0,
                    dn = e),
                    un)
                },
                movementY: function(e) {
                    return "movementY"in e ? e.movementY : cn
                }
            }), vn = sn(mn), yn = sn(a({}, mn, {
                dataTransfer: 0
            })), bn = sn(a({}, hn, {
                relatedTarget: 0
            })), wn = sn(a({}, fn, {
                animationName: 0,
                elapsedTime: 0,
                pseudoElement: 0
            })), xn = a({}, fn, {
                clipboardData: function(e) {
                    return "clipboardData"in e ? e.clipboardData : window.clipboardData
                }
            }), kn = sn(xn), _n = sn(a({}, fn, {
                data: 0
            })), Cn = {
                Esc: "Escape",
                Spacebar: " ",
                Left: "ArrowLeft",
                Up: "ArrowUp",
                Right: "ArrowRight",
                Down: "ArrowDown",
                Del: "Delete",
                Win: "OS",
                Menu: "ContextMenu",
                Apps: "ContextMenu",
                Scroll: "ScrollLock",
                MozPrintableKey: "Unidentified"
            }, Sn = {
                8: "Backspace",
                9: "Tab",
                12: "Clear",
                13: "Enter",
                16: "Shift",
                17: "Control",
                18: "Alt",
                19: "Pause",
                20: "CapsLock",
                27: "Escape",
                32: " ",
                33: "PageUp",
                34: "PageDown",
                35: "End",
                36: "Home",
                37: "ArrowLeft",
                38: "ArrowUp",
                39: "ArrowRight",
                40: "ArrowDown",
                45: "Insert",
                46: "Delete",
                112: "F1",
                113: "F2",
                114: "F3",
                115: "F4",
                116: "F5",
                117: "F6",
                118: "F7",
                119: "F8",
                120: "F9",
                121: "F10",
                122: "F11",
                123: "F12",
                144: "NumLock",
                145: "ScrollLock",
                224: "Meta"
            }, jn = {
                Alt: "altKey",
                Control: "ctrlKey",
                Meta: "metaKey",
                Shift: "shiftKey"
            };
            function On(e) {
                var t = this.nativeEvent;
                return t.getModifierState ? t.getModifierState(e) : !!(e = jn[e]) && !!t[e]
            }
            function En() {
                return On
            }
            var Pn = a({}, hn, {
                key: function(e) {
                    if (e.key) {
                        var t = Cn[e.key] || e.key;
                        if ("Unidentified" !== t)
                            return t
                    }
                    return "keypress" === e.type ? 13 === (e = an(e)) ? "Enter" : String.fromCharCode(e) : "keydown" === e.type || "keyup" === e.type ? Sn[e.keyCode] || "Unidentified" : ""
                },
                code: 0,
                location: 0,
                ctrlKey: 0,
                shiftKey: 0,
                altKey: 0,
                metaKey: 0,
                repeat: 0,
                locale: 0,
                getModifierState: En,
                charCode: function(e) {
                    return "keypress" === e.type ? an(e) : 0
                },
                keyCode: function(e) {
                    return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
                },
                which: function(e) {
                    return "keypress" === e.type ? an(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
                }
            })
              , Nn = sn(Pn)
              , Ln = sn(a({}, mn, {
                pointerId: 0,
                width: 0,
                height: 0,
                pressure: 0,
                tangentialPressure: 0,
                tiltX: 0,
                tiltY: 0,
                twist: 0,
                pointerType: 0,
                isPrimary: 0
            }))
              , Mn = sn(a({}, hn, {
                touches: 0,
                targetTouches: 0,
                changedTouches: 0,
                altKey: 0,
                metaKey: 0,
                ctrlKey: 0,
                shiftKey: 0,
                getModifierState: En
            }))
              , Tn = sn(a({}, fn, {
                propertyName: 0,
                elapsedTime: 0,
                pseudoElement: 0
            }))
              , Dn = a({}, mn, {
                deltaX: function(e) {
                    return "deltaX"in e ? e.deltaX : "wheelDeltaX"in e ? -e.wheelDeltaX : 0
                },
                deltaY: function(e) {
                    return "deltaY"in e ? e.deltaY : "wheelDeltaY"in e ? -e.wheelDeltaY : "wheelDelta"in e ? -e.wheelDelta : 0
                },
                deltaZ: 0,
                deltaMode: 0
            })
              , Rn = sn(Dn)
              , zn = [9, 13, 27, 32]
              , In = d && "CompositionEvent"in window
              , An = null;
            d && "documentMode"in document && (An = document.documentMode);
            var Fn = d && "TextEvent"in window && !An
              , Un = d && (!In || An && 8 < An && 11 >= An)
              , qn = String.fromCharCode(32)
              , Vn = !1;
            function Hn(e, t) {
                switch (e) {
                case "keyup":
                    return -1 !== zn.indexOf(t.keyCode);
                case "keydown":
                    return 229 !== t.keyCode;
                case "keypress":
                case "mousedown":
                case "focusout":
                    return !0;
                default:
                    return !1
                }
            }
            function Bn(e) {
                return "object" === typeof (e = e.detail) && "data"in e ? e.data : null
            }
            var $n = !1;
            var Yn = {
                color: !0,
                date: !0,
                datetime: !0,
                "datetime-local": !0,
                email: !0,
                month: !0,
                number: !0,
                password: !0,
                range: !0,
                search: !0,
                tel: !0,
                text: !0,
                time: !0,
                url: !0,
                week: !0
            };
            function Wn(e) {
                var t = e && e.nodeName && e.nodeName.toLowerCase();
                return "input" === t ? !!Yn[e.type] : "textarea" === t
            }
            function Gn(e, t, n, r) {
                Le(r),
                0 < (t = Ir(t, "onChange")).length && (n = new pn("onChange","change",null,n,r),
                e.push({
                    event: n,
                    listeners: t
                }))
            }
            var Qn = null
              , Kn = null;
            function Jn(e) {
                Pr(e, 0)
            }
            function Zn(e) {
                if (J(aa(e)))
                    return e
            }
            function Xn(e, t) {
                if ("change" === e)
                    return t
            }
            var er = !1;
            if (d) {
                var tr;
                if (d) {
                    var nr = "oninput"in document;
                    if (!nr) {
                        var rr = document.createElement("div");
                        rr.setAttribute("oninput", "return;"),
                        nr = "function" === typeof rr.oninput
                    }
                    tr = nr
                } else
                    tr = !1;
                er = tr && (!document.documentMode || 9 < document.documentMode)
            }
            function ar() {
                Qn && (Qn.detachEvent("onpropertychange", or),
                Kn = Qn = null)
            }
            function or(e) {
                if ("value" === e.propertyName && Zn(Kn)) {
                    var t = [];
                    if (Gn(t, Kn, e, je(e)),
                    e = Jn,
                    Ie)
                        e(t);
                    else {
                        Ie = !0;
                        try {
                            Te(e, t)
                        } finally {
                            Ie = !1,
                            Fe()
                        }
                    }
                }
            }
            function ir(e, t, n) {
                "focusin" === e ? (ar(),
                Kn = n,
                (Qn = t).attachEvent("onpropertychange", or)) : "focusout" === e && ar()
            }
            function lr(e) {
                if ("selectionchange" === e || "keyup" === e || "keydown" === e)
                    return Zn(Kn)
            }
            function sr(e, t) {
                if ("click" === e)
                    return Zn(t)
            }
            function ur(e, t) {
                if ("input" === e || "change" === e)
                    return Zn(t)
            }
            var cr = "function" === typeof Object.is ? Object.is : function(e, t) {
                return e === t && (0 !== e || 1 / e === 1 / t) || e !== e && t !== t
            }
              , dr = Object.prototype.hasOwnProperty;
            function fr(e, t) {
                if (cr(e, t))
                    return !0;
                if ("object" !== typeof e || null === e || "object" !== typeof t || null === t)
                    return !1;
                var n = Object.keys(e)
                  , r = Object.keys(t);
                if (n.length !== r.length)
                    return !1;
                for (r = 0; r < n.length; r++)
                    if (!dr.call(t, n[r]) || !cr(e[n[r]], t[n[r]]))
                        return !1;
                return !0
            }
            function pr(e) {
                for (; e && e.firstChild; )
                    e = e.firstChild;
                return e
            }
            function hr(e, t) {
                var n, r = pr(e);
                for (e = 0; r; ) {
                    if (3 === r.nodeType) {
                        if (n = e + r.textContent.length,
                        e <= t && n >= t)
                            return {
                                node: r,
                                offset: t - e
                            };
                        e = n
                    }
                    e: {
                        for (; r; ) {
                            if (r.nextSibling) {
                                r = r.nextSibling;
                                break e
                            }
                            r = r.parentNode
                        }
                        r = void 0
                    }
                    r = pr(r)
                }
            }
            function gr(e, t) {
                return !(!e || !t) && (e === t || (!e || 3 !== e.nodeType) && (t && 3 === t.nodeType ? gr(e, t.parentNode) : "contains"in e ? e.contains(t) : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t))))
            }
            function mr() {
                for (var e = window, t = Z(); t instanceof e.HTMLIFrameElement; ) {
                    try {
                        var n = "string" === typeof t.contentWindow.location.href
                    } catch (r) {
                        n = !1
                    }
                    if (!n)
                        break;
                    t = Z((e = t.contentWindow).document)
                }
                return t
            }
            function vr(e) {
                var t = e && e.nodeName && e.nodeName.toLowerCase();
                return t && ("input" === t && ("text" === e.type || "search" === e.type || "tel" === e.type || "url" === e.type || "password" === e.type) || "textarea" === t || "true" === e.contentEditable)
            }
            var yr = d && "documentMode"in document && 11 >= document.documentMode
              , br = null
              , wr = null
              , xr = null
              , kr = !1;
            function _r(e, t, n) {
                var r = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
                kr || null == br || br !== Z(r) || ("selectionStart"in (r = br) && vr(r) ? r = {
                    start: r.selectionStart,
                    end: r.selectionEnd
                } : r = {
                    anchorNode: (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection()).anchorNode,
                    anchorOffset: r.anchorOffset,
                    focusNode: r.focusNode,
                    focusOffset: r.focusOffset
                },
                xr && fr(xr, r) || (xr = r,
                0 < (r = Ir(wr, "onSelect")).length && (t = new pn("onSelect","select",null,t,n),
                e.push({
                    event: t,
                    listeners: r
                }),
                t.target = br)))
            }
            Rt("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0),
            Rt("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1),
            Rt(Dt, 2);
            for (var Cr = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), Sr = 0; Sr < Cr.length; Sr++)
                Tt.set(Cr[Sr], 0);
            c("onMouseEnter", ["mouseout", "mouseover"]),
            c("onMouseLeave", ["mouseout", "mouseover"]),
            c("onPointerEnter", ["pointerout", "pointerover"]),
            c("onPointerLeave", ["pointerout", "pointerover"]),
            u("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
            u("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
            u("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
            u("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
            u("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
            u("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
            var jr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
              , Or = new Set("cancel close invalid load scroll toggle".split(" ").concat(jr));
            function Er(e, t, n) {
                var r = e.type || "unknown-event";
                e.currentTarget = n,
                function(e, t, n, r, a, o, l, s, u) {
                    if (Qe.apply(this, arguments),
                    Be) {
                        if (!Be)
                            throw Error(i(198));
                        var c = $e;
                        Be = !1,
                        $e = null,
                        Ye || (Ye = !0,
                        We = c)
                    }
                }(r, t, void 0, e),
                e.currentTarget = null
            }
            function Pr(e, t) {
                t = 0 !== (4 & t);
                for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                      , a = r.event;
                    r = r.listeners;
                    e: {
                        var o = void 0;
                        if (t)
                            for (var i = r.length - 1; 0 <= i; i--) {
                                var l = r[i]
                                  , s = l.instance
                                  , u = l.currentTarget;
                                if (l = l.listener,
                                s !== o && a.isPropagationStopped())
                                    break e;
                                Er(a, l, u),
                                o = s
                            }
                        else
                            for (i = 0; i < r.length; i++) {
                                if (s = (l = r[i]).instance,
                                u = l.currentTarget,
                                l = l.listener,
                                s !== o && a.isPropagationStopped())
                                    break e;
                                Er(a, l, u),
                                o = s
                            }
                    }
                }
                if (Ye)
                    throw e = We,
                    Ye = !1,
                    We = null,
                    e
            }
            function Nr(e, t) {
                var n = ia(t)
                  , r = e + "__bubble";
                n.has(r) || (Dr(t, e, 2, !1),
                n.add(r))
            }
            var Lr = "_reactListening" + Math.random().toString(36).slice(2);
            function Mr(e) {
                e[Lr] || (e[Lr] = !0,
                l.forEach((function(t) {
                    Or.has(t) || Tr(t, !1, e, null),
                    Tr(t, !0, e, null)
                }
                )))
            }
            function Tr(e, t, n, r) {
                var a = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0
                  , o = n;
                if ("selectionchange" === e && 9 !== n.nodeType && (o = n.ownerDocument),
                null !== r && !t && Or.has(e)) {
                    if ("scroll" !== e)
                        return;
                    a |= 2,
                    o = r
                }
                var i = ia(o)
                  , l = e + "__" + (t ? "capture" : "bubble");
                i.has(l) || (t && (a |= 4),
                Dr(o, e, a, t),
                i.add(l))
            }
            function Dr(e, t, n, r) {
                var a = Tt.get(t);
                switch (void 0 === a ? 2 : a) {
                case 0:
                    a = Kt;
                    break;
                case 1:
                    a = Jt;
                    break;
                default:
                    a = Zt
                }
                n = a.bind(null, t, n, e),
                a = void 0,
                !qe || "touchstart" !== t && "touchmove" !== t && "wheel" !== t || (a = !0),
                r ? void 0 !== a ? e.addEventListener(t, n, {
                    capture: !0,
                    passive: a
                }) : e.addEventListener(t, n, !0) : void 0 !== a ? e.addEventListener(t, n, {
                    passive: a
                }) : e.addEventListener(t, n, !1)
            }
            function Rr(e, t, n, r, a) {
                var o = r;
                if (0 === (1 & t) && 0 === (2 & t) && null !== r)
                    e: for (; ; ) {
                        if (null === r)
                            return;
                        var i = r.tag;
                        if (3 === i || 4 === i) {
                            var l = r.stateNode.containerInfo;
                            if (l === a || 8 === l.nodeType && l.parentNode === a)
                                break;
                            if (4 === i)
                                for (i = r.return; null !== i; ) {
                                    var s = i.tag;
                                    if ((3 === s || 4 === s) && ((s = i.stateNode.containerInfo) === a || 8 === s.nodeType && s.parentNode === a))
                                        return;
                                    i = i.return
                                }
                            for (; null !== l; ) {
                                if (null === (i = na(l)))
                                    return;
                                if (5 === (s = i.tag) || 6 === s) {
                                    r = o = i;
                                    continue e
                                }
                                l = l.parentNode
                            }
                        }
                        r = r.return
                    }
                !function(e, t, n) {
                    if (Ae)
                        return e(t, n);
                    Ae = !0;
                    try {
                        ze(e, t, n)
                    } finally {
                        Ae = !1,
                        Fe()
                    }
                }((function() {
                    var r = o
                      , a = je(n)
                      , i = [];
                    e: {
                        var l = Mt.get(e);
                        if (void 0 !== l) {
                            var s = pn
                              , u = e;
                            switch (e) {
                            case "keypress":
                                if (0 === an(n))
                                    break e;
                            case "keydown":
                            case "keyup":
                                s = Nn;
                                break;
                            case "focusin":
                                u = "focus",
                                s = bn;
                                break;
                            case "focusout":
                                u = "blur",
                                s = bn;
                                break;
                            case "beforeblur":
                            case "afterblur":
                                s = bn;
                                break;
                            case "click":
                                if (2 === n.button)
                                    break e;
                            case "auxclick":
                            case "dblclick":
                            case "mousedown":
                            case "mousemove":
                            case "mouseup":
                            case "mouseout":
                            case "mouseover":
                            case "contextmenu":
                                s = vn;
                                break;
                            case "drag":
                            case "dragend":
                            case "dragenter":
                            case "dragexit":
                            case "dragleave":
                            case "dragover":
                            case "dragstart":
                            case "drop":
                                s = yn;
                                break;
                            case "touchcancel":
                            case "touchend":
                            case "touchmove":
                            case "touchstart":
                                s = Mn;
                                break;
                            case Et:
                            case Pt:
                            case Nt:
                                s = wn;
                                break;
                            case Lt:
                                s = Tn;
                                break;
                            case "scroll":
                                s = gn;
                                break;
                            case "wheel":
                                s = Rn;
                                break;
                            case "copy":
                            case "cut":
                            case "paste":
                                s = kn;
                                break;
                            case "gotpointercapture":
                            case "lostpointercapture":
                            case "pointercancel":
                            case "pointerdown":
                            case "pointermove":
                            case "pointerout":
                            case "pointerover":
                            case "pointerup":
                                s = Ln
                            }
                            var c = 0 !== (4 & t)
                              , d = !c && "scroll" === e
                              , f = c ? null !== l ? l + "Capture" : null : l;
                            c = [];
                            for (var p, h = r; null !== h; ) {
                                var g = (p = h).stateNode;
                                if (5 === p.tag && null !== g && (p = g,
                                null !== f && (null != (g = Ue(h, f)) && c.push(zr(h, g, p)))),
                                d)
                                    break;
                                h = h.return
                            }
                            0 < c.length && (l = new s(l,u,null,n,a),
                            i.push({
                                event: l,
                                listeners: c
                            }))
                        }
                    }
                    if (0 === (7 & t)) {
                        if (s = "mouseout" === e || "pointerout" === e,
                        (!(l = "mouseover" === e || "pointerover" === e) || 0 !== (16 & t) || !(u = n.relatedTarget || n.fromElement) || !na(u) && !u[ea]) && (s || l) && (l = a.window === a ? a : (l = a.ownerDocument) ? l.defaultView || l.parentWindow : window,
                        s ? (s = r,
                        null !== (u = (u = n.relatedTarget || n.toElement) ? na(u) : null) && (u !== (d = Ke(u)) || 5 !== u.tag && 6 !== u.tag) && (u = null)) : (s = null,
                        u = r),
                        s !== u)) {
                            if (c = vn,
                            g = "onMouseLeave",
                            f = "onMouseEnter",
                            h = "mouse",
                            "pointerout" !== e && "pointerover" !== e || (c = Ln,
                            g = "onPointerLeave",
                            f = "onPointerEnter",
                            h = "pointer"),
                            d = null == s ? l : aa(s),
                            p = null == u ? l : aa(u),
                            (l = new c(g,h + "leave",s,n,a)).target = d,
                            l.relatedTarget = p,
                            g = null,
                            na(a) === r && ((c = new c(f,h + "enter",u,n,a)).target = p,
                            c.relatedTarget = d,
                            g = c),
                            d = g,
                            s && u)
                                e: {
                                    for (f = u,
                                    h = 0,
                                    p = c = s; p; p = Ar(p))
                                        h++;
                                    for (p = 0,
                                    g = f; g; g = Ar(g))
                                        p++;
                                    for (; 0 < h - p; )
                                        c = Ar(c),
                                        h--;
                                    for (; 0 < p - h; )
                                        f = Ar(f),
                                        p--;
                                    for (; h--; ) {
                                        if (c === f || null !== f && c === f.alternate)
                                            break e;
                                        c = Ar(c),
                                        f = Ar(f)
                                    }
                                    c = null
                                }
                            else
                                c = null;
                            null !== s && Fr(i, l, s, c, !1),
                            null !== u && null !== d && Fr(i, d, u, c, !0)
                        }
                        if ("select" === (s = (l = r ? aa(r) : window).nodeName && l.nodeName.toLowerCase()) || "input" === s && "file" === l.type)
                            var m = Xn;
                        else if (Wn(l))
                            if (er)
                                m = ur;
                            else {
                                m = lr;
                                var v = ir
                            }
                        else
                            (s = l.nodeName) && "input" === s.toLowerCase() && ("checkbox" === l.type || "radio" === l.type) && (m = sr);
                        switch (m && (m = m(e, r)) ? Gn(i, m, n, a) : (v && v(e, l, r),
                        "focusout" === e && (v = l._wrapperState) && v.controlled && "number" === l.type && ae(l, "number", l.value)),
                        v = r ? aa(r) : window,
                        e) {
                        case "focusin":
                            (Wn(v) || "true" === v.contentEditable) && (br = v,
                            wr = r,
                            xr = null);
                            break;
                        case "focusout":
                            xr = wr = br = null;
                            break;
                        case "mousedown":
                            kr = !0;
                            break;
                        case "contextmenu":
                        case "mouseup":
                        case "dragend":
                            kr = !1,
                            _r(i, n, a);
                            break;
                        case "selectionchange":
                            if (yr)
                                break;
                        case "keydown":
                        case "keyup":
                            _r(i, n, a)
                        }
                        var y;
                        if (In)
                            e: {
                                switch (e) {
                                case "compositionstart":
                                    var b = "onCompositionStart";
                                    break e;
                                case "compositionend":
                                    b = "onCompositionEnd";
                                    break e;
                                case "compositionupdate":
                                    b = "onCompositionUpdate";
                                    break e
                                }
                                b = void 0
                            }
                        else
                            $n ? Hn(e, n) && (b = "onCompositionEnd") : "keydown" === e && 229 === n.keyCode && (b = "onCompositionStart");
                        b && (Un && "ko" !== n.locale && ($n || "onCompositionStart" !== b ? "onCompositionEnd" === b && $n && (y = rn()) : (tn = "value"in (en = a) ? en.value : en.textContent,
                        $n = !0)),
                        0 < (v = Ir(r, b)).length && (b = new _n(b,e,null,n,a),
                        i.push({
                            event: b,
                            listeners: v
                        }),
                        y ? b.data = y : null !== (y = Bn(n)) && (b.data = y))),
                        (y = Fn ? function(e, t) {
                            switch (e) {
                            case "compositionend":
                                return Bn(t);
                            case "keypress":
                                return 32 !== t.which ? null : (Vn = !0,
                                qn);
                            case "textInput":
                                return (e = t.data) === qn && Vn ? null : e;
                            default:
                                return null
                            }
                        }(e, n) : function(e, t) {
                            if ($n)
                                return "compositionend" === e || !In && Hn(e, t) ? (e = rn(),
                                nn = tn = en = null,
                                $n = !1,
                                e) : null;
                            switch (e) {
                            case "paste":
                            default:
                                return null;
                            case "keypress":
                                if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                                    if (t.char && 1 < t.char.length)
                                        return t.char;
                                    if (t.which)
                                        return String.fromCharCode(t.which)
                                }
                                return null;
                            case "compositionend":
                                return Un && "ko" !== t.locale ? null : t.data
                            }
                        }(e, n)) && (0 < (r = Ir(r, "onBeforeInput")).length && (a = new _n("onBeforeInput","beforeinput",null,n,a),
                        i.push({
                            event: a,
                            listeners: r
                        }),
                        a.data = y))
                    }
                    Pr(i, t)
                }
                ))
            }
            function zr(e, t, n) {
                return {
                    instance: e,
                    listener: t,
                    currentTarget: n
                }
            }
            function Ir(e, t) {
                for (var n = t + "Capture", r = []; null !== e; ) {
                    var a = e
                      , o = a.stateNode;
                    5 === a.tag && null !== o && (a = o,
                    null != (o = Ue(e, n)) && r.unshift(zr(e, o, a)),
                    null != (o = Ue(e, t)) && r.push(zr(e, o, a))),
                    e = e.return
                }
                return r
            }
            function Ar(e) {
                if (null === e)
                    return null;
                do {
                    e = e.return
                } while (e && 5 !== e.tag);
                return e || null
            }
            function Fr(e, t, n, r, a) {
                for (var o = t._reactName, i = []; null !== n && n !== r; ) {
                    var l = n
                      , s = l.alternate
                      , u = l.stateNode;
                    if (null !== s && s === r)
                        break;
                    5 === l.tag && null !== u && (l = u,
                    a ? null != (s = Ue(n, o)) && i.unshift(zr(n, s, l)) : a || null != (s = Ue(n, o)) && i.push(zr(n, s, l))),
                    n = n.return
                }
                0 !== i.length && e.push({
                    event: t,
                    listeners: i
                })
            }
            function Ur() {}
            var qr = null
              , Vr = null;
            function Hr(e, t) {
                switch (e) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                    return !!t.autoFocus
                }
                return !1
            }
            function Br(e, t) {
                return "textarea" === e || "option" === e || "noscript" === e || "string" === typeof t.children || "number" === typeof t.children || "object" === typeof t.dangerouslySetInnerHTML && null !== t.dangerouslySetInnerHTML && null != t.dangerouslySetInnerHTML.__html
            }
            var $r = "function" === typeof setTimeout ? setTimeout : void 0
              , Yr = "function" === typeof clearTimeout ? clearTimeout : void 0;
            function Wr(e) {
                1 === e.nodeType ? e.textContent = "" : 9 === e.nodeType && (null != (e = e.body) && (e.textContent = ""))
            }
            function Gr(e) {
                for (; null != e; e = e.nextSibling) {
                    var t = e.nodeType;
                    if (1 === t || 3 === t)
                        break
                }
                return e
            }
            function Qr(e) {
                e = e.previousSibling;
                for (var t = 0; e; ) {
                    if (8 === e.nodeType) {
                        var n = e.data;
                        if ("$" === n || "$!" === n || "$?" === n) {
                            if (0 === t)
                                return e;
                            t--
                        } else
                            "/$" === n && t++
                    }
                    e = e.previousSibling
                }
                return null
            }
            var Kr = 0;
            var Jr = Math.random().toString(36).slice(2)
              , Zr = "__reactFiber$" + Jr
              , Xr = "__reactProps$" + Jr
              , ea = "__reactContainer$" + Jr
              , ta = "__reactEvents$" + Jr;
            function na(e) {
                var t = e[Zr];
                if (t)
                    return t;
                for (var n = e.parentNode; n; ) {
                    if (t = n[ea] || n[Zr]) {
                        if (n = t.alternate,
                        null !== t.child || null !== n && null !== n.child)
                            for (e = Qr(e); null !== e; ) {
                                if (n = e[Zr])
                                    return n;
                                e = Qr(e)
                            }
                        return t
                    }
                    n = (e = n).parentNode
                }
                return null
            }
            function ra(e) {
                return !(e = e[Zr] || e[ea]) || 5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag ? null : e
            }
            function aa(e) {
                if (5 === e.tag || 6 === e.tag)
                    return e.stateNode;
                throw Error(i(33))
            }
            function oa(e) {
                return e[Xr] || null
            }
            function ia(e) {
                var t = e[ta];
                return void 0 === t && (t = e[ta] = new Set),
                t
            }
            var la = []
              , sa = -1;
            function ua(e) {
                return {
                    current: e
                }
            }
            function ca(e) {
                0 > sa || (e.current = la[sa],
                la[sa] = null,
                sa--)
            }
            function da(e, t) {
                sa++,
                la[sa] = e.current,
                e.current = t
            }
            var fa = {}
              , pa = ua(fa)
              , ha = ua(!1)
              , ga = fa;
            function ma(e, t) {
                var n = e.type.contextTypes;
                if (!n)
                    return fa;
                var r = e.stateNode;
                if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
                    return r.__reactInternalMemoizedMaskedChildContext;
                var a, o = {};
                for (a in n)
                    o[a] = t[a];
                return r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t,
                e.__reactInternalMemoizedMaskedChildContext = o),
                o
            }
            function va(e) {
                return null !== (e = e.childContextTypes) && void 0 !== e
            }
            function ya() {
                ca(ha),
                ca(pa)
            }
            function ba(e, t, n) {
                if (pa.current !== fa)
                    throw Error(i(168));
                da(pa, t),
                da(ha, n)
            }
            function wa(e, t, n) {
                var r = e.stateNode;
                if (e = t.childContextTypes,
                "function" !== typeof r.getChildContext)
                    return n;
                for (var o in r = r.getChildContext())
                    if (!(o in e))
                        throw Error(i(108, W(t) || "Unknown", o));
                return a({}, n, r)
            }
            function xa(e) {
                return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || fa,
                ga = pa.current,
                da(pa, e),
                da(ha, ha.current),
                !0
            }
            function ka(e, t, n) {
                var r = e.stateNode;
                if (!r)
                    throw Error(i(169));
                n ? (e = wa(e, t, ga),
                r.__reactInternalMemoizedMergedChildContext = e,
                ca(ha),
                ca(pa),
                da(pa, e)) : ca(ha),
                da(ha, n)
            }
            var _a = null
              , Ca = null
              , Sa = o.unstable_runWithPriority
              , ja = o.unstable_scheduleCallback
              , Oa = o.unstable_cancelCallback
              , Ea = o.unstable_shouldYield
              , Pa = o.unstable_requestPaint
              , Na = o.unstable_now
              , La = o.unstable_getCurrentPriorityLevel
              , Ma = o.unstable_ImmediatePriority
              , Ta = o.unstable_UserBlockingPriority
              , Da = o.unstable_NormalPriority
              , Ra = o.unstable_LowPriority
              , za = o.unstable_IdlePriority
              , Ia = {}
              , Aa = void 0 !== Pa ? Pa : function() {}
              , Fa = null
              , Ua = null
              , qa = !1
              , Va = Na()
              , Ha = 1e4 > Va ? Na : function() {
                return Na() - Va
            }
            ;
            function Ba() {
                switch (La()) {
                case Ma:
                    return 99;
                case Ta:
                    return 98;
                case Da:
                    return 97;
                case Ra:
                    return 96;
                case za:
                    return 95;
                default:
                    throw Error(i(332))
                }
            }
            function $a(e) {
                switch (e) {
                case 99:
                    return Ma;
                case 98:
                    return Ta;
                case 97:
                    return Da;
                case 96:
                    return Ra;
                case 95:
                    return za;
                default:
                    throw Error(i(332))
                }
            }
            function Ya(e, t) {
                return e = $a(e),
                Sa(e, t)
            }
            function Wa(e, t, n) {
                return e = $a(e),
                ja(e, t, n)
            }
            function Ga() {
                if (null !== Ua) {
                    var e = Ua;
                    Ua = null,
                    Oa(e)
                }
                Qa()
            }
            function Qa() {
                if (!qa && null !== Fa) {
                    qa = !0;
                    var e = 0;
                    try {
                        var t = Fa;
                        Ya(99, (function() {
                            for (; e < t.length; e++) {
                                var n = t[e];
                                do {
                                    n = n(!0)
                                } while (null !== n)
                            }
                        }
                        )),
                        Fa = null
                    } catch (n) {
                        throw null !== Fa && (Fa = Fa.slice(e + 1)),
                        ja(Ma, Ga),
                        n
                    } finally {
                        qa = !1
                    }
                }
            }
            var Ka = x.ReactCurrentBatchConfig;
            function Ja(e, t) {
                if (e && e.defaultProps) {
                    for (var n in t = a({}, t),
                    e = e.defaultProps)
                        void 0 === t[n] && (t[n] = e[n]);
                    return t
                }
                return t
            }
            var Za = ua(null)
              , Xa = null
              , eo = null
              , to = null;
            function no() {
                to = eo = Xa = null
            }
            function ro(e) {
                var t = Za.current;
                ca(Za),
                e.type._context._currentValue = t
            }
            function ao(e, t) {
                for (; null !== e; ) {
                    var n = e.alternate;
                    if ((e.childLanes & t) === t) {
                        if (null === n || (n.childLanes & t) === t)
                            break;
                        n.childLanes |= t
                    } else
                        e.childLanes |= t,
                        null !== n && (n.childLanes |= t);
                    e = e.return
                }
            }
            function oo(e, t) {
                Xa = e,
                to = eo = null,
                null !== (e = e.dependencies) && null !== e.firstContext && (0 !== (e.lanes & t) && (Ii = !0),
                e.firstContext = null)
            }
            function io(e, t) {
                if (to !== e && !1 !== t && 0 !== t)
                    if ("number" === typeof t && 1073741823 !== t || (to = e,
                    t = 1073741823),
                    t = {
                        context: e,
                        observedBits: t,
                        next: null
                    },
                    null === eo) {
                        if (null === Xa)
                            throw Error(i(308));
                        eo = t,
                        Xa.dependencies = {
                            lanes: 0,
                            firstContext: t,
                            responders: null
                        }
                    } else
                        eo = eo.next = t;
                return e._currentValue
            }
            var lo = !1;
            function so(e) {
                e.updateQueue = {
                    baseState: e.memoizedState,
                    firstBaseUpdate: null,
                    lastBaseUpdate: null,
                    shared: {
                        pending: null
                    },
                    effects: null
                }
            }
            function uo(e, t) {
                e = e.updateQueue,
                t.updateQueue === e && (t.updateQueue = {
                    baseState: e.baseState,
                    firstBaseUpdate: e.firstBaseUpdate,
                    lastBaseUpdate: e.lastBaseUpdate,
                    shared: e.shared,
                    effects: e.effects
                })
            }
            function co(e, t) {
                return {
                    eventTime: e,
                    lane: t,
                    tag: 0,
                    payload: null,
                    callback: null,
                    next: null
                }
            }
            function fo(e, t) {
                if (null !== (e = e.updateQueue)) {
                    var n = (e = e.shared).pending;
                    null === n ? t.next = t : (t.next = n.next,
                    n.next = t),
                    e.pending = t
                }
            }
            function po(e, t) {
                var n = e.updateQueue
                  , r = e.alternate;
                if (null !== r && n === (r = r.updateQueue)) {
                    var a = null
                      , o = null;
                    if (null !== (n = n.firstBaseUpdate)) {
                        do {
                            var i = {
                                eventTime: n.eventTime,
                                lane: n.lane,
                                tag: n.tag,
                                payload: n.payload,
                                callback: n.callback,
                                next: null
                            };
                            null === o ? a = o = i : o = o.next = i,
                            n = n.next
                        } while (null !== n);
                        null === o ? a = o = t : o = o.next = t
                    } else
                        a = o = t;
                    return n = {
                        baseState: r.baseState,
                        firstBaseUpdate: a,
                        lastBaseUpdate: o,
                        shared: r.shared,
                        effects: r.effects
                    },
                    void (e.updateQueue = n)
                }
                null === (e = n.lastBaseUpdate) ? n.firstBaseUpdate = t : e.next = t,
                n.lastBaseUpdate = t
            }
            function ho(e, t, n, r) {
                var o = e.updateQueue;
                lo = !1;
                var i = o.firstBaseUpdate
                  , l = o.lastBaseUpdate
                  , s = o.shared.pending;
                if (null !== s) {
                    o.shared.pending = null;
                    var u = s
                      , c = u.next;
                    u.next = null,
                    null === l ? i = c : l.next = c,
                    l = u;
                    var d = e.alternate;
                    if (null !== d) {
                        var f = (d = d.updateQueue).lastBaseUpdate;
                        f !== l && (null === f ? d.firstBaseUpdate = c : f.next = c,
                        d.lastBaseUpdate = u)
                    }
                }
                if (null !== i) {
                    for (f = o.baseState,
                    l = 0,
                    d = c = u = null; ; ) {
                        s = i.lane;
                        var p = i.eventTime;
                        if ((r & s) === s) {
                            null !== d && (d = d.next = {
                                eventTime: p,
                                lane: 0,
                                tag: i.tag,
                                payload: i.payload,
                                callback: i.callback,
                                next: null
                            });
                            e: {
                                var h = e
                                  , g = i;
                                switch (s = t,
                                p = n,
                                g.tag) {
                                case 1:
                                    if ("function" === typeof (h = g.payload)) {
                                        f = h.call(p, f, s);
                                        break e
                                    }
                                    f = h;
                                    break e;
                                case 3:
                                    h.flags = -4097 & h.flags | 64;
                                case 0:
                                    if (null === (s = "function" === typeof (h = g.payload) ? h.call(p, f, s) : h) || void 0 === s)
                                        break e;
                                    f = a({}, f, s);
                                    break e;
                                case 2:
                                    lo = !0
                                }
                            }
                            null !== i.callback && (e.flags |= 32,
                            null === (s = o.effects) ? o.effects = [i] : s.push(i))
                        } else
                            p = {
                                eventTime: p,
                                lane: s,
                                tag: i.tag,
                                payload: i.payload,
                                callback: i.callback,
                                next: null
                            },
                            null === d ? (c = d = p,
                            u = f) : d = d.next = p,
                            l |= s;
                        if (null === (i = i.next)) {
                            if (null === (s = o.shared.pending))
                                break;
                            i = s.next,
                            s.next = null,
                            o.lastBaseUpdate = s,
                            o.shared.pending = null
                        }
                    }
                    null === d && (u = f),
                    o.baseState = u,
                    o.firstBaseUpdate = c,
                    o.lastBaseUpdate = d,
                    ql |= l,
                    e.lanes = l,
                    e.memoizedState = f
                }
            }
            function go(e, t, n) {
                if (e = t.effects,
                t.effects = null,
                null !== e)
                    for (t = 0; t < e.length; t++) {
                        var r = e[t]
                          , a = r.callback;
                        if (null !== a) {
                            if (r.callback = null,
                            r = n,
                            "function" !== typeof a)
                                throw Error(i(191, a));
                            a.call(r)
                        }
                    }
            }
            var mo = (new r.Component).refs;
            function vo(e, t, n, r) {
                n = null === (n = n(r, t = e.memoizedState)) || void 0 === n ? t : a({}, t, n),
                e.memoizedState = n,
                0 === e.lanes && (e.updateQueue.baseState = n)
            }
            var yo = {
                isMounted: function(e) {
                    return !!(e = e._reactInternals) && Ke(e) === e
                },
                enqueueSetState: function(e, t, n) {
                    e = e._reactInternals;
                    var r = fs()
                      , a = ps(e)
                      , o = co(r, a);
                    o.payload = t,
                    void 0 !== n && null !== n && (o.callback = n),
                    fo(e, o),
                    hs(e, a, r)
                },
                enqueueReplaceState: function(e, t, n) {
                    e = e._reactInternals;
                    var r = fs()
                      , a = ps(e)
                      , o = co(r, a);
                    o.tag = 1,
                    o.payload = t,
                    void 0 !== n && null !== n && (o.callback = n),
                    fo(e, o),
                    hs(e, a, r)
                },
                enqueueForceUpdate: function(e, t) {
                    e = e._reactInternals;
                    var n = fs()
                      , r = ps(e)
                      , a = co(n, r);
                    a.tag = 2,
                    void 0 !== t && null !== t && (a.callback = t),
                    fo(e, a),
                    hs(e, r, n)
                }
            };
            function bo(e, t, n, r, a, o, i) {
                return "function" === typeof (e = e.stateNode).shouldComponentUpdate ? e.shouldComponentUpdate(r, o, i) : !t.prototype || !t.prototype.isPureReactComponent || (!fr(n, r) || !fr(a, o))
            }
            function wo(e, t, n) {
                var r = !1
                  , a = fa
                  , o = t.contextType;
                return "object" === typeof o && null !== o ? o = io(o) : (a = va(t) ? ga : pa.current,
                o = (r = null !== (r = t.contextTypes) && void 0 !== r) ? ma(e, a) : fa),
                t = new t(n,o),
                e.memoizedState = null !== t.state && void 0 !== t.state ? t.state : null,
                t.updater = yo,
                e.stateNode = t,
                t._reactInternals = e,
                r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = a,
                e.__reactInternalMemoizedMaskedChildContext = o),
                t
            }
            function xo(e, t, n, r) {
                e = t.state,
                "function" === typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r),
                "function" === typeof t.UNSAFE_componentWillReceiveProps && t.UNSAFE_componentWillReceiveProps(n, r),
                t.state !== e && yo.enqueueReplaceState(t, t.state, null)
            }
            function ko(e, t, n, r) {
                var a = e.stateNode;
                a.props = n,
                a.state = e.memoizedState,
                a.refs = mo,
                so(e);
                var o = t.contextType;
                "object" === typeof o && null !== o ? a.context = io(o) : (o = va(t) ? ga : pa.current,
                a.context = ma(e, o)),
                ho(e, n, a, r),
                a.state = e.memoizedState,
                "function" === typeof (o = t.getDerivedStateFromProps) && (vo(e, t, o, n),
                a.state = e.memoizedState),
                "function" === typeof t.getDerivedStateFromProps || "function" === typeof a.getSnapshotBeforeUpdate || "function" !== typeof a.UNSAFE_componentWillMount && "function" !== typeof a.componentWillMount || (t = a.state,
                "function" === typeof a.componentWillMount && a.componentWillMount(),
                "function" === typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(),
                t !== a.state && yo.enqueueReplaceState(a, a.state, null),
                ho(e, n, a, r),
                a.state = e.memoizedState),
                "function" === typeof a.componentDidMount && (e.flags |= 4)
            }
            var _o = Array.isArray;
            function Co(e, t, n) {
                if (null !== (e = n.ref) && "function" !== typeof e && "object" !== typeof e) {
                    if (n._owner) {
                        if (n = n._owner) {
                            if (1 !== n.tag)
                                throw Error(i(309));
                            var r = n.stateNode
                        }
                        if (!r)
                            throw Error(i(147, e));
                        var a = "" + e;
                        return null !== t && null !== t.ref && "function" === typeof t.ref && t.ref._stringRef === a ? t.ref : (t = function(e) {
                            var t = r.refs;
                            t === mo && (t = r.refs = {}),
                            null === e ? delete t[a] : t[a] = e
                        }
                        ,
                        t._stringRef = a,
                        t)
                    }
                    if ("string" !== typeof e)
                        throw Error(i(284));
                    if (!n._owner)
                        throw Error(i(290, e))
                }
                return e
            }
            function So(e, t) {
                if ("textarea" !== e.type)
                    throw Error(i(31, "[object Object]" === Object.prototype.toString.call(t) ? "object with keys {" + Object.keys(t).join(", ") + "}" : t))
            }
            function jo(e) {
                function t(t, n) {
                    if (e) {
                        var r = t.lastEffect;
                        null !== r ? (r.nextEffect = n,
                        t.lastEffect = n) : t.firstEffect = t.lastEffect = n,
                        n.nextEffect = null,
                        n.flags = 8
                    }
                }
                function n(n, r) {
                    if (!e)
                        return null;
                    for (; null !== r; )
                        t(n, r),
                        r = r.sibling;
                    return null
                }
                function r(e, t) {
                    for (e = new Map; null !== t; )
                        null !== t.key ? e.set(t.key, t) : e.set(t.index, t),
                        t = t.sibling;
                    return e
                }
                function a(e, t) {
                    return (e = Ys(e, t)).index = 0,
                    e.sibling = null,
                    e
                }
                function o(t, n, r) {
                    return t.index = r,
                    e ? null !== (r = t.alternate) ? (r = r.index) < n ? (t.flags = 2,
                    n) : r : (t.flags = 2,
                    n) : n
                }
                function l(t) {
                    return e && null === t.alternate && (t.flags = 2),
                    t
                }
                function s(e, t, n, r) {
                    return null === t || 6 !== t.tag ? ((t = Ks(n, e.mode, r)).return = e,
                    t) : ((t = a(t, n)).return = e,
                    t)
                }
                function u(e, t, n, r) {
                    return null !== t && t.elementType === n.type ? ((r = a(t, n.props)).ref = Co(e, t, n),
                    r.return = e,
                    r) : ((r = Ws(n.type, n.key, n.props, null, e.mode, r)).ref = Co(e, t, n),
                    r.return = e,
                    r)
                }
                function c(e, t, n, r) {
                    return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? ((t = Js(n, e.mode, r)).return = e,
                    t) : ((t = a(t, n.children || [])).return = e,
                    t)
                }
                function d(e, t, n, r, o) {
                    return null === t || 7 !== t.tag ? ((t = Gs(n, e.mode, r, o)).return = e,
                    t) : ((t = a(t, n)).return = e,
                    t)
                }
                function f(e, t, n) {
                    if ("string" === typeof t || "number" === typeof t)
                        return (t = Ks("" + t, e.mode, n)).return = e,
                        t;
                    if ("object" === typeof t && null !== t) {
                        switch (t.$$typeof) {
                        case k:
                            return (n = Ws(t.type, t.key, t.props, null, e.mode, n)).ref = Co(e, null, t),
                            n.return = e,
                            n;
                        case _:
                            return (t = Js(t, e.mode, n)).return = e,
                            t
                        }
                        if (_o(t) || V(t))
                            return (t = Gs(t, e.mode, n, null)).return = e,
                            t;
                        So(e, t)
                    }
                    return null
                }
                function p(e, t, n, r) {
                    var a = null !== t ? t.key : null;
                    if ("string" === typeof n || "number" === typeof n)
                        return null !== a ? null : s(e, t, "" + n, r);
                    if ("object" === typeof n && null !== n) {
                        switch (n.$$typeof) {
                        case k:
                            return n.key === a ? n.type === C ? d(e, t, n.props.children, r, a) : u(e, t, n, r) : null;
                        case _:
                            return n.key === a ? c(e, t, n, r) : null
                        }
                        if (_o(n) || V(n))
                            return null !== a ? null : d(e, t, n, r, null);
                        So(e, n)
                    }
                    return null
                }
                function h(e, t, n, r, a) {
                    if ("string" === typeof r || "number" === typeof r)
                        return s(t, e = e.get(n) || null, "" + r, a);
                    if ("object" === typeof r && null !== r) {
                        switch (r.$$typeof) {
                        case k:
                            return e = e.get(null === r.key ? n : r.key) || null,
                            r.type === C ? d(t, e, r.props.children, a, r.key) : u(t, e, r, a);
                        case _:
                            return c(t, e = e.get(null === r.key ? n : r.key) || null, r, a)
                        }
                        if (_o(r) || V(r))
                            return d(t, e = e.get(n) || null, r, a, null);
                        So(t, r)
                    }
                    return null
                }
                function g(a, i, l, s) {
                    for (var u = null, c = null, d = i, g = i = 0, m = null; null !== d && g < l.length; g++) {
                        d.index > g ? (m = d,
                        d = null) : m = d.sibling;
                        var v = p(a, d, l[g], s);
                        if (null === v) {
                            null === d && (d = m);
                            break
                        }
                        e && d && null === v.alternate && t(a, d),
                        i = o(v, i, g),
                        null === c ? u = v : c.sibling = v,
                        c = v,
                        d = m
                    }
                    if (g === l.length)
                        return n(a, d),
                        u;
                    if (null === d) {
                        for (; g < l.length; g++)
                            null !== (d = f(a, l[g], s)) && (i = o(d, i, g),
                            null === c ? u = d : c.sibling = d,
                            c = d);
                        return u
                    }
                    for (d = r(a, d); g < l.length; g++)
                        null !== (m = h(d, a, g, l[g], s)) && (e && null !== m.alternate && d.delete(null === m.key ? g : m.key),
                        i = o(m, i, g),
                        null === c ? u = m : c.sibling = m,
                        c = m);
                    return e && d.forEach((function(e) {
                        return t(a, e)
                    }
                    )),
                    u
                }
                function m(a, l, s, u) {
                    var c = V(s);
                    if ("function" !== typeof c)
                        throw Error(i(150));
                    if (null == (s = c.call(s)))
                        throw Error(i(151));
                    for (var d = c = null, g = l, m = l = 0, v = null, y = s.next(); null !== g && !y.done; m++,
                    y = s.next()) {
                        g.index > m ? (v = g,
                        g = null) : v = g.sibling;
                        var b = p(a, g, y.value, u);
                        if (null === b) {
                            null === g && (g = v);
                            break
                        }
                        e && g && null === b.alternate && t(a, g),
                        l = o(b, l, m),
                        null === d ? c = b : d.sibling = b,
                        d = b,
                        g = v
                    }
                    if (y.done)
                        return n(a, g),
                        c;
                    if (null === g) {
                        for (; !y.done; m++,
                        y = s.next())
                            null !== (y = f(a, y.value, u)) && (l = o(y, l, m),
                            null === d ? c = y : d.sibling = y,
                            d = y);
                        return c
                    }
                    for (g = r(a, g); !y.done; m++,
                    y = s.next())
                        null !== (y = h(g, a, m, y.value, u)) && (e && null !== y.alternate && g.delete(null === y.key ? m : y.key),
                        l = o(y, l, m),
                        null === d ? c = y : d.sibling = y,
                        d = y);
                    return e && g.forEach((function(e) {
                        return t(a, e)
                    }
                    )),
                    c
                }
                return function(e, r, o, s) {
                    var u = "object" === typeof o && null !== o && o.type === C && null === o.key;
                    u && (o = o.props.children);
                    var c = "object" === typeof o && null !== o;
                    if (c)
                        switch (o.$$typeof) {
                        case k:
                            e: {
                                for (c = o.key,
                                u = r; null !== u; ) {
                                    if (u.key === c) {
                                        if (7 === u.tag) {
                                            if (o.type === C) {
                                                n(e, u.sibling),
                                                (r = a(u, o.props.children)).return = e,
                                                e = r;
                                                break e
                                            }
                                        } else if (u.elementType === o.type) {
                                            n(e, u.sibling),
                                            (r = a(u, o.props)).ref = Co(e, u, o),
                                            r.return = e,
                                            e = r;
                                            break e
                                        }
                                        n(e, u);
                                        break
                                    }
                                    t(e, u),
                                    u = u.sibling
                                }
                                o.type === C ? ((r = Gs(o.props.children, e.mode, s, o.key)).return = e,
                                e = r) : ((s = Ws(o.type, o.key, o.props, null, e.mode, s)).ref = Co(e, r, o),
                                s.return = e,
                                e = s)
                            }
                            return l(e);
                        case _:
                            e: {
                                for (u = o.key; null !== r; ) {
                                    if (r.key === u) {
                                        if (4 === r.tag && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
                                            n(e, r.sibling),
                                            (r = a(r, o.children || [])).return = e,
                                            e = r;
                                            break e
                                        }
                                        n(e, r);
                                        break
                                    }
                                    t(e, r),
                                    r = r.sibling
                                }
                                (r = Js(o, e.mode, s)).return = e,
                                e = r
                            }
                            return l(e)
                        }
                    if ("string" === typeof o || "number" === typeof o)
                        return o = "" + o,
                        null !== r && 6 === r.tag ? (n(e, r.sibling),
                        (r = a(r, o)).return = e,
                        e = r) : (n(e, r),
                        (r = Ks(o, e.mode, s)).return = e,
                        e = r),
                        l(e);
                    if (_o(o))
                        return g(e, r, o, s);
                    if (V(o))
                        return m(e, r, o, s);
                    if (c && So(e, o),
                    "undefined" === typeof o && !u)
                        switch (e.tag) {
                        case 1:
                        case 22:
                        case 0:
                        case 11:
                        case 15:
                            throw Error(i(152, W(e.type) || "Component"))
                        }
                    return n(e, r)
                }
            }
            var Oo = jo(!0)
              , Eo = jo(!1)
              , Po = {}
              , No = ua(Po)
              , Lo = ua(Po)
              , Mo = ua(Po);
            function To(e) {
                if (e === Po)
                    throw Error(i(174));
                return e
            }
            function Do(e, t) {
                switch (da(Mo, t),
                da(Lo, e),
                da(No, Po),
                e = t.nodeType) {
                case 9:
                case 11:
                    t = (t = t.documentElement) ? t.namespaceURI : he(null, "");
                    break;
                default:
                    t = he(t = (e = 8 === e ? t.parentNode : t).namespaceURI || null, e = e.tagName)
                }
                ca(No),
                da(No, t)
            }
            function Ro() {
                ca(No),
                ca(Lo),
                ca(Mo)
            }
            function zo(e) {
                To(Mo.current);
                var t = To(No.current)
                  , n = he(t, e.type);
                t !== n && (da(Lo, e),
                da(No, n))
            }
            function Io(e) {
                Lo.current === e && (ca(No),
                ca(Lo))
            }
            var Ao = ua(0);
            function Fo(e) {
                for (var t = e; null !== t; ) {
                    if (13 === t.tag) {
                        var n = t.memoizedState;
                        if (null !== n && (null === (n = n.dehydrated) || "$?" === n.data || "$!" === n.data))
                            return t
                    } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
                        if (0 !== (64 & t.flags))
                            return t
                    } else if (null !== t.child) {
                        t.child.return = t,
                        t = t.child;
                        continue
                    }
                    if (t === e)
                        break;
                    for (; null === t.sibling; ) {
                        if (null === t.return || t.return === e)
                            return null;
                        t = t.return
                    }
                    t.sibling.return = t.return,
                    t = t.sibling
                }
                return null
            }
            var Uo = null
              , qo = null
              , Vo = !1;
            function Ho(e, t) {
                var n = Bs(5, null, null, 0);
                n.elementType = "DELETED",
                n.type = "DELETED",
                n.stateNode = t,
                n.return = e,
                n.flags = 8,
                null !== e.lastEffect ? (e.lastEffect.nextEffect = n,
                e.lastEffect = n) : e.firstEffect = e.lastEffect = n
            }
            function Bo(e, t) {
                switch (e.tag) {
                case 5:
                    var n = e.type;
                    return null !== (t = 1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t) && (e.stateNode = t,
                    !0);
                case 6:
                    return null !== (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) && (e.stateNode = t,
                    !0);
                default:
                    return !1
                }
            }
            function $o(e) {
                if (Vo) {
                    var t = qo;
                    if (t) {
                        var n = t;
                        if (!Bo(e, t)) {
                            if (!(t = Gr(n.nextSibling)) || !Bo(e, t))
                                return e.flags = -1025 & e.flags | 2,
                                Vo = !1,
                                void (Uo = e);
                            Ho(Uo, n)
                        }
                        Uo = e,
                        qo = Gr(t.firstChild)
                    } else
                        e.flags = -1025 & e.flags | 2,
                        Vo = !1,
                        Uo = e
                }
            }
            function Yo(e) {
                for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag; )
                    e = e.return;
                Uo = e
            }
            function Wo(e) {
                if (e !== Uo)
                    return !1;
                if (!Vo)
                    return Yo(e),
                    Vo = !0,
                    !1;
                var t = e.type;
                if (5 !== e.tag || "head" !== t && "body" !== t && !Br(t, e.memoizedProps))
                    for (t = qo; t; )
                        Ho(e, t),
                        t = Gr(t.nextSibling);
                if (Yo(e),
                13 === e.tag) {
                    if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
                        throw Error(i(317));
                    e: {
                        for (e = e.nextSibling,
                        t = 0; e; ) {
                            if (8 === e.nodeType) {
                                var n = e.data;
                                if ("/$" === n) {
                                    if (0 === t) {
                                        qo = Gr(e.nextSibling);
                                        break e
                                    }
                                    t--
                                } else
                                    "$" !== n && "$!" !== n && "$?" !== n || t++
                            }
                            e = e.nextSibling
                        }
                        qo = null
                    }
                } else
                    qo = Uo ? Gr(e.stateNode.nextSibling) : null;
                return !0
            }
            function Go() {
                qo = Uo = null,
                Vo = !1
            }
            var Qo = [];
            function Ko() {
                for (var e = 0; e < Qo.length; e++)
                    Qo[e]._workInProgressVersionPrimary = null;
                Qo.length = 0
            }
            var Jo = x.ReactCurrentDispatcher
              , Zo = x.ReactCurrentBatchConfig
              , Xo = 0
              , ei = null
              , ti = null
              , ni = null
              , ri = !1
              , ai = !1;
            function oi() {
                throw Error(i(321))
            }
            function ii(e, t) {
                if (null === t)
                    return !1;
                for (var n = 0; n < t.length && n < e.length; n++)
                    if (!cr(e[n], t[n]))
                        return !1;
                return !0
            }
            function li(e, t, n, r, a, o) {
                if (Xo = o,
                ei = t,
                t.memoizedState = null,
                t.updateQueue = null,
                t.lanes = 0,
                Jo.current = null === e || null === e.memoizedState ? Ti : Di,
                e = n(r, a),
                ai) {
                    o = 0;
                    do {
                        if (ai = !1,
                        !(25 > o))
                            throw Error(i(301));
                        o += 1,
                        ni = ti = null,
                        t.updateQueue = null,
                        Jo.current = Ri,
                        e = n(r, a)
                    } while (ai)
                }
                if (Jo.current = Mi,
                t = null !== ti && null !== ti.next,
                Xo = 0,
                ni = ti = ei = null,
                ri = !1,
                t)
                    throw Error(i(300));
                return e
            }
            function si() {
                var e = {
                    memoizedState: null,
                    baseState: null,
                    baseQueue: null,
                    queue: null,
                    next: null
                };
                return null === ni ? ei.memoizedState = ni = e : ni = ni.next = e,
                ni
            }
            function ui() {
                if (null === ti) {
                    var e = ei.alternate;
                    e = null !== e ? e.memoizedState : null
                } else
                    e = ti.next;
                var t = null === ni ? ei.memoizedState : ni.next;
                if (null !== t)
                    ni = t,
                    ti = e;
                else {
                    if (null === e)
                        throw Error(i(310));
                    e = {
                        memoizedState: (ti = e).memoizedState,
                        baseState: ti.baseState,
                        baseQueue: ti.baseQueue,
                        queue: ti.queue,
                        next: null
                    },
                    null === ni ? ei.memoizedState = ni = e : ni = ni.next = e
                }
                return ni
            }
            function ci(e, t) {
                return "function" === typeof t ? t(e) : t
            }
            function di(e) {
                var t = ui()
                  , n = t.queue;
                if (null === n)
                    throw Error(i(311));
                n.lastRenderedReducer = e;
                var r = ti
                  , a = r.baseQueue
                  , o = n.pending;
                if (null !== o) {
                    if (null !== a) {
                        var l = a.next;
                        a.next = o.next,
                        o.next = l
                    }
                    r.baseQueue = a = o,
                    n.pending = null
                }
                if (null !== a) {
                    a = a.next,
                    r = r.baseState;
                    var s = l = o = null
                      , u = a;
                    do {
                        var c = u.lane;
                        if ((Xo & c) === c)
                            null !== s && (s = s.next = {
                                lane: 0,
                                action: u.action,
                                eagerReducer: u.eagerReducer,
                                eagerState: u.eagerState,
                                next: null
                            }),
                            r = u.eagerReducer === e ? u.eagerState : e(r, u.action);
                        else {
                            var d = {
                                lane: c,
                                action: u.action,
                                eagerReducer: u.eagerReducer,
                                eagerState: u.eagerState,
                                next: null
                            };
                            null === s ? (l = s = d,
                            o = r) : s = s.next = d,
                            ei.lanes |= c,
                            ql |= c
                        }
                        u = u.next
                    } while (null !== u && u !== a);
                    null === s ? o = r : s.next = l,
                    cr(r, t.memoizedState) || (Ii = !0),
                    t.memoizedState = r,
                    t.baseState = o,
                    t.baseQueue = s,
                    n.lastRenderedState = r
                }
                return [t.memoizedState, n.dispatch]
            }
            function fi(e) {
                var t = ui()
                  , n = t.queue;
                if (null === n)
                    throw Error(i(311));
                n.lastRenderedReducer = e;
                var r = n.dispatch
                  , a = n.pending
                  , o = t.memoizedState;
                if (null !== a) {
                    n.pending = null;
                    var l = a = a.next;
                    do {
                        o = e(o, l.action),
                        l = l.next
                    } while (l !== a);
                    cr(o, t.memoizedState) || (Ii = !0),
                    t.memoizedState = o,
                    null === t.baseQueue && (t.baseState = o),
                    n.lastRenderedState = o
                }
                return [o, r]
            }
            function pi(e, t, n) {
                var r = t._getVersion;
                r = r(t._source);
                var a = t._workInProgressVersionPrimary;
                if (null !== a ? e = a === r : (e = e.mutableReadLanes,
                (e = (Xo & e) === e) && (t._workInProgressVersionPrimary = r,
                Qo.push(t))),
                e)
                    return n(t._source);
                throw Qo.push(t),
                Error(i(350))
            }
            function hi(e, t, n, r) {
                var a = Tl;
                if (null === a)
                    throw Error(i(349));
                var o = t._getVersion
                  , l = o(t._source)
                  , s = Jo.current
                  , u = s.useState((function() {
                    return pi(a, t, n)
                }
                ))
                  , c = u[1]
                  , d = u[0];
                u = ni;
                var f = e.memoizedState
                  , p = f.refs
                  , h = p.getSnapshot
                  , g = f.source;
                f = f.subscribe;
                var m = ei;
                return e.memoizedState = {
                    refs: p,
                    source: t,
                    subscribe: r
                },
                s.useEffect((function() {
                    p.getSnapshot = n,
                    p.setSnapshot = c;
                    var e = o(t._source);
                    if (!cr(l, e)) {
                        e = n(t._source),
                        cr(d, e) || (c(e),
                        e = ps(m),
                        a.mutableReadLanes |= e & a.pendingLanes),
                        e = a.mutableReadLanes,
                        a.entangledLanes |= e;
                        for (var r = a.entanglements, i = e; 0 < i; ) {
                            var s = 31 - Bt(i)
                              , u = 1 << s;
                            r[s] |= e,
                            i &= ~u
                        }
                    }
                }
                ), [n, t, r]),
                s.useEffect((function() {
                    return r(t._source, (function() {
                        var e = p.getSnapshot
                          , n = p.setSnapshot;
                        try {
                            n(e(t._source));
                            var r = ps(m);
                            a.mutableReadLanes |= r & a.pendingLanes
                        } catch (o) {
                            n((function() {
                                throw o
                            }
                            ))
                        }
                    }
                    ))
                }
                ), [t, r]),
                cr(h, n) && cr(g, t) && cr(f, r) || ((e = {
                    pending: null,
                    dispatch: null,
                    lastRenderedReducer: ci,
                    lastRenderedState: d
                }).dispatch = c = Li.bind(null, ei, e),
                u.queue = e,
                u.baseQueue = null,
                d = pi(a, t, n),
                u.memoizedState = u.baseState = d),
                d
            }
            function gi(e, t, n) {
                return hi(ui(), e, t, n)
            }
            function mi(e) {
                var t = si();
                return "function" === typeof e && (e = e()),
                t.memoizedState = t.baseState = e,
                e = (e = t.queue = {
                    pending: null,
                    dispatch: null,
                    lastRenderedReducer: ci,
                    lastRenderedState: e
                }).dispatch = Li.bind(null, ei, e),
                [t.memoizedState, e]
            }
            function vi(e, t, n, r) {
                return e = {
                    tag: e,
                    create: t,
                    destroy: n,
                    deps: r,
                    next: null
                },
                null === (t = ei.updateQueue) ? (t = {
                    lastEffect: null
                },
                ei.updateQueue = t,
                t.lastEffect = e.next = e) : null === (n = t.lastEffect) ? t.lastEffect = e.next = e : (r = n.next,
                n.next = e,
                e.next = r,
                t.lastEffect = e),
                e
            }
            function yi(e) {
                return e = {
                    current: e
                },
                si().memoizedState = e
            }
            function bi() {
                return ui().memoizedState
            }
            function wi(e, t, n, r) {
                var a = si();
                ei.flags |= e,
                a.memoizedState = vi(1 | t, n, void 0, void 0 === r ? null : r)
            }
            function xi(e, t, n, r) {
                var a = ui();
                r = void 0 === r ? null : r;
                var o = void 0;
                if (null !== ti) {
                    var i = ti.memoizedState;
                    if (o = i.destroy,
                    null !== r && ii(r, i.deps))
                        return void vi(t, n, o, r)
                }
                ei.flags |= e,
                a.memoizedState = vi(1 | t, n, o, r)
            }
            function ki(e, t) {
                return wi(516, 4, e, t)
            }
            function _i(e, t) {
                return xi(516, 4, e, t)
            }
            function Ci(e, t) {
                return xi(4, 2, e, t)
            }
            function Si(e, t) {
                return "function" === typeof t ? (e = e(),
                t(e),
                function() {
                    t(null)
                }
                ) : null !== t && void 0 !== t ? (e = e(),
                t.current = e,
                function() {
                    t.current = null
                }
                ) : void 0
            }
            function ji(e, t, n) {
                return n = null !== n && void 0 !== n ? n.concat([e]) : null,
                xi(4, 2, Si.bind(null, t, e), n)
            }
            function Oi() {}
            function Ei(e, t) {
                var n = ui();
                t = void 0 === t ? null : t;
                var r = n.memoizedState;
                return null !== r && null !== t && ii(t, r[1]) ? r[0] : (n.memoizedState = [e, t],
                e)
            }
            function Pi(e, t) {
                var n = ui();
                t = void 0 === t ? null : t;
                var r = n.memoizedState;
                return null !== r && null !== t && ii(t, r[1]) ? r[0] : (e = e(),
                n.memoizedState = [e, t],
                e)
            }
            function Ni(e, t) {
                var n = Ba();
                Ya(98 > n ? 98 : n, (function() {
                    e(!0)
                }
                )),
                Ya(97 < n ? 97 : n, (function() {
                    var n = Zo.transition;
                    Zo.transition = 1;
                    try {
                        e(!1),
                        t()
                    } finally {
                        Zo.transition = n
                    }
                }
                ))
            }
            function Li(e, t, n) {
                var r = fs()
                  , a = ps(e)
                  , o = {
                    lane: a,
                    action: n,
                    eagerReducer: null,
                    eagerState: null,
                    next: null
                }
                  , i = t.pending;
                if (null === i ? o.next = o : (o.next = i.next,
                i.next = o),
                t.pending = o,
                i = e.alternate,
                e === ei || null !== i && i === ei)
                    ai = ri = !0;
                else {
                    if (0 === e.lanes && (null === i || 0 === i.lanes) && null !== (i = t.lastRenderedReducer))
                        try {
                            var l = t.lastRenderedState
                              , s = i(l, n);
                            if (o.eagerReducer = i,
                            o.eagerState = s,
                            cr(s, l))
                                return
                        } catch (u) {}
                    hs(e, a, r)
                }
            }
            var Mi = {
                readContext: io,
                useCallback: oi,
                useContext: oi,
                useEffect: oi,
                useImperativeHandle: oi,
                useLayoutEffect: oi,
                useMemo: oi,
                useReducer: oi,
                useRef: oi,
                useState: oi,
                useDebugValue: oi,
                useDeferredValue: oi,
                useTransition: oi,
                useMutableSource: oi,
                useOpaqueIdentifier: oi,
                unstable_isNewReconciler: !1
            }
              , Ti = {
                readContext: io,
                useCallback: function(e, t) {
                    return si().memoizedState = [e, void 0 === t ? null : t],
                    e
                },
                useContext: io,
                useEffect: ki,
                useImperativeHandle: function(e, t, n) {
                    return n = null !== n && void 0 !== n ? n.concat([e]) : null,
                    wi(4, 2, Si.bind(null, t, e), n)
                },
                useLayoutEffect: function(e, t) {
                    return wi(4, 2, e, t)
                },
                useMemo: function(e, t) {
                    var n = si();
                    return t = void 0 === t ? null : t,
                    e = e(),
                    n.memoizedState = [e, t],
                    e
                },
                useReducer: function(e, t, n) {
                    var r = si();
                    return t = void 0 !== n ? n(t) : t,
                    r.memoizedState = r.baseState = t,
                    e = (e = r.queue = {
                        pending: null,
                        dispatch: null,
                        lastRenderedReducer: e,
                        lastRenderedState: t
                    }).dispatch = Li.bind(null, ei, e),
                    [r.memoizedState, e]
                },
                useRef: yi,
                useState: mi,
                useDebugValue: Oi,
                useDeferredValue: function(e) {
                    var t = mi(e)
                      , n = t[0]
                      , r = t[1];
                    return ki((function() {
                        var t = Zo.transition;
                        Zo.transition = 1;
                        try {
                            r(e)
                        } finally {
                            Zo.transition = t
                        }
                    }
                    ), [e]),
                    n
                },
                useTransition: function() {
                    var e = mi(!1)
                      , t = e[0];
                    return yi(e = Ni.bind(null, e[1])),
                    [e, t]
                },
                useMutableSource: function(e, t, n) {
                    var r = si();
                    return r.memoizedState = {
                        refs: {
                            getSnapshot: t,
                            setSnapshot: null
                        },
                        source: e,
                        subscribe: n
                    },
                    hi(r, e, t, n)
                },
                useOpaqueIdentifier: function() {
                    if (Vo) {
                        var e = !1
                          , t = function(e) {
                            return {
                                $$typeof: R,
                                toString: e,
                                valueOf: e
                            }
                        }((function() {
                            throw e || (e = !0,
                            n("r:" + (Kr++).toString(36))),
                            Error(i(355))
                        }
                        ))
                          , n = mi(t)[1];
                        return 0 === (2 & ei.mode) && (ei.flags |= 516,
                        vi(5, (function() {
                            n("r:" + (Kr++).toString(36))
                        }
                        ), void 0, null)),
                        t
                    }
                    return mi(t = "r:" + (Kr++).toString(36)),
                    t
                },
                unstable_isNewReconciler: !1
            }
              , Di = {
                readContext: io,
                useCallback: Ei,
                useContext: io,
                useEffect: _i,
                useImperativeHandle: ji,
                useLayoutEffect: Ci,
                useMemo: Pi,
                useReducer: di,
                useRef: bi,
                useState: function() {
                    return di(ci)
                },
                useDebugValue: Oi,
                useDeferredValue: function(e) {
                    var t = di(ci)
                      , n = t[0]
                      , r = t[1];
                    return _i((function() {
                        var t = Zo.transition;
                        Zo.transition = 1;
                        try {
                            r(e)
                        } finally {
                            Zo.transition = t
                        }
                    }
                    ), [e]),
                    n
                },
                useTransition: function() {
                    var e = di(ci)[0];
                    return [bi().current, e]
                },
                useMutableSource: gi,
                useOpaqueIdentifier: function() {
                    return di(ci)[0]
                },
                unstable_isNewReconciler: !1
            }
              , Ri = {
                readContext: io,
                useCallback: Ei,
                useContext: io,
                useEffect: _i,
                useImperativeHandle: ji,
                useLayoutEffect: Ci,
                useMemo: Pi,
                useReducer: fi,
                useRef: bi,
                useState: function() {
                    return fi(ci)
                },
                useDebugValue: Oi,
                useDeferredValue: function(e) {
                    var t = fi(ci)
                      , n = t[0]
                      , r = t[1];
                    return _i((function() {
                        var t = Zo.transition;
                        Zo.transition = 1;
                        try {
                            r(e)
                        } finally {
                            Zo.transition = t
                        }
                    }
                    ), [e]),
                    n
                },
                useTransition: function() {
                    var e = fi(ci)[0];
                    return [bi().current, e]
                },
                useMutableSource: gi,
                useOpaqueIdentifier: function() {
                    return fi(ci)[0]
                },
                unstable_isNewReconciler: !1
            }
              , zi = x.ReactCurrentOwner
              , Ii = !1;
            function Ai(e, t, n, r) {
                t.child = null === e ? Eo(t, null, n, r) : Oo(t, e.child, n, r)
            }
            function Fi(e, t, n, r, a) {
                n = n.render;
                var o = t.ref;
                return oo(t, a),
                r = li(e, t, n, r, o, a),
                null === e || Ii ? (t.flags |= 1,
                Ai(e, t, r, a),
                t.child) : (t.updateQueue = e.updateQueue,
                t.flags &= -517,
                e.lanes &= ~a,
                ol(e, t, a))
            }
            function Ui(e, t, n, r, a, o) {
                if (null === e) {
                    var i = n.type;
                    return "function" !== typeof i || $s(i) || void 0 !== i.defaultProps || null !== n.compare || void 0 !== n.defaultProps ? ((e = Ws(n.type, null, r, t, t.mode, o)).ref = t.ref,
                    e.return = t,
                    t.child = e) : (t.tag = 15,
                    t.type = i,
                    qi(e, t, i, r, a, o))
                }
                return i = e.child,
                0 === (a & o) && (a = i.memoizedProps,
                (n = null !== (n = n.compare) ? n : fr)(a, r) && e.ref === t.ref) ? ol(e, t, o) : (t.flags |= 1,
                (e = Ys(i, r)).ref = t.ref,
                e.return = t,
                t.child = e)
            }
            function qi(e, t, n, r, a, o) {
                if (null !== e && fr(e.memoizedProps, r) && e.ref === t.ref) {
                    if (Ii = !1,
                    0 === (o & a))
                        return t.lanes = e.lanes,
                        ol(e, t, o);
                    0 !== (16384 & e.flags) && (Ii = !0)
                }
                return Bi(e, t, n, r, o)
            }
            function Vi(e, t, n) {
                var r = t.pendingProps
                  , a = r.children
                  , o = null !== e ? e.memoizedState : null;
                if ("hidden" === r.mode || "unstable-defer-without-hiding" === r.mode)
                    if (0 === (4 & t.mode))
                        t.memoizedState = {
                            baseLanes: 0
                        },
                        ks(t, n);
                    else {
                        if (0 === (1073741824 & n))
                            return e = null !== o ? o.baseLanes | n : n,
                            t.lanes = t.childLanes = 1073741824,
                            t.memoizedState = {
                                baseLanes: e
                            },
                            ks(t, e),
                            null;
                        t.memoizedState = {
                            baseLanes: 0
                        },
                        ks(t, null !== o ? o.baseLanes : n)
                    }
                else
                    null !== o ? (r = o.baseLanes | n,
                    t.memoizedState = null) : r = n,
                    ks(t, r);
                return Ai(e, t, a, n),
                t.child
            }
            function Hi(e, t) {
                var n = t.ref;
                (null === e && null !== n || null !== e && e.ref !== n) && (t.flags |= 128)
            }
            function Bi(e, t, n, r, a) {
                var o = va(n) ? ga : pa.current;
                return o = ma(t, o),
                oo(t, a),
                n = li(e, t, n, r, o, a),
                null === e || Ii ? (t.flags |= 1,
                Ai(e, t, n, a),
                t.child) : (t.updateQueue = e.updateQueue,
                t.flags &= -517,
                e.lanes &= ~a,
                ol(e, t, a))
            }
            function $i(e, t, n, r, a) {
                if (va(n)) {
                    var o = !0;
                    xa(t)
                } else
                    o = !1;
                if (oo(t, a),
                null === t.stateNode)
                    null !== e && (e.alternate = null,
                    t.alternate = null,
                    t.flags |= 2),
                    wo(t, n, r),
                    ko(t, n, r, a),
                    r = !0;
                else if (null === e) {
                    var i = t.stateNode
                      , l = t.memoizedProps;
                    i.props = l;
                    var s = i.context
                      , u = n.contextType;
                    "object" === typeof u && null !== u ? u = io(u) : u = ma(t, u = va(n) ? ga : pa.current);
                    var c = n.getDerivedStateFromProps
                      , d = "function" === typeof c || "function" === typeof i.getSnapshotBeforeUpdate;
                    d || "function" !== typeof i.UNSAFE_componentWillReceiveProps && "function" !== typeof i.componentWillReceiveProps || (l !== r || s !== u) && xo(t, i, r, u),
                    lo = !1;
                    var f = t.memoizedState;
                    i.state = f,
                    ho(t, r, i, a),
                    s = t.memoizedState,
                    l !== r || f !== s || ha.current || lo ? ("function" === typeof c && (vo(t, n, c, r),
                    s = t.memoizedState),
                    (l = lo || bo(t, n, l, r, f, s, u)) ? (d || "function" !== typeof i.UNSAFE_componentWillMount && "function" !== typeof i.componentWillMount || ("function" === typeof i.componentWillMount && i.componentWillMount(),
                    "function" === typeof i.UNSAFE_componentWillMount && i.UNSAFE_componentWillMount()),
                    "function" === typeof i.componentDidMount && (t.flags |= 4)) : ("function" === typeof i.componentDidMount && (t.flags |= 4),
                    t.memoizedProps = r,
                    t.memoizedState = s),
                    i.props = r,
                    i.state = s,
                    i.context = u,
                    r = l) : ("function" === typeof i.componentDidMount && (t.flags |= 4),
                    r = !1)
                } else {
                    i = t.stateNode,
                    uo(e, t),
                    l = t.memoizedProps,
                    u = t.type === t.elementType ? l : Ja(t.type, l),
                    i.props = u,
                    d = t.pendingProps,
                    f = i.context,
                    "object" === typeof (s = n.contextType) && null !== s ? s = io(s) : s = ma(t, s = va(n) ? ga : pa.current);
                    var p = n.getDerivedStateFromProps;
                    (c = "function" === typeof p || "function" === typeof i.getSnapshotBeforeUpdate) || "function" !== typeof i.UNSAFE_componentWillReceiveProps && "function" !== typeof i.componentWillReceiveProps || (l !== d || f !== s) && xo(t, i, r, s),
                    lo = !1,
                    f = t.memoizedState,
                    i.state = f,
                    ho(t, r, i, a);
                    var h = t.memoizedState;
                    l !== d || f !== h || ha.current || lo ? ("function" === typeof p && (vo(t, n, p, r),
                    h = t.memoizedState),
                    (u = lo || bo(t, n, u, r, f, h, s)) ? (c || "function" !== typeof i.UNSAFE_componentWillUpdate && "function" !== typeof i.componentWillUpdate || ("function" === typeof i.componentWillUpdate && i.componentWillUpdate(r, h, s),
                    "function" === typeof i.UNSAFE_componentWillUpdate && i.UNSAFE_componentWillUpdate(r, h, s)),
                    "function" === typeof i.componentDidUpdate && (t.flags |= 4),
                    "function" === typeof i.getSnapshotBeforeUpdate && (t.flags |= 256)) : ("function" !== typeof i.componentDidUpdate || l === e.memoizedProps && f === e.memoizedState || (t.flags |= 4),
                    "function" !== typeof i.getSnapshotBeforeUpdate || l === e.memoizedProps && f === e.memoizedState || (t.flags |= 256),
                    t.memoizedProps = r,
                    t.memoizedState = h),
                    i.props = r,
                    i.state = h,
                    i.context = s,
                    r = u) : ("function" !== typeof i.componentDidUpdate || l === e.memoizedProps && f === e.memoizedState || (t.flags |= 4),
                    "function" !== typeof i.getSnapshotBeforeUpdate || l === e.memoizedProps && f === e.memoizedState || (t.flags |= 256),
                    r = !1)
                }
                return Yi(e, t, n, r, o, a)
            }
            function Yi(e, t, n, r, a, o) {
                Hi(e, t);
                var i = 0 !== (64 & t.flags);
                if (!r && !i)
                    return a && ka(t, n, !1),
                    ol(e, t, o);
                r = t.stateNode,
                zi.current = t;
                var l = i && "function" !== typeof n.getDerivedStateFromError ? null : r.render();
                return t.flags |= 1,
                null !== e && i ? (t.child = Oo(t, e.child, null, o),
                t.child = Oo(t, null, l, o)) : Ai(e, t, l, o),
                t.memoizedState = r.state,
                a && ka(t, n, !0),
                t.child
            }
            function Wi(e) {
                var t = e.stateNode;
                t.pendingContext ? ba(0, t.pendingContext, t.pendingContext !== t.context) : t.context && ba(0, t.context, !1),
                Do(e, t.containerInfo)
            }
            var Gi, Qi, Ki, Ji = {
                dehydrated: null,
                retryLane: 0
            };
            function Zi(e, t, n) {
                var r, a = t.pendingProps, o = Ao.current, i = !1;
                return (r = 0 !== (64 & t.flags)) || (r = (null === e || null !== e.memoizedState) && 0 !== (2 & o)),
                r ? (i = !0,
                t.flags &= -65) : null !== e && null === e.memoizedState || void 0 === a.fallback || !0 === a.unstable_avoidThisFallback || (o |= 1),
                da(Ao, 1 & o),
                null === e ? (void 0 !== a.fallback && $o(t),
                e = a.children,
                o = a.fallback,
                i ? (e = Xi(t, e, o, n),
                t.child.memoizedState = {
                    baseLanes: n
                },
                t.memoizedState = Ji,
                e) : "number" === typeof a.unstable_expectedLoadTime ? (e = Xi(t, e, o, n),
                t.child.memoizedState = {
                    baseLanes: n
                },
                t.memoizedState = Ji,
                t.lanes = 33554432,
                e) : ((n = Qs({
                    mode: "visible",
                    children: e
                }, t.mode, n, null)).return = t,
                t.child = n)) : (e.memoizedState,
                i ? (a = tl(e, t, a.children, a.fallback, n),
                i = t.child,
                o = e.child.memoizedState,
                i.memoizedState = null === o ? {
                    baseLanes: n
                } : {
                    baseLanes: o.baseLanes | n
                },
                i.childLanes = e.childLanes & ~n,
                t.memoizedState = Ji,
                a) : (n = el(e, t, a.children, n),
                t.memoizedState = null,
                n))
            }
            function Xi(e, t, n, r) {
                var a = e.mode
                  , o = e.child;
                return t = {
                    mode: "hidden",
                    children: t
                },
                0 === (2 & a) && null !== o ? (o.childLanes = 0,
                o.pendingProps = t) : o = Qs(t, a, 0, null),
                n = Gs(n, a, r, null),
                o.return = e,
                n.return = e,
                o.sibling = n,
                e.child = o,
                n
            }
            function el(e, t, n, r) {
                var a = e.child;
                return e = a.sibling,
                n = Ys(a, {
                    mode: "visible",
                    children: n
                }),
                0 === (2 & t.mode) && (n.lanes = r),
                n.return = t,
                n.sibling = null,
                null !== e && (e.nextEffect = null,
                e.flags = 8,
                t.firstEffect = t.lastEffect = e),
                t.child = n
            }
            function tl(e, t, n, r, a) {
                var o = t.mode
                  , i = e.child;
                e = i.sibling;
                var l = {
                    mode: "hidden",
                    children: n
                };
                return 0 === (2 & o) && t.child !== i ? ((n = t.child).childLanes = 0,
                n.pendingProps = l,
                null !== (i = n.lastEffect) ? (t.firstEffect = n.firstEffect,
                t.lastEffect = i,
                i.nextEffect = null) : t.firstEffect = t.lastEffect = null) : n = Ys(i, l),
                null !== e ? r = Ys(e, r) : (r = Gs(r, o, a, null)).flags |= 2,
                r.return = t,
                n.return = t,
                n.sibling = r,
                t.child = n,
                r
            }
            function nl(e, t) {
                e.lanes |= t;
                var n = e.alternate;
                null !== n && (n.lanes |= t),
                ao(e.return, t)
            }
            function rl(e, t, n, r, a, o) {
                var i = e.memoizedState;
                null === i ? e.memoizedState = {
                    isBackwards: t,
                    rendering: null,
                    renderingStartTime: 0,
                    last: r,
                    tail: n,
                    tailMode: a,
                    lastEffect: o
                } : (i.isBackwards = t,
                i.rendering = null,
                i.renderingStartTime = 0,
                i.last = r,
                i.tail = n,
                i.tailMode = a,
                i.lastEffect = o)
            }
            function al(e, t, n) {
                var r = t.pendingProps
                  , a = r.revealOrder
                  , o = r.tail;
                if (Ai(e, t, r.children, n),
                0 !== (2 & (r = Ao.current)))
                    r = 1 & r | 2,
                    t.flags |= 64;
                else {
                    if (null !== e && 0 !== (64 & e.flags))
                        e: for (e = t.child; null !== e; ) {
                            if (13 === e.tag)
                                null !== e.memoizedState && nl(e, n);
                            else if (19 === e.tag)
                                nl(e, n);
                            else if (null !== e.child) {
                                e.child.return = e,
                                e = e.child;
                                continue
                            }
                            if (e === t)
                                break e;
                            for (; null === e.sibling; ) {
                                if (null === e.return || e.return === t)
                                    break e;
                                e = e.return
                            }
                            e.sibling.return = e.return,
                            e = e.sibling
                        }
                    r &= 1
                }
                if (da(Ao, r),
                0 === (2 & t.mode))
                    t.memoizedState = null;
                else
                    switch (a) {
                    case "forwards":
                        for (n = t.child,
                        a = null; null !== n; )
                            null !== (e = n.alternate) && null === Fo(e) && (a = n),
                            n = n.sibling;
                        null === (n = a) ? (a = t.child,
                        t.child = null) : (a = n.sibling,
                        n.sibling = null),
                        rl(t, !1, a, n, o, t.lastEffect);
                        break;
                    case "backwards":
                        for (n = null,
                        a = t.child,
                        t.child = null; null !== a; ) {
                            if (null !== (e = a.alternate) && null === Fo(e)) {
                                t.child = a;
                                break
                            }
                            e = a.sibling,
                            a.sibling = n,
                            n = a,
                            a = e
                        }
                        rl(t, !0, n, null, o, t.lastEffect);
                        break;
                    case "together":
                        rl(t, !1, null, null, void 0, t.lastEffect);
                        break;
                    default:
                        t.memoizedState = null
                    }
                return t.child
            }
            function ol(e, t, n) {
                if (null !== e && (t.dependencies = e.dependencies),
                ql |= t.lanes,
                0 !== (n & t.childLanes)) {
                    if (null !== e && t.child !== e.child)
                        throw Error(i(153));
                    if (null !== t.child) {
                        for (n = Ys(e = t.child, e.pendingProps),
                        t.child = n,
                        n.return = t; null !== e.sibling; )
                            e = e.sibling,
                            (n = n.sibling = Ys(e, e.pendingProps)).return = t;
                        n.sibling = null
                    }
                    return t.child
                }
                return null
            }
            function il(e, t) {
                if (!Vo)
                    switch (e.tailMode) {
                    case "hidden":
                        t = e.tail;
                        for (var n = null; null !== t; )
                            null !== t.alternate && (n = t),
                            t = t.sibling;
                        null === n ? e.tail = null : n.sibling = null;
                        break;
                    case "collapsed":
                        n = e.tail;
                        for (var r = null; null !== n; )
                            null !== n.alternate && (r = n),
                            n = n.sibling;
                        null === r ? t || null === e.tail ? e.tail = null : e.tail.sibling = null : r.sibling = null
                    }
            }
            function ll(e, t, n) {
                var r = t.pendingProps;
                switch (t.tag) {
                case 2:
                case 16:
                case 15:
                case 0:
                case 11:
                case 7:
                case 8:
                case 12:
                case 9:
                case 14:
                    return null;
                case 1:
                case 17:
                    return va(t.type) && ya(),
                    null;
                case 3:
                    return Ro(),
                    ca(ha),
                    ca(pa),
                    Ko(),
                    (r = t.stateNode).pendingContext && (r.context = r.pendingContext,
                    r.pendingContext = null),
                    null !== e && null !== e.child || (Wo(t) ? t.flags |= 4 : r.hydrate || (t.flags |= 256)),
                    null;
                case 5:
                    Io(t);
                    var o = To(Mo.current);
                    if (n = t.type,
                    null !== e && null != t.stateNode)
                        Qi(e, t, n, r),
                        e.ref !== t.ref && (t.flags |= 128);
                    else {
                        if (!r) {
                            if (null === t.stateNode)
                                throw Error(i(166));
                            return null
                        }
                        if (e = To(No.current),
                        Wo(t)) {
                            r = t.stateNode,
                            n = t.type;
                            var l = t.memoizedProps;
                            switch (r[Zr] = t,
                            r[Xr] = l,
                            n) {
                            case "dialog":
                                Nr("cancel", r),
                                Nr("close", r);
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                Nr("load", r);
                                break;
                            case "video":
                            case "audio":
                                for (e = 0; e < jr.length; e++)
                                    Nr(jr[e], r);
                                break;
                            case "source":
                                Nr("error", r);
                                break;
                            case "img":
                            case "image":
                            case "link":
                                Nr("error", r),
                                Nr("load", r);
                                break;
                            case "details":
                                Nr("toggle", r);
                                break;
                            case "input":
                                ee(r, l),
                                Nr("invalid", r);
                                break;
                            case "select":
                                r._wrapperState = {
                                    wasMultiple: !!l.multiple
                                },
                                Nr("invalid", r);
                                break;
                            case "textarea":
                                se(r, l),
                                Nr("invalid", r)
                            }
                            for (var u in Ce(n, l),
                            e = null,
                            l)
                                l.hasOwnProperty(u) && (o = l[u],
                                "children" === u ? "string" === typeof o ? r.textContent !== o && (e = ["children", o]) : "number" === typeof o && r.textContent !== "" + o && (e = ["children", "" + o]) : s.hasOwnProperty(u) && null != o && "onScroll" === u && Nr("scroll", r));
                            switch (n) {
                            case "input":
                                K(r),
                                re(r, l, !0);
                                break;
                            case "textarea":
                                K(r),
                                ce(r);
                                break;
                            case "select":
                            case "option":
                                break;
                            default:
                                "function" === typeof l.onClick && (r.onclick = Ur)
                            }
                            r = e,
                            t.updateQueue = r,
                            null !== r && (t.flags |= 4)
                        } else {
                            switch (u = 9 === o.nodeType ? o : o.ownerDocument,
                            e === de && (e = pe(n)),
                            e === de ? "script" === n ? ((e = u.createElement("div")).innerHTML = "<script><\/script>",
                            e = e.removeChild(e.firstChild)) : "string" === typeof r.is ? e = u.createElement(n, {
                                is: r.is
                            }) : (e = u.createElement(n),
                            "select" === n && (u = e,
                            r.multiple ? u.multiple = !0 : r.size && (u.size = r.size))) : e = u.createElementNS(e, n),
                            e[Zr] = t,
                            e[Xr] = r,
                            Gi(e, t),
                            t.stateNode = e,
                            u = Se(n, r),
                            n) {
                            case "dialog":
                                Nr("cancel", e),
                                Nr("close", e),
                                o = r;
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                Nr("load", e),
                                o = r;
                                break;
                            case "video":
                            case "audio":
                                for (o = 0; o < jr.length; o++)
                                    Nr(jr[o], e);
                                o = r;
                                break;
                            case "source":
                                Nr("error", e),
                                o = r;
                                break;
                            case "img":
                            case "image":
                            case "link":
                                Nr("error", e),
                                Nr("load", e),
                                o = r;
                                break;
                            case "details":
                                Nr("toggle", e),
                                o = r;
                                break;
                            case "input":
                                ee(e, r),
                                o = X(e, r),
                                Nr("invalid", e);
                                break;
                            case "option":
                                o = oe(e, r);
                                break;
                            case "select":
                                e._wrapperState = {
                                    wasMultiple: !!r.multiple
                                },
                                o = a({}, r, {
                                    value: void 0
                                }),
                                Nr("invalid", e);
                                break;
                            case "textarea":
                                se(e, r),
                                o = le(e, r),
                                Nr("invalid", e);
                                break;
                            default:
                                o = r
                            }
                            Ce(n, o);
                            var c = o;
                            for (l in c)
                                if (c.hasOwnProperty(l)) {
                                    var d = c[l];
                                    "style" === l ? ke(e, d) : "dangerouslySetInnerHTML" === l ? null != (d = d ? d.__html : void 0) && ve(e, d) : "children" === l ? "string" === typeof d ? ("textarea" !== n || "" !== d) && ye(e, d) : "number" === typeof d && ye(e, "" + d) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (s.hasOwnProperty(l) ? null != d && "onScroll" === l && Nr("scroll", e) : null != d && w(e, l, d, u))
                                }
                            switch (n) {
                            case "input":
                                K(e),
                                re(e, r, !1);
                                break;
                            case "textarea":
                                K(e),
                                ce(e);
                                break;
                            case "option":
                                null != r.value && e.setAttribute("value", "" + G(r.value));
                                break;
                            case "select":
                                e.multiple = !!r.multiple,
                                null != (l = r.value) ? ie(e, !!r.multiple, l, !1) : null != r.defaultValue && ie(e, !!r.multiple, r.defaultValue, !0);
                                break;
                            default:
                                "function" === typeof o.onClick && (e.onclick = Ur)
                            }
                            Hr(n, r) && (t.flags |= 4)
                        }
                        null !== t.ref && (t.flags |= 128)
                    }
                    return null;
                case 6:
                    if (e && null != t.stateNode)
                        Ki(0, t, e.memoizedProps, r);
                    else {
                        if ("string" !== typeof r && null === t.stateNode)
                            throw Error(i(166));
                        n = To(Mo.current),
                        To(No.current),
                        Wo(t) ? (r = t.stateNode,
                        n = t.memoizedProps,
                        r[Zr] = t,
                        r.nodeValue !== n && (t.flags |= 4)) : ((r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(r))[Zr] = t,
                        t.stateNode = r)
                    }
                    return null;
                case 13:
                    return ca(Ao),
                    r = t.memoizedState,
                    0 !== (64 & t.flags) ? (t.lanes = n,
                    t) : (r = null !== r,
                    n = !1,
                    null === e ? void 0 !== t.memoizedProps.fallback && Wo(t) : n = null !== e.memoizedState,
                    r && !n && 0 !== (2 & t.mode) && (null === e && !0 !== t.memoizedProps.unstable_avoidThisFallback || 0 !== (1 & Ao.current) ? 0 === Al && (Al = 3) : (0 !== Al && 3 !== Al || (Al = 4),
                    null === Tl || 0 === (134217727 & ql) && 0 === (134217727 & Vl) || ys(Tl, Rl))),
                    (r || n) && (t.flags |= 4),
                    null);
                case 4:
                    return Ro(),
                    null === e && Mr(t.stateNode.containerInfo),
                    null;
                case 10:
                    return ro(t),
                    null;
                case 19:
                    if (ca(Ao),
                    null === (r = t.memoizedState))
                        return null;
                    if (l = 0 !== (64 & t.flags),
                    null === (u = r.rendering))
                        if (l)
                            il(r, !1);
                        else {
                            if (0 !== Al || null !== e && 0 !== (64 & e.flags))
                                for (e = t.child; null !== e; ) {
                                    if (null !== (u = Fo(e))) {
                                        for (t.flags |= 64,
                                        il(r, !1),
                                        null !== (l = u.updateQueue) && (t.updateQueue = l,
                                        t.flags |= 4),
                                        null === r.lastEffect && (t.firstEffect = null),
                                        t.lastEffect = r.lastEffect,
                                        r = n,
                                        n = t.child; null !== n; )
                                            e = r,
                                            (l = n).flags &= 2,
                                            l.nextEffect = null,
                                            l.firstEffect = null,
                                            l.lastEffect = null,
                                            null === (u = l.alternate) ? (l.childLanes = 0,
                                            l.lanes = e,
                                            l.child = null,
                                            l.memoizedProps = null,
                                            l.memoizedState = null,
                                            l.updateQueue = null,
                                            l.dependencies = null,
                                            l.stateNode = null) : (l.childLanes = u.childLanes,
                                            l.lanes = u.lanes,
                                            l.child = u.child,
                                            l.memoizedProps = u.memoizedProps,
                                            l.memoizedState = u.memoizedState,
                                            l.updateQueue = u.updateQueue,
                                            l.type = u.type,
                                            e = u.dependencies,
                                            l.dependencies = null === e ? null : {
                                                lanes: e.lanes,
                                                firstContext: e.firstContext
                                            }),
                                            n = n.sibling;
                                        return da(Ao, 1 & Ao.current | 2),
                                        t.child
                                    }
                                    e = e.sibling
                                }
                            null !== r.tail && Ha() > Yl && (t.flags |= 64,
                            l = !0,
                            il(r, !1),
                            t.lanes = 33554432)
                        }
                    else {
                        if (!l)
                            if (null !== (e = Fo(u))) {
                                if (t.flags |= 64,
                                l = !0,
                                null !== (n = e.updateQueue) && (t.updateQueue = n,
                                t.flags |= 4),
                                il(r, !0),
                                null === r.tail && "hidden" === r.tailMode && !u.alternate && !Vo)
                                    return null !== (t = t.lastEffect = r.lastEffect) && (t.nextEffect = null),
                                    null
                            } else
                                2 * Ha() - r.renderingStartTime > Yl && 1073741824 !== n && (t.flags |= 64,
                                l = !0,
                                il(r, !1),
                                t.lanes = 33554432);
                        r.isBackwards ? (u.sibling = t.child,
                        t.child = u) : (null !== (n = r.last) ? n.sibling = u : t.child = u,
                        r.last = u)
                    }
                    return null !== r.tail ? (n = r.tail,
                    r.rendering = n,
                    r.tail = n.sibling,
                    r.lastEffect = t.lastEffect,
                    r.renderingStartTime = Ha(),
                    n.sibling = null,
                    t = Ao.current,
                    da(Ao, l ? 1 & t | 2 : 1 & t),
                    n) : null;
                case 23:
                case 24:
                    return _s(),
                    null !== e && null !== e.memoizedState !== (null !== t.memoizedState) && "unstable-defer-without-hiding" !== r.mode && (t.flags |= 4),
                    null
                }
                throw Error(i(156, t.tag))
            }
            function sl(e) {
                switch (e.tag) {
                case 1:
                    va(e.type) && ya();
                    var t = e.flags;
                    return 4096 & t ? (e.flags = -4097 & t | 64,
                    e) : null;
                case 3:
                    if (Ro(),
                    ca(ha),
                    ca(pa),
                    Ko(),
                    0 !== (64 & (t = e.flags)))
                        throw Error(i(285));
                    return e.flags = -4097 & t | 64,
                    e;
                case 5:
                    return Io(e),
                    null;
                case 13:
                    return ca(Ao),
                    4096 & (t = e.flags) ? (e.flags = -4097 & t | 64,
                    e) : null;
                case 19:
                    return ca(Ao),
                    null;
                case 4:
                    return Ro(),
                    null;
                case 10:
                    return ro(e),
                    null;
                case 23:
                case 24:
                    return _s(),
                    null;
                default:
                    return null
                }
            }
            function ul(e, t) {
                try {
                    var n = ""
                      , r = t;
                    do {
                        n += Y(r),
                        r = r.return
                    } while (r);
                    var a = n
                } catch (o) {
                    a = "\nError generating stack: " + o.message + "\n" + o.stack
                }
                return {
                    value: e,
                    source: t,
                    stack: a
                }
            }
            function cl(e, t) {
                try {
                    console.error(t.value)
                } catch (n) {
                    setTimeout((function() {
                        throw n
                    }
                    ))
                }
            }
            Gi = function(e, t) {
                for (var n = t.child; null !== n; ) {
                    if (5 === n.tag || 6 === n.tag)
                        e.appendChild(n.stateNode);
                    else if (4 !== n.tag && null !== n.child) {
                        n.child.return = n,
                        n = n.child;
                        continue
                    }
                    if (n === t)
                        break;
                    for (; null === n.sibling; ) {
                        if (null === n.return || n.return === t)
                            return;
                        n = n.return
                    }
                    n.sibling.return = n.return,
                    n = n.sibling
                }
            }
            ,
            Qi = function(e, t, n, r) {
                var o = e.memoizedProps;
                if (o !== r) {
                    e = t.stateNode,
                    To(No.current);
                    var i, l = null;
                    switch (n) {
                    case "input":
                        o = X(e, o),
                        r = X(e, r),
                        l = [];
                        break;
                    case "option":
                        o = oe(e, o),
                        r = oe(e, r),
                        l = [];
                        break;
                    case "select":
                        o = a({}, o, {
                            value: void 0
                        }),
                        r = a({}, r, {
                            value: void 0
                        }),
                        l = [];
                        break;
                    case "textarea":
                        o = le(e, o),
                        r = le(e, r),
                        l = [];
                        break;
                    default:
                        "function" !== typeof o.onClick && "function" === typeof r.onClick && (e.onclick = Ur)
                    }
                    for (d in Ce(n, r),
                    n = null,
                    o)
                        if (!r.hasOwnProperty(d) && o.hasOwnProperty(d) && null != o[d])
                            if ("style" === d) {
                                var u = o[d];
                                for (i in u)
                                    u.hasOwnProperty(i) && (n || (n = {}),
                                    n[i] = "")
                            } else
                                "dangerouslySetInnerHTML" !== d && "children" !== d && "suppressContentEditableWarning" !== d && "suppressHydrationWarning" !== d && "autoFocus" !== d && (s.hasOwnProperty(d) ? l || (l = []) : (l = l || []).push(d, null));
                    for (d in r) {
                        var c = r[d];
                        if (u = null != o ? o[d] : void 0,
                        r.hasOwnProperty(d) && c !== u && (null != c || null != u))
                            if ("style" === d)
                                if (u) {
                                    for (i in u)
                                        !u.hasOwnProperty(i) || c && c.hasOwnProperty(i) || (n || (n = {}),
                                        n[i] = "");
                                    for (i in c)
                                        c.hasOwnProperty(i) && u[i] !== c[i] && (n || (n = {}),
                                        n[i] = c[i])
                                } else
                                    n || (l || (l = []),
                                    l.push(d, n)),
                                    n = c;
                            else
                                "dangerouslySetInnerHTML" === d ? (c = c ? c.__html : void 0,
                                u = u ? u.__html : void 0,
                                null != c && u !== c && (l = l || []).push(d, c)) : "children" === d ? "string" !== typeof c && "number" !== typeof c || (l = l || []).push(d, "" + c) : "suppressContentEditableWarning" !== d && "suppressHydrationWarning" !== d && (s.hasOwnProperty(d) ? (null != c && "onScroll" === d && Nr("scroll", e),
                                l || u === c || (l = [])) : "object" === typeof c && null !== c && c.$$typeof === R ? c.toString() : (l = l || []).push(d, c))
                    }
                    n && (l = l || []).push("style", n);
                    var d = l;
                    (t.updateQueue = d) && (t.flags |= 4)
                }
            }
            ,
            Ki = function(e, t, n, r) {
                n !== r && (t.flags |= 4)
            }
            ;
            var dl = "function" === typeof WeakMap ? WeakMap : Map;
            function fl(e, t, n) {
                (n = co(-1, n)).tag = 3,
                n.payload = {
                    element: null
                };
                var r = t.value;
                return n.callback = function() {
                    Kl || (Kl = !0,
                    Jl = r),
                    cl(0, t)
                }
                ,
                n
            }
            function pl(e, t, n) {
                (n = co(-1, n)).tag = 3;
                var r = e.type.getDerivedStateFromError;
                if ("function" === typeof r) {
                    var a = t.value;
                    n.payload = function() {
                        return cl(0, t),
                        r(a)
                    }
                }
                var o = e.stateNode;
                return null !== o && "function" === typeof o.componentDidCatch && (n.callback = function() {
                    "function" !== typeof r && (null === Zl ? Zl = new Set([this]) : Zl.add(this),
                    cl(0, t));
                    var e = t.stack;
                    this.componentDidCatch(t.value, {
                        componentStack: null !== e ? e : ""
                    })
                }
                ),
                n
            }
            var hl = "function" === typeof WeakSet ? WeakSet : Set;
            function gl(e) {
                var t = e.ref;
                if (null !== t)
                    if ("function" === typeof t)
                        try {
                            t(null)
                        } catch (n) {
                            Us(e, n)
                        }
                    else
                        t.current = null
            }
            function ml(e, t) {
                switch (t.tag) {
                case 0:
                case 11:
                case 15:
                case 22:
                case 5:
                case 6:
                case 4:
                case 17:
                    return;
                case 1:
                    if (256 & t.flags && null !== e) {
                        var n = e.memoizedProps
                          , r = e.memoizedState;
                        t = (e = t.stateNode).getSnapshotBeforeUpdate(t.elementType === t.type ? n : Ja(t.type, n), r),
                        e.__reactInternalSnapshotBeforeUpdate = t
                    }
                    return;
                case 3:
                    return void (256 & t.flags && Wr(t.stateNode.containerInfo))
                }
                throw Error(i(163))
            }
            function vl(e, t, n) {
                switch (n.tag) {
                case 0:
                case 11:
                case 15:
                case 22:
                    if (null !== (t = null !== (t = n.updateQueue) ? t.lastEffect : null)) {
                        e = t = t.next;
                        do {
                            if (3 === (3 & e.tag)) {
                                var r = e.create;
                                e.destroy = r()
                            }
                            e = e.next
                        } while (e !== t)
                    }
                    if (null !== (t = null !== (t = n.updateQueue) ? t.lastEffect : null)) {
                        e = t = t.next;
                        do {
                            var a = e;
                            r = a.next,
                            0 !== (4 & (a = a.tag)) && 0 !== (1 & a) && (Is(n, e),
                            zs(n, e)),
                            e = r
                        } while (e !== t)
                    }
                    return;
                case 1:
                    return e = n.stateNode,
                    4 & n.flags && (null === t ? e.componentDidMount() : (r = n.elementType === n.type ? t.memoizedProps : Ja(n.type, t.memoizedProps),
                    e.componentDidUpdate(r, t.memoizedState, e.__reactInternalSnapshotBeforeUpdate))),
                    void (null !== (t = n.updateQueue) && go(n, t, e));
                case 3:
                    if (null !== (t = n.updateQueue)) {
                        if (e = null,
                        null !== n.child)
                            switch (n.child.tag) {
                            case 5:
                            case 1:
                                e = n.child.stateNode
                            }
                        go(n, t, e)
                    }
                    return;
                case 5:
                    return e = n.stateNode,
                    void (null === t && 4 & n.flags && Hr(n.type, n.memoizedProps) && e.focus());
                case 6:
                case 4:
                case 12:
                case 19:
                case 17:
                case 20:
                case 21:
                case 23:
                case 24:
                    return;
                case 13:
                    return void (null === n.memoizedState && (n = n.alternate,
                    null !== n && (n = n.memoizedState,
                    null !== n && (n = n.dehydrated,
                    null !== n && kt(n)))))
                }
                throw Error(i(163))
            }
            function yl(e, t) {
                for (var n = e; ; ) {
                    if (5 === n.tag) {
                        var r = n.stateNode;
                        if (t)
                            "function" === typeof (r = r.style).setProperty ? r.setProperty("display", "none", "important") : r.display = "none";
                        else {
                            r = n.stateNode;
                            var a = n.memoizedProps.style;
                            a = void 0 !== a && null !== a && a.hasOwnProperty("display") ? a.display : null,
                            r.style.display = xe("display", a)
                        }
                    } else if (6 === n.tag)
                        n.stateNode.nodeValue = t ? "" : n.memoizedProps;
                    else if ((23 !== n.tag && 24 !== n.tag || null === n.memoizedState || n === e) && null !== n.child) {
                        n.child.return = n,
                        n = n.child;
                        continue
                    }
                    if (n === e)
                        break;
                    for (; null === n.sibling; ) {
                        if (null === n.return || n.return === e)
                            return;
                        n = n.return
                    }
                    n.sibling.return = n.return,
                    n = n.sibling
                }
            }
            function bl(e, t) {
                if (Ca && "function" === typeof Ca.onCommitFiberUnmount)
                    try {
                        Ca.onCommitFiberUnmount(_a, t)
                    } catch (o) {}
                switch (t.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                case 22:
                    if (null !== (e = t.updateQueue) && null !== (e = e.lastEffect)) {
                        var n = e = e.next;
                        do {
                            var r = n
                              , a = r.destroy;
                            if (r = r.tag,
                            void 0 !== a)
                                if (0 !== (4 & r))
                                    Is(t, n);
                                else {
                                    r = t;
                                    try {
                                        a()
                                    } catch (o) {
                                        Us(r, o)
                                    }
                                }
                            n = n.next
                        } while (n !== e)
                    }
                    break;
                case 1:
                    if (gl(t),
                    "function" === typeof (e = t.stateNode).componentWillUnmount)
                        try {
                            e.props = t.memoizedProps,
                            e.state = t.memoizedState,
                            e.componentWillUnmount()
                        } catch (o) {
                            Us(t, o)
                        }
                    break;
                case 5:
                    gl(t);
                    break;
                case 4:
                    Sl(e, t)
                }
            }
            function wl(e) {
                e.alternate = null,
                e.child = null,
                e.dependencies = null,
                e.firstEffect = null,
                e.lastEffect = null,
                e.memoizedProps = null,
                e.memoizedState = null,
                e.pendingProps = null,
                e.return = null,
                e.updateQueue = null
            }
            function xl(e) {
                return 5 === e.tag || 3 === e.tag || 4 === e.tag
            }
            function kl(e) {
                e: {
                    for (var t = e.return; null !== t; ) {
                        if (xl(t))
                            break e;
                        t = t.return
                    }
                    throw Error(i(160))
                }
                var n = t;
                switch (t = n.stateNode,
                n.tag) {
                case 5:
                    var r = !1;
                    break;
                case 3:
                case 4:
                    t = t.containerInfo,
                    r = !0;
                    break;
                default:
                    throw Error(i(161))
                }
                16 & n.flags && (ye(t, ""),
                n.flags &= -17);
                e: t: for (n = e; ; ) {
                    for (; null === n.sibling; ) {
                        if (null === n.return || xl(n.return)) {
                            n = null;
                            break e
                        }
                        n = n.return
                    }
                    for (n.sibling.return = n.return,
                    n = n.sibling; 5 !== n.tag && 6 !== n.tag && 18 !== n.tag; ) {
                        if (2 & n.flags)
                            continue t;
                        if (null === n.child || 4 === n.tag)
                            continue t;
                        n.child.return = n,
                        n = n.child
                    }
                    if (!(2 & n.flags)) {
                        n = n.stateNode;
                        break e
                    }
                }
                r ? _l(e, n, t) : Cl(e, n, t)
            }
            function _l(e, t, n) {
                var r = e.tag
                  , a = 5 === r || 6 === r;
                if (a)
                    e = a ? e.stateNode : e.stateNode.instance,
                    t ? 8 === n.nodeType ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (8 === n.nodeType ? (t = n.parentNode).insertBefore(e, n) : (t = n).appendChild(e),
                    null !== (n = n._reactRootContainer) && void 0 !== n || null !== t.onclick || (t.onclick = Ur));
                else if (4 !== r && null !== (e = e.child))
                    for (_l(e, t, n),
                    e = e.sibling; null !== e; )
                        _l(e, t, n),
                        e = e.sibling
            }
            function Cl(e, t, n) {
                var r = e.tag
                  , a = 5 === r || 6 === r;
                if (a)
                    e = a ? e.stateNode : e.stateNode.instance,
                    t ? n.insertBefore(e, t) : n.appendChild(e);
                else if (4 !== r && null !== (e = e.child))
                    for (Cl(e, t, n),
                    e = e.sibling; null !== e; )
                        Cl(e, t, n),
                        e = e.sibling
            }
            function Sl(e, t) {
                for (var n, r, a = t, o = !1; ; ) {
                    if (!o) {
                        o = a.return;
                        e: for (; ; ) {
                            if (null === o)
                                throw Error(i(160));
                            switch (n = o.stateNode,
                            o.tag) {
                            case 5:
                                r = !1;
                                break e;
                            case 3:
                            case 4:
                                n = n.containerInfo,
                                r = !0;
                                break e
                            }
                            o = o.return
                        }
                        o = !0
                    }
                    if (5 === a.tag || 6 === a.tag) {
                        e: for (var l = e, s = a, u = s; ; )
                            if (bl(l, u),
                            null !== u.child && 4 !== u.tag)
                                u.child.return = u,
                                u = u.child;
                            else {
                                if (u === s)
                                    break e;
                                for (; null === u.sibling; ) {
                                    if (null === u.return || u.return === s)
                                        break e;
                                    u = u.return
                                }
                                u.sibling.return = u.return,
                                u = u.sibling
                            }
                        r ? (l = n,
                        s = a.stateNode,
                        8 === l.nodeType ? l.parentNode.removeChild(s) : l.removeChild(s)) : n.removeChild(a.stateNode)
                    } else if (4 === a.tag) {
                        if (null !== a.child) {
                            n = a.stateNode.containerInfo,
                            r = !0,
                            a.child.return = a,
                            a = a.child;
                            continue
                        }
                    } else if (bl(e, a),
                    null !== a.child) {
                        a.child.return = a,
                        a = a.child;
                        continue
                    }
                    if (a === t)
                        break;
                    for (; null === a.sibling; ) {
                        if (null === a.return || a.return === t)
                            return;
                        4 === (a = a.return).tag && (o = !1)
                    }
                    a.sibling.return = a.return,
                    a = a.sibling
                }
            }
            function jl(e, t) {
                switch (t.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                case 22:
                    var n = t.updateQueue;
                    if (null !== (n = null !== n ? n.lastEffect : null)) {
                        var r = n = n.next;
                        do {
                            3 === (3 & r.tag) && (e = r.destroy,
                            r.destroy = void 0,
                            void 0 !== e && e()),
                            r = r.next
                        } while (r !== n)
                    }
                    return;
                case 1:
                case 12:
                case 17:
                    return;
                case 5:
                    if (null != (n = t.stateNode)) {
                        r = t.memoizedProps;
                        var a = null !== e ? e.memoizedProps : r;
                        e = t.type;
                        var o = t.updateQueue;
                        if (t.updateQueue = null,
                        null !== o) {
                            for (n[Xr] = r,
                            "input" === e && "radio" === r.type && null != r.name && te(n, r),
                            Se(e, a),
                            t = Se(e, r),
                            a = 0; a < o.length; a += 2) {
                                var l = o[a]
                                  , s = o[a + 1];
                                "style" === l ? ke(n, s) : "dangerouslySetInnerHTML" === l ? ve(n, s) : "children" === l ? ye(n, s) : w(n, l, s, t)
                            }
                            switch (e) {
                            case "input":
                                ne(n, r);
                                break;
                            case "textarea":
                                ue(n, r);
                                break;
                            case "select":
                                e = n._wrapperState.wasMultiple,
                                n._wrapperState.wasMultiple = !!r.multiple,
                                null != (o = r.value) ? ie(n, !!r.multiple, o, !1) : e !== !!r.multiple && (null != r.defaultValue ? ie(n, !!r.multiple, r.defaultValue, !0) : ie(n, !!r.multiple, r.multiple ? [] : "", !1))
                            }
                        }
                    }
                    return;
                case 6:
                    if (null === t.stateNode)
                        throw Error(i(162));
                    return void (t.stateNode.nodeValue = t.memoizedProps);
                case 3:
                    return void ((n = t.stateNode).hydrate && (n.hydrate = !1,
                    kt(n.containerInfo)));
                case 13:
                    return null !== t.memoizedState && ($l = Ha(),
                    yl(t.child, !0)),
                    void Ol(t);
                case 19:
                    return void Ol(t);
                case 23:
                case 24:
                    return void yl(t, null !== t.memoizedState)
                }
                throw Error(i(163))
            }
            function Ol(e) {
                var t = e.updateQueue;
                if (null !== t) {
                    e.updateQueue = null;
                    var n = e.stateNode;
                    null === n && (n = e.stateNode = new hl),
                    t.forEach((function(t) {
                        var r = Vs.bind(null, e, t);
                        n.has(t) || (n.add(t),
                        t.then(r, r))
                    }
                    ))
                }
            }
            function El(e, t) {
                return null !== e && (null === (e = e.memoizedState) || null !== e.dehydrated) && (null !== (t = t.memoizedState) && null === t.dehydrated)
            }
            var Pl = Math.ceil
              , Nl = x.ReactCurrentDispatcher
              , Ll = x.ReactCurrentOwner
              , Ml = 0
              , Tl = null
              , Dl = null
              , Rl = 0
              , zl = 0
              , Il = ua(0)
              , Al = 0
              , Fl = null
              , Ul = 0
              , ql = 0
              , Vl = 0
              , Hl = 0
              , Bl = null
              , $l = 0
              , Yl = 1 / 0;
            function Wl() {
                Yl = Ha() + 500
            }
            var Gl, Ql = null, Kl = !1, Jl = null, Zl = null, Xl = !1, es = null, ts = 90, ns = [], rs = [], as = null, os = 0, is = null, ls = -1, ss = 0, us = 0, cs = null, ds = !1;
            function fs() {
                return 0 !== (48 & Ml) ? Ha() : -1 !== ls ? ls : ls = Ha()
            }
            function ps(e) {
                if (0 === (2 & (e = e.mode)))
                    return 1;
                if (0 === (4 & e))
                    return 99 === Ba() ? 1 : 2;
                if (0 === ss && (ss = Ul),
                0 !== Ka.transition) {
                    0 !== us && (us = null !== Bl ? Bl.pendingLanes : 0),
                    e = ss;
                    var t = 4186112 & ~us;
                    return 0 === (t &= -t) && (0 === (t = (e = 4186112 & ~e) & -e) && (t = 8192)),
                    t
                }
                return e = Ba(),
                0 !== (4 & Ml) && 98 === e ? e = Ut(12, ss) : e = Ut(e = function(e) {
                    switch (e) {
                    case 99:
                        return 15;
                    case 98:
                        return 10;
                    case 97:
                    case 96:
                        return 8;
                    case 95:
                        return 2;
                    default:
                        return 0
                    }
                }(e), ss),
                e
            }
            function hs(e, t, n) {
                if (50 < os)
                    throw os = 0,
                    is = null,
                    Error(i(185));
                if (null === (e = gs(e, t)))
                    return null;
                Ht(e, t, n),
                e === Tl && (Vl |= t,
                4 === Al && ys(e, Rl));
                var r = Ba();
                1 === t ? 0 !== (8 & Ml) && 0 === (48 & Ml) ? bs(e) : (ms(e, n),
                0 === Ml && (Wl(),
                Ga())) : (0 === (4 & Ml) || 98 !== r && 99 !== r || (null === as ? as = new Set([e]) : as.add(e)),
                ms(e, n)),
                Bl = e
            }
            function gs(e, t) {
                e.lanes |= t;
                var n = e.alternate;
                for (null !== n && (n.lanes |= t),
                n = e,
                e = e.return; null !== e; )
                    e.childLanes |= t,
                    null !== (n = e.alternate) && (n.childLanes |= t),
                    n = e,
                    e = e.return;
                return 3 === n.tag ? n.stateNode : null
            }
            function ms(e, t) {
                for (var n = e.callbackNode, r = e.suspendedLanes, a = e.pingedLanes, o = e.expirationTimes, l = e.pendingLanes; 0 < l; ) {
                    var s = 31 - Bt(l)
                      , u = 1 << s
                      , c = o[s];
                    if (-1 === c) {
                        if (0 === (u & r) || 0 !== (u & a)) {
                            c = t,
                            It(u);
                            var d = zt;
                            o[s] = 10 <= d ? c + 250 : 6 <= d ? c + 5e3 : -1
                        }
                    } else
                        c <= t && (e.expiredLanes |= u);
                    l &= ~u
                }
                if (r = At(e, e === Tl ? Rl : 0),
                t = zt,
                0 === r)
                    null !== n && (n !== Ia && Oa(n),
                    e.callbackNode = null,
                    e.callbackPriority = 0);
                else {
                    if (null !== n) {
                        if (e.callbackPriority === t)
                            return;
                        n !== Ia && Oa(n)
                    }
                    15 === t ? (n = bs.bind(null, e),
                    null === Fa ? (Fa = [n],
                    Ua = ja(Ma, Qa)) : Fa.push(n),
                    n = Ia) : 14 === t ? n = Wa(99, bs.bind(null, e)) : (n = function(e) {
                        switch (e) {
                        case 15:
                        case 14:
                            return 99;
                        case 13:
                        case 12:
                        case 11:
                        case 10:
                            return 98;
                        case 9:
                        case 8:
                        case 7:
                        case 6:
                        case 4:
                        case 5:
                            return 97;
                        case 3:
                        case 2:
                        case 1:
                            return 95;
                        case 0:
                            return 90;
                        default:
                            throw Error(i(358, e))
                        }
                    }(t),
                    n = Wa(n, vs.bind(null, e))),
                    e.callbackPriority = t,
                    e.callbackNode = n
                }
            }
            function vs(e) {
                if (ls = -1,
                us = ss = 0,
                0 !== (48 & Ml))
                    throw Error(i(327));
                var t = e.callbackNode;
                if (Rs() && e.callbackNode !== t)
                    return null;
                var n = At(e, e === Tl ? Rl : 0);
                if (0 === n)
                    return null;
                var r = n
                  , a = Ml;
                Ml |= 16;
                var o = js();
                for (Tl === e && Rl === r || (Wl(),
                Cs(e, r)); ; )
                    try {
                        Ps();
                        break
                    } catch (s) {
                        Ss(e, s)
                    }
                if (no(),
                Nl.current = o,
                Ml = a,
                null !== Dl ? r = 0 : (Tl = null,
                Rl = 0,
                r = Al),
                0 !== (Ul & Vl))
                    Cs(e, 0);
                else if (0 !== r) {
                    if (2 === r && (Ml |= 64,
                    e.hydrate && (e.hydrate = !1,
                    Wr(e.containerInfo)),
                    0 !== (n = Ft(e)) && (r = Os(e, n))),
                    1 === r)
                        throw t = Fl,
                        Cs(e, 0),
                        ys(e, n),
                        ms(e, Ha()),
                        t;
                    switch (e.finishedWork = e.current.alternate,
                    e.finishedLanes = n,
                    r) {
                    case 0:
                    case 1:
                        throw Error(i(345));
                    case 2:
                    case 5:
                        Ms(e);
                        break;
                    case 3:
                        if (ys(e, n),
                        (62914560 & n) === n && 10 < (r = $l + 500 - Ha())) {
                            if (0 !== At(e, 0))
                                break;
                            if (((a = e.suspendedLanes) & n) !== n) {
                                fs(),
                                e.pingedLanes |= e.suspendedLanes & a;
                                break
                            }
                            e.timeoutHandle = $r(Ms.bind(null, e), r);
                            break
                        }
                        Ms(e);
                        break;
                    case 4:
                        if (ys(e, n),
                        (4186112 & n) === n)
                            break;
                        for (r = e.eventTimes,
                        a = -1; 0 < n; ) {
                            var l = 31 - Bt(n);
                            o = 1 << l,
                            (l = r[l]) > a && (a = l),
                            n &= ~o
                        }
                        if (n = a,
                        10 < (n = (120 > (n = Ha() - n) ? 120 : 480 > n ? 480 : 1080 > n ? 1080 : 1920 > n ? 1920 : 3e3 > n ? 3e3 : 4320 > n ? 4320 : 1960 * Pl(n / 1960)) - n)) {
                            e.timeoutHandle = $r(Ms.bind(null, e), n);
                            break
                        }
                        Ms(e);
                        break;
                    default:
                        throw Error(i(329))
                    }
                }
                return ms(e, Ha()),
                e.callbackNode === t ? vs.bind(null, e) : null
            }
            function ys(e, t) {
                for (t &= ~Hl,
                t &= ~Vl,
                e.suspendedLanes |= t,
                e.pingedLanes &= ~t,
                e = e.expirationTimes; 0 < t; ) {
                    var n = 31 - Bt(t)
                      , r = 1 << n;
                    e[n] = -1,
                    t &= ~r
                }
            }
            function bs(e) {
                if (0 !== (48 & Ml))
                    throw Error(i(327));
                if (Rs(),
                e === Tl && 0 !== (e.expiredLanes & Rl)) {
                    var t = Rl
                      , n = Os(e, t);
                    0 !== (Ul & Vl) && (n = Os(e, t = At(e, t)))
                } else
                    n = Os(e, t = At(e, 0));
                if (0 !== e.tag && 2 === n && (Ml |= 64,
                e.hydrate && (e.hydrate = !1,
                Wr(e.containerInfo)),
                0 !== (t = Ft(e)) && (n = Os(e, t))),
                1 === n)
                    throw n = Fl,
                    Cs(e, 0),
                    ys(e, t),
                    ms(e, Ha()),
                    n;
                return e.finishedWork = e.current.alternate,
                e.finishedLanes = t,
                Ms(e),
                ms(e, Ha()),
                null
            }
            function ws(e, t) {
                var n = Ml;
                Ml |= 1;
                try {
                    return e(t)
                } finally {
                    0 === (Ml = n) && (Wl(),
                    Ga())
                }
            }
            function xs(e, t) {
                var n = Ml;
                Ml &= -2,
                Ml |= 8;
                try {
                    return e(t)
                } finally {
                    0 === (Ml = n) && (Wl(),
                    Ga())
                }
            }
            function ks(e, t) {
                da(Il, zl),
                zl |= t,
                Ul |= t
            }
            function _s() {
                zl = Il.current,
                ca(Il)
            }
            function Cs(e, t) {
                e.finishedWork = null,
                e.finishedLanes = 0;
                var n = e.timeoutHandle;
                if (-1 !== n && (e.timeoutHandle = -1,
                Yr(n)),
                null !== Dl)
                    for (n = Dl.return; null !== n; ) {
                        var r = n;
                        switch (r.tag) {
                        case 1:
                            null !== (r = r.type.childContextTypes) && void 0 !== r && ya();
                            break;
                        case 3:
                            Ro(),
                            ca(ha),
                            ca(pa),
                            Ko();
                            break;
                        case 5:
                            Io(r);
                            break;
                        case 4:
                            Ro();
                            break;
                        case 13:
                        case 19:
                            ca(Ao);
                            break;
                        case 10:
                            ro(r);
                            break;
                        case 23:
                        case 24:
                            _s()
                        }
                        n = n.return
                    }
                Tl = e,
                Dl = Ys(e.current, null),
                Rl = zl = Ul = t,
                Al = 0,
                Fl = null,
                Hl = Vl = ql = 0
            }
            function Ss(e, t) {
                for (; ; ) {
                    var n = Dl;
                    try {
                        if (no(),
                        Jo.current = Mi,
                        ri) {
                            for (var r = ei.memoizedState; null !== r; ) {
                                var a = r.queue;
                                null !== a && (a.pending = null),
                                r = r.next
                            }
                            ri = !1
                        }
                        if (Xo = 0,
                        ni = ti = ei = null,
                        ai = !1,
                        Ll.current = null,
                        null === n || null === n.return) {
                            Al = 1,
                            Fl = t,
                            Dl = null;
                            break
                        }
                        e: {
                            var o = e
                              , i = n.return
                              , l = n
                              , s = t;
                            if (t = Rl,
                            l.flags |= 2048,
                            l.firstEffect = l.lastEffect = null,
                            null !== s && "object" === typeof s && "function" === typeof s.then) {
                                var u = s;
                                if (0 === (2 & l.mode)) {
                                    var c = l.alternate;
                                    c ? (l.updateQueue = c.updateQueue,
                                    l.memoizedState = c.memoizedState,
                                    l.lanes = c.lanes) : (l.updateQueue = null,
                                    l.memoizedState = null)
                                }
                                var d = 0 !== (1 & Ao.current)
                                  , f = i;
                                do {
                                    var p;
                                    if (p = 13 === f.tag) {
                                        var h = f.memoizedState;
                                        if (null !== h)
                                            p = null !== h.dehydrated;
                                        else {
                                            var g = f.memoizedProps;
                                            p = void 0 !== g.fallback && (!0 !== g.unstable_avoidThisFallback || !d)
                                        }
                                    }
                                    if (p) {
                                        var m = f.updateQueue;
                                        if (null === m) {
                                            var v = new Set;
                                            v.add(u),
                                            f.updateQueue = v
                                        } else
                                            m.add(u);
                                        if (0 === (2 & f.mode)) {
                                            if (f.flags |= 64,
                                            l.flags |= 16384,
                                            l.flags &= -2981,
                                            1 === l.tag)
                                                if (null === l.alternate)
                                                    l.tag = 17;
                                                else {
                                                    var y = co(-1, 1);
                                                    y.tag = 2,
                                                    fo(l, y)
                                                }
                                            l.lanes |= 1;
                                            break e
                                        }
                                        s = void 0,
                                        l = t;
                                        var b = o.pingCache;
                                        if (null === b ? (b = o.pingCache = new dl,
                                        s = new Set,
                                        b.set(u, s)) : void 0 === (s = b.get(u)) && (s = new Set,
                                        b.set(u, s)),
                                        !s.has(l)) {
                                            s.add(l);
                                            var w = qs.bind(null, o, u, l);
                                            u.then(w, w)
                                        }
                                        f.flags |= 4096,
                                        f.lanes = t;
                                        break e
                                    }
                                    f = f.return
                                } while (null !== f);
                                s = Error((W(l.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")
                            }
                            5 !== Al && (Al = 2),
                            s = ul(s, l),
                            f = i;
                            do {
                                switch (f.tag) {
                                case 3:
                                    o = s,
                                    f.flags |= 4096,
                                    t &= -t,
                                    f.lanes |= t,
                                    po(f, fl(0, o, t));
                                    break e;
                                case 1:
                                    o = s;
                                    var x = f.type
                                      , k = f.stateNode;
                                    if (0 === (64 & f.flags) && ("function" === typeof x.getDerivedStateFromError || null !== k && "function" === typeof k.componentDidCatch && (null === Zl || !Zl.has(k)))) {
                                        f.flags |= 4096,
                                        t &= -t,
                                        f.lanes |= t,
                                        po(f, pl(f, o, t));
                                        break e
                                    }
                                }
                                f = f.return
                            } while (null !== f)
                        }
                        Ls(n)
                    } catch (_) {
                        t = _,
                        Dl === n && null !== n && (Dl = n = n.return);
                        continue
                    }
                    break
                }
            }
            function js() {
                var e = Nl.current;
                return Nl.current = Mi,
                null === e ? Mi : e
            }
            function Os(e, t) {
                var n = Ml;
                Ml |= 16;
                var r = js();
                for (Tl === e && Rl === t || Cs(e, t); ; )
                    try {
                        Es();
                        break
                    } catch (a) {
                        Ss(e, a)
                    }
                if (no(),
                Ml = n,
                Nl.current = r,
                null !== Dl)
                    throw Error(i(261));
                return Tl = null,
                Rl = 0,
                Al
            }
            function Es() {
                for (; null !== Dl; )
                    Ns(Dl)
            }
            function Ps() {
                for (; null !== Dl && !Ea(); )
                    Ns(Dl)
            }
            function Ns(e) {
                var t = Gl(e.alternate, e, zl);
                e.memoizedProps = e.pendingProps,
                null === t ? Ls(e) : Dl = t,
                Ll.current = null
            }
            function Ls(e) {
                var t = e;
                do {
                    var n = t.alternate;
                    if (e = t.return,
                    0 === (2048 & t.flags)) {
                        if (null !== (n = ll(n, t, zl)))
                            return void (Dl = n);
                        if (24 !== (n = t).tag && 23 !== n.tag || null === n.memoizedState || 0 !== (1073741824 & zl) || 0 === (4 & n.mode)) {
                            for (var r = 0, a = n.child; null !== a; )
                                r |= a.lanes | a.childLanes,
                                a = a.sibling;
                            n.childLanes = r
                        }
                        null !== e && 0 === (2048 & e.flags) && (null === e.firstEffect && (e.firstEffect = t.firstEffect),
                        null !== t.lastEffect && (null !== e.lastEffect && (e.lastEffect.nextEffect = t.firstEffect),
                        e.lastEffect = t.lastEffect),
                        1 < t.flags && (null !== e.lastEffect ? e.lastEffect.nextEffect = t : e.firstEffect = t,
                        e.lastEffect = t))
                    } else {
                        if (null !== (n = sl(t)))
                            return n.flags &= 2047,
                            void (Dl = n);
                        null !== e && (e.firstEffect = e.lastEffect = null,
                        e.flags |= 2048)
                    }
                    if (null !== (t = t.sibling))
                        return void (Dl = t);
                    Dl = t = e
                } while (null !== t);
                0 === Al && (Al = 5)
            }
            function Ms(e) {
                var t = Ba();
                return Ya(99, Ts.bind(null, e, t)),
                null
            }
            function Ts(e, t) {
                do {
                    Rs()
                } while (null !== es);
                if (0 !== (48 & Ml))
                    throw Error(i(327));
                var n = e.finishedWork;
                if (null === n)
                    return null;
                if (e.finishedWork = null,
                e.finishedLanes = 0,
                n === e.current)
                    throw Error(i(177));
                e.callbackNode = null;
                var r = n.lanes | n.childLanes
                  , a = r
                  , o = e.pendingLanes & ~a;
                e.pendingLanes = a,
                e.suspendedLanes = 0,
                e.pingedLanes = 0,
                e.expiredLanes &= a,
                e.mutableReadLanes &= a,
                e.entangledLanes &= a,
                a = e.entanglements;
                for (var l = e.eventTimes, s = e.expirationTimes; 0 < o; ) {
                    var u = 31 - Bt(o)
                      , c = 1 << u;
                    a[u] = 0,
                    l[u] = -1,
                    s[u] = -1,
                    o &= ~c
                }
                if (null !== as && 0 === (24 & r) && as.has(e) && as.delete(e),
                e === Tl && (Dl = Tl = null,
                Rl = 0),
                1 < n.flags ? null !== n.lastEffect ? (n.lastEffect.nextEffect = n,
                r = n.firstEffect) : r = n : r = n.firstEffect,
                null !== r) {
                    if (a = Ml,
                    Ml |= 32,
                    Ll.current = null,
                    qr = Qt,
                    vr(l = mr())) {
                        if ("selectionStart"in l)
                            s = {
                                start: l.selectionStart,
                                end: l.selectionEnd
                            };
                        else
                            e: if (s = (s = l.ownerDocument) && s.defaultView || window,
                            (c = s.getSelection && s.getSelection()) && 0 !== c.rangeCount) {
                                s = c.anchorNode,
                                o = c.anchorOffset,
                                u = c.focusNode,
                                c = c.focusOffset;
                                try {
                                    s.nodeType,
                                    u.nodeType
                                } catch (j) {
                                    s = null;
                                    break e
                                }
                                var d = 0
                                  , f = -1
                                  , p = -1
                                  , h = 0
                                  , g = 0
                                  , m = l
                                  , v = null;
                                t: for (; ; ) {
                                    for (var y; m !== s || 0 !== o && 3 !== m.nodeType || (f = d + o),
                                    m !== u || 0 !== c && 3 !== m.nodeType || (p = d + c),
                                    3 === m.nodeType && (d += m.nodeValue.length),
                                    null !== (y = m.firstChild); )
                                        v = m,
                                        m = y;
                                    for (; ; ) {
                                        if (m === l)
                                            break t;
                                        if (v === s && ++h === o && (f = d),
                                        v === u && ++g === c && (p = d),
                                        null !== (y = m.nextSibling))
                                            break;
                                        v = (m = v).parentNode
                                    }
                                    m = y
                                }
                                s = -1 === f || -1 === p ? null : {
                                    start: f,
                                    end: p
                                }
                            } else
                                s = null;
                        s = s || {
                            start: 0,
                            end: 0
                        }
                    } else
                        s = null;
                    Vr = {
                        focusedElem: l,
                        selectionRange: s
                    },
                    Qt = !1,
                    cs = null,
                    ds = !1,
                    Ql = r;
                    do {
                        try {
                            Ds()
                        } catch (j) {
                            if (null === Ql)
                                throw Error(i(330));
                            Us(Ql, j),
                            Ql = Ql.nextEffect
                        }
                    } while (null !== Ql);
                    cs = null,
                    Ql = r;
                    do {
                        try {
                            for (l = e; null !== Ql; ) {
                                var b = Ql.flags;
                                if (16 & b && ye(Ql.stateNode, ""),
                                128 & b) {
                                    var w = Ql.alternate;
                                    if (null !== w) {
                                        var x = w.ref;
                                        null !== x && ("function" === typeof x ? x(null) : x.current = null)
                                    }
                                }
                                switch (1038 & b) {
                                case 2:
                                    kl(Ql),
                                    Ql.flags &= -3;
                                    break;
                                case 6:
                                    kl(Ql),
                                    Ql.flags &= -3,
                                    jl(Ql.alternate, Ql);
                                    break;
                                case 1024:
                                    Ql.flags &= -1025;
                                    break;
                                case 1028:
                                    Ql.flags &= -1025,
                                    jl(Ql.alternate, Ql);
                                    break;
                                case 4:
                                    jl(Ql.alternate, Ql);
                                    break;
                                case 8:
                                    Sl(l, s = Ql);
                                    var k = s.alternate;
                                    wl(s),
                                    null !== k && wl(k)
                                }
                                Ql = Ql.nextEffect
                            }
                        } catch (j) {
                            if (null === Ql)
                                throw Error(i(330));
                            Us(Ql, j),
                            Ql = Ql.nextEffect
                        }
                    } while (null !== Ql);
                    if (x = Vr,
                    w = mr(),
                    b = x.focusedElem,
                    l = x.selectionRange,
                    w !== b && b && b.ownerDocument && gr(b.ownerDocument.documentElement, b)) {
                        null !== l && vr(b) && (w = l.start,
                        void 0 === (x = l.end) && (x = w),
                        "selectionStart"in b ? (b.selectionStart = w,
                        b.selectionEnd = Math.min(x, b.value.length)) : (x = (w = b.ownerDocument || document) && w.defaultView || window).getSelection && (x = x.getSelection(),
                        s = b.textContent.length,
                        k = Math.min(l.start, s),
                        l = void 0 === l.end ? k : Math.min(l.end, s),
                        !x.extend && k > l && (s = l,
                        l = k,
                        k = s),
                        s = hr(b, k),
                        o = hr(b, l),
                        s && o && (1 !== x.rangeCount || x.anchorNode !== s.node || x.anchorOffset !== s.offset || x.focusNode !== o.node || x.focusOffset !== o.offset) && ((w = w.createRange()).setStart(s.node, s.offset),
                        x.removeAllRanges(),
                        k > l ? (x.addRange(w),
                        x.extend(o.node, o.offset)) : (w.setEnd(o.node, o.offset),
                        x.addRange(w))))),
                        w = [];
                        for (x = b; x = x.parentNode; )
                            1 === x.nodeType && w.push({
                                element: x,
                                left: x.scrollLeft,
                                top: x.scrollTop
                            });
                        for ("function" === typeof b.focus && b.focus(),
                        b = 0; b < w.length; b++)
                            (x = w[b]).element.scrollLeft = x.left,
                            x.element.scrollTop = x.top
                    }
                    Qt = !!qr,
                    Vr = qr = null,
                    e.current = n,
                    Ql = r;
                    do {
                        try {
                            for (b = e; null !== Ql; ) {
                                var _ = Ql.flags;
                                if (36 & _ && vl(b, Ql.alternate, Ql),
                                128 & _) {
                                    w = void 0;
                                    var C = Ql.ref;
                                    if (null !== C) {
                                        var S = Ql.stateNode;
                                        Ql.tag,
                                        w = S,
                                        "function" === typeof C ? C(w) : C.current = w
                                    }
                                }
                                Ql = Ql.nextEffect
                            }
                        } catch (j) {
                            if (null === Ql)
                                throw Error(i(330));
                            Us(Ql, j),
                            Ql = Ql.nextEffect
                        }
                    } while (null !== Ql);
                    Ql = null,
                    Aa(),
                    Ml = a
                } else
                    e.current = n;
                if (Xl)
                    Xl = !1,
                    es = e,
                    ts = t;
                else
                    for (Ql = r; null !== Ql; )
                        t = Ql.nextEffect,
                        Ql.nextEffect = null,
                        8 & Ql.flags && ((_ = Ql).sibling = null,
                        _.stateNode = null),
                        Ql = t;
                if (0 === (r = e.pendingLanes) && (Zl = null),
                1 === r ? e === is ? os++ : (os = 0,
                is = e) : os = 0,
                n = n.stateNode,
                Ca && "function" === typeof Ca.onCommitFiberRoot)
                    try {
                        Ca.onCommitFiberRoot(_a, n, void 0, 64 === (64 & n.current.flags))
                    } catch (j) {}
                if (ms(e, Ha()),
                Kl)
                    throw Kl = !1,
                    e = Jl,
                    Jl = null,
                    e;
                return 0 !== (8 & Ml) || Ga(),
                null
            }
            function Ds() {
                for (; null !== Ql; ) {
                    var e = Ql.alternate;
                    ds || null === cs || (0 !== (8 & Ql.flags) ? et(Ql, cs) && (ds = !0) : 13 === Ql.tag && El(e, Ql) && et(Ql, cs) && (ds = !0));
                    var t = Ql.flags;
                    0 !== (256 & t) && ml(e, Ql),
                    0 === (512 & t) || Xl || (Xl = !0,
                    Wa(97, (function() {
                        return Rs(),
                        null
                    }
                    ))),
                    Ql = Ql.nextEffect
                }
            }
            function Rs() {
                if (90 !== ts) {
                    var e = 97 < ts ? 97 : ts;
                    return ts = 90,
                    Ya(e, As)
                }
                return !1
            }
            function zs(e, t) {
                ns.push(t, e),
                Xl || (Xl = !0,
                Wa(97, (function() {
                    return Rs(),
                    null
                }
                )))
            }
            function Is(e, t) {
                rs.push(t, e),
                Xl || (Xl = !0,
                Wa(97, (function() {
                    return Rs(),
                    null
                }
                )))
            }
            function As() {
                if (null === es)
                    return !1;
                var e = es;
                if (es = null,
                0 !== (48 & Ml))
                    throw Error(i(331));
                var t = Ml;
                Ml |= 32;
                var n = rs;
                rs = [];
                for (var r = 0; r < n.length; r += 2) {
                    var a = n[r]
                      , o = n[r + 1]
                      , l = a.destroy;
                    if (a.destroy = void 0,
                    "function" === typeof l)
                        try {
                            l()
                        } catch (u) {
                            if (null === o)
                                throw Error(i(330));
                            Us(o, u)
                        }
                }
                for (n = ns,
                ns = [],
                r = 0; r < n.length; r += 2) {
                    a = n[r],
                    o = n[r + 1];
                    try {
                        var s = a.create;
                        a.destroy = s()
                    } catch (u) {
                        if (null === o)
                            throw Error(i(330));
                        Us(o, u)
                    }
                }
                for (s = e.current.firstEffect; null !== s; )
                    e = s.nextEffect,
                    s.nextEffect = null,
                    8 & s.flags && (s.sibling = null,
                    s.stateNode = null),
                    s = e;
                return Ml = t,
                Ga(),
                !0
            }
            function Fs(e, t, n) {
                fo(e, t = fl(0, t = ul(n, t), 1)),
                t = fs(),
                null !== (e = gs(e, 1)) && (Ht(e, 1, t),
                ms(e, t))
            }
            function Us(e, t) {
                if (3 === e.tag)
                    Fs(e, e, t);
                else
                    for (var n = e.return; null !== n; ) {
                        if (3 === n.tag) {
                            Fs(n, e, t);
                            break
                        }
                        if (1 === n.tag) {
                            var r = n.stateNode;
                            if ("function" === typeof n.type.getDerivedStateFromError || "function" === typeof r.componentDidCatch && (null === Zl || !Zl.has(r))) {
                                var a = pl(n, e = ul(t, e), 1);
                                if (fo(n, a),
                                a = fs(),
                                null !== (n = gs(n, 1)))
                                    Ht(n, 1, a),
                                    ms(n, a);
                                else if ("function" === typeof r.componentDidCatch && (null === Zl || !Zl.has(r)))
                                    try {
                                        r.componentDidCatch(t, e)
                                    } catch (o) {}
                                break
                            }
                        }
                        n = n.return
                    }
            }
            function qs(e, t, n) {
                var r = e.pingCache;
                null !== r && r.delete(t),
                t = fs(),
                e.pingedLanes |= e.suspendedLanes & n,
                Tl === e && (Rl & n) === n && (4 === Al || 3 === Al && (62914560 & Rl) === Rl && 500 > Ha() - $l ? Cs(e, 0) : Hl |= n),
                ms(e, t)
            }
            function Vs(e, t) {
                var n = e.stateNode;
                null !== n && n.delete(t),
                0 === (t = 0) && (0 === (2 & (t = e.mode)) ? t = 1 : 0 === (4 & t) ? t = 99 === Ba() ? 1 : 2 : (0 === ss && (ss = Ul),
                0 === (t = qt(62914560 & ~ss)) && (t = 4194304))),
                n = fs(),
                null !== (e = gs(e, t)) && (Ht(e, t, n),
                ms(e, n))
            }
            function Hs(e, t, n, r) {
                this.tag = e,
                this.key = n,
                this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
                this.index = 0,
                this.ref = null,
                this.pendingProps = t,
                this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
                this.mode = r,
                this.flags = 0,
                this.lastEffect = this.firstEffect = this.nextEffect = null,
                this.childLanes = this.lanes = 0,
                this.alternate = null
            }
            function Bs(e, t, n, r) {
                return new Hs(e,t,n,r)
            }
            function $s(e) {
                return !(!(e = e.prototype) || !e.isReactComponent)
            }
            function Ys(e, t) {
                var n = e.alternate;
                return null === n ? ((n = Bs(e.tag, t, e.key, e.mode)).elementType = e.elementType,
                n.type = e.type,
                n.stateNode = e.stateNode,
                n.alternate = e,
                e.alternate = n) : (n.pendingProps = t,
                n.type = e.type,
                n.flags = 0,
                n.nextEffect = null,
                n.firstEffect = null,
                n.lastEffect = null),
                n.childLanes = e.childLanes,
                n.lanes = e.lanes,
                n.child = e.child,
                n.memoizedProps = e.memoizedProps,
                n.memoizedState = e.memoizedState,
                n.updateQueue = e.updateQueue,
                t = e.dependencies,
                n.dependencies = null === t ? null : {
                    lanes: t.lanes,
                    firstContext: t.firstContext
                },
                n.sibling = e.sibling,
                n.index = e.index,
                n.ref = e.ref,
                n
            }
            function Ws(e, t, n, r, a, o) {
                var l = 2;
                if (r = e,
                "function" === typeof e)
                    $s(e) && (l = 1);
                else if ("string" === typeof e)
                    l = 5;
                else
                    e: switch (e) {
                    case C:
                        return Gs(n.children, a, o, t);
                    case z:
                        l = 8,
                        a |= 16;
                        break;
                    case S:
                        l = 8,
                        a |= 1;
                        break;
                    case j:
                        return (e = Bs(12, n, t, 8 | a)).elementType = j,
                        e.type = j,
                        e.lanes = o,
                        e;
                    case N:
                        return (e = Bs(13, n, t, a)).type = N,
                        e.elementType = N,
                        e.lanes = o,
                        e;
                    case L:
                        return (e = Bs(19, n, t, a)).elementType = L,
                        e.lanes = o,
                        e;
                    case I:
                        return Qs(n, a, o, t);
                    case A:
                        return (e = Bs(24, n, t, a)).elementType = A,
                        e.lanes = o,
                        e;
                    default:
                        if ("object" === typeof e && null !== e)
                            switch (e.$$typeof) {
                            case O:
                                l = 10;
                                break e;
                            case E:
                                l = 9;
                                break e;
                            case P:
                                l = 11;
                                break e;
                            case M:
                                l = 14;
                                break e;
                            case T:
                                l = 16,
                                r = null;
                                break e;
                            case D:
                                l = 22;
                                break e
                            }
                        throw Error(i(130, null == e ? e : typeof e, ""))
                    }
                return (t = Bs(l, n, t, a)).elementType = e,
                t.type = r,
                t.lanes = o,
                t
            }
            function Gs(e, t, n, r) {
                return (e = Bs(7, e, r, t)).lanes = n,
                e
            }
            function Qs(e, t, n, r) {
                return (e = Bs(23, e, r, t)).elementType = I,
                e.lanes = n,
                e
            }
            function Ks(e, t, n) {
                return (e = Bs(6, e, null, t)).lanes = n,
                e
            }
            function Js(e, t, n) {
                return (t = Bs(4, null !== e.children ? e.children : [], e.key, t)).lanes = n,
                t.stateNode = {
                    containerInfo: e.containerInfo,
                    pendingChildren: null,
                    implementation: e.implementation
                },
                t
            }
            function Zs(e, t, n) {
                this.tag = t,
                this.containerInfo = e,
                this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
                this.timeoutHandle = -1,
                this.pendingContext = this.context = null,
                this.hydrate = n,
                this.callbackNode = null,
                this.callbackPriority = 0,
                this.eventTimes = Vt(0),
                this.expirationTimes = Vt(-1),
                this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
                this.entanglements = Vt(0),
                this.mutableSourceEagerHydrationData = null
            }
            function Xs(e, t, n) {
                var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
                return {
                    $$typeof: _,
                    key: null == r ? null : "" + r,
                    children: e,
                    containerInfo: t,
                    implementation: n
                }
            }
            function eu(e, t, n, r) {
                var a = t.current
                  , o = fs()
                  , l = ps(a);
                e: if (n) {
                    t: {
                        if (Ke(n = n._reactInternals) !== n || 1 !== n.tag)
                            throw Error(i(170));
                        var s = n;
                        do {
                            switch (s.tag) {
                            case 3:
                                s = s.stateNode.context;
                                break t;
                            case 1:
                                if (va(s.type)) {
                                    s = s.stateNode.__reactInternalMemoizedMergedChildContext;
                                    break t
                                }
                            }
                            s = s.return
                        } while (null !== s);
                        throw Error(i(171))
                    }
                    if (1 === n.tag) {
                        var u = n.type;
                        if (va(u)) {
                            n = wa(n, u, s);
                            break e
                        }
                    }
                    n = s
                } else
                    n = fa;
                return null === t.context ? t.context = n : t.pendingContext = n,
                (t = co(o, l)).payload = {
                    element: e
                },
                null !== (r = void 0 === r ? null : r) && (t.callback = r),
                fo(a, t),
                hs(a, l, o),
                l
            }
            function tu(e) {
                return (e = e.current).child ? (e.child.tag,
                e.child.stateNode) : null
            }
            function nu(e, t) {
                if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
                    var n = e.retryLane;
                    e.retryLane = 0 !== n && n < t ? n : t
                }
            }
            function ru(e, t) {
                nu(e, t),
                (e = e.alternate) && nu(e, t)
            }
            function au(e, t, n) {
                var r = null != n && null != n.hydrationOptions && n.hydrationOptions.mutableSources || null;
                if (n = new Zs(e,t,null != n && !0 === n.hydrate),
                t = Bs(3, null, null, 2 === t ? 7 : 1 === t ? 3 : 0),
                n.current = t,
                t.stateNode = n,
                so(t),
                e[ea] = n.current,
                Mr(8 === e.nodeType ? e.parentNode : e),
                r)
                    for (e = 0; e < r.length; e++) {
                        var a = (t = r[e])._getVersion;
                        a = a(t._source),
                        null == n.mutableSourceEagerHydrationData ? n.mutableSourceEagerHydrationData = [t, a] : n.mutableSourceEagerHydrationData.push(t, a)
                    }
                this._internalRoot = n
            }
            function ou(e) {
                return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
            }
            function iu(e, t, n, r, a) {
                var o = n._reactRootContainer;
                if (o) {
                    var i = o._internalRoot;
                    if ("function" === typeof a) {
                        var l = a;
                        a = function() {
                            var e = tu(i);
                            l.call(e)
                        }
                    }
                    eu(t, i, e, a)
                } else {
                    if (o = n._reactRootContainer = function(e, t) {
                        if (t || (t = !(!(t = e ? 9 === e.nodeType ? e.documentElement : e.firstChild : null) || 1 !== t.nodeType || !t.hasAttribute("data-reactroot"))),
                        !t)
                            for (var n; n = e.lastChild; )
                                e.removeChild(n);
                        return new au(e,0,t ? {
                            hydrate: !0
                        } : void 0)
                    }(n, r),
                    i = o._internalRoot,
                    "function" === typeof a) {
                        var s = a;
                        a = function() {
                            var e = tu(i);
                            s.call(e)
                        }
                    }
                    xs((function() {
                        eu(t, i, e, a)
                    }
                    ))
                }
                return tu(i)
            }
            function lu(e, t) {
                var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
                if (!ou(t))
                    throw Error(i(200));
                return Xs(e, t, null, n)
            }
            Gl = function(e, t, n) {
                var r = t.lanes;
                if (null !== e)
                    if (e.memoizedProps !== t.pendingProps || ha.current)
                        Ii = !0;
                    else {
                        if (0 === (n & r)) {
                            switch (Ii = !1,
                            t.tag) {
                            case 3:
                                Wi(t),
                                Go();
                                break;
                            case 5:
                                zo(t);
                                break;
                            case 1:
                                va(t.type) && xa(t);
                                break;
                            case 4:
                                Do(t, t.stateNode.containerInfo);
                                break;
                            case 10:
                                r = t.memoizedProps.value;
                                var a = t.type._context;
                                da(Za, a._currentValue),
                                a._currentValue = r;
                                break;
                            case 13:
                                if (null !== t.memoizedState)
                                    return 0 !== (n & t.child.childLanes) ? Zi(e, t, n) : (da(Ao, 1 & Ao.current),
                                    null !== (t = ol(e, t, n)) ? t.sibling : null);
                                da(Ao, 1 & Ao.current);
                                break;
                            case 19:
                                if (r = 0 !== (n & t.childLanes),
                                0 !== (64 & e.flags)) {
                                    if (r)
                                        return al(e, t, n);
                                    t.flags |= 64
                                }
                                if (null !== (a = t.memoizedState) && (a.rendering = null,
                                a.tail = null,
                                a.lastEffect = null),
                                da(Ao, Ao.current),
                                r)
                                    break;
                                return null;
                            case 23:
                            case 24:
                                return t.lanes = 0,
                                Vi(e, t, n)
                            }
                            return ol(e, t, n)
                        }
                        Ii = 0 !== (16384 & e.flags)
                    }
                else
                    Ii = !1;
                switch (t.lanes = 0,
                t.tag) {
                case 2:
                    if (r = t.type,
                    null !== e && (e.alternate = null,
                    t.alternate = null,
                    t.flags |= 2),
                    e = t.pendingProps,
                    a = ma(t, pa.current),
                    oo(t, n),
                    a = li(null, t, r, e, a, n),
                    t.flags |= 1,
                    "object" === typeof a && null !== a && "function" === typeof a.render && void 0 === a.$$typeof) {
                        if (t.tag = 1,
                        t.memoizedState = null,
                        t.updateQueue = null,
                        va(r)) {
                            var o = !0;
                            xa(t)
                        } else
                            o = !1;
                        t.memoizedState = null !== a.state && void 0 !== a.state ? a.state : null,
                        so(t);
                        var l = r.getDerivedStateFromProps;
                        "function" === typeof l && vo(t, r, l, e),
                        a.updater = yo,
                        t.stateNode = a,
                        a._reactInternals = t,
                        ko(t, r, e, n),
                        t = Yi(null, t, r, !0, o, n)
                    } else
                        t.tag = 0,
                        Ai(null, t, a, n),
                        t = t.child;
                    return t;
                case 16:
                    a = t.elementType;
                    e: {
                        switch (null !== e && (e.alternate = null,
                        t.alternate = null,
                        t.flags |= 2),
                        e = t.pendingProps,
                        a = (o = a._init)(a._payload),
                        t.type = a,
                        o = t.tag = function(e) {
                            if ("function" === typeof e)
                                return $s(e) ? 1 : 0;
                            if (void 0 !== e && null !== e) {
                                if ((e = e.$$typeof) === P)
                                    return 11;
                                if (e === M)
                                    return 14
                            }
                            return 2
                        }(a),
                        e = Ja(a, e),
                        o) {
                        case 0:
                            t = Bi(null, t, a, e, n);
                            break e;
                        case 1:
                            t = $i(null, t, a, e, n);
                            break e;
                        case 11:
                            t = Fi(null, t, a, e, n);
                            break e;
                        case 14:
                            t = Ui(null, t, a, Ja(a.type, e), r, n);
                            break e
                        }
                        throw Error(i(306, a, ""))
                    }
                    return t;
                case 0:
                    return r = t.type,
                    a = t.pendingProps,
                    Bi(e, t, r, a = t.elementType === r ? a : Ja(r, a), n);
                case 1:
                    return r = t.type,
                    a = t.pendingProps,
                    $i(e, t, r, a = t.elementType === r ? a : Ja(r, a), n);
                case 3:
                    if (Wi(t),
                    r = t.updateQueue,
                    null === e || null === r)
                        throw Error(i(282));
                    if (r = t.pendingProps,
                    a = null !== (a = t.memoizedState) ? a.element : null,
                    uo(e, t),
                    ho(t, r, null, n),
                    (r = t.memoizedState.element) === a)
                        Go(),
                        t = ol(e, t, n);
                    else {
                        if ((o = (a = t.stateNode).hydrate) && (qo = Gr(t.stateNode.containerInfo.firstChild),
                        Uo = t,
                        o = Vo = !0),
                        o) {
                            if (null != (e = a.mutableSourceEagerHydrationData))
                                for (a = 0; a < e.length; a += 2)
                                    (o = e[a])._workInProgressVersionPrimary = e[a + 1],
                                    Qo.push(o);
                            for (n = Eo(t, null, r, n),
                            t.child = n; n; )
                                n.flags = -3 & n.flags | 1024,
                                n = n.sibling
                        } else
                            Ai(e, t, r, n),
                            Go();
                        t = t.child
                    }
                    return t;
                case 5:
                    return zo(t),
                    null === e && $o(t),
                    r = t.type,
                    a = t.pendingProps,
                    o = null !== e ? e.memoizedProps : null,
                    l = a.children,
                    Br(r, a) ? l = null : null !== o && Br(r, o) && (t.flags |= 16),
                    Hi(e, t),
                    Ai(e, t, l, n),
                    t.child;
                case 6:
                    return null === e && $o(t),
                    null;
                case 13:
                    return Zi(e, t, n);
                case 4:
                    return Do(t, t.stateNode.containerInfo),
                    r = t.pendingProps,
                    null === e ? t.child = Oo(t, null, r, n) : Ai(e, t, r, n),
                    t.child;
                case 11:
                    return r = t.type,
                    a = t.pendingProps,
                    Fi(e, t, r, a = t.elementType === r ? a : Ja(r, a), n);
                case 7:
                    return Ai(e, t, t.pendingProps, n),
                    t.child;
                case 8:
                case 12:
                    return Ai(e, t, t.pendingProps.children, n),
                    t.child;
                case 10:
                    e: {
                        r = t.type._context,
                        a = t.pendingProps,
                        l = t.memoizedProps,
                        o = a.value;
                        var s = t.type._context;
                        if (da(Za, s._currentValue),
                        s._currentValue = o,
                        null !== l)
                            if (s = l.value,
                            0 === (o = cr(s, o) ? 0 : 0 | ("function" === typeof r._calculateChangedBits ? r._calculateChangedBits(s, o) : 1073741823))) {
                                if (l.children === a.children && !ha.current) {
                                    t = ol(e, t, n);
                                    break e
                                }
                            } else
                                for (null !== (s = t.child) && (s.return = t); null !== s; ) {
                                    var u = s.dependencies;
                                    if (null !== u) {
                                        l = s.child;
                                        for (var c = u.firstContext; null !== c; ) {
                                            if (c.context === r && 0 !== (c.observedBits & o)) {
                                                1 === s.tag && ((c = co(-1, n & -n)).tag = 2,
                                                fo(s, c)),
                                                s.lanes |= n,
                                                null !== (c = s.alternate) && (c.lanes |= n),
                                                ao(s.return, n),
                                                u.lanes |= n;
                                                break
                                            }
                                            c = c.next
                                        }
                                    } else
                                        l = 10 === s.tag && s.type === t.type ? null : s.child;
                                    if (null !== l)
                                        l.return = s;
                                    else
                                        for (l = s; null !== l; ) {
                                            if (l === t) {
                                                l = null;
                                                break
                                            }
                                            if (null !== (s = l.sibling)) {
                                                s.return = l.return,
                                                l = s;
                                                break
                                            }
                                            l = l.return
                                        }
                                    s = l
                                }
                        Ai(e, t, a.children, n),
                        t = t.child
                    }
                    return t;
                case 9:
                    return a = t.type,
                    r = (o = t.pendingProps).children,
                    oo(t, n),
                    r = r(a = io(a, o.unstable_observedBits)),
                    t.flags |= 1,
                    Ai(e, t, r, n),
                    t.child;
                case 14:
                    return o = Ja(a = t.type, t.pendingProps),
                    Ui(e, t, a, o = Ja(a.type, o), r, n);
                case 15:
                    return qi(e, t, t.type, t.pendingProps, r, n);
                case 17:
                    return r = t.type,
                    a = t.pendingProps,
                    a = t.elementType === r ? a : Ja(r, a),
                    null !== e && (e.alternate = null,
                    t.alternate = null,
                    t.flags |= 2),
                    t.tag = 1,
                    va(r) ? (e = !0,
                    xa(t)) : e = !1,
                    oo(t, n),
                    wo(t, r, a),
                    ko(t, r, a, n),
                    Yi(null, t, r, !0, e, n);
                case 19:
                    return al(e, t, n);
                case 23:
                case 24:
                    return Vi(e, t, n)
                }
                throw Error(i(156, t.tag))
            }
            ,
            au.prototype.render = function(e) {
                eu(e, this._internalRoot, null, null)
            }
            ,
            au.prototype.unmount = function() {
                var e = this._internalRoot
                  , t = e.containerInfo;
                eu(null, e, null, (function() {
                    t[ea] = null
                }
                ))
            }
            ,
            tt = function(e) {
                13 === e.tag && (hs(e, 4, fs()),
                ru(e, 4))
            }
            ,
            nt = function(e) {
                13 === e.tag && (hs(e, 67108864, fs()),
                ru(e, 67108864))
            }
            ,
            rt = function(e) {
                if (13 === e.tag) {
                    var t = fs()
                      , n = ps(e);
                    hs(e, n, t),
                    ru(e, n)
                }
            }
            ,
            at = function(e, t) {
                return t()
            }
            ,
            Oe = function(e, t, n) {
                switch (t) {
                case "input":
                    if (ne(e, n),
                    t = n.name,
                    "radio" === n.type && null != t) {
                        for (n = e; n.parentNode; )
                            n = n.parentNode;
                        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'),
                        t = 0; t < n.length; t++) {
                            var r = n[t];
                            if (r !== e && r.form === e.form) {
                                var a = oa(r);
                                if (!a)
                                    throw Error(i(90));
                                J(r),
                                ne(r, a)
                            }
                        }
                    }
                    break;
                case "textarea":
                    ue(e, n);
                    break;
                case "select":
                    null != (t = n.value) && ie(e, !!n.multiple, t, !1)
                }
            }
            ,
            Te = ws,
            De = function(e, t, n, r, a) {
                var o = Ml;
                Ml |= 4;
                try {
                    return Ya(98, e.bind(null, t, n, r, a))
                } finally {
                    0 === (Ml = o) && (Wl(),
                    Ga())
                }
            }
            ,
            Re = function() {
                0 === (49 & Ml) && (function() {
                    if (null !== as) {
                        var e = as;
                        as = null,
                        e.forEach((function(e) {
                            e.expiredLanes |= 24 & e.pendingLanes,
                            ms(e, Ha())
                        }
                        ))
                    }
                    Ga()
                }(),
                Rs())
            }
            ,
            ze = function(e, t) {
                var n = Ml;
                Ml |= 2;
                try {
                    return e(t)
                } finally {
                    0 === (Ml = n) && (Wl(),
                    Ga())
                }
            }
            ;
            var su = {
                Events: [ra, aa, oa, Le, Me, Rs, {
                    current: !1
                }]
            }
              , uu = {
                findFiberByHostInstance: na,
                bundleType: 0,
                version: "17.0.2",
                rendererPackageName: "react-dom"
            }
              , cu = {
                bundleType: uu.bundleType,
                version: uu.version,
                rendererPackageName: uu.rendererPackageName,
                rendererConfig: uu.rendererConfig,
                overrideHookState: null,
                overrideHookStateDeletePath: null,
                overrideHookStateRenamePath: null,
                overrideProps: null,
                overridePropsDeletePath: null,
                overridePropsRenamePath: null,
                setSuspenseHandler: null,
                scheduleUpdate: null,
                currentDispatcherRef: x.ReactCurrentDispatcher,
                findHostInstanceByFiber: function(e) {
                    return null === (e = Xe(e)) ? null : e.stateNode
                },
                findFiberByHostInstance: uu.findFiberByHostInstance || function() {
                    return null
                }
                ,
                findHostInstancesForRefresh: null,
                scheduleRefresh: null,
                scheduleRoot: null,
                setRefreshHandler: null,
                getCurrentFiber: null
            };
            if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
                var du = __REACT_DEVTOOLS_GLOBAL_HOOK__;
                if (!du.isDisabled && du.supportsFiber)
                    try {
                        _a = du.inject(cu),
                        Ca = du
                    } catch (me) {}
            }
            t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = su,
            t.createPortal = lu,
            t.findDOMNode = function(e) {
                if (null == e)
                    return null;
                if (1 === e.nodeType)
                    return e;
                var t = e._reactInternals;
                if (void 0 === t) {
                    if ("function" === typeof e.render)
                        throw Error(i(188));
                    throw Error(i(268, Object.keys(e)))
                }
                return e = null === (e = Xe(t)) ? null : e.stateNode
            }
            ,
            t.flushSync = function(e, t) {
                var n = Ml;
                if (0 !== (48 & n))
                    return e(t);
                Ml |= 1;
                try {
                    if (e)
                        return Ya(99, e.bind(null, t))
                } finally {
                    Ml = n,
                    Ga()
                }
            }
            ,
            t.hydrate = function(e, t, n) {
                if (!ou(t))
                    throw Error(i(200));
                return iu(null, e, t, !0, n)
            }
            ,
            t.render = function(e, t, n) {
                if (!ou(t))
                    throw Error(i(200));
                return iu(null, e, t, !1, n)
            }
            ,
            t.unmountComponentAtNode = function(e) {
                if (!ou(e))
                    throw Error(i(40));
                return !!e._reactRootContainer && (xs((function() {
                    iu(null, null, e, !1, (function() {
                        e._reactRootContainer = null,
                        e[ea] = null
                    }
                    ))
                }
                )),
                !0)
            }
            ,
            t.unstable_batchedUpdates = ws,
            t.unstable_createPortal = function(e, t) {
                return lu(e, t, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null)
            }
            ,
            t.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
                if (!ou(n))
                    throw Error(i(200));
                if (null == e || void 0 === e._reactInternals)
                    throw Error(i(38));
                return iu(e, t, n, !1, r)
            }
            ,
            t.version = "17.0.2"
        },
        164: function(e, t, n) {
            "use strict";
            !function e() {
                if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)
                    try {
                        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)
                    } catch (t) {
                        console.error(t)
                    }
            }(),
            e.exports = n(463)
        },
        374: function(e, t, n) {
            "use strict";
            n(725);
            var r = n(791)
              , a = 60103;
            if (t.Fragment = 60107,
            "function" === typeof Symbol && Symbol.for) {
                var o = Symbol.for;
                a = o("react.element"),
                t.Fragment = o("react.fragment")
            }
            var i = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
              , l = Object.prototype.hasOwnProperty
              , s = {
                key: !0,
                ref: !0,
                __self: !0,
                __source: !0
            };
            function u(e, t, n) {
                var r, o = {}, u = null, c = null;
                for (r in void 0 !== n && (u = "" + n),
                void 0 !== t.key && (u = "" + t.key),
                void 0 !== t.ref && (c = t.ref),
                t)
                    l.call(t, r) && !s.hasOwnProperty(r) && (o[r] = t[r]);
                if (e && e.defaultProps)
                    for (r in t = e.defaultProps)
                        void 0 === o[r] && (o[r] = t[r]);
                return {
                    $$typeof: a,
                    type: e,
                    key: u,
                    ref: c,
                    props: o,
                    _owner: i.current
                }
            }
            t.jsx = u,
            t.jsxs = u
        },
        117: function(e, t, n) {
            "use strict";
            var r = n(725)
              , a = 60103
              , o = 60106;
            t.Fragment = 60107,
            t.StrictMode = 60108,
            t.Profiler = 60114;
            var i = 60109
              , l = 60110
              , s = 60112;
            t.Suspense = 60113;
            var u = 60115
              , c = 60116;
            if ("function" === typeof Symbol && Symbol.for) {
                var d = Symbol.for;
                a = d("react.element"),
                o = d("react.portal"),
                t.Fragment = d("react.fragment"),
                t.StrictMode = d("react.strict_mode"),
                t.Profiler = d("react.profiler"),
                i = d("react.provider"),
                l = d("react.context"),
                s = d("react.forward_ref"),
                t.Suspense = d("react.suspense"),
                u = d("react.memo"),
                c = d("react.lazy")
            }
            var f = "function" === typeof Symbol && Symbol.iterator;
            function p(e) {
                for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
                    t += "&args[]=" + encodeURIComponent(arguments[n]);
                return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
            }
            var h = {
                isMounted: function() {
                    return !1
                },
                enqueueForceUpdate: function() {},
                enqueueReplaceState: function() {},
                enqueueSetState: function() {}
            }
              , g = {};
            function m(e, t, n) {
                this.props = e,
                this.context = t,
                this.refs = g,
                this.updater = n || h
            }
            function v() {}
            function y(e, t, n) {
                this.props = e,
                this.context = t,
                this.refs = g,
                this.updater = n || h
            }
            m.prototype.isReactComponent = {},
            m.prototype.setState = function(e, t) {
                if ("object" !== typeof e && "function" !== typeof e && null != e)
                    throw Error(p(85));
                this.updater.enqueueSetState(this, e, t, "setState")
            }
            ,
            m.prototype.forceUpdate = function(e) {
                this.updater.enqueueForceUpdate(this, e, "forceUpdate")
            }
            ,
            v.prototype = m.prototype;
            var b = y.prototype = new v;
            b.constructor = y,
            r(b, m.prototype),
            b.isPureReactComponent = !0;
            var w = {
                current: null
            }
              , x = Object.prototype.hasOwnProperty
              , k = {
                key: !0,
                ref: !0,
                __self: !0,
                __source: !0
            };
            function _(e, t, n) {
                var r, o = {}, i = null, l = null;
                if (null != t)
                    for (r in void 0 !== t.ref && (l = t.ref),
                    void 0 !== t.key && (i = "" + t.key),
                    t)
                        x.call(t, r) && !k.hasOwnProperty(r) && (o[r] = t[r]);
                var s = arguments.length - 2;
                if (1 === s)
                    o.children = n;
                else if (1 < s) {
                    for (var u = Array(s), c = 0; c < s; c++)
                        u[c] = arguments[c + 2];
                    o.children = u
                }
                if (e && e.defaultProps)
                    for (r in s = e.defaultProps)
                        void 0 === o[r] && (o[r] = s[r]);
                return {
                    $$typeof: a,
                    type: e,
                    key: i,
                    ref: l,
                    props: o,
                    _owner: w.current
                }
            }
            function C(e) {
                return "object" === typeof e && null !== e && e.$$typeof === a
            }
            var S = /\/+/g;
            function j(e, t) {
                return "object" === typeof e && null !== e && null != e.key ? function(e) {
                    var t = {
                        "=": "=0",
                        ":": "=2"
                    };
                    return "$" + e.replace(/[=:]/g, (function(e) {
                        return t[e]
                    }
                    ))
                }("" + e.key) : t.toString(36)
            }
            function O(e, t, n, r, i) {
                var l = typeof e;
                "undefined" !== l && "boolean" !== l || (e = null);
                var s = !1;
                if (null === e)
                    s = !0;
                else
                    switch (l) {
                    case "string":
                    case "number":
                        s = !0;
                        break;
                    case "object":
                        switch (e.$$typeof) {
                        case a:
                        case o:
                            s = !0
                        }
                    }
                if (s)
                    return i = i(s = e),
                    e = "" === r ? "." + j(s, 0) : r,
                    Array.isArray(i) ? (n = "",
                    null != e && (n = e.replace(S, "$&/") + "/"),
                    O(i, t, n, "", (function(e) {
                        return e
                    }
                    ))) : null != i && (C(i) && (i = function(e, t) {
                        return {
                            $$typeof: a,
                            type: e.type,
                            key: t,
                            ref: e.ref,
                            props: e.props,
                            _owner: e._owner
                        }
                    }(i, n + (!i.key || s && s.key === i.key ? "" : ("" + i.key).replace(S, "$&/") + "/") + e)),
                    t.push(i)),
                    1;
                if (s = 0,
                r = "" === r ? "." : r + ":",
                Array.isArray(e))
                    for (var u = 0; u < e.length; u++) {
                        var c = r + j(l = e[u], u);
                        s += O(l, t, n, c, i)
                    }
                else if (c = function(e) {
                    return null === e || "object" !== typeof e ? null : "function" === typeof (e = f && e[f] || e["@@iterator"]) ? e : null
                }(e),
                "function" === typeof c)
                    for (e = c.call(e),
                    u = 0; !(l = e.next()).done; )
                        s += O(l = l.value, t, n, c = r + j(l, u++), i);
                else if ("object" === l)
                    throw t = "" + e,
                    Error(p(31, "[object Object]" === t ? "object with keys {" + Object.keys(e).join(", ") + "}" : t));
                return s
            }
            function E(e, t, n) {
                if (null == e)
                    return e;
                var r = []
                  , a = 0;
                return O(e, r, "", "", (function(e) {
                    return t.call(n, e, a++)
                }
                )),
                r
            }
            function P(e) {
                if (-1 === e._status) {
                    var t = e._result;
                    t = t(),
                    e._status = 0,
                    e._result = t,
                    t.then((function(t) {
                        0 === e._status && (t = t.default,
                        e._status = 1,
                        e._result = t)
                    }
                    ), (function(t) {
                        0 === e._status && (e._status = 2,
                        e._result = t)
                    }
                    ))
                }
                if (1 === e._status)
                    return e._result;
                throw e._result
            }
            var N = {
                current: null
            };
            function L() {
                var e = N.current;
                if (null === e)
                    throw Error(p(321));
                return e
            }
            var M = {
                ReactCurrentDispatcher: N,
                ReactCurrentBatchConfig: {
                    transition: 0
                },
                ReactCurrentOwner: w,
                IsSomeRendererActing: {
                    current: !1
                },
                assign: r
            };
            t.Children = {
                map: E,
                forEach: function(e, t, n) {
                    E(e, (function() {
                        t.apply(this, arguments)
                    }
                    ), n)
                },
                count: function(e) {
                    var t = 0;
                    return E(e, (function() {
                        t++
                    }
                    )),
                    t
                },
                toArray: function(e) {
                    return E(e, (function(e) {
                        return e
                    }
                    )) || []
                },
                only: function(e) {
                    if (!C(e))
                        throw Error(p(143));
                    return e
                }
            },
            t.Component = m,
            t.PureComponent = y,
            t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = M,
            t.cloneElement = function(e, t, n) {
                if (null === e || void 0 === e)
                    throw Error(p(267, e));
                var o = r({}, e.props)
                  , i = e.key
                  , l = e.ref
                  , s = e._owner;
                if (null != t) {
                    if (void 0 !== t.ref && (l = t.ref,
                    s = w.current),
                    void 0 !== t.key && (i = "" + t.key),
                    e.type && e.type.defaultProps)
                        var u = e.type.defaultProps;
                    for (c in t)
                        x.call(t, c) && !k.hasOwnProperty(c) && (o[c] = void 0 === t[c] && void 0 !== u ? u[c] : t[c])
                }
                var c = arguments.length - 2;
                if (1 === c)
                    o.children = n;
                else if (1 < c) {
                    u = Array(c);
                    for (var d = 0; d < c; d++)
                        u[d] = arguments[d + 2];
                    o.children = u
                }
                return {
                    $$typeof: a,
                    type: e.type,
                    key: i,
                    ref: l,
                    props: o,
                    _owner: s
                }
            }
            ,
            t.createContext = function(e, t) {
                return void 0 === t && (t = null),
                (e = {
                    $$typeof: l,
                    _calculateChangedBits: t,
                    _currentValue: e,
                    _currentValue2: e,
                    _threadCount: 0,
                    Provider: null,
                    Consumer: null
                }).Provider = {
                    $$typeof: i,
                    _context: e
                },
                e.Consumer = e
            }
            ,
            t.createElement = _,
            t.createFactory = function(e) {
                var t = _.bind(null, e);
                return t.type = e,
                t
            }
            ,
            t.createRef = function() {
                return {
                    current: null
                }
            }
            ,
            t.forwardRef = function(e) {
                return {
                    $$typeof: s,
                    render: e
                }
            }
            ,
            t.isValidElement = C,
            t.lazy = function(e) {
                return {
                    $$typeof: c,
                    _payload: {
                        _status: -1,
                        _result: e
                    },
                    _init: P
                }
            }
            ,
            t.memo = function(e, t) {
                return {
                    $$typeof: u,
                    type: e,
                    compare: void 0 === t ? null : t
                }
            }
            ,
            t.useCallback = function(e, t) {
                return L().useCallback(e, t)
            }
            ,
            t.useContext = function(e, t) {
                return L().useContext(e, t)
            }
            ,
            t.useDebugValue = function() {}
            ,
            t.useEffect = function(e, t) {
                return L().useEffect(e, t)
            }
            ,
            t.useImperativeHandle = function(e, t, n) {
                return L().useImperativeHandle(e, t, n)
            }
            ,
            t.useLayoutEffect = function(e, t) {
                return L().useLayoutEffect(e, t)
            }
            ,
            t.useMemo = function(e, t) {
                return L().useMemo(e, t)
            }
            ,
            t.useReducer = function(e, t, n) {
                return L().useReducer(e, t, n)
            }
            ,
            t.useRef = function(e) {
                return L().useRef(e)
            }
            ,
            t.useState = function(e) {
                return L().useState(e)
            }
            ,
            t.version = "17.0.2"
        },
        791: function(e, t, n) {
            "use strict";
            e.exports = n(117)
        },
        184: function(e, t, n) {
            "use strict";
            e.exports = n(374)
        },
        813: function(e, t) {
            "use strict";
            var n, r, a, o;
            if ("object" === typeof performance && "function" === typeof performance.now) {
                var i = performance;
                t.unstable_now = function() {
                    return i.now()
                }
            } else {
                var l = Date
                  , s = l.now();
                t.unstable_now = function() {
                    return l.now() - s
                }
            }
            if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
                var u = null
                  , c = null
                  , d = function e() {
                    if (null !== u)
                        try {
                            var n = t.unstable_now();
                            u(!0, n),
                            u = null
                        } catch (r) {
                            throw setTimeout(e, 0),
                            r
                        }
                };
                n = function(e) {
                    null !== u ? setTimeout(n, 0, e) : (u = e,
                    setTimeout(d, 0))
                }
                ,
                r = function(e, t) {
                    c = setTimeout(e, t)
                }
                ,
                a = function() {
                    clearTimeout(c)
                }
                ,
                t.unstable_shouldYield = function() {
                    return !1
                }
                ,
                o = t.unstable_forceFrameRate = function() {}
            } else {
                var f = window.setTimeout
                  , p = window.clearTimeout;
                if ("undefined" !== typeof console) {
                    var h = window.cancelAnimationFrame;
                    "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),
                    "function" !== typeof h && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")
                }
                var g = !1
                  , m = null
                  , v = -1
                  , y = 5
                  , b = 0;
                t.unstable_shouldYield = function() {
                    return t.unstable_now() >= b
                }
                ,
                o = function() {}
                ,
                t.unstable_forceFrameRate = function(e) {
                    0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : y = 0 < e ? Math.floor(1e3 / e) : 5
                }
                ;
                var w = new MessageChannel
                  , x = w.port2;
                w.port1.onmessage = function() {
                    if (null !== m) {
                        var e = t.unstable_now();
                        b = e + y;
                        try {
                            m(!0, e) ? x.postMessage(null) : (g = !1,
                            m = null)
                        } catch (n) {
                            throw x.postMessage(null),
                            n
                        }
                    } else
                        g = !1
                }
                ,
                n = function(e) {
                    m = e,
                    g || (g = !0,
                    x.postMessage(null))
                }
                ,
                r = function(e, n) {
                    v = f((function() {
                        e(t.unstable_now())
                    }
                    ), n)
                }
                ,
                a = function() {
                    p(v),
                    v = -1
                }
            }
            function k(e, t) {
                var n = e.length;
                e.push(t);
                e: for (; ; ) {
                    var r = n - 1 >>> 1
                      , a = e[r];
                    if (!(void 0 !== a && 0 < S(a, t)))
                        break e;
                    e[r] = t,
                    e[n] = a,
                    n = r
                }
            }
            function _(e) {
                return void 0 === (e = e[0]) ? null : e
            }
            function C(e) {
                var t = e[0];
                if (void 0 !== t) {
                    var n = e.pop();
                    if (n !== t) {
                        e[0] = n;
                        e: for (var r = 0, a = e.length; r < a; ) {
                            var o = 2 * (r + 1) - 1
                              , i = e[o]
                              , l = o + 1
                              , s = e[l];
                            if (void 0 !== i && 0 > S(i, n))
                                void 0 !== s && 0 > S(s, i) ? (e[r] = s,
                                e[l] = n,
                                r = l) : (e[r] = i,
                                e[o] = n,
                                r = o);
                            else {
                                if (!(void 0 !== s && 0 > S(s, n)))
                                    break e;
                                e[r] = s,
                                e[l] = n,
                                r = l
                            }
                        }
                    }
                    return t
                }
                return null
            }
            function S(e, t) {
                var n = e.sortIndex - t.sortIndex;
                return 0 !== n ? n : e.id - t.id
            }
            var j = []
              , O = []
              , E = 1
              , P = null
              , N = 3
              , L = !1
              , M = !1
              , T = !1;
            function D(e) {
                for (var t = _(O); null !== t; ) {
                    if (null === t.callback)
                        C(O);
                    else {
                        if (!(t.startTime <= e))
                            break;
                        C(O),
                        t.sortIndex = t.expirationTime,
                        k(j, t)
                    }
                    t = _(O)
                }
            }
            function R(e) {
                if (T = !1,
                D(e),
                !M)
                    if (null !== _(j))
                        M = !0,
                        n(z);
                    else {
                        var t = _(O);
                        null !== t && r(R, t.startTime - e)
                    }
            }
            function z(e, n) {
                M = !1,
                T && (T = !1,
                a()),
                L = !0;
                var o = N;
                try {
                    for (D(n),
                    P = _(j); null !== P && (!(P.expirationTime > n) || e && !t.unstable_shouldYield()); ) {
                        var i = P.callback;
                        if ("function" === typeof i) {
                            P.callback = null,
                            N = P.priorityLevel;
                            var l = i(P.expirationTime <= n);
                            n = t.unstable_now(),
                            "function" === typeof l ? P.callback = l : P === _(j) && C(j),
                            D(n)
                        } else
                            C(j);
                        P = _(j)
                    }
                    if (null !== P)
                        var s = !0;
                    else {
                        var u = _(O);
                        null !== u && r(R, u.startTime - n),
                        s = !1
                    }
                    return s
                } finally {
                    P = null,
                    N = o,
                    L = !1
                }
            }
            var I = o;
            t.unstable_IdlePriority = 5,
            t.unstable_ImmediatePriority = 1,
            t.unstable_LowPriority = 4,
            t.unstable_NormalPriority = 3,
            t.unstable_Profiling = null,
            t.unstable_UserBlockingPriority = 2,
            t.unstable_cancelCallback = function(e) {
                e.callback = null
            }
            ,
            t.unstable_continueExecution = function() {
                M || L || (M = !0,
                n(z))
            }
            ,
            t.unstable_getCurrentPriorityLevel = function() {
                return N
            }
            ,
            t.unstable_getFirstCallbackNode = function() {
                return _(j)
            }
            ,
            t.unstable_next = function(e) {
                switch (N) {
                case 1:
                case 2:
                case 3:
                    var t = 3;
                    break;
                default:
                    t = N
                }
                var n = N;
                N = t;
                try {
                    return e()
                } finally {
                    N = n
                }
            }
            ,
            t.unstable_pauseExecution = function() {}
            ,
            t.unstable_requestPaint = I,
            t.unstable_runWithPriority = function(e, t) {
                switch (e) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    e = 3
                }
                var n = N;
                N = e;
                try {
                    return t()
                } finally {
                    N = n
                }
            }
            ,
            t.unstable_scheduleCallback = function(e, o, i) {
                var l = t.unstable_now();
                switch ("object" === typeof i && null !== i ? i = "number" === typeof (i = i.delay) && 0 < i ? l + i : l : i = l,
                e) {
                case 1:
                    var s = -1;
                    break;
                case 2:
                    s = 250;
                    break;
                case 5:
                    s = 1073741823;
                    break;
                case 4:
                    s = 1e4;
                    break;
                default:
                    s = 5e3
                }
                return e = {
                    id: E++,
                    callback: o,
                    priorityLevel: e,
                    startTime: i,
                    expirationTime: s = i + s,
                    sortIndex: -1
                },
                i > l ? (e.sortIndex = i,
                k(O, e),
                null === _(j) && e === _(O) && (T ? a() : T = !0,
                r(R, i - l))) : (e.sortIndex = s,
                k(j, e),
                M || L || (M = !0,
                n(z))),
                e
            }
            ,
            t.unstable_wrapCallback = function(e) {
                var t = N;
                return function() {
                    var n = N;
                    N = t;
                    try {
                        return e.apply(this, arguments)
                    } finally {
                        N = n
                    }
                }
            }
        },
        296: function(e, t, n) {
            "use strict";
            e.exports = n(813)
        },
        61: function(e, t, n) {
            var r = n(698).default;
            function a() {
                "use strict";
                e.exports = a = function() {
                    return t
                }
                ,
                e.exports.__esModule = !0,
                e.exports.default = e.exports;
                var t = {}
                  , n = Object.prototype
                  , o = n.hasOwnProperty
                  , i = "function" == typeof Symbol ? Symbol : {}
                  , l = i.iterator || "@@iterator"
                  , s = i.asyncIterator || "@@asyncIterator"
                  , u = i.toStringTag || "@@toStringTag";
                function c(e, t, n) {
                    return Object.defineProperty(e, t, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }),
                    e[t]
                }
                try {
                    c({}, "")
                } catch (P) {
                    c = function(e, t, n) {
                        return e[t] = n
                    }
                }
                function d(e, t, n, r) {
                    var a = t && t.prototype instanceof h ? t : h
                      , o = Object.create(a.prototype)
                      , i = new j(r || []);
                    return o._invoke = function(e, t, n) {
                        var r = "suspendedStart";
                        return function(a, o) {
                            if ("executing" === r)
                                throw new Error("Generator is already running");
                            if ("completed" === r) {
                                if ("throw" === a)
                                    throw o;
                                return E()
                            }
                            for (n.method = a,
                            n.arg = o; ; ) {
                                var i = n.delegate;
                                if (i) {
                                    var l = _(i, n);
                                    if (l) {
                                        if (l === p)
                                            continue;
                                        return l
                                    }
                                }
                                if ("next" === n.method)
                                    n.sent = n._sent = n.arg;
                                else if ("throw" === n.method) {
                                    if ("suspendedStart" === r)
                                        throw r = "completed",
                                        n.arg;
                                    n.dispatchException(n.arg)
                                } else
                                    "return" === n.method && n.abrupt("return", n.arg);
                                r = "executing";
                                var s = f(e, t, n);
                                if ("normal" === s.type) {
                                    if (r = n.done ? "completed" : "suspendedYield",
                                    s.arg === p)
                                        continue;
                                    return {
                                        value: s.arg,
                                        done: n.done
                                    }
                                }
                                "throw" === s.type && (r = "completed",
                                n.method = "throw",
                                n.arg = s.arg)
                            }
                        }
                    }(e, n, i),
                    o
                }
                function f(e, t, n) {
                    try {
                        return {
                            type: "normal",
                            arg: e.call(t, n)
                        }
                    } catch (P) {
                        return {
                            type: "throw",
                            arg: P
                        }
                    }
                }
                t.wrap = d;
                var p = {};
                function h() {}
                function g() {}
                function m() {}
                var v = {};
                c(v, l, (function() {
                    return this
                }
                ));
                var y = Object.getPrototypeOf
                  , b = y && y(y(O([])));
                b && b !== n && o.call(b, l) && (v = b);
                var w = m.prototype = h.prototype = Object.create(v);
                function x(e) {
                    ["next", "throw", "return"].forEach((function(t) {
                        c(e, t, (function(e) {
                            return this._invoke(t, e)
                        }
                        ))
                    }
                    ))
                }
                function k(e, t) {
                    function n(a, i, l, s) {
                        var u = f(e[a], e, i);
                        if ("throw" !== u.type) {
                            var c = u.arg
                              , d = c.value;
                            return d && "object" == r(d) && o.call(d, "__await") ? t.resolve(d.__await).then((function(e) {
                                n("next", e, l, s)
                            }
                            ), (function(e) {
                                n("throw", e, l, s)
                            }
                            )) : t.resolve(d).then((function(e) {
                                c.value = e,
                                l(c)
                            }
                            ), (function(e) {
                                return n("throw", e, l, s)
                            }
                            ))
                        }
                        s(u.arg)
                    }
                    var a;
                    this._invoke = function(e, r) {
                        function o() {
                            return new t((function(t, a) {
                                n(e, r, t, a)
                            }
                            ))
                        }
                        return a = a ? a.then(o, o) : o()
                    }
                }
                function _(e, t) {
                    var n = e.iterator[t.method];
                    if (void 0 === n) {
                        if (t.delegate = null,
                        "throw" === t.method) {
                            if (e.iterator.return && (t.method = "return",
                            t.arg = void 0,
                            _(e, t),
                            "throw" === t.method))
                                return p;
                            t.method = "throw",
                            t.arg = new TypeError("The iterator does not provide a 'throw' method")
                        }
                        return p
                    }
                    var r = f(n, e.iterator, t.arg);
                    if ("throw" === r.type)
                        return t.method = "throw",
                        t.arg = r.arg,
                        t.delegate = null,
                        p;
                    var a = r.arg;
                    return a ? a.done ? (t[e.resultName] = a.value,
                    t.next = e.nextLoc,
                    "return" !== t.method && (t.method = "next",
                    t.arg = void 0),
                    t.delegate = null,
                    p) : a : (t.method = "throw",
                    t.arg = new TypeError("iterator result is not an object"),
                    t.delegate = null,
                    p)
                }
                function C(e) {
                    var t = {
                        tryLoc: e[0]
                    };
                    1 in e && (t.catchLoc = e[1]),
                    2 in e && (t.finallyLoc = e[2],
                    t.afterLoc = e[3]),
                    this.tryEntries.push(t)
                }
                function S(e) {
                    var t = e.completion || {};
                    t.type = "normal",
                    delete t.arg,
                    e.completion = t
                }
                function j(e) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }],
                    e.forEach(C, this),
                    this.reset(!0)
                }
                function O(e) {
                    if (e) {
                        var t = e[l];
                        if (t)
                            return t.call(e);
                        if ("function" == typeof e.next)
                            return e;
                        if (!isNaN(e.length)) {
                            var n = -1
                              , r = function t() {
                                for (; ++n < e.length; )
                                    if (o.call(e, n))
                                        return t.value = e[n],
                                        t.done = !1,
                                        t;
                                return t.value = void 0,
                                t.done = !0,
                                t
                            };
                            return r.next = r
                        }
                    }
                    return {
                        next: E
                    }
                }
                function E() {
                    return {
                        value: void 0,
                        done: !0
                    }
                }
                return g.prototype = m,
                c(w, "constructor", m),
                c(m, "constructor", g),
                g.displayName = c(m, u, "GeneratorFunction"),
                t.isGeneratorFunction = function(e) {
                    var t = "function" == typeof e && e.constructor;
                    return !!t && (t === g || "GeneratorFunction" === (t.displayName || t.name))
                }
                ,
                t.mark = function(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, m) : (e.__proto__ = m,
                    c(e, u, "GeneratorFunction")),
                    e.prototype = Object.create(w),
                    e
                }
                ,
                t.awrap = function(e) {
                    return {
                        __await: e
                    }
                }
                ,
                x(k.prototype),
                c(k.prototype, s, (function() {
                    return this
                }
                )),
                t.AsyncIterator = k,
                t.async = function(e, n, r, a, o) {
                    void 0 === o && (o = Promise);
                    var i = new k(d(e, n, r, a),o);
                    return t.isGeneratorFunction(n) ? i : i.next().then((function(e) {
                        return e.done ? e.value : i.next()
                    }
                    ))
                }
                ,
                x(w),
                c(w, u, "Generator"),
                c(w, l, (function() {
                    return this
                }
                )),
                c(w, "toString", (function() {
                    return "[object Generator]"
                }
                )),
                t.keys = function(e) {
                    var t = [];
                    for (var n in e)
                        t.push(n);
                    return t.reverse(),
                    function n() {
                        for (; t.length; ) {
                            var r = t.pop();
                            if (r in e)
                                return n.value = r,
                                n.done = !1,
                                n
                        }
                        return n.done = !0,
                        n
                    }
                }
                ,
                t.values = O,
                j.prototype = {
                    constructor: j,
                    reset: function(e) {
                        if (this.prev = 0,
                        this.next = 0,
                        this.sent = this._sent = void 0,
                        this.done = !1,
                        this.delegate = null,
                        this.method = "next",
                        this.arg = void 0,
                        this.tryEntries.forEach(S),
                        !e)
                            for (var t in this)
                                "t" === t.charAt(0) && o.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0)
                    },
                    stop: function() {
                        this.done = !0;
                        var e = this.tryEntries[0].completion;
                        if ("throw" === e.type)
                            throw e.arg;
                        return this.rval
                    },
                    dispatchException: function(e) {
                        if (this.done)
                            throw e;
                        var t = this;
                        function n(n, r) {
                            return i.type = "throw",
                            i.arg = e,
                            t.next = n,
                            r && (t.method = "next",
                            t.arg = void 0),
                            !!r
                        }
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var a = this.tryEntries[r]
                              , i = a.completion;
                            if ("root" === a.tryLoc)
                                return n("end");
                            if (a.tryLoc <= this.prev) {
                                var l = o.call(a, "catchLoc")
                                  , s = o.call(a, "finallyLoc");
                                if (l && s) {
                                    if (this.prev < a.catchLoc)
                                        return n(a.catchLoc, !0);
                                    if (this.prev < a.finallyLoc)
                                        return n(a.finallyLoc)
                                } else if (l) {
                                    if (this.prev < a.catchLoc)
                                        return n(a.catchLoc, !0)
                                } else {
                                    if (!s)
                                        throw new Error("try statement without catch or finally");
                                    if (this.prev < a.finallyLoc)
                                        return n(a.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(e, t) {
                        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                            var r = this.tryEntries[n];
                            if (r.tryLoc <= this.prev && o.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                                var a = r;
                                break
                            }
                        }
                        a && ("break" === e || "continue" === e) && a.tryLoc <= t && t <= a.finallyLoc && (a = null);
                        var i = a ? a.completion : {};
                        return i.type = e,
                        i.arg = t,
                        a ? (this.method = "next",
                        this.next = a.finallyLoc,
                        p) : this.complete(i)
                    },
                    complete: function(e, t) {
                        if ("throw" === e.type)
                            throw e.arg;
                        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg,
                        this.method = "return",
                        this.next = "end") : "normal" === e.type && t && (this.next = t),
                        p
                    },
                    finish: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var n = this.tryEntries[t];
                            if (n.finallyLoc === e)
                                return this.complete(n.completion, n.afterLoc),
                                S(n),
                                p
                        }
                    },
                    catch: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var n = this.tryEntries[t];
                            if (n.tryLoc === e) {
                                var r = n.completion;
                                if ("throw" === r.type) {
                                    var a = r.arg;
                                    S(n)
                                }
                                return a
                            }
                        }
                        throw new Error("illegal catch attempt")
                    },
                    delegateYield: function(e, t, n) {
                        return this.delegate = {
                            iterator: O(e),
                            resultName: t,
                            nextLoc: n
                        },
                        "next" === this.method && (this.arg = void 0),
                        p
                    }
                },
                t
            }
            e.exports = a,
            e.exports.__esModule = !0,
            e.exports.default = e.exports
        },
        698: function(e) {
            function t(n) {
                return e.exports = t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                e.exports.__esModule = !0,
                e.exports.default = e.exports,
                t(n)
            }
            e.exports = t,
            e.exports.__esModule = !0,
            e.exports.default = e.exports
        },
        687: function(e, t, n) {
            var r = n(61)();
            e.exports = r;
            try {
                regeneratorRuntime = r
            } catch (a) {
                "object" === typeof globalThis ? globalThis.regeneratorRuntime = r : Function("r", "regeneratorRuntime = r")(r)
            }
        }
    }
      , t = {};
    function n(r) {
        var a = t[r];
        if (void 0 !== a)
            return a.exports;
        var o = t[r] = {
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n),
        o.exports
    }
    n.m = e,
    n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return n.d(t, {
            a: t
        }),
        t
    }
    ,
    n.d = function(e, t) {
        for (var r in t)
            n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
                enumerable: !0,
                get: t[r]
            })
    }
    ,
    n.f = {},
    n.e = function(e) {
        return Promise.all(Object.keys(n.f).reduce((function(t, r) {
            return n.f[r](e, t),
            t
        }
        ), []))
    }
    ,
    n.u = function(e) {
        return "static/js/" + e + ".6b67a8e4.chunk.js"
    }
    ,
    n.miniCssF = function(e) {}
    ,
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    function() {
        var e = {}
          , t = "front:";
        n.l = function(r, a, o, i) {
            if (e[r])
                e[r].push(a);
            else {
                var l, s;
                if (void 0 !== o)
                    for (var u = document.getElementsByTagName("script"), c = 0; c < u.length; c++) {
                        var d = u[c];
                        if (d.getAttribute("src") == r || d.getAttribute("data-webpack") == t + o) {
                            l = d;
                            break
                        }
                    }
                l || (s = !0,
                (l = document.createElement("script")).charset = "utf-8",
                l.timeout = 120,
                n.nc && l.setAttribute("nonce", n.nc),
                l.setAttribute("data-webpack", t + o),
                l.src = r),
                e[r] = [a];
                var f = function(t, n) {
                    l.onerror = l.onload = null,
                    clearTimeout(p);
                    var a = e[r];
                    if (delete e[r],
                    l.parentNode && l.parentNode.removeChild(l),
                    a && a.forEach((function(e) {
                        return e(n)
                    }
                    )),
                    t)
                        return t(n)
                }
                  , p = setTimeout(f.bind(null, void 0, {
                    type: "timeout",
                    target: l
                }), 12e4);
                l.onerror = f.bind(null, l.onerror),
                l.onload = f.bind(null, l.onload),
                s && document.head.appendChild(l)
            }
        }
    }(),
    n.r = function(e) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    n.p = "/",
    function() {
        var e = {
            179: 0
        };
        n.f.j = function(t, r) {
            var a = n.o(e, t) ? e[t] : void 0;
            if (0 !== a)
                if (a)
                    r.push(a[2]);
                else {
                    var o = new Promise((function(n, r) {
                        a = e[t] = [n, r]
                    }
                    ));
                    r.push(a[2] = o);
                    var i = n.p + n.u(t)
                      , l = new Error;
                    n.l(i, (function(r) {
                        if (n.o(e, t) && (0 !== (a = e[t]) && (e[t] = void 0),
                        a)) {
                            var o = r && ("load" === r.type ? "missing" : r.type)
                              , i = r && r.target && r.target.src;
                            l.message = "Loading chunk " + t + " failed.\n(" + o + ": " + i + ")",
                            l.name = "ChunkLoadError",
                            l.type = o,
                            l.request = i,
                            a[1](l)
                        }
                    }
                    ), "chunk-" + t, t)
                }
        }
        ;
        var t = function(t, r) {
            var a, o, i = r[0], l = r[1], s = r[2], u = 0;
            if (i.some((function(t) {
                return 0 !== e[t]
            }
            ))) {
                for (a in l)
                    n.o(l, a) && (n.m[a] = l[a]);
                if (s)
                    s(n)
            }
            for (t && t(r); u < i.length; u++)
                o = i[u],
                n.o(e, o) && e[o] && e[o][0](),
                e[o] = 0
        }
          , r = self.webpackChunkfront = self.webpackChunkfront || [];
        r.forEach(t.bind(null, 0)),
        r.push = t.bind(null, r.push.bind(r))
    }(),
    function() {
        "use strict";
        var e = n(791)
          , t = n(164);
        function r(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function a(e) {
            if ("undefined" !== typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                return Array.from(e)
        }
        function o(e, t) {
            if (e) {
                if ("string" === typeof e)
                    return r(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === n && e.constructor && (n = e.constructor.name),
                "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(e, t) : void 0
            }
        }
        function i(e) {
            return function(e) {
                if (Array.isArray(e))
                    return r(e)
            }(e) || a(e) || o(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function l(e, t, n, r, a, o, i) {
            try {
                var l = e[o](i)
                  , s = l.value
            } catch (u) {
                return void n(u)
            }
            l.done ? t(s) : Promise.resolve(s).then(r, a)
        }
        function s(e) {
            return function() {
                var t = this
                  , n = arguments;
                return new Promise((function(r, a) {
                    var o = e.apply(t, n);
                    function i(e) {
                        l(o, r, a, i, s, "next", e)
                    }
                    function s(e) {
                        l(o, r, a, i, s, "throw", e)
                    }
                    i(void 0)
                }
                ))
            }
        }
        function u(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        function c(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function d(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? c(Object(n), !0).forEach((function(t) {
                    u(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : c(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        function f(e) {
            if (Array.isArray(e))
                return e
        }
        function p() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        function h(e, t) {
            return f(e) || function(e, t) {
                var n = null == e ? null : "undefined" !== typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (null != n) {
                    var r, a, o = [], i = !0, l = !1;
                    try {
                        for (n = n.call(e); !(i = (r = n.next()).done) && (o.push(r.value),
                        !t || o.length !== t); i = !0)
                            ;
                    } catch (s) {
                        l = !0,
                        a = s
                    } finally {
                        try {
                            i || null == n.return || n.return()
                        } finally {
                            if (l)
                                throw a
                        }
                    }
                    return o
                }
            }(e, t) || o(e, t) || p()
        }
        var g = n(687)
          , m = n.n(g);
        function v(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function y(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
        }
        function b(e, t, n) {
            return t && y(e.prototype, t),
            n && y(e, n),
            Object.defineProperty(e, "prototype", {
                writable: !1
            }),
            e
        }
        var w = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g
          , x = {
            "&amp;": "&",
            "&#38;": "&",
            "&lt;": "<",
            "&#60;": "<",
            "&gt;": ">",
            "&#62;": ">",
            "&apos;": "'",
            "&#39;": "'",
            "&quot;": '"',
            "&#34;": '"',
            "&nbsp;": " ",
            "&#160;": " ",
            "&copy;": "\xa9",
            "&#169;": "\xa9",
            "&reg;": "\xae",
            "&#174;": "\xae",
            "&hellip;": "\u2026",
            "&#8230;": "\u2026",
            "&#x2F;": "/",
            "&#47;": "/"
        }
          , k = function(e) {
            return x[e]
        };
        function _(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function C(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? _(Object(n), !0).forEach((function(t) {
                    u(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        var S, j = {
            bindI18n: "languageChanged",
            bindI18nStore: "",
            transEmptyNodeValue: "",
            transSupportBasicHtmlNodes: !0,
            transWrapTextNodes: "",
            transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
            useSuspense: !0,
            unescape: function(e) {
                return e.replace(w, k)
            }
        }, O = (0,
        e.createContext)();
        function E() {
            return j
        }
        var P = function() {
            function e() {
                v(this, e),
                this.usedNamespaces = {}
            }
            return b(e, [{
                key: "addUsedNamespaces",
                value: function(e) {
                    var t = this;
                    e.forEach((function(e) {
                        t.usedNamespaces[e] || (t.usedNamespaces[e] = !0)
                    }
                    ))
                }
            }, {
                key: "getUsedNamespaces",
                value: function() {
                    return Object.keys(this.usedNamespaces)
                }
            }]),
            e
        }();
        function N() {
            return S
        }
        var L = {
            type: "3rdParty",
            init: function(e) {
                !function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    j = C(C({}, j), e)
                }(e.options.react),
                function(e) {
                    S = e
                }(e)
            }
        };
        function M() {
            if (console && console.warn) {
                for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
                    n[r] = arguments[r];
                "string" === typeof n[0] && (n[0] = "react-i18next:: ".concat(n[0])),
                (e = console).warn.apply(e, n)
            }
        }
        var T = {};
        function D() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            "string" === typeof t[0] && T[t[0]] || ("string" === typeof t[0] && (T[t[0]] = new Date),
            M.apply(void 0, t))
        }
        function R(e, t, n) {
            e.loadNamespaces(t, (function() {
                if (e.isInitialized)
                    n();
                else {
                    e.on("initialized", (function t() {
                        setTimeout((function() {
                            e.off("initialized", t)
                        }
                        ), 0),
                        n()
                    }
                    ))
                }
            }
            ))
        }
        function z(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
              , r = t.languages[0]
              , a = !!t.options && t.options.fallbackLng
              , o = t.languages[t.languages.length - 1];
            if ("cimode" === r.toLowerCase())
                return !0;
            var i = function(e, n) {
                var r = t.services.backendConnector.state["".concat(e, "|").concat(n)];
                return -1 === r || 2 === r
            };
            return !(n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && t.services.backendConnector.backend && t.isLanguageChangingTo && !i(t.isLanguageChangingTo, e)) && (!!t.hasResourceBundle(r, e) || (!(t.services.backendConnector.backend && (!t.options.resources || t.options.partialBundledLanguages)) || !(!i(r, e) || a && !i(o, e))))
        }
        function I(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if (!t.languages || !t.languages.length)
                return D("i18n.languages were undefined or empty", t.languages),
                !0;
            var r = void 0 !== t.options.ignoreJSONStructure;
            return r ? t.hasLoadedNamespace(e, {
                precheck: function(t, r) {
                    if (n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && t.services.backendConnector.backend && t.isLanguageChangingTo && !r(t.isLanguageChangingTo, e))
                        return !1
                }
            }) : z(e, t, n)
        }
        function A(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function F(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? A(Object(n), !0).forEach((function(t) {
                    u(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : A(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        var U = function(t, n) {
            var r = (0,
            e.useRef)();
            return (0,
            e.useEffect)((function() {
                r.current = n ? r.current : t
            }
            ), [t, n]),
            r.current
        };
        function q(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
              , r = n.i18n
              , a = (0,
            e.useContext)(O) || {}
              , o = a.i18n
              , i = a.defaultNS
              , l = r || o || N();
            if (l && !l.reportNamespaces && (l.reportNamespaces = new P),
            !l) {
                D("You will need to pass in an i18next instance by using initReactI18next");
                var s = function(e) {
                    return Array.isArray(e) ? e[e.length - 1] : e
                }
                  , u = [s, {}, !1];
                return u.t = s,
                u.i18n = {},
                u.ready = !1,
                u
            }
            l.options.react && void 0 !== l.options.react.wait && D("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
            var c = F(F(F({}, E()), l.options.react), n)
              , d = c.useSuspense
              , f = c.keyPrefix
              , p = t || i || l.options && l.options.defaultNS;
            p = "string" === typeof p ? [p] : p || ["translation"],
            l.reportNamespaces.addUsedNamespaces && l.reportNamespaces.addUsedNamespaces(p);
            var g = (l.isInitialized || l.initializedStoreOnce) && p.every((function(e) {
                return I(e, l, c)
            }
            ));
            function m() {
                return l.getFixedT(null, "fallback" === c.nsMode ? p : p[0], f)
            }
            var v = (0,
            e.useState)(m)
              , y = h(v, 2)
              , b = y[0]
              , w = y[1]
              , x = p.join()
              , k = U(x)
              , _ = (0,
            e.useRef)(!0);
            (0,
            e.useEffect)((function() {
                var e = c.bindI18n
                  , t = c.bindI18nStore;
                function n() {
                    _.current && w(m)
                }
                return _.current = !0,
                g || d || R(l, p, (function() {
                    _.current && w(m)
                }
                )),
                g && k && k !== x && _.current && w(m),
                e && l && l.on(e, n),
                t && l && l.store.on(t, n),
                function() {
                    _.current = !1,
                    e && l && e.split(" ").forEach((function(e) {
                        return l.off(e, n)
                    }
                    )),
                    t && l && t.split(" ").forEach((function(e) {
                        return l.store.off(e, n)
                    }
                    ))
                }
            }
            ), [l, x]);
            var C = (0,
            e.useRef)(!0);
            (0,
            e.useEffect)((function() {
                _.current && !C.current && w(m),
                C.current = !1
            }
            ), [l, f]);
            var S = [b, l, g];
            if (S.t = b,
            S.i18n = l,
            S.ready = g,
            g)
                return S;
            if (!g && !d)
                return S;
            throw new Promise((function(e) {
                R(l, p, (function() {
                    e()
                }
                ))
            }
            ))
        }
        n(30),
        n(563);
        var V = n(892)
          , H = n.n(V)
          , B = function(e) {
            return e.toLowerCase().trim()
        }
          , $ = 300
          , Y = function(e) {
            var t = Math.floor(299 * Math.random() - 1) + 1;
            if (e.length > 0)
                for (var n = e.map((function(e) {
                    return e[1]
                }
                )); n.includes(t); )
                    t = Math.floor(299 * Math.random() - 1) + 1;
            return t
        }
          , W = function(e) {
            var t = 299
              , n = t;
            if (e.length > 0) {
                var r = e.map((function(e) {
                    return e[1]
                }
                ));
                if ((n = Math.min.apply(Math, i(r).concat([n]))) > 1)
                    t = n - 1;
                else
                    for (t = 2; r.includes(t); )
                        t += 1
            }
            return t
        }
          , G = function(e) {
            var t = 299
              , n = 2 * t;
            if (e.length > 0) {
                var r = e.map((function(e) {
                    return e[1]
                }
                ));
                if ((n = Math.min.apply(Math, i(r).concat([n]))) > 1)
                    t = Math.floor(n / 2);
                else
                    for (t = 2; r.includes(t); )
                        t += 1
            }
            return t
        }
          , Q = function(e) {
            var t = H()("2022-02-23", "YYYY-MM-DD").startOf("day");
            return "en" === e && (t = H()("2022-09-18", "YYYY-MM-DD").startOf("day")),
            "es" === e && (t = H()("2023-05-26", "YYYY-MM-DD").startOf("day")),
            t
        }
          , K = function() {
            return H()()
        };
        function J(t, n) {
            var r = h((0,
            e.useState)((function() {
                if ("undefined" === typeof window)
                    return n;
                try {
                    var e = window.localStorage.getItem(t);
                    return e ? JSON.parse(e) : n
                } catch (r) {
                    return console.log(r),
                    n
                }
            }
            )), 2)
              , a = r[0]
              , o = r[1];
            return [a, function(e) {
                try {
                    var n = e instanceof Function ? e(a) : e;
                    o(n),
                    "undefined" !== typeof window && window.localStorage.setItem(t, JSON.stringify(n))
                } catch (r) {
                    console.log(r)
                }
            }
            ]
        }
        window.gtag || (window.gtag = function() {}
        );
        var Z = function(e, t) {
            return "".concat(e).concat(function(e) {
                return "pt" === e ? "" : "_".concat(e)
            }(t))
        }
          , X = function(e) {
            window.gtag("event", Z("start", e), {
                event_category: "game"
            })
        }
          , ee = function(e) {
            window.gtag("event", Z("guess", e), {
                event_category: "game"
            })
        }
          , te = function(e) {
            window.gtag("event", Z("guess_after_win", e), {
                event_category: "game"
            })
        }
          , ne = function(e) {
            window.gtag("event", Z("tip", e), {
                event_category: "game"
            })
        }
          , re = function(e) {
            window.gtag("event", Z("win", e), {
                event_category: "game"
            })
        }
          , ae = function(e) {
            window.gtag("event", Z("give_up", e), {
                event_category: "game"
            })
        }
          , oe = function(e) {
            window.gtag("event", Z("view_top_words", e), {
                event_category: "game"
            })
        }
          , ie = function(e) {
            window.gtag("event", Z("select_random_game", e), {
                event_category: "game"
            })
        }
          , le = function(e) {
            window.gtag("event", Z("select_previous_game", e), {
                event_category: "game"
            })
        }
          , se = function(e) {
            window.gtag("event", Z("share_button_click", e), {
                event_category: "interface"
            })
        }
          , ue = function(e) {
            window.gtag("event", Z("instructions_menu_click", e), {
                event_category: "interface"
            })
        }
          , ce = function(e) {
            window.gtag("event", Z("settings_menu_click", e), {
                event_category: "interface"
            })
        }
          , de = function(e) {
            window.gtag("event", Z("credits_menu_click", e), {
                event_category: "interface"
            })
        }
          , fe = function(e) {
            e && window.gtag("event", "set_language_".concat(e), {
                event_category: "settings"
            })
        }
          , pe = function(e) {
            e && window.gtag("event", "set_tip_".concat(e), {
                event_category: "settings"
            })
        }
          , he = function(e) {
            e && window.gtag("event", "set_theme_".concat(e), {
                event_category: "settings"
            })
        }
          , ge = function(e, t) {
            window.gtag("event", Z("top_banner_action", e), {
                event_category: "interface",
                event_label: t
            })
        }
          , me = function(e, t) {
            window.gtag("event", Z("top_banner_dismiss", e), {
                event_category: "interface",
                event_label: t
            })
        }
          , ve = function(e) {
            window.gtag("event", Z("play_again_click", e), {
                event_category: "interface"
            })
        }
          , ye = function(e) {
            window.gtag("event", Z("faq_click", e), {
                event_category: "interface"
            })
        }
          , be = {
            gameId: 0,
            guessHistory: [],
            lastGuess: null,
            foundWord: "",
            numberOfTips: 0,
            numberOfAttempts: 0,
            gaveUp: "",
            postGameHistory: []
        }
          , we = {
            lastGameId: 0,
            openGameId: 0,
            gameData: {
                pt: {},
                en: {},
                es: {}
            },
            theme: void 0,
            language: void 0,
            version: 2
        }
          , xe = function(e) {
            var t = e.language
              , n = d({}, e)
              , r = function(e) {
                var t = Q(e);
                return K().startOf("day").diff(t, "day")
            }(t);
            return r !== n.lastGameId && (n = d(d({}, n), {}, {
                lastGameId: r,
                openGameId: r
            })),
            void 0 !== n.gameData[t] && void 0 !== n.gameData[t][r] || (n = d(d({}, n), {}, {
                gameData: d(d({}, n.gameData), {}, u({}, t, d(d({}, n.gameData[t]), {}, u({}, r, d(d({}, be), {}, {
                    gameId: r
                })))))
            })),
            n
        };
        function ke() {
            var t = h((0,
            e.useState)(!0), 2)
              , n = t[0]
              , r = t[1]
              , a = h(J("state", we), 2)
              , o = a[0]
              , i = a[1]
              , l = q().i18n
              , s = function(e) {
                l.changeLanguage(e),
                H().locale(e)
            };
            (0,
            e.useEffect)((function() {
                var e = we.version
                  , t = o.version
                  , n = d({}, o);
                t < e - 1 || t > e ? n = d({}, we) : t === e - 1 && (n = function(e) {
                    var t = d({}, we)
                      , n = e.gameId;
                    return t.lastGameId = n,
                    t.openGameId = n,
                    t.gameData.pt = d({}, e.gameData),
                    t
                }(o)),
                n = function(e) {
                    var t, n, r, a = e.language;
                    if ("pt" === a || "en" === a || "es" === a)
                        return e;
                    if (Object.keys(null === (t = e.gameData) || void 0 === t ? void 0 : t.pt).length > 0)
                        return d(d({}, e), {}, {
                            language: "pt"
                        });
                    if (Object.keys(null === (n = e.gameData) || void 0 === n ? void 0 : n.en).length > 0)
                        return d(d({}, e), {}, {
                            language: "en"
                        });
                    if (Object.keys(null === (r = e.gameData) || void 0 === r ? void 0 : r.es).length > 0)
                        return d(d({}, e), {}, {
                            language: "es"
                        });
                    var o = navigator.languages;
                    if (!o || 0 === o.length)
                        return d(d({}, e), {}, {
                            language: "en"
                        });
                    var i, l = o.find((function(e) {
                        return e.includes("en") || e.includes("pt") || e.includes("es")
                    }
                    ));
                    return l ? (i = l.includes("en") ? "en" : l.includes("es") ? "es" : "pt",
                    d(d({}, e), {}, {
                        language: i
                    })) : d(d({}, e), {}, {
                        language: "en"
                    })
                }(n),
                s(n.language),
                n = xe(n),
                i(n),
                r(!1)
            }
            ), []);
            return {
                loading: n,
                gameState: o,
                setGameState: i,
                setLanguage: function(e) {
                    var t = d(d({}, o), {}, {
                        language: e
                    });
                    t = xe(t),
                    s(e),
                    i(t),
                    fe(e)
                }
            }
        }
        var _e = n(184)
          , Ce = function() {};
        function Se(t) {
            var n = t.children
              , r = h((0,
            e.useState)(!1), 2)
              , a = r[0]
              , o = r[1];
            return (0,
            _e.jsxs)("div", {
                style: {
                    position: "relative"
                },
                children: [(0,
                _e.jsx)("button", {
                    className: "btn ".concat(a ? "btn-active" : ""),
                    onClick: function() {
                        return o(!0)
                    },
                    children: (0,
                    _e.jsx)("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "20",
                        height: "20",
                        fill: "currentColor",
                        viewBox: "0 0 16 16",
                        children: (0,
                        _e.jsx)("path", {
                            d: "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                        })
                    })
                }), a && (0,
                _e.jsxs)(_e.Fragment, {
                    children: [(0,
                    _e.jsx)("div", {
                        className: "dropdown-bg",
                        onClick: function() {
                            return o(!1)
                        }
                    }), (0,
                    _e.jsx)("div", {
                        className: "dropdown",
                        onClick: function() {
                            return o(!1)
                        },
                        children: n
                    })]
                })]
            })
        }
        function je(e) {
            var t = e.onClose
              , n = e.children
              , r = e.closeOnMaskClick
              , a = function() {};
            return (void 0 === r || r) && (a = t),
            (0,
            _e.jsx)("div", {
                className: "modal-bg",
                onClick: a,
                children: (0,
                _e.jsxs)("div", {
                    className: "modal-wrapper",
                    children: [(0,
                    _e.jsx)("div", {
                        className: "modal-close-button",
                        onClick: t,
                        children: (0,
                        _e.jsx)(Ce.Close, {})
                    }), (0,
                    _e.jsx)("div", {
                        className: "modal",
                        onClick: function(e) {
                            e.stopPropagation()
                        },
                        children: n
                    })]
                })
            })
        }
        Ce.QuestionMark = function() {
            return (0,
            _e.jsxs)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: [(0,
                _e.jsx)("path", {
                    d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                }), (0,
                _e.jsx)("path", {
                    d: "M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"
                })]
            })
        }
        ,
        Ce.LightBulb = function() {
            return (0,
            _e.jsx)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: (0,
                _e.jsx)("path", {
                    d: "M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"
                })
            })
        }
        ,
        Ce.Calendar = function() {
            return (0,
            _e.jsx)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: (0,
                _e.jsx)("path", {
                    d: "M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
                })
            })
        }
        ,
        Ce.Info = function() {
            return (0,
            _e.jsxs)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: [(0,
                _e.jsx)("path", {
                    d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                }), (0,
                _e.jsx)("path", {
                    d: "m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                })]
            })
        }
        ,
        Ce.Twitter = function() {
            return (0,
            _e.jsx)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: (0,
                _e.jsx)("path", {
                    d: "M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
                })
            })
        }
        ,
        Ce.Instagram = function() {
            return (0,
            _e.jsx)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: (0,
                _e.jsx)("path", {
                    d: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                })
            })
        }
        ,
        Ce.TikTok = function() {
            return (0,
            _e.jsx)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: (0,
                _e.jsx)("path", {
                    d: "M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"
                })
            })
        }
        ,
        Ce.Facebook = function() {
            return (0,
            _e.jsx)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: (0,
                _e.jsx)("path", {
                    d: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                })
            })
        }
        ,
        Ce.GiveUp = function() {
            return (0,
            _e.jsx)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: (0,
                _e.jsx)("path", {
                    d: "M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"
                })
            })
        }
        ,
        Ce.Share = function() {
            return (0,
            _e.jsx)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: (0,
                _e.jsx)("path", {
                    d: "M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
                })
            })
        }
        ,
        Ce.Close = function() {
            return (0,
            _e.jsx)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: (0,
                _e.jsx)("path", {
                    d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                })
            })
        }
        ,
        Ce.Settings = function() {
            return (0,
            _e.jsxs)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: [(0,
                _e.jsx)("path", {
                    d: "M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                }), (0,
                _e.jsx)("path", {
                    d: "M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                })]
            })
        }
        ,
        Ce.Eye = function() {
            return (0,
            _e.jsxs)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: [(0,
                _e.jsx)("path", {
                    d: "M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                }), (0,
                _e.jsx)("path", {
                    d: "M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                })]
            })
        }
        ,
        Ce.Random = function() {
            return (0,
            _e.jsxs)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: [(0,
                _e.jsx)("path", {
                    fillRule: "evenodd",
                    d: "M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"
                }), (0,
                _e.jsx)("path", {
                    d: "M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"
                })]
            })
        }
        ,
        Ce.Jogows = function() {
            return (0,
            _e.jsxs)("svg", {
                width: "2128",
                height: "474",
                viewBox: "0 0 2128 474",
                fill: "currentColor",
                xmlns: "http://www.w3.org/2000/svg",
                children: [(0,
                _e.jsx)("path", {
                    d: "M785.308 118.82C780.188 120.243 773.219 120.955 764.402 120.955C755.585 120.955 748.616 120.101 743.497 118.393C738.377 116.686 734.679 113.84 732.404 109.855C730.413 105.586 729.133 101.887 728.564 98.7559C728.28 95.3407 728.137 90.3602 728.137 83.8145C728.137 77.2687 728.28 72.4305 728.564 69.2999C729.133 66.1693 730.413 62.6118 732.404 58.6274C736.386 51.2278 747.336 47.5281 765.255 47.5281C782.321 47.5281 792.987 51.2278 797.254 58.6274C799.245 62.3272 800.382 65.7424 800.667 68.873C801.236 72.0036 801.52 76.6995 801.52 82.9607V85.522C801.52 91.7832 801.236 96.4791 800.667 99.6097C800.382 102.74 799.102 106.298 796.827 110.282C794.552 114.267 790.712 117.113 785.308 118.82ZM743.923 153.399C749.327 151.691 756.438 150.838 765.255 150.838C774.073 150.838 781.041 151.691 786.161 153.399C791.281 155.107 794.836 158.095 796.827 162.364C799.102 166.348 800.382 170.048 800.667 173.463C801.236 176.594 801.52 181.432 801.52 187.978V363.86C801.52 397.158 790.001 423.768 766.962 443.69C743.923 463.612 718.609 473.573 691.02 473.573C684.478 473.573 679.642 473.289 676.514 472.719C673.385 472.435 669.83 471.296 665.848 469.304C658.452 465.32 654.755 454.932 654.755 438.141C654.755 421.349 657.884 410.819 664.141 406.55C670.114 402.281 678.362 400.146 688.886 400.146C699.126 400.146 708.227 397.301 716.191 391.609C724.155 385.917 728.137 375.671 728.137 360.872V184.989C728.137 175.029 729.417 167.771 731.977 163.218C734.822 158.379 738.804 155.107 743.923 153.399Z"
                }), (0,
                _e.jsx)("path", {
                    d: "M816.433 264.82C816.433 230.668 828.379 202.492 852.271 180.294C876.163 158.095 903.468 146.995 934.186 146.995C964.904 146.995 992.067 158.095 1015.67 180.294C1039.28 202.208 1051.09 230.241 1051.09 264.393C1051.09 288.014 1044.97 309.075 1032.74 327.574C1020.51 345.788 1005.58 359.307 987.943 368.129C970.593 376.667 952.532 380.936 933.759 380.936C914.987 380.936 896.784 376.382 879.149 367.275C861.514 357.883 846.582 344.223 834.352 326.293C822.406 308.079 816.433 287.588 816.433 264.82ZM905.601 295.556C914.703 302.387 923.947 305.802 933.333 305.802C942.719 305.802 952.105 302.244 961.491 295.129C970.877 288.014 975.57 277.484 975.57 263.539C975.57 249.594 971.162 239.206 962.344 232.375C953.527 225.545 943.999 222.13 933.759 222.13C923.52 222.13 913.992 225.687 905.174 232.802C896.357 239.917 891.948 250.447 891.948 264.393C891.948 278.053 896.499 288.441 905.601 295.556Z"
                }), (0,
                _e.jsx)("path", {
                    d: "M1208.35 348.919C1197.54 363.149 1180.33 370.264 1156.73 370.264C1133.12 370.264 1110.93 359.449 1090.17 337.819C1069.69 315.905 1059.45 290.433 1059.45 261.404C1059.45 232.375 1069.83 206.904 1090.6 184.989C1111.36 163.075 1134.11 152.118 1158.86 152.118C1168.53 152.118 1177.35 153.968 1185.31 157.668C1193.28 161.083 1198.68 164.356 1201.52 167.487C1204.65 170.333 1207.07 173.036 1208.78 175.598C1209.63 167.629 1212.48 161.652 1217.31 157.668C1222.43 153.399 1230.54 151.264 1241.63 151.264C1252.72 151.264 1260.83 152.118 1265.95 153.826C1271.07 155.533 1274.62 158.522 1276.61 162.791C1278.89 166.775 1280.17 170.333 1280.45 173.463C1281.02 176.594 1281.31 181.432 1281.31 187.978V364.714C1281.31 397.443 1269.93 423.768 1247.18 443.69C1224.42 463.897 1198.82 474 1170.38 474C1148.76 474 1128.14 468.735 1108.52 458.205C1088.89 447.675 1079.08 438.141 1079.08 429.603C1079.08 418.503 1083.34 408.684 1091.88 400.146C1097.28 394.17 1101.41 390.043 1104.25 387.766C1107.38 385.49 1110.93 384.351 1114.92 384.351C1118.9 384.351 1123.02 386.059 1127.29 389.474C1140.94 400.004 1155.73 405.269 1171.66 405.269C1182.47 405.269 1191.29 401 1198.11 392.462C1204.94 383.924 1208.35 373.679 1208.35 361.726V348.919ZM1132.41 261.831C1132.41 270.938 1135.96 279.192 1143.07 286.591C1150.47 293.991 1159.29 297.691 1169.53 297.691C1180.05 297.691 1188.73 293.991 1195.55 286.591C1202.38 278.907 1205.79 270.654 1205.79 261.831C1205.79 252.724 1202.52 244.328 1195.98 236.644C1189.44 228.675 1180.62 224.691 1169.53 224.691C1158.43 224.691 1149.47 228.533 1142.65 236.217C1135.82 243.902 1132.41 252.439 1132.41 261.831Z"
                }), (0,
                _e.jsx)("path", {
                    d: "M1296.22 264.82C1296.22 230.668 1308.17 202.492 1332.06 180.294C1355.95 158.095 1383.26 146.995 1413.98 146.995C1444.69 146.995 1471.86 158.095 1495.46 180.294C1519.07 202.208 1530.88 230.241 1530.88 264.393C1530.88 288.014 1524.76 309.075 1512.53 327.574C1500.3 345.788 1485.37 359.307 1467.73 368.129C1450.38 376.667 1432.32 380.936 1413.55 380.936C1394.78 380.936 1376.57 376.382 1358.94 367.275C1341.3 357.883 1326.37 344.223 1314.14 326.293C1302.2 308.079 1296.22 287.588 1296.22 264.82ZM1385.39 295.556C1394.49 302.387 1403.74 305.802 1413.12 305.802C1422.51 305.802 1431.9 302.244 1441.28 295.129C1450.67 288.014 1455.36 277.484 1455.36 263.539C1455.36 249.594 1450.95 239.206 1442.13 232.375C1433.32 225.545 1423.79 222.13 1413.55 222.13C1403.31 222.13 1393.78 225.687 1384.96 232.802C1376.15 239.917 1371.74 250.447 1371.74 264.393C1371.74 278.053 1376.29 288.441 1385.39 295.556Z"
                }), (0,
                _e.jsx)("path", {
                    d: "M1611.77 306.656C1616.61 311.494 1619.02 321.455 1619.02 336.539V338.246C1619.02 345.077 1618.74 350.199 1618.17 353.615C1617.89 356.745 1616.46 360.587 1613.91 365.141C1609.64 373.394 1598.83 377.521 1581.48 377.521C1564.41 377.521 1553.04 374.817 1547.35 369.41C1541.94 364.002 1539.24 353.757 1539.24 338.673V336.965C1539.24 330.42 1539.38 325.439 1539.67 322.024C1540.24 318.609 1541.66 314.767 1543.94 310.498C1548.2 301.96 1558.87 297.691 1575.93 297.691C1593.28 297.691 1605.23 300.679 1611.77 306.656Z"
                }), (0,
                _e.jsx)("path", {
                    d: "M1913.31 153.826C1931.52 161.795 1940.62 171.613 1940.62 183.282C1940.62 188.12 1938.34 195.947 1933.79 206.761C1929.24 217.291 1925.4 226.541 1922.27 234.51L1875.34 348.919C1871.07 361.441 1863.96 370.264 1854.01 375.386C1849.74 377.379 1844.34 378.375 1837.8 378.375C1831.25 378.375 1824.85 375.956 1818.6 371.117C1812.62 365.995 1808.64 360.872 1806.65 355.749L1803.24 348.492C1800.96 342.8 1792.57 320.601 1778.07 281.896C1775.22 288.726 1770.96 299.968 1765.27 315.621C1759.86 330.989 1756.31 340.665 1754.6 344.65C1753.18 348.349 1752.18 350.911 1751.61 352.334C1751.33 353.472 1750.19 355.749 1748.2 359.164C1746.21 362.579 1743.93 365.568 1741.37 368.129C1734.55 374.959 1726.73 378.375 1717.91 378.375C1709.09 378.375 1701.7 375.956 1695.72 371.117C1689.75 365.995 1685.77 360.872 1683.78 355.749L1619.35 198.65C1616.51 190.112 1615.09 184.563 1615.09 182.001C1615.09 170.617 1623.19 161.652 1639.41 155.107C1648.51 151.407 1655.9 149.557 1661.59 149.557C1667.28 149.557 1671.83 150.838 1675.24 153.399C1678.94 155.676 1681.5 158.095 1682.92 160.656C1684.35 162.933 1685.48 165.352 1686.34 167.914C1691.17 179.298 1701.27 206.05 1716.63 248.17L1741.8 179.013C1743.51 173.321 1746.64 168.34 1751.19 164.071C1759.44 155.818 1767.83 151.691 1776.36 151.691C1784.89 151.691 1792.15 153.968 1798.12 158.522C1804.38 163.075 1808.64 167.629 1810.92 172.183L1814.33 179.44C1828.55 219.284 1836.94 242.052 1839.5 247.744L1865.53 176.878C1872.35 158.664 1882.59 149.557 1896.25 149.557C1901.65 149.557 1907.34 150.98 1913.31 153.826Z"
                }), (0,
                _e.jsx)("path", {
                    d: "M1948.81 357.03C1943.41 353.615 1940.7 348.207 1940.7 340.808C1940.7 333.408 1946.11 322.166 1956.92 307.083C1960.04 302.244 1965.02 299.825 1971.85 299.825C1978.96 299.825 1988.49 303.383 2000.43 310.498C2012.38 317.328 2023.19 320.743 2032.86 320.743C2050.21 320.743 2058.88 317.328 2058.88 310.498C2058.88 305.09 2049.36 301.106 2030.3 298.545C2012.38 295.983 1994.6 289.295 1976.97 278.48C1968.72 273.358 1961.89 265.389 1956.49 254.574C1951.09 243.475 1948.38 230.383 1948.38 215.299C1948.38 170.333 1979.24 147.849 2040.96 147.849C2061.16 147.849 2081.92 152.687 2103.25 162.364C2113.21 166.917 2118.19 172.609 2118.19 179.44C2118.19 186.27 2115.06 194.666 2108.8 204.627C2102.54 214.588 2096.14 219.568 2089.6 219.568C2086.19 219.568 2079.79 217.434 2070.4 213.165C2061.3 208.896 2051.35 206.761 2040.54 206.761C2023.76 206.761 2015.37 209.892 2015.37 216.153C2015.37 224.691 2025.04 230.241 2044.38 232.802C2063.15 234.794 2081.35 240.202 2098.99 249.024C2107.24 253.009 2114.06 259.981 2119.47 269.942C2125.16 279.619 2128 291.856 2128 306.656C2128 321.455 2125.16 334.119 2119.47 344.65C2114.06 354.895 2106.38 362.579 2096.43 367.702C2078.22 376.525 2055.33 380.936 2027.74 380.936C2000.43 380.936 1974.12 372.967 1948.81 357.03Z"
                }), (0,
                _e.jsx)("path", {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M393.326 99.3079C435.465 70.947 478.896 41.7164 523.962 55.3328C614.189 82.5944 554.903 383.936 465.118 417.073C404.181 439.563 376.16 419.851 339.475 394.043C322.107 381.825 302.797 368.241 277.133 357.122C241.439 341.657 220.309 357.676 197.937 374.637C170.247 395.63 140.654 418.065 79.1891 384.037C-31.9376 322.517 -17.4031 39.0116 68.9013 5.4374C120.766 -14.7391 154.143 24.6956 189.856 66.8914C213.57 94.9104 238.315 124.147 270.188 137.956C310.166 155.277 351.097 127.729 393.326 99.3079ZM105.205 201.617C128.707 201.617 147.759 184.693 147.759 163.817C147.759 142.941 128.707 126.018 105.205 126.018C81.7032 126.018 62.6511 142.941 62.6511 163.817C62.6511 184.693 81.7032 201.617 105.205 201.617ZM153.078 296.115C173.642 296.115 190.313 281.307 190.313 263.041C190.313 244.774 173.642 229.966 153.078 229.966C132.514 229.966 115.844 244.774 115.844 263.041C115.844 281.307 132.514 296.115 153.078 296.115ZM413.182 301.054C439.003 305.407 438.719 293.185 438.45 281.611C438.276 274.093 438.107 266.848 445.104 264.597C452.367 262.259 460.379 263.947 468.039 265.56C482.087 268.519 494.95 271.228 499.828 248.393C504.915 224.582 494.053 223.897 482.418 223.163C475.113 222.702 467.503 222.223 463.345 215.987C459.434 210.12 461.533 202.819 463.604 195.614C467.087 183.498 470.491 171.656 445.104 167.377C418.712 162.928 416.09 175.794 413.687 187.586C412.212 194.825 410.82 201.659 404.061 203.834C396.711 206.2 389.176 204.444 382.182 202.813C369.586 199.878 358.744 197.351 353.897 220.037C348.816 243.822 361.365 244.532 374.311 245.265C382.464 245.727 390.775 246.197 394.94 252.444C398.851 258.31 396.752 265.612 394.681 272.817C391.198 284.933 387.794 296.775 413.182 301.054Z"
                })]
            })
        }
        ,
        Ce.Chat = function() {
            return (0,
            _e.jsx)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                height: "16",
                width: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: (0,
                _e.jsx)("path", {
                    d: "M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                })
            })
        }
        ,
        Ce.Language = function() {
            return (0,
            _e.jsxs)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: [(0,
                _e.jsx)("path", {
                    d: "M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z"
                }), (0,
                _e.jsx)("path", {
                    d: "M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z"
                })]
            })
        }
        ,
        Ce.FAQ = function() {
            return (0,
            _e.jsxs)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: [(0,
                _e.jsx)("path", {
                    d: "M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                }), (0,
                _e.jsx)("path", {
                    d: "M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"
                })]
            })
        }
        ,
        Ce.ExternalLink = function() {
            return (0,
            _e.jsxs)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: [(0,
                _e.jsx)("path", {
                    fillRule: "evenodd",
                    d: "M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                }), (0,
                _e.jsx)("path", {
                    fillRule: "evenodd",
                    d: "M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                })]
            })
        }
        ;
        var Oe = function(e) {
            return e >= 1e4 ? e - 1e4 : e
        }
          , Ee = function() {
            var t = H()().add(1, "day").startOf("day")
              , n = h((0,
            e.useState)(t - H()()), 2)
              , r = n[0]
              , a = n[1];
            return (0,
            e.useEffect)((function() {
                var e = setInterval((function() {
                    var n = t - H()();
                    n > 0 ? a(n) : (a(0),
                    clearInterval(e))
                }
                ), 1e3);
                return function() {
                    return clearInterval(e)
                }
            }
            ), []),
            function(e) {
                return [Math.floor(e % 864e5 / 36e5), Math.floor(e % 36e5 / 6e4), Math.floor(e % 6e4 / 1e3)]
            }(r)
        };
        function Pe(e) {
            var t = "0".concat(e);
            return t.substring(t.length - 2)
        }
        function Ne() {
            var e = h(Ee(), 3)
              , t = e[0]
              , n = e[1]
              , r = e[2]
              , a = q().t;
            return (0,
            _e.jsxs)("div", {
                children: [(0,
                _e.jsx)("div", {
                    className: "countdown-text",
                    children: a("countdownText")
                }), (0,
                _e.jsxs)("div", {
                    className: "countdown",
                    children: [Pe(t), ":", Pe(n), ":", Pe(r)]
                })]
            })
        }
        function Le(t) {
            var n = t.state
              , r = t.lastGameId
              , a = t.language
              , o = t.hideCountdown
              , i = t.onPlayAgain
              , l = q().t
              , s = h((0,
            e.useState)(""), 2)
              , u = s[0]
              , c = s[1]
              , d = n.guessHistory
              , f = n.numberOfAttempts
              , p = n.numberOfTips
              , g = n.gameId
              , m = n.gaveUp
              , v = function(e) {
                c(e),
                setTimeout((function() {
                    return c("")
                }
                ), 3e3)
            }
              , y = function() {
                var e = 0
                  , t = 0
                  , n = 0
                  , r = 0
                  , a = 0
                  , o = 0;
                d.forEach((function(r) {
                    r[1] < $ ? e += 1 : r[1] < 1500 ? t += 1 : n += 1
                }
                ));
                var i = Math.max(e, t, n)
                  , l = 20;
                i <= 25 ? l = 5 : i <= 50 ? l = 10 : i <= 100 && (l = 15);
                var s = d.length;
                s > 0 && (r = Math.round(e / s * l),
                a = Math.round(t / s * l),
                o = Math.round(n / s * l),
                r = 0 === r && e > 0 ? 1 : r,
                a = 0 === a && t > 0 ? 1 : a,
                o = 0 === o && n > 0 ? 1 : o,
                r = Math.min(e, r),
                a = Math.min(t, a),
                o = Math.min(n, o));
                for (var u = "", c = 0; c < r; c += 1)
                    u += "\ud83d\udfe9";
                u += " ".concat(e, "\n");
                for (var f = 0; f < a; f += 1)
                    u += "\ud83d\udfe8";
                u += " ".concat(t, "\n");
                for (var p = 0; p < o; p += 1)
                    u += "\ud83d\udfe5";
                return u += " ".concat(n)
            };
            return (0,
            _e.jsxs)("div", {
                className: "end-msg",
                children: [(0,
                _e.jsx)("p", {
                    className: "bigger",
                    children: m ? (0,
                    _e.jsx)("span", {
                        children: l("end.betterLuck")
                    }) : (0,
                    _e.jsx)("span", {
                        children: l("end.congrats")
                    })
                }), (0,
                _e.jsxs)("p", {
                    children: [m ? (0,
                    _e.jsx)("span", {
                        children: l("end.youGaveUpThe")
                    }) : (0,
                    _e.jsx)("span", {
                        children: l("end.youGotThe")
                    }), " ", l("end.word"), " ", (0,
                    _e.jsxs)("b", {
                        children: ["#", Oe(g)]
                    }), (0,
                    _e.jsx)("br", {}), l("end.in"), " ", (0,
                    _e.jsx)("b", {
                        children: f
                    }), " ", l("end.attempts"), p > 0 && (0,
                    _e.jsxs)(_e.Fragment, {
                        children: [" ", l("end.and"), " ", (0,
                        _e.jsx)("b", {
                            children: p
                        }), " ", l("end.tips")]
                    }), "."]
                }), !!m && (0,
                _e.jsxs)("p", {
                    children: [l("end.theWordWas"), " ", (0,
                    _e.jsx)("b", {
                        children: m
                    }), "."]
                }), (0,
                _e.jsx)("div", {
                    className: "chart-wrapper",
                    children: (0,
                    _e.jsx)("div", {
                        className: "chart",
                        children: y()
                    })
                }), (0,
                _e.jsx)("div", {
                    children: (0,
                    _e.jsx)("div", {
                        style: {
                            position: "relative",
                            padding: "15px 0"
                        },
                        children: (0,
                        _e.jsxs)("button", {
                            type: "button",
                            className: "button",
                            onClick: function() {
                                var e = l(m ? "end.butGaveUp" : "end.andGotIt")
                                  , t = p > 0 ? " ".concat(l("end.and"), " ").concat(p, " ").concat(l("end.tips")) : ""
                                  , n = "".concat(l("end.played"), " predicto.me #").concat(Oe(g), " ").concat(e, " ").concat(l("end.with"), " ").concat(f, " ").concat(l("end.attempts")).concat(t, ".\n\n");
                                n += y(),
                                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && -1 === navigator.userAgent.toLowerCase().indexOf("firefox") && navigator.share ? navigator.share({
                                    text: n
                                }).then((function() {
                                    v(l("end.done"))
                                }
                                )).catch((function() {}
                                )) : (navigator.clipboard.writeText(n),
                                v(l("end.copied"))),
                                se(a)
                            },
                            children: [(0,
                            _e.jsx)(Ce.Share, {}), (0,
                            _e.jsx)("div", {
                                style: {
                                    minWidth: m ? 222 : 104
                                },
                                children: u || "".concat(l("end.share"), " ").concat(m ? l("end.anyway") : "")
                            })]
                        })
                    })
                }), (0,
                _e.jsxs)("div", {
                    style: {
                        marginTop: 10
                    },
                    children: [(0,
                    _e.jsxs)("div", {
                        className: "play-again-text",
                        children: [l("end.playAgain"), ":"]
                    }), (0,
                    _e.jsxs)("button", {
                        type: "button",
                        className: "button",
                        onClick: i,
                        children: [(0,
                        _e.jsx)(Ce.Calendar, {}), l("Previous games")]
                    })]
                }), !o && g === r && (0,
                _e.jsx)(Ne, {})]
            })
        }
        function Me(e) {
            var t = e.text;
            return (0,
            _e.jsx)("div", {
                className: "loading-text",
                children: t.split("").map((function(e, t) {
                    return (0,
                    _e.jsx)("span", {
                        style: {
                            "--i": t
                        },
                        className: "visible",
                        children: " " === e ? "\xa0" : e
                    }, "".concat(e, "-").concat(t))
                }
                ))
            })
        }
        var Te = function(e) {
            var t = function(e) {
                return .5 * Math.exp(-.5 * e)
            }
              , n = t(0)
              , r = t(100)
              , a = (t(e / 4e4 * 100) - r) / (n - r) * 100;
            return a < 1 && (a = 1),
            "".concat(a, "%")
        }
          , De = function(e) {
            return e < $ ? "var(--green)" : e < 1500 ? "var(--yellow)" : "var(--red)"
        };
        function Re(e) {
            var t = e.word
              , n = e.distance
              , r = e.highlight;
            return (0,
            _e.jsxs)("div", {
                className: "row-wrapper ".concat(r ? "current" : ""),
                children: [(0,
                _e.jsx)("div", {
                    className: "outer-bar",
                    children: (0,
                    _e.jsx)("div", {
                        className: "inner-bar",
                        style: {
                            width: Te(n),
                            backgroundColor: De(n)
                        }
                    })
                }), (0,
                _e.jsxs)("div", {
                    className: "row",
                    children: [(0,
                    _e.jsx)("span", {
                        children: t
                    }), (0,
                    _e.jsx)("span", {
                        children: n + 1
                    })]
                })]
            }, t)
        }
        function ze(e) {
            var t = e.words
              , n = e.highlights
              , r = void 0 === n ? [] : n
              , a = e.order
              , o = void 0 === a ? "similarity" : a
              , i = t.slice();
            return "similarity" === o && i.sort((function(e, t) {
                return e[1] - t[1]
            }
            )),
            (0,
            _e.jsx)("div", {
                className: "guess-history",
                children: i.map((function(e) {
                    return (0,
                    _e.jsx)(Re, {
                        word: e[0],
                        distance: e[1],
                        highlight: r.includes(e[0])
                    }, e[0])
                }
                ))
            })
        }
        function Ie() {
            var e = q().t;
            return (0,
            _e.jsxs)("div", {
                children: [(0,
                _e.jsxs)("div", {
                    className: "modal-title",
                    children: [(0,
                    _e.jsx)(Ce.QuestionMark, {}), (0,
                    _e.jsx)("h2", {
                        children: e("How to play")
                    })]
                }), (0,
                _e.jsx)("p", {
                    children: e("howToPlayText.p1")
                }), (0,
                _e.jsx)("p", {
                    children: e("howToPlayText.p2")
                }), (0,
                _e.jsx)("p", {
                    children: e("howToPlayText.p3")
                }), (0,
                _e.jsx)("p", {
                    children: e("howToPlayText.p4")
                })]
            })
        }
        function Ae(e) {
            var t = e.onConfirm
              , n = e.onCancel
              , r = q().t;
            return (0,
            _e.jsxs)("div", {
                children: [(0,
                _e.jsx)("p", {
                    style: {
                        textAlign: "center"
                    },
                    children: r("giveUpModalText")
                }), (0,
                _e.jsxs)("div", {
                    style: {
                        textAlign: "center"
                    },
                    children: [(0,
                    _e.jsx)("button", {
                        type: "button",
                        className: "share-btn",
                        onClick: t,
                        children: r("Yes")
                    }), (0,
                    _e.jsx)("button", {
                        type: "button",
                        className: "share-btn",
                        onClick: n,
                        children: r("No")
                    })]
                })]
            })
        }
        function Fe() {
            var e = q().t;
            return (0,
            _e.jsxs)("div", {
                children: [(0,
                _e.jsx)("div", {
                    className: "social-media-links",
                    children: (0,
                    _e.jsx)("a", {
                        href: "https://jogo.ws",
                        target: "_blank",
                        rel: "noreferrer",
                        children: (0,
                        _e.jsx)(Ce.Jogows, {})
                    })
                }), (0,
                _e.jsxs)("p", {
                    children: [e("infoModal.p2a"), " ", (0,
                    _e.jsx)("a", {
                        href: "https://semantle.com/",
                        target: "_blank",
                        rel: "noreferrer",
                        children: "Semantle"
                    }), e("infoModal.p2b")]
                }), (0,
                _e.jsxs)("p", {
                    children: [e("infoModal.p3"), " ", (0,
                    _e.jsx)("a", {
                        href: e("infoModal.sourceLink"),
                        target: "_blank",
                        rel: "noreferrer",
                        children: e("infoModal.sourceName")
                    }), "."]
                }), (0,
                _e.jsxs)("p", {
                    children: [e("infoModal.p4"), " ", (0,
                    _e.jsx)("a", {
                        href: e("privacyPolicyLink"),
                        target: "_blank",
                        rel: "noreferrer",
                        children: e("privacyPolicy")
                    }), "."]
                }), (0,
                _e.jsxs)("p", {
                    className: "version",
                    children: [e("infoModal.version"), " ", "8dbd7e1"]
                })]
            })
        }
        function Ue(e) {
            var t = e.gameId
              , n = e.loading
              , r = e.data
              , a = q().t;
            if (n)
                return (0,
                _e.jsx)(Me, {
                    text: a("loading")
                });
            if (r.length < 1)
                return (0,
                _e.jsx)("p", {
                    children: a("oops")
                });
            var o = r.map((function(e, t) {
                return [e, t]
            }
            ));
            return (0,
            _e.jsxs)("div", {
                children: [(0,
                _e.jsxs)("p", {
                    children: [a("closestModal.p1a"), " (", (0,
                    _e.jsxs)("b", {
                        children: ["#", t]
                    }), ") ", a("closestModal.p1b")]
                }), (0,
                _e.jsx)("p", {
                    style: {
                        textAlign: "center",
                        fontSize: 20,
                        marginBottom: 15
                    },
                    children: (0,
                    _e.jsx)("b", {
                        children: r[0]
                    })
                }), (0,
                _e.jsx)("p", {
                    children: a("closestModal.p2", {
                        number: r.length
                    })
                }), (0,
                _e.jsx)("div", {
                    children: (0,
                    _e.jsx)(ze, {
                        words: o
                    })
                })]
            })
        }
        var qe = {
            item: {
                display: "flex",
                margin: "20px 0"
            },
            itemName: {
                minWidth: "30%",
                paddingRight: 10
            },
            itemOptions: {
                maxWidth: "70%"
            },
            container: {
                display: "flex",
                cursor: "pointer",
                paddingBottom: 10
            },
            input: {
                paddingRight: 10
            },
            description: {
                fontSize: 14,
                opacity: .8
            }
        };
        function Ve(e) {
            var t = e.tipSetting
              , n = e.onTipSettingChange
              , r = e.language
              , a = e.onLanguageChange
              , o = e.theme
              , i = e.onThemeChange
              , l = e.order
              , s = e.onOrderChange
              , u = e.hideCountdown
              , c = e.onHideCountdownChange
              , d = q().t;
            return (0,
            _e.jsxs)("div", {
                children: [(0,
                _e.jsxs)("div", {
                    className: "modal-title",
                    children: [(0,
                    _e.jsx)(Ce.Settings, {}), (0,
                    _e.jsx)("h2", {
                        children: d("Settings")
                    })]
                }), (0,
                _e.jsxs)("div", {
                    style: qe.item,
                    children: [(0,
                    _e.jsx)("div", {
                        style: qe.itemName,
                        children: d("Language")
                    }), (0,
                    _e.jsxs)("div", {
                        style: qe.itemOptions,
                        children: [(0,
                        _e.jsxs)("div", {
                            style: qe.container,
                            onClick: function() {
                                return a("pt")
                            },
                            children: [(0,
                            _e.jsx)("div", {
                                style: qe.input,
                                children: (0,
                                _e.jsx)("input", {
                                    type: "radio",
                                    checked: "pt" === r,
                                    readOnly: !0
                                })
                            }), (0,
                            _e.jsxs)("div", {
                                children: [(0,
                                _e.jsx)("div", {
                                    children: "Portugu\xeas"
                                }), (0,
                                _e.jsx)("div", {
                                    style: qe.description
                                })]
                            })]
                        }), (0,
                        _e.jsxs)("div", {
                            style: qe.container,
                            onClick: function() {
                                return a("en")
                            },
                            children: [(0,
                            _e.jsx)("div", {
                                style: qe.input,
                                children: (0,
                                _e.jsx)("input", {
                                    type: "radio",
                                    checked: "en" === r,
                                    readOnly: !0
                                })
                            }), (0,
                            _e.jsxs)("div", {
                                children: [(0,
                                _e.jsx)("div", {
                                    children: "English"
                                }), (0,
                                _e.jsx)("div", {
                                    style: qe.description
                                })]
                            })]
                        }), (0,
                        _e.jsxs)("div", {
                            style: qe.container,
                            onClick: function() {
                                return a("es")
                            },
                            children: [(0,
                            _e.jsx)("div", {
                                style: qe.input,
                                children: (0,
                                _e.jsx)("input", {
                                    type: "radio",
                                    checked: "es" === r,
                                    readOnly: !0
                                })
                            }), (0,
                            _e.jsxs)("div", {
                                children: [(0,
                                _e.jsx)("div", {
                                    children: "Espa\xf1ol"
                                }), (0,
                                _e.jsx)("div", {
                                    style: qe.description
                                })]
                            })]
                        })]
                    })]
                }), (0,
                _e.jsxs)("div", {
                    style: qe.item,
                    children: [(0,
                    _e.jsx)("div", {
                        style: qe.itemName,
                        children: d("settingsModal.theme")
                    }), (0,
                    _e.jsxs)("div", {
                        style: qe.itemOptions,
                        children: [(0,
                        _e.jsxs)("div", {
                            style: qe.container,
                            onClick: function() {
                                return i("light")
                            },
                            children: [(0,
                            _e.jsx)("div", {
                                style: qe.input,
                                children: (0,
                                _e.jsx)("input", {
                                    type: "radio",
                                    checked: "light" === o,
                                    readOnly: !0
                                })
                            }), (0,
                            _e.jsxs)("div", {
                                children: [(0,
                                _e.jsx)("div", {
                                    children: d("settingsModal.light")
                                }), (0,
                                _e.jsx)("div", {
                                    style: qe.description
                                })]
                            })]
                        }), (0,
                        _e.jsxs)("div", {
                            style: qe.container,
                            onClick: function() {
                                return i("dark")
                            },
                            children: [(0,
                            _e.jsx)("div", {
                                style: qe.input,
                                children: (0,
                                _e.jsx)("input", {
                                    type: "radio",
                                    checked: "dark" === o,
                                    readOnly: !0
                                })
                            }), (0,
                            _e.jsxs)("div", {
                                children: [(0,
                                _e.jsx)("div", {
                                    children: d("settingsModal.dark")
                                }), (0,
                                _e.jsx)("div", {
                                    style: qe.description
                                })]
                            })]
                        })]
                    })]
                }), (0,
                _e.jsxs)("div", {
                    style: qe.item,
                    children: [(0,
                    _e.jsx)("div", {
                        style: qe.itemName,
                        children: d("settingsModal.tips")
                    }), (0,
                    _e.jsxs)("div", {
                        style: qe.itemOptions,
                        children: [(0,
                        _e.jsxs)("div", {
                            style: qe.container,
                            onClick: function() {
                                return n("half")
                            },
                            children: [(0,
                            _e.jsx)("div", {
                                style: qe.input,
                                children: (0,
                                _e.jsx)("input", {
                                    type: "radio",
                                    checked: "half" === t,
                                    readOnly: !0
                                })
                            }), (0,
                            _e.jsxs)("div", {
                                children: [(0,
                                _e.jsx)("div", {
                                    children: d("settingsModal.easy")
                                }), (0,
                                _e.jsx)("div", {
                                    style: qe.description,
                                    children: d("settingsModal.easyExplanation")
                                })]
                            })]
                        }), (0,
                        _e.jsxs)("div", {
                            style: qe.container,
                            onClick: function() {
                                return n("next")
                            },
                            children: [(0,
                            _e.jsx)("div", {
                                style: qe.input,
                                children: (0,
                                _e.jsx)("input", {
                                    type: "radio",
                                    checked: "next" === t,
                                    readOnly: !0
                                })
                            }), (0,
                            _e.jsxs)("div", {
                                children: [(0,
                                _e.jsx)("div", {
                                    children: d("settingsModal.medium")
                                }), (0,
                                _e.jsx)("div", {
                                    style: qe.description,
                                    children: d("settingsModal.mediumExplanation")
                                })]
                            })]
                        }), (0,
                        _e.jsxs)("div", {
                            style: qe.container,
                            onClick: function() {
                                return n("random")
                            },
                            children: [(0,
                            _e.jsx)("div", {
                                style: qe.input,
                                children: (0,
                                _e.jsx)("input", {
                                    type: "radio",
                                    checked: "random" === t,
                                    readOnly: !0
                                })
                            }), (0,
                            _e.jsxs)("div", {
                                children: [(0,
                                _e.jsx)("div", {
                                    children: d("settingsModal.hard")
                                }), (0,
                                _e.jsx)("div", {
                                    style: qe.description,
                                    children: d("settingsModal.hardExplanation")
                                })]
                            })]
                        })]
                    })]
                }), (0,
                _e.jsxs)("div", {
                    style: qe.item,
                    children: [(0,
                    _e.jsx)("div", {
                        style: qe.itemName,
                        children: d("settingsModal.order")
                    }), (0,
                    _e.jsxs)("div", {
                        style: qe.itemOptions,
                        children: [(0,
                        _e.jsxs)("div", {
                            style: qe.container,
                            onClick: function() {
                                return s("similarity")
                            },
                            children: [(0,
                            _e.jsx)("div", {
                                style: qe.input,
                                children: (0,
                                _e.jsx)("input", {
                                    type: "radio",
                                    checked: "similarity" === l,
                                    readOnly: !0
                                })
                            }), (0,
                            _e.jsxs)("div", {
                                children: [(0,
                                _e.jsx)("div", {
                                    children: d("settingsModal.similarity")
                                }), (0,
                                _e.jsx)("div", {
                                    style: qe.description
                                })]
                            })]
                        }), (0,
                        _e.jsxs)("div", {
                            style: qe.container,
                            onClick: function() {
                                return s("guess")
                            },
                            children: [(0,
                            _e.jsx)("div", {
                                style: qe.input,
                                children: (0,
                                _e.jsx)("input", {
                                    type: "radio",
                                    checked: "guess" === l,
                                    readOnly: !0
                                })
                            }), (0,
                            _e.jsxs)("div", {
                                children: [(0,
                                _e.jsx)("div", {
                                    children: d("settingsModal.guess")
                                }), (0,
                                _e.jsx)("div", {
                                    style: qe.description
                                })]
                            })]
                        })]
                    })]
                }), (0,
                _e.jsxs)("div", {
                    style: qe.item,
                    children: [(0,
                    _e.jsx)("div", {
                        style: qe.itemName,
                        children: d("settingsModal.other")
                    }), (0,
                    _e.jsx)("div", {
                        style: qe.itemOptions,
                        children: (0,
                        _e.jsxs)("div", {
                            style: qe.container,
                            onClick: function() {
                                return c(!u)
                            },
                            children: [(0,
                            _e.jsx)("div", {
                                style: qe.input,
                                children: (0,
                                _e.jsx)("input", {
                                    type: "checkbox",
                                    checked: u,
                                    readOnly: !0
                                })
                            }), (0,
                            _e.jsxs)("div", {
                                children: [(0,
                                _e.jsx)("div", {
                                    children: d("settingsModal.hideCountdown")
                                }), (0,
                                _e.jsx)("div", {
                                    style: qe.description
                                })]
                            })]
                        })
                    })]
                })]
            })
        }
        var He = {
            pt: "https://docs.google.com/forms/d/e/1FAIpQLSedr9Hx6ZhoALP02Cgh8j-77yd7jGJrGxBtdnjtJ7zm8f19QQ/viewform",
            en: "https://docs.google.com/forms/d/e/1FAIpQLSf_acy442tZY3LuRW1oArOXPzO4r4jMq3GrEaR9xEQTzLJ4nQ/viewform",
            es: "https://docs.google.com/forms/d/e/1FAIpQLSfB5hfO1q2cTwaexu3HAAo9VExgGh68VlXVmNm3WBJJ-pYQFQ/viewform"
        };
        function Be(e) {
            var t = q().t
              , n = e.language
              , r = He[n];
            return (0,
            _e.jsxs)("div", {
                children: [(0,
                _e.jsxs)("div", {
                    className: "modal-title",
                    children: [(0,
                    _e.jsx)(Ce.Chat, {}), (0,
                    _e.jsx)("h2", {
                        children: t("FeedbackTitle")
                    })]
                }), (0,
                _e.jsx)("p", {
                    children: t("FeedbackText.pt1")
                }), (0,
                _e.jsx)("p", {
                    children: t("FeedbackText.pt2")
                }), (0,
                _e.jsx)("div", {
                    className: "modal-btn-div",
                    children: (0,
                    _e.jsx)("button", {
                        type: "button",
                        className: "button",
                        onClick: function() {
                            window.open(r, "_blank")
                        },
                        children: t("FeedbackButton")
                    })
                })]
            })
        }
        var $e = n(7)
          , Ye = n.n($e);
        function We(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function Ge(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
        }
        function Qe(e, t, n) {
            return t && Ge(e.prototype, t),
            n && Ge(e, n),
            e
        }
        function Ke(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        function Je() {
            return (Je = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }
            ).apply(this, arguments)
        }
        function Ze(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function Xe(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && tt(e, t)
        }
        function et(e) {
            return (et = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            )(e)
        }
        function tt(e, t) {
            return (tt = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t,
                e
            }
            )(e, t)
        }
        function nt(e) {
            if (void 0 === e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }
        function rt(e, t) {
            return !t || "object" != typeof t && "function" != typeof t ? nt(e) : t
        }
        function at(e) {
            var t = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct)
                    return !1;
                if (Reflect.construct.sham)
                    return !1;
                if ("function" == typeof Proxy)
                    return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}
                    ))),
                    !0
                } catch (e) {
                    return !1
                }
            }();
            return function() {
                var n, r = et(e);
                if (t) {
                    var a = et(this).constructor;
                    n = Reflect.construct(r, arguments, a)
                } else
                    n = r.apply(this, arguments);
                return rt(this, n)
            }
        }
        var ot = {
            return: 13,
            arrowLeft: 37,
            arrowUp: 38,
            arrowRight: 39,
            arrowDown: 40,
            space: 32
        };
        ot.keyCodes = Object.keys(ot).reduce((function(e, t) {
            return e[ot[t]] = t,
            e
        }
        ), {});
        var it = {
            "faq-row-wrapper": "styles_faq-row-wrapper__3vA1D",
            "faq-row": "styles_faq-row__2YF3c",
            "row-body": "styles_row-body__1NvUo",
            "row-title": "styles_row-title__1YiiY",
            "no-tabfocus": "styles_no-tabfocus__1HmyD",
            "row-title-text": "styles_row-title-text__1MuhU",
            "icon-wrapper": "styles_icon-wrapper__2cftw",
            closed: "styles_closed__39w54",
            "row-content": "styles_row-content__QOGZd",
            animate: "styles_animate__3ecdr",
            static: "styles_static__3chYW",
            expanded: "styles_expanded__3elPy",
            expanding: "styles_expanding__2OAFB",
            "row-content-text": "styles_row-content-text__2sgAB"
        };
        !function(e, t) {
            void 0 === t && (t = {});
            var n = t.insertAt;
            if ("undefined" != typeof document) {
                var r = document.head || document.getElementsByTagName("head")[0]
                  , a = document.createElement("style");
                a.type = "text/css",
                "top" === n && r.firstChild ? r.insertBefore(a, r.firstChild) : r.appendChild(a),
                a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(document.createTextNode(e))
            }
        }(".styles_faq-row-wrapper__3vA1D {\n  background-color: var(--faq-bg-color, white); }\n  .styles_faq-row-wrapper__3vA1D h2 {\n    margin: 0;\n    color: var(--title-text-color, black);\n    font-size: var(--title-text-size, 30px); }\n  .styles_faq-row-wrapper__3vA1D .styles_faq-row__2YF3c {\n    display: flex;\n    justify-content: space-between;\n    padding: 5px 0;\n    border-bottom: 1px solid #ccc; }\n  .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c {\n    flex-direction: column;\n    position: relative; }\n    .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY {\n      padding: 10px 0;\n      display: flex;\n      justify-content: space-between;\n      color: var(--row-title-color, black);\n      font-size: var(--row-title-text-size, large);\n      cursor: pointer;\n      align-items: center; }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_no-tabfocus__1HmyD {\n        outline: none; }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY .styles_row-title-text__1MuhU {\n        padding-right: 3em; }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY .styles_icon-wrapper__2cftw {\n        max-width: 25px;\n        max-height: 25px;\n        margin: 0;\n        padding: 0;\n        color: var(--arrow-color, black);\n        transform: rotate(0deg);\n        transition: transform var(--transition-duration, 0.3s);\n        position: absolute;\n        top: 13px;\n        right: 12px; }\n        .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY .styles_icon-wrapper__2cftw svg {\n          width: 100%;\n          height: 100%; }\n        .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY .styles_icon-wrapper__2cftw svg {\n          fill: var(--arrow-color, black); }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_closed__39w54 + .styles_row-content__QOGZd {\n        visibility: hidden; }\n        .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_closed__39w54 + .styles_row-content__QOGZd.styles_animate__3ecdr {\n          opacity: 0;\n          transition: height var(--transition-duration, 0.3s); }\n        .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_closed__39w54 + .styles_row-content__QOGZd.styles_static__3chYW {\n          display: none; }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_expanded__3elPy + .styles_row-content__QOGZd {\n        visibility: visible; }\n        .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_expanded__3elPy + .styles_row-content__QOGZd.styles_static__3chYW {\n          display: block; }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_expanded__3elPy .styles_icon-wrapper__2cftw {\n        transform: rotate(180deg); }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_expanding__2OAFB .styles_icon-wrapper__2cftw {\n        transform: rotate(180deg); }\n    .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-content__QOGZd {\n      overflow: hidden;\n      transition: height var(--transition-duration, 0.3s);\n      transition-timing-function: var(--timing-function, ease); }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-content__QOGZd .styles_row-content-text__2sgAB {\n        color: var(--row-content-color, black);\n        font-size: var(--row-content-text-size, medium);\n        padding: var(--row-content-padding-top, 0) var(--row-content-padding-right, 0) var(--row-content-padding-bottom, 0) var(--row-content-padding-left, 0); }\n");
        var lt = function(t) {
            Xe(r, e.PureComponent);
            var n = at(r);
            function r() {
                var t;
                We(this, r);
                for (var a = arguments.length, o = new Array(a), i = 0; i < a; i++)
                    o[i] = arguments[i];
                return Ke(nt(t = n.call.apply(n, [this].concat(o))), "state", {
                    isExpanded: !1,
                    ref: e.createRef(),
                    rowRef: e.createRef(),
                    height: 0,
                    rowClassName: "closed"
                }),
                Ke(nt(t), "finishTransition", (function() {
                    var e = t.state.isExpanded;
                    t.setState({
                        rowClassName: e ? "expanded" : "closed"
                    })
                }
                )),
                Ke(nt(t), "toggle", (function(e) {
                    t.setState((function() {
                        return {
                            isExpanded: e
                        }
                    }
                    ))
                }
                )),
                Ke(nt(t), "expand", (function() {
                    t.setState((function(e) {
                        return {
                            isExpanded: !e.isExpanded
                        }
                    }
                    ))
                }
                )),
                Ke(nt(t), "keyPress", (function(e) {
                    var n = e.keyCode ? e.keyCode : e.which;
                    switch (ot.keyCodes[n]) {
                    case "space":
                    case "return":
                        e.preventDefault(),
                        e.stopPropagation(),
                        t.expand()
                    }
                }
                )),
                Ke(nt(t), "setHeight", (function() {
                    var e = t.state
                      , n = e.ref
                      , r = e.isExpanded
                      , a = n.current.scrollHeight;
                    t.setState({
                        height: r ? a : 0
                    })
                }
                )),
                t
            }
            return Qe(r, [{
                key: "getSnapshotBeforeUpdate",
                value: function(e, t) {
                    var n = t.isExpanded
                      , r = this.state.isExpanded
                      , a = this.props.config
                      , o = (a = void 0 === a ? {} : a).animate
                      , i = void 0 === o || o;
                    return r !== n ? {
                        rowClassName: r ? i ? "expanding" : "expanded" : i ? "closing" : "closed"
                    } : null
                }
            }, {
                key: "componentDidUpdate",
                value: function(e, t, n) {
                    var r = this.props.config
                      , a = (r = void 0 === r ? {} : r).animate
                      , o = void 0 === a || a;
                    null !== n && this.setState(function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var n = null != arguments[t] ? arguments[t] : {};
                            t % 2 ? Ze(Object(n), !0).forEach((function(t) {
                                Ke(e, t, n[t])
                            }
                            )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ze(Object(n)).forEach((function(t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                            }
                            ))
                        }
                        return e
                    }({}, n), o ? this.setHeight : void 0)
                }
            }, {
                key: "componentDidMount",
                value: function() {
                    var e = this
                      , t = this.state.rowRef;
                    if (this.props.openOnload && this.expand(),
                    this.props.getRowOptions) {
                        var n = {
                            expand: function() {
                                e.toggle(!0)
                            },
                            close: function() {
                                e.toggle(!1)
                            },
                            scrollIntoView: function(e) {
                                e ? t.current.scrollIntoView(e) : t.current.scrollIntoView()
                            }
                        };
                        this.props.getRowOptions(n)
                    }
                }
            }, {
                key: "render",
                value: function() {
                    var t = this.props
                      , n = t.data
                      , r = n.title
                      , a = n.content
                      , o = t.config
                      , i = (o = void 0 === o ? {} : o).animate
                      , l = void 0 === i || i
                      , s = o.arrowIcon
                      , u = o.expandIcon
                      , c = o.collapseIcon
                      , d = o.tabFocus
                      , f = void 0 !== d && d
                      , p = this.state
                      , h = p.isExpanded
                      , g = p.ref
                      , m = p.height
                      , v = p.rowClassName
                      , y = p.rowRef
                      , b = {
                        onClick: this.expand,
                        role: "button",
                        "aria-expanded": h,
                        "aria-controls": "react-faq-rowcontent-".concat(this.props.rowid),
                        onKeyPress: this.keyPress,
                        onKeyDown: this.keyPress
                    };
                    f && (b.tabIndex = 0);
                    var w = {
                        role: "region",
                        id: "react-faq-rowcontent-".concat(this.props.rowid),
                        "aria-expanded": h,
                        "aria-hidden": !h,
                        onTransitionEnd: this.finishTransition
                    };
                    l && (w.style = {
                        height: m
                    });
                    var x, k = ["row-title", v, it["row-title"], it[v], f ? "" : it["no-tabfocus"]].filter(Boolean).join(" ");
                    x = u && c ? h ? c : u : s || e.createElement("div", {
                        dangerouslySetInnerHTML: {
                            __html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="36px" height="36px"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>'
                        },
                        className: "arrow-image ".concat(it["arrow-image"]),
                        alt: "Expand arrow"
                    });
                    var _ = [it["row-content"], "row-content", l ? it.animate : it.static].join(" ")
                      , C = [it["row-content-text"], "row-content-text"].join(" ")
                      , S = a && "string" == typeof a ? e.createElement("div", {
                        className: C,
                        dangerouslySetInnerHTML: {
                            __html: a
                        }
                    }) : e.createElement("div", {
                        className: C
                    }, a);
                    return e.createElement("section", {
                        className: "faq-row ".concat(it["faq-row"]),
                        role: "listitem",
                        ref: y
                    }, e.createElement("div", Je({
                        className: k
                    }, b), e.createElement("div", {
                        className: "row-title-text ".concat(it["row-title-text"]),
                        id: "react-faq-rowtitle-".concat(this.props.rowid)
                    }, r), e.createElement("span", {
                        className: "icon-wrapper ".concat(it["icon-wrapper"]),
                        "aria-hidden": "true"
                    }, x)), e.createElement("div", Je({
                        className: _
                    }, w, {
                        ref: g
                    }), S))
                }
            }]),
            r
        }();
        Ke(lt, "propTypes", {
            config: Ye().object,
            data: Ye().object,
            rowid: Ye().number,
            getRowOptions: Ye().func,
            openOnload: Ye().bool
        });
        var st = function(t) {
            Xe(r, e.PureComponent);
            var n = at(r);
            function r() {
                var e;
                We(this, r);
                for (var t = arguments.length, a = new Array(t), o = 0; o < t; o++)
                    a[o] = arguments[o];
                return Ke(nt(e = n.call.apply(n, [this].concat(a))), "state", {
                    rowsOption: []
                }),
                e
            }
            return Qe(r, [{
                key: "componentDidMount",
                value: function() {
                    this.props.getRowOptions && this.props.getRowOptions(this.state.rowsOption)
                }
            }, {
                key: "render",
                value: function() {
                    var t = this
                      , n = this.props.data || {}
                      , r = n.title
                      , a = n.rows
                      , o = void 0 === a ? [] : a
                      , i = this.props
                      , l = i.styles
                      , s = void 0 === l ? {} : l
                      , u = i.config
                      , c = ((u = void 0 === u ? {} : u).animate,
                    u.openOnload)
                      , d = {
                        "--faq-bg-color": s.bgColor,
                        "--title-text-color": s.titleTextColor,
                        "--title-text-size": s.titleTextSize,
                        "--row-title-color": s.rowTitleColor,
                        "--row-title-text-size": s.rowTitleTextSize,
                        "--row-content-color": s.rowContentColor,
                        "--row-content-text-size": s.rowContentTextSize,
                        "--row-content-padding-top": s.rowContentPaddingTop,
                        "--row-content-padding-bottom": s.rowContentPaddingBottom,
                        "--row-content-padding-right": s.rowContentPaddingRight,
                        "--row-content-padding-left": s.rowContentPaddingLeft,
                        "--arrow-color": s.arrowColor,
                        "--transition-duration": s.transitionDuration,
                        "--timing-function": s.timingFunc
                    }
                      , f = "faq-row-wrapper ".concat(it["faq-row-wrapper"])
                      , p = "faq-title ".concat(it["faq-row"])
                      , h = "faq-body ".concat(it["row-body"]);
                    return e.createElement("div", {
                        className: f,
                        style: d
                    }, r ? e.createElement("section", {
                        className: p
                    }, e.createElement("h2", null, r)) : null, o.length ? e.createElement("section", {
                        className: h,
                        role: "list"
                    }, o.map((function(n, r) {
                        return e.createElement(lt, {
                            openOnload: c === r,
                            data: n,
                            key: r,
                            rowid: r + 1,
                            config: t.props.config,
                            getRowOptions: function(e) {
                                return t.state.rowsOption[r] = e
                            }
                        })
                    }
                    ))) : null)
                }
            }]),
            r
        }();
        Ke(st, "propTypes", {
            data: Ye().object,
            styles: Ye().object,
            config: Ye().object,
            getRowOptions: Ye().func
        });
        var ut = st;
        function ct(e) {
            var t = e.limit
              , n = q().t
              , r = {
                rows: [{
                    title: n("faq.q1"),
                    content: n("faq.a1")
                }, {
                    title: n("faq.q2"),
                    content: n("faq.a2")
                }, {
                    title: n("faq.q3"),
                    content: n("faq.a3")
                }, {
                    title: n("faq.q4"),
                    content: n("faq.a4")
                }, {
                    title: n("faq.q5"),
                    content: n("faq.a5")
                }, {
                    title: n("faq.q6"),
                    content: n("faq.a6")
                }].slice(0, t)
            };
            return (0,
            _e.jsxs)("div", {
                children: [(0,
                _e.jsxs)("div", {
                    className: "modal-title",
                    children: [(0,
                    _e.jsx)(Ce.FAQ, {}), (0,
                    _e.jsx)("h2", {
                        children: n("faq.title")
                    })]
                }), (0,
                _e.jsx)(ut, {
                    data: r
                })]
            })
        }
        function dt(e) {
            var t = e.lastGameId
              , n = e.onSelectGame
              , r = e.gameData
              , a = e.language
              , o = q().t
              , l = K()
              , s = Q(a)
              , u = l.diff(s, "days") + 1
              , c = i(Array(u)).map((function(e, n) {
                return {
                    date: l.subtract(n, "day"),
                    gameId: t - n
                }
            }
            ))
              , d = function(e) {
                if (void 0 === r[e])
                    return "";
                var t = r[e];
                return t.foundWord ? o("Got it") : t.gaveUp ? o("Gave up") : !t.gaveUp && !t.foundWord && t.numberOfAttempts > 0 ? o("In progress") : ""
            }
              , f = c.filter((function(e) {
                return "" === d(e.gameId) && e.gameId !== t
            }
            ))
              , p = "ddd, MMM D";
            return "pt" === a ? p = "ddd, D MMM" : "es" === a && (p = "ddd D MMM"),
            (0,
            _e.jsxs)("div", {
                children: [(0,
                _e.jsx)("p", {
                    children: o("previousModalText")
                }), (0,
                _e.jsxs)("div", {
                    children: [f.length > 0 && (0,
                    _e.jsx)("div", {
                        style: {
                            padding: "10px 0 15px 0",
                            textAlign: "center"
                        },
                        children: (0,
                        _e.jsx)("button", {
                            type: "button",
                            className: "button",
                            onClick: function() {
                                var e = Math.floor(Math.random() * f.length)
                                  , t = f[e].gameId;
                                n(t, !0)
                            },
                            children: (0,
                            _e.jsx)("div", {
                                className: "game-selection-button",
                                children: (0,
                                _e.jsxs)("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center"
                                    },
                                    children: [(0,
                                    _e.jsx)(Ce.Random, {}), o("random")]
                                })
                            })
                        })
                    }), c.map((function(e) {
                        return (0,
                        _e.jsx)("div", {
                            style: {
                                padding: "5px 0"
                            },
                            children: (0,
                            _e.jsx)("button", {
                                type: "button",
                                className: "button button-full",
                                onClick: function() {
                                    return n(e.gameId)
                                },
                                children: (0,
                                _e.jsxs)("div", {
                                    className: "game-selection-button",
                                    children: [(0,
                                    _e.jsxs)("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center"
                                        },
                                        children: [(0,
                                        _e.jsxs)("div", {
                                            children: ["#", e.gameId]
                                        }), (0,
                                        _e.jsx)("div", {
                                            style: {
                                                fontSize: 14,
                                                marginLeft: 10
                                            },
                                            children: e.date.format(p)
                                        })]
                                    }), (0,
                                    _e.jsx)("div", {
                                        children: d(e.gameId)
                                    })]
                                })
                            })
                        }, e.gameId)
                    }
                    ))]
                })]
            })
        }
        Boolean("localhost" === window.location.hostname || "[::1]" === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
        function ft(e) {
            return ft = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            ,
            ft(e)
        }
        function pt(e) {
            if (void 0 === e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }
        function ht(e, t) {
            return ht = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t,
                e
            }
            ,
            ht(e, t)
        }
        function gt(e, t) {
            if ("function" !== typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }),
            Object.defineProperty(e, "prototype", {
                writable: !1
            }),
            t && ht(e, t)
        }
        function mt(e, t) {
            if (t && ("object" === ft(t) || "function" === typeof t))
                return t;
            if (void 0 !== t)
                throw new TypeError("Derived constructors may only return object or undefined");
            return pt(e)
        }
        function vt(e) {
            return vt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            ,
            vt(e)
        }
        function yt(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function bt(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? yt(Object(n), !0).forEach((function(t) {
                    u(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : yt(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        var wt = {
            type: "logger",
            log: function(e) {
                this.output("log", e)
            },
            warn: function(e) {
                this.output("warn", e)
            },
            error: function(e) {
                this.output("error", e)
            },
            output: function(e, t) {
                console && console[e] && console[e].apply(console, t)
            }
        }
          , xt = function() {
            function e(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                v(this, e),
                this.init(t, n)
            }
            return b(e, [{
                key: "init",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    this.prefix = t.prefix || "i18next:",
                    this.logger = e || wt,
                    this.options = t,
                    this.debug = t.debug
                }
            }, {
                key: "setDebug",
                value: function(e) {
                    this.debug = e
                }
            }, {
                key: "log",
                value: function() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                        t[n] = arguments[n];
                    return this.forward(t, "log", "", !0)
                }
            }, {
                key: "warn",
                value: function() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                        t[n] = arguments[n];
                    return this.forward(t, "warn", "", !0)
                }
            }, {
                key: "error",
                value: function() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                        t[n] = arguments[n];
                    return this.forward(t, "error", "")
                }
            }, {
                key: "deprecate",
                value: function() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                        t[n] = arguments[n];
                    return this.forward(t, "warn", "WARNING DEPRECATED: ", !0)
                }
            }, {
                key: "forward",
                value: function(e, t, n, r) {
                    return r && !this.debug ? null : ("string" === typeof e[0] && (e[0] = "".concat(n).concat(this.prefix, " ").concat(e[0])),
                    this.logger[t](e))
                }
            }, {
                key: "create",
                value: function(t) {
                    return new e(this.logger,bt(bt({}, {
                        prefix: "".concat(this.prefix, ":").concat(t, ":")
                    }), this.options))
                }
            }]),
            e
        }()
          , kt = new xt
          , _t = function() {
            function e() {
                v(this, e),
                this.observers = {}
            }
            return b(e, [{
                key: "on",
                value: function(e, t) {
                    var n = this;
                    return e.split(" ").forEach((function(e) {
                        n.observers[e] = n.observers[e] || [],
                        n.observers[e].push(t)
                    }
                    )),
                    this
                }
            }, {
                key: "off",
                value: function(e, t) {
                    this.observers[e] && (t ? this.observers[e] = this.observers[e].filter((function(e) {
                        return e !== t
                    }
                    )) : delete this.observers[e])
                }
            }, {
                key: "emit",
                value: function(e) {
                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
                        n[r - 1] = arguments[r];
                    if (this.observers[e]) {
                        var a = [].concat(this.observers[e]);
                        a.forEach((function(e) {
                            e.apply(void 0, n)
                        }
                        ))
                    }
                    if (this.observers["*"]) {
                        var o = [].concat(this.observers["*"]);
                        o.forEach((function(t) {
                            t.apply(t, [e].concat(n))
                        }
                        ))
                    }
                }
            }]),
            e
        }();
        function Ct() {
            var e, t, n = new Promise((function(n, r) {
                e = n,
                t = r
            }
            ));
            return n.resolve = e,
            n.reject = t,
            n
        }
        function St(e) {
            return null == e ? "" : "" + e
        }
        function jt(e, t, n) {
            e.forEach((function(e) {
                t[e] && (n[e] = t[e])
            }
            ))
        }
        function Ot(e, t, n) {
            function r(e) {
                return e && e.indexOf("###") > -1 ? e.replace(/###/g, ".") : e
            }
            function a() {
                return !e || "string" === typeof e
            }
            for (var o = "string" !== typeof t ? [].concat(t) : t.split("."); o.length > 1; ) {
                if (a())
                    return {};
                var i = r(o.shift());
                !e[i] && n && (e[i] = new n),
                e = Object.prototype.hasOwnProperty.call(e, i) ? e[i] : {}
            }
            return a() ? {} : {
                obj: e,
                k: r(o.shift())
            }
        }
        function Et(e, t, n) {
            var r = Ot(e, t, Object);
            r.obj[r.k] = n
        }
        function Pt(e, t) {
            var n = Ot(e, t)
              , r = n.obj
              , a = n.k;
            if (r)
                return r[a]
        }
        function Nt(e, t, n) {
            var r = Pt(e, n);
            return void 0 !== r ? r : Pt(t, n)
        }
        function Lt(e, t, n) {
            for (var r in t)
                "__proto__" !== r && "constructor" !== r && (r in e ? "string" === typeof e[r] || e[r]instanceof String || "string" === typeof t[r] || t[r]instanceof String ? n && (e[r] = t[r]) : Lt(e[r], t[r], n) : e[r] = t[r]);
            return e
        }
        function Mt(e) {
            return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        }
        var Tt = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;"
        };
        function Dt(e) {
            return "string" === typeof e ? e.replace(/[&<>"'\/]/g, (function(e) {
                return Tt[e]
            }
            )) : e
        }
        var Rt = "undefined" !== typeof window && window.navigator && "undefined" === typeof window.navigator.userAgentData && window.navigator.userAgent && window.navigator.userAgent.indexOf("MSIE") > -1
          , zt = [" ", ",", "?", "!", ";"];
        function It(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function At(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? It(Object(n), !0).forEach((function(t) {
                    u(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : It(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        function Ft(e) {
            var t = function() {
                if ("undefined" === typeof Reflect || !Reflect.construct)
                    return !1;
                if (Reflect.construct.sham)
                    return !1;
                if ("function" === typeof Proxy)
                    return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                    ))),
                    !0
                } catch (e) {
                    return !1
                }
            }();
            return function() {
                var n, r = vt(e);
                if (t) {
                    var a = vt(this).constructor;
                    n = Reflect.construct(r, arguments, a)
                } else
                    n = r.apply(this, arguments);
                return mt(this, n)
            }
        }
        function Ut(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".";
            if (e) {
                if (e[t])
                    return e[t];
                for (var r = t.split(n), a = e, o = 0; o < r.length; ++o) {
                    if (!a)
                        return;
                    if ("string" === typeof a[r[o]] && o + 1 < r.length)
                        return;
                    if (void 0 === a[r[o]]) {
                        for (var i = 2, l = r.slice(o, o + i).join(n), s = a[l]; void 0 === s && r.length > o + i; )
                            i++,
                            s = a[l = r.slice(o, o + i).join(n)];
                        if (void 0 === s)
                            return;
                        if (null === s)
                            return null;
                        if (t.endsWith(l)) {
                            if ("string" === typeof s)
                                return s;
                            if (l && "string" === typeof s[l])
                                return s[l]
                        }
                        var u = r.slice(o + i).join(n);
                        return u ? Ut(s, u, n) : void 0
                    }
                    a = a[r[o]]
                }
                return a
            }
        }
        var qt = function(e) {
            gt(n, e);
            var t = Ft(n);
            function n(e) {
                var r, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                    ns: ["translation"],
                    defaultNS: "translation"
                };
                return v(this, n),
                r = t.call(this),
                Rt && _t.call(pt(r)),
                r.data = e || {},
                r.options = a,
                void 0 === r.options.keySeparator && (r.options.keySeparator = "."),
                void 0 === r.options.ignoreJSONStructure && (r.options.ignoreJSONStructure = !0),
                r
            }
            return b(n, [{
                key: "addNamespaces",
                value: function(e) {
                    this.options.ns.indexOf(e) < 0 && this.options.ns.push(e)
                }
            }, {
                key: "removeNamespaces",
                value: function(e) {
                    var t = this.options.ns.indexOf(e);
                    t > -1 && this.options.ns.splice(t, 1)
                }
            }, {
                key: "getResource",
                value: function(e, t, n) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}
                      , a = void 0 !== r.keySeparator ? r.keySeparator : this.options.keySeparator
                      , o = void 0 !== r.ignoreJSONStructure ? r.ignoreJSONStructure : this.options.ignoreJSONStructure
                      , i = [e, t];
                    n && "string" !== typeof n && (i = i.concat(n)),
                    n && "string" === typeof n && (i = i.concat(a ? n.split(a) : n)),
                    e.indexOf(".") > -1 && (i = e.split("."));
                    var l = Pt(this.data, i);
                    return l || !o || "string" !== typeof n ? l : Ut(this.data && this.data[e] && this.data[e][t], n, a)
                }
            }, {
                key: "addResource",
                value: function(e, t, n, r) {
                    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {
                        silent: !1
                    }
                      , o = this.options.keySeparator;
                    void 0 === o && (o = ".");
                    var i = [e, t];
                    n && (i = i.concat(o ? n.split(o) : n)),
                    e.indexOf(".") > -1 && (r = t,
                    t = (i = e.split("."))[1]),
                    this.addNamespaces(t),
                    Et(this.data, i, r),
                    a.silent || this.emit("added", e, t, n, r)
                }
            }, {
                key: "addResources",
                value: function(e, t, n) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
                        silent: !1
                    };
                    for (var a in n)
                        "string" !== typeof n[a] && "[object Array]" !== Object.prototype.toString.apply(n[a]) || this.addResource(e, t, a, n[a], {
                            silent: !0
                        });
                    r.silent || this.emit("added", e, t, n)
                }
            }, {
                key: "addResourceBundle",
                value: function(e, t, n, r, a) {
                    var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {
                        silent: !1
                    }
                      , i = [e, t];
                    e.indexOf(".") > -1 && (r = n,
                    n = t,
                    t = (i = e.split("."))[1]),
                    this.addNamespaces(t);
                    var l = Pt(this.data, i) || {};
                    r ? Lt(l, n, a) : l = At(At({}, l), n),
                    Et(this.data, i, l),
                    o.silent || this.emit("added", e, t, n)
                }
            }, {
                key: "removeResourceBundle",
                value: function(e, t) {
                    this.hasResourceBundle(e, t) && delete this.data[e][t],
                    this.removeNamespaces(t),
                    this.emit("removed", e, t)
                }
            }, {
                key: "hasResourceBundle",
                value: function(e, t) {
                    return void 0 !== this.getResource(e, t)
                }
            }, {
                key: "getResourceBundle",
                value: function(e, t) {
                    return t || (t = this.options.defaultNS),
                    "v1" === this.options.compatibilityAPI ? At(At({}, {}), this.getResource(e, t)) : this.getResource(e, t)
                }
            }, {
                key: "getDataByLanguage",
                value: function(e) {
                    return this.data[e]
                }
            }, {
                key: "hasLanguageSomeTranslations",
                value: function(e) {
                    var t = this.getDataByLanguage(e);
                    return !!(t && Object.keys(t) || []).find((function(e) {
                        return t[e] && Object.keys(t[e]).length > 0
                    }
                    ))
                }
            }, {
                key: "toJSON",
                value: function() {
                    return this.data
                }
            }]),
            n
        }(_t)
          , Vt = {
            processors: {},
            addPostProcessor: function(e) {
                this.processors[e.name] = e
            },
            handle: function(e, t, n, r, a) {
                var o = this;
                return e.forEach((function(e) {
                    o.processors[e] && (t = o.processors[e].process(t, n, r, a))
                }
                )),
                t
            }
        };
        function Ht(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function Bt(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Ht(Object(n), !0).forEach((function(t) {
                    u(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ht(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        function $t(e) {
            var t = function() {
                if ("undefined" === typeof Reflect || !Reflect.construct)
                    return !1;
                if (Reflect.construct.sham)
                    return !1;
                if ("function" === typeof Proxy)
                    return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                    ))),
                    !0
                } catch (e) {
                    return !1
                }
            }();
            return function() {
                var n, r = vt(e);
                if (t) {
                    var a = vt(this).constructor;
                    n = Reflect.construct(r, arguments, a)
                } else
                    n = r.apply(this, arguments);
                return mt(this, n)
            }
        }
        var Yt = {}
          , Wt = function(e) {
            gt(n, e);
            var t = $t(n);
            function n(e) {
                var r, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return v(this, n),
                r = t.call(this),
                Rt && _t.call(pt(r)),
                jt(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, pt(r)),
                r.options = a,
                void 0 === r.options.keySeparator && (r.options.keySeparator = "."),
                r.logger = kt.create("translator"),
                r
            }
            return b(n, [{
                key: "changeLanguage",
                value: function(e) {
                    e && (this.language = e)
                }
            }, {
                key: "exists",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                        interpolation: {}
                    };
                    if (void 0 === e || null === e)
                        return !1;
                    var n = this.resolve(e, t);
                    return n && void 0 !== n.res
                }
            }, {
                key: "extractFromKey",
                value: function(e, t) {
                    var n = void 0 !== t.nsSeparator ? t.nsSeparator : this.options.nsSeparator;
                    void 0 === n && (n = ":");
                    var r = void 0 !== t.keySeparator ? t.keySeparator : this.options.keySeparator
                      , a = t.ns || this.options.defaultNS || []
                      , o = n && e.indexOf(n) > -1
                      , i = !this.options.userDefinedKeySeparator && !t.keySeparator && !this.options.userDefinedNsSeparator && !t.nsSeparator && !function(e, t, n) {
                        t = t || "",
                        n = n || "";
                        var r = zt.filter((function(e) {
                            return t.indexOf(e) < 0 && n.indexOf(e) < 0
                        }
                        ));
                        if (0 === r.length)
                            return !0;
                        var a = new RegExp("(".concat(r.map((function(e) {
                            return "?" === e ? "\\?" : e
                        }
                        )).join("|"), ")"))
                          , o = !a.test(e);
                        if (!o) {
                            var i = e.indexOf(n);
                            i > 0 && !a.test(e.substring(0, i)) && (o = !0)
                        }
                        return o
                    }(e, n, r);
                    if (o && !i) {
                        var l = e.match(this.interpolator.nestingRegexp);
                        if (l && l.length > 0)
                            return {
                                key: e,
                                namespaces: a
                            };
                        var s = e.split(n);
                        (n !== r || n === r && this.options.ns.indexOf(s[0]) > -1) && (a = s.shift()),
                        e = s.join(r)
                    }
                    return "string" === typeof a && (a = [a]),
                    {
                        key: e,
                        namespaces: a
                    }
                }
            }, {
                key: "translate",
                value: function(e, t, r) {
                    var a = this;
                    if ("object" !== ft(t) && this.options.overloadTranslationOptionHandler && (t = this.options.overloadTranslationOptionHandler(arguments)),
                    t || (t = {}),
                    void 0 === e || null === e)
                        return "";
                    Array.isArray(e) || (e = [String(e)]);
                    var o = void 0 !== t.returnDetails ? t.returnDetails : this.options.returnDetails
                      , i = void 0 !== t.keySeparator ? t.keySeparator : this.options.keySeparator
                      , l = this.extractFromKey(e[e.length - 1], t)
                      , s = l.key
                      , u = l.namespaces
                      , c = u[u.length - 1]
                      , d = t.lng || this.language
                      , f = t.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
                    if (d && "cimode" === d.toLowerCase()) {
                        if (f) {
                            var p = t.nsSeparator || this.options.nsSeparator;
                            return o ? (h.res = "".concat(c).concat(p).concat(s),
                            h) : "".concat(c).concat(p).concat(s)
                        }
                        return o ? (h.res = s,
                        h) : s
                    }
                    var h = this.resolve(e, t)
                      , g = h && h.res
                      , m = h && h.usedKey || s
                      , v = h && h.exactUsedKey || s
                      , y = Object.prototype.toString.apply(g)
                      , b = ["[object Number]", "[object Function]", "[object RegExp]"]
                      , w = void 0 !== t.joinArrays ? t.joinArrays : this.options.joinArrays
                      , x = !this.i18nFormat || this.i18nFormat.handleAsObject
                      , k = "string" !== typeof g && "boolean" !== typeof g && "number" !== typeof g;
                    if (x && g && k && b.indexOf(y) < 0 && ("string" !== typeof w || "[object Array]" !== y)) {
                        if (!t.returnObjects && !this.options.returnObjects) {
                            this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
                            var _ = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(m, g, Bt(Bt({}, t), {}, {
                                ns: u
                            })) : "key '".concat(s, " (").concat(this.language, ")' returned an object instead of string.");
                            return o ? (h.res = _,
                            h) : _
                        }
                        if (i) {
                            var C = "[object Array]" === y
                              , S = C ? [] : {}
                              , j = C ? v : m;
                            for (var O in g)
                                if (Object.prototype.hasOwnProperty.call(g, O)) {
                                    var E = "".concat(j).concat(i).concat(O);
                                    S[O] = this.translate(E, Bt(Bt({}, t), {
                                        joinArrays: !1,
                                        ns: u
                                    })),
                                    S[O] === E && (S[O] = g[O])
                                }
                            g = S
                        }
                    } else if (x && "string" === typeof w && "[object Array]" === y)
                        (g = g.join(w)) && (g = this.extendTranslation(g, e, t, r));
                    else {
                        var P = !1
                          , N = !1
                          , L = void 0 !== t.count && "string" !== typeof t.count
                          , M = n.hasDefaultValue(t)
                          , T = L ? this.pluralResolver.getSuffix(d, t.count, t) : ""
                          , D = t["defaultValue".concat(T)] || t.defaultValue;
                        !this.isValidLookup(g) && M && (P = !0,
                        g = D),
                        this.isValidLookup(g) || (N = !0,
                        g = s);
                        var R = t.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey
                          , z = R && N ? void 0 : g
                          , I = M && D !== g && this.options.updateMissing;
                        if (N || P || I) {
                            if (this.logger.log(I ? "updateKey" : "missingKey", d, c, s, I ? D : g),
                            i) {
                                var A = this.resolve(s, Bt(Bt({}, t), {}, {
                                    keySeparator: !1
                                }));
                                A && A.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")
                            }
                            var F = []
                              , U = this.languageUtils.getFallbackCodes(this.options.fallbackLng, t.lng || this.language);
                            if ("fallback" === this.options.saveMissingTo && U && U[0])
                                for (var q = 0; q < U.length; q++)
                                    F.push(U[q]);
                            else
                                "all" === this.options.saveMissingTo ? F = this.languageUtils.toResolveHierarchy(t.lng || this.language) : F.push(t.lng || this.language);
                            var V = function(e, n, r) {
                                var o = M && r !== g ? r : z;
                                a.options.missingKeyHandler ? a.options.missingKeyHandler(e, c, n, o, I, t) : a.backendConnector && a.backendConnector.saveMissing && a.backendConnector.saveMissing(e, c, n, o, I, t),
                                a.emit("missingKey", e, c, n, g)
                            };
                            this.options.saveMissing && (this.options.saveMissingPlurals && L ? F.forEach((function(e) {
                                a.pluralResolver.getSuffixes(e, t).forEach((function(n) {
                                    V([e], s + n, t["defaultValue".concat(n)] || D)
                                }
                                ))
                            }
                            )) : V(F, s, D))
                        }
                        g = this.extendTranslation(g, e, t, h, r),
                        N && g === s && this.options.appendNamespaceToMissingKey && (g = "".concat(c, ":").concat(s)),
                        (N || P) && this.options.parseMissingKeyHandler && (g = "v1" !== this.options.compatibilityAPI ? this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? "".concat(c, ":").concat(s) : s, P ? g : void 0) : this.options.parseMissingKeyHandler(g))
                    }
                    return o ? (h.res = g,
                    h) : g
                }
            }, {
                key: "extendTranslation",
                value: function(e, t, n, r, a) {
                    var o = this;
                    if (this.i18nFormat && this.i18nFormat.parse)
                        e = this.i18nFormat.parse(e, Bt(Bt({}, this.options.interpolation.defaultVariables), n), r.usedLng, r.usedNS, r.usedKey, {
                            resolved: r
                        });
                    else if (!n.skipInterpolation) {
                        n.interpolation && this.interpolator.init(Bt(Bt({}, n), {
                            interpolation: Bt(Bt({}, this.options.interpolation), n.interpolation)
                        }));
                        var i, l = "string" === typeof e && (n && n.interpolation && void 0 !== n.interpolation.skipOnVariables ? n.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
                        if (l) {
                            var s = e.match(this.interpolator.nestingRegexp);
                            i = s && s.length
                        }
                        var u = n.replace && "string" !== typeof n.replace ? n.replace : n;
                        if (this.options.interpolation.defaultVariables && (u = Bt(Bt({}, this.options.interpolation.defaultVariables), u)),
                        e = this.interpolator.interpolate(e, u, n.lng || this.language, n),
                        l) {
                            var c = e.match(this.interpolator.nestingRegexp);
                            i < (c && c.length) && (n.nest = !1)
                        }
                        !1 !== n.nest && (e = this.interpolator.nest(e, (function() {
                            for (var e = arguments.length, r = new Array(e), i = 0; i < e; i++)
                                r[i] = arguments[i];
                            return a && a[0] === r[0] && !n.context ? (o.logger.warn("It seems you are nesting recursively key: ".concat(r[0], " in key: ").concat(t[0])),
                            null) : o.translate.apply(o, r.concat([t]))
                        }
                        ), n)),
                        n.interpolation && this.interpolator.reset()
                    }
                    var d = n.postProcess || this.options.postProcess
                      , f = "string" === typeof d ? [d] : d;
                    return void 0 !== e && null !== e && f && f.length && !1 !== n.applyPostProcessor && (e = Vt.handle(f, e, t, this.options && this.options.postProcessPassResolved ? Bt({
                        i18nResolved: r
                    }, n) : n, this)),
                    e
                }
            }, {
                key: "resolve",
                value: function(e) {
                    var t, n, r, a, o, i = this, l = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return "string" === typeof e && (e = [e]),
                    e.forEach((function(e) {
                        if (!i.isValidLookup(t)) {
                            var s = i.extractFromKey(e, l)
                              , u = s.key;
                            n = u;
                            var c = s.namespaces;
                            i.options.fallbackNS && (c = c.concat(i.options.fallbackNS));
                            var d = void 0 !== l.count && "string" !== typeof l.count
                              , f = d && !l.ordinal && 0 === l.count && i.pluralResolver.shouldUseIntlApi()
                              , p = void 0 !== l.context && ("string" === typeof l.context || "number" === typeof l.context) && "" !== l.context
                              , h = l.lngs ? l.lngs : i.languageUtils.toResolveHierarchy(l.lng || i.language, l.fallbackLng);
                            c.forEach((function(e) {
                                i.isValidLookup(t) || (o = e,
                                !Yt["".concat(h[0], "-").concat(e)] && i.utils && i.utils.hasLoadedNamespace && !i.utils.hasLoadedNamespace(o) && (Yt["".concat(h[0], "-").concat(e)] = !0,
                                i.logger.warn('key "'.concat(n, '" for languages "').concat(h.join(", "), '" won\'t get resolved as namespace "').concat(o, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),
                                h.forEach((function(n) {
                                    if (!i.isValidLookup(t)) {
                                        a = n;
                                        var o, s = [u];
                                        if (i.i18nFormat && i.i18nFormat.addLookupKeys)
                                            i.i18nFormat.addLookupKeys(s, u, n, e, l);
                                        else {
                                            var c;
                                            d && (c = i.pluralResolver.getSuffix(n, l.count, l));
                                            var h = "".concat(i.options.pluralSeparator, "zero");
                                            if (d && (s.push(u + c),
                                            f && s.push(u + h)),
                                            p) {
                                                var g = "".concat(u).concat(i.options.contextSeparator).concat(l.context);
                                                s.push(g),
                                                d && (s.push(g + c),
                                                f && s.push(g + h))
                                            }
                                        }
                                        for (; o = s.pop(); )
                                            i.isValidLookup(t) || (r = o,
                                            t = i.getResource(n, e, o, l))
                                    }
                                }
                                )))
                            }
                            ))
                        }
                    }
                    )),
                    {
                        res: t,
                        usedKey: n,
                        exactUsedKey: r,
                        usedLng: a,
                        usedNS: o
                    }
                }
            }, {
                key: "isValidLookup",
                value: function(e) {
                    return void 0 !== e && !(!this.options.returnNull && null === e) && !(!this.options.returnEmptyString && "" === e)
                }
            }, {
                key: "getResource",
                value: function(e, t, n) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(e, t, n, r) : this.resourceStore.getResource(e, t, n, r)
                }
            }], [{
                key: "hasDefaultValue",
                value: function(e) {
                    var t = "defaultValue";
                    for (var n in e)
                        if (Object.prototype.hasOwnProperty.call(e, n) && t === n.substring(0, t.length) && void 0 !== e[n])
                            return !0;
                    return !1
                }
            }]),
            n
        }(_t);
        function Gt(e) {
            return e.charAt(0).toUpperCase() + e.slice(1)
        }
        var Qt = function() {
            function e(t) {
                v(this, e),
                this.options = t,
                this.supportedLngs = this.options.supportedLngs || !1,
                this.logger = kt.create("languageUtils")
            }
            return b(e, [{
                key: "getScriptPartFromCode",
                value: function(e) {
                    if (!e || e.indexOf("-") < 0)
                        return null;
                    var t = e.split("-");
                    return 2 === t.length ? null : (t.pop(),
                    "x" === t[t.length - 1].toLowerCase() ? null : this.formatLanguageCode(t.join("-")))
                }
            }, {
                key: "getLanguagePartFromCode",
                value: function(e) {
                    if (!e || e.indexOf("-") < 0)
                        return e;
                    var t = e.split("-");
                    return this.formatLanguageCode(t[0])
                }
            }, {
                key: "formatLanguageCode",
                value: function(e) {
                    if ("string" === typeof e && e.indexOf("-") > -1) {
                        var t = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"]
                          , n = e.split("-");
                        return this.options.lowerCaseLng ? n = n.map((function(e) {
                            return e.toLowerCase()
                        }
                        )) : 2 === n.length ? (n[0] = n[0].toLowerCase(),
                        n[1] = n[1].toUpperCase(),
                        t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = Gt(n[1].toLowerCase()))) : 3 === n.length && (n[0] = n[0].toLowerCase(),
                        2 === n[1].length && (n[1] = n[1].toUpperCase()),
                        "sgn" !== n[0] && 2 === n[2].length && (n[2] = n[2].toUpperCase()),
                        t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = Gt(n[1].toLowerCase())),
                        t.indexOf(n[2].toLowerCase()) > -1 && (n[2] = Gt(n[2].toLowerCase()))),
                        n.join("-")
                    }
                    return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e
                }
            }, {
                key: "isSupportedCode",
                value: function(e) {
                    return ("languageOnly" === this.options.load || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)),
                    !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e) > -1
                }
            }, {
                key: "getBestMatchFromCodes",
                value: function(e) {
                    var t, n = this;
                    return e ? (e.forEach((function(e) {
                        if (!t) {
                            var r = n.formatLanguageCode(e);
                            n.options.supportedLngs && !n.isSupportedCode(r) || (t = r)
                        }
                    }
                    )),
                    !t && this.options.supportedLngs && e.forEach((function(e) {
                        if (!t) {
                            var r = n.getLanguagePartFromCode(e);
                            if (n.isSupportedCode(r))
                                return t = r;
                            t = n.options.supportedLngs.find((function(e) {
                                if (0 === e.indexOf(r))
                                    return e
                            }
                            ))
                        }
                    }
                    )),
                    t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]),
                    t) : null
                }
            }, {
                key: "getFallbackCodes",
                value: function(e, t) {
                    if (!e)
                        return [];
                    if ("function" === typeof e && (e = e(t)),
                    "string" === typeof e && (e = [e]),
                    "[object Array]" === Object.prototype.toString.apply(e))
                        return e;
                    if (!t)
                        return e.default || [];
                    var n = e[t];
                    return n || (n = e[this.getScriptPartFromCode(t)]),
                    n || (n = e[this.formatLanguageCode(t)]),
                    n || (n = e[this.getLanguagePartFromCode(t)]),
                    n || (n = e.default),
                    n || []
                }
            }, {
                key: "toResolveHierarchy",
                value: function(e, t) {
                    var n = this
                      , r = this.getFallbackCodes(t || this.options.fallbackLng || [], e)
                      , a = []
                      , o = function(e) {
                        e && (n.isSupportedCode(e) ? a.push(e) : n.logger.warn("rejecting language code not found in supportedLngs: ".concat(e)))
                    };
                    return "string" === typeof e && e.indexOf("-") > -1 ? ("languageOnly" !== this.options.load && o(this.formatLanguageCode(e)),
                    "languageOnly" !== this.options.load && "currentOnly" !== this.options.load && o(this.getScriptPartFromCode(e)),
                    "currentOnly" !== this.options.load && o(this.getLanguagePartFromCode(e))) : "string" === typeof e && o(this.formatLanguageCode(e)),
                    r.forEach((function(e) {
                        a.indexOf(e) < 0 && o(n.formatLanguageCode(e))
                    }
                    )),
                    a
                }
            }]),
            e
        }()
          , Kt = [{
            lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"],
            nr: [1, 2],
            fc: 1
        }, {
            lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kk", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
            nr: [1, 2],
            fc: 2
        }, {
            lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
            nr: [1],
            fc: 3
        }, {
            lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
            nr: [1, 2, 5],
            fc: 4
        }, {
            lngs: ["ar"],
            nr: [0, 1, 2, 3, 11, 100],
            fc: 5
        }, {
            lngs: ["cs", "sk"],
            nr: [1, 2, 5],
            fc: 6
        }, {
            lngs: ["csb", "pl"],
            nr: [1, 2, 5],
            fc: 7
        }, {
            lngs: ["cy"],
            nr: [1, 2, 3, 8],
            fc: 8
        }, {
            lngs: ["fr"],
            nr: [1, 2],
            fc: 9
        }, {
            lngs: ["ga"],
            nr: [1, 2, 3, 7, 11],
            fc: 10
        }, {
            lngs: ["gd"],
            nr: [1, 2, 3, 20],
            fc: 11
        }, {
            lngs: ["is"],
            nr: [1, 2],
            fc: 12
        }, {
            lngs: ["jv"],
            nr: [0, 1],
            fc: 13
        }, {
            lngs: ["kw"],
            nr: [1, 2, 3, 4],
            fc: 14
        }, {
            lngs: ["lt"],
            nr: [1, 2, 10],
            fc: 15
        }, {
            lngs: ["lv"],
            nr: [1, 2, 0],
            fc: 16
        }, {
            lngs: ["mk"],
            nr: [1, 2],
            fc: 17
        }, {
            lngs: ["mnk"],
            nr: [0, 1, 2],
            fc: 18
        }, {
            lngs: ["mt"],
            nr: [1, 2, 11, 20],
            fc: 19
        }, {
            lngs: ["or"],
            nr: [2, 1],
            fc: 2
        }, {
            lngs: ["ro"],
            nr: [1, 2, 20],
            fc: 20
        }, {
            lngs: ["sl"],
            nr: [5, 1, 2, 3],
            fc: 21
        }, {
            lngs: ["he", "iw"],
            nr: [1, 2, 20, 21],
            fc: 22
        }]
          , Jt = {
            1: function(e) {
                return Number(e > 1)
            },
            2: function(e) {
                return Number(1 != e)
            },
            3: function(e) {
                return 0
            },
            4: function(e) {
                return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2)
            },
            5: function(e) {
                return Number(0 == e ? 0 : 1 == e ? 1 : 2 == e ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5)
            },
            6: function(e) {
                return Number(1 == e ? 0 : e >= 2 && e <= 4 ? 1 : 2)
            },
            7: function(e) {
                return Number(1 == e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2)
            },
            8: function(e) {
                return Number(1 == e ? 0 : 2 == e ? 1 : 8 != e && 11 != e ? 2 : 3)
            },
            9: function(e) {
                return Number(e >= 2)
            },
            10: function(e) {
                return Number(1 == e ? 0 : 2 == e ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4)
            },
            11: function(e) {
                return Number(1 == e || 11 == e ? 0 : 2 == e || 12 == e ? 1 : e > 2 && e < 20 ? 2 : 3)
            },
            12: function(e) {
                return Number(e % 10 != 1 || e % 100 == 11)
            },
            13: function(e) {
                return Number(0 !== e)
            },
            14: function(e) {
                return Number(1 == e ? 0 : 2 == e ? 1 : 3 == e ? 2 : 3)
            },
            15: function(e) {
                return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2)
            },
            16: function(e) {
                return Number(e % 10 == 1 && e % 100 != 11 ? 0 : 0 !== e ? 1 : 2)
            },
            17: function(e) {
                return Number(1 == e || e % 10 == 1 && e % 100 != 11 ? 0 : 1)
            },
            18: function(e) {
                return Number(0 == e ? 0 : 1 == e ? 1 : 2)
            },
            19: function(e) {
                return Number(1 == e ? 0 : 0 == e || e % 100 > 1 && e % 100 < 11 ? 1 : e % 100 > 10 && e % 100 < 20 ? 2 : 3)
            },
            20: function(e) {
                return Number(1 == e ? 0 : 0 == e || e % 100 > 0 && e % 100 < 20 ? 1 : 2)
            },
            21: function(e) {
                return Number(e % 100 == 1 ? 1 : e % 100 == 2 ? 2 : e % 100 == 3 || e % 100 == 4 ? 3 : 0)
            },
            22: function(e) {
                return Number(1 == e ? 0 : 2 == e ? 1 : (e < 0 || e > 10) && e % 10 == 0 ? 2 : 3)
            }
        }
          , Zt = ["v1", "v2", "v3"]
          , Xt = {
            zero: 0,
            one: 1,
            two: 2,
            few: 3,
            many: 4,
            other: 5
        };
        function en() {
            var e = {};
            return Kt.forEach((function(t) {
                t.lngs.forEach((function(n) {
                    e[n] = {
                        numbers: t.nr,
                        plurals: Jt[t.fc]
                    }
                }
                ))
            }
            )),
            e
        }
        var tn = function() {
            function e(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                v(this, e),
                this.languageUtils = t,
                this.options = n,
                this.logger = kt.create("pluralResolver"),
                this.options.compatibilityJSON && "v4" !== this.options.compatibilityJSON || "undefined" !== typeof Intl && Intl.PluralRules || (this.options.compatibilityJSON = "v3",
                this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")),
                this.rules = en()
            }
            return b(e, [{
                key: "addRule",
                value: function(e, t) {
                    this.rules[e] = t
                }
            }, {
                key: "getRule",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (this.shouldUseIntlApi())
                        try {
                            return new Intl.PluralRules(e,{
                                type: t.ordinal ? "ordinal" : "cardinal"
                            })
                        } catch (n) {
                            return
                        }
                    return this.rules[e] || this.rules[this.languageUtils.getLanguagePartFromCode(e)]
                }
            }, {
                key: "needsPlural",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                      , n = this.getRule(e, t);
                    return this.shouldUseIntlApi() ? n && n.resolvedOptions().pluralCategories.length > 1 : n && n.numbers.length > 1
                }
            }, {
                key: "getPluralFormsOfKey",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return this.getSuffixes(e, n).map((function(e) {
                        return "".concat(t).concat(e)
                    }
                    ))
                }
            }, {
                key: "getSuffixes",
                value: function(e) {
                    var t = this
                      , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                      , r = this.getRule(e, n);
                    return r ? this.shouldUseIntlApi() ? r.resolvedOptions().pluralCategories.sort((function(e, t) {
                        return Xt[e] - Xt[t]
                    }
                    )).map((function(e) {
                        return "".concat(t.options.prepend).concat(e)
                    }
                    )) : r.numbers.map((function(r) {
                        return t.getSuffix(e, r, n)
                    }
                    )) : []
                }
            }, {
                key: "getSuffix",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                      , r = this.getRule(e, n);
                    return r ? this.shouldUseIntlApi() ? "".concat(this.options.prepend).concat(r.select(t)) : this.getSuffixRetroCompatible(r, t) : (this.logger.warn("no plural rule found for: ".concat(e)),
                    "")
                }
            }, {
                key: "getSuffixRetroCompatible",
                value: function(e, t) {
                    var n = this
                      , r = e.noAbs ? e.plurals(t) : e.plurals(Math.abs(t))
                      , a = e.numbers[r];
                    this.options.simplifyPluralSuffix && 2 === e.numbers.length && 1 === e.numbers[0] && (2 === a ? a = "plural" : 1 === a && (a = ""));
                    var o = function() {
                        return n.options.prepend && a.toString() ? n.options.prepend + a.toString() : a.toString()
                    };
                    return "v1" === this.options.compatibilityJSON ? 1 === a ? "" : "number" === typeof a ? "_plural_".concat(a.toString()) : o() : "v2" === this.options.compatibilityJSON || this.options.simplifyPluralSuffix && 2 === e.numbers.length && 1 === e.numbers[0] ? o() : this.options.prepend && r.toString() ? this.options.prepend + r.toString() : r.toString()
                }
            }, {
                key: "shouldUseIntlApi",
                value: function() {
                    return !Zt.includes(this.options.compatibilityJSON)
                }
            }]),
            e
        }();
        function nn(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function rn(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? nn(Object(n), !0).forEach((function(t) {
                    u(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : nn(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        var an = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                v(this, e),
                this.logger = kt.create("interpolator"),
                this.options = t,
                this.format = t.interpolation && t.interpolation.format || function(e) {
                    return e
                }
                ,
                this.init(t)
            }
            return b(e, [{
                key: "init",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    e.interpolation || (e.interpolation = {
                        escapeValue: !0
                    });
                    var t = e.interpolation;
                    this.escape = void 0 !== t.escape ? t.escape : Dt,
                    this.escapeValue = void 0 === t.escapeValue || t.escapeValue,
                    this.useRawValueToEscape = void 0 !== t.useRawValueToEscape && t.useRawValueToEscape,
                    this.prefix = t.prefix ? Mt(t.prefix) : t.prefixEscaped || "{{",
                    this.suffix = t.suffix ? Mt(t.suffix) : t.suffixEscaped || "}}",
                    this.formatSeparator = t.formatSeparator ? t.formatSeparator : t.formatSeparator || ",",
                    this.unescapePrefix = t.unescapeSuffix ? "" : t.unescapePrefix || "-",
                    this.unescapeSuffix = this.unescapePrefix ? "" : t.unescapeSuffix || "",
                    this.nestingPrefix = t.nestingPrefix ? Mt(t.nestingPrefix) : t.nestingPrefixEscaped || Mt("$t("),
                    this.nestingSuffix = t.nestingSuffix ? Mt(t.nestingSuffix) : t.nestingSuffixEscaped || Mt(")"),
                    this.nestingOptionsSeparator = t.nestingOptionsSeparator ? t.nestingOptionsSeparator : t.nestingOptionsSeparator || ",",
                    this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3,
                    this.alwaysFormat = void 0 !== t.alwaysFormat && t.alwaysFormat,
                    this.resetRegExp()
                }
            }, {
                key: "reset",
                value: function() {
                    this.options && this.init(this.options)
                }
            }, {
                key: "resetRegExp",
                value: function() {
                    var e = "".concat(this.prefix, "(.+?)").concat(this.suffix);
                    this.regexp = new RegExp(e,"g");
                    var t = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
                    this.regexpUnescape = new RegExp(t,"g");
                    var n = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
                    this.nestingRegexp = new RegExp(n,"g")
                }
            }, {
                key: "interpolate",
                value: function(e, t, n, r) {
                    var a, o, i, l = this, s = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
                    function u(e) {
                        return e.replace(/\$/g, "$$$$")
                    }
                    var c = function(e) {
                        if (e.indexOf(l.formatSeparator) < 0) {
                            var a = Nt(t, s, e);
                            return l.alwaysFormat ? l.format(a, void 0, n, rn(rn(rn({}, r), t), {}, {
                                interpolationkey: e
                            })) : a
                        }
                        var o = e.split(l.formatSeparator)
                          , i = o.shift().trim()
                          , u = o.join(l.formatSeparator).trim();
                        return l.format(Nt(t, s, i), u, n, rn(rn(rn({}, r), t), {}, {
                            interpolationkey: i
                        }))
                    };
                    this.resetRegExp();
                    var d = r && r.missingInterpolationHandler || this.options.missingInterpolationHandler
                      , f = r && r.interpolation && void 0 !== r.interpolation.skipOnVariables ? r.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
                    return [{
                        regex: this.regexpUnescape,
                        safeValue: function(e) {
                            return u(e)
                        }
                    }, {
                        regex: this.regexp,
                        safeValue: function(e) {
                            return l.escapeValue ? u(l.escape(e)) : u(e)
                        }
                    }].forEach((function(t) {
                        for (i = 0; a = t.regex.exec(e); ) {
                            var n = a[1].trim();
                            if (void 0 === (o = c(n)))
                                if ("function" === typeof d) {
                                    var s = d(e, a, r);
                                    o = "string" === typeof s ? s : ""
                                } else if (r && r.hasOwnProperty(n))
                                    o = "";
                                else {
                                    if (f) {
                                        o = a[0];
                                        continue
                                    }
                                    l.logger.warn("missed to pass in variable ".concat(n, " for interpolating ").concat(e)),
                                    o = ""
                                }
                            else
                                "string" === typeof o || l.useRawValueToEscape || (o = St(o));
                            var u = t.safeValue(o);
                            if (e = e.replace(a[0], u),
                            f ? (t.regex.lastIndex += o.length,
                            t.regex.lastIndex -= a[0].length) : t.regex.lastIndex = 0,
                            ++i >= l.maxReplaces)
                                break
                        }
                    }
                    )),
                    e
                }
            }, {
                key: "nest",
                value: function(e, t) {
                    var n, r, a = this, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i = rn({}, o);
                    function l(e, t) {
                        var n = this.nestingOptionsSeparator;
                        if (e.indexOf(n) < 0)
                            return e;
                        var r = e.split(new RegExp("".concat(n, "[ ]*{")))
                          , a = "{".concat(r[1]);
                        e = r[0],
                        a = (a = this.interpolate(a, i)).replace(/'/g, '"');
                        try {
                            i = JSON.parse(a),
                            t && (i = rn(rn({}, t), i))
                        } catch (o) {
                            return this.logger.warn("failed parsing options string in nesting for key ".concat(e), o),
                            "".concat(e).concat(n).concat(a)
                        }
                        return delete i.defaultValue,
                        e
                    }
                    for (i.applyPostProcessor = !1,
                    delete i.defaultValue; n = this.nestingRegexp.exec(e); ) {
                        var s = []
                          , u = !1;
                        if (-1 !== n[0].indexOf(this.formatSeparator) && !/{.*}/.test(n[1])) {
                            var c = n[1].split(this.formatSeparator).map((function(e) {
                                return e.trim()
                            }
                            ));
                            n[1] = c.shift(),
                            s = c,
                            u = !0
                        }
                        if ((r = t(l.call(this, n[1].trim(), i), i)) && n[0] === e && "string" !== typeof r)
                            return r;
                        "string" !== typeof r && (r = St(r)),
                        r || (this.logger.warn("missed to resolve ".concat(n[1], " for nesting ").concat(e)),
                        r = ""),
                        u && (r = s.reduce((function(e, t) {
                            return a.format(e, t, o.lng, rn(rn({}, o), {}, {
                                interpolationkey: n[1].trim()
                            }))
                        }
                        ), r.trim())),
                        e = e.replace(n[0], r),
                        this.regexp.lastIndex = 0
                    }
                    return e
                }
            }]),
            e
        }();
        function on(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function ln(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? on(Object(n), !0).forEach((function(t) {
                    u(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : on(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        function sn(e) {
            var t = e.toLowerCase().trim()
              , n = {};
            if (e.indexOf("(") > -1) {
                var r = e.split("(");
                t = r[0].toLowerCase().trim();
                var i = r[1].substring(0, r[1].length - 1);
                if ("currency" === t && i.indexOf(":") < 0)
                    n.currency || (n.currency = i.trim());
                else if ("relativetime" === t && i.indexOf(":") < 0)
                    n.range || (n.range = i.trim());
                else {
                    i.split(";").forEach((function(e) {
                        if (e) {
                            var t, r = e.split(":"), i = f(t = r) || a(t) || o(t) || p(), l = i[0], s = i.slice(1).join(":").trim().replace(/^'+|'+$/g, "");
                            n[l.trim()] || (n[l.trim()] = s),
                            "false" === s && (n[l.trim()] = !1),
                            "true" === s && (n[l.trim()] = !0),
                            isNaN(s) || (n[l.trim()] = parseInt(s, 10))
                        }
                    }
                    ))
                }
            }
            return {
                formatName: t,
                formatOptions: n
            }
        }
        var un = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                v(this, e),
                this.logger = kt.create("formatter"),
                this.options = t,
                this.formats = {
                    number: function(e, t, n) {
                        return new Intl.NumberFormat(t,n).format(e)
                    },
                    currency: function(e, t, n) {
                        return new Intl.NumberFormat(t,ln(ln({}, n), {}, {
                            style: "currency"
                        })).format(e)
                    },
                    datetime: function(e, t, n) {
                        return new Intl.DateTimeFormat(t,ln({}, n)).format(e)
                    },
                    relativetime: function(e, t, n) {
                        return new Intl.RelativeTimeFormat(t,ln({}, n)).format(e, n.range || "day")
                    },
                    list: function(e, t, n) {
                        return new Intl.ListFormat(t,ln({}, n)).format(e)
                    }
                },
                this.init(t)
            }
            return b(e, [{
                key: "init",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                        interpolation: {}
                    }
                      , n = t.interpolation;
                    this.formatSeparator = n.formatSeparator ? n.formatSeparator : n.formatSeparator || ","
                }
            }, {
                key: "add",
                value: function(e, t) {
                    this.formats[e.toLowerCase().trim()] = t
                }
            }, {
                key: "format",
                value: function(e, t, n, r) {
                    var a = this
                      , o = t.split(this.formatSeparator).reduce((function(e, t) {
                        var o = sn(t)
                          , i = o.formatName
                          , l = o.formatOptions;
                        if (a.formats[i]) {
                            var s = e;
                            try {
                                var u = r && r.formatParams && r.formatParams[r.interpolationkey] || {}
                                  , c = u.locale || u.lng || r.locale || r.lng || n;
                                s = a.formats[i](e, c, ln(ln(ln({}, l), r), u))
                            } catch (d) {
                                a.logger.warn(d)
                            }
                            return s
                        }
                        return a.logger.warn("there was no format function for ".concat(i)),
                        e
                    }
                    ), e);
                    return o
                }
            }]),
            e
        }();
        function cn(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function dn(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? cn(Object(n), !0).forEach((function(t) {
                    u(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : cn(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        function fn(e) {
            var t = function() {
                if ("undefined" === typeof Reflect || !Reflect.construct)
                    return !1;
                if (Reflect.construct.sham)
                    return !1;
                if ("function" === typeof Proxy)
                    return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                    ))),
                    !0
                } catch (e) {
                    return !1
                }
            }();
            return function() {
                var n, r = vt(e);
                if (t) {
                    var a = vt(this).constructor;
                    n = Reflect.construct(r, arguments, a)
                } else
                    n = r.apply(this, arguments);
                return mt(this, n)
            }
        }
        var pn = function(e) {
            gt(n, e);
            var t = fn(n);
            function n(e, r, a) {
                var o, i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                return v(this, n),
                o = t.call(this),
                Rt && _t.call(pt(o)),
                o.backend = e,
                o.store = r,
                o.services = a,
                o.languageUtils = a.languageUtils,
                o.options = i,
                o.logger = kt.create("backendConnector"),
                o.waitingReads = [],
                o.maxParallelReads = i.maxParallelReads || 10,
                o.readingCalls = 0,
                o.maxRetries = i.maxRetries >= 0 ? i.maxRetries : 5,
                o.retryTimeout = i.retryTimeout >= 1 ? i.retryTimeout : 350,
                o.state = {},
                o.queue = [],
                o.backend && o.backend.init && o.backend.init(a, i.backend, i),
                o
            }
            return b(n, [{
                key: "queueLoad",
                value: function(e, t, n, r) {
                    var a = this
                      , o = {}
                      , i = {}
                      , l = {}
                      , s = {};
                    return e.forEach((function(e) {
                        var r = !0;
                        t.forEach((function(t) {
                            var l = "".concat(e, "|").concat(t);
                            !n.reload && a.store.hasResourceBundle(e, t) ? a.state[l] = 2 : a.state[l] < 0 || (1 === a.state[l] ? void 0 === i[l] && (i[l] = !0) : (a.state[l] = 1,
                            r = !1,
                            void 0 === i[l] && (i[l] = !0),
                            void 0 === o[l] && (o[l] = !0),
                            void 0 === s[t] && (s[t] = !0)))
                        }
                        )),
                        r || (l[e] = !0)
                    }
                    )),
                    (Object.keys(o).length || Object.keys(i).length) && this.queue.push({
                        pending: i,
                        pendingCount: Object.keys(i).length,
                        loaded: {},
                        errors: [],
                        callback: r
                    }),
                    {
                        toLoad: Object.keys(o),
                        pending: Object.keys(i),
                        toLoadLanguages: Object.keys(l),
                        toLoadNamespaces: Object.keys(s)
                    }
                }
            }, {
                key: "loaded",
                value: function(e, t, n) {
                    var r = e.split("|")
                      , a = r[0]
                      , o = r[1];
                    t && this.emit("failedLoading", a, o, t),
                    n && this.store.addResourceBundle(a, o, n),
                    this.state[e] = t ? -1 : 2;
                    var i = {};
                    this.queue.forEach((function(n) {
                        !function(e, t, n, r) {
                            var a = Ot(e, t, Object)
                              , o = a.obj
                              , i = a.k;
                            o[i] = o[i] || [],
                            r && (o[i] = o[i].concat(n)),
                            r || o[i].push(n)
                        }(n.loaded, [a], o),
                        function(e, t) {
                            void 0 !== e.pending[t] && (delete e.pending[t],
                            e.pendingCount--)
                        }(n, e),
                        t && n.errors.push(t),
                        0 !== n.pendingCount || n.done || (Object.keys(n.loaded).forEach((function(e) {
                            i[e] || (i[e] = {});
                            var t = n.loaded[e];
                            t.length && t.forEach((function(t) {
                                void 0 === i[e][t] && (i[e][t] = !0)
                            }
                            ))
                        }
                        )),
                        n.done = !0,
                        n.errors.length ? n.callback(n.errors) : n.callback())
                    }
                    )),
                    this.emit("loaded", i),
                    this.queue = this.queue.filter((function(e) {
                        return !e.done
                    }
                    ))
                }
            }, {
                key: "read",
                value: function(e, t, n) {
                    var r = this
                      , a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0
                      , o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : this.retryTimeout
                      , i = arguments.length > 5 ? arguments[5] : void 0;
                    return e.length ? this.readingCalls >= this.maxParallelReads ? void this.waitingReads.push({
                        lng: e,
                        ns: t,
                        fcName: n,
                        tried: a,
                        wait: o,
                        callback: i
                    }) : (this.readingCalls++,
                    this.backend[n](e, t, (function(l, s) {
                        if (r.readingCalls--,
                        r.waitingReads.length > 0) {
                            var u = r.waitingReads.shift();
                            r.read(u.lng, u.ns, u.fcName, u.tried, u.wait, u.callback)
                        }
                        l && s && a < r.maxRetries ? setTimeout((function() {
                            r.read.call(r, e, t, n, a + 1, 2 * o, i)
                        }
                        ), o) : i(l, s)
                    }
                    ))) : i(null, {})
                }
            }, {
                key: "prepareLoading",
                value: function(e, t) {
                    var n = this
                      , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                      , a = arguments.length > 3 ? arguments[3] : void 0;
                    if (!this.backend)
                        return this.logger.warn("No backend was added via i18next.use. Will not load resources."),
                        a && a();
                    "string" === typeof e && (e = this.languageUtils.toResolveHierarchy(e)),
                    "string" === typeof t && (t = [t]);
                    var o = this.queueLoad(e, t, r, a);
                    if (!o.toLoad.length)
                        return o.pending.length || a(),
                        null;
                    o.toLoad.forEach((function(e) {
                        n.loadOne(e)
                    }
                    ))
                }
            }, {
                key: "load",
                value: function(e, t, n) {
                    this.prepareLoading(e, t, {}, n)
                }
            }, {
                key: "reload",
                value: function(e, t, n) {
                    this.prepareLoading(e, t, {
                        reload: !0
                    }, n)
                }
            }, {
                key: "loadOne",
                value: function(e) {
                    var t = this
                      , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""
                      , r = e.split("|")
                      , a = r[0]
                      , o = r[1];
                    this.read(a, o, "read", void 0, void 0, (function(r, i) {
                        r && t.logger.warn("".concat(n, "loading namespace ").concat(o, " for language ").concat(a, " failed"), r),
                        !r && i && t.logger.log("".concat(n, "loaded namespace ").concat(o, " for language ").concat(a), i),
                        t.loaded(e, r, i)
                    }
                    ))
                }
            }, {
                key: "saveMissing",
                value: function(e, t, n, r, a) {
                    var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
                    this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(t) ? this.logger.warn('did not save key "'.concat(n, '" as the namespace "').concat(t, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!") : void 0 !== n && null !== n && "" !== n && (this.backend && this.backend.create && this.backend.create(e, t, n, r, null, dn(dn({}, o), {}, {
                        isUpdate: a
                    })),
                    e && e[0] && this.store.addResource(e[0], t, n, r))
                }
            }]),
            n
        }(_t);
        function hn() {
            return {
                debug: !1,
                initImmediate: !0,
                ns: ["translation"],
                defaultNS: ["translation"],
                fallbackLng: ["dev"],
                fallbackNS: !1,
                supportedLngs: !1,
                nonExplicitSupportedLngs: !1,
                load: "all",
                preload: !1,
                simplifyPluralSuffix: !0,
                keySeparator: ".",
                nsSeparator: ":",
                pluralSeparator: "_",
                contextSeparator: "_",
                partialBundledLanguages: !1,
                saveMissing: !1,
                updateMissing: !1,
                saveMissingTo: "fallback",
                saveMissingPlurals: !0,
                missingKeyHandler: !1,
                missingInterpolationHandler: !1,
                postProcess: !1,
                postProcessPassResolved: !1,
                returnNull: !0,
                returnEmptyString: !0,
                returnObjects: !1,
                joinArrays: !1,
                returnedObjectHandler: !1,
                parseMissingKeyHandler: !1,
                appendNamespaceToMissingKey: !1,
                appendNamespaceToCIMode: !1,
                overloadTranslationOptionHandler: function(e) {
                    var t = {};
                    if ("object" === ft(e[1]) && (t = e[1]),
                    "string" === typeof e[1] && (t.defaultValue = e[1]),
                    "string" === typeof e[2] && (t.tDescription = e[2]),
                    "object" === ft(e[2]) || "object" === ft(e[3])) {
                        var n = e[3] || e[2];
                        Object.keys(n).forEach((function(e) {
                            t[e] = n[e]
                        }
                        ))
                    }
                    return t
                },
                interpolation: {
                    escapeValue: !0,
                    format: function(e, t, n, r) {
                        return e
                    },
                    prefix: "{{",
                    suffix: "}}",
                    formatSeparator: ",",
                    unescapePrefix: "-",
                    nestingPrefix: "$t(",
                    nestingSuffix: ")",
                    nestingOptionsSeparator: ",",
                    maxReplaces: 1e3,
                    skipOnVariables: !0
                }
            }
        }
        function gn(e) {
            return "string" === typeof e.ns && (e.ns = [e.ns]),
            "string" === typeof e.fallbackLng && (e.fallbackLng = [e.fallbackLng]),
            "string" === typeof e.fallbackNS && (e.fallbackNS = [e.fallbackNS]),
            e.supportedLngs && e.supportedLngs.indexOf("cimode") < 0 && (e.supportedLngs = e.supportedLngs.concat(["cimode"])),
            e
        }
        function mn(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function vn(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? mn(Object(n), !0).forEach((function(t) {
                    u(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : mn(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        function yn(e) {
            var t = function() {
                if ("undefined" === typeof Reflect || !Reflect.construct)
                    return !1;
                if (Reflect.construct.sham)
                    return !1;
                if ("function" === typeof Proxy)
                    return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                    ))),
                    !0
                } catch (e) {
                    return !1
                }
            }();
            return function() {
                var n, r = vt(e);
                if (t) {
                    var a = vt(this).constructor;
                    n = Reflect.construct(r, arguments, a)
                } else
                    n = r.apply(this, arguments);
                return mt(this, n)
            }
        }
        function bn() {}
        function wn(e) {
            Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((function(t) {
                "function" === typeof e[t] && (e[t] = e[t].bind(e))
            }
            ))
        }
        var xn = function(e) {
            gt(n, e);
            var t = yn(n);
            function n() {
                var e, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = arguments.length > 1 ? arguments[1] : void 0;
                if (v(this, n),
                e = t.call(this),
                Rt && _t.call(pt(e)),
                e.options = gn(r),
                e.services = {},
                e.logger = kt,
                e.modules = {
                    external: []
                },
                wn(pt(e)),
                a && !e.isInitialized && !r.isClone) {
                    if (!e.options.initImmediate)
                        return e.init(r, a),
                        mt(e, pt(e));
                    setTimeout((function() {
                        e.init(r, a)
                    }
                    ), 0)
                }
                return e
            }
            return b(n, [{
                key: "init",
                value: function() {
                    var e = this
                      , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                      , n = arguments.length > 1 ? arguments[1] : void 0;
                    "function" === typeof t && (n = t,
                    t = {}),
                    !t.defaultNS && !1 !== t.defaultNS && t.ns && ("string" === typeof t.ns ? t.defaultNS = t.ns : t.ns.indexOf("translation") < 0 && (t.defaultNS = t.ns[0]));
                    var r = hn();
                    function a(e) {
                        return e ? "function" === typeof e ? new e : e : null
                    }
                    if (this.options = vn(vn(vn({}, r), this.options), gn(t)),
                    "v1" !== this.options.compatibilityAPI && (this.options.interpolation = vn(vn({}, r.interpolation), this.options.interpolation)),
                    void 0 !== t.keySeparator && (this.options.userDefinedKeySeparator = t.keySeparator),
                    void 0 !== t.nsSeparator && (this.options.userDefinedNsSeparator = t.nsSeparator),
                    !this.options.isClone) {
                        var o;
                        this.modules.logger ? kt.init(a(this.modules.logger), this.options) : kt.init(null, this.options),
                        this.modules.formatter ? o = this.modules.formatter : "undefined" !== typeof Intl && (o = un);
                        var i = new Qt(this.options);
                        this.store = new qt(this.options.resources,this.options);
                        var l = this.services;
                        l.logger = kt,
                        l.resourceStore = this.store,
                        l.languageUtils = i,
                        l.pluralResolver = new tn(i,{
                            prepend: this.options.pluralSeparator,
                            compatibilityJSON: this.options.compatibilityJSON,
                            simplifyPluralSuffix: this.options.simplifyPluralSuffix
                        }),
                        !o || this.options.interpolation.format && this.options.interpolation.format !== r.interpolation.format || (l.formatter = a(o),
                        l.formatter.init(l, this.options),
                        this.options.interpolation.format = l.formatter.format.bind(l.formatter)),
                        l.interpolator = new an(this.options),
                        l.utils = {
                            hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
                        },
                        l.backendConnector = new pn(a(this.modules.backend),l.resourceStore,l,this.options),
                        l.backendConnector.on("*", (function(t) {
                            for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++)
                                r[a - 1] = arguments[a];
                            e.emit.apply(e, [t].concat(r))
                        }
                        )),
                        this.modules.languageDetector && (l.languageDetector = a(this.modules.languageDetector),
                        l.languageDetector.init(l, this.options.detection, this.options)),
                        this.modules.i18nFormat && (l.i18nFormat = a(this.modules.i18nFormat),
                        l.i18nFormat.init && l.i18nFormat.init(this)),
                        this.translator = new Wt(this.services,this.options),
                        this.translator.on("*", (function(t) {
                            for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++)
                                r[a - 1] = arguments[a];
                            e.emit.apply(e, [t].concat(r))
                        }
                        )),
                        this.modules.external.forEach((function(t) {
                            t.init && t.init(e)
                        }
                        ))
                    }
                    if (this.format = this.options.interpolation.format,
                    n || (n = bn),
                    this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
                        var s = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
                        s.length > 0 && "dev" !== s[0] && (this.options.lng = s[0])
                    }
                    this.services.languageDetector || this.options.lng || this.logger.warn("init: no languageDetector is used and no lng is defined");
                    var u = ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"];
                    u.forEach((function(t) {
                        e[t] = function() {
                            var n;
                            return (n = e.store)[t].apply(n, arguments)
                        }
                    }
                    ));
                    var c = ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"];
                    c.forEach((function(t) {
                        e[t] = function() {
                            var n;
                            return (n = e.store)[t].apply(n, arguments),
                            e
                        }
                    }
                    ));
                    var d = Ct()
                      , f = function() {
                        var t = function(t, r) {
                            e.isInitialized && !e.initializedStoreOnce && e.logger.warn("init: i18next is already initialized. You should call init just once!"),
                            e.isInitialized = !0,
                            e.options.isClone || e.logger.log("initialized", e.options),
                            e.emit("initialized", e.options),
                            d.resolve(r),
                            n(t, r)
                        };
                        if (e.languages && "v1" !== e.options.compatibilityAPI && !e.isInitialized)
                            return t(null, e.t.bind(e));
                        e.changeLanguage(e.options.lng, t)
                    };
                    return this.options.resources || !this.options.initImmediate ? f() : setTimeout(f, 0),
                    d
                }
            }, {
                key: "loadResources",
                value: function(e) {
                    var t = this
                      , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : bn
                      , r = n
                      , a = "string" === typeof e ? e : this.language;
                    if ("function" === typeof e && (r = e),
                    !this.options.resources || this.options.partialBundledLanguages) {
                        if (a && "cimode" === a.toLowerCase())
                            return r();
                        var o = []
                          , i = function(e) {
                            e && t.services.languageUtils.toResolveHierarchy(e).forEach((function(e) {
                                o.indexOf(e) < 0 && o.push(e)
                            }
                            ))
                        };
                        if (a)
                            i(a);
                        else {
                            var l = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
                            l.forEach((function(e) {
                                return i(e)
                            }
                            ))
                        }
                        this.options.preload && this.options.preload.forEach((function(e) {
                            return i(e)
                        }
                        )),
                        this.services.backendConnector.load(o, this.options.ns, (function(e) {
                            e || t.resolvedLanguage || !t.language || t.setResolvedLanguage(t.language),
                            r(e)
                        }
                        ))
                    } else
                        r(null)
                }
            }, {
                key: "reloadResources",
                value: function(e, t, n) {
                    var r = Ct();
                    return e || (e = this.languages),
                    t || (t = this.options.ns),
                    n || (n = bn),
                    this.services.backendConnector.reload(e, t, (function(e) {
                        r.resolve(),
                        n(e)
                    }
                    )),
                    r
                }
            }, {
                key: "use",
                value: function(e) {
                    if (!e)
                        throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
                    if (!e.type)
                        throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
                    return "backend" === e.type && (this.modules.backend = e),
                    ("logger" === e.type || e.log && e.warn && e.error) && (this.modules.logger = e),
                    "languageDetector" === e.type && (this.modules.languageDetector = e),
                    "i18nFormat" === e.type && (this.modules.i18nFormat = e),
                    "postProcessor" === e.type && Vt.addPostProcessor(e),
                    "formatter" === e.type && (this.modules.formatter = e),
                    "3rdParty" === e.type && this.modules.external.push(e),
                    this
                }
            }, {
                key: "setResolvedLanguage",
                value: function(e) {
                    if (e && this.languages && !(["cimode", "dev"].indexOf(e) > -1))
                        for (var t = 0; t < this.languages.length; t++) {
                            var n = this.languages[t];
                            if (!(["cimode", "dev"].indexOf(n) > -1) && this.store.hasLanguageSomeTranslations(n)) {
                                this.resolvedLanguage = n;
                                break
                            }
                        }
                }
            }, {
                key: "changeLanguage",
                value: function(e, t) {
                    var n = this;
                    this.isLanguageChangingTo = e;
                    var r = Ct();
                    this.emit("languageChanging", e);
                    var a = function(e) {
                        n.language = e,
                        n.languages = n.services.languageUtils.toResolveHierarchy(e),
                        n.resolvedLanguage = void 0,
                        n.setResolvedLanguage(e)
                    }
                      , o = function(o) {
                        e || o || !n.services.languageDetector || (o = []);
                        var i = "string" === typeof o ? o : n.services.languageUtils.getBestMatchFromCodes(o);
                        i && (n.language || a(i),
                        n.translator.language || n.translator.changeLanguage(i),
                        n.services.languageDetector && n.services.languageDetector.cacheUserLanguage(i)),
                        n.loadResources(i, (function(e) {
                            !function(e, o) {
                                o ? (a(o),
                                n.translator.changeLanguage(o),
                                n.isLanguageChangingTo = void 0,
                                n.emit("languageChanged", o),
                                n.logger.log("languageChanged", o)) : n.isLanguageChangingTo = void 0,
                                r.resolve((function() {
                                    return n.t.apply(n, arguments)
                                }
                                )),
                                t && t(e, (function() {
                                    return n.t.apply(n, arguments)
                                }
                                ))
                            }(e, i)
                        }
                        ))
                    };
                    return e || !this.services.languageDetector || this.services.languageDetector.async ? !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect(o) : o(e) : o(this.services.languageDetector.detect()),
                    r
                }
            }, {
                key: "getFixedT",
                value: function(e, t, n) {
                    var r = this
                      , a = function e(t, a) {
                        var o;
                        if ("object" !== ft(a)) {
                            for (var i = arguments.length, l = new Array(i > 2 ? i - 2 : 0), s = 2; s < i; s++)
                                l[s - 2] = arguments[s];
                            o = r.options.overloadTranslationOptionHandler([t, a].concat(l))
                        } else
                            o = vn({}, a);
                        o.lng = o.lng || e.lng,
                        o.lngs = o.lngs || e.lngs,
                        o.ns = o.ns || e.ns,
                        o.keyPrefix = o.keyPrefix || n || e.keyPrefix;
                        var u = r.options.keySeparator || "."
                          , c = o.keyPrefix ? "".concat(o.keyPrefix).concat(u).concat(t) : t;
                        return r.t(c, o)
                    };
                    return "string" === typeof e ? a.lng = e : a.lngs = e,
                    a.ns = t,
                    a.keyPrefix = n,
                    a
                }
            }, {
                key: "t",
                value: function() {
                    var e;
                    return this.translator && (e = this.translator).translate.apply(e, arguments)
                }
            }, {
                key: "exists",
                value: function() {
                    var e;
                    return this.translator && (e = this.translator).exists.apply(e, arguments)
                }
            }, {
                key: "setDefaultNamespace",
                value: function(e) {
                    this.options.defaultNS = e
                }
            }, {
                key: "hasLoadedNamespace",
                value: function(e) {
                    var t = this
                      , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (!this.isInitialized)
                        return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages),
                        !1;
                    if (!this.languages || !this.languages.length)
                        return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages),
                        !1;
                    var r = this.resolvedLanguage || this.languages[0]
                      , a = !!this.options && this.options.fallbackLng
                      , o = this.languages[this.languages.length - 1];
                    if ("cimode" === r.toLowerCase())
                        return !0;
                    var i = function(e, n) {
                        var r = t.services.backendConnector.state["".concat(e, "|").concat(n)];
                        return -1 === r || 2 === r
                    };
                    if (n.precheck) {
                        var l = n.precheck(this, i);
                        if (void 0 !== l)
                            return l
                    }
                    return !!this.hasResourceBundle(r, e) || (!(this.services.backendConnector.backend && (!this.options.resources || this.options.partialBundledLanguages)) || !(!i(r, e) || a && !i(o, e)))
                }
            }, {
                key: "loadNamespaces",
                value: function(e, t) {
                    var n = this
                      , r = Ct();
                    return this.options.ns ? ("string" === typeof e && (e = [e]),
                    e.forEach((function(e) {
                        n.options.ns.indexOf(e) < 0 && n.options.ns.push(e)
                    }
                    )),
                    this.loadResources((function(e) {
                        r.resolve(),
                        t && t(e)
                    }
                    )),
                    r) : (t && t(),
                    Promise.resolve())
                }
            }, {
                key: "loadLanguages",
                value: function(e, t) {
                    var n = Ct();
                    "string" === typeof e && (e = [e]);
                    var r = this.options.preload || []
                      , a = e.filter((function(e) {
                        return r.indexOf(e) < 0
                    }
                    ));
                    return a.length ? (this.options.preload = r.concat(a),
                    this.loadResources((function(e) {
                        n.resolve(),
                        t && t(e)
                    }
                    )),
                    n) : (t && t(),
                    Promise.resolve())
                }
            }, {
                key: "dir",
                value: function(e) {
                    if (e || (e = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)),
                    !e)
                        return "rtl";
                    return ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"].indexOf(this.services.languageUtils.getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr"
                }
            }, {
                key: "cloneInstance",
                value: function() {
                    var e = this
                      , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                      , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : bn
                      , a = vn(vn(vn({}, this.options), t), {
                        isClone: !0
                    })
                      , o = new n(a)
                      , i = ["store", "services", "language"];
                    return i.forEach((function(t) {
                        o[t] = e[t]
                    }
                    )),
                    o.services = vn({}, this.services),
                    o.services.utils = {
                        hasLoadedNamespace: o.hasLoadedNamespace.bind(o)
                    },
                    o.translator = new Wt(o.services,o.options),
                    o.translator.on("*", (function(e) {
                        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
                            n[r - 1] = arguments[r];
                        o.emit.apply(o, [e].concat(n))
                    }
                    )),
                    o.init(a, r),
                    o.translator.options = o.options,
                    o.translator.backendConnector.services.utils = {
                        hasLoadedNamespace: o.hasLoadedNamespace.bind(o)
                    },
                    o
                }
            }, {
                key: "toJSON",
                value: function() {
                    return {
                        options: this.options,
                        store: this.store,
                        language: this.language,
                        languages: this.languages,
                        resolvedLanguage: this.resolvedLanguage
                    }
                }
            }]),
            n
        }(_t);
        u(xn, "createInstance", (function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , t = arguments.length > 1 ? arguments[1] : void 0;
            return new xn(e,t)
        }
        ));
        var kn = xn.createInstance();
        kn.createInstance = xn.createInstance;
        kn.createInstance,
        kn.init,
        kn.loadResources,
        kn.reloadResources,
        kn.use,
        kn.changeLanguage,
        kn.getFixedT,
        kn.t,
        kn.exists,
        kn.setDefaultNamespace,
        kn.hasLoadedNamespace,
        kn.loadNamespaces,
        kn.loadLanguages;
        kn.use(L).init({
            resources: {
                en: {
                    translation: {
                        privacyPolicy: "privacy policy",
                        privacyPolicyLink: "/privacy.html",
                        cookieDialog: {
                            p1: "Predicto uses cookies according to our",
                            p2: "By continuing to play, you agree with it."
                        },
                        "How to play": "How to play",
                        Tip: "Hint",
                        "Give up": "Give up",
                        "Previous games": "Previous games",
                        "Closest words": "Closest words",
                        game: "Game",
                        attempts: "Guesses",
                        tips: "hints",
                        inputPlacehoder: "type a word",
                        loading: "Loading...",
                        oops: "Oops... there was an error!",
                        onlyOneWord: "Type just one word",
                        howToPlayText: {
                            p1: "Find the secret word. You have unlimited guesses.",
                            p2: "The words were sorted by an artificial intelligence algorithm according to how similar they were to the secret word.",
                            p3: "After submitting a word, you will see its position. The secret word is number 1.",
                            p4: "The algorithm analyzed thousands of texts. It uses the context in which words are used to calculate the similarity between them."
                        },
                        giveUpModalText: "Are you sure you want to give up?",
                        Yes: "Yes",
                        No: "No",
                        previousModalText: "Select a previous game to play:",
                        "Got it": "Got it",
                        "Gave up": "Gave up",
                        "In progress": "In progress",
                        closestModal: {
                            p1a: "Today's word",
                            p1b: "was:",
                            p2: "These were the {{number}} closest words:"
                        },
                        settingsModal: {
                            tips: "hints",
                            easy: "Easy",
                            easyExplanation: "The hint's position will be half the position of your closest word",
                            medium: "Medium",
                            mediumExplanation: "The hint's position will be one less than your closest word",
                            hard: "Hard",
                            hardExplanation: "The hint's position will be random",
                            theme: "Theme",
                            light: "Light",
                            dark: "Dark",
                            order: "Sort by",
                            similarity: "Similarity",
                            guess: "Guess order",
                            other: "Other",
                            hideCountdown: "Hide countdown to next word"
                        },
                        infoModal: {
                            p1: "A game by",
                            p2a: "Inspired by",
                            p2b: ".",
                            p3: "The data used to calculate the proximity between words come from",
                            sourceName: "Stanford's NLP Group",
                            sourceLink: "https://nlp.stanford.edu/projects/glove/",
                            p4: "The website uses cookies to collect statistics and show ads. More info in the",
                            version: "Version"
                        },
                        end: {
                            played: "I played",
                            andGotIt: "and got it",
                            butGaveUp: "but I gave up",
                            with: "in",
                            attempts: "guesses",
                            and: "and",
                            tips: "hints",
                            betterLuck: "Better luck in the next one!",
                            congrats: "Congrats!",
                            youGaveUpThe: "You gave up the",
                            youGotThe: "You got the",
                            word: "word",
                            in: "in",
                            theWordWas: "The word was",
                            share: "Share",
                            anyway: "anyway",
                            copied: "Copied!",
                            error: "Error :/",
                            done: "Done!",
                            playAgain: "Play again"
                        },
                        calculating: "Calculating...",
                        theWord: "The word",
                        alreadyGuessed: "was already guessed",
                        countdownText: "New word in",
                        random: "Random",
                        FeedbackTitle: "Help us improve",
                        FeedbackText: {
                            pt1: "Fill this small form and tell us your thoughts about Predicto to help us make the game better.",
                            pt2: " It takes less than 5 minutes and we don't collect any personal information."
                        },
                        FeedbackButton: "Take the Survey",
                        topBanner: {
                            text: "Now you can play in Spanish. Change the language in the settings:",
                            action: "Settings",
                            close: "Close"
                        },
                        faq: {
                            title: "FAQ",
                            q1: "How is the word order defined?",
                            a1: "The game uses an artificial intelligence algorithm and thousands of texts to calculate the similarity of the words in relation to the word of the day. Not necessarily it is related to the meaning of the words, but to the proximity in which they are used on the internet. For example, if the word of the day were \u201cinfinite\u201d, words related to \u201clove\u201d or words related to \u201cuniverse\u201d might be close to the word of the day because \u201cinfinite\u201d is commonly used in those two different contexts. In similar reasoning, if \u201ctv\u201d and \u201ctelevision\u201d, for example, are in very different positions, it means that they are used differently in relation to the word of the day, despite being the same object.",
                            q2: "How can I ask for a hint?",
                            a2: "Click on the three dots located on the upper right corner of the screen and select the option \u201cHint\u201d and it will reveal one word.",
                            q3: "I couldn't figure the word out. Can I see what the word of the day is?",
                            a3: "In case you don't want to keep trying to guess the word, you have the option to give up. In order to do it, click on the three dots located on the upper right corner of the screen and select the option \u201cGive up\u201d. The word of the day will be displayed on the screen.",
                            q4: "I want to play more than one game a day, is that possible?",
                            a4: "Yes. It is possible to play the games of previous days since Predicto launch day or to play a random game. To do so, click on the three dots located on the upper right corner of the screen and select the option \u201cPrevious games\u201d. You can choose the game of some specific day or play on random mode.",
                            q5: "I couldn't play yesterday. Can I still play yesterday's game?",
                            a5: "Yes, the previous games can be played anytime. To do so, click on the three dots located on the upper right corner of the screen and select the option \u201cPrevious games\u201d. You can choose the game of some specific day or play on random mode.",
                            q6: "I want to play in another language, how can I do that?",
                            a6: "Click on the three dots located on the upper right corner of the screen and select \u201cSettings\u201d to change the language. The words of the day are not the same in different languages.",
                            more: "Read more"
                        }
                    }
                }
            },
            lng: "pt",
            fallbackLng: "pt",
            keySeparator: ".",
            interpolation: {
                escapeValue: !1
            }
        });
        var _n = function(e, t) {
            return {
                play: function(r) {
                    return fetch("".concat(e, "/game/").concat(t, "/").concat(r))
                },
                tip: function(r) {
                    return fetch("".concat(e, "/tip/").concat(t, "/").concat(r))
                },
                giveUp: function() {
                    return fetch("".concat(e, "/giveup/").concat(t))
                },
                getClosestWords: function() {
                    return fetch("".concat(e, "/top/").concat(t))
                }
            }
        }
          , Cn = "new-game-conexo";
        var Sn = function(t) {
            var n = t.onActionClick
              , r = void 0 === n ? function() {}
            : n
              , a = t.language
              , o = q().t
              , i = h((0,
            e.useState)(!1), 2)
              , l = i[0]
              , s = i[1]
              , u = h(J("dismissed", ""), 2)
              , c = (u[0],
            u[1]);
            (0,
            e.useEffect)((function() {
                setTimeout((function() {
                    s(!0)
                }
                ), 1e3)
            }
            ), []);
            var d = H()("2023-10-01").startOf("day").isBefore(H()()) && l && "pt" === a && !0
              , f = function() {
                ge(a, Cn),
                r()
            };
            return (0,
            _e.jsxs)("div", {
                className: "top-banner ".concat(d ? "visible" : "hidden"),
                children: [(0,
                _e.jsxs)("div", {
                    className: "top-banner-text",
                    children: ["Novo jogo: ", (0,
                    _e.jsx)("b", {
                        children: "CONEXO"
                    }), ". Ser\xe1 que voc\xea consegue conectar as palavras certas? Jogue em", (0,
                    _e.jsxs)("a", {
                        href: "https://conexo.ws",
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: f,
                        children: [" ", "conexo.ws", " "]
                    })]
                }), (0,
                _e.jsxs)("div", {
                    className: "top-banner-buttons",
                    children: [(0,
                    _e.jsxs)("a", {
                        href: "https://conexo.ws",
                        target: "_blank",
                        rel: "noreferrer",
                        className: "button small",
                        onClick: f,
                        children: [(0,
                        _e.jsx)(Ce.ExternalLink, {}), "Jogar"]
                    }), (0,
                    _e.jsx)("button", {
                        type: "button",
                        className: "button small subtle",
                        onClick: function() {
                            me(a, Cn),
                            s(!1),
                            c(Cn)
                        },
                        children: o("topBanner.close")
                    })]
                })]
            })
        }
          , jn = {
            gameId: 0,
            guessHistory: [],
            lastGuess: null,
            foundWord: "",
            numberOfTips: 0,
            numberOfAttempts: 0,
            gaveUp: "",
            postGameHistory: []
        }
          , On = {
            loading: !1,
            data: []
        }
          , En = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var Pn = function() {
            var t = ke()
              , n = t.loading
              , r = t.gameState
              , a = t.setGameState
              , o = t.setLanguage
              , l = h((0,
            e.useState)(""), 2)
              , c = l[0]
              , f = l[1]
              , p = h((0,
            e.useState)(""), 2)
              , g = p[0]
              , v = p[1]
              , y = h((0,
            e.useState)(""), 2)
              , b = y[0]
              , w = y[1]
              , x = h((0,
            e.useState)(!1), 2)
              , k = x[0]
              , _ = x[1]
              , C = h((0,
            e.useState)(""), 2)
              , S = C[0]
              , j = C[1]
              , O = h((0,
            e.useState)({}), 2)
              , E = O[0]
              , P = O[1]
              , N = h((0,
            e.useState)("similarity"), 2)
              , L = N[0]
              , M = N[1]
              , T = h((0,
            e.useState)(!1), 2)
              , D = T[0]
              , R = T[1]
              , z = q().t;
            if ((0,
            e.useEffect)((function() {
                "serviceWorker"in navigator && navigator.serviceWorker.ready.then((function(e) {
                    e.unregister()
                }
                )).catch((function(e) {
                    console.error(e.message)
                }
                ));
                var e = r.theme;
                (void 0 === e && En || "dark" === e) && document.documentElement.setAttribute("data-theme", "dark")
            }
            ), []),
            n)
                return (0,
                _e.jsx)("div", {});
            var I = r.language;
            if (void 0 === I)
                return (0,
                _e.jsx)("div", {});
            var A = r.gameData
              , F = r.openGameId
              , U = r.lastGameId
              , V = r.theme
              , H = void 0 === V ? En ? "dark" : "light" : V
              , $ = r.tipSetting
              , Q = void 0 === $ ? "half" : $
              , K = r.hideCountdown
              , J = void 0 !== K && K;
            if (!A)
                return (0,
                _e.jsx)("div", {});
            var Z = A[I][F];
            if (!Z)
                return (0,
                _e.jsx)("div", {});
            var se = "pt" === I ? "pt-br" : I
              , fe = Z.gameId
              , ge = Z.guessHistory
              , me = Z.lastGuess
              , be = Z.foundWord
              , we = Z.numberOfTips
              , xe = Z.numberOfAttempts
              , Ee = Z.gaveUp
              , Pe = Z.postGameHistory
              , Ne = _n(se, fe)
              , Te = function(e) {
                a(d(d({}, r), {}, {
                    gameData: d(d({}, r.gameData), {}, u({}, I, d(d({}, r.gameData[I]), {}, u({}, r.openGameId, d(d({}, r.gameData[I][r.openGameId]), e)))))
                }))
            }
              , De = be || Ee
              , qe = function() {
                var e = s(m().mark((function e(t) {
                    var n, r, a, o, i;
                    return m().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return n = "",
                                r = -2,
                                a = "",
                                e.prev = 3,
                                e.next = 6,
                                Ne.play(t);
                            case 6:
                                return o = e.sent,
                                e.next = 9,
                                o.json();
                            case 9:
                                i = e.sent,
                                n = i.lemma,
                                r = i.distance,
                                a = i.error,
                                e.next = 18;
                                break;
                            case 15:
                                e.prev = 15,
                                e.t0 = e.catch(3),
                                a = z("oops");
                            case 18:
                                return e.abrupt("return", {
                                    lemma: n,
                                    distance: r,
                                    error: a
                                });
                            case 19:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e, null, [[3, 15]])
                }
                )));
                return function(t) {
                    return e.apply(this, arguments)
                }
            }()
              , He = function(e) {
                var t = ge.find((function(t) {
                    return t[0] === e
                }
                ));
                return t || (t = Pe.find((function(t) {
                    return t[0] === e
                }
                ))),
                t
            };
            function $e(e) {
                return /\s/.test(e)
            }
            var Ye = function() {
                var e = s(m().mark((function e() {
                    var t, n, r, a, o, l, s, u, d, p, h, g, y, b, x = arguments;
                    return m().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                if (t = x.length > 0 && void 0 !== x[0] ? x[0] : {},
                                n = t.tip,
                                r = void 0 === n ? "" : n,
                                a = t.tipDistance,
                                o = B(c),
                                r && (o = r.toLowerCase().trim()),
                                "" !== o) {
                                    e.next = 5;
                                    break
                                }
                                return e.abrupt("return");
                            case 5:
                                if (1 != $e(o)) {
                                    e.next = 10;
                                    break
                                }
                                return v("error"),
                                w(z("onlyOneWord")),
                                e.abrupt("return");
                            case 10:
                                if (a) {
                                    e.next = 19;
                                    break
                                }
                                return e.next = 13,
                                qe(o);
                            case 13:
                                d = e.sent,
                                l = d.lemma,
                                s = d.distance,
                                u = d.error,
                                e.next = 22;
                                break;
                            case 19:
                                l = r,
                                s = a,
                                u = "";
                            case 22:
                                if (!(u || s < 0)) {
                                    e.next = 26;
                                    break
                                }
                                return v("error"),
                                w(u),
                                e.abrupt("return");
                            case 26:
                                if (!(p = He(l))) {
                                    e.next = 32;
                                    break
                                }
                                return Te({
                                    lastGuess: p
                                }),
                                v("repeated"),
                                f(""),
                                e.abrupt("return");
                            case 32:
                                h = [l, s],
                                g = be,
                                0 !== s || Ee || (g = l),
                                y = ge,
                                b = Pe,
                                De ? b = [].concat(i(Pe), [h]) : y = [].concat(i(ge), [h]),
                                Te({
                                    guessHistory: y,
                                    postGameHistory: b,
                                    lastGuess: h,
                                    foundWord: g,
                                    numberOfTips: r ? we + 1 : we,
                                    numberOfAttempts: r || be || Ee ? xe : xe + 1
                                }),
                                v(""),
                                f(""),
                                (g || Ee) && R(!1),
                                0 === ge.length && X(I),
                                "" !== r ? ne(I) : 0 === s ? re(I) : "" === be ? ee(I) : te(I);
                            case 44:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e)
                }
                )));
                return function() {
                    return e.apply(this, arguments)
                }
            }()
              , We = function() {
                var e = s(m().mark((function e(t) {
                    return m().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                if (t.preventDefault(),
                                !k) {
                                    e.next = 3;
                                    break
                                }
                                return e.abrupt("return");
                            case 3:
                                return _(!0),
                                e.next = 6,
                                Ye();
                            case 6:
                                _(!1);
                            case 7:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e)
                }
                )));
                return function(t) {
                    return e.apply(this, arguments)
                }
            }()
              , Ge = function() {
                var e = s(m().mark((function e() {
                    var t, n, r, a, o;
                    return m().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return t = "random" === Q ? Y(ge) : "next" === Q ? W(ge) : G(ge),
                                e.next = 3,
                                Ne.tip(t);
                            case 3:
                                return n = e.sent,
                                e.next = 6,
                                n.json();
                            case 6:
                                return r = e.sent,
                                a = r.lemma,
                                o = r.distance,
                                e.abrupt("return", {
                                    lemma: a,
                                    distance: o
                                });
                            case 10:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e)
                }
                )));
                return function() {
                    return e.apply(this, arguments)
                }
            }()
              , Qe = function() {
                var e = s(m().mark((function e() {
                    var t, n, r;
                    return m().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                Ne.giveUp();
                            case 2:
                                return t = e.sent,
                                e.next = 5,
                                t.json();
                            case 5:
                                return n = e.sent,
                                r = n.lemma,
                                e.abrupt("return", r);
                            case 8:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e)
                }
                )));
                return function() {
                    return e.apply(this, arguments)
                }
            }()
              , Ke = function() {
                var e = s(m().mark((function e() {
                    var t, n, r, a, o, i;
                    return m().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return _(!0),
                                e.next = 3,
                                Ge();
                            case 3:
                                t = e.sent,
                                n = t.lemma,
                                r = t.distance,
                                a = function() {
                                    return -1 !== ge.findIndex((function(e) {
                                        return e[0] === n
                                    }
                                    ))
                                }
                                ,
                                o = 0;
                            case 8:
                                if (!(a() && o < 10)) {
                                    e.next = 17;
                                    break
                                }
                                return e.next = 11,
                                Ge();
                            case 11:
                                i = e.sent,
                                n = i.lemma,
                                r = i.distance,
                                o += 1,
                                e.next = 8;
                                break;
                            case 17:
                                if (a()) {
                                    e.next = 20;
                                    break
                                }
                                return e.next = 20,
                                Ye({
                                    tip: n,
                                    tipDistance: r
                                });
                            case 20:
                                _(!1);
                            case 21:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e)
                }
                )));
                return function() {
                    return e.apply(this, arguments)
                }
            }()
              , Je = function() {
                var e = s(m().mark((function e() {
                    var t;
                    return m().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return j(""),
                                _(!0),
                                e.next = 4,
                                Qe();
                            case 4:
                                t = e.sent,
                                Te({
                                    gaveUp: t,
                                    lastGuess: [t, 0],
                                    postGameHistory: [[t, 0]]
                                }),
                                ae(I),
                                _(!1);
                            case 8:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e)
                }
                )));
                return function() {
                    return e.apply(this, arguments)
                }
            }()
              , Ze = function() {
                var e = s(m().mark((function e() {
                    var t, n, r, a, o, i;
                    return m().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                if (t = E[F] || On,
                                n = t.loading,
                                r = t.data,
                                j("current"),
                                !(n || r.length > 0)) {
                                    e.next = 4;
                                    break
                                }
                                return e.abrupt("return");
                            case 4:
                                return P(d(d({}, E), {}, u({}, F, {
                                    loading: !0,
                                    data: []
                                }))),
                                e.next = 7,
                                Ne.getClosestWords();
                            case 7:
                                return a = e.sent,
                                e.next = 10,
                                a.json();
                            case 10:
                                o = e.sent,
                                i = o.words,
                                P(d(d({}, E), {}, u({}, F, {
                                    loading: !1,
                                    data: i
                                }))),
                                oe(I);
                            case 14:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e)
                }
                )));
                return function() {
                    return e.apply(this, arguments)
                }
            }()
              , Xe = null;
            k ? Xe = (0,
            _e.jsx)("div", {
                className: "message",
                children: (0,
                _e.jsx)("div", {
                    className: "message-text",
                    children: (0,
                    _e.jsx)(Me, {
                        text: z("calculating")
                    })
                })
            }) : "repeated" === g ? Xe = (0,
            _e.jsx)("div", {
                className: "message",
                children: (0,
                _e.jsxs)("div", {
                    className: "message-text",
                    children: [z("theWord"), " ", (0,
                    _e.jsx)("b", {
                        children: me[0]
                    }), " ", z("alreadyGuessed"), "."]
                })
            }) : "error" === g ? Xe = (0,
            _e.jsx)("div", {
                className: "message",
                children: (0,
                _e.jsx)("div", {
                    className: "message-text",
                    children: b
                })
            }) : null !== me && (Xe = (0,
            _e.jsx)("div", {
                className: "message",
                children: (0,
                _e.jsx)("div", {
                    children: (0,
                    _e.jsx)(Re, {
                        word: me[0],
                        distance: me[1],
                        highlight: !0
                    })
                })
            }));
            var et = null
              , tt = function() {
                j("faq"),
                ye(I)
            };
            F !== U || null !== Xe || De || 0 !== ge.length || (et = (0,
            _e.jsxs)(_e.Fragment, {
                children: [(0,
                _e.jsx)("div", {
                    className: "how-to-play",
                    children: (0,
                    _e.jsx)(Ie, {})
                }), (0,
                _e.jsx)("div", {
                    className: "faq-card",
                    children: (0,
                    _e.jsx)(ct, {
                        limit: 2
                    })
                }), (0,
                _e.jsx)("div", {
                    className: "faq-read-more",
                    children: (0,
                    _e.jsxs)("button", {
                        type: "button",
                        className: "button small subtle",
                        onClick: tt,
                        children: [z("faq.more"), "..."]
                    })
                })]
            }));
            var nt = me ? [me[0]] : []
              , rt = ge.concat(Pe || []);
            return (0,
            _e.jsxs)("div", {
                className: "wrapper",
                children: [(0,
                _e.jsx)(Sn, {
                    language: I
                }), (0,
                _e.jsxs)("div", {
                    className: "top-bar",
                    children: [(0,
                    _e.jsx)("div", {
                        className: "title",
                        children: (0,
                        _e.jsx)("h1", {
                            children: "Predicto"
                        })
                    }), (0,
                    _e.jsxs)(Se, {
                        children: [(0,
                        _e.jsxs)("button", {
                            type: "button",
                            className: "menu-item",
                            onClick: function() {
                                j("instructions"),
                                ue(I)
                            },
                            children: [(0,
                            _e.jsx)(Ce.QuestionMark, {}), z("How to play")]
                        }), (0,
                        _e.jsxs)("button", {
                            type: "button",
                            className: "menu-item",
                            disabled: !!be || !!Ee,
                            onClick: Ke,
                            children: [(0,
                            _e.jsx)(Ce.LightBulb, {}), z("Tip")]
                        }), (0,
                        _e.jsxs)("button", {
                            type: "button",
                            className: "menu-item",
                            disabled: !!be || !!Ee,
                            onClick: function() {
                                return j("giveUp")
                            },
                            children: [(0,
                            _e.jsx)(Ce.GiveUp, {}), z("Give up")]
                        }), (0,
                        _e.jsxs)("button", {
                            type: "button",
                            className: "menu-item",
                            onClick: function() {
                                return j("previous")
                            },
                            children: [(0,
                            _e.jsx)(Ce.Calendar, {}), z("Previous games")]
                        })]
                    })]
                }), De && (0,
                _e.jsx)(Le, {
                    state: Z,
                    lastGameId: U,
                    language: I,
                    hideCountdown: J,
                    onPlayAgain: function() {
                        ve(I),
                        j("previous")
                    }
                }), De && (0,
                _e.jsx)("div", {
                    style: {
                        textAlign: "center",
                        margin: "30px 0 20px 0"
                    },
                    children: (0,
                    _e.jsxs)("button", {
                        type: "button",
                        className: "button",
                        onClick: function() {
                            return Ze()
                        },
                        children: [(0,
                        _e.jsx)(Ce.Eye, {}), z("Closest words")]
                    })
                }), (0,
                _e.jsxs)("div", {
                    className: "info-bar",
                    children: [(0,
                    _e.jsxs)("span", {
                        className: "label",
                        children: [z("game"), ":"]
                    }), " ", (0,
                    _e.jsx)("span", {
                        children: D ? z("random") : "#".concat(Oe(fe))
                    }), "\xa0\xa0", (0,
                    _e.jsxs)("span", {
                        className: "label",
                        children: [z("attempts"), ":"]
                    }), " ", (0,
                    _e.jsx)("span", {
                        children: xe
                    }), "\xa0\xa0", we > 0 && (0,
                    _e.jsxs)(_e.Fragment, {
                        children: [(0,
                        _e.jsxs)("span", {
                            className: "label",
                            children: [z("tips"), ":"]
                        }), " ", (0,
                        _e.jsx)("span", {
                            children: we
                        })]
                    })]
                }), (0,
                _e.jsx)("form", {
                    onSubmit: We,
                    children: (0,
                    _e.jsx)("input", {
                        className: "word",
                        type: "text",
                        name: "word",
                        value: c,
                        onChange: function(e) {
                            k || f(e.target.value)
                        },
                        placeholder: z("inputPlacehoder"),
                        autoCapitalize: "off",
                        autoComplete: "off",
                        enterKeyHint: "send"
                    })
                }), Xe, et, (0,
                _e.jsx)(ze, {
                    words: rt,
                    highlights: nt,
                    order: L
                }), S && (0,
                _e.jsxs)(je, {
                    onClose: function() {
                        return j("")
                    },
                    closeOnMaskClick: "update" !== S,
                    children: ["instructions" === S && (0,
                    _e.jsx)(Ie, {}), "previous" === S && (0,
                    _e.jsx)(dt, {
                        lastGameId: U,
                        onSelectGame: function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                              , n = d(d({}, A), {}, u({}, I, d({}, A[I])));
                            void 0 === n[I][e] && (n[I][e] = d(d({}, jn), {}, {
                                gameId: e
                            })),
                            n[I][e].lastGuess = null,
                            a(d(d({}, r), {}, {
                                openGameId: e,
                                gameData: n
                            })),
                            f(""),
                            v(""),
                            j(""),
                            R(t),
                            window.init && window.init(),
                            t ? ie(I) : le(I)
                        },
                        gameData: A[I],
                        language: I
                    }), "current" === S && (0,
                    _e.jsx)(Ue, {
                        gameId: F,
                        loading: E[F].loading,
                        data: E[F].data
                    }), "info" === S && (0,
                    _e.jsx)(Fe, {}), "giveUp" === S && (0,
                    _e.jsx)(Ae, {
                        onConfirm: Je,
                        onCancel: function() {
                            return j("")
                        }
                    }), "settings" === S && (0,
                    _e.jsx)(Ve, {
                        tipSetting: Q,
                        onTipSettingChange: function(e) {
                            a(d(d({}, r), {}, {
                                tipSetting: e
                            })),
                            pe(e)
                        },
                        language: I,
                        onLanguageChange: function(e) {
                            o(e),
                            R(!1)
                        },
                        theme: H,
                        onThemeChange: function(e) {
                            a(d(d({}, r), {}, {
                                theme: e
                            })),
                            document.documentElement.setAttribute("data-theme", e),
                            he(e)
                        },
                        order: L,
                        onOrderChange: M,
                        hideCountdown: J,
                        onHideCountdownChange: function(e) {
                            a(d(d({}, r), {}, {
                                hideCountdown: e
                            }))
                        }
                    }), "feedback" === S && (0,
                    _e.jsx)(Be, {
                        language: I
                    }), "faq" === S && (0,
                    _e.jsx)(ct, {})]
                })]
            })
        }
          , Nn = function(e) {
            e && e instanceof Function && n.e(377).then(n.bind(n, 377)).then((function(t) {
                var n = t.getCLS
                  , r = t.getFID
                  , a = t.getFCP
                  , o = t.getLCP
                  , i = t.getTTFB;
                n(e),
                r(e),
                a(e),
                o(e),
                i(e)
            }
            ))
        };
        t.render((0,
        _e.jsx)(e.StrictMode, {
            children: (0,
            _e.jsx)(Pn, {})
        }), document.getElementById("root")),
        Nn()
    }()
}();
