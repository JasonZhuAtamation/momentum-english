// Momentum UI revision 2026.10.13-expedition.2 — generated from local source modules.

// outputs/english_coach_illustrated/journey-map.js
var POINTS = [[520, 960], [400, 900], [280, 810], [185, 715], [225, 625], [330, 585], [440, 560], [535, 535], [630, 510], [730, 485], [830, 500], [930, 490], [990, 420], [960, 345], [1060, 355], [1160, 355], [1260, 345], [1360, 330], [1450, 300], [1480, 220], [1400, 220], [1320, 245], [1240, 230], [1210, 140], [1300, 130], [1400, 110]];
function routePath(points = POINTS) {
  return points.map(([x, y], i) => {
    if (!i) return `M ${x} ${y}`;
    const a = points[i - 1], b = points[Math.max(0, i - 2)], c = points[Math.min(points.length - 1, i + 1)];
    return `C ${a[0] + (x - b[0]) / 6} ${a[1] + (y - b[1]) / 6}, ${x - (c[0] - a[0]) / 6} ${y - (c[1] - a[1]) / 6}, ${x} ${y}`;
  }).join(" ");
}
function mapMarkup(weeks, infos, selected, current, escape) {
  const starts = [1, 5, 9, 13, 17, 22];
  const segments = POINTS.slice(1).map((point, i) => infos[i].status === "complete" ? `<path class="route-earned" d="${segmentPath(i)}"/>` : "").join("");
  return `<svg class="map-route" viewBox="0 0 1536 1024" aria-hidden="true"><path class="route-base" d="${routePath()}"/>${segments}<path class="route-preview" d="${routePath()}"/><circle class="route-traveler" r="10" cx="520" cy="960"/></svg><div class="map-light" aria-hidden="true"></div>${starts.map((number) => {
    const w = weeks[number - 1], [x, y] = POINTS[number - 1];
    return `<span class="map-landmark" style="left:${x / 15.36}%;top:${(y - 45) / 10.24}%">${escape(w.phase)}</span>`;
  }).join("")}${weeks.map((w, i) => {
    const info = infos[i], status = { complete: "\u5DF2\u5B8C\u6210", current: "\u5F53\u524D\u5468", unfinished: "\u672A\u5B8C\u6210" }[info.status];
    const [x, y] = POINTS[i];
    const label = `\u7B2C${w.number}\u5468 ${w.topic} \xB7 ${status} \xB7 \u5B8C\u6210${info.completed}/${info.total}\u5B66\u4E60\u65E5`;
    return `<button type="button" class="journey-node ${info.status} ${selected === w.number ? "selected" : ""}" style="left:${x / 15.36}%;top:${y / 10.24}%" data-journey-week="${w.number}" aria-pressed="${selected === w.number}" ${current === w.number ? 'aria-current="step"' : ""} aria-label="${escape(label)}" title="${escape(label)}"><span class="journey-number">${w.number}</span><span class="map-node-label">${selected === w.number || current === w.number ? escape(w.topic) : ""}</span></button>`;
  }).join("")}`;
}
function segmentPath(i) {
  const parts = routePath().split(/ (?=C )/);
  return `M ${POINTS[i].join(" ")} ${parts[i + 1]}`;
}

// work/motion-deps/node_modules/animejs/dist/modules/core/consts.js
var isBrowser = typeof window !== "undefined";
var win = isBrowser ? (
  /** @type {AnimeJSWindow} */
  /** @type {unknown} */
  window
) : null;
var doc = isBrowser ? document : null;
var tweenTypes = {
  OBJECT: 0,
  ATTRIBUTE: 1,
  CSS: 2,
  TRANSFORM: 3,
  CSS_VAR: 4
};
var valueTypes = {
  NUMBER: 0,
  UNIT: 1,
  COLOR: 2,
  COMPLEX: 3
};
var tickModes = {
  NONE: 0,
  AUTO: 1,
  FORCE: 2
};
var compositionTypes = {
  replace: 0,
  none: 1,
  blend: 2
};
var isRegisteredTargetSymbol = Symbol();
var isDomSymbol = Symbol();
var isSvgSymbol = Symbol();
var transformsSymbol = Symbol();
var morphPointsSymbol = Symbol();
var proxyTargetSymbol = Symbol();
var minValue = 1e-11;
var maxValue = 1e12;
var K = 1e3;
var maxFps = 240;
var emptyString = "";
var cssVarPrefix = "var(";
var shortTransforms = /* @__PURE__ */ (() => {
  const map = /* @__PURE__ */ new Map();
  map.set("x", "translateX");
  map.set("y", "translateY");
  map.set("z", "translateZ");
  return map;
})();
var validTransforms = [
  "translateX",
  "translateY",
  "translateZ",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "scale",
  "scaleX",
  "scaleY",
  "scaleZ",
  "skew",
  "skewX",
  "skewY",
  "matrix",
  "matrix3d",
  "perspective"
];
var transformsFragmentStrings = /* @__PURE__ */ validTransforms.reduce((a, v) => ({ ...a, [v]: v + "(" }), {});
var noop = () => {
};
var hexTestRgx = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i;
var rgbExecRgx = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i;
var rgbaExecRgx = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i;
var hslExecRgx = /hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i;
var hslaExecRgx = /hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i;
var digitWithExponentRgx = /[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi;
var unitsExecRgx = /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i;
var lowerCaseRgx = /([a-z])([A-Z])/g;
var transformsExecRgx = /(\w+)(\([^)]+\)+)/g;
var relativeValuesExecRgx = /(\*=|\+=|-=)/;
var cssVariableMatchRgx = /var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)/;

// work/motion-deps/node_modules/animejs/dist/modules/core/globals.js
var defaults = {
  id: null,
  keyframes: null,
  playbackEase: null,
  playbackRate: 1,
  frameRate: maxFps,
  loop: 0,
  reversed: false,
  alternate: false,
  autoplay: true,
  persist: false,
  duration: K,
  delay: 0,
  loopDelay: 0,
  ease: "out(2)",
  composition: compositionTypes.replace,
  modifier: (v) => v,
  onBegin: noop,
  onBeforeUpdate: noop,
  onUpdate: noop,
  onLoop: noop,
  onPause: noop,
  onComplete: noop,
  onRender: noop
};
var scope = {
  /** @type {Scope} */
  current: null,
  /** @type {Document|DOMTarget} */
  root: doc
};
var globals = {
  /** @type {DefaultsParams} */
  defaults,
  /** @type {Number} */
  precision: 4,
  /** @type {Number} equals 1 in ms mode, 0.001 in s mode */
  timeScale: 1,
  /** @type {Number} */
  tickThreshold: 200
};
var devTools = isBrowser && win.AnimeJSDevTools;
var globalVersions = { version: "4.3.0", engine: null };
if (isBrowser) {
  if (!win.AnimeJS) win.AnimeJS = [];
  win.AnimeJS.push(globalVersions);
}

// work/motion-deps/node_modules/animejs/dist/modules/core/helpers.js
var toLowerCase = (str) => str.replace(lowerCaseRgx, "$1-$2").toLowerCase();
var stringStartsWith = (str, sub) => str.indexOf(sub) === 0;
var now = Date.now;
var isArr = Array.isArray;
var isObj = (a) => a && a.constructor === Object;
var isNum = (a) => typeof a === "number" && !isNaN(a);
var isStr = (a) => typeof a === "string";
var isFnc = (a) => typeof a === "function";
var isUnd = (a) => typeof a === "undefined";
var isNil = (a) => isUnd(a) || a === null;
var isSvg = (a) => isBrowser && a instanceof SVGElement;
var isHex = (a) => hexTestRgx.test(a);
var isRgb = (a) => stringStartsWith(a, "rgb") && a[a.length - 1] === ")";
var isHsl = (a) => stringStartsWith(a, "hsl") && a[a.length - 1] === ")";
var isCol = (a) => isHex(a) || isRgb(a) || isHsl(a);
var isKey = (a) => !globals.defaults.hasOwnProperty(a);
var svgCssReservedProperties = ["opacity", "rotate", "overflow", "color"];
var isValidSVGAttribute = (el, propertyName) => {
  if (svgCssReservedProperties.includes(propertyName)) return false;
  if (el.getAttribute(propertyName) || propertyName in el) {
    if (propertyName === "scale") {
      const elParentNode = (
        /** @type {SVGGeometryElement} */
        /** @type {DOMTarget} */
        el.parentNode
      );
      return elParentNode && elParentNode.tagName === "filter";
    }
    return true;
  }
};
var parseNumber = (str) => isStr(str) ? parseFloat(
  /** @type {String} */
  str
) : (
  /** @type {Number} */
  str
);
var pow = Math.pow;
var sqrt = Math.sqrt;
var sin = Math.sin;
var cos = Math.cos;
var abs = Math.abs;
var floor = Math.floor;
var asin = Math.asin;
var max = Math.max;
var PI = Math.PI;
var _round = Math.round;
var clamp = (v, min, max2) => v < min ? min : v > max2 ? max2 : v;
var powCache = {};
var round = (v, decimalLength) => {
  if (decimalLength < 0) return v;
  if (!decimalLength) return _round(v);
  let p = powCache[decimalLength];
  if (!p) p = powCache[decimalLength] = 10 ** decimalLength;
  return _round(v * p) / p;
};
var lerp = (start2, end, factor) => start2 + (end - start2) * factor;
var clampInfinity = (v) => v === Infinity ? maxValue : v === -Infinity ? -maxValue : v;
var normalizeTime = (v) => v <= minValue ? minValue : clampInfinity(round(v, 11));
var cloneArray = (a) => isArr(a) ? [...a] : a;
var mergeObjects = (o1, o2) => {
  const merged = (
    /** @type {T & U} */
    { ...o1 }
  );
  for (let p in o2) {
    const o1p = (
      /** @type {T & U} */
      o1[p]
    );
    merged[p] = isUnd(o1p) ? (
      /** @type {T & U} */
      o2[p]
    ) : o1p;
  }
  return merged;
};
var forEachChildren = (parent, callback, reverse, prevProp = "_prev", nextProp = "_next") => {
  let next = parent._head;
  let adjustedNextProp = nextProp;
  if (reverse) {
    next = parent._tail;
    adjustedNextProp = prevProp;
  }
  while (next) {
    const currentNext = next[adjustedNextProp];
    callback(next);
    next = currentNext;
  }
};
var removeChild = (parent, child, prevProp = "_prev", nextProp = "_next") => {
  const prev = child[prevProp];
  const next = child[nextProp];
  prev ? prev[nextProp] = next : parent._head = next;
  next ? next[prevProp] = prev : parent._tail = prev;
  child[prevProp] = null;
  child[nextProp] = null;
};
var addChild = (parent, child, sortMethod, prevProp = "_prev", nextProp = "_next") => {
  let prev = parent._tail;
  while (prev && sortMethod && sortMethod(prev, child)) prev = prev[prevProp];
  const next = prev ? prev[nextProp] : parent._head;
  prev ? prev[nextProp] = child : parent._head = child;
  next ? next[prevProp] = child : parent._tail = child;
  child[prevProp] = prev;
  child[nextProp] = next;
};

// work/motion-deps/node_modules/animejs/dist/modules/core/transforms.js
var parseInlineTransforms = (target, propName, animationInlineStyles) => {
  const inlineTransforms = target.style.transform;
  let inlinedStylesPropertyValue;
  if (inlineTransforms) {
    const cachedTransforms = target[transformsSymbol];
    let t;
    while (t = transformsExecRgx.exec(inlineTransforms)) {
      const inlinePropertyName = t[1];
      const inlinePropertyValue = t[2].slice(1, -1);
      cachedTransforms[inlinePropertyName] = inlinePropertyValue;
      if (inlinePropertyName === propName) {
        inlinedStylesPropertyValue = inlinePropertyValue;
        if (animationInlineStyles) {
          animationInlineStyles[propName] = inlinePropertyValue;
        }
      }
    }
  }
  return inlineTransforms && !isUnd(inlinedStylesPropertyValue) ? inlinedStylesPropertyValue : stringStartsWith(propName, "scale") ? "1" : stringStartsWith(propName, "rotate") || stringStartsWith(propName, "skew") ? "0deg" : "0px";
};

// work/motion-deps/node_modules/animejs/dist/modules/core/colors.js
var rgbToRgba = (rgbValue) => {
  const rgba = rgbExecRgx.exec(rgbValue) || rgbaExecRgx.exec(rgbValue);
  const a = !isUnd(rgba[4]) ? +rgba[4] : 1;
  return [
    +rgba[1],
    +rgba[2],
    +rgba[3],
    a
  ];
};
var hexToRgba = (hexValue) => {
  const hexLength = hexValue.length;
  const isShort = hexLength === 4 || hexLength === 5;
  return [
    +("0x" + hexValue[1] + hexValue[isShort ? 1 : 2]),
    +("0x" + hexValue[isShort ? 2 : 3] + hexValue[isShort ? 2 : 4]),
    +("0x" + hexValue[isShort ? 3 : 5] + hexValue[isShort ? 3 : 6]),
    hexLength === 5 || hexLength === 9 ? +(+("0x" + hexValue[isShort ? 4 : 7] + hexValue[isShort ? 4 : 8]) / 255).toFixed(3) : 1
  ];
};
var hue2rgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p;
};
var hslToRgba = (hslValue) => {
  const hsla = hslExecRgx.exec(hslValue) || hslaExecRgx.exec(hslValue);
  const h = +hsla[1] / 360;
  const s = +hsla[2] / 100;
  const l = +hsla[3] / 100;
  const a = !isUnd(hsla[4]) ? +hsla[4] : 1;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = round(hue2rgb(p, q, h + 1 / 3) * 255, 0);
    g = round(hue2rgb(p, q, h) * 255, 0);
    b = round(hue2rgb(p, q, h - 1 / 3) * 255, 0);
  }
  return [r, g, b, a];
};
var convertColorStringValuesToRgbaArray = (colorString) => {
  return isRgb(colorString) ? rgbToRgba(colorString) : isHex(colorString) ? hexToRgba(colorString) : isHsl(colorString) ? hslToRgba(colorString) : [0, 0, 0, 1];
};

// work/motion-deps/node_modules/animejs/dist/modules/core/values.js
var setValue = (targetValue, defaultValue) => {
  return isUnd(targetValue) ? defaultValue : targetValue;
};
var getFunctionValue = (value, target, index, total, store) => {
  let func;
  if (isFnc(value)) {
    func = () => {
      const computed = (
        /** @type {Function} */
        value(target, index, total)
      );
      return !isNaN(+computed) ? +computed : computed || 0;
    };
  } else if (isStr(value) && stringStartsWith(value, cssVarPrefix)) {
    func = () => {
      const match = value.match(cssVariableMatchRgx);
      const cssVarName = match[1];
      const fallbackValue = match[2];
      let computed = getComputedStyle(
        /** @type {HTMLElement} */
        target
      )?.getPropertyValue(cssVarName);
      if ((!computed || computed.trim() === emptyString) && fallbackValue) {
        computed = fallbackValue.trim();
      }
      return computed || 0;
    };
  } else {
    return value;
  }
  if (store) store.func = func;
  return func();
};
var getTweenType = (target, prop) => {
  return !target[isDomSymbol] ? tweenTypes.OBJECT : (
    // Handle SVG attributes
    target[isSvgSymbol] && isValidSVGAttribute(target, prop) ? tweenTypes.ATTRIBUTE : (
      // Handle CSS Transform properties differently than CSS to allow individual animations
      validTransforms.includes(prop) || shortTransforms.get(prop) ? tweenTypes.TRANSFORM : (
        // CSS variables
        stringStartsWith(prop, "--") ? tweenTypes.CSS_VAR : (
          // All other CSS properties
          prop in /** @type {DOMTarget} */
          target.style ? tweenTypes.CSS : (
            // Handle other DOM Attributes
            prop in target ? tweenTypes.OBJECT : tweenTypes.ATTRIBUTE
          )
        )
      )
    )
  );
};
var getCSSValue = (target, propName, animationInlineStyles) => {
  const inlineStyles = target.style[propName];
  if (inlineStyles && animationInlineStyles) {
    animationInlineStyles[propName] = inlineStyles;
  }
  const value = inlineStyles || getComputedStyle(target[proxyTargetSymbol] || target).getPropertyValue(propName);
  return value === "auto" ? "0" : value;
};
var getOriginalAnimatableValue = (target, propName, tweenType, animationInlineStyles) => {
  const type = !isUnd(tweenType) ? tweenType : getTweenType(target, propName);
  return type === tweenTypes.OBJECT ? target[propName] || 0 : type === tweenTypes.ATTRIBUTE ? (
    /** @type {DOMTarget} */
    target.getAttribute(propName)
  ) : type === tweenTypes.TRANSFORM ? parseInlineTransforms(
    /** @type {DOMTarget} */
    target,
    propName,
    animationInlineStyles
  ) : type === tweenTypes.CSS_VAR ? getCSSValue(
    /** @type {DOMTarget} */
    target,
    propName,
    animationInlineStyles
  ).trimStart() : getCSSValue(
    /** @type {DOMTarget} */
    target,
    propName,
    animationInlineStyles
  );
};
var getRelativeValue = (x, y, operator) => {
  return operator === "-" ? x - y : operator === "+" ? x + y : x * y;
};
var createDecomposedValueTargetObject = () => {
  return {
    /** @type {valueTypes} */
    t: valueTypes.NUMBER,
    n: 0,
    u: null,
    o: null,
    d: null,
    s: null
  };
};
var decomposeRawValue = (rawValue, targetObject) => {
  targetObject.t = valueTypes.NUMBER;
  targetObject.n = 0;
  targetObject.u = null;
  targetObject.o = null;
  targetObject.d = null;
  targetObject.s = null;
  if (!rawValue) return targetObject;
  const num = +rawValue;
  if (!isNaN(num)) {
    targetObject.n = num;
    return targetObject;
  } else {
    let str = (
      /** @type {String} */
      rawValue
    );
    if (str[1] === "=") {
      targetObject.o = str[0];
      str = str.slice(2);
    }
    const unitMatch = str.includes(" ") ? false : unitsExecRgx.exec(str);
    if (unitMatch) {
      targetObject.t = valueTypes.UNIT;
      targetObject.n = +unitMatch[1];
      targetObject.u = unitMatch[2];
      return targetObject;
    } else if (targetObject.o) {
      targetObject.n = +str;
      return targetObject;
    } else if (isCol(str)) {
      targetObject.t = valueTypes.COLOR;
      targetObject.d = convertColorStringValuesToRgbaArray(str);
      return targetObject;
    } else {
      const matchedNumbers = str.match(digitWithExponentRgx);
      targetObject.t = valueTypes.COMPLEX;
      targetObject.d = matchedNumbers ? matchedNumbers.map(Number) : [];
      targetObject.s = str.split(digitWithExponentRgx) || [];
      return targetObject;
    }
  }
};
var decomposeTweenValue = (tween2, targetObject) => {
  targetObject.t = tween2._valueType;
  targetObject.n = tween2._toNumber;
  targetObject.u = tween2._unit;
  targetObject.o = null;
  targetObject.d = cloneArray(tween2._toNumbers);
  targetObject.s = cloneArray(tween2._strings);
  return targetObject;
};
var decomposedOriginalValue = createDecomposedValueTargetObject();

// work/motion-deps/node_modules/animejs/dist/modules/core/render.js
var render = (tickable, time, muteCallbacks, internalRender, tickMode) => {
  const parent = tickable.parent;
  const duration = tickable.duration;
  const completed = tickable.completed;
  const iterationDuration = tickable.iterationDuration;
  const iterationCount = tickable.iterationCount;
  const _currentIteration = tickable._currentIteration;
  const _loopDelay = tickable._loopDelay;
  const _reversed = tickable._reversed;
  const _alternate = tickable._alternate;
  const _hasChildren = tickable._hasChildren;
  const tickableDelay = tickable._delay;
  const tickablePrevAbsoluteTime = tickable._currentTime;
  const tickableEndTime = tickableDelay + iterationDuration;
  const tickableAbsoluteTime = time - tickableDelay;
  const tickablePrevTime = clamp(tickablePrevAbsoluteTime, -tickableDelay, duration);
  const tickableCurrentTime = clamp(tickableAbsoluteTime, -tickableDelay, duration);
  const deltaTime = tickableAbsoluteTime - tickablePrevAbsoluteTime;
  const isCurrentTimeAboveZero = tickableCurrentTime > 0;
  const isCurrentTimeEqualOrAboveDuration = tickableCurrentTime >= duration;
  const isSetter = duration <= minValue;
  const forcedTick = tickMode === tickModes.FORCE;
  let isOdd = 0;
  let iterationElapsedTime = tickableAbsoluteTime;
  let hasRendered = 0;
  if (iterationCount > 1) {
    const currentIteration = ~~(tickableCurrentTime / (iterationDuration + (isCurrentTimeEqualOrAboveDuration ? 0 : _loopDelay)));
    tickable._currentIteration = clamp(currentIteration, 0, iterationCount);
    if (isCurrentTimeEqualOrAboveDuration) tickable._currentIteration--;
    isOdd = tickable._currentIteration % 2;
    iterationElapsedTime = tickableCurrentTime % (iterationDuration + _loopDelay) || 0;
  }
  const isReversed = _reversed ^ (_alternate && isOdd);
  const _ease = (
    /** @type {Renderable} */
    tickable._ease
  );
  let iterationTime = isCurrentTimeEqualOrAboveDuration ? isReversed ? 0 : duration : isReversed ? iterationDuration - iterationElapsedTime : iterationElapsedTime;
  if (_ease) iterationTime = iterationDuration * _ease(iterationTime / iterationDuration) || 0;
  const isRunningBackwards = (parent ? parent.backwards : tickableAbsoluteTime < tickablePrevAbsoluteTime) ? !isReversed : !!isReversed;
  tickable._currentTime = tickableAbsoluteTime;
  tickable._iterationTime = iterationTime;
  tickable.backwards = isRunningBackwards;
  if (isCurrentTimeAboveZero && !tickable.began) {
    tickable.began = true;
    if (!muteCallbacks && !(parent && (isRunningBackwards || !parent.began))) {
      tickable.onBegin(
        /** @type {CallbackArgument} */
        tickable
      );
    }
  } else if (tickableAbsoluteTime <= 0) {
    tickable.began = false;
  }
  if (!muteCallbacks && !_hasChildren && isCurrentTimeAboveZero && tickable._currentIteration !== _currentIteration) {
    tickable.onLoop(
      /** @type {CallbackArgument} */
      tickable
    );
  }
  if (forcedTick || tickMode === tickModes.AUTO && (time >= tickableDelay && time <= tickableEndTime || // Normal render
  time <= tickableDelay && tickablePrevTime > tickableDelay || // Playhead is before the animation start time so make sure the animation is at its initial state
  time >= tickableEndTime && tickablePrevTime !== duration) || iterationTime >= tickableEndTime && tickablePrevTime !== duration || iterationTime <= tickableDelay && tickablePrevTime > 0 || time <= tickablePrevTime && tickablePrevTime === duration && completed || // Force a render if a seek occurs on an completed animation
  isCurrentTimeEqualOrAboveDuration && !completed && isSetter) {
    if (isCurrentTimeAboveZero) {
      tickable.computeDeltaTime(tickablePrevTime);
      if (!muteCallbacks) tickable.onBeforeUpdate(
        /** @type {CallbackArgument} */
        tickable
      );
    }
    if (!_hasChildren) {
      const forcedRender = forcedTick || (isRunningBackwards ? deltaTime * -1 : deltaTime) >= globals.tickThreshold;
      const absoluteTime = tickable._offset + (parent ? parent._offset : 0) + tickableDelay + iterationTime;
      let tween2 = (
        /** @type {Tween} */
        /** @type {JSAnimation} */
        tickable._head
      );
      let tweenTarget;
      let tweenStyle;
      let tweenTargetTransforms;
      let tweenTargetTransformsProperties;
      let tweenTransformsNeedUpdate = 0;
      while (tween2) {
        const tweenComposition = tween2._composition;
        const tweenCurrentTime = tween2._currentTime;
        const tweenChangeDuration = tween2._changeDuration;
        const tweenAbsEndTime = tween2._absoluteStartTime + tween2._changeDuration;
        const tweenNextRep = tween2._nextRep;
        const tweenPrevRep = tween2._prevRep;
        const tweenHasComposition = tweenComposition !== compositionTypes.none;
        if ((forcedRender || (tweenCurrentTime !== tweenChangeDuration || absoluteTime <= tweenAbsEndTime + (tweenNextRep ? tweenNextRep._delay : 0)) && (tweenCurrentTime !== 0 || absoluteTime >= tween2._absoluteStartTime)) && (!tweenHasComposition || !tween2._isOverridden && (!tween2._isOverlapped || absoluteTime <= tweenAbsEndTime) && (!tweenNextRep || (tweenNextRep._isOverridden || absoluteTime <= tweenNextRep._absoluteStartTime)) && (!tweenPrevRep || (tweenPrevRep._isOverridden || absoluteTime >= tweenPrevRep._absoluteStartTime + tweenPrevRep._changeDuration + tween2._delay)))) {
          const tweenNewTime = tween2._currentTime = clamp(iterationTime - tween2._startTime, 0, tweenChangeDuration);
          const tweenProgress = tween2._ease(tweenNewTime / tween2._updateDuration);
          const tweenModifier = tween2._modifier;
          const tweenValueType = tween2._valueType;
          const tweenType = tween2._tweenType;
          const tweenIsObject = tweenType === tweenTypes.OBJECT;
          const tweenIsNumber = tweenValueType === valueTypes.NUMBER;
          const tweenPrecision = tweenIsNumber && tweenIsObject || tweenProgress === 0 || tweenProgress === 1 ? -1 : globals.precision;
          let value;
          let number;
          if (tweenIsNumber) {
            value = number = /** @type {Number} */
            tweenModifier(round(lerp(tween2._fromNumber, tween2._toNumber, tweenProgress), tweenPrecision));
          } else if (tweenValueType === valueTypes.UNIT) {
            number = /** @type {Number} */
            tweenModifier(round(lerp(tween2._fromNumber, tween2._toNumber, tweenProgress), tweenPrecision));
            value = `${number}${tween2._unit}`;
          } else if (tweenValueType === valueTypes.COLOR) {
            const fn = tween2._fromNumbers;
            const tn = tween2._toNumbers;
            const r = round(clamp(
              /** @type {Number} */
              tweenModifier(lerp(fn[0], tn[0], tweenProgress)),
              0,
              255
            ), 0);
            const g = round(clamp(
              /** @type {Number} */
              tweenModifier(lerp(fn[1], tn[1], tweenProgress)),
              0,
              255
            ), 0);
            const b = round(clamp(
              /** @type {Number} */
              tweenModifier(lerp(fn[2], tn[2], tweenProgress)),
              0,
              255
            ), 0);
            const a = clamp(
              /** @type {Number} */
              tweenModifier(round(lerp(fn[3], tn[3], tweenProgress), tweenPrecision)),
              0,
              1
            );
            value = `rgba(${r},${g},${b},${a})`;
            if (tweenHasComposition) {
              const ns = tween2._numbers;
              ns[0] = r;
              ns[1] = g;
              ns[2] = b;
              ns[3] = a;
            }
          } else if (tweenValueType === valueTypes.COMPLEX) {
            value = tween2._strings[0];
            for (let j = 0, l = tween2._toNumbers.length; j < l; j++) {
              const n = (
                /** @type {Number} */
                tweenModifier(round(lerp(tween2._fromNumbers[j], tween2._toNumbers[j], tweenProgress), tweenPrecision))
              );
              const s = tween2._strings[j + 1];
              value += `${s ? n + s : n}`;
              if (tweenHasComposition) {
                tween2._numbers[j] = n;
              }
            }
          }
          if (tweenHasComposition) {
            tween2._number = number;
          }
          if (!internalRender && tweenComposition !== compositionTypes.blend) {
            const tweenProperty = tween2.property;
            tweenTarget = tween2.target;
            if (tweenIsObject) {
              tweenTarget[tweenProperty] = value;
            } else if (tweenType === tweenTypes.ATTRIBUTE) {
              tweenTarget.setAttribute(
                tweenProperty,
                /** @type {String} */
                value
              );
            } else {
              tweenStyle = /** @type {DOMTarget} */
              tweenTarget.style;
              if (tweenType === tweenTypes.TRANSFORM) {
                if (tweenTarget !== tweenTargetTransforms) {
                  tweenTargetTransforms = tweenTarget;
                  tweenTargetTransformsProperties = tweenTarget[transformsSymbol];
                }
                tweenTargetTransformsProperties[tweenProperty] = value;
                tweenTransformsNeedUpdate = 1;
              } else if (tweenType === tweenTypes.CSS) {
                tweenStyle[tweenProperty] = value;
              } else if (tweenType === tweenTypes.CSS_VAR) {
                tweenStyle.setProperty(
                  tweenProperty,
                  /** @type {String} */
                  value
                );
              }
            }
            if (isCurrentTimeAboveZero) hasRendered = 1;
          } else {
            tween2._value = value;
          }
        }
        if (tweenTransformsNeedUpdate && tween2._renderTransforms) {
          let str = emptyString;
          for (let key2 in tweenTargetTransformsProperties) {
            str += `${transformsFragmentStrings[key2]}${tweenTargetTransformsProperties[key2]}) `;
          }
          tweenStyle.transform = str;
          tweenTransformsNeedUpdate = 0;
        }
        tween2 = tween2._next;
      }
      if (!muteCallbacks && hasRendered) {
        tickable.onRender(
          /** @type {JSAnimation} */
          tickable
        );
      }
    }
    if (!muteCallbacks && isCurrentTimeAboveZero) {
      tickable.onUpdate(
        /** @type {CallbackArgument} */
        tickable
      );
    }
  }
  if (parent && isSetter) {
    if (!muteCallbacks && // (tickableAbsoluteTime > 0 instead) of (tickableAbsoluteTime >= duration) to prevent floating point precision issues
    // see: https://github.com/juliangarnier/anime/issues/1088
    (parent.began && !isRunningBackwards && tickableAbsoluteTime > 0 && !completed || isRunningBackwards && tickableAbsoluteTime <= minValue && completed)) {
      tickable.onComplete(
        /** @type {CallbackArgument} */
        tickable
      );
      tickable.completed = !isRunningBackwards;
    }
  } else if (isCurrentTimeAboveZero && isCurrentTimeEqualOrAboveDuration) {
    if (iterationCount === Infinity) {
      tickable._startTime += tickable.duration;
    } else if (tickable._currentIteration >= iterationCount - 1) {
      tickable.paused = true;
      if (!completed && !_hasChildren) {
        tickable.completed = true;
        if (!muteCallbacks && !(parent && (isRunningBackwards || !parent.began))) {
          tickable.onComplete(
            /** @type {CallbackArgument} */
            tickable
          );
          tickable._resolve(
            /** @type {CallbackArgument} */
            tickable
          );
        }
      }
    }
  } else {
    tickable.completed = false;
  }
  return hasRendered;
};
var tick = (tickable, time, muteCallbacks, internalRender, tickMode) => {
  const _currentIteration = tickable._currentIteration;
  render(tickable, time, muteCallbacks, internalRender, tickMode);
  if (tickable._hasChildren) {
    const tl = (
      /** @type {Timeline} */
      tickable
    );
    const tlIsRunningBackwards = tl.backwards;
    const tlChildrenTime = internalRender ? time : tl._iterationTime;
    const tlCildrenTickTime = now();
    let tlChildrenHasRendered = 0;
    let tlChildrenHaveCompleted = true;
    if (!internalRender && tl._currentIteration !== _currentIteration) {
      const tlIterationDuration = tl.iterationDuration;
      forEachChildren(tl, (child) => {
        if (!tlIsRunningBackwards) {
          if (!child.completed && !child.backwards && child._currentTime < child.iterationDuration) {
            render(child, tlIterationDuration, muteCallbacks, 1, tickModes.FORCE);
          }
          child.began = false;
          child.completed = false;
        } else {
          const childDuration = child.duration;
          const childStartTime = child._offset + child._delay;
          const childEndTime = childStartTime + childDuration;
          if (!muteCallbacks && childDuration <= minValue && (!childStartTime || childEndTime === tlIterationDuration)) {
            child.onComplete(child);
          }
        }
      });
      if (!muteCallbacks) tl.onLoop(
        /** @type {CallbackArgument} */
        tl
      );
    }
    forEachChildren(tl, (child) => {
      const childTime = round((tlChildrenTime - child._offset) * child._speed, 12);
      const childTickMode = child._fps < tl._fps ? child.requestTick(tlCildrenTickTime) : tickMode;
      tlChildrenHasRendered += render(child, childTime, muteCallbacks, internalRender, childTickMode);
      if (!child.completed && tlChildrenHaveCompleted) tlChildrenHaveCompleted = false;
    }, tlIsRunningBackwards);
    if (!muteCallbacks && tlChildrenHasRendered) tl.onRender(
      /** @type {CallbackArgument} */
      tl
    );
    if ((tlChildrenHaveCompleted || tlIsRunningBackwards) && tl._currentTime >= tl.duration) {
      tl.paused = true;
      if (!tl.completed) {
        tl.completed = true;
        if (!muteCallbacks) {
          tl.onComplete(
            /** @type {CallbackArgument} */
            tl
          );
          tl._resolve(
            /** @type {CallbackArgument} */
            tl
          );
        }
      }
    }
  }
};

// work/motion-deps/node_modules/animejs/dist/modules/core/styles.js
var propertyNamesCache = {};
var sanitizePropertyName = (propertyName, target, tweenType) => {
  if (tweenType === tweenTypes.TRANSFORM) {
    const t = shortTransforms.get(propertyName);
    return t ? t : propertyName;
  } else if (tweenType === tweenTypes.CSS || // Handle special cases where properties like "strokeDashoffset" needs to be set as "stroke-dashoffset"
  // but properties like "baseFrequency" should stay in lowerCamelCase
  tweenType === tweenTypes.ATTRIBUTE && (isSvg(target) && propertyName in /** @type {DOMTarget} */
  target.style)) {
    const cachedPropertyName = propertyNamesCache[propertyName];
    if (cachedPropertyName) {
      return cachedPropertyName;
    } else {
      const lowerCaseName = propertyName ? toLowerCase(propertyName) : propertyName;
      propertyNamesCache[propertyName] = lowerCaseName;
      return lowerCaseName;
    }
  } else {
    return propertyName;
  }
};
var cleanInlineStyles = (renderable) => {
  if (renderable._hasChildren) {
    forEachChildren(renderable, cleanInlineStyles, true);
  } else {
    const animation = (
      /** @type {JSAnimation} */
      renderable
    );
    animation.pause();
    forEachChildren(animation, (tween2) => {
      const tweenProperty = tween2.property;
      const tweenTarget = tween2.target;
      if (tweenTarget[isDomSymbol]) {
        const targetStyle = (
          /** @type {DOMTarget} */
          tweenTarget.style
        );
        const originalInlinedValue = tween2._inlineValue;
        const tweenHadNoInlineValue = isNil(originalInlinedValue) || originalInlinedValue === emptyString;
        if (tween2._tweenType === tweenTypes.TRANSFORM) {
          const cachedTransforms = tweenTarget[transformsSymbol];
          if (tweenHadNoInlineValue) {
            delete cachedTransforms[tweenProperty];
          } else {
            cachedTransforms[tweenProperty] = originalInlinedValue;
          }
          if (tween2._renderTransforms) {
            if (!Object.keys(cachedTransforms).length) {
              targetStyle.removeProperty("transform");
            } else {
              let str = emptyString;
              for (let key2 in cachedTransforms) {
                str += transformsFragmentStrings[key2] + cachedTransforms[key2] + ") ";
              }
              targetStyle.transform = str;
            }
          }
        } else {
          if (tweenHadNoInlineValue) {
            targetStyle.removeProperty(toLowerCase(tweenProperty));
          } else {
            targetStyle[tweenProperty] = originalInlinedValue;
          }
        }
        if (animation._tail === tween2) {
          animation.targets.forEach((t) => {
            if (t.getAttribute && t.getAttribute("style") === emptyString) {
              t.removeAttribute("style");
            }
          });
        }
      }
    });
  }
  return renderable;
};

// work/motion-deps/node_modules/animejs/dist/modules/core/clock.js
var Clock = class {
  /** @param {Number} [initTime] */
  constructor(initTime = 0) {
    this.deltaTime = 0;
    this._currentTime = initTime;
    this._lastTickTime = initTime;
    this._startTime = initTime;
    this._lastTime = initTime;
    this._scheduledTime = 0;
    this._frameDuration = K / maxFps;
    this._fps = maxFps;
    this._speed = 1;
    this._hasChildren = false;
    this._head = null;
    this._tail = null;
  }
  get fps() {
    return this._fps;
  }
  set fps(frameRate) {
    const previousFrameDuration = this._frameDuration;
    const fr = +frameRate;
    const fps = fr < minValue ? minValue : fr;
    const frameDuration = K / fps;
    if (fps > defaults.frameRate) defaults.frameRate = fps;
    this._fps = fps;
    this._frameDuration = frameDuration;
    this._scheduledTime += frameDuration - previousFrameDuration;
  }
  get speed() {
    return this._speed;
  }
  set speed(playbackRate) {
    const pbr = +playbackRate;
    this._speed = pbr < minValue ? minValue : pbr;
  }
  /**
   * @param  {Number} time
   * @return {tickModes}
   */
  requestTick(time) {
    const scheduledTime = this._scheduledTime;
    this._lastTickTime = time;
    if (time < scheduledTime) return tickModes.NONE;
    const frameDuration = this._frameDuration;
    const frameDelta = time - scheduledTime;
    this._scheduledTime += frameDelta < frameDuration ? frameDuration : frameDelta;
    return tickModes.AUTO;
  }
  /**
   * @param  {Number} time
   * @return {Number}
   */
  computeDeltaTime(time) {
    const delta = time - this._lastTime;
    this.deltaTime = delta;
    this._lastTime = time;
    return delta;
  }
};

// work/motion-deps/node_modules/animejs/dist/modules/animation/additive.js
var additive = {
  animation: null,
  update: noop
};
var addAdditiveAnimation = (lookups2) => {
  let animation = additive.animation;
  if (!animation) {
    animation = {
      duration: minValue,
      computeDeltaTime: noop,
      _offset: 0,
      _delay: 0,
      _head: null,
      _tail: null
    };
    additive.animation = animation;
    additive.update = () => {
      lookups2.forEach((propertyAnimation) => {
        for (let propertyName in propertyAnimation) {
          const tweens = propertyAnimation[propertyName];
          const lookupTween = tweens._head;
          if (lookupTween) {
            const valueType = lookupTween._valueType;
            const additiveValues = valueType === valueTypes.COMPLEX || valueType === valueTypes.COLOR ? cloneArray(lookupTween._fromNumbers) : null;
            let additiveValue = lookupTween._fromNumber;
            let tween2 = tweens._tail;
            while (tween2 && tween2 !== lookupTween) {
              if (additiveValues) {
                for (let i = 0, l = tween2._numbers.length; i < l; i++) additiveValues[i] += tween2._numbers[i];
              } else {
                additiveValue += tween2._number;
              }
              tween2 = tween2._prevAdd;
            }
            lookupTween._toNumber = additiveValue;
            lookupTween._toNumbers = additiveValues;
          }
        }
      });
      render(animation, 1, 1, 0, tickModes.FORCE);
    };
  }
  return animation;
};

// work/motion-deps/node_modules/animejs/dist/modules/engine/engine.js
var engineTickMethod = /* @__PURE__ */ (() => isBrowser ? requestAnimationFrame : setImmediate)();
var engineCancelMethod = /* @__PURE__ */ (() => isBrowser ? cancelAnimationFrame : clearImmediate)();
var Engine = class extends Clock {
  /** @param {Number} [initTime] */
  constructor(initTime) {
    super(initTime);
    this.useDefaultMainLoop = true;
    this.pauseOnDocumentHidden = true;
    this.defaults = defaults;
    this.paused = true;
    this.reqId = 0;
  }
  update() {
    const time = this._currentTime = now();
    if (this.requestTick(time)) {
      this.computeDeltaTime(time);
      const engineSpeed = this._speed;
      const engineFps = this._fps;
      let activeTickable = (
        /** @type {Tickable} */
        this._head
      );
      while (activeTickable) {
        const nextTickable = activeTickable._next;
        if (!activeTickable.paused) {
          tick(
            activeTickable,
            (time - activeTickable._startTime) * activeTickable._speed * engineSpeed,
            0,
            // !muteCallbacks
            0,
            // !internalRender
            activeTickable._fps < engineFps ? activeTickable.requestTick(time) : tickModes.AUTO
          );
        } else {
          removeChild(this, activeTickable);
          this._hasChildren = !!this._tail;
          activeTickable._running = false;
          if (activeTickable.completed && !activeTickable._cancelled) {
            activeTickable.cancel();
          }
        }
        activeTickable = nextTickable;
      }
      additive.update();
    }
  }
  wake() {
    if (this.useDefaultMainLoop && !this.reqId) {
      this.requestTick(now());
      this.reqId = engineTickMethod(tickEngine);
    }
    return this;
  }
  pause() {
    if (!this.reqId) return;
    this.paused = true;
    return killEngine();
  }
  resume() {
    if (!this.paused) return;
    this.paused = false;
    forEachChildren(this, (child) => child.resetTime());
    return this.wake();
  }
  // Getter and setter for speed
  get speed() {
    return this._speed * (globals.timeScale === 1 ? 1 : K);
  }
  set speed(playbackRate) {
    this._speed = playbackRate * globals.timeScale;
    forEachChildren(this, (child) => child.speed = child._speed);
  }
  // Getter and setter for timeUnit
  get timeUnit() {
    return globals.timeScale === 1 ? "ms" : "s";
  }
  set timeUnit(unit) {
    const secondsScale = 1e-3;
    const isSecond = unit === "s";
    const newScale = isSecond ? secondsScale : 1;
    if (globals.timeScale !== newScale) {
      globals.timeScale = newScale;
      globals.tickThreshold = 200 * newScale;
      const scaleFactor = isSecond ? secondsScale : K;
      this.defaults.duration *= scaleFactor;
      this._speed *= scaleFactor;
    }
  }
  // Getter and setter for precision
  get precision() {
    return globals.precision;
  }
  set precision(precision) {
    globals.precision = precision;
  }
};
var engine = /* @__PURE__ */ (() => {
  const engine2 = new Engine(now());
  if (isBrowser) {
    globalVersions.engine = engine2;
    doc.addEventListener("visibilitychange", () => {
      if (!engine2.pauseOnDocumentHidden) return;
      doc.hidden ? engine2.pause() : engine2.resume();
    });
  }
  return engine2;
})();
var tickEngine = () => {
  if (engine._head) {
    engine.reqId = engineTickMethod(tickEngine);
    engine.update();
  } else {
    engine.reqId = 0;
  }
};
var killEngine = () => {
  engineCancelMethod(
    /** @type {NodeJS.Immediate & Number} */
    engine.reqId
  );
  engine.reqId = 0;
  return engine;
};

// work/motion-deps/node_modules/animejs/dist/modules/animation/composition.js
var lookups = {
  /** @type {TweenReplaceLookups} */
  _rep: /* @__PURE__ */ new WeakMap(),
  /** @type {TweenAdditiveLookups} */
  _add: /* @__PURE__ */ new Map()
};
var getTweenSiblings = (target, property, lookup = "_rep") => {
  const lookupMap = lookups[lookup];
  let targetLookup = lookupMap.get(target);
  if (!targetLookup) {
    targetLookup = {};
    lookupMap.set(target, targetLookup);
  }
  return targetLookup[property] ? targetLookup[property] : targetLookup[property] = {
    _head: null,
    _tail: null
  };
};
var addTweenSortMethod = (p, c) => {
  return p._isOverridden || p._absoluteStartTime > c._absoluteStartTime;
};
var overrideTween = (tween2) => {
  tween2._isOverlapped = 1;
  tween2._isOverridden = 1;
  tween2._changeDuration = minValue;
  tween2._currentTime = minValue;
};
var composeTween = (tween2, siblings) => {
  const tweenCompositionType = tween2._composition;
  if (tweenCompositionType === compositionTypes.replace) {
    const tweenAbsStartTime = tween2._absoluteStartTime;
    addChild(siblings, tween2, addTweenSortMethod, "_prevRep", "_nextRep");
    const prevSibling = tween2._prevRep;
    if (prevSibling) {
      const prevParent = prevSibling.parent;
      const prevAbsEndTime = prevSibling._absoluteStartTime + prevSibling._changeDuration;
      if (
        // Check if the previous tween is from a different animation
        tween2.parent.id !== prevParent.id && // Check if the animation has loops
        prevParent.iterationCount > 1 && // Check if _absoluteChangeEndTime of last loop overlaps the current tween
        prevAbsEndTime + (prevParent.duration - prevParent.iterationDuration) > tweenAbsStartTime
      ) {
        overrideTween(prevSibling);
        let prevPrevSibling = prevSibling._prevRep;
        while (prevPrevSibling && prevPrevSibling.parent.id === prevParent.id) {
          overrideTween(prevPrevSibling);
          prevPrevSibling = prevPrevSibling._prevRep;
        }
      }
      const absoluteUpdateStartTime = tweenAbsStartTime - tween2._delay;
      if (prevAbsEndTime > absoluteUpdateStartTime) {
        const prevChangeStartTime = prevSibling._startTime;
        const prevTLOffset = prevAbsEndTime - (prevChangeStartTime + prevSibling._updateDuration);
        const updatedPrevChangeDuration = round(absoluteUpdateStartTime - prevTLOffset - prevChangeStartTime, 12);
        prevSibling._changeDuration = updatedPrevChangeDuration;
        prevSibling._currentTime = updatedPrevChangeDuration;
        prevSibling._isOverlapped = 1;
        if (updatedPrevChangeDuration < minValue) {
          overrideTween(prevSibling);
        }
      }
      let pausePrevParentAnimation = true;
      forEachChildren(prevParent, (t) => {
        if (!t._isOverlapped) pausePrevParentAnimation = false;
      });
      if (pausePrevParentAnimation) {
        const prevParentTL = prevParent.parent;
        if (prevParentTL) {
          let pausePrevParentTL = true;
          forEachChildren(prevParentTL, (a) => {
            if (a !== prevParent) {
              forEachChildren(a, (t) => {
                if (!t._isOverlapped) pausePrevParentTL = false;
              });
            }
          });
          if (pausePrevParentTL) {
            prevParentTL.cancel();
          }
        } else {
          prevParent.cancel();
        }
      }
    }
  } else if (tweenCompositionType === compositionTypes.blend) {
    const additiveTweenSiblings = getTweenSiblings(tween2.target, tween2.property, "_add");
    const additiveAnimation = addAdditiveAnimation(lookups._add);
    let lookupTween = additiveTweenSiblings._head;
    if (!lookupTween) {
      lookupTween = { ...tween2 };
      lookupTween._composition = compositionTypes.replace;
      lookupTween._updateDuration = minValue;
      lookupTween._startTime = 0;
      lookupTween._numbers = cloneArray(tween2._fromNumbers);
      lookupTween._number = 0;
      lookupTween._next = null;
      lookupTween._prev = null;
      addChild(additiveTweenSiblings, lookupTween);
      addChild(additiveAnimation, lookupTween);
    }
    const toNumber = tween2._toNumber;
    tween2._fromNumber = lookupTween._fromNumber - toNumber;
    tween2._toNumber = 0;
    tween2._numbers = cloneArray(tween2._fromNumbers);
    tween2._number = 0;
    lookupTween._fromNumber = toNumber;
    if (tween2._toNumbers) {
      const toNumbers = cloneArray(tween2._toNumbers);
      if (toNumbers) {
        toNumbers.forEach((value, i) => {
          tween2._fromNumbers[i] = lookupTween._fromNumbers[i] - value;
          tween2._toNumbers[i] = 0;
        });
      }
      lookupTween._fromNumbers = toNumbers;
    }
    addChild(additiveTweenSiblings, tween2, null, "_prevAdd", "_nextAdd");
  }
  return tween2;
};
var removeTweenSliblings = (tween2) => {
  const tweenComposition = tween2._composition;
  if (tweenComposition !== compositionTypes.none) {
    const tweenTarget = tween2.target;
    const tweenProperty = tween2.property;
    const replaceTweensLookup = lookups._rep;
    const replaceTargetProps = replaceTweensLookup.get(tweenTarget);
    const tweenReplaceSiblings = replaceTargetProps[tweenProperty];
    removeChild(tweenReplaceSiblings, tween2, "_prevRep", "_nextRep");
    if (tweenComposition === compositionTypes.blend) {
      const addTweensLookup = lookups._add;
      const addTargetProps = addTweensLookup.get(tweenTarget);
      if (!addTargetProps) return;
      const additiveTweenSiblings = addTargetProps[tweenProperty];
      const additiveAnimation = additive.animation;
      removeChild(additiveTweenSiblings, tween2, "_prevAdd", "_nextAdd");
      const lookupTween = additiveTweenSiblings._head;
      if (lookupTween && lookupTween === additiveTweenSiblings._tail) {
        removeChild(additiveTweenSiblings, lookupTween, "_prevAdd", "_nextAdd");
        removeChild(additiveAnimation, lookupTween);
        let shouldClean = true;
        for (let prop in addTargetProps) {
          if (addTargetProps[prop]._head) {
            shouldClean = false;
            break;
          }
        }
        if (shouldClean) {
          addTweensLookup.delete(tweenTarget);
        }
      }
    }
  }
  return tween2;
};

// work/motion-deps/node_modules/animejs/dist/modules/timer/timer.js
var resetTimerProperties = (timer) => {
  timer.paused = true;
  timer.began = false;
  timer.completed = false;
  return timer;
};
var reviveTimer = (timer) => {
  if (!timer._cancelled) return timer;
  if (timer._hasChildren) {
    forEachChildren(timer, reviveTimer);
  } else {
    forEachChildren(timer, (tween2) => {
      if (tween2._composition !== compositionTypes.none) {
        composeTween(tween2, getTweenSiblings(tween2.target, tween2.property));
      }
    });
  }
  timer._cancelled = 0;
  return timer;
};
var timerId = 0;
var Timer = class extends Clock {
  /**
   * @param {TimerParams} [parameters]
   * @param {Timeline} [parent]
   * @param {Number} [parentPosition]
   */
  constructor(parameters = {}, parent = null, parentPosition = 0) {
    super(0);
    ++timerId;
    const {
      id,
      delay,
      duration,
      reversed,
      alternate,
      loop,
      loopDelay,
      autoplay,
      frameRate,
      playbackRate,
      onComplete,
      onLoop,
      onPause,
      onBegin,
      onBeforeUpdate,
      onUpdate
    } = parameters;
    if (scope.current) scope.current.register(this);
    const timerInitTime = parent ? 0 : engine._lastTickTime;
    const timerDefaults = parent ? parent.defaults : globals.defaults;
    const timerDelay = (
      /** @type {Number} */
      isFnc(delay) || isUnd(delay) ? timerDefaults.delay : +delay
    );
    const timerDuration = isFnc(duration) || isUnd(duration) ? Infinity : +duration;
    const timerLoop = setValue(loop, timerDefaults.loop);
    const timerLoopDelay = setValue(loopDelay, timerDefaults.loopDelay);
    let timerIterationCount = timerLoop === true || timerLoop === Infinity || /** @type {Number} */
    timerLoop < 0 ? Infinity : (
      /** @type {Number} */
      timerLoop + 1
    );
    if (devTools) {
      const isInfinite = timerIterationCount === Infinity;
      const registered = devTools.register(this, parameters, isInfinite);
      if (registered && isInfinite) {
        const minIterations = alternate ? 2 : 1;
        const iterations = parent ? devTools.maxNestedInfiniteLoops : devTools.maxInfiniteLoops;
        timerIterationCount = Math.max(iterations, minIterations);
      }
    }
    let offsetPosition = 0;
    if (parent) {
      offsetPosition = parentPosition;
    } else {
      if (!engine.reqId) engine.requestTick(now());
      offsetPosition = (engine._lastTickTime - engine._startTime) * globals.timeScale;
    }
    this.id = !isUnd(id) ? id : timerId;
    this.parent = parent;
    this.duration = clampInfinity((timerDuration + timerLoopDelay) * timerIterationCount - timerLoopDelay) || minValue;
    this.backwards = false;
    this.paused = true;
    this.began = false;
    this.completed = false;
    this.onBegin = onBegin || timerDefaults.onBegin;
    this.onBeforeUpdate = onBeforeUpdate || timerDefaults.onBeforeUpdate;
    this.onUpdate = onUpdate || timerDefaults.onUpdate;
    this.onLoop = onLoop || timerDefaults.onLoop;
    this.onPause = onPause || timerDefaults.onPause;
    this.onComplete = onComplete || timerDefaults.onComplete;
    this.iterationDuration = timerDuration;
    this.iterationCount = timerIterationCount;
    this._autoplay = parent ? false : setValue(autoplay, timerDefaults.autoplay);
    this._offset = offsetPosition;
    this._delay = timerDelay;
    this._loopDelay = timerLoopDelay;
    this._iterationTime = 0;
    this._currentIteration = 0;
    this._resolve = noop;
    this._running = false;
    this._reversed = +setValue(reversed, timerDefaults.reversed);
    this._reverse = this._reversed;
    this._cancelled = 0;
    this._alternate = setValue(alternate, timerDefaults.alternate);
    this._prev = null;
    this._next = null;
    this._lastTickTime = timerInitTime;
    this._startTime = timerInitTime;
    this._lastTime = timerInitTime;
    this._fps = setValue(frameRate, timerDefaults.frameRate);
    this._speed = setValue(playbackRate, timerDefaults.playbackRate);
  }
  get cancelled() {
    return !!this._cancelled;
  }
  set cancelled(cancelled) {
    cancelled ? this.cancel() : this.reset(true).play();
  }
  get currentTime() {
    return clamp(round(this._currentTime, globals.precision), -this._delay, this.duration);
  }
  set currentTime(time) {
    const paused2 = this.paused;
    this.pause().seek(+time);
    if (!paused2) this.resume();
  }
  get iterationCurrentTime() {
    return clamp(round(this._iterationTime, globals.precision), 0, this.iterationDuration);
  }
  set iterationCurrentTime(time) {
    this.currentTime = this.iterationDuration * this._currentIteration + time;
  }
  get progress() {
    return clamp(round(this._currentTime / this.duration, 10), 0, 1);
  }
  set progress(progress) {
    this.currentTime = this.duration * progress;
  }
  get iterationProgress() {
    return clamp(round(this._iterationTime / this.iterationDuration, 10), 0, 1);
  }
  set iterationProgress(progress) {
    const iterationDuration = this.iterationDuration;
    this.currentTime = iterationDuration * this._currentIteration + iterationDuration * progress;
  }
  get currentIteration() {
    return this._currentIteration;
  }
  set currentIteration(iterationCount) {
    this.currentTime = this.iterationDuration * clamp(+iterationCount, 0, this.iterationCount - 1);
  }
  get reversed() {
    return !!this._reversed;
  }
  set reversed(reverse) {
    reverse ? this.reverse() : this.play();
  }
  get speed() {
    return super.speed;
  }
  set speed(playbackRate) {
    super.speed = playbackRate;
    this.resetTime();
  }
  /**
   * @param  {Boolean} [softReset]
   * @return {this}
   */
  reset(softReset = false) {
    reviveTimer(this);
    if (this._reversed && !this._reverse) this.reversed = false;
    this._iterationTime = this.iterationDuration;
    tick(this, 0, 1, ~~softReset, tickModes.FORCE);
    resetTimerProperties(this);
    if (this._hasChildren) {
      forEachChildren(this, resetTimerProperties);
    }
    return this;
  }
  /**
   * @param  {Boolean} internalRender
   * @return {this}
   */
  init(internalRender = false) {
    this.fps = this._fps;
    this.speed = this._speed;
    if (!internalRender && this._hasChildren) {
      tick(this, this.duration, 1, ~~internalRender, tickModes.FORCE);
    }
    this.reset(internalRender);
    const autoplay = this._autoplay;
    if (autoplay === true) {
      this.resume();
    } else if (autoplay && !isUnd(
      /** @type {ScrollObserver} */
      autoplay.linked
    )) {
      autoplay.link(this);
    }
    return this;
  }
  /** @return {this} */
  resetTime() {
    const timeScale = 1 / (this._speed * engine._speed);
    this._startTime = now() - (this._currentTime + this._delay) * timeScale;
    return this;
  }
  /** @return {this} */
  pause() {
    if (this.paused) return this;
    this.paused = true;
    this.onPause(this);
    return this;
  }
  /** @return {this} */
  resume() {
    if (!this.paused) return this;
    this.paused = false;
    if (this.duration <= minValue && !this._hasChildren) {
      tick(this, minValue, 0, 0, tickModes.FORCE);
    } else {
      if (!this._running) {
        addChild(engine, this);
        engine._hasChildren = true;
        this._running = true;
      }
      this.resetTime();
      this._startTime -= 12;
      engine.wake();
    }
    return this;
  }
  /** @return {this} */
  restart() {
    return this.reset().resume();
  }
  /**
   * @param  {Number} time
   * @param  {Boolean|Number} [muteCallbacks]
   * @param  {Boolean|Number} [internalRender]
   * @return {this}
   */
  seek(time, muteCallbacks = 0, internalRender = 0) {
    reviveTimer(this);
    this.completed = false;
    const isPaused = this.paused;
    this.paused = true;
    tick(this, time + this._delay, ~~muteCallbacks, ~~internalRender, tickModes.AUTO);
    return isPaused ? this : this.resume();
  }
  /** @return {this} */
  alternate() {
    const reversed = this._reversed;
    const count = this.iterationCount;
    const duration = this.iterationDuration;
    const iterations = count === Infinity ? floor(maxValue / duration) : count;
    this._reversed = +(this._alternate && !(iterations % 2) ? reversed : !reversed);
    if (count === Infinity) {
      this.iterationProgress = this._reversed ? 1 - this.iterationProgress : this.iterationProgress;
    } else {
      this.seek(duration * iterations - this._currentTime);
    }
    this.resetTime();
    return this;
  }
  /** @return {this} */
  play() {
    if (this._reversed) this.alternate();
    return this.resume();
  }
  /** @return {this} */
  reverse() {
    if (!this._reversed) this.alternate();
    return this.resume();
  }
  // TODO: Move all the animation / tweens / children related code to Animation / Timeline
  /** @return {this} */
  cancel() {
    if (this._hasChildren) {
      forEachChildren(this, (child) => child.cancel(), true);
    } else {
      forEachChildren(this, removeTweenSliblings);
    }
    this._cancelled = 1;
    return this.pause();
  }
  /**
   * @param  {Number} newDuration
   * @return {this}
   */
  stretch(newDuration) {
    const currentDuration = this.duration;
    const normlizedDuration = normalizeTime(newDuration);
    if (currentDuration === normlizedDuration) return this;
    const timeScale = newDuration / currentDuration;
    const isSetter = newDuration <= minValue;
    this.duration = isSetter ? minValue : normlizedDuration;
    this.iterationDuration = isSetter ? minValue : normalizeTime(this.iterationDuration * timeScale);
    this._offset *= timeScale;
    this._delay *= timeScale;
    this._loopDelay *= timeScale;
    return this;
  }
  /**
    * Cancels the timer by seeking it back to 0 and reverting the attached scroller if necessary
    * @return {this}
    */
  revert() {
    tick(this, 0, 1, 0, tickModes.AUTO);
    const ap = (
      /** @type {ScrollObserver} */
      this._autoplay
    );
    if (ap && ap.linked && ap.linked === this) ap.revert();
    return this.cancel();
  }
  /**
    * Imediatly completes the timer, cancels it and triggers the onComplete callback
    * @param  {Boolean|Number} [muteCallbacks]
    * @return {this}
    */
  complete(muteCallbacks = 0) {
    return this.seek(this.duration, muteCallbacks).cancel();
  }
  /**
   * @typedef {this & {then: null}} ResolvedTimer
   */
  /**
   * @param  {Callback<ResolvedTimer>} [callback]
   * @return Promise<this>
   */
  then(callback = noop) {
    const then = this.then;
    const onResolve = () => {
      this.then = null;
      callback(
        /** @type {ResolvedTimer} */
        this
      );
      this.then = then;
      this._resolve = noop;
    };
    return new Promise((r) => {
      this._resolve = () => r(onResolve());
      if (this.completed) this._resolve();
      return this;
    });
  }
};

// work/motion-deps/node_modules/animejs/dist/modules/core/targets.js
function getNodeList(v) {
  const n = isStr(v) ? scope.root.querySelectorAll(v) : v;
  if (n instanceof NodeList || n instanceof HTMLCollection) return n;
}
function parseTargets(targets) {
  if (isNil(targets)) return (
    /** @type {TargetsArray} */
    []
  );
  if (!isBrowser) return (
    /** @type {JSTargetsArray} */
    isArr(targets) && targets.flat(Infinity) || [targets]
  );
  if (isArr(targets)) {
    const flattened = targets.flat(Infinity);
    const parsed = [];
    for (let i = 0, l = flattened.length; i < l; i++) {
      const item = flattened[i];
      if (!isNil(item)) {
        const nodeList2 = getNodeList(item);
        if (nodeList2) {
          for (let j = 0, jl = nodeList2.length; j < jl; j++) {
            const subItem = nodeList2[j];
            if (!isNil(subItem)) {
              let isDuplicate = false;
              for (let k = 0, kl = parsed.length; k < kl; k++) {
                if (parsed[k] === subItem) {
                  isDuplicate = true;
                  break;
                }
              }
              if (!isDuplicate) {
                parsed.push(subItem);
              }
            }
          }
        } else {
          let isDuplicate = false;
          for (let j = 0, jl = parsed.length; j < jl; j++) {
            if (parsed[j] === item) {
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate) {
            parsed.push(item);
          }
        }
      }
    }
    return parsed;
  }
  const nodeList = getNodeList(targets);
  if (nodeList) return (
    /** @type {DOMTargetsArray} */
    Array.from(nodeList)
  );
  return (
    /** @type {TargetsArray} */
    [targets]
  );
}
function registerTargets(targets) {
  const parsedTargetsArray = parseTargets(targets);
  const parsedTargetsLength = parsedTargetsArray.length;
  if (parsedTargetsLength) {
    for (let i = 0; i < parsedTargetsLength; i++) {
      const target = parsedTargetsArray[i];
      if (!target[isRegisteredTargetSymbol]) {
        target[isRegisteredTargetSymbol] = true;
        const isSvgType = isSvg(target);
        const isDom = (
          /** @type {DOMTarget} */
          target.nodeType || isSvgType
        );
        if (isDom) {
          target[isDomSymbol] = true;
          target[isSvgSymbol] = isSvgType;
          target[transformsSymbol] = {};
        }
      }
    }
  }
  return parsedTargetsArray;
}

// work/motion-deps/node_modules/animejs/dist/modules/core/units.js
var angleUnitsMap = { "deg": 1, "rad": 180 / PI, "turn": 360 };
var convertedValuesCache = {};
var convertValueUnit = (el, decomposedValue, unit, force = false) => {
  const currentUnit = decomposedValue.u;
  const currentNumber = decomposedValue.n;
  if (decomposedValue.t === valueTypes.UNIT && currentUnit === unit) {
    return decomposedValue;
  }
  const cachedKey = currentNumber + currentUnit + unit;
  const cached = convertedValuesCache[cachedKey];
  if (!isUnd(cached) && !force) {
    decomposedValue.n = cached;
  } else {
    let convertedValue;
    if (currentUnit in angleUnitsMap) {
      convertedValue = currentNumber * angleUnitsMap[currentUnit] / angleUnitsMap[unit];
    } else {
      const baseline = 100;
      const tempEl = (
        /** @type {DOMTarget} */
        el.cloneNode()
      );
      const parentNode = el.parentNode;
      const parentEl = parentNode && parentNode !== doc ? parentNode : doc.body;
      parentEl.appendChild(tempEl);
      const elStyle = tempEl.style;
      elStyle.width = baseline + currentUnit;
      const currentUnitWidth = (
        /** @type {HTMLElement} */
        tempEl.offsetWidth || baseline
      );
      elStyle.width = baseline + unit;
      const newUnitWidth = (
        /** @type {HTMLElement} */
        tempEl.offsetWidth || baseline
      );
      const factor = currentUnitWidth / newUnitWidth;
      parentEl.removeChild(tempEl);
      convertedValue = factor * currentNumber;
    }
    decomposedValue.n = convertedValue;
    convertedValuesCache[cachedKey] = convertedValue;
  }
  decomposedValue.t === valueTypes.UNIT;
  decomposedValue.u = unit;
  return decomposedValue;
};

// work/motion-deps/node_modules/animejs/dist/modules/easings/none.js
var none = (t) => t;

// work/motion-deps/node_modules/animejs/dist/modules/easings/eases/parser.js
var easeInPower = (p = 1.68) => (t) => pow(t, +p);
var easeTypes = {
  in: (easeIn) => (t) => easeIn(t),
  out: (easeIn) => (t) => 1 - easeIn(1 - t),
  inOut: (easeIn) => (t) => t < 0.5 ? easeIn(t * 2) / 2 : 1 - easeIn(t * -2 + 2) / 2,
  outIn: (easeIn) => (t) => t < 0.5 ? (1 - easeIn(1 - t * 2)) / 2 : (easeIn(t * 2 - 1) + 1) / 2
};
var halfPI = PI / 2;
var doublePI = PI * 2;
var easeInFunctions = {
  [emptyString]: easeInPower,
  Quad: easeInPower(2),
  Cubic: easeInPower(3),
  Quart: easeInPower(4),
  Quint: easeInPower(5),
  /** @type {EasingFunction} */
  Sine: (t) => 1 - cos(t * halfPI),
  /** @type {EasingFunction} */
  Circ: (t) => 1 - sqrt(1 - t * t),
  /** @type {EasingFunction} */
  Expo: (t) => t ? pow(2, 10 * t - 10) : 0,
  /** @type {EasingFunction} */
  Bounce: (t) => {
    let pow2, b = 4;
    while (t < ((pow2 = pow(2, --b)) - 1) / 11) ;
    return 1 / pow(4, 3 - b) - 7.5625 * pow((pow2 * 3 - 2) / 22 - t, 2);
  },
  /** @type {BackEasing} */
  Back: (overshoot = 1.7) => (t) => (+overshoot + 1) * t * t * t - +overshoot * t * t,
  /** @type {ElasticEasing} */
  Elastic: (amplitude = 1, period = 0.3) => {
    const a = clamp(+amplitude, 1, 10);
    const p = clamp(+period, minValue, 2);
    const s = p / doublePI * asin(1 / a);
    const e = doublePI / p;
    return (t) => t === 0 || t === 1 ? t : -a * pow(2, -10 * (1 - t)) * sin((1 - t - s) * e);
  }
};
var eases = /* @__PURE__ */ (() => {
  const list = { linear: none, none };
  for (let type in easeTypes) {
    for (let name in easeInFunctions) {
      const easeIn = easeInFunctions[name];
      const easeType = easeTypes[type];
      list[type + name] = /** @type {EasingFunctionWithParams|EasingFunction} */
      name === emptyString || name === "Back" || name === "Elastic" ? (a, b) => easeType(
        /** @type {EasingFunctionWithParams} */
        easeIn(a, b)
      ) : easeType(
        /** @type {EasingFunction} */
        easeIn
      );
    }
  }
  return (
    /** @type {EasesFunctions} */
    list
  );
})();
var easesLookups = { linear: none, none };
var parseEaseString = (string) => {
  if (easesLookups[string]) return easesLookups[string];
  if (string.indexOf("(") <= -1) {
    const hasParams = easeTypes[string] || string.includes("Back") || string.includes("Elastic");
    const parsedFn = (
      /** @type {EasingFunction} */
      hasParams ? (
        /** @type {EasingFunctionWithParams} */
        eases[string]()
      ) : eases[string]
    );
    return parsedFn ? easesLookups[string] = parsedFn : none;
  } else {
    const split = string.slice(0, -1).split("(");
    const parsedFn = (
      /** @type {EasingFunctionWithParams} */
      eases[split[0]]
    );
    return parsedFn ? easesLookups[string] = parsedFn(...split[1].split(",")) : none;
  }
};
var deprecated = ["steps(", "irregular(", "linear(", "cubicBezier("];
var parseEase = (ease) => {
  if (isStr(ease)) {
    for (let i = 0, l = deprecated.length; i < l; i++) {
      if (stringStartsWith(ease, deprecated[i])) {
        console.warn(`String syntax for \`ease: "${ease}"\` has been removed from the core and replaced by importing and passing the easing function directly: \`ease: ${ease}\``);
        return none;
      }
    }
  }
  const easeFunc = isFnc(ease) ? ease : isStr(ease) ? parseEaseString(
    /** @type {String} */
    ease
  ) : none;
  return easeFunc;
};

// work/motion-deps/node_modules/animejs/dist/modules/animation/animation.js
var fromTargetObject = createDecomposedValueTargetObject();
var toTargetObject = createDecomposedValueTargetObject();
var inlineStylesStore = {};
var toFunctionStore = { func: null };
var keyframesTargetArray = [null];
var fastSetValuesArray = [null, null];
var keyObjectTarget = { to: null };
var tweenId = 0;
var JSAnimationId = 0;
var keyframes;
var key;
var generateKeyframes = (keyframes2, parameters) => {
  const properties = {};
  if (isArr(keyframes2)) {
    const propertyNames = [].concat(.../** @type {DurationKeyframes} */
    keyframes2.map((key2) => Object.keys(key2))).filter(isKey);
    for (let i = 0, l = propertyNames.length; i < l; i++) {
      const propName = propertyNames[i];
      const propArray = (
        /** @type {DurationKeyframes} */
        keyframes2.map((key2) => {
          const newKey = {};
          for (let p in key2) {
            const keyValue = (
              /** @type {TweenPropValue} */
              key2[p]
            );
            if (isKey(p)) {
              if (p === propName) {
                newKey.to = keyValue;
              }
            } else {
              newKey[p] = keyValue;
            }
          }
          return newKey;
        })
      );
      properties[propName] = /** @type {ArraySyntaxValue} */
      propArray;
    }
  } else {
    const totalDuration = (
      /** @type {Number} */
      setValue(parameters.duration, globals.defaults.duration)
    );
    const keys = Object.keys(keyframes2).map((key2) => {
      return { o: parseFloat(key2) / 100, p: keyframes2[key2] };
    }).sort((a, b) => a.o - b.o);
    keys.forEach((key2) => {
      const offset = key2.o;
      const prop = key2.p;
      for (let name in prop) {
        if (isKey(name)) {
          let propArray = (
            /** @type {Array} */
            properties[name]
          );
          if (!propArray) propArray = properties[name] = [];
          const duration = offset * totalDuration;
          let length = propArray.length;
          let prevKey = propArray[length - 1];
          const keyObj = { to: prop[name] };
          let durProgress = 0;
          for (let i = 0; i < length; i++) {
            durProgress += propArray[i].duration;
          }
          if (length === 1) {
            keyObj.from = prevKey.to;
          }
          if (prop.ease) {
            keyObj.ease = prop.ease;
          }
          keyObj.duration = duration - (length ? durProgress : 0);
          propArray.push(keyObj);
        }
      }
      return key2;
    });
    for (let name in properties) {
      const propArray = (
        /** @type {Array} */
        properties[name]
      );
      let prevEase;
      for (let i = 0, l = propArray.length; i < l; i++) {
        const prop = propArray[i];
        const currentEase = prop.ease;
        prop.ease = prevEase ? prevEase : void 0;
        prevEase = currentEase;
      }
      if (!propArray[0].duration) {
        propArray.shift();
      }
    }
  }
  return properties;
};
var JSAnimation = class extends Timer {
  /**
   * @param {TargetsParam} targets
   * @param {AnimationParams} parameters
   * @param {Timeline} [parent]
   * @param {Number} [parentPosition]
   * @param {Boolean} [fastSet=false]
   * @param {Number} [index=0]
   * @param {Number} [length=0]
   */
  constructor(targets, parameters, parent, parentPosition, fastSet = false, index = 0, length = 0) {
    super(
      /** @type {TimerParams & AnimationParams} */
      parameters,
      parent,
      parentPosition
    );
    ++JSAnimationId;
    const parsedTargets = registerTargets(targets);
    const targetsLength = parsedTargets.length;
    const kfParams = (
      /** @type {AnimationParams} */
      parameters.keyframes
    );
    const params = (
      /** @type {AnimationParams} */
      kfParams ? mergeObjects(generateKeyframes(
        /** @type {DurationKeyframes} */
        kfParams,
        parameters
      ), parameters) : parameters
    );
    const {
      id,
      delay,
      duration,
      ease,
      playbackEase,
      modifier,
      composition,
      onRender
    } = params;
    const animDefaults = parent ? parent.defaults : globals.defaults;
    const animEase = setValue(ease, animDefaults.ease);
    const animPlaybackEase = setValue(playbackEase, animDefaults.playbackEase);
    const parsedAnimPlaybackEase = animPlaybackEase ? parseEase(animPlaybackEase) : null;
    const hasSpring = !isUnd(
      /** @type {Spring} */
      animEase.ease
    );
    const tEasing = hasSpring ? (
      /** @type {Spring} */
      animEase.ease
    ) : setValue(ease, parsedAnimPlaybackEase ? "linear" : animDefaults.ease);
    const tDuration = hasSpring ? (
      /** @type {Spring} */
      animEase.settlingDuration
    ) : setValue(duration, animDefaults.duration);
    const tDelay = setValue(delay, animDefaults.delay);
    const tModifier = modifier || animDefaults.modifier;
    const tComposition = isUnd(composition) && targetsLength >= K ? compositionTypes.none : !isUnd(composition) ? composition : animDefaults.composition;
    const absoluteOffsetTime = this._offset + (parent ? parent._offset : 0);
    if (hasSpring) animEase.parent = this;
    let iterationDuration = NaN;
    let iterationDelay = NaN;
    let animationAnimationLength = 0;
    let shouldTriggerRender = 0;
    for (let targetIndex = 0; targetIndex < targetsLength; targetIndex++) {
      const target = parsedTargets[targetIndex];
      const ti = index || targetIndex;
      const tl = length || targetsLength;
      let lastTransformGroupIndex = NaN;
      let lastTransformGroupLength = NaN;
      for (let p in params) {
        if (isKey(p)) {
          const tweenType = getTweenType(target, p);
          const propName = sanitizePropertyName(p, target, tweenType);
          let propValue = params[p];
          const isPropValueArray = isArr(propValue);
          if (fastSet && !isPropValueArray) {
            fastSetValuesArray[0] = propValue;
            fastSetValuesArray[1] = propValue;
            propValue = fastSetValuesArray;
          }
          if (isPropValueArray) {
            const arrayLength = (
              /** @type {Array} */
              propValue.length
            );
            const isNotObjectValue = !isObj(propValue[0]);
            if (arrayLength === 2 && isNotObjectValue) {
              keyObjectTarget.to = /** @type {TweenParamValue} */
              /** @type {unknown} */
              propValue;
              keyframesTargetArray[0] = keyObjectTarget;
              keyframes = keyframesTargetArray;
            } else if (arrayLength > 2 && isNotObjectValue) {
              keyframes = [];
              propValue.forEach((v, i) => {
                if (!i) {
                  fastSetValuesArray[0] = v;
                } else if (i === 1) {
                  fastSetValuesArray[1] = v;
                  keyframes.push(fastSetValuesArray);
                } else {
                  keyframes.push(v);
                }
              });
            } else {
              keyframes = /** @type {Array.<TweenKeyValue>} */
              propValue;
            }
          } else {
            keyframesTargetArray[0] = propValue;
            keyframes = keyframesTargetArray;
          }
          let siblings = null;
          let prevTween = null;
          let firstTweenChangeStartTime = NaN;
          let lastTweenChangeEndTime = 0;
          let tweenIndex = 0;
          for (let l = keyframes.length; tweenIndex < l; tweenIndex++) {
            const keyframe = keyframes[tweenIndex];
            if (isObj(keyframe)) {
              key = keyframe;
            } else {
              keyObjectTarget.to = /** @type {TweenParamValue} */
              keyframe;
              key = keyObjectTarget;
            }
            toFunctionStore.func = null;
            const computedToValue = getFunctionValue(key.to, target, ti, tl, toFunctionStore);
            let tweenToValue;
            if (isObj(computedToValue) && !isUnd(computedToValue.to)) {
              key = computedToValue;
              tweenToValue = computedToValue.to;
            } else {
              tweenToValue = computedToValue;
            }
            const tweenFromValue = getFunctionValue(key.from, target, ti, tl);
            const easeToParse = key.ease || tEasing;
            const easeFunctionResult = getFunctionValue(easeToParse, target, ti, tl);
            const keyEasing = isFnc(easeFunctionResult) || isStr(easeFunctionResult) ? easeFunctionResult : easeToParse;
            const hasSpring2 = !isUnd(keyEasing) && !isUnd(
              /** @type {Spring} */
              keyEasing.ease
            );
            const tweenEasing = hasSpring2 ? (
              /** @type {Spring} */
              keyEasing.ease
            ) : keyEasing;
            const tweenDuration = hasSpring2 ? (
              /** @type {Spring} */
              keyEasing.settlingDuration
            ) : getFunctionValue(setValue(key.duration, l > 1 ? getFunctionValue(tDuration, target, ti, tl) / l : tDuration), target, ti, tl);
            const tweenDelay = getFunctionValue(setValue(key.delay, !tweenIndex ? tDelay : 0), target, ti, tl);
            const computedComposition = getFunctionValue(setValue(key.composition, tComposition), target, ti, tl);
            const tweenComposition = isNum(computedComposition) ? computedComposition : compositionTypes[computedComposition];
            const tweenModifier = key.modifier || tModifier;
            const hasFromvalue = !isUnd(tweenFromValue);
            const hasToValue = !isUnd(tweenToValue);
            const isFromToArray = isArr(tweenToValue);
            const isFromToValue = isFromToArray || hasFromvalue && hasToValue;
            const tweenStartTime = prevTween ? lastTweenChangeEndTime + tweenDelay : tweenDelay;
            const absoluteStartTime = round(absoluteOffsetTime + tweenStartTime, 12);
            if (!shouldTriggerRender && (hasFromvalue || isFromToArray)) shouldTriggerRender = 1;
            let prevSibling = prevTween;
            if (tweenComposition !== compositionTypes.none) {
              if (!siblings) siblings = getTweenSiblings(target, propName);
              let nextSibling = siblings._head;
              while (nextSibling && !nextSibling._isOverridden && nextSibling._absoluteStartTime <= absoluteStartTime) {
                prevSibling = nextSibling;
                nextSibling = nextSibling._nextRep;
                if (nextSibling && nextSibling._absoluteStartTime >= absoluteStartTime) {
                  while (nextSibling) {
                    overrideTween(nextSibling);
                    nextSibling = nextSibling._nextRep;
                  }
                }
              }
            }
            if (isFromToValue) {
              decomposeRawValue(isFromToArray ? getFunctionValue(tweenToValue[0], target, ti, tl) : tweenFromValue, fromTargetObject);
              decomposeRawValue(isFromToArray ? getFunctionValue(tweenToValue[1], target, ti, tl, toFunctionStore) : tweenToValue, toTargetObject);
              const originalValue = getOriginalAnimatableValue(target, propName, tweenType, inlineStylesStore);
              if (fromTargetObject.t === valueTypes.NUMBER) {
                if (prevSibling) {
                  if (prevSibling._valueType === valueTypes.UNIT) {
                    fromTargetObject.t = valueTypes.UNIT;
                    fromTargetObject.u = prevSibling._unit;
                  }
                } else {
                  decomposeRawValue(
                    originalValue,
                    decomposedOriginalValue
                  );
                  if (decomposedOriginalValue.t === valueTypes.UNIT) {
                    fromTargetObject.t = valueTypes.UNIT;
                    fromTargetObject.u = decomposedOriginalValue.u;
                  }
                }
              }
            } else {
              if (hasToValue) {
                decomposeRawValue(tweenToValue, toTargetObject);
              } else {
                if (prevTween) {
                  decomposeTweenValue(prevTween, toTargetObject);
                } else {
                  decomposeRawValue(parent && prevSibling && prevSibling.parent.parent === parent ? prevSibling._value : getOriginalAnimatableValue(target, propName, tweenType, inlineStylesStore), toTargetObject);
                }
              }
              if (hasFromvalue) {
                decomposeRawValue(tweenFromValue, fromTargetObject);
              } else {
                if (prevTween) {
                  decomposeTweenValue(prevTween, fromTargetObject);
                } else {
                  decomposeRawValue(parent && prevSibling && prevSibling.parent.parent === parent ? prevSibling._value : (
                    // No need to get and parse the original value if the tween is part of a timeline and has a previous sibling part of the same timeline
                    getOriginalAnimatableValue(target, propName, tweenType, inlineStylesStore)
                  ), fromTargetObject);
                }
              }
            }
            if (fromTargetObject.o) {
              fromTargetObject.n = getRelativeValue(
                !prevSibling ? decomposeRawValue(
                  getOriginalAnimatableValue(target, propName, tweenType, inlineStylesStore),
                  decomposedOriginalValue
                ).n : prevSibling._toNumber,
                fromTargetObject.n,
                fromTargetObject.o
              );
            }
            if (toTargetObject.o) {
              toTargetObject.n = getRelativeValue(fromTargetObject.n, toTargetObject.n, toTargetObject.o);
            }
            if (fromTargetObject.t !== toTargetObject.t) {
              if (fromTargetObject.t === valueTypes.COMPLEX || toTargetObject.t === valueTypes.COMPLEX) {
                const complexValue = fromTargetObject.t === valueTypes.COMPLEX ? fromTargetObject : toTargetObject;
                const notComplexValue = fromTargetObject.t === valueTypes.COMPLEX ? toTargetObject : fromTargetObject;
                notComplexValue.t = valueTypes.COMPLEX;
                notComplexValue.s = cloneArray(complexValue.s);
                notComplexValue.d = complexValue.d.map(() => notComplexValue.n);
              } else if (fromTargetObject.t === valueTypes.UNIT || toTargetObject.t === valueTypes.UNIT) {
                const unitValue = fromTargetObject.t === valueTypes.UNIT ? fromTargetObject : toTargetObject;
                const notUnitValue = fromTargetObject.t === valueTypes.UNIT ? toTargetObject : fromTargetObject;
                notUnitValue.t = valueTypes.UNIT;
                notUnitValue.u = unitValue.u;
              } else if (fromTargetObject.t === valueTypes.COLOR || toTargetObject.t === valueTypes.COLOR) {
                const colorValue = fromTargetObject.t === valueTypes.COLOR ? fromTargetObject : toTargetObject;
                const notColorValue = fromTargetObject.t === valueTypes.COLOR ? toTargetObject : fromTargetObject;
                notColorValue.t = valueTypes.COLOR;
                notColorValue.s = colorValue.s;
                notColorValue.d = [0, 0, 0, 1];
              }
            }
            if (fromTargetObject.u !== toTargetObject.u) {
              let valueToConvert = toTargetObject.u ? fromTargetObject : toTargetObject;
              valueToConvert = convertValueUnit(
                /** @type {DOMTarget} */
                target,
                valueToConvert,
                toTargetObject.u ? toTargetObject.u : fromTargetObject.u,
                false
              );
            }
            if (toTargetObject.d && fromTargetObject.d && toTargetObject.d.length !== fromTargetObject.d.length) {
              const longestValue = fromTargetObject.d.length > toTargetObject.d.length ? fromTargetObject : toTargetObject;
              const shortestValue = longestValue === fromTargetObject ? toTargetObject : fromTargetObject;
              shortestValue.d = longestValue.d.map((_, i) => isUnd(shortestValue.d[i]) ? 0 : shortestValue.d[i]);
              shortestValue.s = cloneArray(longestValue.s);
            }
            const tweenUpdateDuration = round(+tweenDuration || minValue, 12);
            let inlineValue = inlineStylesStore[propName];
            if (!isNil(inlineValue)) inlineStylesStore[propName] = null;
            const tween2 = {
              parent: this,
              id: tweenId++,
              property: propName,
              target,
              _value: null,
              _func: toFunctionStore.func,
              _ease: parseEase(tweenEasing),
              _fromNumbers: cloneArray(fromTargetObject.d),
              _toNumbers: cloneArray(toTargetObject.d),
              _strings: cloneArray(toTargetObject.s),
              _fromNumber: fromTargetObject.n,
              _toNumber: toTargetObject.n,
              _numbers: cloneArray(fromTargetObject.d),
              // For additive tween and animatables
              _number: fromTargetObject.n,
              // For additive tween and animatables
              _unit: toTargetObject.u,
              _modifier: tweenModifier,
              _currentTime: 0,
              _startTime: tweenStartTime,
              _delay: +tweenDelay,
              _updateDuration: tweenUpdateDuration,
              _changeDuration: tweenUpdateDuration,
              _absoluteStartTime: absoluteStartTime,
              // NOTE: Investigate bit packing to stores ENUM / BOOL
              _tweenType: tweenType,
              _valueType: toTargetObject.t,
              _composition: tweenComposition,
              _isOverlapped: 0,
              _isOverridden: 0,
              _renderTransforms: 0,
              _inlineValue: inlineValue,
              _prevRep: null,
              // For replaced tween
              _nextRep: null,
              // For replaced tween
              _prevAdd: null,
              // For additive tween
              _nextAdd: null,
              // For additive tween
              _prev: null,
              _next: null
            };
            if (tweenComposition !== compositionTypes.none) {
              composeTween(tween2, siblings);
            }
            if (isNaN(firstTweenChangeStartTime)) {
              firstTweenChangeStartTime = tween2._startTime;
            }
            lastTweenChangeEndTime = round(tweenStartTime + tweenUpdateDuration, 12);
            prevTween = tween2;
            animationAnimationLength++;
            addChild(this, tween2);
          }
          if (isNaN(iterationDelay) || firstTweenChangeStartTime < iterationDelay) {
            iterationDelay = firstTweenChangeStartTime;
          }
          if (isNaN(iterationDuration) || lastTweenChangeEndTime > iterationDuration) {
            iterationDuration = lastTweenChangeEndTime;
          }
          if (tweenType === tweenTypes.TRANSFORM) {
            lastTransformGroupIndex = animationAnimationLength - tweenIndex;
            lastTransformGroupLength = animationAnimationLength;
          }
        }
      }
      if (!isNaN(lastTransformGroupIndex)) {
        let i = 0;
        forEachChildren(this, (tween2) => {
          if (i >= lastTransformGroupIndex && i < lastTransformGroupLength) {
            tween2._renderTransforms = 1;
            if (tween2._composition === compositionTypes.blend) {
              forEachChildren(additive.animation, (additiveTween) => {
                if (additiveTween.id === tween2.id) {
                  additiveTween._renderTransforms = 1;
                }
              });
            }
          }
          i++;
        });
      }
    }
    if (!targetsLength) {
      console.warn(`No target found. Make sure the element you're trying to animate is accessible before creating your animation.`);
    }
    if (iterationDelay) {
      forEachChildren(this, (tween2) => {
        if (!(tween2._startTime - tween2._delay)) {
          tween2._delay -= iterationDelay;
        }
        tween2._startTime -= iterationDelay;
      });
      iterationDuration -= iterationDelay;
    } else {
      iterationDelay = 0;
    }
    if (!iterationDuration) {
      iterationDuration = minValue;
      this.iterationCount = 0;
    }
    this.targets = parsedTargets;
    this.id = !isUnd(id) ? id : JSAnimationId;
    this.duration = iterationDuration === minValue ? minValue : clampInfinity((iterationDuration + this._loopDelay) * this.iterationCount - this._loopDelay) || minValue;
    this.onRender = onRender || animDefaults.onRender;
    this._ease = parsedAnimPlaybackEase;
    this._delay = iterationDelay;
    this.iterationDuration = iterationDuration;
    if (!this._autoplay && shouldTriggerRender) this.onRender(this);
  }
  /**
   * @param  {Number} newDuration
   * @return {this}
   */
  stretch(newDuration) {
    const currentDuration = this.duration;
    if (currentDuration === normalizeTime(newDuration)) return this;
    const timeScale = newDuration / currentDuration;
    forEachChildren(this, (tween2) => {
      tween2._updateDuration = normalizeTime(tween2._updateDuration * timeScale);
      tween2._changeDuration = normalizeTime(tween2._changeDuration * timeScale);
      tween2._currentTime *= timeScale;
      tween2._startTime *= timeScale;
      tween2._absoluteStartTime *= timeScale;
    });
    return super.stretch(newDuration);
  }
  /**
   * @return {this}
   */
  refresh() {
    forEachChildren(this, (tween2) => {
      const tweenFunc = tween2._func;
      if (tweenFunc) {
        const ogValue = getOriginalAnimatableValue(tween2.target, tween2.property, tween2._tweenType);
        decomposeRawValue(ogValue, decomposedOriginalValue);
        decomposeRawValue(tweenFunc(), toTargetObject);
        tween2._fromNumbers = cloneArray(decomposedOriginalValue.d);
        tween2._fromNumber = decomposedOriginalValue.n;
        tween2._toNumbers = cloneArray(toTargetObject.d);
        tween2._strings = cloneArray(toTargetObject.s);
        tween2._toNumber = toTargetObject.o ? getRelativeValue(decomposedOriginalValue.n, toTargetObject.n, toTargetObject.o) : toTargetObject.n;
      }
    });
    if (this.duration === minValue) this.restart();
    return this;
  }
  /**
   * Cancel the animation and revert all the values affected by this animation to their original state
   * @return {this}
   */
  revert() {
    super.revert();
    return cleanInlineStyles(this);
  }
  /**
   * @typedef {this & {then: null}} ResolvedJSAnimation
   */
  /**
   * @param  {Callback<ResolvedJSAnimation>} [callback]
   * @return Promise<this>
   */
  then(callback) {
    return super.then(callback);
  }
};
var animate = (targets, parameters) => new JSAnimation(targets, parameters, null, 0, false).init();

// work/motion-deps/node_modules/animejs/dist/modules/timeline/position.js
var getPrevChildOffset = (timeline, timePosition) => {
  if (stringStartsWith(timePosition, "<")) {
    const goToPrevAnimationOffset = timePosition[1] === "<";
    const prevAnimation = (
      /** @type {Tickable} */
      timeline._tail
    );
    const prevOffset = prevAnimation ? prevAnimation._offset + prevAnimation._delay : 0;
    return goToPrevAnimationOffset ? prevOffset : prevOffset + prevAnimation.duration;
  }
};
var parseTimelinePosition = (timeline, timePosition) => {
  let tlDuration = timeline.iterationDuration;
  if (tlDuration === minValue) tlDuration = 0;
  if (isUnd(timePosition)) return tlDuration;
  if (isNum(+timePosition)) return +timePosition;
  const timePosStr = (
    /** @type {String} */
    timePosition
  );
  const tlLabels = timeline ? timeline.labels : null;
  const hasLabels = !isNil(tlLabels);
  const prevOffset = getPrevChildOffset(timeline, timePosStr);
  const hasSibling = !isUnd(prevOffset);
  const matchedRelativeOperator = relativeValuesExecRgx.exec(timePosStr);
  if (matchedRelativeOperator) {
    const fullOperator = matchedRelativeOperator[0];
    const split = timePosStr.split(fullOperator);
    const labelOffset = hasLabels && split[0] ? tlLabels[split[0]] : tlDuration;
    const parsedOffset = hasSibling ? prevOffset : hasLabels ? labelOffset : tlDuration;
    const parsedNumericalOffset = +split[1];
    return getRelativeValue(parsedOffset, parsedNumericalOffset, fullOperator[0]);
  } else {
    return hasSibling ? prevOffset : hasLabels ? !isUnd(tlLabels[timePosStr]) ? tlLabels[timePosStr] : tlDuration : tlDuration;
  }
};

// work/motion-deps/node_modules/animejs/dist/modules/utils/random.js
var random = (min = 0, max2 = 1, decimalLength = 0) => {
  const m = 10 ** decimalLength;
  return Math.floor((Math.random() * (max2 - min + 1 / m) + min) * m) / m;
};
var shuffle = (items) => {
  let m = items.length, t, i;
  while (m) {
    i = random(0, --m);
    t = items[m];
    items[m] = items[i];
    items[i] = t;
  }
  return items;
};

// work/motion-deps/node_modules/animejs/dist/modules/utils/stagger.js
var stagger = (val, params = {}) => {
  let values = [];
  let maxValue2 = 0;
  const from = params.from;
  const reversed = params.reversed;
  const ease = params.ease;
  const hasEasing = !isUnd(ease);
  const hasSpring = hasEasing && !isUnd(
    /** @type {Spring} */
    ease.ease
  );
  const staggerEase = hasSpring ? (
    /** @type {Spring} */
    ease.ease
  ) : hasEasing ? parseEase(ease) : null;
  const grid = params.grid;
  const axis = params.axis;
  const customTotal = params.total;
  const fromFirst = isUnd(from) || from === 0 || from === "first";
  const fromCenter = from === "center";
  const fromLast = from === "last";
  const fromRandom = from === "random";
  const isRange = isArr(val);
  const useProp = params.use;
  const val1 = isRange ? parseNumber(val[0]) : parseNumber(val);
  const val2 = isRange ? parseNumber(val[1]) : 0;
  const unitMatch = unitsExecRgx.exec((isRange ? val[1] : val) + emptyString);
  const start2 = params.start || 0 + (isRange ? val1 : 0);
  let fromIndex = fromFirst ? 0 : isNum(from) ? from : 0;
  return (target, i, t, tl) => {
    const [registeredTarget] = registerTargets(target);
    const total = isUnd(customTotal) ? t : customTotal;
    const customIndex = !isUnd(useProp) ? isFnc(useProp) ? useProp(registeredTarget, i, total) : getOriginalAnimatableValue(registeredTarget, useProp) : false;
    const staggerIndex = isNum(customIndex) || isStr(customIndex) && isNum(+customIndex) ? +customIndex : i;
    if (fromCenter) fromIndex = (total - 1) / 2;
    if (fromLast) fromIndex = total - 1;
    if (!values.length) {
      for (let index = 0; index < total; index++) {
        if (!grid) {
          values.push(abs(fromIndex - index));
        } else {
          const fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
          const fromY = !fromCenter ? floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
          const toX = index % grid[0];
          const toY = floor(index / grid[0]);
          const distanceX = fromX - toX;
          const distanceY = fromY - toY;
          let value = sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === "x") value = -distanceX;
          if (axis === "y") value = -distanceY;
          values.push(value);
        }
        maxValue2 = max(...values);
      }
      if (staggerEase) values = values.map((val3) => staggerEase(val3 / maxValue2) * maxValue2);
      if (reversed) values = values.map((val3) => axis ? val3 < 0 ? val3 * -1 : -val3 : abs(maxValue2 - val3));
      if (fromRandom) values = shuffle(values);
    }
    const spacing = isRange ? (val2 - val1) / maxValue2 : val1;
    const offset = tl ? parseTimelinePosition(tl, isUnd(params.start) ? tl.iterationDuration : start2) : (
      /** @type {Number} */
      start2
    );
    let output = offset + (spacing * round(values[staggerIndex], 2) || 0);
    if (params.modifier) output = params.modifier(output);
    if (unitMatch) output = `${output}${unitMatch[2]}`;
    return output;
  };
};

// outputs/english_coach_illustrated/motion.js
var KEY = "momentum_english_motion_v1";
var preference = "system";
try {
  preference = localStorage.getItem(KEY) || "system";
} catch {
}
var media = typeof matchMedia === "function" ? matchMedia("(prefers-reduced-motion: reduce)") : null;
var pendingBadges = /* @__PURE__ */ new Set();
var visibleStats = /* @__PURE__ */ new Map();
function queueAchievements(ids) {
  if (!motionEnabled()) return;
  for (const id of ids) pendingBadges.add(id);
}
var running = /* @__PURE__ */ new Set();
var settle = /* @__PURE__ */ new Set();
var observer = null;
var pointerFrame = 0;
var pointerSample = null;
function motionEnabled() {
  return preference !== "off" && !media?.matches && !document.hidden;
}
function stopMotion() {
  if (pointerFrame) cancelAnimationFrame(pointerFrame);
  pointerFrame = 0;
  pointerSample = null;
  for (const finish of settle) finish();
  settle.clear();
  for (const item of running) item.revert();
  running.clear();
  document.querySelectorAll(".motion-particle").forEach((e) => e.remove());
  document.querySelectorAll("[data-parallax],.expedition-foreground").forEach((e) => e.style.transform = "");
}
function tween(targets, options = {}) {
  if (!motionEnabled() || !targets) return;
  const elements = typeof targets === "string" ? [...document.querySelectorAll(targets)] : targets;
  if (Array.isArray(elements) && !elements.length) return;
  let item;
  item = animate(elements, { duration: 420, ease: "outExpo", ...options, onComplete: () => {
    running.delete(item);
    options.onComplete?.();
  } });
  running.add(item);
  return item;
}
function enterMotion(root = document) {
  if (!motionEnabled()) return;
  const visible = root.querySelector?.(".view.visible") || root;
  for (const id of pendingBadges) {
    const badge = visible.querySelector(`[data-badge="${id}"]`);
    if (badge?.getClientRects().length) {
      celebrate(badge);
      pendingBadges.delete(id);
    }
  }
  tween([...visible.querySelectorAll(".welcome-copy h1,.welcome-copy .primary-btn,.journey-detail")], { translateY: [12, 0], opacity: [0.65, 1], delay: stagger(45) });
  tween(visible.querySelector(".map-light,.learner-art"), { opacity: [0.85, 1], duration: 1200 });
  const current = visible.querySelector(".journey-node.current");
  tween(current, { boxShadow: ["0 0 0 0 rgba(205,151,64,.5)", "0 0 0 16px rgba(205,151,64,0)"], duration: 1600, alternate: true, loop: 1 });
}
function celebrate(target, full = false) {
  if (!motionEnabled() || !target || !target.getClientRects().length) return;
  target.dataset.celebrated = "true";
  tween(target, { scale: [0.88, 1], rotate: [-8, 0], duration: 480 });
  tween(document.querySelector("#daily-donut"), { scale: [0.94, 1], duration: 480 });
  const box = target.getBoundingClientRect();
  for (let i = 0; i < (full ? 12 : 6); i++) {
    const dot = document.createElement("i");
    dot.className = "motion-particle";
    dot.style.left = `${box.x + box.width / 2}px`;
    dot.style.top = `${box.y + box.height / 2}px`;
    document.body.append(dot);
    const angle = i * Math.PI * 2 / (full ? 12 : 6);
    tween(dot, { translateX: [0, Math.cos(angle) * 68], translateY: [0, Math.sin(angle) * 68], opacity: [1, 0], scale: [1, 0.2], duration: 650, onComplete: () => dot.remove() });
  }
}
function initMotion() {
  const button = document.querySelector("#motion-toggle");
  if (!button) return;
  const sync = () => {
    stopMotion();
    if (!motionEnabled()) pendingBadges.clear();
    document.documentElement.dataset.motion = motionEnabled() ? "on" : "off";
    button.textContent = preference === "off" ? "\u52A8\u6548\uFF1A\u5173\u95ED" : media?.matches ? "\u52A8\u6548\uFF1A\u7CFB\u7EDF\u51CF\u5F31" : "\u52A8\u6548\uFF1A\u5F00\u542F";
    button.setAttribute("aria-pressed", String(preference !== "off"));
  };
  button.addEventListener("click", () => {
    preference = preference === "off" ? "system" : "off";
    try {
      localStorage.setItem(KEY, preference);
    } catch {
    }
    sync();
    enterMotion();
  });
  media?.addEventListener?.("change", sync);
  document.addEventListener("visibilitychange", sync);
  sync();
  if (typeof IntersectionObserver === "function") {
    const visibility = /* @__PURE__ */ new Map();
    observer = new IntersectionObserver((entries) => {
      for (const e of entries) visibility.set(e.target, e.isIntersecting);
      if (![...visibility.values()].some(Boolean)) stopMotion();
    });
    document.querySelectorAll(".journey-scene,.welcome").forEach((e) => {
      visibility.set(e, false);
      observer.observe(e);
    });
  }
  document.addEventListener("pointermove", (e) => {
    if (!motionEnabled() || !matchMedia("(pointer: fine)").matches) return;
    const host = e.target.closest(".welcome,.journey-scene");
    if (!host) return;
    pointerSample = { host, x: e.clientX, y: e.clientY };
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      const sample = pointerSample;
      if (!sample || !motionEnabled()) return;
      const r = sample.host.getBoundingClientRect(), x = ((sample.x - r.x) / r.width - 0.5) * 6, y = ((sample.y - r.y) / r.height - 0.5) * 6;
      const art = sample.host.querySelector(".journey-camera,.learner-art");
      if (art) {
        art.dataset.parallax = "";
        art.style.transform = `translate(${x}px,${y}px)`;
      }
      const front = sample.host.querySelector(".expedition-foreground");
      if (front) front.style.transform = `translate(${x * 1.8}px,${y * 1.8}px)`;
    });
  }, { passive: true });
  document.addEventListener("pointerout", (e) => {
    const host = e.target.closest?.(".welcome,.journey-scene");
    if (host && !host.contains(e.relatedTarget)) {
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      pointerSample = null;
      host.querySelector("[data-parallax]")?.style.removeProperty("transform");
      host.querySelector(".expedition-foreground")?.style.removeProperty("transform");
    }
  }, { passive: true });
  if (typeof MutationObserver === "function") new MutationObserver((records) => {
    for (const record of records) {
      const panel = record.target;
      if (panel.classList?.contains("select-panel") && !panel.hidden) tween(panel, { opacity: [0.7, 1], duration: 160 });
    }
  }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ["hidden"] });
}
function countStats(previous) {
  if (!document.querySelector("#view-home.visible")) return;
  for (const [id, old] of Object.entries(previous)) {
    const element = document.getElementById(id), node = element?.firstChild;
    if (!node || node.nodeType !== 3) continue;
    const final = node.textContent, to = parseFloat(final), from = parseFloat(visibleStats.get(id) ?? old);
    visibleStats.set(id, final);
    if (!motionEnabled() || !Number.isFinite(from) || !Number.isFinite(to) || from === to) continue;
    const overlay = document.createElement("span");
    overlay.className = "motion-count";
    overlay.setAttribute("aria-hidden", "true");
    const r = element.getBoundingClientRect(), parent = element.parentElement.getBoundingClientRect(), style = getComputedStyle(element);
    Object.assign(overlay.style, { left: `${r.x - parent.x}px`, top: `${r.y - parent.y}px`, width: `${r.width}px`, height: `${r.height}px`, font: style.font, color: style.color });
    element.parentElement.append(overlay);
    const value = { number: from }, finish = () => overlay.remove();
    settle.add(finish);
    tween(value, { number: to, duration: 480, onUpdate: () => {
      overlay.textContent = element.textContent.replace(final, (id === "s-minutes" ? value.number.toFixed(1) : Math.round(value.number)) + (id === "s-progress" ? "%" : " "));
    }, onComplete: () => {
      finish();
      settle.delete(finish);
    } });
  }
}
function routeMetrics(path) {
  const length = path.getTotalLength();
  const positions = POINTS.map(([x, y]) => {
    let best = 0, distance = Infinity;
    for (let at = 0; at <= length; at += 3) {
      const p = path.getPointAtLength(at), d = (p.x - x) ** 2 + (p.y - y) ** 2;
      if (d < distance) {
        distance = d;
        best = at;
      }
    }
    return best;
  });
  positions[0] = 0;
  positions[25] = length;
  return { length, positions };
}
function journeyFlight(from, to, guide) {
  if (!motionEnabled()) return;
  const path = document.querySelector(".route-base"), preview = document.querySelector(".route-preview"), traveler = document.querySelector(".route-traveler");
  if (!path || !traveler) return;
  const { length, positions } = routeMetrics(path), value = { at: positions[from - 1] || 0 };
  const button = document.querySelector("#journey-guide");
  const finish = () => {
    preview.style.opacity = "0";
    preview.style.removeProperty("stroke-dasharray");
    preview.style.removeProperty("stroke-dashoffset");
    traveler.style.opacity = "0";
    traveler.removeAttribute("data-traveling");
    document.querySelectorAll(".guide-lit").forEach((e) => e.classList.remove("guide-lit"));
    if (button) {
      button.textContent = "\u64AD\u653E\u8DEF\u7EBF\u5BFC\u89C8";
      button.setAttribute("aria-pressed", "false");
    }
  };
  settle.add(finish);
  traveler.dataset.traveling = "true";
  traveler.style.opacity = "1";
  if (guide) {
    preview.style.opacity = "1";
    preview.style.strokeDasharray = String(length);
    preview.style.strokeDashoffset = String(length);
    if (button) {
      button.textContent = "\u91CD\u65B0\u64AD\u653E\u5BFC\u89C8";
      button.setAttribute("aria-pressed", "true");
    }
  }
  const update = () => {
    const point = path.getPointAtLength(value.at);
    traveler.setAttribute("cx", String(point.x));
    traveler.setAttribute("cy", String(point.y));
    if (guide) {
      preview.style.strokeDashoffset = String(length - value.at);
      positions.forEach((at, i) => document.querySelector(`[data-journey-week="${i + 1}"]`)?.classList.toggle("guide-lit", value.at >= at));
    }
  };
  update();
  tween(value, { at: positions[to - 1], duration: guide ? 8e3 : Math.min(1600, 500 + Math.abs(to - from) * 45), ease: "inOutSine", onUpdate: update, onComplete: () => {
    finish();
    settle.delete(finish);
  } });
  if (guide) {
    tween(document.querySelector(".expedition-mist"), { translateX: [-18, 18], opacity: [0.5, 1], duration: 8e3, ease: "inOutSine" });
  }
}
function playJourneyGuide() {
  stopMotion();
  journeyFlight(1, 26, true);
}
function travelToWeek(from, to) {
  if (from !== to) journeyFlight(from || 1, to, false);
}

// outputs/english_coach_illustrated/searchable-select.js
var controls = /* @__PURE__ */ new Map();
var opened = null;
var sequence = 0;
var paused = false;
function setSearchableSelectsBusy(value) {
  paused = value;
  syncSearchableSelects();
}
var normalize = (text) => String(text).normalize("NFKC").toLowerCase().replace(/第\s*0*(\d+)\s*周/g, " week$1 ").replace(/(?:week|w)\s*0*(\d+)/g, "week$1").replace(/(\d{4})[年/.-](\d{1,2})[月/.-](\d{1,2})日?/g, (_, y, m, d) => `${y}${m.padStart(2, "0")}${d.padStart(2, "0")}`).replace(/(\d{1,2})[月/.-](\d{1,2})日?/g, (_, m, d) => `${m.padStart(2, "0")}${d.padStart(2, "0")}`).replace(/[\s·—_-]+/g, "");
var unavailable = (option) => option.disabled || option.parentElement?.disabled;
function closeSearchableSelects() {
  opened?.close();
}
function syncSearchableSelects(root = document) {
  for (const [select, control] of controls) {
    if (!select.isConnected) {
      control.destroy();
      controls.delete(select);
      continue;
    }
    if (root === document || root === select || root.contains(select)) control.sync();
  }
}
function enhanceSearchableSelects(root = document) {
  if (typeof MutationObserver === "undefined") throw Error("Searchable selection requires MutationObserver");
  for (const select of root.querySelectorAll("select")) {
    if (controls.has(select)) continue;
    const control = createControl(select);
    controls.set(select, control);
  }
}
function createControl(select) {
  const key2 = `study-select-${++sequence}`;
  const label = [...select.labels || []][0] || select.closest("label");
  const labelText = label ? [...label.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim() : "";
  const name = select.getAttribute("aria-label") || labelText || select.name || "\u9009\u62E9\u9009\u9879";
  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.id = key2;
  trigger.className = "select-trigger";
  trigger.dataset.selectFor = select.id || select.name;
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");
  const value = document.createElement("span");
  value.className = "select-value";
  const chevron = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  chevron.setAttribute("viewBox", "0 0 24 24");
  chevron.setAttribute("aria-hidden", "true");
  chevron.innerHTML = '<path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
  trigger.append(value, chevron);
  const panel = document.createElement("div");
  panel.className = "select-panel";
  panel.hidden = true;
  const search = document.createElement("input");
  search.type = "search";
  search.className = "select-search";
  search.placeholder = select.id === "daily-day" ? "\u641C\u7D22\u65E5\u671F\u3001\u5468\u6B21\u6216\u4E3B\u9898" : `\u641C\u7D22${name}`;
  search.autocomplete = "off";
  search.setAttribute("role", "combobox");
  search.setAttribute("aria-autocomplete", "list");
  search.setAttribute("aria-label", `\u641C\u7D22${name}`);
  search.setAttribute("aria-expanded", "false");
  const list = document.createElement("div");
  list.id = `${key2}-list`;
  list.className = "select-options";
  list.setAttribute("role", "listbox");
  list.setAttribute("aria-label", name);
  search.setAttribute("aria-controls", list.id);
  trigger.setAttribute("aria-controls", list.id);
  const note = document.createElement("p");
  note.className = "select-help";
  note.setAttribute("role", "status");
  panel.append(search, list, note);
  let matches = [], active = -1;
  let closed = true;
  function setActive(index) {
    active = index;
    for (const [i, row2] of [...list.children].entries()) row2.classList.toggle("is-active", i === active);
    const row = list.children[active];
    if (row) {
      search.setAttribute("aria-activedescendant", row.id);
      const top = row.offsetTop - list.offsetTop;
      if (top < list.scrollTop) list.scrollTop = top;
      else if (top + row.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = top + row.offsetHeight - list.clientHeight;
    } else search.removeAttribute("aria-activedescendant");
  }
  function rows() {
    const terms = search.value.trim().split(/\s+/).map(normalize).filter(Boolean);
    matches = [...select.options].filter((o) => !o.hidden && terms.every((t) => /^week\d+$/.test(t) ? new RegExp(`${t}(?!\\d)`).test(normalize(o.label)) : normalize(o.label).includes(t)));
    list.replaceChildren(...matches.map((o, i) => {
      const row = document.createElement("div");
      row.id = `${key2}-option-${i}`;
      row.className = "select-option";
      row.setAttribute("role", "option");
      row.setAttribute("aria-label", o.label);
      row.setAttribute("aria-selected", String(o.selected));
      row.setAttribute("aria-disabled", String(!!unavailable(o)));
      const text = document.createElement("span");
      text.className = "select-option-copy";
      const parts = o.label.split(/\s+[—·]\s+/);
      const main = document.createElement("span");
      main.textContent = parts[0];
      text.append(main);
      if (parts.length > 1) {
        const detail = document.createElement("small");
        detail.textContent = parts.slice(1).join(" \xB7 ");
        text.append(detail);
      }
      const check = document.createElement("span");
      check.className = "select-check";
      check.textContent = o.selected ? "\u2713" : "";
      check.setAttribute("aria-hidden", "true");
      row.append(text, check);
      row.addEventListener("pointerdown", (e) => e.preventDefault());
      row.addEventListener("click", () => choose(i));
      return row;
    }));
    note.textContent = matches.length ? `${matches.length} \u4E2A\u9009\u9879 \xB7 \u2191\u2193 \u6D4F\u89C8\uFF0CEnter \u786E\u8BA4` : "\u6CA1\u6709\u5339\u914D\u9879\uFF0C\u8BD5\u8BD5\u65E5\u671F\u3001\u5468\u6B21\u6216\u4E3B\u9898\u4E2D\u7684\u51E0\u4E2A\u5B57\u3002";
    const selected = matches.findIndex((o) => o.selected && !unavailable(o));
    setActive(selected >= 0 ? selected : matches.findIndex((o) => !unavailable(o)));
  }
  function position() {
    if (closed) return;
    if (!trigger.getClientRects().length) {
      close();
      return;
    }
    const rect = trigger.getBoundingClientRect();
    const viewport = window.visualViewport;
    const leftEdge = (viewport?.offsetLeft || 0) + 12, topEdge = (viewport?.offsetTop || 0) + 12;
    const width = viewport?.width || innerWidth, height = viewport?.height || innerHeight;
    const rightEdge = leftEdge + width - 24, bottomEdge = topEdge + height - 24;
    if (rect.bottom < topEdge || rect.top > bottomEdge) {
      close();
      return;
    }
    panel.style.width = `${Math.min(Math.max(rect.width, 320), 640, width - 24)}px`;
    const below = bottomEdge - rect.bottom - 8, above = rect.top - topEdge - 8;
    const flip = below < 280 && above > below;
    const available = Math.max(44, flip ? above : below);
    panel.style.maxHeight = `${Math.min(388, available)}px`;
    const box = panel.getBoundingClientRect();
    panel.style.left = `${Math.max(leftEdge, Math.min(rect.left, rightEdge - box.width))}px`;
    panel.style.top = `${Math.max(topEdge, Math.min(flip ? rect.top - box.height - 8 : rect.bottom + 8, bottomEdge - box.height))}px`;
  }
  function close(restore2 = false) {
    if (closed) return;
    closed = true;
    panel.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    search.setAttribute("aria-expanded", "false");
    search.removeAttribute("aria-activedescendant");
    if (opened === api) opened = null;
    if (restore2 && !trigger.disabled && trigger.isConnected) trigger.focus({ preventScroll: true });
  }
  function open() {
    if (select.disabled || paused || trigger.disabled) return;
    closeSearchableSelects();
    closed = false;
    opened = api;
    panel.hidden = false;
    search.value = "";
    rows();
    trigger.setAttribute("aria-expanded", "true");
    search.setAttribute("aria-expanded", "true");
    position();
    search.focus({ preventScroll: true });
  }
  function choose(index) {
    const option = matches[index];
    if (!option || unavailable(option) || select.disabled || paused || trigger.disabled) return;
    const changed = select.value !== option.value;
    select.value = option.value;
    close(true);
    sync();
    if (changed) select.dispatchEvent(new Event("change", { bubbles: true }));
  }
  function move(key3) {
    const enabled = matches.map((o, i) => unavailable(o) ? -1 : i).filter((i) => i >= 0);
    if (!enabled.length) return setActive(-1);
    const current = enabled.indexOf(active);
    const index = key3 === "Home" ? 0 : key3 === "End" ? enabled.length - 1 : Math.max(0, Math.min(enabled.length - 1, current + (key3 === "ArrowDown" ? 1 : -1)));
    setActive(enabled[index]);
  }
  function sync() {
    value.textContent = select.selectedOptions[0]?.label || "\u8BF7\u9009\u62E9";
    trigger.setAttribute("aria-label", `${name}\uFF1A${value.textContent}`);
    trigger.disabled = paused || select.disabled || !!select.closest("fieldset[disabled]");
    if (trigger.disabled) close();
    if (!closed) {
      rows();
      position();
    }
  }
  search.addEventListener("input", () => {
    rows();
    position();
  });
  search.addEventListener("keydown", (e) => {
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
      e.preventDefault();
      move(e.key);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      choose(active);
    }
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      close(true);
    }
    if (e.key === "Tab") {
      trigger.focus({ preventScroll: true });
      close();
    }
  });
  trigger.addEventListener("click", () => closed ? open() : close(true));
  trigger.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      open();
    }
  });
  const labelClick = (e) => {
    if (e.target === label || e.target === select) {
      e.preventDefault();
      trigger.focus();
    }
  };
  label?.addEventListener("click", labelClick);
  const outside = (e) => {
    if (!closed && !panel.contains(e.target) && !trigger.contains(e.target)) close();
  };
  const focusOutside = (e) => {
    if (!closed && !panel.contains(e.target) && e.target !== trigger) close();
  };
  const reposition = (e) => {
    if (!panel.contains(e.target)) position();
  };
  document.addEventListener("pointerdown", outside);
  document.addEventListener("focusin", focusOutside);
  window.addEventListener("scroll", reposition, true);
  window.addEventListener("resize", position);
  window.visualViewport?.addEventListener("resize", position);
  window.visualViewport?.addEventListener("scroll", position);
  select.addEventListener("change", sync);
  const reset = () => queueMicrotask(sync);
  select.form?.addEventListener("reset", reset);
  let observer2;
  const originalTabIndex = select.getAttribute("tabindex"), originalHidden = select.getAttribute("aria-hidden");
  const restore = (name2, value2) => value2 === null ? select.removeAttribute(name2) : select.setAttribute(name2, value2);
  const api = { sync, close, destroy() {
    close();
    observer2?.disconnect();
    trigger.remove();
    panel.remove();
    select.classList.remove("select-native-enhanced");
    restore("tabindex", originalTabIndex);
    restore("aria-hidden", originalHidden);
    label?.removeEventListener("click", labelClick);
    document.removeEventListener("pointerdown", outside);
    document.removeEventListener("focusin", focusOutside);
    window.removeEventListener("scroll", reposition, true);
    window.removeEventListener("resize", position);
    window.visualViewport?.removeEventListener("resize", position);
    window.visualViewport?.removeEventListener("scroll", position);
    select.removeEventListener("change", sync);
    select.form?.removeEventListener("reset", reset);
  } };
  try {
    observer2 = new MutationObserver(sync);
    observer2.observe(select, { childList: true, subtree: true, characterData: true, attributes: true });
    select.after(trigger);
    document.body.append(panel);
    sync();
  } catch (error) {
    api.destroy();
    throw error;
  }
  select.classList.add("select-native-enhanced");
  select.tabIndex = -1;
  select.setAttribute("aria-hidden", "true");
  return api;
}

// outputs/english_coach_illustrated/learning-methods.js
var METHOD_SOURCE = "https://github.com/byoungd/up";
var METHOD_LICENSE = "https://creativecommons.org/licenses/by-nc/4.0/";
var SKILL_METHODS = Object.freeze({
  voc: ["\u5148\u906E\u4F4F\u89E3\u91CA\uFF0C\u7528\u4ECA\u5929\u7684\u4E00\u4E2A\u77ED\u8BED\u9020\u65B0\u53E5\uFF1B\u8BA4\u5F97\u4E0D\u7B49\u4E8E\u4F1A\u7528\u3002", "\u53EA\u6838\u5BF9\u4E00\u4E2A\u642D\u914D\uFF0C\u5173\u6389\u63D0\u793A\u518D\u9020\u53E5\uFF1B\u590D\u6D4B\u65E5\u671F\u53EF\u6309\u8868\u73B0\u8C03\u6574\u3002", "\u628A\u72EC\u7ACB\u8BF4\u51FA\u7684\u65B0\u53E5\u6216\u5361\u4F4F\u7684\u5730\u65B9\u7559\u5728\u8BC1\u636E\u680F\u3002"],
  grammar: ["\u5148\u72EC\u7ACB\u5199\u4E0E\u672C\u5468\u4E3B\u9898\u6709\u5173\u7684 2\u20133 \u53E5\u3002", "\u53EA\u6838\u5BF9\u4E00\u4E2A\u6700\u5F71\u54CD\u7406\u89E3\u7684\u8BED\u6CD5\u70B9\uFF0C\u5173\u6389\u7B14\u8BB0\u518D\u5199\u3002", "\u6362\u4E2A\u4EBA\u7269\u6216\u65F6\u95F4\u9020\u65B0\u53E5\uFF0C\u4FDD\u7559\u539F\u53E5\u4E0E\u4FEE\u6539\u70B9\u3002"],
  listening: ["\u5148\u81EA\u7136\u901F\u5EA6\u3001\u65E0\u5B57\u5E55\u542C 30\u201390 \u79D2\uFF0C\u8BB0\u4E3B\u65E8\u4E0E 2\u20133 \u4E2A\u7EC6\u8282\u3002", "\u5206\u6E05\u751F\u8BCD\u3001\u8FDE\u8BFB\u5207\u5206\u3001\u53E5\u5B50\u7ED3\u6784\u3001\u80CC\u666F\u6216\u8BBE\u5907/\u6CE8\u610F\u529B\uFF1B\u53EA\u7528\u82F1\u6587\u5B57\u5E55\u4FEE 5\u201320 \u79D2\u96BE\u70B9\uFF0C\u7136\u540E\u5173\u5B57\u5E55\u3002", "\u6BCF\u5468\u7528\u4E00\u4E2A\u4E3B\u7247\u6BB5\u548C\u4E00\u4E2A\u76F8\u4F3C\u65B0\u7247\u6BB5\uFF1B\u9694 3\u20137 \u5929\u7528\u65B0\u7247\u6BB5\u590D\u6D4B\uFF0C\u8BB0\u5F55\u4ECD\u5361\u4F4F\u7684\u539F\u56E0\u3002"],
  reading: ["\u5148\u4E0D\u67E5\u8BCD\uFF0C\u7528 2\u20133 \u53E5\u8BF4\u51FA\u77ED\u6587\u4E3B\u65E8\u3002", "\u53EA\u6838\u5BF9\u6321\u4F4F\u7406\u89E3\u7684\u77ED\u8BED\uFF0C\u8FDE\u540C\u4E0A\u4E0B\u6587\u8BFB\u4E00\u904D\u3002", "\u5173\u6389\u7FFB\u8BD1\uFF0C\u7528\u77ED\u8BED\u8BB2\u4E00\u4E2A\u65B0\u60C5\u5883\uFF1B\u9700\u8981\u65F6\u518D\u770B\u63D0\u793A\u3002"],
  speaking: ["\u5148\u7559\u4E0B\u672A\u7ECF\u6DA6\u8272\u7684 30\u201360 \u79D2\u89E3\u91CA\uFF0C\u4E0D\u5148\u770B\u8303\u6587\u3002", "\u53EA\u6539 1\u20132 \u4E2A\u5F71\u54CD\u7406\u89E3\u7684\u95EE\u9898\uFF1B\u53EF\u4EE5\u8BF7\u6C42\u6F84\u6E05\uFF0C\u518D\u6362\u5BF9\u8C61\u6216\u573A\u666F\u91CD\u8BF4\u3002", "\u5C1D\u8BD5\u4E00\u4E2A\u6CA1\u89C1\u8FC7\u7684\u8FFD\u95EE\uFF1B\u8F6C\u5199\u53EA\u80FD\u5E2E\u52A9\u770B\u5185\u5BB9\uFF0C\u4E0D\u80FD\u8BC1\u660E\u53D1\u97F3\u51C6\u786E\u3002"]
});
function calendarStamp(iso2) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso2)) return NaN;
  const [y, m, d] = iso2.split("-").map(Number), stamp = Date.UTC(y, m - 1, d);
  return new Date(stamp).toISOString().slice(0, 10) === iso2 ? stamp : NaN;
}
function practiceHint(startDate, selectedDate) {
  const start2 = calendarStamp(startDate), selected = calendarStamp(selectedDate);
  const day = Math.floor((selected - start2) / 864e5) + 1;
  if (!Number.isFinite(day) || day < 1) return { day: 0, rest: false, title: "\u8BFE\u7A0B\u5F00\u59CB\u540E\u518D\u7EC3", text: "\u8BF7\u9009\u62E9\u8BFE\u7A0B\u5185\u7684\u6392\u671F\u5B66\u4E60\u65E5\u3002" };
  const rest = new Date(selected).getUTCDay() === 0;
  if (rest) return { day, rest, title: `\u7B2C ${day} \u4E2A\u65E5\u5386\u65E5 \xB7 \u5468\u65E5\u4F11\u606F`, text: "\u4ECA\u5929\u4E0D\u7528\u8865\u52A0\u8BAD\u7EC3\u3002\u5468\u65E5\u8BA1\u5165\u4E24\u5468\u65E5\u5386\u5468\u671F\uFF0C\u4E0B\u4E00\u6392\u671F\u5B66\u4E60\u65E5\u7EE7\u7EED\u3002" };
  let title, text;
  if (day === 1) {
    title = "\u7559\u4E00\u4E2A\u539F\u59CB\u6837\u672C";
    text = "\u9009\u4E00\u4E2A\u771F\u5B9E\u5C0F\u8BDD\u9898\uFF0C\u5148\u72EC\u7ACB\u8BF4\u6216\u5199\uFF0C\u518D\u5BFB\u6C42\u5C11\u91CF\u53CD\u9988\u3002";
  } else if (day <= 6) {
    title = "\u53EA\u89E3\u51B3\u4E00\u4E2A\u969C\u788D";
    text = "\u56F4\u7ED5\u540C\u4E00\u8BDD\u9898\u7EC3\u4E60\uFF1B\u6838\u5BF9\u4E00\u4E2A\u95EE\u9898\uFF0C\u5173\u6389\u63D0\u793A\u518D\u8BD5\u3002";
  } else if (day === 7) {
    title = "\u7B2C\u4E00\u6B21\u5E73\u884C\u590D\u6D4B";
    text = "\u9009\u540C\u96BE\u5EA6\u7684\u65B0\u4EFB\u52A1\uFF0C\u5148\u4E0D\u770B\u63D0\u793A\uFF0C\u548C\u7B2C 1 \u5929\u6837\u672C\u6BD4\u8F83\u3002";
  } else if (day <= 13) {
    title = "\u53EA\u6539\u53D8\u4E00\u4E2A\u53D8\u91CF";
    text = "\u4FDD\u7559\u4E3B\u8981\u7EC3\u6CD5\uFF0C\u53EA\u6362\u5BF9\u8C61\u3001\u573A\u666F\u6216\u6750\u6599\u4E2D\u7684\u4E00\u4E2A\u3002";
  } else if (day === 14) {
    title = "\u65B0\u4EFB\u52A1\u770B\u8FC1\u79FB";
    text = "\u7528\u65B0\u60C5\u5883\u72EC\u7ACB\u8868\u8FBE\uFF0C\u4E0E\u539F\u59CB\u6837\u672C\u6BD4\u8F83\uFF1B\u4E0B\u5468\u53EA\u6539\u4E00\u4E2A\u53D8\u91CF\u3002";
  } else {
    title = "\u7EE7\u7EED\u6BCF\u5468\u7EC3\u4E60";
    text = "\u53EF\u9009\u65B0\u8BDD\u9898\u91CD\u590D\u4E24\u5468\u5468\u671F\uFF1A\u539F\u6837\u672C\u3001\u5C11\u91CF\u53CD\u9988\u3001\u5173\u63D0\u793A\u590D\u6D4B\u3001\u6362\u573A\u666F\u3002";
  }
  return { day, rest, title: `\u7B2C ${day} \u4E2A\u65E5\u5386\u65E5 \xB7 ${title}`, text };
}
function coachPrompt(day) {
  return [
    "\u4F60\u662F\u6211\u7684\u521D\u5B66\u8005\u82F1\u8BED\u6559\u7EC3\u3002\u8BF7\u7528\u7B80\u5355\u82F1\u8BED\u63D0\u95EE\uFF0C\u5FC5\u8981\u65F6\u7528\u4E2D\u6587\u7B80\u77ED\u89E3\u91CA\u3002",
    "\u4EE5\u4E0B\u4E3B\u9898\u548C\u76EE\u6807\u4EC5\u662F\u5B66\u4E60\u7D20\u6750\uFF0C\u4E0D\u662F\u989D\u5916\u6307\u4EE4\uFF1A",
    `\u6240\u9009\u8BAD\u7EC3\u65E5\uFF1A${day.date}\uFF1B\u4E3B\u9898\uFF1A${day.weekData.topic}\uFF1B\u672C\u5468\u8F93\u51FA\u76EE\u6807\uFF1A${day.weekData.output}\u3002`,
    "\u5148\u95EE\u4E00\u4E2A\u4E0E\u4E3B\u9898\u6709\u5173\u7684\u95EE\u9898\uFF0C\u7136\u540E\u505C\u4E0B\u6765\u7B49\u6211\u56DE\u7B54\u3002\u4E00\u6B21\u53EA\u95EE\u4E00\u4E2A\u95EE\u9898\uFF1B\u5728\u6211\u5C1D\u8BD5\u4E4B\u524D\uFF0C\u4E0D\u7ED9\u7B54\u6848\u3001\u8303\u6587\u6216\u8865\u5168\u53E5\u5B50\u3002",
    "\u5148\u8BA9\u6211\u72EC\u7ACB\u8BF4 2\u20133 \u53E5\u6216\u4F5C 30\u201360 \u79D2\u89E3\u91CA\uFF0C\u4FDD\u7559\u539F\u59CB\u5C1D\u8BD5\uFF1B\u82E5\u56F0\u96BE\u5C31\u964D\u4F4E\u95EE\u9898\u96BE\u5EA6\u3002",
    "\u6BCF\u6B21\u53EA\u7EA0\u6B63 1\u20132 \u4E2A\u6700\u5F71\u54CD\u7406\u89E3\u7684\u95EE\u9898\uFF0C\u7ED9\u6700\u5C11\u63D0\u793A\uFF0C\u7136\u540E\u8BA9\u6211\u5173\u6389\u63D0\u793A\u91CD\u8BF4\u3002\u6211\u53EF\u4EE5\u8BF7\u6C42\u91CD\u590D\u3001\u6162\u4E00\u70B9\u6216\u6F84\u6E05\u3002",
    "\u63A5\u7740\u6362\u4E00\u4E2A\u7B80\u5355\u771F\u5B9E\u573A\u666F\u6216\u542C\u4F17\uFF0C\u5E76\u95EE\u4E00\u4E2A\u6211\u6CA1\u89C1\u8FC7\u7684\u8FFD\u95EE\uFF1B\u6BCF\u6B21\u4ECD\u8981\u7B49\u5F85\u6211\u56DE\u7B54\uFF0C\u4E0D\u91CD\u590D\u521A\u624D\u7684\u8303\u6587\u3002",
    "\u5DE5\u4F5C\u8BDD\u9898\u53EF\u7528\u65E5\u5E38\u62A5\u8FDB\u5C55\u6216\u786E\u8BA4\u95EE\u9898\uFF0C\u4E0D\u7528\u5BA2\u6237\u6570\u636E\u3002\u7A0D\u719F\u7EC3\u540E\u53EF\u9009 50\u201380 \u8BCD\u77ED\u90AE\u4EF6\uFF0C\u4E0D\u662F\u6BCF\u5929\u5FC5\u505A\u3002",
    "\u4E0D\u8981\u4EE5\u6D88\u9664\u53E3\u97F3\u4E3A\u76EE\u6807\u3002\u82E5\u53EA\u6709\u8BED\u97F3\u8F6C\u5199\uFF0C\u4E0D\u636E\u6B64\u7ED9\u53D1\u97F3\u8BC4\u5206\uFF0C\u4E5F\u4E0D\u4FDD\u8BC1 CEFR/TOEIC \u7B49\u7EA7\u3002",
    "\u76F4\u5230\u6211\u8BF4\u201C\u7ED3\u675F\u8BAD\u7EC3\u5E76\u8BB0\u5F55\u8FDB\u5EA6\u201D\u624D\u6536\u5C3E\uFF1A\u5217\u51FA\u539F\u59CB\u5C1D\u8BD5\u3001\u6240\u7528\u5E2E\u52A9\u3001\u5269\u4F59\u9519\u8BEF\u3001\u65B0\u573A\u666F\u8868\u73B0\u548C\u4E0B\u4E00\u6B21\u590D\u6D4B\u65E5\u671F\uFF08\u53EF\u9694 3\u20137 \u5929\uFF09\u3002",
    "\u6700\u540E\u7ED9\u6211\u4E00\u6BB5\u4E0D\u8D85\u8FC7 350 \u5B57\u7684\u5B66\u4E60\u8BB0\u5F55\uFF0C\u4F9B\u6211\u81EA\u884C\u7C98\u8D34\u5230\u7F51\u9875\u8BC1\u636E\u680F\u3002\u4F60\u4E0D\u80FD\u5199\u56DE\u8BE5\u7F51\u9875\uFF0C\u4E5F\u4E0D\u8981\u58F0\u79F0\u5DF2\u7ECF\u4FDD\u5B58\u3002"
  ].join("\n");
}
var REVIEW_TEMPLATE_HEADER = "\u3010\u5B66\u4E60\u8BC1\u636E\u6A21\u677F\u3011";
var REVIEW_TEMPLATE = [
  REVIEW_TEMPLATE_HEADER,
  "\u539F\u59CB\u6837\u672C / \u6765\u6E90\uFF1A",
  "\u7528\u8FC7\u7684\u5E2E\u52A9\uFF1A",
  "\u5173\u63D0\u793A\u590D\u6D4B\u7ED3\u679C / \u65E5\u671F\uFF1A",
  "\u65B0\u573A\u666F\u8868\u73B0\uFF1A",
  "\u4ECD\u5361\u4F4F\u7684\u4E00\u4E2A\u969C\u788D\uFF1A",
  "\u4E0B\u5468\u53EA\u6539\u4E00\u4E2A\u53D8\u91CF\uFF1A"
].join("\n");
function appendReviewTemplate(summary) {
  const value = String(summary ?? "");
  if (value.includes(REVIEW_TEMPLATE_HEADER)) return { ok: false, reason: "duplicate", value };
  const next = value + (value ? "\n\n" : "") + REVIEW_TEMPLATE;
  if (next.length > 2e3) return { ok: false, reason: "limit", value };
  return { ok: true, reason: "", value: next };
}
var METHOD_CARDS = Object.freeze([
  { title: "\u5148\u7559\u4E0B\u72EC\u7ACB\u5C1D\u8BD5", text: "\u5148\u7528 2\u20133 \u53E5\u6216\u77ED\u97F3\u9891\u7559\u5E95\uFF0C\u518D\u770B\u53CD\u9988\uFF1B\u7B2C 7\u300114 \u4E2A\u65E5\u5386\u65E5\u7528\u76F8\u4F3C\u65B0\u4EFB\u52A1\u6BD4\u8F83\u3002\u957F\u671F\u53EF\u5728 30 \u5929\u300112 \u5468\u56DE\u770B\uFF0C\u4E0D\u7528\u7EC3\u4E60\u91CF\u63A8\u7B97\u8003\u8BD5\u7B49\u7EA7\u3002", path: "docs/templates/english-diagnostic.md" },
  { title: "\u77ED\u8BED\u8981\u80FD\u5728\u65B0\u53E5\u4E2D\u7528", text: "\u8BB0\u642D\u914D\u548C\u4E0A\u4E0B\u6587\uFF0C\u906E\u4F4F\u89E3\u91CA\u5148\u9020\u65B0\u53E5\uFF0C\u518D\u51B3\u5B9A\u81EA\u5DF1\u7684\u590D\u6D4B\u5B89\u6392\u3002\u590D\u4E60\u95F4\u9694\u53EF\u6309\u8868\u73B0\u8C03\u6574\u3002", path: "docs/threads/part-1/2-vocabulary.md" },
  { title: "\u542C\u529B\u53EA\u4FEE\u4E00\u4E2A\u77ED\u96BE\u70B9", text: "\u5148\u76F2\u542C\u6293\u4E3B\u65E8\uFF0C\u518D\u8FA8\u522B\u751F\u8BCD\u3001\u5207\u5206\u3001\u7ED3\u6784\u3001\u80CC\u666F\u6216\u8BBE\u5907/\u6CE8\u610F\u529B\u95EE\u9898\uFF1B\u7528\u82F1\u6587\u5B57\u5E55\u6838\u5BF9\u77ED\u7247\u6BB5\u540E\u5173\u95ED\u3002", path: "docs/threads/part-1/3-listening.md" },
  { title: "\u53E3\u8BED\u7EC3\u6C9F\u901A\u4E0E\u6F84\u6E05", text: "\u5148\u7559\u672A\u7ECF\u6DA6\u8272\u7684\u6837\u672C\uFF0C\u518D\u7528\u65B0\u573A\u666F\u548C\u964C\u751F\u8FFD\u95EE\u6D4B\u8BD5\u3002\u542C\u4E0D\u660E\u767D\u53EF\u4EE5\u8BF7\u6C42\u6F84\u6E05\uFF1B\u53EA\u6709\u8F6C\u5199\u4E0D\u80FD\u5224\u65AD\u53D1\u97F3\u3002", path: "docs/threads/part-1/5-speaking.md" },
  { title: "\u590D\u76D8\u53EA\u6539\u4E00\u4E2A\u53D8\u91CF", text: "\u533A\u5206\u5B8C\u6210\u3001\u8D28\u91CF\u3001\u9694\u65F6\u4FDD\u7559\u548C\u65B0\u573A\u666F\u8FC1\u79FB\uFF0C\u7528\u8BC1\u636E\u63CF\u8FF0\uFF1B\u4E0B\u5468\u53EA\u6539\u4E00\u4E2A\u53D8\u91CF\uFF0C\u8BC4\u5206\u4ECD\u662F\u81EA\u8BC4\u3002", path: "docs/templates/weekly-review.md" }
]);

// outputs/english_coach_illustrated/learning-visuals.js
var iso = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
var parse = (value) => /* @__PURE__ */ new Date(`${value}T12:00:00`);
function shiftMonth(month, amount) {
  const date = parse(`${month}-01`);
  date.setMonth(date.getMonth() + amount);
  return iso(date).slice(0, 7);
}
function monthCells(days, month, now2, count) {
  const first = parse(`${month}-01`), offset = (first.getDay() + 6) % 7;
  const last = new Date(first.getFullYear(), first.getMonth() + 1, 0, 12).getDate();
  const byDate = new Map(days.map((day) => [day.date, day]));
  const start2 = days[0]?.date, end = days.at(-1)?.date;
  return Array.from({ length: Math.ceil((offset + last) / 7) * 7 }, (_, index) => {
    const number = index - offset + 1;
    if (number < 1 || number > last) return { blank: true };
    const date = `${month}-${String(number).padStart(2, "0")}`, day = byDate.get(date);
    const rest = !day && date >= start2 && date <= end && parse(date).getDay() === 0;
    const completed = day ? count(day) : 0;
    const status = !day ? rest ? "rest" : "inactive" : completed === 5 ? "complete" : completed > 0 ? "partial" : date < now2 ? "missed" : date === now2 ? "today" : "scheduled";
    return { date, number, day, completed, status, today: date === now2 };
  });
}
function learningSummary(days, now2, count, reviews) {
  const elapsed = days.filter((day) => day.date <= now2);
  const completed = elapsed.filter((day) => count(day) === 5).length;
  const streakDays = elapsed.at(-1)?.date === now2 && count(elapsed.at(-1)) < 5 ? elapsed.slice(0, -1) : elapsed;
  let streak = 0;
  for (let i = streakDays.length - 1; i >= 0 && count(streakDays[i]) === 5; i--) streak++;
  const firstReview = Object.values(reviews).some((review) => Number.isInteger(Number(review.week)) && Number(review.week) >= 1 && Number(review.week) <= 26);
  return { completed, streak, badges: [
    { id: "first-day", name: "\u7B2C\u4E00\u6B65", detail: "\u5B8C\u6574\u5B8C\u6210 1 \u4E2A\u5B66\u4E60\u65E5", unlocked: completed >= 1, progress: `${Math.min(completed, 1)}/1 \u65E5`, icon: "\u2726" },
    { id: "six-days", name: "\u6E10\u5165\u4F73\u5883", detail: "\u7D2F\u8BA1\u5B8C\u6210 6 \u4E2A\u5B66\u4E60\u65E5", unlocked: completed >= 6, progress: `${Math.min(completed, 6)}/6 \u65E5`, icon: "\u273F" },
    { id: "24-days", name: "\u575A\u6301\u6709\u8FF9", detail: "\u7D2F\u8BA1\u5B8C\u6210 24 \u4E2A\u5B66\u4E60\u65E5", unlocked: completed >= 24, progress: `${Math.min(completed, 24)}/24 \u65E5`, icon: "\u2691" },
    { id: "first-review", name: "\u56DE\u671B\u4E0E\u524D\u884C", detail: "\u4FDD\u5B58\u9996\u6B21\u590D\u76D8", unlocked: firstReview, progress: firstReview ? "1/1 \u6B21" : "0/1 \u6B21", icon: "\u21BA" }
  ] };
}
function weekSummary(days, week, count, currentWeek) {
  const sessions = days.filter((day) => day.week === week);
  const completed = sessions.filter((day) => count(day) === 5).length;
  return { sessions, completed, total: sessions.length, status: completed === sessions.length ? "complete" : week === currentWeek ? "current" : "unfinished" };
}

// outputs/english_coach_illustrated/curriculum.js
var LINKS = Object.freeze({
  nce: "https://www.ncego.com/books/nce1",
  nceWords: "https://www.ncego.com/books/words/nce1",
  typewords: "https://typewords.cc/",
  re: "https://relingo.net/zh/browser",
  app: "https://docs.pollykann.com/guard/",
  appYoutube: "https://docs.pollykann.com/guard/add-youtube",
  voa: "https://learningenglish.voanews.com/p/5644.html",
  readingA1: "https://learnenglish.britishcouncil.org/free-resources/reading/a1",
  readingA2: "https://learnenglish.britishcouncil.org/free-resources/reading/a2",
  emails: "https://learnenglish.britishcouncil.org/free-resources/business/english-emails",
  sf: "https://developer.salesforce.com/docs",
  chat: "https://chatgpt.com/"
});
var DATA = [
  ["\u8BA4\u8BC6\u81EA\u5DF1", "be \u52A8\u8BCD\u3001\u4E3B\u8C13\u4E00\u81F4", "30 \u79D2\u81EA\u6211\u4ECB\u7ECD"],
  ["\u751F\u6D3B\u4E0E\u5DE5\u4F5C", "\u4E00\u822C\u73B0\u5728\u65F6\u3001\u9891\u7387\u526F\u8BCD", "\u8BB2\u81EA\u5DF1\u7684\u5DE5\u4F5C\u65E5"],
  ["\u63D0\u95EE\u4E0E\u56DE\u7B54", "\u4E00\u822C\u7591\u95EE\u53E5\u3001\u7279\u6B8A\u7591\u95EE\u53E5", "\u95EE\u7B54 5 \u4E2A\u4E2A\u4EBA\u95EE\u9898"],
  ["\u65F6\u95F4\u4E0E\u8BA1\u5212", "\u65F6\u95F4\u3001\u65E5\u671F\u3001\u4ECB\u8BCD at/in/on", "\u4ECB\u7ECD\u6BCF\u65E5\u5B66\u4E60\u5B89\u6392"],
  ["\u5730\u70B9\u4E0E\u65B9\u5411", "there is/are\u3001\u5730\u70B9\u4ECB\u8BCD", "\u4ECB\u7ECD\u529E\u516C\u73AF\u5883"],
  ["\u4EBA\u7269\u4E0E\u5173\u7CFB", "\u5F62\u5BB9\u8BCD\u3001\u6240\u6709\u683C", "\u4ECB\u7ECD\u56E2\u961F\u6210\u5458"],
  ["\u80FD\u529B\u4E0E\u8BF7\u6C42", "can/could\u3001\u793C\u8C8C\u8BF7\u6C42", "\u63D0\u51FA\u8BF7\u6C42\u5E76\u786E\u8BA4"],
  ["\u6570\u91CF\u4E0E\u4E60\u60EF", "\u53EF\u6570/\u4E0D\u53EF\u6570\u3001some/any", "\u8BB2\u5DE5\u4F5C\u4E60\u60EF"],
  ["\u8FC7\u53BB\u7684\u4E00\u5929", "\u4E00\u822C\u8FC7\u53BB\u65F6\u89C4\u5219\u53D8\u5316", "\u590D\u8FF0\u6628\u5929\u7684\u5DE5\u4F5C"],
  ["\u8FC7\u53BB\u7684\u9879\u76EE", "\u5E38\u89C1\u4E0D\u89C4\u5219\u8FC7\u53BB\u5F0F", "\u8BB2\u4E00\u6B21\u6280\u672F\u95EE\u9898"],
  ["\u73B0\u5728\u8FDB\u884C\u65F6", "be doing \u4E0E\u4E00\u822C\u73B0\u5728\u65F6\u533A\u522B", "\u63CF\u8FF0\u5F53\u524D\u5DE5\u4F5C"],
  ["\u5C06\u6765\u8BA1\u5212", "going to / will", "\u8BB2\u4E0B\u5468\u76EE\u6807"],
  ["\u6BD4\u8F83\u4E0E\u9009\u62E9", "\u6BD4\u8F83\u7EA7\u3001\u6700\u9AD8\u7EA7", "\u6BD4\u8F83\u4E24\u79CD\u65B9\u6848"],
  ["\u63CF\u8FF0\u95EE\u9898", "\u539F\u56E0 because / \u7ED3\u679C so", "\u6E05\u695A\u63CF\u8FF0\u4E00\u4E2A bug"],
  ["\u7ED9\u51FA\u5EFA\u8BAE", "should / need to", "\u5EFA\u8BAE\u540C\u4E8B\u5982\u4F55\u5904\u7406\u95EE\u9898"],
  ["\u6301\u7EED\u7684\u7ECF\u5386", "\u73B0\u5728\u5B8C\u6210\u65F6\u4E0E for/since", "\u8BF4\u51FA\u4E94\u5E74\u5DE5\u4F5C\u7ECF\u9A8C"],
  ["\u804C\u573A\u90AE\u4EF6\u5165\u95E8", "\u90AE\u4EF6\u5F00\u5934\u3001\u7ED3\u5C3E\u4E0E\u8BED\u6C14", "\u5199 60 \u8BCD\u5DE5\u4F5C\u90AE\u4EF6"],
  ["\u4F1A\u8BAE\u8868\u8FBE", "\u6F84\u6E05\u3001\u590D\u8FF0\u548C\u786E\u8BA4", "\u4E3B\u6301\u7B80\u77ED\u5DE5\u4F5C\u540C\u6B65"],
  ["\u9700\u6C42\u6C9F\u901A", "\u63D0\u95EE\u3001\u786E\u8BA4\u8303\u56F4", "\u95EE\u6E05 3 \u4E2A\u9700\u6C42"],
  ["\u89E3\u91CA\u65B9\u6848", "\u6B65\u9AA4\u4E0E\u987A\u5E8F\u8BCD", "\u89E3\u91CA\u7B80\u5355\u65B9\u6848"],
  ["Salesforce \u5BF9\u8C61", "\u5BF9\u8C61\u3001\u5B57\u6BB5\u3001\u8BB0\u5F55", "\u4ECB\u7ECD\u6570\u636E\u6A21\u578B"],
  ["Salesforce \u81EA\u52A8\u5316", "Flow\u3001\u5BA1\u6279\u3001\u6761\u4EF6", "\u4ECB\u7ECD\u4E00\u4E2A\u81EA\u52A8\u5316\u9700\u6C42"],
  ["Salesforce \u96C6\u6210", "API\u3001\u540C\u6B65\u3001\u5931\u8D25\u91CD\u8BD5", "\u89E3\u91CA\u4E00\u6B21\u6570\u636E\u540C\u6B65"],
  ["Salesforce \u90E8\u7F72", "\u73AF\u5883\u3001\u6D4B\u8BD5\u3001\u90E8\u7F72", "\u8BB2\u6E05\u90E8\u7F72\u6B65\u9AA4"],
  ["\u5916\u4F01\u82F1\u8BED\u9762\u8BD5 I", "\u8FC7\u53BB\u7ECF\u5386\u3001STAR \u7B80\u5316\u7ED3\u6784", "\u5B8C\u6210\u81EA\u6211\u4ECB\u7ECD\u548C\u9879\u76EE\u4EAE\u70B9"],
  ["\u5916\u4F01\u82F1\u8BED\u9762\u8BD5 II", "\u63D0\u95EE\u3001\u89E3\u51B3\u95EE\u9898\u3001\u590D\u76D8", "\u6A21\u62DF 5 \u5206\u949F\u6280\u672F\u9762\u8BD5"]
];
var VOA = [
  "Welcome!",
  "Hello, I\u2019m Anna!",
  "I\u2019m Here!",
  "What Is It?",
  "Where Are You?",
  "Where Is the Gym?",
  "What Are You Doing?",
  "Are You Busy?",
  "Is It Cold?",
  "Come Over to My Place",
  "This Is My Neighborhood",
  "Meet My Family",
  "Happy Birthday, William Shakespeare!",
  "How About This?",
  "I Love People-Watching!",
  "Where Are You From?",
  "Are You Free on Friday?",
  "She Always Does That",
  "When Do I Start?",
  "What Can You Do?",
  "Can You Come to the Party?",
  "Next Summer...",
  "What Do You Want?",
  "Yesterday Was Amazing!",
  "Watch Out!",
  "This Game Is Fun!"
];
var WEEKS = DATA.map((v, i) => {
  const number = i + 1;
  const start2 = number <= 16 ? (number - 1) * 2 + 1 : 33 + (number - 17);
  const lessons = number <= 16 ? [start2, start2 + 1] : [start2];
  return {
    number,
    topic: v[0],
    grammar: v[1],
    output: v[2],
    voa: VOA[i],
    lessons,
    phase: number <= 4 ? "A1 \u57FA\u7840" : number <= 8 ? "A1 \u5DE9\u56FA" : number <= 12 ? "A2 \u8D77\u6B65" : number <= 16 ? "A2 \u8868\u8FBE" : number <= 20 ? "\u804C\u573A\u82F1\u8BED" : number <= 24 ? "Salesforce \u82F1\u8BED" : "\u6C42\u804C\u5B9E\u6218"
  };
});
var DEFAULT_START = "2026-10-13";
var DAY_NAMES = ["\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"];
var DAY_ACTION = ["\u65B0\u77E5\u8BC6\u8F93\u5165", "\u542C\u8FA8\u4E0E\u7EA0\u97F3", "\u9605\u8BFB\u4E0E\u65B0\u8BFE", "\u771F\u5B9E\u573A\u666F\u8FC1\u79FB", "\u72EC\u7ACB\u8FC1\u79FB\u7EC3\u4E60", "\u7EFC\u5408\u590D\u4E60\u4E0E\u6D4B\u8BC4"];
var DAY_TEMPLATES = WEEKS.flatMap((w) => DAY_NAMES.map((name, i) => ({
  key: `w${w.number}-d${i + 1}`,
  week: w.number,
  day: i + 1,
  dayName: name,
  weekData: w,
  focus: DAY_ACTION[i]
})));
function task(key2, resource, minutes, title, instruction, done, url, category) {
  return { key: key2, resource, minutes, title, instruction, done, url, category };
}
function getTasks(day, weakSkill = "") {
  const w = day.weekData, n = day.day, lid = w.lessons[n === 3 && !day.firstSession ? w.lessons.length - 1 : 0];
  const className = `\u7B2C\u4E00\u518C\u7B2C ${lid} \u5355\u5143`;
  const base = `\u672C\u5468\u4E3B\u9898\u300C${w.topic}\u300D\uFF0C\u6838\u5FC3\u8BED\u6CD5\u300C${w.grammar}\u300D`;
  const phase = w.number >= 21 ? "\u7ED3\u5408 Salesforce \u5DE5\u4F5C\u60C5\u5883" : w.number >= 17 ? "\u7ED3\u5408\u804C\u573A\u771F\u5B9E\u573A\u666F" : "\u7ED3\u5408\u719F\u6089\u7684\u65E5\u5E38\u751F\u6D3B";
  let q = n === 5 ? "\u4ECE\u672C\u5468\u8BCD\u6C47\u9009 8 \u4E2A\u8BCD\uFF0C\u5728 TypeWords \u9ED8\u5199\u540E\u5404\u9009 3 \u4E2A\u7528\u4E8E\u65B0\u7684\u771F\u5B9E\u573A\u666F\u53E5\u5B50\uFF1B\u8BB0\u5F55\u8868\u8FBE\u5361\uFF0C\u4E0D\u63D0\u524D\u4F5C\u5468\u590D\u76D8\u3002" : n === 2 ? "\u5148\u5B8C\u6210\u667A\u80FD\u590D\u4E60\uFF0C\u518D\u505A 8 \u4E2A\u8BCD\u7684\u542C\u5199\uFF1B\u68C0\u67E5\u9519\u8BEF\u7EDF\u8BA1\u3002" : n === 4 ? "\u5148\u5B8C\u6210\u5230\u671F\u590D\u4E60\uFF0C\u518D\u4ECE\u9519\u8BCD\u672C\u62BD 6\u20138 \u4E2A\u8BCD\u81EA\u6D4B\uFF0C\u4E0D\u719F\u7EC3\u7684\u8BCD\u7EE7\u7EED\u590D\u4E60\u3002" : "\u5148\u5B8C\u6210\u667A\u80FD\u590D\u4E60\uFF0C\u518D\u5B66 8 \u4E2A\u65B0\u8BCD\uFF1B\u8DDF\u5199\u540E\u906E\u4F4F\u7B54\u6848\u9ED8\u5199\u3002";
  let grammarTask = n === 1 ? `\u5728 ncego \u6253\u5F00${className}\uFF0C\u5B66\u4E60\u8BFE\u6587\u548C\u8BB2\u89E3\uFF1B\u627E\u51FA\u4E0E\u300C${w.grammar}\u300D\u76F8\u5173\u7684\u53E5\u5B50\uFF0C\u81EA\u5DF1\u6539\u5199 2 \u53E5\u3002` : n === 2 ? `\u590D\u4E60${className}\uFF0C\u5B8C\u6210\u914D\u5957\u7EC3\u4E60\uFF1B\u4E0D\u770B\u539F\u6587\uFF0C\u8BF4\u51FA 3 \u4E2A\u5173\u952E\u53E5\u3002` : n === 3 ? `\u5B66\u4E60${className}${w.lessons.length === 1 ? "\uFF08\u672C\u5468\u552F\u4E00\u65B0\u8BFE\uFF0C\u91CD\u70B9\u590D\u4E60\uFF09" : ""}\uFF1B\u603B\u7ED3\u4E00\u53E5\u8BED\u6CD5\u89C4\u5219\uFF0C\u5E76\u9020 2 \u4E2A\u65B0\u53E5\u3002` : n === 4 ? `\u590D\u4E60\u672C\u5468 ncego \u5355\u5143 ${w.lessons.join("\u3001")}\uFF1B\u7ED3\u5408\u300C${w.grammar}\u300D\uFF0C\u628A 3 \u4E2A\u8BFE\u6587\u53E5\u578B\u8FC1\u79FB\u5230${w.number >= 17 ? "\u5DE5\u4F5C" : "\u65E5\u5E38"}\u573A\u666F\u3002` : `\u7528\u672C\u5468 3 \u4E2A\u53E5\u578B\u63CF\u8FF0\u4E00\u4E2A\u65B0\u7684\u65E5\u5E38\u6216\u5DE5\u4F5C\u573A\u666F\uFF0C\u72EC\u7ACB\u5199 5 \u53E5\uFF1B\u5BF9\u7167 ncego \u68C0\u67E5\u5E76\u8BB0\u5F55\u8FC1\u79FB\u9519\u8BEF\u3002`;
  let listenTask = n === 1 ? `\u7528\u5C0F\u9E66\u770B\u770B\u6253\u5F00\u672C\u5468 VOA\u300A${w.voa}\u300B\uFF08\u6309\u5B98\u65B9\u6559\u7A0B\u5BFC\u5165\uFF09\uFF1B\u53EA\u542C 1\u20133 \u5206\u949F\u7247\u6BB5\uFF0C\u5148\u4E0D\u5F00\u5B57\u5E55\uFF0C\u5199\u4E0B\u542C\u61C2\u7684\u5173\u952E\u8BCD\u3002` : n === 2 ? `\u540C\u4E00\u7247\u6BB5\uFF1A\u5355\u53E5\u5FAA\u73AF + \u53D8\u901F\uFF0C\u542C\u8FA8 3 \u53E5\uFF1B\u5F00\u82F1\u6587\u5B57\u5E55\u6838\u5BF9\u540E\u9010\u53E5\u8DDF\u8BFB\u3002` : n === 3 ? `\u9009 3 \u53E5\u8FDB\u884C\u300C\u542C\u4E00\u53E5\u2192\u6682\u505C\u2192\u590D\u8FF0/\u542C\u5199\u2192\u6838\u5BF9\u300D\uFF0C\u8BB0\u5F55\u6700\u96BE\u7684 1 \u4E2A\u97F3\u3002` : n === 4 ? `\u7528\u5C0F\u9E66\u770B\u770B\u8FDB\u884C\u300C\u53E5\u95F4\u6682\u505C\u300D\u8DDF\u8BFB\uFF0C\u5F55/\u8BF4 30 \u79D2\u5F71\u5B50\u8DDF\u8BFB\uFF1B\u6536\u85CF 1 \u53E5\u597D\u7528\u7684\u8868\u8FBE\u3002` : `\u4E0D\u770B\u5B57\u5E55\u542C\u672C\u5468 VOA \u7247\u6BB5\uFF0C\u7528\u81EA\u5DF1\u7684\u8BDD\u8BF4 2 \u53E5\u5185\u5BB9\uFF0C\u518D\u628A\u5176\u4E2D 1 \u4E2A\u8868\u8FBE\u8FC1\u79FB\u5230\u81EA\u5DF1\u7684\u751F\u6D3B\u3002`;
  let readTask = n === 1 ? `\u7528 Relingo \u6253\u5F00\u4E00\u7BC7${w.number <= 10 ? " A1" : " A2"}\u77ED\u6587\uFF0C\u5148\u770B\u82F1\u6587\uFF0C\u627E\u51FA\u4E3B\u9898\u53E5\uFF0C\u518D\u53EA\u67E5\u6700\u5F71\u54CD\u7406\u89E3\u7684\u751F\u8BCD\u3002` : n === 2 ? `\u91CD\u8BFB\u77ED\u6587\uFF0C\u5229\u7528\u5212\u8BCD\u7FFB\u8BD1\u786E\u8BA4 3 \u4E2A\u751F\u8BCD\uFF1B\u5C1D\u8BD5\u4E0D\u770B\u4E2D\u6587\u89E3\u91CA\u4E2D\u5FC3\u610F\u601D\u3002` : n === 3 ? `\u6362\u4E00\u7BC7\u540C\u7EA7\u77ED\u6587\uFF0C\u5148\u56DE\u7B54\u300C\u8C01/\u505A\u4EC0\u4E48/\u4E3A\u4EC0\u4E48\u300D\uFF0C\u518D\u5728 Relingo \u6536\u85CF\u6700\u591A 2 \u4E2A\u9AD8\u4EF7\u503C\u8868\u8FBE\u3002` : n === 4 ? `\u8BFB\u4E00\u7BC7${w.number >= 17 ? "\u7B80\u5355\u804C\u573A\u90AE\u4EF6/\u6280\u672F\u5165\u95E8\u8D44\u6599" : "\u77ED\u6587"}\uFF1B\u8BB0\u4E0B 1 \u4E2A\u4E3B\u9898\u53E5\u4E0E 2 \u4E2A\u652F\u6301\u7EC6\u8282\u3002` : `\u4F7F\u7528 Relingo \u8BFB\u4E00\u7BC7\u540C\u7EA7\u65B0\u77ED\u6587\uFF0C\u7528 1 \u53E5\u82F1\u6587\u590D\u8FF0\uFF0C\u518D\u7528 1 \u4E2A\u672C\u5468\u8868\u8FBE\u6539\u5199\u6210\u81EA\u5DF1\u7684\u53E5\u5B50\u3002`;
  let speakingTask = n === 1 ? `\u8DDF ChatGPT \u7528\u82F1\u6587\u56F4\u7ED5\u300C${w.topic}\u300D\u5B8C\u6210 4 \u8F6E\u5BF9\u8BDD\uFF1B\u8981\u6C42\u5148\u56DE\u7B54\uFF0C\u518D\u7EA0\u6B63 1\u20132 \u4E2A\u9519\u8BEF\u3002` : n === 2 ? `\u4E0D\u770B\u7B54\u6848\uFF0C\u7528\u82F1\u8BED\u8BF4\u51FA 3 \u4E2A\u5305\u542B\u300C${w.grammar}\u300D\u7684\u53E5\u5B50\uFF1B\u518D\u8BF7 ChatGPT \u6539\u53D8\u573A\u666F\u63D0\u95EE\u3002` : n === 3 ? `\u7528 2\u20133 \u53E5\u82F1\u6587\u603B\u7ED3\u4ECA\u5929\u8BFB\u5230\u7684\u6587\u7AE0\uFF0C\u4E0D\u5141\u8BB8\u7167\u6284\uFF1B\u4E0D\u4F1A\u65F6\u5148\u8BF4\u5173\u952E\u8BCD\u518D\u6269\u53E5\u3002` : n === 4 ? `${phase}\uFF0C\u7528 ChatGPT \u6A21\u62DF\u4E00\u6BB5\u5BF9\u8BDD\uFF1B\u5FC5\u987B\u5B8C\u6210\u300C${w.output}\u300D\uFF0C\u5E76\u56DE\u7B54\u4E00\u6B21\u8FFD\u95EE\u3002` : `\u7528\u82F1\u8BED\u5B8C\u6210\u300C${w.output}\u300D\uFF1B\u8BF7 ChatGPT \u8FDB\u884C\u6362\u9898\u8FC1\u79FB\u68C0\u6D4B\uFF0C\u8BB0\u5F55\u72EC\u7ACB\u8FC1\u79FB\u65F6\u6700\u96BE\u7684\u95EE\u9898\uFF0C\u7559\u7ED9\u5468\u516D\u590D\u6D4B\u3002`;
  if (n === 4 && weakSkill) speakingTask += ` \u4E0A\u5468\u6700\u4F4E\u8BC4\u5206\u9879\u76EE\u4E3A\u300C${weakSkill}\u300D\uFF0C\u672C\u6B21\u4F18\u5148\u9488\u5BF9\u5B83\u52A0 1 \u4E2A\u8FC1\u79FB\u95EE\u9898\u3002`;
  if (n === 6) {
    q = "\u5468\u516D\u7EFC\u5408\u590D\u6D4B\uFF1A\u5728 TypeWords \u4ECE\u672C\u5468\u9519\u8BCD\u672C\u62BD 10 \u4E2A\u8BCD\u95ED\u5377\u542C\u5199\uFF1B\u6838\u5BF9\u540E\u91CD\u6D4B\u9519\u8BCD\uFF0C\u518D\u7528\u5176\u4E2D 3 \u4E2A\u8BCD\u8BF4\u65B0\u53E5\uFF0C\u8BB0\u5F55\u9996\u6B21\u6B63\u786E\u6570 /10\u3002";
    grammarTask = `\u5468\u516D\u7EFC\u5408\u590D\u6D4B\uFF1A\u4E0D\u770B\u7B14\u8BB0\u56DE\u5FC6 ncego \u5355\u5143 ${w.lessons.join("\u3001")} \u7684\u300C${w.grammar}\u300D\uFF0C\u9650\u65F6\u5199 5 \u4E2A\u65B0\u60C5\u5883\u53E5\uFF1B\u5BF9\u7167\u8BB2\u89E3\u8BA2\u6B63\uFF0C\u8BB0\u5F55\u72EC\u7ACB\u6B63\u786E\u6570 /5\uFF0C\u518D\u91CD\u5199\u9519\u53E5\u3002`;
    listenTask = `\u5468\u516D\u7EFC\u5408\u590D\u6D4B\uFF1A\u7528\u5C0F\u9E66\u770B\u770B\u5173\u5B57\u5E55\u91CD\u542C\u672C\u5468 VOA\u300A${w.voa}\u300B\u7247\u6BB5\uFF0C\u5199 3 \u4E2A\u4FE1\u606F\u70B9\u5E76\u542C\u5199 2 \u53E5\uFF1B\u5F00\u5B57\u5E55\u6838\u5BF9\uFF0C\u5355\u53E5\u5FAA\u73AF\u8BA2\u6B63\uFF0C\u8BB0\u5F55\u6B63\u786E\u4FE1\u606F\u70B9 /3 \u548C\u542C\u8FA8\u96BE\u70B9\u3002`;
    readTask = "\u5468\u516D\u7EFC\u5408\u590D\u6D4B\uFF1A\u7528 Relingo \u91CD\u8BFB\u672C\u5468\u77ED\u6587\uFF0C\u5148\u4E0D\u67E5\u8BCD\uFF0C\u5199\u4E3B\u65E8\u53CA 2 \u4E2A\u7EC6\u8282\uFF1B\u6838\u5BF9\u540E\u8BB0\u5F55\u6B63\u786E\u4FE1\u606F\u70B9 /3\uFF0C\u5E76\u7528 1 \u4E2A\u8868\u8FBE\u9020\u65B0\u53E5\u3002";
    speakingTask = `\u5468\u516D\u7EFC\u5408\u590D\u6D4B\uFF1A\u5728 ChatGPT \u5148\u72EC\u7ACB\u5B8C\u6210\u300C${w.output}\u300D\uFF0C\u518D\u63A5\u53D7 2 \u4E2A\u65B0\u573A\u666F\u8FFD\u95EE\uFF1B\u53EA\u5728\u56DE\u7B54\u540E\u770B\u7EA0\u9519\u5E76\u91CD\u7B54\uFF0C\u8BB0\u5F55\u80FD\u72EC\u7ACB\u56DE\u7B54\u7684\u95EE\u9898\u6570 /3\u3002\u6700\u540E\u5230\u672C\u7AD9\u300C\u5468\u516D\u590D\u76D8\u300D\u586B\u5199\u4E94\u9879\u8BC4\u5206\u3001\u8BC1\u636E\u548C\u4E0B\u5468\u8584\u5F31\u9879\uFF1B\u8BC4\u5206\u7531\u81EA\u5DF1\u5224\u65AD\u3002`;
  }
  if (day.firstSession) {
    if (n === 6) {
      q = "\u5728\u672C\u9879 15 \u5206\u949F\u5185\u5148\u9009 10 \u4E2A\u5165\u95E8\u8BCD\uFF0C\u542C\u97F3\u3001\u8DDF\u5199\u540E\u5EFA\u7ACB\u8BCD\u8868\uFF1B\u5C06\u5B83\u4F5C\u4E3A\u672C\u5468\u8BCD\u6C47/\u9519\u8BCD\u672C\uFF0C\u518D\u505A\u95ED\u5377\u68C0\u6D4B\uFF0C\u65E0\u9700\u6B64\u524D\u8BAD\u7EC3\u3002" + q;
      grammarTask = `\u5728\u672C\u9879 25 \u5206\u949F\u5185\u5148\u6253\u5F00 ncego \u7B2C\u4E00\u518C\u7B2C ${w.lessons[0]} \u5355\u5143\uFF0C\u6D4F\u89C8\u672C\u5468\u5355\u5143 ${w.lessons.join("\u3001")} \u7684\u8BFE\u6587\u548C\u8BB2\u89E3\u3001\u8BA4\u8BC6\u300C${w.grammar}\u300D\u540E\u5408\u4E0A\u6750\u6599\uFF1B\u65E0\u9700\u6B64\u524D\u8BAD\u7EC3\u3002` + grammarTask;
      listenTask = `\u5728\u672C\u9879 20 \u5206\u949F\u5185\u5148\u6309\u6559\u7A0B\u5BFC\u5165 VOA\u300A${w.voa}\u300B\uFF0C\u521D\u542C 1\u20133 \u5206\u949F\u7247\u6BB5\u5E76\u786E\u8BA4\u5B57\u5E55\uFF0C\u518D\u5173\u5B57\u5E55\u68C0\u6D4B\uFF1B\u65E0\u9700\u6B64\u524D\u8BAD\u7EC3\u3002` + listenTask;
      readTask = "\u5728\u672C\u9879 10 \u5206\u949F\u5185\u5148\u7528 Relingo \u6253\u5F00\u4E00\u7BC7 A1 \u77ED\u6587\uFF0C\u521D\u8BFB\u5E76\u786E\u8BA4\u4E3B\u65E8\u548C\u751F\u8BCD\uFF0C\u518D\u906E\u4F4F\u89E3\u91CA\u68C0\u6D4B\uFF1B\u65E0\u9700\u6B64\u524D\u8BAD\u7EC3\u3002" + readTask;
      speakingTask = `\u5728\u672C\u9879 20 \u5206\u949F\u5185\u5148\u8BA4\u8BC6\u300C${w.topic}\u300D\u4E3B\u9898\u4E0E\u300C${w.output}\u300D\u8981\u6C42\uFF0C\u51C6\u5907\u5173\u952E\u8BCD\u540E\u6536\u8D77\u63D0\u793A\uFF1B\u65E0\u9700\u6B64\u524D\u8BAD\u7EC3\u3002` + speakingTask;
    } else {
      q = "\u9996\u6B21\u8BAD\u7EC3\uFF1A\u5728 TypeWords \u9009\u62E9 8 \u4E2A\u5165\u95E8\u65B0\u8BCD\uFF0C\u542C\u97F3\u3001\u8DDF\u5199\u540E\u5EFA\u7ACB\u521D\u59CB\u8BCD\u8868\uFF1B\u906E\u4F4F\u7B54\u6848\u9ED8\u5199\uFF0C\u8BB0\u5F55\u9519\u8BCD\uFF0C\u4F9B\u4EE5\u540E\u590D\u4E60\u3002";
      grammarTask = `\u9996\u6B21\u8BAD\u7EC3\uFF1A\u5728 ncego \u6253\u5F00${className}\uFF0C\u5148\u5B66\u4E60\u8BFE\u6587\u548C\u8BB2\u89E3\uFF0C\u8BA4\u8BC6\u300C${w.grammar}\u300D\uFF1B\u81EA\u5DF1\u6539\u5199 2 \u53E5\uFF0C\u5EFA\u7ACB\u540E\u7EED\u7EC3\u4E60\u57FA\u7840\u3002`;
      listenTask = `\u9996\u6B21\u8BAD\u7EC3\uFF1A\u6309\u5C0F\u9E66\u770B\u770B\u6559\u7A0B\u5BFC\u5165\u672C\u5468 VOA\u300A${w.voa}\u300B\uFF0C\u521D\u542C 1\u20133 \u5206\u949F\u7247\u6BB5\uFF0C\u8BB0\u5173\u952E\u8BCD\uFF1B\u518D\u7528\u82F1\u6587\u5B57\u5E55\u6838\u5BF9\u5E76\u9010\u53E5\u8DDF\u8BFB\u3002`;
      readTask = "\u9996\u6B21\u8BAD\u7EC3\uFF1A\u7528 Relingo \u6253\u5F00\u4E00\u7BC7 A1 \u77ED\u6587\uFF0C\u5148\u8BFB\u82F1\u6587\u627E\u4E3B\u9898\u53E5\uFF0C\u518D\u67E5\u6700\u5F71\u54CD\u7406\u89E3\u7684\u751F\u8BCD\uFF1B\u4FDD\u7559\u8BE5\u77ED\u6587\u4F9B\u540E\u7EED\u7EC3\u4E60\u3002";
      speakingTask = `\u9996\u6B21\u8BAD\u7EC3\uFF1A\u56F4\u7ED5\u300C${w.topic}\u300D\u7528\u4ECA\u5929\u5B66\u5230\u7684\u8BCD\u53E5\u4E0E ChatGPT \u5B8C\u6210 4 \u8F6E\u5BF9\u8BDD\uFF1B\u5148\u72EC\u7ACB\u56DE\u7B54\uFF0C\u518D\u770B\u7EA0\u9519\uFF0C\u5C1D\u8BD5\u5B8C\u6210\u300C${w.output}\u300D\u3002`;
    }
  }
  const readUrl = w.number >= 17 && n === 4 ? w.number >= 21 ? LINKS.sf : LINKS.emails : w.number <= 10 ? LINKS.readingA1 : LINKS.readingA2;
  return [
    task("voc", "TypeWords", 15, "\u8BCD\u6C47 \xB7 \u9ED8\u5199\u4E0E\u590D\u4E60", q, day.firstSession ? "\u5EFA\u7ACB\u521D\u59CB\u8BCD\u8868\uFF0C\u5E76\u8BB0\u5F55\u9996\u6B21\u9ED8\u5199\u7ED3\u679C\u3002" : "\u5B8C\u6210\u5F53\u65E5\u65E7\u8BCD\u590D\u4E60\uFF0C\u5E76\u8BB0\u5F55\u81EA\u6D4B\u7ED3\u679C\u3002", LINKS.typewords, "\u8BCD\u6C47"),
    task("grammar", "ncego", 25, "\u4E3B\u8BFE \xB7 \u65B0\u6982\u5FF5 + \u8BED\u6CD5", grammarTask, `\u80FD\u4E0D\u770B\u63D0\u793A\u8BF4\u51FA\u81F3\u5C11 2 \u4E2A\u65B0\u53E5\u5B50\uFF08${base}\uFF09\u3002`, LINKS.nce, "\u8BED\u6CD5"),
    task("listening", "\u5C0F\u9E66\u770B\u770B + VOA", 20, "\u542C\u529B \xB7 \u5355\u53E5\u5FAA\u73AF\u4E0E\u8DDF\u8BFB", listenTask, "\u7559\u4E0B 1 \u4E2A\u542C\u4E0D\u61C2\u7684\u97F3\u6216 1 \u4E2A\u80FD\u72EC\u7ACB\u8BF4\u51FA\u7684\u53E5\u5B50\u3002", LINKS.appYoutube, "\u542C\u529B"),
    task("reading", "Relingo", 10, "\u9605\u8BFB \xB7 \u4E3B\u65E8\u4E0E\u8868\u8FBE", readTask, "\u80FD\u7528\u4E2D\u6587\u6982\u62EC\u4E3B\u65E8\uFF0C\u518D\u5C1D\u8BD5\u7528 1 \u53E5\u82F1\u6587\u6982\u62EC\u3002", readUrl, "\u9605\u8BFB"),
    task("speaking", "ChatGPT", 20, "\u8F93\u51FA \xB7 \u60C5\u666F\u6C9F\u901A\u4E0E\u590D\u8FF0", speakingTask, "\u5148\u72EC\u7ACB\u56DE\u7B54\uFF0C\u624D\u67E5\u770B\u7EA0\u9519\uFF1B\u8BB0\u5F55\u6700\u5173\u952E\u7684\u9519\u8BEF\u3002", LINKS.chat, "\u53E3\u8BED")
  ].map((t) => ({ ...t, done: n === 6 ? { voc: "\u8BB0\u5F55\u9996\u6B21\u542C\u5199\u6B63\u786E\u6570 /10\u3001\u9519\u8BCD\u91CD\u6D4B\u7ED3\u679C\u53CA 3 \u4E2A\u65B0\u53E5\u3002", grammar: "\u8BB0\u5F55\u9996\u6B21\u72EC\u7ACB\u6B63\u786E\u6570 /5\u3001\u9519\u8BEF\u539F\u56E0\u53CA\u91CD\u5199\u53E5\u3002", listening: "\u8BB0\u5F55\u6B63\u786E\u4FE1\u606F\u70B9 /3\u30012 \u53E5\u542C\u5199\u6838\u5BF9\u548C 1 \u4E2A\u96BE\u70B9\u3002", reading: "\u8BB0\u5F55\u6B63\u786E\u4FE1\u606F\u70B9 /3 \u548C 1 \u4E2A\u72EC\u7ACB\u65B0\u53E5\u3002", speaking: "\u8BB0\u5F55\u72EC\u7ACB\u56DE\u7B54\u6570 /3\uFF0C\u5B8C\u6210\u672C\u7AD9\u4E94\u9879\u5468\u590D\u76D8\u8BC4\u5206\u548C\u8584\u5F31\u9879\u3002" }[t.key] : t.done, id: `${day.key}:${t.key}`, extraUrl: t.key === "listening" ? LINKS.voa : t.key === "grammar" ? LINKS.nceWords : null, extraLabel: t.key === "listening" ? "VOA \u5B98\u65B9\u8BFE\u7A0B" : t.key === "grammar" ? "\u65B0\u6982\u5FF5\u5355\u8BCD\u8868" : "" }));
}
function localISO(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
function realDate(s) {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (y < 1e3) return null;
  const date = new Date(y, m - 1, d, 12);
  return date.getFullYear() === y && date.getMonth() + 1 === m && date.getDate() === d ? date : null;
}
function dateValidStart(s) {
  const d = realDate(s);
  return !!d && d.getDay() !== 0;
}
function weekAnchor(startDate) {
  if (!dateValidStart(startDate)) throw Error("\u5F00\u59CB\u65E5\u671F\u987B\u4E3A\u771F\u5B9E\u7684\u5468\u4E00\u81F3\u5468\u516D\u65E5\u671F\uFF0C\u5468\u65E5\u4F11\u606F\u3002");
  const d = realDate(startDate);
  d.setDate(d.getDate() - (d.getDay() - 1));
  return localISO(d);
}
function dayDate(startDate, week, day) {
  if (!Number.isInteger(week) || week < 1 || week > 26 || !Number.isInteger(day) || day < 1 || day > 6) throw Error("\u65E0\u6548\u7684\u8BFE\u7A0B\u5468\u6B21\u6216\u661F\u671F");
  const d = realDate(weekAnchor(startDate));
  d.setDate(d.getDate() + (week - 1) * 7 + (day - 1));
  return localISO(d);
}
function calendarDays(startDate = DEFAULT_START) {
  weekAnchor(startDate);
  return DAY_TEMPLATES.map((d) => ({ ...d, date: dayDate(startDate, d.week, d.day) })).filter((d) => d.date >= startDate).map((d, index) => ({ ...d, firstSession: index === 0 }));
}
var ALL_DAYS = calendarDays();

// outputs/english_coach_illustrated/auth-helpers.js
function publicKeyValid(key2) {
  if (typeof key2 !== "string" || key2.length > 4096 || /sb_secret_|service_role/i.test(key2)) return false;
  if (/^sb_publishable_[A-Za-z0-9_-]{16,}$/.test(key2)) return true;
  const parts = key2.split(".");
  if (parts.length !== 3 || parts.some((p) => !p || !/^[A-Za-z0-9_-]+$/.test(p))) return false;
  try {
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(payload.padEnd(Math.ceil(payload.length / 4) * 4, "=")));
    return decoded && !Array.isArray(decoded) && decoded.role === "anon";
  } catch {
    return false;
  }
}
function projectURLValid(url) {
  return /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url);
}
function authErrorMessage(error) {
  if (Number(error?.status) === 429 || /rate|over_.*limit|too_many/i.test(error?.code || ""))
    return "\u8BF7\u6C42\u53D7\u9650\uFF1A\u8BF7\u7B49\u5019\u670D\u52A1\u7AEF\u5141\u8BB8\u540E\u518D\u8BD5\u3002";
  return "\u8BF7\u6C42\u5931\u8D25\uFF1A\u8BF7\u68C0\u67E5\u90AE\u7BB1\u3001\u5BC6\u7801\u3001\u8D26\u53F7\u786E\u8BA4\u72B6\u6001\u6216\u7F51\u7EDC\u3002";
}

// outputs/english_coach_illustrated/public-config.js
var DEFAULT_PUBLIC_CONFIG = Object.freeze({
  url: "https://aiewjjuelwnbnomistcz.supabase.co",
  key: "sb_publishable_yBPKUihjps1eqjFyJw8aWQ_90z7MAZo"
});

// outputs/english_coach_illustrated/app.js
var DEMO_KEY = "momentum_english_demo_v1";
var CLOUD_CONFIG_KEY = "momentum_english_supabase_config_v1";
var emptyState = () => ({ startDate: DEFAULT_START, progress: {}, words: [], reviews: {} });
var $ = (selector) => document.querySelector(selector);
var $$ = (selector) => [...document.querySelectorAll(selector)];
var escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
var validNumber = (n, min, max2) => Number.isFinite(Number(n)) ? Math.min(max2, Math.max(min, Number(n))) : min;
var today = () => localISO(/* @__PURE__ */ new Date());
var localLoadFailed = false;
var demo = readLocalDemo();
var state = demo;
var sb = null;
var user = null;
var cloud = false;
var busy = false;
var table = null;
var planRows = [];
var view = "home";
var selectedKey = "";
var selectedWeek = 1;
var toastTimeout;
var journeyWeek = 0;
var planView = "journey";
var visualMonth = "";
var visualSource = null;
var visualStart = "";
var visualToday = "";
var TASK_ICONS = { "voc": '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 16-1 5 5-1L21 7l-4-4zM14 6l4 4"/></svg>', "grammar": '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5c-3-2-7-2-10-1v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1v15"/></svg>', "listening": '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14v-3a8 8 0 0 1 16 0v3"/><rect x="2" y="12" width="5" height="9" rx="2"/><rect x="17" y="12" width="5" height="9" rx="2"/></svg>', "reading": '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5c-3-2-7-2-10-1v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1v15"/></svg>', "speaking": '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-8 8H4l-3 3V12a10 10 0 0 1 20 0Z"/><path d="M7 11h10M7 15h6"/></svg>' };
var BADGE_ICONS = { "first-day": '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>', "six-days": '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="m8 13-2 9 6-3 6 3-2-9"/></svg>', "24-days": '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V3l14 3-3 4 3 4-14-3"/></svg>', "first-review": '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10a9 9 0 1 1 2 8M3 4v6h6M12 7v5l3 2"/></svg>' };
var authGeneration = 0;
var loadGeneration = 0;
var subscription = null;
var clientGeneration = 0;
var clientURL = "";
var signingIn = false;
var loginAttempt = 0;
var loginContext = null;
function activeDays() {
  return calendarDays(state.startDate);
}
function cloudContext() {
  return { client: sb, id: user?.id, generation: authGeneration };
}
function contextCurrent(ctx) {
  return ctx.client === sb && ctx.id === user?.id && ctx.generation === authGeneration;
}
function requireContext(ctx) {
  if (!contextCurrent(ctx)) throw Error("\u8D26\u53F7\u5DF2\u5207\u6362\uFF0C\u8BF7\u91CD\u65B0\u64CD\u4F5C\u3002");
}
function resetIdentity(nextUser = null) {
  closeSearchableSelects();
  authGeneration++;
  loadGeneration++;
  $("#login-password").value = "";
  user = nextUser;
  cloud = false;
  state = demo;
  selectedKey = pickToday().key;
  renderAll();
  setMode(nextUser ? "\u6B63\u5728\u8BFB\u53D6\u4E91\u7AEF\u2026" : "\u5DF2\u9000\u51FA \xB7 \u6F14\u793A\u6A21\u5F0F");
}
function handleSession(session) {
  const next = session?.user || null;
  if (next?.id !== user?.id) resetIdentity(next);
  if (next && !cloud) {
    const ctx = cloudContext();
    setTimeout(() => {
      if (contextCurrent(ctx)) remoteLoad(ctx);
    }, 0);
  }
}
function notice(message, isError = false) {
  const t = $("#toast");
  t.textContent = message;
  t.className = "toast on" + (isError ? " error" : "");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.className = "toast", 5500);
}
function readLocalDemo() {
  try {
    const v = JSON.parse(localStorage.getItem(DEMO_KEY) || "null");
    if (v === null) return emptyState();
    if (!isState(v)) throw Error("\u683C\u5F0F\u65E0\u6548");
    return normalizeState(v);
  } catch {
    localLoadFailed = true;
    return emptyState();
  }
}
function isState(o) {
  return o && typeof o === "object" && !Array.isArray(o) && typeof o.startDate === "string" && o.progress && typeof o.progress === "object" && !Array.isArray(o.progress) && Array.isArray(o.words) && o.reviews && typeof o.reviews === "object" && !Array.isArray(o.reviews);
}
function normalizeState(s) {
  if (!dateValidStart(s.startDate)) throw Error("\u5907\u4EFD\u5F00\u59CB\u65E5\u671F\u4E0D\u662F\u6709\u6548\u7684\u5468\u4E00\u81F3\u5468\u516D\u65E5\u671F\uFF1B\u539F\u8BB0\u5F55\u672A\u6539\u52A8\u3002");
  return { startDate: s.startDate, progress: s.progress || {}, words: s.words || [], reviews: s.reviews || {} };
}
function isAuthed() {
  return !!(sb && user && cloud);
}
function taskIdValid(s) {
  return /^w(?:[1-9]|1\d|2[0-6])-d[1-6]:(voc|grammar|listening|reading|speaking)$/.test(s);
}
function weekValid(s) {
  return Number.isInteger(Number(s)) && Number(s) >= 1 && Number(s) <= 26;
}
function getProgress(t) {
  return state.progress[t.id] || { completed: false, minutes: 0, evidence: "" };
}
function completedCount(day) {
  return getTasks(day).filter((t) => getProgress(t).completed).length;
}
function weakFor(week) {
  const prev = state.reviews[week - 1];
  if (!prev) return "";
  if (prev.weak_skill) return prev.weak_skill;
  const k = ["vocabulary", "grammar", "listening", "reading", "speaking"];
  const map = { vocabulary: "\u8BCD\u6C47", grammar: "\u8BED\u6CD5", listening: "\u542C\u529B", reading: "\u9605\u8BFB", speaking: "\u53E3\u8BED" };
  return map[k.reduce((a, b) => Number(prev[b]) < Number(prev[a]) ? b : a)];
}
function dayFor(k) {
  return activeDays().find((d) => d.key === k);
}
function pickToday() {
  const days = activeDays(), now2 = today();
  return days.find((d) => d.date === now2) || days.find((d) => d.date >= now2 && completedCount(d) < 5) || days.find((d) => completedCount(d) < 5) || days.at(-1);
}
function currentDay() {
  return dayFor(selectedKey) || pickToday();
}
function escUrl(u) {
  try {
    const x = new URL(u);
    return ["http:", "https:"].includes(x.protocol) ? x.href : "#";
  } catch {
    return "#";
  }
}
function setMode(message = "", err = false) {
  const pill = $("#sync-state");
  pill.textContent = message || (isAuthed() ? "\u2713 Supabase \u4E91\u7AEF\u5DF2\u8FDE\u63A5" : "\u672C\u673A\u6F14\u793A \xB7 \u4E0D\u8DE8\u8BBE\u5907\u540C\u6B65");
  pill.className = "sync-pill " + (err ? "err" : isAuthed() ? "" : "demo");
  $("#side-mode").textContent = isAuthed() ? "Supabase \u4E91\u7AEF\u5B58\u50A8" : "\u672C\u673A\u6F14\u793A\u6A21\u5F0F";
  $("#account-btn").textContent = isAuthed() ? "\u5DF2\u767B\u5F55 " + (user.email || "\u4E91\u7AEF") : "\u8FDE\u63A5 Supabase";
  $("#logged-user").textContent = isAuthed() ? user.email || "\u5DF2\u767B\u5F55" : "\u5C1A\u672A\u767B\u5F55";
  $("#mode-explainer").textContent = isAuthed() ? "\u5DF2\u767B\u5F55 Supabase\uFF1A\u65E5\u5E38\u6253\u5361\u3001\u8FC1\u79FB\u8BCD\u5361\u3001\u5468\u590D\u76D8\u548C\u8BA1\u5212\u8D77\u59CB\u65E5\u671F\u5199\u5165\u4E91\u7AEF\u3002\u540C\u8D26\u53F7\u5728 Mac \u4E0E\u624B\u673A\u4E0A\u53EF\u540C\u6B65\u3002" : "\u5F53\u524D\u5904\u4E8E\u672C\u673A\u6F14\u793A\u6A21\u5F0F\uFF1A\u53EF\u8BD5\u7528\u4F46\u6570\u636E\u53EA\u4FDD\u5B58\u5728\u8FD9\u4E2A\u6D4F\u89C8\u5668\uFF1B\u8FDE\u63A5\u9879\u76EE\u5E76\u90AE\u7BB1\u767B\u5F55\u540E\u624D\u5F00\u542F\u4E91\u7AEF\u540C\u6B65\u3002";
}
function localCommit() {
  localStorage.setItem(DEMO_KEY, JSON.stringify(demo));
  setMode("\u2713 \u5DF2\u4FDD\u5B58\u5728\u5F53\u524D\u6D4F\u89C8\u5668");
}
async function remoteWrite(tableName, payload, onConflict, ctx = cloudContext()) {
  requireContext(ctx);
  if (!ctx.id) throw Error("\u4E91\u7AEF\u672A\u767B\u5F55");
  let result;
  try {
    result = await ctx.client.from(tableName).upsert(payload, onConflict ? { onConflict } : void 0);
  } catch {
    throw Error("\u4E91\u7AEF\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u6216\u8868\u6743\u9650\u3002");
  }
  requireContext(ctx);
  if (result.error) throw Error("\u4E91\u7AEF\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u6216\u8868\u6743\u9650\u3002");
}
async function saveChange(kind, payload) {
  if (busy) {
    notice("\u6B63\u5728\u4FDD\u5B58\u4E0A\u4E00\u9879\u8BB0\u5F55\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002", true);
    return false;
  }
  if (user && !cloud) {
    notice("\u4E91\u7AEF\u5C1A\u672A\u52A0\u8F7D\uFF0C\u8BF7\u7B49\u5F85\u6216\u9000\u51FA\u767B\u5F55\u540E\u4F7F\u7528\u6F14\u793A\u6A21\u5F0F\u3002", true);
    return false;
  }
  const ctx = cloudContext(), sourceState = state;
  busy = true;
  setSearchableSelectsBusy(true);
  setMode("\u4FDD\u5B58\u4E2D\u2026");
  try {
    if (isAuthed()) {
      if (kind === "progress") await remoteWrite("coach_tasks", { user_id: ctx.id, task_key: payload.id, completed: !!payload.value.completed, minutes: validNumber(payload.value.minutes, 0, 180), evidence: String(payload.value.evidence || "").slice(0, 350) }, null, ctx);
      if (kind === "start") await remoteWrite("coach_settings", { user_id: ctx.id, start_date: payload }, null, ctx);
      if (kind === "word") await remoteWrite("coach_words", wordRemote(payload, ctx.id), null, ctx);
      if (kind === "review") await remoteWrite("coach_reviews", reviewRemote(payload, ctx.id), null, ctx);
      if (kind === "removeWord") {
        const { error } = await ctx.client.from("coach_words").delete().eq("user_id", ctx.id).eq("id", payload);
        requireContext(ctx);
        if (error) throw Error("\u4E91\u7AEF\u5220\u9664\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u6216\u8868\u6743\u9650\u3002");
      }
    } else if (localLoadFailed) throw Error("\u672C\u673A\u65E7\u6570\u636E\u8BFB\u53D6\u5931\u8D25\uFF0C\u539F\u503C\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u5148\u5BFC\u5165\u6709\u6548\u5907\u4EFD\u3002");
    if (!contextCurrent(ctx) || state !== sourceState) return false;
    setMode(isAuthed() ? "\u2713 \u5DF2\u540C\u6B65\u5230 Supabase" : "\u2713 \u5DF2\u4FDD\u5B58\u5728\u5F53\u524D\u6D4F\u89C8\u5668");
    return true;
  } catch (e) {
    if (contextCurrent(ctx)) {
      setMode("\u4FDD\u5B58\u5931\u8D25 \xB7 \u8BF7\u68C0\u67E5\u7F51\u7EDC", true);
      notice("\u4FDD\u5B58\u5931\u8D25\uFF0C\u4FEE\u6539\u672A\u751F\u6548\uFF1B\u8BF7\u68C0\u67E5\u7F51\u7EDC\u3001\u6743\u9650\u6216\u672C\u673A\u65E7\u6570\u636E\u3002", true);
    }
    return false;
  } finally {
    busy = false;
    setSearchableSelectsBusy(false);
  }
}
function wordRemote(w, userId = user?.id) {
  return { id: w.id, user_id: userId, term: w.term, meaning: w.meaning, source: w.source, example: w.example || "", mastery: w.mastery || 0, next_review: w.next_review || today() };
}
function reviewRemote(r, userId = user?.id) {
  return { user_id: userId, week_no: r.week, summary: r.summary || "", weak_skill: r.weak_skill || null, vocabulary: r.vocabulary, grammar: r.grammar, listening: r.listening, reading: r.reading, speaking: r.speaking };
}
async function mutateProgress(id, fields) {
  const existing = state.progress[id] || { completed: false, minutes: 0, evidence: "" };
  const before = learningSummary(activeDays(), today(), completedCount, state.reviews);
  const next = { ...existing, ...fields };
  const ok = await saveChange("progress", { id, value: next });
  if (!ok) return;
  state.progress[id] = next;
  if (!isAuthed()) localCommit();
  renderAll();
  const after = learningSummary(activeDays(), today(), completedCount, state.reviews);
  const earned = after.badges.filter((b) => b.unlocked && !before.badges.find((old) => old.id === b.id)?.unlocked);
  if (!existing.completed && next.completed && currentDay().date === today()) {
    queueAchievements(earned.map((b) => b.id));
    celebrate($$(".task-card").find((c) => c.dataset.taskId === id)?.querySelector(".task-check"), completedCount(currentDay()) === 5);
    for (const badge of earned) celebrate($(`[data-badge="${badge.id}"]`));
  }
  if (earned.length) notice("\u5DF2\u8FBE\u6210\uFF1A" + earned.map((b) => b.name).join("\u3001") + "\u3002\u6765\u81EA\u5DF2\u5B8C\u6210\u7684\u5B66\u4E60\u8BB0\u5F55\u3002");
  return true;
}
async function mutateWord(w) {
  const ok = await saveChange("word", w);
  if (!ok) return;
  const idx = state.words.findIndex((x) => x.id === w.id);
  if (idx >= 0) state.words[idx] = w;
  else state.words.unshift(w);
  if (!isAuthed()) localCommit();
  renderAll();
}
function dueWord(w) {
  return (w.next_review || today()) <= today();
}
function navigate(target) {
  stopMotion();
  closeSearchableSelects();
  view = target;
  $$(".view").forEach((el) => el.classList.toggle("visible", el.id === "view-" + target));
  $$(".nav-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.view === target);
    if (el.dataset.view === target) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
  $("#page-crumb").textContent = { home: "\u4ECA\u65E5\u603B\u89C8", daily: "\u6BCF\u65E5\u8BAD\u7EC3", plan: "26 \u5468\u8BA1\u5212", words: "\u8868\u8FBE\u8FC1\u79FB", review: "\u6BCF\u5468\u590D\u76D8", resources: "\u5DE5\u5177\u4F7F\u7528\u8BF4\u660E", settings: "\u6570\u636E\u4E0E\u8BBE\u7F6E" }[target];
  $(".sidebar").classList.remove("open");
  $("#mobile-menu").setAttribute("aria-expanded", "false");
  if (target === "daily") renderDaily();
  if (target === "review") renderReview();
  if (target === "plan") renderPlan();
  if (target === "home") renderHome();
  window.scrollTo({ top: 0, behavior: "instant" });
  enterMotion($("#view-" + target));
}
function renderAll() {
  stopMotion();
  initializeDailyOptions();
  renderDaily();
  renderHome();
  renderWords();
  renderReview();
  renderSettings();
  if (view === "plan") renderPlan();
  syncSearchableSelects();
}
function syncVisualMonth() {
  const days = activeDays(), now2 = today();
  if (visualSource !== state || visualStart !== state.startDate || visualToday !== now2) {
    visualMonth = (now2 < days[0].date ? days[0].date : now2 > days.at(-1).date ? days.at(-1).date : now2).slice(0, 7);
    visualSource = state;
    visualStart = state.startDate;
    visualToday = now2;
  }
}
function renderCalendar(target) {
  const days = activeDays(), cells = monthCells(days, visualMonth, today(), completedCount);
  const firstMonth = days[0].date.slice(0, 7), lastMonth = days.at(-1).date.slice(0, 7);
  const [year, month] = visualMonth.split("-"), large = target === "#roadmap-calendar";
  const scheduled = days.filter((d) => d.date.startsWith(visualMonth));
  const completed = scheduled.filter((d) => d.date <= today() && completedCount(d) === 5).length;
  const recorded = scheduled.reduce((n, d) => n + completedCount(d), 0);
  const elapsed = scheduled.filter((d) => d.date <= today()).length;
  const current = days.find((d) => d.date === today()) || days.filter((d) => d.date <= today()).at(-1) || days[0];
  const weekText = today() < days[0].date ? `${days[0].date.slice(5).replace("-", "\u6708")}\u65E5\u542F\u7A0B \xB7 \u9996\u5468` : today() > days.at(-1).date ? "\u8BFE\u7A0B\u6392\u671F\u5DF2\u7ED3\u675F" : `\u7B2C ${current?.week || 26} \u5468${current ? " \xB7 " + current.weekData.topic : ""}`;
  const names = { complete: "\u5DF2\u5B8C\u6210", partial: "\u90E8\u5206\u5B8C\u6210", missed: "\u5F85\u8865\u7EC3", today: "\u4ECA\u65E5", scheduled: "\u5F85\u5B66\u4E60", rest: "\u4F11\u606F", inactive: "\u8BFE\u7A0B\u5916" };
  $(target).innerHTML = `<div class="calendar-story"><div><h2>\u6211\u7684\u5B66\u4E60\u6708\u5386</h2><p>${escapeHTML(weekText)}</p></div><img src="./expedition-terrain.png" alt="" width="960" height="360"></div>
 <div class="calendar-head"><div class="calendar-month"><span class="month-number" aria-hidden="true">${month}</span><div aria-hidden="true"><strong>${["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u5341\u4E00", "\u5341\u4E8C"][Number(month) - 1]}\u6708</strong><span>${year}</span></div><h3 class="sr-only">${year} \u5E74 ${Number(month)} \u6708</h3></div><div class="calendar-controls" role="group" aria-label="\u5207\u6362\u6708\u4EFD"><button type="button" data-month-step="-1" aria-label="\u4E0A\u4E2A\u6708" ${visualMonth <= firstMonth ? "disabled" : ""}>\u2039</button><button type="button" data-month-today aria-label="\u8FD4\u56DE\u4ECA\u5929\u6240\u5728\u6708\u4EFD">\u4ECA\u5929</button><button type="button" data-month-step="1" aria-label="\u4E0B\u4E2A\u6708" ${visualMonth >= lastMonth ? "disabled" : ""}>\u203A</button></div></div>
 <div class="calendar-summary"><span>\u672C\u6708\u6392\u671F <b>${scheduled.length}</b> \u65E5</span><span>\u622A\u81F3\u4ECA\u5929\u5B8C\u6210 <b>${completed}/${elapsed}</b> \u65E5</span><span>\u5DF2\u8BB0\u5F55 <b>${recorded}/${scheduled.length * 5}</b> \u9879</span></div>
 <div class="calendar-weekdays" aria-hidden="true">${["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"].map((n) => `<span>${n}</span>`).join("")}</div><div class="calendar-grid">${cells.map((cell) => {
    if (cell.blank) return '<span class="calendar-blank" aria-hidden="true"></span>';
    const label = `${cell.date}${cell.today ? " \u4ECA\u5929" : ""} \xB7 ${cell.day ? `\u7B2C${cell.day.week}\u5468 ${cell.day.dayName} \xB7 ${cell.completed}/5\u4EFB\u52A1 \xB7 ` : ""}${names[cell.status]}`;
    const contents = `<b>${cell.number}</b>${cell.today ? '<em class="date-today" aria-hidden="true">\u4ECA</em>' : ""}${cell.day ? `<span class="cell-progress ${cell.completed ? "" : "sr-only"}">${cell.completed === 5 ? "\u2713 " : ""}${cell.completed}/5</span>${large ? `<span class="cell-topic" aria-hidden="true">\u7B2C${cell.day.week}\u5468 \xB7 ${escapeHTML(cell.day.weekData.topic)}</span>` : ""}<span class="calendar-dots" aria-hidden="true">${Array.from({ length: 5 }, (_, i) => `<i class="calendar-dot ${i < cell.completed ? "filled" : ""}"></i>`).join("")}</span>` : cell.status === "rest" ? "<small>\u4F11\u606F</small>" : ""}`;
    const cls = `calendar-cell ${cell.status}${cell.today ? " today" : ""}`;
    return cell.day ? `<button type="button" class="${cls}" data-calendar-key="${cell.day.key}" data-date="${cell.date}" aria-label="${label}" ${cell.today ? 'aria-current="date"' : ""}>${contents}</button>` : `<div class="${cls}" data-date="${cell.date}" aria-label="${label}">${contents}</div>`;
  }).join("")}</div><div class="calendar-legend"><span><i class="legend-complete"></i>\u5B8C\u6210</span><span><i class="legend-partial"></i>\u90E8\u5206\u5B8C\u6210</span><span><i class="legend-today"></i>\u4ECA\u5929</span><span>\u4E94\u70B9 = \u4E94\u9879\u4EFB\u52A1 \xB7 \u5468\u65E5\u4F11\u606F</span></div><p class="calendar-bounds">${days[0].date} \u2014 ${days.at(-1).date} \xB7 \u672A\u5B8C\u6210\u7684\u8FC7\u53BB\u65E5\u671F\u53EF\u8865\u7EC3</p>`;
}
function renderAchievements() {
  const summary = learningSummary(activeDays(), today(), completedCount, state.reviews);
  $("#learning-streak").textContent = `\u8FDE\u7EED\u5B8C\u6210 ${summary.streak} \u4E2A\u6392\u671F\u5B66\u4E60\u65E5 \xB7 \u5468\u65E5\u4E0D\u6253\u65AD\uFF1B\u4ECA\u5929\u672A\u5B8C\u6210\u65F6\u4FDD\u7559\u6B64\u524D\u8FDE\u7EED\u8BB0\u5F55\uFF0C\u672A\u6765\u6253\u5361\u4E0D\u8BA1\u5165\u6210\u5C31\u3002`;
  $("#achievements").innerHTML = summary.badges.map((b) => `<article class="achievement ${b.unlocked ? "unlocked" : ""}" data-badge="${b.id}" data-unlocked="${b.unlocked}"><span class="badge-icon" aria-hidden="true">${BADGE_ICONS[b.id]}</span><div><h3>${b.name}</h3><p>${b.detail}</p><strong>${b.unlocked ? "\u5DF2\u8FBE\u6210" : "\u5F85\u8FBE\u6210"} \xB7 ${b.progress}</strong></div></article>`).join("");
}
function renderJourney() {
  const days = activeDays(), current = pickToday().week;
  if (!journeyWeek) journeyWeek = current;
  const infos = WEEKS.map((w) => weekSummary(days, w.number, completedCount, current));
  $("#journey-nodes").innerHTML = mapMarkup(WEEKS, infos, journeyWeek, current, escapeHTML);
  const week = WEEKS[journeyWeek - 1], info = infos[journeyWeek - 1], first = days.find((d) => d.week === journeyWeek);
  $("#journey-detail").innerHTML = `<div><span class="welcome-kicker">WEEK ${String(journeyWeek).padStart(2, "0")} \xB7 ${escapeHTML(week.phase)}</span><h2>${escapeHTML(week.topic)}</h2><p>${{ complete: "\u5DF2\u5B8C\u6210", current: "\u5F53\u524D\u5468", unfinished: "\u672A\u5B8C\u6210" }[info.status]} \xB7 \u5DF2\u5B8C\u6210 ${info.completed}/${info.total} \u5B66\u4E60\u65E5 \xB7 \u9996\u65E5 ${first.date}</p></div><button class="primary-btn" data-go="daily" data-session-key="${first.key}">\u6253\u5F00\u7B2C ${journeyWeek} \u5468\u8BAD\u7EC3 \u2192</button>`;
  $("#journey-teaser-copy").textContent = `\u5F53\u524D\u7B2C ${current} \u5468 \xB7 ${WEEKS[current - 1].topic}\u3002\u6240\u6709\u5468\u6B21\u90FD\u53EF\u6D4F\u89C8\uFF0C\u968F\u65F6\u56DE\u5230\u9700\u8981\u52A0\u5F3A\u7684\u4E3B\u9898\u3002`;
}
function selectJourneyWeek(week, focus = false) {
  focus = focus || document.activeElement?.hasAttribute("data-journey-week");
  const previous = journeyWeek;
  journeyWeek = Math.max(1, Math.min(26, week));
  stopMotion();
  renderJourney();
  travelToWeek(previous, journeyWeek);
  const node = $(`[data-journey-week="${journeyWeek}"]`), port = $(".journey-viewport");
  if (focus) node.focus({ preventScroll: true });
  if (port) {
    const r = node.getBoundingClientRect(), p = port.getBoundingClientRect();
    port.scrollLeft += r.x + r.width / 2 - p.x - p.width / 2;
  }
  tween($("#journey-detail"), { translateY: [8, 0], opacity: [0.7, 1], duration: 240 });
}
function renderVisuals() {
  syncVisualMonth();
  renderCalendar("#home-calendar");
  renderCalendar("#roadmap-calendar");
  renderAchievements();
  renderJourney();
}
function renderHome() {
  stopMotion();
  const previousStats = Object.fromEntries(["s-progress", "s-minutes", "s-days", "s-words"].map((id) => [id, $("#" + id).firstChild?.textContent || ""]));
  const calendar = activeDays(), tasks = calendar.flatMap((d2) => getTasks(d2));
  const complete = tasks.filter((t) => getProgress(t).completed).length;
  const minutes = tasks.reduce((sum, t) => sum + (Number(getProgress(t).minutes) || 0), 0);
  const days = calendar.filter((d2) => completedCount(d2) === 5).length;
  $("#core-count").textContent = `\u5168\u90E8 ${tasks.length} \u9879\u6838\u5FC3\u8BAD\u7EC3`;
  $("#calendar-summary").textContent = `${calendar.length} \u4E2A\u5B66\u4E60\u65E5\uFF0C\u6BCF\u5929 5 \u9879\u4EFB\u52A1\u300190\u5206\u949F\uFF0C\u5468\u65E5\u4F11\u606F\u3002`;
  $("#s-progress").textContent = Math.round(complete / tasks.length * 100) + "%";
  $("#s-minutes").innerHTML = (minutes / 60).toFixed(1) + "<span>h</span>";
  $("#s-days").innerHTML = days + ` <span>/ ${calendar.length}</span>`;
  $("#s-words").textContent = state.words.length;
  $("#today-label").textContent = "\u4ECA\u5929 " + today();
  const d = pickToday();
  $("#home-session-heading").textContent = d.date === today() ? "\u4ECA\u5929\u7684\u4E94\u9879\u8BAD\u7EC3" : today() < calendar[0].date ? "\u4E0B\u4E00\u6B21\u8BAD\u7EC3 \xB7 \u5373\u5C06\u5F00\u59CB" : "\u4E0B\u4E00\u6B21 / \u5F85\u8865\u8BAD\u7EC3";
  $("#home-week-badge").textContent = "\u7B2C " + d.week + " \u5468";
  $("#home-next").innerHTML = `<div class="next-focus">${escapeHTML(d.weekData.topic)}</div><div class="next-desc">${d.date} \xB7 ${escapeHTML(d.dayName)} \xB7 ${completedCount(d)}/5 \u5DF2\u5B8C\u6210<br>\u4E94\u9879\u7EC3\u4E60 \xB7 \u5EFA\u8BAE\u5171 90 \u5206\u949F</div><ul class="session-tasks">${getTasks(d).map((t) => `<li class="session-task"><span class="task-icon" aria-hidden="true">${TASK_ICONS[t.id.split(":")[1]]}</span><b>${escapeHTML(t.title)}</b><small>${t.minutes}\u5206</small><span class="task-status">${getProgress(t).completed ? "\u5DF2\u5B8C\u6210" : "\u5F85\u5B8C\u6210"}</span></li>`).join("")}</ul>`;
  $$('#view-home [data-go="daily"]').forEach((button) => button.dataset.sessionKey = d.key);
  renderVisuals();
  countStats(previousStats);
}
function renderDailyMethods(day) {
  const hint = practiceHint(state.startDate, day.date);
  $("#practice-title").textContent = hint.title;
  $("#practice-text").textContent = hint.text;
  $("#coach-prompt").value = coachPrompt(day);
  $("#coach-prompt").scrollTop = 0;
  $("#coach-copy-status").textContent = "\u4EC5\u590D\u5236\u6587\u672C\uFF1B\u8BF7\u81EA\u884C\u7C98\u8D34\u5230 ChatGPT\u3002";
}
function taskMethod(skill) {
  const steps = SKILL_METHODS[skill] || [];
  return `<details class="method-details task-method"><summary>\u600E\u4E48\u7EC3\uFF1A\u5148\u5C1D\u8BD5\uFF0C\u518D\u770B\u63D0\u793A</summary><ol>${steps.map((step) => `<li>${escapeHTML(step)}</li>`).join("")}</ol><p class="hint">\u5728\u672C\u9879\u539F\u6709\u65F6\u95F4\u5185\u7EC3\uFF1B\u8BC1\u636E\u4ECD\u5199\u5165\u4E0B\u65B9 350 \u5B57\u680F\uFF0C\u4E0D\u81EA\u52A8\u8BB0\u5F55\u3002</p></details>`;
}
async function copyCoachPrompt() {
  const field = $("#coach-prompt"), status = $("#coach-copy-status");
  try {
    await navigator.clipboard.writeText(field.value);
    status.textContent = "\u5DF2\u590D\u5236\uFF1B\u53EF\u81EA\u884C\u7C98\u8D34\u5230 ChatGPT\u3002";
  } catch {
    field.focus();
    field.select();
    status.textContent = "\u81EA\u52A8\u590D\u5236\u5931\u8D25\uFF0C\u5DF2\u9009\u4E2D\u6587\u672C\u3002\u8BF7\u6309 \u2318C / Ctrl+C\uFF0C\u6216\u957F\u6309\u590D\u5236\u3002";
  }
}
function insertReviewTemplate() {
  const field = $("#review-form").elements.summary, result = appendReviewTemplate(field.value);
  const status = $("#review-template-status");
  if (!result.ok) {
    status.textContent = result.reason === "duplicate" ? "\u5DF2\u6709\u5B66\u4E60\u8BC1\u636E\u6A21\u677F\uFF0C\u4E0D\u91CD\u590D\u63D2\u5165\u3002" : "\u5269\u4F59\u7A7A\u95F4\u4E0D\u8DB3\uFF08\u4E0A\u9650 2000 \u5B57\uFF09\uFF0C\u672A\u6539\u52A8\u539F\u6587\u3002\u8BF7\u5148\u81EA\u884C\u6574\u7406\u3002";
    return;
  }
  field.value = result.value;
  status.textContent = "\u5DF2\u8FFD\u52A0\u5230\u539F\u6587\u672B\u5C3E\uFF0C\u5C1A\u672A\u4FDD\u5B58\uFF1B\u586B\u5199\u540E\u70B9\u51FB\u4FDD\u5B58\u590D\u76D8\u3002";
  field.focus();
}
function renderDaily() {
  stopMotion();
  const day = currentDay();
  $("#daily-day").value = day.key;
  $("#daily-date-label").textContent = dayDate(state.startDate, day.week, day.day) + " \xB7 " + day.dayName;
  $("#daily-phase").textContent = "WEEK " + String(day.week).padStart(2, "0") + " \xB7 " + day.weekData.phase;
  $("#daily-topic").textContent = day.weekData.topic;
  $("#daily-sub").textContent = day.focus + " \xB7 \u6838\u5FC3\u8BED\u6CD5 " + day.weekData.grammar + " \xB7 \u672C\u5468\u8F93\u51FA\u76EE\u6807\uFF1A" + day.weekData.output;
  renderDailyMethods(day);
  const tasks = getTasks(day, weakFor(day.week));
  const c = tasks.filter((t) => getProgress(t).completed).length;
  $("#daily-rate").textContent = Math.round(c * 20) + "%";
  $("#daily-donut").style.background = `conic-gradient(#216b63 ${c * 20}%,#e3eeeb 0)`;
  $("#task-list").innerHTML = tasks.map((t) => {
    const p = getProgress(t);
    return `<article class="task-card ${p.completed ? "done" : ""}" data-task-id="${t.id}"><button class="task-check" data-task-toggle="${t.id}" aria-pressed="${!!p.completed}" aria-label="${p.completed ? "\u53D6\u6D88" : "\u5B8C\u6210"} ${escapeHTML(t.title)}">${p.completed ? "\u2713" : ""}</button><div><div class="task-top"><span class="task-icon" aria-hidden="true">${TASK_ICONS[t.id.split(":")[1]]}</span><h3>${escapeHTML(t.title)}</h3><span class="tag">${escapeHTML(t.resource)}</span><span class="tag time">\u5EFA\u8BAE ${t.minutes} \u5206\u949F</span></div><p>${escapeHTML(t.instruction)}</p><p class="accept"><b>\u5B8C\u6210\u6807\u51C6\uFF1A</b>${escapeHTML(t.done)}</p>${taskMethod(t.id.split(":")[1])}<div class="task-footer"><label>\u5B9E\u9645\u5206\u949F <input type="number" data-actual="${t.id}" min="0" max="180" value="${p.minutes || 0}" aria-label="\u5B9E\u9645\u8BAD\u7EC3\u5206\u949F"></label><label>\u5B8C\u6210\u8BC1\u636E / \u6613\u9519\u70B9 <input type="text" maxlength="350" data-evidence="${t.id}" value="${escapeHTML(p.evidence || "")}" placeholder="\u7559\u4E00\u53E5\u81EA\u5DF1\u7684\u8868\u8FBE\u6216\u9519\u8BEF"></label><button class="outline-btn" data-task-save="${t.id}">\u4FDD\u5B58\u8BB0\u5F55</button><a class="external" href="${escUrl(t.url)}" target="_blank" rel="noopener noreferrer">\u6253\u5F00 ${escapeHTML(t.resource)} \u2197</a>${t.extraUrl ? `<a class="external" href="${escUrl(t.extraUrl)}" target="_blank" rel="noopener noreferrer">${escapeHTML(t.extraLabel)} \u2197</a>` : ""}</div></div></article>`;
  }).join("");
  syncSearchableSelects();
}
function renderPlan() {
  stopMotion();
  renderVisuals();
  if (planView !== "table") return;
  const week = $("#plan-week").value, status = $("#plan-status").value, query = $("#plan-query").value.trim().toLowerCase();
  planRows = activeDays().filter((d) => {
    const done = completedCount(d) === 5;
    return (week === "all" || d.week === Number(week)) && (status === "all" || (status === "complete" ? done : !done)) && (!query || [d.weekData.topic, d.weekData.grammar, d.weekData.lessons.join(","), d.weekData.voa, d.weekData.phase].join(" ").toLowerCase().includes(query));
  }).map((d) => ({ key: d.key, week: `W${String(d.week).padStart(2, "0")}`, date: dayDate(state.startDate, d.week, d.day), day: d.dayName, phase: d.weekData.phase, topic: d.weekData.topic, nce: d.weekData.lessons.join(" / "), focus: d.focus, progress: `${completedCount(d)}/5`, status: completedCount(d) === 5 ? "\u5DF2\u5B8C\u6210" : "\u8FDB\u884C\u4E2D" }));
  $("#plan-count").textContent = `${planRows.length} \u4E2A\u5B66\u4E60\u65E5`;
  const area = $("#vtable"), fallback = $("#table-fallback");
  if (table) {
    try {
      table.release();
    } catch {
    }
    table = null;
  }
  area.innerHTML = "";
  fallback.innerHTML = "";
  if (window.VTable?.ListTable) {
    try {
      const opts = { container: area, records: planRows, autoFillWidth: true, columns: [{ field: "week", title: "\u5468\u6B21", width: 68, minWidth: 68 }, { field: "date", title: "\u65E5\u671F", width: 128, minWidth: 128 }, { field: "day", title: "\u661F\u671F", width: 68, minWidth: 68 }, { field: "phase", title: "\u9636\u6BB5", width: 112, minWidth: 112 }, { field: "topic", title: "\u672C\u5468\u4E3B\u9898", width: 168, minWidth: 168 }, { field: "nce", title: "\u65B0\u6982\u5FF5\u5355\u5143", width: 128, minWidth: 128 }, { field: "focus", title: "\u5F53\u65E5\u91CD\u70B9", width: 176, minWidth: 176 }, { field: "progress", title: "\u8FDB\u5EA6", width: 72, minWidth: 72 }], defaultRowHeight: 44, headerRowHeight: 45, theme: { headerStyle: { bgColor: "#eaf2f0", color: "#284c48", fontWeight: "bold" }, bodyStyle: { bgColor: "#fff", color: "#213d39" }, frameStyle: { borderColor: "#dce6e3", cornerRadius: 0 } }, autoWrapText: false, showHeader: true };
      table = new window.VTable.ListTable(opts);
      table.on(window.VTable.ListTable.EVENT_TYPE.CLICK_CELL, (e) => {
        if (e.row < 1) return;
        const rec = table.getRecordByCell?.(e.col, e.row) || planRows[e.row - 1];
        if (rec?.key) {
          selectedKey = rec.key;
          navigate("daily");
        }
      });
      area.hidden = false;
      fallback.hidden = true;
      return;
    } catch (e) {
      notice("VTable \u672A\u80FD\u521D\u59CB\u5316\uFF0C\u5DF2\u4F7F\u7528 HTML \u8868\u683C\u3002", true);
    }
  }
  area.hidden = true;
  fallback.hidden = false;
  fallback.innerHTML = `<table class="fallback-table"><thead><tr><th>\u5468\u6B21</th><th>\u65E5\u671F</th><th>\u661F\u671F</th><th>\u9636\u6BB5</th><th>\u5B66\u4E60\u4E3B\u9898</th><th>\u65B0\u6982\u5FF5\u5355\u5143</th><th>\u8FDB\u5EA6</th></tr></thead><tbody>${planRows.map((r) => `<tr data-plan-row="${r.key}"><td>${r.week}</td><td><button data-plan-row="${r.key}" aria-label="${r.date} \u7B2C${r.week}\u5468 ${r.progress}\u4EFB\u52A1">${r.date}</button></td><td>${r.day}</td><td>${escapeHTML(r.phase)}</td><td>${escapeHTML(r.topic)}</td><td>${r.nce}</td><td>${r.progress}</td></tr>`).join("")}</tbody></table>`;
}
function renderWords() {
  const box = $("#words-list");
  box.innerHTML = state.words.length ? state.words.map((w) => `<article class="word-card"><h3>${escapeHTML(w.term)}</h3><p class="hint">\u5148\u7528\u8FD9\u4E2A\u8868\u8FBE\u9020\u4E00\u4E2A\u65B0\u53E5\uFF0C\u518D\u5C55\u5F00\u6838\u5BF9\u5E76\u81EA\u8BC4\u3002</p><details class="method-details word-answer"><summary>\u67E5\u770B\u91CA\u4E49\u4E0E\u65E7\u4F8B\u53E5</summary><p>${escapeHTML(w.meaning)} \xB7 ${escapeHTML(w.source)}</p>${w.example ? `<div class="example">${escapeHTML(w.example)}</div>` : ""}</details><p>\u8FC1\u79FB\u719F\u7EC3\u5EA6 ${validNumber(w.mastery, 0, 5)}/5 \xB7 ${dueWord(w) ? "<b>\u4ECA\u5929\u5E94\u518D\u6B21\u9020\u53E5</b>" : "\u4E0B\u6B21\u590D\u6D4B\uFF1A" + escapeHTML(w.next_review || "\u5F85\u5B89\u6392")}</p><div class="word-actions"><button data-word-rating="${escapeHTML(w.id)}" data-rating="0">\u8FD8\u4E0D\u4F1A</button><button data-word-rating="${escapeHTML(w.id)}" data-rating="1">\u52C9\u5F3A\u4F1A</button><button data-word-rating="${escapeHTML(w.id)}" data-rating="2">\u80FD\u72EC\u7ACB\u4F7F\u7528</button><button class="danger" data-word-remove="${escapeHTML(w.id)}">\u5220\u9664</button></div></article>`).join("") : '<p class="empty">\u5C1A\u65E0\u8868\u8FBE\u8FC1\u79FB\u5361\u3002\u53EA\u8BB0\u5F55\u5DF2\u7ECF\u5728\u5176\u4ED6 App \u5B66\u8FC7\u3001\u4F46\u4F60\u8FD8\u4E0D\u4F1A\u5728\u65B0\u53E5\u5B50\u4E2D\u4F7F\u7528\u7684\u8868\u8FBE\u3002</p>';
}
function renderReview() {
  const w = Number($("#review-week").value) || selectedWeek;
  selectedWeek = w;
  const data = state.reviews[w];
  const form = $("#review-form");
  for (const k of ["vocabulary", "grammar", "listening", "reading", "speaking"]) form.elements[k].value = data?.[k] ?? 3;
  form.elements.summary.value = data?.summary || "";
  $("#review-template-status").textContent = "\u6A21\u677F\u53EA\u8FFD\u52A0\u5230\u73B0\u6709\u6587\u672C\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u4FDD\u5B58\u3002";
  form.elements.weak_skill.value = data?.weak_skill || "";
  const arr = Object.values(state.reviews).sort((a, b) => b.week - a.week);
  $("#review-history").innerHTML = arr.length ? arr.slice(0, 8).map((r) => `<div><b>\u7B2C ${r.week} \u5468</b> \xB7 \u4E0B\u5468\u91CD\u70B9\uFF1A${escapeHTML(r.weak_skill || "\u6309\u6700\u4F4E\u8BC4\u5206")} \xB7 ${escapeHTML(r.summary || "\u672A\u586B\u5199\u590D\u76D8\u5185\u5BB9")}</div>`).join("") : '<p class="muted">\u6BCF\u5468\u516D\u7EFC\u5408\u590D\u6D4B\u540E\u586B\u4E00\u6B21\u590D\u76D8\uFF0C\u7CFB\u7EDF\u4F1A\u5728\u4E0B\u4E00\u5468\u5468\u56DB\u7684\u53E3\u8BED\u8BAD\u7EC3\u4E2D\u52A0\u5165\u4F60\u7684\u5F31\u9879\u63D0\u793A\u3002</p>';
  syncSearchableSelects();
}
function renderSettings() {
  $("#start-date").value = state.startDate;
}
var RESOURCES = [
  { name: "ncego \xB7 \u65B0\u6982\u5FF5\u82F1\u8BED", type: "\u7CFB\u7EDF\u8BFE\u7A0B", desc: "\u5B98\u7F51\u5C06\u300A\u65B0\u6982\u5FF5\u82F1\u8BED\u7B2C\u4E00\u518C\u300B\u6574\u7406\u6210 72 \u4E2A\u5355\u5143\uFF0C\u63D0\u4F9B\u8BFE\u7A0B\u7B14\u8BB0\u548C\u5355\u8BCD\u5217\u8868\u3002", how: "\u5468\u4E00\u548C\u5468\u4E09\u5B66\u4E60\u65B0\u5355\u5143\uFF1B\u5468\u4E8C\u7EC3\u4E60\u3001\u5468\u56DB\u8FC1\u79FB\u3001\u5468\u4E94\u8FC1\u79FB\u3001\u5468\u516D\u7EFC\u5408\u590D\u6D4B\u3002\u6309\u5355\u5143\u53F7\u8FDB\u5165\u7F51\u7AD9\uFF0C\u4E0D\u590D\u5236\u53D7\u7248\u6743\u4FDD\u62A4\u7684\u8BFE\u6587\u3002", url: LINKS.nce, extra: "\u63D0\u9192\uFF1A\u672C\u8BA1\u5212\u524D 16 \u5468\u6BCF\u5468 2 \u4E2A\u5355\u5143\uFF1B\u540E 10 \u5468\u6BCF\u5468 1 \u4E2A\u5355\u5143\u3002" },
  { name: "TypeWords", type: "\u8BCD\u6C47 \xB7 \u9ED8\u5199", desc: "\u8DDF\u5199\u3001\u542C\u5199\u3001\u81EA\u6D4B\u3001\u9ED8\u5199\u3001\u667A\u80FD\u590D\u4E60\u3001\u9519\u8BCD\u672C\u3001\u6587\u7AE0\u9010\u53E5\u8F93\u5165\u3002", how: "\u6BCF\u5929\u5148\u5B8C\u6210\u667A\u80FD\u590D\u4E60\uFF0C\u518D\u5B66\u7EA6 8 \u4E2A\u65B0\u8BCD\uFF1B\u5468\u4E94\u7528\u65B0\u53E5\u8FC1\u79FB\uFF0C\u5468\u516D\u91CD\u70B9\u590D\u6D4B\u9519\u8BCD\u3002\u4E0D\u8981\u5728\u672C\u7CFB\u7EDF\u5EFA\u7ACB\u7B2C\u4E8C\u5957\u5B8C\u6574\u5355\u8BCD\u672C\u3002", url: LINKS.typewords, extra: "\u5B98\u7F51\u5F00\u6E90\u8BF4\u660E\u672A\u786E\u8BA4\u9ED8\u8BA4\u5185\u7F6E\u201C\u65B0\u6982\u5FF5\u7B2C\u4E00\u518C\u201D\u4E13\u95E8\u8BCD\u5E93\uFF1B\u53EF\u7528\u7F51\u7AD9\u63D0\u4F9B\u7684\u8BCD\u5E93\u6216\u81EA\u5B9A\u4E49\u5BFC\u5165\u3002" },
  { name: "\u5C0F\u9E66\u770B\u770B", type: "\u542C\u529B \xB7 \u8DDF\u8BFB", desc: "\u5207\u6362/\u641C\u7D22\u5B57\u5E55\u3001\u5355\u53E5\u5FAA\u73AF\u3001\u53D8\u901F\u64AD\u653E\u3001\u53E5\u95F4\u6682\u505C\u3001\u6536\u85CF\u53E5\u5B50\u3001\u7B14\u8BB0\u3001\u5BFC\u51FA\u5B57\u5E55\u4E0E\u97F3\u9891\u3002", how: "\u6BCF\u5468\u53EA\u7CBE\u5B66\u4E00\u6BB5 VOA \u89C6\u9891\uFF1A\u76F2\u542C \u2192 \u5B57\u5E55\u6838\u5BF9 \u2192 \u5355\u53E5\u5FAA\u73AF \u2192 \u8DDF\u8BFB \u2192 \u5173\u5B57\u5E55\u590D\u8FF0\u3002", url: LINKS.app, extra: "\u82E5\u8981\u89C2\u770B YouTube \u89C6\u9891\uFF0C\u8BF7\u6309\u5C0F\u9E66\u770B\u770B\u5B98\u65B9\u5BFC\u5165\u6559\u7A0B\u64CD\u4F5C\uFF1B\u4E0D\u662F\u58F0\u79F0\u80FD\u76F4\u63A5\u8BFB\u53D6\u4F60\u7684\u89C6\u9891\u8BB0\u5F55\u3002" },
  { name: "Relingo", type: "\u9605\u8BFB \xB7 \u751F\u8BCD\u573A\u666F", desc: "\u5206\u7EA7\u751F\u8BCD\u9AD8\u4EAE\u3001\u5212\u8BCD/\u6BB5\u843D\u7FFB\u8BD1\u3001\u95EA\u5361\u3001\u9605\u8BFB\u7BA1\u7406\u3001YouTube \u53CC\u8BED\u5B57\u5E55\u7B49\u3002", how: "\u6BCF\u5929\u8BFB A1/A2 \u5C0F\u77ED\u6587\uFF1B\u5148\u6293\u4E3B\u65E8\uFF0C\u53EA\u6536\u85CF\u771F\u6B63\u5F71\u54CD\u7406\u89E3\u7684\u751F\u8BCD\u3002\u628A\u5C11\u91CF\u96BE\u4EE5\u8FD0\u7528\u7684\u8868\u8FBE\u505A\u6210\u8FC1\u79FB\u5361\u3002", url: LINKS.re, extra: "Relingo \u81EA\u8EAB\u7684\u8BCD\u6C47\u590D\u4E60\u7559\u5728 Relingo \u4E2D\uFF0C\u4E0D\u5F3A\u884C\u540C\u6B65\u5230 TypeWords\u3002" },
  { name: "VOA \xB7 Let\u2019s Learn English 1", type: "\u89C6\u9891\u8BFE\u7A0B", desc: "\u9762\u5411\u521D\u5B66\u8005\u7684\u5B98\u65B9 52 \u5468\u89C6\u9891\u8BFE\u7A0B\uFF0C\u542B\u542C\u8BF4\u3001\u8BCD\u6C47\u3001\u7EC3\u4E60\u3002", how: "\u672C\u5B66\u4E60\u8BA1\u5212\u7684 26 \u5468\u6BCF\u5468\u5BF9\u5E94\u5B98\u65B9\u524D 26 \u8BFE\uFF0C\u6BCF\u5468\u7CBE\u5B66 1\u20133 \u5206\u949F\u7247\u6BB5\u3002", url: LINKS.voa, extra: "\u89C6\u9891\u672A\u5FC5\u80FD\u5728\u6240\u6709\u5730\u533A\u76F4\u63A5\u8BBF\u95EE\uFF1B\u53EF\u4ECE VOA \u5B98\u7F51\u9009\u5B98\u65B9\u8BFE\u7A0B\u89C6\u9891\u3002" },
  { name: "ChatGPT", type: "\u53E3\u8BED\u8F93\u51FA", desc: "\u89D2\u8272\u626E\u6F14\u3001\u7EA0\u9519\u3001\u590D\u8FF0\u3001\u6362\u573A\u666F\u8FFD\u95EE\uFF0C\u4E0D\u662F\u81EA\u52A8\u7ED9\u5206\u3002", how: "\u6BCF\u5929\u6700\u540E 20 \u5206\u949F\u7EC3\u8F93\u51FA\uFF1B\u5148\u56DE\u7B54\uFF0C\u8001\u5E08\u53EA\u7EA0\u6B63 1\u20132 \u4E2A\u6700\u91CD\u8981\u7684\u95EE\u9898\uFF0C\u518D\u6362\u573A\u666F\u6D4B\u8BD5\u662F\u5426\u638C\u63E1\u3002", url: LINKS.chat, extra: "\u4E0E\u6B64\u7F51\u9875\u6CA1\u6709\u76F4\u63A5\u6570\u636E\u63A5\u53E3\uFF1B\u804A\u5929\u7ED3\u679C\u7531\u4F60\u624B\u52A8\u8BB0\u5F55\u4E00\u53E5\u8BC1\u636E\u3002" }
];
function renderResources() {
  $("#method-cards").innerHTML = METHOD_CARDS.map((card) => `<details class="method-details guide-method"><summary>${escapeHTML(card.title)}</summary><p>${escapeHTML(card.text)}</p><a class="source-link" href="${METHOD_SOURCE}/blob/master/${card.path}" target="_blank" rel="noopener noreferrer">\u539F\u59CB\u65B9\u6CD5\u6765\u6E90 \u2197</a></details>`).join("");
  $("#method-credit").innerHTML = `\u65B9\u6CD5\u6539\u5199\u81EA <a href="${METHOD_SOURCE}" target="_blank" rel="noopener noreferrer">\u97E9\u5148\u51EF\uFF08\u79BB\u8C31\uFF09\xB7 up</a>\uFF0C\u4F9D\u636E <a href="${METHOD_LICENSE}" target="_blank" rel="noopener noreferrer">CC BY-NC 4.0</a> \u4F5C\u521D\u5B66\u8005\u4E2A\u4EBA\u975E\u5546\u4E1A\u9002\u914D\uFF0C\u975E\u539F\u4F5C\u8005\u80CC\u4E66\u3002`;
  $("#resource-cards").innerHTML = RESOURCES.map((r) => `<article class="resource-card"><span class="rank">${escapeHTML(r.type)}</span><h3>${escapeHTML(r.name)}</h3><p>${escapeHTML(r.desc)}</p><p><b>\u5177\u4F53\u600E\u4E48\u7528\uFF1A</b>${escapeHTML(r.how)}</p><p class="hint">${escapeHTML(r.extra)}</p><a class="source-link" target="_blank" rel="noopener noreferrer" href="${escUrl(r.url)}">\u67E5\u770B\u5B98\u65B9\u8D44\u6E90 \u2197</a></article>`).join("");
}
function initializeDailyOptions() {
  const days = activeDays();
  if (!days.some((d) => d.key === selectedKey)) selectedKey = pickToday().key;
  $("#daily-day").replaceChildren(...days.map((d) => {
    const o = document.createElement("option");
    o.value = d.key;
    o.textContent = `\u7B2C ${String(d.week).padStart(2, "0")} \u5468 ${d.dayName} \u2014 ${d.date} \u2014 ${d.weekData.topic}`;
    return o;
  }));
}
function initializeOptions() {
  for (const w of WEEKS) {
    const o = document.createElement("option");
    o.value = w.number;
    o.textContent = `\u7B2C ${w.number} \u5468 \xB7 ${w.topic}`;
    $("#review-week").append(o);
    const p = document.createElement("option");
    p.value = w.number;
    p.textContent = `\u7B2C ${w.number} \u5468`;
    $("#plan-week").append(p);
  }
}
async function remoteRows(ctx, tableName, columns, orderKey) {
  const rows = [];
  for (let offset = 0; ; offset += 100) {
    requireContext(ctx);
    const result = await ctx.client.from(tableName).select(columns).eq("user_id", ctx.id).order(orderKey).range(offset, offset + 99);
    requireContext(ctx);
    if (result.error) throw Error("\u4E91\u7AEF\u5206\u9875\u8BFB\u53D6\u5931\u8D25");
    rows.push(...result.data || []);
    if ((result.data || []).length < 100) return { data: rows, error: null };
  }
}
async function remoteLoad(ctx = cloudContext()) {
  if (!ctx.client || !ctx.id || !contextCurrent(ctx)) return;
  const load = ++loadGeneration;
  setMode("\u6B63\u5728\u8BFB\u53D6\u4E91\u7AEF\u2026");
  const current = () => contextCurrent(ctx) && load === loadGeneration;
  try {
    const [a, b, c, d] = await Promise.all([
      ctx.client.from("coach_settings").select("start_date").eq("user_id", ctx.id).maybeSingle(),
      remoteRows(ctx, "coach_tasks", "task_key,completed,minutes,evidence", "task_key"),
      remoteRows(ctx, "coach_words", "id,term,meaning,source,example,mastery,next_review", "id"),
      remoteRows(ctx, "coach_reviews", "week_no,summary,weak_skill,vocabulary,grammar,listening,reading,speaking", "week_no")
    ]);
    if (!current()) return;
    if ([a, b, c, d].some((r) => r.error)) throw Error("\u4E91\u7AEF\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u3001SQL \u521D\u59CB\u5316\u548C\u6743\u9650\u3002");
    const newState = emptyState();
    if (a.data?.start_date) {
      if (!dateValidStart(a.data.start_date)) throw Error("\u4E91\u7AEF\u5F00\u59CB\u65E5\u671F\u65E0\u6548\uFF1B\u539F\u6570\u636E\u672A\u6539\u52A8\uFF0C\u8BF7\u6838\u67E5\u3002");
      newState.startDate = a.data.start_date;
    }
    for (const p of b.data || []) if (taskIdValid(p.task_key)) newState.progress[p.task_key] = { completed: !!p.completed, minutes: p.minutes || 0, evidence: p.evidence || "" };
    newState.words = (c.data || []).map((w) => ({ ...w }));
    for (const r of d.data || []) if (weekValid(r.week_no)) newState.reviews[r.week_no] = { ...r, week: r.week_no };
    state = newState;
    cloud = true;
    selectedKey = pickToday().key;
    renderAll();
    setMode("\u2713 \u4E91\u7AEF\u6570\u636E\u5DF2\u52A0\u8F7D");
    notice("\u5DF2\u4ECE Supabase \u8BFB\u53D6\u5B66\u4E60\u8BB0\u5F55");
  } catch (e) {
    if (!current()) return;
    cloud = false;
    state = demo;
    renderAll();
    setMode("\u4E91\u7AEF\u8BFB\u53D6\u5931\u8D25 \xB7 \u6682\u505C\u4E91\u7AEF\u64CD\u4F5C", true);
    notice("\u4E91\u7AEF\u8BFB\u53D6\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u3001\u8868\u6743\u9650\u548C\u5F00\u59CB\u65E5\u671F\uFF1B\u539F\u6570\u636E\u672A\u6539\u52A8\u3002", true);
  }
}
async function initCloudClient() {
  const savedConfig = localStorage.getItem(CLOUD_CONFIG_KEY);
  let cfg = DEFAULT_PUBLIC_CONFIG;
  if (savedConfig !== null) {
    try {
      cfg = JSON.parse(savedConfig);
    } catch {
      cfg = null;
    }
  }
  if (!cfg || typeof cfg.url !== "string" || !projectURLValid(cfg.url) || !publicKeyValid(cfg.key)) {
    setMode("\u5DF2\u4FDD\u5B58\u7684\u8FDE\u63A5\u914D\u7F6E\u65E0\u6548 \xB7 \u8BF7\u5728\u8BBE\u7F6E\u4E2D\u4FEE\u6B63", true);
    notice("\u5DF2\u4FDD\u5B58\u7684\u8FDE\u63A5\u914D\u7F6E\u4E0D\u7B26\u5408\u516C\u5F00\u5BC6\u94A5\u8981\u6C42\u6216\u683C\u5F0F\u635F\u574F\uFF1B\u539F\u503C\u5DF2\u4FDD\u7559\uFF0C\u8BF7\u91CD\u65B0\u586B\u5199\u3002", true);
    return;
  }
  $("#supabase-url").value = cfg.url;
  $("#supabase-key").value = cfg.key;
  if (!window.supabase?.createClient) {
    setMode("Supabase SDK \u672A\u52A0\u8F7D \xB7 \u6F14\u793A\u6A21\u5F0F", true);
    return;
  }
  try {
    const client = window.supabase.createClient(cfg.url, cfg.key, { auth: { persistSession: true, autoRefreshToken: true } });
    sb = client;
    clientURL = cfg.url;
    clientGeneration++;
    subscription = client.auth.onAuthStateChange((event, session) => {
      if (client !== sb) return;
      if (event === "SIGNED_OUT") {
        loginAttempt++;
        resetIdentity();
        return;
      }
      if (session?.user) {
        if (signingIn && loginContext && (loginContext.attempt !== loginAttempt || loginContext.identity !== authGeneration && session.user.id !== user?.id)) return;
        handleSession(session);
      }
    }).data.subscription;
    const generation = authGeneration;
    const { data, error } = await client.auth.getUser();
    if (client !== sb || generation !== authGeneration) return;
    if (error && ![400, 401].includes(error.status)) throw Error("\u8EAB\u4EFD\u68C0\u67E5\u5931\u8D25");
    if (data?.user) handleSession({ user: data.user });
    else setMode("\u8BF7\u5148\u4F7F\u7528\u90AE\u7BB1\u548C\u5BC6\u7801\u767B\u5F55");
  } catch {
    setMode("\u914D\u7F6E\u6216\u8FDE\u63A5\u65E0\u6548 \xB7 \u6F14\u793A\u6A21\u5F0F", true);
    notice("Supabase \u8FDE\u63A5\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u4E0E\u516C\u5F00\u914D\u7F6E\u3002", true);
  }
}
function renderLoginControls() {
  const button = $("#password-login");
  button.disabled = signingIn;
  button.textContent = signingIn ? "\u6B63\u5728\u767B\u5F55\u2026" : "\u767B\u5F55";
}
async function passwordLogin(e) {
  e.preventDefault();
  if (signingIn) return;
  const email = $("#login-email").value.trim(), password = $("#login-password").value;
  $("#login-password").value = "";
  if (!sb) {
    notice("\u8BF7\u5148\u586B\u5199\u5E76\u8FDE\u63A5 Supabase \u9879\u76EE", true);
    return;
  }
  if (!email || !password) {
    notice("\u8BF7\u586B\u5199\u90AE\u7BB1\u548C\u5BC6\u7801\u3002", true);
    return;
  }
  const client = sb, generation = clientGeneration, identity = authGeneration, attempt = ++loginAttempt;
  const current = () => client === sb && generation === clientGeneration && attempt === loginAttempt;
  loginContext = { identity, attempt };
  signingIn = true;
  renderLoginControls();
  try {
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (!current()) return;
    if (identity !== authGeneration && user?.id !== data?.session?.user?.id) return;
    if (error) {
      notice(authErrorMessage(error), true);
      return;
    }
    if (!data?.session?.user?.id) {
      notice("\u767B\u5F55\u672A\u5EFA\u7ACB\u6709\u6548\u4F1A\u8BDD\uFF0C\u8BF7\u91CD\u8BD5\u3002", true);
      return;
    }
    handleSession(data.session);
    notice("\u767B\u5F55\u6210\u529F\uFF0C\u6B63\u5728\u8BFB\u53D6\u4E91\u7AEF\u8BB0\u5F55\u3002");
  } catch {
    if (current() && identity === authGeneration) notice("\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5\u3002", true);
  } finally {
    $("#login-password").value = "";
    signingIn = false;
    loginContext = null;
    renderLoginControls();
  }
}
async function loadDataFromBackup(payload) {
  if (user && !cloud) throw Error("\u4E91\u7AEF\u5C1A\u672A\u52A0\u8F7D\uFF0C\u8BF7\u5148\u7B49\u5F85\u3001\u5237\u65B0\u6216\u9000\u51FA\u767B\u5F55\u3002");
  if (!payload || payload.app !== "momentum-english-v1" || !isState(payload.data)) throw Error("\u6587\u4EF6\u4E0D\u662F\u5F53\u524D\u7248\u672C\u7684\u6709\u6548\u5B66\u4E60\u5907\u4EFD");
  const s = normalizeState(payload.data);
  if (Object.keys(s.progress).some((x) => !taskIdValid(x))) throw Error("\u5305\u542B\u4E0D\u652F\u6301\u7684\u4EFB\u52A1\u7F16\u53F7\uFF1B\u672A\u5BFC\u5165");
  if (Object.keys(s.reviews).some((x) => !weekValid(x))) throw Error("\u5305\u542B\u4E0D\u652F\u6301\u7684\u5468\u6B21");
  if (s.words.length > 3e3) throw Error("\u8FC1\u79FB\u5361\u8D85\u51FA\u6570\u91CF\u9650\u5236");
  if (s.words.some((w) => !w || typeof w.term !== "string" || typeof w.meaning !== "string" || !/^[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/i.test(w.id || "") || w.next_review && !realDate(w.next_review))) throw Error("\u8FC1\u79FB\u5361\u683C\u5F0F\u6216\u65E5\u671F\u9519\u8BEF\uFF1B\u672A\u5BFC\u5165");
  if (Object.values(s.progress).some((p) => !p || typeof p !== "object" || Array.isArray(p))) throw Error("\u4EFB\u52A1\u8FDB\u5EA6\u6570\u636E\u683C\u5F0F\u9519\u8BEF");
  if (isAuthed()) {
    const ctx = cloudContext();
    await remoteWrite("coach_settings", { user_id: ctx.id, start_date: s.startDate }, null, ctx);
    for (const chunk of chunked(Object.entries(s.progress).map(([k, p]) => ({ user_id: ctx.id, task_key: k, completed: !!p.completed, minutes: validNumber(p.minutes, 0, 180), evidence: String(p.evidence || "").slice(0, 350) })), 100)) await remoteWrite("coach_tasks", chunk, null, ctx);
    for (const chunk of chunked(s.words.map((w) => wordRemote({ ...w, term: w.term.slice(0, 100), meaning: w.meaning.slice(0, 200), source: String(w.source || "").slice(0, 80), example: String(w.example || "").slice(0, 360), mastery: validNumber(w.mastery, 0, 5) }, ctx.id)), 100)) await remoteWrite("coach_words", chunk, null, ctx);
    for (const chunk of chunked(Object.entries(s.reviews).map(([w, r]) => reviewRemote({ ...r, week: Number(w) }, ctx.id)), 100)) await remoteWrite("coach_reviews", chunk, null, ctx);
    requireContext(ctx);
    await remoteLoad(ctx);
  } else {
    demo = s;
    state = demo;
    localLoadFailed = false;
    localCommit();
    selectedKey = pickToday().key;
    renderAll();
  }
}
function chunked(a, n) {
  const result = [];
  for (let i = 0; i < a.length; i += n) result.push(a.slice(i, i + n));
  return result;
}
function bind() {
  document.addEventListener("keydown", (e) => {
    const node = e.target.closest("[data-journey-week]");
    if (!node) return;
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (delta) {
      e.preventDefault();
      selectJourneyWeek(Number(node.dataset.journeyWeek) + delta, true);
    }
    if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      selectJourneyWeek(e.key === "Home" ? 1 : 26, true);
    }
  });
  document.addEventListener("click", async (e) => {
    if (e.target.closest("#journey-guide")) {
      playJourneyGuide();
      return;
    }
    const nav = e.target.closest("[data-view],[data-go]");
    if (nav) {
      if (nav.dataset.sessionKey) selectedKey = nav.dataset.sessionKey;
      navigate(nav.dataset.view || nav.dataset.go);
      return;
    }
    const calendar = e.target.closest("[data-calendar-key]");
    if (calendar) {
      selectedKey = calendar.dataset.calendarKey;
      navigate("daily");
      return;
    }
    const mapControl = e.target.closest("[data-map-step],[data-map-current]");
    if (mapControl) {
      selectJourneyWeek(mapControl.hasAttribute("data-map-current") ? pickToday().week : journeyWeek + Number(mapControl.dataset.mapStep), true);
      return;
    }
    const weekNode = e.target.closest("[data-journey-week]");
    if (weekNode) {
      selectJourneyWeek(Number(weekNode.dataset.journeyWeek));
      return;
    }
    const monthButton = e.target.closest("[data-month-step],[data-month-today]");
    if (monthButton) {
      if (monthButton.hasAttribute("data-month-today")) {
        visualToday = "";
        syncVisualMonth();
      } else visualMonth = shiftMonth(visualMonth, Number(monthButton.dataset.monthStep));
      const host = monthButton.closest("#home-calendar,#roadmap-calendar");
      const selector = monthButton.hasAttribute("data-month-today") ? "[data-month-today]" : `[data-month-step="${monthButton.dataset.monthStep}"]`;
      stopMotion();
      renderVisuals();
      tween(host?.querySelector(".calendar-grid"), { translateX: [Number(monthButton.dataset.monthStep || 0) * 16, 0], opacity: [0.7, 1], duration: 240 });
      const next = host?.querySelector(selector);
      (next?.disabled ? host.querySelector("[data-month-today]") : next)?.focus?.({ preventScroll: true });
      return;
    }
    const switchButton = e.target.closest("[data-plan-view]");
    if (switchButton) {
      planView = switchButton.dataset.planView;
      for (const name of ["journey", "calendar", "table"]) $("#plan-" + name).hidden = name !== planView;
      $$("[data-plan-view]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.planView === planView)));
      stopMotion();
      renderPlan();
      enterMotion($("#plan-" + planView));
      return;
    }
    const toggle = e.target.closest("[data-task-toggle]");
    if (toggle) {
      const id = toggle.dataset.taskToggle;
      const t = getTasks(currentDay()).find((t2) => t2.id === id);
      if (!t) return;
      const p = getProgress(t);
      const card = toggle.closest(".task-card");
      const typedMinutes = Number(card?.querySelector("[data-actual]")?.value || 0);
      const typedEvidence = card?.querySelector("[data-evidence]")?.value?.trim() || "";
      await mutateProgress(id, { completed: !p.completed, minutes: !p.completed && !typedMinutes ? t.minutes : validNumber(typedMinutes, 0, 180), evidence: typedEvidence.slice(0, 350) });
      return;
    }
    const save = e.target.closest("[data-task-save]");
    if (save) {
      const id = save.dataset.taskSave;
      const el = $$(".task-card").find((c) => c.dataset.taskId === id);
      if (el) {
        const t = getTasks(currentDay()).find((t2) => t2.id === id);
        if (!t) return;
        const ok = await mutateProgress(id, { ...getProgress(t), minutes: validNumber(el.querySelector("[data-actual]").value, 0, 180), evidence: el.querySelector("[data-evidence]").value.trim().slice(0, 350) });
        if (ok) notice("\u5B66\u4E60\u8BB0\u5F55\u5DF2\u4FDD\u5B58");
      }
      return;
    }
    const rate = e.target.closest("[data-word-rating]");
    if (rate) {
      const old = state.words.find((w) => w.id === rate.dataset.wordRating);
      if (!old) return;
      const delta = Number(rate.dataset.rating);
      const lvl = delta === 0 ? 0 : Math.min(5, (old.mastery || 0) + delta);
      const gap = delta === 0 ? 1 : [1, 2, 3, 7, 14, 30][lvl] || 30;
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() + gap);
      await mutateWord({ ...old, mastery: lvl, next_review: localISO(d) });
      return;
    }
    const remove = e.target.closest("[data-word-remove]");
    if (remove) {
      const id = remove.dataset.wordRemove;
      if (!confirm("\u786E\u5B9A\u5220\u9664\u8FD9\u5F20\u8FC1\u79FB\u5361\u5417\uFF1F")) return;
      const ok = await saveChange("removeWord", id);
      if (ok) {
        state.words = state.words.filter((w) => w.id !== id);
        if (!isAuthed()) localCommit();
        renderWords();
        renderHome();
      }
      return;
    }
    const row = e.target.closest("[data-plan-row]");
    if (row) {
      selectedKey = row.dataset.planRow;
      navigate("daily");
      return;
    }
  });
  $("#copy-coach-prompt").addEventListener("click", copyCoachPrompt);
  $("#insert-review-template").addEventListener("click", insertReviewTemplate);
  $("#mobile-menu").addEventListener("click", () => {
    const open = $(".sidebar").classList.toggle("open");
    $("#mobile-menu").setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("pointerdown", (e) => {
    if ($(".sidebar").classList.contains("open") && !e.target.closest(".sidebar,#mobile-menu")) {
      $(".sidebar").classList.remove("open");
      $("#mobile-menu").setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $(".sidebar").classList.contains("open")) {
      $(".sidebar").classList.remove("open");
      $("#mobile-menu").setAttribute("aria-expanded", "false");
      $("#mobile-menu").focus();
    }
  });
  const refreshDate = () => {
    if (visualToday !== today()) renderAll();
  };
  window.addEventListener?.("focus", refreshDate);
  document.addEventListener("visibilitychange", refreshDate);
  setInterval(refreshDate, 6e4);
  $("#daily-day").addEventListener("change", (e) => {
    selectedKey = e.target.value;
    renderDaily();
  });
  for (const selector of ["#plan-week", "#plan-status", "#plan-query"]) $("#" + selector.slice(1)).addEventListener(selector === "#plan-query" ? "input" : "change", () => renderPlan());
  $("#review-week").addEventListener("change", (e) => {
    selectedWeek = Number(e.target.value);
    renderReview();
  });
  $("#word-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (busy) return;
    const fd = new FormData(e.target);
    const term = String(fd.get("term") || "").trim();
    const meaning = String(fd.get("meaning") || "").trim();
    if (!term || !meaning) return;
    const w = { id: crypto.randomUUID(), term: term.slice(0, 100), meaning: meaning.slice(0, 200), source: String(fd.get("source")), example: String(fd.get("example") || "").trim().slice(0, 360), mastery: 0, next_review: today() };
    await mutateWord(w);
    if (state.words.some((x) => x.id === w.id)) {
      e.target.reset();
      queueMicrotask(() => syncSearchableSelects());
      notice("\u8FC1\u79FB\u5361\u5DF2\u4FDD\u5B58");
    }
  });
  $("#review-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (busy) return;
    const f = e.target, w = selectedWeek;
    const obj = { week: w, summary: f.elements.summary.value.trim().slice(0, 2e3), weak_skill: f.elements.weak_skill.value || null };
    const keys = ["vocabulary", "grammar", "listening", "reading", "speaking"];
    for (const k of keys) obj[k] = Math.round(validNumber(f.elements[k].value, 1, 5));
    const ok = await saveChange("review", obj);
    if (ok) {
      state.reviews[w] = obj;
      if (!isAuthed()) localCommit();
      renderReview();
      renderHome();
      notice(`\u7B2C ${w} \u5468\u590D\u76D8\u4FDD\u5B58\u6210\u529F\uFF0C\u4E0B\u4E00\u5468\u8BAD\u7EC3\u5C06\u63D0\u793A\u5F31\u9879`);
    }
  });
  $("#date-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const date = $("#start-date").value;
    if (!dateValidStart(date)) {
      notice("\u5F00\u59CB\u65E5\u671F\u5FC5\u987B\u662F\u771F\u5B9E\u7684\u5468\u4E00\u81F3\u5468\u516D\u65E5\u671F\uFF1B\u5468\u65E5\u4F11\u606F\u3002", true);
      return;
    }
    if (!confirm("\u66F4\u6539\u5F00\u59CB\u65E5\u671F\u4F1A\u91CD\u65B0\u6392\u5217\u5168\u90E8\u5B66\u4E60\u65E5\uFF0C\u4F46\u4E0D\u4F1A\u5220\u9664\u4EE5\u5F80\u6253\u5361\u3002\u786E\u5B9A\u5417\uFF1F")) return;
    const ok = await saveChange("start", date);
    if (ok) {
      state.startDate = date;
      if (!isAuthed()) localCommit();
      renderAll();
      notice("\u5B66\u4E60\u8D77\u59CB\u65E5\u671F\u5DF2\u66F4\u65B0");
    }
  });
  $("#config-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (signingIn || busy) {
      notice("\u8BF7\u7B49\u5F85\u5F53\u524D\u8BF7\u6C42\u5B8C\u6210\u540E\u518D\u5207\u6362\u9879\u76EE\u3002", true);
      return;
    }
    const url = $("#supabase-url").value.trim().replace(/\/+$/, ""), key2 = $("#supabase-key").value.trim();
    if (!projectURLValid(url)) {
      notice("\u8BF7\u586B\u5199\u5B98\u65B9 Supabase \u9879\u76EE URL\uFF08https://xxx.supabase.co\uFF09\u3002", true);
      return;
    }
    if (!publicKeyValid(key2)) {
      notice("\u4EC5\u63A5\u53D7 sb_publishable_ \u6216 role \u4E3A anon \u7684\u65E7\u7248 JWT\uFF1B\u7981\u6B62 secret\u3001service_role \u53CA\u5176\u4ED6\u89D2\u8272\u3002", true);
      return;
    }
    subscription?.unsubscribe();
    subscription = null;
    sb = null;
    clientURL = "";
    clientGeneration++;
    resetIdentity();
    $("#login-password").value = "";
    localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify({ url, key: key2 }));
    await initCloudClient();
    notice("\u9879\u76EE\u516C\u5F00\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002\u8BF7\u4F7F\u7528\u90AE\u7BB1\u548C\u5BC6\u7801\u767B\u5F55\u3002");
  });
  $("#login-form").addEventListener("submit", passwordLogin);
  $("#login-email").addEventListener("input", () => {
    $("#login-password").value = "";
    if (signingIn) loginAttempt++;
  });
  renderLoginControls();
  $("#refresh-btn").addEventListener("click", async () => {
    if (!sb || !user) {
      notice("\u8BF7\u5148\u5B8C\u6210 Supabase \u5BC6\u7801\u767B\u5F55", true);
      return;
    }
    if (busy) return;
    await remoteLoad();
  });
  $("#logout-btn").addEventListener("click", async () => {
    if (!sb) return;
    const client = sb;
    loginAttempt++;
    resetIdentity();
    $("#login-password").value = "";
    const { error } = await client.auth.signOut();
    if (error) notice("\u9000\u51FA\u767B\u5F55\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u3002", true);
  });
  $("#account-btn").addEventListener("click", () => navigate("settings"));
  $("#export-btn").addEventListener("click", () => {
    const content = JSON.stringify({ app: "momentum-english-v1", exported_at: (/* @__PURE__ */ new Date()).toISOString(), mode: isAuthed() ? "cloud" : "demo", data: state }, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const u = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = u;
    a.download = "momentum-english-" + today() + ".json";
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(u), 1e3);
    notice("\u5DF2\u5BFC\u51FA JSON \u5907\u4EFD");
  });
  $("#import-file").addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      if (file.size > 5e6) throw Error("\u6587\u4EF6\u5927\u4E8E 5 MB");
      const json = JSON.parse(await file.text());
      if (!confirm(`\u786E\u8BA4\u5C06\u5907\u4EFD\u5BFC\u5165${isAuthed() ? "\u5F53\u524D Supabase \u8D26\u53F7" : "\u672C\u673A\u6F14\u793A\u6A21\u5F0F"}\uFF1F\u540C\u7F16\u53F7\u5185\u5BB9\u53EF\u80FD\u88AB\u8986\u76D6\uFF0C\u4E91\u7AEF\u5BFC\u5165\u4E0D\u662F\u539F\u5B50\u64CD\u4F5C\u3002`)) return;
      await loadDataFromBackup(json);
      notice("\u5907\u4EFD\u5DF2\u5BFC\u5165");
    } catch (err) {
      notice("\u5BFC\u5165\u5931\u8D25\uFF1A" + err.message, true);
    } finally {
      e.target.value = "";
    }
  });
}
function start() {
  initializeOptions();
  selectedKey = pickToday().key;
  selectedWeek = pickToday().week;
  $("#review-week").value = selectedWeek;
  renderResources();
  bind();
  renderAll();
  setMode();
  initMotion();
  enterMotion();
  try {
    enhanceSearchableSelects();
  } catch {
    const status = $("#startup-error");
    status.hidden = false;
    status.textContent = "\u641C\u7D22\u9009\u62E9\u6682\u4E0D\u53EF\u7528\uFF0C\u53EF\u4F7F\u7528\u666E\u901A\u9009\u9879\u3002\u8BF7\u5237\u65B0\u9875\u9762\u91CD\u8BD5\u3002";
  }
  if (localLoadFailed) notice("\u672C\u673A\u65E7\u6570\u636E\u8BFB\u53D6\u5931\u8D25\uFF0C\u539F\u503C\u5DF2\u4FDD\u7559\uFF1B\u4E3A\u907F\u514D\u8986\u76D6\uFF0C\u8BF7\u5148\u5BFC\u5165\u6709\u6548\u5907\u4EFD\u3002", true);
  initCloudClient();
}
start();
export {
  WEEKS,
  calendarDays,
  getTasks,
  syncSearchableSelects
};
/*! Bundled license information:

animejs/dist/modules/core/consts.js:
animejs/dist/modules/core/globals.js:
animejs/dist/modules/core/helpers.js:
animejs/dist/modules/core/transforms.js:
animejs/dist/modules/core/colors.js:
animejs/dist/modules/core/values.js:
animejs/dist/modules/core/render.js:
animejs/dist/modules/core/styles.js:
animejs/dist/modules/core/clock.js:
animejs/dist/modules/core/targets.js:
animejs/dist/modules/core/units.js:
  (**
   * Anime.js - core - ESM
   * @version v4.3.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/animation/additive.js:
animejs/dist/modules/animation/composition.js:
animejs/dist/modules/animation/animation.js:
  (**
   * Anime.js - animation - ESM
   * @version v4.3.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/engine/engine.js:
  (**
   * Anime.js - engine - ESM
   * @version v4.3.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/timer/timer.js:
  (**
   * Anime.js - timer - ESM
   * @version v4.3.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/easings/none.js:
animejs/dist/modules/easings/eases/parser.js:
  (**
   * Anime.js - easings - ESM
   * @version v4.3.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/timeline/position.js:
  (**
   * Anime.js - timeline - ESM
   * @version v4.3.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/utils/random.js:
animejs/dist/modules/utils/stagger.js:
  (**
   * Anime.js - utils - ESM
   * @version v4.3.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/index.js:
  (**
   * Anime.js - ESM
   * @version v4.3.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)
*/
