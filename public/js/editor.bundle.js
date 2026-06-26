(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all2) => {
    for (var name in all2)
      __defProp(target, name, { get: all2[name], enumerable: true });
  };
  var __copyProps = (to, from2, except, desc) => {
    if (from2 && typeof from2 === "object" || typeof from2 === "function") {
      for (let key of __getOwnPropNames(from2))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/lib0/map.js
  var create, copy, setIfUndefined, map, any;
  var init_map = __esm({
    "node_modules/lib0/map.js"() {
      create = () => /* @__PURE__ */ new Map();
      copy = (m) => {
        const r = create();
        m.forEach((v, k) => {
          r.set(k, v);
        });
        return r;
      };
      setIfUndefined = (map3, key, createT) => {
        let set = map3.get(key);
        if (set === void 0) {
          map3.set(key, set = createT());
        }
        return set;
      };
      map = (m, f) => {
        const res = [];
        for (const [key, value] of m) {
          res.push(f(value, key));
        }
        return res;
      };
      any = (m, f) => {
        for (const [key, value] of m) {
          if (f(value, key)) {
            return true;
          }
        }
        return false;
      };
    }
  });

  // node_modules/lib0/set.js
  var create2;
  var init_set = __esm({
    "node_modules/lib0/set.js"() {
      create2 = () => /* @__PURE__ */ new Set();
    }
  });

  // node_modules/lib0/array.js
  var last, appendTo, from, every, some, unfold, isArray;
  var init_array = __esm({
    "node_modules/lib0/array.js"() {
      last = (arr) => arr[arr.length - 1];
      appendTo = (dest, src) => {
        for (let i = 0; i < src.length; i++) {
          dest.push(src[i]);
        }
      };
      from = Array.from;
      every = (arr, f) => {
        for (let i = 0; i < arr.length; i++) {
          if (!f(arr[i], i, arr)) {
            return false;
          }
        }
        return true;
      };
      some = (arr, f) => {
        for (let i = 0; i < arr.length; i++) {
          if (f(arr[i], i, arr)) {
            return true;
          }
        }
        return false;
      };
      unfold = (len, f) => {
        const array = new Array(len);
        for (let i = 0; i < len; i++) {
          array[i] = f(i, array);
        }
        return array;
      };
      isArray = Array.isArray;
    }
  });

  // node_modules/lib0/observable.js
  var ObservableV2, Observable;
  var init_observable = __esm({
    "node_modules/lib0/observable.js"() {
      init_map();
      init_set();
      init_array();
      ObservableV2 = class {
        constructor() {
          this._observers = create();
        }
        /**
         * @template {keyof EVENTS & string} NAME
         * @param {NAME} name
         * @param {EVENTS[NAME]} f
         */
        on(name, f) {
          setIfUndefined(
            this._observers,
            /** @type {string} */
            name,
            create2
          ).add(f);
          return f;
        }
        /**
         * @template {keyof EVENTS & string} NAME
         * @param {NAME} name
         * @param {EVENTS[NAME]} f
         */
        once(name, f) {
          const _f = (...args2) => {
            this.off(
              name,
              /** @type {any} */
              _f
            );
            f(...args2);
          };
          this.on(
            name,
            /** @type {any} */
            _f
          );
        }
        /**
         * @template {keyof EVENTS & string} NAME
         * @param {NAME} name
         * @param {EVENTS[NAME]} f
         */
        off(name, f) {
          const observers = this._observers.get(name);
          if (observers !== void 0) {
            observers.delete(f);
            if (observers.size === 0) {
              this._observers.delete(name);
            }
          }
        }
        /**
         * Emit a named event. All registered event listeners that listen to the
         * specified name will receive the event.
         *
         * @todo This should catch exceptions
         *
         * @template {keyof EVENTS & string} NAME
         * @param {NAME} name The event name.
         * @param {Parameters<EVENTS[NAME]>} args The arguments that are applied to the event listener.
         */
        emit(name, args2) {
          return from((this._observers.get(name) || create()).values()).forEach((f) => f(...args2));
        }
        destroy() {
          this._observers = create();
        }
      };
      Observable = class {
        constructor() {
          this._observers = create();
        }
        /**
         * @param {N} name
         * @param {function} f
         */
        on(name, f) {
          setIfUndefined(this._observers, name, create2).add(f);
        }
        /**
         * @param {N} name
         * @param {function} f
         */
        once(name, f) {
          const _f = (...args2) => {
            this.off(name, _f);
            f(...args2);
          };
          this.on(name, _f);
        }
        /**
         * @param {N} name
         * @param {function} f
         */
        off(name, f) {
          const observers = this._observers.get(name);
          if (observers !== void 0) {
            observers.delete(f);
            if (observers.size === 0) {
              this._observers.delete(name);
            }
          }
        }
        /**
         * Emit a named event. All registered event listeners that listen to the
         * specified name will receive the event.
         *
         * @todo This should catch exceptions
         *
         * @param {N} name The event name.
         * @param {Array<any>} args The arguments that are applied to the event listener.
         */
        emit(name, args2) {
          return from((this._observers.get(name) || create()).values()).forEach((f) => f(...args2));
        }
        destroy() {
          this._observers = create();
        }
      };
    }
  });

  // node_modules/lib0/math.js
  var floor, abs, min, max, isNaN, pow, isNegativeZero;
  var init_math = __esm({
    "node_modules/lib0/math.js"() {
      floor = Math.floor;
      abs = Math.abs;
      min = (a, b) => a < b ? a : b;
      max = (a, b) => a > b ? a : b;
      isNaN = Number.isNaN;
      pow = Math.pow;
      isNegativeZero = (n) => n !== 0 ? n < 0 : 1 / n < 0;
    }
  });

  // node_modules/lib0/binary.js
  var BIT1, BIT2, BIT3, BIT4, BIT6, BIT7, BIT8, BIT18, BIT19, BIT20, BIT21, BIT22, BIT23, BIT24, BIT25, BIT26, BIT27, BIT28, BIT29, BIT30, BIT31, BIT32, BITS5, BITS6, BITS7, BITS17, BITS18, BITS19, BITS20, BITS21, BITS22, BITS23, BITS24, BITS25, BITS26, BITS27, BITS28, BITS29, BITS30, BITS31;
  var init_binary = __esm({
    "node_modules/lib0/binary.js"() {
      BIT1 = 1;
      BIT2 = 2;
      BIT3 = 4;
      BIT4 = 8;
      BIT6 = 32;
      BIT7 = 64;
      BIT8 = 128;
      BIT18 = 1 << 17;
      BIT19 = 1 << 18;
      BIT20 = 1 << 19;
      BIT21 = 1 << 20;
      BIT22 = 1 << 21;
      BIT23 = 1 << 22;
      BIT24 = 1 << 23;
      BIT25 = 1 << 24;
      BIT26 = 1 << 25;
      BIT27 = 1 << 26;
      BIT28 = 1 << 27;
      BIT29 = 1 << 28;
      BIT30 = 1 << 29;
      BIT31 = 1 << 30;
      BIT32 = 1 << 31;
      BITS5 = 31;
      BITS6 = 63;
      BITS7 = 127;
      BITS17 = BIT18 - 1;
      BITS18 = BIT19 - 1;
      BITS19 = BIT20 - 1;
      BITS20 = BIT21 - 1;
      BITS21 = BIT22 - 1;
      BITS22 = BIT23 - 1;
      BITS23 = BIT24 - 1;
      BITS24 = BIT25 - 1;
      BITS25 = BIT26 - 1;
      BITS26 = BIT27 - 1;
      BITS27 = BIT28 - 1;
      BITS28 = BIT29 - 1;
      BITS29 = BIT30 - 1;
      BITS30 = BIT31 - 1;
      BITS31 = 2147483647;
    }
  });

  // node_modules/lib0/number.js
  var MAX_SAFE_INTEGER, MIN_SAFE_INTEGER, LOWEST_INT32, isInteger, isNaN2, parseInt2;
  var init_number = __esm({
    "node_modules/lib0/number.js"() {
      init_math();
      MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
      MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;
      LOWEST_INT32 = 1 << 31;
      isInteger = Number.isInteger || ((num) => typeof num === "number" && isFinite(num) && floor(num) === num);
      isNaN2 = Number.isNaN;
      parseInt2 = Number.parseInt;
    }
  });

  // node_modules/lib0/string.js
  var fromCharCode, fromCodePoint, MAX_UTF16_CHARACTER, toLowerCase, trimLeftRegex, trimLeft, fromCamelCaseRegex, fromCamelCase, _encodeUtf8Polyfill, utf8TextEncoder, _encodeUtf8Native, encodeUtf8, utf8TextDecoder, repeat;
  var init_string = __esm({
    "node_modules/lib0/string.js"() {
      init_array();
      fromCharCode = String.fromCharCode;
      fromCodePoint = String.fromCodePoint;
      MAX_UTF16_CHARACTER = fromCharCode(65535);
      toLowerCase = (s) => s.toLowerCase();
      trimLeftRegex = /^\s*/g;
      trimLeft = (s) => s.replace(trimLeftRegex, "");
      fromCamelCaseRegex = /([A-Z])/g;
      fromCamelCase = (s, separator) => trimLeft(s.replace(fromCamelCaseRegex, (match3) => `${separator}${toLowerCase(match3)}`));
      _encodeUtf8Polyfill = (str) => {
        const encodedString = unescape(encodeURIComponent(str));
        const len = encodedString.length;
        const buf = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          buf[i] = /** @type {number} */
          encodedString.codePointAt(i);
        }
        return buf;
      };
      utf8TextEncoder = /** @type {TextEncoder} */
      typeof TextEncoder !== "undefined" ? new TextEncoder() : null;
      _encodeUtf8Native = (str) => utf8TextEncoder.encode(str);
      encodeUtf8 = utf8TextEncoder ? _encodeUtf8Native : _encodeUtf8Polyfill;
      utf8TextDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder("utf-8", { fatal: true, ignoreBOM: true });
      if (utf8TextDecoder && utf8TextDecoder.decode(new Uint8Array()).length === 1) {
        utf8TextDecoder = null;
      }
      repeat = (source, n) => unfold(n, () => source).join("");
    }
  });

  // node_modules/lib0/encoding.js
  var Encoder, createEncoder, length, toUint8Array, verifyLen, write, writeUint8, writeVarUint, writeVarInt, _strBuffer, _maxStrBSize, _writeVarStringNative, _writeVarStringPolyfill, writeVarString, writeUint8Array, writeVarUint8Array, writeOnDataView, writeFloat32, writeFloat64, writeBigInt64, floatTestBed, isFloat32, writeAny, RleEncoder, flushUintOptRleEncoder, UintOptRleEncoder, flushIntDiffOptRleEncoder, IntDiffOptRleEncoder, StringEncoder;
  var init_encoding = __esm({
    "node_modules/lib0/encoding.js"() {
      init_math();
      init_number();
      init_binary();
      init_string();
      init_array();
      Encoder = class {
        constructor() {
          this.cpos = 0;
          this.cbuf = new Uint8Array(100);
          this.bufs = [];
        }
      };
      createEncoder = () => new Encoder();
      length = (encoder) => {
        let len = encoder.cpos;
        for (let i = 0; i < encoder.bufs.length; i++) {
          len += encoder.bufs[i].length;
        }
        return len;
      };
      toUint8Array = (encoder) => {
        const uint8arr = new Uint8Array(length(encoder));
        let curPos = 0;
        for (let i = 0; i < encoder.bufs.length; i++) {
          const d = encoder.bufs[i];
          uint8arr.set(d, curPos);
          curPos += d.length;
        }
        uint8arr.set(new Uint8Array(encoder.cbuf.buffer, 0, encoder.cpos), curPos);
        return uint8arr;
      };
      verifyLen = (encoder, len) => {
        const bufferLen = encoder.cbuf.length;
        if (bufferLen - encoder.cpos < len) {
          encoder.bufs.push(new Uint8Array(encoder.cbuf.buffer, 0, encoder.cpos));
          encoder.cbuf = new Uint8Array(max(bufferLen, len) * 2);
          encoder.cpos = 0;
        }
      };
      write = (encoder, num) => {
        const bufferLen = encoder.cbuf.length;
        if (encoder.cpos === bufferLen) {
          encoder.bufs.push(encoder.cbuf);
          encoder.cbuf = new Uint8Array(bufferLen * 2);
          encoder.cpos = 0;
        }
        encoder.cbuf[encoder.cpos++] = num;
      };
      writeUint8 = write;
      writeVarUint = (encoder, num) => {
        while (num > BITS7) {
          write(encoder, BIT8 | BITS7 & num);
          num = floor(num / 128);
        }
        write(encoder, BITS7 & num);
      };
      writeVarInt = (encoder, num) => {
        const isNegative = isNegativeZero(num);
        if (isNegative) {
          num = -num;
        }
        write(encoder, (num > BITS6 ? BIT8 : 0) | (isNegative ? BIT7 : 0) | BITS6 & num);
        num = floor(num / 64);
        while (num > 0) {
          write(encoder, (num > BITS7 ? BIT8 : 0) | BITS7 & num);
          num = floor(num / 128);
        }
      };
      _strBuffer = new Uint8Array(3e4);
      _maxStrBSize = _strBuffer.length / 3;
      _writeVarStringNative = (encoder, str) => {
        if (str.length < _maxStrBSize) {
          const written = utf8TextEncoder.encodeInto(str, _strBuffer).written || 0;
          writeVarUint(encoder, written);
          for (let i = 0; i < written; i++) {
            write(encoder, _strBuffer[i]);
          }
        } else {
          writeVarUint8Array(encoder, encodeUtf8(str));
        }
      };
      _writeVarStringPolyfill = (encoder, str) => {
        const encodedString = unescape(encodeURIComponent(str));
        const len = encodedString.length;
        writeVarUint(encoder, len);
        for (let i = 0; i < len; i++) {
          write(
            encoder,
            /** @type {number} */
            encodedString.codePointAt(i)
          );
        }
      };
      writeVarString = utf8TextEncoder && /** @type {any} */
      utf8TextEncoder.encodeInto ? _writeVarStringNative : _writeVarStringPolyfill;
      writeUint8Array = (encoder, uint8Array) => {
        const bufferLen = encoder.cbuf.length;
        const cpos = encoder.cpos;
        const leftCopyLen = min(bufferLen - cpos, uint8Array.length);
        const rightCopyLen = uint8Array.length - leftCopyLen;
        encoder.cbuf.set(uint8Array.subarray(0, leftCopyLen), cpos);
        encoder.cpos += leftCopyLen;
        if (rightCopyLen > 0) {
          encoder.bufs.push(encoder.cbuf);
          encoder.cbuf = new Uint8Array(max(bufferLen * 2, rightCopyLen));
          encoder.cbuf.set(uint8Array.subarray(leftCopyLen));
          encoder.cpos = rightCopyLen;
        }
      };
      writeVarUint8Array = (encoder, uint8Array) => {
        writeVarUint(encoder, uint8Array.byteLength);
        writeUint8Array(encoder, uint8Array);
      };
      writeOnDataView = (encoder, len) => {
        verifyLen(encoder, len);
        const dview = new DataView(encoder.cbuf.buffer, encoder.cpos, len);
        encoder.cpos += len;
        return dview;
      };
      writeFloat32 = (encoder, num) => writeOnDataView(encoder, 4).setFloat32(0, num, false);
      writeFloat64 = (encoder, num) => writeOnDataView(encoder, 8).setFloat64(0, num, false);
      writeBigInt64 = (encoder, num) => (
        /** @type {any} */
        writeOnDataView(encoder, 8).setBigInt64(0, num, false)
      );
      floatTestBed = new DataView(new ArrayBuffer(4));
      isFloat32 = (num) => {
        floatTestBed.setFloat32(0, num);
        return floatTestBed.getFloat32(0) === num;
      };
      writeAny = (encoder, data) => {
        switch (typeof data) {
          case "string":
            write(encoder, 119);
            writeVarString(encoder, data);
            break;
          case "number":
            if (isInteger(data) && abs(data) <= BITS31) {
              write(encoder, 125);
              writeVarInt(encoder, data);
            } else if (isFloat32(data)) {
              write(encoder, 124);
              writeFloat32(encoder, data);
            } else {
              write(encoder, 123);
              writeFloat64(encoder, data);
            }
            break;
          case "bigint":
            write(encoder, 122);
            writeBigInt64(encoder, data);
            break;
          case "object":
            if (data === null) {
              write(encoder, 126);
            } else if (isArray(data)) {
              write(encoder, 117);
              writeVarUint(encoder, data.length);
              for (let i = 0; i < data.length; i++) {
                writeAny(encoder, data[i]);
              }
            } else if (data instanceof Uint8Array) {
              write(encoder, 116);
              writeVarUint8Array(encoder, data);
            } else {
              write(encoder, 118);
              const keys3 = Object.keys(data);
              writeVarUint(encoder, keys3.length);
              for (let i = 0; i < keys3.length; i++) {
                const key = keys3[i];
                writeVarString(encoder, key);
                writeAny(encoder, data[key]);
              }
            }
            break;
          case "boolean":
            write(encoder, data ? 120 : 121);
            break;
          default:
            write(encoder, 127);
        }
      };
      RleEncoder = class extends Encoder {
        /**
         * @param {function(Encoder, T):void} writer
         */
        constructor(writer) {
          super();
          this.w = writer;
          this.s = null;
          this.count = 0;
        }
        /**
         * @param {T} v
         */
        write(v) {
          if (this.s === v) {
            this.count++;
          } else {
            if (this.count > 0) {
              writeVarUint(this, this.count - 1);
            }
            this.count = 1;
            this.w(this, v);
            this.s = v;
          }
        }
      };
      flushUintOptRleEncoder = (encoder) => {
        if (encoder.count > 0) {
          writeVarInt(encoder.encoder, encoder.count === 1 ? encoder.s : -encoder.s);
          if (encoder.count > 1) {
            writeVarUint(encoder.encoder, encoder.count - 2);
          }
        }
      };
      UintOptRleEncoder = class {
        constructor() {
          this.encoder = new Encoder();
          this.s = 0;
          this.count = 0;
        }
        /**
         * @param {number} v
         */
        write(v) {
          if (this.s === v) {
            this.count++;
          } else {
            flushUintOptRleEncoder(this);
            this.count = 1;
            this.s = v;
          }
        }
        /**
         * Flush the encoded state and transform this to a Uint8Array.
         *
         * Note that this should only be called once.
         */
        toUint8Array() {
          flushUintOptRleEncoder(this);
          return toUint8Array(this.encoder);
        }
      };
      flushIntDiffOptRleEncoder = (encoder) => {
        if (encoder.count > 0) {
          const encodedDiff = encoder.diff * 2 + (encoder.count === 1 ? 0 : 1);
          writeVarInt(encoder.encoder, encodedDiff);
          if (encoder.count > 1) {
            writeVarUint(encoder.encoder, encoder.count - 2);
          }
        }
      };
      IntDiffOptRleEncoder = class {
        constructor() {
          this.encoder = new Encoder();
          this.s = 0;
          this.count = 0;
          this.diff = 0;
        }
        /**
         * @param {number} v
         */
        write(v) {
          if (this.diff === v - this.s) {
            this.s = v;
            this.count++;
          } else {
            flushIntDiffOptRleEncoder(this);
            this.count = 1;
            this.diff = v - this.s;
            this.s = v;
          }
        }
        /**
         * Flush the encoded state and transform this to a Uint8Array.
         *
         * Note that this should only be called once.
         */
        toUint8Array() {
          flushIntDiffOptRleEncoder(this);
          return toUint8Array(this.encoder);
        }
      };
      StringEncoder = class {
        constructor() {
          this.sarr = [];
          this.s = "";
          this.lensE = new UintOptRleEncoder();
        }
        /**
         * @param {string} string
         */
        write(string) {
          this.s += string;
          if (this.s.length > 19) {
            this.sarr.push(this.s);
            this.s = "";
          }
          this.lensE.write(string.length);
        }
        toUint8Array() {
          const encoder = new Encoder();
          this.sarr.push(this.s);
          this.s = "";
          writeVarString(encoder, this.sarr.join(""));
          writeUint8Array(encoder, this.lensE.toUint8Array());
          return toUint8Array(encoder);
        }
      };
    }
  });

  // node_modules/lib0/error.js
  var create3, methodUnimplemented, unexpectedCase;
  var init_error = __esm({
    "node_modules/lib0/error.js"() {
      create3 = (s) => new Error(s);
      methodUnimplemented = () => {
        throw create3("Method unimplemented");
      };
      unexpectedCase = () => {
        throw create3("Unexpected case");
      };
    }
  });

  // node_modules/lib0/decoding.js
  var errorUnexpectedEndOfArray, errorIntegerOutOfRange, Decoder, createDecoder, hasContent, readUint8Array, readVarUint8Array, readUint8, readVarUint, readVarInt, _readVarStringPolyfill, _readVarStringNative, readVarString, readFromDataView, readFloat32, readFloat64, readBigInt64, readAnyLookupTable, readAny, RleDecoder, UintOptRleDecoder, IntDiffOptRleDecoder, StringDecoder;
  var init_decoding = __esm({
    "node_modules/lib0/decoding.js"() {
      init_binary();
      init_math();
      init_number();
      init_string();
      init_error();
      errorUnexpectedEndOfArray = create3("Unexpected end of array");
      errorIntegerOutOfRange = create3("Integer out of Range");
      Decoder = class {
        /**
         * @param {Uint8Array<Buf>} uint8Array Binary data to decode
         */
        constructor(uint8Array) {
          this.arr = uint8Array;
          this.pos = 0;
        }
      };
      createDecoder = (uint8Array) => new Decoder(uint8Array);
      hasContent = (decoder) => decoder.pos !== decoder.arr.length;
      readUint8Array = (decoder, len) => {
        const view = new Uint8Array(decoder.arr.buffer, decoder.pos + decoder.arr.byteOffset, len);
        decoder.pos += len;
        return view;
      };
      readVarUint8Array = (decoder) => readUint8Array(decoder, readVarUint(decoder));
      readUint8 = (decoder) => decoder.arr[decoder.pos++];
      readVarUint = (decoder) => {
        let num = 0;
        let mult = 1;
        const len = decoder.arr.length;
        while (decoder.pos < len) {
          const r = decoder.arr[decoder.pos++];
          num = num + (r & BITS7) * mult;
          mult *= 128;
          if (r < BIT8) {
            return num;
          }
          if (num > MAX_SAFE_INTEGER) {
            throw errorIntegerOutOfRange;
          }
        }
        throw errorUnexpectedEndOfArray;
      };
      readVarInt = (decoder) => {
        let r = decoder.arr[decoder.pos++];
        let num = r & BITS6;
        let mult = 64;
        const sign = (r & BIT7) > 0 ? -1 : 1;
        if ((r & BIT8) === 0) {
          return sign * num;
        }
        const len = decoder.arr.length;
        while (decoder.pos < len) {
          r = decoder.arr[decoder.pos++];
          num = num + (r & BITS7) * mult;
          mult *= 128;
          if (r < BIT8) {
            return sign * num;
          }
          if (num > MAX_SAFE_INTEGER) {
            throw errorIntegerOutOfRange;
          }
        }
        throw errorUnexpectedEndOfArray;
      };
      _readVarStringPolyfill = (decoder) => {
        let remainingLen = readVarUint(decoder);
        if (remainingLen === 0) {
          return "";
        } else {
          let encodedString = String.fromCodePoint(readUint8(decoder));
          if (--remainingLen < 100) {
            while (remainingLen--) {
              encodedString += String.fromCodePoint(readUint8(decoder));
            }
          } else {
            while (remainingLen > 0) {
              const nextLen = remainingLen < 1e4 ? remainingLen : 1e4;
              const bytes = decoder.arr.subarray(decoder.pos, decoder.pos + nextLen);
              decoder.pos += nextLen;
              encodedString += String.fromCodePoint.apply(
                null,
                /** @type {any} */
                bytes
              );
              remainingLen -= nextLen;
            }
          }
          return decodeURIComponent(escape(encodedString));
        }
      };
      _readVarStringNative = (decoder) => (
        /** @type any */
        utf8TextDecoder.decode(readVarUint8Array(decoder))
      );
      readVarString = utf8TextDecoder ? _readVarStringNative : _readVarStringPolyfill;
      readFromDataView = (decoder, len) => {
        const dv = new DataView(decoder.arr.buffer, decoder.arr.byteOffset + decoder.pos, len);
        decoder.pos += len;
        return dv;
      };
      readFloat32 = (decoder) => readFromDataView(decoder, 4).getFloat32(0, false);
      readFloat64 = (decoder) => readFromDataView(decoder, 8).getFloat64(0, false);
      readBigInt64 = (decoder) => (
        /** @type {any} */
        readFromDataView(decoder, 8).getBigInt64(0, false)
      );
      readAnyLookupTable = [
        (decoder) => void 0,
        // CASE 127: undefined
        (decoder) => null,
        // CASE 126: null
        readVarInt,
        // CASE 125: integer
        readFloat32,
        // CASE 124: float32
        readFloat64,
        // CASE 123: float64
        readBigInt64,
        // CASE 122: bigint
        (decoder) => false,
        // CASE 121: boolean (false)
        (decoder) => true,
        // CASE 120: boolean (true)
        readVarString,
        // CASE 119: string
        (decoder) => {
          const len = readVarUint(decoder);
          const obj = {};
          for (let i = 0; i < len; i++) {
            const key = readVarString(decoder);
            obj[key] = readAny(decoder);
          }
          return obj;
        },
        (decoder) => {
          const len = readVarUint(decoder);
          const arr = [];
          for (let i = 0; i < len; i++) {
            arr.push(readAny(decoder));
          }
          return arr;
        },
        readVarUint8Array
        // CASE 116: Uint8Array
      ];
      readAny = (decoder) => readAnyLookupTable[127 - readUint8(decoder)](decoder);
      RleDecoder = class extends Decoder {
        /**
         * @param {Uint8Array} uint8Array
         * @param {function(Decoder):T} reader
         */
        constructor(uint8Array, reader) {
          super(uint8Array);
          this.reader = reader;
          this.s = null;
          this.count = 0;
        }
        read() {
          if (this.count === 0) {
            this.s = this.reader(this);
            if (hasContent(this)) {
              this.count = readVarUint(this) + 1;
            } else {
              this.count = -1;
            }
          }
          this.count--;
          return (
            /** @type {T} */
            this.s
          );
        }
      };
      UintOptRleDecoder = class extends Decoder {
        /**
         * @param {Uint8Array} uint8Array
         */
        constructor(uint8Array) {
          super(uint8Array);
          this.s = 0;
          this.count = 0;
        }
        read() {
          if (this.count === 0) {
            this.s = readVarInt(this);
            const isNegative = isNegativeZero(this.s);
            this.count = 1;
            if (isNegative) {
              this.s = -this.s;
              this.count = readVarUint(this) + 2;
            }
          }
          this.count--;
          return (
            /** @type {number} */
            this.s
          );
        }
      };
      IntDiffOptRleDecoder = class extends Decoder {
        /**
         * @param {Uint8Array} uint8Array
         */
        constructor(uint8Array) {
          super(uint8Array);
          this.s = 0;
          this.count = 0;
          this.diff = 0;
        }
        /**
         * @return {number}
         */
        read() {
          if (this.count === 0) {
            const diff = readVarInt(this);
            const hasCount = diff & 1;
            this.diff = floor(diff / 2);
            this.count = 1;
            if (hasCount) {
              this.count = readVarUint(this) + 2;
            }
          }
          this.s += this.diff;
          this.count--;
          return this.s;
        }
      };
      StringDecoder = class {
        /**
         * @param {Uint8Array} uint8Array
         */
        constructor(uint8Array) {
          this.decoder = new UintOptRleDecoder(uint8Array);
          this.str = readVarString(this.decoder);
          this.spos = 0;
        }
        /**
         * @return {string}
         */
        read() {
          const end = this.spos + this.decoder.read();
          const res = this.str.slice(this.spos, end);
          this.spos = end;
          return res;
        }
      };
    }
  });

  // node_modules/lib0/webcrypto.js
  var subtle, getRandomValues;
  var init_webcrypto = __esm({
    "node_modules/lib0/webcrypto.js"() {
      subtle = crypto.subtle;
      getRandomValues = crypto.getRandomValues.bind(crypto);
    }
  });

  // node_modules/lib0/random.js
  var uint32, uuidv4Template, uuidv4;
  var init_random = __esm({
    "node_modules/lib0/random.js"() {
      init_webcrypto();
      uint32 = () => getRandomValues(new Uint32Array(1))[0];
      uuidv4Template = "10000000-1000-4000-8000" + -1e11;
      uuidv4 = () => uuidv4Template.replace(
        /[018]/g,
        /** @param {number} c */
        (c) => (c ^ uint32() & 15 >> c / 4).toString(16)
      );
    }
  });

  // node_modules/lib0/time.js
  var getUnixTime;
  var init_time = __esm({
    "node_modules/lib0/time.js"() {
      getUnixTime = Date.now;
    }
  });

  // node_modules/lib0/promise.js
  var create4, all;
  var init_promise = __esm({
    "node_modules/lib0/promise.js"() {
      create4 = (f) => (
        /** @type {Promise<T>} */
        new Promise(f)
      );
      all = Promise.all.bind(Promise);
    }
  });

  // node_modules/lib0/conditions.js
  var undefinedToNull;
  var init_conditions = __esm({
    "node_modules/lib0/conditions.js"() {
      undefinedToNull = (v) => v === void 0 ? null : v;
    }
  });

  // node_modules/lib0/storage.js
  var VarStoragePolyfill, _localStorage, usePolyfill, varStorage, onChange, offChange;
  var init_storage = __esm({
    "node_modules/lib0/storage.js"() {
      VarStoragePolyfill = class {
        constructor() {
          this.map = /* @__PURE__ */ new Map();
        }
        /**
         * @param {string} key
         * @param {any} newValue
         */
        setItem(key, newValue) {
          this.map.set(key, newValue);
        }
        /**
         * @param {string} key
         */
        getItem(key) {
          return this.map.get(key);
        }
      };
      _localStorage = new VarStoragePolyfill();
      usePolyfill = true;
      try {
        if (typeof localStorage !== "undefined" && localStorage) {
          _localStorage = localStorage;
          usePolyfill = false;
        }
      } catch (e) {
      }
      varStorage = _localStorage;
      onChange = (eventHandler) => usePolyfill || addEventListener(
        "storage",
        /** @type {any} */
        eventHandler
      );
      offChange = (eventHandler) => usePolyfill || removeEventListener(
        "storage",
        /** @type {any} */
        eventHandler
      );
    }
  });

  // node_modules/lib0/trait/equality.js
  var EqualityTraitSymbol, equals;
  var init_equality = __esm({
    "node_modules/lib0/trait/equality.js"() {
      EqualityTraitSymbol = /* @__PURE__ */ Symbol("Equality");
      equals = (a, b) => a === b || !!a?.[EqualityTraitSymbol]?.(b) || false;
    }
  });

  // node_modules/lib0/object.js
  var isObject, assign, keys, forEach, map2, size, isEmpty, every2, hasProperty, equalFlat, freeze, deepFreeze;
  var init_object = __esm({
    "node_modules/lib0/object.js"() {
      init_equality();
      isObject = (o) => typeof o === "object";
      assign = Object.assign;
      keys = Object.keys;
      forEach = (obj, f) => {
        for (const key in obj) {
          f(obj[key], key);
        }
      };
      map2 = (obj, f) => {
        const results = [];
        for (const key in obj) {
          results.push(f(obj[key], key));
        }
        return results;
      };
      size = (obj) => keys(obj).length;
      isEmpty = (obj) => {
        for (const _k in obj) {
          return false;
        }
        return true;
      };
      every2 = (obj, f) => {
        for (const key in obj) {
          if (!f(obj[key], key)) {
            return false;
          }
        }
        return true;
      };
      hasProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
      equalFlat = (a, b) => a === b || size(a) === size(b) && every2(a, (val, key) => (val !== void 0 || hasProperty(b, key)) && equals(b[key], val));
      freeze = Object.freeze;
      deepFreeze = (o) => {
        for (const key in o) {
          const c = o[key];
          if (typeof c === "object" || typeof c === "function") {
            deepFreeze(o[key]);
          }
        }
        return freeze(o);
      };
    }
  });

  // node_modules/lib0/function.js
  var callAll, id, equalityDeep, isOneOf;
  var init_function = __esm({
    "node_modules/lib0/function.js"() {
      init_object();
      init_equality();
      callAll = (fs, args2, i = 0) => {
        try {
          for (; i < fs.length; i++) {
            fs[i](...args2);
          }
        } finally {
          if (i < fs.length) {
            callAll(fs, args2, i + 1);
          }
        }
      };
      id = (a) => a;
      equalityDeep = (a, b) => {
        if (a === b) {
          return true;
        }
        if (a == null || b == null || a.constructor !== b.constructor && (a.constructor || Object) !== (b.constructor || Object)) {
          return false;
        }
        if (a[EqualityTraitSymbol] != null) {
          return a[EqualityTraitSymbol](b);
        }
        switch (a.constructor) {
          case ArrayBuffer:
            a = new Uint8Array(a);
            b = new Uint8Array(b);
          // eslint-disable-next-line no-fallthrough
          case Uint8Array: {
            if (a.byteLength !== b.byteLength) {
              return false;
            }
            for (let i = 0; i < a.length; i++) {
              if (a[i] !== b[i]) {
                return false;
              }
            }
            break;
          }
          case Set: {
            if (a.size !== b.size) {
              return false;
            }
            for (const value of a) {
              if (!b.has(value)) {
                return false;
              }
            }
            break;
          }
          case Map: {
            if (a.size !== b.size) {
              return false;
            }
            for (const key of a.keys()) {
              if (!b.has(key) || !equalityDeep(a.get(key), b.get(key))) {
                return false;
              }
            }
            break;
          }
          case void 0:
          case Object:
            if (size(a) !== size(b)) {
              return false;
            }
            for (const key in a) {
              if (!hasProperty(a, key) || !equalityDeep(a[key], b[key])) {
                return false;
              }
            }
            break;
          case Array:
            if (a.length !== b.length) {
              return false;
            }
            for (let i = 0; i < a.length; i++) {
              if (!equalityDeep(a[i], b[i])) {
                return false;
              }
            }
            break;
          default:
            return false;
        }
        return true;
      };
      isOneOf = (value, options) => options.includes(value);
    }
  });

  // node_modules/lib0/environment.js
  var isNode, isBrowser, isMac, params, args, computeParams, hasParam, getVariable, hasConf, production, forceColor, supportsColor;
  var init_environment = __esm({
    "node_modules/lib0/environment.js"() {
      init_map();
      init_string();
      init_conditions();
      init_storage();
      init_function();
      isNode = typeof process !== "undefined" && process.release && /node|io\.js/.test(process.release.name) && Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
      isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && !isNode;
      isMac = typeof navigator !== "undefined" ? /Mac/.test(navigator.platform) : false;
      args = [];
      computeParams = () => {
        if (params === void 0) {
          if (isNode) {
            params = create();
            const pargs = process.argv;
            let currParamName = null;
            for (let i = 0; i < pargs.length; i++) {
              const parg = pargs[i];
              if (parg[0] === "-") {
                if (currParamName !== null) {
                  params.set(currParamName, "");
                }
                currParamName = parg;
              } else {
                if (currParamName !== null) {
                  params.set(currParamName, parg);
                  currParamName = null;
                } else {
                  args.push(parg);
                }
              }
            }
            if (currParamName !== null) {
              params.set(currParamName, "");
            }
          } else if (typeof location === "object") {
            params = create();
            (location.search || "?").slice(1).split("&").forEach((kv) => {
              if (kv.length !== 0) {
                const [key, value] = kv.split("=");
                params.set(`--${fromCamelCase(key, "-")}`, value);
                params.set(`-${fromCamelCase(key, "-")}`, value);
              }
            });
          } else {
            params = create();
          }
        }
        return params;
      };
      hasParam = (name) => computeParams().has(name);
      getVariable = (name) => isNode ? undefinedToNull(process.env[name.toUpperCase().replaceAll("-", "_")]) : undefinedToNull(varStorage.getItem(name));
      hasConf = (name) => hasParam("--" + name) || getVariable(name) !== null;
      production = hasConf("production");
      forceColor = isNode && isOneOf(process.env.FORCE_COLOR, ["true", "1", "2"]);
      supportsColor = forceColor || !hasParam("--no-colors") && // @todo deprecate --no-colors
      !hasConf("no-color") && (!isNode || process.stdout.isTTY) && (!isNode || hasParam("--color") || getVariable("COLORTERM") !== null || (getVariable("TERM") || "").includes("color"));
    }
  });

  // node_modules/lib0/buffer.js
  var createUint8ArrayFromLen, createUint8ArrayViewFromArrayBuffer, createUint8ArrayFromArrayBuffer, toBase64Browser, toBase64Node, fromBase64Browser, fromBase64Node, toBase64, fromBase64, copyUint8Array;
  var init_buffer = __esm({
    "node_modules/lib0/buffer.js"() {
      init_string();
      init_environment();
      createUint8ArrayFromLen = (len) => new Uint8Array(len);
      createUint8ArrayViewFromArrayBuffer = (buffer, byteOffset, length2) => new Uint8Array(buffer, byteOffset, length2);
      createUint8ArrayFromArrayBuffer = (buffer) => new Uint8Array(buffer);
      toBase64Browser = (bytes) => {
        let s = "";
        for (let i = 0; i < bytes.byteLength; i++) {
          s += fromCharCode(bytes[i]);
        }
        return btoa(s);
      };
      toBase64Node = (bytes) => Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).toString("base64");
      fromBase64Browser = (s) => {
        const a = atob(s);
        const bytes = createUint8ArrayFromLen(a.length);
        for (let i = 0; i < a.length; i++) {
          bytes[i] = a.charCodeAt(i);
        }
        return bytes;
      };
      fromBase64Node = (s) => {
        const buf = Buffer.from(s, "base64");
        return createUint8ArrayViewFromArrayBuffer(buf.buffer, buf.byteOffset, buf.byteLength);
      };
      toBase64 = isBrowser ? toBase64Browser : toBase64Node;
      fromBase64 = isBrowser ? fromBase64Browser : fromBase64Node;
      copyUint8Array = (uint8Array) => {
        const newBuf = createUint8ArrayFromLen(uint8Array.byteLength);
        newBuf.set(uint8Array);
        return newBuf;
      };
    }
  });

  // node_modules/lib0/pair.js
  var Pair, create5;
  var init_pair = __esm({
    "node_modules/lib0/pair.js"() {
      Pair = class {
        /**
         * @param {L} left
         * @param {R} right
         */
        constructor(left, right) {
          this.left = left;
          this.right = right;
        }
      };
      create5 = (left, right) => new Pair(left, right);
    }
  });

  // node_modules/lib0/prng.js
  var bool, int53, int32, int31, letter, word, oneOf;
  var init_prng = __esm({
    "node_modules/lib0/prng.js"() {
      init_string();
      init_math();
      bool = (gen) => gen.next() >= 0.5;
      int53 = (gen, min2, max2) => floor(gen.next() * (max2 + 1 - min2) + min2);
      int32 = (gen, min2, max2) => floor(gen.next() * (max2 + 1 - min2) + min2);
      int31 = (gen, min2, max2) => int32(gen, min2, max2);
      letter = (gen) => fromCharCode(int31(gen, 97, 122));
      word = (gen, minLen = 0, maxLen = 20) => {
        const len = int31(gen, minLen, maxLen);
        let str = "";
        for (let i = 0; i < len; i++) {
          str += letter(gen);
        }
        return str;
      };
      oneOf = (gen, array) => array[int31(gen, 0, array.length - 1)];
    }
  });

  // node_modules/lib0/schema.js
  var schemaSymbol, ValidationError, shapeExtends, Schema, $ConstructedBy, $constructedBy, $$constructedBy, $Custom, $custom, $$custom, $Literal, $literal, $$literal, _regexEscape, _schemaStringTemplateToRegex, $StringTemplate, $$stringTemplate, isOptionalSymbol, $Optional, $$optional, $Never, $never, $$never, $Object, $object, $$object, $objectAny, $Record, $record, $$record, $Tuple, $tuple, $$tuple, $Array, $array, $$array, $arrayAny, $InstanceOf, $instanceOf, $$instanceOf, $$schema, $Lambda, $$lambda, $function, $Intersection, $$intersect, $Union, $union, $$union, _t, $any, $$any, $bigint, $$bigint, $symbol, $$symbol, $number, $$number, $string, $$string, $boolean, $$boolean, $undefined, $$undefined, $void, $null, $$null, $uint8Array, $$uint8Array, $primitive, $json, $, assert, PatternMatcher, match, _random, random;
  var init_schema = __esm({
    "node_modules/lib0/schema.js"() {
      init_object();
      init_array();
      init_error();
      init_environment();
      init_equality();
      init_function();
      init_string();
      init_prng();
      init_number();
      schemaSymbol = /* @__PURE__ */ Symbol("0schema");
      ValidationError = class {
        constructor() {
          this._rerrs = [];
        }
        /**
         * @param {string?} path
         * @param {string} expected
         * @param {string} has
         * @param {string?} message
         */
        extend(path, expected, has, message = null) {
          this._rerrs.push({ path, expected, has, message });
        }
        toString() {
          const s = [];
          for (let i = this._rerrs.length - 1; i > 0; i--) {
            const r = this._rerrs[i];
            s.push(repeat(" ", (this._rerrs.length - i) * 2) + `${r.path != null ? `[${r.path}] ` : ""}${r.has} doesn't match ${r.expected}. ${r.message}`);
          }
          return s.join("\n");
        }
      };
      shapeExtends = (a, b) => {
        if (a === b) return true;
        if (a == null || b == null || a.constructor !== b.constructor) return false;
        if (a[EqualityTraitSymbol]) return equals(a, b);
        if (isArray(a)) {
          return every(
            a,
            (aitem) => some(b, (bitem) => shapeExtends(aitem, bitem))
          );
        } else if (isObject(a)) {
          return every2(
            a,
            (aitem, akey) => shapeExtends(aitem, b[akey])
          );
        }
        return false;
      };
      Schema = class {
        // this.shape must not be defined on Schema. Otherwise typecheck on metatypes (e.g. $$object) won't work as expected anymore
        /**
         * If true, the more things are added to the shape the more objects this schema will accept (e.g.
         * union). By default, the more objects are added, the the fewer objects this schema will accept.
         * @protected
         */
        static _dilutes = false;
        /**
         * @param {Schema<any>} other
         */
        extends(other) {
          let [a, b] = [
            /** @type {any} */
            this.shape,
            /** @type {any} */
            other.shape
          ];
          if (
            /** @type {typeof Schema<any>} */
            this.constructor._dilutes
          ) [b, a] = [a, b];
          return shapeExtends(a, b);
        }
        /**
         * Overwrite this when necessary. By default, we only check the `shape` property which every shape
         * should have.
         * @param {Schema<any>} other
         */
        equals(other) {
          return this.constructor === other.constructor && equalityDeep(this.shape, other.shape);
        }
        [schemaSymbol]() {
          return true;
        }
        /**
         * @param {object} other
         */
        [EqualityTraitSymbol](other) {
          return this.equals(
            /** @type {any} */
            other
          );
        }
        /**
         * Use `schema.validate(obj)` with a typed parameter that is already of typed to be an instance of
         * Schema. Validate will check the structure of the parameter and return true iff the instance
         * really is an instance of Schema.
         *
         * @param {T} o
         * @return {boolean}
         */
        validate(o) {
          return this.check(o);
        }
        /* c8 ignore start */
        /**
         * Similar to validate, but this method accepts untyped parameters.
         *
         * @param {any} _o
         * @param {ValidationError} [_err]
         * @return {_o is T}
         */
        check(_o, _err) {
          methodUnimplemented();
        }
        /* c8 ignore stop */
        /**
         * @type {Schema<T?>}
         */
        get nullable() {
          return $union(this, $null);
        }
        /**
         * @type {$Optional<Schema<T>>}
         */
        get optional() {
          return new $Optional(
            /** @type {Schema<T>} */
            this
          );
        }
        /**
         * Cast a variable to a specific type. Returns the casted value, or throws an exception otherwise.
         * Use this if you know that the type is of a specific type and you just want to convince the type
         * system.
         *
         * **Do not rely on these error messages!**
         * Performs an assertion check only if not in a production environment.
         *
         * @template OO
         * @param {OO} o
         * @return {Extract<OO, T> extends never ? T : (OO extends Array<never> ? T : Extract<OO,T>)}
         */
        cast(o) {
          assert(o, this);
          return (
            /** @type {any} */
            o
          );
        }
        /**
         * EXPECTO PATRONUM!! 🪄
         * This function protects against type errors. Though it may not work in the real world.
         *
         * "After all this time?"
         * "Always." - Snape, talking about type safety
         *
         * Ensures that a variable is a a specific type. Returns the value, or throws an exception if the assertion check failed.
         * Use this if you know that the type is of a specific type and you just want to convince the type
         * system.
         *
         * Can be useful when defining lambdas: `s.lambda(s.$number, s.$void).expect((n) => n + 1)`
         *
         * **Do not rely on these error messages!**
         * Performs an assertion check if not in a production environment.
         *
         * @param {T} o
         * @return {o extends T ? T : never}
         */
        expect(o) {
          assert(o, this);
          return o;
        }
      };
      $ConstructedBy = class extends Schema {
        /**
         * @param {C} c
         * @param {((o:Instance<C>)=>boolean)|null} check
         */
        constructor(c, check) {
          super();
          this.shape = c;
          this._c = check;
        }
        /**
         * @param {any} o
         * @param {ValidationError} [err]
         * @return {o is C extends ((...args:any[]) => infer T) ? T : (C extends (new (...args:any[]) => any) ? InstanceType<C> : never)} o
         */
        check(o, err = void 0) {
          const c = o?.constructor === this.shape && (this._c == null || this._c(o));
          !c && err?.extend(null, this.shape.name, o?.constructor.name, o?.constructor !== this.shape ? "Constructor match failed" : "Check failed");
          return c;
        }
      };
      $constructedBy = (c, check = null) => new $ConstructedBy(c, check);
      $$constructedBy = $constructedBy($ConstructedBy);
      $Custom = class extends Schema {
        /**
         * @param {(o:any) => boolean} check
         */
        constructor(check) {
          super();
          this.shape = check;
        }
        /**
         * @param {any} o
         * @param {ValidationError} err
         * @return {o is any}
         */
        check(o, err) {
          const c = this.shape(o);
          !c && err?.extend(null, "custom prop", o?.constructor.name, "failed to check custom prop");
          return c;
        }
      };
      $custom = (check) => new $Custom(check);
      $$custom = $constructedBy($Custom);
      $Literal = class extends Schema {
        /**
         * @param {Array<T>} literals
         */
        constructor(literals) {
          super();
          this.shape = literals;
        }
        /**
         *
         * @param {any} o
         * @param {ValidationError} [err]
         * @return {o is T}
         */
        check(o, err) {
          const c = this.shape.some((a) => a === o);
          !c && err?.extend(null, this.shape.join(" | "), o.toString());
          return c;
        }
      };
      $literal = (...literals) => new $Literal(literals);
      $$literal = $constructedBy($Literal);
      _regexEscape = /** @type {any} */
      RegExp.escape || /** @type {(str:string) => string} */
      ((str) => str.replace(/[().|&,$^[\]]/g, (s) => "\\" + s));
      _schemaStringTemplateToRegex = (s) => {
        if ($string.check(s)) {
          return [_regexEscape(s)];
        }
        if ($$literal.check(s)) {
          return (
            /** @type {Array<string|number>} */
            s.shape.map((v) => v + "")
          );
        }
        if ($$number.check(s)) {
          return ["[+-]?\\d+.?\\d*"];
        }
        if ($$string.check(s)) {
          return [".*"];
        }
        if ($$union.check(s)) {
          return s.shape.map(_schemaStringTemplateToRegex).flat(1);
        }
        unexpectedCase();
      };
      $StringTemplate = class extends Schema {
        /**
         * @param {T} shape
         */
        constructor(shape) {
          super();
          this.shape = shape;
          this._r = new RegExp("^" + shape.map(_schemaStringTemplateToRegex).map((opts) => `(${opts.join("|")})`).join("") + "$");
        }
        /**
         * @param {any} o
         * @param {ValidationError} [err]
         * @return {o is CastStringTemplateArgsToTemplate<T>}
         */
        check(o, err) {
          const c = this._r.exec(o) != null;
          !c && err?.extend(null, this._r.toString(), o.toString(), "String doesn't match string template.");
          return c;
        }
      };
      $$stringTemplate = $constructedBy($StringTemplate);
      isOptionalSymbol = /* @__PURE__ */ Symbol("optional");
      $Optional = class extends Schema {
        /**
         * @param {S} shape
         */
        constructor(shape) {
          super();
          this.shape = shape;
        }
        /**
         * @param {any} o
         * @param {ValidationError} [err]
         * @return {o is (Unwrap<S>|undefined)}
         */
        check(o, err) {
          const c = o === void 0 || this.shape.check(o);
          !c && err?.extend(null, "undefined (optional)", "()");
          return c;
        }
        get [isOptionalSymbol]() {
          return true;
        }
      };
      $$optional = $constructedBy($Optional);
      $Never = class extends Schema {
        /**
         * @param {any} _o
         * @param {ValidationError} [err]
         * @return {_o is never}
         */
        check(_o, err) {
          err?.extend(null, "never", typeof _o);
          return false;
        }
      };
      $never = new $Never();
      $$never = $constructedBy($Never);
      $Object = class _$Object extends Schema {
        /**
         * @param {S} shape
         * @param {boolean} partial
         */
        constructor(shape, partial = false) {
          super();
          this.shape = shape;
          this._isPartial = partial;
        }
        static _dilutes = true;
        /**
         * @type {Schema<Partial<$ObjectToType<S>>>}
         */
        get partial() {
          return new _$Object(this.shape, true);
        }
        /**
         * @param {any} o
         * @param {ValidationError} err
         * @return {o is $ObjectToType<S>}
         */
        check(o, err) {
          if (o == null) {
            err?.extend(null, "object", "null");
            return false;
          }
          return every2(this.shape, (vv, vk) => {
            const c = this._isPartial && !hasProperty(o, vk) || vv.check(o[vk], err);
            !c && err?.extend(vk.toString(), vv.toString(), typeof o[vk], "Object property does not match");
            return c;
          });
        }
      };
      $object = (def) => (
        /** @type {any} */
        new $Object(def)
      );
      $$object = $constructedBy($Object);
      $objectAny = $custom((o) => o != null && (o.constructor === Object || o.constructor == null));
      $Record = class extends Schema {
        /**
         * @param {Keys} keys
         * @param {Values} values
         */
        constructor(keys3, values) {
          super();
          this.shape = {
            keys: keys3,
            values
          };
        }
        /**
         * @param {any} o
         * @param {ValidationError} err
         * @return {o is { [key in Unwrap<Keys>]: Unwrap<Values> }}
         */
        check(o, err) {
          return o != null && every2(o, (vv, vk) => {
            const ck = this.shape.keys.check(vk, err);
            !ck && err?.extend(vk + "", "Record", typeof o, ck ? "Key doesn't match schema" : "Value doesn't match value");
            return ck && this.shape.values.check(vv, err);
          });
        }
      };
      $record = (keys3, values) => new $Record(keys3, values);
      $$record = $constructedBy($Record);
      $Tuple = class extends Schema {
        /**
         * @param {S} shape
         */
        constructor(shape) {
          super();
          this.shape = shape;
        }
        /**
         * @param {any} o
         * @param {ValidationError} err
         * @return {o is { [K in keyof S]: S[K] extends Schema<infer Type> ? Type : never }}
         */
        check(o, err) {
          return o != null && every2(this.shape, (vv, vk) => {
            const c = (
              /** @type {Schema<any>} */
              vv.check(o[vk], err)
            );
            !c && err?.extend(vk.toString(), "Tuple", typeof vv);
            return c;
          });
        }
      };
      $tuple = (...def) => new $Tuple(def);
      $$tuple = $constructedBy($Tuple);
      $Array = class extends Schema {
        /**
         * @param {Array<S>} v
         */
        constructor(v) {
          super();
          this.shape = v.length === 1 ? v[0] : new $Union(v);
        }
        /**
         * @param {any} o
         * @param {ValidationError} [err]
         * @return {o is Array<S extends Schema<infer T> ? T : never>} o
         */
        check(o, err) {
          const c = isArray(o) && every(o, (oi) => this.shape.check(oi));
          !c && err?.extend(null, "Array", "");
          return c;
        }
      };
      $array = (...def) => new $Array(def);
      $$array = $constructedBy($Array);
      $arrayAny = $custom((o) => isArray(o));
      $InstanceOf = class extends Schema {
        /**
         * @param {new (...args:any) => T} constructor
         * @param {((o:T) => boolean)|null} check
         */
        constructor(constructor, check) {
          super();
          this.shape = constructor;
          this._c = check;
        }
        /**
         * @param {any} o
         * @param {ValidationError} err
         * @return {o is T}
         */
        check(o, err) {
          const c = o instanceof this.shape && (this._c == null || this._c(o));
          !c && err?.extend(null, this.shape.name, o?.constructor.name);
          return c;
        }
      };
      $instanceOf = (c, check = null) => new $InstanceOf(c, check);
      $$instanceOf = $constructedBy($InstanceOf);
      $$schema = $instanceOf(Schema);
      $Lambda = class extends Schema {
        /**
         * @param {Args} args
         */
        constructor(args2) {
          super();
          this.len = args2.length - 1;
          this.args = $tuple(...args2.slice(-1));
          this.res = args2[this.len];
        }
        /**
         * @param {any} f
         * @param {ValidationError} err
         * @return {f is _LArgsToLambdaDef<Args>}
         */
        check(f, err) {
          const c = f.constructor === Function && f.length <= this.len;
          !c && err?.extend(null, "function", typeof f);
          return c;
        }
      };
      $$lambda = $constructedBy($Lambda);
      $function = $custom((o) => typeof o === "function");
      $Intersection = class extends Schema {
        /**
         * @param {T} v
         */
        constructor(v) {
          super();
          this.shape = v;
        }
        /**
         * @param {any} o
         * @param {ValidationError} [err]
         * @return {o is Intersect<UnwrapArray<T>>}
         */
        check(o, err) {
          const c = every(this.shape, (check) => check.check(o, err));
          !c && err?.extend(null, "Intersectinon", typeof o);
          return c;
        }
      };
      $$intersect = $constructedBy($Intersection, (o) => o.shape.length > 0);
      $Union = class extends Schema {
        static _dilutes = true;
        /**
         * @param {Array<Schema<S>>} v
         */
        constructor(v) {
          super();
          this.shape = v;
        }
        /**
         * @param {any} o
         * @param {ValidationError} [err]
         * @return {o is S}
         */
        check(o, err) {
          const c = some(this.shape, (vv) => vv.check(o, err));
          err?.extend(null, "Union", typeof o);
          return c;
        }
      };
      $union = (...schemas) => schemas.findIndex(($s) => $$union.check($s)) >= 0 ? $union(...schemas.map(($s) => $($s)).map(($s) => $$union.check($s) ? $s.shape : [$s]).flat(1)) : schemas.length === 1 ? schemas[0] : new $Union(schemas);
      $$union = /** @type {Schema<$Union<any>>} */
      $constructedBy($Union);
      _t = () => true;
      $any = $custom(_t);
      $$any = /** @type {Schema<Schema<any>>} */
      $constructedBy($Custom, (o) => o.shape === _t);
      $bigint = $custom((o) => typeof o === "bigint");
      $$bigint = /** @type {Schema<Schema<BigInt>>} */
      $custom((o) => o === $bigint);
      $symbol = $custom((o) => typeof o === "symbol");
      $$symbol = /** @type {Schema<Schema<Symbol>>} */
      $custom((o) => o === $symbol);
      $number = $custom((o) => typeof o === "number");
      $$number = /** @type {Schema<Schema<number>>} */
      $custom((o) => o === $number);
      $string = $custom((o) => typeof o === "string");
      $$string = /** @type {Schema<Schema<string>>} */
      $custom((o) => o === $string);
      $boolean = $custom((o) => typeof o === "boolean");
      $$boolean = /** @type {Schema<Schema<Boolean>>} */
      $custom((o) => o === $boolean);
      $undefined = $literal(void 0);
      $$undefined = /** @type {Schema<Schema<undefined>>} */
      $constructedBy($Literal, (o) => o.shape.length === 1 && o.shape[0] === void 0);
      $void = $literal(void 0);
      $null = $literal(null);
      $$null = /** @type {Schema<Schema<null>>} */
      $constructedBy($Literal, (o) => o.shape.length === 1 && o.shape[0] === null);
      $uint8Array = $constructedBy(Uint8Array);
      $$uint8Array = /** @type {Schema<Schema<Uint8Array>>} */
      $constructedBy($ConstructedBy, (o) => o.shape === Uint8Array);
      $primitive = $union($number, $string, $null, $undefined, $bigint, $boolean, $symbol);
      $json = (() => {
        const $jsonArr = (
          /** @type {$Array<$any>} */
          $array($any)
        );
        const $jsonRecord = (
          /** @type {$Record<$string,$any>} */
          $record($string, $any)
        );
        const $json2 = $union($number, $string, $null, $boolean, $jsonArr, $jsonRecord);
        $jsonArr.shape = $json2;
        $jsonRecord.shape.values = $json2;
        return $json2;
      })();
      $ = (o) => {
        if ($$schema.check(o)) {
          return (
            /** @type {any} */
            o
          );
        } else if ($objectAny.check(o)) {
          const o2 = {};
          for (const k in o) {
            o2[k] = $(o[k]);
          }
          return (
            /** @type {any} */
            $object(o2)
          );
        } else if ($arrayAny.check(o)) {
          return (
            /** @type {any} */
            $union(...o.map($))
          );
        } else if ($primitive.check(o)) {
          return (
            /** @type {any} */
            $literal(o)
          );
        } else if ($function.check(o)) {
          return (
            /** @type {any} */
            $constructedBy(
              /** @type {any} */
              o
            )
          );
        }
        unexpectedCase();
      };
      assert = production ? () => {
      } : (o, schema) => {
        const err = new ValidationError();
        if (!schema.check(o, err)) {
          throw create3(`Expected value to be of type ${schema.constructor.name}.
${err.toString()}`);
        }
      };
      PatternMatcher = class {
        /**
         * @param {Schema<State>} [$state]
         */
        constructor($state) {
          this.patterns = [];
          this.$state = $state;
        }
        /**
         * @template P
         * @template R
         * @param {P} pattern
         * @param {(o:NoInfer<Unwrap<ReadSchema<P>>>,s:State)=>R} handler
         * @return {PatternMatcher<State,Patterns|Pattern<Unwrap<ReadSchema<P>>,R>>}
         */
        if(pattern, handler) {
          this.patterns.push({ if: $(pattern), h: handler });
          return this;
        }
        /**
         * @template R
         * @param {(o:any,s:State)=>R} h
         */
        else(h) {
          return this.if($any, h);
        }
        /**
         * @return {State extends undefined
         *   ? <In extends Unwrap<Patterns['if']>>(o:In,state?:undefined)=>PatternMatchResult<Patterns,In>
         *   : <In extends Unwrap<Patterns['if']>>(o:In,state:State)=>PatternMatchResult<Patterns,In>}
         */
        done() {
          return (
            /** @type {any} */
            (o, s) => {
              for (let i = 0; i < this.patterns.length; i++) {
                const p = this.patterns[i];
                if (p.if.check(o)) {
                  return p.h(o, s);
                }
              }
              throw create3("Unhandled pattern");
            }
          );
        }
      };
      match = (state) => new PatternMatcher(
        /** @type {any} */
        state
      );
      _random = /** @type {any} */
      match(
        /** @type {Schema<prng.PRNG>} */
        $any
      ).if($$number, (_o, gen) => int53(gen, MIN_SAFE_INTEGER, MAX_SAFE_INTEGER)).if($$string, (_o, gen) => word(gen)).if($$boolean, (_o, gen) => bool(gen)).if($$bigint, (_o, gen) => BigInt(int53(gen, MIN_SAFE_INTEGER, MAX_SAFE_INTEGER))).if($$union, (o, gen) => random(gen, oneOf(gen, o.shape))).if($$object, (o, gen) => {
        const res = {};
        for (const k in o.shape) {
          let prop = o.shape[k];
          if ($$optional.check(prop)) {
            if (bool(gen)) {
              continue;
            }
            prop = prop.shape;
          }
          res[k] = _random(prop, gen);
        }
        return res;
      }).if($$array, (o, gen) => {
        const arr = [];
        const n = int32(gen, 0, 42);
        for (let i = 0; i < n; i++) {
          arr.push(random(gen, o.shape));
        }
        return arr;
      }).if($$literal, (o, gen) => {
        return oneOf(gen, o.shape);
      }).if($$null, (o, gen) => {
        return null;
      }).if($$lambda, (o, gen) => {
        const res = random(gen, o.res);
        return () => res;
      }).if($$any, (o, gen) => random(gen, oneOf(gen, [
        $number,
        $string,
        $null,
        $undefined,
        $bigint,
        $boolean,
        $array($number),
        $record($union("a", "b", "c"), $number)
      ]))).if($$record, (o, gen) => {
        const res = {};
        const keysN = int53(gen, 0, 3);
        for (let i = 0; i < keysN; i++) {
          const key = random(gen, o.shape.keys);
          const val = random(gen, o.shape.values);
          res[key] = val;
        }
        return res;
      }).done();
      random = (gen, schema) => (
        /** @type {any} */
        _random($(schema), gen)
      );
    }
  });

  // node_modules/lib0/dom.js
  var doc, $fragment, domParser, $element, $text, mapToStyleString, ELEMENT_NODE, TEXT_NODE, CDATA_SECTION_NODE, COMMENT_NODE, DOCUMENT_NODE, DOCUMENT_TYPE_NODE, DOCUMENT_FRAGMENT_NODE, $node;
  var init_dom = __esm({
    "node_modules/lib0/dom.js"() {
      init_map();
      init_schema();
      doc = /** @type {Document} */
      typeof document !== "undefined" ? document : {};
      $fragment = $custom((el) => el.nodeType === DOCUMENT_FRAGMENT_NODE);
      domParser = /** @type {DOMParser} */
      typeof DOMParser !== "undefined" ? new DOMParser() : null;
      $element = $custom((el) => el.nodeType === ELEMENT_NODE);
      $text = $custom((el) => el.nodeType === TEXT_NODE);
      mapToStyleString = (m) => map(m, (value, key) => `${key}:${value};`).join("");
      ELEMENT_NODE = doc.ELEMENT_NODE;
      TEXT_NODE = doc.TEXT_NODE;
      CDATA_SECTION_NODE = doc.CDATA_SECTION_NODE;
      COMMENT_NODE = doc.COMMENT_NODE;
      DOCUMENT_NODE = doc.DOCUMENT_NODE;
      DOCUMENT_TYPE_NODE = doc.DOCUMENT_TYPE_NODE;
      DOCUMENT_FRAGMENT_NODE = doc.DOCUMENT_FRAGMENT_NODE;
      $node = $custom((el) => el.nodeType === DOCUMENT_NODE);
    }
  });

  // node_modules/lib0/symbol.js
  var create6;
  var init_symbol = __esm({
    "node_modules/lib0/symbol.js"() {
      create6 = Symbol;
    }
  });

  // node_modules/lib0/logging.common.js
  var BOLD, UNBOLD, BLUE, GREY, GREEN, RED, PURPLE, ORANGE, UNCOLOR, computeNoColorLoggingArgs, lastLoggingTime;
  var init_logging_common = __esm({
    "node_modules/lib0/logging.common.js"() {
      init_symbol();
      init_time();
      BOLD = create6();
      UNBOLD = create6();
      BLUE = create6();
      GREY = create6();
      GREEN = create6();
      RED = create6();
      PURPLE = create6();
      ORANGE = create6();
      UNCOLOR = create6();
      computeNoColorLoggingArgs = (args2) => {
        if (args2.length === 1 && args2[0]?.constructor === Function) {
          args2 = /** @type {Array<string|Symbol|Object|number>} */
          /** @type {[function]} */
          args2[0]();
        }
        const strBuilder = [];
        const logArgs = [];
        let i = 0;
        for (; i < args2.length; i++) {
          const arg = args2[i];
          if (arg === void 0) {
            break;
          } else if (arg.constructor === String || arg.constructor === Number) {
            strBuilder.push(arg);
          } else if (arg.constructor === Object) {
            break;
          }
        }
        if (i > 0) {
          logArgs.push(strBuilder.join(""));
        }
        for (; i < args2.length; i++) {
          const arg = args2[i];
          if (!(arg instanceof Symbol)) {
            logArgs.push(arg);
          }
        }
        return logArgs;
      };
      lastLoggingTime = getUnixTime();
    }
  });

  // node_modules/lib0/logging.js
  var _browserStyleMap, computeBrowserLoggingArgs, computeLoggingArgs, print, warn, vconsoles;
  var init_logging = __esm({
    "node_modules/lib0/logging.js"() {
      init_environment();
      init_set();
      init_pair();
      init_dom();
      init_map();
      init_logging_common();
      init_logging_common();
      _browserStyleMap = {
        [BOLD]: create5("font-weight", "bold"),
        [UNBOLD]: create5("font-weight", "normal"),
        [BLUE]: create5("color", "blue"),
        [GREEN]: create5("color", "green"),
        [GREY]: create5("color", "grey"),
        [RED]: create5("color", "red"),
        [PURPLE]: create5("color", "purple"),
        [ORANGE]: create5("color", "orange"),
        // not well supported in chrome when debugging node with inspector - TODO: deprecate
        [UNCOLOR]: create5("color", "black")
      };
      computeBrowserLoggingArgs = (args2) => {
        if (args2.length === 1 && args2[0]?.constructor === Function) {
          args2 = /** @type {Array<string|Symbol|Object|number>} */
          /** @type {[function]} */
          args2[0]();
        }
        const strBuilder = [];
        const styles = [];
        const currentStyle = create();
        let logArgs = [];
        let i = 0;
        for (; i < args2.length; i++) {
          const arg = args2[i];
          const style = _browserStyleMap[arg];
          if (style !== void 0) {
            currentStyle.set(style.left, style.right);
          } else {
            if (arg === void 0) {
              break;
            }
            if (arg.constructor === String || arg.constructor === Number) {
              const style2 = mapToStyleString(currentStyle);
              if (i > 0 || style2.length > 0) {
                strBuilder.push("%c" + arg);
                styles.push(style2);
              } else {
                strBuilder.push(arg);
              }
            } else {
              break;
            }
          }
        }
        if (i > 0) {
          logArgs = styles;
          logArgs.unshift(strBuilder.join(""));
        }
        for (; i < args2.length; i++) {
          const arg = args2[i];
          if (!(arg instanceof Symbol)) {
            logArgs.push(arg);
          }
        }
        return logArgs;
      };
      computeLoggingArgs = supportsColor ? computeBrowserLoggingArgs : computeNoColorLoggingArgs;
      print = (...args2) => {
        console.log(...computeLoggingArgs(args2));
        vconsoles.forEach((vc) => vc.print(args2));
      };
      warn = (...args2) => {
        console.warn(...computeLoggingArgs(args2));
        args2.unshift(ORANGE);
        vconsoles.forEach((vc) => vc.print(args2));
      };
      vconsoles = create2();
    }
  });

  // node_modules/lib0/iterator.js
  var createIterator, iteratorFilter, iteratorMap;
  var init_iterator = __esm({
    "node_modules/lib0/iterator.js"() {
      createIterator = (next) => ({
        /**
         * @return {IterableIterator<T>}
         */
        [Symbol.iterator]() {
          return this;
        },
        // @ts-ignore
        next
      });
      iteratorFilter = (iterator, filter) => createIterator(() => {
        let res;
        do {
          res = iterator.next();
        } while (!res.done && !filter(res.value));
        return res;
      });
      iteratorMap = (iterator, fmap) => createIterator(() => {
        const { done, value } = iterator.next();
        return { done, value: done ? void 0 : fmap(value) };
      });
    }
  });

  // node_modules/yjs/dist/yjs.mjs
  function* lazyStructReaderGenerator(decoder) {
    const numOfStateUpdates = readVarUint(decoder.restDecoder);
    for (let i = 0; i < numOfStateUpdates; i++) {
      const numberOfStructs = readVarUint(decoder.restDecoder);
      const client = decoder.readClient();
      let clock = readVarUint(decoder.restDecoder);
      for (let i2 = 0; i2 < numberOfStructs; i2++) {
        const info = decoder.readInfo();
        if (info === 10) {
          const len = readVarUint(decoder.restDecoder);
          yield new Skip(createID(client, clock), len);
          clock += len;
        } else if ((BITS5 & info) !== 0) {
          const cantCopyParentInfo = (info & (BIT7 | BIT8)) === 0;
          const struct = new Item(
            createID(client, clock),
            null,
            // left
            (info & BIT8) === BIT8 ? decoder.readLeftID() : null,
            // origin
            null,
            // right
            (info & BIT7) === BIT7 ? decoder.readRightID() : null,
            // right origin
            // @ts-ignore Force writing a string here.
            cantCopyParentInfo ? decoder.readParentInfo() ? decoder.readString() : decoder.readLeftID() : null,
            // parent
            cantCopyParentInfo && (info & BIT6) === BIT6 ? decoder.readString() : null,
            // parentSub
            readItemContent(decoder, info)
            // item content
          );
          yield struct;
          clock += struct.length;
        } else {
          const len = decoder.readLen();
          yield new GC(createID(client, clock), len);
          clock += len;
        }
      }
    }
  }
  var DeleteItem, DeleteSet, iterateDeletedStructs, findIndexDS, isDeleted, sortAndMergeDeleteSet, mergeDeleteSets, addToDeleteSet, createDeleteSet, createDeleteSetFromStructStore, writeDeleteSet, readDeleteSet, readAndApplyDeleteSet, generateNewClientId, Doc, DSDecoderV1, UpdateDecoderV1, DSDecoderV2, UpdateDecoderV2, DSEncoderV1, UpdateEncoderV1, DSEncoderV2, UpdateEncoderV2, writeStructs, writeClientsStructs, readClientsStructRefs, integrateStructs, writeStructsFromTransaction, readUpdateV2, applyUpdateV2, applyUpdate, writeStateAsUpdate, encodeStateAsUpdateV2, encodeStateAsUpdate, readStateVector, decodeStateVector, writeStateVector, writeDocumentStateVector, encodeStateVectorV2, encodeStateVector, EventHandler, createEventHandler, addEventHandlerListener, removeEventHandlerListener, callEventHandlerListeners, ID, compareIDs, createID, findRootTypeKey, RelativePosition, createRelativePositionFromJSON, AbsolutePosition, createAbsolutePosition, createRelativePosition, createRelativePositionFromTypeIndex, getItemWithOffset, createAbsolutePositionFromRelativePosition, compareRelativePositions, Snapshot, createSnapshot, emptySnapshot, isVisible, splitSnapshotAffectedStructs, StructStore, getStateVector, getState, addStruct, findIndexSS, find, getItem, findIndexCleanStart, getItemCleanStart, getItemCleanEnd, replaceStruct, iterateStructs, Transaction, writeUpdateMessageFromTransaction, addChangedTypeToTransaction, tryToMergeWithLefts, tryGcDeleteSet, tryMergeDeleteSet, cleanupTransactions, transact, LazyStructReader, LazyStructWriter, mergeUpdates, sliceStruct, mergeUpdatesV2, diffUpdateV2, flushLazyStructWriter, writeStructToLazyStructWriter, finishLazyStructWriting, convertUpdateFormat, convertUpdateFormatV2ToV1, errorComputeChanges, YEvent, getPathTo, warnPrematureAccess, maxSearchMarker, globalSearchMarkerTimestamp, ArraySearchMarker, refreshMarkerTimestamp, overwriteMarker, markPosition, findMarker, updateMarkerChanges, callTypeObservers, AbstractType, typeListSlice, typeListToArray, typeListForEach, typeListMap, typeListCreateIterator, typeListGet, typeListInsertGenericsAfter, lengthExceeded, typeListInsertGenerics, typeListPushGenerics, typeListDelete, typeMapDelete, typeMapSet, typeMapGet, typeMapGetAll, typeMapHas, typeMapGetAllSnapshot, createMapIterator, YArrayEvent, YArray, readYArray, YMapEvent, YMap, readYMap, equalAttrs, ItemTextListPosition, findNextPosition, findPosition, insertNegatedAttributes, updateCurrentAttributes, minimizeAttributeChanges, insertAttributes, insertText, formatText, cleanupFormattingGap, cleanupContextlessFormattingGap, cleanupYTextFormatting, cleanupYTextAfterTransaction, deleteText, YTextEvent, YText, readYText, YXmlTreeWalker, YXmlFragment, readYXmlFragment, YXmlElement, readYXmlElement, YXmlEvent, YXmlHook, readYXmlHook, YXmlText, readYXmlText, AbstractStruct, structGCRefNumber, GC, ContentBinary, readContentBinary, ContentDeleted, readContentDeleted, createDocFromOpts, ContentDoc, readContentDoc, ContentEmbed, readContentEmbed, ContentFormat, readContentFormat, ContentJSON, readContentJSON, isDevMode, ContentAny, readContentAny, ContentString, readContentString, typeRefs, YArrayRefID, YMapRefID, YTextRefID, YXmlElementRefID, YXmlFragmentRefID, YXmlHookRefID, YXmlTextRefID, ContentType, readContentType, followRedone, splitItem, Item, readItemContent, contentRefs, structSkipRefNumber, Skip, glo, importIdentifier;
  var init_yjs = __esm({
    "node_modules/yjs/dist/yjs.mjs"() {
      init_observable();
      init_array();
      init_math();
      init_map();
      init_encoding();
      init_decoding();
      init_random();
      init_promise();
      init_buffer();
      init_error();
      init_binary();
      init_function();
      init_function();
      init_set();
      init_logging();
      init_iterator();
      init_object();
      init_environment();
      DeleteItem = class {
        /**
         * @param {number} clock
         * @param {number} len
         */
        constructor(clock, len) {
          this.clock = clock;
          this.len = len;
        }
      };
      DeleteSet = class {
        constructor() {
          this.clients = /* @__PURE__ */ new Map();
        }
      };
      iterateDeletedStructs = (transaction, ds, f) => ds.clients.forEach((deletes, clientid) => {
        const structs = (
          /** @type {Array<GC|Item>} */
          transaction.doc.store.clients.get(clientid)
        );
        if (structs != null) {
          const lastStruct = structs[structs.length - 1];
          const clockState = lastStruct.id.clock + lastStruct.length;
          for (let i = 0, del = deletes[i]; i < deletes.length && del.clock < clockState; del = deletes[++i]) {
            iterateStructs(transaction, structs, del.clock, del.len, f);
          }
        }
      });
      findIndexDS = (dis, clock) => {
        let left = 0;
        let right = dis.length - 1;
        while (left <= right) {
          const midindex = floor((left + right) / 2);
          const mid = dis[midindex];
          const midclock = mid.clock;
          if (midclock <= clock) {
            if (clock < midclock + mid.len) {
              return midindex;
            }
            left = midindex + 1;
          } else {
            right = midindex - 1;
          }
        }
        return null;
      };
      isDeleted = (ds, id2) => {
        const dis = ds.clients.get(id2.client);
        return dis !== void 0 && findIndexDS(dis, id2.clock) !== null;
      };
      sortAndMergeDeleteSet = (ds) => {
        ds.clients.forEach((dels) => {
          dels.sort((a, b) => a.clock - b.clock);
          let i, j;
          for (i = 1, j = 1; i < dels.length; i++) {
            const left = dels[j - 1];
            const right = dels[i];
            if (left.clock + left.len >= right.clock) {
              dels[j - 1] = new DeleteItem(left.clock, max(left.len, right.clock + right.len - left.clock));
            } else {
              if (j < i) {
                dels[j] = right;
              }
              j++;
            }
          }
          dels.length = j;
        });
      };
      mergeDeleteSets = (dss) => {
        const merged = new DeleteSet();
        for (let dssI = 0; dssI < dss.length; dssI++) {
          dss[dssI].clients.forEach((delsLeft, client) => {
            if (!merged.clients.has(client)) {
              const dels = delsLeft.slice();
              for (let i = dssI + 1; i < dss.length; i++) {
                appendTo(dels, dss[i].clients.get(client) || []);
              }
              merged.clients.set(client, dels);
            }
          });
        }
        sortAndMergeDeleteSet(merged);
        return merged;
      };
      addToDeleteSet = (ds, client, clock, length2) => {
        setIfUndefined(ds.clients, client, () => (
          /** @type {Array<DeleteItem>} */
          []
        )).push(new DeleteItem(clock, length2));
      };
      createDeleteSet = () => new DeleteSet();
      createDeleteSetFromStructStore = (ss) => {
        const ds = createDeleteSet();
        ss.clients.forEach((structs, client) => {
          const dsitems = [];
          for (let i = 0; i < structs.length; i++) {
            const struct = structs[i];
            if (struct.deleted) {
              const clock = struct.id.clock;
              let len = struct.length;
              if (i + 1 < structs.length) {
                for (let next = structs[i + 1]; i + 1 < structs.length && next.deleted; next = structs[++i + 1]) {
                  len += next.length;
                }
              }
              dsitems.push(new DeleteItem(clock, len));
            }
          }
          if (dsitems.length > 0) {
            ds.clients.set(client, dsitems);
          }
        });
        return ds;
      };
      writeDeleteSet = (encoder, ds) => {
        writeVarUint(encoder.restEncoder, ds.clients.size);
        from(ds.clients.entries()).sort((a, b) => b[0] - a[0]).forEach(([client, dsitems]) => {
          encoder.resetDsCurVal();
          writeVarUint(encoder.restEncoder, client);
          const len = dsitems.length;
          writeVarUint(encoder.restEncoder, len);
          for (let i = 0; i < len; i++) {
            const item = dsitems[i];
            encoder.writeDsClock(item.clock);
            encoder.writeDsLen(item.len);
          }
        });
      };
      readDeleteSet = (decoder) => {
        const ds = new DeleteSet();
        const numClients = readVarUint(decoder.restDecoder);
        for (let i = 0; i < numClients; i++) {
          decoder.resetDsCurVal();
          const client = readVarUint(decoder.restDecoder);
          const numberOfDeletes = readVarUint(decoder.restDecoder);
          if (numberOfDeletes > 0) {
            const dsField = setIfUndefined(ds.clients, client, () => (
              /** @type {Array<DeleteItem>} */
              []
            ));
            for (let i2 = 0; i2 < numberOfDeletes; i2++) {
              dsField.push(new DeleteItem(decoder.readDsClock(), decoder.readDsLen()));
            }
          }
        }
        return ds;
      };
      readAndApplyDeleteSet = (decoder, transaction, store) => {
        const unappliedDS = new DeleteSet();
        const numClients = readVarUint(decoder.restDecoder);
        for (let i = 0; i < numClients; i++) {
          decoder.resetDsCurVal();
          const client = readVarUint(decoder.restDecoder);
          const numberOfDeletes = readVarUint(decoder.restDecoder);
          const structs = store.clients.get(client) || [];
          const state = getState(store, client);
          for (let i2 = 0; i2 < numberOfDeletes; i2++) {
            const clock = decoder.readDsClock();
            const clockEnd = clock + decoder.readDsLen();
            if (clock < state) {
              if (state < clockEnd) {
                addToDeleteSet(unappliedDS, client, state, clockEnd - state);
              }
              let index = findIndexSS(structs, clock);
              let struct = structs[index];
              if (!struct.deleted && struct.id.clock < clock) {
                structs.splice(index + 1, 0, splitItem(transaction, struct, clock - struct.id.clock));
                index++;
              }
              while (index < structs.length) {
                struct = structs[index++];
                if (struct.id.clock < clockEnd) {
                  if (!struct.deleted) {
                    if (clockEnd < struct.id.clock + struct.length) {
                      structs.splice(index, 0, splitItem(transaction, struct, clockEnd - struct.id.clock));
                    }
                    struct.delete(transaction);
                  }
                } else {
                  break;
                }
              }
            } else {
              addToDeleteSet(unappliedDS, client, clock, clockEnd - clock);
            }
          }
        }
        if (unappliedDS.clients.size > 0) {
          const ds = new UpdateEncoderV2();
          writeVarUint(ds.restEncoder, 0);
          writeDeleteSet(ds, unappliedDS);
          return ds.toUint8Array();
        }
        return null;
      };
      generateNewClientId = uint32;
      Doc = class _Doc extends ObservableV2 {
        /**
         * @param {DocOpts} opts configuration
         */
        constructor({ guid = uuidv4(), collectionid = null, gc = true, gcFilter = () => true, meta = null, autoLoad = false, shouldLoad = true } = {}) {
          super();
          this.gc = gc;
          this.gcFilter = gcFilter;
          this.clientID = generateNewClientId();
          this.guid = guid;
          this.collectionid = collectionid;
          this.share = /* @__PURE__ */ new Map();
          this.store = new StructStore();
          this._transaction = null;
          this._transactionCleanups = [];
          this.subdocs = /* @__PURE__ */ new Set();
          this._item = null;
          this.shouldLoad = shouldLoad;
          this.autoLoad = autoLoad;
          this.meta = meta;
          this.isLoaded = false;
          this.isSynced = false;
          this.isDestroyed = false;
          this.whenLoaded = create4((resolve) => {
            this.on("load", () => {
              this.isLoaded = true;
              resolve(this);
            });
          });
          const provideSyncedPromise = () => create4((resolve) => {
            const eventHandler = (isSynced) => {
              if (isSynced === void 0 || isSynced === true) {
                this.off("sync", eventHandler);
                resolve();
              }
            };
            this.on("sync", eventHandler);
          });
          this.on("sync", (isSynced) => {
            if (isSynced === false && this.isSynced) {
              this.whenSynced = provideSyncedPromise();
            }
            this.isSynced = isSynced === void 0 || isSynced === true;
            if (this.isSynced && !this.isLoaded) {
              this.emit("load", [this]);
            }
          });
          this.whenSynced = provideSyncedPromise();
        }
        /**
         * Notify the parent document that you request to load data into this subdocument (if it is a subdocument).
         *
         * `load()` might be used in the future to request any provider to load the most current data.
         *
         * It is safe to call `load()` multiple times.
         */
        load() {
          const item = this._item;
          if (item !== null && !this.shouldLoad) {
            transact(
              /** @type {any} */
              item.parent.doc,
              (transaction) => {
                transaction.subdocsLoaded.add(this);
              },
              null,
              true
            );
          }
          this.shouldLoad = true;
        }
        getSubdocs() {
          return this.subdocs;
        }
        getSubdocGuids() {
          return new Set(from(this.subdocs).map((doc2) => doc2.guid));
        }
        /**
         * Changes that happen inside of a transaction are bundled. This means that
         * the observer fires _after_ the transaction is finished and that all changes
         * that happened inside of the transaction are sent as one message to the
         * other peers.
         *
         * @template T
         * @param {function(Transaction):T} f The function that should be executed as a transaction
         * @param {any} [origin] Origin of who started the transaction. Will be stored on transaction.origin
         * @return T
         *
         * @public
         */
        transact(f, origin = null) {
          return transact(this, f, origin);
        }
        /**
         * Define a shared data type.
         *
         * Multiple calls of `ydoc.get(name, TypeConstructor)` yield the same result
         * and do not overwrite each other. I.e.
         * `ydoc.get(name, Y.Array) === ydoc.get(name, Y.Array)`
         *
         * After this method is called, the type is also available on `ydoc.share.get(name)`.
         *
         * *Best Practices:*
         * Define all types right after the Y.Doc instance is created and store them in a separate object.
         * Also use the typed methods `getText(name)`, `getArray(name)`, ..
         *
         * @template {typeof AbstractType<any>} Type
         * @example
         *   const ydoc = new Y.Doc(..)
         *   const appState = {
         *     document: ydoc.getText('document')
         *     comments: ydoc.getArray('comments')
         *   }
         *
         * @param {string} name
         * @param {Type} TypeConstructor The constructor of the type definition. E.g. Y.Text, Y.Array, Y.Map, ...
         * @return {InstanceType<Type>} The created type. Constructed with TypeConstructor
         *
         * @public
         */
        get(name, TypeConstructor = (
          /** @type {any} */
          AbstractType
        )) {
          const type = setIfUndefined(this.share, name, () => {
            const t = new TypeConstructor();
            t._integrate(this, null);
            return t;
          });
          const Constr = type.constructor;
          if (TypeConstructor !== AbstractType && Constr !== TypeConstructor) {
            if (Constr === AbstractType) {
              const t = new TypeConstructor();
              t._map = type._map;
              type._map.forEach(
                /** @param {Item?} n */
                (n) => {
                  for (; n !== null; n = n.left) {
                    n.parent = t;
                  }
                }
              );
              t._start = type._start;
              for (let n = t._start; n !== null; n = n.right) {
                n.parent = t;
              }
              t._length = type._length;
              this.share.set(name, t);
              t._integrate(this, null);
              return (
                /** @type {InstanceType<Type>} */
                t
              );
            } else {
              throw new Error(`Type with the name ${name} has already been defined with a different constructor`);
            }
          }
          return (
            /** @type {InstanceType<Type>} */
            type
          );
        }
        /**
         * @template T
         * @param {string} [name]
         * @return {YArray<T>}
         *
         * @public
         */
        getArray(name = "") {
          return (
            /** @type {YArray<T>} */
            this.get(name, YArray)
          );
        }
        /**
         * @param {string} [name]
         * @return {YText}
         *
         * @public
         */
        getText(name = "") {
          return this.get(name, YText);
        }
        /**
         * @template T
         * @param {string} [name]
         * @return {YMap<T>}
         *
         * @public
         */
        getMap(name = "") {
          return (
            /** @type {YMap<T>} */
            this.get(name, YMap)
          );
        }
        /**
         * @param {string} [name]
         * @return {YXmlElement}
         *
         * @public
         */
        getXmlElement(name = "") {
          return (
            /** @type {YXmlElement<{[key:string]:string}>} */
            this.get(name, YXmlElement)
          );
        }
        /**
         * @param {string} [name]
         * @return {YXmlFragment}
         *
         * @public
         */
        getXmlFragment(name = "") {
          return this.get(name, YXmlFragment);
        }
        /**
         * Converts the entire document into a js object, recursively traversing each yjs type
         * Doesn't log types that have not been defined (using ydoc.getType(..)).
         *
         * @deprecated Do not use this method and rather call toJSON directly on the shared types.
         *
         * @return {Object<string, any>}
         */
        toJSON() {
          const doc2 = {};
          this.share.forEach((value, key) => {
            doc2[key] = value.toJSON();
          });
          return doc2;
        }
        /**
         * Emit `destroy` event and unregister all event handlers.
         */
        destroy() {
          this.isDestroyed = true;
          from(this.subdocs).forEach((subdoc) => subdoc.destroy());
          const item = this._item;
          if (item !== null) {
            this._item = null;
            const content = (
              /** @type {ContentDoc} */
              item.content
            );
            content.doc = new _Doc({ guid: this.guid, ...content.opts, shouldLoad: false });
            content.doc._item = item;
            transact(
              /** @type {any} */
              item.parent.doc,
              (transaction) => {
                const doc2 = content.doc;
                if (!item.deleted) {
                  transaction.subdocsAdded.add(doc2);
                }
                transaction.subdocsRemoved.add(this);
              },
              null,
              true
            );
          }
          this.emit("destroyed", [true]);
          this.emit("destroy", [this]);
          super.destroy();
        }
      };
      DSDecoderV1 = class {
        /**
         * @param {decoding.Decoder} decoder
         */
        constructor(decoder) {
          this.restDecoder = decoder;
        }
        resetDsCurVal() {
        }
        /**
         * @return {number}
         */
        readDsClock() {
          return readVarUint(this.restDecoder);
        }
        /**
         * @return {number}
         */
        readDsLen() {
          return readVarUint(this.restDecoder);
        }
      };
      UpdateDecoderV1 = class extends DSDecoderV1 {
        /**
         * @return {ID}
         */
        readLeftID() {
          return createID(readVarUint(this.restDecoder), readVarUint(this.restDecoder));
        }
        /**
         * @return {ID}
         */
        readRightID() {
          return createID(readVarUint(this.restDecoder), readVarUint(this.restDecoder));
        }
        /**
         * Read the next client id.
         * Use this in favor of readID whenever possible to reduce the number of objects created.
         */
        readClient() {
          return readVarUint(this.restDecoder);
        }
        /**
         * @return {number} info An unsigned 8-bit integer
         */
        readInfo() {
          return readUint8(this.restDecoder);
        }
        /**
         * @return {string}
         */
        readString() {
          return readVarString(this.restDecoder);
        }
        /**
         * @return {boolean} isKey
         */
        readParentInfo() {
          return readVarUint(this.restDecoder) === 1;
        }
        /**
         * @return {number} info An unsigned 8-bit integer
         */
        readTypeRef() {
          return readVarUint(this.restDecoder);
        }
        /**
         * Write len of a struct - well suited for Opt RLE encoder.
         *
         * @return {number} len
         */
        readLen() {
          return readVarUint(this.restDecoder);
        }
        /**
         * @return {any}
         */
        readAny() {
          return readAny(this.restDecoder);
        }
        /**
         * @return {Uint8Array}
         */
        readBuf() {
          return copyUint8Array(readVarUint8Array(this.restDecoder));
        }
        /**
         * Legacy implementation uses JSON parse. We use any-decoding in v2.
         *
         * @return {any}
         */
        readJSON() {
          return JSON.parse(readVarString(this.restDecoder));
        }
        /**
         * @return {string}
         */
        readKey() {
          return readVarString(this.restDecoder);
        }
      };
      DSDecoderV2 = class {
        /**
         * @param {decoding.Decoder} decoder
         */
        constructor(decoder) {
          this.dsCurrVal = 0;
          this.restDecoder = decoder;
        }
        resetDsCurVal() {
          this.dsCurrVal = 0;
        }
        /**
         * @return {number}
         */
        readDsClock() {
          this.dsCurrVal += readVarUint(this.restDecoder);
          return this.dsCurrVal;
        }
        /**
         * @return {number}
         */
        readDsLen() {
          const diff = readVarUint(this.restDecoder) + 1;
          this.dsCurrVal += diff;
          return diff;
        }
      };
      UpdateDecoderV2 = class extends DSDecoderV2 {
        /**
         * @param {decoding.Decoder} decoder
         */
        constructor(decoder) {
          super(decoder);
          this.keys = [];
          readVarUint(decoder);
          this.keyClockDecoder = new IntDiffOptRleDecoder(readVarUint8Array(decoder));
          this.clientDecoder = new UintOptRleDecoder(readVarUint8Array(decoder));
          this.leftClockDecoder = new IntDiffOptRleDecoder(readVarUint8Array(decoder));
          this.rightClockDecoder = new IntDiffOptRleDecoder(readVarUint8Array(decoder));
          this.infoDecoder = new RleDecoder(readVarUint8Array(decoder), readUint8);
          this.stringDecoder = new StringDecoder(readVarUint8Array(decoder));
          this.parentInfoDecoder = new RleDecoder(readVarUint8Array(decoder), readUint8);
          this.typeRefDecoder = new UintOptRleDecoder(readVarUint8Array(decoder));
          this.lenDecoder = new UintOptRleDecoder(readVarUint8Array(decoder));
        }
        /**
         * @return {ID}
         */
        readLeftID() {
          return new ID(this.clientDecoder.read(), this.leftClockDecoder.read());
        }
        /**
         * @return {ID}
         */
        readRightID() {
          return new ID(this.clientDecoder.read(), this.rightClockDecoder.read());
        }
        /**
         * Read the next client id.
         * Use this in favor of readID whenever possible to reduce the number of objects created.
         */
        readClient() {
          return this.clientDecoder.read();
        }
        /**
         * @return {number} info An unsigned 8-bit integer
         */
        readInfo() {
          return (
            /** @type {number} */
            this.infoDecoder.read()
          );
        }
        /**
         * @return {string}
         */
        readString() {
          return this.stringDecoder.read();
        }
        /**
         * @return {boolean}
         */
        readParentInfo() {
          return this.parentInfoDecoder.read() === 1;
        }
        /**
         * @return {number} An unsigned 8-bit integer
         */
        readTypeRef() {
          return this.typeRefDecoder.read();
        }
        /**
         * Write len of a struct - well suited for Opt RLE encoder.
         *
         * @return {number}
         */
        readLen() {
          return this.lenDecoder.read();
        }
        /**
         * @return {any}
         */
        readAny() {
          return readAny(this.restDecoder);
        }
        /**
         * @return {Uint8Array}
         */
        readBuf() {
          return readVarUint8Array(this.restDecoder);
        }
        /**
         * This is mainly here for legacy purposes.
         *
         * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
         *
         * @return {any}
         */
        readJSON() {
          return readAny(this.restDecoder);
        }
        /**
         * @return {string}
         */
        readKey() {
          const keyClock = this.keyClockDecoder.read();
          if (keyClock < this.keys.length) {
            return this.keys[keyClock];
          } else {
            const key = this.stringDecoder.read();
            this.keys.push(key);
            return key;
          }
        }
      };
      DSEncoderV1 = class {
        constructor() {
          this.restEncoder = createEncoder();
        }
        toUint8Array() {
          return toUint8Array(this.restEncoder);
        }
        resetDsCurVal() {
        }
        /**
         * @param {number} clock
         */
        writeDsClock(clock) {
          writeVarUint(this.restEncoder, clock);
        }
        /**
         * @param {number} len
         */
        writeDsLen(len) {
          writeVarUint(this.restEncoder, len);
        }
      };
      UpdateEncoderV1 = class extends DSEncoderV1 {
        /**
         * @param {ID} id
         */
        writeLeftID(id2) {
          writeVarUint(this.restEncoder, id2.client);
          writeVarUint(this.restEncoder, id2.clock);
        }
        /**
         * @param {ID} id
         */
        writeRightID(id2) {
          writeVarUint(this.restEncoder, id2.client);
          writeVarUint(this.restEncoder, id2.clock);
        }
        /**
         * Use writeClient and writeClock instead of writeID if possible.
         * @param {number} client
         */
        writeClient(client) {
          writeVarUint(this.restEncoder, client);
        }
        /**
         * @param {number} info An unsigned 8-bit integer
         */
        writeInfo(info) {
          writeUint8(this.restEncoder, info);
        }
        /**
         * @param {string} s
         */
        writeString(s) {
          writeVarString(this.restEncoder, s);
        }
        /**
         * @param {boolean} isYKey
         */
        writeParentInfo(isYKey) {
          writeVarUint(this.restEncoder, isYKey ? 1 : 0);
        }
        /**
         * @param {number} info An unsigned 8-bit integer
         */
        writeTypeRef(info) {
          writeVarUint(this.restEncoder, info);
        }
        /**
         * Write len of a struct - well suited for Opt RLE encoder.
         *
         * @param {number} len
         */
        writeLen(len) {
          writeVarUint(this.restEncoder, len);
        }
        /**
         * @param {any} any
         */
        writeAny(any2) {
          writeAny(this.restEncoder, any2);
        }
        /**
         * @param {Uint8Array} buf
         */
        writeBuf(buf) {
          writeVarUint8Array(this.restEncoder, buf);
        }
        /**
         * @param {any} embed
         */
        writeJSON(embed) {
          writeVarString(this.restEncoder, JSON.stringify(embed));
        }
        /**
         * @param {string} key
         */
        writeKey(key) {
          writeVarString(this.restEncoder, key);
        }
      };
      DSEncoderV2 = class {
        constructor() {
          this.restEncoder = createEncoder();
          this.dsCurrVal = 0;
        }
        toUint8Array() {
          return toUint8Array(this.restEncoder);
        }
        resetDsCurVal() {
          this.dsCurrVal = 0;
        }
        /**
         * @param {number} clock
         */
        writeDsClock(clock) {
          const diff = clock - this.dsCurrVal;
          this.dsCurrVal = clock;
          writeVarUint(this.restEncoder, diff);
        }
        /**
         * @param {number} len
         */
        writeDsLen(len) {
          if (len === 0) {
            unexpectedCase();
          }
          writeVarUint(this.restEncoder, len - 1);
          this.dsCurrVal += len;
        }
      };
      UpdateEncoderV2 = class extends DSEncoderV2 {
        constructor() {
          super();
          this.keyMap = /* @__PURE__ */ new Map();
          this.keyClock = 0;
          this.keyClockEncoder = new IntDiffOptRleEncoder();
          this.clientEncoder = new UintOptRleEncoder();
          this.leftClockEncoder = new IntDiffOptRleEncoder();
          this.rightClockEncoder = new IntDiffOptRleEncoder();
          this.infoEncoder = new RleEncoder(writeUint8);
          this.stringEncoder = new StringEncoder();
          this.parentInfoEncoder = new RleEncoder(writeUint8);
          this.typeRefEncoder = new UintOptRleEncoder();
          this.lenEncoder = new UintOptRleEncoder();
        }
        toUint8Array() {
          const encoder = createEncoder();
          writeVarUint(encoder, 0);
          writeVarUint8Array(encoder, this.keyClockEncoder.toUint8Array());
          writeVarUint8Array(encoder, this.clientEncoder.toUint8Array());
          writeVarUint8Array(encoder, this.leftClockEncoder.toUint8Array());
          writeVarUint8Array(encoder, this.rightClockEncoder.toUint8Array());
          writeVarUint8Array(encoder, toUint8Array(this.infoEncoder));
          writeVarUint8Array(encoder, this.stringEncoder.toUint8Array());
          writeVarUint8Array(encoder, toUint8Array(this.parentInfoEncoder));
          writeVarUint8Array(encoder, this.typeRefEncoder.toUint8Array());
          writeVarUint8Array(encoder, this.lenEncoder.toUint8Array());
          writeUint8Array(encoder, toUint8Array(this.restEncoder));
          return toUint8Array(encoder);
        }
        /**
         * @param {ID} id
         */
        writeLeftID(id2) {
          this.clientEncoder.write(id2.client);
          this.leftClockEncoder.write(id2.clock);
        }
        /**
         * @param {ID} id
         */
        writeRightID(id2) {
          this.clientEncoder.write(id2.client);
          this.rightClockEncoder.write(id2.clock);
        }
        /**
         * @param {number} client
         */
        writeClient(client) {
          this.clientEncoder.write(client);
        }
        /**
         * @param {number} info An unsigned 8-bit integer
         */
        writeInfo(info) {
          this.infoEncoder.write(info);
        }
        /**
         * @param {string} s
         */
        writeString(s) {
          this.stringEncoder.write(s);
        }
        /**
         * @param {boolean} isYKey
         */
        writeParentInfo(isYKey) {
          this.parentInfoEncoder.write(isYKey ? 1 : 0);
        }
        /**
         * @param {number} info An unsigned 8-bit integer
         */
        writeTypeRef(info) {
          this.typeRefEncoder.write(info);
        }
        /**
         * Write len of a struct - well suited for Opt RLE encoder.
         *
         * @param {number} len
         */
        writeLen(len) {
          this.lenEncoder.write(len);
        }
        /**
         * @param {any} any
         */
        writeAny(any2) {
          writeAny(this.restEncoder, any2);
        }
        /**
         * @param {Uint8Array} buf
         */
        writeBuf(buf) {
          writeVarUint8Array(this.restEncoder, buf);
        }
        /**
         * This is mainly here for legacy purposes.
         *
         * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
         *
         * @param {any} embed
         */
        writeJSON(embed) {
          writeAny(this.restEncoder, embed);
        }
        /**
         * Property keys are often reused. For example, in y-prosemirror the key `bold` might
         * occur very often. For a 3d application, the key `position` might occur very often.
         *
         * We cache these keys in a Map and refer to them via a unique number.
         *
         * @param {string} key
         */
        writeKey(key) {
          const clock = this.keyMap.get(key);
          if (clock === void 0) {
            this.keyClockEncoder.write(this.keyClock++);
            this.stringEncoder.write(key);
          } else {
            this.keyClockEncoder.write(clock);
          }
        }
      };
      writeStructs = (encoder, structs, client, clock) => {
        clock = max(clock, structs[0].id.clock);
        const startNewStructs = findIndexSS(structs, clock);
        writeVarUint(encoder.restEncoder, structs.length - startNewStructs);
        encoder.writeClient(client);
        writeVarUint(encoder.restEncoder, clock);
        const firstStruct = structs[startNewStructs];
        firstStruct.write(encoder, clock - firstStruct.id.clock);
        for (let i = startNewStructs + 1; i < structs.length; i++) {
          structs[i].write(encoder, 0);
        }
      };
      writeClientsStructs = (encoder, store, _sm) => {
        const sm = /* @__PURE__ */ new Map();
        _sm.forEach((clock, client) => {
          if (getState(store, client) > clock) {
            sm.set(client, clock);
          }
        });
        getStateVector(store).forEach((_clock, client) => {
          if (!_sm.has(client)) {
            sm.set(client, 0);
          }
        });
        writeVarUint(encoder.restEncoder, sm.size);
        from(sm.entries()).sort((a, b) => b[0] - a[0]).forEach(([client, clock]) => {
          writeStructs(
            encoder,
            /** @type {Array<GC|Item>} */
            store.clients.get(client),
            client,
            clock
          );
        });
      };
      readClientsStructRefs = (decoder, doc2) => {
        const clientRefs = create();
        const numOfStateUpdates = readVarUint(decoder.restDecoder);
        for (let i = 0; i < numOfStateUpdates; i++) {
          const numberOfStructs = readVarUint(decoder.restDecoder);
          const refs = new Array(numberOfStructs);
          const client = decoder.readClient();
          let clock = readVarUint(decoder.restDecoder);
          clientRefs.set(client, { i: 0, refs });
          for (let i2 = 0; i2 < numberOfStructs; i2++) {
            const info = decoder.readInfo();
            switch (BITS5 & info) {
              case 0: {
                const len = decoder.readLen();
                refs[i2] = new GC(createID(client, clock), len);
                clock += len;
                break;
              }
              case 10: {
                const len = readVarUint(decoder.restDecoder);
                refs[i2] = new Skip(createID(client, clock), len);
                clock += len;
                break;
              }
              default: {
                const cantCopyParentInfo = (info & (BIT7 | BIT8)) === 0;
                const struct = new Item(
                  createID(client, clock),
                  null,
                  // left
                  (info & BIT8) === BIT8 ? decoder.readLeftID() : null,
                  // origin
                  null,
                  // right
                  (info & BIT7) === BIT7 ? decoder.readRightID() : null,
                  // right origin
                  cantCopyParentInfo ? decoder.readParentInfo() ? doc2.get(decoder.readString()) : decoder.readLeftID() : null,
                  // parent
                  cantCopyParentInfo && (info & BIT6) === BIT6 ? decoder.readString() : null,
                  // parentSub
                  readItemContent(decoder, info)
                  // item content
                );
                refs[i2] = struct;
                clock += struct.length;
              }
            }
          }
        }
        return clientRefs;
      };
      integrateStructs = (transaction, store, clientsStructRefs) => {
        const stack = [];
        let clientsStructRefsIds = from(clientsStructRefs.keys()).sort((a, b) => a - b);
        if (clientsStructRefsIds.length === 0) {
          return null;
        }
        const getNextStructTarget = () => {
          if (clientsStructRefsIds.length === 0) {
            return null;
          }
          let nextStructsTarget = (
            /** @type {{i:number,refs:Array<GC|Item>}} */
            clientsStructRefs.get(clientsStructRefsIds[clientsStructRefsIds.length - 1])
          );
          while (nextStructsTarget.refs.length === nextStructsTarget.i) {
            clientsStructRefsIds.pop();
            if (clientsStructRefsIds.length > 0) {
              nextStructsTarget = /** @type {{i:number,refs:Array<GC|Item>}} */
              clientsStructRefs.get(clientsStructRefsIds[clientsStructRefsIds.length - 1]);
            } else {
              return null;
            }
          }
          return nextStructsTarget;
        };
        let curStructsTarget = getNextStructTarget();
        if (curStructsTarget === null) {
          return null;
        }
        const restStructs = new StructStore();
        const missingSV = /* @__PURE__ */ new Map();
        const updateMissingSv = (client, clock) => {
          const mclock = missingSV.get(client);
          if (mclock == null || mclock > clock) {
            missingSV.set(client, clock);
          }
        };
        let stackHead = (
          /** @type {any} */
          curStructsTarget.refs[
            /** @type {any} */
            curStructsTarget.i++
          ]
        );
        const state = /* @__PURE__ */ new Map();
        const addStackToRestSS = () => {
          for (const item of stack) {
            const client = item.id.client;
            const inapplicableItems = clientsStructRefs.get(client);
            if (inapplicableItems) {
              inapplicableItems.i--;
              restStructs.clients.set(client, inapplicableItems.refs.slice(inapplicableItems.i));
              clientsStructRefs.delete(client);
              inapplicableItems.i = 0;
              inapplicableItems.refs = [];
            } else {
              restStructs.clients.set(client, [item]);
            }
            clientsStructRefsIds = clientsStructRefsIds.filter((c) => c !== client);
          }
          stack.length = 0;
        };
        while (true) {
          if (stackHead.constructor !== Skip) {
            const localClock = setIfUndefined(state, stackHead.id.client, () => getState(store, stackHead.id.client));
            const offset = localClock - stackHead.id.clock;
            if (offset < 0) {
              stack.push(stackHead);
              updateMissingSv(stackHead.id.client, stackHead.id.clock - 1);
              addStackToRestSS();
            } else {
              const missing = stackHead.getMissing(transaction, store);
              if (missing !== null) {
                stack.push(stackHead);
                const structRefs = clientsStructRefs.get(
                  /** @type {number} */
                  missing
                ) || { refs: [], i: 0 };
                if (structRefs.refs.length === structRefs.i) {
                  updateMissingSv(
                    /** @type {number} */
                    missing,
                    getState(store, missing)
                  );
                  addStackToRestSS();
                } else {
                  stackHead = structRefs.refs[structRefs.i++];
                  continue;
                }
              } else if (offset === 0 || offset < stackHead.length) {
                stackHead.integrate(transaction, offset);
                state.set(stackHead.id.client, stackHead.id.clock + stackHead.length);
              }
            }
          }
          if (stack.length > 0) {
            stackHead = /** @type {GC|Item} */
            stack.pop();
          } else if (curStructsTarget !== null && curStructsTarget.i < curStructsTarget.refs.length) {
            stackHead = /** @type {GC|Item} */
            curStructsTarget.refs[curStructsTarget.i++];
          } else {
            curStructsTarget = getNextStructTarget();
            if (curStructsTarget === null) {
              break;
            } else {
              stackHead = /** @type {GC|Item} */
              curStructsTarget.refs[curStructsTarget.i++];
            }
          }
        }
        if (restStructs.clients.size > 0) {
          const encoder = new UpdateEncoderV2();
          writeClientsStructs(encoder, restStructs, /* @__PURE__ */ new Map());
          writeVarUint(encoder.restEncoder, 0);
          return { missing: missingSV, update: encoder.toUint8Array() };
        }
        return null;
      };
      writeStructsFromTransaction = (encoder, transaction) => writeClientsStructs(encoder, transaction.doc.store, transaction.beforeState);
      readUpdateV2 = (decoder, ydoc, transactionOrigin, structDecoder = new UpdateDecoderV2(decoder)) => transact(ydoc, (transaction) => {
        transaction.local = false;
        let retry = false;
        const doc2 = transaction.doc;
        const store = doc2.store;
        const ss = readClientsStructRefs(structDecoder, doc2);
        const restStructs = integrateStructs(transaction, store, ss);
        const pending = store.pendingStructs;
        if (pending) {
          for (const [client, clock] of pending.missing) {
            if (clock < getState(store, client)) {
              retry = true;
              break;
            }
          }
          if (restStructs) {
            for (const [client, clock] of restStructs.missing) {
              const mclock = pending.missing.get(client);
              if (mclock == null || mclock > clock) {
                pending.missing.set(client, clock);
              }
            }
            pending.update = mergeUpdatesV2([pending.update, restStructs.update]);
          }
        } else {
          store.pendingStructs = restStructs;
        }
        const dsRest = readAndApplyDeleteSet(structDecoder, transaction, store);
        if (store.pendingDs) {
          const pendingDSUpdate = new UpdateDecoderV2(createDecoder(store.pendingDs));
          readVarUint(pendingDSUpdate.restDecoder);
          const dsRest2 = readAndApplyDeleteSet(pendingDSUpdate, transaction, store);
          if (dsRest && dsRest2) {
            store.pendingDs = mergeUpdatesV2([dsRest, dsRest2]);
          } else {
            store.pendingDs = dsRest || dsRest2;
          }
        } else {
          store.pendingDs = dsRest;
        }
        if (retry) {
          const update = (
            /** @type {{update: Uint8Array}} */
            store.pendingStructs.update
          );
          store.pendingStructs = null;
          applyUpdateV2(transaction.doc, update);
        }
      }, transactionOrigin, false);
      applyUpdateV2 = (ydoc, update, transactionOrigin, YDecoder = UpdateDecoderV2) => {
        const decoder = createDecoder(update);
        readUpdateV2(decoder, ydoc, transactionOrigin, new YDecoder(decoder));
      };
      applyUpdate = (ydoc, update, transactionOrigin) => applyUpdateV2(ydoc, update, transactionOrigin, UpdateDecoderV1);
      writeStateAsUpdate = (encoder, doc2, targetStateVector = /* @__PURE__ */ new Map()) => {
        writeClientsStructs(encoder, doc2.store, targetStateVector);
        writeDeleteSet(encoder, createDeleteSetFromStructStore(doc2.store));
      };
      encodeStateAsUpdateV2 = (doc2, encodedTargetStateVector = new Uint8Array([0]), encoder = new UpdateEncoderV2()) => {
        const targetStateVector = decodeStateVector(encodedTargetStateVector);
        writeStateAsUpdate(encoder, doc2, targetStateVector);
        const updates = [encoder.toUint8Array()];
        if (doc2.store.pendingDs) {
          updates.push(doc2.store.pendingDs);
        }
        if (doc2.store.pendingStructs) {
          updates.push(diffUpdateV2(doc2.store.pendingStructs.update, encodedTargetStateVector));
        }
        if (updates.length > 1) {
          if (encoder.constructor === UpdateEncoderV1) {
            return mergeUpdates(updates.map((update, i) => i === 0 ? update : convertUpdateFormatV2ToV1(update)));
          } else if (encoder.constructor === UpdateEncoderV2) {
            return mergeUpdatesV2(updates);
          }
        }
        return updates[0];
      };
      encodeStateAsUpdate = (doc2, encodedTargetStateVector) => encodeStateAsUpdateV2(doc2, encodedTargetStateVector, new UpdateEncoderV1());
      readStateVector = (decoder) => {
        const ss = /* @__PURE__ */ new Map();
        const ssLength = readVarUint(decoder.restDecoder);
        for (let i = 0; i < ssLength; i++) {
          const client = readVarUint(decoder.restDecoder);
          const clock = readVarUint(decoder.restDecoder);
          ss.set(client, clock);
        }
        return ss;
      };
      decodeStateVector = (decodedState) => readStateVector(new DSDecoderV1(createDecoder(decodedState)));
      writeStateVector = (encoder, sv) => {
        writeVarUint(encoder.restEncoder, sv.size);
        from(sv.entries()).sort((a, b) => b[0] - a[0]).forEach(([client, clock]) => {
          writeVarUint(encoder.restEncoder, client);
          writeVarUint(encoder.restEncoder, clock);
        });
        return encoder;
      };
      writeDocumentStateVector = (encoder, doc2) => writeStateVector(encoder, getStateVector(doc2.store));
      encodeStateVectorV2 = (doc2, encoder = new DSEncoderV2()) => {
        if (doc2 instanceof Map) {
          writeStateVector(encoder, doc2);
        } else {
          writeDocumentStateVector(encoder, doc2);
        }
        return encoder.toUint8Array();
      };
      encodeStateVector = (doc2) => encodeStateVectorV2(doc2, new DSEncoderV1());
      EventHandler = class {
        constructor() {
          this.l = [];
        }
      };
      createEventHandler = () => new EventHandler();
      addEventHandlerListener = (eventHandler, f) => eventHandler.l.push(f);
      removeEventHandlerListener = (eventHandler, f) => {
        const l = eventHandler.l;
        const len = l.length;
        eventHandler.l = l.filter((g) => f !== g);
        if (len === eventHandler.l.length) {
          console.error("[yjs] Tried to remove event handler that doesn't exist.");
        }
      };
      callEventHandlerListeners = (eventHandler, arg0, arg1) => callAll(eventHandler.l, [arg0, arg1]);
      ID = class {
        /**
         * @param {number} client client id
         * @param {number} clock unique per client id, continuous number
         */
        constructor(client, clock) {
          this.client = client;
          this.clock = clock;
        }
      };
      compareIDs = (a, b) => a === b || a !== null && b !== null && a.client === b.client && a.clock === b.clock;
      createID = (client, clock) => new ID(client, clock);
      findRootTypeKey = (type) => {
        for (const [key, value] of type.doc.share.entries()) {
          if (value === type) {
            return key;
          }
        }
        throw unexpectedCase();
      };
      RelativePosition = class {
        /**
         * @param {ID|null} type
         * @param {string|null} tname
         * @param {ID|null} item
         * @param {number} assoc
         */
        constructor(type, tname, item, assoc = 0) {
          this.type = type;
          this.tname = tname;
          this.item = item;
          this.assoc = assoc;
        }
      };
      createRelativePositionFromJSON = (json) => new RelativePosition(json.type == null ? null : createID(json.type.client, json.type.clock), json.tname ?? null, json.item == null ? null : createID(json.item.client, json.item.clock), json.assoc == null ? 0 : json.assoc);
      AbsolutePosition = class {
        /**
         * @param {AbstractType<any>} type
         * @param {number} index
         * @param {number} [assoc]
         */
        constructor(type, index, assoc = 0) {
          this.type = type;
          this.index = index;
          this.assoc = assoc;
        }
      };
      createAbsolutePosition = (type, index, assoc = 0) => new AbsolutePosition(type, index, assoc);
      createRelativePosition = (type, item, assoc) => {
        let typeid = null;
        let tname = null;
        if (type._item === null) {
          tname = findRootTypeKey(type);
        } else {
          typeid = createID(type._item.id.client, type._item.id.clock);
        }
        return new RelativePosition(typeid, tname, item, assoc);
      };
      createRelativePositionFromTypeIndex = (type, index, assoc = 0) => {
        let t = type._start;
        if (assoc < 0) {
          if (index === 0) {
            return createRelativePosition(type, null, assoc);
          }
          index--;
        }
        while (t !== null) {
          if (!t.deleted && t.countable) {
            if (t.length > index) {
              return createRelativePosition(type, createID(t.id.client, t.id.clock + index), assoc);
            }
            index -= t.length;
          }
          if (t.right === null && assoc < 0) {
            return createRelativePosition(type, t.lastId, assoc);
          }
          t = t.right;
        }
        return createRelativePosition(type, null, assoc);
      };
      getItemWithOffset = (store, id2) => {
        const item = getItem(store, id2);
        const diff = id2.clock - item.id.clock;
        return {
          item,
          diff
        };
      };
      createAbsolutePositionFromRelativePosition = (rpos, doc2, followUndoneDeletions = true) => {
        const store = doc2.store;
        const rightID = rpos.item;
        const typeID = rpos.type;
        const tname = rpos.tname;
        const assoc = rpos.assoc;
        let type = null;
        let index = 0;
        if (rightID !== null) {
          if (getState(store, rightID.client) <= rightID.clock) {
            return null;
          }
          const res = followUndoneDeletions ? followRedone(store, rightID) : getItemWithOffset(store, rightID);
          const right = res.item;
          if (!(right instanceof Item)) {
            return null;
          }
          type = /** @type {AbstractType<any>} */
          right.parent;
          if (type._item === null || !type._item.deleted) {
            index = right.deleted || !right.countable ? 0 : res.diff + (assoc >= 0 ? 0 : 1);
            let n = right.left;
            while (n !== null) {
              if (!n.deleted && n.countable) {
                index += n.length;
              }
              n = n.left;
            }
          }
        } else {
          if (tname !== null) {
            type = doc2.get(tname);
          } else if (typeID !== null) {
            if (getState(store, typeID.client) <= typeID.clock) {
              return null;
            }
            const { item } = followUndoneDeletions ? followRedone(store, typeID) : { item: getItem(store, typeID) };
            if (item instanceof Item && item.content instanceof ContentType) {
              type = item.content.type;
            } else {
              return null;
            }
          } else {
            throw unexpectedCase();
          }
          if (assoc >= 0) {
            index = type._length;
          } else {
            index = 0;
          }
        }
        return createAbsolutePosition(type, index, rpos.assoc);
      };
      compareRelativePositions = (a, b) => a === b || a !== null && b !== null && a.tname === b.tname && compareIDs(a.item, b.item) && compareIDs(a.type, b.type) && a.assoc === b.assoc;
      Snapshot = class {
        /**
         * @param {DeleteSet} ds
         * @param {Map<number,number>} sv state map
         */
        constructor(ds, sv) {
          this.ds = ds;
          this.sv = sv;
        }
      };
      createSnapshot = (ds, sm) => new Snapshot(ds, sm);
      emptySnapshot = createSnapshot(createDeleteSet(), /* @__PURE__ */ new Map());
      isVisible = (item, snapshot) => snapshot === void 0 ? !item.deleted : snapshot.sv.has(item.id.client) && (snapshot.sv.get(item.id.client) || 0) > item.id.clock && !isDeleted(snapshot.ds, item.id);
      splitSnapshotAffectedStructs = (transaction, snapshot) => {
        const meta = setIfUndefined(transaction.meta, splitSnapshotAffectedStructs, create2);
        const store = transaction.doc.store;
        if (!meta.has(snapshot)) {
          snapshot.sv.forEach((clock, client) => {
            if (clock < getState(store, client)) {
              getItemCleanStart(transaction, createID(client, clock));
            }
          });
          iterateDeletedStructs(transaction, snapshot.ds, (_item) => {
          });
          meta.add(snapshot);
        }
      };
      StructStore = class {
        constructor() {
          this.clients = /* @__PURE__ */ new Map();
          this.pendingStructs = null;
          this.pendingDs = null;
        }
      };
      getStateVector = (store) => {
        const sm = /* @__PURE__ */ new Map();
        store.clients.forEach((structs, client) => {
          const struct = structs[structs.length - 1];
          sm.set(client, struct.id.clock + struct.length);
        });
        return sm;
      };
      getState = (store, client) => {
        const structs = store.clients.get(client);
        if (structs === void 0) {
          return 0;
        }
        const lastStruct = structs[structs.length - 1];
        return lastStruct.id.clock + lastStruct.length;
      };
      addStruct = (store, struct) => {
        let structs = store.clients.get(struct.id.client);
        if (structs === void 0) {
          structs = [];
          store.clients.set(struct.id.client, structs);
        } else {
          const lastStruct = structs[structs.length - 1];
          if (lastStruct.id.clock + lastStruct.length !== struct.id.clock) {
            throw unexpectedCase();
          }
        }
        structs.push(struct);
      };
      findIndexSS = (structs, clock) => {
        let left = 0;
        let right = structs.length - 1;
        let mid = structs[right];
        let midclock = mid.id.clock;
        if (midclock === clock) {
          return right;
        }
        let midindex = floor(clock / (midclock + mid.length - 1) * right);
        while (left <= right) {
          mid = structs[midindex];
          midclock = mid.id.clock;
          if (midclock <= clock) {
            if (clock < midclock + mid.length) {
              return midindex;
            }
            left = midindex + 1;
          } else {
            right = midindex - 1;
          }
          midindex = floor((left + right) / 2);
        }
        throw unexpectedCase();
      };
      find = (store, id2) => {
        const structs = store.clients.get(id2.client);
        return structs[findIndexSS(structs, id2.clock)];
      };
      getItem = /** @type {function(StructStore,ID):Item} */
      find;
      findIndexCleanStart = (transaction, structs, clock) => {
        const index = findIndexSS(structs, clock);
        const struct = structs[index];
        if (struct.id.clock < clock && struct instanceof Item) {
          structs.splice(index + 1, 0, splitItem(transaction, struct, clock - struct.id.clock));
          return index + 1;
        }
        return index;
      };
      getItemCleanStart = (transaction, id2) => {
        const structs = (
          /** @type {Array<Item>} */
          transaction.doc.store.clients.get(id2.client)
        );
        return structs[findIndexCleanStart(transaction, structs, id2.clock)];
      };
      getItemCleanEnd = (transaction, store, id2) => {
        const structs = store.clients.get(id2.client);
        const index = findIndexSS(structs, id2.clock);
        const struct = structs[index];
        if (id2.clock !== struct.id.clock + struct.length - 1 && struct.constructor !== GC) {
          structs.splice(index + 1, 0, splitItem(transaction, struct, id2.clock - struct.id.clock + 1));
        }
        return struct;
      };
      replaceStruct = (store, struct, newStruct) => {
        const structs = (
          /** @type {Array<GC|Item>} */
          store.clients.get(struct.id.client)
        );
        structs[findIndexSS(structs, struct.id.clock)] = newStruct;
      };
      iterateStructs = (transaction, structs, clockStart, len, f) => {
        if (len === 0) {
          return;
        }
        const clockEnd = clockStart + len;
        let index = findIndexCleanStart(transaction, structs, clockStart);
        let struct;
        do {
          struct = structs[index++];
          if (clockEnd < struct.id.clock + struct.length) {
            findIndexCleanStart(transaction, structs, clockEnd);
          }
          f(struct);
        } while (index < structs.length && structs[index].id.clock < clockEnd);
      };
      Transaction = class {
        /**
         * @param {Doc} doc
         * @param {any} origin
         * @param {boolean} local
         */
        constructor(doc2, origin, local) {
          this.doc = doc2;
          this.deleteSet = new DeleteSet();
          this.beforeState = getStateVector(doc2.store);
          this.afterState = /* @__PURE__ */ new Map();
          this.changed = /* @__PURE__ */ new Map();
          this.changedParentTypes = /* @__PURE__ */ new Map();
          this._mergeStructs = [];
          this.origin = origin;
          this.meta = /* @__PURE__ */ new Map();
          this.local = local;
          this.subdocsAdded = /* @__PURE__ */ new Set();
          this.subdocsRemoved = /* @__PURE__ */ new Set();
          this.subdocsLoaded = /* @__PURE__ */ new Set();
          this._needFormattingCleanup = false;
        }
      };
      writeUpdateMessageFromTransaction = (encoder, transaction) => {
        if (transaction.deleteSet.clients.size === 0 && !any(transaction.afterState, (clock, client) => transaction.beforeState.get(client) !== clock)) {
          return false;
        }
        sortAndMergeDeleteSet(transaction.deleteSet);
        writeStructsFromTransaction(encoder, transaction);
        writeDeleteSet(encoder, transaction.deleteSet);
        return true;
      };
      addChangedTypeToTransaction = (transaction, type, parentSub) => {
        const item = type._item;
        if (item === null || item.id.clock < (transaction.beforeState.get(item.id.client) || 0) && !item.deleted) {
          setIfUndefined(transaction.changed, type, create2).add(parentSub);
        }
      };
      tryToMergeWithLefts = (structs, pos) => {
        let right = structs[pos];
        let left = structs[pos - 1];
        let i = pos;
        for (; i > 0; right = left, left = structs[--i - 1]) {
          if (left.deleted === right.deleted && left.constructor === right.constructor) {
            if (left.mergeWith(right)) {
              if (right instanceof Item && right.parentSub !== null && /** @type {AbstractType<any>} */
              right.parent._map.get(right.parentSub) === right) {
                right.parent._map.set(
                  right.parentSub,
                  /** @type {Item} */
                  left
                );
              }
              continue;
            }
          }
          break;
        }
        const merged = pos - i;
        if (merged) {
          structs.splice(pos + 1 - merged, merged);
        }
        return merged;
      };
      tryGcDeleteSet = (ds, store, gcFilter) => {
        for (const [client, deleteItems] of ds.clients.entries()) {
          const structs = (
            /** @type {Array<GC|Item>} */
            store.clients.get(client)
          );
          for (let di = deleteItems.length - 1; di >= 0; di--) {
            const deleteItem = deleteItems[di];
            const endDeleteItemClock = deleteItem.clock + deleteItem.len;
            for (let si = findIndexSS(structs, deleteItem.clock), struct = structs[si]; si < structs.length && struct.id.clock < endDeleteItemClock; struct = structs[++si]) {
              const struct2 = structs[si];
              if (deleteItem.clock + deleteItem.len <= struct2.id.clock) {
                break;
              }
              if (struct2 instanceof Item && struct2.deleted && !struct2.keep && gcFilter(struct2)) {
                struct2.gc(store, false);
              }
            }
          }
        }
      };
      tryMergeDeleteSet = (ds, store) => {
        ds.clients.forEach((deleteItems, client) => {
          const structs = (
            /** @type {Array<GC|Item>} */
            store.clients.get(client)
          );
          for (let di = deleteItems.length - 1; di >= 0; di--) {
            const deleteItem = deleteItems[di];
            const mostRightIndexToCheck = min(structs.length - 1, 1 + findIndexSS(structs, deleteItem.clock + deleteItem.len - 1));
            for (let si = mostRightIndexToCheck, struct = structs[si]; si > 0 && struct.id.clock >= deleteItem.clock; struct = structs[si]) {
              si -= 1 + tryToMergeWithLefts(structs, si);
            }
          }
        });
      };
      cleanupTransactions = (transactionCleanups, i) => {
        if (i < transactionCleanups.length) {
          const transaction = transactionCleanups[i];
          const doc2 = transaction.doc;
          const store = doc2.store;
          const ds = transaction.deleteSet;
          const mergeStructs = transaction._mergeStructs;
          try {
            sortAndMergeDeleteSet(ds);
            transaction.afterState = getStateVector(transaction.doc.store);
            doc2.emit("beforeObserverCalls", [transaction, doc2]);
            const fs = [];
            transaction.changed.forEach(
              (subs, itemtype) => fs.push(() => {
                if (itemtype._item === null || !itemtype._item.deleted) {
                  itemtype._callObserver(transaction, subs);
                }
              })
            );
            fs.push(() => {
              transaction.changedParentTypes.forEach((events, type) => {
                if (type._dEH.l.length > 0 && (type._item === null || !type._item.deleted)) {
                  events = events.filter(
                    (event) => event.target._item === null || !event.target._item.deleted
                  );
                  events.forEach((event) => {
                    event.currentTarget = type;
                    event._path = null;
                  });
                  events.sort((event1, event2) => event1.path.length - event2.path.length);
                  fs.push(() => {
                    callEventHandlerListeners(type._dEH, events, transaction);
                  });
                }
              });
              fs.push(() => doc2.emit("afterTransaction", [transaction, doc2]));
              fs.push(() => {
                if (transaction._needFormattingCleanup) {
                  cleanupYTextAfterTransaction(transaction);
                }
              });
            });
            callAll(fs, []);
          } finally {
            if (doc2.gc) {
              tryGcDeleteSet(ds, store, doc2.gcFilter);
            }
            tryMergeDeleteSet(ds, store);
            transaction.afterState.forEach((clock, client) => {
              const beforeClock = transaction.beforeState.get(client) || 0;
              if (beforeClock !== clock) {
                const structs = (
                  /** @type {Array<GC|Item>} */
                  store.clients.get(client)
                );
                const firstChangePos = max(findIndexSS(structs, beforeClock), 1);
                for (let i2 = structs.length - 1; i2 >= firstChangePos; ) {
                  i2 -= 1 + tryToMergeWithLefts(structs, i2);
                }
              }
            });
            for (let i2 = mergeStructs.length - 1; i2 >= 0; i2--) {
              const { client, clock } = mergeStructs[i2].id;
              const structs = (
                /** @type {Array<GC|Item>} */
                store.clients.get(client)
              );
              const replacedStructPos = findIndexSS(structs, clock);
              if (replacedStructPos + 1 < structs.length) {
                if (tryToMergeWithLefts(structs, replacedStructPos + 1) > 1) {
                  continue;
                }
              }
              if (replacedStructPos > 0) {
                tryToMergeWithLefts(structs, replacedStructPos);
              }
            }
            if (!transaction.local && transaction.afterState.get(doc2.clientID) !== transaction.beforeState.get(doc2.clientID)) {
              print(ORANGE, BOLD, "[yjs] ", UNBOLD, RED, "Changed the client-id because another client seems to be using it.");
              doc2.clientID = generateNewClientId();
            }
            doc2.emit("afterTransactionCleanup", [transaction, doc2]);
            if (doc2._observers.has("update")) {
              const encoder = new UpdateEncoderV1();
              const hasContent2 = writeUpdateMessageFromTransaction(encoder, transaction);
              if (hasContent2) {
                doc2.emit("update", [encoder.toUint8Array(), transaction.origin, doc2, transaction]);
              }
            }
            if (doc2._observers.has("updateV2")) {
              const encoder = new UpdateEncoderV2();
              const hasContent2 = writeUpdateMessageFromTransaction(encoder, transaction);
              if (hasContent2) {
                doc2.emit("updateV2", [encoder.toUint8Array(), transaction.origin, doc2, transaction]);
              }
            }
            const { subdocsAdded, subdocsLoaded, subdocsRemoved } = transaction;
            if (subdocsAdded.size > 0 || subdocsRemoved.size > 0 || subdocsLoaded.size > 0) {
              subdocsAdded.forEach((subdoc) => {
                subdoc.clientID = doc2.clientID;
                if (subdoc.collectionid == null) {
                  subdoc.collectionid = doc2.collectionid;
                }
                doc2.subdocs.add(subdoc);
              });
              subdocsRemoved.forEach((subdoc) => doc2.subdocs.delete(subdoc));
              doc2.emit("subdocs", [{ loaded: subdocsLoaded, added: subdocsAdded, removed: subdocsRemoved }, doc2, transaction]);
              subdocsRemoved.forEach((subdoc) => subdoc.destroy());
            }
            if (transactionCleanups.length <= i + 1) {
              doc2._transactionCleanups = [];
              doc2.emit("afterAllTransactions", [doc2, transactionCleanups]);
            } else {
              cleanupTransactions(transactionCleanups, i + 1);
            }
          }
        }
      };
      transact = (doc2, f, origin = null, local = true) => {
        const transactionCleanups = doc2._transactionCleanups;
        let initialCall = false;
        let result = null;
        if (doc2._transaction === null) {
          initialCall = true;
          doc2._transaction = new Transaction(doc2, origin, local);
          transactionCleanups.push(doc2._transaction);
          if (transactionCleanups.length === 1) {
            doc2.emit("beforeAllTransactions", [doc2]);
          }
          doc2.emit("beforeTransaction", [doc2._transaction, doc2]);
        }
        try {
          result = f(doc2._transaction);
        } finally {
          if (initialCall) {
            const finishCleanup = doc2._transaction === transactionCleanups[0];
            doc2._transaction = null;
            if (finishCleanup) {
              cleanupTransactions(transactionCleanups, 0);
            }
          }
        }
        return result;
      };
      LazyStructReader = class {
        /**
         * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
         * @param {boolean} filterSkips
         */
        constructor(decoder, filterSkips) {
          this.gen = lazyStructReaderGenerator(decoder);
          this.curr = null;
          this.done = false;
          this.filterSkips = filterSkips;
          this.next();
        }
        /**
         * @return {Item | GC | Skip |null}
         */
        next() {
          do {
            this.curr = this.gen.next().value || null;
          } while (this.filterSkips && this.curr !== null && this.curr.constructor === Skip);
          return this.curr;
        }
      };
      LazyStructWriter = class {
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         */
        constructor(encoder) {
          this.currClient = 0;
          this.startClock = 0;
          this.written = 0;
          this.encoder = encoder;
          this.clientStructs = [];
        }
      };
      mergeUpdates = (updates) => mergeUpdatesV2(updates, UpdateDecoderV1, UpdateEncoderV1);
      sliceStruct = (left, diff) => {
        if (left.constructor === GC) {
          const { client, clock } = left.id;
          return new GC(createID(client, clock + diff), left.length - diff);
        } else if (left.constructor === Skip) {
          const { client, clock } = left.id;
          return new Skip(createID(client, clock + diff), left.length - diff);
        } else {
          const leftItem = (
            /** @type {Item} */
            left
          );
          const { client, clock } = leftItem.id;
          return new Item(
            createID(client, clock + diff),
            null,
            createID(client, clock + diff - 1),
            null,
            leftItem.rightOrigin,
            leftItem.parent,
            leftItem.parentSub,
            leftItem.content.splice(diff)
          );
        }
      };
      mergeUpdatesV2 = (updates, YDecoder = UpdateDecoderV2, YEncoder = UpdateEncoderV2) => {
        if (updates.length === 1) {
          return updates[0];
        }
        const updateDecoders = updates.map((update) => new YDecoder(createDecoder(update)));
        let lazyStructDecoders = updateDecoders.map((decoder) => new LazyStructReader(decoder, true));
        let currWrite = null;
        const updateEncoder = new YEncoder();
        const lazyStructEncoder = new LazyStructWriter(updateEncoder);
        while (true) {
          lazyStructDecoders = lazyStructDecoders.filter((dec) => dec.curr !== null);
          lazyStructDecoders.sort(
            /** @type {function(any,any):number} */
            (dec1, dec2) => {
              if (dec1.curr.id.client === dec2.curr.id.client) {
                const clockDiff = dec1.curr.id.clock - dec2.curr.id.clock;
                if (clockDiff === 0) {
                  return dec1.curr.constructor === dec2.curr.constructor ? 0 : dec1.curr.constructor === Skip ? 1 : -1;
                } else {
                  return clockDiff;
                }
              } else {
                return dec2.curr.id.client - dec1.curr.id.client;
              }
            }
          );
          if (lazyStructDecoders.length === 0) {
            break;
          }
          const currDecoder = lazyStructDecoders[0];
          const firstClient = (
            /** @type {Item | GC} */
            currDecoder.curr.id.client
          );
          if (currWrite !== null) {
            let curr = (
              /** @type {Item | GC | null} */
              currDecoder.curr
            );
            let iterated = false;
            while (curr !== null && curr.id.clock + curr.length <= currWrite.struct.id.clock + currWrite.struct.length && curr.id.client >= currWrite.struct.id.client) {
              curr = currDecoder.next();
              iterated = true;
            }
            if (curr === null || // current decoder is empty
            curr.id.client !== firstClient || // check whether there is another decoder that has has updates from `firstClient`
            iterated && curr.id.clock > currWrite.struct.id.clock + currWrite.struct.length) {
              continue;
            }
            if (firstClient !== currWrite.struct.id.client) {
              writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
              currWrite = { struct: curr, offset: 0 };
              currDecoder.next();
            } else {
              if (currWrite.struct.id.clock + currWrite.struct.length < curr.id.clock) {
                if (currWrite.struct.constructor === Skip) {
                  currWrite.struct.length = curr.id.clock + curr.length - currWrite.struct.id.clock;
                } else {
                  writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
                  const diff = curr.id.clock - currWrite.struct.id.clock - currWrite.struct.length;
                  const struct = new Skip(createID(firstClient, currWrite.struct.id.clock + currWrite.struct.length), diff);
                  currWrite = { struct, offset: 0 };
                }
              } else {
                const diff = currWrite.struct.id.clock + currWrite.struct.length - curr.id.clock;
                if (diff > 0) {
                  if (currWrite.struct.constructor === Skip) {
                    currWrite.struct.length -= diff;
                  } else {
                    curr = sliceStruct(curr, diff);
                  }
                }
                if (!currWrite.struct.mergeWith(
                  /** @type {any} */
                  curr
                )) {
                  writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
                  currWrite = { struct: curr, offset: 0 };
                  currDecoder.next();
                }
              }
            }
          } else {
            currWrite = { struct: (
              /** @type {Item | GC} */
              currDecoder.curr
            ), offset: 0 };
            currDecoder.next();
          }
          for (let next = currDecoder.curr; next !== null && next.id.client === firstClient && next.id.clock === currWrite.struct.id.clock + currWrite.struct.length && next.constructor !== Skip; next = currDecoder.next()) {
            writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
            currWrite = { struct: next, offset: 0 };
          }
        }
        if (currWrite !== null) {
          writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
          currWrite = null;
        }
        finishLazyStructWriting(lazyStructEncoder);
        const dss = updateDecoders.map((decoder) => readDeleteSet(decoder));
        const ds = mergeDeleteSets(dss);
        writeDeleteSet(updateEncoder, ds);
        return updateEncoder.toUint8Array();
      };
      diffUpdateV2 = (update, sv, YDecoder = UpdateDecoderV2, YEncoder = UpdateEncoderV2) => {
        const state = decodeStateVector(sv);
        const encoder = new YEncoder();
        const lazyStructWriter = new LazyStructWriter(encoder);
        const decoder = new YDecoder(createDecoder(update));
        const reader = new LazyStructReader(decoder, false);
        while (reader.curr) {
          const curr = reader.curr;
          const currClient = curr.id.client;
          const svClock = state.get(currClient) || 0;
          if (reader.curr.constructor === Skip) {
            reader.next();
            continue;
          }
          if (curr.id.clock + curr.length > svClock) {
            writeStructToLazyStructWriter(lazyStructWriter, curr, max(svClock - curr.id.clock, 0));
            reader.next();
            while (reader.curr && reader.curr.id.client === currClient) {
              writeStructToLazyStructWriter(lazyStructWriter, reader.curr, 0);
              reader.next();
            }
          } else {
            while (reader.curr && reader.curr.id.client === currClient && reader.curr.id.clock + reader.curr.length <= svClock) {
              reader.next();
            }
          }
        }
        finishLazyStructWriting(lazyStructWriter);
        const ds = readDeleteSet(decoder);
        writeDeleteSet(encoder, ds);
        return encoder.toUint8Array();
      };
      flushLazyStructWriter = (lazyWriter) => {
        if (lazyWriter.written > 0) {
          lazyWriter.clientStructs.push({ written: lazyWriter.written, restEncoder: toUint8Array(lazyWriter.encoder.restEncoder) });
          lazyWriter.encoder.restEncoder = createEncoder();
          lazyWriter.written = 0;
        }
      };
      writeStructToLazyStructWriter = (lazyWriter, struct, offset) => {
        if (lazyWriter.written > 0 && lazyWriter.currClient !== struct.id.client) {
          flushLazyStructWriter(lazyWriter);
        }
        if (lazyWriter.written === 0) {
          lazyWriter.currClient = struct.id.client;
          lazyWriter.encoder.writeClient(struct.id.client);
          writeVarUint(lazyWriter.encoder.restEncoder, struct.id.clock + offset);
        }
        struct.write(lazyWriter.encoder, offset);
        lazyWriter.written++;
      };
      finishLazyStructWriting = (lazyWriter) => {
        flushLazyStructWriter(lazyWriter);
        const restEncoder = lazyWriter.encoder.restEncoder;
        writeVarUint(restEncoder, lazyWriter.clientStructs.length);
        for (let i = 0; i < lazyWriter.clientStructs.length; i++) {
          const partStructs = lazyWriter.clientStructs[i];
          writeVarUint(restEncoder, partStructs.written);
          writeUint8Array(restEncoder, partStructs.restEncoder);
        }
      };
      convertUpdateFormat = (update, blockTransformer, YDecoder, YEncoder) => {
        const updateDecoder = new YDecoder(createDecoder(update));
        const lazyDecoder = new LazyStructReader(updateDecoder, false);
        const updateEncoder = new YEncoder();
        const lazyWriter = new LazyStructWriter(updateEncoder);
        for (let curr = lazyDecoder.curr; curr !== null; curr = lazyDecoder.next()) {
          writeStructToLazyStructWriter(lazyWriter, blockTransformer(curr), 0);
        }
        finishLazyStructWriting(lazyWriter);
        const ds = readDeleteSet(updateDecoder);
        writeDeleteSet(updateEncoder, ds);
        return updateEncoder.toUint8Array();
      };
      convertUpdateFormatV2ToV1 = (update) => convertUpdateFormat(update, id, UpdateDecoderV2, UpdateEncoderV1);
      errorComputeChanges = "You must not compute changes after the event-handler fired.";
      YEvent = class {
        /**
         * @param {T} target The changed type.
         * @param {Transaction} transaction
         */
        constructor(target, transaction) {
          this.target = target;
          this.currentTarget = target;
          this.transaction = transaction;
          this._changes = null;
          this._keys = null;
          this._delta = null;
          this._path = null;
        }
        /**
         * Computes the path from `y` to the changed type.
         *
         * @todo v14 should standardize on path: Array<{parent, index}> because that is easier to work with.
         *
         * The following property holds:
         * @example
         *   let type = y
         *   event.path.forEach(dir => {
         *     type = type.get(dir)
         *   })
         *   type === event.target // => true
         */
        get path() {
          return this._path || (this._path = getPathTo(this.currentTarget, this.target));
        }
        /**
         * Check if a struct is deleted by this event.
         *
         * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
         *
         * @param {AbstractStruct} struct
         * @return {boolean}
         */
        deletes(struct) {
          return isDeleted(this.transaction.deleteSet, struct.id);
        }
        /**
         * @type {Map<string, { action: 'add' | 'update' | 'delete', oldValue: any }>}
         */
        get keys() {
          if (this._keys === null) {
            if (this.transaction.doc._transactionCleanups.length === 0) {
              throw create3(errorComputeChanges);
            }
            const keys3 = /* @__PURE__ */ new Map();
            const target = this.target;
            const changed = (
              /** @type Set<string|null> */
              this.transaction.changed.get(target)
            );
            changed.forEach((key) => {
              if (key !== null) {
                const item = (
                  /** @type {Item} */
                  target._map.get(key)
                );
                let action;
                let oldValue;
                if (this.adds(item)) {
                  let prev = item.left;
                  while (prev !== null && this.adds(prev)) {
                    prev = prev.left;
                  }
                  if (this.deletes(item)) {
                    if (prev !== null && this.deletes(prev)) {
                      action = "delete";
                      oldValue = last(prev.content.getContent());
                    } else {
                      return;
                    }
                  } else {
                    if (prev !== null && this.deletes(prev)) {
                      action = "update";
                      oldValue = last(prev.content.getContent());
                    } else {
                      action = "add";
                      oldValue = void 0;
                    }
                  }
                } else {
                  if (this.deletes(item)) {
                    action = "delete";
                    oldValue = last(
                      /** @type {Item} */
                      item.content.getContent()
                    );
                  } else {
                    return;
                  }
                }
                keys3.set(key, { action, oldValue });
              }
            });
            this._keys = keys3;
          }
          return this._keys;
        }
        /**
         * This is a computed property. Note that this can only be safely computed during the
         * event call. Computing this property after other changes happened might result in
         * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
         * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
         *
         * @type {Array<{insert?: string | Array<any> | object | AbstractType<any>, retain?: number, delete?: number, attributes?: Object<string, any>}>}
         */
        get delta() {
          return this.changes.delta;
        }
        /**
         * Check if a struct is added by this event.
         *
         * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
         *
         * @param {AbstractStruct} struct
         * @return {boolean}
         */
        adds(struct) {
          return struct.id.clock >= (this.transaction.beforeState.get(struct.id.client) || 0);
        }
        /**
         * This is a computed property. Note that this can only be safely computed during the
         * event call. Computing this property after other changes happened might result in
         * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
         * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
         *
         * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
         */
        get changes() {
          let changes = this._changes;
          if (changes === null) {
            if (this.transaction.doc._transactionCleanups.length === 0) {
              throw create3(errorComputeChanges);
            }
            const target = this.target;
            const added = create2();
            const deleted = create2();
            const delta = [];
            changes = {
              added,
              deleted,
              delta,
              keys: this.keys
            };
            const changed = (
              /** @type Set<string|null> */
              this.transaction.changed.get(target)
            );
            if (changed.has(null)) {
              let lastOp = null;
              const packOp = () => {
                if (lastOp) {
                  delta.push(lastOp);
                }
              };
              for (let item = target._start; item !== null; item = item.right) {
                if (item.deleted) {
                  if (this.deletes(item) && !this.adds(item)) {
                    if (lastOp === null || lastOp.delete === void 0) {
                      packOp();
                      lastOp = { delete: 0 };
                    }
                    lastOp.delete += item.length;
                    deleted.add(item);
                  }
                } else {
                  if (this.adds(item)) {
                    if (lastOp === null || lastOp.insert === void 0) {
                      packOp();
                      lastOp = { insert: [] };
                    }
                    lastOp.insert = lastOp.insert.concat(item.content.getContent());
                    added.add(item);
                  } else {
                    if (lastOp === null || lastOp.retain === void 0) {
                      packOp();
                      lastOp = { retain: 0 };
                    }
                    lastOp.retain += item.length;
                  }
                }
              }
              if (lastOp !== null && lastOp.retain === void 0) {
                packOp();
              }
            }
            this._changes = changes;
          }
          return (
            /** @type {any} */
            changes
          );
        }
      };
      getPathTo = (parent, child) => {
        const path = [];
        while (child._item !== null && child !== parent) {
          if (child._item.parentSub !== null) {
            path.unshift(child._item.parentSub);
          } else {
            let i = 0;
            let c = (
              /** @type {AbstractType<any>} */
              child._item.parent._start
            );
            while (c !== child._item && c !== null) {
              if (!c.deleted && c.countable) {
                i += c.length;
              }
              c = c.right;
            }
            path.unshift(i);
          }
          child = /** @type {AbstractType<any>} */
          child._item.parent;
        }
        return path;
      };
      warnPrematureAccess = () => {
        warn("Invalid access: Add Yjs type to a document before reading data.");
      };
      maxSearchMarker = 80;
      globalSearchMarkerTimestamp = 0;
      ArraySearchMarker = class {
        /**
         * @param {Item} p
         * @param {number} index
         */
        constructor(p, index) {
          p.marker = true;
          this.p = p;
          this.index = index;
          this.timestamp = globalSearchMarkerTimestamp++;
        }
      };
      refreshMarkerTimestamp = (marker) => {
        marker.timestamp = globalSearchMarkerTimestamp++;
      };
      overwriteMarker = (marker, p, index) => {
        marker.p.marker = false;
        marker.p = p;
        p.marker = true;
        marker.index = index;
        marker.timestamp = globalSearchMarkerTimestamp++;
      };
      markPosition = (searchMarker, p, index) => {
        if (searchMarker.length >= maxSearchMarker) {
          const marker = searchMarker.reduce((a, b) => a.timestamp < b.timestamp ? a : b);
          overwriteMarker(marker, p, index);
          return marker;
        } else {
          const pm = new ArraySearchMarker(p, index);
          searchMarker.push(pm);
          return pm;
        }
      };
      findMarker = (yarray, index) => {
        if (yarray._start === null || index === 0 || yarray._searchMarker === null) {
          return null;
        }
        const marker = yarray._searchMarker.length === 0 ? null : yarray._searchMarker.reduce((a, b) => abs(index - a.index) < abs(index - b.index) ? a : b);
        let p = yarray._start;
        let pindex = 0;
        if (marker !== null) {
          p = marker.p;
          pindex = marker.index;
          refreshMarkerTimestamp(marker);
        }
        while (p.right !== null && pindex < index) {
          if (!p.deleted && p.countable) {
            if (index < pindex + p.length) {
              break;
            }
            pindex += p.length;
          }
          p = p.right;
        }
        while (p.left !== null && pindex > index) {
          p = p.left;
          if (!p.deleted && p.countable) {
            pindex -= p.length;
          }
        }
        while (p.left !== null && p.left.id.client === p.id.client && p.left.id.clock + p.left.length === p.id.clock) {
          p = p.left;
          if (!p.deleted && p.countable) {
            pindex -= p.length;
          }
        }
        if (marker !== null && abs(marker.index - pindex) < /** @type {YText|YArray<any>} */
        p.parent.length / maxSearchMarker) {
          overwriteMarker(marker, p, pindex);
          return marker;
        } else {
          return markPosition(yarray._searchMarker, p, pindex);
        }
      };
      updateMarkerChanges = (searchMarker, index, len) => {
        for (let i = searchMarker.length - 1; i >= 0; i--) {
          const m = searchMarker[i];
          if (len > 0) {
            let p = m.p;
            p.marker = false;
            while (p && (p.deleted || !p.countable)) {
              p = p.left;
              if (p && !p.deleted && p.countable) {
                m.index -= p.length;
              }
            }
            if (p === null || p.marker === true) {
              searchMarker.splice(i, 1);
              continue;
            }
            m.p = p;
            p.marker = true;
          }
          if (index < m.index || len > 0 && index === m.index) {
            m.index = max(index, m.index + len);
          }
        }
      };
      callTypeObservers = (type, transaction, event) => {
        const changedType = type;
        const changedParentTypes = transaction.changedParentTypes;
        while (true) {
          setIfUndefined(changedParentTypes, type, () => []).push(event);
          if (type._item === null) {
            break;
          }
          type = /** @type {AbstractType<any>} */
          type._item.parent;
        }
        callEventHandlerListeners(changedType._eH, event, transaction);
      };
      AbstractType = class {
        constructor() {
          this._item = null;
          this._map = /* @__PURE__ */ new Map();
          this._start = null;
          this.doc = null;
          this._length = 0;
          this._eH = createEventHandler();
          this._dEH = createEventHandler();
          this._searchMarker = null;
        }
        /**
         * @return {AbstractType<any>|null}
         */
        get parent() {
          return this._item ? (
            /** @type {AbstractType<any>} */
            this._item.parent
          ) : null;
        }
        /**
         * Integrate this type into the Yjs instance.
         *
         * * Save this struct in the os
         * * This type is sent to other client
         * * Observer functions are fired
         *
         * @param {Doc} y The Yjs instance
         * @param {Item|null} item
         */
        _integrate(y, item) {
          this.doc = y;
          this._item = item;
        }
        /**
         * @return {AbstractType<EventType>}
         */
        _copy() {
          throw methodUnimplemented();
        }
        /**
         * Makes a copy of this data type that can be included somewhere else.
         *
         * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
         *
         * @return {AbstractType<EventType>}
         */
        clone() {
          throw methodUnimplemented();
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} _encoder
         */
        _write(_encoder) {
        }
        /**
         * The first non-deleted item
         */
        get _first() {
          let n = this._start;
          while (n !== null && n.deleted) {
            n = n.right;
          }
          return n;
        }
        /**
         * Creates YEvent and calls all type observers.
         * Must be implemented by each type.
         *
         * @param {Transaction} transaction
         * @param {Set<null|string>} _parentSubs Keys changed on this type. `null` if list was modified.
         */
        _callObserver(transaction, _parentSubs) {
          if (!transaction.local && this._searchMarker) {
            this._searchMarker.length = 0;
          }
        }
        /**
         * Observe all events that are created on this type.
         *
         * @param {function(EventType, Transaction):void} f Observer function
         */
        observe(f) {
          addEventHandlerListener(this._eH, f);
        }
        /**
         * Observe all events that are created by this type and its children.
         *
         * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
         */
        observeDeep(f) {
          addEventHandlerListener(this._dEH, f);
        }
        /**
         * Unregister an observer function.
         *
         * @param {function(EventType,Transaction):void} f Observer function
         */
        unobserve(f) {
          removeEventHandlerListener(this._eH, f);
        }
        /**
         * Unregister an observer function.
         *
         * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
         */
        unobserveDeep(f) {
          removeEventHandlerListener(this._dEH, f);
        }
        /**
         * @abstract
         * @return {any}
         */
        toJSON() {
        }
      };
      typeListSlice = (type, start, end) => {
        type.doc ?? warnPrematureAccess();
        if (start < 0) {
          start = type._length + start;
        }
        if (end < 0) {
          end = type._length + end;
        }
        let len = end - start;
        const cs = [];
        let n = type._start;
        while (n !== null && len > 0) {
          if (n.countable && !n.deleted) {
            const c = n.content.getContent();
            if (c.length <= start) {
              start -= c.length;
            } else {
              for (let i = start; i < c.length && len > 0; i++) {
                cs.push(c[i]);
                len--;
              }
              start = 0;
            }
          }
          n = n.right;
        }
        return cs;
      };
      typeListToArray = (type) => {
        type.doc ?? warnPrematureAccess();
        const cs = [];
        let n = type._start;
        while (n !== null) {
          if (n.countable && !n.deleted) {
            const c = n.content.getContent();
            for (let i = 0; i < c.length; i++) {
              cs.push(c[i]);
            }
          }
          n = n.right;
        }
        return cs;
      };
      typeListForEach = (type, f) => {
        let index = 0;
        let n = type._start;
        type.doc ?? warnPrematureAccess();
        while (n !== null) {
          if (n.countable && !n.deleted) {
            const c = n.content.getContent();
            for (let i = 0; i < c.length; i++) {
              f(c[i], index++, type);
            }
          }
          n = n.right;
        }
      };
      typeListMap = (type, f) => {
        const result = [];
        typeListForEach(type, (c, i) => {
          result.push(f(c, i, type));
        });
        return result;
      };
      typeListCreateIterator = (type) => {
        let n = type._start;
        let currentContent = null;
        let currentContentIndex = 0;
        return {
          [Symbol.iterator]() {
            return this;
          },
          next: () => {
            if (currentContent === null) {
              while (n !== null && n.deleted) {
                n = n.right;
              }
              if (n === null) {
                return {
                  done: true,
                  value: void 0
                };
              }
              currentContent = n.content.getContent();
              currentContentIndex = 0;
              n = n.right;
            }
            const value = currentContent[currentContentIndex++];
            if (currentContent.length <= currentContentIndex) {
              currentContent = null;
            }
            return {
              done: false,
              value
            };
          }
        };
      };
      typeListGet = (type, index) => {
        type.doc ?? warnPrematureAccess();
        const marker = findMarker(type, index);
        let n = type._start;
        if (marker !== null) {
          n = marker.p;
          index -= marker.index;
        }
        for (; n !== null; n = n.right) {
          if (!n.deleted && n.countable) {
            if (index < n.length) {
              return n.content.getContent()[index];
            }
            index -= n.length;
          }
        }
      };
      typeListInsertGenericsAfter = (transaction, parent, referenceItem, content) => {
        let left = referenceItem;
        const doc2 = transaction.doc;
        const ownClientId = doc2.clientID;
        const store = doc2.store;
        const right = referenceItem === null ? parent._start : referenceItem.right;
        let jsonContent = [];
        const packJsonContent = () => {
          if (jsonContent.length > 0) {
            left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentAny(jsonContent));
            left.integrate(transaction, 0);
            jsonContent = [];
          }
        };
        content.forEach((c) => {
          if (c === null) {
            jsonContent.push(c);
          } else {
            switch (c.constructor) {
              case Number:
              case Object:
              case Boolean:
              case Array:
              case String:
                jsonContent.push(c);
                break;
              default:
                packJsonContent();
                switch (c.constructor) {
                  case Uint8Array:
                  case ArrayBuffer:
                    left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentBinary(new Uint8Array(
                      /** @type {Uint8Array} */
                      c
                    )));
                    left.integrate(transaction, 0);
                    break;
                  case Doc:
                    left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentDoc(
                      /** @type {Doc} */
                      c
                    ));
                    left.integrate(transaction, 0);
                    break;
                  default:
                    if (c instanceof AbstractType) {
                      left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentType(c));
                      left.integrate(transaction, 0);
                    } else {
                      throw new Error("Unexpected content type in insert operation");
                    }
                }
            }
          }
        });
        packJsonContent();
      };
      lengthExceeded = () => create3("Length exceeded!");
      typeListInsertGenerics = (transaction, parent, index, content) => {
        if (index > parent._length) {
          throw lengthExceeded();
        }
        if (index === 0) {
          if (parent._searchMarker) {
            updateMarkerChanges(parent._searchMarker, index, content.length);
          }
          return typeListInsertGenericsAfter(transaction, parent, null, content);
        }
        const startIndex = index;
        const marker = findMarker(parent, index);
        let n = parent._start;
        if (marker !== null) {
          n = marker.p;
          index -= marker.index;
          if (index === 0) {
            n = n.prev;
            index += n && n.countable && !n.deleted ? n.length : 0;
          }
        }
        for (; n !== null; n = n.right) {
          if (!n.deleted && n.countable) {
            if (index <= n.length) {
              if (index < n.length) {
                getItemCleanStart(transaction, createID(n.id.client, n.id.clock + index));
              }
              break;
            }
            index -= n.length;
          }
        }
        if (parent._searchMarker) {
          updateMarkerChanges(parent._searchMarker, startIndex, content.length);
        }
        return typeListInsertGenericsAfter(transaction, parent, n, content);
      };
      typeListPushGenerics = (transaction, parent, content) => {
        const marker = (parent._searchMarker || []).reduce((maxMarker, currMarker) => currMarker.index > maxMarker.index ? currMarker : maxMarker, { index: 0, p: parent._start });
        let n = marker.p;
        if (n) {
          while (n.right) {
            n = n.right;
          }
        }
        return typeListInsertGenericsAfter(transaction, parent, n, content);
      };
      typeListDelete = (transaction, parent, index, length2) => {
        if (length2 === 0) {
          return;
        }
        const startIndex = index;
        const startLength = length2;
        const marker = findMarker(parent, index);
        let n = parent._start;
        if (marker !== null) {
          n = marker.p;
          index -= marker.index;
        }
        for (; n !== null && index > 0; n = n.right) {
          if (!n.deleted && n.countable) {
            if (index < n.length) {
              getItemCleanStart(transaction, createID(n.id.client, n.id.clock + index));
            }
            index -= n.length;
          }
        }
        while (length2 > 0 && n !== null) {
          if (!n.deleted) {
            if (length2 < n.length) {
              getItemCleanStart(transaction, createID(n.id.client, n.id.clock + length2));
            }
            n.delete(transaction);
            length2 -= n.length;
          }
          n = n.right;
        }
        if (length2 > 0) {
          throw lengthExceeded();
        }
        if (parent._searchMarker) {
          updateMarkerChanges(
            parent._searchMarker,
            startIndex,
            -startLength + length2
            /* in case we remove the above exception */
          );
        }
      };
      typeMapDelete = (transaction, parent, key) => {
        const c = parent._map.get(key);
        if (c !== void 0) {
          c.delete(transaction);
        }
      };
      typeMapSet = (transaction, parent, key, value) => {
        const left = parent._map.get(key) || null;
        const doc2 = transaction.doc;
        const ownClientId = doc2.clientID;
        let content;
        if (value == null) {
          content = new ContentAny([value]);
        } else {
          switch (value.constructor) {
            case Number:
            case Object:
            case Boolean:
            case Array:
            case String:
            case Date:
            case BigInt:
              content = new ContentAny([value]);
              break;
            case Uint8Array:
              content = new ContentBinary(
                /** @type {Uint8Array} */
                value
              );
              break;
            case Doc:
              content = new ContentDoc(
                /** @type {Doc} */
                value
              );
              break;
            default:
              if (value instanceof AbstractType) {
                content = new ContentType(value);
              } else {
                throw new Error("Unexpected content type");
              }
          }
        }
        new Item(createID(ownClientId, getState(doc2.store, ownClientId)), left, left && left.lastId, null, null, parent, key, content).integrate(transaction, 0);
      };
      typeMapGet = (parent, key) => {
        parent.doc ?? warnPrematureAccess();
        const val = parent._map.get(key);
        return val !== void 0 && !val.deleted ? val.content.getContent()[val.length - 1] : void 0;
      };
      typeMapGetAll = (parent) => {
        const res = {};
        parent.doc ?? warnPrematureAccess();
        parent._map.forEach((value, key) => {
          if (!value.deleted) {
            res[key] = value.content.getContent()[value.length - 1];
          }
        });
        return res;
      };
      typeMapHas = (parent, key) => {
        parent.doc ?? warnPrematureAccess();
        const val = parent._map.get(key);
        return val !== void 0 && !val.deleted;
      };
      typeMapGetAllSnapshot = (parent, snapshot) => {
        const res = {};
        parent._map.forEach((value, key) => {
          let v = value;
          while (v !== null && (!snapshot.sv.has(v.id.client) || v.id.clock >= (snapshot.sv.get(v.id.client) || 0))) {
            v = v.left;
          }
          if (v !== null && isVisible(v, snapshot)) {
            res[key] = v.content.getContent()[v.length - 1];
          }
        });
        return res;
      };
      createMapIterator = (type) => {
        type.doc ?? warnPrematureAccess();
        return iteratorFilter(
          type._map.entries(),
          /** @param {any} entry */
          (entry) => !entry[1].deleted
        );
      };
      YArrayEvent = class extends YEvent {
      };
      YArray = class _YArray extends AbstractType {
        constructor() {
          super();
          this._prelimContent = [];
          this._searchMarker = [];
        }
        /**
         * Construct a new YArray containing the specified items.
         * @template {Object<string,any>|Array<any>|number|null|string|Uint8Array} T
         * @param {Array<T>} items
         * @return {YArray<T>}
         */
        static from(items) {
          const a = new _YArray();
          a.push(items);
          return a;
        }
        /**
         * Integrate this type into the Yjs instance.
         *
         * * Save this struct in the os
         * * This type is sent to other client
         * * Observer functions are fired
         *
         * @param {Doc} y The Yjs instance
         * @param {Item} item
         */
        _integrate(y, item) {
          super._integrate(y, item);
          this.insert(
            0,
            /** @type {Array<any>} */
            this._prelimContent
          );
          this._prelimContent = null;
        }
        /**
         * @return {YArray<T>}
         */
        _copy() {
          return new _YArray();
        }
        /**
         * Makes a copy of this data type that can be included somewhere else.
         *
         * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
         *
         * @return {YArray<T>}
         */
        clone() {
          const arr = new _YArray();
          arr.insert(0, this.toArray().map(
            (el) => el instanceof AbstractType ? (
              /** @type {typeof el} */
              el.clone()
            ) : el
          ));
          return arr;
        }
        get length() {
          this.doc ?? warnPrematureAccess();
          return this._length;
        }
        /**
         * Creates YArrayEvent and calls observers.
         *
         * @param {Transaction} transaction
         * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
         */
        _callObserver(transaction, parentSubs) {
          super._callObserver(transaction, parentSubs);
          callTypeObservers(this, transaction, new YArrayEvent(this, transaction));
        }
        /**
         * Inserts new content at an index.
         *
         * Important: This function expects an array of content. Not just a content
         * object. The reason for this "weirdness" is that inserting several elements
         * is very efficient when it is done as a single operation.
         *
         * @example
         *  // Insert character 'a' at position 0
         *  yarray.insert(0, ['a'])
         *  // Insert numbers 1, 2 at position 1
         *  yarray.insert(1, [1, 2])
         *
         * @param {number} index The index to insert content at.
         * @param {Array<T>} content The array of content
         */
        insert(index, content) {
          if (this.doc !== null) {
            transact(this.doc, (transaction) => {
              typeListInsertGenerics(
                transaction,
                this,
                index,
                /** @type {any} */
                content
              );
            });
          } else {
            this._prelimContent.splice(index, 0, ...content);
          }
        }
        /**
         * Appends content to this YArray.
         *
         * @param {Array<T>} content Array of content to append.
         *
         * @todo Use the following implementation in all types.
         */
        push(content) {
          if (this.doc !== null) {
            transact(this.doc, (transaction) => {
              typeListPushGenerics(
                transaction,
                this,
                /** @type {any} */
                content
              );
            });
          } else {
            this._prelimContent.push(...content);
          }
        }
        /**
         * Prepends content to this YArray.
         *
         * @param {Array<T>} content Array of content to prepend.
         */
        unshift(content) {
          this.insert(0, content);
        }
        /**
         * Deletes elements starting from an index.
         *
         * @param {number} index Index at which to start deleting elements
         * @param {number} length The number of elements to remove. Defaults to 1.
         */
        delete(index, length2 = 1) {
          if (this.doc !== null) {
            transact(this.doc, (transaction) => {
              typeListDelete(transaction, this, index, length2);
            });
          } else {
            this._prelimContent.splice(index, length2);
          }
        }
        /**
         * Returns the i-th element from a YArray.
         *
         * @param {number} index The index of the element to return from the YArray
         * @return {T}
         */
        get(index) {
          return typeListGet(this, index);
        }
        /**
         * Transforms this YArray to a JavaScript Array.
         *
         * @return {Array<T>}
         */
        toArray() {
          return typeListToArray(this);
        }
        /**
         * Returns a portion of this YArray into a JavaScript Array selected
         * from start to end (end not included).
         *
         * @param {number} [start]
         * @param {number} [end]
         * @return {Array<T>}
         */
        slice(start = 0, end = this.length) {
          return typeListSlice(this, start, end);
        }
        /**
         * Transforms this Shared Type to a JSON object.
         *
         * @return {Array<any>}
         */
        toJSON() {
          return this.map((c) => c instanceof AbstractType ? c.toJSON() : c);
        }
        /**
         * Returns an Array with the result of calling a provided function on every
         * element of this YArray.
         *
         * @template M
         * @param {function(T,number,YArray<T>):M} f Function that produces an element of the new Array
         * @return {Array<M>} A new array with each element being the result of the
         *                 callback function
         */
        map(f) {
          return typeListMap(
            this,
            /** @type {any} */
            f
          );
        }
        /**
         * Executes a provided function once on every element of this YArray.
         *
         * @param {function(T,number,YArray<T>):void} f A function to execute on every element of this YArray.
         */
        forEach(f) {
          typeListForEach(this, f);
        }
        /**
         * @return {IterableIterator<T>}
         */
        [Symbol.iterator]() {
          return typeListCreateIterator(this);
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         */
        _write(encoder) {
          encoder.writeTypeRef(YArrayRefID);
        }
      };
      readYArray = (_decoder) => new YArray();
      YMapEvent = class extends YEvent {
        /**
         * @param {YMap<T>} ymap The YArray that changed.
         * @param {Transaction} transaction
         * @param {Set<any>} subs The keys that changed.
         */
        constructor(ymap, transaction, subs) {
          super(ymap, transaction);
          this.keysChanged = subs;
        }
      };
      YMap = class _YMap extends AbstractType {
        /**
         *
         * @param {Iterable<readonly [string, any]>=} entries - an optional iterable to initialize the YMap
         */
        constructor(entries) {
          super();
          this._prelimContent = null;
          if (entries === void 0) {
            this._prelimContent = /* @__PURE__ */ new Map();
          } else {
            this._prelimContent = new Map(entries);
          }
        }
        /**
         * Integrate this type into the Yjs instance.
         *
         * * Save this struct in the os
         * * This type is sent to other client
         * * Observer functions are fired
         *
         * @param {Doc} y The Yjs instance
         * @param {Item} item
         */
        _integrate(y, item) {
          super._integrate(y, item);
          this._prelimContent.forEach((value, key) => {
            this.set(key, value);
          });
          this._prelimContent = null;
        }
        /**
         * @return {YMap<MapType>}
         */
        _copy() {
          return new _YMap();
        }
        /**
         * Makes a copy of this data type that can be included somewhere else.
         *
         * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
         *
         * @return {YMap<MapType>}
         */
        clone() {
          const map3 = new _YMap();
          this.forEach((value, key) => {
            map3.set(key, value instanceof AbstractType ? (
              /** @type {typeof value} */
              value.clone()
            ) : value);
          });
          return map3;
        }
        /**
         * Creates YMapEvent and calls observers.
         *
         * @param {Transaction} transaction
         * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
         */
        _callObserver(transaction, parentSubs) {
          callTypeObservers(this, transaction, new YMapEvent(this, transaction, parentSubs));
        }
        /**
         * Transforms this Shared Type to a JSON object.
         *
         * @return {Object<string,any>}
         */
        toJSON() {
          this.doc ?? warnPrematureAccess();
          const map3 = {};
          this._map.forEach((item, key) => {
            if (!item.deleted) {
              const v = item.content.getContent()[item.length - 1];
              map3[key] = v instanceof AbstractType ? v.toJSON() : v;
            }
          });
          return map3;
        }
        /**
         * Returns the size of the YMap (count of key/value pairs)
         *
         * @return {number}
         */
        get size() {
          return [...createMapIterator(this)].length;
        }
        /**
         * Returns the keys for each element in the YMap Type.
         *
         * @return {IterableIterator<string>}
         */
        keys() {
          return iteratorMap(
            createMapIterator(this),
            /** @param {any} v */
            (v) => v[0]
          );
        }
        /**
         * Returns the values for each element in the YMap Type.
         *
         * @return {IterableIterator<MapType>}
         */
        values() {
          return iteratorMap(
            createMapIterator(this),
            /** @param {any} v */
            (v) => v[1].content.getContent()[v[1].length - 1]
          );
        }
        /**
         * Returns an Iterator of [key, value] pairs
         *
         * @return {IterableIterator<[string, MapType]>}
         */
        entries() {
          return iteratorMap(
            createMapIterator(this),
            /** @param {any} v */
            (v) => (
              /** @type {any} */
              [v[0], v[1].content.getContent()[v[1].length - 1]]
            )
          );
        }
        /**
         * Executes a provided function on once on every key-value pair.
         *
         * @param {function(MapType,string,YMap<MapType>):void} f A function to execute on every element of this YArray.
         */
        forEach(f) {
          this.doc ?? warnPrematureAccess();
          this._map.forEach((item, key) => {
            if (!item.deleted) {
              f(item.content.getContent()[item.length - 1], key, this);
            }
          });
        }
        /**
         * Returns an Iterator of [key, value] pairs
         *
         * @return {IterableIterator<[string, MapType]>}
         */
        [Symbol.iterator]() {
          return this.entries();
        }
        /**
         * Remove a specified element from this YMap.
         *
         * @param {string} key The key of the element to remove.
         */
        delete(key) {
          if (this.doc !== null) {
            transact(this.doc, (transaction) => {
              typeMapDelete(transaction, this, key);
            });
          } else {
            this._prelimContent.delete(key);
          }
        }
        /**
         * Adds or updates an element with a specified key and value.
         * @template {MapType} VAL
         *
         * @param {string} key The key of the element to add to this YMap
         * @param {VAL} value The value of the element to add
         * @return {VAL}
         */
        set(key, value) {
          if (this.doc !== null) {
            transact(this.doc, (transaction) => {
              typeMapSet(
                transaction,
                this,
                key,
                /** @type {any} */
                value
              );
            });
          } else {
            this._prelimContent.set(key, value);
          }
          return value;
        }
        /**
         * Returns a specified element from this YMap.
         *
         * @param {string} key
         * @return {MapType|undefined}
         */
        get(key) {
          return (
            /** @type {any} */
            typeMapGet(this, key)
          );
        }
        /**
         * Returns a boolean indicating whether the specified key exists or not.
         *
         * @param {string} key The key to test.
         * @return {boolean}
         */
        has(key) {
          return typeMapHas(this, key);
        }
        /**
         * Removes all elements from this YMap.
         */
        clear() {
          if (this.doc !== null) {
            transact(this.doc, (transaction) => {
              this.forEach(function(_value, key, map3) {
                typeMapDelete(transaction, map3, key);
              });
            });
          } else {
            this._prelimContent.clear();
          }
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         */
        _write(encoder) {
          encoder.writeTypeRef(YMapRefID);
        }
      };
      readYMap = (_decoder) => new YMap();
      equalAttrs = (a, b) => a === b || typeof a === "object" && typeof b === "object" && a && b && equalFlat(a, b);
      ItemTextListPosition = class {
        /**
         * @param {Item|null} left
         * @param {Item|null} right
         * @param {number} index
         * @param {Map<string,any>} currentAttributes
         */
        constructor(left, right, index, currentAttributes) {
          this.left = left;
          this.right = right;
          this.index = index;
          this.currentAttributes = currentAttributes;
        }
        /**
         * Only call this if you know that this.right is defined
         */
        forward() {
          if (this.right === null) {
            unexpectedCase();
          }
          switch (this.right.content.constructor) {
            case ContentFormat:
              if (!this.right.deleted) {
                updateCurrentAttributes(
                  this.currentAttributes,
                  /** @type {ContentFormat} */
                  this.right.content
                );
              }
              break;
            default:
              if (!this.right.deleted) {
                this.index += this.right.length;
              }
              break;
          }
          this.left = this.right;
          this.right = this.right.right;
        }
      };
      findNextPosition = (transaction, pos, count) => {
        while (pos.right !== null && count > 0) {
          switch (pos.right.content.constructor) {
            case ContentFormat:
              if (!pos.right.deleted) {
                updateCurrentAttributes(
                  pos.currentAttributes,
                  /** @type {ContentFormat} */
                  pos.right.content
                );
              }
              break;
            default:
              if (!pos.right.deleted) {
                if (count < pos.right.length) {
                  getItemCleanStart(transaction, createID(pos.right.id.client, pos.right.id.clock + count));
                }
                pos.index += pos.right.length;
                count -= pos.right.length;
              }
              break;
          }
          pos.left = pos.right;
          pos.right = pos.right.right;
        }
        return pos;
      };
      findPosition = (transaction, parent, index, useSearchMarker) => {
        const currentAttributes = /* @__PURE__ */ new Map();
        const marker = useSearchMarker ? findMarker(parent, index) : null;
        if (marker) {
          const pos = new ItemTextListPosition(marker.p.left, marker.p, marker.index, currentAttributes);
          return findNextPosition(transaction, pos, index - marker.index);
        } else {
          const pos = new ItemTextListPosition(null, parent._start, 0, currentAttributes);
          return findNextPosition(transaction, pos, index);
        }
      };
      insertNegatedAttributes = (transaction, parent, currPos, negatedAttributes) => {
        while (currPos.right !== null && (currPos.right.deleted === true || currPos.right.content.constructor === ContentFormat && equalAttrs(
          negatedAttributes.get(
            /** @type {ContentFormat} */
            currPos.right.content.key
          ),
          /** @type {ContentFormat} */
          currPos.right.content.value
        ))) {
          if (!currPos.right.deleted) {
            negatedAttributes.delete(
              /** @type {ContentFormat} */
              currPos.right.content.key
            );
          }
          currPos.forward();
        }
        const doc2 = transaction.doc;
        const ownClientId = doc2.clientID;
        negatedAttributes.forEach((val, key) => {
          const left = currPos.left;
          const right = currPos.right;
          const nextFormat = new Item(createID(ownClientId, getState(doc2.store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentFormat(key, val));
          nextFormat.integrate(transaction, 0);
          currPos.right = nextFormat;
          currPos.forward();
        });
      };
      updateCurrentAttributes = (currentAttributes, format) => {
        const { key, value } = format;
        if (value === null) {
          currentAttributes.delete(key);
        } else {
          currentAttributes.set(key, value);
        }
      };
      minimizeAttributeChanges = (currPos, attributes) => {
        while (true) {
          if (currPos.right === null) {
            break;
          } else if (currPos.right.deleted || currPos.right.content.constructor === ContentFormat && equalAttrs(
            attributes[
              /** @type {ContentFormat} */
              currPos.right.content.key
            ] ?? null,
            /** @type {ContentFormat} */
            currPos.right.content.value
          )) ;
          else {
            break;
          }
          currPos.forward();
        }
      };
      insertAttributes = (transaction, parent, currPos, attributes) => {
        const doc2 = transaction.doc;
        const ownClientId = doc2.clientID;
        const negatedAttributes = /* @__PURE__ */ new Map();
        for (const key in attributes) {
          const val = attributes[key];
          const currentVal = currPos.currentAttributes.get(key) ?? null;
          if (!equalAttrs(currentVal, val)) {
            negatedAttributes.set(key, currentVal);
            const { left, right } = currPos;
            currPos.right = new Item(createID(ownClientId, getState(doc2.store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentFormat(key, val));
            currPos.right.integrate(transaction, 0);
            currPos.forward();
          }
        }
        return negatedAttributes;
      };
      insertText = (transaction, parent, currPos, text2, attributes) => {
        currPos.currentAttributes.forEach((_val, key) => {
          if (attributes[key] === void 0) {
            attributes[key] = null;
          }
        });
        const doc2 = transaction.doc;
        const ownClientId = doc2.clientID;
        minimizeAttributeChanges(currPos, attributes);
        const negatedAttributes = insertAttributes(transaction, parent, currPos, attributes);
        const content = text2.constructor === String ? new ContentString(
          /** @type {string} */
          text2
        ) : text2 instanceof AbstractType ? new ContentType(text2) : new ContentEmbed(text2);
        let { left, right, index } = currPos;
        if (parent._searchMarker) {
          updateMarkerChanges(parent._searchMarker, currPos.index, content.getLength());
        }
        right = new Item(createID(ownClientId, getState(doc2.store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, content);
        right.integrate(transaction, 0);
        currPos.right = right;
        currPos.index = index;
        currPos.forward();
        insertNegatedAttributes(transaction, parent, currPos, negatedAttributes);
      };
      formatText = (transaction, parent, currPos, length2, attributes) => {
        const doc2 = transaction.doc;
        const ownClientId = doc2.clientID;
        minimizeAttributeChanges(currPos, attributes);
        const negatedAttributes = insertAttributes(transaction, parent, currPos, attributes);
        iterationLoop: while (currPos.right !== null && (length2 > 0 || negatedAttributes.size > 0 && (currPos.right.deleted || currPos.right.content.constructor === ContentFormat))) {
          if (!currPos.right.deleted) {
            switch (currPos.right.content.constructor) {
              case ContentFormat: {
                const { key, value } = (
                  /** @type {ContentFormat} */
                  currPos.right.content
                );
                const attr = attributes[key];
                if (attr !== void 0) {
                  if (equalAttrs(attr, value)) {
                    negatedAttributes.delete(key);
                  } else {
                    if (length2 === 0) {
                      break iterationLoop;
                    }
                    negatedAttributes.set(key, value);
                  }
                  currPos.right.delete(transaction);
                } else {
                  currPos.currentAttributes.set(key, value);
                }
                break;
              }
              default:
                if (length2 < currPos.right.length) {
                  getItemCleanStart(transaction, createID(currPos.right.id.client, currPos.right.id.clock + length2));
                }
                length2 -= currPos.right.length;
                break;
            }
          }
          currPos.forward();
        }
        if (length2 > 0) {
          let newlines = "";
          for (; length2 > 0; length2--) {
            newlines += "\n";
          }
          currPos.right = new Item(createID(ownClientId, getState(doc2.store, ownClientId)), currPos.left, currPos.left && currPos.left.lastId, currPos.right, currPos.right && currPos.right.id, parent, null, new ContentString(newlines));
          currPos.right.integrate(transaction, 0);
          currPos.forward();
        }
        insertNegatedAttributes(transaction, parent, currPos, negatedAttributes);
      };
      cleanupFormattingGap = (transaction, start, curr, startAttributes, currAttributes) => {
        let end = start;
        const endFormats = create();
        while (end && (!end.countable || end.deleted)) {
          if (!end.deleted && end.content.constructor === ContentFormat) {
            const cf = (
              /** @type {ContentFormat} */
              end.content
            );
            endFormats.set(cf.key, cf);
          }
          end = end.right;
        }
        let cleanups = 0;
        let reachedCurr = false;
        while (start !== end) {
          if (curr === start) {
            reachedCurr = true;
          }
          if (!start.deleted) {
            const content = start.content;
            switch (content.constructor) {
              case ContentFormat: {
                const { key, value } = (
                  /** @type {ContentFormat} */
                  content
                );
                const startAttrValue = startAttributes.get(key) ?? null;
                if (endFormats.get(key) !== content || startAttrValue === value) {
                  start.delete(transaction);
                  cleanups++;
                  if (!reachedCurr && (currAttributes.get(key) ?? null) === value && startAttrValue !== value) {
                    if (startAttrValue === null) {
                      currAttributes.delete(key);
                    } else {
                      currAttributes.set(key, startAttrValue);
                    }
                  }
                }
                if (!reachedCurr && !start.deleted) {
                  updateCurrentAttributes(
                    currAttributes,
                    /** @type {ContentFormat} */
                    content
                  );
                }
                break;
              }
            }
          }
          start = /** @type {Item} */
          start.right;
        }
        return cleanups;
      };
      cleanupContextlessFormattingGap = (transaction, item) => {
        while (item && item.right && (item.right.deleted || !item.right.countable)) {
          item = item.right;
        }
        const attrs = /* @__PURE__ */ new Set();
        while (item && (item.deleted || !item.countable)) {
          if (!item.deleted && item.content.constructor === ContentFormat) {
            const key = (
              /** @type {ContentFormat} */
              item.content.key
            );
            if (attrs.has(key)) {
              item.delete(transaction);
            } else {
              attrs.add(key);
            }
          }
          item = item.left;
        }
      };
      cleanupYTextFormatting = (type) => {
        let res = 0;
        transact(
          /** @type {Doc} */
          type.doc,
          (transaction) => {
            let start = (
              /** @type {Item} */
              type._start
            );
            let end = type._start;
            let startAttributes = create();
            const currentAttributes = copy(startAttributes);
            while (end) {
              if (end.deleted === false) {
                switch (end.content.constructor) {
                  case ContentFormat:
                    updateCurrentAttributes(
                      currentAttributes,
                      /** @type {ContentFormat} */
                      end.content
                    );
                    break;
                  default:
                    res += cleanupFormattingGap(transaction, start, end, startAttributes, currentAttributes);
                    startAttributes = copy(currentAttributes);
                    start = end;
                    break;
                }
              }
              end = end.right;
            }
          }
        );
        return res;
      };
      cleanupYTextAfterTransaction = (transaction) => {
        const needFullCleanup = /* @__PURE__ */ new Set();
        const doc2 = transaction.doc;
        for (const [client, afterClock] of transaction.afterState.entries()) {
          const clock = transaction.beforeState.get(client) || 0;
          if (afterClock === clock) {
            continue;
          }
          iterateStructs(
            transaction,
            /** @type {Array<Item|GC>} */
            doc2.store.clients.get(client),
            clock,
            afterClock,
            (item) => {
              if (!item.deleted && /** @type {Item} */
              item.content.constructor === ContentFormat && item.constructor !== GC) {
                needFullCleanup.add(
                  /** @type {any} */
                  item.parent
                );
              }
            }
          );
        }
        transact(doc2, (t) => {
          iterateDeletedStructs(transaction, transaction.deleteSet, (item) => {
            if (item instanceof GC || !/** @type {YText} */
            item.parent._hasFormatting || needFullCleanup.has(
              /** @type {YText} */
              item.parent
            )) {
              return;
            }
            const parent = (
              /** @type {YText} */
              item.parent
            );
            if (item.content.constructor === ContentFormat) {
              needFullCleanup.add(parent);
            } else {
              cleanupContextlessFormattingGap(t, item);
            }
          });
          for (const yText of needFullCleanup) {
            cleanupYTextFormatting(yText);
          }
        });
      };
      deleteText = (transaction, currPos, length2) => {
        const startLength = length2;
        const startAttrs = copy(currPos.currentAttributes);
        const start = currPos.right;
        while (length2 > 0 && currPos.right !== null) {
          if (currPos.right.deleted === false) {
            switch (currPos.right.content.constructor) {
              case ContentType:
              case ContentEmbed:
              case ContentString:
                if (length2 < currPos.right.length) {
                  getItemCleanStart(transaction, createID(currPos.right.id.client, currPos.right.id.clock + length2));
                }
                length2 -= currPos.right.length;
                currPos.right.delete(transaction);
                break;
            }
          }
          currPos.forward();
        }
        if (start) {
          cleanupFormattingGap(transaction, start, currPos.right, startAttrs, currPos.currentAttributes);
        }
        const parent = (
          /** @type {AbstractType<any>} */
          /** @type {Item} */
          (currPos.left || currPos.right).parent
        );
        if (parent._searchMarker) {
          updateMarkerChanges(parent._searchMarker, currPos.index, -startLength + length2);
        }
        return currPos;
      };
      YTextEvent = class extends YEvent {
        /**
         * @param {YText} ytext
         * @param {Transaction} transaction
         * @param {Set<any>} subs The keys that changed
         */
        constructor(ytext, transaction, subs) {
          super(ytext, transaction);
          this.childListChanged = false;
          this.keysChanged = /* @__PURE__ */ new Set();
          subs.forEach((sub) => {
            if (sub === null) {
              this.childListChanged = true;
            } else {
              this.keysChanged.add(sub);
            }
          });
        }
        /**
         * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
         */
        get changes() {
          if (this._changes === null) {
            const changes = {
              keys: this.keys,
              delta: this.delta,
              added: /* @__PURE__ */ new Set(),
              deleted: /* @__PURE__ */ new Set()
            };
            this._changes = changes;
          }
          return (
            /** @type {any} */
            this._changes
          );
        }
        /**
         * Compute the changes in the delta format.
         * A {@link https://quilljs.com/docs/delta/|Quill Delta}) that represents the changes on the document.
         *
         * @type {Array<{insert?:string|object|AbstractType<any>, delete?:number, retain?:number, attributes?: Object<string,any>}>}
         *
         * @public
         */
        get delta() {
          if (this._delta === null) {
            const y = (
              /** @type {Doc} */
              this.target.doc
            );
            const delta = [];
            transact(y, (transaction) => {
              const currentAttributes = /* @__PURE__ */ new Map();
              const oldAttributes = /* @__PURE__ */ new Map();
              let item = this.target._start;
              let action = null;
              const attributes = {};
              let insert = "";
              let retain = 0;
              let deleteLen = 0;
              const addOp = () => {
                if (action !== null) {
                  let op = null;
                  switch (action) {
                    case "delete":
                      if (deleteLen > 0) {
                        op = { delete: deleteLen };
                      }
                      deleteLen = 0;
                      break;
                    case "insert":
                      if (typeof insert === "object" || insert.length > 0) {
                        op = { insert };
                        if (currentAttributes.size > 0) {
                          op.attributes = {};
                          currentAttributes.forEach((value, key) => {
                            if (value !== null) {
                              op.attributes[key] = value;
                            }
                          });
                        }
                      }
                      insert = "";
                      break;
                    case "retain":
                      if (retain > 0) {
                        op = { retain };
                        if (!isEmpty(attributes)) {
                          op.attributes = assign({}, attributes);
                        }
                      }
                      retain = 0;
                      break;
                  }
                  if (op) delta.push(op);
                  action = null;
                }
              };
              while (item !== null) {
                switch (item.content.constructor) {
                  case ContentType:
                  case ContentEmbed:
                    if (this.adds(item)) {
                      if (!this.deletes(item)) {
                        addOp();
                        action = "insert";
                        insert = item.content.getContent()[0];
                        addOp();
                      }
                    } else if (this.deletes(item)) {
                      if (action !== "delete") {
                        addOp();
                        action = "delete";
                      }
                      deleteLen += 1;
                    } else if (!item.deleted) {
                      if (action !== "retain") {
                        addOp();
                        action = "retain";
                      }
                      retain += 1;
                    }
                    break;
                  case ContentString:
                    if (this.adds(item)) {
                      if (!this.deletes(item)) {
                        if (action !== "insert") {
                          addOp();
                          action = "insert";
                        }
                        insert += /** @type {ContentString} */
                        item.content.str;
                      }
                    } else if (this.deletes(item)) {
                      if (action !== "delete") {
                        addOp();
                        action = "delete";
                      }
                      deleteLen += item.length;
                    } else if (!item.deleted) {
                      if (action !== "retain") {
                        addOp();
                        action = "retain";
                      }
                      retain += item.length;
                    }
                    break;
                  case ContentFormat: {
                    const { key, value } = (
                      /** @type {ContentFormat} */
                      item.content
                    );
                    if (this.adds(item)) {
                      if (!this.deletes(item)) {
                        const curVal = currentAttributes.get(key) ?? null;
                        if (!equalAttrs(curVal, value)) {
                          if (action === "retain") {
                            addOp();
                          }
                          if (equalAttrs(value, oldAttributes.get(key) ?? null)) {
                            delete attributes[key];
                          } else {
                            attributes[key] = value;
                          }
                        } else if (value !== null) {
                          item.delete(transaction);
                        }
                      }
                    } else if (this.deletes(item)) {
                      oldAttributes.set(key, value);
                      const curVal = currentAttributes.get(key) ?? null;
                      if (!equalAttrs(curVal, value)) {
                        if (action === "retain") {
                          addOp();
                        }
                        attributes[key] = curVal;
                      }
                    } else if (!item.deleted) {
                      oldAttributes.set(key, value);
                      const attr = attributes[key];
                      if (attr !== void 0) {
                        if (!equalAttrs(attr, value)) {
                          if (action === "retain") {
                            addOp();
                          }
                          if (value === null) {
                            delete attributes[key];
                          } else {
                            attributes[key] = value;
                          }
                        } else if (attr !== null) {
                          item.delete(transaction);
                        }
                      }
                    }
                    if (!item.deleted) {
                      if (action === "insert") {
                        addOp();
                      }
                      updateCurrentAttributes(
                        currentAttributes,
                        /** @type {ContentFormat} */
                        item.content
                      );
                    }
                    break;
                  }
                }
                item = item.right;
              }
              addOp();
              while (delta.length > 0) {
                const lastOp = delta[delta.length - 1];
                if (lastOp.retain !== void 0 && lastOp.attributes === void 0) {
                  delta.pop();
                } else {
                  break;
                }
              }
            });
            this._delta = delta;
          }
          return (
            /** @type {any} */
            this._delta
          );
        }
      };
      YText = class _YText extends AbstractType {
        /**
         * @param {String} [string] The initial value of the YText.
         */
        constructor(string) {
          super();
          this._pending = string !== void 0 ? [() => this.insert(0, string)] : [];
          this._searchMarker = [];
          this._hasFormatting = false;
        }
        /**
         * Number of characters of this text type.
         *
         * @type {number}
         */
        get length() {
          this.doc ?? warnPrematureAccess();
          return this._length;
        }
        /**
         * @param {Doc} y
         * @param {Item} item
         */
        _integrate(y, item) {
          super._integrate(y, item);
          try {
            this._pending.forEach((f) => f());
          } catch (e) {
            console.error(e);
          }
          this._pending = null;
        }
        _copy() {
          return new _YText();
        }
        /**
         * Makes a copy of this data type that can be included somewhere else.
         *
         * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
         *
         * @return {YText}
         */
        clone() {
          const text2 = new _YText();
          text2.applyDelta(this.toDelta());
          return text2;
        }
        /**
         * Creates YTextEvent and calls observers.
         *
         * @param {Transaction} transaction
         * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
         */
        _callObserver(transaction, parentSubs) {
          super._callObserver(transaction, parentSubs);
          const event = new YTextEvent(this, transaction, parentSubs);
          callTypeObservers(this, transaction, event);
          if (!transaction.local && this._hasFormatting) {
            transaction._needFormattingCleanup = true;
          }
        }
        /**
         * Returns the unformatted string representation of this YText type.
         *
         * @public
         */
        toString() {
          this.doc ?? warnPrematureAccess();
          let str = "";
          let n = this._start;
          while (n !== null) {
            if (!n.deleted && n.countable && n.content.constructor === ContentString) {
              str += /** @type {ContentString} */
              n.content.str;
            }
            n = n.right;
          }
          return str;
        }
        /**
         * Returns the unformatted string representation of this YText type.
         *
         * @return {string}
         * @public
         */
        toJSON() {
          return this.toString();
        }
        /**
         * Apply a {@link Delta} on this shared YText type.
         *
         * @param {Array<any>} delta The changes to apply on this element.
         * @param {object}  opts
         * @param {boolean} [opts.sanitize] Sanitize input delta. Removes ending newlines if set to true.
         *
         *
         * @public
         */
        applyDelta(delta, { sanitize: sanitize2 = true } = {}) {
          if (this.doc !== null) {
            transact(this.doc, (transaction) => {
              const currPos = new ItemTextListPosition(null, this._start, 0, /* @__PURE__ */ new Map());
              for (let i = 0; i < delta.length; i++) {
                const op = delta[i];
                if (op.insert !== void 0) {
                  const ins = !sanitize2 && typeof op.insert === "string" && i === delta.length - 1 && currPos.right === null && op.insert.slice(-1) === "\n" ? op.insert.slice(0, -1) : op.insert;
                  if (typeof ins !== "string" || ins.length > 0) {
                    insertText(transaction, this, currPos, ins, op.attributes || {});
                  }
                } else if (op.retain !== void 0) {
                  formatText(transaction, this, currPos, op.retain, op.attributes || {});
                } else if (op.delete !== void 0) {
                  deleteText(transaction, currPos, op.delete);
                }
              }
            });
          } else {
            this._pending.push(() => this.applyDelta(delta));
          }
        }
        /**
         * Returns the Delta representation of this YText type.
         *
         * @param {Snapshot} [snapshot]
         * @param {Snapshot} [prevSnapshot]
         * @param {function('removed' | 'added', ID):any} [computeYChange]
         * @return {any} The Delta representation of this type.
         *
         * @public
         */
        toDelta(snapshot, prevSnapshot, computeYChange) {
          this.doc ?? warnPrematureAccess();
          const ops = [];
          const currentAttributes = /* @__PURE__ */ new Map();
          const doc2 = (
            /** @type {Doc} */
            this.doc
          );
          let str = "";
          let n = this._start;
          function packStr() {
            if (str.length > 0) {
              const attributes = {};
              let addAttributes = false;
              currentAttributes.forEach((value, key) => {
                addAttributes = true;
                attributes[key] = value;
              });
              const op = { insert: str };
              if (addAttributes) {
                op.attributes = attributes;
              }
              ops.push(op);
              str = "";
            }
          }
          const computeDelta = () => {
            while (n !== null) {
              if (isVisible(n, snapshot) || prevSnapshot !== void 0 && isVisible(n, prevSnapshot)) {
                switch (n.content.constructor) {
                  case ContentString: {
                    const cur = currentAttributes.get("ychange");
                    if (snapshot !== void 0 && !isVisible(n, snapshot)) {
                      if (cur === void 0 || cur.user !== n.id.client || cur.type !== "removed") {
                        packStr();
                        currentAttributes.set("ychange", computeYChange ? computeYChange("removed", n.id) : { type: "removed" });
                      }
                    } else if (prevSnapshot !== void 0 && !isVisible(n, prevSnapshot)) {
                      if (cur === void 0 || cur.user !== n.id.client || cur.type !== "added") {
                        packStr();
                        currentAttributes.set("ychange", computeYChange ? computeYChange("added", n.id) : { type: "added" });
                      }
                    } else if (cur !== void 0) {
                      packStr();
                      currentAttributes.delete("ychange");
                    }
                    str += /** @type {ContentString} */
                    n.content.str;
                    break;
                  }
                  case ContentType:
                  case ContentEmbed: {
                    packStr();
                    const op = {
                      insert: n.content.getContent()[0]
                    };
                    if (currentAttributes.size > 0) {
                      const attrs = (
                        /** @type {Object<string,any>} */
                        {}
                      );
                      op.attributes = attrs;
                      currentAttributes.forEach((value, key) => {
                        attrs[key] = value;
                      });
                    }
                    ops.push(op);
                    break;
                  }
                  case ContentFormat:
                    if (isVisible(n, snapshot)) {
                      packStr();
                      updateCurrentAttributes(
                        currentAttributes,
                        /** @type {ContentFormat} */
                        n.content
                      );
                    }
                    break;
                }
              }
              n = n.right;
            }
            packStr();
          };
          if (snapshot || prevSnapshot) {
            transact(doc2, (transaction) => {
              if (snapshot) {
                splitSnapshotAffectedStructs(transaction, snapshot);
              }
              if (prevSnapshot) {
                splitSnapshotAffectedStructs(transaction, prevSnapshot);
              }
              computeDelta();
            }, "cleanup");
          } else {
            computeDelta();
          }
          return ops;
        }
        /**
         * Insert text at a given index.
         *
         * @param {number} index The index at which to start inserting.
         * @param {String} text The text to insert at the specified position.
         * @param {TextAttributes} [attributes] Optionally define some formatting
         *                                    information to apply on the inserted
         *                                    Text.
         * @public
         */
        insert(index, text2, attributes) {
          if (text2.length <= 0) {
            return;
          }
          const y = this.doc;
          if (y !== null) {
            transact(y, (transaction) => {
              const pos = findPosition(transaction, this, index, !attributes);
              if (!attributes) {
                attributes = {};
                pos.currentAttributes.forEach((v, k) => {
                  attributes[k] = v;
                });
              }
              insertText(transaction, this, pos, text2, attributes);
            });
          } else {
            this._pending.push(() => this.insert(index, text2, attributes));
          }
        }
        /**
         * Inserts an embed at a index.
         *
         * @param {number} index The index to insert the embed at.
         * @param {Object | AbstractType<any>} embed The Object that represents the embed.
         * @param {TextAttributes} [attributes] Attribute information to apply on the
         *                                    embed
         *
         * @public
         */
        insertEmbed(index, embed, attributes) {
          const y = this.doc;
          if (y !== null) {
            transact(y, (transaction) => {
              const pos = findPosition(transaction, this, index, !attributes);
              insertText(transaction, this, pos, embed, attributes || {});
            });
          } else {
            this._pending.push(() => this.insertEmbed(index, embed, attributes || {}));
          }
        }
        /**
         * Deletes text starting from an index.
         *
         * @param {number} index Index at which to start deleting.
         * @param {number} length The number of characters to remove. Defaults to 1.
         *
         * @public
         */
        delete(index, length2) {
          if (length2 === 0) {
            return;
          }
          const y = this.doc;
          if (y !== null) {
            transact(y, (transaction) => {
              deleteText(transaction, findPosition(transaction, this, index, true), length2);
            });
          } else {
            this._pending.push(() => this.delete(index, length2));
          }
        }
        /**
         * Assigns properties to a range of text.
         *
         * @param {number} index The position where to start formatting.
         * @param {number} length The amount of characters to assign properties to.
         * @param {TextAttributes} attributes Attribute information to apply on the
         *                                    text.
         *
         * @public
         */
        format(index, length2, attributes) {
          if (length2 === 0) {
            return;
          }
          const y = this.doc;
          if (y !== null) {
            transact(y, (transaction) => {
              const pos = findPosition(transaction, this, index, false);
              if (pos.right === null) {
                return;
              }
              formatText(transaction, this, pos, length2, attributes);
            });
          } else {
            this._pending.push(() => this.format(index, length2, attributes));
          }
        }
        /**
         * Removes an attribute.
         *
         * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
         *
         * @param {String} attributeName The attribute name that is to be removed.
         *
         * @public
         */
        removeAttribute(attributeName) {
          if (this.doc !== null) {
            transact(this.doc, (transaction) => {
              typeMapDelete(transaction, this, attributeName);
            });
          } else {
            this._pending.push(() => this.removeAttribute(attributeName));
          }
        }
        /**
         * Sets or updates an attribute.
         *
         * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
         *
         * @param {String} attributeName The attribute name that is to be set.
         * @param {any} attributeValue The attribute value that is to be set.
         *
         * @public
         */
        setAttribute(attributeName, attributeValue) {
          if (this.doc !== null) {
            transact(this.doc, (transaction) => {
              typeMapSet(transaction, this, attributeName, attributeValue);
            });
          } else {
            this._pending.push(() => this.setAttribute(attributeName, attributeValue));
          }
        }
        /**
         * Returns an attribute value that belongs to the attribute name.
         *
         * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
         *
         * @param {String} attributeName The attribute name that identifies the
         *                               queried value.
         * @return {any} The queried attribute value.
         *
         * @public
         */
        getAttribute(attributeName) {
          return (
            /** @type {any} */
            typeMapGet(this, attributeName)
          );
        }
        /**
         * Returns all attribute name/value pairs in a JSON Object.
         *
         * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
         *
         * @return {Object<string, any>} A JSON Object that describes the attributes.
         *
         * @public
         */
        getAttributes() {
          return typeMapGetAll(this);
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         */
        _write(encoder) {
          encoder.writeTypeRef(YTextRefID);
        }
      };
      readYText = (_decoder) => new YText();
      YXmlTreeWalker = class {
        /**
         * @param {YXmlFragment | YXmlElement} root
         * @param {function(AbstractType<any>):boolean} [f]
         */
        constructor(root2, f = () => true) {
          this._filter = f;
          this._root = root2;
          this._currentNode = /** @type {Item} */
          root2._start;
          this._firstCall = true;
          root2.doc ?? warnPrematureAccess();
        }
        [Symbol.iterator]() {
          return this;
        }
        /**
         * Get the next node.
         *
         * @return {IteratorResult<YXmlElement|YXmlText|YXmlHook>} The next node.
         *
         * @public
         */
        next() {
          let n = this._currentNode;
          let type = n && n.content && /** @type {any} */
          n.content.type;
          if (n !== null && (!this._firstCall || n.deleted || !this._filter(type))) {
            do {
              type = /** @type {any} */
              n.content.type;
              if (!n.deleted && (type.constructor === YXmlElement || type.constructor === YXmlFragment) && type._start !== null) {
                n = type._start;
              } else {
                while (n !== null) {
                  const nxt = n.next;
                  if (nxt !== null) {
                    n = nxt;
                    break;
                  } else if (n.parent === this._root) {
                    n = null;
                  } else {
                    n = /** @type {AbstractType<any>} */
                    n.parent._item;
                  }
                }
              }
            } while (n !== null && (n.deleted || !this._filter(
              /** @type {ContentType} */
              n.content.type
            )));
          }
          this._firstCall = false;
          if (n === null) {
            return { value: void 0, done: true };
          }
          this._currentNode = n;
          return { value: (
            /** @type {any} */
            n.content.type
          ), done: false };
        }
      };
      YXmlFragment = class _YXmlFragment extends AbstractType {
        constructor() {
          super();
          this._prelimContent = [];
        }
        /**
         * @type {YXmlElement|YXmlText|null}
         */
        get firstChild() {
          const first = this._first;
          return first ? first.content.getContent()[0] : null;
        }
        /**
         * Integrate this type into the Yjs instance.
         *
         * * Save this struct in the os
         * * This type is sent to other client
         * * Observer functions are fired
         *
         * @param {Doc} y The Yjs instance
         * @param {Item} item
         */
        _integrate(y, item) {
          super._integrate(y, item);
          this.insert(
            0,
            /** @type {Array<any>} */
            this._prelimContent
          );
          this._prelimContent = null;
        }
        _copy() {
          return new _YXmlFragment();
        }
        /**
         * Makes a copy of this data type that can be included somewhere else.
         *
         * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
         *
         * @return {YXmlFragment}
         */
        clone() {
          const el = new _YXmlFragment();
          el.insert(0, this.toArray().map((item) => item instanceof AbstractType ? item.clone() : item));
          return el;
        }
        get length() {
          this.doc ?? warnPrematureAccess();
          return this._prelimContent === null ? this._length : this._prelimContent.length;
        }
        /**
         * Create a subtree of childNodes.
         *
         * @example
         * const walker = elem.createTreeWalker(dom => dom.nodeName === 'div')
         * for (let node in walker) {
         *   // `node` is a div node
         *   nop(node)
         * }
         *
         * @param {function(AbstractType<any>):boolean} filter Function that is called on each child element and
         *                          returns a Boolean indicating whether the child
         *                          is to be included in the subtree.
         * @return {YXmlTreeWalker} A subtree and a position within it.
         *
         * @public
         */
        createTreeWalker(filter) {
          return new YXmlTreeWalker(this, filter);
        }
        /**
         * Returns the first YXmlElement that matches the query.
         * Similar to DOM's {@link querySelector}.
         *
         * Query support:
         *   - tagname
         * TODO:
         *   - id
         *   - attribute
         *
         * @param {CSS_Selector} query The query on the children.
         * @return {YXmlElement|YXmlText|YXmlHook|null} The first element that matches the query or null.
         *
         * @public
         */
        querySelector(query) {
          query = query.toUpperCase();
          const iterator = new YXmlTreeWalker(this, (element2) => element2.nodeName && element2.nodeName.toUpperCase() === query);
          const next = iterator.next();
          if (next.done) {
            return null;
          } else {
            return next.value;
          }
        }
        /**
         * Returns all YXmlElements that match the query.
         * Similar to Dom's {@link querySelectorAll}.
         *
         * @todo Does not yet support all queries. Currently only query by tagName.
         *
         * @param {CSS_Selector} query The query on the children
         * @return {Array<YXmlElement|YXmlText|YXmlHook|null>} The elements that match this query.
         *
         * @public
         */
        querySelectorAll(query) {
          query = query.toUpperCase();
          return from(new YXmlTreeWalker(this, (element2) => element2.nodeName && element2.nodeName.toUpperCase() === query));
        }
        /**
         * Creates YXmlEvent and calls observers.
         *
         * @param {Transaction} transaction
         * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
         */
        _callObserver(transaction, parentSubs) {
          callTypeObservers(this, transaction, new YXmlEvent(this, parentSubs, transaction));
        }
        /**
         * Get the string representation of all the children of this YXmlFragment.
         *
         * @return {string} The string representation of all children.
         */
        toString() {
          return typeListMap(this, (xml) => xml.toString()).join("");
        }
        /**
         * @return {string}
         */
        toJSON() {
          return this.toString();
        }
        /**
         * Creates a Dom Element that mirrors this YXmlElement.
         *
         * @param {Document} [_document=document] The document object (you must define
         *                                        this when calling this method in
         *                                        nodejs)
         * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
         *                                             are presented in the DOM
         * @param {any} [binding] You should not set this property. This is
         *                               used if DomBinding wants to create a
         *                               association to the created DOM type.
         * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
         *
         * @public
         */
        toDOM(_document = document, hooks = {}, binding) {
          const fragment = _document.createDocumentFragment();
          if (binding !== void 0) {
            binding._createAssociation(fragment, this);
          }
          typeListForEach(this, (xmlType) => {
            fragment.insertBefore(xmlType.toDOM(_document, hooks, binding), null);
          });
          return fragment;
        }
        /**
         * Inserts new content at an index.
         *
         * @example
         *  // Insert character 'a' at position 0
         *  xml.insert(0, [new Y.XmlText('text')])
         *
         * @param {number} index The index to insert content at
         * @param {Array<YXmlElement|YXmlText>} content The array of content
         */
        insert(index, content) {
          if (this.doc !== null) {
            transact(this.doc, (transaction) => {
              typeListInsertGenerics(transaction, this, index, content);
            });
          } else {
            this._prelimContent.splice(index, 0, ...content);
          }
        }
        /**
         * Inserts new content at an index.
         *
         * @example
         *  // Insert character 'a' at position 0
         *  xml.insert(0, [new Y.XmlText('text')])
         *
         * @param {null|Item|YXmlElement|YXmlText} ref The index to insert content at
         * @param {Array<YXmlElement|YXmlText>} content The array of content
         */
        insertAfter(ref, content) {
          if (this.doc !== null) {
            transact(this.doc, (transaction) => {
              const refItem = ref && ref instanceof AbstractType ? ref._item : ref;
              typeListInsertGenericsAfter(transaction, this, refItem, content);
            });
          } else {
            const pc = (
              /** @type {Array<any>} */
              this._prelimContent
            );
            const index = ref === null ? 0 : pc.findIndex((el) => el === ref) + 1;
            if (index === 0 && ref !== null) {
              throw create3("Reference item not found");
            }
            pc.splice(index, 0, ...content);
          }
        }
        /**
         * Deletes elements starting from an index.
         *
         * @param {number} index Index at which to start deleting elements
         * @param {number} [length=1] The number of elements to remove. Defaults to 1.
         */
        delete(index, length2 = 1) {
          if (this.doc !== null) {
            transact(this.doc, (transaction) => {
              typeListDelete(transaction, this, index, length2);
            });
          } else {
            this._prelimContent.splice(index, length2);
          }
        }
        /**
         * Transforms this YArray to a JavaScript Array.
         *
         * @return {Array<YXmlElement|YXmlText|YXmlHook>}
         */
        toArray() {
          return typeListToArray(this);
        }
        /**
         * Appends content to this YArray.
         *
         * @param {Array<YXmlElement|YXmlText>} content Array of content to append.
         */
        push(content) {
          this.insert(this.length, content);
        }
        /**
         * Prepends content to this YArray.
         *
         * @param {Array<YXmlElement|YXmlText>} content Array of content to prepend.
         */
        unshift(content) {
          this.insert(0, content);
        }
        /**
         * Returns the i-th element from a YArray.
         *
         * @param {number} index The index of the element to return from the YArray
         * @return {YXmlElement|YXmlText}
         */
        get(index) {
          return typeListGet(this, index);
        }
        /**
         * Returns a portion of this YXmlFragment into a JavaScript Array selected
         * from start to end (end not included).
         *
         * @param {number} [start]
         * @param {number} [end]
         * @return {Array<YXmlElement|YXmlText>}
         */
        slice(start = 0, end = this.length) {
          return typeListSlice(this, start, end);
        }
        /**
         * Executes a provided function on once on every child element.
         *
         * @param {function(YXmlElement|YXmlText,number, typeof self):void} f A function to execute on every element of this YArray.
         */
        forEach(f) {
          typeListForEach(this, f);
        }
        /**
         * Transform the properties of this type to binary and write it to an
         * BinaryEncoder.
         *
         * This is called when this Item is sent to a remote peer.
         *
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
         */
        _write(encoder) {
          encoder.writeTypeRef(YXmlFragmentRefID);
        }
      };
      readYXmlFragment = (_decoder) => new YXmlFragment();
      YXmlElement = class _YXmlElement extends YXmlFragment {
        constructor(nodeName = "UNDEFINED") {
          super();
          this.nodeName = nodeName;
          this._prelimAttrs = /* @__PURE__ */ new Map();
        }
        /**
         * @type {YXmlElement|YXmlText|null}
         */
        get nextSibling() {
          const n = this._item ? this._item.next : null;
          return n ? (
            /** @type {YXmlElement|YXmlText} */
            /** @type {ContentType} */
            n.content.type
          ) : null;
        }
        /**
         * @type {YXmlElement|YXmlText|null}
         */
        get prevSibling() {
          const n = this._item ? this._item.prev : null;
          return n ? (
            /** @type {YXmlElement|YXmlText} */
            /** @type {ContentType} */
            n.content.type
          ) : null;
        }
        /**
         * Integrate this type into the Yjs instance.
         *
         * * Save this struct in the os
         * * This type is sent to other client
         * * Observer functions are fired
         *
         * @param {Doc} y The Yjs instance
         * @param {Item} item
         */
        _integrate(y, item) {
          super._integrate(y, item);
          /** @type {Map<string, any>} */
          this._prelimAttrs.forEach((value, key) => {
            this.setAttribute(key, value);
          });
          this._prelimAttrs = null;
        }
        /**
         * Creates an Item with the same effect as this Item (without position effect)
         *
         * @return {YXmlElement}
         */
        _copy() {
          return new _YXmlElement(this.nodeName);
        }
        /**
         * Makes a copy of this data type that can be included somewhere else.
         *
         * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
         *
         * @return {YXmlElement<KV>}
         */
        clone() {
          const el = new _YXmlElement(this.nodeName);
          const attrs = this.getAttributes();
          forEach(attrs, (value, key) => {
            el.setAttribute(
              key,
              /** @type {any} */
              value
            );
          });
          el.insert(0, this.toArray().map((v) => v instanceof AbstractType ? v.clone() : v));
          return el;
        }
        /**
         * Returns the XML serialization of this YXmlElement.
         * The attributes are ordered by attribute-name, so you can easily use this
         * method to compare YXmlElements
         *
         * @return {string} The string representation of this type.
         *
         * @public
         */
        toString() {
          const attrs = this.getAttributes();
          const stringBuilder = [];
          const keys3 = [];
          for (const key in attrs) {
            keys3.push(key);
          }
          keys3.sort();
          const keysLen = keys3.length;
          for (let i = 0; i < keysLen; i++) {
            const key = keys3[i];
            stringBuilder.push(key + '="' + attrs[key] + '"');
          }
          const nodeName = this.nodeName.toLocaleLowerCase();
          const attrsString = stringBuilder.length > 0 ? " " + stringBuilder.join(" ") : "";
          return `<${nodeName}${attrsString}>${super.toString()}</${nodeName}>`;
        }
        /**
         * Removes an attribute from this YXmlElement.
         *
         * @param {string} attributeName The attribute name that is to be removed.
         *
         * @public
         */
        removeAttribute(attributeName) {
          if (this.doc !== null) {
            transact(this.doc, (transaction) => {
              typeMapDelete(transaction, this, attributeName);
            });
          } else {
            this._prelimAttrs.delete(attributeName);
          }
        }
        /**
         * Sets or updates an attribute.
         *
         * @template {keyof KV & string} KEY
         *
         * @param {KEY} attributeName The attribute name that is to be set.
         * @param {KV[KEY]} attributeValue The attribute value that is to be set.
         *
         * @public
         */
        setAttribute(attributeName, attributeValue) {
          if (this.doc !== null) {
            transact(this.doc, (transaction) => {
              typeMapSet(transaction, this, attributeName, attributeValue);
            });
          } else {
            this._prelimAttrs.set(attributeName, attributeValue);
          }
        }
        /**
         * Returns an attribute value that belongs to the attribute name.
         *
         * @template {keyof KV & string} KEY
         *
         * @param {KEY} attributeName The attribute name that identifies the
         *                               queried value.
         * @return {KV[KEY]|undefined} The queried attribute value.
         *
         * @public
         */
        getAttribute(attributeName) {
          return (
            /** @type {any} */
            typeMapGet(this, attributeName)
          );
        }
        /**
         * Returns whether an attribute exists
         *
         * @param {string} attributeName The attribute name to check for existence.
         * @return {boolean} whether the attribute exists.
         *
         * @public
         */
        hasAttribute(attributeName) {
          return (
            /** @type {any} */
            typeMapHas(this, attributeName)
          );
        }
        /**
         * Returns all attribute name/value pairs in a JSON Object.
         *
         * @param {Snapshot} [snapshot]
         * @return {{ [Key in Extract<keyof KV,string>]?: KV[Key]}} A JSON Object that describes the attributes.
         *
         * @public
         */
        getAttributes(snapshot) {
          return (
            /** @type {any} */
            snapshot ? typeMapGetAllSnapshot(this, snapshot) : typeMapGetAll(this)
          );
        }
        /**
         * Creates a Dom Element that mirrors this YXmlElement.
         *
         * @param {Document} [_document=document] The document object (you must define
         *                                        this when calling this method in
         *                                        nodejs)
         * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
         *                                             are presented in the DOM
         * @param {any} [binding] You should not set this property. This is
         *                               used if DomBinding wants to create a
         *                               association to the created DOM type.
         * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
         *
         * @public
         */
        toDOM(_document = document, hooks = {}, binding) {
          const dom = _document.createElement(this.nodeName);
          const attrs = this.getAttributes();
          for (const key in attrs) {
            const value = attrs[key];
            if (typeof value === "string") {
              dom.setAttribute(key, value);
            }
          }
          typeListForEach(this, (yxml) => {
            dom.appendChild(yxml.toDOM(_document, hooks, binding));
          });
          if (binding !== void 0) {
            binding._createAssociation(dom, this);
          }
          return dom;
        }
        /**
         * Transform the properties of this type to binary and write it to an
         * BinaryEncoder.
         *
         * This is called when this Item is sent to a remote peer.
         *
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
         */
        _write(encoder) {
          encoder.writeTypeRef(YXmlElementRefID);
          encoder.writeKey(this.nodeName);
        }
      };
      readYXmlElement = (decoder) => new YXmlElement(decoder.readKey());
      YXmlEvent = class extends YEvent {
        /**
         * @param {YXmlElement|YXmlText|YXmlFragment} target The target on which the event is created.
         * @param {Set<string|null>} subs The set of changed attributes. `null` is included if the
         *                   child list changed.
         * @param {Transaction} transaction The transaction instance with which the
         *                                  change was created.
         */
        constructor(target, subs, transaction) {
          super(target, transaction);
          this.childListChanged = false;
          this.attributesChanged = /* @__PURE__ */ new Set();
          subs.forEach((sub) => {
            if (sub === null) {
              this.childListChanged = true;
            } else {
              this.attributesChanged.add(sub);
            }
          });
        }
      };
      YXmlHook = class _YXmlHook extends YMap {
        /**
         * @param {string} hookName nodeName of the Dom Node.
         */
        constructor(hookName) {
          super();
          this.hookName = hookName;
        }
        /**
         * Creates an Item with the same effect as this Item (without position effect)
         */
        _copy() {
          return new _YXmlHook(this.hookName);
        }
        /**
         * Makes a copy of this data type that can be included somewhere else.
         *
         * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
         *
         * @return {YXmlHook}
         */
        clone() {
          const el = new _YXmlHook(this.hookName);
          this.forEach((value, key) => {
            el.set(key, value);
          });
          return el;
        }
        /**
         * Creates a Dom Element that mirrors this YXmlElement.
         *
         * @param {Document} [_document=document] The document object (you must define
         *                                        this when calling this method in
         *                                        nodejs)
         * @param {Object.<string, any>} [hooks] Optional property to customize how hooks
         *                                             are presented in the DOM
         * @param {any} [binding] You should not set this property. This is
         *                               used if DomBinding wants to create a
         *                               association to the created DOM type
         * @return {Element} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
         *
         * @public
         */
        toDOM(_document = document, hooks = {}, binding) {
          const hook = hooks[this.hookName];
          let dom;
          if (hook !== void 0) {
            dom = hook.createDom(this);
          } else {
            dom = document.createElement(this.hookName);
          }
          dom.setAttribute("data-yjs-hook", this.hookName);
          if (binding !== void 0) {
            binding._createAssociation(dom, this);
          }
          return dom;
        }
        /**
         * Transform the properties of this type to binary and write it to an
         * BinaryEncoder.
         *
         * This is called when this Item is sent to a remote peer.
         *
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
         */
        _write(encoder) {
          encoder.writeTypeRef(YXmlHookRefID);
          encoder.writeKey(this.hookName);
        }
      };
      readYXmlHook = (decoder) => new YXmlHook(decoder.readKey());
      YXmlText = class _YXmlText extends YText {
        /**
         * @type {YXmlElement|YXmlText|null}
         */
        get nextSibling() {
          const n = this._item ? this._item.next : null;
          return n ? (
            /** @type {YXmlElement|YXmlText} */
            /** @type {ContentType} */
            n.content.type
          ) : null;
        }
        /**
         * @type {YXmlElement|YXmlText|null}
         */
        get prevSibling() {
          const n = this._item ? this._item.prev : null;
          return n ? (
            /** @type {YXmlElement|YXmlText} */
            /** @type {ContentType} */
            n.content.type
          ) : null;
        }
        _copy() {
          return new _YXmlText();
        }
        /**
         * Makes a copy of this data type that can be included somewhere else.
         *
         * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
         *
         * @return {YXmlText}
         */
        clone() {
          const text2 = new _YXmlText();
          text2.applyDelta(this.toDelta());
          return text2;
        }
        /**
         * Creates a Dom Element that mirrors this YXmlText.
         *
         * @param {Document} [_document=document] The document object (you must define
         *                                        this when calling this method in
         *                                        nodejs)
         * @param {Object<string, any>} [hooks] Optional property to customize how hooks
         *                                             are presented in the DOM
         * @param {any} [binding] You should not set this property. This is
         *                               used if DomBinding wants to create a
         *                               association to the created DOM type.
         * @return {Text} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
         *
         * @public
         */
        toDOM(_document = document, hooks, binding) {
          const dom = _document.createTextNode(this.toString());
          if (binding !== void 0) {
            binding._createAssociation(dom, this);
          }
          return dom;
        }
        toString() {
          return this.toDelta().map((delta) => {
            const nestedNodes = [];
            for (const nodeName in delta.attributes) {
              const attrs = [];
              for (const key in delta.attributes[nodeName]) {
                attrs.push({ key, value: delta.attributes[nodeName][key] });
              }
              attrs.sort((a, b) => a.key < b.key ? -1 : 1);
              nestedNodes.push({ nodeName, attrs });
            }
            nestedNodes.sort((a, b) => a.nodeName < b.nodeName ? -1 : 1);
            let str = "";
            for (let i = 0; i < nestedNodes.length; i++) {
              const node = nestedNodes[i];
              str += `<${node.nodeName}`;
              for (let j = 0; j < node.attrs.length; j++) {
                const attr = node.attrs[j];
                str += ` ${attr.key}="${attr.value}"`;
              }
              str += ">";
            }
            str += delta.insert;
            for (let i = nestedNodes.length - 1; i >= 0; i--) {
              str += `</${nestedNodes[i].nodeName}>`;
            }
            return str;
          }).join("");
        }
        /**
         * @return {string}
         */
        toJSON() {
          return this.toString();
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         */
        _write(encoder) {
          encoder.writeTypeRef(YXmlTextRefID);
        }
      };
      readYXmlText = (decoder) => new YXmlText();
      AbstractStruct = class {
        /**
         * @param {ID} id
         * @param {number} length
         */
        constructor(id2, length2) {
          this.id = id2;
          this.length = length2;
        }
        /**
         * @type {boolean}
         */
        get deleted() {
          throw methodUnimplemented();
        }
        /**
         * Merge this struct with the item to the right.
         * This method is already assuming that `this.id.clock + this.length === this.id.clock`.
         * Also this method does *not* remove right from StructStore!
         * @param {AbstractStruct} right
         * @return {boolean} whether this merged with right
         */
        mergeWith(right) {
          return false;
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
         * @param {number} offset
         * @param {number} encodingRef
         */
        write(encoder, offset, encodingRef) {
          throw methodUnimplemented();
        }
        /**
         * @param {Transaction} transaction
         * @param {number} offset
         */
        integrate(transaction, offset) {
          throw methodUnimplemented();
        }
      };
      structGCRefNumber = 0;
      GC = class extends AbstractStruct {
        get deleted() {
          return true;
        }
        delete() {
        }
        /**
         * @param {GC} right
         * @return {boolean}
         */
        mergeWith(right) {
          if (this.constructor !== right.constructor) {
            return false;
          }
          this.length += right.length;
          return true;
        }
        /**
         * @param {Transaction} transaction
         * @param {number} offset
         */
        integrate(transaction, offset) {
          if (offset > 0) {
            this.id.clock += offset;
            this.length -= offset;
          }
          addStruct(transaction.doc.store, this);
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         * @param {number} offset
         */
        write(encoder, offset) {
          encoder.writeInfo(structGCRefNumber);
          encoder.writeLen(this.length - offset);
        }
        /**
         * @param {Transaction} transaction
         * @param {StructStore} store
         * @return {null | number}
         */
        getMissing(transaction, store) {
          return null;
        }
      };
      ContentBinary = class _ContentBinary {
        /**
         * @param {Uint8Array} content
         */
        constructor(content) {
          this.content = content;
        }
        /**
         * @return {number}
         */
        getLength() {
          return 1;
        }
        /**
         * @return {Array<any>}
         */
        getContent() {
          return [this.content];
        }
        /**
         * @return {boolean}
         */
        isCountable() {
          return true;
        }
        /**
         * @return {ContentBinary}
         */
        copy() {
          return new _ContentBinary(this.content);
        }
        /**
         * @param {number} offset
         * @return {ContentBinary}
         */
        splice(offset) {
          throw methodUnimplemented();
        }
        /**
         * @param {ContentBinary} right
         * @return {boolean}
         */
        mergeWith(right) {
          return false;
        }
        /**
         * @param {Transaction} transaction
         * @param {Item} item
         */
        integrate(transaction, item) {
        }
        /**
         * @param {Transaction} transaction
         */
        delete(transaction) {
        }
        /**
         * @param {StructStore} store
         */
        gc(store) {
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         * @param {number} offset
         */
        write(encoder, offset) {
          encoder.writeBuf(this.content);
        }
        /**
         * @return {number}
         */
        getRef() {
          return 3;
        }
      };
      readContentBinary = (decoder) => new ContentBinary(decoder.readBuf());
      ContentDeleted = class _ContentDeleted {
        /**
         * @param {number} len
         */
        constructor(len) {
          this.len = len;
        }
        /**
         * @return {number}
         */
        getLength() {
          return this.len;
        }
        /**
         * @return {Array<any>}
         */
        getContent() {
          return [];
        }
        /**
         * @return {boolean}
         */
        isCountable() {
          return false;
        }
        /**
         * @return {ContentDeleted}
         */
        copy() {
          return new _ContentDeleted(this.len);
        }
        /**
         * @param {number} offset
         * @return {ContentDeleted}
         */
        splice(offset) {
          const right = new _ContentDeleted(this.len - offset);
          this.len = offset;
          return right;
        }
        /**
         * @param {ContentDeleted} right
         * @return {boolean}
         */
        mergeWith(right) {
          this.len += right.len;
          return true;
        }
        /**
         * @param {Transaction} transaction
         * @param {Item} item
         */
        integrate(transaction, item) {
          addToDeleteSet(transaction.deleteSet, item.id.client, item.id.clock, this.len);
          item.markDeleted();
        }
        /**
         * @param {Transaction} transaction
         */
        delete(transaction) {
        }
        /**
         * @param {StructStore} store
         */
        gc(store) {
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         * @param {number} offset
         */
        write(encoder, offset) {
          encoder.writeLen(this.len - offset);
        }
        /**
         * @return {number}
         */
        getRef() {
          return 1;
        }
      };
      readContentDeleted = (decoder) => new ContentDeleted(decoder.readLen());
      createDocFromOpts = (guid, opts) => new Doc({ guid, ...opts, shouldLoad: opts.shouldLoad || opts.autoLoad || false });
      ContentDoc = class _ContentDoc {
        /**
         * @param {Doc} doc
         */
        constructor(doc2) {
          if (doc2._item) {
            console.error("This document was already integrated as a sub-document. You should create a second instance instead with the same guid.");
          }
          this.doc = doc2;
          const opts = {};
          this.opts = opts;
          if (!doc2.gc) {
            opts.gc = false;
          }
          if (doc2.autoLoad) {
            opts.autoLoad = true;
          }
          if (doc2.meta !== null) {
            opts.meta = doc2.meta;
          }
        }
        /**
         * @return {number}
         */
        getLength() {
          return 1;
        }
        /**
         * @return {Array<any>}
         */
        getContent() {
          return [this.doc];
        }
        /**
         * @return {boolean}
         */
        isCountable() {
          return true;
        }
        /**
         * @return {ContentDoc}
         */
        copy() {
          return new _ContentDoc(createDocFromOpts(this.doc.guid, this.opts));
        }
        /**
         * @param {number} offset
         * @return {ContentDoc}
         */
        splice(offset) {
          throw methodUnimplemented();
        }
        /**
         * @param {ContentDoc} right
         * @return {boolean}
         */
        mergeWith(right) {
          return false;
        }
        /**
         * @param {Transaction} transaction
         * @param {Item} item
         */
        integrate(transaction, item) {
          this.doc._item = item;
          transaction.subdocsAdded.add(this.doc);
          if (this.doc.shouldLoad) {
            transaction.subdocsLoaded.add(this.doc);
          }
        }
        /**
         * @param {Transaction} transaction
         */
        delete(transaction) {
          if (transaction.subdocsAdded.has(this.doc)) {
            transaction.subdocsAdded.delete(this.doc);
          } else {
            transaction.subdocsRemoved.add(this.doc);
          }
        }
        /**
         * @param {StructStore} store
         */
        gc(store) {
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         * @param {number} offset
         */
        write(encoder, offset) {
          encoder.writeString(this.doc.guid);
          encoder.writeAny(this.opts);
        }
        /**
         * @return {number}
         */
        getRef() {
          return 9;
        }
      };
      readContentDoc = (decoder) => new ContentDoc(createDocFromOpts(decoder.readString(), decoder.readAny()));
      ContentEmbed = class _ContentEmbed {
        /**
         * @param {Object} embed
         */
        constructor(embed) {
          this.embed = embed;
        }
        /**
         * @return {number}
         */
        getLength() {
          return 1;
        }
        /**
         * @return {Array<any>}
         */
        getContent() {
          return [this.embed];
        }
        /**
         * @return {boolean}
         */
        isCountable() {
          return true;
        }
        /**
         * @return {ContentEmbed}
         */
        copy() {
          return new _ContentEmbed(this.embed);
        }
        /**
         * @param {number} offset
         * @return {ContentEmbed}
         */
        splice(offset) {
          throw methodUnimplemented();
        }
        /**
         * @param {ContentEmbed} right
         * @return {boolean}
         */
        mergeWith(right) {
          return false;
        }
        /**
         * @param {Transaction} transaction
         * @param {Item} item
         */
        integrate(transaction, item) {
        }
        /**
         * @param {Transaction} transaction
         */
        delete(transaction) {
        }
        /**
         * @param {StructStore} store
         */
        gc(store) {
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         * @param {number} offset
         */
        write(encoder, offset) {
          encoder.writeJSON(this.embed);
        }
        /**
         * @return {number}
         */
        getRef() {
          return 5;
        }
      };
      readContentEmbed = (decoder) => new ContentEmbed(decoder.readJSON());
      ContentFormat = class _ContentFormat {
        /**
         * @param {string} key
         * @param {Object} value
         */
        constructor(key, value) {
          this.key = key;
          this.value = value;
        }
        /**
         * @return {number}
         */
        getLength() {
          return 1;
        }
        /**
         * @return {Array<any>}
         */
        getContent() {
          return [];
        }
        /**
         * @return {boolean}
         */
        isCountable() {
          return false;
        }
        /**
         * @return {ContentFormat}
         */
        copy() {
          return new _ContentFormat(this.key, this.value);
        }
        /**
         * @param {number} _offset
         * @return {ContentFormat}
         */
        splice(_offset) {
          throw methodUnimplemented();
        }
        /**
         * @param {ContentFormat} _right
         * @return {boolean}
         */
        mergeWith(_right) {
          return false;
        }
        /**
         * @param {Transaction} _transaction
         * @param {Item} item
         */
        integrate(_transaction, item) {
          const p = (
            /** @type {YText} */
            item.parent
          );
          p._searchMarker = null;
          p._hasFormatting = true;
        }
        /**
         * @param {Transaction} transaction
         */
        delete(transaction) {
        }
        /**
         * @param {StructStore} store
         */
        gc(store) {
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         * @param {number} offset
         */
        write(encoder, offset) {
          encoder.writeKey(this.key);
          encoder.writeJSON(this.value);
        }
        /**
         * @return {number}
         */
        getRef() {
          return 6;
        }
      };
      readContentFormat = (decoder) => new ContentFormat(decoder.readKey(), decoder.readJSON());
      ContentJSON = class _ContentJSON {
        /**
         * @param {Array<any>} arr
         */
        constructor(arr) {
          this.arr = arr;
        }
        /**
         * @return {number}
         */
        getLength() {
          return this.arr.length;
        }
        /**
         * @return {Array<any>}
         */
        getContent() {
          return this.arr;
        }
        /**
         * @return {boolean}
         */
        isCountable() {
          return true;
        }
        /**
         * @return {ContentJSON}
         */
        copy() {
          return new _ContentJSON(this.arr);
        }
        /**
         * @param {number} offset
         * @return {ContentJSON}
         */
        splice(offset) {
          const right = new _ContentJSON(this.arr.slice(offset));
          this.arr = this.arr.slice(0, offset);
          return right;
        }
        /**
         * @param {ContentJSON} right
         * @return {boolean}
         */
        mergeWith(right) {
          this.arr = this.arr.concat(right.arr);
          return true;
        }
        /**
         * @param {Transaction} transaction
         * @param {Item} item
         */
        integrate(transaction, item) {
        }
        /**
         * @param {Transaction} transaction
         */
        delete(transaction) {
        }
        /**
         * @param {StructStore} store
         */
        gc(store) {
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         * @param {number} offset
         */
        write(encoder, offset) {
          const len = this.arr.length;
          encoder.writeLen(len - offset);
          for (let i = offset; i < len; i++) {
            const c = this.arr[i];
            encoder.writeString(c === void 0 ? "undefined" : JSON.stringify(c));
          }
        }
        /**
         * @return {number}
         */
        getRef() {
          return 2;
        }
      };
      readContentJSON = (decoder) => {
        const len = decoder.readLen();
        const cs = [];
        for (let i = 0; i < len; i++) {
          const c = decoder.readString();
          if (c === "undefined") {
            cs.push(void 0);
          } else {
            cs.push(JSON.parse(c));
          }
        }
        return new ContentJSON(cs);
      };
      isDevMode = getVariable("node_env") === "development";
      ContentAny = class _ContentAny {
        /**
         * @param {Array<any>} arr
         */
        constructor(arr) {
          this.arr = arr;
          isDevMode && deepFreeze(arr);
        }
        /**
         * @return {number}
         */
        getLength() {
          return this.arr.length;
        }
        /**
         * @return {Array<any>}
         */
        getContent() {
          return this.arr;
        }
        /**
         * @return {boolean}
         */
        isCountable() {
          return true;
        }
        /**
         * @return {ContentAny}
         */
        copy() {
          return new _ContentAny(this.arr);
        }
        /**
         * @param {number} offset
         * @return {ContentAny}
         */
        splice(offset) {
          const right = new _ContentAny(this.arr.slice(offset));
          this.arr = this.arr.slice(0, offset);
          return right;
        }
        /**
         * @param {ContentAny} right
         * @return {boolean}
         */
        mergeWith(right) {
          this.arr = this.arr.concat(right.arr);
          return true;
        }
        /**
         * @param {Transaction} transaction
         * @param {Item} item
         */
        integrate(transaction, item) {
        }
        /**
         * @param {Transaction} transaction
         */
        delete(transaction) {
        }
        /**
         * @param {StructStore} store
         */
        gc(store) {
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         * @param {number} offset
         */
        write(encoder, offset) {
          const len = this.arr.length;
          encoder.writeLen(len - offset);
          for (let i = offset; i < len; i++) {
            const c = this.arr[i];
            encoder.writeAny(c);
          }
        }
        /**
         * @return {number}
         */
        getRef() {
          return 8;
        }
      };
      readContentAny = (decoder) => {
        const len = decoder.readLen();
        const cs = [];
        for (let i = 0; i < len; i++) {
          cs.push(decoder.readAny());
        }
        return new ContentAny(cs);
      };
      ContentString = class _ContentString {
        /**
         * @param {string} str
         */
        constructor(str) {
          this.str = str;
        }
        /**
         * @return {number}
         */
        getLength() {
          return this.str.length;
        }
        /**
         * @return {Array<any>}
         */
        getContent() {
          return this.str.split("");
        }
        /**
         * @return {boolean}
         */
        isCountable() {
          return true;
        }
        /**
         * @return {ContentString}
         */
        copy() {
          return new _ContentString(this.str);
        }
        /**
         * @param {number} offset
         * @return {ContentString}
         */
        splice(offset) {
          const right = new _ContentString(this.str.slice(offset));
          this.str = this.str.slice(0, offset);
          const firstCharCode = this.str.charCodeAt(offset - 1);
          if (firstCharCode >= 55296 && firstCharCode <= 56319) {
            this.str = this.str.slice(0, offset - 1) + "\uFFFD";
            right.str = "\uFFFD" + right.str.slice(1);
          }
          return right;
        }
        /**
         * @param {ContentString} right
         * @return {boolean}
         */
        mergeWith(right) {
          this.str += right.str;
          return true;
        }
        /**
         * @param {Transaction} transaction
         * @param {Item} item
         */
        integrate(transaction, item) {
        }
        /**
         * @param {Transaction} transaction
         */
        delete(transaction) {
        }
        /**
         * @param {StructStore} store
         */
        gc(store) {
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         * @param {number} offset
         */
        write(encoder, offset) {
          encoder.writeString(offset === 0 ? this.str : this.str.slice(offset));
        }
        /**
         * @return {number}
         */
        getRef() {
          return 4;
        }
      };
      readContentString = (decoder) => new ContentString(decoder.readString());
      typeRefs = [
        readYArray,
        readYMap,
        readYText,
        readYXmlElement,
        readYXmlFragment,
        readYXmlHook,
        readYXmlText
      ];
      YArrayRefID = 0;
      YMapRefID = 1;
      YTextRefID = 2;
      YXmlElementRefID = 3;
      YXmlFragmentRefID = 4;
      YXmlHookRefID = 5;
      YXmlTextRefID = 6;
      ContentType = class _ContentType {
        /**
         * @param {AbstractType<any>} type
         */
        constructor(type) {
          this.type = type;
        }
        /**
         * @return {number}
         */
        getLength() {
          return 1;
        }
        /**
         * @return {Array<any>}
         */
        getContent() {
          return [this.type];
        }
        /**
         * @return {boolean}
         */
        isCountable() {
          return true;
        }
        /**
         * @return {ContentType}
         */
        copy() {
          return new _ContentType(this.type._copy());
        }
        /**
         * @param {number} offset
         * @return {ContentType}
         */
        splice(offset) {
          throw methodUnimplemented();
        }
        /**
         * @param {ContentType} right
         * @return {boolean}
         */
        mergeWith(right) {
          return false;
        }
        /**
         * @param {Transaction} transaction
         * @param {Item} item
         */
        integrate(transaction, item) {
          this.type._integrate(transaction.doc, item);
        }
        /**
         * @param {Transaction} transaction
         */
        delete(transaction) {
          let item = this.type._start;
          while (item !== null) {
            if (!item.deleted) {
              item.delete(transaction);
            } else if (item.id.clock < (transaction.beforeState.get(item.id.client) || 0)) {
              transaction._mergeStructs.push(item);
            }
            item = item.right;
          }
          this.type._map.forEach((item2) => {
            if (!item2.deleted) {
              item2.delete(transaction);
            } else if (item2.id.clock < (transaction.beforeState.get(item2.id.client) || 0)) {
              transaction._mergeStructs.push(item2);
            }
          });
          transaction.changed.delete(this.type);
        }
        /**
         * @param {StructStore} store
         */
        gc(store) {
          let item = this.type._start;
          while (item !== null) {
            item.gc(store, true);
            item = item.right;
          }
          this.type._start = null;
          this.type._map.forEach(
            /** @param {Item | null} item */
            (item2) => {
              while (item2 !== null) {
                item2.gc(store, true);
                item2 = item2.left;
              }
            }
          );
          this.type._map = /* @__PURE__ */ new Map();
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         * @param {number} offset
         */
        write(encoder, offset) {
          this.type._write(encoder);
        }
        /**
         * @return {number}
         */
        getRef() {
          return 7;
        }
      };
      readContentType = (decoder) => new ContentType(typeRefs[decoder.readTypeRef()](decoder));
      followRedone = (store, id2) => {
        let nextID = id2;
        let diff = 0;
        let item;
        do {
          if (diff > 0) {
            nextID = createID(nextID.client, nextID.clock + diff);
          }
          item = getItem(store, nextID);
          diff = nextID.clock - item.id.clock;
          nextID = item.redone;
        } while (nextID !== null && item instanceof Item);
        return {
          item,
          diff
        };
      };
      splitItem = (transaction, leftItem, diff) => {
        const { client, clock } = leftItem.id;
        const rightItem = new Item(
          createID(client, clock + diff),
          leftItem,
          createID(client, clock + diff - 1),
          leftItem.right,
          leftItem.rightOrigin,
          leftItem.parent,
          leftItem.parentSub,
          leftItem.content.splice(diff)
        );
        if (leftItem.deleted) {
          rightItem.markDeleted();
        }
        if (leftItem.keep) {
          rightItem.keep = true;
        }
        if (leftItem.redone !== null) {
          rightItem.redone = createID(leftItem.redone.client, leftItem.redone.clock + diff);
        }
        leftItem.right = rightItem;
        if (rightItem.right !== null) {
          rightItem.right.left = rightItem;
        }
        transaction._mergeStructs.push(rightItem);
        if (rightItem.parentSub !== null && rightItem.right === null) {
          rightItem.parent._map.set(rightItem.parentSub, rightItem);
        }
        leftItem.length = diff;
        return rightItem;
      };
      Item = class _Item extends AbstractStruct {
        /**
         * @param {ID} id
         * @param {Item | null} left
         * @param {ID | null} origin
         * @param {Item | null} right
         * @param {ID | null} rightOrigin
         * @param {AbstractType<any>|ID|null} parent Is a type if integrated, is null if it is possible to copy parent from left or right, is ID before integration to search for it.
         * @param {string | null} parentSub
         * @param {AbstractContent} content
         */
        constructor(id2, left, origin, right, rightOrigin, parent, parentSub, content) {
          super(id2, content.getLength());
          this.origin = origin;
          this.left = left;
          this.right = right;
          this.rightOrigin = rightOrigin;
          this.parent = parent;
          this.parentSub = parentSub;
          this.redone = null;
          this.content = content;
          this.info = this.content.isCountable() ? BIT2 : 0;
        }
        /**
         * This is used to mark the item as an indexed fast-search marker
         *
         * @type {boolean}
         */
        set marker(isMarked) {
          if ((this.info & BIT4) > 0 !== isMarked) {
            this.info ^= BIT4;
          }
        }
        get marker() {
          return (this.info & BIT4) > 0;
        }
        /**
         * If true, do not garbage collect this Item.
         */
        get keep() {
          return (this.info & BIT1) > 0;
        }
        set keep(doKeep) {
          if (this.keep !== doKeep) {
            this.info ^= BIT1;
          }
        }
        get countable() {
          return (this.info & BIT2) > 0;
        }
        /**
         * Whether this item was deleted or not.
         * @type {Boolean}
         */
        get deleted() {
          return (this.info & BIT3) > 0;
        }
        set deleted(doDelete) {
          if (this.deleted !== doDelete) {
            this.info ^= BIT3;
          }
        }
        markDeleted() {
          this.info |= BIT3;
        }
        /**
         * Return the creator clientID of the missing op or define missing items and return null.
         *
         * @param {Transaction} transaction
         * @param {StructStore} store
         * @return {null | number}
         */
        getMissing(transaction, store) {
          if (this.origin && this.origin.client !== this.id.client && this.origin.clock >= getState(store, this.origin.client)) {
            return this.origin.client;
          }
          if (this.rightOrigin && this.rightOrigin.client !== this.id.client && this.rightOrigin.clock >= getState(store, this.rightOrigin.client)) {
            return this.rightOrigin.client;
          }
          if (this.parent && this.parent.constructor === ID && this.id.client !== this.parent.client && this.parent.clock >= getState(store, this.parent.client)) {
            return this.parent.client;
          }
          if (this.origin) {
            this.left = getItemCleanEnd(transaction, store, this.origin);
            this.origin = this.left.lastId;
          }
          if (this.rightOrigin) {
            this.right = getItemCleanStart(transaction, this.rightOrigin);
            this.rightOrigin = this.right.id;
          }
          if (this.left && this.left.constructor === GC || this.right && this.right.constructor === GC) {
            this.parent = null;
          } else if (!this.parent) {
            if (this.left && this.left.constructor === _Item) {
              this.parent = this.left.parent;
              this.parentSub = this.left.parentSub;
            } else if (this.right && this.right.constructor === _Item) {
              this.parent = this.right.parent;
              this.parentSub = this.right.parentSub;
            }
          } else if (this.parent.constructor === ID) {
            const parentItem = getItem(store, this.parent);
            if (parentItem.constructor === GC) {
              this.parent = null;
            } else {
              this.parent = /** @type {ContentType} */
              parentItem.content.type;
            }
          }
          return null;
        }
        /**
         * @param {Transaction} transaction
         * @param {number} offset
         */
        integrate(transaction, offset) {
          if (offset > 0) {
            this.id.clock += offset;
            this.left = getItemCleanEnd(transaction, transaction.doc.store, createID(this.id.client, this.id.clock - 1));
            this.origin = this.left.lastId;
            this.content = this.content.splice(offset);
            this.length -= offset;
          }
          if (this.parent) {
            if (!this.left && (!this.right || this.right.left !== null) || this.left && this.left.right !== this.right) {
              let left = this.left;
              let o;
              if (left !== null) {
                o = left.right;
              } else if (this.parentSub !== null) {
                o = /** @type {AbstractType<any>} */
                this.parent._map.get(this.parentSub) || null;
                while (o !== null && o.left !== null) {
                  o = o.left;
                }
              } else {
                o = /** @type {AbstractType<any>} */
                this.parent._start;
              }
              const conflictingItems = /* @__PURE__ */ new Set();
              const itemsBeforeOrigin = /* @__PURE__ */ new Set();
              while (o !== null && o !== this.right) {
                itemsBeforeOrigin.add(o);
                conflictingItems.add(o);
                if (compareIDs(this.origin, o.origin)) {
                  if (o.id.client < this.id.client) {
                    left = o;
                    conflictingItems.clear();
                  } else if (compareIDs(this.rightOrigin, o.rightOrigin)) {
                    break;
                  }
                } else if (o.origin !== null && itemsBeforeOrigin.has(getItem(transaction.doc.store, o.origin))) {
                  if (!conflictingItems.has(getItem(transaction.doc.store, o.origin))) {
                    left = o;
                    conflictingItems.clear();
                  }
                } else {
                  break;
                }
                o = o.right;
              }
              this.left = left;
            }
            if (this.left !== null) {
              const right = this.left.right;
              this.right = right;
              this.left.right = this;
            } else {
              let r;
              if (this.parentSub !== null) {
                r = /** @type {AbstractType<any>} */
                this.parent._map.get(this.parentSub) || null;
                while (r !== null && r.left !== null) {
                  r = r.left;
                }
              } else {
                r = /** @type {AbstractType<any>} */
                this.parent._start;
                this.parent._start = this;
              }
              this.right = r;
            }
            if (this.right !== null) {
              this.right.left = this;
            } else if (this.parentSub !== null) {
              this.parent._map.set(this.parentSub, this);
              if (this.left !== null) {
                this.left.delete(transaction);
              }
            }
            if (this.parentSub === null && this.countable && !this.deleted) {
              this.parent._length += this.length;
            }
            addStruct(transaction.doc.store, this);
            this.content.integrate(transaction, this);
            addChangedTypeToTransaction(
              transaction,
              /** @type {AbstractType<any>} */
              this.parent,
              this.parentSub
            );
            if (
              /** @type {AbstractType<any>} */
              this.parent._item !== null && /** @type {AbstractType<any>} */
              this.parent._item.deleted || this.parentSub !== null && this.right !== null
            ) {
              this.delete(transaction);
            }
          } else {
            new GC(this.id, this.length).integrate(transaction, 0);
          }
        }
        /**
         * Returns the next non-deleted item
         */
        get next() {
          let n = this.right;
          while (n !== null && n.deleted) {
            n = n.right;
          }
          return n;
        }
        /**
         * Returns the previous non-deleted item
         */
        get prev() {
          let n = this.left;
          while (n !== null && n.deleted) {
            n = n.left;
          }
          return n;
        }
        /**
         * Computes the last content address of this Item.
         */
        get lastId() {
          return this.length === 1 ? this.id : createID(this.id.client, this.id.clock + this.length - 1);
        }
        /**
         * Try to merge two items
         *
         * @param {Item} right
         * @return {boolean}
         */
        mergeWith(right) {
          if (this.constructor === right.constructor && compareIDs(right.origin, this.lastId) && this.right === right && compareIDs(this.rightOrigin, right.rightOrigin) && this.id.client === right.id.client && this.id.clock + this.length === right.id.clock && this.deleted === right.deleted && this.redone === null && right.redone === null && this.content.constructor === right.content.constructor && this.content.mergeWith(right.content)) {
            const searchMarker = (
              /** @type {AbstractType<any>} */
              this.parent._searchMarker
            );
            if (searchMarker) {
              searchMarker.forEach((marker) => {
                if (marker.p === right) {
                  marker.p = this;
                  if (!this.deleted && this.countable) {
                    marker.index -= this.length;
                  }
                }
              });
            }
            if (right.keep) {
              this.keep = true;
            }
            this.right = right.right;
            if (this.right !== null) {
              this.right.left = this;
            }
            this.length += right.length;
            return true;
          }
          return false;
        }
        /**
         * Mark this Item as deleted.
         *
         * @param {Transaction} transaction
         */
        delete(transaction) {
          if (!this.deleted) {
            const parent = (
              /** @type {AbstractType<any>} */
              this.parent
            );
            if (this.countable && this.parentSub === null) {
              parent._length -= this.length;
            }
            this.markDeleted();
            addToDeleteSet(transaction.deleteSet, this.id.client, this.id.clock, this.length);
            addChangedTypeToTransaction(transaction, parent, this.parentSub);
            this.content.delete(transaction);
          }
        }
        /**
         * @param {StructStore} store
         * @param {boolean} parentGCd
         */
        gc(store, parentGCd) {
          if (!this.deleted) {
            throw unexpectedCase();
          }
          this.content.gc(store);
          if (parentGCd) {
            replaceStruct(store, this, new GC(this.id, this.length));
          } else {
            this.content = new ContentDeleted(this.length);
          }
        }
        /**
         * Transform the properties of this type to binary and write it to an
         * BinaryEncoder.
         *
         * This is called when this Item is sent to a remote peer.
         *
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
         * @param {number} offset
         */
        write(encoder, offset) {
          const origin = offset > 0 ? createID(this.id.client, this.id.clock + offset - 1) : this.origin;
          const rightOrigin = this.rightOrigin;
          const parentSub = this.parentSub;
          const info = this.content.getRef() & BITS5 | (origin === null ? 0 : BIT8) | // origin is defined
          (rightOrigin === null ? 0 : BIT7) | // right origin is defined
          (parentSub === null ? 0 : BIT6);
          encoder.writeInfo(info);
          if (origin !== null) {
            encoder.writeLeftID(origin);
          }
          if (rightOrigin !== null) {
            encoder.writeRightID(rightOrigin);
          }
          if (origin === null && rightOrigin === null) {
            const parent = (
              /** @type {AbstractType<any>} */
              this.parent
            );
            if (parent._item !== void 0) {
              const parentItem = parent._item;
              if (parentItem === null) {
                const ykey = findRootTypeKey(parent);
                encoder.writeParentInfo(true);
                encoder.writeString(ykey);
              } else {
                encoder.writeParentInfo(false);
                encoder.writeLeftID(parentItem.id);
              }
            } else if (parent.constructor === String) {
              encoder.writeParentInfo(true);
              encoder.writeString(parent);
            } else if (parent.constructor === ID) {
              encoder.writeParentInfo(false);
              encoder.writeLeftID(parent);
            } else {
              unexpectedCase();
            }
            if (parentSub !== null) {
              encoder.writeString(parentSub);
            }
          }
          this.content.write(encoder, offset);
        }
      };
      readItemContent = (decoder, info) => contentRefs[info & BITS5](decoder);
      contentRefs = [
        () => {
          unexpectedCase();
        },
        // GC is not ItemContent
        readContentDeleted,
        // 1
        readContentJSON,
        // 2
        readContentBinary,
        // 3
        readContentString,
        // 4
        readContentEmbed,
        // 5
        readContentFormat,
        // 6
        readContentType,
        // 7
        readContentAny,
        // 8
        readContentDoc,
        // 9
        () => {
          unexpectedCase();
        }
        // 10 - Skip is not ItemContent
      ];
      structSkipRefNumber = 10;
      Skip = class extends AbstractStruct {
        get deleted() {
          return true;
        }
        delete() {
        }
        /**
         * @param {Skip} right
         * @return {boolean}
         */
        mergeWith(right) {
          if (this.constructor !== right.constructor) {
            return false;
          }
          this.length += right.length;
          return true;
        }
        /**
         * @param {Transaction} transaction
         * @param {number} offset
         */
        integrate(transaction, offset) {
          unexpectedCase();
        }
        /**
         * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
         * @param {number} offset
         */
        write(encoder, offset) {
          encoder.writeInfo(structSkipRefNumber);
          writeVarUint(encoder.restEncoder, this.length - offset);
        }
        /**
         * @param {Transaction} transaction
         * @param {StructStore} store
         * @return {null | number}
         */
        getMissing(transaction, store) {
          return null;
        }
      };
      glo = /** @type {any} */
      typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
      importIdentifier = "__ $YJS$ __";
      if (glo[importIdentifier] === true) {
        console.error("Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438");
      }
      glo[importIdentifier] = true;
    }
  });

  // node_modules/lib0/broadcastchannel.js
  var channels, LocalStoragePolyfill, BC, getChannel, subscribe, unsubscribe, publish;
  var init_broadcastchannel = __esm({
    "node_modules/lib0/broadcastchannel.js"() {
      init_map();
      init_set();
      init_buffer();
      init_storage();
      channels = /* @__PURE__ */ new Map();
      LocalStoragePolyfill = class {
        /**
         * @param {string} room
         */
        constructor(room) {
          this.room = room;
          this.onmessage = null;
          this._onChange = (e) => e.key === room && this.onmessage !== null && this.onmessage({ data: fromBase64(e.newValue || "") });
          onChange(this._onChange);
        }
        /**
         * @param {ArrayBuffer} buf
         */
        postMessage(buf) {
          varStorage.setItem(this.room, toBase64(createUint8ArrayFromArrayBuffer(buf)));
        }
        close() {
          offChange(this._onChange);
        }
      };
      BC = typeof BroadcastChannel === "undefined" ? LocalStoragePolyfill : BroadcastChannel;
      getChannel = (room) => setIfUndefined(channels, room, () => {
        const subs = create2();
        const bc = new BC(room);
        bc.onmessage = (e) => subs.forEach((sub) => sub(e.data, "broadcastchannel"));
        return {
          bc,
          subs
        };
      });
      subscribe = (room, f) => {
        getChannel(room).subs.add(f);
        return f;
      };
      unsubscribe = (room, f) => {
        const channel = getChannel(room);
        const unsubscribed = channel.subs.delete(f);
        if (unsubscribed && channel.subs.size === 0) {
          channel.bc.close();
          channels.delete(room);
        }
        return unsubscribed;
      };
      publish = (room, data, origin = null) => {
        const c = getChannel(room);
        c.bc.postMessage(data);
        c.subs.forEach((sub) => sub(data, origin));
      };
    }
  });

  // node_modules/y-protocols/sync.js
  var messageYjsSyncStep1, messageYjsSyncStep2, messageYjsUpdate, writeSyncStep1, writeSyncStep2, readSyncStep1, readSyncStep2, writeUpdate, readUpdate, readSyncMessage;
  var init_sync = __esm({
    "node_modules/y-protocols/sync.js"() {
      init_encoding();
      init_decoding();
      init_yjs();
      messageYjsSyncStep1 = 0;
      messageYjsSyncStep2 = 1;
      messageYjsUpdate = 2;
      writeSyncStep1 = (encoder, doc2) => {
        writeVarUint(encoder, messageYjsSyncStep1);
        const sv = encodeStateVector(doc2);
        writeVarUint8Array(encoder, sv);
      };
      writeSyncStep2 = (encoder, doc2, encodedStateVector) => {
        writeVarUint(encoder, messageYjsSyncStep2);
        writeVarUint8Array(encoder, encodeStateAsUpdate(doc2, encodedStateVector));
      };
      readSyncStep1 = (decoder, encoder, doc2) => writeSyncStep2(encoder, doc2, readVarUint8Array(decoder));
      readSyncStep2 = (decoder, doc2, transactionOrigin, errorHandler) => {
        try {
          applyUpdate(doc2, readVarUint8Array(decoder), transactionOrigin);
        } catch (error) {
          if (errorHandler != null) errorHandler(
            /** @type {Error} */
            error
          );
          console.error("Caught error while handling a Yjs update", error);
        }
      };
      writeUpdate = (encoder, update) => {
        writeVarUint(encoder, messageYjsUpdate);
        writeVarUint8Array(encoder, update);
      };
      readUpdate = readSyncStep2;
      readSyncMessage = (decoder, encoder, doc2, transactionOrigin, errorHandler) => {
        const messageType = readVarUint(decoder);
        switch (messageType) {
          case messageYjsSyncStep1:
            readSyncStep1(decoder, encoder, doc2);
            break;
          case messageYjsSyncStep2:
            readSyncStep2(decoder, doc2, transactionOrigin, errorHandler);
            break;
          case messageYjsUpdate:
            readUpdate(decoder, doc2, transactionOrigin, errorHandler);
            break;
          default:
            throw new Error("Unknown message type");
        }
        return messageType;
      };
    }
  });

  // node_modules/y-protocols/auth.js
  var messagePermissionDenied, readAuthMessage;
  var init_auth = __esm({
    "node_modules/y-protocols/auth.js"() {
      init_decoding();
      messagePermissionDenied = 0;
      readAuthMessage = (decoder, y, permissionDeniedHandler2) => {
        switch (readVarUint(decoder)) {
          case messagePermissionDenied:
            permissionDeniedHandler2(y, readVarString(decoder));
        }
      };
    }
  });

  // node_modules/y-protocols/awareness.js
  var outdatedTimeout, Awareness, removeAwarenessStates, encodeAwarenessUpdate, applyAwarenessUpdate;
  var init_awareness = __esm({
    "node_modules/y-protocols/awareness.js"() {
      init_encoding();
      init_decoding();
      init_time();
      init_math();
      init_observable();
      init_function();
      outdatedTimeout = 3e4;
      Awareness = class extends Observable {
        /**
         * @param {Y.Doc} doc
         */
        constructor(doc2) {
          super();
          this.doc = doc2;
          this.clientID = doc2.clientID;
          this.states = /* @__PURE__ */ new Map();
          this.meta = /* @__PURE__ */ new Map();
          this._checkInterval = /** @type {any} */
          setInterval(() => {
            const now = getUnixTime();
            if (this.getLocalState() !== null && outdatedTimeout / 2 <= now - /** @type {{lastUpdated:number}} */
            this.meta.get(this.clientID).lastUpdated) {
              this.setLocalState(this.getLocalState());
            }
            const remove = [];
            this.meta.forEach((meta, clientid) => {
              if (clientid !== this.clientID && outdatedTimeout <= now - meta.lastUpdated && this.states.has(clientid)) {
                remove.push(clientid);
              }
            });
            if (remove.length > 0) {
              removeAwarenessStates(this, remove, "timeout");
            }
          }, floor(outdatedTimeout / 10));
          doc2.on("destroy", () => {
            this.destroy();
          });
          this.setLocalState({});
        }
        destroy() {
          this.emit("destroy", [this]);
          this.setLocalState(null);
          super.destroy();
          clearInterval(this._checkInterval);
        }
        /**
         * @return {Object<string,any>|null}
         */
        getLocalState() {
          return this.states.get(this.clientID) || null;
        }
        /**
         * @param {Object<string,any>|null} state
         */
        setLocalState(state) {
          const clientID = this.clientID;
          const currLocalMeta = this.meta.get(clientID);
          const clock = currLocalMeta === void 0 ? 0 : currLocalMeta.clock + 1;
          const prevState = this.states.get(clientID);
          if (state === null) {
            this.states.delete(clientID);
          } else {
            this.states.set(clientID, state);
          }
          this.meta.set(clientID, {
            clock,
            lastUpdated: getUnixTime()
          });
          const added = [];
          const updated = [];
          const filteredUpdated = [];
          const removed = [];
          if (state === null) {
            removed.push(clientID);
          } else if (prevState == null) {
            if (state != null) {
              added.push(clientID);
            }
          } else {
            updated.push(clientID);
            if (!equalityDeep(prevState, state)) {
              filteredUpdated.push(clientID);
            }
          }
          if (added.length > 0 || filteredUpdated.length > 0 || removed.length > 0) {
            this.emit("change", [{ added, updated: filteredUpdated, removed }, "local"]);
          }
          this.emit("update", [{ added, updated, removed }, "local"]);
        }
        /**
         * @param {string} field
         * @param {any} value
         */
        setLocalStateField(field, value) {
          const state = this.getLocalState();
          if (state !== null) {
            this.setLocalState({
              ...state,
              [field]: value
            });
          }
        }
        /**
         * @return {Map<number,Object<string,any>>}
         */
        getStates() {
          return this.states;
        }
      };
      removeAwarenessStates = (awareness, clients, origin) => {
        const removed = [];
        for (let i = 0; i < clients.length; i++) {
          const clientID = clients[i];
          if (awareness.states.has(clientID)) {
            awareness.states.delete(clientID);
            if (clientID === awareness.clientID) {
              const curMeta = (
                /** @type {MetaClientState} */
                awareness.meta.get(clientID)
              );
              awareness.meta.set(clientID, {
                clock: curMeta.clock + 1,
                lastUpdated: getUnixTime()
              });
            }
            removed.push(clientID);
          }
        }
        if (removed.length > 0) {
          awareness.emit("change", [{ added: [], updated: [], removed }, origin]);
          awareness.emit("update", [{ added: [], updated: [], removed }, origin]);
        }
      };
      encodeAwarenessUpdate = (awareness, clients, states = awareness.states) => {
        const len = clients.length;
        const encoder = createEncoder();
        writeVarUint(encoder, len);
        for (let i = 0; i < len; i++) {
          const clientID = clients[i];
          const state = states.get(clientID) || null;
          const clock = (
            /** @type {MetaClientState} */
            awareness.meta.get(clientID).clock
          );
          writeVarUint(encoder, clientID);
          writeVarUint(encoder, clock);
          writeVarString(encoder, JSON.stringify(state));
        }
        return toUint8Array(encoder);
      };
      applyAwarenessUpdate = (awareness, update, origin) => {
        const decoder = createDecoder(update);
        const timestamp = getUnixTime();
        const added = [];
        const updated = [];
        const filteredUpdated = [];
        const removed = [];
        const len = readVarUint(decoder);
        for (let i = 0; i < len; i++) {
          const clientID = readVarUint(decoder);
          let clock = readVarUint(decoder);
          const state = JSON.parse(readVarString(decoder));
          const clientMeta = awareness.meta.get(clientID);
          const prevState = awareness.states.get(clientID);
          const currClock = clientMeta === void 0 ? 0 : clientMeta.clock;
          if (currClock < clock || currClock === clock && state === null && awareness.states.has(clientID)) {
            if (state === null) {
              if (clientID === awareness.clientID && awareness.getLocalState() != null) {
                clock++;
              } else {
                awareness.states.delete(clientID);
              }
            } else {
              awareness.states.set(clientID, state);
            }
            awareness.meta.set(clientID, {
              clock,
              lastUpdated: timestamp
            });
            if (clientMeta === void 0 && state !== null) {
              added.push(clientID);
            } else if (clientMeta !== void 0 && state === null) {
              removed.push(clientID);
            } else if (state !== null) {
              if (!equalityDeep(state, prevState)) {
                filteredUpdated.push(clientID);
              }
              updated.push(clientID);
            }
          }
        }
        if (added.length > 0 || filteredUpdated.length > 0 || removed.length > 0) {
          awareness.emit("change", [{
            added,
            updated: filteredUpdated,
            removed
          }, origin]);
        }
        if (added.length > 0 || updated.length > 0 || removed.length > 0) {
          awareness.emit("update", [{
            added,
            updated,
            removed
          }, origin]);
        }
      };
    }
  });

  // node_modules/lib0/url.js
  var encodeQueryParams;
  var init_url = __esm({
    "node_modules/lib0/url.js"() {
      init_object();
      encodeQueryParams = (params2) => map2(params2, (val, key) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join("&");
    }
  });

  // node_modules/y-websocket/src/y-websocket.js
  var messageSync, messageQueryAwareness, messageAwareness, messageAuth, messageHandlers, messageReconnectTimeout, permissionDeniedHandler, readMessage, closeWebsocketConnection, setupWS, broadcastMessage, WebsocketProvider;
  var init_y_websocket = __esm({
    "node_modules/y-websocket/src/y-websocket.js"() {
      init_broadcastchannel();
      init_time();
      init_encoding();
      init_decoding();
      init_sync();
      init_auth();
      init_awareness();
      init_observable();
      init_math();
      init_url();
      init_environment();
      messageSync = 0;
      messageQueryAwareness = 3;
      messageAwareness = 1;
      messageAuth = 2;
      messageHandlers = [];
      messageHandlers[messageSync] = (encoder, decoder, provider, emitSynced, _messageType) => {
        writeVarUint(encoder, messageSync);
        const syncMessageType = readSyncMessage(
          decoder,
          encoder,
          provider.doc,
          provider
        );
        if (emitSynced && syncMessageType === messageYjsSyncStep2 && !provider.synced) {
          provider.synced = true;
        }
      };
      messageHandlers[messageQueryAwareness] = (encoder, _decoder, provider, _emitSynced, _messageType) => {
        writeVarUint(encoder, messageAwareness);
        writeVarUint8Array(
          encoder,
          encodeAwarenessUpdate(
            provider.awareness,
            Array.from(provider.awareness.getStates().keys())
          )
        );
      };
      messageHandlers[messageAwareness] = (_encoder, decoder, provider, _emitSynced, _messageType) => {
        applyAwarenessUpdate(
          provider.awareness,
          readVarUint8Array(decoder),
          provider
        );
      };
      messageHandlers[messageAuth] = (_encoder, decoder, provider, _emitSynced, _messageType) => {
        readAuthMessage(
          decoder,
          provider.doc,
          (_ydoc, reason) => permissionDeniedHandler(provider, reason)
        );
      };
      messageReconnectTimeout = 3e4;
      permissionDeniedHandler = (provider, reason) => console.warn(`Permission denied to access ${provider.url}.
${reason}`);
      readMessage = (provider, buf, emitSynced) => {
        const decoder = createDecoder(buf);
        const encoder = createEncoder();
        const messageType = readVarUint(decoder);
        const messageHandler = provider.messageHandlers[messageType];
        if (
          /** @type {any} */
          messageHandler
        ) {
          messageHandler(encoder, decoder, provider, emitSynced, messageType);
        } else {
          console.error("Unable to compute message");
        }
        return encoder;
      };
      closeWebsocketConnection = (provider, ws, event) => {
        if (ws === provider.ws) {
          provider.emit("connection-close", [event, provider]);
          provider.ws = null;
          ws.close();
          provider.wsconnecting = false;
          if (provider.wsconnected) {
            provider.wsconnected = false;
            provider.synced = false;
            removeAwarenessStates(
              provider.awareness,
              Array.from(provider.awareness.getStates().keys()).filter(
                (client) => client !== provider.doc.clientID
              ),
              provider
            );
            provider.emit("status", [{
              status: "disconnected"
            }]);
          } else {
            provider.wsUnsuccessfulReconnects++;
          }
          setTimeout(
            setupWS,
            min(
              pow(2, provider.wsUnsuccessfulReconnects) * 100,
              provider.maxBackoffTime
            ),
            provider
          );
        }
      };
      setupWS = (provider) => {
        if (provider.shouldConnect && provider.ws === null) {
          const websocket = new provider._WS(provider.url, provider.protocols);
          websocket.binaryType = "arraybuffer";
          provider.ws = websocket;
          provider.wsconnecting = true;
          provider.wsconnected = false;
          provider.synced = false;
          websocket.onmessage = (event) => {
            provider.wsLastMessageReceived = getUnixTime();
            const encoder = readMessage(provider, new Uint8Array(event.data), true);
            if (length(encoder) > 1) {
              websocket.send(toUint8Array(encoder));
            }
          };
          websocket.onerror = (event) => {
            provider.emit("connection-error", [event, provider]);
          };
          websocket.onclose = (event) => {
            closeWebsocketConnection(provider, websocket, event);
          };
          websocket.onopen = () => {
            provider.wsLastMessageReceived = getUnixTime();
            provider.wsconnecting = false;
            provider.wsconnected = true;
            provider.wsUnsuccessfulReconnects = 0;
            provider.emit("status", [{
              status: "connected"
            }]);
            const encoder = createEncoder();
            writeVarUint(encoder, messageSync);
            writeSyncStep1(encoder, provider.doc);
            websocket.send(toUint8Array(encoder));
            if (provider.awareness.getLocalState() !== null) {
              const encoderAwarenessState = createEncoder();
              writeVarUint(encoderAwarenessState, messageAwareness);
              writeVarUint8Array(
                encoderAwarenessState,
                encodeAwarenessUpdate(provider.awareness, [
                  provider.doc.clientID
                ])
              );
              websocket.send(toUint8Array(encoderAwarenessState));
            }
          };
          provider.emit("status", [{
            status: "connecting"
          }]);
        }
      };
      broadcastMessage = (provider, buf) => {
        const ws = provider.ws;
        if (provider.wsconnected && ws && ws.readyState === ws.OPEN) {
          ws.send(buf);
        }
        if (provider.bcconnected) {
          publish(provider.bcChannel, buf, provider);
        }
      };
      WebsocketProvider = class extends ObservableV2 {
        /**
         * @param {string} serverUrl
         * @param {string} roomname
         * @param {Y.Doc} doc
         * @param {object} opts
         * @param {boolean} [opts.connect]
         * @param {awarenessProtocol.Awareness} [opts.awareness]
         * @param {Object<string,string>} [opts.params] specify url parameters
         * @param {Array<string>} [opts.protocols] specify websocket protocols
         * @param {typeof WebSocket} [opts.WebSocketPolyfill] Optionall provide a WebSocket polyfill
         * @param {number} [opts.resyncInterval] Request server state every `resyncInterval` milliseconds
         * @param {number} [opts.maxBackoffTime] Maximum amount of time to wait before trying to reconnect (we try to reconnect using exponential backoff)
         * @param {boolean} [opts.disableBc] Disable cross-tab BroadcastChannel communication
         */
        constructor(serverUrl, roomname, doc2, {
          connect = true,
          awareness = new Awareness(doc2),
          params: params2 = {},
          protocols = [],
          WebSocketPolyfill = WebSocket,
          resyncInterval = -1,
          maxBackoffTime = 2500,
          disableBc = false
        } = {}) {
          super();
          while (serverUrl[serverUrl.length - 1] === "/") {
            serverUrl = serverUrl.slice(0, serverUrl.length - 1);
          }
          this.serverUrl = serverUrl;
          this.bcChannel = serverUrl + "/" + roomname;
          this.maxBackoffTime = maxBackoffTime;
          this.params = params2;
          this.protocols = protocols;
          this.roomname = roomname;
          this.doc = doc2;
          this._WS = WebSocketPolyfill;
          this.awareness = awareness;
          this.wsconnected = false;
          this.wsconnecting = false;
          this.bcconnected = false;
          this.disableBc = disableBc;
          this.wsUnsuccessfulReconnects = 0;
          this.messageHandlers = messageHandlers.slice();
          this._synced = false;
          this.ws = null;
          this.wsLastMessageReceived = 0;
          this.shouldConnect = connect;
          this._resyncInterval = 0;
          if (resyncInterval > 0) {
            this._resyncInterval = /** @type {any} */
            setInterval(() => {
              if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                const encoder = createEncoder();
                writeVarUint(encoder, messageSync);
                writeSyncStep1(encoder, doc2);
                this.ws.send(toUint8Array(encoder));
              }
            }, resyncInterval);
          }
          this._bcSubscriber = (data, origin) => {
            if (origin !== this) {
              const encoder = readMessage(this, new Uint8Array(data), false);
              if (length(encoder) > 1) {
                publish(this.bcChannel, toUint8Array(encoder), this);
              }
            }
          };
          this._updateHandler = (update, origin) => {
            if (origin !== this) {
              const encoder = createEncoder();
              writeVarUint(encoder, messageSync);
              writeUpdate(encoder, update);
              broadcastMessage(this, toUint8Array(encoder));
            }
          };
          this.doc.on("update", this._updateHandler);
          this._awarenessUpdateHandler = ({ added, updated, removed }, _origin) => {
            const changedClients = added.concat(updated).concat(removed);
            const encoder = createEncoder();
            writeVarUint(encoder, messageAwareness);
            writeVarUint8Array(
              encoder,
              encodeAwarenessUpdate(awareness, changedClients)
            );
            broadcastMessage(this, toUint8Array(encoder));
          };
          this._exitHandler = () => {
            removeAwarenessStates(
              this.awareness,
              [doc2.clientID],
              "app closed"
            );
          };
          if (isNode && typeof process !== "undefined") {
            process.on("exit", this._exitHandler);
          }
          awareness.on("update", this._awarenessUpdateHandler);
          this._checkInterval = /** @type {any} */
          setInterval(() => {
            if (this.wsconnected && messageReconnectTimeout < getUnixTime() - this.wsLastMessageReceived) {
              closeWebsocketConnection(
                this,
                /** @type {WebSocket} */
                this.ws,
                null
              );
            }
          }, messageReconnectTimeout / 10);
          if (connect) {
            this.connect();
          }
        }
        get url() {
          const encodedParams = encodeQueryParams(this.params);
          return this.serverUrl + "/" + this.roomname + (encodedParams.length === 0 ? "" : "?" + encodedParams);
        }
        /**
         * @type {boolean}
         */
        get synced() {
          return this._synced;
        }
        set synced(state) {
          if (this._synced !== state) {
            this._synced = state;
            this.emit("synced", [state]);
            this.emit("sync", [state]);
          }
        }
        destroy() {
          if (this._resyncInterval !== 0) {
            clearInterval(this._resyncInterval);
          }
          clearInterval(this._checkInterval);
          this.disconnect();
          if (isNode && typeof process !== "undefined") {
            process.off("exit", this._exitHandler);
          }
          this.awareness.off("update", this._awarenessUpdateHandler);
          this.doc.off("update", this._updateHandler);
          super.destroy();
        }
        connectBc() {
          if (this.disableBc) {
            return;
          }
          if (!this.bcconnected) {
            subscribe(this.bcChannel, this._bcSubscriber);
            this.bcconnected = true;
          }
          const encoderSync = createEncoder();
          writeVarUint(encoderSync, messageSync);
          writeSyncStep1(encoderSync, this.doc);
          publish(this.bcChannel, toUint8Array(encoderSync), this);
          const encoderState = createEncoder();
          writeVarUint(encoderState, messageSync);
          writeSyncStep2(encoderState, this.doc);
          publish(this.bcChannel, toUint8Array(encoderState), this);
          const encoderAwarenessQuery = createEncoder();
          writeVarUint(encoderAwarenessQuery, messageQueryAwareness);
          publish(
            this.bcChannel,
            toUint8Array(encoderAwarenessQuery),
            this
          );
          const encoderAwarenessState = createEncoder();
          writeVarUint(encoderAwarenessState, messageAwareness);
          writeVarUint8Array(
            encoderAwarenessState,
            encodeAwarenessUpdate(this.awareness, [
              this.doc.clientID
            ])
          );
          publish(
            this.bcChannel,
            toUint8Array(encoderAwarenessState),
            this
          );
        }
        disconnectBc() {
          const encoder = createEncoder();
          writeVarUint(encoder, messageAwareness);
          writeVarUint8Array(
            encoder,
            encodeAwarenessUpdate(this.awareness, [
              this.doc.clientID
            ], /* @__PURE__ */ new Map())
          );
          broadcastMessage(this, toUint8Array(encoder));
          if (this.bcconnected) {
            unsubscribe(this.bcChannel, this._bcSubscriber);
            this.bcconnected = false;
          }
        }
        disconnect() {
          this.shouldConnect = false;
          this.disconnectBc();
          if (this.ws !== null) {
            closeWebsocketConnection(this, this.ws, null);
          }
        }
        connect() {
          this.shouldConnect = true;
          if (!this.wsconnected && this.ws === null) {
            setupWS(this);
            this.connectBc();
          }
        }
      };
    }
  });

  // node_modules/y-quill/src/y-quill.js
  var updateCursor, QuillBinding;
  var init_y_quill = __esm({
    "node_modules/y-quill/src/y-quill.js"() {
      init_yjs();
      updateCursor = (quillCursors, aw, clientId, doc2, type) => {
        try {
          if (aw && aw.cursor && clientId !== doc2.clientID) {
            const user = aw.user || {};
            const color = user.color || "#ffa500";
            const name = user.name || `User: ${clientId}`;
            quillCursors.createCursor(clientId.toString(), name, color);
            const anchor = createAbsolutePositionFromRelativePosition(createRelativePositionFromJSON(aw.cursor.anchor), doc2);
            const head = createAbsolutePositionFromRelativePosition(createRelativePositionFromJSON(aw.cursor.head), doc2);
            if (anchor && head && anchor.type === type) {
              quillCursors.moveCursor(clientId.toString(), { index: anchor.index, length: head.index - anchor.index });
            }
          } else {
            quillCursors.removeCursor(clientId.toString());
          }
        } catch (err) {
          console.error(err);
        }
      };
      QuillBinding = class {
        /**
         * @param {Y.Text} type
         * @param {any} quill
         * @param {Awareness} [awareness]
         */
        constructor(type, quill, awareness) {
          const doc2 = (
            /** @type {Y.Doc} */
            type.doc
          );
          this.type = type;
          this.doc = doc2;
          this.quill = quill;
          const quillCursors = quill.getModule("cursors") || null;
          this.quillCursors = quillCursors;
          this._negatedUsedFormats = {};
          this.awareness = awareness;
          this._awarenessChange = ({ added, removed, updated }) => {
            const states = (
              /** @type {Awareness} */
              awareness.getStates()
            );
            added.forEach((id2) => {
              updateCursor(quillCursors, states.get(id2), id2, doc2, type);
            });
            updated.forEach((id2) => {
              updateCursor(quillCursors, states.get(id2), id2, doc2, type);
            });
            removed.forEach((id2) => {
              quillCursors.removeCursor(id2.toString());
            });
          };
          this._typeObserver = (event) => {
            if (event.transaction.origin !== this) {
              const eventDelta = event.delta;
              const delta = [];
              for (let i = 0; i < eventDelta.length; i++) {
                const d = eventDelta[i];
                if (d.insert !== void 0) {
                  delta.push(Object.assign({}, d, { attributes: Object.assign({}, this._negatedUsedFormats, d.attributes || {}) }));
                } else {
                  delta.push(d);
                }
              }
              quill.updateContents(delta, this);
            }
          };
          type.observe(this._typeObserver);
          this._quillObserver = (eventType, delta, state, origin) => {
            if (delta && delta.ops) {
              const ops = delta.ops;
              ops.forEach((op) => {
                if (op.attributes !== void 0) {
                  for (const key in op.attributes) {
                    if (this._negatedUsedFormats[key] === void 0) {
                      this._negatedUsedFormats[key] = false;
                    }
                  }
                }
              });
              if (origin !== this) {
                doc2.transact(() => {
                  type.applyDelta(ops);
                }, this);
              }
            }
            if (awareness && quillCursors) {
              const sel = quill.getSelection();
              const aw = (
                /** @type {any} */
                awareness.getLocalState()
              );
              if (sel === null) {
                if (awareness.getLocalState() !== null) {
                  awareness.setLocalStateField(
                    "cursor",
                    /** @type {any} */
                    null
                  );
                }
              } else {
                const anchor = createRelativePositionFromTypeIndex(type, sel.index);
                const head = createRelativePositionFromTypeIndex(type, sel.index + sel.length);
                if (!aw || !aw.cursor || !compareRelativePositions(anchor, aw.cursor.anchor) || !compareRelativePositions(head, aw.cursor.head)) {
                  awareness.setLocalStateField("cursor", {
                    anchor,
                    head
                  });
                }
              }
              awareness.getStates().forEach((aw2, clientId) => {
                updateCursor(quillCursors, aw2, clientId, doc2, type);
              });
            }
          };
          quill.on("editor-change", this._quillObserver);
          quill.setContents(type.toDelta(), this);
          if (quillCursors !== null && awareness) {
            awareness.getStates().forEach((aw, clientId) => {
              updateCursor(quillCursors, aw, clientId, doc2, type);
            });
            awareness.on("change", this._awarenessChange);
          }
        }
        destroy() {
          this.type.unobserve(this._typeObserver);
          this.quill.off("editor-change", this._quillObserver);
          if (this.awareness) {
            this.awareness.off("change", this._awarenessChange);
          }
        }
      };
    }
  });

  // node_modules/lodash-es/_freeGlobal.js
  var freeGlobal, freeGlobal_default;
  var init_freeGlobal = __esm({
    "node_modules/lodash-es/_freeGlobal.js"() {
      freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      freeGlobal_default = freeGlobal;
    }
  });

  // node_modules/lodash-es/_root.js
  var freeSelf, root, root_default;
  var init_root = __esm({
    "node_modules/lodash-es/_root.js"() {
      init_freeGlobal();
      freeSelf = typeof self == "object" && self && self.Object === Object && self;
      root = freeGlobal_default || freeSelf || Function("return this")();
      root_default = root;
    }
  });

  // node_modules/lodash-es/_Symbol.js
  var Symbol2, Symbol_default;
  var init_Symbol = __esm({
    "node_modules/lodash-es/_Symbol.js"() {
      init_root();
      Symbol2 = root_default.Symbol;
      Symbol_default = Symbol2;
    }
  });

  // node_modules/lodash-es/_getRawTag.js
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  var objectProto, hasOwnProperty, nativeObjectToString, symToStringTag, getRawTag_default;
  var init_getRawTag = __esm({
    "node_modules/lodash-es/_getRawTag.js"() {
      init_Symbol();
      objectProto = Object.prototype;
      hasOwnProperty = objectProto.hasOwnProperty;
      nativeObjectToString = objectProto.toString;
      symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
      getRawTag_default = getRawTag;
    }
  });

  // node_modules/lodash-es/_objectToString.js
  function objectToString(value) {
    return nativeObjectToString2.call(value);
  }
  var objectProto2, nativeObjectToString2, objectToString_default;
  var init_objectToString = __esm({
    "node_modules/lodash-es/_objectToString.js"() {
      objectProto2 = Object.prototype;
      nativeObjectToString2 = objectProto2.toString;
      objectToString_default = objectToString;
    }
  });

  // node_modules/lodash-es/_baseGetTag.js
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
  }
  var nullTag, undefinedTag, symToStringTag2, baseGetTag_default;
  var init_baseGetTag = __esm({
    "node_modules/lodash-es/_baseGetTag.js"() {
      init_Symbol();
      init_getRawTag();
      init_objectToString();
      nullTag = "[object Null]";
      undefinedTag = "[object Undefined]";
      symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
      baseGetTag_default = baseGetTag;
    }
  });

  // node_modules/lodash-es/isObjectLike.js
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var isObjectLike_default;
  var init_isObjectLike = __esm({
    "node_modules/lodash-es/isObjectLike.js"() {
      isObjectLike_default = isObjectLike;
    }
  });

  // node_modules/lodash-es/isArray.js
  var isArray2, isArray_default;
  var init_isArray = __esm({
    "node_modules/lodash-es/isArray.js"() {
      isArray2 = Array.isArray;
      isArray_default = isArray2;
    }
  });

  // node_modules/lodash-es/isObject.js
  function isObject2(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var isObject_default;
  var init_isObject = __esm({
    "node_modules/lodash-es/isObject.js"() {
      isObject_default = isObject2;
    }
  });

  // node_modules/lodash-es/identity.js
  function identity(value) {
    return value;
  }
  var identity_default;
  var init_identity = __esm({
    "node_modules/lodash-es/identity.js"() {
      identity_default = identity;
    }
  });

  // node_modules/lodash-es/isFunction.js
  function isFunction(value) {
    if (!isObject_default(value)) {
      return false;
    }
    var tag = baseGetTag_default(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  var asyncTag, funcTag, genTag, proxyTag, isFunction_default;
  var init_isFunction = __esm({
    "node_modules/lodash-es/isFunction.js"() {
      init_baseGetTag();
      init_isObject();
      asyncTag = "[object AsyncFunction]";
      funcTag = "[object Function]";
      genTag = "[object GeneratorFunction]";
      proxyTag = "[object Proxy]";
      isFunction_default = isFunction;
    }
  });

  // node_modules/lodash-es/_coreJsData.js
  var coreJsData, coreJsData_default;
  var init_coreJsData = __esm({
    "node_modules/lodash-es/_coreJsData.js"() {
      init_root();
      coreJsData = root_default["__core-js_shared__"];
      coreJsData_default = coreJsData;
    }
  });

  // node_modules/lodash-es/_isMasked.js
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var maskSrcKey, isMasked_default;
  var init_isMasked = __esm({
    "node_modules/lodash-es/_isMasked.js"() {
      init_coreJsData();
      maskSrcKey = (function() {
        var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      })();
      isMasked_default = isMasked;
    }
  });

  // node_modules/lodash-es/_toSource.js
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  var funcProto, funcToString, toSource_default;
  var init_toSource = __esm({
    "node_modules/lodash-es/_toSource.js"() {
      funcProto = Function.prototype;
      funcToString = funcProto.toString;
      toSource_default = toSource;
    }
  });

  // node_modules/lodash-es/_baseIsNative.js
  function baseIsNative(value) {
    if (!isObject_default(value) || isMasked_default(value)) {
      return false;
    }
    var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource_default(value));
  }
  var reRegExpChar, reIsHostCtor, funcProto2, objectProto3, funcToString2, hasOwnProperty2, reIsNative, baseIsNative_default;
  var init_baseIsNative = __esm({
    "node_modules/lodash-es/_baseIsNative.js"() {
      init_isFunction();
      init_isMasked();
      init_isObject();
      init_toSource();
      reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      reIsHostCtor = /^\[object .+?Constructor\]$/;
      funcProto2 = Function.prototype;
      objectProto3 = Object.prototype;
      funcToString2 = funcProto2.toString;
      hasOwnProperty2 = objectProto3.hasOwnProperty;
      reIsNative = RegExp(
        "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      baseIsNative_default = baseIsNative;
    }
  });

  // node_modules/lodash-es/_getValue.js
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  var getValue_default;
  var init_getValue = __esm({
    "node_modules/lodash-es/_getValue.js"() {
      getValue_default = getValue;
    }
  });

  // node_modules/lodash-es/_getNative.js
  function getNative(object, key) {
    var value = getValue_default(object, key);
    return baseIsNative_default(value) ? value : void 0;
  }
  var getNative_default;
  var init_getNative = __esm({
    "node_modules/lodash-es/_getNative.js"() {
      init_baseIsNative();
      init_getValue();
      getNative_default = getNative;
    }
  });

  // node_modules/lodash-es/_WeakMap.js
  var WeakMap2, WeakMap_default;
  var init_WeakMap = __esm({
    "node_modules/lodash-es/_WeakMap.js"() {
      init_getNative();
      init_root();
      WeakMap2 = getNative_default(root_default, "WeakMap");
      WeakMap_default = WeakMap2;
    }
  });

  // node_modules/lodash-es/_baseCreate.js
  var objectCreate, baseCreate, baseCreate_default;
  var init_baseCreate = __esm({
    "node_modules/lodash-es/_baseCreate.js"() {
      init_isObject();
      objectCreate = Object.create;
      baseCreate = /* @__PURE__ */ (function() {
        function object() {
        }
        return function(proto) {
          if (!isObject_default(proto)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto);
          }
          object.prototype = proto;
          var result = new object();
          object.prototype = void 0;
          return result;
        };
      })();
      baseCreate_default = baseCreate;
    }
  });

  // node_modules/lodash-es/_apply.js
  function apply(func, thisArg, args2) {
    switch (args2.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args2[0]);
      case 2:
        return func.call(thisArg, args2[0], args2[1]);
      case 3:
        return func.call(thisArg, args2[0], args2[1], args2[2]);
    }
    return func.apply(thisArg, args2);
  }
  var apply_default;
  var init_apply = __esm({
    "node_modules/lodash-es/_apply.js"() {
      apply_default = apply;
    }
  });

  // node_modules/lodash-es/_copyArray.js
  function copyArray(source, array) {
    var index = -1, length2 = source.length;
    array || (array = Array(length2));
    while (++index < length2) {
      array[index] = source[index];
    }
    return array;
  }
  var copyArray_default;
  var init_copyArray = __esm({
    "node_modules/lodash-es/_copyArray.js"() {
      copyArray_default = copyArray;
    }
  });

  // node_modules/lodash-es/_shortOut.js
  function shortOut(func) {
    var count = 0, lastCalled = 0;
    return function() {
      var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(void 0, arguments);
    };
  }
  var HOT_COUNT, HOT_SPAN, nativeNow, shortOut_default;
  var init_shortOut = __esm({
    "node_modules/lodash-es/_shortOut.js"() {
      HOT_COUNT = 800;
      HOT_SPAN = 16;
      nativeNow = Date.now;
      shortOut_default = shortOut;
    }
  });

  // node_modules/lodash-es/constant.js
  function constant(value) {
    return function() {
      return value;
    };
  }
  var constant_default;
  var init_constant = __esm({
    "node_modules/lodash-es/constant.js"() {
      constant_default = constant;
    }
  });

  // node_modules/lodash-es/_defineProperty.js
  var defineProperty, defineProperty_default;
  var init_defineProperty = __esm({
    "node_modules/lodash-es/_defineProperty.js"() {
      init_getNative();
      defineProperty = (function() {
        try {
          var func = getNative_default(Object, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e) {
        }
      })();
      defineProperty_default = defineProperty;
    }
  });

  // node_modules/lodash-es/_baseSetToString.js
  var baseSetToString, baseSetToString_default;
  var init_baseSetToString = __esm({
    "node_modules/lodash-es/_baseSetToString.js"() {
      init_constant();
      init_defineProperty();
      init_identity();
      baseSetToString = !defineProperty_default ? identity_default : function(func, string) {
        return defineProperty_default(func, "toString", {
          "configurable": true,
          "enumerable": false,
          "value": constant_default(string),
          "writable": true
        });
      };
      baseSetToString_default = baseSetToString;
    }
  });

  // node_modules/lodash-es/_setToString.js
  var setToString, setToString_default;
  var init_setToString = __esm({
    "node_modules/lodash-es/_setToString.js"() {
      init_baseSetToString();
      init_shortOut();
      setToString = shortOut_default(baseSetToString_default);
      setToString_default = setToString;
    }
  });

  // node_modules/lodash-es/_arrayEach.js
  function arrayEach(array, iteratee) {
    var index = -1, length2 = array == null ? 0 : array.length;
    while (++index < length2) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  var arrayEach_default;
  var init_arrayEach = __esm({
    "node_modules/lodash-es/_arrayEach.js"() {
      arrayEach_default = arrayEach;
    }
  });

  // node_modules/lodash-es/_isIndex.js
  function isIndex(value, length2) {
    var type = typeof value;
    length2 = length2 == null ? MAX_SAFE_INTEGER2 : length2;
    return !!length2 && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length2);
  }
  var MAX_SAFE_INTEGER2, reIsUint, isIndex_default;
  var init_isIndex = __esm({
    "node_modules/lodash-es/_isIndex.js"() {
      MAX_SAFE_INTEGER2 = 9007199254740991;
      reIsUint = /^(?:0|[1-9]\d*)$/;
      isIndex_default = isIndex;
    }
  });

  // node_modules/lodash-es/_baseAssignValue.js
  function baseAssignValue(object, key, value) {
    if (key == "__proto__" && defineProperty_default) {
      defineProperty_default(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object[key] = value;
    }
  }
  var baseAssignValue_default;
  var init_baseAssignValue = __esm({
    "node_modules/lodash-es/_baseAssignValue.js"() {
      init_defineProperty();
      baseAssignValue_default = baseAssignValue;
    }
  });

  // node_modules/lodash-es/eq.js
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var eq_default;
  var init_eq = __esm({
    "node_modules/lodash-es/eq.js"() {
      eq_default = eq;
    }
  });

  // node_modules/lodash-es/_assignValue.js
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty3.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue_default(object, key, value);
    }
  }
  var objectProto4, hasOwnProperty3, assignValue_default;
  var init_assignValue = __esm({
    "node_modules/lodash-es/_assignValue.js"() {
      init_baseAssignValue();
      init_eq();
      objectProto4 = Object.prototype;
      hasOwnProperty3 = objectProto4.hasOwnProperty;
      assignValue_default = assignValue;
    }
  });

  // node_modules/lodash-es/_copyObject.js
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1, length2 = props.length;
    while (++index < length2) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
      if (newValue === void 0) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue_default(object, key, newValue);
      } else {
        assignValue_default(object, key, newValue);
      }
    }
    return object;
  }
  var copyObject_default;
  var init_copyObject = __esm({
    "node_modules/lodash-es/_copyObject.js"() {
      init_assignValue();
      init_baseAssignValue();
      copyObject_default = copyObject;
    }
  });

  // node_modules/lodash-es/_overRest.js
  function overRest(func, start, transform) {
    start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
    return function() {
      var args2 = arguments, index = -1, length2 = nativeMax(args2.length - start, 0), array = Array(length2);
      while (++index < length2) {
        array[index] = args2[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args2[index];
      }
      otherArgs[start] = transform(array);
      return apply_default(func, this, otherArgs);
    };
  }
  var nativeMax, overRest_default;
  var init_overRest = __esm({
    "node_modules/lodash-es/_overRest.js"() {
      init_apply();
      nativeMax = Math.max;
      overRest_default = overRest;
    }
  });

  // node_modules/lodash-es/_baseRest.js
  function baseRest(func, start) {
    return setToString_default(overRest_default(func, start, identity_default), func + "");
  }
  var baseRest_default;
  var init_baseRest = __esm({
    "node_modules/lodash-es/_baseRest.js"() {
      init_identity();
      init_overRest();
      init_setToString();
      baseRest_default = baseRest;
    }
  });

  // node_modules/lodash-es/isLength.js
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER3;
  }
  var MAX_SAFE_INTEGER3, isLength_default;
  var init_isLength = __esm({
    "node_modules/lodash-es/isLength.js"() {
      MAX_SAFE_INTEGER3 = 9007199254740991;
      isLength_default = isLength;
    }
  });

  // node_modules/lodash-es/isArrayLike.js
  function isArrayLike(value) {
    return value != null && isLength_default(value.length) && !isFunction_default(value);
  }
  var isArrayLike_default;
  var init_isArrayLike = __esm({
    "node_modules/lodash-es/isArrayLike.js"() {
      init_isFunction();
      init_isLength();
      isArrayLike_default = isArrayLike;
    }
  });

  // node_modules/lodash-es/_isIterateeCall.js
  function isIterateeCall(value, index, object) {
    if (!isObject_default(object)) {
      return false;
    }
    var type = typeof index;
    if (type == "number" ? isArrayLike_default(object) && isIndex_default(index, object.length) : type == "string" && index in object) {
      return eq_default(object[index], value);
    }
    return false;
  }
  var isIterateeCall_default;
  var init_isIterateeCall = __esm({
    "node_modules/lodash-es/_isIterateeCall.js"() {
      init_eq();
      init_isArrayLike();
      init_isIndex();
      init_isObject();
      isIterateeCall_default = isIterateeCall;
    }
  });

  // node_modules/lodash-es/_createAssigner.js
  function createAssigner(assigner) {
    return baseRest_default(function(object, sources) {
      var index = -1, length2 = sources.length, customizer = length2 > 1 ? sources[length2 - 1] : void 0, guard = length2 > 2 ? sources[2] : void 0;
      customizer = assigner.length > 3 && typeof customizer == "function" ? (length2--, customizer) : void 0;
      if (guard && isIterateeCall_default(sources[0], sources[1], guard)) {
        customizer = length2 < 3 ? void 0 : customizer;
        length2 = 1;
      }
      object = Object(object);
      while (++index < length2) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }
  var createAssigner_default;
  var init_createAssigner = __esm({
    "node_modules/lodash-es/_createAssigner.js"() {
      init_baseRest();
      init_isIterateeCall();
      createAssigner_default = createAssigner;
    }
  });

  // node_modules/lodash-es/_isPrototype.js
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto5;
    return value === proto;
  }
  var objectProto5, isPrototype_default;
  var init_isPrototype = __esm({
    "node_modules/lodash-es/_isPrototype.js"() {
      objectProto5 = Object.prototype;
      isPrototype_default = isPrototype;
    }
  });

  // node_modules/lodash-es/_baseTimes.js
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  var baseTimes_default;
  var init_baseTimes = __esm({
    "node_modules/lodash-es/_baseTimes.js"() {
      baseTimes_default = baseTimes;
    }
  });

  // node_modules/lodash-es/_baseIsArguments.js
  function baseIsArguments(value) {
    return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
  }
  var argsTag, baseIsArguments_default;
  var init_baseIsArguments = __esm({
    "node_modules/lodash-es/_baseIsArguments.js"() {
      init_baseGetTag();
      init_isObjectLike();
      argsTag = "[object Arguments]";
      baseIsArguments_default = baseIsArguments;
    }
  });

  // node_modules/lodash-es/isArguments.js
  var objectProto6, hasOwnProperty4, propertyIsEnumerable, isArguments, isArguments_default;
  var init_isArguments = __esm({
    "node_modules/lodash-es/isArguments.js"() {
      init_baseIsArguments();
      init_isObjectLike();
      objectProto6 = Object.prototype;
      hasOwnProperty4 = objectProto6.hasOwnProperty;
      propertyIsEnumerable = objectProto6.propertyIsEnumerable;
      isArguments = baseIsArguments_default(/* @__PURE__ */ (function() {
        return arguments;
      })()) ? baseIsArguments_default : function(value) {
        return isObjectLike_default(value) && hasOwnProperty4.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      isArguments_default = isArguments;
    }
  });

  // node_modules/lodash-es/stubFalse.js
  function stubFalse() {
    return false;
  }
  var stubFalse_default;
  var init_stubFalse = __esm({
    "node_modules/lodash-es/stubFalse.js"() {
      stubFalse_default = stubFalse;
    }
  });

  // node_modules/lodash-es/isBuffer.js
  var freeExports, freeModule, moduleExports, Buffer2, nativeIsBuffer, isBuffer, isBuffer_default;
  var init_isBuffer = __esm({
    "node_modules/lodash-es/isBuffer.js"() {
      init_root();
      init_stubFalse();
      freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      moduleExports = freeModule && freeModule.exports === freeExports;
      Buffer2 = moduleExports ? root_default.Buffer : void 0;
      nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
      isBuffer = nativeIsBuffer || stubFalse_default;
      isBuffer_default = isBuffer;
    }
  });

  // node_modules/lodash-es/_baseIsTypedArray.js
  function baseIsTypedArray(value) {
    return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
  }
  var argsTag2, arrayTag, boolTag, dateTag, errorTag, funcTag2, mapTag, numberTag, objectTag, regexpTag, setTag, stringTag, weakMapTag, arrayBufferTag, dataViewTag, float32Tag, float64Tag, int8Tag, int16Tag, int32Tag, uint8Tag, uint8ClampedTag, uint16Tag, uint32Tag, typedArrayTags, baseIsTypedArray_default;
  var init_baseIsTypedArray = __esm({
    "node_modules/lodash-es/_baseIsTypedArray.js"() {
      init_baseGetTag();
      init_isLength();
      init_isObjectLike();
      argsTag2 = "[object Arguments]";
      arrayTag = "[object Array]";
      boolTag = "[object Boolean]";
      dateTag = "[object Date]";
      errorTag = "[object Error]";
      funcTag2 = "[object Function]";
      mapTag = "[object Map]";
      numberTag = "[object Number]";
      objectTag = "[object Object]";
      regexpTag = "[object RegExp]";
      setTag = "[object Set]";
      stringTag = "[object String]";
      weakMapTag = "[object WeakMap]";
      arrayBufferTag = "[object ArrayBuffer]";
      dataViewTag = "[object DataView]";
      float32Tag = "[object Float32Array]";
      float64Tag = "[object Float64Array]";
      int8Tag = "[object Int8Array]";
      int16Tag = "[object Int16Array]";
      int32Tag = "[object Int32Array]";
      uint8Tag = "[object Uint8Array]";
      uint8ClampedTag = "[object Uint8ClampedArray]";
      uint16Tag = "[object Uint16Array]";
      uint32Tag = "[object Uint32Array]";
      typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      baseIsTypedArray_default = baseIsTypedArray;
    }
  });

  // node_modules/lodash-es/_baseUnary.js
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  var baseUnary_default;
  var init_baseUnary = __esm({
    "node_modules/lodash-es/_baseUnary.js"() {
      baseUnary_default = baseUnary;
    }
  });

  // node_modules/lodash-es/_nodeUtil.js
  var freeExports2, freeModule2, moduleExports2, freeProcess, nodeUtil, nodeUtil_default;
  var init_nodeUtil = __esm({
    "node_modules/lodash-es/_nodeUtil.js"() {
      init_freeGlobal();
      freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
      freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
      moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
      freeProcess = moduleExports2 && freeGlobal_default.process;
      nodeUtil = (function() {
        try {
          var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      })();
      nodeUtil_default = nodeUtil;
    }
  });

  // node_modules/lodash-es/isTypedArray.js
  var nodeIsTypedArray, isTypedArray, isTypedArray_default;
  var init_isTypedArray = __esm({
    "node_modules/lodash-es/isTypedArray.js"() {
      init_baseIsTypedArray();
      init_baseUnary();
      init_nodeUtil();
      nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
      isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
      isTypedArray_default = isTypedArray;
    }
  });

  // node_modules/lodash-es/_arrayLikeKeys.js
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length2 = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty5.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex_default(key, length2)))) {
        result.push(key);
      }
    }
    return result;
  }
  var objectProto7, hasOwnProperty5, arrayLikeKeys_default;
  var init_arrayLikeKeys = __esm({
    "node_modules/lodash-es/_arrayLikeKeys.js"() {
      init_baseTimes();
      init_isArguments();
      init_isArray();
      init_isBuffer();
      init_isIndex();
      init_isTypedArray();
      objectProto7 = Object.prototype;
      hasOwnProperty5 = objectProto7.hasOwnProperty;
      arrayLikeKeys_default = arrayLikeKeys;
    }
  });

  // node_modules/lodash-es/_overArg.js
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var overArg_default;
  var init_overArg = __esm({
    "node_modules/lodash-es/_overArg.js"() {
      overArg_default = overArg;
    }
  });

  // node_modules/lodash-es/_nativeKeys.js
  var nativeKeys, nativeKeys_default;
  var init_nativeKeys = __esm({
    "node_modules/lodash-es/_nativeKeys.js"() {
      init_overArg();
      nativeKeys = overArg_default(Object.keys, Object);
      nativeKeys_default = nativeKeys;
    }
  });

  // node_modules/lodash-es/_baseKeys.js
  function baseKeys(object) {
    if (!isPrototype_default(object)) {
      return nativeKeys_default(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty6.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  var objectProto8, hasOwnProperty6, baseKeys_default;
  var init_baseKeys = __esm({
    "node_modules/lodash-es/_baseKeys.js"() {
      init_isPrototype();
      init_nativeKeys();
      objectProto8 = Object.prototype;
      hasOwnProperty6 = objectProto8.hasOwnProperty;
      baseKeys_default = baseKeys;
    }
  });

  // node_modules/lodash-es/keys.js
  function keys2(object) {
    return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
  }
  var keys_default;
  var init_keys = __esm({
    "node_modules/lodash-es/keys.js"() {
      init_arrayLikeKeys();
      init_baseKeys();
      init_isArrayLike();
      keys_default = keys2;
    }
  });

  // node_modules/lodash-es/_nativeKeysIn.js
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  var nativeKeysIn_default;
  var init_nativeKeysIn = __esm({
    "node_modules/lodash-es/_nativeKeysIn.js"() {
      nativeKeysIn_default = nativeKeysIn;
    }
  });

  // node_modules/lodash-es/_baseKeysIn.js
  function baseKeysIn(object) {
    if (!isObject_default(object)) {
      return nativeKeysIn_default(object);
    }
    var isProto = isPrototype_default(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty7.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  var objectProto9, hasOwnProperty7, baseKeysIn_default;
  var init_baseKeysIn = __esm({
    "node_modules/lodash-es/_baseKeysIn.js"() {
      init_isObject();
      init_isPrototype();
      init_nativeKeysIn();
      objectProto9 = Object.prototype;
      hasOwnProperty7 = objectProto9.hasOwnProperty;
      baseKeysIn_default = baseKeysIn;
    }
  });

  // node_modules/lodash-es/keysIn.js
  function keysIn(object) {
    return isArrayLike_default(object) ? arrayLikeKeys_default(object, true) : baseKeysIn_default(object);
  }
  var keysIn_default;
  var init_keysIn = __esm({
    "node_modules/lodash-es/keysIn.js"() {
      init_arrayLikeKeys();
      init_baseKeysIn();
      init_isArrayLike();
      keysIn_default = keysIn;
    }
  });

  // node_modules/lodash-es/_nativeCreate.js
  var nativeCreate, nativeCreate_default;
  var init_nativeCreate = __esm({
    "node_modules/lodash-es/_nativeCreate.js"() {
      init_getNative();
      nativeCreate = getNative_default(Object, "create");
      nativeCreate_default = nativeCreate;
    }
  });

  // node_modules/lodash-es/_hashClear.js
  function hashClear() {
    this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
    this.size = 0;
  }
  var hashClear_default;
  var init_hashClear = __esm({
    "node_modules/lodash-es/_hashClear.js"() {
      init_nativeCreate();
      hashClear_default = hashClear;
    }
  });

  // node_modules/lodash-es/_hashDelete.js
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var hashDelete_default;
  var init_hashDelete = __esm({
    "node_modules/lodash-es/_hashDelete.js"() {
      hashDelete_default = hashDelete;
    }
  });

  // node_modules/lodash-es/_hashGet.js
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate_default) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty8.call(data, key) ? data[key] : void 0;
  }
  var HASH_UNDEFINED, objectProto10, hasOwnProperty8, hashGet_default;
  var init_hashGet = __esm({
    "node_modules/lodash-es/_hashGet.js"() {
      init_nativeCreate();
      HASH_UNDEFINED = "__lodash_hash_undefined__";
      objectProto10 = Object.prototype;
      hasOwnProperty8 = objectProto10.hasOwnProperty;
      hashGet_default = hashGet;
    }
  });

  // node_modules/lodash-es/_hashHas.js
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty9.call(data, key);
  }
  var objectProto11, hasOwnProperty9, hashHas_default;
  var init_hashHas = __esm({
    "node_modules/lodash-es/_hashHas.js"() {
      init_nativeCreate();
      objectProto11 = Object.prototype;
      hasOwnProperty9 = objectProto11.hasOwnProperty;
      hashHas_default = hashHas;
    }
  });

  // node_modules/lodash-es/_hashSet.js
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
    return this;
  }
  var HASH_UNDEFINED2, hashSet_default;
  var init_hashSet = __esm({
    "node_modules/lodash-es/_hashSet.js"() {
      init_nativeCreate();
      HASH_UNDEFINED2 = "__lodash_hash_undefined__";
      hashSet_default = hashSet;
    }
  });

  // node_modules/lodash-es/_Hash.js
  function Hash(entries) {
    var index = -1, length2 = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length2) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  var Hash_default;
  var init_Hash = __esm({
    "node_modules/lodash-es/_Hash.js"() {
      init_hashClear();
      init_hashDelete();
      init_hashGet();
      init_hashHas();
      init_hashSet();
      Hash.prototype.clear = hashClear_default;
      Hash.prototype["delete"] = hashDelete_default;
      Hash.prototype.get = hashGet_default;
      Hash.prototype.has = hashHas_default;
      Hash.prototype.set = hashSet_default;
      Hash_default = Hash;
    }
  });

  // node_modules/lodash-es/_listCacheClear.js
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  var listCacheClear_default;
  var init_listCacheClear = __esm({
    "node_modules/lodash-es/_listCacheClear.js"() {
      listCacheClear_default = listCacheClear;
    }
  });

  // node_modules/lodash-es/_assocIndexOf.js
  function assocIndexOf(array, key) {
    var length2 = array.length;
    while (length2--) {
      if (eq_default(array[length2][0], key)) {
        return length2;
      }
    }
    return -1;
  }
  var assocIndexOf_default;
  var init_assocIndexOf = __esm({
    "node_modules/lodash-es/_assocIndexOf.js"() {
      init_eq();
      assocIndexOf_default = assocIndexOf;
    }
  });

  // node_modules/lodash-es/_listCacheDelete.js
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  var arrayProto, splice, listCacheDelete_default;
  var init_listCacheDelete = __esm({
    "node_modules/lodash-es/_listCacheDelete.js"() {
      init_assocIndexOf();
      arrayProto = Array.prototype;
      splice = arrayProto.splice;
      listCacheDelete_default = listCacheDelete;
    }
  });

  // node_modules/lodash-es/_listCacheGet.js
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  var listCacheGet_default;
  var init_listCacheGet = __esm({
    "node_modules/lodash-es/_listCacheGet.js"() {
      init_assocIndexOf();
      listCacheGet_default = listCacheGet;
    }
  });

  // node_modules/lodash-es/_listCacheHas.js
  function listCacheHas(key) {
    return assocIndexOf_default(this.__data__, key) > -1;
  }
  var listCacheHas_default;
  var init_listCacheHas = __esm({
    "node_modules/lodash-es/_listCacheHas.js"() {
      init_assocIndexOf();
      listCacheHas_default = listCacheHas;
    }
  });

  // node_modules/lodash-es/_listCacheSet.js
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  var listCacheSet_default;
  var init_listCacheSet = __esm({
    "node_modules/lodash-es/_listCacheSet.js"() {
      init_assocIndexOf();
      listCacheSet_default = listCacheSet;
    }
  });

  // node_modules/lodash-es/_ListCache.js
  function ListCache(entries) {
    var index = -1, length2 = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length2) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  var ListCache_default;
  var init_ListCache = __esm({
    "node_modules/lodash-es/_ListCache.js"() {
      init_listCacheClear();
      init_listCacheDelete();
      init_listCacheGet();
      init_listCacheHas();
      init_listCacheSet();
      ListCache.prototype.clear = listCacheClear_default;
      ListCache.prototype["delete"] = listCacheDelete_default;
      ListCache.prototype.get = listCacheGet_default;
      ListCache.prototype.has = listCacheHas_default;
      ListCache.prototype.set = listCacheSet_default;
      ListCache_default = ListCache;
    }
  });

  // node_modules/lodash-es/_Map.js
  var Map2, Map_default;
  var init_Map = __esm({
    "node_modules/lodash-es/_Map.js"() {
      init_getNative();
      init_root();
      Map2 = getNative_default(root_default, "Map");
      Map_default = Map2;
    }
  });

  // node_modules/lodash-es/_mapCacheClear.js
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash_default(),
      "map": new (Map_default || ListCache_default)(),
      "string": new Hash_default()
    };
  }
  var mapCacheClear_default;
  var init_mapCacheClear = __esm({
    "node_modules/lodash-es/_mapCacheClear.js"() {
      init_Hash();
      init_ListCache();
      init_Map();
      mapCacheClear_default = mapCacheClear;
    }
  });

  // node_modules/lodash-es/_isKeyable.js
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  var isKeyable_default;
  var init_isKeyable = __esm({
    "node_modules/lodash-es/_isKeyable.js"() {
      isKeyable_default = isKeyable;
    }
  });

  // node_modules/lodash-es/_getMapData.js
  function getMapData(map3, key) {
    var data = map3.__data__;
    return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  var getMapData_default;
  var init_getMapData = __esm({
    "node_modules/lodash-es/_getMapData.js"() {
      init_isKeyable();
      getMapData_default = getMapData;
    }
  });

  // node_modules/lodash-es/_mapCacheDelete.js
  function mapCacheDelete(key) {
    var result = getMapData_default(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  var mapCacheDelete_default;
  var init_mapCacheDelete = __esm({
    "node_modules/lodash-es/_mapCacheDelete.js"() {
      init_getMapData();
      mapCacheDelete_default = mapCacheDelete;
    }
  });

  // node_modules/lodash-es/_mapCacheGet.js
  function mapCacheGet(key) {
    return getMapData_default(this, key).get(key);
  }
  var mapCacheGet_default;
  var init_mapCacheGet = __esm({
    "node_modules/lodash-es/_mapCacheGet.js"() {
      init_getMapData();
      mapCacheGet_default = mapCacheGet;
    }
  });

  // node_modules/lodash-es/_mapCacheHas.js
  function mapCacheHas(key) {
    return getMapData_default(this, key).has(key);
  }
  var mapCacheHas_default;
  var init_mapCacheHas = __esm({
    "node_modules/lodash-es/_mapCacheHas.js"() {
      init_getMapData();
      mapCacheHas_default = mapCacheHas;
    }
  });

  // node_modules/lodash-es/_mapCacheSet.js
  function mapCacheSet(key, value) {
    var data = getMapData_default(this, key), size2 = data.size;
    data.set(key, value);
    this.size += data.size == size2 ? 0 : 1;
    return this;
  }
  var mapCacheSet_default;
  var init_mapCacheSet = __esm({
    "node_modules/lodash-es/_mapCacheSet.js"() {
      init_getMapData();
      mapCacheSet_default = mapCacheSet;
    }
  });

  // node_modules/lodash-es/_MapCache.js
  function MapCache(entries) {
    var index = -1, length2 = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length2) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  var MapCache_default;
  var init_MapCache = __esm({
    "node_modules/lodash-es/_MapCache.js"() {
      init_mapCacheClear();
      init_mapCacheDelete();
      init_mapCacheGet();
      init_mapCacheHas();
      init_mapCacheSet();
      MapCache.prototype.clear = mapCacheClear_default;
      MapCache.prototype["delete"] = mapCacheDelete_default;
      MapCache.prototype.get = mapCacheGet_default;
      MapCache.prototype.has = mapCacheHas_default;
      MapCache.prototype.set = mapCacheSet_default;
      MapCache_default = MapCache;
    }
  });

  // node_modules/lodash-es/_arrayPush.js
  function arrayPush(array, values) {
    var index = -1, length2 = values.length, offset = array.length;
    while (++index < length2) {
      array[offset + index] = values[index];
    }
    return array;
  }
  var arrayPush_default;
  var init_arrayPush = __esm({
    "node_modules/lodash-es/_arrayPush.js"() {
      arrayPush_default = arrayPush;
    }
  });

  // node_modules/lodash-es/_getPrototype.js
  var getPrototype, getPrototype_default;
  var init_getPrototype = __esm({
    "node_modules/lodash-es/_getPrototype.js"() {
      init_overArg();
      getPrototype = overArg_default(Object.getPrototypeOf, Object);
      getPrototype_default = getPrototype;
    }
  });

  // node_modules/lodash-es/isPlainObject.js
  function isPlainObject(value) {
    if (!isObjectLike_default(value) || baseGetTag_default(value) != objectTag2) {
      return false;
    }
    var proto = getPrototype_default(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty10.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString3.call(Ctor) == objectCtorString;
  }
  var objectTag2, funcProto3, objectProto12, funcToString3, hasOwnProperty10, objectCtorString, isPlainObject_default;
  var init_isPlainObject = __esm({
    "node_modules/lodash-es/isPlainObject.js"() {
      init_baseGetTag();
      init_getPrototype();
      init_isObjectLike();
      objectTag2 = "[object Object]";
      funcProto3 = Function.prototype;
      objectProto12 = Object.prototype;
      funcToString3 = funcProto3.toString;
      hasOwnProperty10 = objectProto12.hasOwnProperty;
      objectCtorString = funcToString3.call(Object);
      isPlainObject_default = isPlainObject;
    }
  });

  // node_modules/lodash-es/_stackClear.js
  function stackClear() {
    this.__data__ = new ListCache_default();
    this.size = 0;
  }
  var stackClear_default;
  var init_stackClear = __esm({
    "node_modules/lodash-es/_stackClear.js"() {
      init_ListCache();
      stackClear_default = stackClear;
    }
  });

  // node_modules/lodash-es/_stackDelete.js
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  var stackDelete_default;
  var init_stackDelete = __esm({
    "node_modules/lodash-es/_stackDelete.js"() {
      stackDelete_default = stackDelete;
    }
  });

  // node_modules/lodash-es/_stackGet.js
  function stackGet(key) {
    return this.__data__.get(key);
  }
  var stackGet_default;
  var init_stackGet = __esm({
    "node_modules/lodash-es/_stackGet.js"() {
      stackGet_default = stackGet;
    }
  });

  // node_modules/lodash-es/_stackHas.js
  function stackHas(key) {
    return this.__data__.has(key);
  }
  var stackHas_default;
  var init_stackHas = __esm({
    "node_modules/lodash-es/_stackHas.js"() {
      stackHas_default = stackHas;
    }
  });

  // node_modules/lodash-es/_stackSet.js
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache_default) {
      var pairs = data.__data__;
      if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache_default(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  var LARGE_ARRAY_SIZE, stackSet_default;
  var init_stackSet = __esm({
    "node_modules/lodash-es/_stackSet.js"() {
      init_ListCache();
      init_Map();
      init_MapCache();
      LARGE_ARRAY_SIZE = 200;
      stackSet_default = stackSet;
    }
  });

  // node_modules/lodash-es/_Stack.js
  function Stack(entries) {
    var data = this.__data__ = new ListCache_default(entries);
    this.size = data.size;
  }
  var Stack_default;
  var init_Stack = __esm({
    "node_modules/lodash-es/_Stack.js"() {
      init_ListCache();
      init_stackClear();
      init_stackDelete();
      init_stackGet();
      init_stackHas();
      init_stackSet();
      Stack.prototype.clear = stackClear_default;
      Stack.prototype["delete"] = stackDelete_default;
      Stack.prototype.get = stackGet_default;
      Stack.prototype.has = stackHas_default;
      Stack.prototype.set = stackSet_default;
      Stack_default = Stack;
    }
  });

  // node_modules/lodash-es/_baseAssign.js
  function baseAssign(object, source) {
    return object && copyObject_default(source, keys_default(source), object);
  }
  var baseAssign_default;
  var init_baseAssign = __esm({
    "node_modules/lodash-es/_baseAssign.js"() {
      init_copyObject();
      init_keys();
      baseAssign_default = baseAssign;
    }
  });

  // node_modules/lodash-es/_baseAssignIn.js
  function baseAssignIn(object, source) {
    return object && copyObject_default(source, keysIn_default(source), object);
  }
  var baseAssignIn_default;
  var init_baseAssignIn = __esm({
    "node_modules/lodash-es/_baseAssignIn.js"() {
      init_copyObject();
      init_keysIn();
      baseAssignIn_default = baseAssignIn;
    }
  });

  // node_modules/lodash-es/_cloneBuffer.js
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length2 = buffer.length, result = allocUnsafe ? allocUnsafe(length2) : new buffer.constructor(length2);
    buffer.copy(result);
    return result;
  }
  var freeExports3, freeModule3, moduleExports3, Buffer3, allocUnsafe, cloneBuffer_default;
  var init_cloneBuffer = __esm({
    "node_modules/lodash-es/_cloneBuffer.js"() {
      init_root();
      freeExports3 = typeof exports == "object" && exports && !exports.nodeType && exports;
      freeModule3 = freeExports3 && typeof module == "object" && module && !module.nodeType && module;
      moduleExports3 = freeModule3 && freeModule3.exports === freeExports3;
      Buffer3 = moduleExports3 ? root_default.Buffer : void 0;
      allocUnsafe = Buffer3 ? Buffer3.allocUnsafe : void 0;
      cloneBuffer_default = cloneBuffer;
    }
  });

  // node_modules/lodash-es/_arrayFilter.js
  function arrayFilter(array, predicate) {
    var index = -1, length2 = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length2) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  var arrayFilter_default;
  var init_arrayFilter = __esm({
    "node_modules/lodash-es/_arrayFilter.js"() {
      arrayFilter_default = arrayFilter;
    }
  });

  // node_modules/lodash-es/stubArray.js
  function stubArray() {
    return [];
  }
  var stubArray_default;
  var init_stubArray = __esm({
    "node_modules/lodash-es/stubArray.js"() {
      stubArray_default = stubArray;
    }
  });

  // node_modules/lodash-es/_getSymbols.js
  var objectProto13, propertyIsEnumerable2, nativeGetSymbols, getSymbols, getSymbols_default;
  var init_getSymbols = __esm({
    "node_modules/lodash-es/_getSymbols.js"() {
      init_arrayFilter();
      init_stubArray();
      objectProto13 = Object.prototype;
      propertyIsEnumerable2 = objectProto13.propertyIsEnumerable;
      nativeGetSymbols = Object.getOwnPropertySymbols;
      getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
        if (object == null) {
          return [];
        }
        object = Object(object);
        return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable2.call(object, symbol);
        });
      };
      getSymbols_default = getSymbols;
    }
  });

  // node_modules/lodash-es/_copySymbols.js
  function copySymbols(source, object) {
    return copyObject_default(source, getSymbols_default(source), object);
  }
  var copySymbols_default;
  var init_copySymbols = __esm({
    "node_modules/lodash-es/_copySymbols.js"() {
      init_copyObject();
      init_getSymbols();
      copySymbols_default = copySymbols;
    }
  });

  // node_modules/lodash-es/_getSymbolsIn.js
  var nativeGetSymbols2, getSymbolsIn, getSymbolsIn_default;
  var init_getSymbolsIn = __esm({
    "node_modules/lodash-es/_getSymbolsIn.js"() {
      init_arrayPush();
      init_getPrototype();
      init_getSymbols();
      init_stubArray();
      nativeGetSymbols2 = Object.getOwnPropertySymbols;
      getSymbolsIn = !nativeGetSymbols2 ? stubArray_default : function(object) {
        var result = [];
        while (object) {
          arrayPush_default(result, getSymbols_default(object));
          object = getPrototype_default(object);
        }
        return result;
      };
      getSymbolsIn_default = getSymbolsIn;
    }
  });

  // node_modules/lodash-es/_copySymbolsIn.js
  function copySymbolsIn(source, object) {
    return copyObject_default(source, getSymbolsIn_default(source), object);
  }
  var copySymbolsIn_default;
  var init_copySymbolsIn = __esm({
    "node_modules/lodash-es/_copySymbolsIn.js"() {
      init_copyObject();
      init_getSymbolsIn();
      copySymbolsIn_default = copySymbolsIn;
    }
  });

  // node_modules/lodash-es/_baseGetAllKeys.js
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
  }
  var baseGetAllKeys_default;
  var init_baseGetAllKeys = __esm({
    "node_modules/lodash-es/_baseGetAllKeys.js"() {
      init_arrayPush();
      init_isArray();
      baseGetAllKeys_default = baseGetAllKeys;
    }
  });

  // node_modules/lodash-es/_getAllKeys.js
  function getAllKeys(object) {
    return baseGetAllKeys_default(object, keys_default, getSymbols_default);
  }
  var getAllKeys_default;
  var init_getAllKeys = __esm({
    "node_modules/lodash-es/_getAllKeys.js"() {
      init_baseGetAllKeys();
      init_getSymbols();
      init_keys();
      getAllKeys_default = getAllKeys;
    }
  });

  // node_modules/lodash-es/_getAllKeysIn.js
  function getAllKeysIn(object) {
    return baseGetAllKeys_default(object, keysIn_default, getSymbolsIn_default);
  }
  var getAllKeysIn_default;
  var init_getAllKeysIn = __esm({
    "node_modules/lodash-es/_getAllKeysIn.js"() {
      init_baseGetAllKeys();
      init_getSymbolsIn();
      init_keysIn();
      getAllKeysIn_default = getAllKeysIn;
    }
  });

  // node_modules/lodash-es/_DataView.js
  var DataView2, DataView_default;
  var init_DataView = __esm({
    "node_modules/lodash-es/_DataView.js"() {
      init_getNative();
      init_root();
      DataView2 = getNative_default(root_default, "DataView");
      DataView_default = DataView2;
    }
  });

  // node_modules/lodash-es/_Promise.js
  var Promise2, Promise_default;
  var init_Promise = __esm({
    "node_modules/lodash-es/_Promise.js"() {
      init_getNative();
      init_root();
      Promise2 = getNative_default(root_default, "Promise");
      Promise_default = Promise2;
    }
  });

  // node_modules/lodash-es/_Set.js
  var Set2, Set_default;
  var init_Set = __esm({
    "node_modules/lodash-es/_Set.js"() {
      init_getNative();
      init_root();
      Set2 = getNative_default(root_default, "Set");
      Set_default = Set2;
    }
  });

  // node_modules/lodash-es/_getTag.js
  var mapTag2, objectTag3, promiseTag, setTag2, weakMapTag2, dataViewTag2, dataViewCtorString, mapCtorString, promiseCtorString, setCtorString, weakMapCtorString, getTag, getTag_default;
  var init_getTag = __esm({
    "node_modules/lodash-es/_getTag.js"() {
      init_DataView();
      init_Map();
      init_Promise();
      init_Set();
      init_WeakMap();
      init_baseGetTag();
      init_toSource();
      mapTag2 = "[object Map]";
      objectTag3 = "[object Object]";
      promiseTag = "[object Promise]";
      setTag2 = "[object Set]";
      weakMapTag2 = "[object WeakMap]";
      dataViewTag2 = "[object DataView]";
      dataViewCtorString = toSource_default(DataView_default);
      mapCtorString = toSource_default(Map_default);
      promiseCtorString = toSource_default(Promise_default);
      setCtorString = toSource_default(Set_default);
      weakMapCtorString = toSource_default(WeakMap_default);
      getTag = baseGetTag_default;
      if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag2 || Map_default && getTag(new Map_default()) != mapTag2 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag2 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
        getTag = function(value) {
          var result = baseGetTag_default(value), Ctor = result == objectTag3 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag2;
              case mapCtorString:
                return mapTag2;
              case promiseCtorString:
                return promiseTag;
              case setCtorString:
                return setTag2;
              case weakMapCtorString:
                return weakMapTag2;
            }
          }
          return result;
        };
      }
      getTag_default = getTag;
    }
  });

  // node_modules/lodash-es/_initCloneArray.js
  function initCloneArray(array) {
    var length2 = array.length, result = new array.constructor(length2);
    if (length2 && typeof array[0] == "string" && hasOwnProperty11.call(array, "index")) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }
  var objectProto14, hasOwnProperty11, initCloneArray_default;
  var init_initCloneArray = __esm({
    "node_modules/lodash-es/_initCloneArray.js"() {
      objectProto14 = Object.prototype;
      hasOwnProperty11 = objectProto14.hasOwnProperty;
      initCloneArray_default = initCloneArray;
    }
  });

  // node_modules/lodash-es/_Uint8Array.js
  var Uint8Array2, Uint8Array_default;
  var init_Uint8Array = __esm({
    "node_modules/lodash-es/_Uint8Array.js"() {
      init_root();
      Uint8Array2 = root_default.Uint8Array;
      Uint8Array_default = Uint8Array2;
    }
  });

  // node_modules/lodash-es/_cloneArrayBuffer.js
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array_default(result).set(new Uint8Array_default(arrayBuffer));
    return result;
  }
  var cloneArrayBuffer_default;
  var init_cloneArrayBuffer = __esm({
    "node_modules/lodash-es/_cloneArrayBuffer.js"() {
      init_Uint8Array();
      cloneArrayBuffer_default = cloneArrayBuffer;
    }
  });

  // node_modules/lodash-es/_cloneDataView.js
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer_default(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  var cloneDataView_default;
  var init_cloneDataView = __esm({
    "node_modules/lodash-es/_cloneDataView.js"() {
      init_cloneArrayBuffer();
      cloneDataView_default = cloneDataView;
    }
  });

  // node_modules/lodash-es/_cloneRegExp.js
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  var reFlags, cloneRegExp_default;
  var init_cloneRegExp = __esm({
    "node_modules/lodash-es/_cloneRegExp.js"() {
      reFlags = /\w*$/;
      cloneRegExp_default = cloneRegExp;
    }
  });

  // node_modules/lodash-es/_cloneSymbol.js
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }
  var symbolProto, symbolValueOf, cloneSymbol_default;
  var init_cloneSymbol = __esm({
    "node_modules/lodash-es/_cloneSymbol.js"() {
      init_Symbol();
      symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
      symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
      cloneSymbol_default = cloneSymbol;
    }
  });

  // node_modules/lodash-es/_cloneTypedArray.js
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  var cloneTypedArray_default;
  var init_cloneTypedArray = __esm({
    "node_modules/lodash-es/_cloneTypedArray.js"() {
      init_cloneArrayBuffer();
      cloneTypedArray_default = cloneTypedArray;
    }
  });

  // node_modules/lodash-es/_initCloneByTag.js
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag2:
        return cloneArrayBuffer_default(object);
      case boolTag2:
      case dateTag2:
        return new Ctor(+object);
      case dataViewTag3:
        return cloneDataView_default(object, isDeep);
      case float32Tag2:
      case float64Tag2:
      case int8Tag2:
      case int16Tag2:
      case int32Tag2:
      case uint8Tag2:
      case uint8ClampedTag2:
      case uint16Tag2:
      case uint32Tag2:
        return cloneTypedArray_default(object, isDeep);
      case mapTag3:
        return new Ctor();
      case numberTag2:
      case stringTag2:
        return new Ctor(object);
      case regexpTag2:
        return cloneRegExp_default(object);
      case setTag3:
        return new Ctor();
      case symbolTag:
        return cloneSymbol_default(object);
    }
  }
  var boolTag2, dateTag2, mapTag3, numberTag2, regexpTag2, setTag3, stringTag2, symbolTag, arrayBufferTag2, dataViewTag3, float32Tag2, float64Tag2, int8Tag2, int16Tag2, int32Tag2, uint8Tag2, uint8ClampedTag2, uint16Tag2, uint32Tag2, initCloneByTag_default;
  var init_initCloneByTag = __esm({
    "node_modules/lodash-es/_initCloneByTag.js"() {
      init_cloneArrayBuffer();
      init_cloneDataView();
      init_cloneRegExp();
      init_cloneSymbol();
      init_cloneTypedArray();
      boolTag2 = "[object Boolean]";
      dateTag2 = "[object Date]";
      mapTag3 = "[object Map]";
      numberTag2 = "[object Number]";
      regexpTag2 = "[object RegExp]";
      setTag3 = "[object Set]";
      stringTag2 = "[object String]";
      symbolTag = "[object Symbol]";
      arrayBufferTag2 = "[object ArrayBuffer]";
      dataViewTag3 = "[object DataView]";
      float32Tag2 = "[object Float32Array]";
      float64Tag2 = "[object Float64Array]";
      int8Tag2 = "[object Int8Array]";
      int16Tag2 = "[object Int16Array]";
      int32Tag2 = "[object Int32Array]";
      uint8Tag2 = "[object Uint8Array]";
      uint8ClampedTag2 = "[object Uint8ClampedArray]";
      uint16Tag2 = "[object Uint16Array]";
      uint32Tag2 = "[object Uint32Array]";
      initCloneByTag_default = initCloneByTag;
    }
  });

  // node_modules/lodash-es/_initCloneObject.js
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype_default(object) ? baseCreate_default(getPrototype_default(object)) : {};
  }
  var initCloneObject_default;
  var init_initCloneObject = __esm({
    "node_modules/lodash-es/_initCloneObject.js"() {
      init_baseCreate();
      init_getPrototype();
      init_isPrototype();
      initCloneObject_default = initCloneObject;
    }
  });

  // node_modules/lodash-es/_baseIsMap.js
  function baseIsMap(value) {
    return isObjectLike_default(value) && getTag_default(value) == mapTag4;
  }
  var mapTag4, baseIsMap_default;
  var init_baseIsMap = __esm({
    "node_modules/lodash-es/_baseIsMap.js"() {
      init_getTag();
      init_isObjectLike();
      mapTag4 = "[object Map]";
      baseIsMap_default = baseIsMap;
    }
  });

  // node_modules/lodash-es/isMap.js
  var nodeIsMap, isMap, isMap_default;
  var init_isMap = __esm({
    "node_modules/lodash-es/isMap.js"() {
      init_baseIsMap();
      init_baseUnary();
      init_nodeUtil();
      nodeIsMap = nodeUtil_default && nodeUtil_default.isMap;
      isMap = nodeIsMap ? baseUnary_default(nodeIsMap) : baseIsMap_default;
      isMap_default = isMap;
    }
  });

  // node_modules/lodash-es/_baseIsSet.js
  function baseIsSet(value) {
    return isObjectLike_default(value) && getTag_default(value) == setTag4;
  }
  var setTag4, baseIsSet_default;
  var init_baseIsSet = __esm({
    "node_modules/lodash-es/_baseIsSet.js"() {
      init_getTag();
      init_isObjectLike();
      setTag4 = "[object Set]";
      baseIsSet_default = baseIsSet;
    }
  });

  // node_modules/lodash-es/isSet.js
  var nodeIsSet, isSet, isSet_default;
  var init_isSet = __esm({
    "node_modules/lodash-es/isSet.js"() {
      init_baseIsSet();
      init_baseUnary();
      init_nodeUtil();
      nodeIsSet = nodeUtil_default && nodeUtil_default.isSet;
      isSet = nodeIsSet ? baseUnary_default(nodeIsSet) : baseIsSet_default;
      isSet_default = isSet;
    }
  });

  // node_modules/lodash-es/_baseClone.js
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== void 0) {
      return result;
    }
    if (!isObject_default(value)) {
      return value;
    }
    var isArr = isArray_default(value);
    if (isArr) {
      result = initCloneArray_default(value);
      if (!isDeep) {
        return copyArray_default(value, result);
      }
    } else {
      var tag = getTag_default(value), isFunc = tag == funcTag3 || tag == genTag2;
      if (isBuffer_default(value)) {
        return cloneBuffer_default(value, isDeep);
      }
      if (tag == objectTag4 || tag == argsTag3 || isFunc && !object) {
        result = isFlat || isFunc ? {} : initCloneObject_default(value);
        if (!isDeep) {
          return isFlat ? copySymbolsIn_default(value, baseAssignIn_default(result, value)) : copySymbols_default(value, baseAssign_default(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag_default(value, tag, isDeep);
      }
    }
    stack || (stack = new Stack_default());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);
    if (isSet_default(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap_default(value)) {
      value.forEach(function(subValue, key2) {
        result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
      });
    }
    var keysFunc = isFull ? isFlat ? getAllKeysIn_default : getAllKeys_default : isFlat ? keysIn_default : keys_default;
    var props = isArr ? void 0 : keysFunc(value);
    arrayEach_default(props || value, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value[key2];
      }
      assignValue_default(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
    return result;
  }
  var CLONE_DEEP_FLAG, CLONE_FLAT_FLAG, CLONE_SYMBOLS_FLAG, argsTag3, arrayTag2, boolTag3, dateTag3, errorTag2, funcTag3, genTag2, mapTag5, numberTag3, objectTag4, regexpTag3, setTag5, stringTag3, symbolTag2, weakMapTag3, arrayBufferTag3, dataViewTag4, float32Tag3, float64Tag3, int8Tag3, int16Tag3, int32Tag3, uint8Tag3, uint8ClampedTag3, uint16Tag3, uint32Tag3, cloneableTags, baseClone_default;
  var init_baseClone = __esm({
    "node_modules/lodash-es/_baseClone.js"() {
      init_Stack();
      init_arrayEach();
      init_assignValue();
      init_baseAssign();
      init_baseAssignIn();
      init_cloneBuffer();
      init_copyArray();
      init_copySymbols();
      init_copySymbolsIn();
      init_getAllKeys();
      init_getAllKeysIn();
      init_getTag();
      init_initCloneArray();
      init_initCloneByTag();
      init_initCloneObject();
      init_isArray();
      init_isBuffer();
      init_isMap();
      init_isObject();
      init_isSet();
      init_keys();
      init_keysIn();
      CLONE_DEEP_FLAG = 1;
      CLONE_FLAT_FLAG = 2;
      CLONE_SYMBOLS_FLAG = 4;
      argsTag3 = "[object Arguments]";
      arrayTag2 = "[object Array]";
      boolTag3 = "[object Boolean]";
      dateTag3 = "[object Date]";
      errorTag2 = "[object Error]";
      funcTag3 = "[object Function]";
      genTag2 = "[object GeneratorFunction]";
      mapTag5 = "[object Map]";
      numberTag3 = "[object Number]";
      objectTag4 = "[object Object]";
      regexpTag3 = "[object RegExp]";
      setTag5 = "[object Set]";
      stringTag3 = "[object String]";
      symbolTag2 = "[object Symbol]";
      weakMapTag3 = "[object WeakMap]";
      arrayBufferTag3 = "[object ArrayBuffer]";
      dataViewTag4 = "[object DataView]";
      float32Tag3 = "[object Float32Array]";
      float64Tag3 = "[object Float64Array]";
      int8Tag3 = "[object Int8Array]";
      int16Tag3 = "[object Int16Array]";
      int32Tag3 = "[object Int32Array]";
      uint8Tag3 = "[object Uint8Array]";
      uint8ClampedTag3 = "[object Uint8ClampedArray]";
      uint16Tag3 = "[object Uint16Array]";
      uint32Tag3 = "[object Uint32Array]";
      cloneableTags = {};
      cloneableTags[argsTag3] = cloneableTags[arrayTag2] = cloneableTags[arrayBufferTag3] = cloneableTags[dataViewTag4] = cloneableTags[boolTag3] = cloneableTags[dateTag3] = cloneableTags[float32Tag3] = cloneableTags[float64Tag3] = cloneableTags[int8Tag3] = cloneableTags[int16Tag3] = cloneableTags[int32Tag3] = cloneableTags[mapTag5] = cloneableTags[numberTag3] = cloneableTags[objectTag4] = cloneableTags[regexpTag3] = cloneableTags[setTag5] = cloneableTags[stringTag3] = cloneableTags[symbolTag2] = cloneableTags[uint8Tag3] = cloneableTags[uint8ClampedTag3] = cloneableTags[uint16Tag3] = cloneableTags[uint32Tag3] = true;
      cloneableTags[errorTag2] = cloneableTags[funcTag3] = cloneableTags[weakMapTag3] = false;
      baseClone_default = baseClone;
    }
  });

  // node_modules/lodash-es/cloneDeep.js
  function cloneDeep(value) {
    return baseClone_default(value, CLONE_DEEP_FLAG2 | CLONE_SYMBOLS_FLAG2);
  }
  var CLONE_DEEP_FLAG2, CLONE_SYMBOLS_FLAG2, cloneDeep_default;
  var init_cloneDeep = __esm({
    "node_modules/lodash-es/cloneDeep.js"() {
      init_baseClone();
      CLONE_DEEP_FLAG2 = 1;
      CLONE_SYMBOLS_FLAG2 = 4;
      cloneDeep_default = cloneDeep;
    }
  });

  // node_modules/lodash-es/_setCacheAdd.js
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED3);
    return this;
  }
  var HASH_UNDEFINED3, setCacheAdd_default;
  var init_setCacheAdd = __esm({
    "node_modules/lodash-es/_setCacheAdd.js"() {
      HASH_UNDEFINED3 = "__lodash_hash_undefined__";
      setCacheAdd_default = setCacheAdd;
    }
  });

  // node_modules/lodash-es/_setCacheHas.js
  function setCacheHas(value) {
    return this.__data__.has(value);
  }
  var setCacheHas_default;
  var init_setCacheHas = __esm({
    "node_modules/lodash-es/_setCacheHas.js"() {
      setCacheHas_default = setCacheHas;
    }
  });

  // node_modules/lodash-es/_SetCache.js
  function SetCache(values) {
    var index = -1, length2 = values == null ? 0 : values.length;
    this.__data__ = new MapCache_default();
    while (++index < length2) {
      this.add(values[index]);
    }
  }
  var SetCache_default;
  var init_SetCache = __esm({
    "node_modules/lodash-es/_SetCache.js"() {
      init_MapCache();
      init_setCacheAdd();
      init_setCacheHas();
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd_default;
      SetCache.prototype.has = setCacheHas_default;
      SetCache_default = SetCache;
    }
  });

  // node_modules/lodash-es/_arraySome.js
  function arraySome(array, predicate) {
    var index = -1, length2 = array == null ? 0 : array.length;
    while (++index < length2) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }
  var arraySome_default;
  var init_arraySome = __esm({
    "node_modules/lodash-es/_arraySome.js"() {
      arraySome_default = arraySome;
    }
  });

  // node_modules/lodash-es/_cacheHas.js
  function cacheHas(cache, key) {
    return cache.has(key);
  }
  var cacheHas_default;
  var init_cacheHas = __esm({
    "node_modules/lodash-es/_cacheHas.js"() {
      cacheHas_default = cacheHas;
    }
  });

  // node_modules/lodash-es/_equalArrays.js
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache_default() : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while (++index < arrLength) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome_default(other, function(othValue2, othIndex) {
          if (!cacheHas_default(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
  }
  var COMPARE_PARTIAL_FLAG, COMPARE_UNORDERED_FLAG, equalArrays_default;
  var init_equalArrays = __esm({
    "node_modules/lodash-es/_equalArrays.js"() {
      init_SetCache();
      init_arraySome();
      init_cacheHas();
      COMPARE_PARTIAL_FLAG = 1;
      COMPARE_UNORDERED_FLAG = 2;
      equalArrays_default = equalArrays;
    }
  });

  // node_modules/lodash-es/_mapToArray.js
  function mapToArray(map3) {
    var index = -1, result = Array(map3.size);
    map3.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  var mapToArray_default;
  var init_mapToArray = __esm({
    "node_modules/lodash-es/_mapToArray.js"() {
      mapToArray_default = mapToArray;
    }
  });

  // node_modules/lodash-es/_setToArray.js
  function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  var setToArray_default;
  var init_setToArray = __esm({
    "node_modules/lodash-es/_setToArray.js"() {
      setToArray_default = setToArray;
    }
  });

  // node_modules/lodash-es/_equalByTag.js
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag5:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag4:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array_default(object), new Uint8Array_default(other))) {
          return false;
        }
        return true;
      case boolTag4:
      case dateTag4:
      case numberTag4:
        return eq_default(+object, +other);
      case errorTag3:
        return object.name == other.name && object.message == other.message;
      case regexpTag4:
      case stringTag4:
        return object == other + "";
      case mapTag6:
        var convert = mapToArray_default;
      case setTag6:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
        convert || (convert = setToArray_default);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG2;
        stack.set(object, other);
        var result = equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object);
        return result;
      case symbolTag3:
        if (symbolValueOf2) {
          return symbolValueOf2.call(object) == symbolValueOf2.call(other);
        }
    }
    return false;
  }
  var COMPARE_PARTIAL_FLAG2, COMPARE_UNORDERED_FLAG2, boolTag4, dateTag4, errorTag3, mapTag6, numberTag4, regexpTag4, setTag6, stringTag4, symbolTag3, arrayBufferTag4, dataViewTag5, symbolProto2, symbolValueOf2, equalByTag_default;
  var init_equalByTag = __esm({
    "node_modules/lodash-es/_equalByTag.js"() {
      init_Symbol();
      init_Uint8Array();
      init_eq();
      init_equalArrays();
      init_mapToArray();
      init_setToArray();
      COMPARE_PARTIAL_FLAG2 = 1;
      COMPARE_UNORDERED_FLAG2 = 2;
      boolTag4 = "[object Boolean]";
      dateTag4 = "[object Date]";
      errorTag3 = "[object Error]";
      mapTag6 = "[object Map]";
      numberTag4 = "[object Number]";
      regexpTag4 = "[object RegExp]";
      setTag6 = "[object Set]";
      stringTag4 = "[object String]";
      symbolTag3 = "[object Symbol]";
      arrayBufferTag4 = "[object ArrayBuffer]";
      dataViewTag5 = "[object DataView]";
      symbolProto2 = Symbol_default ? Symbol_default.prototype : void 0;
      symbolValueOf2 = symbolProto2 ? symbolProto2.valueOf : void 0;
      equalByTag_default = equalByTag;
    }
  });

  // node_modules/lodash-es/_equalObjects.js
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG3, objProps = getAllKeys_default(object), objLength = objProps.length, othProps = getAllKeys_default(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty12.call(other, key))) {
        return false;
      }
    }
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
  }
  var COMPARE_PARTIAL_FLAG3, objectProto15, hasOwnProperty12, equalObjects_default;
  var init_equalObjects = __esm({
    "node_modules/lodash-es/_equalObjects.js"() {
      init_getAllKeys();
      COMPARE_PARTIAL_FLAG3 = 1;
      objectProto15 = Object.prototype;
      hasOwnProperty12 = objectProto15.hasOwnProperty;
      equalObjects_default = equalObjects;
    }
  });

  // node_modules/lodash-es/_baseIsEqualDeep.js
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag3 : getTag_default(object), othTag = othIsArr ? arrayTag3 : getTag_default(other);
    objTag = objTag == argsTag4 ? objectTag5 : objTag;
    othTag = othTag == argsTag4 ? objectTag5 : othTag;
    var objIsObj = objTag == objectTag5, othIsObj = othTag == objectTag5, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer_default(object)) {
      if (!isBuffer_default(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack_default());
      return objIsArr || isTypedArray_default(object) ? equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG4)) {
      var objIsWrapped = objIsObj && hasOwnProperty13.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty13.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack_default());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack_default());
    return equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
  }
  var COMPARE_PARTIAL_FLAG4, argsTag4, arrayTag3, objectTag5, objectProto16, hasOwnProperty13, baseIsEqualDeep_default;
  var init_baseIsEqualDeep = __esm({
    "node_modules/lodash-es/_baseIsEqualDeep.js"() {
      init_Stack();
      init_equalArrays();
      init_equalByTag();
      init_equalObjects();
      init_getTag();
      init_isArray();
      init_isBuffer();
      init_isTypedArray();
      COMPARE_PARTIAL_FLAG4 = 1;
      argsTag4 = "[object Arguments]";
      arrayTag3 = "[object Array]";
      objectTag5 = "[object Object]";
      objectProto16 = Object.prototype;
      hasOwnProperty13 = objectProto16.hasOwnProperty;
      baseIsEqualDeep_default = baseIsEqualDeep;
    }
  });

  // node_modules/lodash-es/_baseIsEqual.js
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
  }
  var baseIsEqual_default;
  var init_baseIsEqual = __esm({
    "node_modules/lodash-es/_baseIsEqual.js"() {
      init_baseIsEqualDeep();
      init_isObjectLike();
      baseIsEqual_default = baseIsEqual;
    }
  });

  // node_modules/lodash-es/_createBaseFor.js
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1, iterable = Object(object), props = keysFunc(object), length2 = props.length;
      while (length2--) {
        var key = props[fromRight ? length2 : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }
  var createBaseFor_default;
  var init_createBaseFor = __esm({
    "node_modules/lodash-es/_createBaseFor.js"() {
      createBaseFor_default = createBaseFor;
    }
  });

  // node_modules/lodash-es/_baseFor.js
  var baseFor, baseFor_default;
  var init_baseFor = __esm({
    "node_modules/lodash-es/_baseFor.js"() {
      init_createBaseFor();
      baseFor = createBaseFor_default();
      baseFor_default = baseFor;
    }
  });

  // node_modules/lodash-es/_assignMergeValue.js
  function assignMergeValue(object, key, value) {
    if (value !== void 0 && !eq_default(object[key], value) || value === void 0 && !(key in object)) {
      baseAssignValue_default(object, key, value);
    }
  }
  var assignMergeValue_default;
  var init_assignMergeValue = __esm({
    "node_modules/lodash-es/_assignMergeValue.js"() {
      init_baseAssignValue();
      init_eq();
      assignMergeValue_default = assignMergeValue;
    }
  });

  // node_modules/lodash-es/isArrayLikeObject.js
  function isArrayLikeObject(value) {
    return isObjectLike_default(value) && isArrayLike_default(value);
  }
  var isArrayLikeObject_default;
  var init_isArrayLikeObject = __esm({
    "node_modules/lodash-es/isArrayLikeObject.js"() {
      init_isArrayLike();
      init_isObjectLike();
      isArrayLikeObject_default = isArrayLikeObject;
    }
  });

  // node_modules/lodash-es/_safeGet.js
  function safeGet(object, key) {
    if (key === "constructor" && typeof object[key] === "function") {
      return;
    }
    if (key == "__proto__") {
      return;
    }
    return object[key];
  }
  var safeGet_default;
  var init_safeGet = __esm({
    "node_modules/lodash-es/_safeGet.js"() {
      safeGet_default = safeGet;
    }
  });

  // node_modules/lodash-es/toPlainObject.js
  function toPlainObject(value) {
    return copyObject_default(value, keysIn_default(value));
  }
  var toPlainObject_default;
  var init_toPlainObject = __esm({
    "node_modules/lodash-es/toPlainObject.js"() {
      init_copyObject();
      init_keysIn();
      toPlainObject_default = toPlainObject;
    }
  });

  // node_modules/lodash-es/_baseMergeDeep.js
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet_default(object, key), srcValue = safeGet_default(source, key), stacked = stack.get(srcValue);
    if (stacked) {
      assignMergeValue_default(object, key, stacked);
      return;
    }
    var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
    var isCommon = newValue === void 0;
    if (isCommon) {
      var isArr = isArray_default(srcValue), isBuff = !isArr && isBuffer_default(srcValue), isTyped = !isArr && !isBuff && isTypedArray_default(srcValue);
      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray_default(objValue)) {
          newValue = objValue;
        } else if (isArrayLikeObject_default(objValue)) {
          newValue = copyArray_default(objValue);
        } else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer_default(srcValue, true);
        } else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray_default(srcValue, true);
        } else {
          newValue = [];
        }
      } else if (isPlainObject_default(srcValue) || isArguments_default(srcValue)) {
        newValue = objValue;
        if (isArguments_default(objValue)) {
          newValue = toPlainObject_default(objValue);
        } else if (!isObject_default(objValue) || isFunction_default(objValue)) {
          newValue = initCloneObject_default(srcValue);
        }
      } else {
        isCommon = false;
      }
    }
    if (isCommon) {
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack["delete"](srcValue);
    }
    assignMergeValue_default(object, key, newValue);
  }
  var baseMergeDeep_default;
  var init_baseMergeDeep = __esm({
    "node_modules/lodash-es/_baseMergeDeep.js"() {
      init_assignMergeValue();
      init_cloneBuffer();
      init_cloneTypedArray();
      init_copyArray();
      init_initCloneObject();
      init_isArguments();
      init_isArray();
      init_isArrayLikeObject();
      init_isBuffer();
      init_isFunction();
      init_isObject();
      init_isPlainObject();
      init_isTypedArray();
      init_safeGet();
      init_toPlainObject();
      baseMergeDeep_default = baseMergeDeep;
    }
  });

  // node_modules/lodash-es/_baseMerge.js
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    baseFor_default(source, function(srcValue, key) {
      stack || (stack = new Stack_default());
      if (isObject_default(srcValue)) {
        baseMergeDeep_default(object, source, key, srcIndex, baseMerge, customizer, stack);
      } else {
        var newValue = customizer ? customizer(safeGet_default(object, key), srcValue, key + "", object, source, stack) : void 0;
        if (newValue === void 0) {
          newValue = srcValue;
        }
        assignMergeValue_default(object, key, newValue);
      }
    }, keysIn_default);
  }
  var baseMerge_default;
  var init_baseMerge = __esm({
    "node_modules/lodash-es/_baseMerge.js"() {
      init_Stack();
      init_assignMergeValue();
      init_baseFor();
      init_baseMergeDeep();
      init_isObject();
      init_keysIn();
      init_safeGet();
      baseMerge_default = baseMerge;
    }
  });

  // node_modules/lodash-es/isEqual.js
  function isEqual(value, other) {
    return baseIsEqual_default(value, other);
  }
  var isEqual_default;
  var init_isEqual = __esm({
    "node_modules/lodash-es/isEqual.js"() {
      init_baseIsEqual();
      isEqual_default = isEqual;
    }
  });

  // node_modules/lodash-es/merge.js
  var merge, merge_default;
  var init_merge = __esm({
    "node_modules/lodash-es/merge.js"() {
      init_baseMerge();
      init_createAssigner();
      merge = createAssigner_default(function(object, source, srcIndex) {
        baseMerge_default(object, source, srcIndex);
      });
      merge_default = merge;
    }
  });

  // node_modules/lodash-es/lodash.js
  var init_lodash = __esm({
    "node_modules/lodash-es/lodash.js"() {
      init_cloneDeep();
      init_isEqual();
      init_merge();
    }
  });

  // node_modules/parchment/dist/parchment.js
  var parchment_exports = {};
  __export(parchment_exports, {
    Attributor: () => Attributor,
    AttributorStore: () => AttributorStore$1,
    BlockBlot: () => BlockBlot$1,
    ClassAttributor: () => ClassAttributor$1,
    ContainerBlot: () => ContainerBlot$1,
    EmbedBlot: () => EmbedBlot$1,
    InlineBlot: () => InlineBlot$1,
    LeafBlot: () => LeafBlot$1,
    ParentBlot: () => ParentBlot$1,
    Registry: () => Registry,
    Scope: () => Scope,
    ScrollBlot: () => ScrollBlot$1,
    StyleAttributor: () => StyleAttributor$1,
    TextBlot: () => TextBlot$1
  });
  function match2(node, prefix) {
    return (node.getAttribute("class") || "").split(/\s+/).filter((name) => name.indexOf(`${prefix}-`) === 0);
  }
  function camelize(name) {
    const parts = name.split("-"), rest = parts.slice(1).map((part) => part[0].toUpperCase() + part.slice(1)).join("");
    return parts[0] + rest;
  }
  function makeAttachedBlot(node, scroll) {
    const found = scroll.find(node);
    if (found)
      return found;
    try {
      return scroll.create(node);
    } catch {
      const blot = scroll.create(Scope.INLINE);
      return Array.from(node.childNodes).forEach((child) => {
        blot.domNode.appendChild(child);
      }), node.parentNode && node.parentNode.replaceChild(blot.domNode, node), blot.attach(), blot;
    }
  }
  function isEqual2(obj1, obj2) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length)
      return false;
    for (const prop in obj1)
      if (obj1[prop] !== obj2[prop])
        return false;
    return true;
  }
  var Scope, Attributor, ParchmentError, _Registry, Registry, ClassAttributor, ClassAttributor$1, StyleAttributor, StyleAttributor$1, AttributorStore, AttributorStore$1, _ShadowBlot, ShadowBlot, _LeafBlot, LeafBlot, LeafBlot$1, LinkedList, _ParentBlot, ParentBlot, ParentBlot$1, _InlineBlot, InlineBlot, InlineBlot$1, _BlockBlot, BlockBlot, BlockBlot$1, _ContainerBlot, ContainerBlot, ContainerBlot$1, EmbedBlot, EmbedBlot$1, OBSERVER_CONFIG, MAX_OPTIMIZE_ITERATIONS, _ScrollBlot, ScrollBlot, ScrollBlot$1, _TextBlot, TextBlot, TextBlot$1;
  var init_parchment = __esm({
    "node_modules/parchment/dist/parchment.js"() {
      Scope = /* @__PURE__ */ ((Scope2) => (Scope2[Scope2.TYPE = 3] = "TYPE", Scope2[Scope2.LEVEL = 12] = "LEVEL", Scope2[Scope2.ATTRIBUTE = 13] = "ATTRIBUTE", Scope2[Scope2.BLOT = 14] = "BLOT", Scope2[Scope2.INLINE = 7] = "INLINE", Scope2[Scope2.BLOCK = 11] = "BLOCK", Scope2[Scope2.BLOCK_BLOT = 10] = "BLOCK_BLOT", Scope2[Scope2.INLINE_BLOT = 6] = "INLINE_BLOT", Scope2[Scope2.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", Scope2[Scope2.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", Scope2[Scope2.ANY = 15] = "ANY", Scope2))(Scope || {});
      Attributor = class {
        constructor(attrName, keyName, options = {}) {
          this.attrName = attrName, this.keyName = keyName;
          const attributeBit = Scope.TYPE & Scope.ATTRIBUTE;
          this.scope = options.scope != null ? (
            // Ignore type bits, force attribute bit
            options.scope & Scope.LEVEL | attributeBit
          ) : Scope.ATTRIBUTE, options.whitelist != null && (this.whitelist = options.whitelist);
        }
        static keys(node) {
          return Array.from(node.attributes).map((item) => item.name);
        }
        add(node, value) {
          return this.canAdd(node, value) ? (node.setAttribute(this.keyName, value), true) : false;
        }
        canAdd(_node, value) {
          return this.whitelist == null ? true : typeof value == "string" ? this.whitelist.indexOf(value.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(value) > -1;
        }
        remove(node) {
          node.removeAttribute(this.keyName);
        }
        value(node) {
          const value = node.getAttribute(this.keyName);
          return this.canAdd(node, value) && value ? value : "";
        }
      };
      ParchmentError = class extends Error {
        constructor(message) {
          message = "[Parchment] " + message, super(message), this.message = message, this.name = this.constructor.name;
        }
      };
      _Registry = class _Registry2 {
        constructor() {
          this.attributes = {}, this.classes = {}, this.tags = {}, this.types = {};
        }
        static find(node, bubble = false) {
          if (node == null)
            return null;
          if (this.blots.has(node))
            return this.blots.get(node) || null;
          if (bubble) {
            let parentNode = null;
            try {
              parentNode = node.parentNode;
            } catch {
              return null;
            }
            return this.find(parentNode, bubble);
          }
          return null;
        }
        create(scroll, input, value) {
          const match22 = this.query(input);
          if (match22 == null)
            throw new ParchmentError(`Unable to create ${input} blot`);
          const blotClass = match22, node = (
            // @ts-expect-error Fix me later
            input instanceof Node || input.nodeType === Node.TEXT_NODE ? input : blotClass.create(value)
          ), blot = new blotClass(scroll, node, value);
          return _Registry2.blots.set(blot.domNode, blot), blot;
        }
        find(node, bubble = false) {
          return _Registry2.find(node, bubble);
        }
        query(query, scope = Scope.ANY) {
          let match22;
          return typeof query == "string" ? match22 = this.types[query] || this.attributes[query] : query instanceof Text || query.nodeType === Node.TEXT_NODE ? match22 = this.types.text : typeof query == "number" ? query & Scope.LEVEL & Scope.BLOCK ? match22 = this.types.block : query & Scope.LEVEL & Scope.INLINE && (match22 = this.types.inline) : query instanceof Element && ((query.getAttribute("class") || "").split(/\s+/).some((name) => (match22 = this.classes[name], !!match22)), match22 = match22 || this.tags[query.tagName]), match22 == null ? null : "scope" in match22 && scope & Scope.LEVEL & match22.scope && scope & Scope.TYPE & match22.scope ? match22 : null;
        }
        register(...definitions) {
          return definitions.map((definition) => {
            const isBlot = "blotName" in definition, isAttr = "attrName" in definition;
            if (!isBlot && !isAttr)
              throw new ParchmentError("Invalid definition");
            if (isBlot && definition.blotName === "abstract")
              throw new ParchmentError("Cannot register abstract class");
            const key = isBlot ? definition.blotName : isAttr ? definition.attrName : void 0;
            return this.types[key] = definition, isAttr ? typeof definition.keyName == "string" && (this.attributes[definition.keyName] = definition) : isBlot && (definition.className && (this.classes[definition.className] = definition), definition.tagName && (Array.isArray(definition.tagName) ? definition.tagName = definition.tagName.map((tagName) => tagName.toUpperCase()) : definition.tagName = definition.tagName.toUpperCase(), (Array.isArray(definition.tagName) ? definition.tagName : [definition.tagName]).forEach((tag) => {
              (this.tags[tag] == null || definition.className == null) && (this.tags[tag] = definition);
            }))), definition;
          });
        }
      };
      _Registry.blots = /* @__PURE__ */ new WeakMap();
      Registry = _Registry;
      ClassAttributor = class extends Attributor {
        static keys(node) {
          return (node.getAttribute("class") || "").split(/\s+/).map((name) => name.split("-").slice(0, -1).join("-"));
        }
        add(node, value) {
          return this.canAdd(node, value) ? (this.remove(node), node.classList.add(`${this.keyName}-${value}`), true) : false;
        }
        remove(node) {
          match2(node, this.keyName).forEach((name) => {
            node.classList.remove(name);
          }), node.classList.length === 0 && node.removeAttribute("class");
        }
        value(node) {
          const value = (match2(node, this.keyName)[0] || "").slice(this.keyName.length + 1);
          return this.canAdd(node, value) ? value : "";
        }
      };
      ClassAttributor$1 = ClassAttributor;
      StyleAttributor = class extends Attributor {
        static keys(node) {
          return (node.getAttribute("style") || "").split(";").map((value) => value.split(":")[0].trim());
        }
        add(node, value) {
          return this.canAdd(node, value) ? (node.style[camelize(this.keyName)] = value, true) : false;
        }
        remove(node) {
          node.style[camelize(this.keyName)] = "", node.getAttribute("style") || node.removeAttribute("style");
        }
        value(node) {
          const value = node.style[camelize(this.keyName)];
          return this.canAdd(node, value) ? value : "";
        }
      };
      StyleAttributor$1 = StyleAttributor;
      AttributorStore = class {
        constructor(domNode) {
          this.attributes = {}, this.domNode = domNode, this.build();
        }
        attribute(attribute, value) {
          value ? attribute.add(this.domNode, value) && (attribute.value(this.domNode) != null ? this.attributes[attribute.attrName] = attribute : delete this.attributes[attribute.attrName]) : (attribute.remove(this.domNode), delete this.attributes[attribute.attrName]);
        }
        build() {
          this.attributes = {};
          const blot = Registry.find(this.domNode);
          if (blot == null)
            return;
          const attributes = Attributor.keys(this.domNode), classes = ClassAttributor$1.keys(this.domNode), styles = StyleAttributor$1.keys(this.domNode);
          attributes.concat(classes).concat(styles).forEach((name) => {
            const attr = blot.scroll.query(name, Scope.ATTRIBUTE);
            attr instanceof Attributor && (this.attributes[attr.attrName] = attr);
          });
        }
        copy(target) {
          Object.keys(this.attributes).forEach((key) => {
            const value = this.attributes[key].value(this.domNode);
            target.format(key, value);
          });
        }
        move(target) {
          this.copy(target), Object.keys(this.attributes).forEach((key) => {
            this.attributes[key].remove(this.domNode);
          }), this.attributes = {};
        }
        values() {
          return Object.keys(this.attributes).reduce(
            (attributes, name) => (attributes[name] = this.attributes[name].value(this.domNode), attributes),
            {}
          );
        }
      };
      AttributorStore$1 = AttributorStore;
      _ShadowBlot = class _ShadowBlot2 {
        constructor(scroll, domNode) {
          this.scroll = scroll, this.domNode = domNode, Registry.blots.set(domNode, this), this.prev = null, this.next = null;
        }
        static create(rawValue) {
          if (this.tagName == null)
            throw new ParchmentError("Blot definition missing tagName");
          let node, value;
          return Array.isArray(this.tagName) ? (typeof rawValue == "string" ? (value = rawValue.toUpperCase(), parseInt(value, 10).toString() === value && (value = parseInt(value, 10))) : typeof rawValue == "number" && (value = rawValue), typeof value == "number" ? node = document.createElement(this.tagName[value - 1]) : value && this.tagName.indexOf(value) > -1 ? node = document.createElement(value) : node = document.createElement(this.tagName[0])) : node = document.createElement(this.tagName), this.className && node.classList.add(this.className), node;
        }
        // Hack for accessing inherited static methods
        get statics() {
          return this.constructor;
        }
        attach() {
        }
        clone() {
          const domNode = this.domNode.cloneNode(false);
          return this.scroll.create(domNode);
        }
        detach() {
          this.parent != null && this.parent.removeChild(this), Registry.blots.delete(this.domNode);
        }
        deleteAt(index, length2) {
          this.isolate(index, length2).remove();
        }
        formatAt(index, length2, name, value) {
          const blot = this.isolate(index, length2);
          if (this.scroll.query(name, Scope.BLOT) != null && value)
            blot.wrap(name, value);
          else if (this.scroll.query(name, Scope.ATTRIBUTE) != null) {
            const parent = this.scroll.create(this.statics.scope);
            blot.wrap(parent), parent.format(name, value);
          }
        }
        insertAt(index, value, def) {
          const blot = def == null ? this.scroll.create("text", value) : this.scroll.create(value, def), ref = this.split(index);
          this.parent.insertBefore(blot, ref || void 0);
        }
        isolate(index, length2) {
          const target = this.split(index);
          if (target == null)
            throw new Error("Attempt to isolate at end");
          return target.split(length2), target;
        }
        length() {
          return 1;
        }
        offset(root2 = this.parent) {
          return this.parent == null || this === root2 ? 0 : this.parent.children.offset(this) + this.parent.offset(root2);
        }
        optimize(_context) {
          this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer) && this.wrap(this.statics.requiredContainer.blotName);
        }
        remove() {
          this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
        }
        replaceWith(name, value) {
          const replacement = typeof name == "string" ? this.scroll.create(name, value) : name;
          return this.parent != null && (this.parent.insertBefore(replacement, this.next || void 0), this.remove()), replacement;
        }
        split(index, _force) {
          return index === 0 ? this : this.next;
        }
        update(_mutations, _context) {
        }
        wrap(name, value) {
          const wrapper = typeof name == "string" ? this.scroll.create(name, value) : name;
          if (this.parent != null && this.parent.insertBefore(wrapper, this.next || void 0), typeof wrapper.appendChild != "function")
            throw new ParchmentError(`Cannot wrap ${name}`);
          return wrapper.appendChild(this), wrapper;
        }
      };
      _ShadowBlot.blotName = "abstract";
      ShadowBlot = _ShadowBlot;
      _LeafBlot = class _LeafBlot2 extends ShadowBlot {
        /**
         * Returns the value represented by domNode if it is this Blot's type
         * No checking that domNode can represent this Blot type is required so
         * applications needing it should check externally before calling.
         */
        static value(_domNode) {
          return true;
        }
        /**
         * Given location represented by node and offset from DOM Selection Range,
         * return index to that location.
         */
        index(node, offset) {
          return this.domNode === node || this.domNode.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(offset, 1) : -1;
        }
        /**
         * Given index to location within blot, return node and offset representing
         * that location, consumable by DOM Selection Range
         */
        position(index, _inclusive) {
          let offset = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);
          return index > 0 && (offset += 1), [this.parent.domNode, offset];
        }
        /**
         * Return value represented by this blot
         * Should not change without interaction from API or
         * user change detectable by update()
         */
        value() {
          return {
            [this.statics.blotName]: this.statics.value(this.domNode) || true
          };
        }
      };
      _LeafBlot.scope = Scope.INLINE_BLOT;
      LeafBlot = _LeafBlot;
      LeafBlot$1 = LeafBlot;
      LinkedList = class {
        constructor() {
          this.head = null, this.tail = null, this.length = 0;
        }
        append(...nodes) {
          if (this.insertBefore(nodes[0], null), nodes.length > 1) {
            const rest = nodes.slice(1);
            this.append(...rest);
          }
        }
        at(index) {
          const next = this.iterator();
          let cur = next();
          for (; cur && index > 0; )
            index -= 1, cur = next();
          return cur;
        }
        contains(node) {
          const next = this.iterator();
          let cur = next();
          for (; cur; ) {
            if (cur === node)
              return true;
            cur = next();
          }
          return false;
        }
        indexOf(node) {
          const next = this.iterator();
          let cur = next(), index = 0;
          for (; cur; ) {
            if (cur === node)
              return index;
            index += 1, cur = next();
          }
          return -1;
        }
        insertBefore(node, refNode) {
          node != null && (this.remove(node), node.next = refNode, refNode != null ? (node.prev = refNode.prev, refNode.prev != null && (refNode.prev.next = node), refNode.prev = node, refNode === this.head && (this.head = node)) : this.tail != null ? (this.tail.next = node, node.prev = this.tail, this.tail = node) : (node.prev = null, this.head = this.tail = node), this.length += 1);
        }
        offset(target) {
          let index = 0, cur = this.head;
          for (; cur != null; ) {
            if (cur === target)
              return index;
            index += cur.length(), cur = cur.next;
          }
          return -1;
        }
        remove(node) {
          this.contains(node) && (node.prev != null && (node.prev.next = node.next), node.next != null && (node.next.prev = node.prev), node === this.head && (this.head = node.next), node === this.tail && (this.tail = node.prev), this.length -= 1);
        }
        iterator(curNode = this.head) {
          return () => {
            const ret = curNode;
            return curNode != null && (curNode = curNode.next), ret;
          };
        }
        find(index, inclusive = false) {
          const next = this.iterator();
          let cur = next();
          for (; cur; ) {
            const length2 = cur.length();
            if (index < length2 || inclusive && index === length2 && (cur.next == null || cur.next.length() !== 0))
              return [cur, index];
            index -= length2, cur = next();
          }
          return [null, 0];
        }
        forEach(callback) {
          const next = this.iterator();
          let cur = next();
          for (; cur; )
            callback(cur), cur = next();
        }
        forEachAt(index, length2, callback) {
          if (length2 <= 0)
            return;
          const [startNode, offset] = this.find(index);
          let curIndex = index - offset;
          const next = this.iterator(startNode);
          let cur = next();
          for (; cur && curIndex < index + length2; ) {
            const curLength = cur.length();
            index > curIndex ? callback(
              cur,
              index - curIndex,
              Math.min(length2, curIndex + curLength - index)
            ) : callback(cur, 0, Math.min(curLength, index + length2 - curIndex)), curIndex += curLength, cur = next();
          }
        }
        map(callback) {
          return this.reduce((memo, cur) => (memo.push(callback(cur)), memo), []);
        }
        reduce(callback, memo) {
          const next = this.iterator();
          let cur = next();
          for (; cur; )
            memo = callback(memo, cur), cur = next();
          return memo;
        }
      };
      _ParentBlot = class _ParentBlot2 extends ShadowBlot {
        constructor(scroll, domNode) {
          super(scroll, domNode), this.uiNode = null, this.build();
        }
        appendChild(other) {
          this.insertBefore(other);
        }
        attach() {
          super.attach(), this.children.forEach((child) => {
            child.attach();
          });
        }
        attachUI(node) {
          this.uiNode != null && this.uiNode.remove(), this.uiNode = node, _ParentBlot2.uiClass && this.uiNode.classList.add(_ParentBlot2.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
        }
        /**
         * Called during construction, should fill its own children LinkedList.
         */
        build() {
          this.children = new LinkedList(), Array.from(this.domNode.childNodes).filter((node) => node !== this.uiNode).reverse().forEach((node) => {
            try {
              const child = makeAttachedBlot(node, this.scroll);
              this.insertBefore(child, this.children.head || void 0);
            } catch (err) {
              if (err instanceof ParchmentError)
                return;
              throw err;
            }
          });
        }
        deleteAt(index, length2) {
          if (index === 0 && length2 === this.length())
            return this.remove();
          this.children.forEachAt(index, length2, (child, offset, childLength) => {
            child.deleteAt(offset, childLength);
          });
        }
        descendant(criteria, index = 0) {
          const [child, offset] = this.children.find(index);
          return criteria.blotName == null && criteria(child) || criteria.blotName != null && child instanceof criteria ? [child, offset] : child instanceof _ParentBlot2 ? child.descendant(criteria, offset) : [null, -1];
        }
        descendants(criteria, index = 0, length2 = Number.MAX_VALUE) {
          let descendants = [], lengthLeft = length2;
          return this.children.forEachAt(
            index,
            length2,
            (child, childIndex, childLength) => {
              (criteria.blotName == null && criteria(child) || criteria.blotName != null && child instanceof criteria) && descendants.push(child), child instanceof _ParentBlot2 && (descendants = descendants.concat(
                child.descendants(criteria, childIndex, lengthLeft)
              )), lengthLeft -= childLength;
            }
          ), descendants;
        }
        detach() {
          this.children.forEach((child) => {
            child.detach();
          }), super.detach();
        }
        enforceAllowedChildren() {
          let done = false;
          this.children.forEach((child) => {
            done || this.statics.allowedChildren.some(
              (def) => child instanceof def
            ) || (child.statics.scope === Scope.BLOCK_BLOT ? (child.next != null && this.splitAfter(child), child.prev != null && this.splitAfter(child.prev), child.parent.unwrap(), done = true) : child instanceof _ParentBlot2 ? child.unwrap() : child.remove());
          });
        }
        formatAt(index, length2, name, value) {
          this.children.forEachAt(index, length2, (child, offset, childLength) => {
            child.formatAt(offset, childLength, name, value);
          });
        }
        insertAt(index, value, def) {
          const [child, offset] = this.children.find(index);
          if (child)
            child.insertAt(offset, value, def);
          else {
            const blot = def == null ? this.scroll.create("text", value) : this.scroll.create(value, def);
            this.appendChild(blot);
          }
        }
        insertBefore(childBlot, refBlot) {
          childBlot.parent != null && childBlot.parent.children.remove(childBlot);
          let refDomNode = null;
          this.children.insertBefore(childBlot, refBlot || null), childBlot.parent = this, refBlot != null && (refDomNode = refBlot.domNode), (this.domNode.parentNode !== childBlot.domNode || this.domNode.nextSibling !== refDomNode) && this.domNode.insertBefore(childBlot.domNode, refDomNode), childBlot.attach();
        }
        length() {
          return this.children.reduce((memo, child) => memo + child.length(), 0);
        }
        moveChildren(targetParent, refNode) {
          this.children.forEach((child) => {
            targetParent.insertBefore(child, refNode);
          });
        }
        optimize(context) {
          if (super.optimize(context), this.enforceAllowedChildren(), this.uiNode != null && this.uiNode !== this.domNode.firstChild && this.domNode.insertBefore(this.uiNode, this.domNode.firstChild), this.children.length === 0)
            if (this.statics.defaultChild != null) {
              const child = this.scroll.create(this.statics.defaultChild.blotName);
              this.appendChild(child);
            } else
              this.remove();
        }
        path(index, inclusive = false) {
          const [child, offset] = this.children.find(index, inclusive), position = [[this, index]];
          return child instanceof _ParentBlot2 ? position.concat(child.path(offset, inclusive)) : (child != null && position.push([child, offset]), position);
        }
        removeChild(child) {
          this.children.remove(child);
        }
        replaceWith(name, value) {
          const replacement = typeof name == "string" ? this.scroll.create(name, value) : name;
          return replacement instanceof _ParentBlot2 && this.moveChildren(replacement), super.replaceWith(replacement);
        }
        split(index, force = false) {
          if (!force) {
            if (index === 0)
              return this;
            if (index === this.length())
              return this.next;
          }
          const after = this.clone();
          return this.parent && this.parent.insertBefore(after, this.next || void 0), this.children.forEachAt(index, this.length(), (child, offset, _length) => {
            const split = child.split(offset, force);
            split != null && after.appendChild(split);
          }), after;
        }
        splitAfter(child) {
          const after = this.clone();
          for (; child.next != null; )
            after.appendChild(child.next);
          return this.parent && this.parent.insertBefore(after, this.next || void 0), after;
        }
        unwrap() {
          this.parent && this.moveChildren(this.parent, this.next || void 0), this.remove();
        }
        update(mutations, _context) {
          const addedNodes = [], removedNodes = [];
          mutations.forEach((mutation) => {
            mutation.target === this.domNode && mutation.type === "childList" && (addedNodes.push(...mutation.addedNodes), removedNodes.push(...mutation.removedNodes));
          }), removedNodes.forEach((node) => {
            if (node.parentNode != null && // @ts-expect-error Fix me later
            node.tagName !== "IFRAME" && document.body.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY)
              return;
            const blot = this.scroll.find(node);
            blot != null && (blot.domNode.parentNode == null || blot.domNode.parentNode === this.domNode) && blot.detach();
          }), addedNodes.filter((node) => node.parentNode === this.domNode && node !== this.uiNode).sort((a, b) => a === b ? 0 : a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((node) => {
            let refBlot = null;
            node.nextSibling != null && (refBlot = this.scroll.find(node.nextSibling));
            const blot = makeAttachedBlot(node, this.scroll);
            (blot.next !== refBlot || blot.next == null) && (blot.parent != null && blot.parent.removeChild(this), this.insertBefore(blot, refBlot || void 0));
          }), this.enforceAllowedChildren();
        }
      };
      _ParentBlot.uiClass = "";
      ParentBlot = _ParentBlot;
      ParentBlot$1 = ParentBlot;
      _InlineBlot = class _InlineBlot2 extends ParentBlot$1 {
        static create(value) {
          return super.create(value);
        }
        static formats(domNode, scroll) {
          const match22 = scroll.query(_InlineBlot2.blotName);
          if (!(match22 != null && domNode.tagName === match22.tagName)) {
            if (typeof this.tagName == "string")
              return true;
            if (Array.isArray(this.tagName))
              return domNode.tagName.toLowerCase();
          }
        }
        constructor(scroll, domNode) {
          super(scroll, domNode), this.attributes = new AttributorStore$1(this.domNode);
        }
        format(name, value) {
          if (name === this.statics.blotName && !value)
            this.children.forEach((child) => {
              child instanceof _InlineBlot2 || (child = child.wrap(_InlineBlot2.blotName, true)), this.attributes.copy(child);
            }), this.unwrap();
          else {
            const format = this.scroll.query(name, Scope.INLINE);
            if (format == null)
              return;
            format instanceof Attributor ? this.attributes.attribute(format, value) : value && (name !== this.statics.blotName || this.formats()[name] !== value) && this.replaceWith(name, value);
          }
        }
        formats() {
          const formats = this.attributes.values(), format = this.statics.formats(this.domNode, this.scroll);
          return format != null && (formats[this.statics.blotName] = format), formats;
        }
        formatAt(index, length2, name, value) {
          this.formats()[name] != null || this.scroll.query(name, Scope.ATTRIBUTE) ? this.isolate(index, length2).format(name, value) : super.formatAt(index, length2, name, value);
        }
        optimize(context) {
          super.optimize(context);
          const formats = this.formats();
          if (Object.keys(formats).length === 0)
            return this.unwrap();
          const next = this.next;
          next instanceof _InlineBlot2 && next.prev === this && isEqual2(formats, next.formats()) && (next.moveChildren(this), next.remove());
        }
        replaceWith(name, value) {
          const replacement = super.replaceWith(name, value);
          return this.attributes.copy(replacement), replacement;
        }
        update(mutations, context) {
          super.update(mutations, context), mutations.some(
            (mutation) => mutation.target === this.domNode && mutation.type === "attributes"
          ) && this.attributes.build();
        }
        wrap(name, value) {
          const wrapper = super.wrap(name, value);
          return wrapper instanceof _InlineBlot2 && this.attributes.move(wrapper), wrapper;
        }
      };
      _InlineBlot.allowedChildren = [_InlineBlot, LeafBlot$1], _InlineBlot.blotName = "inline", _InlineBlot.scope = Scope.INLINE_BLOT, _InlineBlot.tagName = "SPAN";
      InlineBlot = _InlineBlot;
      InlineBlot$1 = InlineBlot;
      _BlockBlot = class _BlockBlot2 extends ParentBlot$1 {
        static create(value) {
          return super.create(value);
        }
        static formats(domNode, scroll) {
          const match22 = scroll.query(_BlockBlot2.blotName);
          if (!(match22 != null && domNode.tagName === match22.tagName)) {
            if (typeof this.tagName == "string")
              return true;
            if (Array.isArray(this.tagName))
              return domNode.tagName.toLowerCase();
          }
        }
        constructor(scroll, domNode) {
          super(scroll, domNode), this.attributes = new AttributorStore$1(this.domNode);
        }
        format(name, value) {
          const format = this.scroll.query(name, Scope.BLOCK);
          format != null && (format instanceof Attributor ? this.attributes.attribute(format, value) : name === this.statics.blotName && !value ? this.replaceWith(_BlockBlot2.blotName) : value && (name !== this.statics.blotName || this.formats()[name] !== value) && this.replaceWith(name, value));
        }
        formats() {
          const formats = this.attributes.values(), format = this.statics.formats(this.domNode, this.scroll);
          return format != null && (formats[this.statics.blotName] = format), formats;
        }
        formatAt(index, length2, name, value) {
          this.scroll.query(name, Scope.BLOCK) != null ? this.format(name, value) : super.formatAt(index, length2, name, value);
        }
        insertAt(index, value, def) {
          if (def == null || this.scroll.query(value, Scope.INLINE) != null)
            super.insertAt(index, value, def);
          else {
            const after = this.split(index);
            if (after != null) {
              const blot = this.scroll.create(value, def);
              after.parent.insertBefore(blot, after);
            } else
              throw new Error("Attempt to insertAt after block boundaries");
          }
        }
        replaceWith(name, value) {
          const replacement = super.replaceWith(name, value);
          return this.attributes.copy(replacement), replacement;
        }
        update(mutations, context) {
          super.update(mutations, context), mutations.some(
            (mutation) => mutation.target === this.domNode && mutation.type === "attributes"
          ) && this.attributes.build();
        }
      };
      _BlockBlot.blotName = "block", _BlockBlot.scope = Scope.BLOCK_BLOT, _BlockBlot.tagName = "P", _BlockBlot.allowedChildren = [
        InlineBlot$1,
        _BlockBlot,
        LeafBlot$1
      ];
      BlockBlot = _BlockBlot;
      BlockBlot$1 = BlockBlot;
      _ContainerBlot = class _ContainerBlot2 extends ParentBlot$1 {
        checkMerge() {
          return this.next !== null && this.next.statics.blotName === this.statics.blotName;
        }
        deleteAt(index, length2) {
          super.deleteAt(index, length2), this.enforceAllowedChildren();
        }
        formatAt(index, length2, name, value) {
          super.formatAt(index, length2, name, value), this.enforceAllowedChildren();
        }
        insertAt(index, value, def) {
          super.insertAt(index, value, def), this.enforceAllowedChildren();
        }
        optimize(context) {
          super.optimize(context), this.children.length > 0 && this.next != null && this.checkMerge() && (this.next.moveChildren(this), this.next.remove());
        }
      };
      _ContainerBlot.blotName = "container", _ContainerBlot.scope = Scope.BLOCK_BLOT;
      ContainerBlot = _ContainerBlot;
      ContainerBlot$1 = ContainerBlot;
      EmbedBlot = class extends LeafBlot$1 {
        static formats(_domNode, _scroll) {
        }
        format(name, value) {
          super.formatAt(0, this.length(), name, value);
        }
        formatAt(index, length2, name, value) {
          index === 0 && length2 === this.length() ? this.format(name, value) : super.formatAt(index, length2, name, value);
        }
        formats() {
          return this.statics.formats(this.domNode, this.scroll);
        }
      };
      EmbedBlot$1 = EmbedBlot;
      OBSERVER_CONFIG = {
        attributes: true,
        characterData: true,
        characterDataOldValue: true,
        childList: true,
        subtree: true
      };
      MAX_OPTIMIZE_ITERATIONS = 100;
      _ScrollBlot = class _ScrollBlot2 extends ParentBlot$1 {
        constructor(registry, node) {
          super(null, node), this.registry = registry, this.scroll = this, this.build(), this.observer = new MutationObserver((mutations) => {
            this.update(mutations);
          }), this.observer.observe(this.domNode, OBSERVER_CONFIG), this.attach();
        }
        create(input, value) {
          return this.registry.create(this, input, value);
        }
        find(node, bubble = false) {
          const blot = this.registry.find(node, bubble);
          return blot ? blot.scroll === this ? blot : bubble ? this.find(blot.scroll.domNode.parentNode, true) : null : null;
        }
        query(query, scope = Scope.ANY) {
          return this.registry.query(query, scope);
        }
        register(...definitions) {
          return this.registry.register(...definitions);
        }
        build() {
          this.scroll != null && super.build();
        }
        detach() {
          super.detach(), this.observer.disconnect();
        }
        deleteAt(index, length2) {
          this.update(), index === 0 && length2 === this.length() ? this.children.forEach((child) => {
            child.remove();
          }) : super.deleteAt(index, length2);
        }
        formatAt(index, length2, name, value) {
          this.update(), super.formatAt(index, length2, name, value);
        }
        insertAt(index, value, def) {
          this.update(), super.insertAt(index, value, def);
        }
        optimize(mutations = [], context = {}) {
          super.optimize(context);
          const mutationsMap = context.mutationsMap || /* @__PURE__ */ new WeakMap();
          let records = Array.from(this.observer.takeRecords());
          for (; records.length > 0; )
            mutations.push(records.pop());
          const mark = (blot, markParent = true) => {
            blot == null || blot === this || blot.domNode.parentNode != null && (mutationsMap.has(blot.domNode) || mutationsMap.set(blot.domNode, []), markParent && mark(blot.parent));
          }, optimize = (blot) => {
            mutationsMap.has(blot.domNode) && (blot instanceof ParentBlot$1 && blot.children.forEach(optimize), mutationsMap.delete(blot.domNode), blot.optimize(context));
          };
          let remaining = mutations;
          for (let i = 0; remaining.length > 0; i += 1) {
            if (i >= MAX_OPTIMIZE_ITERATIONS)
              throw new Error("[Parchment] Maximum optimize iterations reached");
            for (remaining.forEach((mutation) => {
              const blot = this.find(mutation.target, true);
              blot != null && (blot.domNode === mutation.target && (mutation.type === "childList" ? (mark(this.find(mutation.previousSibling, false)), Array.from(mutation.addedNodes).forEach((node) => {
                const child = this.find(node, false);
                mark(child, false), child instanceof ParentBlot$1 && child.children.forEach((grandChild) => {
                  mark(grandChild, false);
                });
              })) : mutation.type === "attributes" && mark(blot.prev)), mark(blot));
            }), this.children.forEach(optimize), remaining = Array.from(this.observer.takeRecords()), records = remaining.slice(); records.length > 0; )
              mutations.push(records.pop());
          }
        }
        update(mutations, context = {}) {
          mutations = mutations || this.observer.takeRecords();
          const mutationsMap = /* @__PURE__ */ new WeakMap();
          mutations.map((mutation) => {
            const blot = this.find(mutation.target, true);
            return blot == null ? null : mutationsMap.has(blot.domNode) ? (mutationsMap.get(blot.domNode).push(mutation), null) : (mutationsMap.set(blot.domNode, [mutation]), blot);
          }).forEach((blot) => {
            blot != null && blot !== this && mutationsMap.has(blot.domNode) && blot.update(mutationsMap.get(blot.domNode) || [], context);
          }), context.mutationsMap = mutationsMap, mutationsMap.has(this.domNode) && super.update(mutationsMap.get(this.domNode), context), this.optimize(mutations, context);
        }
      };
      _ScrollBlot.blotName = "scroll", _ScrollBlot.defaultChild = BlockBlot$1, _ScrollBlot.allowedChildren = [BlockBlot$1, ContainerBlot$1], _ScrollBlot.scope = Scope.BLOCK_BLOT, _ScrollBlot.tagName = "DIV";
      ScrollBlot = _ScrollBlot;
      ScrollBlot$1 = ScrollBlot;
      _TextBlot = class _TextBlot2 extends LeafBlot$1 {
        static create(value) {
          return document.createTextNode(value);
        }
        static value(domNode) {
          return domNode.data;
        }
        constructor(scroll, node) {
          super(scroll, node), this.text = this.statics.value(this.domNode);
        }
        deleteAt(index, length2) {
          this.domNode.data = this.text = this.text.slice(0, index) + this.text.slice(index + length2);
        }
        index(node, offset) {
          return this.domNode === node ? offset : -1;
        }
        insertAt(index, value, def) {
          def == null ? (this.text = this.text.slice(0, index) + value + this.text.slice(index), this.domNode.data = this.text) : super.insertAt(index, value, def);
        }
        length() {
          return this.text.length;
        }
        optimize(context) {
          super.optimize(context), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof _TextBlot2 && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
        }
        position(index, _inclusive = false) {
          return [this.domNode, index];
        }
        split(index, force = false) {
          if (!force) {
            if (index === 0)
              return this;
            if (index === this.length())
              return this.next;
          }
          const after = this.scroll.create(this.domNode.splitText(index));
          return this.parent.insertBefore(after, this.next || void 0), this.text = this.statics.value(this.domNode), after;
        }
        update(mutations, _context) {
          mutations.some((mutation) => mutation.type === "characterData" && mutation.target === this.domNode) && (this.text = this.statics.value(this.domNode));
        }
        value() {
          return this.text;
        }
      };
      _TextBlot.blotName = "text", _TextBlot.scope = Scope.INLINE_BLOT;
      TextBlot = _TextBlot;
      TextBlot$1 = TextBlot;
    }
  });

  // node_modules/fast-diff/diff.js
  var require_diff = __commonJS({
    "node_modules/fast-diff/diff.js"(exports2, module2) {
      var DIFF_DELETE = -1;
      var DIFF_INSERT = 1;
      var DIFF_EQUAL = 0;
      function diff_main(text1, text2, cursor_pos, cleanup, _fix_unicode) {
        if (text1 === text2) {
          if (text1) {
            return [[DIFF_EQUAL, text1]];
          }
          return [];
        }
        if (cursor_pos != null) {
          var editdiff = find_cursor_edit_diff(text1, text2, cursor_pos);
          if (editdiff) {
            return editdiff;
          }
        }
        var commonlength = diff_commonPrefix(text1, text2);
        var commonprefix = text1.substring(0, commonlength);
        text1 = text1.substring(commonlength);
        text2 = text2.substring(commonlength);
        commonlength = diff_commonSuffix(text1, text2);
        var commonsuffix = text1.substring(text1.length - commonlength);
        text1 = text1.substring(0, text1.length - commonlength);
        text2 = text2.substring(0, text2.length - commonlength);
        var diffs = diff_compute_(text1, text2);
        if (commonprefix) {
          diffs.unshift([DIFF_EQUAL, commonprefix]);
        }
        if (commonsuffix) {
          diffs.push([DIFF_EQUAL, commonsuffix]);
        }
        diff_cleanupMerge(diffs, _fix_unicode);
        if (cleanup) {
          diff_cleanupSemantic(diffs);
        }
        return diffs;
      }
      function diff_compute_(text1, text2) {
        var diffs;
        if (!text1) {
          return [[DIFF_INSERT, text2]];
        }
        if (!text2) {
          return [[DIFF_DELETE, text1]];
        }
        var longtext = text1.length > text2.length ? text1 : text2;
        var shorttext = text1.length > text2.length ? text2 : text1;
        var i = longtext.indexOf(shorttext);
        if (i !== -1) {
          diffs = [
            [DIFF_INSERT, longtext.substring(0, i)],
            [DIFF_EQUAL, shorttext],
            [DIFF_INSERT, longtext.substring(i + shorttext.length)]
          ];
          if (text1.length > text2.length) {
            diffs[0][0] = diffs[2][0] = DIFF_DELETE;
          }
          return diffs;
        }
        if (shorttext.length === 1) {
          return [
            [DIFF_DELETE, text1],
            [DIFF_INSERT, text2]
          ];
        }
        var hm = diff_halfMatch_(text1, text2);
        if (hm) {
          var text1_a = hm[0];
          var text1_b = hm[1];
          var text2_a = hm[2];
          var text2_b = hm[3];
          var mid_common = hm[4];
          var diffs_a = diff_main(text1_a, text2_a);
          var diffs_b = diff_main(text1_b, text2_b);
          return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
        }
        return diff_bisect_(text1, text2);
      }
      function diff_bisect_(text1, text2) {
        var text1_length = text1.length;
        var text2_length = text2.length;
        var max_d = Math.ceil((text1_length + text2_length) / 2);
        var v_offset = max_d;
        var v_length = 2 * max_d;
        var v1 = new Array(v_length);
        var v2 = new Array(v_length);
        for (var x = 0; x < v_length; x++) {
          v1[x] = -1;
          v2[x] = -1;
        }
        v1[v_offset + 1] = 0;
        v2[v_offset + 1] = 0;
        var delta = text1_length - text2_length;
        var front = delta % 2 !== 0;
        var k1start = 0;
        var k1end = 0;
        var k2start = 0;
        var k2end = 0;
        for (var d = 0; d < max_d; d++) {
          for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
            var k1_offset = v_offset + k1;
            var x1;
            if (k1 === -d || k1 !== d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
              x1 = v1[k1_offset + 1];
            } else {
              x1 = v1[k1_offset - 1] + 1;
            }
            var y1 = x1 - k1;
            while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) === text2.charAt(y1)) {
              x1++;
              y1++;
            }
            v1[k1_offset] = x1;
            if (x1 > text1_length) {
              k1end += 2;
            } else if (y1 > text2_length) {
              k1start += 2;
            } else if (front) {
              var k2_offset = v_offset + delta - k1;
              if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] !== -1) {
                var x2 = text1_length - v2[k2_offset];
                if (x1 >= x2) {
                  return diff_bisectSplit_(text1, text2, x1, y1);
                }
              }
            }
          }
          for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
            var k2_offset = v_offset + k2;
            var x2;
            if (k2 === -d || k2 !== d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
              x2 = v2[k2_offset + 1];
            } else {
              x2 = v2[k2_offset - 1] + 1;
            }
            var y2 = x2 - k2;
            while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) === text2.charAt(text2_length - y2 - 1)) {
              x2++;
              y2++;
            }
            v2[k2_offset] = x2;
            if (x2 > text1_length) {
              k2end += 2;
            } else if (y2 > text2_length) {
              k2start += 2;
            } else if (!front) {
              var k1_offset = v_offset + delta - k2;
              if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] !== -1) {
                var x1 = v1[k1_offset];
                var y1 = v_offset + x1 - k1_offset;
                x2 = text1_length - x2;
                if (x1 >= x2) {
                  return diff_bisectSplit_(text1, text2, x1, y1);
                }
              }
            }
          }
        }
        return [
          [DIFF_DELETE, text1],
          [DIFF_INSERT, text2]
        ];
      }
      function diff_bisectSplit_(text1, text2, x, y) {
        var text1a = text1.substring(0, x);
        var text2a = text2.substring(0, y);
        var text1b = text1.substring(x);
        var text2b = text2.substring(y);
        var diffs = diff_main(text1a, text2a);
        var diffsb = diff_main(text1b, text2b);
        return diffs.concat(diffsb);
      }
      function diff_commonPrefix(text1, text2) {
        if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {
          return 0;
        }
        var pointermin = 0;
        var pointermax = Math.min(text1.length, text2.length);
        var pointermid = pointermax;
        var pointerstart = 0;
        while (pointermin < pointermid) {
          if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
            pointermin = pointermid;
            pointerstart = pointermin;
          } else {
            pointermax = pointermid;
          }
          pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
        }
        if (is_surrogate_pair_start(text1.charCodeAt(pointermid - 1))) {
          pointermid--;
        }
        return pointermid;
      }
      function diff_commonOverlap_(text1, text2) {
        var text1_length = text1.length;
        var text2_length = text2.length;
        if (text1_length == 0 || text2_length == 0) {
          return 0;
        }
        if (text1_length > text2_length) {
          text1 = text1.substring(text1_length - text2_length);
        } else if (text1_length < text2_length) {
          text2 = text2.substring(0, text1_length);
        }
        var text_length = Math.min(text1_length, text2_length);
        if (text1 == text2) {
          return text_length;
        }
        var best = 0;
        var length2 = 1;
        while (true) {
          var pattern = text1.substring(text_length - length2);
          var found = text2.indexOf(pattern);
          if (found == -1) {
            return best;
          }
          length2 += found;
          if (found == 0 || text1.substring(text_length - length2) == text2.substring(0, length2)) {
            best = length2;
            length2++;
          }
        }
      }
      function diff_commonSuffix(text1, text2) {
        if (!text1 || !text2 || text1.slice(-1) !== text2.slice(-1)) {
          return 0;
        }
        var pointermin = 0;
        var pointermax = Math.min(text1.length, text2.length);
        var pointermid = pointermax;
        var pointerend = 0;
        while (pointermin < pointermid) {
          if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
            pointermin = pointermid;
            pointerend = pointermin;
          } else {
            pointermax = pointermid;
          }
          pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
        }
        if (is_surrogate_pair_end(text1.charCodeAt(text1.length - pointermid))) {
          pointermid--;
        }
        return pointermid;
      }
      function diff_halfMatch_(text1, text2) {
        var longtext = text1.length > text2.length ? text1 : text2;
        var shorttext = text1.length > text2.length ? text2 : text1;
        if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
          return null;
        }
        function diff_halfMatchI_(longtext2, shorttext2, i) {
          var seed = longtext2.substring(i, i + Math.floor(longtext2.length / 4));
          var j = -1;
          var best_common = "";
          var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
          while ((j = shorttext2.indexOf(seed, j + 1)) !== -1) {
            var prefixLength = diff_commonPrefix(
              longtext2.substring(i),
              shorttext2.substring(j)
            );
            var suffixLength = diff_commonSuffix(
              longtext2.substring(0, i),
              shorttext2.substring(0, j)
            );
            if (best_common.length < suffixLength + prefixLength) {
              best_common = shorttext2.substring(j - suffixLength, j) + shorttext2.substring(j, j + prefixLength);
              best_longtext_a = longtext2.substring(0, i - suffixLength);
              best_longtext_b = longtext2.substring(i + prefixLength);
              best_shorttext_a = shorttext2.substring(0, j - suffixLength);
              best_shorttext_b = shorttext2.substring(j + prefixLength);
            }
          }
          if (best_common.length * 2 >= longtext2.length) {
            return [
              best_longtext_a,
              best_longtext_b,
              best_shorttext_a,
              best_shorttext_b,
              best_common
            ];
          } else {
            return null;
          }
        }
        var hm1 = diff_halfMatchI_(
          longtext,
          shorttext,
          Math.ceil(longtext.length / 4)
        );
        var hm2 = diff_halfMatchI_(
          longtext,
          shorttext,
          Math.ceil(longtext.length / 2)
        );
        var hm;
        if (!hm1 && !hm2) {
          return null;
        } else if (!hm2) {
          hm = hm1;
        } else if (!hm1) {
          hm = hm2;
        } else {
          hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
        }
        var text1_a, text1_b, text2_a, text2_b;
        if (text1.length > text2.length) {
          text1_a = hm[0];
          text1_b = hm[1];
          text2_a = hm[2];
          text2_b = hm[3];
        } else {
          text2_a = hm[0];
          text2_b = hm[1];
          text1_a = hm[2];
          text1_b = hm[3];
        }
        var mid_common = hm[4];
        return [text1_a, text1_b, text2_a, text2_b, mid_common];
      }
      function diff_cleanupSemantic(diffs) {
        var changes = false;
        var equalities = [];
        var equalitiesLength = 0;
        var lastequality = null;
        var pointer = 0;
        var length_insertions1 = 0;
        var length_deletions1 = 0;
        var length_insertions2 = 0;
        var length_deletions2 = 0;
        while (pointer < diffs.length) {
          if (diffs[pointer][0] == DIFF_EQUAL) {
            equalities[equalitiesLength++] = pointer;
            length_insertions1 = length_insertions2;
            length_deletions1 = length_deletions2;
            length_insertions2 = 0;
            length_deletions2 = 0;
            lastequality = diffs[pointer][1];
          } else {
            if (diffs[pointer][0] == DIFF_INSERT) {
              length_insertions2 += diffs[pointer][1].length;
            } else {
              length_deletions2 += diffs[pointer][1].length;
            }
            if (lastequality && lastequality.length <= Math.max(length_insertions1, length_deletions1) && lastequality.length <= Math.max(length_insertions2, length_deletions2)) {
              diffs.splice(equalities[equalitiesLength - 1], 0, [
                DIFF_DELETE,
                lastequality
              ]);
              diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
              equalitiesLength--;
              equalitiesLength--;
              pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
              length_insertions1 = 0;
              length_deletions1 = 0;
              length_insertions2 = 0;
              length_deletions2 = 0;
              lastequality = null;
              changes = true;
            }
          }
          pointer++;
        }
        if (changes) {
          diff_cleanupMerge(diffs);
        }
        diff_cleanupSemanticLossless(diffs);
        pointer = 1;
        while (pointer < diffs.length) {
          if (diffs[pointer - 1][0] == DIFF_DELETE && diffs[pointer][0] == DIFF_INSERT) {
            var deletion = diffs[pointer - 1][1];
            var insertion = diffs[pointer][1];
            var overlap_length1 = diff_commonOverlap_(deletion, insertion);
            var overlap_length2 = diff_commonOverlap_(insertion, deletion);
            if (overlap_length1 >= overlap_length2) {
              if (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) {
                diffs.splice(pointer, 0, [
                  DIFF_EQUAL,
                  insertion.substring(0, overlap_length1)
                ]);
                diffs[pointer - 1][1] = deletion.substring(
                  0,
                  deletion.length - overlap_length1
                );
                diffs[pointer + 1][1] = insertion.substring(overlap_length1);
                pointer++;
              }
            } else {
              if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
                diffs.splice(pointer, 0, [
                  DIFF_EQUAL,
                  deletion.substring(0, overlap_length2)
                ]);
                diffs[pointer - 1][0] = DIFF_INSERT;
                diffs[pointer - 1][1] = insertion.substring(
                  0,
                  insertion.length - overlap_length2
                );
                diffs[pointer + 1][0] = DIFF_DELETE;
                diffs[pointer + 1][1] = deletion.substring(overlap_length2);
                pointer++;
              }
            }
            pointer++;
          }
          pointer++;
        }
      }
      var nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
      var whitespaceRegex_ = /\s/;
      var linebreakRegex_ = /[\r\n]/;
      var blanklineEndRegex_ = /\n\r?\n$/;
      var blanklineStartRegex_ = /^\r?\n\r?\n/;
      function diff_cleanupSemanticLossless(diffs) {
        function diff_cleanupSemanticScore_(one, two) {
          if (!one || !two) {
            return 6;
          }
          var char1 = one.charAt(one.length - 1);
          var char2 = two.charAt(0);
          var nonAlphaNumeric1 = char1.match(nonAlphaNumericRegex_);
          var nonAlphaNumeric2 = char2.match(nonAlphaNumericRegex_);
          var whitespace1 = nonAlphaNumeric1 && char1.match(whitespaceRegex_);
          var whitespace2 = nonAlphaNumeric2 && char2.match(whitespaceRegex_);
          var lineBreak1 = whitespace1 && char1.match(linebreakRegex_);
          var lineBreak2 = whitespace2 && char2.match(linebreakRegex_);
          var blankLine1 = lineBreak1 && one.match(blanklineEndRegex_);
          var blankLine2 = lineBreak2 && two.match(blanklineStartRegex_);
          if (blankLine1 || blankLine2) {
            return 5;
          } else if (lineBreak1 || lineBreak2) {
            return 4;
          } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
            return 3;
          } else if (whitespace1 || whitespace2) {
            return 2;
          } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
            return 1;
          }
          return 0;
        }
        var pointer = 1;
        while (pointer < diffs.length - 1) {
          if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
            var equality1 = diffs[pointer - 1][1];
            var edit = diffs[pointer][1];
            var equality2 = diffs[pointer + 1][1];
            var commonOffset = diff_commonSuffix(equality1, edit);
            if (commonOffset) {
              var commonString = edit.substring(edit.length - commonOffset);
              equality1 = equality1.substring(0, equality1.length - commonOffset);
              edit = commonString + edit.substring(0, edit.length - commonOffset);
              equality2 = commonString + equality2;
            }
            var bestEquality1 = equality1;
            var bestEdit = edit;
            var bestEquality2 = equality2;
            var bestScore = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
            while (edit.charAt(0) === equality2.charAt(0)) {
              equality1 += edit.charAt(0);
              edit = edit.substring(1) + equality2.charAt(0);
              equality2 = equality2.substring(1);
              var score = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
              if (score >= bestScore) {
                bestScore = score;
                bestEquality1 = equality1;
                bestEdit = edit;
                bestEquality2 = equality2;
              }
            }
            if (diffs[pointer - 1][1] != bestEquality1) {
              if (bestEquality1) {
                diffs[pointer - 1][1] = bestEquality1;
              } else {
                diffs.splice(pointer - 1, 1);
                pointer--;
              }
              diffs[pointer][1] = bestEdit;
              if (bestEquality2) {
                diffs[pointer + 1][1] = bestEquality2;
              } else {
                diffs.splice(pointer + 1, 1);
                pointer--;
              }
            }
          }
          pointer++;
        }
      }
      function diff_cleanupMerge(diffs, fix_unicode) {
        diffs.push([DIFF_EQUAL, ""]);
        var pointer = 0;
        var count_delete = 0;
        var count_insert = 0;
        var text_delete = "";
        var text_insert = "";
        var commonlength;
        while (pointer < diffs.length) {
          if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
            diffs.splice(pointer, 1);
            continue;
          }
          switch (diffs[pointer][0]) {
            case DIFF_INSERT:
              count_insert++;
              text_insert += diffs[pointer][1];
              pointer++;
              break;
            case DIFF_DELETE:
              count_delete++;
              text_delete += diffs[pointer][1];
              pointer++;
              break;
            case DIFF_EQUAL:
              var previous_equality = pointer - count_insert - count_delete - 1;
              if (fix_unicode) {
                if (previous_equality >= 0 && ends_with_pair_start(diffs[previous_equality][1])) {
                  var stray = diffs[previous_equality][1].slice(-1);
                  diffs[previous_equality][1] = diffs[previous_equality][1].slice(
                    0,
                    -1
                  );
                  text_delete = stray + text_delete;
                  text_insert = stray + text_insert;
                  if (!diffs[previous_equality][1]) {
                    diffs.splice(previous_equality, 1);
                    pointer--;
                    var k = previous_equality - 1;
                    if (diffs[k] && diffs[k][0] === DIFF_INSERT) {
                      count_insert++;
                      text_insert = diffs[k][1] + text_insert;
                      k--;
                    }
                    if (diffs[k] && diffs[k][0] === DIFF_DELETE) {
                      count_delete++;
                      text_delete = diffs[k][1] + text_delete;
                      k--;
                    }
                    previous_equality = k;
                  }
                }
                if (starts_with_pair_end(diffs[pointer][1])) {
                  var stray = diffs[pointer][1].charAt(0);
                  diffs[pointer][1] = diffs[pointer][1].slice(1);
                  text_delete += stray;
                  text_insert += stray;
                }
              }
              if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
                diffs.splice(pointer, 1);
                break;
              }
              if (text_delete.length > 0 || text_insert.length > 0) {
                if (text_delete.length > 0 && text_insert.length > 0) {
                  commonlength = diff_commonPrefix(text_insert, text_delete);
                  if (commonlength !== 0) {
                    if (previous_equality >= 0) {
                      diffs[previous_equality][1] += text_insert.substring(
                        0,
                        commonlength
                      );
                    } else {
                      diffs.splice(0, 0, [
                        DIFF_EQUAL,
                        text_insert.substring(0, commonlength)
                      ]);
                      pointer++;
                    }
                    text_insert = text_insert.substring(commonlength);
                    text_delete = text_delete.substring(commonlength);
                  }
                  commonlength = diff_commonSuffix(text_insert, text_delete);
                  if (commonlength !== 0) {
                    diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                    text_insert = text_insert.substring(
                      0,
                      text_insert.length - commonlength
                    );
                    text_delete = text_delete.substring(
                      0,
                      text_delete.length - commonlength
                    );
                  }
                }
                var n = count_insert + count_delete;
                if (text_delete.length === 0 && text_insert.length === 0) {
                  diffs.splice(pointer - n, n);
                  pointer = pointer - n;
                } else if (text_delete.length === 0) {
                  diffs.splice(pointer - n, n, [DIFF_INSERT, text_insert]);
                  pointer = pointer - n + 1;
                } else if (text_insert.length === 0) {
                  diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete]);
                  pointer = pointer - n + 1;
                } else {
                  diffs.splice(
                    pointer - n,
                    n,
                    [DIFF_DELETE, text_delete],
                    [DIFF_INSERT, text_insert]
                  );
                  pointer = pointer - n + 2;
                }
              }
              if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {
                diffs[pointer - 1][1] += diffs[pointer][1];
                diffs.splice(pointer, 1);
              } else {
                pointer++;
              }
              count_insert = 0;
              count_delete = 0;
              text_delete = "";
              text_insert = "";
              break;
          }
        }
        if (diffs[diffs.length - 1][1] === "") {
          diffs.pop();
        }
        var changes = false;
        pointer = 1;
        while (pointer < diffs.length - 1) {
          if (diffs[pointer - 1][0] === DIFF_EQUAL && diffs[pointer + 1][0] === DIFF_EQUAL) {
            if (diffs[pointer][1].substring(
              diffs[pointer][1].length - diffs[pointer - 1][1].length
            ) === diffs[pointer - 1][1]) {
              diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(
                0,
                diffs[pointer][1].length - diffs[pointer - 1][1].length
              );
              diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
              diffs.splice(pointer - 1, 1);
              changes = true;
            } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
              diffs[pointer - 1][1] += diffs[pointer + 1][1];
              diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
              diffs.splice(pointer + 1, 1);
              changes = true;
            }
          }
          pointer++;
        }
        if (changes) {
          diff_cleanupMerge(diffs, fix_unicode);
        }
      }
      function is_surrogate_pair_start(charCode) {
        return charCode >= 55296 && charCode <= 56319;
      }
      function is_surrogate_pair_end(charCode) {
        return charCode >= 56320 && charCode <= 57343;
      }
      function starts_with_pair_end(str) {
        return is_surrogate_pair_end(str.charCodeAt(0));
      }
      function ends_with_pair_start(str) {
        return is_surrogate_pair_start(str.charCodeAt(str.length - 1));
      }
      function remove_empty_tuples(tuples) {
        var ret = [];
        for (var i = 0; i < tuples.length; i++) {
          if (tuples[i][1].length > 0) {
            ret.push(tuples[i]);
          }
        }
        return ret;
      }
      function make_edit_splice(before, oldMiddle, newMiddle, after) {
        if (ends_with_pair_start(before) || starts_with_pair_end(after)) {
          return null;
        }
        return remove_empty_tuples([
          [DIFF_EQUAL, before],
          [DIFF_DELETE, oldMiddle],
          [DIFF_INSERT, newMiddle],
          [DIFF_EQUAL, after]
        ]);
      }
      function find_cursor_edit_diff(oldText, newText, cursor_pos) {
        var oldRange = typeof cursor_pos === "number" ? { index: cursor_pos, length: 0 } : cursor_pos.oldRange;
        var newRange = typeof cursor_pos === "number" ? null : cursor_pos.newRange;
        var oldLength = oldText.length;
        var newLength = newText.length;
        if (oldRange.length === 0 && (newRange === null || newRange.length === 0)) {
          var oldCursor = oldRange.index;
          var oldBefore = oldText.slice(0, oldCursor);
          var oldAfter = oldText.slice(oldCursor);
          var maybeNewCursor = newRange ? newRange.index : null;
          editBefore: {
            var newCursor = oldCursor + newLength - oldLength;
            if (maybeNewCursor !== null && maybeNewCursor !== newCursor) {
              break editBefore;
            }
            if (newCursor < 0 || newCursor > newLength) {
              break editBefore;
            }
            var newBefore = newText.slice(0, newCursor);
            var newAfter = newText.slice(newCursor);
            if (newAfter !== oldAfter) {
              break editBefore;
            }
            var prefixLength = Math.min(oldCursor, newCursor);
            var oldPrefix = oldBefore.slice(0, prefixLength);
            var newPrefix = newBefore.slice(0, prefixLength);
            if (oldPrefix !== newPrefix) {
              break editBefore;
            }
            var oldMiddle = oldBefore.slice(prefixLength);
            var newMiddle = newBefore.slice(prefixLength);
            return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldAfter);
          }
          editAfter: {
            if (maybeNewCursor !== null && maybeNewCursor !== oldCursor) {
              break editAfter;
            }
            var cursor = oldCursor;
            var newBefore = newText.slice(0, cursor);
            var newAfter = newText.slice(cursor);
            if (newBefore !== oldBefore) {
              break editAfter;
            }
            var suffixLength = Math.min(oldLength - cursor, newLength - cursor);
            var oldSuffix = oldAfter.slice(oldAfter.length - suffixLength);
            var newSuffix = newAfter.slice(newAfter.length - suffixLength);
            if (oldSuffix !== newSuffix) {
              break editAfter;
            }
            var oldMiddle = oldAfter.slice(0, oldAfter.length - suffixLength);
            var newMiddle = newAfter.slice(0, newAfter.length - suffixLength);
            return make_edit_splice(oldBefore, oldMiddle, newMiddle, oldSuffix);
          }
        }
        if (oldRange.length > 0 && newRange && newRange.length === 0) {
          replaceRange: {
            var oldPrefix = oldText.slice(0, oldRange.index);
            var oldSuffix = oldText.slice(oldRange.index + oldRange.length);
            var prefixLength = oldPrefix.length;
            var suffixLength = oldSuffix.length;
            if (newLength < prefixLength + suffixLength) {
              break replaceRange;
            }
            var newPrefix = newText.slice(0, prefixLength);
            var newSuffix = newText.slice(newLength - suffixLength);
            if (oldPrefix !== newPrefix || oldSuffix !== newSuffix) {
              break replaceRange;
            }
            var oldMiddle = oldText.slice(prefixLength, oldLength - suffixLength);
            var newMiddle = newText.slice(prefixLength, newLength - suffixLength);
            return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldSuffix);
          }
        }
        return null;
      }
      function diff(text1, text2, cursor_pos, cleanup) {
        return diff_main(text1, text2, cursor_pos, cleanup, true);
      }
      diff.INSERT = DIFF_INSERT;
      diff.DELETE = DIFF_DELETE;
      diff.EQUAL = DIFF_EQUAL;
      module2.exports = diff;
    }
  });

  // node_modules/lodash.clonedeep/index.js
  var require_lodash = __commonJS({
    "node_modules/lodash.clonedeep/index.js"(exports2, module2) {
      var LARGE_ARRAY_SIZE2 = 200;
      var HASH_UNDEFINED4 = "__lodash_hash_undefined__";
      var MAX_SAFE_INTEGER4 = 9007199254740991;
      var argsTag5 = "[object Arguments]";
      var arrayTag4 = "[object Array]";
      var boolTag5 = "[object Boolean]";
      var dateTag5 = "[object Date]";
      var errorTag4 = "[object Error]";
      var funcTag4 = "[object Function]";
      var genTag3 = "[object GeneratorFunction]";
      var mapTag7 = "[object Map]";
      var numberTag5 = "[object Number]";
      var objectTag6 = "[object Object]";
      var promiseTag2 = "[object Promise]";
      var regexpTag5 = "[object RegExp]";
      var setTag7 = "[object Set]";
      var stringTag5 = "[object String]";
      var symbolTag4 = "[object Symbol]";
      var weakMapTag4 = "[object WeakMap]";
      var arrayBufferTag5 = "[object ArrayBuffer]";
      var dataViewTag6 = "[object DataView]";
      var float32Tag4 = "[object Float32Array]";
      var float64Tag4 = "[object Float64Array]";
      var int8Tag4 = "[object Int8Array]";
      var int16Tag4 = "[object Int16Array]";
      var int32Tag4 = "[object Int32Array]";
      var uint8Tag4 = "[object Uint8Array]";
      var uint8ClampedTag4 = "[object Uint8ClampedArray]";
      var uint16Tag4 = "[object Uint16Array]";
      var uint32Tag4 = "[object Uint32Array]";
      var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g;
      var reFlags2 = /\w*$/;
      var reIsHostCtor2 = /^\[object .+?Constructor\]$/;
      var reIsUint2 = /^(?:0|[1-9]\d*)$/;
      var cloneableTags2 = {};
      cloneableTags2[argsTag5] = cloneableTags2[arrayTag4] = cloneableTags2[arrayBufferTag5] = cloneableTags2[dataViewTag6] = cloneableTags2[boolTag5] = cloneableTags2[dateTag5] = cloneableTags2[float32Tag4] = cloneableTags2[float64Tag4] = cloneableTags2[int8Tag4] = cloneableTags2[int16Tag4] = cloneableTags2[int32Tag4] = cloneableTags2[mapTag7] = cloneableTags2[numberTag5] = cloneableTags2[objectTag6] = cloneableTags2[regexpTag5] = cloneableTags2[setTag7] = cloneableTags2[stringTag5] = cloneableTags2[symbolTag4] = cloneableTags2[uint8Tag4] = cloneableTags2[uint8ClampedTag4] = cloneableTags2[uint16Tag4] = cloneableTags2[uint32Tag4] = true;
      cloneableTags2[errorTag4] = cloneableTags2[funcTag4] = cloneableTags2[weakMapTag4] = false;
      var freeGlobal2 = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
      var root2 = freeGlobal2 || freeSelf2 || Function("return this")();
      var freeExports4 = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
      var freeModule4 = freeExports4 && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports4 = freeModule4 && freeModule4.exports === freeExports4;
      function addMapEntry(map3, pair) {
        map3.set(pair[0], pair[1]);
        return map3;
      }
      function addSetEntry(set, value) {
        set.add(value);
        return set;
      }
      function arrayEach2(array, iteratee) {
        var index = -1, length2 = array ? array.length : 0;
        while (++index < length2) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayPush2(array, values) {
        var index = -1, length2 = values.length, offset = array.length;
        while (++index < length2) {
          array[offset + index] = values[index];
        }
        return array;
      }
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length2 = array ? array.length : 0;
        if (initAccum && length2) {
          accumulator = array[++index];
        }
        while (++index < length2) {
          accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
      }
      function baseTimes2(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function getValue2(object, key) {
        return object == null ? void 0 : object[key];
      }
      function isHostObject(value) {
        var result = false;
        if (value != null && typeof value.toString != "function") {
          try {
            result = !!(value + "");
          } catch (e) {
          }
        }
        return result;
      }
      function mapToArray2(map3) {
        var index = -1, result = Array(map3.size);
        map3.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      function overArg2(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function setToArray2(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      var arrayProto2 = Array.prototype;
      var funcProto4 = Function.prototype;
      var objectProto17 = Object.prototype;
      var coreJsData2 = root2["__core-js_shared__"];
      var maskSrcKey2 = (function() {
        var uid = /[^.]+$/.exec(coreJsData2 && coreJsData2.keys && coreJsData2.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      })();
      var funcToString4 = funcProto4.toString;
      var hasOwnProperty14 = objectProto17.hasOwnProperty;
      var objectToString2 = objectProto17.toString;
      var reIsNative2 = RegExp(
        "^" + funcToString4.call(hasOwnProperty14).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      var Buffer4 = moduleExports4 ? root2.Buffer : void 0;
      var Symbol3 = root2.Symbol;
      var Uint8Array3 = root2.Uint8Array;
      var getPrototype2 = overArg2(Object.getPrototypeOf, Object);
      var objectCreate2 = Object.create;
      var propertyIsEnumerable3 = objectProto17.propertyIsEnumerable;
      var splice2 = arrayProto2.splice;
      var nativeGetSymbols3 = Object.getOwnPropertySymbols;
      var nativeIsBuffer2 = Buffer4 ? Buffer4.isBuffer : void 0;
      var nativeKeys2 = overArg2(Object.keys, Object);
      var DataView3 = getNative2(root2, "DataView");
      var Map3 = getNative2(root2, "Map");
      var Promise3 = getNative2(root2, "Promise");
      var Set3 = getNative2(root2, "Set");
      var WeakMap3 = getNative2(root2, "WeakMap");
      var nativeCreate2 = getNative2(Object, "create");
      var dataViewCtorString2 = toSource2(DataView3);
      var mapCtorString2 = toSource2(Map3);
      var promiseCtorString2 = toSource2(Promise3);
      var setCtorString2 = toSource2(Set3);
      var weakMapCtorString2 = toSource2(WeakMap3);
      var symbolProto3 = Symbol3 ? Symbol3.prototype : void 0;
      var symbolValueOf3 = symbolProto3 ? symbolProto3.valueOf : void 0;
      function Hash2(entries) {
        var index = -1, length2 = entries ? entries.length : 0;
        this.clear();
        while (++index < length2) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear2() {
        this.__data__ = nativeCreate2 ? nativeCreate2(null) : {};
      }
      function hashDelete2(key) {
        return this.has(key) && delete this.__data__[key];
      }
      function hashGet2(key) {
        var data = this.__data__;
        if (nativeCreate2) {
          var result = data[key];
          return result === HASH_UNDEFINED4 ? void 0 : result;
        }
        return hasOwnProperty14.call(data, key) ? data[key] : void 0;
      }
      function hashHas2(key) {
        var data = this.__data__;
        return nativeCreate2 ? data[key] !== void 0 : hasOwnProperty14.call(data, key);
      }
      function hashSet2(key, value) {
        var data = this.__data__;
        data[key] = nativeCreate2 && value === void 0 ? HASH_UNDEFINED4 : value;
        return this;
      }
      Hash2.prototype.clear = hashClear2;
      Hash2.prototype["delete"] = hashDelete2;
      Hash2.prototype.get = hashGet2;
      Hash2.prototype.has = hashHas2;
      Hash2.prototype.set = hashSet2;
      function ListCache2(entries) {
        var index = -1, length2 = entries ? entries.length : 0;
        this.clear();
        while (++index < length2) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear2() {
        this.__data__ = [];
      }
      function listCacheDelete2(key) {
        var data = this.__data__, index = assocIndexOf2(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice2.call(data, index, 1);
        }
        return true;
      }
      function listCacheGet2(key) {
        var data = this.__data__, index = assocIndexOf2(data, key);
        return index < 0 ? void 0 : data[index][1];
      }
      function listCacheHas2(key) {
        return assocIndexOf2(this.__data__, key) > -1;
      }
      function listCacheSet2(key, value) {
        var data = this.__data__, index = assocIndexOf2(data, key);
        if (index < 0) {
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      ListCache2.prototype.clear = listCacheClear2;
      ListCache2.prototype["delete"] = listCacheDelete2;
      ListCache2.prototype.get = listCacheGet2;
      ListCache2.prototype.has = listCacheHas2;
      ListCache2.prototype.set = listCacheSet2;
      function MapCache2(entries) {
        var index = -1, length2 = entries ? entries.length : 0;
        this.clear();
        while (++index < length2) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear2() {
        this.__data__ = {
          "hash": new Hash2(),
          "map": new (Map3 || ListCache2)(),
          "string": new Hash2()
        };
      }
      function mapCacheDelete2(key) {
        return getMapData2(this, key)["delete"](key);
      }
      function mapCacheGet2(key) {
        return getMapData2(this, key).get(key);
      }
      function mapCacheHas2(key) {
        return getMapData2(this, key).has(key);
      }
      function mapCacheSet2(key, value) {
        getMapData2(this, key).set(key, value);
        return this;
      }
      MapCache2.prototype.clear = mapCacheClear2;
      MapCache2.prototype["delete"] = mapCacheDelete2;
      MapCache2.prototype.get = mapCacheGet2;
      MapCache2.prototype.has = mapCacheHas2;
      MapCache2.prototype.set = mapCacheSet2;
      function Stack2(entries) {
        this.__data__ = new ListCache2(entries);
      }
      function stackClear2() {
        this.__data__ = new ListCache2();
      }
      function stackDelete2(key) {
        return this.__data__["delete"](key);
      }
      function stackGet2(key) {
        return this.__data__.get(key);
      }
      function stackHas2(key) {
        return this.__data__.has(key);
      }
      function stackSet2(key, value) {
        var cache = this.__data__;
        if (cache instanceof ListCache2) {
          var pairs = cache.__data__;
          if (!Map3 || pairs.length < LARGE_ARRAY_SIZE2 - 1) {
            pairs.push([key, value]);
            return this;
          }
          cache = this.__data__ = new MapCache2(pairs);
        }
        cache.set(key, value);
        return this;
      }
      Stack2.prototype.clear = stackClear2;
      Stack2.prototype["delete"] = stackDelete2;
      Stack2.prototype.get = stackGet2;
      Stack2.prototype.has = stackHas2;
      Stack2.prototype.set = stackSet2;
      function arrayLikeKeys2(value, inherited) {
        var result = isArray3(value) || isArguments2(value) ? baseTimes2(value.length, String) : [];
        var length2 = result.length, skipIndexes = !!length2;
        for (var key in value) {
          if ((inherited || hasOwnProperty14.call(value, key)) && !(skipIndexes && (key == "length" || isIndex2(key, length2)))) {
            result.push(key);
          }
        }
        return result;
      }
      function assignValue2(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty14.call(object, key) && eq2(objValue, value)) || value === void 0 && !(key in object)) {
          object[key] = value;
        }
      }
      function assocIndexOf2(array, key) {
        var length2 = array.length;
        while (length2--) {
          if (eq2(array[length2][0], key)) {
            return length2;
          }
        }
        return -1;
      }
      function baseAssign2(object, source) {
        return object && copyObject2(source, keys3(source), object);
      }
      function baseClone2(value, isDeep, isFull, customizer, key, object, stack) {
        var result;
        if (customizer) {
          result = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result !== void 0) {
          return result;
        }
        if (!isObject3(value)) {
          return value;
        }
        var isArr = isArray3(value);
        if (isArr) {
          result = initCloneArray2(value);
          if (!isDeep) {
            return copyArray2(value, result);
          }
        } else {
          var tag = getTag2(value), isFunc = tag == funcTag4 || tag == genTag3;
          if (isBuffer2(value)) {
            return cloneBuffer2(value, isDeep);
          }
          if (tag == objectTag6 || tag == argsTag5 || isFunc && !object) {
            if (isHostObject(value)) {
              return object ? value : {};
            }
            result = initCloneObject2(isFunc ? {} : value);
            if (!isDeep) {
              return copySymbols2(value, baseAssign2(result, value));
            }
          } else {
            if (!cloneableTags2[tag]) {
              return object ? value : {};
            }
            result = initCloneByTag2(value, tag, baseClone2, isDeep);
          }
        }
        stack || (stack = new Stack2());
        var stacked = stack.get(value);
        if (stacked) {
          return stacked;
        }
        stack.set(value, result);
        if (!isArr) {
          var props = isFull ? getAllKeys2(value) : keys3(value);
        }
        arrayEach2(props || value, function(subValue, key2) {
          if (props) {
            key2 = subValue;
            subValue = value[key2];
          }
          assignValue2(result, key2, baseClone2(subValue, isDeep, isFull, customizer, key2, value, stack));
        });
        return result;
      }
      function baseCreate2(proto) {
        return isObject3(proto) ? objectCreate2(proto) : {};
      }
      function baseGetAllKeys2(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray3(object) ? result : arrayPush2(result, symbolsFunc(object));
      }
      function baseGetTag2(value) {
        return objectToString2.call(value);
      }
      function baseIsNative2(value) {
        if (!isObject3(value) || isMasked2(value)) {
          return false;
        }
        var pattern = isFunction2(value) || isHostObject(value) ? reIsNative2 : reIsHostCtor2;
        return pattern.test(toSource2(value));
      }
      function baseKeys2(object) {
        if (!isPrototype2(object)) {
          return nativeKeys2(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty14.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      function cloneBuffer2(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var result = new buffer.constructor(buffer.length);
        buffer.copy(result);
        return result;
      }
      function cloneArrayBuffer2(arrayBuffer) {
        var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array3(result).set(new Uint8Array3(arrayBuffer));
        return result;
      }
      function cloneDataView2(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer2(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      function cloneMap(map3, isDeep, cloneFunc) {
        var array = isDeep ? cloneFunc(mapToArray2(map3), true) : mapToArray2(map3);
        return arrayReduce(array, addMapEntry, new map3.constructor());
      }
      function cloneRegExp2(regexp) {
        var result = new regexp.constructor(regexp.source, reFlags2.exec(regexp));
        result.lastIndex = regexp.lastIndex;
        return result;
      }
      function cloneSet(set, isDeep, cloneFunc) {
        var array = isDeep ? cloneFunc(setToArray2(set), true) : setToArray2(set);
        return arrayReduce(array, addSetEntry, new set.constructor());
      }
      function cloneSymbol2(symbol) {
        return symbolValueOf3 ? Object(symbolValueOf3.call(symbol)) : {};
      }
      function cloneTypedArray2(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer2(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      function copyArray2(source, array) {
        var index = -1, length2 = source.length;
        array || (array = Array(length2));
        while (++index < length2) {
          array[index] = source[index];
        }
        return array;
      }
      function copyObject2(source, props, object, customizer) {
        object || (object = {});
        var index = -1, length2 = props.length;
        while (++index < length2) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
          assignValue2(object, key, newValue === void 0 ? source[key] : newValue);
        }
        return object;
      }
      function copySymbols2(source, object) {
        return copyObject2(source, getSymbols2(source), object);
      }
      function getAllKeys2(object) {
        return baseGetAllKeys2(object, keys3, getSymbols2);
      }
      function getMapData2(map3, key) {
        var data = map3.__data__;
        return isKeyable2(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function getNative2(object, key) {
        var value = getValue2(object, key);
        return baseIsNative2(value) ? value : void 0;
      }
      var getSymbols2 = nativeGetSymbols3 ? overArg2(nativeGetSymbols3, Object) : stubArray2;
      var getTag2 = baseGetTag2;
      if (DataView3 && getTag2(new DataView3(new ArrayBuffer(1))) != dataViewTag6 || Map3 && getTag2(new Map3()) != mapTag7 || Promise3 && getTag2(Promise3.resolve()) != promiseTag2 || Set3 && getTag2(new Set3()) != setTag7 || WeakMap3 && getTag2(new WeakMap3()) != weakMapTag4) {
        getTag2 = function(value) {
          var result = objectToString2.call(value), Ctor = result == objectTag6 ? value.constructor : void 0, ctorString = Ctor ? toSource2(Ctor) : void 0;
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString2:
                return dataViewTag6;
              case mapCtorString2:
                return mapTag7;
              case promiseCtorString2:
                return promiseTag2;
              case setCtorString2:
                return setTag7;
              case weakMapCtorString2:
                return weakMapTag4;
            }
          }
          return result;
        };
      }
      function initCloneArray2(array) {
        var length2 = array.length, result = array.constructor(length2);
        if (length2 && typeof array[0] == "string" && hasOwnProperty14.call(array, "index")) {
          result.index = array.index;
          result.input = array.input;
        }
        return result;
      }
      function initCloneObject2(object) {
        return typeof object.constructor == "function" && !isPrototype2(object) ? baseCreate2(getPrototype2(object)) : {};
      }
      function initCloneByTag2(object, tag, cloneFunc, isDeep) {
        var Ctor = object.constructor;
        switch (tag) {
          case arrayBufferTag5:
            return cloneArrayBuffer2(object);
          case boolTag5:
          case dateTag5:
            return new Ctor(+object);
          case dataViewTag6:
            return cloneDataView2(object, isDeep);
          case float32Tag4:
          case float64Tag4:
          case int8Tag4:
          case int16Tag4:
          case int32Tag4:
          case uint8Tag4:
          case uint8ClampedTag4:
          case uint16Tag4:
          case uint32Tag4:
            return cloneTypedArray2(object, isDeep);
          case mapTag7:
            return cloneMap(object, isDeep, cloneFunc);
          case numberTag5:
          case stringTag5:
            return new Ctor(object);
          case regexpTag5:
            return cloneRegExp2(object);
          case setTag7:
            return cloneSet(object, isDeep, cloneFunc);
          case symbolTag4:
            return cloneSymbol2(object);
        }
      }
      function isIndex2(value, length2) {
        length2 = length2 == null ? MAX_SAFE_INTEGER4 : length2;
        return !!length2 && (typeof value == "number" || reIsUint2.test(value)) && (value > -1 && value % 1 == 0 && value < length2);
      }
      function isKeyable2(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function isMasked2(func) {
        return !!maskSrcKey2 && maskSrcKey2 in func;
      }
      function isPrototype2(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto17;
        return value === proto;
      }
      function toSource2(func) {
        if (func != null) {
          try {
            return funcToString4.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      function cloneDeep2(value) {
        return baseClone2(value, true, true);
      }
      function eq2(value, other) {
        return value === other || value !== value && other !== other;
      }
      function isArguments2(value) {
        return isArrayLikeObject2(value) && hasOwnProperty14.call(value, "callee") && (!propertyIsEnumerable3.call(value, "callee") || objectToString2.call(value) == argsTag5);
      }
      var isArray3 = Array.isArray;
      function isArrayLike2(value) {
        return value != null && isLength2(value.length) && !isFunction2(value);
      }
      function isArrayLikeObject2(value) {
        return isObjectLike2(value) && isArrayLike2(value);
      }
      var isBuffer2 = nativeIsBuffer2 || stubFalse2;
      function isFunction2(value) {
        var tag = isObject3(value) ? objectToString2.call(value) : "";
        return tag == funcTag4 || tag == genTag3;
      }
      function isLength2(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER4;
      }
      function isObject3(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike2(value) {
        return !!value && typeof value == "object";
      }
      function keys3(object) {
        return isArrayLike2(object) ? arrayLikeKeys2(object) : baseKeys2(object);
      }
      function stubArray2() {
        return [];
      }
      function stubFalse2() {
        return false;
      }
      module2.exports = cloneDeep2;
    }
  });

  // node_modules/lodash.isequal/index.js
  var require_lodash2 = __commonJS({
    "node_modules/lodash.isequal/index.js"(exports2, module2) {
      var LARGE_ARRAY_SIZE2 = 200;
      var HASH_UNDEFINED4 = "__lodash_hash_undefined__";
      var COMPARE_PARTIAL_FLAG5 = 1;
      var COMPARE_UNORDERED_FLAG3 = 2;
      var MAX_SAFE_INTEGER4 = 9007199254740991;
      var argsTag5 = "[object Arguments]";
      var arrayTag4 = "[object Array]";
      var asyncTag2 = "[object AsyncFunction]";
      var boolTag5 = "[object Boolean]";
      var dateTag5 = "[object Date]";
      var errorTag4 = "[object Error]";
      var funcTag4 = "[object Function]";
      var genTag3 = "[object GeneratorFunction]";
      var mapTag7 = "[object Map]";
      var numberTag5 = "[object Number]";
      var nullTag2 = "[object Null]";
      var objectTag6 = "[object Object]";
      var promiseTag2 = "[object Promise]";
      var proxyTag2 = "[object Proxy]";
      var regexpTag5 = "[object RegExp]";
      var setTag7 = "[object Set]";
      var stringTag5 = "[object String]";
      var symbolTag4 = "[object Symbol]";
      var undefinedTag2 = "[object Undefined]";
      var weakMapTag4 = "[object WeakMap]";
      var arrayBufferTag5 = "[object ArrayBuffer]";
      var dataViewTag6 = "[object DataView]";
      var float32Tag4 = "[object Float32Array]";
      var float64Tag4 = "[object Float64Array]";
      var int8Tag4 = "[object Int8Array]";
      var int16Tag4 = "[object Int16Array]";
      var int32Tag4 = "[object Int32Array]";
      var uint8Tag4 = "[object Uint8Array]";
      var uint8ClampedTag4 = "[object Uint8ClampedArray]";
      var uint16Tag4 = "[object Uint16Array]";
      var uint32Tag4 = "[object Uint32Array]";
      var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g;
      var reIsHostCtor2 = /^\[object .+?Constructor\]$/;
      var reIsUint2 = /^(?:0|[1-9]\d*)$/;
      var typedArrayTags2 = {};
      typedArrayTags2[float32Tag4] = typedArrayTags2[float64Tag4] = typedArrayTags2[int8Tag4] = typedArrayTags2[int16Tag4] = typedArrayTags2[int32Tag4] = typedArrayTags2[uint8Tag4] = typedArrayTags2[uint8ClampedTag4] = typedArrayTags2[uint16Tag4] = typedArrayTags2[uint32Tag4] = true;
      typedArrayTags2[argsTag5] = typedArrayTags2[arrayTag4] = typedArrayTags2[arrayBufferTag5] = typedArrayTags2[boolTag5] = typedArrayTags2[dataViewTag6] = typedArrayTags2[dateTag5] = typedArrayTags2[errorTag4] = typedArrayTags2[funcTag4] = typedArrayTags2[mapTag7] = typedArrayTags2[numberTag5] = typedArrayTags2[objectTag6] = typedArrayTags2[regexpTag5] = typedArrayTags2[setTag7] = typedArrayTags2[stringTag5] = typedArrayTags2[weakMapTag4] = false;
      var freeGlobal2 = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
      var root2 = freeGlobal2 || freeSelf2 || Function("return this")();
      var freeExports4 = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
      var freeModule4 = freeExports4 && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports4 = freeModule4 && freeModule4.exports === freeExports4;
      var freeProcess2 = moduleExports4 && freeGlobal2.process;
      var nodeUtil2 = (function() {
        try {
          return freeProcess2 && freeProcess2.binding && freeProcess2.binding("util");
        } catch (e) {
        }
      })();
      var nodeIsTypedArray2 = nodeUtil2 && nodeUtil2.isTypedArray;
      function arrayFilter2(array, predicate) {
        var index = -1, length2 = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length2) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function arrayPush2(array, values) {
        var index = -1, length2 = values.length, offset = array.length;
        while (++index < length2) {
          array[offset + index] = values[index];
        }
        return array;
      }
      function arraySome2(array, predicate) {
        var index = -1, length2 = array == null ? 0 : array.length;
        while (++index < length2) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      function baseTimes2(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function baseUnary2(func) {
        return function(value) {
          return func(value);
        };
      }
      function cacheHas2(cache, key) {
        return cache.has(key);
      }
      function getValue2(object, key) {
        return object == null ? void 0 : object[key];
      }
      function mapToArray2(map3) {
        var index = -1, result = Array(map3.size);
        map3.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      function overArg2(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function setToArray2(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      var arrayProto2 = Array.prototype;
      var funcProto4 = Function.prototype;
      var objectProto17 = Object.prototype;
      var coreJsData2 = root2["__core-js_shared__"];
      var funcToString4 = funcProto4.toString;
      var hasOwnProperty14 = objectProto17.hasOwnProperty;
      var maskSrcKey2 = (function() {
        var uid = /[^.]+$/.exec(coreJsData2 && coreJsData2.keys && coreJsData2.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      })();
      var nativeObjectToString3 = objectProto17.toString;
      var reIsNative2 = RegExp(
        "^" + funcToString4.call(hasOwnProperty14).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      var Buffer4 = moduleExports4 ? root2.Buffer : void 0;
      var Symbol3 = root2.Symbol;
      var Uint8Array3 = root2.Uint8Array;
      var propertyIsEnumerable3 = objectProto17.propertyIsEnumerable;
      var splice2 = arrayProto2.splice;
      var symToStringTag3 = Symbol3 ? Symbol3.toStringTag : void 0;
      var nativeGetSymbols3 = Object.getOwnPropertySymbols;
      var nativeIsBuffer2 = Buffer4 ? Buffer4.isBuffer : void 0;
      var nativeKeys2 = overArg2(Object.keys, Object);
      var DataView3 = getNative2(root2, "DataView");
      var Map3 = getNative2(root2, "Map");
      var Promise3 = getNative2(root2, "Promise");
      var Set3 = getNative2(root2, "Set");
      var WeakMap3 = getNative2(root2, "WeakMap");
      var nativeCreate2 = getNative2(Object, "create");
      var dataViewCtorString2 = toSource2(DataView3);
      var mapCtorString2 = toSource2(Map3);
      var promiseCtorString2 = toSource2(Promise3);
      var setCtorString2 = toSource2(Set3);
      var weakMapCtorString2 = toSource2(WeakMap3);
      var symbolProto3 = Symbol3 ? Symbol3.prototype : void 0;
      var symbolValueOf3 = symbolProto3 ? symbolProto3.valueOf : void 0;
      function Hash2(entries) {
        var index = -1, length2 = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length2) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear2() {
        this.__data__ = nativeCreate2 ? nativeCreate2(null) : {};
        this.size = 0;
      }
      function hashDelete2(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
      }
      function hashGet2(key) {
        var data = this.__data__;
        if (nativeCreate2) {
          var result = data[key];
          return result === HASH_UNDEFINED4 ? void 0 : result;
        }
        return hasOwnProperty14.call(data, key) ? data[key] : void 0;
      }
      function hashHas2(key) {
        var data = this.__data__;
        return nativeCreate2 ? data[key] !== void 0 : hasOwnProperty14.call(data, key);
      }
      function hashSet2(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate2 && value === void 0 ? HASH_UNDEFINED4 : value;
        return this;
      }
      Hash2.prototype.clear = hashClear2;
      Hash2.prototype["delete"] = hashDelete2;
      Hash2.prototype.get = hashGet2;
      Hash2.prototype.has = hashHas2;
      Hash2.prototype.set = hashSet2;
      function ListCache2(entries) {
        var index = -1, length2 = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length2) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear2() {
        this.__data__ = [];
        this.size = 0;
      }
      function listCacheDelete2(key) {
        var data = this.__data__, index = assocIndexOf2(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice2.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      function listCacheGet2(key) {
        var data = this.__data__, index = assocIndexOf2(data, key);
        return index < 0 ? void 0 : data[index][1];
      }
      function listCacheHas2(key) {
        return assocIndexOf2(this.__data__, key) > -1;
      }
      function listCacheSet2(key, value) {
        var data = this.__data__, index = assocIndexOf2(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      ListCache2.prototype.clear = listCacheClear2;
      ListCache2.prototype["delete"] = listCacheDelete2;
      ListCache2.prototype.get = listCacheGet2;
      ListCache2.prototype.has = listCacheHas2;
      ListCache2.prototype.set = listCacheSet2;
      function MapCache2(entries) {
        var index = -1, length2 = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length2) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear2() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash2(),
          "map": new (Map3 || ListCache2)(),
          "string": new Hash2()
        };
      }
      function mapCacheDelete2(key) {
        var result = getMapData2(this, key)["delete"](key);
        this.size -= result ? 1 : 0;
        return result;
      }
      function mapCacheGet2(key) {
        return getMapData2(this, key).get(key);
      }
      function mapCacheHas2(key) {
        return getMapData2(this, key).has(key);
      }
      function mapCacheSet2(key, value) {
        var data = getMapData2(this, key), size2 = data.size;
        data.set(key, value);
        this.size += data.size == size2 ? 0 : 1;
        return this;
      }
      MapCache2.prototype.clear = mapCacheClear2;
      MapCache2.prototype["delete"] = mapCacheDelete2;
      MapCache2.prototype.get = mapCacheGet2;
      MapCache2.prototype.has = mapCacheHas2;
      MapCache2.prototype.set = mapCacheSet2;
      function SetCache2(values) {
        var index = -1, length2 = values == null ? 0 : values.length;
        this.__data__ = new MapCache2();
        while (++index < length2) {
          this.add(values[index]);
        }
      }
      function setCacheAdd2(value) {
        this.__data__.set(value, HASH_UNDEFINED4);
        return this;
      }
      function setCacheHas2(value) {
        return this.__data__.has(value);
      }
      SetCache2.prototype.add = SetCache2.prototype.push = setCacheAdd2;
      SetCache2.prototype.has = setCacheHas2;
      function Stack2(entries) {
        var data = this.__data__ = new ListCache2(entries);
        this.size = data.size;
      }
      function stackClear2() {
        this.__data__ = new ListCache2();
        this.size = 0;
      }
      function stackDelete2(key) {
        var data = this.__data__, result = data["delete"](key);
        this.size = data.size;
        return result;
      }
      function stackGet2(key) {
        return this.__data__.get(key);
      }
      function stackHas2(key) {
        return this.__data__.has(key);
      }
      function stackSet2(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache2) {
          var pairs = data.__data__;
          if (!Map3 || pairs.length < LARGE_ARRAY_SIZE2 - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache2(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }
      Stack2.prototype.clear = stackClear2;
      Stack2.prototype["delete"] = stackDelete2;
      Stack2.prototype.get = stackGet2;
      Stack2.prototype.has = stackHas2;
      Stack2.prototype.set = stackSet2;
      function arrayLikeKeys2(value, inherited) {
        var isArr = isArray3(value), isArg = !isArr && isArguments2(value), isBuff = !isArr && !isArg && isBuffer2(value), isType = !isArr && !isArg && !isBuff && isTypedArray2(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes2(value.length, String) : [], length2 = result.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty14.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex2(key, length2)))) {
            result.push(key);
          }
        }
        return result;
      }
      function assocIndexOf2(array, key) {
        var length2 = array.length;
        while (length2--) {
          if (eq2(array[length2][0], key)) {
            return length2;
          }
        }
        return -1;
      }
      function baseGetAllKeys2(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray3(object) ? result : arrayPush2(result, symbolsFunc(object));
      }
      function baseGetTag2(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag2 : nullTag2;
        }
        return symToStringTag3 && symToStringTag3 in Object(value) ? getRawTag2(value) : objectToString2(value);
      }
      function baseIsArguments2(value) {
        return isObjectLike2(value) && baseGetTag2(value) == argsTag5;
      }
      function baseIsEqual2(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike2(value) && !isObjectLike2(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep2(value, other, bitmask, customizer, baseIsEqual2, stack);
      }
      function baseIsEqualDeep2(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray3(object), othIsArr = isArray3(other), objTag = objIsArr ? arrayTag4 : getTag2(object), othTag = othIsArr ? arrayTag4 : getTag2(other);
        objTag = objTag == argsTag5 ? objectTag6 : objTag;
        othTag = othTag == argsTag5 ? objectTag6 : othTag;
        var objIsObj = objTag == objectTag6, othIsObj = othTag == objectTag6, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer2(object)) {
          if (!isBuffer2(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack2());
          return objIsArr || isTypedArray2(object) ? equalArrays2(object, other, bitmask, customizer, equalFunc, stack) : equalByTag2(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG5)) {
          var objIsWrapped = objIsObj && hasOwnProperty14.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty14.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack2());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack2());
        return equalObjects2(object, other, bitmask, customizer, equalFunc, stack);
      }
      function baseIsNative2(value) {
        if (!isObject3(value) || isMasked2(value)) {
          return false;
        }
        var pattern = isFunction2(value) ? reIsNative2 : reIsHostCtor2;
        return pattern.test(toSource2(value));
      }
      function baseIsTypedArray2(value) {
        return isObjectLike2(value) && isLength2(value.length) && !!typedArrayTags2[baseGetTag2(value)];
      }
      function baseKeys2(object) {
        if (!isPrototype2(object)) {
          return nativeKeys2(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty14.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      function equalArrays2(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG5, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var stacked = stack.get(array);
        if (stacked && stack.get(other)) {
          return stacked == other;
        }
        var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG3 ? new SetCache2() : void 0;
        stack.set(array, other);
        stack.set(other, array);
        while (++index < arrLength) {
          var arrValue = array[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          }
          if (compared !== void 0) {
            if (compared) {
              continue;
            }
            result = false;
            break;
          }
          if (seen) {
            if (!arraySome2(other, function(othValue2, othIndex) {
              if (!cacheHas2(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
              result = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result = false;
            break;
          }
        }
        stack["delete"](array);
        stack["delete"](other);
        return result;
      }
      function equalByTag2(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag6:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;
          case arrayBufferTag5:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array3(object), new Uint8Array3(other))) {
              return false;
            }
            return true;
          case boolTag5:
          case dateTag5:
          case numberTag5:
            return eq2(+object, +other);
          case errorTag4:
            return object.name == other.name && object.message == other.message;
          case regexpTag5:
          case stringTag5:
            return object == other + "";
          case mapTag7:
            var convert = mapToArray2;
          case setTag7:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG5;
            convert || (convert = setToArray2);
            if (object.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG3;
            stack.set(object, other);
            var result = equalArrays2(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object);
            return result;
          case symbolTag4:
            if (symbolValueOf3) {
              return symbolValueOf3.call(object) == symbolValueOf3.call(other);
            }
        }
        return false;
      }
      function equalObjects2(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG5, objProps = getAllKeys2(object), objLength = objProps.length, othProps = getAllKeys2(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty14.call(other, key))) {
            return false;
          }
        }
        var stacked = stack.get(object);
        if (stacked && stack.get(other)) {
          return stacked == other;
        }
        var result = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          }
          if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result = false;
          }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result;
      }
      function getAllKeys2(object) {
        return baseGetAllKeys2(object, keys3, getSymbols2);
      }
      function getMapData2(map3, key) {
        var data = map3.__data__;
        return isKeyable2(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function getNative2(object, key) {
        var value = getValue2(object, key);
        return baseIsNative2(value) ? value : void 0;
      }
      function getRawTag2(value) {
        var isOwn = hasOwnProperty14.call(value, symToStringTag3), tag = value[symToStringTag3];
        try {
          value[symToStringTag3] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString3.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag3] = tag;
          } else {
            delete value[symToStringTag3];
          }
        }
        return result;
      }
      var getSymbols2 = !nativeGetSymbols3 ? stubArray2 : function(object) {
        if (object == null) {
          return [];
        }
        object = Object(object);
        return arrayFilter2(nativeGetSymbols3(object), function(symbol) {
          return propertyIsEnumerable3.call(object, symbol);
        });
      };
      var getTag2 = baseGetTag2;
      if (DataView3 && getTag2(new DataView3(new ArrayBuffer(1))) != dataViewTag6 || Map3 && getTag2(new Map3()) != mapTag7 || Promise3 && getTag2(Promise3.resolve()) != promiseTag2 || Set3 && getTag2(new Set3()) != setTag7 || WeakMap3 && getTag2(new WeakMap3()) != weakMapTag4) {
        getTag2 = function(value) {
          var result = baseGetTag2(value), Ctor = result == objectTag6 ? value.constructor : void 0, ctorString = Ctor ? toSource2(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString2:
                return dataViewTag6;
              case mapCtorString2:
                return mapTag7;
              case promiseCtorString2:
                return promiseTag2;
              case setCtorString2:
                return setTag7;
              case weakMapCtorString2:
                return weakMapTag4;
            }
          }
          return result;
        };
      }
      function isIndex2(value, length2) {
        length2 = length2 == null ? MAX_SAFE_INTEGER4 : length2;
        return !!length2 && (typeof value == "number" || reIsUint2.test(value)) && (value > -1 && value % 1 == 0 && value < length2);
      }
      function isKeyable2(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function isMasked2(func) {
        return !!maskSrcKey2 && maskSrcKey2 in func;
      }
      function isPrototype2(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto17;
        return value === proto;
      }
      function objectToString2(value) {
        return nativeObjectToString3.call(value);
      }
      function toSource2(func) {
        if (func != null) {
          try {
            return funcToString4.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      function eq2(value, other) {
        return value === other || value !== value && other !== other;
      }
      var isArguments2 = baseIsArguments2(/* @__PURE__ */ (function() {
        return arguments;
      })()) ? baseIsArguments2 : function(value) {
        return isObjectLike2(value) && hasOwnProperty14.call(value, "callee") && !propertyIsEnumerable3.call(value, "callee");
      };
      var isArray3 = Array.isArray;
      function isArrayLike2(value) {
        return value != null && isLength2(value.length) && !isFunction2(value);
      }
      var isBuffer2 = nativeIsBuffer2 || stubFalse2;
      function isEqual3(value, other) {
        return baseIsEqual2(value, other);
      }
      function isFunction2(value) {
        if (!isObject3(value)) {
          return false;
        }
        var tag = baseGetTag2(value);
        return tag == funcTag4 || tag == genTag3 || tag == asyncTag2 || tag == proxyTag2;
      }
      function isLength2(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER4;
      }
      function isObject3(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      function isObjectLike2(value) {
        return value != null && typeof value == "object";
      }
      var isTypedArray2 = nodeIsTypedArray2 ? baseUnary2(nodeIsTypedArray2) : baseIsTypedArray2;
      function keys3(object) {
        return isArrayLike2(object) ? arrayLikeKeys2(object) : baseKeys2(object);
      }
      function stubArray2() {
        return [];
      }
      function stubFalse2() {
        return false;
      }
      module2.exports = isEqual3;
    }
  });

  // node_modules/quill-delta/dist/AttributeMap.js
  var require_AttributeMap = __commonJS({
    "node_modules/quill-delta/dist/AttributeMap.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var cloneDeep2 = require_lodash();
      var isEqual3 = require_lodash2();
      var AttributeMap5;
      (function(AttributeMap6) {
        function compose(a = {}, b = {}, keepNull = false) {
          if (typeof a !== "object") {
            a = {};
          }
          if (typeof b !== "object") {
            b = {};
          }
          let attributes = cloneDeep2(b);
          if (!keepNull) {
            attributes = Object.keys(attributes).reduce((copy2, key) => {
              if (attributes[key] != null) {
                copy2[key] = attributes[key];
              }
              return copy2;
            }, {});
          }
          for (const key in a) {
            if (a[key] !== void 0 && b[key] === void 0) {
              attributes[key] = a[key];
            }
          }
          return Object.keys(attributes).length > 0 ? attributes : void 0;
        }
        AttributeMap6.compose = compose;
        function diff(a = {}, b = {}) {
          if (typeof a !== "object") {
            a = {};
          }
          if (typeof b !== "object") {
            b = {};
          }
          const attributes = Object.keys(a).concat(Object.keys(b)).reduce((attrs, key) => {
            if (!isEqual3(a[key], b[key])) {
              attrs[key] = b[key] === void 0 ? null : b[key];
            }
            return attrs;
          }, {});
          return Object.keys(attributes).length > 0 ? attributes : void 0;
        }
        AttributeMap6.diff = diff;
        function invert(attr = {}, base = {}) {
          attr = attr || {};
          const baseInverted = Object.keys(base).reduce((memo, key) => {
            if (base[key] !== attr[key] && attr[key] !== void 0) {
              memo[key] = base[key];
            }
            return memo;
          }, {});
          return Object.keys(attr).reduce((memo, key) => {
            if (attr[key] !== base[key] && base[key] === void 0) {
              memo[key] = null;
            }
            return memo;
          }, baseInverted);
        }
        AttributeMap6.invert = invert;
        function transform(a, b, priority = false) {
          if (typeof a !== "object") {
            return b;
          }
          if (typeof b !== "object") {
            return void 0;
          }
          if (!priority) {
            return b;
          }
          const attributes = Object.keys(b).reduce((attrs, key) => {
            if (a[key] === void 0) {
              attrs[key] = b[key];
            }
            return attrs;
          }, {});
          return Object.keys(attributes).length > 0 ? attributes : void 0;
        }
        AttributeMap6.transform = transform;
      })(AttributeMap5 || (AttributeMap5 = {}));
      exports2.default = AttributeMap5;
    }
  });

  // node_modules/quill-delta/dist/Op.js
  var require_Op = __commonJS({
    "node_modules/quill-delta/dist/Op.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var Op4;
      (function(Op5) {
        function length2(op) {
          if (typeof op.delete === "number") {
            return op.delete;
          } else if (typeof op.retain === "number") {
            return op.retain;
          } else if (typeof op.retain === "object" && op.retain !== null) {
            return 1;
          } else {
            return typeof op.insert === "string" ? op.insert.length : 1;
          }
        }
        Op5.length = length2;
      })(Op4 || (Op4 = {}));
      exports2.default = Op4;
    }
  });

  // node_modules/quill-delta/dist/OpIterator.js
  var require_OpIterator = __commonJS({
    "node_modules/quill-delta/dist/OpIterator.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var Op_1 = require_Op();
      var Iterator = class {
        constructor(ops) {
          this.ops = ops;
          this.index = 0;
          this.offset = 0;
        }
        hasNext() {
          return this.peekLength() < Infinity;
        }
        next(length2) {
          if (!length2) {
            length2 = Infinity;
          }
          const nextOp = this.ops[this.index];
          if (nextOp) {
            const offset = this.offset;
            const opLength = Op_1.default.length(nextOp);
            if (length2 >= opLength - offset) {
              length2 = opLength - offset;
              this.index += 1;
              this.offset = 0;
            } else {
              this.offset += length2;
            }
            if (typeof nextOp.delete === "number") {
              return { delete: length2 };
            } else {
              const retOp = {};
              if (nextOp.attributes) {
                retOp.attributes = nextOp.attributes;
              }
              if (typeof nextOp.retain === "number") {
                retOp.retain = length2;
              } else if (typeof nextOp.retain === "object" && nextOp.retain !== null) {
                retOp.retain = nextOp.retain;
              } else if (typeof nextOp.insert === "string") {
                retOp.insert = nextOp.insert.substr(offset, length2);
              } else {
                retOp.insert = nextOp.insert;
              }
              return retOp;
            }
          } else {
            return { retain: Infinity };
          }
        }
        peek() {
          return this.ops[this.index];
        }
        peekLength() {
          if (this.ops[this.index]) {
            return Op_1.default.length(this.ops[this.index]) - this.offset;
          } else {
            return Infinity;
          }
        }
        peekType() {
          const op = this.ops[this.index];
          if (op) {
            if (typeof op.delete === "number") {
              return "delete";
            } else if (typeof op.retain === "number" || typeof op.retain === "object" && op.retain !== null) {
              return "retain";
            } else {
              return "insert";
            }
          }
          return "retain";
        }
        rest() {
          if (!this.hasNext()) {
            return [];
          } else if (this.offset === 0) {
            return this.ops.slice(this.index);
          } else {
            const offset = this.offset;
            const index = this.index;
            const next = this.next();
            const rest = this.ops.slice(this.index);
            this.offset = offset;
            this.index = index;
            return [next].concat(rest);
          }
        }
      };
      exports2.default = Iterator;
    }
  });

  // node_modules/quill-delta/dist/Delta.js
  var require_Delta = __commonJS({
    "node_modules/quill-delta/dist/Delta.js"(exports2, module2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.AttributeMap = exports2.OpIterator = exports2.Op = void 0;
      var diff = require_diff();
      var cloneDeep2 = require_lodash();
      var isEqual3 = require_lodash2();
      var AttributeMap_1 = require_AttributeMap();
      exports2.AttributeMap = AttributeMap_1.default;
      var Op_1 = require_Op();
      exports2.Op = Op_1.default;
      var OpIterator_1 = require_OpIterator();
      exports2.OpIterator = OpIterator_1.default;
      var NULL_CHARACTER = String.fromCharCode(0);
      var getEmbedTypeAndData = (a, b) => {
        if (typeof a !== "object" || a === null) {
          throw new Error(`cannot retain a ${typeof a}`);
        }
        if (typeof b !== "object" || b === null) {
          throw new Error(`cannot retain a ${typeof b}`);
        }
        const embedType = Object.keys(a)[0];
        if (!embedType || embedType !== Object.keys(b)[0]) {
          throw new Error(`embed types not matched: ${embedType} != ${Object.keys(b)[0]}`);
        }
        return [embedType, a[embedType], b[embedType]];
      };
      var Delta13 = class _Delta {
        constructor(ops) {
          if (Array.isArray(ops)) {
            this.ops = ops;
          } else if (ops != null && Array.isArray(ops.ops)) {
            this.ops = ops.ops;
          } else {
            this.ops = [];
          }
        }
        static registerEmbed(embedType, handler) {
          this.handlers[embedType] = handler;
        }
        static unregisterEmbed(embedType) {
          delete this.handlers[embedType];
        }
        static getHandler(embedType) {
          const handler = this.handlers[embedType];
          if (!handler) {
            throw new Error(`no handlers for embed type "${embedType}"`);
          }
          return handler;
        }
        insert(arg, attributes) {
          const newOp = {};
          if (typeof arg === "string" && arg.length === 0) {
            return this;
          }
          newOp.insert = arg;
          if (attributes != null && typeof attributes === "object" && Object.keys(attributes).length > 0) {
            newOp.attributes = attributes;
          }
          return this.push(newOp);
        }
        delete(length2) {
          if (length2 <= 0) {
            return this;
          }
          return this.push({ delete: length2 });
        }
        retain(length2, attributes) {
          if (typeof length2 === "number" && length2 <= 0) {
            return this;
          }
          const newOp = { retain: length2 };
          if (attributes != null && typeof attributes === "object" && Object.keys(attributes).length > 0) {
            newOp.attributes = attributes;
          }
          return this.push(newOp);
        }
        push(newOp) {
          let index = this.ops.length;
          let lastOp = this.ops[index - 1];
          newOp = cloneDeep2(newOp);
          if (typeof lastOp === "object") {
            if (typeof newOp.delete === "number" && typeof lastOp.delete === "number") {
              this.ops[index - 1] = { delete: lastOp.delete + newOp.delete };
              return this;
            }
            if (typeof lastOp.delete === "number" && newOp.insert != null) {
              index -= 1;
              lastOp = this.ops[index - 1];
              if (typeof lastOp !== "object") {
                this.ops.unshift(newOp);
                return this;
              }
            }
            if (isEqual3(newOp.attributes, lastOp.attributes)) {
              if (typeof newOp.insert === "string" && typeof lastOp.insert === "string") {
                this.ops[index - 1] = { insert: lastOp.insert + newOp.insert };
                if (typeof newOp.attributes === "object") {
                  this.ops[index - 1].attributes = newOp.attributes;
                }
                return this;
              } else if (typeof newOp.retain === "number" && typeof lastOp.retain === "number") {
                this.ops[index - 1] = { retain: lastOp.retain + newOp.retain };
                if (typeof newOp.attributes === "object") {
                  this.ops[index - 1].attributes = newOp.attributes;
                }
                return this;
              }
            }
          }
          if (index === this.ops.length) {
            this.ops.push(newOp);
          } else {
            this.ops.splice(index, 0, newOp);
          }
          return this;
        }
        chop() {
          const lastOp = this.ops[this.ops.length - 1];
          if (lastOp && typeof lastOp.retain === "number" && !lastOp.attributes) {
            this.ops.pop();
          }
          return this;
        }
        filter(predicate) {
          return this.ops.filter(predicate);
        }
        forEach(predicate) {
          this.ops.forEach(predicate);
        }
        map(predicate) {
          return this.ops.map(predicate);
        }
        partition(predicate) {
          const passed = [];
          const failed = [];
          this.forEach((op) => {
            const target = predicate(op) ? passed : failed;
            target.push(op);
          });
          return [passed, failed];
        }
        reduce(predicate, initialValue) {
          return this.ops.reduce(predicate, initialValue);
        }
        changeLength() {
          return this.reduce((length2, elem) => {
            if (elem.insert) {
              return length2 + Op_1.default.length(elem);
            } else if (elem.delete) {
              return length2 - elem.delete;
            }
            return length2;
          }, 0);
        }
        length() {
          return this.reduce((length2, elem) => {
            return length2 + Op_1.default.length(elem);
          }, 0);
        }
        slice(start = 0, end = Infinity) {
          const ops = [];
          const iter = new OpIterator_1.default(this.ops);
          let index = 0;
          while (index < end && iter.hasNext()) {
            let nextOp;
            if (index < start) {
              nextOp = iter.next(start - index);
            } else {
              nextOp = iter.next(end - index);
              ops.push(nextOp);
            }
            index += Op_1.default.length(nextOp);
          }
          return new _Delta(ops);
        }
        compose(other) {
          const thisIter = new OpIterator_1.default(this.ops);
          const otherIter = new OpIterator_1.default(other.ops);
          const ops = [];
          const firstOther = otherIter.peek();
          if (firstOther != null && typeof firstOther.retain === "number" && firstOther.attributes == null) {
            let firstLeft = firstOther.retain;
            while (thisIter.peekType() === "insert" && thisIter.peekLength() <= firstLeft) {
              firstLeft -= thisIter.peekLength();
              ops.push(thisIter.next());
            }
            if (firstOther.retain - firstLeft > 0) {
              otherIter.next(firstOther.retain - firstLeft);
            }
          }
          const delta = new _Delta(ops);
          while (thisIter.hasNext() || otherIter.hasNext()) {
            if (otherIter.peekType() === "insert") {
              delta.push(otherIter.next());
            } else if (thisIter.peekType() === "delete") {
              delta.push(thisIter.next());
            } else {
              const length2 = Math.min(thisIter.peekLength(), otherIter.peekLength());
              const thisOp = thisIter.next(length2);
              const otherOp = otherIter.next(length2);
              if (otherOp.retain) {
                const newOp = {};
                if (typeof thisOp.retain === "number") {
                  newOp.retain = typeof otherOp.retain === "number" ? length2 : otherOp.retain;
                } else {
                  if (typeof otherOp.retain === "number") {
                    if (thisOp.retain == null) {
                      newOp.insert = thisOp.insert;
                    } else {
                      newOp.retain = thisOp.retain;
                    }
                  } else {
                    const action = thisOp.retain == null ? "insert" : "retain";
                    const [embedType, thisData, otherData] = getEmbedTypeAndData(thisOp[action], otherOp.retain);
                    const handler = _Delta.getHandler(embedType);
                    newOp[action] = {
                      [embedType]: handler.compose(thisData, otherData, action === "retain")
                    };
                  }
                }
                const attributes = AttributeMap_1.default.compose(thisOp.attributes, otherOp.attributes, typeof thisOp.retain === "number");
                if (attributes) {
                  newOp.attributes = attributes;
                }
                delta.push(newOp);
                if (!otherIter.hasNext() && isEqual3(delta.ops[delta.ops.length - 1], newOp)) {
                  const rest = new _Delta(thisIter.rest());
                  return delta.concat(rest).chop();
                }
              } else if (typeof otherOp.delete === "number" && (typeof thisOp.retain === "number" || typeof thisOp.retain === "object" && thisOp.retain !== null)) {
                delta.push(otherOp);
              }
            }
          }
          return delta.chop();
        }
        concat(other) {
          const delta = new _Delta(this.ops.slice());
          if (other.ops.length > 0) {
            delta.push(other.ops[0]);
            delta.ops = delta.ops.concat(other.ops.slice(1));
          }
          return delta;
        }
        diff(other, cursor) {
          if (this.ops === other.ops) {
            return new _Delta();
          }
          const strings = [this, other].map((delta) => {
            return delta.map((op) => {
              if (op.insert != null) {
                return typeof op.insert === "string" ? op.insert : NULL_CHARACTER;
              }
              const prep = delta === other ? "on" : "with";
              throw new Error("diff() called " + prep + " non-document");
            }).join("");
          });
          const retDelta = new _Delta();
          const diffResult = diff(strings[0], strings[1], cursor, true);
          const thisIter = new OpIterator_1.default(this.ops);
          const otherIter = new OpIterator_1.default(other.ops);
          diffResult.forEach((component) => {
            let length2 = component[1].length;
            while (length2 > 0) {
              let opLength = 0;
              switch (component[0]) {
                case diff.INSERT:
                  opLength = Math.min(otherIter.peekLength(), length2);
                  retDelta.push(otherIter.next(opLength));
                  break;
                case diff.DELETE:
                  opLength = Math.min(length2, thisIter.peekLength());
                  thisIter.next(opLength);
                  retDelta.delete(opLength);
                  break;
                case diff.EQUAL:
                  opLength = Math.min(thisIter.peekLength(), otherIter.peekLength(), length2);
                  const thisOp = thisIter.next(opLength);
                  const otherOp = otherIter.next(opLength);
                  if (isEqual3(thisOp.insert, otherOp.insert)) {
                    retDelta.retain(opLength, AttributeMap_1.default.diff(thisOp.attributes, otherOp.attributes));
                  } else {
                    retDelta.push(otherOp).delete(opLength);
                  }
                  break;
              }
              length2 -= opLength;
            }
          });
          return retDelta.chop();
        }
        eachLine(predicate, newline = "\n") {
          const iter = new OpIterator_1.default(this.ops);
          let line = new _Delta();
          let i = 0;
          while (iter.hasNext()) {
            if (iter.peekType() !== "insert") {
              return;
            }
            const thisOp = iter.peek();
            const start = Op_1.default.length(thisOp) - iter.peekLength();
            const index = typeof thisOp.insert === "string" ? thisOp.insert.indexOf(newline, start) - start : -1;
            if (index < 0) {
              line.push(iter.next());
            } else if (index > 0) {
              line.push(iter.next(index));
            } else {
              if (predicate(line, iter.next(1).attributes || {}, i) === false) {
                return;
              }
              i += 1;
              line = new _Delta();
            }
          }
          if (line.length() > 0) {
            predicate(line, {}, i);
          }
        }
        invert(base) {
          const inverted = new _Delta();
          this.reduce((baseIndex, op) => {
            if (op.insert) {
              inverted.delete(Op_1.default.length(op));
            } else if (typeof op.retain === "number" && op.attributes == null) {
              inverted.retain(op.retain);
              return baseIndex + op.retain;
            } else if (op.delete || typeof op.retain === "number") {
              const length2 = op.delete || op.retain;
              const slice = base.slice(baseIndex, baseIndex + length2);
              slice.forEach((baseOp) => {
                if (op.delete) {
                  inverted.push(baseOp);
                } else if (op.retain && op.attributes) {
                  inverted.retain(Op_1.default.length(baseOp), AttributeMap_1.default.invert(op.attributes, baseOp.attributes));
                }
              });
              return baseIndex + length2;
            } else if (typeof op.retain === "object" && op.retain !== null) {
              const slice = base.slice(baseIndex, baseIndex + 1);
              const baseOp = new OpIterator_1.default(slice.ops).next();
              const [embedType, opData, baseOpData] = getEmbedTypeAndData(op.retain, baseOp.insert);
              const handler = _Delta.getHandler(embedType);
              inverted.retain({ [embedType]: handler.invert(opData, baseOpData) }, AttributeMap_1.default.invert(op.attributes, baseOp.attributes));
              return baseIndex + 1;
            }
            return baseIndex;
          }, 0);
          return inverted.chop();
        }
        transform(arg, priority = false) {
          priority = !!priority;
          if (typeof arg === "number") {
            return this.transformPosition(arg, priority);
          }
          const other = arg;
          const thisIter = new OpIterator_1.default(this.ops);
          const otherIter = new OpIterator_1.default(other.ops);
          const delta = new _Delta();
          while (thisIter.hasNext() || otherIter.hasNext()) {
            if (thisIter.peekType() === "insert" && (priority || otherIter.peekType() !== "insert")) {
              delta.retain(Op_1.default.length(thisIter.next()));
            } else if (otherIter.peekType() === "insert") {
              delta.push(otherIter.next());
            } else {
              const length2 = Math.min(thisIter.peekLength(), otherIter.peekLength());
              const thisOp = thisIter.next(length2);
              const otherOp = otherIter.next(length2);
              if (thisOp.delete) {
                continue;
              } else if (otherOp.delete) {
                delta.push(otherOp);
              } else {
                const thisData = thisOp.retain;
                const otherData = otherOp.retain;
                let transformedData = typeof otherData === "object" && otherData !== null ? otherData : length2;
                if (typeof thisData === "object" && thisData !== null && typeof otherData === "object" && otherData !== null) {
                  const embedType = Object.keys(thisData)[0];
                  if (embedType === Object.keys(otherData)[0]) {
                    const handler = _Delta.getHandler(embedType);
                    if (handler) {
                      transformedData = {
                        [embedType]: handler.transform(thisData[embedType], otherData[embedType], priority)
                      };
                    }
                  }
                }
                delta.retain(transformedData, AttributeMap_1.default.transform(thisOp.attributes, otherOp.attributes, priority));
              }
            }
          }
          return delta.chop();
        }
        transformPosition(index, priority = false) {
          priority = !!priority;
          const thisIter = new OpIterator_1.default(this.ops);
          let offset = 0;
          while (thisIter.hasNext() && offset <= index) {
            const length2 = thisIter.peekLength();
            const nextType = thisIter.peekType();
            thisIter.next();
            if (nextType === "delete") {
              index -= Math.min(length2, index - offset);
              continue;
            } else if (nextType === "insert" && (offset < index || !priority)) {
              index += length2;
            }
            offset += length2;
          }
          return index;
        }
      };
      Delta13.Op = Op_1.default;
      Delta13.OpIterator = OpIterator_1.default;
      Delta13.AttributeMap = AttributeMap_1.default;
      Delta13.handlers = {};
      exports2.default = Delta13;
      if (typeof module2 === "object") {
        module2.exports = Delta13;
        module2.exports.default = Delta13;
      }
    }
  });

  // node_modules/quill/blots/break.js
  var Break, break_default;
  var init_break = __esm({
    "node_modules/quill/blots/break.js"() {
      init_parchment();
      Break = class extends EmbedBlot$1 {
        static value() {
          return void 0;
        }
        optimize() {
          if (this.prev || this.next) {
            this.remove();
          }
        }
        length() {
          return 0;
        }
        value() {
          return "";
        }
      };
      Break.blotName = "break";
      Break.tagName = "BR";
      break_default = Break;
    }
  });

  // node_modules/quill/blots/text.js
  function escapeText(text2) {
    return text2.replace(/[&<>"']/g, (s) => {
      const entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      return entityMap[s];
    });
  }
  var Text2;
  var init_text = __esm({
    "node_modules/quill/blots/text.js"() {
      init_parchment();
      Text2 = class extends TextBlot$1 {
      };
    }
  });

  // node_modules/quill/blots/inline.js
  var Inline, inline_default;
  var init_inline = __esm({
    "node_modules/quill/blots/inline.js"() {
      init_parchment();
      init_break();
      init_text();
      Inline = class _Inline extends InlineBlot$1 {
        static allowedChildren = [_Inline, break_default, EmbedBlot$1, Text2];
        // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
        static order = [
          "cursor",
          "inline",
          // Must be lower
          "link",
          // Chrome wants <a> to be lower
          "underline",
          "strike",
          "italic",
          "bold",
          "script",
          "code"
          // Must be higher
        ];
        static compare(self2, other) {
          const selfIndex = _Inline.order.indexOf(self2);
          const otherIndex = _Inline.order.indexOf(other);
          if (selfIndex >= 0 || otherIndex >= 0) {
            return selfIndex - otherIndex;
          }
          if (self2 === other) {
            return 0;
          }
          if (self2 < other) {
            return -1;
          }
          return 1;
        }
        formatAt(index, length2, name, value) {
          if (_Inline.compare(this.statics.blotName, name) < 0 && this.scroll.query(name, Scope.BLOT)) {
            const blot = this.isolate(index, length2);
            if (value) {
              blot.wrap(name, value);
            }
          } else {
            super.formatAt(index, length2, name, value);
          }
        }
        optimize(context) {
          super.optimize(context);
          if (this.parent instanceof _Inline && _Inline.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
            const parent = this.parent.isolate(this.offset(), this.length());
            this.moveChildren(parent);
            parent.wrap(this);
          }
        }
      };
      inline_default = Inline;
    }
  });

  // node_modules/quill/blots/block.js
  function blockDelta(blot) {
    let filter = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return blot.descendants(LeafBlot$1).reduce((delta, leaf) => {
      if (leaf.length() === 0) {
        return delta;
      }
      return delta.insert(leaf.value(), bubbleFormats(leaf, {}, filter));
    }, new import_quill_delta.default()).insert("\n", bubbleFormats(blot));
  }
  function bubbleFormats(blot) {
    let formats = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let filter = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (blot == null) return formats;
    if ("formats" in blot && typeof blot.formats === "function") {
      formats = {
        ...formats,
        ...blot.formats()
      };
      if (filter) {
        delete formats["code-token"];
      }
    }
    if (blot.parent == null || blot.parent.statics.blotName === "scroll" || blot.parent.statics.scope !== blot.statics.scope) {
      return formats;
    }
    return bubbleFormats(blot.parent, formats, filter);
  }
  var import_quill_delta, NEWLINE_LENGTH, Block, BlockEmbed;
  var init_block = __esm({
    "node_modules/quill/blots/block.js"() {
      init_parchment();
      import_quill_delta = __toESM(require_Delta(), 1);
      init_break();
      init_inline();
      init_text();
      NEWLINE_LENGTH = 1;
      Block = class extends BlockBlot$1 {
        cache = {};
        delta() {
          if (this.cache.delta == null) {
            this.cache.delta = blockDelta(this);
          }
          return this.cache.delta;
        }
        deleteAt(index, length2) {
          super.deleteAt(index, length2);
          this.cache = {};
        }
        formatAt(index, length2, name, value) {
          if (length2 <= 0) return;
          if (this.scroll.query(name, Scope.BLOCK)) {
            if (index + length2 === this.length()) {
              this.format(name, value);
            }
          } else {
            super.formatAt(index, Math.min(length2, this.length() - index - 1), name, value);
          }
          this.cache = {};
        }
        insertAt(index, value, def) {
          if (def != null) {
            super.insertAt(index, value, def);
            this.cache = {};
            return;
          }
          if (value.length === 0) return;
          const lines = value.split("\n");
          const text2 = lines.shift();
          if (text2.length > 0) {
            if (index < this.length() - 1 || this.children.tail == null) {
              super.insertAt(Math.min(index, this.length() - 1), text2);
            } else {
              this.children.tail.insertAt(this.children.tail.length(), text2);
            }
            this.cache = {};
          }
          let block = this;
          lines.reduce((lineIndex, line) => {
            block = block.split(lineIndex, true);
            block.insertAt(0, line);
            return line.length;
          }, index + text2.length);
        }
        insertBefore(blot, ref) {
          const {
            head
          } = this.children;
          super.insertBefore(blot, ref);
          if (head instanceof break_default) {
            head.remove();
          }
          this.cache = {};
        }
        length() {
          if (this.cache.length == null) {
            this.cache.length = super.length() + NEWLINE_LENGTH;
          }
          return this.cache.length;
        }
        moveChildren(target, ref) {
          super.moveChildren(target, ref);
          this.cache = {};
        }
        optimize(context) {
          super.optimize(context);
          this.cache = {};
        }
        path(index) {
          return super.path(index, true);
        }
        removeChild(child) {
          super.removeChild(child);
          this.cache = {};
        }
        split(index) {
          let force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          if (force && (index === 0 || index >= this.length() - NEWLINE_LENGTH)) {
            const clone = this.clone();
            if (index === 0) {
              this.parent.insertBefore(clone, this);
              return this;
            }
            this.parent.insertBefore(clone, this.next);
            return clone;
          }
          const next = super.split(index, force);
          this.cache = {};
          return next;
        }
      };
      Block.blotName = "block";
      Block.tagName = "P";
      Block.defaultChild = break_default;
      Block.allowedChildren = [break_default, inline_default, EmbedBlot$1, Text2];
      BlockEmbed = class extends EmbedBlot$1 {
        attach() {
          super.attach();
          this.attributes = new AttributorStore$1(this.domNode);
        }
        delta() {
          return new import_quill_delta.default().insert(this.value(), {
            ...this.formats(),
            ...this.attributes.values()
          });
        }
        format(name, value) {
          const attribute = this.scroll.query(name, Scope.BLOCK_ATTRIBUTE);
          if (attribute != null) {
            this.attributes.attribute(attribute, value);
          }
        }
        formatAt(index, length2, name, value) {
          this.format(name, value);
        }
        insertAt(index, value, def) {
          if (def != null) {
            super.insertAt(index, value, def);
            return;
          }
          const lines = value.split("\n");
          const text2 = lines.pop();
          const blocks = lines.map((line) => {
            const block = this.scroll.create(Block.blotName);
            block.insertAt(0, line);
            return block;
          });
          const ref = this.split(index);
          blocks.forEach((block) => {
            this.parent.insertBefore(block, ref);
          });
          if (text2) {
            this.parent.insertBefore(this.scroll.create("text", text2), ref);
          }
        }
      };
      BlockEmbed.scope = Scope.BLOCK_BLOT;
    }
  });

  // node_modules/quill/blots/cursor.js
  var Cursor, cursor_default;
  var init_cursor = __esm({
    "node_modules/quill/blots/cursor.js"() {
      init_parchment();
      init_text();
      Cursor = class _Cursor extends EmbedBlot$1 {
        static blotName = "cursor";
        static className = "ql-cursor";
        static tagName = "span";
        static CONTENTS = "\uFEFF";
        // Zero width no break space
        static value() {
          return void 0;
        }
        constructor(scroll, domNode, selection) {
          super(scroll, domNode);
          this.selection = selection;
          this.textNode = document.createTextNode(_Cursor.CONTENTS);
          this.domNode.appendChild(this.textNode);
          this.savedLength = 0;
        }
        detach() {
          if (this.parent != null) this.parent.removeChild(this);
        }
        format(name, value) {
          if (this.savedLength !== 0) {
            super.format(name, value);
            return;
          }
          let target = this;
          let index = 0;
          while (target != null && target.statics.scope !== Scope.BLOCK_BLOT) {
            index += target.offset(target.parent);
            target = target.parent;
          }
          if (target != null) {
            this.savedLength = _Cursor.CONTENTS.length;
            target.optimize();
            target.formatAt(index, _Cursor.CONTENTS.length, name, value);
            this.savedLength = 0;
          }
        }
        index(node, offset) {
          if (node === this.textNode) return 0;
          return super.index(node, offset);
        }
        length() {
          return this.savedLength;
        }
        position() {
          return [this.textNode, this.textNode.data.length];
        }
        remove() {
          super.remove();
          this.parent = null;
        }
        restore() {
          if (this.selection.composing || this.parent == null) return null;
          const range = this.selection.getNativeRange();
          while (this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode) {
            this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
          }
          const prevTextBlot = this.prev instanceof Text2 ? this.prev : null;
          const prevTextLength = prevTextBlot ? prevTextBlot.length() : 0;
          const nextTextBlot = this.next instanceof Text2 ? this.next : null;
          const nextText = nextTextBlot ? nextTextBlot.text : "";
          const {
            textNode
          } = this;
          const newText = textNode.data.split(_Cursor.CONTENTS).join("");
          textNode.data = _Cursor.CONTENTS;
          let mergedTextBlot;
          if (prevTextBlot) {
            mergedTextBlot = prevTextBlot;
            if (newText || nextTextBlot) {
              prevTextBlot.insertAt(prevTextBlot.length(), newText + nextText);
              if (nextTextBlot) {
                nextTextBlot.remove();
              }
            }
          } else if (nextTextBlot) {
            mergedTextBlot = nextTextBlot;
            nextTextBlot.insertAt(0, newText);
          } else {
            const newTextNode = document.createTextNode(newText);
            mergedTextBlot = this.scroll.create(newTextNode);
            this.parent.insertBefore(mergedTextBlot, this);
          }
          this.remove();
          if (range) {
            const remapOffset = (node, offset) => {
              if (prevTextBlot && node === prevTextBlot.domNode) {
                return offset;
              }
              if (node === textNode) {
                return prevTextLength + offset - 1;
              }
              if (nextTextBlot && node === nextTextBlot.domNode) {
                return prevTextLength + newText.length + offset;
              }
              return null;
            };
            const start = remapOffset(range.start.node, range.start.offset);
            const end = remapOffset(range.end.node, range.end.offset);
            if (start !== null && end !== null) {
              return {
                startNode: mergedTextBlot.domNode,
                startOffset: start,
                endNode: mergedTextBlot.domNode,
                endOffset: end
              };
            }
          }
          return null;
        }
        update(mutations, context) {
          if (mutations.some((mutation) => {
            return mutation.type === "characterData" && mutation.target === this.textNode;
          })) {
            const range = this.restore();
            if (range) context.range = range;
          }
        }
        // Avoid .ql-cursor being a descendant of `<a/>`.
        // The reason is Safari pushes down `<a/>` on text insertion.
        // That will cause DOM nodes not sync with the model.
        //
        // For example ({I} is the caret), given the markup:
        //    <a><span class="ql-cursor">\uFEFF{I}</span></a>
        // When typing a char "x", `<a/>` will be pushed down inside the `<span>` first:
        //    <span class="ql-cursor"><a>\uFEFF{I}</a></span>
        // And then "x" will be inserted after `<a/>`:
        //    <span class="ql-cursor"><a>\uFEFF</a>d{I}</span>
        optimize(context) {
          super.optimize(context);
          let {
            parent
          } = this;
          while (parent) {
            if (parent.domNode.tagName === "A") {
              this.savedLength = _Cursor.CONTENTS.length;
              parent.isolate(this.offset(parent), this.length()).unwrap();
              this.savedLength = 0;
              break;
            }
            parent = parent.parent;
          }
        }
        value() {
          return "";
        }
      };
      cursor_default = Cursor;
    }
  });

  // node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "node_modules/eventemitter3/index.js"(exports2, module2) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var prefix = "~";
      function Events() {
      }
      if (Object.create) {
        Events.prototype = /* @__PURE__ */ Object.create(null);
        if (!new Events().__proto__) prefix = false;
      }
      function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
        else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
        else emitter._events[evt] = [emitter._events[evt], listener];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0) emitter._events = new Events();
        else delete emitter._events[evt];
      }
      function EventEmitter2() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0) return names;
        for (name in events = this._events) {
          if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter2.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers) return [];
        if (handlers.fn) return [handlers.fn];
        for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
          ee[i] = handlers[i].fn;
        }
        return ee;
      };
      EventEmitter2.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners) return 0;
        if (listeners.fn) return 1;
        return listeners.length;
      };
      EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return false;
        var listeners = this._events[evt], len = arguments.length, args2, i;
        if (listeners.fn) {
          if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
          }
          for (i = 1, args2 = new Array(len - 1); i < len; i++) {
            args2[i - 1] = arguments[i];
          }
          listeners.fn.apply(listeners.context, args2);
        } else {
          var length2 = listeners.length, j;
          for (i = 0; i < length2; i++) {
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
            switch (len) {
              case 1:
                listeners[i].fn.call(listeners[i].context);
                break;
              case 2:
                listeners[i].fn.call(listeners[i].context, a1);
                break;
              case 3:
                listeners[i].fn.call(listeners[i].context, a1, a2);
                break;
              case 4:
                listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                break;
              default:
                if (!args2) for (j = 1, args2 = new Array(len - 1); j < len; j++) {
                  args2[j - 1] = arguments[j];
                }
                listeners[i].fn.apply(listeners[i].context, args2);
            }
          }
        }
        return true;
      };
      EventEmitter2.prototype.on = function on(event, fn, context) {
        return addListener(this, event, fn, context, false);
      };
      EventEmitter2.prototype.once = function once(event, fn, context) {
        return addListener(this, event, fn, context, true);
      };
      EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i = 0, events = [], length2 = listeners.length; i < length2; i++) {
            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
              events.push(listeners[i]);
            }
          }
          if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
          else clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt]) clearEvent(this, evt);
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
      EventEmitter2.prefixed = prefix;
      EventEmitter2.EventEmitter = EventEmitter2;
      if ("undefined" !== typeof module2) {
        module2.exports = EventEmitter2;
      }
    }
  });

  // node_modules/eventemitter3/index.mjs
  var import_index;
  var init_eventemitter3 = __esm({
    "node_modules/eventemitter3/index.mjs"() {
      import_index = __toESM(require_eventemitter3(), 1);
    }
  });

  // node_modules/quill/core/instances.js
  var instances_default;
  var init_instances = __esm({
    "node_modules/quill/core/instances.js"() {
      instances_default = /* @__PURE__ */ new WeakMap();
    }
  });

  // node_modules/quill/core/logger.js
  function debug(method) {
    if (level) {
      if (levels.indexOf(method) <= levels.indexOf(level)) {
        for (var _len = arguments.length, args2 = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args2[_key - 1] = arguments[_key];
        }
        console[method](...args2);
      }
    }
  }
  function namespace(ns) {
    return levels.reduce((logger, method) => {
      logger[method] = debug.bind(console, method, ns);
      return logger;
    }, {});
  }
  var levels, level, logger_default;
  var init_logger = __esm({
    "node_modules/quill/core/logger.js"() {
      levels = ["error", "warn", "log", "info"];
      level = "warn";
      namespace.level = (newLevel) => {
        level = newLevel;
      };
      debug.level = namespace.level;
      logger_default = namespace;
    }
  });

  // node_modules/quill/core/emitter.js
  var debug2, EVENTS, Emitter, emitter_default;
  var init_emitter = __esm({
    "node_modules/quill/core/emitter.js"() {
      init_eventemitter3();
      init_instances();
      init_logger();
      debug2 = logger_default("quill:events");
      EVENTS = ["selectionchange", "mousedown", "mouseup", "click"];
      EVENTS.forEach((eventName) => {
        document.addEventListener(eventName, function() {
          for (var _len = arguments.length, args2 = new Array(_len), _key = 0; _key < _len; _key++) {
            args2[_key] = arguments[_key];
          }
          Array.from(document.querySelectorAll(".ql-container")).forEach((node) => {
            const quill = instances_default.get(node);
            if (quill && quill.emitter) {
              quill.emitter.handleDOM(...args2);
            }
          });
        });
      });
      Emitter = class extends import_index.default {
        static events = {
          EDITOR_CHANGE: "editor-change",
          SCROLL_BEFORE_UPDATE: "scroll-before-update",
          SCROLL_BLOT_MOUNT: "scroll-blot-mount",
          SCROLL_BLOT_UNMOUNT: "scroll-blot-unmount",
          SCROLL_OPTIMIZE: "scroll-optimize",
          SCROLL_UPDATE: "scroll-update",
          SCROLL_EMBED_UPDATE: "scroll-embed-update",
          SELECTION_CHANGE: "selection-change",
          TEXT_CHANGE: "text-change",
          COMPOSITION_BEFORE_START: "composition-before-start",
          COMPOSITION_START: "composition-start",
          COMPOSITION_BEFORE_END: "composition-before-end",
          COMPOSITION_END: "composition-end"
        };
        static sources = {
          API: "api",
          SILENT: "silent",
          USER: "user"
        };
        constructor() {
          super();
          this.domListeners = {};
          this.on("error", debug2.error);
        }
        emit() {
          for (var _len2 = arguments.length, args2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args2[_key2] = arguments[_key2];
          }
          debug2.log.call(debug2, ...args2);
          return super.emit(...args2);
        }
        handleDOM(event) {
          for (var _len3 = arguments.length, args2 = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            args2[_key3 - 1] = arguments[_key3];
          }
          (this.domListeners[event.type] || []).forEach((_ref) => {
            let {
              node,
              handler
            } = _ref;
            if (event.target === node || node.contains(event.target)) {
              handler(event, ...args2);
            }
          });
        }
        listenDOM(eventName, node, handler) {
          if (!this.domListeners[eventName]) {
            this.domListeners[eventName] = [];
          }
          this.domListeners[eventName].push({
            node,
            handler
          });
        }
      };
      emitter_default = Emitter;
    }
  });

  // node_modules/quill/core/selection.js
  function contains(parent, descendant) {
    try {
      descendant.parentNode;
    } catch (e) {
      return false;
    }
    return parent.contains(descendant);
  }
  var debug3, Range, Selection, selection_default;
  var init_selection = __esm({
    "node_modules/quill/core/selection.js"() {
      init_parchment();
      init_lodash();
      init_emitter();
      init_logger();
      debug3 = logger_default("quill:selection");
      Range = class {
        constructor(index) {
          let length2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          this.index = index;
          this.length = length2;
        }
      };
      Selection = class {
        constructor(scroll, emitter) {
          this.emitter = emitter;
          this.scroll = scroll;
          this.composing = false;
          this.mouseDown = false;
          this.root = this.scroll.domNode;
          this.cursor = this.scroll.create("cursor", this);
          this.savedRange = new Range(0, 0);
          this.lastRange = this.savedRange;
          this.lastNative = null;
          this.handleComposition();
          this.handleDragging();
          this.emitter.listenDOM("selectionchange", document, () => {
            if (!this.mouseDown && !this.composing) {
              setTimeout(this.update.bind(this, emitter_default.sources.USER), 1);
            }
          });
          this.emitter.on(emitter_default.events.SCROLL_BEFORE_UPDATE, () => {
            if (!this.hasFocus()) return;
            const native = this.getNativeRange();
            if (native == null) return;
            if (native.start.node === this.cursor.textNode) return;
            this.emitter.once(emitter_default.events.SCROLL_UPDATE, (source, mutations) => {
              try {
                if (this.root.contains(native.start.node) && this.root.contains(native.end.node)) {
                  this.setNativeRange(native.start.node, native.start.offset, native.end.node, native.end.offset);
                }
                const triggeredByTyping = mutations.some((mutation) => mutation.type === "characterData" || mutation.type === "childList" || mutation.type === "attributes" && mutation.target === this.root);
                this.update(triggeredByTyping ? emitter_default.sources.SILENT : source);
              } catch (ignored) {
              }
            });
          });
          this.emitter.on(emitter_default.events.SCROLL_OPTIMIZE, (mutations, context) => {
            if (context.range) {
              const {
                startNode,
                startOffset,
                endNode,
                endOffset
              } = context.range;
              this.setNativeRange(startNode, startOffset, endNode, endOffset);
              this.update(emitter_default.sources.SILENT);
            }
          });
          this.update(emitter_default.sources.SILENT);
        }
        handleComposition() {
          this.emitter.on(emitter_default.events.COMPOSITION_BEFORE_START, () => {
            this.composing = true;
          });
          this.emitter.on(emitter_default.events.COMPOSITION_END, () => {
            this.composing = false;
            if (this.cursor.parent) {
              const range = this.cursor.restore();
              if (!range) return;
              setTimeout(() => {
                this.setNativeRange(range.startNode, range.startOffset, range.endNode, range.endOffset);
              }, 1);
            }
          });
        }
        handleDragging() {
          this.emitter.listenDOM("mousedown", document.body, () => {
            this.mouseDown = true;
          });
          this.emitter.listenDOM("mouseup", document.body, () => {
            this.mouseDown = false;
            this.update(emitter_default.sources.USER);
          });
        }
        focus() {
          if (this.hasFocus()) return;
          this.root.focus({
            preventScroll: true
          });
          this.setRange(this.savedRange);
        }
        format(format, value) {
          this.scroll.update();
          const nativeRange = this.getNativeRange();
          if (nativeRange == null || !nativeRange.native.collapsed || this.scroll.query(format, Scope.BLOCK)) return;
          if (nativeRange.start.node !== this.cursor.textNode) {
            const blot = this.scroll.find(nativeRange.start.node, false);
            if (blot == null) return;
            if (blot instanceof LeafBlot$1) {
              const after = blot.split(nativeRange.start.offset);
              blot.parent.insertBefore(this.cursor, after);
            } else {
              blot.insertBefore(this.cursor, nativeRange.start.node);
            }
            this.cursor.attach();
          }
          this.cursor.format(format, value);
          this.scroll.optimize();
          this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length);
          this.update();
        }
        getBounds(index) {
          let length2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          const scrollLength = this.scroll.length();
          index = Math.min(index, scrollLength - 1);
          length2 = Math.min(index + length2, scrollLength - 1) - index;
          let node;
          let [leaf, offset] = this.scroll.leaf(index);
          if (leaf == null) return null;
          if (length2 > 0 && offset === leaf.length()) {
            const [next] = this.scroll.leaf(index + 1);
            if (next) {
              const [line] = this.scroll.line(index);
              const [nextLine] = this.scroll.line(index + 1);
              if (line === nextLine) {
                leaf = next;
                offset = 0;
              }
            }
          }
          [node, offset] = leaf.position(offset, true);
          const range = document.createRange();
          if (length2 > 0) {
            range.setStart(node, offset);
            [leaf, offset] = this.scroll.leaf(index + length2);
            if (leaf == null) return null;
            [node, offset] = leaf.position(offset, true);
            range.setEnd(node, offset);
            return range.getBoundingClientRect();
          }
          let side = "left";
          let rect;
          if (node instanceof Text) {
            if (!node.data.length) {
              return null;
            }
            if (offset < node.data.length) {
              range.setStart(node, offset);
              range.setEnd(node, offset + 1);
            } else {
              range.setStart(node, offset - 1);
              range.setEnd(node, offset);
              side = "right";
            }
            rect = range.getBoundingClientRect();
          } else {
            if (!(leaf.domNode instanceof Element)) return null;
            rect = leaf.domNode.getBoundingClientRect();
            if (offset > 0) side = "right";
          }
          return {
            bottom: rect.top + rect.height,
            height: rect.height,
            left: rect[side],
            right: rect[side],
            top: rect.top,
            width: 0
          };
        }
        getNativeRange() {
          const selection = document.getSelection();
          if (selection == null || selection.rangeCount <= 0) return null;
          const nativeRange = selection.getRangeAt(0);
          if (nativeRange == null) return null;
          const range = this.normalizeNative(nativeRange);
          debug3.info("getNativeRange", range);
          return range;
        }
        getRange() {
          const root2 = this.scroll.domNode;
          if ("isConnected" in root2 && !root2.isConnected) {
            return [null, null];
          }
          const normalized = this.getNativeRange();
          if (normalized == null) return [null, null];
          const range = this.normalizedToRange(normalized);
          return [range, normalized];
        }
        hasFocus() {
          return document.activeElement === this.root || document.activeElement != null && contains(this.root, document.activeElement);
        }
        normalizedToRange(range) {
          const positions = [[range.start.node, range.start.offset]];
          if (!range.native.collapsed) {
            positions.push([range.end.node, range.end.offset]);
          }
          const indexes = positions.map((position) => {
            const [node, offset] = position;
            const blot = this.scroll.find(node, true);
            const index = blot.offset(this.scroll);
            if (offset === 0) {
              return index;
            }
            if (blot instanceof LeafBlot$1) {
              return index + blot.index(node, offset);
            }
            return index + blot.length();
          });
          const end = Math.min(Math.max(...indexes), this.scroll.length() - 1);
          const start = Math.min(end, ...indexes);
          return new Range(start, end - start);
        }
        normalizeNative(nativeRange) {
          if (!contains(this.root, nativeRange.startContainer) || !nativeRange.collapsed && !contains(this.root, nativeRange.endContainer)) {
            return null;
          }
          const range = {
            start: {
              node: nativeRange.startContainer,
              offset: nativeRange.startOffset
            },
            end: {
              node: nativeRange.endContainer,
              offset: nativeRange.endOffset
            },
            native: nativeRange
          };
          [range.start, range.end].forEach((position) => {
            let {
              node,
              offset
            } = position;
            while (!(node instanceof Text) && node.childNodes.length > 0) {
              if (node.childNodes.length > offset) {
                node = node.childNodes[offset];
                offset = 0;
              } else if (node.childNodes.length === offset) {
                node = node.lastChild;
                if (node instanceof Text) {
                  offset = node.data.length;
                } else if (node.childNodes.length > 0) {
                  offset = node.childNodes.length;
                } else {
                  offset = node.childNodes.length + 1;
                }
              } else {
                break;
              }
            }
            position.node = node;
            position.offset = offset;
          });
          return range;
        }
        rangeToNative(range) {
          const scrollLength = this.scroll.length();
          const getPosition = (index, inclusive) => {
            index = Math.min(scrollLength - 1, index);
            const [leaf, leafOffset] = this.scroll.leaf(index);
            return leaf ? leaf.position(leafOffset, inclusive) : [null, -1];
          };
          return [...getPosition(range.index, false), ...getPosition(range.index + range.length, true)];
        }
        setNativeRange(startNode, startOffset) {
          let endNode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : startNode;
          let endOffset = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : startOffset;
          let force = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
          debug3.info("setNativeRange", startNode, startOffset, endNode, endOffset);
          if (startNode != null && (this.root.parentNode == null || startNode.parentNode == null || // @ts-expect-error Fix me later
          endNode.parentNode == null)) {
            return;
          }
          const selection = document.getSelection();
          if (selection == null) return;
          if (startNode != null) {
            if (!this.hasFocus()) this.root.focus({
              preventScroll: true
            });
            const {
              native
            } = this.getNativeRange() || {};
            if (native == null || force || startNode !== native.startContainer || startOffset !== native.startOffset || endNode !== native.endContainer || endOffset !== native.endOffset) {
              if (startNode instanceof Element && startNode.tagName === "BR") {
                startOffset = Array.from(startNode.parentNode.childNodes).indexOf(startNode);
                startNode = startNode.parentNode;
              }
              if (endNode instanceof Element && endNode.tagName === "BR") {
                endOffset = Array.from(endNode.parentNode.childNodes).indexOf(endNode);
                endNode = endNode.parentNode;
              }
              const range = document.createRange();
              range.setStart(startNode, startOffset);
              range.setEnd(endNode, endOffset);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          } else {
            selection.removeAllRanges();
            this.root.blur();
          }
        }
        setRange(range) {
          let force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          let source = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : emitter_default.sources.API;
          if (typeof force === "string") {
            source = force;
            force = false;
          }
          debug3.info("setRange", range);
          if (range != null) {
            const args2 = this.rangeToNative(range);
            this.setNativeRange(...args2, force);
          } else {
            this.setNativeRange(null);
          }
          this.update(source);
        }
        update() {
          let source = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : emitter_default.sources.USER;
          const oldRange = this.lastRange;
          const [lastRange, nativeRange] = this.getRange();
          this.lastRange = lastRange;
          this.lastNative = nativeRange;
          if (this.lastRange != null) {
            this.savedRange = this.lastRange;
          }
          if (!isEqual_default(oldRange, this.lastRange)) {
            if (!this.composing && nativeRange != null && nativeRange.native.collapsed && nativeRange.start.node !== this.cursor.textNode) {
              const range = this.cursor.restore();
              if (range) {
                this.setNativeRange(range.startNode, range.startOffset, range.endNode, range.endOffset);
              }
            }
            const args2 = [emitter_default.events.SELECTION_CHANGE, cloneDeep_default(this.lastRange), cloneDeep_default(oldRange), source];
            this.emitter.emit(emitter_default.events.EDITOR_CHANGE, ...args2);
            if (source !== emitter_default.sources.SILENT) {
              this.emitter.emit(...args2);
            }
          }
        }
      };
      selection_default = Selection;
    }
  });

  // node_modules/quill/core/editor.js
  function convertListHTML(items, lastIndent, types) {
    if (items.length === 0) {
      const [endTag2] = getListType(types.pop());
      if (lastIndent <= 0) {
        return `</li></${endTag2}>`;
      }
      return `</li></${endTag2}>${convertListHTML([], lastIndent - 1, types)}`;
    }
    const [{
      child,
      offset,
      length: length2,
      indent,
      type
    }, ...rest] = items;
    const [tag, attribute] = getListType(type);
    if (indent > lastIndent) {
      types.push(type);
      if (indent === lastIndent + 1) {
        return `<${tag}><li${attribute}>${convertHTML(child, offset, length2)}${convertListHTML(rest, indent, types)}`;
      }
      return `<${tag}><li>${convertListHTML(items, lastIndent + 1, types)}`;
    }
    const previousType = types[types.length - 1];
    if (indent === lastIndent && type === previousType) {
      return `</li><li${attribute}>${convertHTML(child, offset, length2)}${convertListHTML(rest, indent, types)}`;
    }
    const [endTag] = getListType(types.pop());
    return `</li></${endTag}>${convertListHTML(items, lastIndent - 1, types)}`;
  }
  function convertHTML(blot, index, length2) {
    let isRoot = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    if ("html" in blot && typeof blot.html === "function") {
      return blot.html(index, length2);
    }
    if (blot instanceof Text2) {
      return escapeText(blot.value().slice(index, index + length2));
    }
    if (blot instanceof ParentBlot$1) {
      if (blot.statics.blotName === "list-container") {
        const items = [];
        blot.children.forEachAt(index, length2, (child, offset, childLength) => {
          const formats = "formats" in child && typeof child.formats === "function" ? child.formats() : {};
          items.push({
            child,
            offset,
            length: childLength,
            indent: formats.indent || 0,
            type: formats.list
          });
        });
        return convertListHTML(items, -1, []);
      }
      const parts = [];
      blot.children.forEachAt(index, length2, (child, offset, childLength) => {
        parts.push(convertHTML(child, offset, childLength));
      });
      if (isRoot || blot.statics.blotName === "list") {
        return parts.join("");
      }
      const {
        outerHTML,
        innerHTML
      } = blot.domNode;
      const [start, end] = outerHTML.split(`>${innerHTML}<`);
      if (start === "<table") {
        return `<table style="border: 1px solid #000;">${parts.join("")}<${end}`;
      }
      return `${start}>${parts.join("")}<${end}`;
    }
    return blot.domNode instanceof Element ? blot.domNode.outerHTML : "";
  }
  function combineFormats(formats, combined) {
    return Object.keys(combined).reduce((merged, name) => {
      if (formats[name] == null) return merged;
      const combinedValue = combined[name];
      if (combinedValue === formats[name]) {
        merged[name] = combinedValue;
      } else if (Array.isArray(combinedValue)) {
        if (combinedValue.indexOf(formats[name]) < 0) {
          merged[name] = combinedValue.concat([formats[name]]);
        } else {
          merged[name] = combinedValue;
        }
      } else {
        merged[name] = [combinedValue, formats[name]];
      }
      return merged;
    }, {});
  }
  function getListType(type) {
    const tag = type === "ordered" ? "ol" : "ul";
    switch (type) {
      case "checked":
        return [tag, ' data-list="checked"'];
      case "unchecked":
        return [tag, ' data-list="unchecked"'];
      default:
        return [tag, ""];
    }
  }
  function normalizeDelta(delta) {
    return delta.reduce((normalizedDelta, op) => {
      if (typeof op.insert === "string") {
        const text2 = op.insert.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        return normalizedDelta.insert(text2, op.attributes);
      }
      return normalizedDelta.push(op);
    }, new import_quill_delta2.default());
  }
  function shiftRange(_ref, amount) {
    let {
      index,
      length: length2
    } = _ref;
    return new Range(index + amount, length2);
  }
  function splitOpLines(ops) {
    const split = [];
    ops.forEach((op) => {
      if (typeof op.insert === "string") {
        const lines = op.insert.split("\n");
        lines.forEach((line, index) => {
          if (index) split.push({
            insert: "\n",
            attributes: op.attributes
          });
          if (line) split.push({
            insert: line,
            attributes: op.attributes
          });
        });
      } else {
        split.push(op);
      }
    });
    return split;
  }
  var import_quill_delta2, ASCII, Editor, editor_default;
  var init_editor = __esm({
    "node_modules/quill/core/editor.js"() {
      init_lodash();
      init_parchment();
      import_quill_delta2 = __toESM(require_Delta(), 1);
      init_block();
      init_break();
      init_cursor();
      init_text();
      init_selection();
      ASCII = /^[ -~]*$/;
      Editor = class {
        constructor(scroll) {
          this.scroll = scroll;
          this.delta = this.getDelta();
        }
        applyDelta(delta) {
          this.scroll.update();
          let scrollLength = this.scroll.length();
          this.scroll.batchStart();
          const normalizedDelta = normalizeDelta(delta);
          const deleteDelta = new import_quill_delta2.default();
          const normalizedOps = splitOpLines(normalizedDelta.ops.slice());
          normalizedOps.reduce((index, op) => {
            const length2 = import_quill_delta2.Op.length(op);
            let attributes = op.attributes || {};
            let isImplicitNewlinePrepended = false;
            let isImplicitNewlineAppended = false;
            if (op.insert != null) {
              deleteDelta.retain(length2);
              if (typeof op.insert === "string") {
                const text2 = op.insert;
                isImplicitNewlineAppended = !text2.endsWith("\n") && (scrollLength <= index || !!this.scroll.descendant(BlockEmbed, index)[0]);
                this.scroll.insertAt(index, text2);
                const [line, offset] = this.scroll.line(index);
                let formats = merge_default({}, bubbleFormats(line));
                if (line instanceof Block) {
                  const [leaf] = line.descendant(LeafBlot$1, offset);
                  if (leaf) {
                    formats = merge_default(formats, bubbleFormats(leaf));
                  }
                }
                attributes = import_quill_delta2.AttributeMap.diff(formats, attributes) || {};
              } else if (typeof op.insert === "object") {
                const key = Object.keys(op.insert)[0];
                if (key == null) return index;
                const isInlineEmbed = this.scroll.query(key, Scope.INLINE) != null;
                if (isInlineEmbed) {
                  if (scrollLength <= index || !!this.scroll.descendant(BlockEmbed, index)[0]) {
                    isImplicitNewlineAppended = true;
                  }
                } else if (index > 0) {
                  const [leaf, offset] = this.scroll.descendant(LeafBlot$1, index - 1);
                  if (leaf instanceof Text2) {
                    const text2 = leaf.value();
                    if (text2[offset] !== "\n") {
                      isImplicitNewlinePrepended = true;
                    }
                  } else if (leaf instanceof EmbedBlot$1 && leaf.statics.scope === Scope.INLINE_BLOT) {
                    isImplicitNewlinePrepended = true;
                  }
                }
                this.scroll.insertAt(index, key, op.insert[key]);
                if (isInlineEmbed) {
                  const [leaf] = this.scroll.descendant(LeafBlot$1, index);
                  if (leaf) {
                    const formats = merge_default({}, bubbleFormats(leaf));
                    attributes = import_quill_delta2.AttributeMap.diff(formats, attributes) || {};
                  }
                }
              }
              scrollLength += length2;
            } else {
              deleteDelta.push(op);
              if (op.retain !== null && typeof op.retain === "object") {
                const key = Object.keys(op.retain)[0];
                if (key == null) return index;
                this.scroll.updateEmbedAt(index, key, op.retain[key]);
              }
            }
            Object.keys(attributes).forEach((name) => {
              this.scroll.formatAt(index, length2, name, attributes[name]);
            });
            const prependedLength = isImplicitNewlinePrepended ? 1 : 0;
            const addedLength = isImplicitNewlineAppended ? 1 : 0;
            scrollLength += prependedLength + addedLength;
            deleteDelta.retain(prependedLength);
            deleteDelta.delete(addedLength);
            return index + length2 + prependedLength + addedLength;
          }, 0);
          deleteDelta.reduce((index, op) => {
            if (typeof op.delete === "number") {
              this.scroll.deleteAt(index, op.delete);
              return index;
            }
            return index + import_quill_delta2.Op.length(op);
          }, 0);
          this.scroll.batchEnd();
          this.scroll.optimize();
          return this.update(normalizedDelta);
        }
        deleteText(index, length2) {
          this.scroll.deleteAt(index, length2);
          return this.update(new import_quill_delta2.default().retain(index).delete(length2));
        }
        formatLine(index, length2) {
          let formats = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          this.scroll.update();
          Object.keys(formats).forEach((format) => {
            this.scroll.lines(index, Math.max(length2, 1)).forEach((line) => {
              line.format(format, formats[format]);
            });
          });
          this.scroll.optimize();
          const delta = new import_quill_delta2.default().retain(index).retain(length2, cloneDeep_default(formats));
          return this.update(delta);
        }
        formatText(index, length2) {
          let formats = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          Object.keys(formats).forEach((format) => {
            this.scroll.formatAt(index, length2, format, formats[format]);
          });
          const delta = new import_quill_delta2.default().retain(index).retain(length2, cloneDeep_default(formats));
          return this.update(delta);
        }
        getContents(index, length2) {
          return this.delta.slice(index, index + length2);
        }
        getDelta() {
          return this.scroll.lines().reduce((delta, line) => {
            return delta.concat(line.delta());
          }, new import_quill_delta2.default());
        }
        getFormat(index) {
          let length2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          let lines = [];
          let leaves = [];
          if (length2 === 0) {
            this.scroll.path(index).forEach((path) => {
              const [blot] = path;
              if (blot instanceof Block) {
                lines.push(blot);
              } else if (blot instanceof LeafBlot$1) {
                leaves.push(blot);
              }
            });
          } else {
            lines = this.scroll.lines(index, length2);
            leaves = this.scroll.descendants(LeafBlot$1, index, length2);
          }
          const [lineFormats, leafFormats] = [lines, leaves].map((blots) => {
            const blot = blots.shift();
            if (blot == null) return {};
            let formats = bubbleFormats(blot);
            while (Object.keys(formats).length > 0) {
              const blot2 = blots.shift();
              if (blot2 == null) return formats;
              formats = combineFormats(bubbleFormats(blot2), formats);
            }
            return formats;
          });
          return {
            ...lineFormats,
            ...leafFormats
          };
        }
        getHTML(index, length2) {
          const [line, lineOffset] = this.scroll.line(index);
          if (line) {
            const lineLength = line.length();
            const isWithinLine = line.length() >= lineOffset + length2;
            if (isWithinLine && !(lineOffset === 0 && length2 === lineLength)) {
              return convertHTML(line, lineOffset, length2, true);
            }
            return convertHTML(this.scroll, index, length2, true);
          }
          return "";
        }
        getText(index, length2) {
          return this.getContents(index, length2).filter((op) => typeof op.insert === "string").map((op) => op.insert).join("");
        }
        insertContents(index, contents) {
          const normalizedDelta = normalizeDelta(contents);
          const change = new import_quill_delta2.default().retain(index).concat(normalizedDelta);
          this.scroll.insertContents(index, normalizedDelta);
          return this.update(change);
        }
        insertEmbed(index, embed, value) {
          this.scroll.insertAt(index, embed, value);
          return this.update(new import_quill_delta2.default().retain(index).insert({
            [embed]: value
          }));
        }
        insertText(index, text2) {
          let formats = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          text2 = text2.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
          this.scroll.insertAt(index, text2);
          Object.keys(formats).forEach((format) => {
            this.scroll.formatAt(index, text2.length, format, formats[format]);
          });
          return this.update(new import_quill_delta2.default().retain(index).insert(text2, cloneDeep_default(formats)));
        }
        isBlank() {
          if (this.scroll.children.length === 0) return true;
          if (this.scroll.children.length > 1) return false;
          const blot = this.scroll.children.head;
          if (blot?.statics.blotName !== Block.blotName) return false;
          const block = blot;
          if (block.children.length > 1) return false;
          return block.children.head instanceof break_default;
        }
        removeFormat(index, length2) {
          const text2 = this.getText(index, length2);
          const [line, offset] = this.scroll.line(index + length2);
          let suffixLength = 0;
          let suffix = new import_quill_delta2.default();
          if (line != null) {
            suffixLength = line.length() - offset;
            suffix = line.delta().slice(offset, offset + suffixLength - 1).insert("\n");
          }
          const contents = this.getContents(index, length2 + suffixLength);
          const diff = contents.diff(new import_quill_delta2.default().insert(text2).concat(suffix));
          const delta = new import_quill_delta2.default().retain(index).concat(diff);
          return this.applyDelta(delta);
        }
        update(change) {
          let mutations = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
          let selectionInfo = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
          const oldDelta = this.delta;
          if (mutations.length === 1 && mutations[0].type === "characterData" && // @ts-expect-error Fix me later
          mutations[0].target.data.match(ASCII) && this.scroll.find(mutations[0].target)) {
            const textBlot = this.scroll.find(mutations[0].target);
            const formats = bubbleFormats(textBlot);
            const index = textBlot.offset(this.scroll);
            const oldValue = mutations[0].oldValue.replace(cursor_default.CONTENTS, "");
            const oldText = new import_quill_delta2.default().insert(oldValue);
            const newText = new import_quill_delta2.default().insert(textBlot.value());
            const relativeSelectionInfo = selectionInfo && {
              oldRange: shiftRange(selectionInfo.oldRange, -index),
              newRange: shiftRange(selectionInfo.newRange, -index)
            };
            const diffDelta = new import_quill_delta2.default().retain(index).concat(oldText.diff(newText, relativeSelectionInfo));
            change = diffDelta.reduce((delta, op) => {
              if (op.insert) {
                return delta.insert(op.insert, formats);
              }
              return delta.push(op);
            }, new import_quill_delta2.default());
            this.delta = oldDelta.compose(change);
          } else {
            this.delta = this.getDelta();
            if (!change || !isEqual_default(oldDelta.compose(change), this.delta)) {
              change = oldDelta.diff(this.delta, selectionInfo);
            }
          }
          return change;
        }
      };
      editor_default = Editor;
    }
  });

  // node_modules/quill/core/module.js
  var Module, module_default;
  var init_module = __esm({
    "node_modules/quill/core/module.js"() {
      Module = class {
        static DEFAULTS = {};
        constructor(quill) {
          let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          this.quill = quill;
          this.options = options;
        }
      };
      module_default = Module;
    }
  });

  // node_modules/quill/blots/embed.js
  var GUARD_TEXT, Embed, embed_default;
  var init_embed = __esm({
    "node_modules/quill/blots/embed.js"() {
      init_parchment();
      init_text();
      GUARD_TEXT = "\uFEFF";
      Embed = class extends EmbedBlot$1 {
        constructor(scroll, node) {
          super(scroll, node);
          this.contentNode = document.createElement("span");
          this.contentNode.setAttribute("contenteditable", "false");
          Array.from(this.domNode.childNodes).forEach((childNode) => {
            this.contentNode.appendChild(childNode);
          });
          this.leftGuard = document.createTextNode(GUARD_TEXT);
          this.rightGuard = document.createTextNode(GUARD_TEXT);
          this.domNode.appendChild(this.leftGuard);
          this.domNode.appendChild(this.contentNode);
          this.domNode.appendChild(this.rightGuard);
        }
        index(node, offset) {
          if (node === this.leftGuard) return 0;
          if (node === this.rightGuard) return 1;
          return super.index(node, offset);
        }
        restore(node) {
          let range = null;
          let textNode;
          const text2 = node.data.split(GUARD_TEXT).join("");
          if (node === this.leftGuard) {
            if (this.prev instanceof Text2) {
              const prevLength = this.prev.length();
              this.prev.insertAt(prevLength, text2);
              range = {
                startNode: this.prev.domNode,
                startOffset: prevLength + text2.length
              };
            } else {
              textNode = document.createTextNode(text2);
              this.parent.insertBefore(this.scroll.create(textNode), this);
              range = {
                startNode: textNode,
                startOffset: text2.length
              };
            }
          } else if (node === this.rightGuard) {
            if (this.next instanceof Text2) {
              this.next.insertAt(0, text2);
              range = {
                startNode: this.next.domNode,
                startOffset: text2.length
              };
            } else {
              textNode = document.createTextNode(text2);
              this.parent.insertBefore(this.scroll.create(textNode), this.next);
              range = {
                startNode: textNode,
                startOffset: text2.length
              };
            }
          }
          node.data = GUARD_TEXT;
          return range;
        }
        update(mutations, context) {
          mutations.forEach((mutation) => {
            if (mutation.type === "characterData" && (mutation.target === this.leftGuard || mutation.target === this.rightGuard)) {
              const range = this.restore(mutation.target);
              if (range) context.range = range;
            }
          });
        }
      };
      embed_default = Embed;
    }
  });

  // node_modules/quill/core/composition.js
  var Composition, composition_default;
  var init_composition = __esm({
    "node_modules/quill/core/composition.js"() {
      init_embed();
      init_emitter();
      Composition = class {
        isComposing = false;
        constructor(scroll, emitter) {
          this.scroll = scroll;
          this.emitter = emitter;
          this.setupListeners();
        }
        setupListeners() {
          this.scroll.domNode.addEventListener("compositionstart", (event) => {
            if (!this.isComposing) {
              this.handleCompositionStart(event);
            }
          });
          this.scroll.domNode.addEventListener("compositionend", (event) => {
            if (this.isComposing) {
              queueMicrotask(() => {
                this.handleCompositionEnd(event);
              });
            }
          });
        }
        handleCompositionStart(event) {
          const blot = event.target instanceof Node ? this.scroll.find(event.target, true) : null;
          if (blot && !(blot instanceof embed_default)) {
            this.emitter.emit(emitter_default.events.COMPOSITION_BEFORE_START, event);
            this.scroll.batchStart();
            this.emitter.emit(emitter_default.events.COMPOSITION_START, event);
            this.isComposing = true;
          }
        }
        handleCompositionEnd(event) {
          this.emitter.emit(emitter_default.events.COMPOSITION_BEFORE_END, event);
          this.scroll.batchEnd();
          this.emitter.emit(emitter_default.events.COMPOSITION_END, event);
          this.isComposing = false;
        }
      };
      composition_default = Composition;
    }
  });

  // node_modules/quill/core/theme.js
  var Theme, theme_default;
  var init_theme = __esm({
    "node_modules/quill/core/theme.js"() {
      Theme = class _Theme {
        static DEFAULTS = {
          modules: {}
        };
        static themes = {
          default: _Theme
        };
        modules = {};
        constructor(quill, options) {
          this.quill = quill;
          this.options = options;
        }
        init() {
          Object.keys(this.options.modules).forEach((name) => {
            if (this.modules[name] == null) {
              this.addModule(name);
            }
          });
        }
        addModule(name) {
          const ModuleClass = this.quill.constructor.import(`modules/${name}`);
          this.modules[name] = new ModuleClass(this.quill, this.options.modules[name] || {});
          return this.modules[name];
        }
      };
      theme_default = Theme;
    }
  });

  // node_modules/quill/core/utils/scrollRectIntoView.js
  var getParentElement, getElementRect, paddingValueToInt, getScrollDistance, scrollRectIntoView, scrollRectIntoView_default;
  var init_scrollRectIntoView = __esm({
    "node_modules/quill/core/utils/scrollRectIntoView.js"() {
      getParentElement = (element2) => element2.parentElement || element2.getRootNode().host || null;
      getElementRect = (element2) => {
        const rect = element2.getBoundingClientRect();
        const scaleX = "offsetWidth" in element2 && Math.abs(rect.width) / element2.offsetWidth || 1;
        const scaleY = "offsetHeight" in element2 && Math.abs(rect.height) / element2.offsetHeight || 1;
        return {
          top: rect.top,
          right: rect.left + element2.clientWidth * scaleX,
          bottom: rect.top + element2.clientHeight * scaleY,
          left: rect.left
        };
      };
      paddingValueToInt = (value) => {
        const number = parseInt(value, 10);
        return Number.isNaN(number) ? 0 : number;
      };
      getScrollDistance = (targetStart, targetEnd, scrollStart, scrollEnd, scrollPaddingStart, scrollPaddingEnd) => {
        if (targetStart < scrollStart && targetEnd > scrollEnd) {
          return 0;
        }
        if (targetStart < scrollStart) {
          return -(scrollStart - targetStart + scrollPaddingStart);
        }
        if (targetEnd > scrollEnd) {
          return targetEnd - targetStart > scrollEnd - scrollStart ? targetStart + scrollPaddingStart - scrollStart : targetEnd - scrollEnd + scrollPaddingEnd;
        }
        return 0;
      };
      scrollRectIntoView = (root2, targetRect) => {
        const document2 = root2.ownerDocument;
        let rect = targetRect;
        let current = root2;
        while (current) {
          const isDocumentBody = current === document2.body;
          const bounding = isDocumentBody ? {
            top: 0,
            right: window.visualViewport?.width ?? document2.documentElement.clientWidth,
            bottom: window.visualViewport?.height ?? document2.documentElement.clientHeight,
            left: 0
          } : getElementRect(current);
          const style = getComputedStyle(current);
          const scrollDistanceX = getScrollDistance(rect.left, rect.right, bounding.left, bounding.right, paddingValueToInt(style.scrollPaddingLeft), paddingValueToInt(style.scrollPaddingRight));
          const scrollDistanceY = getScrollDistance(rect.top, rect.bottom, bounding.top, bounding.bottom, paddingValueToInt(style.scrollPaddingTop), paddingValueToInt(style.scrollPaddingBottom));
          if (scrollDistanceX || scrollDistanceY) {
            if (isDocumentBody) {
              document2.defaultView?.scrollBy(scrollDistanceX, scrollDistanceY);
            } else {
              const {
                scrollLeft,
                scrollTop
              } = current;
              if (scrollDistanceY) {
                current.scrollTop += scrollDistanceY;
              }
              if (scrollDistanceX) {
                current.scrollLeft += scrollDistanceX;
              }
              const scrolledLeft = current.scrollLeft - scrollLeft;
              const scrolledTop = current.scrollTop - scrollTop;
              rect = {
                left: rect.left - scrolledLeft,
                top: rect.top - scrolledTop,
                right: rect.right - scrolledLeft,
                bottom: rect.bottom - scrolledTop
              };
            }
          }
          current = isDocumentBody || style.position === "fixed" ? null : getParentElement(current);
        }
      };
      scrollRectIntoView_default = scrollRectIntoView;
    }
  });

  // node_modules/quill/core/utils/createRegistryWithFormats.js
  var MAX_REGISTER_ITERATIONS, CORE_FORMATS, createRegistryWithFormats, createRegistryWithFormats_default;
  var init_createRegistryWithFormats = __esm({
    "node_modules/quill/core/utils/createRegistryWithFormats.js"() {
      init_parchment();
      MAX_REGISTER_ITERATIONS = 100;
      CORE_FORMATS = ["block", "break", "cursor", "inline", "scroll", "text"];
      createRegistryWithFormats = (formats, sourceRegistry, debug8) => {
        const registry = new Registry();
        CORE_FORMATS.forEach((name) => {
          const coreBlot = sourceRegistry.query(name);
          if (coreBlot) registry.register(coreBlot);
        });
        formats.forEach((name) => {
          let format = sourceRegistry.query(name);
          if (!format) {
            debug8.error(`Cannot register "${name}" specified in "formats" config. Are you sure it was registered?`);
          }
          let iterations = 0;
          while (format) {
            registry.register(format);
            format = "blotName" in format ? format.requiredContainer ?? null : null;
            iterations += 1;
            if (iterations > MAX_REGISTER_ITERATIONS) {
              debug8.error(`Cycle detected in registering blot requiredContainer: "${name}"`);
              break;
            }
          }
        });
        return registry;
      };
      createRegistryWithFormats_default = createRegistryWithFormats;
    }
  });

  // node_modules/quill/core/quill.js
  function resolveSelector(selector) {
    return typeof selector === "string" ? document.querySelector(selector) : selector;
  }
  function expandModuleConfig(config4) {
    return Object.entries(config4 ?? {}).reduce((expanded, _ref) => {
      let [key, value] = _ref;
      return {
        ...expanded,
        [key]: value === true ? {} : value
      };
    }, {});
  }
  function omitUndefinedValuesFromOptions(obj) {
    return Object.fromEntries(Object.entries(obj).filter((entry) => entry[1] !== void 0));
  }
  function expandConfig(containerOrSelector, options) {
    const container = resolveSelector(containerOrSelector);
    if (!container) {
      throw new Error("Invalid Quill container");
    }
    const shouldUseDefaultTheme = !options.theme || options.theme === Quill.DEFAULTS.theme;
    const theme = shouldUseDefaultTheme ? theme_default : Quill.import(`themes/${options.theme}`);
    if (!theme) {
      throw new Error(`Invalid theme ${options.theme}. Did you register it?`);
    }
    const {
      modules: quillModuleDefaults,
      ...quillDefaults
    } = Quill.DEFAULTS;
    const {
      modules: themeModuleDefaults,
      ...themeDefaults
    } = theme.DEFAULTS;
    let userModuleOptions = expandModuleConfig(options.modules);
    if (userModuleOptions != null && userModuleOptions.toolbar && userModuleOptions.toolbar.constructor !== Object) {
      userModuleOptions = {
        ...userModuleOptions,
        toolbar: {
          container: userModuleOptions.toolbar
        }
      };
    }
    const modules = merge_default({}, expandModuleConfig(quillModuleDefaults), expandModuleConfig(themeModuleDefaults), userModuleOptions);
    const config4 = {
      ...quillDefaults,
      ...omitUndefinedValuesFromOptions(themeDefaults),
      ...omitUndefinedValuesFromOptions(options)
    };
    let registry = options.registry;
    if (registry) {
      if (options.formats) {
        debug4.warn('Ignoring "formats" option because "registry" is specified');
      }
    } else {
      registry = options.formats ? createRegistryWithFormats_default(options.formats, config4.registry, debug4) : config4.registry;
    }
    return {
      ...config4,
      registry,
      container,
      theme,
      modules: Object.entries(modules).reduce((modulesWithDefaults, _ref2) => {
        let [name, value] = _ref2;
        if (!value) return modulesWithDefaults;
        const moduleClass = Quill.import(`modules/${name}`);
        if (moduleClass == null) {
          debug4.error(`Cannot load ${name} module. Are you sure you registered it?`);
          return modulesWithDefaults;
        }
        return {
          ...modulesWithDefaults,
          // @ts-expect-error
          [name]: merge_default({}, moduleClass.DEFAULTS || {}, value)
        };
      }, {}),
      bounds: resolveSelector(config4.bounds)
    };
  }
  function modify(modifier, source, index, shift) {
    if (!this.isEnabled() && source === emitter_default.sources.USER && !this.allowReadOnlyEdits) {
      return new import_quill_delta3.default();
    }
    let range = index == null ? null : this.getSelection();
    const oldDelta = this.editor.delta;
    const change = modifier();
    if (range != null) {
      if (index === true) {
        index = range.index;
      }
      if (shift == null) {
        range = shiftRange2(range, change, source);
      } else if (shift !== 0) {
        range = shiftRange2(range, index, shift, source);
      }
      this.setSelection(range, emitter_default.sources.SILENT);
    }
    if (change.length() > 0) {
      const args2 = [emitter_default.events.TEXT_CHANGE, change, oldDelta, source];
      this.emitter.emit(emitter_default.events.EDITOR_CHANGE, ...args2);
      if (source !== emitter_default.sources.SILENT) {
        this.emitter.emit(...args2);
      }
    }
    return change;
  }
  function overload(index, length2, name, value, source) {
    let formats = {};
    if (typeof index.index === "number" && typeof index.length === "number") {
      if (typeof length2 !== "number") {
        source = value;
        value = name;
        name = length2;
        length2 = index.length;
        index = index.index;
      } else {
        length2 = index.length;
        index = index.index;
      }
    } else if (typeof length2 !== "number") {
      source = value;
      value = name;
      name = length2;
      length2 = 0;
    }
    if (typeof name === "object") {
      formats = name;
      source = value;
    } else if (typeof name === "string") {
      if (value != null) {
        formats[name] = value;
      } else {
        source = name;
      }
    }
    source = source || emitter_default.sources.API;
    return [index, length2, formats, source];
  }
  function shiftRange2(range, index, lengthOrSource, source) {
    const length2 = typeof lengthOrSource === "number" ? lengthOrSource : 0;
    if (range == null) return null;
    let start;
    let end;
    if (index && typeof index.transformPosition === "function") {
      [start, end] = [range.index, range.index + range.length].map((pos) => (
        // @ts-expect-error -- TODO: add a better type guard around `index`
        index.transformPosition(pos, source !== emitter_default.sources.USER)
      ));
    } else {
      [start, end] = [range.index, range.index + range.length].map((pos) => {
        if (pos < index || pos === index && source === emitter_default.sources.USER) return pos;
        if (length2 >= 0) {
          return pos + length2;
        }
        return Math.max(index, pos + length2);
      });
    }
    return new Range(start, end - start);
  }
  var import_quill_delta3, debug4, globalRegistry, Quill;
  var init_quill = __esm({
    "node_modules/quill/core/quill.js"() {
      init_lodash();
      init_parchment();
      import_quill_delta3 = __toESM(require_Delta(), 1);
      init_editor();
      init_emitter();
      init_instances();
      init_logger();
      init_module();
      init_selection();
      init_composition();
      init_theme();
      init_scrollRectIntoView();
      init_createRegistryWithFormats();
      debug4 = logger_default("quill");
      globalRegistry = new Registry();
      ParentBlot$1.uiClass = "ql-ui";
      Quill = class _Quill {
        static DEFAULTS = {
          bounds: null,
          modules: {
            clipboard: true,
            keyboard: true,
            history: true,
            uploader: true
          },
          placeholder: "",
          readOnly: false,
          registry: globalRegistry,
          theme: "default"
        };
        static events = emitter_default.events;
        static sources = emitter_default.sources;
        static version = false ? "dev" : "2.0.2";
        static imports = {
          delta: import_quill_delta3.default,
          parchment: parchment_exports,
          "core/module": module_default,
          "core/theme": theme_default
        };
        static debug(limit) {
          if (limit === true) {
            limit = "log";
          }
          logger_default.level(limit);
        }
        static find(node) {
          let bubble = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          return instances_default.get(node) || globalRegistry.find(node, bubble);
        }
        static import(name) {
          if (this.imports[name] == null) {
            debug4.error(`Cannot import ${name}. Are you sure it was registered?`);
          }
          return this.imports[name];
        }
        static register() {
          if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) !== "string") {
            const target = arguments.length <= 0 ? void 0 : arguments[0];
            const overwrite = !!(arguments.length <= 1 ? void 0 : arguments[1]);
            const name = "attrName" in target ? target.attrName : target.blotName;
            if (typeof name === "string") {
              this.register(`formats/${name}`, target, overwrite);
            } else {
              Object.keys(target).forEach((key) => {
                this.register(key, target[key], overwrite);
              });
            }
          } else {
            const path = arguments.length <= 0 ? void 0 : arguments[0];
            const target = arguments.length <= 1 ? void 0 : arguments[1];
            const overwrite = !!(arguments.length <= 2 ? void 0 : arguments[2]);
            if (this.imports[path] != null && !overwrite) {
              debug4.warn(`Overwriting ${path} with`, target);
            }
            this.imports[path] = target;
            if ((path.startsWith("blots/") || path.startsWith("formats/")) && target && typeof target !== "boolean" && target.blotName !== "abstract") {
              globalRegistry.register(target);
            }
            if (typeof target.register === "function") {
              target.register(globalRegistry);
            }
          }
        }
        constructor(container) {
          let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          this.options = expandConfig(container, options);
          this.container = this.options.container;
          if (this.container == null) {
            debug4.error("Invalid Quill container", container);
            return;
          }
          if (this.options.debug) {
            _Quill.debug(this.options.debug);
          }
          const html = this.container.innerHTML.trim();
          this.container.classList.add("ql-container");
          this.container.innerHTML = "";
          instances_default.set(this.container, this);
          this.root = this.addContainer("ql-editor");
          this.root.classList.add("ql-blank");
          this.emitter = new emitter_default();
          const scrollBlotName = ScrollBlot$1.blotName;
          const ScrollBlot2 = this.options.registry.query(scrollBlotName);
          if (!ScrollBlot2 || !("blotName" in ScrollBlot2)) {
            throw new Error(`Cannot initialize Quill without "${scrollBlotName}" blot`);
          }
          this.scroll = new ScrollBlot2(this.options.registry, this.root, {
            emitter: this.emitter
          });
          this.editor = new editor_default(this.scroll);
          this.selection = new selection_default(this.scroll, this.emitter);
          this.composition = new composition_default(this.scroll, this.emitter);
          this.theme = new this.options.theme(this, this.options);
          this.keyboard = this.theme.addModule("keyboard");
          this.clipboard = this.theme.addModule("clipboard");
          this.history = this.theme.addModule("history");
          this.uploader = this.theme.addModule("uploader");
          this.theme.addModule("input");
          this.theme.addModule("uiNode");
          this.theme.init();
          this.emitter.on(emitter_default.events.EDITOR_CHANGE, (type) => {
            if (type === emitter_default.events.TEXT_CHANGE) {
              this.root.classList.toggle("ql-blank", this.editor.isBlank());
            }
          });
          this.emitter.on(emitter_default.events.SCROLL_UPDATE, (source, mutations) => {
            const oldRange = this.selection.lastRange;
            const [newRange] = this.selection.getRange();
            const selectionInfo = oldRange && newRange ? {
              oldRange,
              newRange
            } : void 0;
            modify.call(this, () => this.editor.update(null, mutations, selectionInfo), source);
          });
          this.emitter.on(emitter_default.events.SCROLL_EMBED_UPDATE, (blot, delta) => {
            const oldRange = this.selection.lastRange;
            const [newRange] = this.selection.getRange();
            const selectionInfo = oldRange && newRange ? {
              oldRange,
              newRange
            } : void 0;
            modify.call(this, () => {
              const change = new import_quill_delta3.default().retain(blot.offset(this)).retain({
                [blot.statics.blotName]: delta
              });
              return this.editor.update(change, [], selectionInfo);
            }, _Quill.sources.USER);
          });
          if (html) {
            const contents = this.clipboard.convert({
              html: `${html}<p><br></p>`,
              text: "\n"
            });
            this.setContents(contents);
          }
          this.history.clear();
          if (this.options.placeholder) {
            this.root.setAttribute("data-placeholder", this.options.placeholder);
          }
          if (this.options.readOnly) {
            this.disable();
          }
          this.allowReadOnlyEdits = false;
        }
        addContainer(container) {
          let refNode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          if (typeof container === "string") {
            const className = container;
            container = document.createElement("div");
            container.classList.add(className);
          }
          this.container.insertBefore(container, refNode);
          return container;
        }
        blur() {
          this.selection.setRange(null);
        }
        deleteText(index, length2, source) {
          [index, length2, , source] = overload(index, length2, source);
          return modify.call(this, () => {
            return this.editor.deleteText(index, length2);
          }, source, index, -1 * length2);
        }
        disable() {
          this.enable(false);
        }
        editReadOnly(modifier) {
          this.allowReadOnlyEdits = true;
          const value = modifier();
          this.allowReadOnlyEdits = false;
          return value;
        }
        enable() {
          let enabled = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
          this.scroll.enable(enabled);
          this.container.classList.toggle("ql-disabled", !enabled);
        }
        focus() {
          let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          this.selection.focus();
          if (!options.preventScroll) {
            this.scrollSelectionIntoView();
          }
        }
        format(name, value) {
          let source = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : emitter_default.sources.API;
          return modify.call(this, () => {
            const range = this.getSelection(true);
            let change = new import_quill_delta3.default();
            if (range == null) return change;
            if (this.scroll.query(name, Scope.BLOCK)) {
              change = this.editor.formatLine(range.index, range.length, {
                [name]: value
              });
            } else if (range.length === 0) {
              this.selection.format(name, value);
              return change;
            } else {
              change = this.editor.formatText(range.index, range.length, {
                [name]: value
              });
            }
            this.setSelection(range, emitter_default.sources.SILENT);
            return change;
          }, source);
        }
        formatLine(index, length2, name, value, source) {
          let formats;
          [index, length2, formats, source] = overload(
            index,
            length2,
            // @ts-expect-error
            name,
            value,
            source
          );
          return modify.call(this, () => {
            return this.editor.formatLine(index, length2, formats);
          }, source, index, 0);
        }
        formatText(index, length2, name, value, source) {
          let formats;
          [index, length2, formats, source] = overload(
            // @ts-expect-error
            index,
            length2,
            name,
            value,
            source
          );
          return modify.call(this, () => {
            return this.editor.formatText(index, length2, formats);
          }, source, index, 0);
        }
        getBounds(index) {
          let length2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          let bounds = null;
          if (typeof index === "number") {
            bounds = this.selection.getBounds(index, length2);
          } else {
            bounds = this.selection.getBounds(index.index, index.length);
          }
          if (!bounds) return null;
          const containerBounds = this.container.getBoundingClientRect();
          return {
            bottom: bounds.bottom - containerBounds.top,
            height: bounds.height,
            left: bounds.left - containerBounds.left,
            right: bounds.right - containerBounds.left,
            top: bounds.top - containerBounds.top,
            width: bounds.width
          };
        }
        getContents() {
          let index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          let length2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - index;
          [index, length2] = overload(index, length2);
          return this.editor.getContents(index, length2);
        }
        getFormat() {
          let index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(true);
          let length2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          if (typeof index === "number") {
            return this.editor.getFormat(index, length2);
          }
          return this.editor.getFormat(index.index, index.length);
        }
        getIndex(blot) {
          return blot.offset(this.scroll);
        }
        getLength() {
          return this.scroll.length();
        }
        getLeaf(index) {
          return this.scroll.leaf(index);
        }
        getLine(index) {
          return this.scroll.line(index);
        }
        getLines() {
          let index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          let length2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
          if (typeof index !== "number") {
            return this.scroll.lines(index.index, index.length);
          }
          return this.scroll.lines(index, length2);
        }
        getModule(name) {
          return this.theme.modules[name];
        }
        getSelection() {
          let focus = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
          if (focus) this.focus();
          this.update();
          return this.selection.getRange()[0];
        }
        getSemanticHTML() {
          let index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          let length2 = arguments.length > 1 ? arguments[1] : void 0;
          if (typeof index === "number") {
            length2 = length2 ?? this.getLength() - index;
          }
          [index, length2] = overload(index, length2);
          return this.editor.getHTML(index, length2);
        }
        getText() {
          let index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          let length2 = arguments.length > 1 ? arguments[1] : void 0;
          if (typeof index === "number") {
            length2 = length2 ?? this.getLength() - index;
          }
          [index, length2] = overload(index, length2);
          return this.editor.getText(index, length2);
        }
        hasFocus() {
          return this.selection.hasFocus();
        }
        insertEmbed(index, embed, value) {
          let source = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : _Quill.sources.API;
          return modify.call(this, () => {
            return this.editor.insertEmbed(index, embed, value);
          }, source, index);
        }
        insertText(index, text2, name, value, source) {
          let formats;
          [index, , formats, source] = overload(index, 0, name, value, source);
          return modify.call(this, () => {
            return this.editor.insertText(index, text2, formats);
          }, source, index, text2.length);
        }
        isEnabled() {
          return this.scroll.isEnabled();
        }
        off() {
          return this.emitter.off(...arguments);
        }
        on() {
          return this.emitter.on(...arguments);
        }
        once() {
          return this.emitter.once(...arguments);
        }
        removeFormat(index, length2, source) {
          [index, length2, , source] = overload(index, length2, source);
          return modify.call(this, () => {
            return this.editor.removeFormat(index, length2);
          }, source, index);
        }
        scrollRectIntoView(rect) {
          scrollRectIntoView_default(this.root, rect);
        }
        /**
         * @deprecated Use Quill#scrollSelectionIntoView() instead.
         */
        scrollIntoView() {
          console.warn("Quill#scrollIntoView() has been deprecated and will be removed in the near future. Please use Quill#scrollSelectionIntoView() instead.");
          this.scrollSelectionIntoView();
        }
        /**
         * Scroll the current selection into the visible area.
         * If the selection is already visible, no scrolling will occur.
         */
        scrollSelectionIntoView() {
          const range = this.selection.lastRange;
          const bounds = range && this.selection.getBounds(range.index, range.length);
          if (bounds) {
            this.scrollRectIntoView(bounds);
          }
        }
        setContents(delta) {
          let source = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : emitter_default.sources.API;
          return modify.call(this, () => {
            delta = new import_quill_delta3.default(delta);
            const length2 = this.getLength();
            const delete1 = this.editor.deleteText(0, length2);
            const applied = this.editor.insertContents(0, delta);
            const delete2 = this.editor.deleteText(this.getLength() - 1, 1);
            return delete1.compose(applied).compose(delete2);
          }, source);
        }
        setSelection(index, length2, source) {
          if (index == null) {
            this.selection.setRange(null, length2 || _Quill.sources.API);
          } else {
            [index, length2, , source] = overload(index, length2, source);
            this.selection.setRange(new Range(Math.max(0, index), length2), source);
            if (source !== emitter_default.sources.SILENT) {
              this.scrollSelectionIntoView();
            }
          }
        }
        setText(text2) {
          let source = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : emitter_default.sources.API;
          const delta = new import_quill_delta3.default().insert(text2);
          return this.setContents(delta, source);
        }
        update() {
          let source = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : emitter_default.sources.USER;
          const change = this.scroll.update(source);
          this.selection.update(source);
          return change;
        }
        updateContents(delta) {
          let source = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : emitter_default.sources.API;
          return modify.call(this, () => {
            delta = new import_quill_delta3.default(delta);
            return this.editor.applyDelta(delta);
          }, source, true);
        }
      };
    }
  });

  // node_modules/quill/blots/container.js
  var Container, container_default;
  var init_container = __esm({
    "node_modules/quill/blots/container.js"() {
      init_parchment();
      Container = class extends ContainerBlot$1 {
      };
      container_default = Container;
    }
  });

  // node_modules/quill/blots/scroll.js
  function isLine(blot) {
    return blot instanceof Block || blot instanceof BlockEmbed;
  }
  function isUpdatable(blot) {
    return typeof blot.updateContent === "function";
  }
  function insertInlineContents(parent, index, inlineContents) {
    inlineContents.reduce((index2, op) => {
      const length2 = import_quill_delta4.Op.length(op);
      let attributes = op.attributes || {};
      if (op.insert != null) {
        if (typeof op.insert === "string") {
          const text2 = op.insert;
          parent.insertAt(index2, text2);
          const [leaf] = parent.descendant(LeafBlot$1, index2);
          const formats = bubbleFormats(leaf);
          attributes = import_quill_delta4.AttributeMap.diff(formats, attributes) || {};
        } else if (typeof op.insert === "object") {
          const key = Object.keys(op.insert)[0];
          if (key == null) return index2;
          parent.insertAt(index2, key, op.insert[key]);
          const isInlineEmbed = parent.scroll.query(key, Scope.INLINE) != null;
          if (isInlineEmbed) {
            const [leaf] = parent.descendant(LeafBlot$1, index2);
            const formats = bubbleFormats(leaf);
            attributes = import_quill_delta4.AttributeMap.diff(formats, attributes) || {};
          }
        }
      }
      Object.keys(attributes).forEach((key) => {
        parent.formatAt(index2, length2, key, attributes[key]);
      });
      return index2 + length2;
    }, index);
  }
  var import_quill_delta4, Scroll, scroll_default;
  var init_scroll = __esm({
    "node_modules/quill/blots/scroll.js"() {
      init_parchment();
      import_quill_delta4 = __toESM(require_Delta(), 1);
      init_emitter();
      init_block();
      init_break();
      init_container();
      Scroll = class extends ScrollBlot$1 {
        static blotName = "scroll";
        static className = "ql-editor";
        static tagName = "DIV";
        static defaultChild = Block;
        static allowedChildren = [Block, BlockEmbed, container_default];
        constructor(registry, domNode, _ref) {
          let {
            emitter
          } = _ref;
          super(registry, domNode);
          this.emitter = emitter;
          this.batch = false;
          this.optimize();
          this.enable();
          this.domNode.addEventListener("dragstart", (e) => this.handleDragStart(e));
        }
        batchStart() {
          if (!Array.isArray(this.batch)) {
            this.batch = [];
          }
        }
        batchEnd() {
          if (!this.batch) return;
          const mutations = this.batch;
          this.batch = false;
          this.update(mutations);
        }
        emitMount(blot) {
          this.emitter.emit(emitter_default.events.SCROLL_BLOT_MOUNT, blot);
        }
        emitUnmount(blot) {
          this.emitter.emit(emitter_default.events.SCROLL_BLOT_UNMOUNT, blot);
        }
        emitEmbedUpdate(blot, change) {
          this.emitter.emit(emitter_default.events.SCROLL_EMBED_UPDATE, blot, change);
        }
        deleteAt(index, length2) {
          const [first, offset] = this.line(index);
          const [last2] = this.line(index + length2);
          super.deleteAt(index, length2);
          if (last2 != null && first !== last2 && offset > 0) {
            if (first instanceof BlockEmbed || last2 instanceof BlockEmbed) {
              this.optimize();
              return;
            }
            const ref = last2.children.head instanceof break_default ? null : last2.children.head;
            first.moveChildren(last2, ref);
            first.remove();
          }
          this.optimize();
        }
        enable() {
          let enabled = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
          this.domNode.setAttribute("contenteditable", enabled ? "true" : "false");
        }
        formatAt(index, length2, format, value) {
          super.formatAt(index, length2, format, value);
          this.optimize();
        }
        insertAt(index, value, def) {
          if (index >= this.length()) {
            if (def == null || this.scroll.query(value, Scope.BLOCK) == null) {
              const blot = this.scroll.create(this.statics.defaultChild.blotName);
              this.appendChild(blot);
              if (def == null && value.endsWith("\n")) {
                blot.insertAt(0, value.slice(0, -1), def);
              } else {
                blot.insertAt(0, value, def);
              }
            } else {
              const embed = this.scroll.create(value, def);
              this.appendChild(embed);
            }
          } else {
            super.insertAt(index, value, def);
          }
          this.optimize();
        }
        insertBefore(blot, ref) {
          if (blot.statics.scope === Scope.INLINE_BLOT) {
            const wrapper = this.scroll.create(this.statics.defaultChild.blotName);
            wrapper.appendChild(blot);
            super.insertBefore(wrapper, ref);
          } else {
            super.insertBefore(blot, ref);
          }
        }
        insertContents(index, delta) {
          const renderBlocks = this.deltaToRenderBlocks(delta.concat(new import_quill_delta4.default().insert("\n")));
          const last2 = renderBlocks.pop();
          if (last2 == null) return;
          this.batchStart();
          const first = renderBlocks.shift();
          if (first) {
            const shouldInsertNewlineChar = first.type === "block" && (first.delta.length() === 0 || !this.descendant(BlockEmbed, index)[0] && index < this.length());
            const delta2 = first.type === "block" ? first.delta : new import_quill_delta4.default().insert({
              [first.key]: first.value
            });
            insertInlineContents(this, index, delta2);
            const newlineCharLength = first.type === "block" ? 1 : 0;
            const lineEndIndex = index + delta2.length() + newlineCharLength;
            if (shouldInsertNewlineChar) {
              this.insertAt(lineEndIndex - 1, "\n");
            }
            const formats = bubbleFormats(this.line(index)[0]);
            const attributes = import_quill_delta4.AttributeMap.diff(formats, first.attributes) || {};
            Object.keys(attributes).forEach((name) => {
              this.formatAt(lineEndIndex - 1, 1, name, attributes[name]);
            });
            index = lineEndIndex;
          }
          let [refBlot, refBlotOffset] = this.children.find(index);
          if (renderBlocks.length) {
            if (refBlot) {
              refBlot = refBlot.split(refBlotOffset);
              refBlotOffset = 0;
            }
            renderBlocks.forEach((renderBlock) => {
              if (renderBlock.type === "block") {
                const block = this.createBlock(renderBlock.attributes, refBlot || void 0);
                insertInlineContents(block, 0, renderBlock.delta);
              } else {
                const blockEmbed = this.create(renderBlock.key, renderBlock.value);
                this.insertBefore(blockEmbed, refBlot || void 0);
                Object.keys(renderBlock.attributes).forEach((name) => {
                  blockEmbed.format(name, renderBlock.attributes[name]);
                });
              }
            });
          }
          if (last2.type === "block" && last2.delta.length()) {
            const offset = refBlot ? refBlot.offset(refBlot.scroll) + refBlotOffset : this.length();
            insertInlineContents(this, offset, last2.delta);
          }
          this.batchEnd();
          this.optimize();
        }
        isEnabled() {
          return this.domNode.getAttribute("contenteditable") === "true";
        }
        leaf(index) {
          const last2 = this.path(index).pop();
          if (!last2) {
            return [null, -1];
          }
          const [blot, offset] = last2;
          return blot instanceof LeafBlot$1 ? [blot, offset] : [null, -1];
        }
        line(index) {
          if (index === this.length()) {
            return this.line(index - 1);
          }
          return this.descendant(isLine, index);
        }
        lines() {
          let index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          let length2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
          const getLines = (blot, blotIndex, blotLength) => {
            let lines = [];
            let lengthLeft = blotLength;
            blot.children.forEachAt(blotIndex, blotLength, (child, childIndex, childLength) => {
              if (isLine(child)) {
                lines.push(child);
              } else if (child instanceof ContainerBlot$1) {
                lines = lines.concat(getLines(child, childIndex, lengthLeft));
              }
              lengthLeft -= childLength;
            });
            return lines;
          };
          return getLines(this, index, length2);
        }
        optimize() {
          let mutations = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
          let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          if (this.batch) return;
          super.optimize(mutations, context);
          if (mutations.length > 0) {
            this.emitter.emit(emitter_default.events.SCROLL_OPTIMIZE, mutations, context);
          }
        }
        path(index) {
          return super.path(index).slice(1);
        }
        remove() {
        }
        update(mutations) {
          if (this.batch) {
            if (Array.isArray(mutations)) {
              this.batch = this.batch.concat(mutations);
            }
            return;
          }
          let source = emitter_default.sources.USER;
          if (typeof mutations === "string") {
            source = mutations;
          }
          if (!Array.isArray(mutations)) {
            mutations = this.observer.takeRecords();
          }
          mutations = mutations.filter((_ref2) => {
            let {
              target
            } = _ref2;
            const blot = this.find(target, true);
            return blot && !isUpdatable(blot);
          });
          if (mutations.length > 0) {
            this.emitter.emit(emitter_default.events.SCROLL_BEFORE_UPDATE, source, mutations);
          }
          super.update(mutations.concat([]));
          if (mutations.length > 0) {
            this.emitter.emit(emitter_default.events.SCROLL_UPDATE, source, mutations);
          }
        }
        updateEmbedAt(index, key, change) {
          const [blot] = this.descendant((b) => b instanceof BlockEmbed, index);
          if (blot && blot.statics.blotName === key && isUpdatable(blot)) {
            blot.updateContent(change);
          }
        }
        handleDragStart(event) {
          event.preventDefault();
        }
        deltaToRenderBlocks(delta) {
          const renderBlocks = [];
          let currentBlockDelta = new import_quill_delta4.default();
          delta.forEach((op) => {
            const insert = op?.insert;
            if (!insert) return;
            if (typeof insert === "string") {
              const splitted = insert.split("\n");
              splitted.slice(0, -1).forEach((text2) => {
                currentBlockDelta.insert(text2, op.attributes);
                renderBlocks.push({
                  type: "block",
                  delta: currentBlockDelta,
                  attributes: op.attributes ?? {}
                });
                currentBlockDelta = new import_quill_delta4.default();
              });
              const last2 = splitted[splitted.length - 1];
              if (last2) {
                currentBlockDelta.insert(last2, op.attributes);
              }
            } else {
              const key = Object.keys(insert)[0];
              if (!key) return;
              if (this.query(key, Scope.INLINE)) {
                currentBlockDelta.push(op);
              } else {
                if (currentBlockDelta.length()) {
                  renderBlocks.push({
                    type: "block",
                    delta: currentBlockDelta,
                    attributes: {}
                  });
                }
                currentBlockDelta = new import_quill_delta4.default();
                renderBlocks.push({
                  type: "blockEmbed",
                  key,
                  value: insert[key],
                  attributes: op.attributes ?? {}
                });
              }
            }
          });
          if (currentBlockDelta.length()) {
            renderBlocks.push({
              type: "block",
              delta: currentBlockDelta,
              attributes: {}
            });
          }
          return renderBlocks;
        }
        createBlock(attributes, refBlot) {
          let blotName;
          const formats = {};
          Object.entries(attributes).forEach((_ref3) => {
            let [key, value] = _ref3;
            const isBlockBlot = this.query(key, Scope.BLOCK & Scope.BLOT) != null;
            if (isBlockBlot) {
              blotName = key;
            } else {
              formats[key] = value;
            }
          });
          const block = this.create(blotName || this.statics.defaultChild.blotName, blotName ? attributes[blotName] : void 0);
          this.insertBefore(block, refBlot || void 0);
          const length2 = block.length();
          Object.entries(formats).forEach((_ref4) => {
            let [key, value] = _ref4;
            block.formatAt(0, length2, key, value);
          });
          return block;
        }
      };
      scroll_default = Scroll;
    }
  });

  // node_modules/quill/formats/align.js
  var config, AlignAttribute, AlignClass, AlignStyle;
  var init_align = __esm({
    "node_modules/quill/formats/align.js"() {
      init_parchment();
      config = {
        scope: Scope.BLOCK,
        whitelist: ["right", "center", "justify"]
      };
      AlignAttribute = new Attributor("align", "align", config);
      AlignClass = new ClassAttributor$1("align", "ql-align", config);
      AlignStyle = new StyleAttributor$1("align", "text-align", config);
    }
  });

  // node_modules/quill/formats/color.js
  var ColorAttributor, ColorClass, ColorStyle;
  var init_color = __esm({
    "node_modules/quill/formats/color.js"() {
      init_parchment();
      ColorAttributor = class extends StyleAttributor$1 {
        value(domNode) {
          let value = super.value(domNode);
          if (!value.startsWith("rgb(")) return value;
          value = value.replace(/^[^\d]+/, "").replace(/[^\d]+$/, "");
          const hex = value.split(",").map((component) => `00${parseInt(component, 10).toString(16)}`.slice(-2)).join("");
          return `#${hex}`;
        }
      };
      ColorClass = new ClassAttributor$1("color", "ql-color", {
        scope: Scope.INLINE
      });
      ColorStyle = new ColorAttributor("color", "color", {
        scope: Scope.INLINE
      });
    }
  });

  // node_modules/quill/formats/background.js
  var BackgroundClass, BackgroundStyle;
  var init_background = __esm({
    "node_modules/quill/formats/background.js"() {
      init_parchment();
      init_color();
      BackgroundClass = new ClassAttributor$1("background", "ql-bg", {
        scope: Scope.INLINE
      });
      BackgroundStyle = new ColorAttributor("background", "background-color", {
        scope: Scope.INLINE
      });
    }
  });

  // node_modules/quill/formats/code.js
  var CodeBlockContainer, CodeBlock, Code;
  var init_code = __esm({
    "node_modules/quill/formats/code.js"() {
      init_block();
      init_break();
      init_cursor();
      init_inline();
      init_text();
      init_container();
      init_quill();
      CodeBlockContainer = class extends container_default {
        static create(value) {
          const domNode = super.create(value);
          domNode.setAttribute("spellcheck", "false");
          return domNode;
        }
        code(index, length2) {
          return this.children.map((child) => child.length() <= 1 ? "" : child.domNode.innerText).join("\n").slice(index, index + length2);
        }
        html(index, length2) {
          return `<pre>
${escapeText(this.code(index, length2))}
</pre>`;
        }
      };
      CodeBlock = class extends Block {
        static TAB = "  ";
        static register() {
          Quill.register(CodeBlockContainer);
        }
      };
      Code = class extends inline_default {
      };
      Code.blotName = "code";
      Code.tagName = "CODE";
      CodeBlock.blotName = "code-block";
      CodeBlock.className = "ql-code-block";
      CodeBlock.tagName = "DIV";
      CodeBlockContainer.blotName = "code-block-container";
      CodeBlockContainer.className = "ql-code-block-container";
      CodeBlockContainer.tagName = "DIV";
      CodeBlockContainer.allowedChildren = [CodeBlock];
      CodeBlock.allowedChildren = [Text2, break_default, cursor_default];
      CodeBlock.requiredContainer = CodeBlockContainer;
    }
  });

  // node_modules/quill/formats/direction.js
  var config2, DirectionAttribute, DirectionClass, DirectionStyle;
  var init_direction = __esm({
    "node_modules/quill/formats/direction.js"() {
      init_parchment();
      config2 = {
        scope: Scope.BLOCK,
        whitelist: ["rtl"]
      };
      DirectionAttribute = new Attributor("direction", "dir", config2);
      DirectionClass = new ClassAttributor$1("direction", "ql-direction", config2);
      DirectionStyle = new StyleAttributor$1("direction", "direction", config2);
    }
  });

  // node_modules/quill/formats/font.js
  var config3, FontClass, FontStyleAttributor, FontStyle;
  var init_font = __esm({
    "node_modules/quill/formats/font.js"() {
      init_parchment();
      config3 = {
        scope: Scope.INLINE,
        whitelist: ["serif", "monospace"]
      };
      FontClass = new ClassAttributor$1("font", "ql-font", config3);
      FontStyleAttributor = class extends StyleAttributor$1 {
        value(node) {
          return super.value(node).replace(/["']/g, "");
        }
      };
      FontStyle = new FontStyleAttributor("font", "font-family", config3);
    }
  });

  // node_modules/quill/formats/size.js
  var SizeClass, SizeStyle;
  var init_size = __esm({
    "node_modules/quill/formats/size.js"() {
      init_parchment();
      SizeClass = new ClassAttributor$1("size", "ql-size", {
        scope: Scope.INLINE,
        whitelist: ["small", "large", "huge"]
      });
      SizeStyle = new StyleAttributor$1("size", "font-size", {
        scope: Scope.INLINE,
        whitelist: ["10px", "18px", "32px"]
      });
    }
  });

  // node_modules/quill/modules/keyboard.js
  function makeCodeBlockHandler(indent) {
    return {
      key: "Tab",
      shiftKey: !indent,
      format: {
        "code-block": true
      },
      handler(range, _ref) {
        let {
          event
        } = _ref;
        const CodeBlock2 = this.quill.scroll.query("code-block");
        const {
          TAB
        } = CodeBlock2;
        if (range.length === 0 && !event.shiftKey) {
          this.quill.insertText(range.index, TAB, Quill.sources.USER);
          this.quill.setSelection(range.index + TAB.length, Quill.sources.SILENT);
          return;
        }
        const lines = range.length === 0 ? this.quill.getLines(range.index, 1) : this.quill.getLines(range);
        let {
          index,
          length: length2
        } = range;
        lines.forEach((line, i) => {
          if (indent) {
            line.insertAt(0, TAB);
            if (i === 0) {
              index += TAB.length;
            } else {
              length2 += TAB.length;
            }
          } else if (line.domNode.textContent.startsWith(TAB)) {
            line.deleteAt(0, TAB.length);
            if (i === 0) {
              index -= TAB.length;
            } else {
              length2 -= TAB.length;
            }
          }
        });
        this.quill.update(Quill.sources.USER);
        this.quill.setSelection(index, length2, Quill.sources.SILENT);
      }
    };
  }
  function makeEmbedArrowHandler(key, shiftKey) {
    const where = key === "ArrowLeft" ? "prefix" : "suffix";
    return {
      key,
      shiftKey,
      altKey: null,
      [where]: /^$/,
      handler(range) {
        let {
          index
        } = range;
        if (key === "ArrowRight") {
          index += range.length + 1;
        }
        const [leaf] = this.quill.getLeaf(index);
        if (!(leaf instanceof EmbedBlot$1)) return true;
        if (key === "ArrowLeft") {
          if (shiftKey) {
            this.quill.setSelection(range.index - 1, range.length + 1, Quill.sources.USER);
          } else {
            this.quill.setSelection(range.index - 1, Quill.sources.USER);
          }
        } else if (shiftKey) {
          this.quill.setSelection(range.index, range.length + 1, Quill.sources.USER);
        } else {
          this.quill.setSelection(range.index + range.length + 1, Quill.sources.USER);
        }
        return false;
      }
    };
  }
  function makeFormatHandler(format) {
    return {
      key: format[0],
      shortKey: true,
      handler(range, context) {
        this.quill.format(format, !context.format[format], Quill.sources.USER);
      }
    };
  }
  function makeTableArrowHandler(up) {
    return {
      key: up ? "ArrowUp" : "ArrowDown",
      collapsed: true,
      format: ["table"],
      handler(range, context) {
        const key = up ? "prev" : "next";
        const cell = context.line;
        const targetRow = cell.parent[key];
        if (targetRow != null) {
          if (targetRow.statics.blotName === "table-row") {
            let targetCell = targetRow.children.head;
            let cur = cell;
            while (cur.prev != null) {
              cur = cur.prev;
              targetCell = targetCell.next;
            }
            const index = targetCell.offset(this.quill.scroll) + Math.min(context.offset, targetCell.length() - 1);
            this.quill.setSelection(index, 0, Quill.sources.USER);
          }
        } else {
          const targetLine = cell.table()[key];
          if (targetLine != null) {
            if (up) {
              this.quill.setSelection(targetLine.offset(this.quill.scroll) + targetLine.length() - 1, 0, Quill.sources.USER);
            } else {
              this.quill.setSelection(targetLine.offset(this.quill.scroll), 0, Quill.sources.USER);
            }
          }
        }
        return false;
      }
    };
  }
  function normalize(binding) {
    if (typeof binding === "string" || typeof binding === "number") {
      binding = {
        key: binding
      };
    } else if (typeof binding === "object") {
      binding = cloneDeep_default(binding);
    } else {
      return null;
    }
    if (binding.shortKey) {
      binding[SHORTKEY] = binding.shortKey;
      delete binding.shortKey;
    }
    return binding;
  }
  function deleteRange(_ref2) {
    let {
      quill,
      range
    } = _ref2;
    const lines = quill.getLines(range);
    let formats = {};
    if (lines.length > 1) {
      const firstFormats = lines[0].formats();
      const lastFormats = lines[lines.length - 1].formats();
      formats = import_quill_delta5.AttributeMap.diff(lastFormats, firstFormats) || {};
    }
    quill.deleteText(range, Quill.sources.USER);
    if (Object.keys(formats).length > 0) {
      quill.formatLine(range.index, 1, formats, Quill.sources.USER);
    }
    quill.setSelection(range.index, Quill.sources.SILENT);
  }
  function tableSide(_table, row, cell, offset) {
    if (row.prev == null && row.next == null) {
      if (cell.prev == null && cell.next == null) {
        return offset === 0 ? -1 : 1;
      }
      return cell.prev == null ? -1 : 1;
    }
    if (row.prev == null) {
      return -1;
    }
    if (row.next == null) {
      return 1;
    }
    return null;
  }
  var import_quill_delta5, debug5, SHORTKEY, Keyboard, defaultOptions;
  var init_keyboard = __esm({
    "node_modules/quill/modules/keyboard.js"() {
      init_lodash();
      import_quill_delta5 = __toESM(require_Delta(), 1);
      init_parchment();
      init_quill();
      init_logger();
      init_module();
      debug5 = logger_default("quill:keyboard");
      SHORTKEY = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
      Keyboard = class _Keyboard extends module_default {
        static match(evt, binding) {
          if (["altKey", "ctrlKey", "metaKey", "shiftKey"].some((key) => {
            return !!binding[key] !== evt[key] && binding[key] !== null;
          })) {
            return false;
          }
          return binding.key === evt.key || binding.key === evt.which;
        }
        constructor(quill, options) {
          super(quill, options);
          this.bindings = {};
          Object.keys(this.options.bindings).forEach((name) => {
            if (this.options.bindings[name]) {
              this.addBinding(this.options.bindings[name]);
            }
          });
          this.addBinding({
            key: "Enter",
            shiftKey: null
          }, this.handleEnter);
          this.addBinding({
            key: "Enter",
            metaKey: null,
            ctrlKey: null,
            altKey: null
          }, () => {
          });
          if (/Firefox/i.test(navigator.userAgent)) {
            this.addBinding({
              key: "Backspace"
            }, {
              collapsed: true
            }, this.handleBackspace);
            this.addBinding({
              key: "Delete"
            }, {
              collapsed: true
            }, this.handleDelete);
          } else {
            this.addBinding({
              key: "Backspace"
            }, {
              collapsed: true,
              prefix: /^.?$/
            }, this.handleBackspace);
            this.addBinding({
              key: "Delete"
            }, {
              collapsed: true,
              suffix: /^.?$/
            }, this.handleDelete);
          }
          this.addBinding({
            key: "Backspace"
          }, {
            collapsed: false
          }, this.handleDeleteRange);
          this.addBinding({
            key: "Delete"
          }, {
            collapsed: false
          }, this.handleDeleteRange);
          this.addBinding({
            key: "Backspace",
            altKey: null,
            ctrlKey: null,
            metaKey: null,
            shiftKey: null
          }, {
            collapsed: true,
            offset: 0
          }, this.handleBackspace);
          this.listen();
        }
        addBinding(keyBinding) {
          let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          let handler = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          const binding = normalize(keyBinding);
          if (binding == null) {
            debug5.warn("Attempted to add invalid keyboard binding", binding);
            return;
          }
          if (typeof context === "function") {
            context = {
              handler: context
            };
          }
          if (typeof handler === "function") {
            handler = {
              handler
            };
          }
          const keys3 = Array.isArray(binding.key) ? binding.key : [binding.key];
          keys3.forEach((key) => {
            const singleBinding = {
              ...binding,
              key,
              ...context,
              ...handler
            };
            this.bindings[singleBinding.key] = this.bindings[singleBinding.key] || [];
            this.bindings[singleBinding.key].push(singleBinding);
          });
        }
        listen() {
          this.quill.root.addEventListener("keydown", (evt) => {
            if (evt.defaultPrevented || evt.isComposing) return;
            const isComposing = evt.keyCode === 229 && (evt.key === "Enter" || evt.key === "Backspace");
            if (isComposing) return;
            const bindings = (this.bindings[evt.key] || []).concat(this.bindings[evt.which] || []);
            const matches = bindings.filter((binding) => _Keyboard.match(evt, binding));
            if (matches.length === 0) return;
            const blot = Quill.find(evt.target, true);
            if (blot && blot.scroll !== this.quill.scroll) return;
            const range = this.quill.getSelection();
            if (range == null || !this.quill.hasFocus()) return;
            const [line, offset] = this.quill.getLine(range.index);
            const [leafStart, offsetStart] = this.quill.getLeaf(range.index);
            const [leafEnd, offsetEnd] = range.length === 0 ? [leafStart, offsetStart] : this.quill.getLeaf(range.index + range.length);
            const prefixText = leafStart instanceof TextBlot$1 ? leafStart.value().slice(0, offsetStart) : "";
            const suffixText = leafEnd instanceof TextBlot$1 ? leafEnd.value().slice(offsetEnd) : "";
            const curContext = {
              collapsed: range.length === 0,
              // @ts-expect-error Fix me later
              empty: range.length === 0 && line.length() <= 1,
              format: this.quill.getFormat(range),
              line,
              offset,
              prefix: prefixText,
              suffix: suffixText,
              event: evt
            };
            const prevented = matches.some((binding) => {
              if (binding.collapsed != null && binding.collapsed !== curContext.collapsed) {
                return false;
              }
              if (binding.empty != null && binding.empty !== curContext.empty) {
                return false;
              }
              if (binding.offset != null && binding.offset !== curContext.offset) {
                return false;
              }
              if (Array.isArray(binding.format)) {
                if (binding.format.every((name) => curContext.format[name] == null)) {
                  return false;
                }
              } else if (typeof binding.format === "object") {
                if (!Object.keys(binding.format).every((name) => {
                  if (binding.format[name] === true) return curContext.format[name] != null;
                  if (binding.format[name] === false) return curContext.format[name] == null;
                  return isEqual_default(binding.format[name], curContext.format[name]);
                })) {
                  return false;
                }
              }
              if (binding.prefix != null && !binding.prefix.test(curContext.prefix)) {
                return false;
              }
              if (binding.suffix != null && !binding.suffix.test(curContext.suffix)) {
                return false;
              }
              return binding.handler.call(this, range, curContext, binding) !== true;
            });
            if (prevented) {
              evt.preventDefault();
            }
          });
        }
        handleBackspace(range, context) {
          const length2 = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(context.prefix) ? 2 : 1;
          if (range.index === 0 || this.quill.getLength() <= 1) return;
          let formats = {};
          const [line] = this.quill.getLine(range.index);
          let delta = new import_quill_delta5.default().retain(range.index - length2).delete(length2);
          if (context.offset === 0) {
            const [prev] = this.quill.getLine(range.index - 1);
            if (prev) {
              const isPrevLineEmpty = prev.statics.blotName === "block" && prev.length() <= 1;
              if (!isPrevLineEmpty) {
                const curFormats = line.formats();
                const prevFormats = this.quill.getFormat(range.index - 1, 1);
                formats = import_quill_delta5.AttributeMap.diff(curFormats, prevFormats) || {};
                if (Object.keys(formats).length > 0) {
                  const formatDelta = new import_quill_delta5.default().retain(range.index + line.length() - 2).retain(1, formats);
                  delta = delta.compose(formatDelta);
                }
              }
            }
          }
          this.quill.updateContents(delta, Quill.sources.USER);
          this.quill.focus();
        }
        handleDelete(range, context) {
          const length2 = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(context.suffix) ? 2 : 1;
          if (range.index >= this.quill.getLength() - length2) return;
          let formats = {};
          const [line] = this.quill.getLine(range.index);
          let delta = new import_quill_delta5.default().retain(range.index).delete(length2);
          if (context.offset >= line.length() - 1) {
            const [next] = this.quill.getLine(range.index + 1);
            if (next) {
              const curFormats = line.formats();
              const nextFormats = this.quill.getFormat(range.index, 1);
              formats = import_quill_delta5.AttributeMap.diff(curFormats, nextFormats) || {};
              if (Object.keys(formats).length > 0) {
                delta = delta.retain(next.length() - 1).retain(1, formats);
              }
            }
          }
          this.quill.updateContents(delta, Quill.sources.USER);
          this.quill.focus();
        }
        handleDeleteRange(range) {
          deleteRange({
            range,
            quill: this.quill
          });
          this.quill.focus();
        }
        handleEnter(range, context) {
          const lineFormats = Object.keys(context.format).reduce((formats, format) => {
            if (this.quill.scroll.query(format, Scope.BLOCK) && !Array.isArray(context.format[format])) {
              formats[format] = context.format[format];
            }
            return formats;
          }, {});
          const delta = new import_quill_delta5.default().retain(range.index).delete(range.length).insert("\n", lineFormats);
          this.quill.updateContents(delta, Quill.sources.USER);
          this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
          this.quill.focus();
        }
      };
      defaultOptions = {
        bindings: {
          bold: makeFormatHandler("bold"),
          italic: makeFormatHandler("italic"),
          underline: makeFormatHandler("underline"),
          indent: {
            // highlight tab or tab at beginning of list, indent or blockquote
            key: "Tab",
            format: ["blockquote", "indent", "list"],
            handler(range, context) {
              if (context.collapsed && context.offset !== 0) return true;
              this.quill.format("indent", "+1", Quill.sources.USER);
              return false;
            }
          },
          outdent: {
            key: "Tab",
            shiftKey: true,
            format: ["blockquote", "indent", "list"],
            // highlight tab or tab at beginning of list, indent or blockquote
            handler(range, context) {
              if (context.collapsed && context.offset !== 0) return true;
              this.quill.format("indent", "-1", Quill.sources.USER);
              return false;
            }
          },
          "outdent backspace": {
            key: "Backspace",
            collapsed: true,
            shiftKey: null,
            metaKey: null,
            ctrlKey: null,
            altKey: null,
            format: ["indent", "list"],
            offset: 0,
            handler(range, context) {
              if (context.format.indent != null) {
                this.quill.format("indent", "-1", Quill.sources.USER);
              } else if (context.format.list != null) {
                this.quill.format("list", false, Quill.sources.USER);
              }
            }
          },
          "indent code-block": makeCodeBlockHandler(true),
          "outdent code-block": makeCodeBlockHandler(false),
          "remove tab": {
            key: "Tab",
            shiftKey: true,
            collapsed: true,
            prefix: /\t$/,
            handler(range) {
              this.quill.deleteText(range.index - 1, 1, Quill.sources.USER);
            }
          },
          tab: {
            key: "Tab",
            handler(range, context) {
              if (context.format.table) return true;
              this.quill.history.cutoff();
              const delta = new import_quill_delta5.default().retain(range.index).delete(range.length).insert("	");
              this.quill.updateContents(delta, Quill.sources.USER);
              this.quill.history.cutoff();
              this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
              return false;
            }
          },
          "blockquote empty enter": {
            key: "Enter",
            collapsed: true,
            format: ["blockquote"],
            empty: true,
            handler() {
              this.quill.format("blockquote", false, Quill.sources.USER);
            }
          },
          "list empty enter": {
            key: "Enter",
            collapsed: true,
            format: ["list"],
            empty: true,
            handler(range, context) {
              const formats = {
                list: false
              };
              if (context.format.indent) {
                formats.indent = false;
              }
              this.quill.formatLine(range.index, range.length, formats, Quill.sources.USER);
            }
          },
          "checklist enter": {
            key: "Enter",
            collapsed: true,
            format: {
              list: "checked"
            },
            handler(range) {
              const [line, offset] = this.quill.getLine(range.index);
              const formats = {
                // @ts-expect-error Fix me later
                ...line.formats(),
                list: "checked"
              };
              const delta = new import_quill_delta5.default().retain(range.index).insert("\n", formats).retain(line.length() - offset - 1).retain(1, {
                list: "unchecked"
              });
              this.quill.updateContents(delta, Quill.sources.USER);
              this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
              this.quill.scrollSelectionIntoView();
            }
          },
          "header enter": {
            key: "Enter",
            collapsed: true,
            format: ["header"],
            suffix: /^$/,
            handler(range, context) {
              const [line, offset] = this.quill.getLine(range.index);
              const delta = new import_quill_delta5.default().retain(range.index).insert("\n", context.format).retain(line.length() - offset - 1).retain(1, {
                header: null
              });
              this.quill.updateContents(delta, Quill.sources.USER);
              this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
              this.quill.scrollSelectionIntoView();
            }
          },
          "table backspace": {
            key: "Backspace",
            format: ["table"],
            collapsed: true,
            offset: 0,
            handler() {
            }
          },
          "table delete": {
            key: "Delete",
            format: ["table"],
            collapsed: true,
            suffix: /^$/,
            handler() {
            }
          },
          "table enter": {
            key: "Enter",
            shiftKey: null,
            format: ["table"],
            handler(range) {
              const module2 = this.quill.getModule("table");
              if (module2) {
                const [table, row, cell, offset] = module2.getTable(range);
                const shift = tableSide(table, row, cell, offset);
                if (shift == null) return;
                let index = table.offset();
                if (shift < 0) {
                  const delta = new import_quill_delta5.default().retain(index).insert("\n");
                  this.quill.updateContents(delta, Quill.sources.USER);
                  this.quill.setSelection(range.index + 1, range.length, Quill.sources.SILENT);
                } else if (shift > 0) {
                  index += table.length();
                  const delta = new import_quill_delta5.default().retain(index).insert("\n");
                  this.quill.updateContents(delta, Quill.sources.USER);
                  this.quill.setSelection(index, Quill.sources.USER);
                }
              }
            }
          },
          "table tab": {
            key: "Tab",
            shiftKey: null,
            format: ["table"],
            handler(range, context) {
              const {
                event,
                line: cell
              } = context;
              const offset = cell.offset(this.quill.scroll);
              if (event.shiftKey) {
                this.quill.setSelection(offset - 1, Quill.sources.USER);
              } else {
                this.quill.setSelection(offset + cell.length(), Quill.sources.USER);
              }
            }
          },
          "list autofill": {
            key: " ",
            shiftKey: null,
            collapsed: true,
            format: {
              "code-block": false,
              blockquote: false,
              table: false
            },
            prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
            handler(range, context) {
              if (this.quill.scroll.query("list") == null) return true;
              const {
                length: length2
              } = context.prefix;
              const [line, offset] = this.quill.getLine(range.index);
              if (offset > length2) return true;
              let value;
              switch (context.prefix.trim()) {
                case "[]":
                case "[ ]":
                  value = "unchecked";
                  break;
                case "[x]":
                  value = "checked";
                  break;
                case "-":
                case "*":
                  value = "bullet";
                  break;
                default:
                  value = "ordered";
              }
              this.quill.insertText(range.index, " ", Quill.sources.USER);
              this.quill.history.cutoff();
              const delta = new import_quill_delta5.default().retain(range.index - offset).delete(length2 + 1).retain(line.length() - 2 - offset).retain(1, {
                list: value
              });
              this.quill.updateContents(delta, Quill.sources.USER);
              this.quill.history.cutoff();
              this.quill.setSelection(range.index - length2, Quill.sources.SILENT);
              return false;
            }
          },
          "code exit": {
            key: "Enter",
            collapsed: true,
            format: ["code-block"],
            prefix: /^$/,
            suffix: /^\s*$/,
            handler(range) {
              const [line, offset] = this.quill.getLine(range.index);
              let numLines = 2;
              let cur = line;
              while (cur != null && cur.length() <= 1 && cur.formats()["code-block"]) {
                cur = cur.prev;
                numLines -= 1;
                if (numLines <= 0) {
                  const delta = new import_quill_delta5.default().retain(range.index + line.length() - offset - 2).retain(1, {
                    "code-block": null
                  }).delete(1);
                  this.quill.updateContents(delta, Quill.sources.USER);
                  this.quill.setSelection(range.index - 1, Quill.sources.SILENT);
                  return false;
                }
              }
              return true;
            }
          },
          "embed left": makeEmbedArrowHandler("ArrowLeft", false),
          "embed left shift": makeEmbedArrowHandler("ArrowLeft", true),
          "embed right": makeEmbedArrowHandler("ArrowRight", false),
          "embed right shift": makeEmbedArrowHandler("ArrowRight", true),
          "table down": makeTableArrowHandler(false),
          "table up": makeTableArrowHandler(true)
        }
      };
      Keyboard.DEFAULTS = defaultOptions;
    }
  });

  // node_modules/quill/modules/normalizeExternalHTML/normalizers/googleDocs.js
  function normalize2(doc2) {
    if (doc2.querySelector('[id^="docs-internal-guid-"]')) {
      normalizeFontWeight(doc2);
      normalizeEmptyLines(doc2);
    }
  }
  var normalWeightRegexp, blockTagNames, isBlockElement, normalizeEmptyLines, normalizeFontWeight;
  var init_googleDocs = __esm({
    "node_modules/quill/modules/normalizeExternalHTML/normalizers/googleDocs.js"() {
      normalWeightRegexp = /font-weight:\s*normal/;
      blockTagNames = ["P", "OL", "UL"];
      isBlockElement = (element2) => {
        return element2 && blockTagNames.includes(element2.tagName);
      };
      normalizeEmptyLines = (doc2) => {
        Array.from(doc2.querySelectorAll("br")).filter((br) => isBlockElement(br.previousElementSibling) && isBlockElement(br.nextElementSibling)).forEach((br) => {
          br.parentNode?.removeChild(br);
        });
      };
      normalizeFontWeight = (doc2) => {
        Array.from(doc2.querySelectorAll('b[style*="font-weight"]')).filter((node) => node.getAttribute("style")?.match(normalWeightRegexp)).forEach((node) => {
          const fragment = doc2.createDocumentFragment();
          fragment.append(...node.childNodes);
          node.parentNode?.replaceChild(fragment, node);
        });
      };
    }
  });

  // node_modules/quill/modules/normalizeExternalHTML/normalizers/msWord.js
  function normalize3(doc2) {
    if (doc2.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word") {
      normalizeListItem(doc2);
    }
  }
  var ignoreRegexp, idRegexp, indentRegexp, parseListItem, normalizeListItem;
  var init_msWord = __esm({
    "node_modules/quill/modules/normalizeExternalHTML/normalizers/msWord.js"() {
      ignoreRegexp = /\bmso-list:[^;]*ignore/i;
      idRegexp = /\bmso-list:[^;]*\bl(\d+)/i;
      indentRegexp = /\bmso-list:[^;]*\blevel(\d+)/i;
      parseListItem = (element2, html) => {
        const style = element2.getAttribute("style");
        const idMatch = style?.match(idRegexp);
        if (!idMatch) {
          return null;
        }
        const id2 = Number(idMatch[1]);
        const indentMatch = style?.match(indentRegexp);
        const indent = indentMatch ? Number(indentMatch[1]) : 1;
        const typeRegexp = new RegExp(`@list l${id2}:level${indent}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i");
        const typeMatch = html.match(typeRegexp);
        const type = typeMatch && typeMatch[1] === "bullet" ? "bullet" : "ordered";
        return {
          id: id2,
          indent,
          type,
          element: element2
        };
      };
      normalizeListItem = (doc2) => {
        const msoList = Array.from(doc2.querySelectorAll("[style*=mso-list]"));
        const ignored = [];
        const others = [];
        msoList.forEach((node) => {
          const shouldIgnore = (node.getAttribute("style") || "").match(ignoreRegexp);
          if (shouldIgnore) {
            ignored.push(node);
          } else {
            others.push(node);
          }
        });
        ignored.forEach((node) => node.parentNode?.removeChild(node));
        const html = doc2.documentElement.innerHTML;
        const listItems = others.map((element2) => parseListItem(element2, html)).filter((parsed) => parsed);
        while (listItems.length) {
          const childListItems = [];
          let current = listItems.shift();
          while (current) {
            childListItems.push(current);
            current = listItems.length && listItems[0]?.element === current.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
            listItems[0].id === current.id ? listItems.shift() : null;
          }
          const ul = document.createElement("ul");
          childListItems.forEach((listItem) => {
            const li = document.createElement("li");
            li.setAttribute("data-list", listItem.type);
            if (listItem.indent > 1) {
              li.setAttribute("class", `ql-indent-${listItem.indent - 1}`);
            }
            li.innerHTML = listItem.element.innerHTML;
            ul.appendChild(li);
          });
          const element2 = childListItems[0]?.element;
          const {
            parentNode
          } = element2 ?? {};
          if (element2) {
            parentNode?.replaceChild(ul, element2);
          }
          childListItems.slice(1).forEach((_ref) => {
            let {
              element: e
            } = _ref;
            parentNode?.removeChild(e);
          });
        }
      };
    }
  });

  // node_modules/quill/modules/normalizeExternalHTML/index.js
  var NORMALIZERS, normalizeExternalHTML, normalizeExternalHTML_default;
  var init_normalizeExternalHTML = __esm({
    "node_modules/quill/modules/normalizeExternalHTML/index.js"() {
      init_googleDocs();
      init_msWord();
      NORMALIZERS = [normalize3, normalize2];
      normalizeExternalHTML = (doc2) => {
        if (doc2.documentElement) {
          NORMALIZERS.forEach((normalize4) => {
            normalize4(doc2);
          });
        }
      };
      normalizeExternalHTML_default = normalizeExternalHTML;
    }
  });

  // node_modules/quill/modules/clipboard.js
  function applyFormat(delta, format, value, scroll) {
    if (!scroll.query(format)) {
      return delta;
    }
    return delta.reduce((newDelta, op) => {
      if (!op.insert) return newDelta;
      if (op.attributes && op.attributes[format]) {
        return newDelta.push(op);
      }
      const formats = value ? {
        [format]: value
      } : {};
      return newDelta.insert(op.insert, {
        ...formats,
        ...op.attributes
      });
    }, new import_quill_delta6.default());
  }
  function deltaEndsWith(delta, text2) {
    let endText = "";
    for (let i = delta.ops.length - 1; i >= 0 && endText.length < text2.length; --i) {
      const op = delta.ops[i];
      if (typeof op.insert !== "string") break;
      endText = op.insert + endText;
    }
    return endText.slice(-1 * text2.length) === text2;
  }
  function isLine2(node, scroll) {
    if (!(node instanceof Element)) return false;
    const match3 = scroll.query(node);
    if (match3 && match3.prototype instanceof EmbedBlot$1) return false;
    return ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(node.tagName.toLowerCase());
  }
  function isBetweenInlineElements(node, scroll) {
    return node.previousElementSibling && node.nextElementSibling && !isLine2(node.previousElementSibling, scroll) && !isLine2(node.nextElementSibling, scroll);
  }
  function isPre(node) {
    if (node == null) return false;
    if (!preNodes.has(node)) {
      if (node.tagName === "PRE") {
        preNodes.set(node, true);
      } else {
        preNodes.set(node, isPre(node.parentNode));
      }
    }
    return preNodes.get(node);
  }
  function traverse(scroll, node, elementMatchers, textMatchers, nodeMatches) {
    if (node.nodeType === node.TEXT_NODE) {
      return textMatchers.reduce((delta, matcher) => {
        return matcher(node, delta, scroll);
      }, new import_quill_delta6.default());
    }
    if (node.nodeType === node.ELEMENT_NODE) {
      return Array.from(node.childNodes || []).reduce((delta, childNode) => {
        let childrenDelta = traverse(scroll, childNode, elementMatchers, textMatchers, nodeMatches);
        if (childNode.nodeType === node.ELEMENT_NODE) {
          childrenDelta = elementMatchers.reduce((reducedDelta, matcher) => {
            return matcher(childNode, reducedDelta, scroll);
          }, childrenDelta);
          childrenDelta = (nodeMatches.get(childNode) || []).reduce((reducedDelta, matcher) => {
            return matcher(childNode, reducedDelta, scroll);
          }, childrenDelta);
        }
        return delta.concat(childrenDelta);
      }, new import_quill_delta6.default());
    }
    return new import_quill_delta6.default();
  }
  function createMatchAlias(format) {
    return (_node, delta, scroll) => {
      return applyFormat(delta, format, true, scroll);
    };
  }
  function matchAttributor(node, delta, scroll) {
    const attributes = Attributor.keys(node);
    const classes = ClassAttributor$1.keys(node);
    const styles = StyleAttributor$1.keys(node);
    const formats = {};
    attributes.concat(classes).concat(styles).forEach((name) => {
      let attr = scroll.query(name, Scope.ATTRIBUTE);
      if (attr != null) {
        formats[attr.attrName] = attr.value(node);
        if (formats[attr.attrName]) return;
      }
      attr = ATTRIBUTE_ATTRIBUTORS[name];
      if (attr != null && (attr.attrName === name || attr.keyName === name)) {
        formats[attr.attrName] = attr.value(node) || void 0;
      }
      attr = STYLE_ATTRIBUTORS[name];
      if (attr != null && (attr.attrName === name || attr.keyName === name)) {
        attr = STYLE_ATTRIBUTORS[name];
        formats[attr.attrName] = attr.value(node) || void 0;
      }
    });
    return Object.entries(formats).reduce((newDelta, _ref4) => {
      let [name, value] = _ref4;
      return applyFormat(newDelta, name, value, scroll);
    }, delta);
  }
  function matchBlot(node, delta, scroll) {
    const match3 = scroll.query(node);
    if (match3 == null) return delta;
    if (match3.prototype instanceof EmbedBlot$1) {
      const embed = {};
      const value = match3.value(node);
      if (value != null) {
        embed[match3.blotName] = value;
        return new import_quill_delta6.default().insert(embed, match3.formats(node, scroll));
      }
    } else {
      if (match3.prototype instanceof BlockBlot$1 && !deltaEndsWith(delta, "\n")) {
        delta.insert("\n");
      }
      if ("blotName" in match3 && "formats" in match3 && typeof match3.formats === "function") {
        return applyFormat(delta, match3.blotName, match3.formats(node, scroll), scroll);
      }
    }
    return delta;
  }
  function matchBreak(node, delta) {
    if (!deltaEndsWith(delta, "\n")) {
      delta.insert("\n");
    }
    return delta;
  }
  function matchCodeBlock(node, delta, scroll) {
    const match3 = scroll.query("code-block");
    const language = match3 && "formats" in match3 && typeof match3.formats === "function" ? match3.formats(node, scroll) : true;
    return applyFormat(delta, "code-block", language, scroll);
  }
  function matchIgnore() {
    return new import_quill_delta6.default();
  }
  function matchIndent(node, delta, scroll) {
    const match3 = scroll.query(node);
    if (match3 == null || // @ts-expect-error
    match3.blotName !== "list" || !deltaEndsWith(delta, "\n")) {
      return delta;
    }
    let indent = -1;
    let parent = node.parentNode;
    while (parent != null) {
      if (["OL", "UL"].includes(parent.tagName)) {
        indent += 1;
      }
      parent = parent.parentNode;
    }
    if (indent <= 0) return delta;
    return delta.reduce((composed, op) => {
      if (!op.insert) return composed;
      if (op.attributes && typeof op.attributes.indent === "number") {
        return composed.push(op);
      }
      return composed.insert(op.insert, {
        indent,
        ...op.attributes || {}
      });
    }, new import_quill_delta6.default());
  }
  function matchList(node, delta, scroll) {
    const element2 = node;
    let list = element2.tagName === "OL" ? "ordered" : "bullet";
    const checkedAttr = element2.getAttribute("data-checked");
    if (checkedAttr) {
      list = checkedAttr === "true" ? "checked" : "unchecked";
    }
    return applyFormat(delta, "list", list, scroll);
  }
  function matchNewline(node, delta, scroll) {
    if (!deltaEndsWith(delta, "\n")) {
      if (isLine2(node, scroll) && (node.childNodes.length > 0 || node instanceof HTMLParagraphElement)) {
        return delta.insert("\n");
      }
      if (delta.length() > 0 && node.nextSibling) {
        let nextSibling = node.nextSibling;
        while (nextSibling != null) {
          if (isLine2(nextSibling, scroll)) {
            return delta.insert("\n");
          }
          const match3 = scroll.query(nextSibling);
          if (match3 && match3.prototype instanceof BlockEmbed) {
            return delta.insert("\n");
          }
          nextSibling = nextSibling.firstChild;
        }
      }
    }
    return delta;
  }
  function matchStyles(node, delta, scroll) {
    const formats = {};
    const style = node.style || {};
    if (style.fontStyle === "italic") {
      formats.italic = true;
    }
    if (style.textDecoration === "underline") {
      formats.underline = true;
    }
    if (style.textDecoration === "line-through") {
      formats.strike = true;
    }
    if (style.fontWeight?.startsWith("bold") || // @ts-expect-error Fix me later
    parseInt(style.fontWeight, 10) >= 700) {
      formats.bold = true;
    }
    delta = Object.entries(formats).reduce((newDelta, _ref5) => {
      let [name, value] = _ref5;
      return applyFormat(newDelta, name, value, scroll);
    }, delta);
    if (parseFloat(style.textIndent || 0) > 0) {
      return new import_quill_delta6.default().insert("	").concat(delta);
    }
    return delta;
  }
  function matchTable(node, delta, scroll) {
    const table = node.parentElement?.tagName === "TABLE" ? node.parentElement : node.parentElement?.parentElement;
    if (table != null) {
      const rows = Array.from(table.querySelectorAll("tr"));
      const row = rows.indexOf(node) + 1;
      return applyFormat(delta, "table", row, scroll);
    }
    return delta;
  }
  function matchText(node, delta, scroll) {
    let text2 = node.data;
    if (node.parentElement?.tagName === "O:P") {
      return delta.insert(text2.trim());
    }
    if (!isPre(node)) {
      if (text2.trim().length === 0 && text2.includes("\n") && !isBetweenInlineElements(node, scroll)) {
        return delta;
      }
      const replacer = (collapse, match3) => {
        const replaced = match3.replace(/[^\u00a0]/g, "");
        return replaced.length < 1 && collapse ? " " : replaced;
      };
      text2 = text2.replace(/\r\n/g, " ").replace(/\n/g, " ");
      text2 = text2.replace(/\s\s+/g, replacer.bind(replacer, true));
      if (node.previousSibling == null && node.parentElement != null && isLine2(node.parentElement, scroll) || node.previousSibling instanceof Element && isLine2(node.previousSibling, scroll)) {
        text2 = text2.replace(/^\s+/, replacer.bind(replacer, false));
      }
      if (node.nextSibling == null && node.parentElement != null && isLine2(node.parentElement, scroll) || node.nextSibling instanceof Element && isLine2(node.nextSibling, scroll)) {
        text2 = text2.replace(/\s+$/, replacer.bind(replacer, false));
      }
    }
    return delta.insert(text2);
  }
  var import_quill_delta6, debug6, CLIPBOARD_CONFIG, ATTRIBUTE_ATTRIBUTORS, STYLE_ATTRIBUTORS, Clipboard, preNodes;
  var init_clipboard = __esm({
    "node_modules/quill/modules/clipboard.js"() {
      init_parchment();
      import_quill_delta6 = __toESM(require_Delta(), 1);
      init_block();
      init_logger();
      init_module();
      init_quill();
      init_align();
      init_background();
      init_code();
      init_color();
      init_direction();
      init_font();
      init_size();
      init_keyboard();
      init_normalizeExternalHTML();
      debug6 = logger_default("quill:clipboard");
      CLIPBOARD_CONFIG = [[Node.TEXT_NODE, matchText], [Node.TEXT_NODE, matchNewline], ["br", matchBreak], [Node.ELEMENT_NODE, matchNewline], [Node.ELEMENT_NODE, matchBlot], [Node.ELEMENT_NODE, matchAttributor], [Node.ELEMENT_NODE, matchStyles], ["li", matchIndent], ["ol, ul", matchList], ["pre", matchCodeBlock], ["tr", matchTable], ["b", createMatchAlias("bold")], ["i", createMatchAlias("italic")], ["strike", createMatchAlias("strike")], ["style", matchIgnore]];
      ATTRIBUTE_ATTRIBUTORS = [AlignAttribute, DirectionAttribute].reduce((memo, attr) => {
        memo[attr.keyName] = attr;
        return memo;
      }, {});
      STYLE_ATTRIBUTORS = [AlignStyle, BackgroundStyle, ColorStyle, DirectionStyle, FontStyle, SizeStyle].reduce((memo, attr) => {
        memo[attr.keyName] = attr;
        return memo;
      }, {});
      Clipboard = class extends module_default {
        static DEFAULTS = {
          matchers: []
        };
        constructor(quill, options) {
          super(quill, options);
          this.quill.root.addEventListener("copy", (e) => this.onCaptureCopy(e, false));
          this.quill.root.addEventListener("cut", (e) => this.onCaptureCopy(e, true));
          this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this));
          this.matchers = [];
          CLIPBOARD_CONFIG.concat(this.options.matchers ?? []).forEach((_ref) => {
            let [selector, matcher] = _ref;
            this.addMatcher(selector, matcher);
          });
        }
        addMatcher(selector, matcher) {
          this.matchers.push([selector, matcher]);
        }
        convert(_ref2) {
          let {
            html,
            text: text2
          } = _ref2;
          let formats = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          if (formats[CodeBlock.blotName]) {
            return new import_quill_delta6.default().insert(text2 || "", {
              [CodeBlock.blotName]: formats[CodeBlock.blotName]
            });
          }
          if (!html) {
            return new import_quill_delta6.default().insert(text2 || "", formats);
          }
          const delta = this.convertHTML(html);
          if (deltaEndsWith(delta, "\n") && (delta.ops[delta.ops.length - 1].attributes == null || formats.table)) {
            return delta.compose(new import_quill_delta6.default().retain(delta.length() - 1).delete(1));
          }
          return delta;
        }
        normalizeHTML(doc2) {
          normalizeExternalHTML_default(doc2);
        }
        convertHTML(html) {
          const doc2 = new DOMParser().parseFromString(html, "text/html");
          this.normalizeHTML(doc2);
          const container = doc2.body;
          const nodeMatches = /* @__PURE__ */ new WeakMap();
          const [elementMatchers, textMatchers] = this.prepareMatching(container, nodeMatches);
          return traverse(this.quill.scroll, container, elementMatchers, textMatchers, nodeMatches);
        }
        dangerouslyPasteHTML(index, html) {
          let source = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Quill.sources.API;
          if (typeof index === "string") {
            const delta = this.convert({
              html: index,
              text: ""
            });
            this.quill.setContents(delta, html);
            this.quill.setSelection(0, Quill.sources.SILENT);
          } else {
            const paste = this.convert({
              html,
              text: ""
            });
            this.quill.updateContents(new import_quill_delta6.default().retain(index).concat(paste), source);
            this.quill.setSelection(index + paste.length(), Quill.sources.SILENT);
          }
        }
        onCaptureCopy(e) {
          let isCut = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          if (e.defaultPrevented) return;
          e.preventDefault();
          const [range] = this.quill.selection.getRange();
          if (range == null) return;
          const {
            html,
            text: text2
          } = this.onCopy(range, isCut);
          e.clipboardData?.setData("text/plain", text2);
          e.clipboardData?.setData("text/html", html);
          if (isCut) {
            deleteRange({
              range,
              quill: this.quill
            });
          }
        }
        /*
         * https://www.iana.org/assignments/media-types/text/uri-list
         */
        normalizeURIList(urlList) {
          return urlList.split(/\r?\n/).filter((url) => url[0] !== "#").join("\n");
        }
        onCapturePaste(e) {
          if (e.defaultPrevented || !this.quill.isEnabled()) return;
          e.preventDefault();
          const range = this.quill.getSelection(true);
          if (range == null) return;
          const html = e.clipboardData?.getData("text/html");
          let text2 = e.clipboardData?.getData("text/plain");
          if (!html && !text2) {
            const urlList = e.clipboardData?.getData("text/uri-list");
            if (urlList) {
              text2 = this.normalizeURIList(urlList);
            }
          }
          const files = Array.from(e.clipboardData?.files || []);
          if (!html && files.length > 0) {
            this.quill.uploader.upload(range, files);
            return;
          }
          if (html && files.length > 0) {
            const doc2 = new DOMParser().parseFromString(html, "text/html");
            if (doc2.body.childElementCount === 1 && doc2.body.firstElementChild?.tagName === "IMG") {
              this.quill.uploader.upload(range, files);
              return;
            }
          }
          this.onPaste(range, {
            html,
            text: text2
          });
        }
        onCopy(range) {
          const text2 = this.quill.getText(range);
          const html = this.quill.getSemanticHTML(range);
          return {
            html,
            text: text2
          };
        }
        onPaste(range, _ref3) {
          let {
            text: text2,
            html
          } = _ref3;
          const formats = this.quill.getFormat(range.index);
          const pastedDelta = this.convert({
            text: text2,
            html
          }, formats);
          debug6.log("onPaste", pastedDelta, {
            text: text2,
            html
          });
          const delta = new import_quill_delta6.default().retain(range.index).delete(range.length).concat(pastedDelta);
          this.quill.updateContents(delta, Quill.sources.USER);
          this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT);
          this.quill.scrollSelectionIntoView();
        }
        prepareMatching(container, nodeMatches) {
          const elementMatchers = [];
          const textMatchers = [];
          this.matchers.forEach((pair) => {
            const [selector, matcher] = pair;
            switch (selector) {
              case Node.TEXT_NODE:
                textMatchers.push(matcher);
                break;
              case Node.ELEMENT_NODE:
                elementMatchers.push(matcher);
                break;
              default:
                Array.from(container.querySelectorAll(selector)).forEach((node) => {
                  if (nodeMatches.has(node)) {
                    const matches = nodeMatches.get(node);
                    matches?.push(matcher);
                  } else {
                    nodeMatches.set(node, [matcher]);
                  }
                });
                break;
            }
          });
          return [elementMatchers, textMatchers];
        }
      };
      preNodes = /* @__PURE__ */ new WeakMap();
    }
  });

  // node_modules/quill/modules/history.js
  function transformStack(stack, delta) {
    let remoteDelta = delta;
    for (let i = stack.length - 1; i >= 0; i -= 1) {
      const oldItem = stack[i];
      stack[i] = {
        delta: remoteDelta.transform(oldItem.delta, true),
        range: oldItem.range && transformRange(oldItem.range, remoteDelta)
      };
      remoteDelta = oldItem.delta.transform(remoteDelta);
      if (stack[i].delta.length() === 0) {
        stack.splice(i, 1);
      }
    }
  }
  function endsWithNewlineChange(scroll, delta) {
    const lastOp = delta.ops[delta.ops.length - 1];
    if (lastOp == null) return false;
    if (lastOp.insert != null) {
      return typeof lastOp.insert === "string" && lastOp.insert.endsWith("\n");
    }
    if (lastOp.attributes != null) {
      return Object.keys(lastOp.attributes).some((attr) => {
        return scroll.query(attr, Scope.BLOCK) != null;
      });
    }
    return false;
  }
  function getLastChangeIndex(scroll, delta) {
    const deleteLength = delta.reduce((length2, op) => {
      return length2 + (op.delete || 0);
    }, 0);
    let changeIndex = delta.length() - deleteLength;
    if (endsWithNewlineChange(scroll, delta)) {
      changeIndex -= 1;
    }
    return changeIndex;
  }
  function transformRange(range, delta) {
    if (!range) return range;
    const start = delta.transformPosition(range.index);
    const end = delta.transformPosition(range.index + range.length);
    return {
      index: start,
      length: end - start
    };
  }
  var History;
  var init_history = __esm({
    "node_modules/quill/modules/history.js"() {
      init_parchment();
      init_module();
      init_quill();
      History = class extends module_default {
        static DEFAULTS = {
          delay: 1e3,
          maxStack: 100,
          userOnly: false
        };
        lastRecorded = 0;
        ignoreChange = false;
        stack = {
          undo: [],
          redo: []
        };
        currentRange = null;
        constructor(quill, options) {
          super(quill, options);
          this.quill.on(Quill.events.EDITOR_CHANGE, (eventName, value, oldValue, source) => {
            if (eventName === Quill.events.SELECTION_CHANGE) {
              if (value && source !== Quill.sources.SILENT) {
                this.currentRange = value;
              }
            } else if (eventName === Quill.events.TEXT_CHANGE) {
              if (!this.ignoreChange) {
                if (!this.options.userOnly || source === Quill.sources.USER) {
                  this.record(value, oldValue);
                } else {
                  this.transform(value);
                }
              }
              this.currentRange = transformRange(this.currentRange, value);
            }
          });
          this.quill.keyboard.addBinding({
            key: "z",
            shortKey: true
          }, this.undo.bind(this));
          this.quill.keyboard.addBinding({
            key: ["z", "Z"],
            shortKey: true,
            shiftKey: true
          }, this.redo.bind(this));
          if (/Win/i.test(navigator.platform)) {
            this.quill.keyboard.addBinding({
              key: "y",
              shortKey: true
            }, this.redo.bind(this));
          }
          this.quill.root.addEventListener("beforeinput", (event) => {
            if (event.inputType === "historyUndo") {
              this.undo();
              event.preventDefault();
            } else if (event.inputType === "historyRedo") {
              this.redo();
              event.preventDefault();
            }
          });
        }
        change(source, dest) {
          if (this.stack[source].length === 0) return;
          const item = this.stack[source].pop();
          if (!item) return;
          const base = this.quill.getContents();
          const inverseDelta = item.delta.invert(base);
          this.stack[dest].push({
            delta: inverseDelta,
            range: transformRange(item.range, inverseDelta)
          });
          this.lastRecorded = 0;
          this.ignoreChange = true;
          this.quill.updateContents(item.delta, Quill.sources.USER);
          this.ignoreChange = false;
          this.restoreSelection(item);
        }
        clear() {
          this.stack = {
            undo: [],
            redo: []
          };
        }
        cutoff() {
          this.lastRecorded = 0;
        }
        record(changeDelta, oldDelta) {
          if (changeDelta.ops.length === 0) return;
          this.stack.redo = [];
          let undoDelta = changeDelta.invert(oldDelta);
          let undoRange = this.currentRange;
          const timestamp = Date.now();
          if (
            // @ts-expect-error Fix me later
            this.lastRecorded + this.options.delay > timestamp && this.stack.undo.length > 0
          ) {
            const item = this.stack.undo.pop();
            if (item) {
              undoDelta = undoDelta.compose(item.delta);
              undoRange = item.range;
            }
          } else {
            this.lastRecorded = timestamp;
          }
          if (undoDelta.length() === 0) return;
          this.stack.undo.push({
            delta: undoDelta,
            range: undoRange
          });
          if (this.stack.undo.length > this.options.maxStack) {
            this.stack.undo.shift();
          }
        }
        redo() {
          this.change("redo", "undo");
        }
        transform(delta) {
          transformStack(this.stack.undo, delta);
          transformStack(this.stack.redo, delta);
        }
        undo() {
          this.change("undo", "redo");
        }
        restoreSelection(stackItem) {
          if (stackItem.range) {
            this.quill.setSelection(stackItem.range, Quill.sources.USER);
          } else {
            const index = getLastChangeIndex(this.quill.scroll, stackItem.delta);
            this.quill.setSelection(index, Quill.sources.USER);
          }
        }
      };
    }
  });

  // node_modules/quill/modules/uploader.js
  var import_quill_delta7, Uploader, uploader_default;
  var init_uploader = __esm({
    "node_modules/quill/modules/uploader.js"() {
      import_quill_delta7 = __toESM(require_Delta(), 1);
      init_emitter();
      init_module();
      Uploader = class extends module_default {
        constructor(quill, options) {
          super(quill, options);
          quill.root.addEventListener("drop", (e) => {
            e.preventDefault();
            let native = null;
            if (document.caretRangeFromPoint) {
              native = document.caretRangeFromPoint(e.clientX, e.clientY);
            } else if (document.caretPositionFromPoint) {
              const position = document.caretPositionFromPoint(e.clientX, e.clientY);
              native = document.createRange();
              native.setStart(position.offsetNode, position.offset);
              native.setEnd(position.offsetNode, position.offset);
            }
            const normalized = native && quill.selection.normalizeNative(native);
            if (normalized) {
              const range = quill.selection.normalizedToRange(normalized);
              if (e.dataTransfer?.files) {
                this.upload(range, e.dataTransfer.files);
              }
            }
          });
        }
        upload(range, files) {
          const uploads = [];
          Array.from(files).forEach((file) => {
            if (file && this.options.mimetypes?.includes(file.type)) {
              uploads.push(file);
            }
          });
          if (uploads.length > 0) {
            this.options.handler.call(this, range, uploads);
          }
        }
      };
      Uploader.DEFAULTS = {
        mimetypes: ["image/png", "image/jpeg"],
        handler(range, files) {
          if (!this.quill.scroll.query("image")) {
            return;
          }
          const promises = files.map((file) => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve(reader.result);
              };
              reader.readAsDataURL(file);
            });
          });
          Promise.all(promises).then((images) => {
            const update = images.reduce((delta, image) => {
              return delta.insert({
                image
              });
            }, new import_quill_delta7.default().retain(range.index).delete(range.length));
            this.quill.updateContents(update, emitter_default.sources.USER);
            this.quill.setSelection(range.index + images.length, emitter_default.sources.SILENT);
          });
        }
      };
      uploader_default = Uploader;
    }
  });

  // node_modules/quill/modules/input.js
  function getPlainTextFromInputEvent(event) {
    if (typeof event.data === "string") {
      return event.data;
    }
    if (event.dataTransfer?.types.includes("text/plain")) {
      return event.dataTransfer.getData("text/plain");
    }
    return null;
  }
  var import_quill_delta8, INSERT_TYPES, Input, input_default;
  var init_input = __esm({
    "node_modules/quill/modules/input.js"() {
      import_quill_delta8 = __toESM(require_Delta(), 1);
      init_module();
      init_quill();
      init_keyboard();
      INSERT_TYPES = ["insertText", "insertReplacementText"];
      Input = class extends module_default {
        constructor(quill, options) {
          super(quill, options);
          quill.root.addEventListener("beforeinput", (event) => {
            this.handleBeforeInput(event);
          });
          if (!/Android/i.test(navigator.userAgent)) {
            quill.on(Quill.events.COMPOSITION_BEFORE_START, () => {
              this.handleCompositionStart();
            });
          }
        }
        deleteRange(range) {
          deleteRange({
            range,
            quill: this.quill
          });
        }
        replaceText(range) {
          let text2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
          if (range.length === 0) return false;
          if (text2) {
            const formats = this.quill.getFormat(range.index, 1);
            this.deleteRange(range);
            this.quill.updateContents(new import_quill_delta8.default().retain(range.index).insert(text2, formats), Quill.sources.USER);
          } else {
            this.deleteRange(range);
          }
          this.quill.setSelection(range.index + text2.length, 0, Quill.sources.SILENT);
          return true;
        }
        handleBeforeInput(event) {
          if (this.quill.composition.isComposing || event.defaultPrevented || !INSERT_TYPES.includes(event.inputType)) {
            return;
          }
          const staticRange = event.getTargetRanges ? event.getTargetRanges()[0] : null;
          if (!staticRange || staticRange.collapsed === true) {
            return;
          }
          const text2 = getPlainTextFromInputEvent(event);
          if (text2 == null) {
            return;
          }
          const normalized = this.quill.selection.normalizeNative(staticRange);
          const range = normalized ? this.quill.selection.normalizedToRange(normalized) : null;
          if (range && this.replaceText(range, text2)) {
            event.preventDefault();
          }
        }
        handleCompositionStart() {
          const range = this.quill.getSelection();
          if (range) {
            this.replaceText(range);
          }
        }
      };
      input_default = Input;
    }
  });

  // node_modules/quill/modules/uiNode.js
  var isMac2, TTL_FOR_VALID_SELECTION_CHANGE, canMoveCaretBeforeUINode, UINode, uiNode_default;
  var init_uiNode = __esm({
    "node_modules/quill/modules/uiNode.js"() {
      init_parchment();
      init_module();
      init_quill();
      isMac2 = /Mac/i.test(navigator.platform);
      TTL_FOR_VALID_SELECTION_CHANGE = 100;
      canMoveCaretBeforeUINode = (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
        event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Home") {
          return true;
        }
        if (isMac2 && event.key === "a" && event.ctrlKey === true) {
          return true;
        }
        return false;
      };
      UINode = class extends module_default {
        isListening = false;
        selectionChangeDeadline = 0;
        constructor(quill, options) {
          super(quill, options);
          this.handleArrowKeys();
          this.handleNavigationShortcuts();
        }
        handleArrowKeys() {
          this.quill.keyboard.addBinding({
            key: ["ArrowLeft", "ArrowRight"],
            offset: 0,
            shiftKey: null,
            handler(range, _ref) {
              let {
                line,
                event
              } = _ref;
              if (!(line instanceof ParentBlot$1) || !line.uiNode) {
                return true;
              }
              const isRTL = getComputedStyle(line.domNode)["direction"] === "rtl";
              if (isRTL && event.key !== "ArrowRight" || !isRTL && event.key !== "ArrowLeft") {
                return true;
              }
              this.quill.setSelection(range.index - 1, range.length + (event.shiftKey ? 1 : 0), Quill.sources.USER);
              return false;
            }
          });
        }
        handleNavigationShortcuts() {
          this.quill.root.addEventListener("keydown", (event) => {
            if (!event.defaultPrevented && canMoveCaretBeforeUINode(event)) {
              this.ensureListeningToSelectionChange();
            }
          });
        }
        /**
         * We only listen to the `selectionchange` event when
         * there is an intention of moving the caret to the beginning using shortcuts.
         * This is primarily implemented to prevent infinite loops, as we are changing
         * the selection within the handler of a `selectionchange` event.
         */
        ensureListeningToSelectionChange() {
          this.selectionChangeDeadline = Date.now() + TTL_FOR_VALID_SELECTION_CHANGE;
          if (this.isListening) return;
          this.isListening = true;
          const listener = () => {
            this.isListening = false;
            if (Date.now() <= this.selectionChangeDeadline) {
              this.handleSelectionChange();
            }
          };
          document.addEventListener("selectionchange", listener, {
            once: true
          });
        }
        handleSelectionChange() {
          const selection = document.getSelection();
          if (!selection) return;
          const range = selection.getRangeAt(0);
          if (range.collapsed !== true || range.startOffset !== 0) return;
          const line = this.quill.scroll.find(range.startContainer);
          if (!(line instanceof ParentBlot$1) || !line.uiNode) return;
          const newRange = document.createRange();
          newRange.setStartAfter(line.uiNode);
          newRange.setEndAfter(line.uiNode);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      };
      uiNode_default = UINode;
    }
  });

  // node_modules/quill/core.js
  var import_quill_delta9, core_default;
  var init_core = __esm({
    "node_modules/quill/core.js"() {
      init_quill();
      init_block();
      init_break();
      init_container();
      init_cursor();
      init_embed();
      init_inline();
      init_scroll();
      init_text();
      init_clipboard();
      init_history();
      init_keyboard();
      init_uploader();
      import_quill_delta9 = __toESM(require_Delta(), 1);
      init_input();
      init_uiNode();
      init_module();
      Quill.register({
        "blots/block": Block,
        "blots/block/embed": BlockEmbed,
        "blots/break": break_default,
        "blots/container": container_default,
        "blots/cursor": cursor_default,
        "blots/embed": embed_default,
        "blots/inline": inline_default,
        "blots/scroll": scroll_default,
        "blots/text": Text2,
        "modules/clipboard": Clipboard,
        "modules/history": History,
        "modules/keyboard": Keyboard,
        "modules/uploader": uploader_default,
        "modules/input": input_default,
        "modules/uiNode": uiNode_default
      });
      core_default = Quill;
    }
  });

  // node_modules/quill/formats/indent.js
  var IndentAttributor, IndentClass, indent_default;
  var init_indent = __esm({
    "node_modules/quill/formats/indent.js"() {
      init_parchment();
      IndentAttributor = class extends ClassAttributor$1 {
        add(node, value) {
          let normalizedValue = 0;
          if (value === "+1" || value === "-1") {
            const indent = this.value(node) || 0;
            normalizedValue = value === "+1" ? indent + 1 : indent - 1;
          } else if (typeof value === "number") {
            normalizedValue = value;
          }
          if (normalizedValue === 0) {
            this.remove(node);
            return true;
          }
          return super.add(node, normalizedValue.toString());
        }
        canAdd(node, value) {
          return super.canAdd(node, value) || super.canAdd(node, parseInt(value, 10));
        }
        value(node) {
          return parseInt(super.value(node), 10) || void 0;
        }
      };
      IndentClass = new IndentAttributor("indent", "ql-indent", {
        scope: Scope.BLOCK,
        // @ts-expect-error
        whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
      });
      indent_default = IndentClass;
    }
  });

  // node_modules/quill/formats/blockquote.js
  var Blockquote, blockquote_default;
  var init_blockquote = __esm({
    "node_modules/quill/formats/blockquote.js"() {
      init_block();
      Blockquote = class extends Block {
        static blotName = "blockquote";
        static tagName = "blockquote";
      };
      blockquote_default = Blockquote;
    }
  });

  // node_modules/quill/formats/header.js
  var Header, header_default;
  var init_header = __esm({
    "node_modules/quill/formats/header.js"() {
      init_block();
      Header = class extends Block {
        static blotName = "header";
        static tagName = ["H1", "H2", "H3", "H4", "H5", "H6"];
        static formats(domNode) {
          return this.tagName.indexOf(domNode.tagName) + 1;
        }
      };
      header_default = Header;
    }
  });

  // node_modules/quill/formats/list.js
  var ListContainer, ListItem;
  var init_list = __esm({
    "node_modules/quill/formats/list.js"() {
      init_block();
      init_container();
      init_quill();
      ListContainer = class extends container_default {
      };
      ListContainer.blotName = "list-container";
      ListContainer.tagName = "OL";
      ListItem = class extends Block {
        static create(value) {
          const node = super.create();
          node.setAttribute("data-list", value);
          return node;
        }
        static formats(domNode) {
          return domNode.getAttribute("data-list") || void 0;
        }
        static register() {
          Quill.register(ListContainer);
        }
        constructor(scroll, domNode) {
          super(scroll, domNode);
          const ui = domNode.ownerDocument.createElement("span");
          const listEventHandler = (e) => {
            if (!scroll.isEnabled()) return;
            const format = this.statics.formats(domNode, scroll);
            if (format === "checked") {
              this.format("list", "unchecked");
              e.preventDefault();
            } else if (format === "unchecked") {
              this.format("list", "checked");
              e.preventDefault();
            }
          };
          ui.addEventListener("mousedown", listEventHandler);
          ui.addEventListener("touchstart", listEventHandler);
          this.attachUI(ui);
        }
        format(name, value) {
          if (name === this.statics.blotName && value) {
            this.domNode.setAttribute("data-list", value);
          } else {
            super.format(name, value);
          }
        }
      };
      ListItem.blotName = "list";
      ListItem.tagName = "LI";
      ListContainer.allowedChildren = [ListItem];
      ListItem.requiredContainer = ListContainer;
    }
  });

  // node_modules/quill/formats/bold.js
  var Bold, bold_default;
  var init_bold = __esm({
    "node_modules/quill/formats/bold.js"() {
      init_inline();
      Bold = class extends inline_default {
        static blotName = "bold";
        static tagName = ["STRONG", "B"];
        static create() {
          return super.create();
        }
        static formats() {
          return true;
        }
        optimize(context) {
          super.optimize(context);
          if (this.domNode.tagName !== this.statics.tagName[0]) {
            this.replaceWith(this.statics.blotName);
          }
        }
      };
      bold_default = Bold;
    }
  });

  // node_modules/quill/formats/italic.js
  var Italic, italic_default;
  var init_italic = __esm({
    "node_modules/quill/formats/italic.js"() {
      init_bold();
      Italic = class extends bold_default {
        static blotName = "italic";
        static tagName = ["EM", "I"];
      };
      italic_default = Italic;
    }
  });

  // node_modules/quill/formats/link.js
  function sanitize(url, protocols) {
    const anchor = document.createElement("a");
    anchor.href = url;
    const protocol = anchor.href.slice(0, anchor.href.indexOf(":"));
    return protocols.indexOf(protocol) > -1;
  }
  var Link;
  var init_link = __esm({
    "node_modules/quill/formats/link.js"() {
      init_inline();
      Link = class extends inline_default {
        static blotName = "link";
        static tagName = "A";
        static SANITIZED_URL = "about:blank";
        static PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel", "sms"];
        static create(value) {
          const node = super.create(value);
          node.setAttribute("href", this.sanitize(value));
          node.setAttribute("rel", "noopener noreferrer");
          node.setAttribute("target", "_blank");
          return node;
        }
        static formats(domNode) {
          return domNode.getAttribute("href");
        }
        static sanitize(url) {
          return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
        }
        format(name, value) {
          if (name !== this.statics.blotName || !value) {
            super.format(name, value);
          } else {
            this.domNode.setAttribute("href", this.constructor.sanitize(value));
          }
        }
      };
    }
  });

  // node_modules/quill/formats/script.js
  var Script, script_default;
  var init_script = __esm({
    "node_modules/quill/formats/script.js"() {
      init_inline();
      Script = class extends inline_default {
        static blotName = "script";
        static tagName = ["SUB", "SUP"];
        static create(value) {
          if (value === "super") {
            return document.createElement("sup");
          }
          if (value === "sub") {
            return document.createElement("sub");
          }
          return super.create(value);
        }
        static formats(domNode) {
          if (domNode.tagName === "SUB") return "sub";
          if (domNode.tagName === "SUP") return "super";
          return void 0;
        }
      };
      script_default = Script;
    }
  });

  // node_modules/quill/formats/strike.js
  var Strike, strike_default;
  var init_strike = __esm({
    "node_modules/quill/formats/strike.js"() {
      init_bold();
      Strike = class extends bold_default {
        static blotName = "strike";
        static tagName = ["S", "STRIKE"];
      };
      strike_default = Strike;
    }
  });

  // node_modules/quill/formats/underline.js
  var Underline, underline_default;
  var init_underline = __esm({
    "node_modules/quill/formats/underline.js"() {
      init_inline();
      Underline = class extends inline_default {
        static blotName = "underline";
        static tagName = "U";
      };
      underline_default = Underline;
    }
  });

  // node_modules/quill/formats/formula.js
  var Formula, formula_default;
  var init_formula = __esm({
    "node_modules/quill/formats/formula.js"() {
      init_embed();
      Formula = class extends embed_default {
        static blotName = "formula";
        static className = "ql-formula";
        static tagName = "SPAN";
        static create(value) {
          if (window.katex == null) {
            throw new Error("Formula module requires KaTeX.");
          }
          const node = super.create(value);
          if (typeof value === "string") {
            window.katex.render(value, node, {
              throwOnError: false,
              errorColor: "#f00"
            });
            node.setAttribute("data-value", value);
          }
          return node;
        }
        static value(domNode) {
          return domNode.getAttribute("data-value");
        }
        html() {
          const {
            formula
          } = this.value();
          return `<span>${formula}</span>`;
        }
      };
      formula_default = Formula;
    }
  });

  // node_modules/quill/formats/image.js
  var ATTRIBUTES, Image, image_default;
  var init_image = __esm({
    "node_modules/quill/formats/image.js"() {
      init_parchment();
      init_link();
      ATTRIBUTES = ["alt", "height", "width"];
      Image = class extends EmbedBlot$1 {
        static blotName = "image";
        static tagName = "IMG";
        static create(value) {
          const node = super.create(value);
          if (typeof value === "string") {
            node.setAttribute("src", this.sanitize(value));
          }
          return node;
        }
        static formats(domNode) {
          return ATTRIBUTES.reduce((formats, attribute) => {
            if (domNode.hasAttribute(attribute)) {
              formats[attribute] = domNode.getAttribute(attribute);
            }
            return formats;
          }, {});
        }
        static match(url) {
          return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
        }
        static sanitize(url) {
          return sanitize(url, ["http", "https", "data"]) ? url : "//:0";
        }
        static value(domNode) {
          return domNode.getAttribute("src");
        }
        format(name, value) {
          if (ATTRIBUTES.indexOf(name) > -1) {
            if (value) {
              this.domNode.setAttribute(name, value);
            } else {
              this.domNode.removeAttribute(name);
            }
          } else {
            super.format(name, value);
          }
        }
      };
      image_default = Image;
    }
  });

  // node_modules/quill/formats/video.js
  var ATTRIBUTES2, Video, video_default;
  var init_video = __esm({
    "node_modules/quill/formats/video.js"() {
      init_block();
      init_link();
      ATTRIBUTES2 = ["height", "width"];
      Video = class extends BlockEmbed {
        static blotName = "video";
        static className = "ql-video";
        static tagName = "IFRAME";
        static create(value) {
          const node = super.create(value);
          node.setAttribute("frameborder", "0");
          node.setAttribute("allowfullscreen", "true");
          node.setAttribute("src", this.sanitize(value));
          return node;
        }
        static formats(domNode) {
          return ATTRIBUTES2.reduce((formats, attribute) => {
            if (domNode.hasAttribute(attribute)) {
              formats[attribute] = domNode.getAttribute(attribute);
            }
            return formats;
          }, {});
        }
        static sanitize(url) {
          return Link.sanitize(url);
        }
        static value(domNode) {
          return domNode.getAttribute("src");
        }
        format(name, value) {
          if (ATTRIBUTES2.indexOf(name) > -1) {
            if (value) {
              this.domNode.setAttribute(name, value);
            } else {
              this.domNode.removeAttribute(name);
            }
          } else {
            super.format(name, value);
          }
        }
        html() {
          const {
            video
          } = this.value();
          return `<a href="${video}">${video}</a>`;
        }
      };
      video_default = Video;
    }
  });

  // node_modules/quill/modules/syntax.js
  var import_quill_delta10, TokenAttributor, CodeToken, SyntaxCodeBlock, SyntaxCodeBlockContainer, highlight, Syntax;
  var init_syntax = __esm({
    "node_modules/quill/modules/syntax.js"() {
      import_quill_delta10 = __toESM(require_Delta(), 1);
      init_parchment();
      init_inline();
      init_quill();
      init_module();
      init_block();
      init_break();
      init_cursor();
      init_text();
      init_code();
      init_clipboard();
      TokenAttributor = new ClassAttributor$1("code-token", "hljs", {
        scope: Scope.INLINE
      });
      CodeToken = class _CodeToken extends inline_default {
        static formats(node, scroll) {
          while (node != null && node !== scroll.domNode) {
            if (node.classList && node.classList.contains(CodeBlock.className)) {
              return super.formats(node, scroll);
            }
            node = node.parentNode;
          }
          return void 0;
        }
        constructor(scroll, domNode, value) {
          super(scroll, domNode, value);
          TokenAttributor.add(this.domNode, value);
        }
        format(format, value) {
          if (format !== _CodeToken.blotName) {
            super.format(format, value);
          } else if (value) {
            TokenAttributor.add(this.domNode, value);
          } else {
            TokenAttributor.remove(this.domNode);
            this.domNode.classList.remove(this.statics.className);
          }
        }
        optimize() {
          super.optimize(...arguments);
          if (!TokenAttributor.value(this.domNode)) {
            this.unwrap();
          }
        }
      };
      CodeToken.blotName = "code-token";
      CodeToken.className = "ql-token";
      SyntaxCodeBlock = class extends CodeBlock {
        static create(value) {
          const domNode = super.create(value);
          if (typeof value === "string") {
            domNode.setAttribute("data-language", value);
          }
          return domNode;
        }
        static formats(domNode) {
          return domNode.getAttribute("data-language") || "plain";
        }
        static register() {
        }
        // Syntax module will register
        format(name, value) {
          if (name === this.statics.blotName && value) {
            this.domNode.setAttribute("data-language", value);
          } else {
            super.format(name, value);
          }
        }
        replaceWith(name, value) {
          this.formatAt(0, this.length(), CodeToken.blotName, false);
          return super.replaceWith(name, value);
        }
      };
      SyntaxCodeBlockContainer = class extends CodeBlockContainer {
        attach() {
          super.attach();
          this.forceNext = false;
          this.scroll.emitMount(this);
        }
        format(name, value) {
          if (name === SyntaxCodeBlock.blotName) {
            this.forceNext = true;
            this.children.forEach((child) => {
              child.format(name, value);
            });
          }
        }
        formatAt(index, length2, name, value) {
          if (name === SyntaxCodeBlock.blotName) {
            this.forceNext = true;
          }
          super.formatAt(index, length2, name, value);
        }
        highlight(highlight2) {
          let forced = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          if (this.children.head == null) return;
          const nodes = Array.from(this.domNode.childNodes).filter((node) => node !== this.uiNode);
          const text2 = `${nodes.map((node) => node.textContent).join("\n")}
`;
          const language = SyntaxCodeBlock.formats(this.children.head.domNode);
          if (forced || this.forceNext || this.cachedText !== text2) {
            if (text2.trim().length > 0 || this.cachedText == null) {
              const oldDelta = this.children.reduce((delta2, child) => {
                return delta2.concat(blockDelta(child, false));
              }, new import_quill_delta10.default());
              const delta = highlight2(text2, language);
              oldDelta.diff(delta).reduce((index, _ref) => {
                let {
                  retain,
                  attributes
                } = _ref;
                if (!retain) return index;
                if (attributes) {
                  Object.keys(attributes).forEach((format) => {
                    if ([SyntaxCodeBlock.blotName, CodeToken.blotName].includes(format)) {
                      this.formatAt(index, retain, format, attributes[format]);
                    }
                  });
                }
                return index + retain;
              }, 0);
            }
            this.cachedText = text2;
            this.forceNext = false;
          }
        }
        html(index, length2) {
          const [codeBlock] = this.children.find(index);
          const language = codeBlock ? SyntaxCodeBlock.formats(codeBlock.domNode) : "plain";
          return `<pre data-language="${language}">
${escapeText(this.code(index, length2))}
</pre>`;
        }
        optimize(context) {
          super.optimize(context);
          if (this.parent != null && this.children.head != null && this.uiNode != null) {
            const language = SyntaxCodeBlock.formats(this.children.head.domNode);
            if (language !== this.uiNode.value) {
              this.uiNode.value = language;
            }
          }
        }
      };
      SyntaxCodeBlockContainer.allowedChildren = [SyntaxCodeBlock];
      SyntaxCodeBlock.requiredContainer = SyntaxCodeBlockContainer;
      SyntaxCodeBlock.allowedChildren = [CodeToken, cursor_default, Text2, break_default];
      highlight = (lib, language, text2) => {
        if (typeof lib.versionString === "string") {
          const majorVersion = lib.versionString.split(".")[0];
          if (parseInt(majorVersion, 10) >= 11) {
            return lib.highlight(text2, {
              language
            }).value;
          }
        }
        return lib.highlight(language, text2).value;
      };
      Syntax = class extends module_default {
        static register() {
          Quill.register(CodeToken, true);
          Quill.register(SyntaxCodeBlock, true);
          Quill.register(SyntaxCodeBlockContainer, true);
        }
        constructor(quill, options) {
          super(quill, options);
          if (this.options.hljs == null) {
            throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
          }
          this.languages = this.options.languages.reduce((memo, _ref2) => {
            let {
              key
            } = _ref2;
            memo[key] = true;
            return memo;
          }, {});
          this.highlightBlot = this.highlightBlot.bind(this);
          this.initListener();
          this.initTimer();
        }
        initListener() {
          this.quill.on(Quill.events.SCROLL_BLOT_MOUNT, (blot) => {
            if (!(blot instanceof SyntaxCodeBlockContainer)) return;
            const select = this.quill.root.ownerDocument.createElement("select");
            this.options.languages.forEach((_ref3) => {
              let {
                key,
                label
              } = _ref3;
              const option = select.ownerDocument.createElement("option");
              option.textContent = label;
              option.setAttribute("value", key);
              select.appendChild(option);
            });
            select.addEventListener("change", () => {
              blot.format(SyntaxCodeBlock.blotName, select.value);
              this.quill.root.focus();
              this.highlight(blot, true);
            });
            if (blot.uiNode == null) {
              blot.attachUI(select);
              if (blot.children.head) {
                select.value = SyntaxCodeBlock.formats(blot.children.head.domNode);
              }
            }
          });
        }
        initTimer() {
          let timer = null;
          this.quill.on(Quill.events.SCROLL_OPTIMIZE, () => {
            if (timer) {
              clearTimeout(timer);
            }
            timer = setTimeout(() => {
              this.highlight();
              timer = null;
            }, this.options.interval);
          });
        }
        highlight() {
          let blot = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
          let force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          if (this.quill.selection.composing) return;
          this.quill.update(Quill.sources.USER);
          const range = this.quill.getSelection();
          const blots = blot == null ? this.quill.scroll.descendants(SyntaxCodeBlockContainer) : [blot];
          blots.forEach((container) => {
            container.highlight(this.highlightBlot, force);
          });
          this.quill.update(Quill.sources.SILENT);
          if (range != null) {
            this.quill.setSelection(range, Quill.sources.SILENT);
          }
        }
        highlightBlot(text2) {
          let language = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
          language = this.languages[language] ? language : "plain";
          if (language === "plain") {
            return escapeText(text2).split("\n").reduce((delta, line, i) => {
              if (i !== 0) {
                delta.insert("\n", {
                  [CodeBlock.blotName]: language
                });
              }
              return delta.insert(line);
            }, new import_quill_delta10.default());
          }
          const container = this.quill.root.ownerDocument.createElement("div");
          container.classList.add(CodeBlock.className);
          container.innerHTML = highlight(this.options.hljs, language, text2);
          return traverse(this.quill.scroll, container, [(node, delta) => {
            const value = TokenAttributor.value(node);
            if (value) {
              return delta.compose(new import_quill_delta10.default().retain(delta.length(), {
                [CodeToken.blotName]: value
              }));
            }
            return delta;
          }], [(node, delta) => {
            return node.data.split("\n").reduce((memo, nodeText, i) => {
              if (i !== 0) memo.insert("\n", {
                [CodeBlock.blotName]: language
              });
              return memo.insert(nodeText);
            }, delta);
          }], /* @__PURE__ */ new WeakMap());
        }
      };
      Syntax.DEFAULTS = {
        hljs: (() => {
          return window.hljs;
        })(),
        interval: 1e3,
        languages: [{
          key: "plain",
          label: "Plain"
        }, {
          key: "bash",
          label: "Bash"
        }, {
          key: "cpp",
          label: "C++"
        }, {
          key: "cs",
          label: "C#"
        }, {
          key: "css",
          label: "CSS"
        }, {
          key: "diff",
          label: "Diff"
        }, {
          key: "xml",
          label: "HTML/XML"
        }, {
          key: "java",
          label: "Java"
        }, {
          key: "javascript",
          label: "JavaScript"
        }, {
          key: "markdown",
          label: "Markdown"
        }, {
          key: "php",
          label: "PHP"
        }, {
          key: "python",
          label: "Python"
        }, {
          key: "ruby",
          label: "Ruby"
        }, {
          key: "sql",
          label: "SQL"
        }]
      };
    }
  });

  // node_modules/quill/formats/table.js
  function tableId() {
    const id2 = Math.random().toString(36).slice(2, 6);
    return `row-${id2}`;
  }
  var TableCell, TableRow, TableBody, TableContainer;
  var init_table = __esm({
    "node_modules/quill/formats/table.js"() {
      init_block();
      init_container();
      TableCell = class _TableCell extends Block {
        static blotName = "table";
        static tagName = "TD";
        static create(value) {
          const node = super.create();
          if (value) {
            node.setAttribute("data-row", value);
          } else {
            node.setAttribute("data-row", tableId());
          }
          return node;
        }
        static formats(domNode) {
          if (domNode.hasAttribute("data-row")) {
            return domNode.getAttribute("data-row");
          }
          return void 0;
        }
        cellOffset() {
          if (this.parent) {
            return this.parent.children.indexOf(this);
          }
          return -1;
        }
        format(name, value) {
          if (name === _TableCell.blotName && value) {
            this.domNode.setAttribute("data-row", value);
          } else {
            super.format(name, value);
          }
        }
        row() {
          return this.parent;
        }
        rowOffset() {
          if (this.row()) {
            return this.row().rowOffset();
          }
          return -1;
        }
        table() {
          return this.row() && this.row().table();
        }
      };
      TableRow = class extends container_default {
        static blotName = "table-row";
        static tagName = "TR";
        checkMerge() {
          if (super.checkMerge() && this.next.children.head != null) {
            const thisHead = this.children.head.formats();
            const thisTail = this.children.tail.formats();
            const nextHead = this.next.children.head.formats();
            const nextTail = this.next.children.tail.formats();
            return thisHead.table === thisTail.table && thisHead.table === nextHead.table && thisHead.table === nextTail.table;
          }
          return false;
        }
        optimize(context) {
          super.optimize(context);
          this.children.forEach((child) => {
            if (child.next == null) return;
            const childFormats = child.formats();
            const nextFormats = child.next.formats();
            if (childFormats.table !== nextFormats.table) {
              const next = this.splitAfter(child);
              if (next) {
                next.optimize();
              }
              if (this.prev) {
                this.prev.optimize();
              }
            }
          });
        }
        rowOffset() {
          if (this.parent) {
            return this.parent.children.indexOf(this);
          }
          return -1;
        }
        table() {
          return this.parent && this.parent.parent;
        }
      };
      TableBody = class extends container_default {
        static blotName = "table-body";
        static tagName = "TBODY";
      };
      TableContainer = class extends container_default {
        static blotName = "table-container";
        static tagName = "TABLE";
        balanceCells() {
          const rows = this.descendants(TableRow);
          const maxColumns = rows.reduce((max2, row) => {
            return Math.max(row.children.length, max2);
          }, 0);
          rows.forEach((row) => {
            new Array(maxColumns - row.children.length).fill(0).forEach(() => {
              let value;
              if (row.children.head != null) {
                value = TableCell.formats(row.children.head.domNode);
              }
              const blot = this.scroll.create(TableCell.blotName, value);
              row.appendChild(blot);
              blot.optimize();
            });
          });
        }
        cells(column) {
          return this.rows().map((row) => row.children.at(column));
        }
        deleteColumn(index) {
          const [body] = this.descendant(TableBody);
          if (body == null || body.children.head == null) return;
          body.children.forEach((row) => {
            const cell = row.children.at(index);
            if (cell != null) {
              cell.remove();
            }
          });
        }
        insertColumn(index) {
          const [body] = this.descendant(TableBody);
          if (body == null || body.children.head == null) return;
          body.children.forEach((row) => {
            const ref = row.children.at(index);
            const value = TableCell.formats(row.children.head.domNode);
            const cell = this.scroll.create(TableCell.blotName, value);
            row.insertBefore(cell, ref);
          });
        }
        insertRow(index) {
          const [body] = this.descendant(TableBody);
          if (body == null || body.children.head == null) return;
          const id2 = tableId();
          const row = this.scroll.create(TableRow.blotName);
          body.children.head.children.forEach(() => {
            const cell = this.scroll.create(TableCell.blotName, id2);
            row.appendChild(cell);
          });
          const ref = body.children.at(index);
          body.insertBefore(row, ref);
        }
        rows() {
          const body = this.children.head;
          if (body == null) return [];
          return body.children.map((row) => row);
        }
      };
      TableContainer.allowedChildren = [TableBody];
      TableBody.requiredContainer = TableContainer;
      TableBody.allowedChildren = [TableRow];
      TableRow.requiredContainer = TableBody;
      TableRow.allowedChildren = [TableCell];
      TableCell.requiredContainer = TableRow;
    }
  });

  // node_modules/quill/modules/table.js
  var import_quill_delta11, Table, table_default;
  var init_table2 = __esm({
    "node_modules/quill/modules/table.js"() {
      import_quill_delta11 = __toESM(require_Delta(), 1);
      init_quill();
      init_module();
      init_table();
      Table = class extends module_default {
        static register() {
          Quill.register(TableCell);
          Quill.register(TableRow);
          Quill.register(TableBody);
          Quill.register(TableContainer);
        }
        constructor() {
          super(...arguments);
          this.listenBalanceCells();
        }
        balanceTables() {
          this.quill.scroll.descendants(TableContainer).forEach((table) => {
            table.balanceCells();
          });
        }
        deleteColumn() {
          const [table, , cell] = this.getTable();
          if (cell == null) return;
          table.deleteColumn(cell.cellOffset());
          this.quill.update(Quill.sources.USER);
        }
        deleteRow() {
          const [, row] = this.getTable();
          if (row == null) return;
          row.remove();
          this.quill.update(Quill.sources.USER);
        }
        deleteTable() {
          const [table] = this.getTable();
          if (table == null) return;
          const offset = table.offset();
          table.remove();
          this.quill.update(Quill.sources.USER);
          this.quill.setSelection(offset, Quill.sources.SILENT);
        }
        getTable() {
          let range = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
          if (range == null) return [null, null, null, -1];
          const [cell, offset] = this.quill.getLine(range.index);
          if (cell == null || cell.statics.blotName !== TableCell.blotName) {
            return [null, null, null, -1];
          }
          const row = cell.parent;
          const table = row.parent.parent;
          return [table, row, cell, offset];
        }
        insertColumn(offset) {
          const range = this.quill.getSelection();
          if (!range) return;
          const [table, row, cell] = this.getTable(range);
          if (cell == null) return;
          const column = cell.cellOffset();
          table.insertColumn(column + offset);
          this.quill.update(Quill.sources.USER);
          let shift = row.rowOffset();
          if (offset === 0) {
            shift += 1;
          }
          this.quill.setSelection(range.index + shift, range.length, Quill.sources.SILENT);
        }
        insertColumnLeft() {
          this.insertColumn(0);
        }
        insertColumnRight() {
          this.insertColumn(1);
        }
        insertRow(offset) {
          const range = this.quill.getSelection();
          if (!range) return;
          const [table, row, cell] = this.getTable(range);
          if (cell == null) return;
          const index = row.rowOffset();
          table.insertRow(index + offset);
          this.quill.update(Quill.sources.USER);
          if (offset > 0) {
            this.quill.setSelection(range, Quill.sources.SILENT);
          } else {
            this.quill.setSelection(range.index + row.children.length, range.length, Quill.sources.SILENT);
          }
        }
        insertRowAbove() {
          this.insertRow(0);
        }
        insertRowBelow() {
          this.insertRow(1);
        }
        insertTable(rows, columns) {
          const range = this.quill.getSelection();
          if (range == null) return;
          const delta = new Array(rows).fill(0).reduce((memo) => {
            const text2 = new Array(columns).fill("\n").join("");
            return memo.insert(text2, {
              table: tableId()
            });
          }, new import_quill_delta11.default().retain(range.index));
          this.quill.updateContents(delta, Quill.sources.USER);
          this.quill.setSelection(range.index, Quill.sources.SILENT);
          this.balanceTables();
        }
        listenBalanceCells() {
          this.quill.on(Quill.events.SCROLL_OPTIMIZE, (mutations) => {
            mutations.some((mutation) => {
              if (["TD", "TR", "TBODY", "TABLE"].includes(mutation.target.tagName)) {
                this.quill.once(Quill.events.TEXT_CHANGE, (delta, old, source) => {
                  if (source !== Quill.sources.USER) return;
                  this.balanceTables();
                });
                return true;
              }
              return false;
            });
          });
        }
      };
      table_default = Table;
    }
  });

  // node_modules/quill/modules/toolbar.js
  function addButton(container, format, value) {
    const input = document.createElement("button");
    input.setAttribute("type", "button");
    input.classList.add(`ql-${format}`);
    input.setAttribute("aria-pressed", "false");
    if (value != null) {
      input.value = value;
      input.setAttribute("aria-label", `${format}: ${value}`);
    } else {
      input.setAttribute("aria-label", format);
    }
    container.appendChild(input);
  }
  function addControls(container, groups) {
    if (!Array.isArray(groups[0])) {
      groups = [groups];
    }
    groups.forEach((controls) => {
      const group = document.createElement("span");
      group.classList.add("ql-formats");
      controls.forEach((control) => {
        if (typeof control === "string") {
          addButton(group, control);
        } else {
          const format = Object.keys(control)[0];
          const value = control[format];
          if (Array.isArray(value)) {
            addSelect(group, format, value);
          } else {
            addButton(group, format, value);
          }
        }
      });
      container.appendChild(group);
    });
  }
  function addSelect(container, format, values) {
    const input = document.createElement("select");
    input.classList.add(`ql-${format}`);
    values.forEach((value) => {
      const option = document.createElement("option");
      if (value !== false) {
        option.setAttribute("value", String(value));
      } else {
        option.setAttribute("selected", "selected");
      }
      input.appendChild(option);
    });
    container.appendChild(input);
  }
  var import_quill_delta12, debug7, Toolbar;
  var init_toolbar = __esm({
    "node_modules/quill/modules/toolbar.js"() {
      import_quill_delta12 = __toESM(require_Delta(), 1);
      init_parchment();
      init_quill();
      init_logger();
      init_module();
      debug7 = logger_default("quill:toolbar");
      Toolbar = class extends module_default {
        constructor(quill, options) {
          super(quill, options);
          if (Array.isArray(this.options.container)) {
            const container = document.createElement("div");
            container.setAttribute("role", "toolbar");
            addControls(container, this.options.container);
            quill.container?.parentNode?.insertBefore(container, quill.container);
            this.container = container;
          } else if (typeof this.options.container === "string") {
            this.container = document.querySelector(this.options.container);
          } else {
            this.container = this.options.container;
          }
          if (!(this.container instanceof HTMLElement)) {
            debug7.error("Container required for toolbar", this.options);
            return;
          }
          this.container.classList.add("ql-toolbar");
          this.controls = [];
          this.handlers = {};
          if (this.options.handlers) {
            Object.keys(this.options.handlers).forEach((format) => {
              const handler = this.options.handlers?.[format];
              if (handler) {
                this.addHandler(format, handler);
              }
            });
          }
          Array.from(this.container.querySelectorAll("button, select")).forEach((input) => {
            this.attach(input);
          });
          this.quill.on(Quill.events.EDITOR_CHANGE, () => {
            const [range] = this.quill.selection.getRange();
            this.update(range);
          });
        }
        addHandler(format, handler) {
          this.handlers[format] = handler;
        }
        attach(input) {
          let format = Array.from(input.classList).find((className) => {
            return className.indexOf("ql-") === 0;
          });
          if (!format) return;
          format = format.slice("ql-".length);
          if (input.tagName === "BUTTON") {
            input.setAttribute("type", "button");
          }
          if (this.handlers[format] == null && this.quill.scroll.query(format) == null) {
            debug7.warn("ignoring attaching to nonexistent format", format, input);
            return;
          }
          const eventName = input.tagName === "SELECT" ? "change" : "click";
          input.addEventListener(eventName, (e) => {
            let value;
            if (input.tagName === "SELECT") {
              if (input.selectedIndex < 0) return;
              const selected = input.options[input.selectedIndex];
              if (selected.hasAttribute("selected")) {
                value = false;
              } else {
                value = selected.value || false;
              }
            } else {
              if (input.classList.contains("ql-active")) {
                value = false;
              } else {
                value = input.value || !input.hasAttribute("value");
              }
              e.preventDefault();
            }
            this.quill.focus();
            const [range] = this.quill.selection.getRange();
            if (this.handlers[format] != null) {
              this.handlers[format].call(this, value);
            } else if (
              // @ts-expect-error
              this.quill.scroll.query(format).prototype instanceof EmbedBlot$1
            ) {
              value = prompt(`Enter ${format}`);
              if (!value) return;
              this.quill.updateContents(new import_quill_delta12.default().retain(range.index).delete(range.length).insert({
                [format]: value
              }), Quill.sources.USER);
            } else {
              this.quill.format(format, value, Quill.sources.USER);
            }
            this.update(range);
          });
          this.controls.push([format, input]);
        }
        update(range) {
          const formats = range == null ? {} : this.quill.getFormat(range);
          this.controls.forEach((pair) => {
            const [format, input] = pair;
            if (input.tagName === "SELECT") {
              let option = null;
              if (range == null) {
                option = null;
              } else if (formats[format] == null) {
                option = input.querySelector("option[selected]");
              } else if (!Array.isArray(formats[format])) {
                let value = formats[format];
                if (typeof value === "string") {
                  value = value.replace(/"/g, '\\"');
                }
                option = input.querySelector(`option[value="${value}"]`);
              }
              if (option == null) {
                input.value = "";
                input.selectedIndex = -1;
              } else {
                option.selected = true;
              }
            } else if (range == null) {
              input.classList.remove("ql-active");
              input.setAttribute("aria-pressed", "false");
            } else if (input.hasAttribute("value")) {
              const value = formats[format];
              const isActive = value === input.getAttribute("value") || value != null && value.toString() === input.getAttribute("value") || value == null && !input.getAttribute("value");
              input.classList.toggle("ql-active", isActive);
              input.setAttribute("aria-pressed", isActive.toString());
            } else {
              const isActive = formats[format] != null;
              input.classList.toggle("ql-active", isActive);
              input.setAttribute("aria-pressed", isActive.toString());
            }
          });
        }
      };
      Toolbar.DEFAULTS = {};
      Toolbar.DEFAULTS = {
        container: null,
        handlers: {
          clean() {
            const range = this.quill.getSelection();
            if (range == null) return;
            if (range.length === 0) {
              const formats = this.quill.getFormat();
              Object.keys(formats).forEach((name) => {
                if (this.quill.scroll.query(name, Scope.INLINE) != null) {
                  this.quill.format(name, false, Quill.sources.USER);
                }
              });
            } else {
              this.quill.removeFormat(range.index, range.length, Quill.sources.USER);
            }
          },
          direction(value) {
            const {
              align
            } = this.quill.getFormat();
            if (value === "rtl" && align == null) {
              this.quill.format("align", "right", Quill.sources.USER);
            } else if (!value && align === "right") {
              this.quill.format("align", false, Quill.sources.USER);
            }
            this.quill.format("direction", value, Quill.sources.USER);
          },
          indent(value) {
            const range = this.quill.getSelection();
            const formats = this.quill.getFormat(range);
            const indent = parseInt(formats.indent || 0, 10);
            if (value === "+1" || value === "-1") {
              let modifier = value === "+1" ? 1 : -1;
              if (formats.direction === "rtl") modifier *= -1;
              this.quill.format("indent", indent + modifier, Quill.sources.USER);
            }
          },
          link(value) {
            if (value === true) {
              value = prompt("Enter link URL:");
            }
            this.quill.format("link", value, Quill.sources.USER);
          },
          list(value) {
            const range = this.quill.getSelection();
            const formats = this.quill.getFormat(range);
            if (value === "check") {
              if (formats.list === "checked" || formats.list === "unchecked") {
                this.quill.format("list", false, Quill.sources.USER);
              } else {
                this.quill.format("list", "unchecked", Quill.sources.USER);
              }
            } else {
              this.quill.format("list", value, Quill.sources.USER);
            }
          }
        }
      };
    }
  });

  // node_modules/quill/ui/icons.js
  var alignLeftIcon, alignCenterIcon, alignRightIcon, alignJustifyIcon, backgroundIcon, blockquoteIcon, boldIcon, cleanIcon, codeIcon, colorIcon, directionLeftToRightIcon, directionRightToLeftIcon, formulaIcon, headerIcon, header2Icon, header3Icon, header4Icon, header5Icon, header6Icon, italicIcon, imageIcon, indentIcon, outdentIcon, linkIcon, listBulletIcon, listCheckIcon, listOrderedIcon, subscriptIcon, superscriptIcon, strikeIcon, tableIcon, underlineIcon, videoIcon, icons_default;
  var init_icons = __esm({
    "node_modules/quill/ui/icons.js"() {
      alignLeftIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>';
      alignCenterIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>';
      alignRightIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>';
      alignJustifyIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>';
      backgroundIcon = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>';
      blockquoteIcon = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>';
      boldIcon = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>';
      cleanIcon = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>';
      codeIcon = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>';
      colorIcon = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>';
      directionLeftToRightIcon = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>';
      directionRightToLeftIcon = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>';
      formulaIcon = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>';
      headerIcon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>';
      header2Icon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>';
      header3Icon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>';
      header4Icon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>';
      header5Icon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>';
      header6Icon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>';
      italicIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>';
      imageIcon = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>';
      indentIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>';
      outdentIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>';
      linkIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>';
      listBulletIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>';
      listCheckIcon = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>';
      listOrderedIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>';
      subscriptIcon = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>';
      superscriptIcon = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>';
      strikeIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>';
      tableIcon = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>';
      underlineIcon = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>';
      videoIcon = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>';
      icons_default = {
        align: {
          "": alignLeftIcon,
          center: alignCenterIcon,
          right: alignRightIcon,
          justify: alignJustifyIcon
        },
        background: backgroundIcon,
        blockquote: blockquoteIcon,
        bold: boldIcon,
        clean: cleanIcon,
        code: codeIcon,
        "code-block": codeIcon,
        color: colorIcon,
        direction: {
          "": directionLeftToRightIcon,
          rtl: directionRightToLeftIcon
        },
        formula: formulaIcon,
        header: {
          "1": headerIcon,
          "2": header2Icon,
          "3": header3Icon,
          "4": header4Icon,
          "5": header5Icon,
          "6": header6Icon
        },
        italic: italicIcon,
        image: imageIcon,
        indent: {
          "+1": indentIcon,
          "-1": outdentIcon
        },
        link: linkIcon,
        list: {
          bullet: listBulletIcon,
          check: listCheckIcon,
          ordered: listOrderedIcon
        },
        script: {
          sub: subscriptIcon,
          super: superscriptIcon
        },
        strike: strikeIcon,
        table: tableIcon,
        underline: underlineIcon,
        video: videoIcon
      };
    }
  });

  // node_modules/quill/ui/picker.js
  function toggleAriaAttribute(element2, attribute) {
    element2.setAttribute(attribute, `${!(element2.getAttribute(attribute) === "true")}`);
  }
  var DropdownIcon, optionsCounter, Picker, picker_default;
  var init_picker = __esm({
    "node_modules/quill/ui/picker.js"() {
      DropdownIcon = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
      optionsCounter = 0;
      Picker = class {
        constructor(select) {
          this.select = select;
          this.container = document.createElement("span");
          this.buildPicker();
          this.select.style.display = "none";
          this.select.parentNode.insertBefore(this.container, this.select);
          this.label.addEventListener("mousedown", () => {
            this.togglePicker();
          });
          this.label.addEventListener("keydown", (event) => {
            switch (event.key) {
              case "Enter":
                this.togglePicker();
                break;
              case "Escape":
                this.escape();
                event.preventDefault();
                break;
              default:
            }
          });
          this.select.addEventListener("change", this.update.bind(this));
        }
        togglePicker() {
          this.container.classList.toggle("ql-expanded");
          toggleAriaAttribute(this.label, "aria-expanded");
          toggleAriaAttribute(this.options, "aria-hidden");
        }
        buildItem(option) {
          const item = document.createElement("span");
          item.tabIndex = "0";
          item.setAttribute("role", "button");
          item.classList.add("ql-picker-item");
          const value = option.getAttribute("value");
          if (value) {
            item.setAttribute("data-value", value);
          }
          if (option.textContent) {
            item.setAttribute("data-label", option.textContent);
          }
          item.addEventListener("click", () => {
            this.selectItem(item, true);
          });
          item.addEventListener("keydown", (event) => {
            switch (event.key) {
              case "Enter":
                this.selectItem(item, true);
                event.preventDefault();
                break;
              case "Escape":
                this.escape();
                event.preventDefault();
                break;
              default:
            }
          });
          return item;
        }
        buildLabel() {
          const label = document.createElement("span");
          label.classList.add("ql-picker-label");
          label.innerHTML = DropdownIcon;
          label.tabIndex = "0";
          label.setAttribute("role", "button");
          label.setAttribute("aria-expanded", "false");
          this.container.appendChild(label);
          return label;
        }
        buildOptions() {
          const options = document.createElement("span");
          options.classList.add("ql-picker-options");
          options.setAttribute("aria-hidden", "true");
          options.tabIndex = "-1";
          options.id = `ql-picker-options-${optionsCounter}`;
          optionsCounter += 1;
          this.label.setAttribute("aria-controls", options.id);
          this.options = options;
          Array.from(this.select.options).forEach((option) => {
            const item = this.buildItem(option);
            options.appendChild(item);
            if (option.selected === true) {
              this.selectItem(item);
            }
          });
          this.container.appendChild(options);
        }
        buildPicker() {
          Array.from(this.select.attributes).forEach((item) => {
            this.container.setAttribute(item.name, item.value);
          });
          this.container.classList.add("ql-picker");
          this.label = this.buildLabel();
          this.buildOptions();
        }
        escape() {
          this.close();
          setTimeout(() => this.label.focus(), 1);
        }
        close() {
          this.container.classList.remove("ql-expanded");
          this.label.setAttribute("aria-expanded", "false");
          this.options.setAttribute("aria-hidden", "true");
        }
        selectItem(item) {
          let trigger = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          const selected = this.container.querySelector(".ql-selected");
          if (item === selected) return;
          if (selected != null) {
            selected.classList.remove("ql-selected");
          }
          if (item == null) return;
          item.classList.add("ql-selected");
          this.select.selectedIndex = Array.from(item.parentNode.children).indexOf(item);
          if (item.hasAttribute("data-value")) {
            this.label.setAttribute("data-value", item.getAttribute("data-value"));
          } else {
            this.label.removeAttribute("data-value");
          }
          if (item.hasAttribute("data-label")) {
            this.label.setAttribute("data-label", item.getAttribute("data-label"));
          } else {
            this.label.removeAttribute("data-label");
          }
          if (trigger) {
            this.select.dispatchEvent(new Event("change"));
            this.close();
          }
        }
        update() {
          let option;
          if (this.select.selectedIndex > -1) {
            const item = (
              // @ts-expect-error Fix me later
              this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex]
            );
            option = this.select.options[this.select.selectedIndex];
            this.selectItem(item);
          } else {
            this.selectItem(null);
          }
          const isActive = option != null && option !== this.select.querySelector("option[selected]");
          this.label.classList.toggle("ql-active", isActive);
        }
      };
      picker_default = Picker;
    }
  });

  // node_modules/quill/ui/color-picker.js
  var ColorPicker, color_picker_default;
  var init_color_picker = __esm({
    "node_modules/quill/ui/color-picker.js"() {
      init_picker();
      ColorPicker = class extends picker_default {
        constructor(select, label) {
          super(select);
          this.label.innerHTML = label;
          this.container.classList.add("ql-color-picker");
          Array.from(this.container.querySelectorAll(".ql-picker-item")).slice(0, 7).forEach((item) => {
            item.classList.add("ql-primary");
          });
        }
        buildItem(option) {
          const item = super.buildItem(option);
          item.style.backgroundColor = option.getAttribute("value") || "";
          return item;
        }
        selectItem(item, trigger) {
          super.selectItem(item, trigger);
          const colorLabel = this.label.querySelector(".ql-color-label");
          const value = item ? item.getAttribute("data-value") || "" : "";
          if (colorLabel) {
            if (colorLabel.tagName === "line") {
              colorLabel.style.stroke = value;
            } else {
              colorLabel.style.fill = value;
            }
          }
        }
      };
      color_picker_default = ColorPicker;
    }
  });

  // node_modules/quill/ui/icon-picker.js
  var IconPicker, icon_picker_default;
  var init_icon_picker = __esm({
    "node_modules/quill/ui/icon-picker.js"() {
      init_picker();
      IconPicker = class extends picker_default {
        constructor(select, icons) {
          super(select);
          this.container.classList.add("ql-icon-picker");
          Array.from(this.container.querySelectorAll(".ql-picker-item")).forEach((item) => {
            item.innerHTML = icons[item.getAttribute("data-value") || ""];
          });
          this.defaultItem = this.container.querySelector(".ql-selected");
          this.selectItem(this.defaultItem);
        }
        selectItem(target, trigger) {
          super.selectItem(target, trigger);
          const item = target || this.defaultItem;
          if (item != null) {
            if (this.label.innerHTML === item.innerHTML) return;
            this.label.innerHTML = item.innerHTML;
          }
        }
      };
      icon_picker_default = IconPicker;
    }
  });

  // node_modules/quill/ui/tooltip.js
  var isScrollable, Tooltip, tooltip_default;
  var init_tooltip = __esm({
    "node_modules/quill/ui/tooltip.js"() {
      isScrollable = (el) => {
        const {
          overflowY
        } = getComputedStyle(el, null);
        return overflowY !== "visible" && overflowY !== "clip";
      };
      Tooltip = class {
        constructor(quill, boundsContainer) {
          this.quill = quill;
          this.boundsContainer = boundsContainer || document.body;
          this.root = quill.addContainer("ql-tooltip");
          this.root.innerHTML = this.constructor.TEMPLATE;
          if (isScrollable(this.quill.root)) {
            this.quill.root.addEventListener("scroll", () => {
              this.root.style.marginTop = `${-1 * this.quill.root.scrollTop}px`;
            });
          }
          this.hide();
        }
        hide() {
          this.root.classList.add("ql-hidden");
        }
        position(reference) {
          const left = reference.left + reference.width / 2 - this.root.offsetWidth / 2;
          const top = reference.bottom + this.quill.root.scrollTop;
          this.root.style.left = `${left}px`;
          this.root.style.top = `${top}px`;
          this.root.classList.remove("ql-flip");
          const containerBounds = this.boundsContainer.getBoundingClientRect();
          const rootBounds = this.root.getBoundingClientRect();
          let shift = 0;
          if (rootBounds.right > containerBounds.right) {
            shift = containerBounds.right - rootBounds.right;
            this.root.style.left = `${left + shift}px`;
          }
          if (rootBounds.left < containerBounds.left) {
            shift = containerBounds.left - rootBounds.left;
            this.root.style.left = `${left + shift}px`;
          }
          if (rootBounds.bottom > containerBounds.bottom) {
            const height = rootBounds.bottom - rootBounds.top;
            const verticalShift = reference.bottom - reference.top + height;
            this.root.style.top = `${top - verticalShift}px`;
            this.root.classList.add("ql-flip");
          }
          return shift;
        }
        show() {
          this.root.classList.remove("ql-editing");
          this.root.classList.remove("ql-hidden");
        }
      };
      tooltip_default = Tooltip;
    }
  });

  // node_modules/quill/themes/base.js
  function extractVideoUrl(url) {
    let match3 = url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (match3) {
      return `${match3[1] || "https"}://www.youtube.com/embed/${match3[2]}?showinfo=0`;
    }
    if (match3 = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) {
      return `${match3[1] || "https"}://player.vimeo.com/video/${match3[2]}/`;
    }
    return url;
  }
  function fillSelect(select, values) {
    let defaultValue = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    values.forEach((value) => {
      const option = document.createElement("option");
      if (value === defaultValue) {
        option.setAttribute("selected", "selected");
      } else {
        option.setAttribute("value", String(value));
      }
      select.appendChild(option);
    });
  }
  var ALIGNS, COLORS, FONTS, HEADERS, SIZES, BaseTheme, BaseTooltip;
  var init_base = __esm({
    "node_modules/quill/themes/base.js"() {
      init_lodash();
      init_emitter();
      init_theme();
      init_color_picker();
      init_icon_picker();
      init_picker();
      init_tooltip();
      ALIGNS = [false, "center", "right", "justify"];
      COLORS = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"];
      FONTS = [false, "serif", "monospace"];
      HEADERS = ["1", "2", "3", false];
      SIZES = ["small", false, "large", "huge"];
      BaseTheme = class extends theme_default {
        constructor(quill, options) {
          super(quill, options);
          const listener = (e) => {
            if (!document.body.contains(quill.root)) {
              document.body.removeEventListener("click", listener);
              return;
            }
            if (this.tooltip != null && // @ts-expect-error
            !this.tooltip.root.contains(e.target) && // @ts-expect-error
            document.activeElement !== this.tooltip.textbox && !this.quill.hasFocus()) {
              this.tooltip.hide();
            }
            if (this.pickers != null) {
              this.pickers.forEach((picker) => {
                if (!picker.container.contains(e.target)) {
                  picker.close();
                }
              });
            }
          };
          quill.emitter.listenDOM("click", document.body, listener);
        }
        addModule(name) {
          const module2 = super.addModule(name);
          if (name === "toolbar") {
            this.extendToolbar(module2);
          }
          return module2;
        }
        buildButtons(buttons, icons) {
          Array.from(buttons).forEach((button) => {
            const className = button.getAttribute("class") || "";
            className.split(/\s+/).forEach((name) => {
              if (!name.startsWith("ql-")) return;
              name = name.slice("ql-".length);
              if (icons[name] == null) return;
              if (name === "direction") {
                button.innerHTML = icons[name][""] + icons[name].rtl;
              } else if (typeof icons[name] === "string") {
                button.innerHTML = icons[name];
              } else {
                const value = button.value || "";
                if (value != null && icons[name][value]) {
                  button.innerHTML = icons[name][value];
                }
              }
            });
          });
        }
        buildPickers(selects, icons) {
          this.pickers = Array.from(selects).map((select) => {
            if (select.classList.contains("ql-align")) {
              if (select.querySelector("option") == null) {
                fillSelect(select, ALIGNS);
              }
              if (typeof icons.align === "object") {
                return new icon_picker_default(select, icons.align);
              }
            }
            if (select.classList.contains("ql-background") || select.classList.contains("ql-color")) {
              const format = select.classList.contains("ql-background") ? "background" : "color";
              if (select.querySelector("option") == null) {
                fillSelect(select, COLORS, format === "background" ? "#ffffff" : "#000000");
              }
              return new color_picker_default(select, icons[format]);
            }
            if (select.querySelector("option") == null) {
              if (select.classList.contains("ql-font")) {
                fillSelect(select, FONTS);
              } else if (select.classList.contains("ql-header")) {
                fillSelect(select, HEADERS);
              } else if (select.classList.contains("ql-size")) {
                fillSelect(select, SIZES);
              }
            }
            return new picker_default(select);
          });
          const update = () => {
            this.pickers.forEach((picker) => {
              picker.update();
            });
          };
          this.quill.on(emitter_default.events.EDITOR_CHANGE, update);
        }
      };
      BaseTheme.DEFAULTS = merge_default({}, theme_default.DEFAULTS, {
        modules: {
          toolbar: {
            handlers: {
              formula() {
                this.quill.theme.tooltip.edit("formula");
              },
              image() {
                let fileInput = this.container.querySelector("input.ql-image[type=file]");
                if (fileInput == null) {
                  fileInput = document.createElement("input");
                  fileInput.setAttribute("type", "file");
                  fileInput.setAttribute("accept", this.quill.uploader.options.mimetypes.join(", "));
                  fileInput.classList.add("ql-image");
                  fileInput.addEventListener("change", () => {
                    const range = this.quill.getSelection(true);
                    this.quill.uploader.upload(range, fileInput.files);
                    fileInput.value = "";
                  });
                  this.container.appendChild(fileInput);
                }
                fileInput.click();
              },
              video() {
                this.quill.theme.tooltip.edit("video");
              }
            }
          }
        }
      });
      BaseTooltip = class extends tooltip_default {
        constructor(quill, boundsContainer) {
          super(quill, boundsContainer);
          this.textbox = this.root.querySelector('input[type="text"]');
          this.listen();
        }
        listen() {
          this.textbox.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              this.save();
              event.preventDefault();
            } else if (event.key === "Escape") {
              this.cancel();
              event.preventDefault();
            }
          });
        }
        cancel() {
          this.hide();
          this.restoreFocus();
        }
        edit() {
          let mode = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link";
          let preview = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          this.root.classList.remove("ql-hidden");
          this.root.classList.add("ql-editing");
          if (this.textbox == null) return;
          if (preview != null) {
            this.textbox.value = preview;
          } else if (mode !== this.root.getAttribute("data-mode")) {
            this.textbox.value = "";
          }
          const bounds = this.quill.getBounds(this.quill.selection.savedRange);
          if (bounds != null) {
            this.position(bounds);
          }
          this.textbox.select();
          this.textbox.setAttribute("placeholder", this.textbox.getAttribute(`data-${mode}`) || "");
          this.root.setAttribute("data-mode", mode);
        }
        restoreFocus() {
          this.quill.focus({
            preventScroll: true
          });
        }
        save() {
          let {
            value
          } = this.textbox;
          switch (this.root.getAttribute("data-mode")) {
            case "link": {
              const {
                scrollTop
              } = this.quill.root;
              if (this.linkRange) {
                this.quill.formatText(this.linkRange, "link", value, emitter_default.sources.USER);
                delete this.linkRange;
              } else {
                this.restoreFocus();
                this.quill.format("link", value, emitter_default.sources.USER);
              }
              this.quill.root.scrollTop = scrollTop;
              break;
            }
            case "video": {
              value = extractVideoUrl(value);
            }
            // eslint-disable-next-line no-fallthrough
            case "formula": {
              if (!value) break;
              const range = this.quill.getSelection(true);
              if (range != null) {
                const index = range.index + range.length;
                this.quill.insertEmbed(
                  index,
                  // @ts-expect-error Fix me later
                  this.root.getAttribute("data-mode"),
                  value,
                  emitter_default.sources.USER
                );
                if (this.root.getAttribute("data-mode") === "formula") {
                  this.quill.insertText(index + 1, " ", emitter_default.sources.USER);
                }
                this.quill.setSelection(index + 2, emitter_default.sources.USER);
              }
              break;
            }
            default:
          }
          this.textbox.value = "";
          this.hide();
        }
      };
    }
  });

  // node_modules/quill/themes/bubble.js
  var TOOLBAR_CONFIG, BubbleTooltip, BubbleTheme;
  var init_bubble = __esm({
    "node_modules/quill/themes/bubble.js"() {
      init_lodash();
      init_emitter();
      init_base();
      init_selection();
      init_icons();
      init_quill();
      TOOLBAR_CONFIG = [["bold", "italic", "link"], [{
        header: 1
      }, {
        header: 2
      }, "blockquote"]];
      BubbleTooltip = class extends BaseTooltip {
        static TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join("");
        constructor(quill, bounds) {
          super(quill, bounds);
          this.quill.on(emitter_default.events.EDITOR_CHANGE, (type, range, oldRange, source) => {
            if (type !== emitter_default.events.SELECTION_CHANGE) return;
            if (range != null && range.length > 0 && source === emitter_default.sources.USER) {
              this.show();
              this.root.style.left = "0px";
              this.root.style.width = "";
              this.root.style.width = `${this.root.offsetWidth}px`;
              const lines = this.quill.getLines(range.index, range.length);
              if (lines.length === 1) {
                const bounds2 = this.quill.getBounds(range);
                if (bounds2 != null) {
                  this.position(bounds2);
                }
              } else {
                const lastLine = lines[lines.length - 1];
                const index = this.quill.getIndex(lastLine);
                const length2 = Math.min(lastLine.length() - 1, range.index + range.length - index);
                const indexBounds = this.quill.getBounds(new Range(index, length2));
                if (indexBounds != null) {
                  this.position(indexBounds);
                }
              }
            } else if (document.activeElement !== this.textbox && this.quill.hasFocus()) {
              this.hide();
            }
          });
        }
        listen() {
          super.listen();
          this.root.querySelector(".ql-close").addEventListener("click", () => {
            this.root.classList.remove("ql-editing");
          });
          this.quill.on(emitter_default.events.SCROLL_OPTIMIZE, () => {
            setTimeout(() => {
              if (this.root.classList.contains("ql-hidden")) return;
              const range = this.quill.getSelection();
              if (range != null) {
                const bounds = this.quill.getBounds(range);
                if (bounds != null) {
                  this.position(bounds);
                }
              }
            }, 1);
          });
        }
        cancel() {
          this.show();
        }
        position(reference) {
          const shift = super.position(reference);
          const arrow = this.root.querySelector(".ql-tooltip-arrow");
          arrow.style.marginLeft = "";
          if (shift !== 0) {
            arrow.style.marginLeft = `${-1 * shift - arrow.offsetWidth / 2}px`;
          }
          return shift;
        }
      };
      BubbleTheme = class extends BaseTheme {
        constructor(quill, options) {
          if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
            options.modules.toolbar.container = TOOLBAR_CONFIG;
          }
          super(quill, options);
          this.quill.container.classList.add("ql-bubble");
        }
        extendToolbar(toolbar) {
          this.tooltip = new BubbleTooltip(this.quill, this.options.bounds);
          if (toolbar.container != null) {
            this.tooltip.root.appendChild(toolbar.container);
            this.buildButtons(toolbar.container.querySelectorAll("button"), icons_default);
            this.buildPickers(toolbar.container.querySelectorAll("select"), icons_default);
          }
        }
      };
      BubbleTheme.DEFAULTS = merge_default({}, BaseTheme.DEFAULTS, {
        modules: {
          toolbar: {
            handlers: {
              link(value) {
                if (!value) {
                  this.quill.format("link", false, Quill.sources.USER);
                } else {
                  this.quill.theme.tooltip.edit();
                }
              }
            }
          }
        }
      });
    }
  });

  // node_modules/quill/themes/snow.js
  var TOOLBAR_CONFIG2, SnowTooltip, SnowTheme, snow_default;
  var init_snow = __esm({
    "node_modules/quill/themes/snow.js"() {
      init_lodash();
      init_emitter();
      init_base();
      init_link();
      init_selection();
      init_icons();
      init_quill();
      TOOLBAR_CONFIG2 = [[{
        header: ["1", "2", "3", false]
      }], ["bold", "italic", "underline", "link"], [{
        list: "ordered"
      }, {
        list: "bullet"
      }], ["clean"]];
      SnowTooltip = class extends BaseTooltip {
        static TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join("");
        preview = this.root.querySelector("a.ql-preview");
        listen() {
          super.listen();
          this.root.querySelector("a.ql-action").addEventListener("click", (event) => {
            if (this.root.classList.contains("ql-editing")) {
              this.save();
            } else {
              this.edit("link", this.preview.textContent);
            }
            event.preventDefault();
          });
          this.root.querySelector("a.ql-remove").addEventListener("click", (event) => {
            if (this.linkRange != null) {
              const range = this.linkRange;
              this.restoreFocus();
              this.quill.formatText(range, "link", false, emitter_default.sources.USER);
              delete this.linkRange;
            }
            event.preventDefault();
            this.hide();
          });
          this.quill.on(emitter_default.events.SELECTION_CHANGE, (range, oldRange, source) => {
            if (range == null) return;
            if (range.length === 0 && source === emitter_default.sources.USER) {
              const [link, offset] = this.quill.scroll.descendant(Link, range.index);
              if (link != null) {
                this.linkRange = new Range(range.index - offset, link.length());
                const preview = Link.formats(link.domNode);
                this.preview.textContent = preview;
                this.preview.setAttribute("href", preview);
                this.show();
                const bounds = this.quill.getBounds(this.linkRange);
                if (bounds != null) {
                  this.position(bounds);
                }
                return;
              }
            } else {
              delete this.linkRange;
            }
            this.hide();
          });
        }
        show() {
          super.show();
          this.root.removeAttribute("data-mode");
        }
      };
      SnowTheme = class extends BaseTheme {
        constructor(quill, options) {
          if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
            options.modules.toolbar.container = TOOLBAR_CONFIG2;
          }
          super(quill, options);
          this.quill.container.classList.add("ql-snow");
        }
        extendToolbar(toolbar) {
          if (toolbar.container != null) {
            toolbar.container.classList.add("ql-snow");
            this.buildButtons(toolbar.container.querySelectorAll("button"), icons_default);
            this.buildPickers(toolbar.container.querySelectorAll("select"), icons_default);
            this.tooltip = new SnowTooltip(this.quill, this.options.bounds);
            if (toolbar.container.querySelector(".ql-link")) {
              this.quill.keyboard.addBinding({
                key: "k",
                shortKey: true
              }, (_range, context) => {
                toolbar.handlers.link.call(toolbar, !context.format.link);
              });
            }
          }
        }
      };
      SnowTheme.DEFAULTS = merge_default({}, BaseTheme.DEFAULTS, {
        modules: {
          toolbar: {
            handlers: {
              link(value) {
                if (value) {
                  const range = this.quill.getSelection();
                  if (range == null || range.length === 0) return;
                  let preview = this.quill.getText(range);
                  if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf("mailto:") !== 0) {
                    preview = `mailto:${preview}`;
                  }
                  const {
                    tooltip
                  } = this.quill.theme;
                  tooltip.edit("link", preview);
                } else {
                  this.quill.format("link", false, Quill.sources.USER);
                }
              }
            }
          }
        }
      });
      snow_default = SnowTheme;
    }
  });

  // node_modules/quill/quill.js
  var quill_default;
  var init_quill2 = __esm({
    "node_modules/quill/quill.js"() {
      init_core();
      init_align();
      init_direction();
      init_indent();
      init_blockquote();
      init_header();
      init_list();
      init_background();
      init_color();
      init_font();
      init_size();
      init_bold();
      init_italic();
      init_link();
      init_script();
      init_strike();
      init_underline();
      init_formula();
      init_image();
      init_video();
      init_code();
      init_syntax();
      init_table2();
      init_toolbar();
      init_icons();
      init_picker();
      init_color_picker();
      init_icon_picker();
      init_tooltip();
      init_bubble();
      init_snow();
      init_core();
      core_default.register({
        "attributors/attribute/direction": DirectionAttribute,
        "attributors/class/align": AlignClass,
        "attributors/class/background": BackgroundClass,
        "attributors/class/color": ColorClass,
        "attributors/class/direction": DirectionClass,
        "attributors/class/font": FontClass,
        "attributors/class/size": SizeClass,
        "attributors/style/align": AlignStyle,
        "attributors/style/background": BackgroundStyle,
        "attributors/style/color": ColorStyle,
        "attributors/style/direction": DirectionStyle,
        "attributors/style/font": FontStyle,
        "attributors/style/size": SizeStyle
      }, true);
      core_default.register({
        "formats/align": AlignClass,
        "formats/direction": DirectionClass,
        "formats/indent": indent_default,
        "formats/background": BackgroundStyle,
        "formats/color": ColorStyle,
        "formats/font": FontClass,
        "formats/size": SizeClass,
        "formats/blockquote": blockquote_default,
        "formats/code-block": CodeBlock,
        "formats/header": header_default,
        "formats/list": ListItem,
        "formats/bold": bold_default,
        "formats/code": Code,
        "formats/italic": italic_default,
        "formats/link": Link,
        "formats/script": script_default,
        "formats/strike": strike_default,
        "formats/underline": underline_default,
        "formats/formula": formula_default,
        "formats/image": image_default,
        "formats/video": video_default,
        "modules/syntax": Syntax,
        "modules/table": table_default,
        "modules/toolbar": Toolbar,
        "themes/bubble": BubbleTheme,
        "themes/snow": snow_default,
        "ui/icons": icons_default,
        "ui/picker": picker_default,
        "ui/icon-picker": icon_picker_default,
        "ui/color-picker": color_picker_default,
        "ui/tooltip": tooltip_default
      }, true);
      quill_default = core_default;
    }
  });

  // node_modules/quill-cursors/dist/quill-cursors.js
  var require_quill_cursors = __commonJS({
    "node_modules/quill-cursors/dist/quill-cursors.js"(exports2, module2) {
      !(function(t, e) {
        "object" == typeof exports2 && "object" == typeof module2 ? module2.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports2 ? exports2.QuillCursors = e() : t.QuillCursors = e();
      })(self, (() => (() => {
        var t = { 582: (t2, e2, r2) => {
          "use strict";
          r2.d(e2, { Z: () => a });
          var n2 = r2(81), i = r2.n(n2), o = r2(645), s = r2.n(o)()(i());
          s.push([t2.id, ".ql-container{position:relative;overflow:hidden}@media(pointer: coarse){.ql-cursor-caret-container{z-index:-1}}.ql-cursor.hidden{display:none}.ql-cursor .ql-cursor-caret-container,.ql-cursor .ql-cursor-flag{position:absolute}.ql-cursor .ql-cursor-flag{z-index:1;transform:translate3d(-1px, -100%, 0);opacity:0;visibility:hidden;color:#fff;padding-bottom:2px;border-radius:0 3px 3px 0}.ql-cursor .ql-cursor-flag.flag-flipped{border-radius:3px 0 0 3px;transform:translate3d(calc(-100% + 1px ), -100%, 0)}@media screen{.ql-cursor .ql-cursor-flag{transition:opacity 0ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms,visibility 0ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms}}.ql-cursor .ql-cursor-flag .ql-cursor-name{margin-left:5px;margin-right:5px;display:inline-block;margin-top:-2px;white-space:nowrap}.ql-cursor .ql-cursor-flag.no-delay[style]{transition-delay:unset !important}.ql-cursor .ql-cursor-caret-container{cursor:text;margin-left:-9px;padding:0 9px}.ql-cursor .ql-cursor-caret-container.hover+.ql-cursor-flag{opacity:1;visibility:visible;transition:none}.ql-cursor .ql-cursor-caret-container.no-pointer{pointer-events:none}.ql-cursor .ql-cursor-caret-container .ql-cursor-caret{position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;background-color:attr(data-color)}.ql-cursor .ql-cursor-selection-block{position:absolute;pointer-events:none}", ""]);
          const a = s;
        }, 645: (t2) => {
          "use strict";
          t2.exports = function(t3) {
            var e2 = [];
            return e2.toString = function() {
              return this.map((function(e3) {
                var r2 = "", n2 = void 0 !== e3[5];
                return e3[4] && (r2 += "@supports (".concat(e3[4], ") {")), e3[2] && (r2 += "@media ".concat(e3[2], " {")), n2 && (r2 += "@layer".concat(e3[5].length > 0 ? " ".concat(e3[5]) : "", " {")), r2 += t3(e3), n2 && (r2 += "}"), e3[2] && (r2 += "}"), e3[4] && (r2 += "}"), r2;
              })).join("");
            }, e2.i = function(t4, r2, n2, i, o) {
              "string" == typeof t4 && (t4 = [[null, t4, void 0]]);
              var s = {};
              if (n2) for (var a = 0; a < this.length; a++) {
                var u = this[a][0];
                null != u && (s[u] = true);
              }
              for (var c = 0; c < t4.length; c++) {
                var l = [].concat(t4[c]);
                n2 && s[l[0]] || (void 0 !== o && (void 0 === l[5] || (l[1] = "@layer".concat(l[5].length > 0 ? " ".concat(l[5]) : "", " {").concat(l[1], "}")), l[5] = o), r2 && (l[2] ? (l[1] = "@media ".concat(l[2], " {").concat(l[1], "}"), l[2] = r2) : l[2] = r2), i && (l[4] ? (l[1] = "@supports (".concat(l[4], ") {").concat(l[1], "}"), l[4] = i) : l[4] = "".concat(i)), e2.push(l));
              }
            }, e2;
          };
        }, 81: (t2) => {
          "use strict";
          t2.exports = function(t3) {
            return t3[1];
          };
        }, 529: (t2) => {
          var e2 = -1;
          function r2(t3, a2, u2, c2) {
            if (t3 === a2) return t3 ? [[0, t3]] : [];
            if (null != u2) {
              var l2 = (function(t4, e3, r3) {
                var n3 = "number" == typeof r3 ? { index: r3, length: 0 } : r3.oldRange, i2 = "number" == typeof r3 ? null : r3.newRange, o2 = t4.length, s2 = e3.length;
                if (0 === n3.length && (null === i2 || 0 === i2.length)) {
                  var a3 = n3.index, u3 = t4.slice(0, a3), c3 = t4.slice(a3), l3 = i2 ? i2.index : null, h3 = a3 + s2 - o2;
                  if ((null === l3 || l3 === h3) && !(h3 < 0 || h3 > s2)) {
                    var p2 = e3.slice(0, h3);
                    if ((g = e3.slice(h3)) === c3) {
                      var d2 = Math.min(a3, h3);
                      if ((y = u3.slice(0, d2)) === (m = p2.slice(0, d2))) return f(y, u3.slice(d2), p2.slice(d2), c3);
                    }
                  }
                  if (null === l3 || l3 === a3) {
                    var v2 = a3, g = (p2 = e3.slice(0, v2), e3.slice(v2));
                    if (p2 === u3) {
                      var _ = Math.min(o2 - v2, s2 - v2);
                      if ((b = c3.slice(c3.length - _)) === (C = g.slice(g.length - _))) return f(u3, c3.slice(0, c3.length - _), g.slice(0, g.length - _), b);
                    }
                  }
                }
                if (n3.length > 0 && i2 && 0 === i2.length) {
                  var y = t4.slice(0, n3.index), b = t4.slice(n3.index + n3.length);
                  if (!(s2 < (d2 = y.length) + (_ = b.length))) {
                    var m = e3.slice(0, d2), C = e3.slice(s2 - _);
                    if (y === m && b === C) return f(y, t4.slice(d2, o2 - _), e3.slice(d2, s2 - _), b);
                  }
                }
                return null;
              })(t3, a2, u2);
              if (l2) return l2;
            }
            var h2 = i(t3, a2), p = t3.substring(0, h2);
            h2 = o(t3 = t3.substring(h2), a2 = a2.substring(h2));
            var d = t3.substring(t3.length - h2), v = (function(t4, s2) {
              var a3;
              if (!t4) return [[1, s2]];
              if (!s2) return [[e2, t4]];
              var u3 = t4.length > s2.length ? t4 : s2, c3 = t4.length > s2.length ? s2 : t4, l3 = u3.indexOf(c3);
              if (-1 !== l3) return a3 = [[1, u3.substring(0, l3)], [0, c3], [1, u3.substring(l3 + c3.length)]], t4.length > s2.length && (a3[0][0] = a3[2][0] = e2), a3;
              if (1 === c3.length) return [[e2, t4], [1, s2]];
              var f2 = (function(t5, e3) {
                var r3 = t5.length > e3.length ? t5 : e3, n3 = t5.length > e3.length ? e3 : t5;
                if (r3.length < 4 || 2 * n3.length < r3.length) return null;
                function s3(t6, e4, r4) {
                  for (var n4, s4, a5, u5, c5 = t6.substring(r4, r4 + Math.floor(t6.length / 4)), l5 = -1, f4 = ""; -1 !== (l5 = e4.indexOf(c5, l5 + 1)); ) {
                    var h5 = i(t6.substring(r4), e4.substring(l5)), p4 = o(t6.substring(0, r4), e4.substring(0, l5));
                    f4.length < p4 + h5 && (f4 = e4.substring(l5 - p4, l5) + e4.substring(l5, l5 + h5), n4 = t6.substring(0, r4 - p4), s4 = t6.substring(r4 + h5), a5 = e4.substring(0, l5 - p4), u5 = e4.substring(l5 + h5));
                  }
                  return 2 * f4.length >= t6.length ? [n4, s4, a5, u5, f4] : null;
                }
                var a4, u4, c4, l4, f3, h4 = s3(r3, n3, Math.ceil(r3.length / 4)), p3 = s3(r3, n3, Math.ceil(r3.length / 2));
                return h4 || p3 ? (a4 = p3 ? h4 && h4[4].length > p3[4].length ? h4 : p3 : h4, t5.length > e3.length ? (u4 = a4[0], c4 = a4[1], l4 = a4[2], f3 = a4[3]) : (l4 = a4[0], f3 = a4[1], u4 = a4[2], c4 = a4[3]), [u4, c4, l4, f3, a4[4]]) : null;
              })(t4, s2);
              if (f2) {
                var h3 = f2[0], p2 = f2[1], d2 = f2[2], v2 = f2[3], g = f2[4], _ = r2(h3, d2), y = r2(p2, v2);
                return _.concat([[0, g]], y);
              }
              return (function(t5, r3) {
                for (var i2 = t5.length, o2 = r3.length, s3 = Math.ceil((i2 + o2) / 2), a4 = s3, u4 = 2 * s3, c4 = new Array(u4), l4 = new Array(u4), f3 = 0; f3 < u4; f3++) c4[f3] = -1, l4[f3] = -1;
                c4[a4 + 1] = 0, l4[a4 + 1] = 0;
                for (var h4 = i2 - o2, p3 = h4 % 2 != 0, d3 = 0, v3 = 0, g2 = 0, _2 = 0, y2 = 0; y2 < s3; y2++) {
                  for (var b = -y2 + d3; b <= y2 - v3; b += 2) {
                    for (var m = a4 + b, C = (S = b === -y2 || b !== y2 && c4[m - 1] < c4[m + 1] ? c4[m + 1] : c4[m - 1] + 1) - b; S < i2 && C < o2 && t5.charAt(S) === r3.charAt(C); ) S++, C++;
                    if (c4[m] = S, S > i2) v3 += 2;
                    else if (C > o2) d3 += 2;
                    else if (p3 && (O = a4 + h4 - b) >= 0 && O < u4 && -1 !== l4[O] && S >= (A = i2 - l4[O])) return n2(t5, r3, S, C);
                  }
                  for (var E = -y2 + g2; E <= y2 - _2; E += 2) {
                    for (var A, O = a4 + E, w = (A = E === -y2 || E !== y2 && l4[O - 1] < l4[O + 1] ? l4[O + 1] : l4[O - 1] + 1) - E; A < i2 && w < o2 && t5.charAt(i2 - A - 1) === r3.charAt(o2 - w - 1); ) A++, w++;
                    if (l4[O] = A, A > i2) _2 += 2;
                    else if (w > o2) g2 += 2;
                    else if (!p3) {
                      var S;
                      if ((m = a4 + h4 - E) >= 0 && m < u4 && -1 !== c4[m]) {
                        if (C = a4 + (S = c4[m]) - m, S >= (A = i2 - A)) return n2(t5, r3, S, C);
                      }
                    }
                  }
                }
                return [[e2, t5], [1, r3]];
              })(t4, s2);
            })(t3 = t3.substring(0, t3.length - h2), a2 = a2.substring(0, a2.length - h2));
            return p && v.unshift([0, p]), d && v.push([0, d]), s(v, c2), v;
          }
          function n2(t3, e3, n3, i2) {
            var o2 = t3.substring(0, n3), s2 = e3.substring(0, i2), a2 = t3.substring(n3), u2 = e3.substring(i2), c2 = r2(o2, s2), l2 = r2(a2, u2);
            return c2.concat(l2);
          }
          function i(t3, e3) {
            if (!t3 || !e3 || t3.charAt(0) !== e3.charAt(0)) return 0;
            for (var r3 = 0, n3 = Math.min(t3.length, e3.length), i2 = n3, o2 = 0; r3 < i2; ) t3.substring(o2, i2) == e3.substring(o2, i2) ? o2 = r3 = i2 : n3 = i2, i2 = Math.floor((n3 - r3) / 2 + r3);
            return a(t3.charCodeAt(i2 - 1)) && i2--, i2;
          }
          function o(t3, e3) {
            if (!t3 || !e3 || t3.slice(-1) !== e3.slice(-1)) return 0;
            for (var r3 = 0, n3 = Math.min(t3.length, e3.length), i2 = n3, o2 = 0; r3 < i2; ) t3.substring(t3.length - i2, t3.length - o2) == e3.substring(e3.length - i2, e3.length - o2) ? o2 = r3 = i2 : n3 = i2, i2 = Math.floor((n3 - r3) / 2 + r3);
            return u(t3.charCodeAt(t3.length - i2)) && i2--, i2;
          }
          function s(t3, r3) {
            t3.push([0, ""]);
            for (var n3, a2 = 0, u2 = 0, f2 = 0, h2 = "", p = ""; a2 < t3.length; ) if (a2 < t3.length - 1 && !t3[a2][1]) t3.splice(a2, 1);
            else switch (t3[a2][0]) {
              case 1:
                f2++, p += t3[a2][1], a2++;
                break;
              case e2:
                u2++, h2 += t3[a2][1], a2++;
                break;
              case 0:
                var d = a2 - f2 - u2 - 1;
                if (r3) {
                  if (d >= 0 && l(t3[d][1])) {
                    var v = t3[d][1].slice(-1);
                    if (t3[d][1] = t3[d][1].slice(0, -1), h2 = v + h2, p = v + p, !t3[d][1]) {
                      t3.splice(d, 1), a2--;
                      var g = d - 1;
                      t3[g] && 1 === t3[g][0] && (f2++, p = t3[g][1] + p, g--), t3[g] && t3[g][0] === e2 && (u2++, h2 = t3[g][1] + h2, g--), d = g;
                    }
                  }
                  c(t3[a2][1]) && (v = t3[a2][1].charAt(0), t3[a2][1] = t3[a2][1].slice(1), h2 += v, p += v);
                }
                if (a2 < t3.length - 1 && !t3[a2][1]) {
                  t3.splice(a2, 1);
                  break;
                }
                if (h2.length > 0 || p.length > 0) {
                  h2.length > 0 && p.length > 0 && (0 !== (n3 = i(p, h2)) && (d >= 0 ? t3[d][1] += p.substring(0, n3) : (t3.splice(0, 0, [0, p.substring(0, n3)]), a2++), p = p.substring(n3), h2 = h2.substring(n3)), 0 !== (n3 = o(p, h2)) && (t3[a2][1] = p.substring(p.length - n3) + t3[a2][1], p = p.substring(0, p.length - n3), h2 = h2.substring(0, h2.length - n3)));
                  var _ = f2 + u2;
                  0 === h2.length && 0 === p.length ? (t3.splice(a2 - _, _), a2 -= _) : 0 === h2.length ? (t3.splice(a2 - _, _, [1, p]), a2 = a2 - _ + 1) : 0 === p.length ? (t3.splice(a2 - _, _, [e2, h2]), a2 = a2 - _ + 1) : (t3.splice(a2 - _, _, [e2, h2], [1, p]), a2 = a2 - _ + 2);
                }
                0 !== a2 && 0 === t3[a2 - 1][0] ? (t3[a2 - 1][1] += t3[a2][1], t3.splice(a2, 1)) : a2++, f2 = 0, u2 = 0, h2 = "", p = "";
            }
            "" === t3[t3.length - 1][1] && t3.pop();
            var y = false;
            for (a2 = 1; a2 < t3.length - 1; ) 0 === t3[a2 - 1][0] && 0 === t3[a2 + 1][0] && (t3[a2][1].substring(t3[a2][1].length - t3[a2 - 1][1].length) === t3[a2 - 1][1] ? (t3[a2][1] = t3[a2 - 1][1] + t3[a2][1].substring(0, t3[a2][1].length - t3[a2 - 1][1].length), t3[a2 + 1][1] = t3[a2 - 1][1] + t3[a2 + 1][1], t3.splice(a2 - 1, 1), y = true) : t3[a2][1].substring(0, t3[a2 + 1][1].length) == t3[a2 + 1][1] && (t3[a2 - 1][1] += t3[a2 + 1][1], t3[a2][1] = t3[a2][1].substring(t3[a2 + 1][1].length) + t3[a2 + 1][1], t3.splice(a2 + 1, 1), y = true)), a2++;
            y && s(t3, r3);
          }
          function a(t3) {
            return t3 >= 55296 && t3 <= 56319;
          }
          function u(t3) {
            return t3 >= 56320 && t3 <= 57343;
          }
          function c(t3) {
            return u(t3.charCodeAt(0));
          }
          function l(t3) {
            return a(t3.charCodeAt(t3.length - 1));
          }
          function f(t3, r3, n3, i2) {
            return l(t3) || c(i2) ? null : (function(t4) {
              for (var e3 = [], r4 = 0; r4 < t4.length; r4++) t4[r4][1].length > 0 && e3.push(t4[r4]);
              return e3;
            })([[0, t3], [e2, r3], [1, n3], [0, i2]]);
          }
          function h(t3, e3, n3) {
            return r2(t3, e3, n3, true);
          }
          h.INSERT = 1, h.DELETE = e2, h.EQUAL = 0, t2.exports = h;
        }, 465: (t2, e2, r2) => {
          t2 = r2.nmd(t2);
          var n2 = "__lodash_hash_undefined__", i = 9007199254740991, o = "[object Arguments]", s = "[object Boolean]", a = "[object Date]", u = "[object Function]", c = "[object GeneratorFunction]", l = "[object Map]", f = "[object Number]", h = "[object Object]", p = "[object Promise]", d = "[object RegExp]", v = "[object Set]", g = "[object String]", _ = "[object Symbol]", y = "[object WeakMap]", b = "[object ArrayBuffer]", m = "[object DataView]", C = "[object Float32Array]", E = "[object Float64Array]", A = "[object Int8Array]", O = "[object Int16Array]", w = "[object Int32Array]", S = "[object Uint8Array]", j = "[object Uint8ClampedArray]", x = "[object Uint16Array]", L = "[object Uint32Array]", T = /\w*$/, M = /^\[object .+?Constructor\]$/, N = /^(?:0|[1-9]\d*)$/, R = {};
          R[o] = R["[object Array]"] = R[b] = R[m] = R[s] = R[a] = R[C] = R[E] = R[A] = R[O] = R[w] = R[l] = R[f] = R[h] = R[d] = R[v] = R[g] = R[_] = R[S] = R[j] = R[x] = R[L] = true, R["[object Error]"] = R[u] = R[y] = false;
          var k = "object" == typeof r2.g && r2.g && r2.g.Object === Object && r2.g, D = "object" == typeof self && self && self.Object === Object && self, q = k || D || Function("return this")(), I = e2 && !e2.nodeType && e2, B = I && t2 && !t2.nodeType && t2, z = B && B.exports === I;
          function P(t3, e3) {
            return t3.set(e3[0], e3[1]), t3;
          }
          function F(t3, e3) {
            return t3.add(e3), t3;
          }
          function U(t3, e3, r3, n3) {
            var i2 = -1, o2 = t3 ? t3.length : 0;
            for (n3 && o2 && (r3 = t3[++i2]); ++i2 < o2; ) r3 = e3(r3, t3[i2], i2, t3);
            return r3;
          }
          function G(t3) {
            var e3 = false;
            if (null != t3 && "function" != typeof t3.toString) try {
              e3 = !!(t3 + "");
            } catch (t4) {
            }
            return e3;
          }
          function H(t3) {
            var e3 = -1, r3 = Array(t3.size);
            return t3.forEach((function(t4, n3) {
              r3[++e3] = [n3, t4];
            })), r3;
          }
          function $2(t3, e3) {
            return function(r3) {
              return t3(e3(r3));
            };
          }
          function V(t3) {
            var e3 = -1, r3 = Array(t3.size);
            return t3.forEach((function(t4) {
              r3[++e3] = t4;
            })), r3;
          }
          var W, Q = Array.prototype, X = Function.prototype, Z = Object.prototype, Y = q["__core-js_shared__"], K = (W = /[^.]+$/.exec(Y && Y.keys && Y.keys.IE_PROTO || "")) ? "Symbol(src)_1." + W : "", J = X.toString, tt = Z.hasOwnProperty, et = Z.toString, rt = RegExp("^" + J.call(tt).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), nt = z ? q.Buffer : void 0, it = q.Symbol, ot = q.Uint8Array, st = $2(Object.getPrototypeOf, Object), at = Object.create, ut = Z.propertyIsEnumerable, ct = Q.splice, lt = Object.getOwnPropertySymbols, ft = nt ? nt.isBuffer : void 0, ht = $2(Object.keys, Object), pt = qt(q, "DataView"), dt = qt(q, "Map"), vt = qt(q, "Promise"), gt = qt(q, "Set"), _t2 = qt(q, "WeakMap"), yt = qt(Object, "create"), bt = Ft(pt), mt = Ft(dt), Ct = Ft(vt), Et = Ft(gt), At = Ft(_t2), Ot = it ? it.prototype : void 0, wt = Ot ? Ot.valueOf : void 0;
          function St(t3) {
            var e3 = -1, r3 = t3 ? t3.length : 0;
            for (this.clear(); ++e3 < r3; ) {
              var n3 = t3[e3];
              this.set(n3[0], n3[1]);
            }
          }
          function jt(t3) {
            var e3 = -1, r3 = t3 ? t3.length : 0;
            for (this.clear(); ++e3 < r3; ) {
              var n3 = t3[e3];
              this.set(n3[0], n3[1]);
            }
          }
          function xt(t3) {
            var e3 = -1, r3 = t3 ? t3.length : 0;
            for (this.clear(); ++e3 < r3; ) {
              var n3 = t3[e3];
              this.set(n3[0], n3[1]);
            }
          }
          function Lt(t3) {
            this.__data__ = new jt(t3);
          }
          function Tt(t3, e3, r3) {
            var n3 = t3[e3];
            tt.call(t3, e3) && Ut(n3, r3) && (void 0 !== r3 || e3 in t3) || (t3[e3] = r3);
          }
          function Mt(t3, e3) {
            for (var r3 = t3.length; r3--; ) if (Ut(t3[r3][0], e3)) return r3;
            return -1;
          }
          function Nt(t3, e3, r3, n3, i2, p2, y2) {
            var M2;
            if (n3 && (M2 = p2 ? n3(t3, i2, p2, y2) : n3(t3)), void 0 !== M2) return M2;
            if (!Wt(t3)) return t3;
            var N2 = Gt(t3);
            if (N2) {
              if (M2 = (function(t4) {
                var e4 = t4.length, r4 = t4.constructor(e4);
                return e4 && "string" == typeof t4[0] && tt.call(t4, "index") && (r4.index = t4.index, r4.input = t4.input), r4;
              })(t3), !e3) return (function(t4, e4) {
                var r4 = -1, n4 = t4.length;
                for (e4 || (e4 = Array(n4)); ++r4 < n4; ) e4[r4] = t4[r4];
                return e4;
              })(t3, M2);
            } else {
              var k2 = Bt(t3), D2 = k2 == u || k2 == c;
              if ($t(t3)) return (function(t4, e4) {
                if (e4) return t4.slice();
                var r4 = new t4.constructor(t4.length);
                return t4.copy(r4), r4;
              })(t3, e3);
              if (k2 == h || k2 == o || D2 && !p2) {
                if (G(t3)) return p2 ? t3 : {};
                if (M2 = (function(t4) {
                  return "function" != typeof t4.constructor || Pt(t4) ? {} : Wt(e4 = st(t4)) ? at(e4) : {};
                  var e4;
                })(D2 ? {} : t3), !e3) return (function(t4, e4) {
                  return kt(t4, It(t4), e4);
                })(t3, (function(t4, e4) {
                  return t4 && kt(e4, Qt(e4), t4);
                })(M2, t3));
              } else {
                if (!R[k2]) return p2 ? t3 : {};
                M2 = (function(t4, e4, r4, n4) {
                  var i3, o2 = t4.constructor;
                  switch (e4) {
                    case b:
                      return Rt(t4);
                    case s:
                    case a:
                      return new o2(+t4);
                    case m:
                      return (function(t5, e5) {
                        var r5 = e5 ? Rt(t5.buffer) : t5.buffer;
                        return new t5.constructor(r5, t5.byteOffset, t5.byteLength);
                      })(t4, n4);
                    case C:
                    case E:
                    case A:
                    case O:
                    case w:
                    case S:
                    case j:
                    case x:
                    case L:
                      return (function(t5, e5) {
                        var r5 = e5 ? Rt(t5.buffer) : t5.buffer;
                        return new t5.constructor(r5, t5.byteOffset, t5.length);
                      })(t4, n4);
                    case l:
                      return (function(t5, e5, r5) {
                        return U(e5 ? r5(H(t5), true) : H(t5), P, new t5.constructor());
                      })(t4, n4, r4);
                    case f:
                    case g:
                      return new o2(t4);
                    case d:
                      return (function(t5) {
                        var e5 = new t5.constructor(t5.source, T.exec(t5));
                        return e5.lastIndex = t5.lastIndex, e5;
                      })(t4);
                    case v:
                      return (function(t5, e5, r5) {
                        return U(e5 ? r5(V(t5), true) : V(t5), F, new t5.constructor());
                      })(t4, n4, r4);
                    case _:
                      return i3 = t4, wt ? Object(wt.call(i3)) : {};
                  }
                })(t3, k2, Nt, e3);
              }
            }
            y2 || (y2 = new Lt());
            var q2 = y2.get(t3);
            if (q2) return q2;
            if (y2.set(t3, M2), !N2) var I2 = r3 ? (function(t4) {
              return (function(t5, e4, r4) {
                var n4 = e4(t5);
                return Gt(t5) ? n4 : (function(t6, e5) {
                  for (var r5 = -1, n5 = e5.length, i3 = t6.length; ++r5 < n5; ) t6[i3 + r5] = e5[r5];
                  return t6;
                })(n4, r4(t5));
              })(t4, Qt, It);
            })(t3) : Qt(t3);
            return (function(t4, e4) {
              for (var r4 = -1, n4 = t4 ? t4.length : 0; ++r4 < n4 && false !== e4(t4[r4], r4); ) ;
            })(I2 || t3, (function(i3, o2) {
              I2 && (i3 = t3[o2 = i3]), Tt(M2, o2, Nt(i3, e3, r3, n3, o2, t3, y2));
            })), M2;
          }
          function Rt(t3) {
            var e3 = new t3.constructor(t3.byteLength);
            return new ot(e3).set(new ot(t3)), e3;
          }
          function kt(t3, e3, r3, n3) {
            r3 || (r3 = {});
            for (var i2 = -1, o2 = e3.length; ++i2 < o2; ) {
              var s2 = e3[i2], a2 = n3 ? n3(r3[s2], t3[s2], s2, r3, t3) : void 0;
              Tt(r3, s2, void 0 === a2 ? t3[s2] : a2);
            }
            return r3;
          }
          function Dt(t3, e3) {
            var r3, n3, i2 = t3.__data__;
            return ("string" == (n3 = typeof (r3 = e3)) || "number" == n3 || "symbol" == n3 || "boolean" == n3 ? "__proto__" !== r3 : null === r3) ? i2["string" == typeof e3 ? "string" : "hash"] : i2.map;
          }
          function qt(t3, e3) {
            var r3 = (function(t4, e4) {
              return null == t4 ? void 0 : t4[e4];
            })(t3, e3);
            return (function(t4) {
              return !(!Wt(t4) || (e4 = t4, K && K in e4)) && (Vt(t4) || G(t4) ? rt : M).test(Ft(t4));
              var e4;
            })(r3) ? r3 : void 0;
          }
          St.prototype.clear = function() {
            this.__data__ = yt ? yt(null) : {};
          }, St.prototype.delete = function(t3) {
            return this.has(t3) && delete this.__data__[t3];
          }, St.prototype.get = function(t3) {
            var e3 = this.__data__;
            if (yt) {
              var r3 = e3[t3];
              return r3 === n2 ? void 0 : r3;
            }
            return tt.call(e3, t3) ? e3[t3] : void 0;
          }, St.prototype.has = function(t3) {
            var e3 = this.__data__;
            return yt ? void 0 !== e3[t3] : tt.call(e3, t3);
          }, St.prototype.set = function(t3, e3) {
            return this.__data__[t3] = yt && void 0 === e3 ? n2 : e3, this;
          }, jt.prototype.clear = function() {
            this.__data__ = [];
          }, jt.prototype.delete = function(t3) {
            var e3 = this.__data__, r3 = Mt(e3, t3);
            return !(r3 < 0 || (r3 == e3.length - 1 ? e3.pop() : ct.call(e3, r3, 1), 0));
          }, jt.prototype.get = function(t3) {
            var e3 = this.__data__, r3 = Mt(e3, t3);
            return r3 < 0 ? void 0 : e3[r3][1];
          }, jt.prototype.has = function(t3) {
            return Mt(this.__data__, t3) > -1;
          }, jt.prototype.set = function(t3, e3) {
            var r3 = this.__data__, n3 = Mt(r3, t3);
            return n3 < 0 ? r3.push([t3, e3]) : r3[n3][1] = e3, this;
          }, xt.prototype.clear = function() {
            this.__data__ = { hash: new St(), map: new (dt || jt)(), string: new St() };
          }, xt.prototype.delete = function(t3) {
            return Dt(this, t3).delete(t3);
          }, xt.prototype.get = function(t3) {
            return Dt(this, t3).get(t3);
          }, xt.prototype.has = function(t3) {
            return Dt(this, t3).has(t3);
          }, xt.prototype.set = function(t3, e3) {
            return Dt(this, t3).set(t3, e3), this;
          }, Lt.prototype.clear = function() {
            this.__data__ = new jt();
          }, Lt.prototype.delete = function(t3) {
            return this.__data__.delete(t3);
          }, Lt.prototype.get = function(t3) {
            return this.__data__.get(t3);
          }, Lt.prototype.has = function(t3) {
            return this.__data__.has(t3);
          }, Lt.prototype.set = function(t3, e3) {
            var r3 = this.__data__;
            if (r3 instanceof jt) {
              var n3 = r3.__data__;
              if (!dt || n3.length < 199) return n3.push([t3, e3]), this;
              r3 = this.__data__ = new xt(n3);
            }
            return r3.set(t3, e3), this;
          };
          var It = lt ? $2(lt, Object) : function() {
            return [];
          }, Bt = function(t3) {
            return et.call(t3);
          };
          function zt(t3, e3) {
            return !!(e3 = null == e3 ? i : e3) && ("number" == typeof t3 || N.test(t3)) && t3 > -1 && t3 % 1 == 0 && t3 < e3;
          }
          function Pt(t3) {
            var e3 = t3 && t3.constructor;
            return t3 === ("function" == typeof e3 && e3.prototype || Z);
          }
          function Ft(t3) {
            if (null != t3) {
              try {
                return J.call(t3);
              } catch (t4) {
              }
              try {
                return t3 + "";
              } catch (t4) {
              }
            }
            return "";
          }
          function Ut(t3, e3) {
            return t3 === e3 || t3 != t3 && e3 != e3;
          }
          (pt && Bt(new pt(new ArrayBuffer(1))) != m || dt && Bt(new dt()) != l || vt && Bt(vt.resolve()) != p || gt && Bt(new gt()) != v || _t2 && Bt(new _t2()) != y) && (Bt = function(t3) {
            var e3 = et.call(t3), r3 = e3 == h ? t3.constructor : void 0, n3 = r3 ? Ft(r3) : void 0;
            if (n3) switch (n3) {
              case bt:
                return m;
              case mt:
                return l;
              case Ct:
                return p;
              case Et:
                return v;
              case At:
                return y;
            }
            return e3;
          });
          var Gt = Array.isArray;
          function Ht(t3) {
            return null != t3 && (function(t4) {
              return "number" == typeof t4 && t4 > -1 && t4 % 1 == 0 && t4 <= i;
            })(t3.length) && !Vt(t3);
          }
          var $t = ft || function() {
            return false;
          };
          function Vt(t3) {
            var e3 = Wt(t3) ? et.call(t3) : "";
            return e3 == u || e3 == c;
          }
          function Wt(t3) {
            var e3 = typeof t3;
            return !!t3 && ("object" == e3 || "function" == e3);
          }
          function Qt(t3) {
            return Ht(t3) ? (function(t4, e3) {
              var r3 = Gt(t4) || (function(t5) {
                return (function(t6) {
                  return /* @__PURE__ */ (function(t7) {
                    return !!t7 && "object" == typeof t7;
                  })(t6) && Ht(t6);
                })(t5) && tt.call(t5, "callee") && (!ut.call(t5, "callee") || et.call(t5) == o);
              })(t4) ? (function(t5, e4) {
                for (var r4 = -1, n4 = Array(t5); ++r4 < t5; ) n4[r4] = e4(r4);
                return n4;
              })(t4.length, String) : [], n3 = r3.length, i2 = !!n3;
              for (var s2 in t4) !e3 && !tt.call(t4, s2) || i2 && ("length" == s2 || zt(s2, n3)) || r3.push(s2);
              return r3;
            })(t3) : (function(t4) {
              if (!Pt(t4)) return ht(t4);
              var e3 = [];
              for (var r3 in Object(t4)) tt.call(t4, r3) && "constructor" != r3 && e3.push(r3);
              return e3;
            })(t3);
          }
          t2.exports = function(t3) {
            return Nt(t3, true, true);
          };
        }, 307: (t2, e2, r2) => {
          t2 = r2.nmd(t2);
          var n2 = "__lodash_hash_undefined__", i = 9007199254740991, o = "[object Arguments]", s = "[object Array]", a = "[object Boolean]", u = "[object Date]", c = "[object Error]", l = "[object Function]", f = "[object Map]", h = "[object Number]", p = "[object Object]", d = "[object Promise]", v = "[object RegExp]", g = "[object Set]", _ = "[object String]", y = "[object WeakMap]", b = "[object ArrayBuffer]", m = "[object DataView]", C = /^\[object .+?Constructor\]$/, E = /^(?:0|[1-9]\d*)$/, A = {};
          A["[object Float32Array]"] = A["[object Float64Array]"] = A["[object Int8Array]"] = A["[object Int16Array]"] = A["[object Int32Array]"] = A["[object Uint8Array]"] = A["[object Uint8ClampedArray]"] = A["[object Uint16Array]"] = A["[object Uint32Array]"] = true, A[o] = A[s] = A[b] = A[a] = A[m] = A[u] = A[c] = A[l] = A[f] = A[h] = A[p] = A[v] = A[g] = A[_] = A[y] = false;
          var O = "object" == typeof r2.g && r2.g && r2.g.Object === Object && r2.g, w = "object" == typeof self && self && self.Object === Object && self, S = O || w || Function("return this")(), j = e2 && !e2.nodeType && e2, x = j && t2 && !t2.nodeType && t2, L = x && x.exports === j, T = L && O.process, M = (function() {
            try {
              return T && T.binding && T.binding("util");
            } catch (t3) {
            }
          })(), N = M && M.isTypedArray;
          function R(t3, e3) {
            for (var r3 = -1, n3 = null == t3 ? 0 : t3.length; ++r3 < n3; ) if (e3(t3[r3], r3, t3)) return true;
            return false;
          }
          function k(t3) {
            var e3 = -1, r3 = Array(t3.size);
            return t3.forEach((function(t4, n3) {
              r3[++e3] = [n3, t4];
            })), r3;
          }
          function D(t3) {
            var e3 = -1, r3 = Array(t3.size);
            return t3.forEach((function(t4) {
              r3[++e3] = t4;
            })), r3;
          }
          var q, I, B, z = Array.prototype, P = Function.prototype, F = Object.prototype, U = S["__core-js_shared__"], G = P.toString, H = F.hasOwnProperty, $2 = (q = /[^.]+$/.exec(U && U.keys && U.keys.IE_PROTO || "")) ? "Symbol(src)_1." + q : "", V = F.toString, W = RegExp("^" + G.call(H).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Q = L ? S.Buffer : void 0, X = S.Symbol, Z = S.Uint8Array, Y = F.propertyIsEnumerable, K = z.splice, J = X ? X.toStringTag : void 0, tt = Object.getOwnPropertySymbols, et = Q ? Q.isBuffer : void 0, rt = (I = Object.keys, B = Object, function(t3) {
            return I(B(t3));
          }), nt = xt(S, "DataView"), it = xt(S, "Map"), ot = xt(S, "Promise"), st = xt(S, "Set"), at = xt(S, "WeakMap"), ut = xt(Object, "create"), ct = Nt(nt), lt = Nt(it), ft = Nt(ot), ht = Nt(st), pt = Nt(at), dt = X ? X.prototype : void 0, vt = dt ? dt.valueOf : void 0;
          function gt(t3) {
            var e3 = -1, r3 = null == t3 ? 0 : t3.length;
            for (this.clear(); ++e3 < r3; ) {
              var n3 = t3[e3];
              this.set(n3[0], n3[1]);
            }
          }
          function _t2(t3) {
            var e3 = -1, r3 = null == t3 ? 0 : t3.length;
            for (this.clear(); ++e3 < r3; ) {
              var n3 = t3[e3];
              this.set(n3[0], n3[1]);
            }
          }
          function yt(t3) {
            var e3 = -1, r3 = null == t3 ? 0 : t3.length;
            for (this.clear(); ++e3 < r3; ) {
              var n3 = t3[e3];
              this.set(n3[0], n3[1]);
            }
          }
          function bt(t3) {
            var e3 = -1, r3 = null == t3 ? 0 : t3.length;
            for (this.__data__ = new yt(); ++e3 < r3; ) this.add(t3[e3]);
          }
          function mt(t3) {
            var e3 = this.__data__ = new _t2(t3);
            this.size = e3.size;
          }
          function Ct(t3, e3) {
            for (var r3 = t3.length; r3--; ) if (Rt(t3[r3][0], e3)) return r3;
            return -1;
          }
          function Et(t3) {
            return null == t3 ? void 0 === t3 ? "[object Undefined]" : "[object Null]" : J && J in Object(t3) ? (function(t4) {
              var e3 = H.call(t4, J), r3 = t4[J];
              try {
                t4[J] = void 0;
                var n3 = true;
              } catch (t5) {
              }
              var i2 = V.call(t4);
              return n3 && (e3 ? t4[J] = r3 : delete t4[J]), i2;
            })(t3) : (function(t4) {
              return V.call(t4);
            })(t3);
          }
          function At(t3) {
            return Pt(t3) && Et(t3) == o;
          }
          function Ot(t3, e3, r3, n3, i2) {
            return t3 === e3 || (null == t3 || null == e3 || !Pt(t3) && !Pt(e3) ? t3 != t3 && e3 != e3 : (function(t4, e4, r4, n4, i3, l2) {
              var d2 = Dt(t4), y2 = Dt(e4), C2 = d2 ? s : Tt(t4), E2 = y2 ? s : Tt(e4), A2 = (C2 = C2 == o ? p : C2) == p, O2 = (E2 = E2 == o ? p : E2) == p, w2 = C2 == E2;
              if (w2 && qt(t4)) {
                if (!qt(e4)) return false;
                d2 = true, A2 = false;
              }
              if (w2 && !A2) return l2 || (l2 = new mt()), d2 || Ft(t4) ? wt(t4, e4, r4, n4, i3, l2) : (function(t5, e5, r5, n5, i4, o2, s2) {
                switch (r5) {
                  case m:
                    if (t5.byteLength != e5.byteLength || t5.byteOffset != e5.byteOffset) return false;
                    t5 = t5.buffer, e5 = e5.buffer;
                  case b:
                    return !(t5.byteLength != e5.byteLength || !o2(new Z(t5), new Z(e5)));
                  case a:
                  case u:
                  case h:
                    return Rt(+t5, +e5);
                  case c:
                    return t5.name == e5.name && t5.message == e5.message;
                  case v:
                  case _:
                    return t5 == e5 + "";
                  case f:
                    var l3 = k;
                  case g:
                    var p2 = 1 & n5;
                    if (l3 || (l3 = D), t5.size != e5.size && !p2) return false;
                    var d3 = s2.get(t5);
                    if (d3) return d3 == e5;
                    n5 |= 2, s2.set(t5, e5);
                    var y3 = wt(l3(t5), l3(e5), n5, i4, o2, s2);
                    return s2.delete(t5), y3;
                  case "[object Symbol]":
                    if (vt) return vt.call(t5) == vt.call(e5);
                }
                return false;
              })(t4, e4, C2, r4, n4, i3, l2);
              if (!(1 & r4)) {
                var S2 = A2 && H.call(t4, "__wrapped__"), j2 = O2 && H.call(e4, "__wrapped__");
                if (S2 || j2) {
                  var x2 = S2 ? t4.value() : t4, L2 = j2 ? e4.value() : e4;
                  return l2 || (l2 = new mt()), i3(x2, L2, r4, n4, l2);
                }
              }
              return !!w2 && (l2 || (l2 = new mt()), (function(t5, e5, r5, n5, i4, o2) {
                var s2 = 1 & r5, a2 = St(t5), u2 = a2.length;
                if (u2 != St(e5).length && !s2) return false;
                for (var c2 = u2; c2--; ) {
                  var l3 = a2[c2];
                  if (!(s2 ? l3 in e5 : H.call(e5, l3))) return false;
                }
                var f2 = o2.get(t5);
                if (f2 && o2.get(e5)) return f2 == e5;
                var h2 = true;
                o2.set(t5, e5), o2.set(e5, t5);
                for (var p2 = s2; ++c2 < u2; ) {
                  var d3 = t5[l3 = a2[c2]], v2 = e5[l3];
                  if (n5) var g2 = s2 ? n5(v2, d3, l3, e5, t5, o2) : n5(d3, v2, l3, t5, e5, o2);
                  if (!(void 0 === g2 ? d3 === v2 || i4(d3, v2, r5, n5, o2) : g2)) {
                    h2 = false;
                    break;
                  }
                  p2 || (p2 = "constructor" == l3);
                }
                if (h2 && !p2) {
                  var _2 = t5.constructor, y3 = e5.constructor;
                  _2 == y3 || !("constructor" in t5) || !("constructor" in e5) || "function" == typeof _2 && _2 instanceof _2 && "function" == typeof y3 && y3 instanceof y3 || (h2 = false);
                }
                return o2.delete(t5), o2.delete(e5), h2;
              })(t4, e4, r4, n4, i3, l2));
            })(t3, e3, r3, n3, Ot, i2));
          }
          function wt(t3, e3, r3, n3, i2, o2) {
            var s2 = 1 & r3, a2 = t3.length, u2 = e3.length;
            if (a2 != u2 && !(s2 && u2 > a2)) return false;
            var c2 = o2.get(t3);
            if (c2 && o2.get(e3)) return c2 == e3;
            var l2 = -1, f2 = true, h2 = 2 & r3 ? new bt() : void 0;
            for (o2.set(t3, e3), o2.set(e3, t3); ++l2 < a2; ) {
              var p2 = t3[l2], d2 = e3[l2];
              if (n3) var v2 = s2 ? n3(d2, p2, l2, e3, t3, o2) : n3(p2, d2, l2, t3, e3, o2);
              if (void 0 !== v2) {
                if (v2) continue;
                f2 = false;
                break;
              }
              if (h2) {
                if (!R(e3, (function(t4, e4) {
                  if (s3 = e4, !h2.has(s3) && (p2 === t4 || i2(p2, t4, r3, n3, o2))) return h2.push(e4);
                  var s3;
                }))) {
                  f2 = false;
                  break;
                }
              } else if (p2 !== d2 && !i2(p2, d2, r3, n3, o2)) {
                f2 = false;
                break;
              }
            }
            return o2.delete(t3), o2.delete(e3), f2;
          }
          function St(t3) {
            return (function(t4, e3, r3) {
              var n3 = e3(t4);
              return Dt(t4) ? n3 : (function(t5, e4) {
                for (var r4 = -1, n4 = e4.length, i2 = t5.length; ++r4 < n4; ) t5[i2 + r4] = e4[r4];
                return t5;
              })(n3, r3(t4));
            })(t3, Ut, Lt);
          }
          function jt(t3, e3) {
            var r3, n3, i2 = t3.__data__;
            return ("string" == (n3 = typeof (r3 = e3)) || "number" == n3 || "symbol" == n3 || "boolean" == n3 ? "__proto__" !== r3 : null === r3) ? i2["string" == typeof e3 ? "string" : "hash"] : i2.map;
          }
          function xt(t3, e3) {
            var r3 = (function(t4, e4) {
              return null == t4 ? void 0 : t4[e4];
            })(t3, e3);
            return (function(t4) {
              return !(!zt(t4) || (function(t5) {
                return !!$2 && $2 in t5;
              })(t4)) && (It(t4) ? W : C).test(Nt(t4));
            })(r3) ? r3 : void 0;
          }
          gt.prototype.clear = function() {
            this.__data__ = ut ? ut(null) : {}, this.size = 0;
          }, gt.prototype.delete = function(t3) {
            var e3 = this.has(t3) && delete this.__data__[t3];
            return this.size -= e3 ? 1 : 0, e3;
          }, gt.prototype.get = function(t3) {
            var e3 = this.__data__;
            if (ut) {
              var r3 = e3[t3];
              return r3 === n2 ? void 0 : r3;
            }
            return H.call(e3, t3) ? e3[t3] : void 0;
          }, gt.prototype.has = function(t3) {
            var e3 = this.__data__;
            return ut ? void 0 !== e3[t3] : H.call(e3, t3);
          }, gt.prototype.set = function(t3, e3) {
            var r3 = this.__data__;
            return this.size += this.has(t3) ? 0 : 1, r3[t3] = ut && void 0 === e3 ? n2 : e3, this;
          }, _t2.prototype.clear = function() {
            this.__data__ = [], this.size = 0;
          }, _t2.prototype.delete = function(t3) {
            var e3 = this.__data__, r3 = Ct(e3, t3);
            return !(r3 < 0 || (r3 == e3.length - 1 ? e3.pop() : K.call(e3, r3, 1), --this.size, 0));
          }, _t2.prototype.get = function(t3) {
            var e3 = this.__data__, r3 = Ct(e3, t3);
            return r3 < 0 ? void 0 : e3[r3][1];
          }, _t2.prototype.has = function(t3) {
            return Ct(this.__data__, t3) > -1;
          }, _t2.prototype.set = function(t3, e3) {
            var r3 = this.__data__, n3 = Ct(r3, t3);
            return n3 < 0 ? (++this.size, r3.push([t3, e3])) : r3[n3][1] = e3, this;
          }, yt.prototype.clear = function() {
            this.size = 0, this.__data__ = { hash: new gt(), map: new (it || _t2)(), string: new gt() };
          }, yt.prototype.delete = function(t3) {
            var e3 = jt(this, t3).delete(t3);
            return this.size -= e3 ? 1 : 0, e3;
          }, yt.prototype.get = function(t3) {
            return jt(this, t3).get(t3);
          }, yt.prototype.has = function(t3) {
            return jt(this, t3).has(t3);
          }, yt.prototype.set = function(t3, e3) {
            var r3 = jt(this, t3), n3 = r3.size;
            return r3.set(t3, e3), this.size += r3.size == n3 ? 0 : 1, this;
          }, bt.prototype.add = bt.prototype.push = function(t3) {
            return this.__data__.set(t3, n2), this;
          }, bt.prototype.has = function(t3) {
            return this.__data__.has(t3);
          }, mt.prototype.clear = function() {
            this.__data__ = new _t2(), this.size = 0;
          }, mt.prototype.delete = function(t3) {
            var e3 = this.__data__, r3 = e3.delete(t3);
            return this.size = e3.size, r3;
          }, mt.prototype.get = function(t3) {
            return this.__data__.get(t3);
          }, mt.prototype.has = function(t3) {
            return this.__data__.has(t3);
          }, mt.prototype.set = function(t3, e3) {
            var r3 = this.__data__;
            if (r3 instanceof _t2) {
              var n3 = r3.__data__;
              if (!it || n3.length < 199) return n3.push([t3, e3]), this.size = ++r3.size, this;
              r3 = this.__data__ = new yt(n3);
            }
            return r3.set(t3, e3), this.size = r3.size, this;
          };
          var Lt = tt ? function(t3) {
            return null == t3 ? [] : (t3 = Object(t3), (function(e3, r3) {
              for (var n3 = -1, i2 = null == e3 ? 0 : e3.length, o2 = 0, s2 = []; ++n3 < i2; ) {
                var a2 = e3[n3];
                u2 = a2, Y.call(t3, u2) && (s2[o2++] = a2);
              }
              var u2;
              return s2;
            })(tt(t3)));
          } : function() {
            return [];
          }, Tt = Et;
          function Mt(t3, e3) {
            return !!(e3 = null == e3 ? i : e3) && ("number" == typeof t3 || E.test(t3)) && t3 > -1 && t3 % 1 == 0 && t3 < e3;
          }
          function Nt(t3) {
            if (null != t3) {
              try {
                return G.call(t3);
              } catch (t4) {
              }
              try {
                return t3 + "";
              } catch (t4) {
              }
            }
            return "";
          }
          function Rt(t3, e3) {
            return t3 === e3 || t3 != t3 && e3 != e3;
          }
          (nt && Tt(new nt(new ArrayBuffer(1))) != m || it && Tt(new it()) != f || ot && Tt(ot.resolve()) != d || st && Tt(new st()) != g || at && Tt(new at()) != y) && (Tt = function(t3) {
            var e3 = Et(t3), r3 = e3 == p ? t3.constructor : void 0, n3 = r3 ? Nt(r3) : "";
            if (n3) switch (n3) {
              case ct:
                return m;
              case lt:
                return f;
              case ft:
                return d;
              case ht:
                return g;
              case pt:
                return y;
            }
            return e3;
          });
          var kt = At(/* @__PURE__ */ (function() {
            return arguments;
          })()) ? At : function(t3) {
            return Pt(t3) && H.call(t3, "callee") && !Y.call(t3, "callee");
          }, Dt = Array.isArray, qt = et || function() {
            return false;
          };
          function It(t3) {
            if (!zt(t3)) return false;
            var e3 = Et(t3);
            return e3 == l || "[object GeneratorFunction]" == e3 || "[object AsyncFunction]" == e3 || "[object Proxy]" == e3;
          }
          function Bt(t3) {
            return "number" == typeof t3 && t3 > -1 && t3 % 1 == 0 && t3 <= i;
          }
          function zt(t3) {
            var e3 = typeof t3;
            return null != t3 && ("object" == e3 || "function" == e3);
          }
          function Pt(t3) {
            return null != t3 && "object" == typeof t3;
          }
          var Ft = N ? /* @__PURE__ */ (function(t3) {
            return function(e3) {
              return t3(e3);
            };
          })(N) : function(t3) {
            return Pt(t3) && Bt(t3.length) && !!A[Et(t3)];
          };
          function Ut(t3) {
            return null != (e3 = t3) && Bt(e3.length) && !It(e3) ? (function(t4, e4) {
              var r3 = Dt(t4), n3 = !r3 && kt(t4), i2 = !r3 && !n3 && qt(t4), o2 = !r3 && !n3 && !i2 && Ft(t4), s2 = r3 || n3 || i2 || o2, a2 = s2 ? (function(t5, e5) {
                for (var r4 = -1, n4 = Array(t5); ++r4 < t5; ) n4[r4] = e5(r4);
                return n4;
              })(t4.length, String) : [], u2 = a2.length;
              for (var c2 in t4) !e4 && !H.call(t4, c2) || s2 && ("length" == c2 || i2 && ("offset" == c2 || "parent" == c2) || o2 && ("buffer" == c2 || "byteLength" == c2 || "byteOffset" == c2) || Mt(c2, u2)) || a2.push(c2);
              return a2;
            })(t3) : (function(t4) {
              if (r3 = (e4 = t4) && e4.constructor, e4 !== ("function" == typeof r3 && r3.prototype || F)) return rt(t4);
              var e4, r3, n3 = [];
              for (var i2 in Object(t4)) H.call(t4, i2) && "constructor" != i2 && n3.push(i2);
              return n3;
            })(t3);
            var e3;
          }
          t2.exports = function(t3, e3) {
            return Ot(t3, e3);
          };
        }, 210: function(t2, e2, r2) {
          "use strict";
          var n2 = this && this.__importDefault || function(t3) {
            return t3 && t3.__esModule ? t3 : { default: t3 };
          };
          Object.defineProperty(e2, "__esModule", { value: true });
          var i, o = n2(r2(465)), s = n2(r2(307));
          !(function(t3) {
            t3.compose = function(t4, e3, r3) {
              void 0 === t4 && (t4 = {}), void 0 === e3 && (e3 = {}), "object" != typeof t4 && (t4 = {}), "object" != typeof e3 && (e3 = {});
              var n3 = o.default(e3);
              for (var i2 in r3 || (n3 = Object.keys(n3).reduce((function(t5, e4) {
                return null != n3[e4] && (t5[e4] = n3[e4]), t5;
              }), {})), t4) void 0 !== t4[i2] && void 0 === e3[i2] && (n3[i2] = t4[i2]);
              return Object.keys(n3).length > 0 ? n3 : void 0;
            }, t3.diff = function(t4, e3) {
              void 0 === t4 && (t4 = {}), void 0 === e3 && (e3 = {}), "object" != typeof t4 && (t4 = {}), "object" != typeof e3 && (e3 = {});
              var r3 = Object.keys(t4).concat(Object.keys(e3)).reduce((function(r4, n3) {
                return s.default(t4[n3], e3[n3]) || (r4[n3] = void 0 === e3[n3] ? null : e3[n3]), r4;
              }), {});
              return Object.keys(r3).length > 0 ? r3 : void 0;
            }, t3.invert = function(t4, e3) {
              void 0 === t4 && (t4 = {}), void 0 === e3 && (e3 = {}), t4 = t4 || {};
              var r3 = Object.keys(e3).reduce((function(r4, n3) {
                return e3[n3] !== t4[n3] && void 0 !== t4[n3] && (r4[n3] = e3[n3]), r4;
              }), {});
              return Object.keys(t4).reduce((function(r4, n3) {
                return t4[n3] !== e3[n3] && void 0 === e3[n3] && (r4[n3] = null), r4;
              }), r3);
            }, t3.transform = function(t4, e3, r3) {
              if (void 0 === r3 && (r3 = false), "object" != typeof t4) return e3;
              if ("object" == typeof e3) {
                if (!r3) return e3;
                var n3 = Object.keys(e3).reduce((function(r4, n4) {
                  return void 0 === t4[n4] && (r4[n4] = e3[n4]), r4;
                }), {});
                return Object.keys(n3).length > 0 ? n3 : void 0;
              }
            };
          })(i || (i = {})), e2.default = i;
        }, 895: function(t2, e2, r2) {
          "use strict";
          var n2 = this && this.__importDefault || function(t3) {
            return t3 && t3.__esModule ? t3 : { default: t3 };
          }, i = n2(r2(529)), o = n2(r2(465)), s = n2(r2(307)), a = n2(r2(210)), u = n2(r2(430)), c = String.fromCharCode(0), l = (function() {
            function t3(t4) {
              Array.isArray(t4) ? this.ops = t4 : null != t4 && Array.isArray(t4.ops) ? this.ops = t4.ops : this.ops = [];
            }
            return t3.prototype.insert = function(t4, e3) {
              var r3 = {};
              return "string" == typeof t4 && 0 === t4.length ? this : (r3.insert = t4, null != e3 && "object" == typeof e3 && Object.keys(e3).length > 0 && (r3.attributes = e3), this.push(r3));
            }, t3.prototype.delete = function(t4) {
              return t4 <= 0 ? this : this.push({ delete: t4 });
            }, t3.prototype.retain = function(t4, e3) {
              if (t4 <= 0) return this;
              var r3 = { retain: t4 };
              return null != e3 && "object" == typeof e3 && Object.keys(e3).length > 0 && (r3.attributes = e3), this.push(r3);
            }, t3.prototype.push = function(t4) {
              var e3 = this.ops.length, r3 = this.ops[e3 - 1];
              if (t4 = o.default(t4), "object" == typeof r3) {
                if ("number" == typeof t4.delete && "number" == typeof r3.delete) return this.ops[e3 - 1] = { delete: r3.delete + t4.delete }, this;
                if ("number" == typeof r3.delete && null != t4.insert && (e3 -= 1, "object" != typeof (r3 = this.ops[e3 - 1]))) return this.ops.unshift(t4), this;
                if (s.default(t4.attributes, r3.attributes)) {
                  if ("string" == typeof t4.insert && "string" == typeof r3.insert) return this.ops[e3 - 1] = { insert: r3.insert + t4.insert }, "object" == typeof t4.attributes && (this.ops[e3 - 1].attributes = t4.attributes), this;
                  if ("number" == typeof t4.retain && "number" == typeof r3.retain) return this.ops[e3 - 1] = { retain: r3.retain + t4.retain }, "object" == typeof t4.attributes && (this.ops[e3 - 1].attributes = t4.attributes), this;
                }
              }
              return e3 === this.ops.length ? this.ops.push(t4) : this.ops.splice(e3, 0, t4), this;
            }, t3.prototype.chop = function() {
              var t4 = this.ops[this.ops.length - 1];
              return t4 && t4.retain && !t4.attributes && this.ops.pop(), this;
            }, t3.prototype.filter = function(t4) {
              return this.ops.filter(t4);
            }, t3.prototype.forEach = function(t4) {
              this.ops.forEach(t4);
            }, t3.prototype.map = function(t4) {
              return this.ops.map(t4);
            }, t3.prototype.partition = function(t4) {
              var e3 = [], r3 = [];
              return this.forEach((function(n3) {
                (t4(n3) ? e3 : r3).push(n3);
              })), [e3, r3];
            }, t3.prototype.reduce = function(t4, e3) {
              return this.ops.reduce(t4, e3);
            }, t3.prototype.changeLength = function() {
              return this.reduce((function(t4, e3) {
                return e3.insert ? t4 + u.default.length(e3) : e3.delete ? t4 - e3.delete : t4;
              }), 0);
            }, t3.prototype.length = function() {
              return this.reduce((function(t4, e3) {
                return t4 + u.default.length(e3);
              }), 0);
            }, t3.prototype.slice = function(e3, r3) {
              void 0 === e3 && (e3 = 0), void 0 === r3 && (r3 = 1 / 0);
              for (var n3 = [], i2 = u.default.iterator(this.ops), o2 = 0; o2 < r3 && i2.hasNext(); ) {
                var s2 = void 0;
                o2 < e3 ? s2 = i2.next(e3 - o2) : (s2 = i2.next(r3 - o2), n3.push(s2)), o2 += u.default.length(s2);
              }
              return new t3(n3);
            }, t3.prototype.compose = function(e3) {
              var r3 = u.default.iterator(this.ops), n3 = u.default.iterator(e3.ops), i2 = [], o2 = n3.peek();
              if (null != o2 && "number" == typeof o2.retain && null == o2.attributes) {
                for (var c2 = o2.retain; "insert" === r3.peekType() && r3.peekLength() <= c2; ) c2 -= r3.peekLength(), i2.push(r3.next());
                o2.retain - c2 > 0 && n3.next(o2.retain - c2);
              }
              for (var l2 = new t3(i2); r3.hasNext() || n3.hasNext(); ) if ("insert" === n3.peekType()) l2.push(n3.next());
              else if ("delete" === r3.peekType()) l2.push(r3.next());
              else {
                var f = Math.min(r3.peekLength(), n3.peekLength()), h = r3.next(f), p = n3.next(f);
                if ("number" == typeof p.retain) {
                  var d = {};
                  "number" == typeof h.retain ? d.retain = f : d.insert = h.insert;
                  var v = a.default.compose(h.attributes, p.attributes, "number" == typeof h.retain);
                  if (v && (d.attributes = v), l2.push(d), !n3.hasNext() && s.default(l2.ops[l2.ops.length - 1], d)) {
                    var g = new t3(r3.rest());
                    return l2.concat(g).chop();
                  }
                } else "number" == typeof p.delete && "number" == typeof h.retain && l2.push(p);
              }
              return l2.chop();
            }, t3.prototype.concat = function(e3) {
              var r3 = new t3(this.ops.slice());
              return e3.ops.length > 0 && (r3.push(e3.ops[0]), r3.ops = r3.ops.concat(e3.ops.slice(1))), r3;
            }, t3.prototype.diff = function(e3, r3) {
              if (this.ops === e3.ops) return new t3();
              var n3 = [this, e3].map((function(t4) {
                return t4.map((function(r4) {
                  if (null != r4.insert) return "string" == typeof r4.insert ? r4.insert : c;
                  throw new Error("diff() called " + (t4 === e3 ? "on" : "with") + " non-document");
                })).join("");
              })), o2 = new t3(), l2 = i.default(n3[0], n3[1], r3), f = u.default.iterator(this.ops), h = u.default.iterator(e3.ops);
              return l2.forEach((function(t4) {
                for (var e4 = t4[1].length; e4 > 0; ) {
                  var r4 = 0;
                  switch (t4[0]) {
                    case i.default.INSERT:
                      r4 = Math.min(h.peekLength(), e4), o2.push(h.next(r4));
                      break;
                    case i.default.DELETE:
                      r4 = Math.min(e4, f.peekLength()), f.next(r4), o2.delete(r4);
                      break;
                    case i.default.EQUAL:
                      r4 = Math.min(f.peekLength(), h.peekLength(), e4);
                      var n4 = f.next(r4), u2 = h.next(r4);
                      s.default(n4.insert, u2.insert) ? o2.retain(r4, a.default.diff(n4.attributes, u2.attributes)) : o2.push(u2).delete(r4);
                  }
                  e4 -= r4;
                }
              })), o2.chop();
            }, t3.prototype.eachLine = function(e3, r3) {
              void 0 === r3 && (r3 = "\n");
              for (var n3 = u.default.iterator(this.ops), i2 = new t3(), o2 = 0; n3.hasNext(); ) {
                if ("insert" !== n3.peekType()) return;
                var s2 = n3.peek(), a2 = u.default.length(s2) - n3.peekLength(), c2 = "string" == typeof s2.insert ? s2.insert.indexOf(r3, a2) - a2 : -1;
                if (c2 < 0) i2.push(n3.next());
                else if (c2 > 0) i2.push(n3.next(c2));
                else {
                  if (false === e3(i2, n3.next(1).attributes || {}, o2)) return;
                  o2 += 1, i2 = new t3();
                }
              }
              i2.length() > 0 && e3(i2, {}, o2);
            }, t3.prototype.invert = function(e3) {
              var r3 = new t3();
              return this.reduce((function(t4, n3) {
                if (n3.insert) r3.delete(u.default.length(n3));
                else {
                  if (n3.retain && null == n3.attributes) return r3.retain(n3.retain), t4 + n3.retain;
                  if (n3.delete || n3.retain && n3.attributes) {
                    var i2 = n3.delete || n3.retain;
                    return e3.slice(t4, t4 + i2).forEach((function(t5) {
                      n3.delete ? r3.push(t5) : n3.retain && n3.attributes && r3.retain(u.default.length(t5), a.default.invert(n3.attributes, t5.attributes));
                    })), t4 + i2;
                  }
                }
                return t4;
              }), 0), r3.chop();
            }, t3.prototype.transform = function(e3, r3) {
              if (void 0 === r3 && (r3 = false), r3 = !!r3, "number" == typeof e3) return this.transformPosition(e3, r3);
              for (var n3 = e3, i2 = u.default.iterator(this.ops), o2 = u.default.iterator(n3.ops), s2 = new t3(); i2.hasNext() || o2.hasNext(); ) if ("insert" !== i2.peekType() || !r3 && "insert" === o2.peekType()) if ("insert" === o2.peekType()) s2.push(o2.next());
              else {
                var c2 = Math.min(i2.peekLength(), o2.peekLength()), l2 = i2.next(c2), f = o2.next(c2);
                if (l2.delete) continue;
                f.delete ? s2.push(f) : s2.retain(c2, a.default.transform(l2.attributes, f.attributes, r3));
              }
              else s2.retain(u.default.length(i2.next()));
              return s2.chop();
            }, t3.prototype.transformPosition = function(t4, e3) {
              void 0 === e3 && (e3 = false), e3 = !!e3;
              for (var r3 = u.default.iterator(this.ops), n3 = 0; r3.hasNext() && n3 <= t4; ) {
                var i2 = r3.peekLength(), o2 = r3.peekType();
                r3.next(), "delete" !== o2 ? ("insert" === o2 && (n3 < t4 || !e3) && (t4 += i2), n3 += i2) : t4 -= Math.min(i2, t4 - n3);
              }
              return t4;
            }, t3.Op = u.default, t3.AttributeMap = a.default, t3;
          })();
          t2.exports = l;
        }, 977: function(t2, e2, r2) {
          "use strict";
          var n2 = this && this.__importDefault || function(t3) {
            return t3 && t3.__esModule ? t3 : { default: t3 };
          };
          Object.defineProperty(e2, "__esModule", { value: true });
          var i = n2(r2(430)), o = (function() {
            function t3(t4) {
              this.ops = t4, this.index = 0, this.offset = 0;
            }
            return t3.prototype.hasNext = function() {
              return this.peekLength() < 1 / 0;
            }, t3.prototype.next = function(t4) {
              t4 || (t4 = 1 / 0);
              var e3 = this.ops[this.index];
              if (e3) {
                var r3 = this.offset, n3 = i.default.length(e3);
                if (t4 >= n3 - r3 ? (t4 = n3 - r3, this.index += 1, this.offset = 0) : this.offset += t4, "number" == typeof e3.delete) return { delete: t4 };
                var o2 = {};
                return e3.attributes && (o2.attributes = e3.attributes), "number" == typeof e3.retain ? o2.retain = t4 : "string" == typeof e3.insert ? o2.insert = e3.insert.substr(r3, t4) : o2.insert = e3.insert, o2;
              }
              return { retain: 1 / 0 };
            }, t3.prototype.peek = function() {
              return this.ops[this.index];
            }, t3.prototype.peekLength = function() {
              return this.ops[this.index] ? i.default.length(this.ops[this.index]) - this.offset : 1 / 0;
            }, t3.prototype.peekType = function() {
              return this.ops[this.index] ? "number" == typeof this.ops[this.index].delete ? "delete" : "number" == typeof this.ops[this.index].retain ? "retain" : "insert" : "retain";
            }, t3.prototype.rest = function() {
              if (this.hasNext()) {
                if (0 === this.offset) return this.ops.slice(this.index);
                var t4 = this.offset, e3 = this.index, r3 = this.next(), n3 = this.ops.slice(this.index);
                return this.offset = t4, this.index = e3, [r3].concat(n3);
              }
              return [];
            }, t3;
          })();
          e2.default = o;
        }, 430: function(t2, e2, r2) {
          "use strict";
          var n2 = this && this.__importDefault || function(t3) {
            return t3 && t3.__esModule ? t3 : { default: t3 };
          };
          Object.defineProperty(e2, "__esModule", { value: true });
          var i, o = n2(r2(977));
          !(function(t3) {
            t3.iterator = function(t4) {
              return new o.default(t4);
            }, t3.length = function(t4) {
              return "number" == typeof t4.delete ? t4.delete : "number" == typeof t4.retain ? t4.retain : "string" == typeof t4.insert ? t4.insert.length : 1;
            };
          })(i || (i = {})), e2.default = i;
        }, 165: function(t2, e2, r2) {
          var n2, i;
          void 0 === (i = "function" == typeof (n2 = function() {
            var t3, e3 = {};
            function r3(t4, e4, r4) {
              var n4 = t4.getClientRects();
              if (2 === n4.length) {
                var i3 = t4.getBoundingClientRect();
                return n4[e4][r4] < i3[r4];
              }
              return false;
            }
            function n3(t4) {
              if (!t4) return t4;
              if (screen.deviceXDPI === screen.logicalXDPI) return t4;
              if ("length" in t4) return Array.prototype.map.call(t4, n3);
              var e4 = screen.deviceXDPI / screen.logicalXDPI;
              return { top: t4.top / e4, bottom: t4.bottom / e4, left: t4.left / e4, right: t4.right / e4, width: t4.width / e4, height: t4.height / e4 };
            }
            function i2(t4, e4) {
              var r4, n4 = 0, i3 = 1024;
              if (i3 >= e4.length) return Array.prototype.push.apply(t4, e4);
              for (; n4 < e4.length; ) r4 = Array.prototype.push.apply(t4, Array.prototype.slice.call(e4, n4, n4 + i3)), n4 += i3;
              return r4;
            }
            return e3.isBroken = function() {
              if (void 0 === t3) {
                var e4 = document.createElement("p"), n4 = document.createElement("span"), i3 = document.createTextNode("aa"), o = document.createTextNode("aa"), s = document.createElement("img");
                s.setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=");
                var a = document.createRange();
                if (t3 = {}, e4.appendChild(i3), e4.appendChild(n4), n4.appendChild(s), n4.appendChild(o), document.body.appendChild(e4), a.setStart(i3, 1), a.setEnd(n4, 0), t3.getClientRects = t3.getBoundingClientRect = a.getClientRects().length > 1, t3.getClientRects || (a.setEnd(o, 1), t3.getClientRects = t3.getBoundingClientRect = 2 === a.getClientRects().length), !t3.getBoundingClientRect) {
                  a.setEnd(a.startContainer, a.startOffset);
                  var u = a.getBoundingClientRect();
                  t3.getBoundingClientRect = 0 === u.top && 0 === u.left;
                }
                if (document.body.removeChild(e4), !t3.getBoundingClientRect) {
                  var c = document.createElement("p");
                  c.style.width = "0px", c.style.fontSize = "20px", c.style.whiteSpace = "normal", c.style.wordBreak = "normal";
                  var l = document.createTextNode("m mm");
                  c.appendChild(l), document.body.appendChild(c), a.setStart(l, 1), a.setEnd(l, 2), r3(a, 1, "left") ? t3.getBoundingClientRect = true : (a.setStart(l, 1), a.setEnd(l, 3), r3(a, 0, "top") && (t3.getBoundingClientRect = true)), document.body.removeChild(c);
                }
                var f = window.ActiveXObject && new Function("/*@cc_on return @_jscript_version; @*/")();
                t3.ieZoom = !!f && f <= 10;
              }
              return t3;
            }, e3.getClientRects = function(t4) {
              var e4 = this.isBroken();
              if (e4.ieZoom) return n3(t4.getClientRects());
              if (!e4.getClientRects) return t4.getClientRects();
              var r4 = [], o = [], s = t4.endContainer, a = t4.endOffset, u = document.createRange();
              function c(t5) {
                for (var e5 = 0; t5 = t5.previousSibling; ) e5++;
                return e5;
              }
              for (; s !== t4.commonAncestorContainer; ) u.setStart(s, 0), u.setEnd(s, a), i2(o, u.getClientRects()), a = c(s), s = s.parentNode;
              return (u = t4.cloneRange()).setEnd(s, a), i2(r4, u.getClientRects()), i2(r4, o), r4;
            }, e3.getBoundingClientRect = function(t4) {
              var e4 = this.getClientRects(t4);
              if (0 === e4.length) return null;
              var r4, i3 = t4.getBoundingClientRect(), o = this.isBroken();
              if (o.ieZoom) return n3(i3);
              if (!o.getBoundingClientRect) return i3;
              if (0 === i3.width && 0 === i3.height) return e4[0];
              for (var s = 0, a = e4.length; s < a; s++) {
                var u = e4[s];
                r4 ? (r4.left = Math.min(r4.left, u.left), r4.top = Math.min(r4.top, u.top), r4.right = Math.max(r4.right, u.right), r4.bottom = Math.max(r4.bottom, u.bottom)) : r4 = { left: u.left, top: u.top, right: u.right, bottom: u.bottom };
              }
              return r4 && (r4.width = r4.right - r4.left, r4.height = r4.bottom - r4.top), r4;
            }, e3;
          }) ? n2.call(e2, r2, e2, t2) : n2) || (t2.exports = i);
        }, 33: (t2, e2, r2) => {
          "use strict";
          r2.r(e2), r2.d(e2, { default: () => A });
          var n2 = (function() {
            if ("undefined" != typeof Map) return Map;
            function t3(t4, e3) {
              var r3 = -1;
              return t4.some((function(t5, n3) {
                return t5[0] === e3 && (r3 = n3, true);
              })), r3;
            }
            return (function() {
              function e3() {
                this.__entries__ = [];
              }
              return Object.defineProperty(e3.prototype, "size", { get: function() {
                return this.__entries__.length;
              }, enumerable: true, configurable: true }), e3.prototype.get = function(e4) {
                var r3 = t3(this.__entries__, e4), n3 = this.__entries__[r3];
                return n3 && n3[1];
              }, e3.prototype.set = function(e4, r3) {
                var n3 = t3(this.__entries__, e4);
                ~n3 ? this.__entries__[n3][1] = r3 : this.__entries__.push([e4, r3]);
              }, e3.prototype.delete = function(e4) {
                var r3 = this.__entries__, n3 = t3(r3, e4);
                ~n3 && r3.splice(n3, 1);
              }, e3.prototype.has = function(e4) {
                return !!~t3(this.__entries__, e4);
              }, e3.prototype.clear = function() {
                this.__entries__.splice(0);
              }, e3.prototype.forEach = function(t4, e4) {
                void 0 === e4 && (e4 = null);
                for (var r3 = 0, n3 = this.__entries__; r3 < n3.length; r3++) {
                  var i2 = n3[r3];
                  t4.call(e4, i2[1], i2[0]);
                }
              }, e3;
            })();
          })(), i = "undefined" != typeof window && "undefined" != typeof document && window.document === document, o = void 0 !== r2.g && r2.g.Math === Math ? r2.g : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")(), s = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(o) : function(t3) {
            return setTimeout((function() {
              return t3(Date.now());
            }), 1e3 / 60);
          }, a = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], u = "undefined" != typeof MutationObserver, c = (function() {
            function t3() {
              this.connected_ = false, this.mutationEventsAdded_ = false, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = /* @__PURE__ */ (function(t4, e3) {
                var r3 = false, n3 = false, i2 = 0;
                function o2() {
                  r3 && (r3 = false, t4()), n3 && u2();
                }
                function a2() {
                  s(o2);
                }
                function u2() {
                  var t5 = Date.now();
                  if (r3) {
                    if (t5 - i2 < 2) return;
                    n3 = true;
                  } else r3 = true, n3 = false, setTimeout(a2, 20);
                  i2 = t5;
                }
                return u2;
              })(this.refresh.bind(this));
            }
            return t3.prototype.addObserver = function(t4) {
              ~this.observers_.indexOf(t4) || this.observers_.push(t4), this.connected_ || this.connect_();
            }, t3.prototype.removeObserver = function(t4) {
              var e3 = this.observers_, r3 = e3.indexOf(t4);
              ~r3 && e3.splice(r3, 1), !e3.length && this.connected_ && this.disconnect_();
            }, t3.prototype.refresh = function() {
              this.updateObservers_() && this.refresh();
            }, t3.prototype.updateObservers_ = function() {
              var t4 = this.observers_.filter((function(t5) {
                return t5.gatherActive(), t5.hasActive();
              }));
              return t4.forEach((function(t5) {
                return t5.broadcastActive();
              })), t4.length > 0;
            }, t3.prototype.connect_ = function() {
              i && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), u ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, { attributes: true, childList: true, characterData: true, subtree: true })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = true), this.connected_ = true);
            }, t3.prototype.disconnect_ = function() {
              i && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = false, this.connected_ = false);
            }, t3.prototype.onTransitionEnd_ = function(t4) {
              var e3 = t4.propertyName, r3 = void 0 === e3 ? "" : e3;
              a.some((function(t5) {
                return !!~r3.indexOf(t5);
              })) && this.refresh();
            }, t3.getInstance = function() {
              return this.instance_ || (this.instance_ = new t3()), this.instance_;
            }, t3.instance_ = null, t3;
          })(), l = function(t3, e3) {
            for (var r3 = 0, n3 = Object.keys(e3); r3 < n3.length; r3++) {
              var i2 = n3[r3];
              Object.defineProperty(t3, i2, { value: e3[i2], enumerable: false, writable: false, configurable: true });
            }
            return t3;
          }, f = function(t3) {
            return t3 && t3.ownerDocument && t3.ownerDocument.defaultView || o;
          }, h = _(0, 0, 0, 0);
          function p(t3) {
            return parseFloat(t3) || 0;
          }
          function d(t3) {
            for (var e3 = [], r3 = 1; r3 < arguments.length; r3++) e3[r3 - 1] = arguments[r3];
            return e3.reduce((function(e4, r4) {
              return e4 + p(t3["border-" + r4 + "-width"]);
            }), 0);
          }
          var v = "undefined" != typeof SVGGraphicsElement ? function(t3) {
            return t3 instanceof f(t3).SVGGraphicsElement;
          } : function(t3) {
            return t3 instanceof f(t3).SVGElement && "function" == typeof t3.getBBox;
          };
          function g(t3) {
            return i ? v(t3) ? (function(t4) {
              var e3 = t4.getBBox();
              return _(0, 0, e3.width, e3.height);
            })(t3) : (function(t4) {
              var e3 = t4.clientWidth, r3 = t4.clientHeight;
              if (!e3 && !r3) return h;
              var n3 = f(t4).getComputedStyle(t4), i2 = (function(t5) {
                for (var e4 = {}, r4 = 0, n4 = ["top", "right", "bottom", "left"]; r4 < n4.length; r4++) {
                  var i3 = n4[r4], o3 = t5["padding-" + i3];
                  e4[i3] = p(o3);
                }
                return e4;
              })(n3), o2 = i2.left + i2.right, s2 = i2.top + i2.bottom, a2 = p(n3.width), u2 = p(n3.height);
              if ("border-box" === n3.boxSizing && (Math.round(a2 + o2) !== e3 && (a2 -= d(n3, "left", "right") + o2), Math.round(u2 + s2) !== r3 && (u2 -= d(n3, "top", "bottom") + s2)), !(function(t5) {
                return t5 === f(t5).document.documentElement;
              })(t4)) {
                var c2 = Math.round(a2 + o2) - e3, l2 = Math.round(u2 + s2) - r3;
                1 !== Math.abs(c2) && (a2 -= c2), 1 !== Math.abs(l2) && (u2 -= l2);
              }
              return _(i2.left, i2.top, a2, u2);
            })(t3) : h;
          }
          function _(t3, e3, r3, n3) {
            return { x: t3, y: e3, width: r3, height: n3 };
          }
          var y = (function() {
            function t3(t4) {
              this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = _(0, 0, 0, 0), this.target = t4;
            }
            return t3.prototype.isActive = function() {
              var t4 = g(this.target);
              return this.contentRect_ = t4, t4.width !== this.broadcastWidth || t4.height !== this.broadcastHeight;
            }, t3.prototype.broadcastRect = function() {
              var t4 = this.contentRect_;
              return this.broadcastWidth = t4.width, this.broadcastHeight = t4.height, t4;
            }, t3;
          })(), b = function(t3, e3) {
            var r3, n3, i2, o2, s2, a2, u2, c2 = (n3 = (r3 = e3).x, i2 = r3.y, o2 = r3.width, s2 = r3.height, a2 = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object, u2 = Object.create(a2.prototype), l(u2, { x: n3, y: i2, width: o2, height: s2, top: i2, right: n3 + o2, bottom: s2 + i2, left: n3 }), u2);
            l(this, { target: t3, contentRect: c2 });
          }, m = (function() {
            function t3(t4, e3, r3) {
              if (this.activeObservations_ = [], this.observations_ = new n2(), "function" != typeof t4) throw new TypeError("The callback provided as parameter 1 is not a function.");
              this.callback_ = t4, this.controller_ = e3, this.callbackCtx_ = r3;
            }
            return t3.prototype.observe = function(t4) {
              if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
              if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(t4 instanceof f(t4).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                var e3 = this.observations_;
                e3.has(t4) || (e3.set(t4, new y(t4)), this.controller_.addObserver(this), this.controller_.refresh());
              }
            }, t3.prototype.unobserve = function(t4) {
              if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
              if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(t4 instanceof f(t4).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                var e3 = this.observations_;
                e3.has(t4) && (e3.delete(t4), e3.size || this.controller_.removeObserver(this));
              }
            }, t3.prototype.disconnect = function() {
              this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
            }, t3.prototype.gatherActive = function() {
              var t4 = this;
              this.clearActive(), this.observations_.forEach((function(e3) {
                e3.isActive() && t4.activeObservations_.push(e3);
              }));
            }, t3.prototype.broadcastActive = function() {
              if (this.hasActive()) {
                var t4 = this.callbackCtx_, e3 = this.activeObservations_.map((function(t5) {
                  return new b(t5.target, t5.broadcastRect());
                }));
                this.callback_.call(t4, e3, t4), this.clearActive();
              }
            }, t3.prototype.clearActive = function() {
              this.activeObservations_.splice(0);
            }, t3.prototype.hasActive = function() {
              return this.activeObservations_.length > 0;
            }, t3;
          })(), C = "undefined" != typeof WeakMap ? /* @__PURE__ */ new WeakMap() : new n2(), E = function t3(e3) {
            if (!(this instanceof t3)) throw new TypeError("Cannot call a class as a function.");
            if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
            var r3 = c.getInstance(), n3 = new m(e3, r3, this);
            C.set(this, n3);
          };
          ["observe", "unobserve", "disconnect"].forEach((function(t3) {
            E.prototype[t3] = function() {
              var e3;
              return (e3 = C.get(this))[t3].apply(e3, arguments);
            };
          }));
          const A = void 0 !== o.ResizeObserver ? o.ResizeObserver : E;
        }, 413: (t2, e2, r2) => {
          "use strict";
          r2.r(e2), r2.d(e2, { default: () => _ });
          var n2 = r2(379), i = r2.n(n2), o = r2(795), s = r2.n(o), a = r2(569), u = r2.n(a), c = r2(565), l = r2.n(c), f = r2(216), h = r2.n(f), p = r2(589), d = r2.n(p), v = r2(582), g = {};
          g.styleTagTransform = d(), g.setAttributes = l(), g.insert = u().bind(null, "head"), g.domAPI = s(), g.insertStyleElement = h(), i()(v.Z, g);
          const _ = v.Z && v.Z.locals ? v.Z.locals : void 0;
        }, 379: (t2) => {
          "use strict";
          var e2 = [];
          function r2(t3) {
            for (var r3 = -1, n3 = 0; n3 < e2.length; n3++) if (e2[n3].identifier === t3) {
              r3 = n3;
              break;
            }
            return r3;
          }
          function n2(t3, n3) {
            for (var o = {}, s = [], a = 0; a < t3.length; a++) {
              var u = t3[a], c = n3.base ? u[0] + n3.base : u[0], l = o[c] || 0, f = "".concat(c, " ").concat(l);
              o[c] = l + 1;
              var h = r2(f), p = { css: u[1], media: u[2], sourceMap: u[3], supports: u[4], layer: u[5] };
              if (-1 !== h) e2[h].references++, e2[h].updater(p);
              else {
                var d = i(p, n3);
                n3.byIndex = a, e2.splice(a, 0, { identifier: f, updater: d, references: 1 });
              }
              s.push(f);
            }
            return s;
          }
          function i(t3, e3) {
            var r3 = e3.domAPI(e3);
            return r3.update(t3), function(e4) {
              if (e4) {
                if (e4.css === t3.css && e4.media === t3.media && e4.sourceMap === t3.sourceMap && e4.supports === t3.supports && e4.layer === t3.layer) return;
                r3.update(t3 = e4);
              } else r3.remove();
            };
          }
          t2.exports = function(t3, i2) {
            var o = n2(t3 = t3 || [], i2 = i2 || {});
            return function(t4) {
              t4 = t4 || [];
              for (var s = 0; s < o.length; s++) {
                var a = r2(o[s]);
                e2[a].references--;
              }
              for (var u = n2(t4, i2), c = 0; c < o.length; c++) {
                var l = r2(o[c]);
                0 === e2[l].references && (e2[l].updater(), e2.splice(l, 1));
              }
              o = u;
            };
          };
        }, 569: (t2) => {
          "use strict";
          var e2 = {};
          t2.exports = function(t3, r2) {
            var n2 = (function(t4) {
              if (void 0 === e2[t4]) {
                var r3 = document.querySelector(t4);
                if (window.HTMLIFrameElement && r3 instanceof window.HTMLIFrameElement) try {
                  r3 = r3.contentDocument.head;
                } catch (t5) {
                  r3 = null;
                }
                e2[t4] = r3;
              }
              return e2[t4];
            })(t3);
            if (!n2) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            n2.appendChild(r2);
          };
        }, 216: (t2) => {
          "use strict";
          t2.exports = function(t3) {
            var e2 = document.createElement("style");
            return t3.setAttributes(e2, t3.attributes), t3.insert(e2, t3.options), e2;
          };
        }, 565: (t2, e2, r2) => {
          "use strict";
          t2.exports = function(t3) {
            var e3 = r2.nc;
            e3 && t3.setAttribute("nonce", e3);
          };
        }, 795: (t2) => {
          "use strict";
          t2.exports = function(t3) {
            var e2 = t3.insertStyleElement(t3);
            return { update: function(r2) {
              !(function(t4, e3, r3) {
                var n2 = "";
                r3.supports && (n2 += "@supports (".concat(r3.supports, ") {")), r3.media && (n2 += "@media ".concat(r3.media, " {"));
                var i = void 0 !== r3.layer;
                i && (n2 += "@layer".concat(r3.layer.length > 0 ? " ".concat(r3.layer) : "", " {")), n2 += r3.css, i && (n2 += "}"), r3.media && (n2 += "}"), r3.supports && (n2 += "}");
                var o = r3.sourceMap;
                o && "undefined" != typeof btoa && (n2 += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o)))), " */")), e3.styleTagTransform(n2, t4, e3.options);
              })(e2, t3, r2);
            }, remove: function() {
              !(function(t4) {
                if (null === t4.parentNode) return false;
                t4.parentNode.removeChild(t4);
              })(e2);
            } };
          };
        }, 589: (t2) => {
          "use strict";
          t2.exports = function(t3, e2) {
            if (e2.styleSheet) e2.styleSheet.cssText = t3;
            else {
              for (; e2.firstChild; ) e2.removeChild(e2.firstChild);
              e2.appendChild(document.createTextNode(t3));
            }
          };
        }, 607: function(t2, e2, r2) {
          "use strict";
          var n2 = this && this.__importDefault || function(t3) {
            return t3 && t3.__esModule ? t3 : { default: t3 };
          };
          Object.defineProperty(e2, "__esModule", { value: true }), e2.Cursor = e2.default = void 0;
          var i = n2(r2(678));
          e2.default = i.default;
          var o = n2(r2(353));
          e2.Cursor = o.default, r2(413);
        }, 353: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true });
          var r2 = (function() {
            function t3(t4, e3, r3) {
              this.id = t4, this.name = e3, this.color = r3, this.toggleNearCursor = this.toggleNearCursor.bind(this), this._toggleOpenedCursor = this._toggleOpenedCursor.bind(this), this._setHoverState = this._setHoverState.bind(this);
            }
            return t3.prototype.build = function(e3) {
              var r3 = document.createElement(t3.CONTAINER_ELEMENT_TAG);
              r3.classList.add(t3.CURSOR_CLASS), r3.id = "ql-cursor-".concat(this.id), r3.innerHTML = e3.template;
              var n2 = r3.getElementsByClassName(t3.SELECTION_CLASS)[0], i = r3.getElementsByClassName(t3.CARET_CONTAINER_CLASS)[0], o = i.getElementsByClassName(t3.CARET_CLASS)[0], s = r3.getElementsByClassName(t3.FLAG_CLASS)[0];
              return s.style.backgroundColor = this.color, o.style.backgroundColor = this.color, r3.getElementsByClassName(t3.NAME_CLASS)[0].textContent = this.name, this._hideDelay = "".concat(e3.hideDelayMs, "ms"), this._hideSpeedMs = e3.hideSpeedMs, this._positionFlag = e3.positionFlag, s.style.transitionDelay = this._hideDelay, s.style.transitionDuration = "".concat(this._hideSpeedMs, "ms"), this._el = r3, this._selectionEl = n2, this._caretEl = i, this._flagEl = s, i.addEventListener("mouseover", this._setHoverState, { passive: true }), this._el;
            }, t3.prototype.show = function() {
              this._el.classList.remove(t3.HIDDEN_CLASS);
            }, t3.prototype.hide = function() {
              this._el.classList.add(t3.HIDDEN_CLASS);
            }, t3.prototype.remove = function() {
              this._el.parentNode.removeChild(this._el);
            }, t3.prototype.toggleNearCursor = function(e3, r3) {
              var n2 = this._getCoordinates(), i = n2.left, o = n2.right, s = n2.top, a = n2.bottom, u = e3 >= i && e3 <= o && r3 >= s && r3 <= a;
              return this._caretEl.classList.toggle(t3.CONTAINER_HOVER_CLASS, u), u;
            }, t3.prototype.toggleFlag = function(e3) {
              var r3 = this;
              this._caretEl.classList.toggle(t3.CONTAINER_HOVER_CLASS, e3) || (this._flagEl.classList.add(t3.NO_DELAY_CLASS), setTimeout((function() {
                return r3._flagEl.classList.remove(t3.NO_DELAY_CLASS);
              }), this._hideSpeedMs));
            }, t3.prototype.updateCaret = function(t4, e3) {
              this._caretEl.style.top = "".concat(t4.top, "px"), this._caretEl.style.left = "".concat(t4.left, "px"), this._caretEl.style.height = "".concat(t4.height, "px"), this._positionFlag ? this._positionFlag(this._flagEl, t4, e3) : this._updateCaretFlag(t4, e3);
            }, t3.prototype.updateSelection = function(t4, e3) {
              var r3 = this;
              this._clearSelection(), t4 = t4 || [], t4 = Array.from(t4), t4 = this._sanitize(t4), (t4 = this._sortByDomPosition(t4)).forEach((function(t5) {
                return r3._addSelection(t5, e3);
              }));
            }, t3.prototype._setHoverState = function() {
              document.addEventListener("mousemove", this._toggleOpenedCursor, { passive: true });
            }, t3.prototype._toggleOpenedCursor = function(e3) {
              var r3 = this.toggleNearCursor(e3.clientX, e3.clientY);
              this._caretEl.classList.toggle(t3.CONTAINER_NO_POINTER_CLASS, r3), r3 || document.removeEventListener("mousemove", this._toggleOpenedCursor);
            }, t3.prototype._getCoordinates = function() {
              return this._caretEl.getBoundingClientRect();
            }, t3.prototype._updateCaretFlag = function(e3, r3) {
              this._flagEl.style.width = "";
              var n2 = this._flagEl.getBoundingClientRect();
              this._flagEl.classList.remove(t3.FLAG_FLIPPED_CLASS), e3.left > r3.width - n2.width && this._flagEl.classList.add(t3.FLAG_FLIPPED_CLASS), this._flagEl.style.left = "".concat(e3.left, "px"), this._flagEl.style.top = "".concat(e3.top, "px"), this._flagEl.style.width = "".concat(Math.ceil(n2.width), "px");
            }, t3.prototype._clearSelection = function() {
              this._selectionEl.innerHTML = "";
            }, t3.prototype._addSelection = function(t4, e3) {
              var r3 = this._selectionBlock(t4, e3);
              this._selectionEl.appendChild(r3);
            }, t3.prototype._selectionBlock = function(e3, r3) {
              var n2 = document.createElement(t3.SELECTION_ELEMENT_TAG);
              return n2.classList.add(t3.SELECTION_BLOCK_CLASS), n2.style.top = "".concat(e3.top - r3.top, "px"), n2.style.left = "".concat(e3.left - r3.left, "px"), n2.style.width = "".concat(e3.width, "px"), n2.style.height = "".concat(e3.height, "px"), n2.style.backgroundColor = this.color, n2.style.opacity = "0.3", n2;
            }, t3.prototype._sortByDomPosition = function(t4) {
              return t4.sort((function(t5, e3) {
                return t5.top === e3.top ? t5.left - e3.left : t5.top - e3.top;
              }));
            }, t3.prototype._sanitize = function(t4) {
              var e3 = this, r3 = /* @__PURE__ */ new Set();
              return t4.filter((function(t5) {
                if (!t5.width || !t5.height) return false;
                var n2 = e3._serialize(t5);
                return !r3.has(n2) && (r3.add(n2), true);
              }));
            }, t3.prototype._serialize = function(t4) {
              return ["top:".concat(t4.top), "right:".concat(t4.right), "bottom:".concat(t4.bottom), "left:".concat(t4.left)].join(";");
            }, t3.CONTAINER_ELEMENT_TAG = "SPAN", t3.SELECTION_ELEMENT_TAG = "SPAN", t3.CURSOR_CLASS = "ql-cursor", t3.SELECTION_CLASS = "ql-cursor-selections", t3.SELECTION_BLOCK_CLASS = "ql-cursor-selection-block", t3.CARET_CLASS = "ql-cursor-caret", t3.CARET_CONTAINER_CLASS = "ql-cursor-caret-container", t3.CONTAINER_HOVER_CLASS = "hover", t3.CONTAINER_NO_POINTER_CLASS = "no-pointer", t3.FLAG_CLASS = "ql-cursor-flag", t3.FLAG_FLIPPED_CLASS = "flag-flipped", t3.NAME_CLASS = "ql-cursor-name", t3.HIDDEN_CLASS = "hidden", t3.NO_DELAY_CLASS = "no-delay", t3;
          })();
          e2.default = r2;
        }, 678: function(t2, e2, r2) {
          "use strict";
          var n2 = this && this.__assign || function() {
            return n2 = Object.assign || function(t3) {
              for (var e3, r3 = 1, n3 = arguments.length; r3 < n3; r3++) for (var i2 in e3 = arguments[r3]) Object.prototype.hasOwnProperty.call(e3, i2) && (t3[i2] = e3[i2]);
              return t3;
            }, n2.apply(this, arguments);
          }, i = this && this.__createBinding || (Object.create ? function(t3, e3, r3, n3) {
            void 0 === n3 && (n3 = r3);
            var i2 = Object.getOwnPropertyDescriptor(e3, r3);
            i2 && !("get" in i2 ? !e3.__esModule : i2.writable || i2.configurable) || (i2 = { enumerable: true, get: function() {
              return e3[r3];
            } }), Object.defineProperty(t3, n3, i2);
          } : function(t3, e3, r3, n3) {
            void 0 === n3 && (n3 = r3), t3[n3] = e3[r3];
          }), o = this && this.__setModuleDefault || (Object.create ? function(t3, e3) {
            Object.defineProperty(t3, "default", { enumerable: true, value: e3 });
          } : function(t3, e3) {
            t3.default = e3;
          }), s = this && this.__importStar || function(t3) {
            if (t3 && t3.__esModule) return t3;
            var e3 = {};
            if (null != t3) for (var r3 in t3) "default" !== r3 && Object.prototype.hasOwnProperty.call(t3, r3) && i(e3, t3, r3);
            return o(e3, t3), e3;
          }, a = this && this.__importDefault || function(t3) {
            return t3 && t3.__esModule ? t3 : { default: t3 };
          };
          Object.defineProperty(e2, "__esModule", { value: true });
          var u = a(r2(353)), c = s(r2(165)), l = a(r2(338)), f = a(r2(33)), h = r2(895), p = (function() {
            function t3(t4, e3) {
              void 0 === e3 && (e3 = {});
              var r3 = this;
              this._cursors = {}, this._isObserving = false, this._destroyed = false, this._resizeObserver = null, this._touchTimerIds = [], this._quillListeners = [], this._domListeners = [], this._onScroll = function() {
                r3.update();
              }, this._handleCursorTouch = function(t5) {
                r3.cursors().forEach((function(e4) {
                  e4.toggleNearCursor(t5.pageX, t5.pageY);
                  var n3 = setTimeout((function() {
                    var t6 = r3._touchTimerIds.indexOf(n3);
                    -1 !== t6 && r3._touchTimerIds.splice(t6, 1), e4.toggleFlag(false);
                  }), r3.options.hideDelayMs);
                  r3._touchTimerIds.push(n3);
                }));
              }, this.quill = t4, this.options = this._setDefaults(e3), this._container = this.quill.addContainer(this.options.containerClass), this._boundsContainer = this.options.boundsContainer || this.quill.container, this._editor = this.quill.root, this._currentSelection = this.quill.getSelection(), this._registerSelectionChangeListeners(), this._registerTextChangeListener(), this._registerDomListeners();
            }
            return t3.prototype.createCursor = function(t4, e3, r3) {
              var n3 = this._cursors[t4];
              if (!n3) {
                n3 = new u.default(t4, e3, r3), this._cursors[t4] = n3;
                var i2 = n3.build(this.options);
                this._container.appendChild(i2);
              }
              return n3;
            }, t3.prototype.moveCursor = function(t4, e3) {
              var r3 = this._cursors[t4];
              r3 && (r3.range = e3, this._updateCursor(r3));
            }, t3.prototype.removeCursor = function(t4) {
              var e3 = this._cursors[t4];
              e3 && (e3.remove(), delete this._cursors[t4]);
            }, t3.prototype.update = function() {
              var t4 = this;
              this.cursors().forEach((function(e3) {
                return t4._updateCursor(e3);
              }));
            }, t3.prototype.clearCursors = function() {
              var t4 = this;
              this.cursors().forEach((function(e3) {
                return t4.removeCursor(e3.id);
              }));
            }, t3.prototype.toggleFlag = function(t4, e3) {
              var r3 = this._cursors[t4];
              r3 && r3.toggleFlag(e3);
            }, t3.prototype.cursors = function() {
              var t4 = this;
              return Object.keys(this._cursors).map((function(e3) {
                return t4._cursors[e3];
              }));
            }, t3.prototype.destroy = function() {
              var t4, e3, r3 = this;
              this._destroyed || (this._destroyed = true, this.clearCursors(), this._touchTimerIds.forEach((function(t5) {
                return clearTimeout(t5);
              })), this._touchTimerIds = [], this._quillListeners.forEach((function(t5) {
                var e4 = t5.event, n3 = t5.wrapped;
                return r3.quill.off(e4, n3);
              })), this._quillListeners = [], this._domListeners.forEach((function(t5) {
                var e4 = t5.target, r4 = t5.event, n3 = t5.wrapped;
                return e4.removeEventListener(r4, n3);
              })), this._domListeners = [], null === (t4 = this._resizeObserver) || void 0 === t4 || t4.disconnect(), this._resizeObserver = null, this._isObserving = false, null === (e3 = this._container.parentNode) || void 0 === e3 || e3.removeChild(this._container));
            }, t3.prototype._addQuillListener = function(t4, e3) {
              var r3 = this, n3 = function() {
                for (var t5 = [], n4 = 0; n4 < arguments.length; n4++) t5[n4] = arguments[n4];
                r3.quill.constructor.find(r3.quill.container) ? e3.apply(void 0, t5) : r3.destroy();
              };
              this.quill.on(t4, n3), this._quillListeners.push({ event: t4, wrapped: n3 });
            }, t3.prototype._addDomListener = function(t4, e3, r3, n3) {
              var i2 = this, o2 = function() {
                for (var t5 = [], e4 = 0; e4 < arguments.length; e4++) t5[e4] = arguments[e4];
                i2.quill.constructor.find(i2.quill.container) ? r3.apply(void 0, t5) : i2.destroy();
              };
              t4.addEventListener(e3, o2, n3), this._domListeners.push({ target: t4, event: e3, wrapped: o2 });
            }, t3.prototype._registerSelectionChangeListeners = function() {
              var t4 = this;
              this._addQuillListener(this.quill.constructor.events.SELECTION_CHANGE, (function(e3) {
                t4._currentSelection = e3;
              }));
            }, t3.prototype._registerTextChangeListener = function() {
              var t4 = this;
              this._addQuillListener(this.quill.constructor.events.TEXT_CHANGE, (function(e3) {
                t4._handleTextChange(e3);
              }));
            }, t3.prototype._registerDomListeners = function() {
              this._addDomListener(this._editor, "scroll", this._onScroll, { passive: true }), this._addDomListener(this._editor, "touchstart", this._handleCursorTouch, { passive: true });
            }, t3.prototype._registerResizeObserver = function() {
              var t4 = this;
              if (!this._destroyed && !this._isObserving) {
                var e3 = this._editor;
                this._resizeObserver = new f.default((function(e4) {
                  if (!e4[0].target.isConnected) return t4._resizeObserver && (t4._resizeObserver.disconnect(), t4._resizeObserver = null), void (t4._isObserving = false);
                  t4.update();
                })), this._resizeObserver.observe(e3), this._isObserving = true;
              }
            }, t3.prototype._updateCursor = function(t4) {
              if (this._registerResizeObserver(), !t4.range) return t4.hide();
              var e3 = this._indexWithinQuillBounds(t4.range.index), r3 = this._indexWithinQuillBounds(t4.range.index + t4.range.length), n3 = this.quill.getLeaf(e3), i2 = this.quill.getLeaf(r3);
              if (!this._leafIsValid(n3) || !this._leafIsValid(i2)) return t4.hide();
              t4.show();
              var o2 = this._boundsContainer.getBoundingClientRect(), s2 = this.quill.getBounds(r3);
              this._isRtl(i2[0].domNode.parentElement) && (s2 = this._adjustBoundsForRtl(s2, i2)), t4.updateCaret(s2, o2);
              var a2 = this._lineRanges(t4, n3, i2).reduce((function(t5, e4) {
                return t5.concat(Array.from(c.getClientRects(e4)));
              }), []);
              t4.updateSelection(a2, o2);
            }, t3.prototype._adjustBoundsForRtl = function(t4, e3) {
              var r3 = e3[0].domNode, i2 = e3[1];
              if (!(r3 instanceof Text) || 0 === r3.data.length) return t4;
              var o2 = this._getCharacterRectAtCursor(r3, i2), s2 = this.quill.container.getBoundingClientRect(), a2 = i2 < r3.data.length ? o2.right : o2.left;
              return n2(n2({}, t4), { left: a2 - s2.left });
            }, t3.prototype._getCharacterRectAtCursor = function(t4, e3) {
              var r3 = document.createRange();
              return e3 < t4.data.length ? (r3.setStart(t4, e3), r3.setEnd(t4, e3 + 1)) : (r3.setStart(t4, e3 - 1), r3.setEnd(t4, e3)), r3.getBoundingClientRect();
            }, t3.prototype._isRtl = function(t4) {
              return !!t4 && "rtl" === window.getComputedStyle(t4).direction;
            }, t3.prototype._indexWithinQuillBounds = function(t4) {
              var e3 = this.quill.getLength(), r3 = e3 ? e3 - 1 : 0;
              return t4 = Math.max(t4, 0), Math.min(t4, r3);
            }, t3.prototype._leafIsValid = function(t4) {
              return t4 && t4[0] && t4[0].domNode && t4[1] >= 0;
            }, t3.prototype._handleTextChange = function(t4) {
              var e3 = this;
              window.setTimeout((function() {
                e3._destroyed || (e3.options.transformOnTextChange && e3._transformCursors(t4), e3.options.selectionChangeSource && (e3._emitSelection(), e3.update()));
              }));
            }, t3.prototype._emitSelection = function() {
              this.quill.emitter.emit(this.quill.constructor.events.SELECTION_CHANGE, this.quill.getSelection(), this._currentSelection, this.options.selectionChangeSource);
            }, t3.prototype._setDefaults = function(e3) {
              return (e3 = Object.assign({}, e3)).template || (e3.template = t3.DEFAULTS.template), e3.containerClass || (e3.containerClass = t3.DEFAULTS.containerClass), null !== e3.selectionChangeSource && (e3.selectionChangeSource || (e3.selectionChangeSource = t3.DEFAULTS.selectionChangeSource)), e3.hideDelayMs = Number.isInteger(e3.hideDelayMs) ? e3.hideDelayMs : t3.DEFAULTS.hideDelayMs, e3.hideSpeedMs = Number.isInteger(e3.hideSpeedMs) ? e3.hideSpeedMs : t3.DEFAULTS.hideSpeedMs, e3.transformOnTextChange = !!e3.transformOnTextChange, e3;
            }, t3.prototype._lineRanges = function(t4, e3, r3) {
              var n3 = this.quill.getLines(t4.range);
              return n3.reduce((function(t5, i2, o2) {
                if (!i2.children) {
                  var s2 = document.createRange();
                  return s2.selectNode(i2.domNode), t5.concat(s2);
                }
                var a2 = 0 === o2 ? e3 : i2.path(0).pop(), u2 = a2[0], c2 = a2[1], l2 = o2 === n3.length - 1 ? r3 : i2.path(i2.length() - 1).pop(), f2 = l2[0], h2 = l2[1], p2 = document.createRange();
                return u2.domNode.nodeType === Node.TEXT_NODE ? p2.setStart(u2.domNode, c2) : p2.setStartBefore(u2.domNode), f2.domNode.nodeType === Node.TEXT_NODE ? p2.setEnd(f2.domNode, h2) : p2.setEndAfter(f2.domNode), t5.concat(p2);
              }), []);
            }, t3.prototype._transformCursors = function(t4) {
              var e3 = this;
              t4 = new h(t4), this.cursors().filter((function(t5) {
                return t5.range;
              })).forEach((function(r3) {
                r3.range.index = t4.transformPosition(r3.range.index), e3._updateCursor(r3);
              }));
            }, t3.DEFAULTS = { template: l.default, containerClass: "ql-cursors", selectionChangeSource: "api", hideDelayMs: 3e3, hideSpeedMs: 400 }, t3;
          })();
          e2.default = p;
        }, 338: function(t2, e2, r2) {
          "use strict";
          var n2 = this && this.__importDefault || function(t3) {
            return t3 && t3.__esModule ? t3 : { default: t3 };
          };
          Object.defineProperty(e2, "__esModule", { value: true });
          var i = n2(r2(353)), o = '\n  <span class="'.concat(i.default.SELECTION_CLASS, '"></span>\n  <span class="').concat(i.default.CARET_CONTAINER_CLASS, '">\n    <span class="').concat(i.default.CARET_CLASS, '"></span>\n  </span>\n  <div class="').concat(i.default.FLAG_CLASS, '">\n    <small class="').concat(i.default.NAME_CLASS, '"></small>\n  </div>\n');
          e2.default = o;
        } }, e = {};
        function r(n2) {
          var i = e[n2];
          if (void 0 !== i) return i.exports;
          var o = e[n2] = { id: n2, loaded: false, exports: {} };
          return t[n2].call(o.exports, o, o.exports, r), o.loaded = true, o.exports;
        }
        r.n = (t2) => {
          var e2 = t2 && t2.__esModule ? () => t2.default : () => t2;
          return r.d(e2, { a: e2 }), e2;
        }, r.d = (t2, e2) => {
          for (var n2 in e2) r.o(e2, n2) && !r.o(t2, n2) && Object.defineProperty(t2, n2, { enumerable: true, get: e2[n2] });
        }, r.g = (function() {
          if ("object" == typeof globalThis) return globalThis;
          try {
            return this || new Function("return this")();
          } catch (t2) {
            if ("object" == typeof window) return window;
          }
        })(), r.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), r.r = (t2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
        }, r.nmd = (t2) => (t2.paths = [], t2.children || (t2.children = []), t2), r.nc = void 0;
        var n = r(607);
        return n.default;
      })()));
    }
  });

  // src/editor.js
  var require_editor = __commonJS({
    "src/editor.js"() {
      init_yjs();
      init_y_websocket();
      init_y_quill();
      init_quill2();
      var import_quill_cursors = __toESM(require_quill_cursors());
      quill_default.register("modules/cursors", import_quill_cursors.default);
      var documentId = decodeURIComponent(window.location.pathname.slice(1));
      if (!documentId) window.location.href = "/";
      var COLORS2 = ["#FF5D8F", "#8B5CF6", "#F5A524", "#06B6D4", "#4F7CFF"];
      function getIdentity() {
        let id2 = null;
        try {
          id2 = JSON.parse(localStorage.getItem("collab-identity"));
        } catch (e) {
        }
        if (!id2 || !id2.name || !id2.color) {
          id2 = { name: "Guest " + Math.floor(100 + Math.random() * 900), color: COLORS2[Math.floor(Math.random() * COLORS2.length)] };
          try {
            localStorage.setItem("collab-identity", JSON.stringify(id2));
          } catch (e) {
          }
        }
        return id2;
      }
      var me = getIdentity();
      var TOOLBAR_OPTIONS = [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["clean"]
      ];
      var quill = new quill_default("#editor", {
        theme: "snow",
        modules: { cursors: true, toolbar: TOOLBAR_OPTIONS },
        placeholder: "Start writing\u2026"
      });
      quill.disable();
      async function start() {
        let token, wsUrl;
        try {
          const res = await fetch("/api/ws-token");
          if (res.status === 401) {
            window.location.href = "/login";
            return;
          }
          const data = await res.json();
          token = data.token;
          wsUrl = data.wsUrl;
        } catch (e) {
          window.location.href = "/login";
          return;
        }
        const ydoc = new Doc();
        const provider = new WebsocketProvider(wsUrl, documentId, ydoc, { params: { token } });
        provider.awareness.setLocalStateField("user", { name: me.name, color: me.color });
        const ytext = ydoc.getText("quill");
        const binding = new QuillBinding(ytext, quill, provider.awareness);
        let enabled = false;
        const enable = () => {
          if (!enabled) {
            enabled = true;
            quill.enable();
          }
        };
        provider.on("status", (e) => console.log("[yjs] connection:", e.status));
        provider.once("sync", enable);
        setTimeout(enable, 2e3);
      }
      start();
    }
  });
  require_editor();
})();
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" --repo lodash/lodash#4.18.1 -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)

quill-cursors/dist/quill-cursors.js:
  (*! For license information please see quill-cursors.js.LICENSE.txt *)
*/
