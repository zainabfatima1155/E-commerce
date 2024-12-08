INDX( 	 sMD`            (      �       s                     f,(    p Z     Z,(    |����E�����E�����E�|����E��       �                f l a t t e n . d . t s (    \,(    h V     Z,(    B+���E�����E�����E�B+���E� 0      �!              
 f l a t t e n . j s   g,(    x d     Z,(    �v���E�����E�����E��v���E��      �               t u r b o - s t r e a m . d . t s    ^,(    p `     Z,(    �<���E�" ���E�" ���E��<���E�        �               t u r b o - s t r e a m . j  e,(    x b     Z,(    �����E�E>���E�E>���E������E� P      ;O               t u r b o - s t r e a m . m j s (    h,(    p ^     Z,(    m����E��$���E��$���E�m����E��       }                u n f l a t t e n . d . t s   _,(    p Z     Z,(    ;'���E�����E�����E�;'���E� 0      t#               u n f l a t t e n . j s       i,(    h V     Z,(    <6���E��n���E��n���E�<6���E�       +              
 u t i l s . d . t s   a,(    h R     Z,(    o����E��4���E��4���E�o����E�                     u t i l s . j s                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       export declare const HOLE = -1;
export declare const NAN = -2;
export declare const NEGATIVE_INFINITY = -3;
export declare const NEGATIVE_ZERO = -4;
export declare const NULL = -5;
export declare const POSITIVE_INFINITY = -6;
export declare const UNDEFINED = -7;
export declare const TYPE_BIGINT = "B";
export declare const TYPE_DATE = "D";
export declare const TYPE_ERROR = "E";
export declare const TYPE_MAP = "M";
export declare const TYPE_NULL_OBJECT = "N";
export declare const TYPE_PROMISE = "P";
export declare const TYPE_REGEXP = "R";
export declare const TYPE_SET = "S";
export declare const TYPE_SYMBOL = "Y";
export declare const TYPE_URL = "U";
export declare const TYPE_PREVIOUS_RESOLVED = "Z";
export type DecodePlugin = (type: string, ...data: unknown[]) => {
    value: unknown;
} | false | null | undefined;
export type EncodePlugin = (value: unknown) => [string, ...unknown[]] | false | null | undefined;
export interface ThisDecode {
    values: unknown[];
    hydrated: unknown[];
    deferred: Record<number, Deferred<unknown>>;
    plugins?: DecodePlugin[];
}
export interface ThisEncode {
    index: number;
    indices: Map<unknown, number>;
    stringified: string[];
    deferred: Record<number, Promise<unknown>>;
    plugins?: EncodePlugin[];
    postPlugins?: EncodePlugin[];
    signal?: AbortSignal;
}
export declare class Deferred<T = unknown> {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (reason: unknown) => void;
    constructor();
}
export declare function createLineSplittingTransform(): TransformStream<any, any>;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     (The MIT License)

Copyright (c) 2012-2014 Roman Shtylman <shtylman@gmail.com>
Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
exports.serialize = serialize;
/**
 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
 * which has been replaced by the token definition in RFC 7230 appendix B.
 *
 * cookie-name       = token
 * token             = 1*tchar
 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
 *                     "*" / "+" / "-" / "." / "^" / "_" /
 *                     "`" / "|" / "~" / DIGIT / ALPHA
 *
 * Note: Allowing more characters - https://github.com/jshttp/cookie/issues/191
 * Allow same range as cookie value, except `=`, which delimits end of name.
 */
const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
/**
 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
 *
 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
 *                     ; US-ASCII characters excluding CTLs,
 *                     ; whitespace DQUOTE, comma, semicolon,
 *                     ; and backslash
 *
 * Allowing more characters: https://github.com/jshttp/cookie/issues/191
 * Comma, backslash, and DQUOTE are not part of the parsing algorithm.
 */
const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
/**
 * RegExp to match domain-value in RFC 6265 sec 4.1.1
 *
 * domain-value      = <subdomain>
 *                     ; defined in [RFC1034], Section 3.5, as
 *                     ; enhanced by [RFC1123], Section 2.1
 * <subdomain>       = <label> | <subdomain> "." <label>
 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
 *                     Labels must be 63 characters or less.
 *                     'let-dig' not 'letter' in the first char, per RFC1123
 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
 * <let-dig-hyp>     = <let-dig> | "-"
 * <let-dig>         = <letter> | <digit>
 * <letter>          = any one of the 52 alphabetic characters A through Z in
 *                     upper case and a through z in lower case
 * <digit>           = any one of the ten digits 0 through 9
 *
 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
 *
 * > (Note that a leading %x2E ("."), if present, is ignored even though that
 * character is not permitted, but a trailing %x2E ("."), if present, will
 * cause the user agent to ignore the attribute.)
 */
const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
/**
 * RegExp to match path-value in RFC 6265 sec 4.1.1
 *
 * path-value        = <any CHAR except CTLs or ";">
 * CHAR              = %x01-7F
 *                     ; defined in RFC 5234 appendix B.1
 */
const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
const __toString = Object.prototype.toString;
const NullObject = /* @__PURE__ */ (() => {
    const C = function () { };
    C.prototype = Object.create(null);
    return C;
})();
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 */
function parse(str, options) {
    const obj = new NullObject();
    const len = str.length;
    // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
    if (len < 2)
        return obj;
    const dec = options?.decode || decode;
    let index = 0;
    do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
            break; // No more cookie pairs.
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
            // backtrack on prior semicolon
            index = str.lastIndexOf(";", eqIdx - 1) + 1;
            continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        // only assign once
        if (obj[key] === undefined) {
            let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
            let valEndIdx = endIndex(str, endIdx, valStartIdx);
            const value = dec(str.slice(valStartIdx, valEndIdx));
            obj[key] = value;
        }
        index = endIdx + 1;
    } while (index < len);
    return obj;
}
function startIndex(str, index, max) {
    do {
        const code = str.charCodeAt(index);
        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
            return index;
    } while (++index < max);
    return max;
}
function endIndex(str, index, min) {
    while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
            return index + 1;
    }
    return min;
}
/**
 * Serialize data into a cookie header.
 *
 * Serialize a name value pair into a cookie string suitable for
 * http headers. An optional options object specifies cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 */
function serialize(name, val, options) {
    const enc = options?.encode || encodeURIComponent;
    if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
    }
    const value = enc(val);
    if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
    }
    let str = name + "=" + value;
    if (!options)
        return str;
    if (options.maxAge !== undefined) {
        if (!Number.isInteger(options.maxAge)) {
            throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
    }
    if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
            throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
    }
    if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
            throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
    }
    if (options.expires) {
        if (!isDate(options.expires) ||
            !Number.isFinite(options.expires.valueOf())) {
            throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
    }
    if (options.httpOnly) {
        str += "; HttpOnly";
    }
    if (options.secure) {
        str += "; Secure";
    }
    if (options.partitioned) {
        str += "; Partitioned";
    }
    if (options.priority) {
        const priority = typeof options.priority === "string"
            ? options.priority.toLowerCase()
            : undefined;
        switch (priority) {
            case "low":
                str += "; Priority=Low";
                break;
            case "medium":
                str += "; Priority=Medium";
                break;
            case "high":
                str += "; Priority=High";
                break;
            default:
                throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
    }
    if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string"
            ? options.sameSite.toLowerCase()
            : options.sameSite;
        switch (sameSite) {
            case true:
            case "strict":
                str += "; SameSite=Strict";
                break;
            case "lax":
                str += "; SameSite=Lax";
                break;
            case "none":
                str += "; SameSite=None";
                break;
            default:
                throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
    }
    return str;
}
/**
 * URL-decode string value. Optimized to skip native call when no %.
 */
function decode(str) {
    if (str.indexOf("%") === -1)
        return str;
    try {
        return decodeURIComponent(str);
    }
    catch (e) {
        return str;
    }
}
/**
 * Determine if value is a Date.
 */
function isDate(val) {
    return __toString.call(val) === "[object Date]";
}
//# sourceMappingURL=index.js.map                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            {
  "name": "cookie",
  "version": "1.0.2",
  "description": "HTTP server cookie parsing and serialization",
  "keywords": [
    "cookie",
    "cookies"
  ],
  "repository": "jshttp/cookie",
  "license": "MIT",
  "author": "Roman Shtylman <shtylman@gmail.com>",
  "contributors": [
    "Douglas Christopher Wilson <doug@somethingdoug.com>"
  ],
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist/"
  ],
  "scripts": {
    "bench": "vitest bench",
    "build": "ts-scripts build",
    "format": "ts-scripts format",
    "prepare": "ts-scripts install",
    "prepublishOnly": "npm run build",
    "specs": "ts-scripts specs",
    "test": "ts-scripts test"
  },
  "devDependencies": {
    "@borderless/ts-scripts": "^0.15.0",
    "@vitest/coverage-v8": "^2.1.2",
    "top-sites": "1.1.194",
    "typescript": "^5.6.2",
    "vitest": "^2.1.2"
  },
  "engines": {
    "node": ">=18"
  },
  "ts-scripts": {
    "project": "tsconfig.build.json"
  }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   {"version":3,"file":"index.js","sourceRoot":"","sources":["../src/index.ts"],"names":[],"mappings":"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","sourcesContent":["/**\n * RegExp to match cookie-name in RFC 6265 sec 4.1.1\n * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2\n * which has been replaced by the token definition in RFC 7230 appendix B.\n *\n * cookie-name       = token\n * token             = 1*tchar\n * tchar             = \"!\" / \"#\" / \"$\" / \"%\" / \"&\" / \"'\" /\n *                     \"*\" / \"+\" / \"-\" / \".\" / \"^\" / \"_\" /\n *                     \"`\" / \"|\" / \"~\" / DIGIT / ALPHA\n *\n * Note: Allowing more characters - https://github.com/jshttp/cookie/issues/191\n * Allow same range as cookie value, except `=`, which delimits end of name.\n */\nconst cookieNameRegExp = /^[\\u0021-\\u003A\\u003C\\u003E-\\u007E]+$/;\n\n/**\n * RegExp to match cookie-value in RFC 6265 sec 4.1.1\n *\n * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )\n * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E\n *                     ; US-ASCII characters excluding CTLs,\n *                     ; whitespace DQUOTE, comma, semicolon,\n *                     ; and backslash\n *\n * Allowing more characters: https://github.com/jshttp/cookie/issues/191\n * Comma, backslash, and DQUOTE are not part of the parsing algorithm.\n */\nconst cookieValueRegExp = /^[\\u0021-\\u003A\\u003C-\\u007E]*$/;\n\n/**\n * RegExp to match domain-value in RFC 6265 sec 4.1.1\n *\n * domain-value      = <subdomain>\n *                     ; defined in [RFC1034], Section 3.5, as\n *                     ; enhanced by [RFC1123], Section 2.1\n * <subdomain>       = <label> | <subdomain> \".\" <label>\n * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]\n *                     Labels must be 63 characters or less.\n *                     'let-dig' not 'letter' in the first char, per RFC1123\n * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>\n * <let-dig-hyp>     = <let-dig> | \"-\"\n * <let-dig>         = <letter> | <digit>\n * <letter>          = any one of the 52 alphabetic characters A through Z in\n *                     upper case and a through z in lower case\n * <digit>           = any one of the ten digits 0 through 9\n *\n * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173\n *\n * > (Note that a leading %x2E (\".\"), if present, is ignored even though that\n * character is not permitted, but a trailing %x2E (\".\"), if present, will\n * cause the user agent to ignore the attribute.)\n */\nconst domainValueRegExp =\n  /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;\n\n/**\n * RegExp to match path-value in RFC 6265 sec 4.1.1\n *\n * path-value        = <any CHAR except CTLs or \";\">\n * CHAR              = %x01-7F\n *                     ; defined in RFC 5234 appendix B.1\n */\nconst pathValueRegExp = /^[\\u0020-\\u003A\\u003D-\\u007E]*$/;\n\nconst __toString = Object.prototype.toString;\n\nconst NullObject = /* @__PURE__ */ (() => {\n  const C = function () {};\n  C.prototype = Object.create(null);\n  return C;\n})() as unknown as { new (): any };\n\n/**\n * Parse options.\n */\nexport interface ParseOptions {\n  /**\n   * Specifies a function that will be used to decode a [cookie-value](https://datatracker.ietf.org/doc/html/rfc6265#section-4.1.1).\n   * Since the value of a cookie has a limited character set (and must be a simple string), this function can be used to decode\n   * a previously-encoded cookie value into a JavaScript string.\n   *\n   * The default function is the global `decodeURIComponent`, wrapped in a `try..catch`. If an error\n   * is thrown it will return the cookie's original value. If you provide your own encode/decode\n   * scheme you must ensure errors are appropriately handled.\n   *\n   * @default decode\n   */\n  decode?: (str: string) => string | undefined;\n}\n\n/**\n * Parse a cookie header.\n *\n * Parse the given cookie header string into an object\n * The object has the various cookies as keys(names) => values\n */\nexport function parse(\n  str: string,\n  options?: ParseOptions,\n): Record<string, string | undefined> {\n  const obj: Record<string, string | undefined> = new NullObject();\n  const len = str.length;\n  // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.\n  if (len < 2) return obj;\n\n  const dec = options?.decode || decode;\n  let index = 0;\n\n  do {\n    const eqIdx = str.indexOf(\"=\", index);\n    if (eqIdx === -1) break; // No more cookie pairs.\n\n    const colonIdx = str.indexOf(\";\", index);\n    const endIdx = colonIdx === -1 ? len : colonIdx;\n\n    if (eqIdx > endIdx) {\n      // backtrack on prior semicolon\n      index = str.lastIndexOf(\";\", eqIdx - 1) + 1;\n      continue;\n    }\n\n    const keyStartIdx = startIndex(str, index, eqIdx);\n    const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);\n    const key = str.slice(keyStartIdx, keyEndIdx);\n\n    // only assign once\n    if (obj[key] === undefined) {\n      let valStartIdx = startIndex(str, eqIdx + 1, endIdx);\n      let valEndIdx = endIndex(str, endIdx, valStartIdx);\n\n      const value = dec(str.slice(valStartIdx, valEndIdx));\n      obj[key] = value;\n    }\n\n    index = endIdx + 1;\n  } while (index < len);\n\n  return obj;\n}\n\nfunction startIndex(str: string, index: number, max: number) {\n  do {\n    const code = str.charCodeAt(index);\n    if (code !== 0x20 /*   */ && code !== 0x09 /* \\t */) return index;\n  } while (++index < max);\n  return max;\n}\n\nfunction endIndex(str: string, index: number, min: number) {\n  while (index > min) {\n    const code = str.charCodeAt(--index);\n    if (code !== 0x20 /*   */ && code !== 0x09 /* \\t */) return index + 1;\n  }\n  return min;\n}\n\n/**\n * Serialize options.\n */\nexport interface SerializeOptions {\n  /**\n   * Specifies a function that will be used to encode a [cookie-value](https://datatracker.ietf.org/doc/html/rfc6265#section-4.1.1).\n   * Since value of a cookie has a limited character set (and must be a simple string), this function can be used to encode\n   * a value into a string suited for a cookie's value, and should mirror `decode` when parsing.\n   *\n   * @default encodeURIComponent\n   */\n  encode?: (str: string) => string;\n  /**\n   * Specifies the `number` (in seconds) to be the value for the [`Max-Age` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.2).\n   *\n   * The [cookie storage model specification](https://tools.ietf.org/html/rfc6265#section-5.3) states that if both `expires` and\n   * `maxAge` are set, then `maxAge` takes precedence, but it is possible not all clients by obey this,\n   * so if both are set, they should point to the same date and time.\n   */\n  maxAge?: number;\n  /**\n   * Specifies the `Date` object to be the value for the [`Expires` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.1).\n   * When no expiration is set clients consider this a \"non-persistent cookie\" and delete it the current session is over.\n   *\n   * The [cookie storage model specification](https://tools.ietf.org/html/rfc6265#section-5.3) states that if both `expires` and\n   * `maxAge` are set, then `maxAge` takes precedence, but it is possible not all clients by obey this,\n   * so if both are set, they should point to the same date and time.\n   */\n  expires?: Date;\n  /**\n   * Specifies the value for the [`Domain` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.3).\n   * When no domain is set clients consider the cookie to apply to the current domain only.\n   */\n  domain?: string;\n  /**\n   * Specifies the value for the [`Path` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.4).\n   * When no path is set, the path is considered the [\"default path\"](https://tools.ietf.org/html/rfc6265#section-5.1.4).\n   */\n  path?: string;\n  /**\n   * Enables the [`HttpOnly` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.6).\n   * When enabled, clients will not allow client-side JavaScript to see the cookie in `document.cookie`.\n   */\n  httpOnly?: boolean;\n  /**\n   * Enables the [`Secure` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.5).\n   * When enabled, clients will only send the cookie back if the browser has a HTTPS connection.\n   */\n  secure?: boolean;\n  /**\n   * Enables the [`Partitioned` `Set-Cookie` attribute](https://tools.ietf.org/html/draft-cutler-httpbis-partitioned-cookies/).\n   * When enabled, clients will only send the cookie back when the current domain _and_ top-level domain matches.\n   *\n   * This is an attribute that has not yet been fully standardized, and may change in the future.\n   * This also means clients may ignore this attribute until they understand it. More information\n   * about can be found in [the proposal](https://github.com/privacycg/CHIPS).\n   */\n  partitioned?: boolean;\n  /**\n   * Specifies the value for the [`Priority` `Set-Cookie` attribute](https://tools.ietf.org/html/draft-west-cookie-priority-00#section-4.1).\n   *\n   * - `'low'` will set the `Priority` attribute to `Low`.\n   * - `'medium'` will set the `Priority` attribute to `Medium`, the default priority when not set.\n   * - `'high'` will set the `Priority` attribute to `High`.\n   *\n   * More information about priority levels can be found in [the specification](https://tools.ietf.org/html/draft-west-cookie-priority-00#section-4.1).\n   */\n  priority?: \"low\" | \"medium\" | \"high\";\n  /**\n   * Specifies the value for the [`SameSite` `Set-Cookie` attribute](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-09#section-5.4.7).\n   *\n   * - `true` will set the `SameSite` attribute to `Strict` for strict same site enforcement.\n   * - `'lax'` will set the `SameSite` attribute to `Lax` for lax same site enforcement.\n   * - `'none'` will set the `SameSite` attribute to `None` for an explicit cross-site cookie.\n   * - `'strict'` will set the `SameSite` attribute to `Strict` for strict same site enforcement.\n   *\n   * More information about enforcement levels can be found in [the specification](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-09#section-5.4.7).\n   */\n  sameSite?: boolean | \"lax\" | \"strict\" | \"none\";\n}\n\n/**\n * Serialize data into a cookie header.\n *\n * Serialize a name value pair into a cookie string suitable for\n * http headers. An optional options object specifies cookie parameters.\n *\n * serialize('foo', 'bar', { httpOnly: true })\n *   => \"foo=bar; httpOnly\"\n */\nexport function serialize(\n  name: string,\n  val: string,\n  options?: SerializeOptions,\n): string {\n  const enc = options?.encode || encodeURIComponent;\n\n  if (!cookieNameRegExp.test(name)) {\n    throw new TypeError(`argument name is invalid: ${name}`);\n  }\n\n  const value = enc(val);\n\n  if (!cookieValueRegExp.test(value)) {\n    throw new TypeError(`argument val is invalid: ${val}`);\n  }\n\n  let str = name + \"=\" + value;\n  if (!options) return str;\n\n  if (options.maxAge !== undefined) {\n    if (!Number.isInteger(options.maxAge)) {\n      throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);\n    }\n\n    str += \"; Max-Age=\" + options.maxAge;\n  }\n\n  if (options.domain) {\n    if (!domainValueRegExp.test(options.domain)) {\n      throw new TypeError(`option domain is invalid: ${options.domain}`);\n    }\n\n    str += \"; Domain=\" + options.domain;\n  }\n\n  if (options.path) {\n    if (!pathValueRegExp.test(options.path)) {\n      throw new TypeError(`option path is invalid: ${options.path}`);\n    }\n\n    str += \"; Path=\" + options.path;\n  }\n\n  if (options.expires) {\n    if (\n      !isDate(options.expires) ||\n      !Number.isFinite(options.expires.valueOf())\n    ) {\n      throw new TypeError(`option expires is invalid: ${options.expires}`);\n    }\n\n    str += \"; Expires=\" + options.expires.toUTCString();\n  }\n\n  if (options.httpOnly) {\n    str += \"; HttpOnly\";\n  }\n\n  if (options.secure) {\n    str += \"; Secure\";\n  }\n\n  if (options.partitioned) {\n    str += \"; Partitioned\";\n  }\n\n  if (options.priority) {\n    const priority =\n      typeof options.priority === \"string\"\n        ? options.priority.toLowerCase()\n        : undefined;\n    switch (priority) {\n      case \"low\":\n        str += \"; Priority=Low\";\n        break;\n      case \"medium\":\n        str += \"; Priority=Medium\";\n        break;\n      case \"high\":\n        str += \"; Priority=High\";\n        break;\n      default:\n        throw new TypeError(`option priority is invalid: ${options.priority}`);\n    }\n  }\n\n  if (options.sameSite) {\n    const sameSite =\n      typeof options.sameSite === \"string\"\n        ? options.sameSite.toLowerCase()\n        : options.sameSite;\n    switch (sameSite) {\n      case true:\n      case \"strict\":\n        str += \"; SameSite=Strict\";\n        break;\n      case \"lax\":\n        str += \"; SameSite=Lax\";\n        break;\n      case \"none\":\n        str += \"; SameSite=None\";\n        break;\n      default:\n        throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);\n    }\n  }\n\n  return str;\n}\n\n/**\n * URL-decode string value. Optimized to skip native call when no %.\n */\nfunction decode(str: string): string {\n  if (str.indexOf(\"%\") === -1) return str;\n\n  try {\n    return decodeURIComponent(str);\n  } catch (e) {\n    return str;\n  }\n}\n\n/**\n * Determine if value is a Date.\n */\nfunction isDate(val: any): val is Date {\n  return __toString.call(val) === \"[object Date]\";\n}\n"]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                # cookie

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Coverage Status][coverage-image]][coverage-url]

Basic HTTP cookie parser and serializer for HTTP servers.

## Installation

```sh
$ npm install cookie
```

## API

```js
const cookie = require("cookie");
// import * as cookie from 'cookie';
```

### cookie.parse(str, options)

Parse a HTTP `Cookie` header string and returning an object of all cookie name-value pairs.
The `str` argument is the string representing a `Cookie` header value and `options` is an
optional object containing additional parsing options.

```js
const cookies = cookie.parse("foo=bar; equation=E%3Dmc%5E2");
// { foo: 'bar', equation: 'E=mc^2' }
```

#### Options

`cookie.parse` accepts these properties in the options object.

##### decode

Specifies a function that will be used to decode a [cookie-value](https://datatracker.ietf.org/doc/html/rfc6265#section-4.1.1).
Since the value of a cookie has a limited character set (and must be a simple string), this function can be used to decode
a previously-encoded cookie value into a JavaScript string.

The default function is the global `decodeURIComponent`, wrapped in a `try..catch`. If an error
is thrown it will return the cookie's original value. If you provide your own encode/decode
scheme you must ensure errors are appropriately handled.

### cookie.serialize(name, value, options)

Serialize a cookie name-value pair into a `Set-Cookie` header string. The `name` argument is the
name for the cookie, the `value` argument is the value to set the cookie to, and the `options`
argument is an optional object containing additional serialization options.

```js
const setCookie = cookie.serialize("foo", "bar");
// foo=bar
```

#### Options

`cookie.serialize` accepts these properties in the options object.

##### encode

Specifies a function that will be used to encode a [cookie-value](https://datatracker.ietf.org/doc/html/rfc6265#section-4.1.1).
Since value of a cookie has a limited character set (and must be a simple string), this function can be used to encode
a value into a string suited for a cookie's value, and should mirror `decode` when parsing.

The default function is the global `encodeURIComponent`.

##### maxAge

Specifies the `number` (in seconds) to be the value for the [`Max-Age` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.2).

The [cookie storage model specification](https://tools.ietf.org/html/rfc6265#section-5.3) states that if both `expires` and
`maxAge` are set, then `maxAge` takes precedence, but it is possible not all clients by obey this,
so if both are set, they should point to the same date and time.

##### expires

Specifies the `Date` object to be the value for the [`Expires` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.1).
When no expiration is set clients consider this a "non-persistent cookie" and delete it the current session is over.

The [cookie storage model specification](https://tools.ietf.org/html/rfc6265#section-5.3) states that if both `expires` and
`maxAge` are set, then `maxAge` takes precedence, but it is possible not all clients by obey this,
so if both are set, they should point to the same date and time.

##### domain

Specifies the value for the [`Domain` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.3).
When no domain is set clients consider the cookie to apply to the current domain only.

##### path

Specifies the value for the [`Path` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.4).
When no path is set, the path is considered the ["default path"](https://tools.ietf.org/html/rfc6265#section-5.1.4).

##### httpOnly

Enables the [`HttpOnly` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.6).
When enabled, clients will not allow client-side JavaScript to see the cookie in `document.cookie`.

##### secure

Enables the [`Secure` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.5).
When enabled, clients will only send the cookie back if the browser has a HTTPS connection.

##### partitioned

Enables the [`Partitioned` `Set-Cookie` attribute](https://tools.ietf.org/html/draft-cutler-httpbis-partitioned-cookies/).
When enabled, clients will only send the cookie back when the current domain _and_ top-level domain matches.

This is an attribute that has not yet been fully standardized, and may change in the future.
This also means clients may ignore this attribute until they understand it. More information
about can be found in [the proposal](https://github.com/privacycg/CHIPS).

##### priority

Specifies the value for the [`Priority` `Set-Cookie` attribute](https://tools.ietf.org/html/draft-west-cookie-priority-00#section-4.1).

- `'low'` will set the `Priority` attribute to `Low`.
- `'medium'` will set the `Priority` attribute to `Medium`, the default priority when not set.
- `'high'` will set the `Priority` attribute to `High`.

More information about priority levels can be found in [the specification](https://tools.ietf.org/html/draft-west-cookie-priority-00#section-4.1).

##### sameSite

Specifies the value for the [`SameSite` `Set-Cookie` attribute](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-09#section-5.4.7).

- `true` will set the `SameSite` attribute to `Strict` for strict same site enforcement.
- `'lax'` will set the `SameSite` attribute to `Lax` for lax same site enforcement.
- `'none'` will set the `SameSite` attribute to `None` for an explicit cross-site cookie.
- `'strict'` will set the `SameSite` attribute to `Strict` for strict same site enforcement.

More information about enforcement levels can be found in [the specification](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-09#section-5.4.7).

## Example

The following example uses this module in conjunction with the Node.js core HTTP server
to prompt a user for their name and display it back on future visits.

```js
var cookie = require("cookie");
var escapeHtml = require("escape-html");
var http = require("http");
var url = require("url");

function onRequest(req, res) {
  // Parse the query string
  var query = url.parse(req.url, true, true).query;

  if (query && query.name) {
    // Set a new cookie with the name
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("name", String(query.name), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
      }),
    );

    // Redirect back after setting cookie
    res.statusCode = 302;
    res.setHeader("Location", req.headers.referer || "/");
    res.end();
    return;
  }

  // Parse the cookies on the request
  var cookies = cookie.parse(req.headers.cookie || "");

  // Get the visitor name set in the cookie
  var name = cookies.name;

  res.setHeader("Content-Type", "text/html; charset=UTF-8");

  if (name) {
    res.write("<p>Welcome back, <b>" + escapeHtml(name) + "</b>!</p>");
  } else {
    res.write("<p>Hello, new visitor!</p>");
  }

  res.write('<form method="GET">');
  res.write(
    '<input placeholder="enter your name" name="name"> <input type="submit" value="Set Name">',
  );
  res.end("</form>");
}

http.createServer(onRequest).listen(3000);
```

## Testing

```sh
npm test
```

## Benchmark

```sh
npm run bench
```

```
     name                   hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · simple       8,566,313.09  0.0000  0.3694  0.0001  0.0001  0.0002  0.0002  0.0003  ±0.64%  4283157   fastest
   · decode       3,834,348.85  0.0001  0.2465  0.0003  0.0003  0.0003  0.0004  0.0006  ±0.38%  1917175
   · unquote      8,315,355.96  0.0000  0.3824  0.0001  0.0001  0.0002  0.0002  0.0003  ±0.72%  4157880
   · duplicates   1,944,765.97  0.0004  0.2959  0.0005  0.0005  0.0006  0.0006  0.0008  ±0.24%   972384
   · 10 cookies     675,345.67  0.0012  0.4328  0.0015  0.0015  0.0019  0.0020  0.0058  ±0.75%   337673
   · 100 cookies     61,040.71  0.0152  0.4092  0.0164  0.0160  0.0196  0.0228  0.2260  ±0.71%    30521   slowest
   ✓ parse top-sites (15) 22945ms
     name                                  hz     min     max    mean     p75     p99    p995    p999     rme   samples
   · parse accounts.google.com   7,164,349.17  0.0000  0.0929  0.0001  0.0002  0.0002  0.0002  0.0003  ±0.09%   3582184
   · parse apple.com             7,817,686.84  0.0000  0.6048  0.0001  0.0001  0.0002  0.0002  0.0003  ±1.05%   3908844
   · parse cloudflare.com        7,189,841.70  0.0000  0.0390  0.0001  0.0002  0.0002  0.0002  0.0003  ±0.06%   3594921
   · parse docs.google.com       7,051,765.61  0.0000  0.0296  0.0001  0.0002  0.0002  0.0002  0.0003  ±0.06%   3525883
   · parse drive.google.com      7,349,104.77  0.0000  0.0368  0.0001  0.0001  0.0002  0.0002  0.0003  ±0.05%   3674553
   · parse en.wikipedia.org      1,929,909.49  0.0004  0.3598  0.0005  0.0005  0.0007  0.0007  0.0012  ±0.16%    964955
   · parse linkedin.com          2,225,658.01  0.0003  0.0595  0.0004  0.0005  0.0005  0.0005  0.0006  ±0.06%   1112830
   · parse maps.google.com       4,423,511.68  0.0001  0.0942  0.0002  0.0003  0.0003  0.0003  0.0005  ±0.08%   2211756
   · parse microsoft.com         3,387,601.88  0.0002  0.0725  0.0003  0.0003  0.0004  0.0004  0.0005  ±0.09%   1693801
   · parse play.google.com       7,375,980.86  0.0000  0.1994  0.0001  0.0001  0.0002  0.0002  0.0003  ±0.12%   3687991
   · parse support.google.com    4,912,267.94  0.0001  2.8958  0.0002  0.0002  0.0003  0.0003  0.0005  ±1.28%   2456134
   · parse www.google.com        3,443,035.87  0.0002  0.2783  0.0003  0.0003  0.0004  0.0004  0.0007  ±0.51%   1721518
   · parse youtu.be              1,910,492.87  0.0004  0.3490  0.0005  0.0005  0.0007  0.0007  0.0011  ±0.46%    955247
   · parse youtube.com           1,895,082.62  0.0004  0.7454  0.0005  0.0005  0.0006  0.0007  0.0013  ±0.64%    947542   slowest
   · parse example.com          21,582,835.27  0.0000  0.1095  0.0000  0.0000  0.0001  0.0001  0.0001  ±0.13%  10791418
```

## References

- [RFC 6265: HTTP State Management Mechanism](https://tools.ietf.org/html/rfc6265)
- [Same-site Cookies](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-09#section-5.4.7)

## License

[MIT](LICENSE)

[ci-image]: https://img.shields.io/github/actions/workflow/status/jshttp/cookie/ci.yml
[ci-url]: https://github.com/jshttp/cookie/actions/workflows/ci.yml?query=branch%3Amaster
[coverage-image]: https://img.shields.io/codecov/c/github/jshttp/cookie/master
[coverage-url]: https://app.codecov.io/gh/jshttp/cookie
[npm-downloads-image]: https://img.shields.io/npm/dm/cookie
[npm-url]: https://npmjs.org/package/cookie
[npm-version-image]: https://img.shields.io/npm/v/cookie
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     