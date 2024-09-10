(() => {
    "use strict";
    var e = {
        596: function (e, t, n) {
            var i;
            !(function (a) {
                function o(e, t, n) {
                    var i,
                        a,
                        o,
                        r,
                        s,
                        g,
                        h,
                        y,
                        m,
                        A = 0,
                        P = [],
                        I = 0,
                        b = !1,
                        W = [],
                        S = [],
                        M = !1,
                        v = !1,
                        C = -1;
                    if (((i = (n = n || {}).encoding || "UTF8"), (m = n.numRounds || 1) !== parseInt(m, 10) || 1 > m)) throw Error("numRounds must a integer >= 1");
                    if ("SHA-1" === e)
                        (s = 512),
                            (g = F),
                            (h = L),
                            (r = 160),
                            (y = function (e) {
                                return e.slice();
                            });
                    else if (0 === e.lastIndexOf("SHA-", 0))
                        if (
                            ((g = function (t, n) {
                                return K(t, n, e);
                            }),
                                (h = function (t, n, i, a) {
                                    var o, r;
                                    if ("SHA-224" === e || "SHA-256" === e) (o = 15 + (((n + 65) >>> 9) << 4)), (r = 16);
                                    else {
                                        if ("SHA-384" !== e && "SHA-512" !== e) throw Error("Unexpected error in SHA-2 implementation");
                                        (o = 31 + (((n + 129) >>> 10) << 5)), (r = 32);
                                    }
                                    for (; t.length <= o;) t.push(0);
                                    for (t[n >>> 5] |= 128 << (24 - (n % 32)), n += i, t[o] = 4294967295 & n, t[o - 1] = (n / 4294967296) | 0, i = t.length, n = 0; n < i; n += r) a = K(t.slice(n, n + r), a, e);
                                    if ("SHA-224" === e) t = [a[0], a[1], a[2], a[3], a[4], a[5], a[6]];
                                    else if ("SHA-256" === e) t = a;
                                    else if ("SHA-384" === e) t = [a[0].a, a[0].b, a[1].a, a[1].b, a[2].a, a[2].b, a[3].a, a[3].b, a[4].a, a[4].b, a[5].a, a[5].b];
                                    else {
                                        if ("SHA-512" !== e) throw Error("Unexpected error in SHA-2 implementation");
                                        t = [a[0].a, a[0].b, a[1].a, a[1].b, a[2].a, a[2].b, a[3].a, a[3].b, a[4].a, a[4].b, a[5].a, a[5].b, a[6].a, a[6].b, a[7].a, a[7].b];
                                    }
                                    return t;
                                }),
                                (y = function (e) {
                                    return e.slice();
                                }),
                                "SHA-224" === e)
                        )
                            (s = 512), (r = 224);
                        else if ("SHA-256" === e) (s = 512), (r = 256);
                        else if ("SHA-384" === e) (s = 1024), (r = 384);
                        else {
                            if ("SHA-512" !== e) throw Error("Chosen SHA variant is not supported");
                            (s = 1024), (r = 512);
                        }
                    else {
                        if (0 !== e.lastIndexOf("SHA3-", 0) && 0 !== e.lastIndexOf("SHAKE", 0)) throw Error("Chosen SHA variant is not supported");
                        var _ = 6;
                        if (
                            ((g = G),
                                (y = function (e) {
                                    var t,
                                        n = [];
                                    for (t = 0; 5 > t; t += 1) n[t] = e[t].slice();
                                    return n;
                                }),
                                (C = 1),
                                "SHA3-224" === e)
                        )
                            (s = 1152), (r = 224);
                        else if ("SHA3-256" === e) (s = 1088), (r = 256);
                        else if ("SHA3-384" === e) (s = 832), (r = 384);
                        else if ("SHA3-512" === e) (s = 576), (r = 512);
                        else if ("SHAKE128" === e) (s = 1344), (r = -1), (_ = 31), (v = !0);
                        else {
                            if ("SHAKE256" !== e) throw Error("Chosen SHA variant is not supported");
                            (s = 1088), (r = -1), (_ = 31), (v = !0);
                        }
                        h = function (e, t, n, i, a) {
                            var o,
                                r = _,
                                d = [],
                                c = (n = s) >>> 5,
                                l = 0,
                                u = t >>> 5;
                            for (o = 0; o < u && t >= n; o += c) (i = G(e.slice(o, o + c), i)), (t -= n);
                            for (e = e.slice(o), t %= n; e.length < c;) e.push(0);
                            for (e[(o = t >>> 3) >> 2] ^= r << ((o % 4) * 8), e[c - 1] ^= 2147483648, i = G(e, i); 32 * d.length < a && ((e = i[l % 5][(l / 5) | 0]), d.push(e.b), !(32 * d.length >= a));)
                                d.push(e.a), 0 == (64 * (l += 1)) % n && G(null, i);
                            return d;
                        };
                    }
                    (o = f(t, i, C)),
                        (a = z(e)),
                        (this.setHMACKey = function (t, n, o) {
                            var d;
                            if (!0 === b) throw Error("HMAC key already set");
                            if (!0 === M) throw Error("Cannot set HMAC key after calling update");
                            if (!0 === v) throw Error("SHAKE is not supported for HMAC");
                            if (((t = (n = f(n, (i = (o || {}).encoding || "UTF8"), C)(t)).binLen), (n = n.value), (o = (d = s >>> 3) / 4 - 1), d < t / 8)) {
                                for (n = h(n, t, 0, z(e), r); n.length <= o;) n.push(0);
                                n[o] &= 4294967040;
                            } else if (d > t / 8) {
                                for (; n.length <= o;) n.push(0);
                                n[o] &= 4294967040;
                            }
                            for (t = 0; t <= o; t += 1) (W[t] = 909522486 ^ n[t]), (S[t] = 1549556828 ^ n[t]);
                            (a = g(W, a)), (A = s), (b = !0);
                        }),
                        (this.update = function (e) {
                            var t,
                                n,
                                i,
                                r = 0,
                                d = s >>> 5;
                            for (e = (t = o(e, P, I)).binLen, n = t.value, t = e >>> 5, i = 0; i < t; i += d) r + s <= e && ((a = g(n.slice(i, i + d), a)), (r += s));
                            (A += r), (P = n.slice(r >>> 5)), (I = e % s), (M = !0);
                        }),
                        (this.getHash = function (t, n) {
                            var i, o, s, f;
                            if (!0 === b) throw Error("Cannot call getHash after setting HMAC key");
                            if (((s = p(n)), !0 === v)) {
                                if (-1 === s.shakeLen) throw Error("shakeLen must be specified in options");
                                r = s.shakeLen;
                            }
                            switch (t) {
                                case "HEX":
                                    i = function (e) {
                                        return d(e, r, C, s);
                                    };
                                    break;
                                case "B64":
                                    i = function (e) {
                                        return c(e, r, C, s);
                                    };
                                    break;
                                case "BYTES":
                                    i = function (e) {
                                        return l(e, r, C);
                                    };
                                    break;
                                case "ARRAYBUFFER":
                                    try {
                                        o = new ArrayBuffer(0);
                                    } catch (e) {
                                        throw Error("ARRAYBUFFER not supported by this environment");
                                    }
                                    i = function (e) {
                                        return u(e, r, C);
                                    };
                                    break;
                                case "UINT8ARRAY":
                                    try {
                                        o = new Uint8Array(0);
                                    } catch (e) {
                                        throw Error("UINT8ARRAY not supported by this environment");
                                    }
                                    i = function (e) {
                                        return w(e, r, C);
                                    };
                                    break;
                                default:
                                    throw Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
                            }
                            for (f = h(P.slice(), I, A, y(a), r), o = 1; o < m; o += 1) !0 === v && 0 != r % 32 && (f[f.length - 1] &= 16777215 >>> (24 - (r % 32))), (f = h(f, r, 0, z(e), r));
                            return i(f);
                        }),
                        (this.getHMAC = function (t, n) {
                            var i, o, f, m;
                            if (!1 === b) throw Error("Cannot call getHMAC without first setting HMAC key");
                            switch (((f = p(n)), t)) {
                                case "HEX":
                                    i = function (e) {
                                        return d(e, r, C, f);
                                    };
                                    break;
                                case "B64":
                                    i = function (e) {
                                        return c(e, r, C, f);
                                    };
                                    break;
                                case "BYTES":
                                    i = function (e) {
                                        return l(e, r, C);
                                    };
                                    break;
                                case "ARRAYBUFFER":
                                    try {
                                        i = new ArrayBuffer(0);
                                    } catch (e) {
                                        throw Error("ARRAYBUFFER not supported by this environment");
                                    }
                                    i = function (e) {
                                        return u(e, r, C);
                                    };
                                    break;
                                case "UINT8ARRAY":
                                    try {
                                        i = new Uint8Array(0);
                                    } catch (e) {
                                        throw Error("UINT8ARRAY not supported by this environment");
                                    }
                                    i = function (e) {
                                        return w(e, r, C);
                                    };
                                    break;
                                default:
                                    throw Error("outputFormat must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
                            }
                            return (o = h(P.slice(), I, A, y(a), r)), (m = g(S, z(e))), i((m = h(o, r, s, m, r)));
                        });
                }
                function r(e, t) {
                    (this.a = e), (this.b = t);
                }
                function s(e, t, n, i) {
                    var a, o, r, s, d;
                    for (t = t || [0], o = (n = n || 0) >>> 3, d = -1 === i ? 3 : 0, a = 0; a < e.length; a += 1) (r = (s = a + o) >>> 2), t.length <= r && t.push(0), (t[r] |= e[a] << (8 * (d + (s % 4) * i)));
                    return { value: t, binLen: 8 * e.length + n };
                }
                function d(e, t, n, i) {
                    var a,
                        o,
                        r,
                        s = "";
                    for (t /= 8, r = -1 === n ? 3 : 0, a = 0; a < t; a += 1) (o = e[a >>> 2] >>> (8 * (r + (a % 4) * n))), (s += "0123456789abcdef".charAt((o >>> 4) & 15) + "0123456789abcdef".charAt(15 & o));
                    return i.outputUpper ? s.toUpperCase() : s;
                }
                function c(e, t, n, i) {
                    var a,
                        o,
                        r,
                        s,
                        d = "",
                        c = t / 8;
                    for (s = -1 === n ? 3 : 0, a = 0; a < c; a += 3)
                        for (
                            o = a + 1 < c ? e[(a + 1) >>> 2] : 0,
                            r = a + 2 < c ? e[(a + 2) >>> 2] : 0,
                            r = (((e[a >>> 2] >>> (8 * (s + (a % 4) * n))) & 255) << 16) | (((o >>> (8 * (s + ((a + 1) % 4) * n))) & 255) << 8) | ((r >>> (8 * (s + ((a + 2) % 4) * n))) & 255),
                            o = 0;
                            4 > o;
                            o += 1
                        )
                            d += 8 * a + 6 * o <= t ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((r >>> (6 * (3 - o))) & 63) : i.b64Pad;
                    return d;
                }
                function l(e, t, n) {
                    var i,
                        a,
                        o,
                        r = "";
                    for (t /= 8, o = -1 === n ? 3 : 0, i = 0; i < t; i += 1) (a = (e[i >>> 2] >>> (8 * (o + (i % 4) * n))) & 255), (r += String.fromCharCode(a));
                    return r;
                }
                function u(e, t, n) {
                    t /= 8;
                    var i,
                        a,
                        o,
                        r = new ArrayBuffer(t);
                    for (o = new Uint8Array(r), a = -1 === n ? 3 : 0, i = 0; i < t; i += 1) o[i] = (e[i >>> 2] >>> (8 * (a + (i % 4) * n))) & 255;
                    return r;
                }
                function w(e, t, n) {
                    t /= 8;
                    var i,
                        a,
                        o = new Uint8Array(t);
                    for (a = -1 === n ? 3 : 0, i = 0; i < t; i += 1) o[i] = (e[i >>> 2] >>> (8 * (a + (i % 4) * n))) & 255;
                    return o;
                }
                function p(e) {
                    var t = { outputUpper: !1, b64Pad: "=", shakeLen: -1 };
                    if (((e = e || {}), (t.outputUpper = e.outputUpper || !1), !0 === e.hasOwnProperty("b64Pad") && (t.b64Pad = e.b64Pad), !0 === e.hasOwnProperty("shakeLen"))) {
                        if (0 != e.shakeLen % 8) throw Error("shakeLen must be a multiple of 8");
                        t.shakeLen = e.shakeLen;
                    }
                    if ("boolean" != typeof t.outputUpper) throw Error("Invalid outputUpper formatting option");
                    if ("string" != typeof t.b64Pad) throw Error("Invalid b64Pad formatting option");
                    return t;
                }
                function f(e, t, n) {
                    switch (t) {
                        case "UTF8":
                        case "UTF16BE":
                        case "UTF16LE":
                            break;
                        default:
                            throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");
                    }
                    switch (e) {
                        case "HEX":
                            e = function (e, t, i) {
                                var a,
                                    o,
                                    r,
                                    s,
                                    d,
                                    c,
                                    l = e.length;
                                if (0 != l % 2) throw Error("String of HEX type must be in byte increments");
                                for (t = t || [0], d = (i = i || 0) >>> 3, c = -1 === n ? 3 : 0, a = 0; a < l; a += 2) {
                                    if (((o = parseInt(e.substr(a, 2), 16)), isNaN(o))) throw Error("String of HEX type contains invalid characters");
                                    for (r = (s = (a >>> 1) + d) >>> 2; t.length <= r;) t.push(0);
                                    t[r] |= o << (8 * (c + (s % 4) * n));
                                }
                                return { value: t, binLen: 4 * l + i };
                            };
                            break;
                        case "TEXT":
                            e = function (e, i, a) {
                                var o,
                                    r,
                                    s,
                                    d,
                                    c,
                                    l,
                                    u,
                                    w,
                                    p = 0;
                                if (((i = i || [0]), (c = (a = a || 0) >>> 3), "UTF8" === t))
                                    for (w = -1 === n ? 3 : 0, s = 0; s < e.length; s += 1)
                                        for (
                                            r = [],
                                            128 > (o = e.charCodeAt(s))
                                                ? r.push(o)
                                                : 2048 > o
                                                    ? (r.push(192 | (o >>> 6)), r.push(128 | (63 & o)))
                                                    : 55296 > o || 57344 <= o
                                                        ? r.push(224 | (o >>> 12), 128 | ((o >>> 6) & 63), 128 | (63 & o))
                                                        : ((s += 1), (o = 65536 + (((1023 & o) << 10) | (1023 & e.charCodeAt(s)))), r.push(240 | (o >>> 18), 128 | ((o >>> 12) & 63), 128 | ((o >>> 6) & 63), 128 | (63 & o))),
                                            d = 0;
                                            d < r.length;
                                            d += 1
                                        ) {
                                            for (l = (u = p + c) >>> 2; i.length <= l;) i.push(0);
                                            (i[l] |= r[d] << (8 * (w + (u % 4) * n))), (p += 1);
                                        }
                                else if ("UTF16BE" === t || "UTF16LE" === t)
                                    for (w = -1 === n ? 2 : 0, r = ("UTF16LE" === t && 1 !== n) || ("UTF16LE" !== t && 1 === n), s = 0; s < e.length; s += 1) {
                                        for (o = e.charCodeAt(s), !0 === r && (o = ((d = 255 & o) << 8) | (o >>> 8)), l = (u = p + c) >>> 2; i.length <= l;) i.push(0);
                                        (i[l] |= o << (8 * (w + (u % 4) * n))), (p += 2);
                                    }
                                return { value: i, binLen: 8 * p + a };
                            };
                            break;
                        case "B64":
                            e = function (e, t, i) {
                                var a,
                                    o,
                                    r,
                                    s,
                                    d,
                                    c,
                                    l,
                                    u,
                                    w = 0;
                                if (-1 === e.search(/^[a-zA-Z0-9=+\/]+$/)) throw Error("Invalid character in base-64 string");
                                if (((o = e.indexOf("=")), (e = e.replace(/\=/g, "")), -1 !== o && o < e.length)) throw Error("Invalid '=' found in base-64 string");
                                for (t = t || [0], c = (i = i || 0) >>> 3, u = -1 === n ? 3 : 0, o = 0; o < e.length; o += 4) {
                                    for (d = e.substr(o, 4), r = s = 0; r < d.length; r += 1) s |= (a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(d.charAt(r))) << (18 - 6 * r);
                                    for (r = 0; r < d.length - 1; r += 1) {
                                        for (a = (l = w + c) >>> 2; t.length <= a;) t.push(0);
                                        (t[a] |= ((s >>> (16 - 8 * r)) & 255) << (8 * (u + (l % 4) * n))), (w += 1);
                                    }
                                }
                                return { value: t, binLen: 8 * w + i };
                            };
                            break;
                        case "BYTES":
                            e = function (e, t, i) {
                                var a, o, r, s, d, c;
                                for (t = t || [0], r = (i = i || 0) >>> 3, c = -1 === n ? 3 : 0, o = 0; o < e.length; o += 1)
                                    (a = e.charCodeAt(o)), (s = (d = o + r) >>> 2), t.length <= s && t.push(0), (t[s] |= a << (8 * (c + (d % 4) * n)));
                                return { value: t, binLen: 8 * e.length + i };
                            };
                            break;
                        case "ARRAYBUFFER":
                            try {
                                e = new ArrayBuffer(0);
                            } catch (e) {
                                throw Error("ARRAYBUFFER not supported by this environment");
                            }
                            e = function (e, t, i) {
                                return s(new Uint8Array(e), t, i, n);
                            };
                            break;
                        case "UINT8ARRAY":
                            try {
                                e = new Uint8Array(0);
                            } catch (e) {
                                throw Error("UINT8ARRAY not supported by this environment");
                            }
                            e = function (e, t, i) {
                                return s(e, t, i, n);
                            };
                            break;
                        default:
                            throw Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
                    }
                    return e;
                }
                function g(e, t) {
                    return (e << t) | (e >>> (32 - t));
                }
                function h(e, t) {
                    return 32 < t ? ((t -= 32), new r((e.b << t) | (e.a >>> (32 - t)), (e.a << t) | (e.b >>> (32 - t)))) : 0 !== t ? new r((e.a << t) | (e.b >>> (32 - t)), (e.b << t) | (e.a >>> (32 - t))) : e;
                }
                function y(e, t) {
                    return (e >>> t) | (e << (32 - t));
                }
                function m(e, t) {
                    var n;
                    return (
                        (n = new r(e.a, e.b)),
                        32 >= t
                            ? new r((n.a >>> t) | ((n.b << (32 - t)) & 4294967295), (n.b >>> t) | ((n.a << (32 - t)) & 4294967295))
                            : new r((n.b >>> (t - 32)) | ((n.a << (64 - t)) & 4294967295), (n.a >>> (t - 32)) | ((n.b << (64 - t)) & 4294967295))
                    );
                }
                function A(e, t) {
                    return 32 >= t ? new r(e.a >>> t, (e.b >>> t) | ((e.a << (32 - t)) & 4294967295)) : new r(0, e.a >>> (t - 32));
                }
                function P(e, t, n) {
                    return (e & t) ^ (~e & n);
                }
                function I(e, t, n) {
                    return new r((e.a & t.a) ^ (~e.a & n.a), (e.b & t.b) ^ (~e.b & n.b));
                }
                function b(e, t, n) {
                    return (e & t) ^ (e & n) ^ (t & n);
                }
                function W(e, t, n) {
                    return new r((e.a & t.a) ^ (e.a & n.a) ^ (t.a & n.a), (e.b & t.b) ^ (e.b & n.b) ^ (t.b & n.b));
                }
                function S(e) {
                    return y(e, 2) ^ y(e, 13) ^ y(e, 22);
                }
                function M(e) {
                    var t = m(e, 28),
                        n = m(e, 34);
                    return (e = m(e, 39)), new r(t.a ^ n.a ^ e.a, t.b ^ n.b ^ e.b);
                }
                function v(e) {
                    return y(e, 6) ^ y(e, 11) ^ y(e, 25);
                }
                function C(e) {
                    var t = m(e, 14),
                        n = m(e, 18);
                    return (e = m(e, 41)), new r(t.a ^ n.a ^ e.a, t.b ^ n.b ^ e.b);
                }
                function _(e) {
                    return y(e, 7) ^ y(e, 18) ^ (e >>> 3);
                }
                function T(e) {
                    var t = m(e, 1),
                        n = m(e, 8);
                    return (e = A(e, 7)), new r(t.a ^ n.a ^ e.a, t.b ^ n.b ^ e.b);
                }
                function k(e) {
                    return y(e, 17) ^ y(e, 19) ^ (e >>> 10);
                }
                function E(e) {
                    var t = m(e, 19),
                        n = m(e, 61);
                    return (e = A(e, 6)), new r(t.a ^ n.a ^ e.a, t.b ^ n.b ^ e.b);
                }
                function x(e, t) {
                    var n = (65535 & e) + (65535 & t);
                    return ((((e >>> 16) + (t >>> 16) + (n >>> 16)) & 65535) << 16) | (65535 & n);
                }
                function O(e, t, n, i) {
                    var a = (65535 & e) + (65535 & t) + (65535 & n) + (65535 & i);
                    return ((((e >>> 16) + (t >>> 16) + (n >>> 16) + (i >>> 16) + (a >>> 16)) & 65535) << 16) | (65535 & a);
                }
                function U(e, t, n, i, a) {
                    var o = (65535 & e) + (65535 & t) + (65535 & n) + (65535 & i) + (65535 & a);
                    return ((((e >>> 16) + (t >>> 16) + (n >>> 16) + (i >>> 16) + (a >>> 16) + (o >>> 16)) & 65535) << 16) | (65535 & o);
                }
                function N(e, t) {
                    var n, i, a;
                    return (
                        (n = (65535 & e.b) + (65535 & t.b)),
                        (a = ((65535 & (i = (e.b >>> 16) + (t.b >>> 16) + (n >>> 16))) << 16) | (65535 & n)),
                        (n = (65535 & e.a) + (65535 & t.a) + (i >>> 16)),
                        new r(((65535 & (i = (e.a >>> 16) + (t.a >>> 16) + (n >>> 16))) << 16) | (65535 & n), a)
                    );
                }
                function R(e, t, n, i) {
                    var a, o, s;
                    return (
                        (a = (65535 & e.b) + (65535 & t.b) + (65535 & n.b) + (65535 & i.b)),
                        (s = ((65535 & (o = (e.b >>> 16) + (t.b >>> 16) + (n.b >>> 16) + (i.b >>> 16) + (a >>> 16))) << 16) | (65535 & a)),
                        (a = (65535 & e.a) + (65535 & t.a) + (65535 & n.a) + (65535 & i.a) + (o >>> 16)),
                        new r(((65535 & (o = (e.a >>> 16) + (t.a >>> 16) + (n.a >>> 16) + (i.a >>> 16) + (a >>> 16))) << 16) | (65535 & a), s)
                    );
                }
                function j(e, t, n, i, a) {
                    var o, s, d;
                    return (
                        (o = (65535 & e.b) + (65535 & t.b) + (65535 & n.b) + (65535 & i.b) + (65535 & a.b)),
                        (d = ((65535 & (s = (e.b >>> 16) + (t.b >>> 16) + (n.b >>> 16) + (i.b >>> 16) + (a.b >>> 16) + (o >>> 16))) << 16) | (65535 & o)),
                        (o = (65535 & e.a) + (65535 & t.a) + (65535 & n.a) + (65535 & i.a) + (65535 & a.a) + (s >>> 16)),
                        new r(((65535 & (s = (e.a >>> 16) + (t.a >>> 16) + (n.a >>> 16) + (i.a >>> 16) + (a.a >>> 16) + (o >>> 16))) << 16) | (65535 & o), d)
                    );
                }
                function B(e, t) {
                    return new r(e.a ^ t.a, e.b ^ t.b);
                }
                function z(e) {
                    var t,
                        n = [];
                    if ("SHA-1" === e) n = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
                    else if (0 === e.lastIndexOf("SHA-", 0))
                        switch (
                        ((n = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]), (t = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), e)
                        ) {
                            case "SHA-224":
                                break;
                            case "SHA-256":
                                n = t;
                                break;
                            case "SHA-384":
                                n = [
                                    new r(3418070365, n[0]),
                                    new r(1654270250, n[1]),
                                    new r(2438529370, n[2]),
                                    new r(355462360, n[3]),
                                    new r(1731405415, n[4]),
                                    new r(41048885895, n[5]),
                                    new r(3675008525, n[6]),
                                    new r(1203062813, n[7]),
                                ];
                                break;
                            case "SHA-512":
                                n = [new r(t[0], 4089235720), new r(t[1], 2227873595), new r(t[2], 4271175723), new r(t[3], 1595750129), new r(t[4], 2917565137), new r(t[5], 725511199), new r(t[6], 4215389547), new r(t[7], 327033209)];
                                break;
                            default:
                                throw Error("Unknown SHA variant");
                        }
                    else {
                        if (0 !== e.lastIndexOf("SHA3-", 0) && 0 !== e.lastIndexOf("SHAKE", 0)) throw Error("No SHA variants supported");
                        for (e = 0; 5 > e; e += 1) n[e] = [new r(0, 0), new r(0, 0), new r(0, 0), new r(0, 0), new r(0, 0)];
                    }
                    return n;
                }
                function F(e, t) {
                    var n,
                        i,
                        a,
                        o,
                        r,
                        s,
                        d,
                        c = [];
                    for (n = t[0], i = t[1], a = t[2], o = t[3], r = t[4], d = 0; 80 > d; d += 1)
                        (c[d] = 16 > d ? e[d] : g(c[d - 3] ^ c[d - 8] ^ c[d - 14] ^ c[d - 16], 1)),
                            (s =
                                20 > d
                                    ? U(g(n, 5), (i & a) ^ (~i & o), r, 1518500249, c[d])
                                    : 40 > d
                                        ? U(g(n, 5), i ^ a ^ o, r, 1859775393, c[d])
                                        : 60 > d
                                            ? U(g(n, 5), b(i, a, o), r, 2400959708, c[d])
                                            : U(g(n, 5), i ^ a ^ o, r, 3395469782, c[d])),
                            (r = o),
                            (o = a),
                            (a = g(i, 30)),
                            (i = n),
                            (n = s);
                    return (t[0] = x(n, t[0])), (t[1] = x(i, t[1])), (t[2] = x(a, t[2])), (t[3] = x(o, t[3])), (t[4] = x(r, t[4])), t;
                }
                function L(e, t, n, i) {
                    var a;
                    for (a = 15 + (((t + 65) >>> 9) << 4); e.length <= a;) e.push(0);
                    for (e[t >>> 5] |= 128 << (24 - (t % 32)), t += n, e[a] = 4294967295 & t, e[a - 1] = (t / 4294967296) | 0, t = e.length, a = 0; a < t; a += 16) i = F(e.slice(a, a + 16), i);
                    return i;
                }
                function K(e, t, n) {
                    var i,
                        a,
                        o,
                        s,
                        d,
                        c,
                        l,
                        u,
                        w,
                        p,
                        f,
                        g,
                        h,
                        y,
                        m,
                        A,
                        B,
                        z,
                        F,
                        L,
                        K,
                        G,
                        q,
                        V = [];
                    if ("SHA-224" === n || "SHA-256" === n) (p = 64), (g = 1), (G = Number), (h = x), (y = O), (m = U), (A = _), (B = k), (z = S), (F = v), (K = b), (L = P), (q = D);
                    else {
                        if ("SHA-384" !== n && "SHA-512" !== n) throw Error("Unexpected error in SHA-2 implementation");
                        (p = 80), (g = 2), (G = r), (h = N), (y = R), (m = j), (A = T), (B = E), (z = M), (F = C), (K = W), (L = I), (q = H);
                    }
                    for (n = t[0], i = t[1], a = t[2], o = t[3], s = t[4], d = t[5], c = t[6], l = t[7], f = 0; f < p; f += 1)
                        16 > f ? ((w = f * g), (u = e.length <= w ? 0 : e[w]), (w = e.length <= w + 1 ? 0 : e[w + 1]), (V[f] = new G(u, w))) : (V[f] = y(B(V[f - 2]), V[f - 7], A(V[f - 15]), V[f - 16])),
                            (u = m(l, F(s), L(s, d, c), q[f], V[f])),
                            (w = h(z(n), K(n, i, a))),
                            (l = c),
                            (c = d),
                            (d = s),
                            (s = h(o, u)),
                            (o = a),
                            (a = i),
                            (i = n),
                            (n = h(u, w));
                    return (t[0] = h(n, t[0])), (t[1] = h(i, t[1])), (t[2] = h(a, t[2])), (t[3] = h(o, t[3])), (t[4] = h(s, t[4])), (t[5] = h(d, t[5])), (t[6] = h(c, t[6])), (t[7] = h(l, t[7])), t;
                }
                function G(e, t) {
                    var n,
                        i,
                        a,
                        o,
                        s = [],
                        d = [];
                    if (null !== e) for (i = 0; i < e.length; i += 2) t[(i >>> 1) % 5][((i >>> 1) / 5) | 0] = B(t[(i >>> 1) % 5][((i >>> 1) / 5) | 0], new r(e[i + 1], e[i]));
                    for (n = 0; 24 > n; n += 1) {
                        for (o = z("SHA3-"), i = 0; 5 > i; i += 1) {
                            a = t[i][0];
                            var c = t[i][1],
                                l = t[i][2],
                                u = t[i][3],
                                w = t[i][4];
                            s[i] = new r(a.a ^ c.a ^ l.a ^ u.a ^ w.a, a.b ^ c.b ^ l.b ^ u.b ^ w.b);
                        }
                        for (i = 0; 5 > i; i += 1) d[i] = B(s[(i + 4) % 5], h(s[(i + 1) % 5], 1));
                        for (i = 0; 5 > i; i += 1) for (a = 0; 5 > a; a += 1) t[i][a] = B(t[i][a], d[i]);
                        for (i = 0; 5 > i; i += 1) for (a = 0; 5 > a; a += 1) o[a][(2 * i + 3 * a) % 5] = h(t[i][a], q[i][a]);
                        for (i = 0; 5 > i; i += 1) for (a = 0; 5 > a; a += 1) t[i][a] = B(o[i][a], new r(~o[(i + 1) % 5][a].a & o[(i + 2) % 5][a].a, ~o[(i + 1) % 5][a].b & o[(i + 2) % 5][a].b));
                        t[0][0] = B(t[0][0], V[n]);
                    }
                    return t;
                }
                var D, H, q, V;
                (H = [
                    new r(
                        (D = [
                            1116352408,
                            1899447441,
                            3049323471,
                            3921009573,
                            961987163,
                            1508970993,
                            2453635748,
                            2870763221,
                            3624381080,
                            310598401,
                            607225278,
                            1426881987,
                            1925078388,
                            2162078206,
                            2614888103,
                            3248222580,
                            3835390401,
                            4022224774,
                            264347078,
                            604807628,
                            770255983,
                            1249150122,
                            1555081692,
                            1996064986,
                            2554220882,
                            2821834349,
                            2952996808,
                            3210313671,
                            3336571891,
                            3584528711,
                            113926993,
                            338241895,
                            666307205,
                            773529912,
                            1294757372,
                            1396182291,
                            1695183700,
                            1986661051,
                            2177026350,
                            2456956037,
                            2730485921,
                            2820302411,
                            3259730800,
                            3345764771,
                            3516065817,
                            3600352804,
                            4094571909,
                            275423344,
                            430227734,
                            506948616,
                            659060556,
                            883997877,
                            958139571,
                            1322822218,
                            1537002063,
                            1747873779,
                            1955562222,
                            2024104815,
                            2227730452,
                            2361852424,
                            2428436474,
                            2756734187,
                            3204031479,
                            3329325298,
                        ])[0],
                        3609767458
                    ),
                    new r(D[1], 602891725),
                    new r(D[2], 3964484399),
                    new r(D[3], 2173295548),
                    new r(D[4], 4081628472),
                    new r(D[5], 3053834265),
                    new r(D[6], 2937671579),
                    new r(D[7], 3664609560),
                    new r(D[8], 2734883394),
                    new r(D[9], 1164996542),
                    new r(D[10], 1323610764),
                    new r(D[11], 3590304994),
                    new r(D[12], 4068182383),
                    new r(D[13], 991336113),
                    new r(D[14], 633803317),
                    new r(D[15], 3479774868),
                    new r(D[16], 2666613458),
                    new r(D[17], 944711139),
                    new r(D[18], 2341262773),
                    new r(D[19], 2007800933),
                    new r(D[20], 1495990901),
                    new r(D[21], 1856431235),
                    new r(D[22], 3175218132),
                    new r(D[23], 2198950837),
                    new r(D[24], 3999719339),
                    new r(D[25], 766784016),
                    new r(D[26], 2566594879),
                    new r(D[27], 3203337956),
                    new r(D[28], 1034457026),
                    new r(D[29], 2466948901),
                    new r(D[30], 3758326383),
                    new r(D[31], 168717936),
                    new r(D[32], 1188179964),
                    new r(D[33], 1546045734),
                    new r(D[34], 1522805485),
                    new r(D[35], 2643833823),
                    new r(D[36], 2343527390),
                    new r(D[37], 1014477480),
                    new r(D[38], 1206759142),
                    new r(D[39], 344077627),
                    new r(D[40], 1290863460),
                    new r(D[41], 3158454273),
                    new r(D[42], 3505952657),
                    new r(D[43], 106217008),
                    new r(D[44], 3606008344),
                    new r(D[45], 1432725776),
                    new r(D[46], 1467031594),
                    new r(D[47], 851169720),
                    new r(D[48], 3100823752),
                    new r(D[49], 1363258195),
                    new r(D[50], 3750685593),
                    new r(D[51], 3785050280),
                    new r(D[52], 3318307427),
                    new r(D[53], 3812723403),
                    new r(D[54], 2003034995),
                    new r(D[55], 3602036899),
                    new r(D[56], 1575990012),
                    new r(D[57], 1125592928),
                    new r(D[58], 2716904306),
                    new r(D[59], 442776044),
                    new r(D[60], 593698344),
                    new r(D[61], 3733110249),
                    new r(D[62], 2999351573),
                    new r(D[63], 3815920427),
                    new r(3391569614, 3928383900),
                    new r(3515267271, 566280711),
                    new r(3940187606, 3454069534),
                    new r(4118630271, 4000239992),
                    new r(116418474, 1914138554),
                    new r(174292421, 2731055270),
                    new r(289380356, 3203993006),
                    new r(460393269, 320620315),
                    new r(685471733, 587496836),
                    new r(852142971, 1086792851),
                    new r(1017036298, 365543100),
                    new r(1126000580, 2618297676),
                    new r(1288033470, 3409855158),
                    new r(1501505948, 4234509866),
                    new r(1607167915, 987167468),
                    new r(1816402316, 1246189591),
                ]),
                    (V = [
                        new r(0, 1),
                        new r(0, 32898),
                        new r(2147483648, 32906),
                        new r(2147483648, 2147516416),
                        new r(0, 32907),
                        new r(0, 2147483649),
                        new r(2147483648, 2147516545),
                        new r(2147483648, 32777),
                        new r(0, 138),
                        new r(0, 136),
                        new r(0, 2147516425),
                        new r(0, 2147483658),
                        new r(0, 2147516555),
                        new r(2147483648, 139),
                        new r(2147483648, 32905),
                        new r(2147483648, 32771),
                        new r(2147483648, 32770),
                        new r(2147483648, 128),
                        new r(0, 32778),
                        new r(2147483648, 2147483658),
                        new r(2147483648, 2147516545),
                        new r(2147483648, 32896),
                        new r(0, 2147483649),
                        new r(2147483648, 2147516424),
                    ]),
                    (q = [
                        [0, 36, 3, 41, 18],
                        [1, 44, 10, 45, 2],
                        [62, 6, 43, 15, 61],
                        [28, 55, 25, 21, 56],
                        [27, 20, 39, 8, 14],
                    ]),
                    void 0 ===
                    (i = function () {
                        return o;
                    }.call(t, n, t, e)) || (e.exports = i);
            })();
        },
        321: (e, t, n) => {
            n.r(t), n.d(t, { storeObjects: () => i });
            const i = [
                { id: "module", conditions: (e) => (e.default && e.default.Chat && e.default.Msg ? e.default : null) },
                { id: "replyButton", conditions: (e) => (e.__esModule && e.default && e.default.prototype && "replyButton" === e.default.prototype.proxyName ? e.default : null) },
                { id: "templateButton", conditions: (e) => (e.__esModule && e.default && e.default.prototype && "templateButton" === e.default.prototype.proxyName ? e.default : null) },
                { id: "TemplateButtonCollection", conditions: (e) => (e.TemplateButtonCollection ? e.TemplateButtonCollection : null) },
                { id: "ButtonCollection", conditions: (e) => (e.ButtonCollection ? e.ButtonCollection : null) },
                { id: "MediaCollection", conditions: (e) => (e.default && e.default.prototype && (void 0 !== e.default.prototype.processFiles || void 0 !== e.default.prototype.processAttachments) ? e.default : null) },
                { id: "MediaProcess", conditions: (e) => (e.BLOB ? e : null) },
                { id: "ChatUtil", conditions: (e) => (e.sendClear ? e : null) },
                { id: "GroupInvite", conditions: (e) => (e.queryGroupInviteCode && e.revokeGroupInvite ? e : null) },
                { id: "Wap", conditions: (e) => (e.createGroup ? e : null) },
                { id: "ServiceWorker", conditions: (e) => (e.default && e.default.killServiceWorker ? e : null) },
                { id: "WapDelete", conditions: (e) => (e.sendConversationDelete && 2 === e.sendConversationDelete.length ? e : null) },
                { id: "Conn", conditions: (e) => (e.default && e.default.ref && e.default.refTTL ? e.default : null) },
                { id: "WapQuery", conditions: (e) => (e.default && e.default.contactFindQuery && e.default.queryExist ? e.default : null) },
                { id: "CryptoLib", conditions: (e) => (e.decryptE2EMedia ? e : null) },
                { id: "OpenChat", conditions: (e) => (e.default && e.default.prototype && e.default.prototype.openChat ? e.default : null) },
                { id: "UserConstructor", conditions: (e) => (e.default && e.default.prototype && e.default.prototype.isServer && e.default.prototype.isUser ? e.default : null) },
                { id: "SendTextMsgToChat", conditions: (e) => (e.sendTextMsgToChat ? e.sendTextMsgToChat : null) },
                { id: "Archive", conditions: (e) => (e.setArchive ? e : null) },
                { id: "pinChat", conditions: (e) => (e.setPin ? e : null) },
                { id: "sendDelete", conditions: (e) => (e.sendDelete ? e.sendDelete : null) },
                { id: "addAndSendMsgToChat", conditions: (e) => (e.addAndSendMsgToChat ? e.addAndSendMsgToChat : null) },
                { id: "sendMsgToChat", conditions: (e) => (e.sendMsgToChat ? e.sendMsgToChat : null) },
                { id: "Catalog", conditions: (e) => (e.Catalog ? e.Catalog : null) },
                { id: "Perfil", conditions: (e) => (!0 === e.__esModule && e.setPushname && !e.getComposeContents ? e : null) },
                { id: "MsgKey", conditions: (e) => (e.default && e.default.toString && "function" == typeof e.default.toString && e.default.toString().includes("MsgKey error: obj is null/undefined") ? e.default : null) },
                { id: "Parser", conditions: (e) => (e.convertToTextWithoutSpecialEmojis ? e.default : null) },
                { id: "Builders", conditions: (e) => (e.TemplateMessage && e.HydratedFourRowTemplate ? e : null) },
                { id: "Me", conditions: (e) => (e.Conn && e.ConnImpl ? e.Conn : null) },
                { id: "CallUtils", conditions: (e) => (e.sendCallEnd && e.parseCall ? e : null) },
                { id: "Identity", conditions: (e) => (e.queryIdentity && e.updateIdentity ? e : null) },
                { id: "MyStatus", conditions: (e) => (e.getStatus && e.setMyStatus ? e : null) },
                { id: "ChatStates", conditions: (e) => (e.sendChatStatePaused && e.sendChatStateRecording && e.sendChatStateComposing ? e : null) },
                {
                    id: "GroupActions", conditions: (e) => {
                        return (e.sendExitGroup ? e : null)
                        // return (e.sendExitGroup && e.localExitGroup ? e : null)
                    }
                },
                { id: "Features", conditions: (e) => (e.FEATURE_CHANGE_EVENT && e.features ? e : null) },
                { id: "MessageUtils", conditions: (e) => (e.storeMessages && e.appendMessage ? e : null) },
                { id: "createMessageKey", conditions: (e) => (e.createMessageKey && e.createDeviceSentMessage ? e.createMessageKey : null) },
                { id: "WidFactory", conditions: (e) => (e.isWidlike && e.createWid && e.createWidFromWidLike ? e : null) },
                { id: "Base", conditions: (e) => (e.setSubProtocol && e.binSend && e.actionNode ? e : null) },
                { id: "Base2", conditions: (e) => (e.supportsFeatureFlags && e.parseMsgStubProto && e.binSend && e.subscribeLiveLocation ? e : null) },
                { id: "MaybeMeUser", conditions: (e) => (e.getMaybeMeUser ? e : null) },
                { id: "Sticker", conditions: (e) => (e.StickerCollection && e.default ? e : null) },
                { id: "MediaObject", conditions: (e) => (e.getOrCreateMediaObject && e.disassociateMediaFromStickerPack ? e : null) },
                { id: "MediaUpload", conditions: (e) => (e.default && e.default.mediaUpload ? e.default : null) },
                { id: "UploadUtils", conditions: (e) => (e.default && e.default.encryptAndUpload ? e.default : null) },
                { id: "Cmd", conditions: (e) => (e.CmdImpl && e.Cmd ? e.Cmd : null) },
                { id: "ReadSeen", conditions: (e) => (e.sendSeen ? e : null) },
                { id: "Block", conditions: (e) => (e.blockContact && e.unblockContact ? e : null) },
                { id: "BlockList", conditions: (e) => (e.BlocklistCollection ? e : null) },
                { id: "Theme", conditions: (e) => (e.getTheme && e.setTheme ? e : null) },
                { id: "Vcard", conditions: (e) => (e.vcardFromContactModel ? e : null) },
                { id: "Profile", conditions: (e) => (e.sendSetPicture && e.requestDeletePicture ? e : null) },
                { id: "SendMute", conditions: (e) => (e.sendConversationMute ? e : null) },
                { id: "Validators", conditions: (e) => (e.findLinks ? e : null) },
                { id: "Wap2", conditions: (e) => (e.Wap ? e : null) },
                { id: "genId", conditions: (e) => (e.default && "function" == typeof e.default && e.default.toString().match(/crypto/) ? e : null) },
                { id: "GroupMetadata", conditions: (e) => (e.default && e.default.handlePendingInvite ? e : null) },
                { id: "i10n", conditions: (e) => (e.default && e.default.downloadAppLocale ? e.default : null) },
                { id: "NetworkStatus", conditions: (e) => (e.default && e.default._logOnlineOffline ? e.default : null) },
                { id: "Stream", conditions: (e) => (e.Stream && e.StreamInfo ? e.Stream : null) },
                { id: "State", conditions: (e) => (e.Socket ? e : null) },
                { id: "ws2", conditions: (e) => (e.default && e.default.destroyStorage ? e.default : null) },
                { id: "Login", conditions: (e) => (e.startLogout ? e : null) },
                { id: "BlobCache", conditions: (e) => (e.default && e.default.getOrCreateURL ? e.default : null) },
                { id: "Presence", conditions: (e) => (e.setPresenceAvailable && e.setPresenceUnavailable ? e : null) },
                { id: "PresenceCollection", conditions: (e) => (e.default && e.PresenceCollection ? e.default : null) },
                { id: "chatOptions", conditions: (e) => (e.default && e.default.archiveChat ? e.default : null) },
                { id: "blob", conditions: (e) => (e.default && e.default.createFromData ? e : null) },
                { id: "GroupDesc", conditions: (e) => (e.setGroupDesc ? e : null) },
                { id: "infoGroup", conditions: (e) => (e.queryGroupInviteInfo ? e : null) },
                { id: "GroupTitle", conditions: (e) => (e.sendSetGroupSubject ? e : null) },
                { id: "GroupSettings", conditions: (e) => (e.sendSetGroupProperty ? e : null) },
                { id: "createGroup", conditions: (e) => (e.createGroup && e.sendForNeededAddRequest ? e.createGroup : null) },
                { id: "SetStatusChat", conditions: (e) => (e.markComposing && e.markRecording ? e : null) },
                { id: "Reactions", conditions: (e) => (e.sendReactionToMsg ? e : null) },
                { id: "CheckWid", conditions: (e) => (e.validateWid ? e : null) },
                { id: "ProfileBusiness", conditions: (e) => (e.BUSINESS_URL_DOMAIN ? e : null) },
                { id: "Contacts", conditions: (e) => (e.ContactCollection ? e : null) },
                { id: "onlySendAdmin", conditions: (e) => (e.setGroupProperty && e.setGroupDescription ? e : null) },
                { id: "SendCommunity", conditions: (e) => (e.sendCreateCommunity ? e : null) },
                { id: "Websocket", conditions: (e) => (e.smax ? e : null) },
                { id: "Survey", conditions: (e) => (e.sendPollCreation ? e : null) },
                { id: "Cmd", conditions: (e) => (e.APP_STATE_SYNC_COMPLETED ? e : null) },
                { id: "Wap", conditions: (e) => (e.BIG_ENDIAN_CONTENT ? e : null) },
                { id: "WapParser", conditions: (e) => (e.WapParser ? e : null) },
                { id: "SendSocket", conditions: (e) => (e.deprecatedSendIq ? e : null) },
                { id: "Jid", conditions: (e) => (e.WAP_JID_SUBTYPE ? e : null) },
                { id: "sendDeleteMsgs", conditions: (e) => (e.sendDeleteMsgs ? e.sendDeleteMsgs : null) },
                { id: "sendRevokeMsgs", conditions: (e) => (e.sendRevokeMsgs ? e.sendRevokeMsgs : null) },
                { id: "createNewsletterQuery", conditions: (e) => (e.createNewsletterQuery ? e : null) },
                { id: "userJidToUserWid", conditions: (e) => (e.newsletterJidToWid ? e : null) },
            ];
        },
    },
        t = {};
    function n(i) {
        var a = t[i];
        if (void 0 !== a) return a.exports;
        var o = (t[i] = { exports: {} });
        return e[i].call(o.exports, o, o.exports, n), o.exports;
    }
    (n.d = (e, t) => {
        for (var i in t) n.o(t, i) && !n.o(e, i) && Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
    }),
        (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
        (n.r = (e) => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (() => {
            function e(e, t) {
                try {
                    const n = e.split(",");
                    let i = n[0].match(/(?:data:)?(.*?)(?:;base64)?$/i)[1];
                    i = i.split(/\s+;\s+/).join("; ");
                    const a = window.Base64 ? window.Base64.atob(n[1]) : atob(n[1]);
                    let o = a.length;
                    const r = new Uint8Array(o);
                    for (; o--;) r[o] = a.charCodeAt(o);
                    return new File([r], t, { type: i });
                } catch {
                    return !1;
                }
            }
            var t = n(596);
            async function i(e) {
                let n = await e.arrayBuffer();
                var i = new t("SHA-256", "ARRAYBUFFER");
                return i.update(n), i.getHash("B64");
            }
            function a(e) {
                let t = "";
                for (let n = 0; n < e; n++) t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
                return t;
            }
            const o = { webpack: "webpackChunkwhatsapp_web_client", parasite: Math.random().toString(36).substring(7) },
                r = [
                    { type: "Chat", when: (e) => (e.default && e.default.Chat && e.default.Msg ? e.default.Chat : null) },
                    { type: "MaybeMeUser", when: (e) => (e.getMaybeMeUser ? e : null) },
                    { type: "Participants", when: (e) => (e.addParticipants && e.promoteCommunityParticipants ? e : null) },
                    { type: "checkNumber", when: (e) => (e.queryExist ? e : null) },
                    { type: "checkNumberBeta", when: (e) => (e.queryPhoneExists ? e : null) },
                ];
            async function s(e, t) {
                let n = 0;
                for (let i in t)
                    if (
                        "object" == typeof t[i] &&
                        null !== t[i] &&
                        (e.forEach((e) => {
                            if (!e.when | e.yesModule) return;
                            const a = e.when(t[i]);
                            null !== a && (n++, (e.yesModule = a));
                        }),
                            n == e.length)
                    )
                        break;
                return e;
            }
            async function d(e, t) {
                const n = await WAPI.getChat(e);
                for (; !n.msgs.msgLoadState.noEarlierMsgs;) await n.onEmptyMRM(), await WAPI.sleep(100);
                return t(n), !0;
            }
            async function c(e, t) {
                Array.isArray(t) || (t = [t]);
                const n = new Store.MediaCollection({ chatParticipantCount: e.getParticipantCount() });
                return await n.processAttachments("0.4.613" === Debug.VERSION ? t : t.map((e) => ({ file: e })), e, e), n;
            }
            async function l(t, n, i, a, o, r, s, d = !0, l = !1, u = !0) {
                if (((o = o || "sendFile"), "string" != typeof n || 0 === n.length)) return WAPI.scope(n, !0, null, "incorrect parameter chatid, insert an string.");
                if ("string" != typeof i || 0 === n.length) return WAPI.scope(n, !0, null, "incorrect parameter filename, insert an string");
                if ("string" != typeof a || 0 === n.length) return WAPI.scope(n, !0, null, "incorrect parameter caption, insert an string");
                if ("string" != typeof t || 0 === n.length) return WAPI.scope(n, !0, null, "incorrect parameter file, insert an string");
                var w = t.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
                w && w.length && (w = w[1]);
                const p = d ? await WAPI.sendExist(n) : await WAPI.returnChat(n);
                if (p && 404 != p.status && p.id) {
                    let r = await WAPI.getchatId(p.id).catch(() => WAPI.scope(p.id, !0, 404, "Error to number " + n));
                    r && (p.lastReceivedKey && p.lastReceivedKey._serialized && (p.lastReceivedKey._serialized = r._serialized), p.lastReceivedKey && p.lastReceivedKey.id && (p.lastReceivedKey.id = r.id));
                    const g = { type: o, filename: i, text: a, mimeType: w },
                        h = s ? await window.WAPI.setNewMessageId(s, d) : await window.WAPI.getNewMessageId(p.id._serialized, d);
                    if (!h) return WAPI.scope(p.id, !0, 404, "Error to newId");
                    const y = new Store.WidFactory.createWid(n);
                    await Store.Chat.add({ createdLocally: !0, id: y }, { merge: !0 });
                    const m = await Store.Chat.find(p.id)
                        .then(async (o) => {
                            const r = e(t, i || "file");
                            return await c(o, r)
                                .then(async (e) => {
                                    if ("object" != typeof e || !e._models || !e._models[0]) return WAPI.scope(p.id, !0, 404, "Error to models");
                                    {
                                        const t = e._models[0],
                                            o = await WAPI.encryptAndUploadFile(t.type, r);
                                        if (!1 === o) return WAPI.scope(p.id, !0, 404, "Error to encryptAndUploadFile");
                                        const s = await Store.MaybeMeUser.getMaybeMeUser(),
                                            d = {
                                                id: h,
                                                ack: 0,
                                                from: s,
                                                to: p.id,
                                                local: !0,
                                                self: "out",
                                                t: parseInt(new Date().getTime() / 1e3),
                                                isNewMsg: !0,
                                                invis: !0,
                                                type: t.type,
                                                deprecatedMms3Url: o.url,
                                                directPath: o.directPath,
                                                encFilehash: o.encFilehash,
                                                filehash: o.filehash,
                                                mediaKeyTimestamp: o.mediaKeyTimestamp,
                                                mimetype: t.mimetype,
                                                ephemeralStartTimestamp: o.mediaKeyTimestamp,
                                                mediaKey: o.mediaKey,
                                                size: t.filesize,
                                                caption: a,
                                                filename: i,
                                            };
                                        if (l) {
                                            if (!u) {
                                                const e = await window.Store.addAndSendMsgToChat(p, d);
                                                let t = WAPI.scope(h, !1, WAPI._serializeForcing(e), null);
                                                return Object.assign(t, g), t;
                                            }
                                            for (; ;)
                                                if ("CONNECTED" === window.Store.State.Socket.state) {
                                                    const e = await window.Store.addAndSendMsgToChat(p, d);
                                                    if ((await WAPI.sleep(5e3), 0 !== p.msgs._models.filter((e) => e.id === h._serialized && e.ack > 0).length)) {
                                                        let t = WAPI.scope(h, !1, WAPI._serializeForcing(e), null);
                                                        return Object.assign(t, g), t;
                                                    }
                                                    await WAPI.deleteMessages(n, [h._serialized]);
                                                }
                                        }
                                        try {
                                            return (await Promise.all(window.Store.addAndSendMsgToChat(p, d)))[1];
                                        } catch (e) {
                                            return WAPI.scope(p.id, !0, 404, "The message was not sent");
                                        }
                                    }
                                })
                                .catch((e) => WAPI.scope(p.id, !0, 404, "Error to processFiles"));
                        })
                        .catch(() => WAPI.scope(p.id, !0, 404, "Error to chat not find"));
                    if (!1 === m.erro) return m;
                    if ("success" === m || "OK" === m || "OK" === m.messageSendResult) {
                        var f = WAPI.scope(h, !1, m, null);
                        return Object.assign(f, g), f;
                    }
                    return !0 === m.erro ? m : ((f = WAPI.scope(h, !0, m, null)), Object.assign(f, g), f);
                }
                return p.erro || (p.erro = !0), p;
            }
            async function u(e, t, n, i) {
                const a = await WAPI.sendExist(t);
                if (a.erro) return a;
                {
                    const o = await window.WAPI.getNewMessageId(a.id._serialized),
                        r = await Store.MaybeMeUser.getMaybeMeUser(),
                        s = await WAPI.getchatId(a.id).catch(() => WAPI.scope(a.id, !0, 404, "Error to number " + t));
                    s && (a.lastReceivedKey && a.lastReceivedKey._serialized && (a.lastReceivedKey._serialized = s._serialized), a.lastReceivedKey && a.lastReceivedKey.id && (a.lastReceivedKey.id = s.id));
                    const d = {
                        id: o,
                        ack: 0,
                        encFilehash: e.uploadhash,
                        from: r,
                        to: a.id,
                        local: !0,
                        self: "out",
                        t: parseInt(new Date().getTime() / 1e3),
                        isNewMsg: !0,
                        type: "sticker",
                        deprecatedMms3Url: e.clientUrl,
                        filehash: e.filehash,
                        mediaKey: e.mediaKey,
                        mimetype: "image/webp",
                        height: n && n.height ? n.height : 512,
                        width: n && n.width ? n.width : 512,
                    },
                        c = (await Promise.all(window.Store.addAndSendMsgToChat(a, d)))[1],
                        l = { type: i };
                    if ("success" === c || "OK" === c || "OK" === c.messageSendResult) {
                        const e = WAPI.scope(o, !1, c, null);
                        return Object.assign(e, l), e;
                    }
                    const u = WAPI.scope(o, !0, c, null);
                    return Object.assign(u, l), u;
                }
            }
            async function w(t, n, i, a) {
                const o = e("data:image/webp;base64," + t, "file.webp");
                let r = await window.WAPI.encryptAndUploadFile("sticker", o);
                return await u(r, n, i, a);
            }
            function p(e, t) {
                return void 0 !== e && (void 0 !== t ? new Date(e[2], e[1] - 1, e[0], t[0], t[1]) : new Date(e[2], e[1] - 1, e[0]));
            }
            function f(e) {
                const t = new Date(1e3 * e.timestamp),
                    n = t.toLocaleString(),
                    i = "0" + t.toLocaleString("en-US", { day: "numeric" }),
                    a = "0" + t.toLocaleString("en-US", { month: "numeric" }),
                    o = "0" + t.getUTCMinutes(),
                    r = "0" + t.getSeconds(),
                    s = "0" + t.getHours(),
                    d = {
                        id: e.id,
                        timestamp: t.getTime(),
                        stringdate: n,
                        dateNumeric: { day: i.substr(-2), month: a.substr(-2), year: t.toLocaleString("en-US", { year: "numeric" }), hours: s.substr(-2), minutes: o.substr(-2), seconds: r.substr(-2) },
                        type: e.type,
                        fromMe: e.fromMe,
                    };
                return Object.assign(e, d);
            }
            let g = {};
            const { storeObjects: h } = n(321);
            async function y(e) {
                let t = 0;
                const n = h;
                for (let i in e)
                    if (
                        "object" == typeof e[i] &&
                        null !== e[i] &&
                        (n.forEach((n) => {
                            if (!n.conditions || n.foundedModule) return;
                            let a = n.conditions(e[i]);
                            null !== a && (t++, (n.foundedModule = a), console.log(a));
                        }),
                            t === n.length)
                    )
                        break;
                n.forEach((e) => {
                    e.foundedModule && "module" !== e.id && ((window.Store[e.id] = e.foundedModule), console.log(e.id), console.log(e.foundedModule));
                });
                const i = n.filter((e) => "module" === e.id)[0].foundedModule;
                Object.keys(i).forEach((e) => {
                    ["Chat"].includes(e) || (window.Store[e] ? (window.Store[e + "_"] = i[e]) : (window.Store[e] = i[e]));
                }),
                    window.Store.MediaCollection && (window.Store.MediaCollection.prototype.processFiles = window.Store.MediaCollection.prototype.processFiles || window.Store.MediaCollection.prototype.processAttachments),
                    (window.mR = async (t) =>
                        new Promise((n) => {
                            if (window.__debug) {
                                for (let a in window.getModuleList())
                                    if ("object" == typeof e[a] && null !== e[a]) {
                                        let o = e[a];
                                        var i = o[t] ? o : null;
                                        if (i) return (window[t] = i), n(window[t]);
                                    }
                            } else {
                                const e = `parasite${Date.now()}`;
                                window.webpackChunkwhatsapp_web_client.push([
                                    [e],
                                    {},
                                    function (e) {
                                        let i = [];
                                        for (let t in e.m) i.push(e(t));
                                        for (let e in i)
                                            if ("object" == typeof i[e] && null !== i[e]) {
                                                let o = i[e];
                                                var a = o[t] ? o : null;
                                                if (a) return (window[t] = a), n(window[t]);
                                            }
                                    },
                                ]);
                            }
                        })),
                    (window.injectToFunction = (e, t) => {
                        (async () => {
                            const n = await window.mR(e),
                                i = n[e];
                            n[e] = (...e) => t(i, e);
                        })();
                    }),
                    window.injectToFunction("createMsgProtobuf", (e, t) => {
                        const n = e(...t),
                            [i] = t;
                        if (
                            (n.listMessage && ((n.viewOnceMessage = { message: { listMessage: n.listMessage } }), delete n.listMessage),
                                n.buttonsMessage && ((n.viewOnceMessage = { message: { buttonsMessage: n.buttonsMessage } }), delete n.buttonsMessage),
                                n.templateMessage && ((n.viewOnceMessage = { message: { templateMessage: n.templateMessage } }), delete n.templateMessage),
                                i.hydratedButtons)
                        ) {
                            const e = { hydratedButtons: i.hydratedButtons };
                            if ((i.footer && (e.hydratedFooterText = i.footer), i.caption && (e.hydratedContentText = i.caption), i.title && (e.hydratedTitleText = i.title), n.conversation))
                                (e.hydratedContentText = n.conversation), delete n.conversation;
                            else if (n.extendedTextMessage?.text) (e.hydratedContentText = n.extendedTextMessage.text), delete n.extendedTextMessage;
                            else {
                                let t;
                                const i = ["documentMessage", "imageMessage", "locationMessage", "videoMessage"];
                                for (const e of i)
                                    if (e in n) {
                                        t = e;
                                        break;
                                    }
                                if (!t) return n;
                                (e[t] = n[t]),
                                    e.hydratedTitleText && !e.hydratedContentText && (e.hydratedContentText = e.hydratedTitleText),
                                    delete e.hydratedTitleText,
                                    "locationMessage" === t &&
                                    (e.hydratedContentText || (!n[t].name && !n[t].address) || (e.hydratedContentText = n[t].name && n[t].address ? `${n[t].name}\n${n[t].address}` : n[t].name || n[t].address || "")),
                                    (e.hydratedContentText = e.hydratedContentText || " "),
                                    delete n[t];
                            }
                            n.templateMessage = { hydratedTemplate: e };
                        }
                        return n;
                    }),
                    window.injectToFunction("mediaTypeFromProtobuf", (e, ...t) => {
                        const [n] = t;
                        return n.viewOnceMessage?.message.templateMessage.hydratedTemplate ? e(n.viewOnceMessage?.message.templateMessage.hydratedTemplate) : e(...t);
                    }),
                    window.injectToFunction("typeAttributeFromProtobuf", (e, t) => {
                        const [n] = t;
                        return (
                            console.log("proto", n),
                            n.viewOnceMessage?.message.listMessage ||
                            n.imageMessage ||
                            n.audioMessage ||
                            1 === n.viewOnceMessage?.message?.buttonsMessage?.headerType ||
                            2 === n.viewOnceMessage?.message?.buttonsMessage?.headerType ||
                            n.viewOnceMessage?.message.templateMessage.hydratedTemplate,
                            "text"
                        );
                    }),
                    window.injectToFunction("createFanoutMsgStanza", async (e, t) => {
                        const [, n] = t;
                        let i = null;
                        if (n.viewOnceMessage?.message.listMessage) {
                            const e = n.viewOnceMessage?.message.listMessage?.listType || 0,
                                t = ["unknown", "single_select", "product_list"];
                            i = Store.Websocket.smax("list", { v: "2", type: t[e] });
                        }
                        const a = await e(...t);
                        if (!i) return a;
                        const o = a.content;
                        let r = o.find((e) => "biz" === e.tag);
                        r || ((r = Store.Websocket.smax("biz", {}, null)), o.push(r));
                        let s = !1;
                        return Array.isArray(r.content) ? (s = !!r.content.find((e) => e.tag === i?.tag)) : (r.content = []), s || r.content.push(i), a;
                    });
            }
            function m() {
                if (window.__debug) y(window.getModuleList()).finally();
                else if (window.webpackChunkwhatsapp_web_client && Array.isArray(window.webpackChunkwhatsapp_web_client)) {
                    const e = o.parasite;
                    window[o.webpack].push([
                        [e],
                        {},
                        async function (e) {
                            let t = [];
                            for (let n in e.m) t.push(e(n));
                            await y(t);
                        },
                    ]);
                }
            }
            async function A() {
                return new Promise((e) => {
                    const t = () => {
                        window.__debug
                            ? window.__debug.modulesMap?.WAWebUserPrefsMeUser
                                ? e()
                                : setTimeout(t, 200)
                            : window[o.webpack] && Array.isArray(window[o.webpack]) && window[o.webpack].every((e) => Array.isArray(e) && e.length > 0)
                                ? e()
                                : setTimeout(t, 200);
                    };
                    t();
                });
            }
            (window.Store = {}),
                (window.getModuleList = function () {
                    let e = {};
                    return (
                        Object.keys(window.__debug.modulesMap)
                            .filter((e) => e.includes("WA"))
                            .forEach(function (t) {
                                let n = window.__debug.modulesMap[t];
                                if (n && ((e[t] = { default: n.defaultExport, factory: n.factory }), 0 === Object.keys(e[t].default).length))
                                    try {
                                        self.ErrorGuard.skipGuardGlobal(!0), Object.assign(e[t], self.importNamespace(t));
                                    } catch (e) { }
                            }),
                        e
                    );
                }),
                (async () => {
                    if (window.__debug) await A(), m();
                    else {
                        await A();
                        const e = window[o.webpack].length - 1;
                        !window[o.webpack][e][0].includes(o.parasite) && document.querySelectorAll("#app .two").length && m();
                    }
                })(),
                void 0 === window.WAPI &&
                ((window.WAPI = {}),
                    (window.WAPI.createCommunity = async function (e, t) {
                        try {
                            const n = { name: e, desc: t, closed: !0 };
                            return await window.Store.SendCommunity.sendCreateCommunity(n), !0;
                        } catch {
                            return !1;
                        }
                    }),
                    (window.WAPI.interfaceMute = function (e) {
                        let { attributes: t, expiration: n, id: i, isMuted: a, isState: o, promises: r, stale: s } = e;
                        return { attributes: t, expiration: n, id: i, isMuted: a, isState: o, promises: r, stale: s };
                    }),
                    (window.WAPI.checkIdMessage = async function (e, t) {
                        if ("string" != typeof e) return WAPI.scope(null, !0, 404, "enter the chatId variable as an string");
                        const n = await WAPI.sendExist(e);
                        if (n && 404 != n.status) {
                            if (!(await window.Store.Msg.get(t))) return WAPI.scope(n, !0, 404, `The id ${t} does not exist!`);
                            const e = n.id,
                                i = { type: "checkIdMessage" };
                            let a = WAPI.scope(e, !1, "OK", "");
                            return Object.assign(a, i), a;
                        }
                        return n;
                    }),
                    (window.WAPI.returnReply = async function (e) {
                        return "object" != typeof e ? WAPI.scope(null, !0, 404, "enter the message variable as an object") : !!(e && e.quotedMsg && e.quotedMsg.type && e.quotedMsgObj) && e.quotedMsgObj;
                    }),
                    (window.WAPI.getStore = y),
                    (window.WAPI.setNewMessageId = async function (e, t = !0) {
                        if (e && "object" == typeof e && e.number && e._serialized && e.id) {
                            const n = t ? await WAPI.sendExist(e.number) : await WAPI.returnChat(e.number);
                            if ((delete e.number, n.id)) {
                                const t = new Object();
                                return (t.fromMe = !0), (t.id = e.id), (t.remote = await new Store.WidFactory.createWid(n.id._serialized)), (t._serialized = `${t.fromMe}_${t.remote}_${t.id}`), await new Store.MsgKey(t);
                            }
                            return !1;
                        }
                        return !1;
                    }),
                    (window.WAPI.sendButtons = async function (e, t, n, i) {
                        if ("string" != typeof t || 0 === t.length) return WAPI.scope(e, !0, 404, "It is necessary to write a title!");
                        if ("string" != typeof n || 0 === n.length) return WAPI.scope(e, !0, 404, "It is necessary to write a subtitle!");
                        if (Array.isArray(i) && i.length > 0)
                            for (let t in i)
                                if ("function" != typeof i[t]) {
                                    if (!i[t].buttonText) {
                                        return WAPI.scope(e, !0, 404, "passed object buttonText");
                                    }
                                    if ("object" != typeof i[t].buttonText) {
                                        console.log(i[t], 1212122132)
                                        return WAPI.scope(e, !0, 404, "passed object value in buttonText");
                                    }
                                    if (!i[t].buttonText.displayText) return WAPI.scope(e, !0, 404, "passed object displayText");
                                    if ("string" != typeof i[t].buttonText.displayText) return WAPI.scope(e, !0, 404, "passed string value in displayText");
                                    i[t].buttonId || (i[t].buttonId = `id${t}`), i[t].type || (i[t].type = 1);
                                }
                        const a = await WAPI.sendExist(e);
                        if (a && 404 != a.status && a.id) {
                            const e = await window.WAPI.getNewMessageId(a.id._serialized),
                                s = {
                                    id: e,
                                    ack: 0,
                                    from: await Store.MaybeMeUser.getMaybeMeUser(),
                                    to: a.id,
                                    local: !0,
                                    self: "out",
                                    t: parseInt(new Date().getTime() / 1e3),
                                    isNewMsg: !0,
                                    type: "chat",
                                    body: t,
                                    caption: t,
                                    content: t,
                                    footer: n,
                                    isDynamicReplyButtonsMsg: !0,
                                    isForwarded: !1,
                                    isFromTemplate: !0,
                                    invis: !0,
                                    fromMe: !1,
                                };
                            var o = { dynamicReplyButtons: i };
                            Object.assign(s, o);
                            var r = (await Promise.all(window.Store.addAndSendMsgToChat(a, s)))[1];
                            return "success" === r || "OK" === r || "OK" === r.messageSendResult ? WAPI.scope(e, !1, r, null) : WAPI.scope(e, !0, r, null);
                        }
                        return a;
                    }),
                    (window.WAPI.checkNumberStatus = async function (e, t = !1) {
                        try {
                            const n = { error: 404 },
                                i = window.Store && window.Store.State && window.Store.State.Socket && window.Store.State.Socket.state ? window.Store.State.Socket.state : "",
                                a = WAPI.sendCheckType(e);
                            if (a && 404 === a.status) throw (Object.assign(n, { text: a.text, numberExists: null }), n);
                            if (!0 === t && "CONNECTED" !== i) throw (Object.assign(n, { text: "No connection with WhatsApp", connection: i, numberExists: null }), n);
                            const o = await WAPI.getChat(e);
                            if (o)
                                return await Store.checkNumber
                                    .queryWidExists(o.id)
                                    .then((e) => {
                                        if (e && "object" == typeof e) return { status: 200, numberExists: !0, id: e.wid };
                                        throw Object.assign(n, { connection: i, numberExists: !1, text: "The number does not exist" });
                                    })
                                    .catch((e) => {
                                        if (e.text) throw e;
                                        throw Object.assign(e, { connection: i, numberExists: !1, text: e });
                                    });
                            throw Object.assign(n, { connection: i, numberExists: !1 });
                        } catch (e) {
                            return { status: e.error, text: e.text, numberExists: e.numberExists, connection: e.connection };
                        }
                    }),
                    (window.WAPI.sendCheckType = function (e = void 0) {
                        if (!e) return WAPI.scope(e, !0, 404, "It is necessary to pass a number!");
                        if ("string" == typeof e) {
                            const t = "@c.us",
                                n = "@broadcast",
                                i = "@g.us";
                            if (t !== e.substr(-t.length, t.length) && n !== e.substr(-n.length, n.length) && i !== e.substr(-i.length, i.length))
                                return WAPI.scope(e, !0, 404, "The chat number must contain the parameters @c.us, @broadcast or @g.us. At the end of the number!");
                            if (t === e.substr(-t.length, t.length) && ((e.match(/(@c.us)/g) && e.match(/(@c.us)/g).length > 1) || !e.match(/^(\d+(\d)*@c.us)$/g)))
                                return WAPI.scope(e, !0, 404, "incorrect parameters! Use as an example: 000000000000@c.us");
                            if (n === e.substr(-n.length, n.length) && (e.match(/(@broadcast)/g).length > 1 || (!e.match(/^(\d+(\d)*@broadcast)$/g) && !e.match(/^(status@broadcast)$/g))))
                                return WAPI.scope(e, !0, 404, "incorrect parameters! Use as an example: 0000000000@broadcast");
                            if (i === e.substr(-i.length, i.length) && ((e.match(/(@g.us)/g) && e.match(/(@g.us)/g).length > 1) || !e.match(/^(\d+(-)+(\d)|\d+(\d))*@g.us$/g)))
                                return WAPI.scope(e, !0, 404, "incorrect parameters! Use as an example: 00000000-000000@g.us or 00000000000000@g.us");
                        }
                    }),
                    (window.WAPI.sendListMenu = async function (e, t, n, i, a, o) {
                        if (!t && "string" != typeof t) return WAPI.scope(null, !0, 404, "Enter the title variable as an string");
                        if (!n && "string" != typeof n) return WAPI.scope(null, !0, 404, "Enter the SubTitle variable as an string");
                        if (!i && "string" != typeof i) return WAPI.scope(null, !0, 404, "Enter the description variable as an string");
                        if (!a && "string" != typeof a) return WAPI.scope(null, !0, 404, "Enter the buttonText variable as an string");
                        if (!o && !1 === Array.isArray(o)) return WAPI.scope(null, !0, 404, "Enter the menu variable as an array");
                        for (let e in o)
                            if ("remove" !== e) {
                                if (!o[e].title || "string" != typeof o[e].title || !o[e].title.length) return WAPI.scope(null, !0, 404, "Incorrect Title passed in menu");
                                if (!(o[e].rows && Array.isArray(o[e].rows) && o[e].rows.length)) return WAPI.scope(null, !0, 404, "Rows must be an object array");
                                for (let t in o[e].rows)
                                    if ("remove" !== t) {
                                        if (!o[e].rows[t].title || !o[e].rows[t].title.length) return WAPI.scope(null, !0, 404, "Enter the Title variable as an string");
                                        o[e].rows[t].description && o[e].rows[t].description.length && (o[e].rows[t].rowId || (o[e].rows[t].rowId = `dessert_${t}`));
                                    }
                            }
                        const r = await WAPI.sendExist(e);
                        if (r && 404 != r.status && r.id) {
                            const e = await window.WAPI.getNewMessageId(r.id._serialized),
                                d = await Store.MaybeMeUser.getMaybeMeUser(),
                                c = await WAPI.getchatId(r.id).catch(() => { });
                            c && ((r.lastReceivedKey._serialized = c._serialized), (r.lastReceivedKey.id = c.id));
                            const l = {
                                id: e,
                                ack: 0,
                                from: d,
                                to: r.id,
                                local: !0,
                                self: "out",
                                t: parseInt(new Date().getTime() / 1e3),
                                isNewMsg: !0,
                                invis: !0,
                                footer: n,
                                notifyName: "",
                                type: "list",
                                interactiveAnnotations: !0,
                                interactiveMessage: !0,
                                star: !1,
                                broadcast: !1,
                                fromMe: !1,
                                list: { title: t, description: i, buttonText: a, listType: 1, sections: o },
                            };
                            var s = (await Promise.all(window.Store.addAndSendMsgToChat(r, l)))[1];
                            return "success" === s || "OK" === s || "OK" === s.messageSendResult ? WAPI.scope(e, !1, s, null) : WAPI.scope(e, !0, s, null);
                        }
                        return r;
                    }),
                    (window.WAPI.getStateConnection = function () {
                        return window.Store.State.Socket.state;
                    }),
                    (window.WAPI.sleep = function (e) {
                        try {
                            return new Promise((t) => setTimeout(t, e));
                        } catch (e) { }
                    }),
                    (window.WAPI.isBeta = async function () {
                        return !(window.localStorage.getItem("WASecretBundle") || window.localStorage.getItem("WAToken1") || window.localStorage.getItem("WAToken2"));
                    }),
                    (window.WAPI.setProfilePic = async function (e, t) {
                        t = t ? new Store.WidFactory.createWid(t) : await Store.MaybeMeUser.getMaybeMeUser();
                        let n = "data:image/jpeg;base64,";
                        return await Store.Profile.sendSetPicture(t, n + e.b, n + e.a);
                    }),
                    (window.WAPI.getSessionTokenBrowser = async function () {
                        if (window.localStorage) {
                            var e = await JSON.parse(JSON.stringify(window.localStorage));
                            let { WABrowserId: t, WASecretBundle: n, WAToken1: i, WAToken2: a } = e;
                            return { WABrowserId: t, WASecretBundle: n, WAToken1: i, WAToken2: a };
                        }
                    }),
                    (window.WAPI.scope = async function (e, t, n, i = null) {
                        return { me: await WAPI.getHost(), to: e, erro: t, text: i, status: n };
                    }),
                    (window.WAPI.getchatId = async function (e) {
                        if (e) {
                            let t = await WAPI.getChatById(e);
                            if (t && "object" == typeof t) {
                                let e = t.lastReceivedKey;
                                if (e && "object" == typeof e) {
                                    let n = {
                                        formattedName: t.contact.formattedName,
                                        isBusiness: t.contact.isBusiness,
                                        isMyContact: t.contact.isMyContact,
                                        verifiedName: t.contact.verifiedName,
                                        pushname: t.contact.pushname,
                                        isOnline: t.isOnline,
                                    };
                                    return Object.assign(e, n), e;
                                }
                            }
                        }
                    }),
                    (window.WAPI.sendExist = async function (e, t = !0, n = !0) {
                        const i = await WAPI.sendCheckType(e);
                        if (i && 404 === i.status) return i;
                        let a = await window.WAPI.checkNumberStatus(e, !1);
                        if ((404 === a.status && !e.includes("@g.us") && !e.includes("@broadcast")) || (a && a.text && "function" == typeof a.text.includes && a.text.includes("XmppParsingFailure")))
                            return WAPI.scope(e, !0, a.status, "The number does not exist");
                        const o = new Store.WidFactory.createWid(e);
                        let r = a && a.id && a.id._serialized ? await WAPI.getChat(a.id._serialized) : void 0;
                        if (a.numberExists && void 0 === r) {
                            var s = new Store.UserConstructor(e, { intentionallyUsePrivateConstructor: !0 });
                            const t = new Store.WidFactory.createWid(e);
                            await Store.Chat.add({ createdLocally: !0, id: t }, { merge: !0 }), (r = await Store.Chat.find(s));
                        }
                        if (!r) {
                            const e = await Store.Chat.find(o);
                            e && (r = e && e.id && e.id._serialized ? await WAPI.getChat(e.id._serialized) : void 0);
                        }
                        return a.numberExists || r.t || !r.isUser
                            ? a.numberExists || r.t || !r.isGroup
                                ? !a.numberExists && !r.t && r.id && "status" != r.id.user && r.isBroadcast
                                    ? WAPI.scope(e, !0, a.status, "The transmission list number does not exist on your chat list, or it does not exist at all!")
                                    : r
                                        ? (n && (await window.Store.ReadSeen.sendSeen(r, !1)), t ? r : WAPI.scope(e, !1, 200))
                                        : WAPI.scope(e, !0, 404)
                                : WAPI.scope(e, !0, a.status, "The group number does not exist on your chat list, or it does not exist at all!")
                            : WAPI.scope(e, !0, a.status, "The number does not exist");
                    }),
                    (window.WAPI.returnChat = async function (e, t = !0, n = !0) {
                        const i = WAPI.sendCheckType(e);
                        if (i && 404 === i.status) return i;
                        let a = await WAPI.getChat(e);
                        if (!a) {
                            var o = new Store.UserConstructor(e, { intentionallyUsePrivateConstructor: !0 });
                            const t = new Store.WidFactory.createWid(e);
                            await Store.Chat.add({ createdLocally: !0, id: t }, { merge: !0 }), (a = await Store.Chat.find(o));
                        }
                        if (void 0 === a) {
                            const t = new Store.WidFactory.createWid(e);
                            await Store.Chat.add({ createdLocally: !0, id: t }, { merge: !0 });
                            const n = await Store.Chat.find(e);
                            n && (a = n && n.id && n.id._serialized ? await WAPI.getChat(n.id._serialized) : void 0);
                        }
                        return a ? (n && (await window.Store.ReadSeen.sendSeen(a, !1)), t ? a : WAPI.scope(e, !1, 200)) : WAPI.scope(e, !0, 404);
                    }),
                    (window.WAPI.pinChat = async function (e, t = !0, n = !1) {
                        if ("boolean" != typeof t || "boolean" != typeof n) return WAPI.scope(e, !0, null, "incorrect parameter, insert a boolean true or false");
                        let i,
                            a = t ? "pin" : "unpin";
                        var o = await WAPI.sendExist(e, !0, n);
                        if (o.erro) return o;
                        var r = { type: "pinChat", typefix: a },
                            s = await WAPI.getchatId(o.id);
                        return (
                            await Store.pinChat
                                .setPin(o, t)
                                .then((e) => {
                                    var t = WAPI.scope(s, !1, "OK", null);
                                    Object.assign(t, r), (i = t);
                                })
                                .catch((e) => {
                                    var t = WAPI.scope(s, !0, e, "Pin Chat first");
                                    Object.assign(t, r), (i = t);
                                }),
                            i
                        );
                    }),
                    (window.WAPI.archiveChat = async function (e, t) {
                        const n = await WAPI.sendExist(e);
                        if ("boolean" != typeof t) return WAPI.scope(void 0, !0, null, "Use true to archive or false to unarchive");
                        if (n && 404 != n.status) {
                            const e = await window.chatOptions.archiveChat(n, t);
                            return WAPI.scope(void 0, !1, e, void 0);
                        }
                        return n;
                    }),
                    (window.WAPI.setTheme = async function (e) {
                        return "dark" == e || "light" == e ? (await Store.Theme.setTheme(e), !0) : console.error("Use type dark or light");
                    }),
                    (window.WAPI.getTheme = async function () {
                        return await Store.Theme.getTheme();
                    }),
                    (window.WAPI._serializeRawObj = (e) => (e?.toJSON ? ((e.waveform = null), e.toJSON()) : {})),
                    (window.WAPI._serializeChatObj = (e) =>
                        null == e
                            ? null
                            : Object.assign(window.WAPI._serializeRawObj(e), {
                                kind: e?.kind,
                                isGroup: e?.isGroup,
                                contact: e?.contact ? window.WAPI._serializeContactObj(e?.contact) : null,
                                groupMetadata: e?.groupMetadata ? window.WAPI._serializeRawObj(e?.groupMetadata) : null,
                                presence: e?.presence ? window.WAPI._serializeRawObj(e?.presence) : null,
                                msgs: null,
                                tcToken: null,
                                isOnline: e?.__x_presence?.attributes?.isOnline || null,
                                lastSeen: e?.previewMessage?.__x_ephemeralStartTimestamp ? 1e3 * e.previewMessage.__x_ephemeralStartTimestamp : null,
                            })),
                    (window.WAPI._serializeContactObj = (e) =>
                        null == e
                            ? null
                            : (!e.profilePicThumb && e.id && Store.ProfilePicThumb && (e.profilePicThumb = Store.ProfilePicThumb.get(e.id)),
                                Object.assign(window.WAPI._serializeRawObj(e), {
                                    formattedName: e?.formattedName,
                                    displayName: e?.displayName,
                                    formattedShortName: e?.formattedShortName,
                                    formattedShortNameWithNonBreakingSpaces: e?.formattedShortNameWithNonBreakingSpaces,
                                    isHighLevelVerified: e?.isHighLevelVerified,
                                    isMe: e?.isMe,
                                    mentionName: e?.mentionName,
                                    notifyName: e?.notifyName,
                                    isMyContact: e?.isMyContact,
                                    isPSA: e?.isPSA,
                                    isUser: !!(e?.isUser ?? "c.us" === e?.id?.server),
                                    isVerified: e?.isVerified,
                                    isWAContact: e?.isWAContact,
                                    profilePicThumbObj: e?.profilePicThumb ? WAPI._serializeProfilePicThumb(e?.profilePicThumb) : {},
                                    statusMute: e?.statusMute,
                                    msgs: null,
                                }))),
                    (window.WAPI._serializeMessageObj = async (e) => {
                        if (void 0 === e) return null;
                        const t = e.chat ? await WAPI._serializeChatObj(e.chat) : {};
                        let n = await WAPI.getAllChats();
                        return {
                            ...window.WAPI._serializeRawObj(e),
                            id: e?.id?._serialized,
                            from: e?.from?._serialized,
                            quotedParticipant: e?.quotedParticipant?._serialized ? e?.quotedParticipant?._serialized : void 0,
                            author: e?.author?._serialized ? e?.author?._serialized : void 0,
                            chatId: e?.id?.remote ? e?.id?.remote : e?.chatId?._serialized ? e?.chatId?._serialized : void 0,
                            to: e?.to?._serialized ? e?.to?._serialized : void 0,
                            fromMe: e?.id?.fromMe,
                            sender: e?.senderObj ? await WAPI._serializeContactObj(e?.senderObj) : null,
                            timestamp: e?.t,
                            content: e?.body,
                            body: e?.body,
                            isLink: e?.isLink,
                            isMMS: e?.isMMS,
                            isMedia: e?.isMedia,
                            isNotification: e?.isNotification,
                            isPSA: e?.isPSA,
                            type: e?.type,
                            chat: t,
                            isOnline: t?.isOnline,
                            lastSeen: t?.lastSeen,
                            quotedMsgObj: e?.quotedMsg,
                            quotedStanzaId: e?.quotedStanzaID ? e?.quotedStanzaID : void 0,
                            mediaData: window.WAPI._serializeRawObj(e?.mediaData),
                            caption: e?.caption,
                            deprecatedMms3Url: e?.deprecatedMms3Url,
                            directPath: e?.directPath,
                            encFilehash: e?.encFilehash,
                            filehash: e?.filehash,
                            filename: e?.filename,
                            mimetype: e?.mimetype,
                            clientUrl: e?.clientUrl,
                            mediaKey: e?.mediaKey,
                            size: e?.size,
                            t: e?.t,
                            isNewMsg: e?.isNewMsg,
                            linkPreview: e?.linkPreview,
                            text: e?.text,
                            height: e?.height,
                            width: e?.width,
                            self: e?.self,
                            initialPageSize: e?.initialPageSize,
                            lat: e?.lat ? e.lat : void 0,
                            lng: e?.lng ? e.lng : void 0,
                            ack: e?.ack,
                            scanLengths: null,
                            scansSidecar: null,
                            streamingSidecar: null,
                            waveform: null,
                            replyButtons: null,
                            dynamicReplyButtons: null,
                            buttons: null,
                            hydratedButtons: null,
                            isGroupMsg: "g.us" === e?.to?.server || "g.us" === e?.from?.server,
                            groupInfo: "g.us" === e?.to?.server || "g.us" === e?.from?.server ? n.find((t) => t.id._serialized === e.from._serialized).contact : null,
                            reply: (n) => window.WAPI.reply(t.id._serialized, n, e),
                        };
                    }),
                    (window.WAPI._serializeProfilePicThumb = (e) => (null == e ? null : Object.assign({}, { eurl: e?.eurl, id: e?.id, img: e?.img, imgFull: e?.imgFull, raw: e?.raw, tag: e?.tag }))),
                    (window.WAPI._serializeMeObj = async (e) => {
                        if (null == e) return null;
                        window.Store.State?.Socket?.state && window.Store?.State?.Socket?.state;
                        const t = {};
                        return (
                            Object.assign(t, {
                                id: e.id ? e.id : null,
                                displayName: e.displayName ? e.displayName : null,
                                verifiedName: e.verifiedName ? e.verifiedName : null,
                                searchName: e.searchName ? e.searchName : null,
                                pushname: e.pushname ? e.pushname : null,
                                notifyName: e.notifyName ? e.notifyName : null,
                                isBusiness: e.isBusiness ? e.isBusiness : null,
                                formattedUser: e.formattedUser ? e.formattedUser : null,
                                ...e.profilePicThumb?.attributes,
                                ...e.businessProfile?.attributes,
                            }),
                            console.log(t.id),
                            t
                        );
                    }),
                    (window.WAPI._serializeForcing = (e) => {
                        if (Array.isArray(e) && e.length && e[0] && e[0]._value) {
                            const t = e[0]._value,
                                n = {};
                            return Object.assign(n, { ack: t?.ack, body: t?.body, from: t?.from, id: t?.id, sender: t?.sender }), n;
                        }
                        return null;
                    }),
                    (window.WAPI.onlySendAdmin = async function (e, t) {
                        if (!e.includes("@g.us")) return window.WAPI.scope(e, !0, 404, "The number is not a group");
                        if ("boolean" != typeof t) return window.WAPI.scope(e, !0, 404, "the type must be boolean");
                        const n = await WAPI.sendExist(e);
                        if (!n || 404 == n.status || !n.id) return n.erro || (n.erro = !0), n;
                        try {
                            return await Store.onlySendAdmin.setGroupProperty(n.id, "announcement", t), WAPI.scope(e, !1, 200, "successfully changed");
                        } catch (t) {
                            return WAPI.scope(e, !0, 404, "not changed");
                        }
                    }),
                    (window.WAPI.createGroup = async function (e, t) {
                        return Array.isArray(t) || (t = [t]), !!(t = (t = await Promise.all(t.map((e) => WAPI.sendExist(e)))).filter((e) => !e.erro && e.isUser)).length && (await window.Store.createGroup(e, void 0, void 0, t));
                    }),
                    (window.WAPI.leaveGroup = async function (e) {
                        e = "string" == typeof e ? e : e._serialized;
                        var t = await WAPI.getChat(e);
                        return Store.GroupActions.sendExitGroup(t);
                    }),
                    (window.WAPI.revokeGroupInviteLink = async function (e) {
                        var t = Store.Chat.get(e);
                        return !!t.isGroup && (await Store.GroupInvite.sendRevokeGroupInviteCode(t.id), !0);
                    }),
                    (window.WAPI.getGroupInviteLink = async function (e) {
                        var t = Store.Chat.get(e);
                        return t.isGroup
                            ? (await Store.GroupInvite.queryGroupInviteCode(t.groupMetadata),
                                { groupInviteLink: t?.groupMetadata?.groupInviteLink, inviteCode: t?.groupMetadata?.inviteCode, incognito: t?.groupMetadata?.incognito, id: t?.groupMetadata?.id })
                            : "";
                    }),
                    (window.WAPI.getGroupInfoFromInviteLink = async function (e) {
                        if ("string" == typeof e && !e) return null;
                        const t = e.match(/https:\/\/chat\.whatsapp\.com\/([A-Za-z0-9]+)/),
                            n = t ? t[1] : e,
                            i = await Store.infoGroup.queryGroupInviteInfo(n);
                        return { inGroup: i?.inGroup, membershipApprovalRequest: i?.membershipApprovalRequest, parentGroupSubject: i?.parentGroupSubject, status: i?.status, subject: i?.subject, id: i?.groupMetadata?.id };
                    }),
                    (window.WAPI.getGroupAdmins = async function (e) {
                        if ("string" != typeof e) return WAPI.scope(void 0, !0, null, "Use to groupId string");
                        const t = await WAPI.sendExist(e);
                        if (t && 404 != t.status && t.id) {
                            const t = await window.Store.GroupMetadata.default.models.filter((t) => t.id._serialized === e),
                                n = t.length && t[0].participants ? t[0].participants : void 0;
                            return n
                                ? n
                                    .filter((e) => e.isAdmin)
                                    .map((e) => ({
                                        id: e.id ? e.id : null,
                                        displayName: e.contact && e.contact.displayName ? e.contact.displayName : null,
                                        mentionName: e.contact && e.contact.mentionName ? e.contact.mentionName : null,
                                        notifyName: e.contact && e.contact.notifyName ? e.contact.notifyName : null,
                                        isBusiness: e.contact && e.contact.isBusiness ? e.contact.isBusiness : null,
                                        pushname: e.contact && e.contact.pushname ? e.contact.pushname : null,
                                        isUser: e.contact && e.contact.isUser ? e.contact.isUser : null,
                                        isMyContact: e.contact && e.contact.isMyContact ? e.contact.isMyContact : null,
                                        isMe: e.contact && e.contact.isMe ? e.contact.isMe : null,
                                    }))
                                : WAPI.scope(void 0, !0, null, "Error find Group");
                        }
                        return WAPI.scope(void 0, !0, null, "Group not found");
                    }),
                    (window.WAPI.removeParticipant = async function (e, t, n) {
                        const i = Store.Chat.get(e);
                        if (
                            (Array.isArray(t) || (t = [t]),
                                !(t = (t = await Promise.all(t.map((e) => WAPI.sendExist(e))))
                                    .filter((e) => !e.erro && e.isUser)
                                    .map((e) => i.groupMetadata.participants.get(e.id))
                                    .filter((e) => void 0 !== e)
                                    .map((e) => e.id)).length)
                        )
                            return "function" == typeof n && n(!1), !1;
                        await window.Store.WapQuery.removeParticipants(i.id, t);
                        const a = t.map((e) => i.groupMetadata.participants.get(e));
                        return await window.Store.Participants.removeParticipants(i, a), "function" == typeof n && n(!0), !0;
                    }),
                    (window.WAPI.addParticipant = async function (e, t) {
                        const n = Store.Chat.get(e);
                        if ((Array.isArray(t) || (t = [t]), !(t = await Promise.all(t.map((e) => WAPI.sendExist(e)))).length)) return !1;
                        try {
                            return await Store.Participants.addParticipants(n, t), !0;
                        } catch {
                            return !1;
                        }
                    }),
                    (window.WAPI.promoteParticipant = async function (e, t, n) {
                        const i = Store.Chat.get(e);
                        if (
                            (Array.isArray(t) || (t = [t]),
                                !(t = (t = await Promise.all(t.map((e) => WAPI.sendExist(e))))
                                    .filter((e) => !e.erro && e.isUser)
                                    .map((e) => i.groupMetadata.participants.get(e.id))
                                    .filter((e) => void 0 !== e)
                                    .map((e) => e.id)).length)
                        )
                            return "function" == typeof n && n(!1), !1;
                        const a = t.map((e) => i.groupMetadata.participants.get(e));
                        return await Store.Participants.promoteParticipants(i, a), "function" == typeof n && n(!0), !0;
                    }),
                    (window.WAPI.demoteParticipant = async function (e, t, n) {
                        const i = Store.Chat.get(e);
                        if (
                            (Array.isArray(t) || (t = [t]),
                                !(t = (t = await Promise.all(t.map((e) => WAPI.sendExist(e))))
                                    .filter((e) => !e.erro && e.isUser)
                                    .map((e) => i.groupMetadata.participants.get(e.id))
                                    .filter((e) => void 0 !== e)
                                    .map((e) => e.id)).length)
                        )
                            return "function" == typeof n && n(!1), !1;
                        await window.Store.WapQuery.demoteParticipants(i.id, t);
                        const a = t.map((e) => i.groupMetadata.participants.get(e));
                        return await window.Store.Participants.demoteParticipants(i, a), "function" == typeof n && n(!0), !0;
                    }),
                    (window.WAPI.joinGroup = async function (e) {
                        return await Store.WapQuery.acceptGroupInvite(e);
                    }),
                    (window.WAPI.setGroupDescription = async function (e, t) {
                        if ("string" != typeof t || 0 === t.length) return WAPI.scope(void 0, !0, null, "It is necessary to write a text!");
                        const n = await WAPI.sendExist(e);
                        if (n && 404 != n.status) {
                            const e = { type: "setGroupDescription", description: t },
                                i = await WAPI.getchatId(n.id);
                            return Store.GroupDesc.setGroupDesc(n, t)
                                .then(() => {
                                    const n = WAPI.scope(i, !1, "OK", t);
                                    return Object.assign(n, e), n;
                                })
                                .catch(() => {
                                    const n = WAPI.scope(i, !0, "error", t);
                                    return Object.assign(n, e), n;
                                });
                        }
                        return n;
                    }),
                    (window.WAPI.setPresenceOnline = async function () {
                        return await Store.Presence.setPresenceAvailable(), !0;
                    }),
                    (window.WAPI.setPresenceOffline = async function () {
                        return await Store.Presence.setPresenceUnavailable(), !0;
                    }),
                    (window.WAPI.setGroupTitle = async function (e, t) {
                        if ("string" != typeof t || 0 === t.length) return WAPI.scope(void 0, !0, null, "It is necessary to write a text!");
                        const n = await WAPI.sendExist(e);
                        if (n && 404 != n.status) {
                            const e = { type: "setGroupTitle", title: t },
                                i = await WAPI.getchatId(n.id);
                            return window.Store.GroupTitle.sendSetGroupSubject(n.id, t)
                                .then(() => {
                                    const n = WAPI.scope(i, !1, "OK", t);
                                    return Object.assign(n, e), n;
                                })
                                .catch(() => {
                                    const n = WAPI.scope(i, !0, "error", t);
                                    return Object.assign(n, e), n;
                                });
                        }
                        return n;
                    }),
                    (window.WAPI.setGroupSettings = async function (e, t, n) {
                        if ("string" != typeof t || 0 === t.length) return WAPI.scope(void 0, !0, null, "It is necessary to write a settings!");
                        const i = await WAPI.sendExist(e);
                        if (i && 404 != i.status) {
                            const e = { type: "setGroupSettings", settings: t },
                                a = await WAPI.getchatId(i.id),
                                o = { type: "setGroupSettings", value: n };
                            return window.Store.GroupSettings.sendSetGroupProperty(i.id, t, n)
                                .then(() => {
                                    const t = WAPI.scope(a, !1, "OK", e, o);
                                    return Object.assign(t, e), t;
                                })
                                .catch(() => {
                                    const t = WAPI.scope(a, !0, "error", e, o);
                                    return Object.assign(t, e), t;
                                });
                        }
                        return i;
                    }),
                    (window.WAPI.createNewsletter = async function (e, t, n) {
                        try {
                            let i = { name: e, description: t, picture: n };
                            return await window.Store.createNewsletterQuery.createNewsletterQuery(i);
                        } catch {
                            return !1;
                        }
                    }),
                    (window.WAPI.sendChatstate = async function (e, t) {
                        switch (e) {
                            case "0":
                                await window.Store.ChatStates.sendChatStateComposing(t);
                                break;
                            case "1":
                                await window.Store.ChatStates.sendChatStateRecording(t);
                                break;
                            case "2":
                                await window.Store.ChatStates.sendChatStatePaused(t);
                                break;
                            default:
                                return !1;
                        }
                        return !0;
                    }),
                    (window.WAPI.sendMessageWithThumb = async function (e, t, n, i, a, o) {
                        var r = await WAPI.getChat(a);
                        if (void 0 === r) return void 0 !== o && o(!1), !1;
                        var s = { canonicalUrl: t, description: i, matchedText: t, title: n, thumbnail: e };
                        return r.sendMessage(t, { linkPreview: s, mentionedJidList: [], quotedMsg: null, quotedMsgAdminGroupJid: null }), void 0 !== o && o(!0), !0;
                    }),
                    (window.WAPI.processMessageObj = async function (e, t, n) {
                        return e.isNotification ? (n ? await WAPI._serializeMessageObj(e) : void 0) : !1 === e.id?.fromMe || t ? await WAPI._serializeMessageObj(e) : void 0;
                    }),
                    (window.WAPI.sendMessageWithTags = async function (e, t) {
                        var n = e.id ? e : Store.Chat.get(e),
                            i = n.id._serialized,
                            a = n.msgs.filter((e) => e.__x_isSentByMe)[0];
                        if (!a) return n.sendMessage(t);
                        var o = Object.create(a),
                            r = await window.WAPI.getNewMessageId(n.id._serialized),
                            s = t.match(/@(\d*)/g).map((e) => new Store.WidFactory.createUserWid(e.replace("@", ""))) || void 0,
                            d = { ack: 0, id: r, local: !0, self: "out", t: parseInt(new Date().getTime() / 1e3), to: new Store.WidFactory.createWid(i), isNewMsg: !0, type: "chat", body: t, quotedMsg: null, mentionedJidList: s };
                        return Object.assign(o, d), await Store.addAndSendMsgToChat(n, o), r._serialized;
                    }),
                    (window.WAPI.sendMessage = async function (e, t, n = !1, i, a = !0, o = !1, r = !0) {
                        if (n && t.length > 700) return WAPI.scope(void 0, !0, null, "Use a maximum of 700 characters");
                        if (!1 === n && ("string" != typeof t || 0 === t.length)) return WAPI.scope(void 0, !0, null, "It is necessary to write a text!");
                        if (0 == n && ("string" != typeof e || 0 === e.length)) return WAPI.scope(e, !0, 404, "It is necessary to number");
                        const s = a ? await WAPI.sendExist(e) : await WAPI.returnChat(e);
                        if (!s || 404 == s.status || !s.id) return s.erro || (s.erro = !0), s;
                        {
                            const d = { type: 0 != n ? "sendStatusText" : "sendText", text: t },
                                c = i ? await window.WAPI.setNewMessageId(i, a) : await window.WAPI.getNewMessageId(s.id._serialized, a),
                                l = await Store.MaybeMeUser.getMaybeMeUser();
                            let u = await WAPI.getchatId(s.id).catch(() => WAPI.scope(s.id, !0, 404, "Error to number " + e));
                            if ((u && (s.lastReceivedKey && s.lastReceivedKey._serialized && (s.lastReceivedKey._serialized = u._serialized), s.lastReceivedKey && s.lastReceivedKey.id && (s.lastReceivedKey.id = u.id)), !c))
                                return WAPI.scope(e, !0, 404, "Error to gerate newId");
                            const w = { id: c, ack: 0, body: t, from: l, to: s.id, local: !0, self: "out", t: parseInt(new Date().getTime() / 1e3), isNewMsg: !0, type: "chat" };
                            if (o) {
                                if (!r) {
                                    const e = await Store.addAndSendMsgToChat(s, w);
                                    let n = WAPI.scope(c, !1, WAPI._serializeForcing(e), t);
                                    return Object.assign(n, d), n;
                                }
                                for (; ;)
                                    if ("CONNECTED" === Store.State.Socket.state) {
                                        const n = await Store.addAndSendMsgToChat(s, w);
                                        if ((await WAPI.sleep(5e3), 0 !== s.msgs._models.filter((e) => e.id === c._serialized && e.ack > 0).length)) {
                                            let e = WAPI.scope(c, !1, WAPI._serializeForcing(n), t);
                                            return Object.assign(e, d), e;
                                        }
                                        await WAPI.deleteMessages(e, [c._serialized]);
                                    }
                            }
                            try {
                                const n = (await Promise.all(Store.addAndSendMsgToChat(s, w)))[1];
                                if ("success" === n || "OK" === n || "OK" === n.messageSendResult) {
                                    const e = WAPI.scope(c, !1, n, t);
                                    return Object.assign(e, d), e;
                                }
                                if ("ERROR_UNKNOWN" === n && e.includes("@g.us")) {
                                    const e = WAPI.scope(c, !0, n, "Could not send message to this group, possibly you have been removed");
                                    return Object.assign(e, d), e;
                                }
                            } catch (e) {
                                let t = e;
                                e?.contact?.id && (t = e.contact.id), e?.message && (t.message = e.message);
                                const n = WAPI.scope(c, !0, t, "The message was not sent");
                                return Object.assign(n, d), n;
                            }
                        }
                    }),
                    (window.WAPI.sendMessage2 = async function (e, t, n) {
                        var i = await WAPI.getChat(e);
                        if (void 0 !== i)
                            try {
                                return (
                                    void 0 !== n
                                        ? i.sendMessage(t).then(function () {
                                            n(!0);
                                        })
                                        : i.sendMessage(t),
                                    !0
                                );
                            } catch (e) {
                                return void 0 !== n && n(!1), !1;
                            }
                        return void 0 !== n && n(!1), !1;
                    }),
                    (window.WAPI.deleteConversation = async function (e, t) {
                        let n = new Store.UserConstructor(e, { intentionallyUsePrivateConstructor: !0 }),
                            i = await WAPI.getChat(n);
                        return i
                            ? (window.Store.sendDelete(i, !1)
                                .then(() => {
                                    void 0 !== t && t(!0);
                                })
                                .catch(() => {
                                    void 0 !== t && t(!1);
                                }),
                                !0)
                            : (void 0 !== t && t(!1), !1);
                    }),
                    (window.WAPI.deleteMessages = async function (e, t) {
                        if ("string" != typeof e) return WAPI.scope(null, !0, 404, "enter the chatid variable as an string");
                        const n = await WAPI.sendExist(e);
                        if (n && 404 != n.status) {
                            if (!Array.isArray(t)) return WAPI.scope(n, !0, 404, "enter the message identification variable as an array");
                            for (let n in t)
                                if ("string" == typeof t[n]) {
                                    let i = await WAPI.checkIdMessage(e, t[n]);
                                    if (1 == i.erro) return i;
                                }
                            let a = (await Promise.all(t.map(async (e) => await WAPI.getMessageById(e, null, !1)))).filter((e) => e);
                            const o = n.id,
                                r = { type: "deleteMessages" };
                            let s = [
                                Store.sendRevokeMsgs(
                                    n,
                                    a.filter((e) => e.id._serialized.includes("true")),
                                    !0
                                ),
                                Store.sendDeleteMsgs(
                                    n,
                                    a.filter((e) => e.id._serialized.includes("true")),
                                    !0
                                ),
                            ];
                            try {
                                var i = (await Promise.all(s))[1];
                                if (i >= 0) {
                                    let e = WAPI.scope(o, !1, i, "");
                                    return Object.assign(e, r), e;
                                }
                            } catch (e) {
                                let t = WAPI.scope(null, !0, i, "The message has not been deleted");
                                return Object.assign(t, r), t;
                            }
                            let d = WAPI.scope(o, !0, i, "");
                            return Object.assign(d, r), d;
                        }
                        return n.erro || (n.erro = !0), n;
                    }),
                    (window.WAPI.clearChatMessages = async function (e) {
                        const t = await Store.Chat.get(e);
                        return !!t && (await Store.ChatUtil.sendClear(t, t.lastReceivedKey, !0));
                    }),
                    (window.WAPI.sendImage = function (e, t, n, i, a, o = !1, r) {
                        return l(e, t, n, i, a, 0, r);
                    }),
                    (window.WAPI.sendPtt = async function (t, n, i, a = !0, o = !1, r = !0) {
                        if ("string" == typeof t && !t.length) return WAPI.scope(n, !0, 404, "Audio not foud");
                        const s = a ? await WAPI.sendExist(n) : await WAPI.returnChat(n);
                        if (s && 404 != s.status && s.id) {
                            const d = { type: "sendPtt" };
                            let l = await WAPI.getchatId(s.id).catch(() => WAPI.scope(s.id, !0, 404, "Error to number " + n));
                            l && (s.lastReceivedKey && s.lastReceivedKey._serialized && (s.lastReceivedKey._serialized = l._serialized), s.lastReceivedKey && s.lastReceivedKey.id && (s.lastReceivedKey.id = l.id));
                            const u = i ? await window.WAPI.setNewMessageId(i, a) : await window.WAPI.getNewMessageId(s.id._serialized, a);
                            if (!u) return WAPI.scope(s.id, !0, 404, "Error to newId");
                            const w = new Store.WidFactory.createWid(n);
                            await Store.Chat.add({ createdLocally: !0, id: w }, { merge: !0 });
                            let p = await Store.Chat.find(s.id)
                                .then(async (i) => {
                                    const a = e(t);
                                    return await c(i, a).then(async (e) => {
                                        if ("object" != typeof e || !e._models || !e._models[0]) return WAPI.scope(i.id, !0, 404, "Error to models");
                                        {
                                            const t = e._models[0],
                                                s = await WAPI.encryptAndUploadFile("ptt", a);
                                            if (!1 === s) return WAPI.scope(i.id, !0, 404, "Error to encryptAndUploadFile");
                                            const c = await Store.MaybeMeUser.getMaybeMeUser(),
                                                l = {
                                                    id: u,
                                                    ack: 0,
                                                    from: c,
                                                    to: i.id,
                                                    local: !0,
                                                    self: "out",
                                                    t: parseInt(new Date().getTime() / 1e3),
                                                    isNewMsg: !0,
                                                    invis: !0,
                                                    type: "ptt",
                                                    duration: t?.__x_mediaPrep?._mediaData?.duration,
                                                    deprecatedMms3Url: s.url,
                                                    directPath: s.directPath,
                                                    encFilehash: s.encFilehash,
                                                    filehash: s.filehash,
                                                    mediaKeyTimestamp: s.mediaKeyTimestamp,
                                                    mimetype: t.mimetype,
                                                    ephemeralStartTimestamp: s.mediaKeyTimestamp,
                                                    mediaKey: s.mediaKey,
                                                    size: t.filesize,
                                                };
                                            if (o) {
                                                if (!r) {
                                                    const e = await window.Store.addAndSendMsgToChat(i, l);
                                                    let t = WAPI.scope(u, !1, WAPI._serializeForcing(e), null);
                                                    return Object.assign(t, d), t;
                                                }
                                                for (; ;)
                                                    if ("CONNECTED" === window.Store.State.Socket.state) {
                                                        const e = await window.Store.addAndSendMsgToChat(i, l);
                                                        if ((await WAPI.sleep(5e3), 0 !== i.msgs._models.filter((e) => e.id === u._serialized && e.ack > 0).length)) {
                                                            let t = WAPI.scope(u, !1, WAPI._serializeForcing(e), null);
                                                            return Object.assign(t, d), t;
                                                        }
                                                        await WAPI.deleteMessages(n, [u._serialized]);
                                                    }
                                            }
                                            try {
                                                return (await Promise.all(window.Store.addAndSendMsgToChat(i, l)))[1];
                                            } catch (e) {
                                                return WAPI.scope(i.id, !0, 404, "The message was not sent");
                                            }
                                        }
                                    });
                                })
                                .catch((e) => WAPI.scope(s.id, !0, 404, "Error to chat not find"));
                            if (!1 === p.erro) return p;
                            if ("success" === p || "OK" === p || "OK" === p.messageSendResult) {
                                let e = WAPI.scope(u, !1, p, null);
                                return Object.assign(e, d), e;
                            }
                            if (!0 === p.erro) return p;
                            let f = WAPI.scope(u, !0, p, null);
                            return Object.assign(f, d), f;
                        }
                        return s.erro || (s.erro = !0), s;
                    }),
                    (window.WAPI.sendFile = l),
                    (window.WAPI.setMyName = async function (e) {
                        await window.Store.Perfil.setPushname(e);
                    }),
                    (window.WAPI.setMyStatus = function (e) {
                        return Store.MyStatus.setMyStatus(e);
                    }),
                    (window.WAPI.sendVideoAsGif = async function (t, n, i, a, o) {
                        const r = new Store.WidFactory.createWid(n);
                        return (
                            await Store.Chat.add({ createdLocally: !0, id: r }, { merge: !0 }),
                            Store.Chat.find(r).then((n) => {
                                var r = e(t, i);
                                c(n, r).then((e) => {
                                    var t = e.models[0];
                                    (t.mediaPrep._mediaData.isGif = !0), (t.mediaPrep._mediaData.gifAttribution = 1), t.mediaPrep.sendToChat(n, { caption: a }), void 0 !== o && o(!0);
                                });
                            })
                        );
                    }),
                    (window.WAPI.processFiles = c),
                    (window.WAPI.sendImageWithProduct = function (t, n, i, a, o, r) {
                        Store.Catalog.findCarouselCatalog(a).then(async (a) => {
                            if (a && a[0]) {
                                const s = a[0].productCollection.get(o),
                                    d = {
                                        productMsgOptions: {
                                            businessOwnerJid: s.catalogWid.toString({ legacy: !0 }),
                                            productId: s.id.toString(),
                                            url: s.url,
                                            productImageCount: s.productImageCollection.length,
                                            title: s.name,
                                            description: s.description,
                                            currencyCode: s.currency,
                                            priceAmount1000: s.priceAmount1000,
                                            type: "product",
                                        },
                                        caption: i,
                                    },
                                    l = new Store.WidFactory.createWid(n);
                                return (
                                    await Store.Chat.add({ createdLocally: !0, id: l }, { merge: !0 }),
                                    Store.Chat.find(l).then((n) => {
                                        var i = e(t, s.name);
                                        c(n, i).then((e) => {
                                            var t = e.models[0];
                                            Object.entries(d.productMsgOptions).map(([e, n]) => (t.mediaPrep._mediaData[e] = n)), t.mediaPrep.sendToChat(n, d), void 0 !== r && r(!0);
                                        });
                                    })
                                );
                            }
                        });
                    }),
                    (window.WAPI.sendContactVcard = async function (e, t, n) {
                        if ("string" != typeof e || 0 === e.length) return WAPI.scope(e, !0, 404, "It is necessary to pass the number!");
                        if ("string" != typeof t || 0 === t.length) return WAPI.scope(t, !0, 404, "It is necessary to pass the number!");
                        const i = await WAPI.sendExist(e),
                            a = await WAPI.sendExist(t);
                        if (i && 404 != i.status && i.id && a && 404 != a.status && a.id) {
                            const s = await window.WAPI.getNewMessageId(i.id._serialized);
                            let d = await WAPI.getchatId(i.id).catch(() => WAPI.scope(i.id, !0, 404, "Error to number " + e));
                            if ((d && (i.lastReceivedKey && i.lastReceivedKey._serialized && (i.lastReceivedKey._serialized = d._serialized), i.lastReceivedKey && i.lastReceivedKey.id && (i.lastReceivedKey.id = d.id)), !s))
                                return WAPI.scope(e, !0, 404, "Error to newId");
                            const c = await Store.MaybeMeUser.getMaybeMeUser(),
                                l = await window.Store.Vcard.vcardFromContactModel(a.__x_contact);
                            n = n || a.__x_formattedTitle;
                            const u = { id: s, ack: 0, body: l.vcard, from: c, to: i.id, local: !0, self: "out", t: parseInt(new Date().getTime() / 1e3), isNewMsg: !0, type: "vcard" },
                                w = (await Promise.all(window.Store.addAndSendMsgToChat(i, u)))[1];
                            var o = { from: t, type: "vcard" };
                            if ("success" === w || w || "OK" === w.messageSendResult) {
                                var r = WAPI.scope(s, !1, w, null);
                                return Object.assign(r, o), r;
                            }
                            return (r = WAPI.scope(s, !0, w, null)), Object.assign(r, o), r;
                        }
                        return i;
                    }),
                    (window.WAPI.sendContactVcardList = async function (e, t) {
                        if ("string" != typeof e) return WAPI.scope(e, !0, null, "incorrect parameter, insert an string. Example: '222222222222@c.us'");
                        if (!Array.isArray(t)) return WAPI.scope(e, !0, null, "incorrect parameter, insert an array. Example: ['222222222222@c.us', '333333333333@c.us, ... ]");
                        if (1 === t.length) return WAPI.scope(e, !0, null, "Enter more than one number to send. Example: ['222222222222@c.us', '333333333333@c.us, ... ]");
                        const n = await WAPI.sendExist(e);
                        if (n.erro) return n;
                        {
                            var i = t.map(async (e) => await WAPI.sendExist(e)),
                                a = await Promise.all(i),
                                o = new Array();
                            for (var r in a) "object" == typeof a[r] && o.push(a[r].__x_contact);
                            var s = o.map(async (e) => {
                                if ("object" == typeof e) return await window.Store.Vcard.vcardFromContactModel(e);
                            }),
                                d = await window.WAPI.getNewMessageId(n.id._serialized);
                            const e = await Store.MaybeMeUser.getMaybeMeUser();
                            let p = await WAPI.getchatId(n.id).catch(() => { });
                            p && ((n.lastReceivedKey._serialized = p._serialized), (n.lastReceivedKey.id = p.id));
                            var c = await Promise.all(s);
                            const f = { id: d, ack: 0, from: e, local: !0, self: "in", t: parseInt(new Date().getTime() / 1e3), to: n.id, type: "multi_vcard", vcardList: c, isNewMsg: !0 };
                            var l = (await Promise.all(Store.addAndSendMsgToChat(n, f)))[1] || "",
                                u = { from: t, type: "multi_vcard" };
                            if ("success" === l || "OK" === l || "OK" === l.messageSendResult) {
                                var w = WAPI.scope(d, !1, l, null);
                                return Object.assign(w, u), w;
                            }
                            return (w = WAPI.scope(d, !0, l, null)), Object.assign(w, u), w;
                        }
                    }),
                    (window.WAPI.forwardMessages = async function (e, t, n) {
                        var i = await WAPI.sendExist(e);
                        Array.isArray(t) || (t = [t]);
                        var a = (await Promise.all(t.map(async (e) => await WAPI.getMessageById(e, null, !1)))).filter((e) => !n || !e.__x_isSentByMe),
                            o = { type: "forwardMessages" };
                        return new Promise(async (t, n) => {
                            let r = await window.WAPI.getNewMessageId(i.id._serialized),
                                s = await WAPI.getchatId(i.id).catch(() => { });
                            s && ((i.lastReceivedKey._serialized = s._serialized), (i.lastReceivedKey.id = s.id)),
                                i.id
                                    ? await Promise.each(a, async (t) => {
                                        if (void 0 !== t.erro && !0 === t.erro) {
                                            var a = WAPI.scope(e, !0, null, "message not found");
                                            return Object.assign(a, o), void n(a);
                                        }
                                        let s = await Object.create(i.msgs.filter((e) => e.__x_isSentByMe))[0];
                                        const d = await Store.MaybeMeUser.getMaybeMeUser();
                                        let c = await Object.assign(t),
                                            l = { id: r, ack: 0, from: d, to: i.id, local: !0, self: "out", t: parseInt(new Date().getTime() / 1e3), isNewMsg: !0, isForwarded: !0, forwardingScore: 1, multicast: !0, __x_isSentByMe: !0 };
                                        return Object.assign(s, c), Object.assign(s, l), await Store.addAndSendMsgToChat(i, s);
                                    })
                                        .then(async () => {
                                            var e = WAPI.scope(r, !1, 200, null);
                                            Object.assign(e, o), t(e);
                                        })
                                        .catch(() => {
                                            var e = WAPI.scope(r, !0, 404, null);
                                            Object.assign(e, o), n(e);
                                        })
                                    : n(i);
                        });
                    }),
                    (window.WAPI.reply = async function (e, t, n) {
                        if ("string" != typeof e) return WAPI.scope(null, !0, 404, "enter the chatid variable as an string");
                        if ("string" != typeof t) return WAPI.scope(null, !0, 404, "enter the content variable as an string");
                        if ("string" != typeof n) return WAPI.scope(null, !0, 404, "enter the content variable as an string");
                        const i = await WAPI.sendExist(e);
                        if (i && 404 != i.status) {
                            let a = i.id;
                            const o = { type: "deleteMessages" };
                            let r = {},
                                s = await WAPI.getMessageById(n, null, !1);
                            if (null != s.erro) {
                                let e = WAPI.scope(a, !0, 404, `The id ${n} does not exist!`);
                                return Object.assign(e, o), e;
                            }
                            {
                                let e = await WAPI.checkIdMessage(s.to._serialized, n);
                                if (1 == e.erro) return e;
                            }
                            r = s.msgContextInfo(i);
                            let d = await WAPI.checkIdMessage(e, n);
                            if (1 == d.erro) return d;
                            const c = await window.WAPI.getNewMessageId(i.id._serialized),
                                l = await Store.MaybeMeUser.getMaybeMeUser();
                            let u = await WAPI.getchatId(i.id).catch(() => { });
                            u && ((i.lastReceivedKey._serialized = u._serialized), (i.lastReceivedKey.id = u.id));
                            const w = { id: c, ack: 0, body: t, from: l, to: i.id, local: !0, self: "out", t: parseInt(new Date().getTime() / 1e3), isNewMsg: !0, type: "chat", ...r },
                                p = (await Promise.all(window.Store.addAndSendMsgToChat(i, w)))[1];
                            if ("success" === p || "OK" === p || "OK" === p.messageSendResult) {
                                let e = WAPI.scope(c, !1, p, "");
                                return Object.assign(e, o), e;
                            }
                            {
                                let e = WAPI.scope(c, !0, p, "");
                                return Object.assign(e, o), e;
                            }
                        }
                        return i;
                    }),
                    (window.WAPI._sendSticker = u),
                    (window.WAPI.encryptAndUploadFile = async function (e, t) {
                        try {
                            const n = await i(t),
                                o = a(32),
                                r = new AbortController().signal,
                                s = await window.Store.UploadUtils.encryptAndUpload({ blob: t, type: e, signal: r, mediaKey: o });
                            return { ...s, clientUrl: s.url, filehash: n, id: n, uploadhash: s.encFilehash, mediaBlob: t };
                        } catch {
                            return !1;
                        }
                    }),
                    (window.WAPI.sendImageAsSticker = w),
                    (window.WAPI.sendImageAsStickerGif = w),
                    (window.WAPI.startTyping = async function (e, t = !0) {
                        const n = t ? await WAPI.sendExist(e) : await WAPI.returnChat(e);
                        if (n && 404 != n.status && n.id) {
                            await WAPI.presenceAvailable();
                            const e = await Store.SetStatusChat.markComposing(n);
                            return WAPI.scope(void 0, !1, e);
                        }
                        return n.erro || (n.erro = !0), n;
                    }),
                    (window.WAPI.startRecording = async function (e, t = !0) {
                        const n = t ? await WAPI.sendExist(e) : await WAPI.returnChat(e);
                        if (n && 404 != n.status && n.id) {
                            await WAPI.presenceAvailable();
                            const e = await Store.SetStatusChat.markRecording(n);
                            return WAPI.scope(void 0, !1, e);
                        }
                        return n.erro || (n.erro = !0), n;
                    }),
                    (window.WAPI.markPaused = async function (e, t = !0) {
                        const n = t ? await WAPI.sendExist(e) : await WAPI.returnChat(e);
                        if (n && 404 != n.status && n.id) {
                            await WAPI.presenceAvailable();
                            const e = await Store.SetStatusChat.markPaused(n);
                            return WAPI.scope(void 0, !1, e);
                        }
                        return n.erro || (n.erro = !0), n;
                    }),
                    (window.WAPI.clearPresence = async function (e, t = !0) {
                        const n = t ? await WAPI.sendExist(e) : await WAPI.returnChat(e);
                        if (n && 404 != n.status && n.id) {
                            const e = await Store.SetStatusChat.clearPresence(n);
                            return WAPI.scope(void 0, !1, e);
                        }
                        return n.erro || (n.erro = !0), n;
                    }),
                    (window.WAPI.presenceAvailable = async function () {
                        return await Store.SetStatusChat.sendPresenceAvailable();
                    }),
                    (window.WAPI.presenceUnavailable = async function () {
                        return await Store.SetStatusChat.sendPresenceUnavailable();
                    }),
                    (window.WAPI.sendLocation = async function (e, t, n, i = null) {
                        const a = await WAPI.sendExist(e);
                        if (isNaN(Number(t)) || isNaN(Number(n))) return WAPI.scope(e, !0, null, "latitude and longitude must be numbers");
                        if (a.erro) return a;
                        {
                            const o = await window.WAPI.getNewMessageId(a.id._serialized),
                                r = await WAPI.getchatId(a.id).catch(() => { }),
                                s = await Store.MaybeMeUser.getMaybeMeUser();
                            r && ((a.lastReceivedKey._serialized = r._serialized), (a.lastReceivedKey.id = r.id));
                            const d = {
                                type: "location",
                                ack: 0,
                                from: s,
                                id: await window.WAPI.getNewMessageId(a.id._serialized, e),
                                local: !0,
                                isNewMsg: !0,
                                self: "out",
                                t: parseInt(new Date().getTime() / 1e3),
                                to: a.id,
                                lat: Number(t),
                                lng: Number(n),
                                loc: i,
                            },
                                c = (await Promise.all(Store.addAndSendMsgToChat(a, d)))[1] || "";
                            let l,
                                u = { latitude: t, longitude: n, title: i, type: "location" };
                            return "success" == c || "OK" == c ? ((l = WAPI.scope(o, !1, c, null)), Object.assign(l, u), l) : ((l = WAPI.scope(o, !0, c, null)), Object.assign(l, u), l);
                        }
                    }),
                    (window.WAPI.openChat = async function (e, t = !1) {
                        if (t) {
                            const t = await WAPI.getChat(e),
                                n = await Store.Cmd.openChatBottom(t);
                            return WAPI.scope(void 0, !1, n);
                        }
                        if ("string" != typeof e || 0 === e.length) return WAPI.scope(e, !0, 404, "It is necessary to number");
                        const n = await WAPI.sendExist(e);
                        if (n && 404 != n.status && n.id) {
                            const t = Store.Chat.get(e),
                                n = Store.Cmd.default.openChatBottom(t);
                            return WAPI.scope(void 0, !1, n);
                        }
                        return n.erro || (n.erro = !0), n;
                    }),
                    (window.WAPI.openChatAt = async function (e, t) {
                        const n = Store.Chat.get(e),
                            i = n.msgs.models.find((e) => e.id.id === t),
                            a = { collection: n.msgs, msg: i, isUnreadDivider: !1 };
                        return await Store.Cmd.default._openChat(n, a);
                    }),
                    (window.WAPI.markUnseenMessage = async function (e) {
                        const t = await WAPI.sendExist(e);
                        return t.erro ? WAPI.scope(void 0, !0, "Error", null) : (await Store.ReadSeen.markUnread(t, !0), WAPI.scope(void 0, !1, "OK", null));
                    }),
                    (window.WAPI.markMarkSeenMessage = async function (e) {
                        const t = await WAPI.sendExist(e);
                        return t.erro ? WAPI.scope(void 0, !0, "Error", null) : (await Store.ReadSeen.sendSeen(t, !1), WAPI.scope(void 0, !1, "OK", null));
                    }),
                    (window.WAPI.sendLinkPreview = async function (e, t, n, i, a) {
                        n = n || "";
                        const o = {
                            Protocol: "^(https?:\\/\\/)?",
                            Domain: "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|",
                            IP: "((\\d{1,3}\\.){3}\\d{1,3}))",
                            Port: "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*",
                            Query: "(\\?[;&a-z\\d%_.~+=-]*)?",
                            End: "(\\#[-a-z\\d_]*)?$",
                            Reg: () => new RegExp(o.Protocol + o.Domain + o.IP + o.Port + o.Query + o.End, "i"),
                        };
                        if (!o.Reg().test(t)) return (n = "Use a valid HTTP protocol. Example: https://www.youtube.com/watch?v=V1bFr2SWP1"), WAPI.scope(e, !0, null, n);
                        var r = await WAPI.sendExist(e);
                        if (r.erro) return r;
                        {
                            const e = await window.WAPI.getNewMessageId(r.id._serialized),
                                o = await Store.MaybeMeUser.getMaybeMeUser();
                            let s = await WAPI.getchatId(r.id).catch(() => { });
                            s && ((r.lastReceivedKey._serialized = s._serialized), (r.lastReceivedKey.id = s.id));
                            const d = {
                                id: e,
                                links: await window.Store.Validators.findLink(t),
                                ack: 0,
                                body: i.includes(t) ? i : t + "\n" + i,
                                from: o,
                                to: r.id,
                                local: !0,
                                self: "out",
                                t: parseInt(new Date().getTime() / 1e3),
                                isNewMsg: !0,
                                type: "chat",
                                subtype: "url",
                                preview: !0,
                                disappearingModeInitiator: "chat",
                                thumbnail: a,
                                content: t,
                                canonicalUrl: t,
                                description: t,
                                matchedText: t,
                                title: n,
                            },
                                c = (await Promise.all(window.Store.addAndSendMsgToChat(r, d)))[1];
                            let l = { type: "LinkPreview", url: t, text: n };
                            if ("success" === c || "OK" === c || "OK" === c.messageSendResult) {
                                let t = WAPI.scope(e, !1, c, null);
                                return Object.assign(t, l), t;
                            }
                            {
                                let t = WAPI.scope(e, !0, c, null);
                                return Object.assign(t, l), t;
                            }
                        }
                    }),
                    (window.WAPI.sendMessageOptions = async function (e, t, n = {}) {
                        const i = Store.Chat.get(e);
                        let a = {};
                        n.attachment && ((a = await WWebJS.processMediaData(n.attachment, n.sendAudioAsVoice)), (t = a.preview), delete n.attachment);
                        let o = {};
                        if (n.quotedMessageId) {
                            let e = await WAPI.getMessageById(n.quotedMessageId, null, !1);
                            e && e.canReply() && (o = e.msgContextInfo(i)), delete n.quotedMessageId;
                        }
                        n.mentionedJidList && (n.mentionedJidList = n.mentionedJidList.map((e) => window.Store.Contact.get(e).id));
                        let r = {};
                        n.location && ((r = { type: "location", loc: n.location.description, lat: n.location.latitude, lng: n.location.longitude }), delete n.location);
                        let s = {};
                        if (n.contactCard) {
                            let e = window.Store.Contact.get(n.contactCard);
                            (s = { body: window.Store.VCard.vcardFromContactModel(e).vcard, type: "vcard", vcardFormattedName: e.formattedName }), delete n.contactCard;
                        } else if (n.contactCardList)
                            (s = { type: "multi_vcard", vcardList: n.contactCardList.map((e) => window.Store.Contact.get(e)).map((e) => window.Store.VCard.vcardFromContactModel(e)), body: void 0 }), delete n.contactCardList;
                        else if (n.parseVCards && "string" == typeof t && t.startsWith("BEGIN:VCARD")) {
                            delete n.parseVCards;
                            try {
                                const e = await window.Store.VCard.parseVcard(t);
                                e && (s = { type: "vcard", vcardFormattedName: await window.Store.VCard.vcardGetNameFromParsed(e) });
                            } catch (e) { }
                        }
                        if (n.linkPreview) {
                            delete n.linkPreview;
                            const e = await window.Store.Validators.findLink(t);
                            if (e) {
                                const t = await window.Store.Wap2.default.queryLinkPreview(e.url);
                                (t.preview = !0), (t.subtype = "url"), (n = { ...n, ...t });
                            }
                        }
                        const d = await window.WAPI.getNewMessageId(i.id),
                            c = await Store.MaybeMeUser.getMaybeMeUser(),
                            l = { ...n, id: d, ack: 0, body: t, from: c, to: i.id, local: !0, self: "out", t: parseInt(new Date().getTime() / 1e3), isNewMsg: !0, type: "chat", ...r, ...a, ...o, ...s };
                        return await window.Store.addAndSendMsgToChat(i, l), d._serialized;
                    }),
                    (window.WAPI.getAllMessagesDate = async function e(t, n = "full", i = void 0, a = void 0, o = 10, r = [], s = [], d = !0) {
                        const c = ["higherThan", "equal", "lowerThan", "full"];
                        if (!c.includes(n)) return WAPI.scope(void 0, !0, null, `wrong type! use the types: ${c.join()}`);
                        if (a && void 0 === i) return WAPI.scope(void 0, !0, null, "it is necessary to inform the date field");
                        const l = await WAPI.sendExist(t);
                        if (l && 404 != l.status) {
                            const c = l.msgs.msgLoadState.noEarlierMsgs;
                            !1 === c && (await l.onEmptyMRM());
                            let u,
                                w,
                                g = l.msgs._models;
                            if (void 0 !== a && void 0 !== i) {
                                const e = "string" == typeof a ? a.split(/[:]/) : void 0,
                                    t = "string" == typeof i ? i.split(/[-,/]/) : void 0;
                                if (((u = !!p(t, e) && p(t, e)), !1 === u || isNaN(u))) {
                                    const e = new Date().toLocaleString("en-US", { year: "numeric" });
                                    return WAPI.scope(void 0, !0, null, `Date and time with invalid format! use as an example: data: 01/01/${e} or 01-01-${e} Tima 01:01`);
                                }
                            } else if (void 0 !== i) {
                                const e = "string" == typeof i ? i.split(/[-,/]/) : void 0;
                                if (((u = !!p(e) && p(e)), !1 === u || isNaN(u))) {
                                    const e = new Date().toLocaleString("en-US", { year: "numeric" });
                                    return WAPI.scope(void 0, !0, null, `Date with invalid format! use as an example: 01/01/${e} or 01-01-${e}`);
                                }
                            }
                            g = g.reverse();
                            for (const e in g)
                                if ("remove" !== e && (r.length < o || 0 === o)) {
                                    const t = g[e],
                                        i = await WAPI._serializeMessageObj(t);
                                    if (i.id && !0 === s.includes(i.id)) continue;
                                    "higherThan" === n && parseInt(u.getTime() / 1e3) <= i.timestamp && (w = f(i)),
                                        "equal" === n && parseInt(u.getTime() / 1e3) === i.timestamp && (w = f(i)),
                                        "lowerThan" === n && parseInt(u.getTime() / 1e3) >= i.timestamp && (w = f(i)),
                                        "full" === n && (w = f(i)),
                                        w && !1 === s.includes(w.id) && ((d = !1), s.push(w.id), r.push(w));
                                }
                            return !1 === c && !1 === d && r.length < o ? await e(t, n, i, a, o, r, s, !0) : r;
                        }
                        return l;
                    }),
                    (window.WAPI.sendReactions = async function (e, t = "🐙") {
                        if (!e && e.length && "string" == typeof e) return WAPI.scope(void 0, !0, null, "necessary to pass the id of the message!");
                        const n = await Store.Msg.find(e);
                        return "object" == typeof n ? Store.Reactions.sendReactionToMsg(n, t) : WAPI.scope(void 0, !0, null, "Message id not found!");
                    }),
                    (window.WAPI.addChatWapi = async function () {
                        window.__debug
                            ? ((await s(r, window.getModuleList())).forEach((e) => {
                                e.yesModule && (window.Store[e.type] || (window.Store[e.type] = e.yesModule));
                            }),
                                Store && Store.BusinessProfile && ((Store.Chat._findAndParse = Store.BusinessProfile._findAndParse), (Store.Chat._find = Store.BusinessProfile._find)))
                            : window[o.webpack].push([
                                [o.parasite],
                                {},
                                async function (e) {
                                    let t = [];
                                    for (let n in e.m) t.push(e(n));
                                    (await s(r, t)).forEach((e) => {
                                        e.yesModule && (window.Store[e.type] || (window.Store[e.type] = e.yesModule));
                                    }),
                                        Store && Store.BusinessProfile && ((Store.Chat._findAndParse = Store.BusinessProfile._findAndParse), (Store.Chat._find = Store.BusinessProfile._find));
                                },
                            ]);
                    }),
                    (window.WAPI.sendTypeButtons = async function (e, t, n, i, a) {
                        const o = await WAPI.sendExist(e);
                        if ("string" != typeof t || 0 === t.length) return WAPI.scope(e, !0, 404, "It is necessary to write a text!");
                        let r = 0;
                        if (Array.isArray(a) && a.length > 0)
                            for (let t in a)
                                if ("function" != typeof a[t]) {
                                    console.log(t, 192121)
                                    if (a[t].urlButton) {
                                        if ((r++, !a[t].urlButton)) return WAPI.scope(e, !0, 404, "passed object urlButton");
                                        if ("object" != typeof a[t].urlButton) return WAPI.scope(e, !0, 404, "passed object value in urlButton");
                                        if (!a[t].urlButton.displayText) return WAPI.scope(e, !0, 404, "passed object displayText");
                                        if ("string" != typeof a[t].urlButton.displayText) return WAPI.scope(e, !0, 404, "passed string value in displayText");
                                        if (!a[t].urlButton.url) return WAPI.scope(e, !0, 404, "passed object url");
                                        if ("string" != typeof a[t].urlButton.url) return WAPI.scope(e, !0, 404, "passed string value in url");
                                    }
                                    if (a[t].callButton) {
                                        if ((r++, !a[t].callButton)) return WAPI.scope(e, !0, 404, "passed object callButton");
                                        if ("object" != typeof a[t].callButton) return WAPI.scope(e, !0, 404, "passed object value in callButton");
                                        if (!a[t].callButton.displayText) return WAPI.scope(e, !0, 404, "passed object displayText");
                                        if ("string" != typeof a[t].callButton.displayText) return WAPI.scope(e, !0, 404, "passed string value in displayText");
                                        if (!a[t].callButton.phoneNumber) return WAPI.scope(e, !0, 404, "passed object phoneNumber");
                                        if ("string" != typeof a[t].callButton.phoneNumber) return WAPI.scope(e, !0, 404, "passed string value in phoneNumber");
                                    }
                                    if (a[t].quickReplyButton) {
                                        if ((r++, !a[t].quickReplyButton)) return WAPI.scope(e, !0, 404, "passed object quickReplyButton");
                                        if ("object" != typeof a[t].quickReplyButton) return WAPI.scope(e, !0, 404, "passed object value in quickReplyButton");
                                        if (!a[t].quickReplyButton.displayText) return WAPI.scope(e, !0, 404, "passed object displayText");
                                        if ("string" != typeof a[t].quickReplyButton.displayText) return WAPI.scope(e, !0, 404, "passed string value in displayText");
                                        a[t].quickReplyButton.id || (a[t].quickReplyButton.id = `id${t}`);
                                    }
                                }
                        if (0 === r) return WAPI.scope(e, !0, 404, "button type not specified!");
                        if (o && 404 != o.status && o.id) {
                            const e = await window.WAPI.getNewMessageId(o.id._serialized),
                                r = await Store.MaybeMeUser.getMaybeMeUser(),
                                d = new Store.TemplateButtonCollection(),
                                c = {
                                    from: r,
                                    id: e,
                                    ack: 0,
                                    to: o.id,
                                    local: !0,
                                    self: "out",
                                    isNewMsg: !0,
                                    t: parseInt(new Date().getTime() / 1e3),
                                    type: "chat",
                                    isQuotedMsgAvailable: !0,
                                    isFromTemplate: !0,
                                    footer: i,
                                    body: t,
                                    buttons: d,
                                    __x_title: n,
                                    hydratedButtons: a,
                                };
                            c.buttons.add(
                                c.hydratedButtons.map((e, t) => {
                                    const n = `${null != e.index ? e.index : t}`;
                                    return e.quickReplyButton
                                        ? new Store.templateButton({ id: n, displayText: e.quickReplyButton.displayText, selectionId: e.quickReplyButton.id, subtype: "quick_reply" })
                                        : e.urlButton
                                            ? new Store.templateButton({ id: n, displayText: e.urlButton.displayText, url: e.urlButton?.url, subtype: "url" })
                                            : e.callButton
                                                ? new Store.templateButton({ id: n, displayText: e.callButton.displayText, phoneNumber: e.callButton.phoneNumber, subtype: "call" })
                                                : void 0;
                                })
                            );
                            var s = (await Promise.all(window.Store.addAndSendMsgToChat(o, c)))[1];
                            return "success" === s || "OK" === s || "OK" === s.messageSendResult ? WAPI.scope(e, !1, s, null) : WAPI.scope(e, !0, s, null);
                        }
                        return o;
                    }),
                    (window.WAPI.sendPollCreation = async function (e, t) {
                        if ("object" != typeof t) return WAPI.scope(e, !0, 404, "poll must be an object");
                        if (!t?.name) return WAPI.scope(e, !0, 404, "Missing object name");
                        if (!t?.options) return WAPI.scope(e, !0, 404, "Missing object options");
                        if ("number" != typeof t.selectableOptionsCount || (1 !== t.selectableOptionsCount && 0 !== t.selectableOptionsCount)) return WAPI.scope(e, !0, 404, "Error checking selectableOptionsCount!");
                        const n = t.options;
                        if (Array.isArray(n) && n.length > 0)
                            for (let t in n)
                                if ("function" != typeof n[t]) {
                                    if (!n[t].name) return WAPI.scope(e, !0, 404, "Missing object name");
                                    if ("string" != typeof n[t].name) return WAPI.scope(e, !0, 404, "Passed string value in name");
                                }
                        const i = await WAPI.sendExist(e);
                        return i && 404 !== i.status && i.id ? (await Store.Survey.sendPollCreation({ chat: i, poll: t, quotedMsg: null }), { error: !1, lastReceivedKey: i.lastReceivedKey }) : (i.error || (i.error = !0), i);
                    }),
                    (window.WAPI.blockContact = async function (e) {
                        if (!e) return !1;
                        const t = window.Store.Contact.get(e);
                        return void 0 !== t && (await Store.Block.blockContact(t), !0);
                    }),
                    (window.WAPI.unblockContact = async function (e) {
                        if (!e) return !1;
                        const t = window.Store.Contact.get(e);
                        return void 0 !== t && (await Store.Block.unblockContact(t), !0);
                    }),
                    (window.WAPI.getBlockList = async function () {
                        let e = await Store.Blocklist,
                            t = [];
                        if (void 0 !== e && void 0 !== e._index) {
                            for (let n in e._index) t.push(n);
                            return t;
                        }
                        return !1;
                    }),
                    (window.WAPI.getAllContacts = function () {
                        return Store.Contact.map((e) => WAPI._serializeContactObj(e)).filter((e) => !0 === e.isUser);
                    }),
                    (window.WAPI.getMyContacts = function (e) {
                        const t = window.Store.Contact.filter((e) => !0 === e.isMyContact).map((e) => WAPI._serializeContactObj(e));
                        return void 0 !== e && e(t), t;
                    }),
                    (window.WAPI.getContact = function (e, t) {
                        const n = window.Store.Contact.get(e);
                        return void 0 !== t && t(window.WAPI._serializeContactObj(n)), window.WAPI._serializeContactObj(n);
                    }),
                    (window.WAPI.getAllChats = async function (e) {
                        const t = await Store.MaybeMeUser.getMaybeMeUser();
                        if (t) {
                            const n = await WAPI.sendExist(t._serialized);
                            if (n && 404 !== n.status) {
                                const t = window.Store.Chat.map((e) => WAPI._serializeChatObj(e));
                                return void 0 !== e && e(t), t;
                            }
                        }
                    }),
                    (window.WAPI.getAllChatIds = function (e) {
                        const t = window.Store.Chat.map((e) => e.id._serialized || e.id);
                        return void 0 !== e && e(t), t;
                    }),
                    (window.WAPI.getAllChatsWithMessages = async function (e) {
                        const t = [];
                        e ? t.push(WAPI.getAllChatsWithNewMsg().map(async (e) => await WAPI.getChat(e.id._serialized))) : t.push(WAPI.getAllChatIds().map(async (e) => await WAPI.getChat(e)));
                        const n = (await Promise.all(t)).flatMap((e) => e),
                            i = JSON.stringify(n);
                        return JSON.parse(i);
                    }),
                    (window.WAPI.getAllGroups = function (e) {
                        const t = window.Store.Chat.filter((e) => e.isGroup);
                        return void 0 !== e && e(t), t;
                    }),
                    (window.WAPI.getChat = async function (e) {
                        if (!e) return !1;
                        e = "string" == typeof e ? e : e._serialized;
                        let t = Store.Chat.get(e);
                        if (!t && Store.CheckWid.validateWid(e)) {
                            const n = new window.Store.UserConstructor(e, { intentionallyUsePrivateConstructor: !0 }),
                                i = new Store.WidFactory.createWid(e);
                            await Store.Chat.add({ createdLocally: !0, id: i }, { merge: !0 }), (t = Store.Chat.find(n) || !1);
                        }
                        return (
                            t &&
                            (t.sendMessage = t.sendMessage
                                ? t.sendMessage
                                : function () {
                                    return window.Store.sendMessage.apply(this, arguments);
                                }),
                            t
                        );
                    }),
                    (window.WAPI.getStatus = async function (e) {
                        return await Store.MyStatus.getStatus(e);
                    }),
                    (window.WAPI.getChatByName = function (e, t) {
                        const n = Store.Chat.find((t) => t.name === e);
                        return void 0 !== t && t(n), n;
                    }),
                    (window.WAPI.getNewId = function () {
                        for (var e = "", t = 0; t < 16; t++) e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
                        return e;
                    }),
                    (window.WAPI.getChatById = async function (e) {
                        try {
                            if (e) {
                                let t = await WAPI.getChat(e);
                                if (t) return WAPI._serializeChatObj(t);
                            }
                            throw !1;
                        } catch {
                            return !1;
                        }
                    }),
                    (window.WAPI.loadEarlierMessages = async function (e) {
                        const t = await WAPI.getChat(e);
                        if (t) {
                            const e = await t.onEmptyMRM();
                            if (e) {
                                const t = await WAPI._serializeMessageObj;
                                return e.map(t);
                            }
                        }
                        return !1;
                    }),
                    (window.WAPI.loadAllEarlierMessages = d),
                    (window.WAPI.asyncLoadAllEarlierMessages = function (e, t) {
                        d(e), t();
                    }),
                    (window.WAPI.areAllMessagesLoaded = async function (e, t) {
                        return (await WAPI.getChat(e)).msgs.msgLoadState.noEarlierMsgs ? (t && t(!0), !0) : (t && t(!1), !1);
                    }),
                    (window.WAPI.loadEarlierMessagesTillDate = async function (e, t, n) {
                        const i = await WAPI.getChat(e),
                            a = function () {
                                i.msgs.models[0].t > t && !i.msgs.msgLoadState.noEarlierMsgs ? i.onEmptyMRM().then(a) : n();
                            };
                        a();
                    }),
                    (window.WAPI.getAllGroupMetadata = function (e) {
                        const t = window.Store.GroupMetadata.map((e) => e.attributes);
                        return void 0 !== e && e(t), t;
                    }),
                    (window.WAPI.getGroupParticipant = async function (e, t = 1e3) {
                        if ("string" != typeof e) return WAPI.scope(void 0, !0, null, "Use to groupId string");
                        const n = await WAPI.sendExist(e);
                        if (n && 404 != n.status && n.id) {
                            const t = await window.Store.GroupMetadata._models.filter((t) => t.id._serialized === e),
                                n = t.length && t[0].participants ? t[0].participants : void 0;
                            return n
                                ? n.map((e) => ({
                                    id: e.id,
                                    displayName: e.contact && e.contact.displayName ? e.contact.displayName : null,
                                    mentionName: e.contact && e.contact.mentionName ? e.contact.mentionName : null,
                                    notifyName: e.contact && e.contact.notifyName ? e.contact.notifyName : null,
                                    isBusiness: e.contact && e.contact.isBusiness ? e.contact.isBusiness : null,
                                    pushname: e.contact && e.contact.pushname ? e.contact.pushname : null,
                                    isUser: e.contact && e.contact.isUser ? e.contact.isUser : null,
                                    isMyContact: e.contact && e.contact.isMyContact ? e.contact.isMyContact : null,
                                    isMe: e.contact && e.contact.isMe ? e.contact.isMe : null,
                                }))
                                : WAPI.scope(void 0, !0, null, "Error find Group");
                        }
                        return WAPI.scope(void 0, !0, null, "Group not found");
                    }),
                    (window.WAPI.getAllMessagesInChat = async function (e, t = !0, n = !0, i) {
                        const a = "string" == typeof e && (await WAPI.getChat(e));
                        if (a && "boolean" == typeof t && "boolean" == typeof n) {
                            let e = [];
                            const o = a.msgs._models;
                            for (const i in o) {
                                if ("remove" === i) continue;
                                const a = o[i];
                                let r = await WAPI.processMessageObj(a, t, n);
                                r && e.push(r);
                            }
                            return void 0 !== i && i(e), e;
                        }
                        return await WAPI.sendExist(e);
                    }),
                    (window.WAPI.loadAndGetAllMessagesInChat = async function (e, t, n) {
                        return new Promise((i) => {
                            WAPI.loadAllEarlierMessages(e, async (e) => {
                                let a = [];
                                const o = e.msgs._models;
                                for (const e in o) {
                                    if ("remove" === e) continue;
                                    const i = o[e];
                                    let r = await WAPI.processMessageObj(i, t, n);
                                    r && a.push(r);
                                }
                                i(a);
                            });
                        });
                    }),
                    (window.WAPI.getUnreadMessages = async function (e = !0) {
                        const t = [];
                        let n;
                        n = e ? await Store.Chat.filter((e) => e.unreadCount > 0) : await Store.Chat.filter((e) => e.unreadCount <= 0);
                        for (const e of n) {
                            const n = e.msgs._models.slice(-e.unreadCount);
                            for (const e of n) {
                                const n = await WAPI.processMessageObj(e, !0, !0);
                                n && t.push(n);
                            }
                        }
                        return t;
                    }),
                    (window.WAPI.getCommonGroups = async function (e, t) {
                        let n = [],
                            i = window.WAPI.getAllGroups();
                        for (let t in i)
                            try {
                                (await window.WAPI.getGroupParticipant(i[t].id)).filter((t) => t == e).length && n.push(i[t]);
                            } catch (e) {
                                console.log("Error in group:"), console.log(i[t]), console.log(e);
                            }
                        return void 0 !== t && t(n), n;
                    }),
                    (window.WAPI.getProfilePicFromServer = async function (e) {
                        return await Store.WapQuery.profilePicFind(e).then((e) => e.eurl);
                    }),
                    (window.WAPI.downloadFile = async function (e) {
                        return await new Promise((t, n) => {
                            let i = new XMLHttpRequest();
                            (i.onload = function () {
                                if (4 == i.readyState)
                                    if (200 == i.status) {
                                        let e = new FileReader();
                                        e.readAsDataURL(i.response),
                                            (e.onload = function (n) {
                                                t(e.result.substr(e.result.indexOf(",") + 1));
                                            });
                                    } else console.error(i.statusText);
                                else t(!1);
                            }),
                                i.open("GET", e, !0),
                                (i.responseType = "blob"),
                                i.send(null);
                        });
                    }),
                    (window.WAPI.downloadMedia = async function e(t) {
                        const n = await WAPI.getMessageById(t, null, !1);
                        if (!n) throw { error: !0, code: "message_not_found", message: "Message not found" };
                        if (!n.mediaData) throw { error: !0, code: "message_not_contains_media", message: "Message not contains media" };
                        await n.downloadMedia(!0, 1);
                        let i = null;
                        if ((n.mediaData.mediaBlob ? (i = n.mediaData.mediaBlob.forceToBlob()) : n.mediaData.filehash && (i = Store.BlobCache.get(n.mediaData.filehash)), !i && n.mediaObject.type && "VIDEO" === n.mediaObject.type))
                            return delete n.mediaObject.type, (n.type = "document"), e(t);
                        if (!i) throw { error: !0, code: "media_not_found", message: "Media not found" };
                        return await new Promise((e, t) => {
                            let n = new FileReader();
                            (n.onloadend = function (t) {
                                e(n.result);
                            }),
                                (n.onabort = t),
                                (n.onerror = t),
                                n.readAsDataURL(i);
                        });
                    }),
                    (window.WAPI.getNumberProfile = async function (e) {
                        if ("string" != typeof e || 0 === e.length) return WAPI.scope(e, !0, 404, "It is necessary to number");
                        const t = await WAPI.sendExist(e);
                        if (t && 404 != t.status && t.id) {
                            const e = await Store.MyStatus.getStatus(t);
                            return await WAPI._serializeMeObj(e);
                        }
                        return t.erro || (t.erro = !0), t;
                    }),
                    (window.WAPI.getMessageById = async function (e, t, n = !0) {
                        let i = window.Store.Msg.get(e),
                            a = { erro: !0 };
                        if (!i) {
                            const t = window.Store.Chat.get(e.remote);
                            if (!t) return a;
                            if ((await t.onEmptyMRM(), await WAPI.sleep(100), (i = window.Store.Msg.get(e)), !i)) {
                                const n = t.getSearchContext(e);
                                n && n.collection && n.collection.loadAroundPromise && (await n.collection.loadAroundPromise), (i = window.Store.Msg.get(e));
                            }
                        }
                        if (!i) return a;
                        let o = a;
                        if (n)
                            try {
                                o = await WAPI.processMessageObj(i, !0, !0);
                            } catch (e) { }
                        else o = i;
                        if ("function" != typeof t) return o;
                        t(o);
                    }),
                    (window.WAPI.getNewMessageId = async function (e, t = !0) {
                        const n = t ? await WAPI.sendExist(e) : await WAPI.returnChat(e);
                        if (n.id) {
                            const e = new Object();
                            return (e.fromMe = !0), (e.id = await WAPI.getNewId().toUpperCase()), (e.remote = new Store.WidFactory.createWid(n.id._serialized)), (e._serialized = `${e.fromMe}_${e.remote}_${e.id}`), new Store.MsgKey(e);
                        }
                        return !1;
                    }),
                    (window.WAPI.getFileHash = i),
                    (window.WAPI.generateMediaKey = a),
                    (window.WAPI.arrayBufferToBase64 = function (e) {
                        for (var t, n = "", i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = new Uint8Array(e), o = a.byteLength, r = o % 3, s = o - r, d = 0; d < s; d += 3)
                            n += i[(16515072 & (t = (a[d] << 16) | (a[d + 1] << 8) | a[d + 2])) >> 18] + i[(258048 & t) >> 12] + i[(4032 & t) >> 6] + i[63 & t];
                        return 1 == r ? (n += i[(252 & (t = a[s])) >> 2] + i[(3 & t) << 4] + "==") : 2 == r && (n += i[(64512 & (t = (a[s] << 8) | a[s + 1])) >> 10] + i[(1008 & t) >> 4] + i[(15 & t) << 2] + "="), n;
                    }),
                    (window.WAPI.getListMute = async function (e = "all") {
                        var t = (await window.Store.Mute)._models,
                            n = new Array(),
                            i = new Array();
                        for (var a in t) t[a].__x_isMuted ? i.push(WAPI.interfaceMute(t[a])) : n.push(WAPI.interfaceMute(t[a]));
                        var o = null;
                        switch ((console.log(0, e), e)) {
                            case "all":
                                o = [{ total: i.length + n.length, amountToMute: i.length, amountnoMute: n.length }, i, n];
                                break;
                            case "toMute":
                                o = [{ total: i.length }, i];
                                break;
                            case "noMute":
                                o = [{ total: n.length }, n];
                        }
                        return o;
                    }),
                    (window.WAPI.getHost = async function () {
                        const e = await Store.MaybeMeUser.getMaybeMeUser();
                        if (e) {
                            const t = await WAPI.sendExist(e._serialized);
                            if (t && 404 !== t.status) {
                                const t = await Store.Contacts.ContactCollection.get(e._serialized);
                                if (t) return await WAPI._serializeMeObj(t);
                            }
                        }
                    }),
                    (window.WAPI.getMe = function (e) {
                        const t = window.Store.Contact.get(window.Store.Conn.me);
                        return void 0 !== e && e(t.all), t.all;
                    }),
                    (window.WAPI.isConnected = function (e) {
                        const t = null == document.querySelector('[data-testid="alert-phone"]') && null == document.querySelector('[data-testid="alert-computer"]');
                        return void 0 !== e && e(t), t;
                    }),
                    (window.WAPI.isLoggedIn = function (e) {
                        const t = window.Store.Contact && window.Store.Contact.length > 0;
                        return void 0 !== e && e(t), t;
                    }),
                    (window.WAPI.getBatteryLevel = function () {
                        return Store.Me && Store.Me.battery ? Store.Me.battery : void 0;
                    }),
                    (window.WAPI.base64ImageToFile = e),
                    (window.WAPI.base64ToFile = e),
                    (window.WAPI.restartService = async function () {
                        return await Store.ServiceWorker.default.restart(), !0;
                    }),
                    (window.WAPI.killServiceWorker = async function () {
                        return await Store.ServiceWorker.default.killServiceWorker(), !0;
                    }),
                    (window.WAPI.sendMute = async function (e, t, n) {
                        var i = await WAPI.sendExist(e);
                        if (i.erro) return i;
                        {
                            let e = null;
                            var a,
                                o = null,
                                r = null,
                                s = await WAPI.getchatId(i.id),
                                d = await window.Store.Mute.get(i.id),
                                c = { type: "sendMute", time: t, timeType: n };
                            if ("number" == typeof t && "string" == typeof n) {
                                switch (n) {
                                    case "hours":
                                        e = parseInt(new Date(new Date().setHours(new Date().getHours() + t)).getTime() / 1e3);
                                        break;
                                    case "minutes":
                                        e = parseInt(new Date(new Date().setMinutes(new Date().getMinutes() + t)).getTime() / 1e3);
                                        break;
                                    case "year":
                                        e = parseInt(new Date(new Date().setDate(new Date().getDate() + t)).getTime() / 1e3);
                                }
                                await window.Store.SendMute.sendConversationMute(i.id, e, 0)
                                    .then((e) => {
                                        o = e;
                                    })
                                    .catch((e) => {
                                        o = e;
                                    });
                            } else
                                (r = !0),
                                    await window.Store.SendMute.sendConversationMute(i.id, 0, d.__x_expiration)
                                        .then((e) => {
                                            o = e;
                                        })
                                        .catch((e) => {
                                            o = e;
                                        });
                            if (200 === o.status) {
                                r ? ((d.__x_expiration = 0), (d.__x_isMuted = !1)) : ((d.__x_expiration = e), (d.__x_isMuted = !0));
                                var l = WAPI.scope(s, !1, o.status, null);
                                return Object.assign(l, c), l;
                            }
                            return (a = r ? "is not mute to remove" : "This chat is already mute"), (l = WAPI.scope(s, !0, o.status, a)), Object.assign(l, c), l;
                        }
                    }),
                    (window.WAPI._newMessagesQueue = []),
                    (window.WAPI._newMessagesBuffer = null != sessionStorage.getItem("saved_msgs") ? JSON.parse(sessionStorage.getItem("saved_msgs")) : []),
                    (window.WAPI._newMessagesDebouncer = null),
                    (window.WAPI._newMessagesCallbacks = []),
                    window.addEventListener("unload", window.WAPI._unloadInform, !1),
                    window.addEventListener("beforeunload", window.WAPI._unloadInform, !1),
                    window.addEventListener("pageunload", window.WAPI._unloadInform, !1),
                    (window.WAPI.sendMessageMentioned = async function (e, t, n) {
                        Array.isArray(n) || (n = [n]);
                        const i = await WAPI.getChat(e),
                            a = await Store.Contact.serialize().filter((e) => n.includes(e.id.user));
                        i.sendMessage(t, { linkPreview: null, mentionedJidList: a.map((e) => e.id), quotedMsg: null, quotedMsgAdminGroupJid: null });
                    }),
                    (window.WAPI.getProfilePicSmallFromId = async function (e) {
                        return await window.Store.ProfilePicThumb.find(e).then(
                            async function (e) {
                                return void 0 !== e.img && (await window.WAPI.downloadFileWithCredentials(e.img));
                            },
                            function (e) {
                                return !1;
                            }
                        );
                    }),
                    (window.WAPI.getProfilePicFromId = async function (e) {
                        return await window.Store.ProfilePicThumb.find(e).then(
                            async function (e) {
                                return void 0 !== e.imgFull && (await window.WAPI.downloadFileWithCredentials(e.imgFull));
                            },
                            function (e) {
                                return !1;
                            }
                        );
                    }),
                    (window.WAPI.downloadFileWithCredentials = async function (e) {
                        if (!axios || !e) return !1;
                        const t = (await axios.get(e, { responseType: "arraybuffer" })).data;
                        return btoa(new Uint8Array(t).reduce((e, t) => e + String.fromCharCode(t), ""));
                    }),
                    (window.WAPI.getChatIsOnline = async function (e) {
                        const t = Store.Chat.get(e);
                        return !!t && (await t.presence.subscribe(), t.presence.attributes.isOnline);
                    }),
                    (window.WAPI.getLastSeen = async function (e) {
                        const t = Store.Chat.get(e);
                        return !!t && (await t.presence.subscribe(), t.presence.chatstate.t || !1);
                    }),
                    (window.WAPI.getWAVersion = function () {
                        return window.Debug.VERSION;
                    }),
                    (window.WAPI.archiveChat = async function (e, t) {
                        return await Store.Archive.setArchive(Store.Chat.get(e), t)
                            .then((e) => !0)
                            .catch((e) => !1);
                    }),
                    (window.WAPI.takeOver = async function () {
                        return await window.Store.State.Socket.takeover(), !0;
                    }),
                    (window.WAPI.onIncomingCall = function (e) {
                        return (
                            window.WAPI.waitForStore(["Call"], () => {
                                window.Store.Call.on("add", e);
                            }),
                            !0
                        );
                    }),
                    (window.WAPI.setMessagesAdminsOnly = async function (e, t) {
                        return await Store.WapQuery.setGroupProperty(e, "announcement", t), !0;
                    }),
                    (window.WAPI.logout = async function () {
                        return !!window.Store.Login && (await window.Store.Login.startLogout(), !0);
                    }),
                    (window.WAPI.storePromises = {}),
                    (window.WAPI.waitForStore = async function (e, t) {
                        Array.isArray(e) || (e = [e]);
                        const n = (e) => void 0 === window.Store[e],
                            i = e.filter(n).map(
                                (e) => (
                                    window.WAPI.storePromises[e] ||
                                    (window.WAPI.storePromises[e] = new Promise((t) => {
                                        let i = null;
                                        const a = (o) => {
                                            (((o && o.detail) || "") !== e && n(e)) || (window.removeEventListener("storeLoaded", a), clearInterval(i), t(!0));
                                        };
                                        window.addEventListener("storeLoaded", a), (i = setInterval(a, 1e3));
                                    })),
                                    window.WAPI.storePromises[e]
                                )
                            ),
                            a = Promise.all(i);
                        return "function" == typeof t && a.then(t), await a;
                    }),
                    (window.WAPI.onPoll = function (e) {
                        return (
                            Store.PollVote.on("change", (t) => {
                                e(t);
                            }),
                            !0
                        );
                    }),
                    (window.WAPI.waitNewMessages = function (e = !0, t) {
                        return (
                            window.WAPI._newMessagesCallbacks.push({
                                callback: (e) => {
                                    try {
                                        t(e);
                                    } catch (e) {
                                        console.error(e);
                                    }
                                },
                                rmAfterUse: e,
                            }),
                            !0
                        );
                    }),
                    (window.WAPI.onUnreadMessage = function (e) {
                        return (
                            Store.Chat.on("change:unreadCount", async (t) => {
                                if (t.unreadCount > 0) {
                                    let n = [],
                                        i = t.msgs._models.slice(-t.unreadCount);
                                    for (let e in i) {
                                        let t = await WAPI.processMessageObj(i[e], !0, !0);
                                        t && n.push(t);
                                    }
                                    e(n);
                                }
                            }),
                            !0
                        );
                    }),
                    (window.WAPI.onFilePicThumb = function (e) {
                        return (
                            Store.ProfilePicThumb.on("change:img", (t) => {
                                const n = {
                                    attributes: t.attributes,
                                    eurl: t.eurl,
                                    eurlStale: t.eurlStale,
                                    fallbackType: t.fallbackType,
                                    id: t.id,
                                    img: t.img,
                                    imgFull: t.imgFull,
                                    isState: t.isState,
                                    pendingPic: t.pendingPic,
                                    raw: t.raw,
                                    stale: t.stale,
                                    tag: t.tag,
                                    token: t.token,
                                };
                                e(n);
                            }),
                            !0
                        );
                    }),
                    (window.WAPI.onChatState = function (e) {
                        return (
                            window.WAPI.waitForStore(["Chat"], () => {
                                Store.Chat.on("change:presence.chatstate.type", (t) => {
                                    const n = t._events.all[0].context,
                                        i = { id: n.id, isGroup: n.isGroup, isUser: n.isUser, type: t.type };
                                    e(i);
                                });
                            }),
                            !0
                        );
                    }),
                    (function () {
                        let e = !1,
                            t = () => window.Store.State.Socket.stream;
                        window.WAPI.onStreamChange = function (n) {
                            return (
                                window.WAPI.waitForStore("State", () => {
                                    window.Store.State.Socket.on("change:stream", () => n(t())), e || ((e = !0), n(t()));
                                }),
                                !0
                            );
                        };
                    })(),
                    (function () {
                        let e = !1;
                        const t = () => window.Store.State.Socket.state;
                        window.WAPI.onStateChange = function (n) {
                            return (
                                window.WAPI.waitForStore("State", () => {
                                    window.Store.State.Socket.on("change:state", () => n(t())), e || ((e = !0), n(t()));
                                }),
                                !0
                            );
                        };
                    })(),
                    (function () {
                        let e = !1;
                        const t = () => ({ displayInfo: window.Store.Stream.displayInfo, mode: window.Store.Stream.mode, info: window.Store.Stream.info });
                        window.WAPI.onInterfaceChange = (n) => (
                            window.WAPI.waitForStore("Stream", () => {
                                window.Store.Stream.on("change:info change:displayInfo change:mode", () => n(t())), !1 === e && ((e = !0), n(t()));
                            }),
                            !0
                        );
                    })(),
                    window.WAPI.waitForStore(["Chat", "Msg"], () => {
                        window.WAPI._newMessagesListener = window.Store.Msg.on("add", async (e) => {
                            if (e && e.isNewMsg && !e.isSentByMe) {
                                let t = await window.WAPI.processMessageObj(e, !1, !1);
                                t && (window.WAPI._newMessagesQueue.push(t), window.WAPI._newMessagesBuffer.push(t)),
                                    !window.WAPI._newMessagesDebouncer &&
                                    window.WAPI._newMessagesQueue.length > 0 &&
                                    (window.WAPI._newMessagesDebouncer = setTimeout(() => {
                                        let e = window.WAPI._newMessagesQueue;
                                        (window.WAPI._newMessagesDebouncer = null), (window.WAPI._newMessagesQueue = []);
                                        let t = [];
                                        window.WAPI._newMessagesCallbacks.forEach(function (n) {
                                            void 0 !== n.callback && n.callback(e), !0 === n.rmAfterUse && t.push(n);
                                        }),
                                            t.forEach(function (e) {
                                                let t = window.WAPI._newMessagesCallbacks.indexOf(e);
                                                window.WAPI._newMessagesCallbacks.splice(t, 1);
                                            });
                                    }, 1e3));
                            }
                        });
                    }),
                    (window.WAPI._unloadInform = (e) => {
                        window.WAPI._newMessagesBuffer.forEach((e) => {
                            Object.keys(e).forEach((t) => (void 0 === e[t] ? delete e[t] : ""));
                        }),
                            sessionStorage.setItem("saved_msgs", JSON.stringify(window.WAPI._newMessagesBuffer)),
                            window.WAPI._newMessagesCallbacks.forEach(function (e) {
                                void 0 !== e.callback && e.callback({ status: -1, message: "page will be reloaded, wait and register callback again." });
                            });
                    }),
                    (window.WAPI.onAck = function (e) {
                        return (
                            window.WAPI.waitForStore(["Chat", "Msg"], () => {
                                Store.Msg.on("change:ack", (t) => {
                                    e(t);
                                });
                            }),
                            !0
                        );
                    }),
                    (window.WAPI.onAddedToGroup = function (e) {
                        return (
                            window.WAPI.waitForStore(["Chat", "Msg"], () => {
                                Store.Chat.on("add", (t) => {
                                    t && t.isGroup && e(t);
                                });
                            }),
                            !0
                        );
                    }),
                    (window.WAPI.onLiveLocation = async function (e, t) {
                        return await window.WAPI.waitForStore(["LiveLocation"], () => {
                            var n = Store.LiveLocation.get(e);
                            return (
                                !!n &&
                                (n.participants.validLocations().map((e) =>
                                    e.on("change:lastUpdated", (e, n, i) => {
                                        console.log(e, n, i);
                                        const { id: a, lat: o, lng: r, accuracy: s, degrees: d, speed: c, lastUpdated: l } = e,
                                            u = { id: a.toString(), lat: o, lng: r, accuracy: s, degrees: d, speed: c, lastUpdated: l };
                                        t(u);
                                    })
                                ),
                                    !0)
                            );
                        });
                    }),
                    (window.WAPI.onParticipantsChanged = async function (e, t) {
                        return await window.WAPI.waitForStore(["Chat", "Msg"], () => {
                            const n = ["invite", "add", "remove", "leave", "promote", "demote"],
                                i = window.Store.Chat.get(e),
                                a = window.Store.GroupMetadata.get(e);
                            g[e] ||
                                ((g[e] = {}),
                                    a.participants.forEach((t) => {
                                        g[e][t.id.toString()] = { subtype: "add", from: a.owner };
                                    }));
                            let o = 0;
                            return (
                                i.on("change:groupMetadata.participants", (a) =>
                                    i.on("all", (a, r) => {
                                        const { isGroup: s, previewMessage: d } = r;
                                        if (s && "change" === a && d && "gp2" === d.type && n.includes(d.subtype)) {
                                            const { subtype: n, from: a, recipients: r } = d,
                                                s = r[0].toString();
                                            (g[e][s] && g[e][r[0]].subtype == n) || (0 == o ? o++ : ((g[e][s] = { subtype: n, from: a }), t({ by: a.toString(), action: n, who: r }), i.off("all", this), (o = 0)));
                                        }
                                    })
                                ),
                                !0
                            );
                        });
                    }));
        })();
})();
