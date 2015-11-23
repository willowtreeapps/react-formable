;(function() {

  'use strict';

  // jshint unused:vars
    var _arity = function _arity(n, fn) {
        // jshint unused:vars
        switch (n) {
        case 0:
            return function () {
                return fn.apply(this, arguments);
            };
        case 1:
            return function (a0) {
                return fn.apply(this, arguments);
            };
        case 2:
            return function (a0, a1) {
                return fn.apply(this, arguments);
            };
        case 3:
            return function (a0, a1, a2) {
                return fn.apply(this, arguments);
            };
        case 4:
            return function (a0, a1, a2, a3) {
                return fn.apply(this, arguments);
            };
        case 5:
            return function (a0, a1, a2, a3, a4) {
                return fn.apply(this, arguments);
            };
        case 6:
            return function (a0, a1, a2, a3, a4, a5) {
                return fn.apply(this, arguments);
            };
        case 7:
            return function (a0, a1, a2, a3, a4, a5, a6) {
                return fn.apply(this, arguments);
            };
        case 8:
            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
                return fn.apply(this, arguments);
            };
        case 9:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
                return fn.apply(this, arguments);
            };
        case 10:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                return fn.apply(this, arguments);
            };
        default:
            throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
        }
    };

    var _arrayFromIterator = function _arrayFromIterator(iter) {
        var list = [];
        var next;
        while (!(next = iter.next()).done) {
            list.push(next.value);
        }
        return list;
    };

    var _complement = function _complement(f) {
        return function () {
            return !f.apply(this, arguments);
        };
    };

    var _filter = function _filter(fn, list) {
        var idx = 0, len = list.length, result = [];
        while (idx < len) {
            if (fn(list[idx])) {
                result[result.length] = list[idx];
            }
            idx += 1;
        }
        return result;
    };

    var _has = function _has(prop, obj) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    };

    var _identity = function _identity(x) {
        return x;
    };

    /**
     * Tests whether or not an object is an array.
     *
     * @private
     * @param {*} val The object to test.
     * @return {Boolean} `true` if `val` is an array, `false` otherwise.
     * @example
     *
     *      _isArray([]); //=> true
     *      _isArray(null); //=> false
     *      _isArray({}); //=> false
     */
    var _isArray = Array.isArray || function _isArray(val) {
        return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
    };

    var _isPlaceholder = function _isPlaceholder(a) {
        return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
    };

    var _isString = function _isString(x) {
        return Object.prototype.toString.call(x) === '[object String]';
    };

    var _isTransformer = function _isTransformer(obj) {
        return typeof obj['@@transducer/step'] === 'function';
    };

    var _map = function _map(fn, functor) {
        var idx = 0;
        var len = functor.length;
        var result = Array(len);
        while (idx < len) {
            result[idx] = fn(functor[idx]);
            idx += 1;
        }
        return result;
    };

    var _pipe = function _pipe(f, g) {
        return function () {
            return g.call(this, f.apply(this, arguments));
        };
    };

    /**
     * An optimized, private array `slice` implementation.
     *
     * @private
     * @param {Arguments|Array} args The array or arguments object to consider.
     * @param {Number} [from=0] The array index to slice from, inclusive.
     * @param {Number} [to=args.length] The array index to slice to, exclusive.
     * @return {Array} A new, sliced array.
     * @example
     *
     *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
     *
     *      var firstThreeArgs = function(a, b, c, d) {
     *        return _slice(arguments, 0, 3);
     *      };
     *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
     */
    var _slice = function _slice(args, from, to) {
        switch (arguments.length) {
        case 1:
            return _slice(args, 0, args.length);
        case 2:
            return _slice(args, from, args.length);
        default:
            var list = [];
            var idx = 0;
            var len = Math.max(0, Math.min(args.length, to) - from);
            while (idx < len) {
                list[idx] = args[from + idx];
                idx += 1;
            }
            return list;
        }
    };

    var _xfBase = {
        init: function () {
            return this.xf['@@transducer/init']();
        },
        result: function (result) {
            return this.xf['@@transducer/result'](result);
        }
    };

    var _xwrap = function () {
        function XWrap(fn) {
            this.f = fn;
        }
        XWrap.prototype['@@transducer/init'] = function () {
            throw new Error('init not implemented on XWrap');
        };
        XWrap.prototype['@@transducer/result'] = function (acc) {
            return acc;
        };
        XWrap.prototype['@@transducer/step'] = function (acc, x) {
            return this.f(acc, x);
        };
        return function _xwrap(fn) {
            return new XWrap(fn);
        };
    }();

    /**
     * Similar to hasMethod, this checks whether a function has a [methodname]
     * function. If it isn't an array it will execute that function otherwise it
     * will default to the ramda implementation.
     *
     * @private
     * @param {Function} fn ramda implemtation
     * @param {String} methodname property to check for a custom implementation
     * @return {Object} Whatever the return value of the method is.
     */
    var _checkForMethod = function _checkForMethod(methodname, fn) {
        return function () {
            var length = arguments.length;
            if (length === 0) {
                return fn();
            }
            var obj = arguments[length - 1];
            return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
        };
    };

    /**
     * Optimized internal one-arity curry function.
     *
     * @private
     * @category Function
     * @param {Function} fn The function to curry.
     * @return {Function} The curried function.
     */
    var _curry1 = function _curry1(fn) {
        return function f1(a) {
            if (arguments.length === 0 || _isPlaceholder(a)) {
                return f1;
            } else {
                return fn.apply(this, arguments);
            }
        };
    };

    /**
     * Optimized internal two-arity curry function.
     *
     * @private
     * @category Function
     * @param {Function} fn The function to curry.
     * @return {Function} The curried function.
     */
    var _curry2 = function _curry2(fn) {
        return function f2(a, b) {
            switch (arguments.length) {
            case 0:
                return f2;
            case 1:
                return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
                    return fn(a, _b);
                });
            default:
                return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
                    return fn(_a, b);
                }) : _isPlaceholder(b) ? _curry1(function (_b) {
                    return fn(a, _b);
                }) : fn(a, b);
            }
        };
    };

    /**
     * Optimized internal three-arity curry function.
     *
     * @private
     * @category Function
     * @param {Function} fn The function to curry.
     * @return {Function} The curried function.
     */
    var _curry3 = function _curry3(fn) {
        return function f3(a, b, c) {
            switch (arguments.length) {
            case 0:
                return f3;
            case 1:
                return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
                    return fn(a, _b, _c);
                });
            case 2:
                return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
                    return fn(_a, b, _c);
                }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
                    return fn(a, _b, _c);
                }) : _curry1(function (_c) {
                    return fn(a, b, _c);
                });
            default:
                return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
                    return fn(_a, _b, c);
                }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
                    return fn(_a, b, _c);
                }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
                    return fn(a, _b, _c);
                }) : _isPlaceholder(a) ? _curry1(function (_a) {
                    return fn(_a, b, c);
                }) : _isPlaceholder(b) ? _curry1(function (_b) {
                    return fn(a, _b, c);
                }) : _isPlaceholder(c) ? _curry1(function (_c) {
                    return fn(a, b, _c);
                }) : fn(a, b, c);
            }
        };
    };

    /**
     * Internal curryN function.
     *
     * @private
     * @category Function
     * @param {Number} length The arity of the curried function.
     * @param {Array} received An array of arguments received thus far.
     * @param {Function} fn The function to curry.
     * @return {Function} The curried function.
     */
    var _curryN = function _curryN(length, received, fn) {
        return function () {
            var combined = [];
            var argsIdx = 0;
            var left = length;
            var combinedIdx = 0;
            while (combinedIdx < received.length || argsIdx < arguments.length) {
                var result;
                if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
                    result = received[combinedIdx];
                } else {
                    result = arguments[argsIdx];
                    argsIdx += 1;
                }
                combined[combinedIdx] = result;
                if (!_isPlaceholder(result)) {
                    left -= 1;
                }
                combinedIdx += 1;
            }
            return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
        };
    };

    /**
     * Returns a function that dispatches with different strategies based on the
     * object in list position (last argument). If it is an array, executes [fn].
     * Otherwise, if it has a function with [methodname], it will execute that
     * function (functor case). Otherwise, if it is a transformer, uses transducer
     * [xf] to return a new transformer (transducer case). Otherwise, it will
     * default to executing [fn].
     *
     * @private
     * @param {String} methodname property to check for a custom implementation
     * @param {Function} xf transducer to initialize if object is transformer
     * @param {Function} fn default ramda implementation
     * @return {Function} A function that dispatches on object in list position
     */
    var _dispatchable = function _dispatchable(methodname, xf, fn) {
        return function () {
            var length = arguments.length;
            if (length === 0) {
                return fn();
            }
            var obj = arguments[length - 1];
            if (!_isArray(obj)) {
                var args = _slice(arguments, 0, length - 1);
                if (typeof obj[methodname] === 'function') {
                    return obj[methodname].apply(obj, args);
                }
                if (_isTransformer(obj)) {
                    var transducer = xf.apply(null, args);
                    return transducer(obj);
                }
            }
            return fn.apply(this, arguments);
        };
    };

    var _xfilter = function () {
        function XFilter(f, xf) {
            this.xf = xf;
            this.f = f;
        }
        XFilter.prototype['@@transducer/init'] = _xfBase.init;
        XFilter.prototype['@@transducer/result'] = _xfBase.result;
        XFilter.prototype['@@transducer/step'] = function (result, input) {
            return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
        };
        return _curry2(function _xfilter(f, xf) {
            return new XFilter(f, xf);
        });
    }();

    var _xmap = function () {
        function XMap(f, xf) {
            this.xf = xf;
            this.f = f;
        }
        XMap.prototype['@@transducer/init'] = _xfBase.init;
        XMap.prototype['@@transducer/result'] = _xfBase.result;
        XMap.prototype['@@transducer/step'] = function (result, input) {
            return this.xf['@@transducer/step'](result, this.f(input));
        };
        return _curry2(function _xmap(f, xf) {
            return new XMap(f, xf);
        });
    }();

    /**
     * Creates a function that is bound to a context.
     * Note: `R.bind` does not provide the additional argument-binding capabilities of
     * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
     *
     * @func
     * @memberOf R
     * @since v0.6.0
     * @category Function
     * @category Object
     * @sig (* -> *) -> {*} -> (* -> *)
     * @param {Function} fn The function to bind to context
     * @param {Object} thisObj The context to bind `fn` to
     * @return {Function} A function that will execute in the context of `thisObj`.
     * @see R.partial
     */
    var bind = _curry2(function bind(fn, thisObj) {
        return _arity(fn.length, function () {
            return fn.apply(thisObj, arguments);
        });
    });

    /**
     * Returns a curried equivalent of the provided function, with the specified
     * arity. The curried function has two unusual capabilities. First, its
     * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
     * following are equivalent:
     *
     *   - `g(1)(2)(3)`
     *   - `g(1)(2, 3)`
     *   - `g(1, 2)(3)`
     *   - `g(1, 2, 3)`
     *
     * Secondly, the special placeholder value `R.__` may be used to specify
     * "gaps", allowing partial application of any combination of arguments,
     * regardless of their positions. If `g` is as above and `_` is `R.__`, the
     * following are equivalent:
     *
     *   - `g(1, 2, 3)`
     *   - `g(_, 2, 3)(1)`
     *   - `g(_, _, 3)(1)(2)`
     *   - `g(_, _, 3)(1, 2)`
     *   - `g(_, 2)(1)(3)`
     *   - `g(_, 2)(1, 3)`
     *   - `g(_, 2)(_, 3)(1)`
     *
     * @func
     * @memberOf R
     * @since v0.5.0
     * @category Function
     * @sig Number -> (* -> a) -> (* -> a)
     * @param {Number} length The arity for the returned function.
     * @param {Function} fn The function to curry.
     * @return {Function} A new, curried function.
     * @see R.curry
     * @example
     *
     *      var sumArgs = (...args) => R.sum(args);
     *
     *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
     *      var f = curriedAddFourNumbers(1, 2);
     *      var g = f(3);
     *      g(4); //=> 10
     */
    var curryN = _curry2(function curryN(length, fn) {
        if (length === 1) {
            return _curry1(fn);
        }
        return _arity(length, _curryN(length, [], fn));
    });

    /**
     * Returns a new list containing only those items that match a given predicate
     * function. The predicate function is passed one argument: *(value)*.
     *
     * Note that `R.filter` does not skip deleted or unassigned indices, unlike the
     * native `Array.prototype.filter` method. For more details on this behavior,
     * see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Description
     *
     * Dispatches to the `filter` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig (a -> Boolean) -> [a] -> [a]
     * @param {Function} fn The function called per iteration.
     * @param {Array} list The collection to iterate over.
     * @return {Array} The new filtered array.
     * @see R.reject, R.transduce, R.addIndex
     * @example
     *
     *      var isEven = n => n % 2 === 0;
     *
     *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
     */
    var filter = _curry2(_dispatchable('filter', _xfilter, _filter));

    /**
     * Returns true if its arguments are identical, false otherwise. Values are
     * identical if they reference the same memory. `NaN` is identical to `NaN`;
     * `0` and `-0` are not identical.
     *
     * @func
     * @memberOf R
     * @since v0.15.0
     * @category Relation
     * @sig a -> a -> Boolean
     * @param {*} a
     * @param {*} b
     * @return {Boolean}
     * @example
     *
     *      var o = {};
     *      R.identical(o, o); //=> true
     *      R.identical(1, 1); //=> true
     *      R.identical(1, '1'); //=> false
     *      R.identical([], []); //=> false
     *      R.identical(0, -0); //=> false
     *      R.identical(NaN, NaN); //=> true
     */
    // SameValue algorithm
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Step 6.a: NaN == NaN
    var identical = _curry2(function identical(a, b) {
        // SameValue algorithm
        if (a === b) {
            // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return a !== 0 || 1 / a === 1 / b;
        } else {
            // Step 6.a: NaN == NaN
            return a !== a && b !== b;
        }
    });

    /**
     * A function that does nothing but return the parameter supplied to it. Good
     * as a default or placeholder function.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig a -> a
     * @param {*} x The value to return.
     * @return {*} The input value, `x`.
     * @example
     *
     *      R.identity(1); //=> 1
     *
     *      var obj = {};
     *      R.identity(obj) === obj; //=> true
     */
    var identity = _curry1(_identity);

    /**
     * Tests whether or not an object is similar to an array.
     *
     * @func
     * @memberOf R
     * @since v0.5.0
     * @category Type
     * @category List
     * @sig * -> Boolean
     * @param {*} x The object to test.
     * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
     * @example
     *
     *      R.isArrayLike([]); //=> true
     *      R.isArrayLike(true); //=> false
     *      R.isArrayLike({}); //=> false
     *      R.isArrayLike({length: 10}); //=> false
     *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
     */
    var isArrayLike = _curry1(function isArrayLike(x) {
        if (_isArray(x)) {
            return true;
        }
        if (!x) {
            return false;
        }
        if (typeof x !== 'object') {
            return false;
        }
        if (x instanceof String) {
            return false;
        }
        if (x.nodeType === 1) {
            return !!x.length;
        }
        if (x.length === 0) {
            return true;
        }
        if (x.length > 0) {
            return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
        }
        return false;
    });

    /**
     * Checks if the input value is `null` or `undefined`.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Type
     * @sig * -> Boolean
     * @param {*} x The value to test.
     * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
     * @example
     *
     *      R.isNil(null); //=> true
     *      R.isNil(undefined); //=> true
     *      R.isNil(0); //=> false
     *      R.isNil([]); //=> false
     */
    var isNil = _curry1(function isNil(x) {
        return x == null;
    });

    /**
     * Returns a list containing the names of all the enumerable own properties of
     * the supplied object.
     * Note that the order of the output array is not guaranteed to be consistent
     * across different JS platforms.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Object
     * @sig {k: v} -> [k]
     * @param {Object} obj The object to extract properties from
     * @return {Array} An array of the object's own properties.
     * @example
     *
     *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
     */
    // cover IE < 9 keys issues
    var keys = function () {
        // cover IE < 9 keys issues
        var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
        var nonEnumerableProps = [
            'constructor',
            'valueOf',
            'isPrototypeOf',
            'toString',
            'propertyIsEnumerable',
            'hasOwnProperty',
            'toLocaleString'
        ];
        var contains = function contains(list, item) {
            var idx = 0;
            while (idx < list.length) {
                if (list[idx] === item) {
                    return true;
                }
                idx += 1;
            }
            return false;
        };
        return typeof Object.keys === 'function' ? _curry1(function keys(obj) {
            return Object(obj) !== obj ? [] : Object.keys(obj);
        }) : _curry1(function keys(obj) {
            if (Object(obj) !== obj) {
                return [];
            }
            var prop, ks = [], nIdx;
            for (prop in obj) {
                if (_has(prop, obj)) {
                    ks[ks.length] = prop;
                }
            }
            if (hasEnumBug) {
                nIdx = nonEnumerableProps.length - 1;
                while (nIdx >= 0) {
                    prop = nonEnumerableProps[nIdx];
                    if (_has(prop, obj) && !contains(ks, prop)) {
                        ks[ks.length] = prop;
                    }
                    nIdx -= 1;
                }
            }
            return ks;
        });
    }();

    /**
     * Returns a partial copy of an object containing only the keys that satisfy
     * the supplied predicate.
     *
     * @func
     * @memberOf R
     * @since v0.8.0
     * @category Object
     * @sig (v, k -> Boolean) -> {k: v} -> {k: v}
     * @param {Function} pred A predicate to determine whether or not a key
     *        should be included on the output object.
     * @param {Object} obj The object to copy from
     * @return {Object} A new object with only properties that satisfy `pred`
     *         on it.
     * @see R.pick
     * @example
     *
     *      var isUpperCase = (val, key) => key.toUpperCase() === key;
     *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
     */
    var pickBy = _curry2(function pickBy(test, obj) {
        var result = {};
        for (var prop in obj) {
            if (test(obj[prop], prop, obj)) {
                result[prop] = obj[prop];
            }
        }
        return result;
    });

    /**
     * Similar to `filter`, except that it keeps only values for which the given
     * predicate function returns falsy. The predicate function is passed one
     * argument: *(value)*.
     *
     * Acts as a transducer if a transformer is given in list position.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig (a -> Boolean) -> [a] -> [a]
     * @param {Function} fn The function called per iteration.
     * @param {Array} list The collection to iterate over.
     * @return {Array} The new filtered array.
     * @see R.filter, R.transduce, R.addIndex
     * @example
     *
     *      var isOdd = (n) => n % 2 === 1;
     *
     *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
     */
    var reject = _curry2(function reject(fn, list) {
        return filter(_complement(fn), list);
    });

    /**
     * Returns a new list or string with the elements or characters in reverse
     * order.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig [a] -> [a]
     * @sig String -> String
     * @param {Array|String} list
     * @return {Array|String}
     * @example
     *
     *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
     *      R.reverse([1, 2]);     //=> [2, 1]
     *      R.reverse([1]);        //=> [1]
     *      R.reverse([]);         //=> []
     *
     *      R.reverse('abc');      //=> 'cba'
     *      R.reverse('ab');       //=> 'ba'
     *      R.reverse('a');        //=> 'a'
     *      R.reverse('');         //=> ''
     */
    var reverse = _curry1(function reverse(list) {
        return _isString(list) ? list.split('').reverse().join('') : _slice(list).reverse();
    });

    /**
     * Returns the elements of the given list or string (or object with a `slice`
     * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
     *
     * Dispatches to the `slice` method of the third argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.1.4
     * @category List
     * @sig Number -> Number -> [a] -> [a]
     * @sig Number -> Number -> String -> String
     * @param {Number} fromIndex The start index (inclusive).
     * @param {Number} toIndex The end index (exclusive).
     * @param {*} list
     * @return {*}
     * @example
     *
     *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
     *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
     *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
     *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
     *      R.slice(0, 3, 'ramda');                     //=> 'ram'
     */
    var slice = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
        return Array.prototype.slice.call(list, fromIndex, toIndex);
    }));

    /**
     * Returns all but the first element of the given list or string (or object
     * with a `tail` method).
     *
     * Dispatches to the `slice` method of the first argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig [a] -> [a]
     * @sig String -> String
     * @param {*} list
     * @return {*}
     * @see R.head, R.init, R.last
     * @example
     *
     *      R.tail([1, 2, 3]);  //=> [2, 3]
     *      R.tail([1, 2]);     //=> [2]
     *      R.tail([1]);        //=> []
     *      R.tail([]);         //=> []
     *
     *      R.tail('abc');  //=> 'bc'
     *      R.tail('ab');   //=> 'b'
     *      R.tail('a');    //=> ''
     *      R.tail('');     //=> ''
     */
    var tail = _checkForMethod('tail', slice(1, Infinity));

    /**
     * Gives a single-word string description of the (native) type of a value,
     * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
     * attempt to distinguish user Object types any further, reporting them all as
     * 'Object'.
     *
     * @func
     * @memberOf R
     * @since v0.8.0
     * @category Type
     * @sig (* -> {*}) -> String
     * @param {*} val The value to test
     * @return {String}
     * @example
     *
     *      R.type({}); //=> "Object"
     *      R.type(1); //=> "Number"
     *      R.type(false); //=> "Boolean"
     *      R.type('s'); //=> "String"
     *      R.type(null); //=> "Null"
     *      R.type([]); //=> "Array"
     *      R.type(/[A-z]/); //=> "RegExp"
     */
    var type = _curry1(function type(val) {
        return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
    });

    /**
     * Returns a list of all the enumerable own properties of the supplied object.
     * Note that the order of the output array is not guaranteed across different
     * JS platforms.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Object
     * @sig {k: v} -> [v]
     * @param {Object} obj The object to extract values from
     * @return {Array} An array of the values of the object's own properties.
     * @example
     *
     *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
     */
    var values = _curry1(function values(obj) {
        var props = keys(obj);
        var len = props.length;
        var vals = [];
        var idx = 0;
        while (idx < len) {
            vals[idx] = obj[props[idx]];
            idx += 1;
        }
        return vals;
    });

    // Values of other types are only equal if identical.
    var _equals = function _equals(a, b, stackA, stackB) {
        if (identical(a, b)) {
            return true;
        }
        if (type(a) !== type(b)) {
            return false;
        }
        if (a == null || b == null) {
            return false;
        }
        if (typeof a.equals === 'function' || typeof b.equals === 'function') {
            return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
        }
        switch (type(a)) {
        case 'Arguments':
        case 'Array':
        case 'Object':
            break;
        case 'Boolean':
        case 'Number':
        case 'String':
            if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
                return false;
            }
            break;
        case 'Date':
            if (!identical(a.valueOf(), b.valueOf())) {
                return false;
            }
            break;
        case 'Error':
            if (!(a.name === b.name && a.message === b.message)) {
                return false;
            }
            break;
        case 'RegExp':
            if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
                return false;
            }
            break;
        case 'Map':
        case 'Set':
            if (!_equals(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
                return false;
            }
            break;
        case 'Int8Array':
        case 'Uint8Array':
        case 'Uint8ClampedArray':
        case 'Int16Array':
        case 'Uint16Array':
        case 'Int32Array':
        case 'Uint32Array':
        case 'Float32Array':
        case 'Float64Array':
            break;
        case 'ArrayBuffer':
            break;
        default:
            // Values of other types are only equal if identical.
            return false;
        }
        var keysA = keys(a);
        if (keysA.length !== keys(b).length) {
            return false;
        }
        var idx = stackA.length - 1;
        while (idx >= 0) {
            if (stackA[idx] === a) {
                return stackB[idx] === b;
            }
            idx -= 1;
        }
        stackA.push(a);
        stackB.push(b);
        idx = keysA.length - 1;
        while (idx >= 0) {
            var key = keysA[idx];
            if (!(_has(key, b) && _equals(b[key], a[key], stackA, stackB))) {
                return false;
            }
            idx -= 1;
        }
        stackA.pop();
        stackB.pop();
        return true;
    };

    /**
     * `_makeFlat` is a helper function that returns a one-level or fully recursive
     * function based on the flag passed in.
     *
     * @private
     */
    var _makeFlat = function _makeFlat(recursive) {
        return function flatt(list) {
            var value, result = [], idx = 0, j, ilen = list.length, jlen;
            while (idx < ilen) {
                if (isArrayLike(list[idx])) {
                    value = recursive ? flatt(list[idx]) : list[idx];
                    j = 0;
                    jlen = value.length;
                    while (j < jlen) {
                        result[result.length] = value[j];
                        j += 1;
                    }
                } else {
                    result[result.length] = list[idx];
                }
                idx += 1;
            }
            return result;
        };
    };

    var _reduce = function () {
        function _arrayReduce(xf, acc, list) {
            var idx = 0, len = list.length;
            while (idx < len) {
                acc = xf['@@transducer/step'](acc, list[idx]);
                if (acc && acc['@@transducer/reduced']) {
                    acc = acc['@@transducer/value'];
                    break;
                }
                idx += 1;
            }
            return xf['@@transducer/result'](acc);
        }
        function _iterableReduce(xf, acc, iter) {
            var step = iter.next();
            while (!step.done) {
                acc = xf['@@transducer/step'](acc, step.value);
                if (acc && acc['@@transducer/reduced']) {
                    acc = acc['@@transducer/value'];
                    break;
                }
                step = iter.next();
            }
            return xf['@@transducer/result'](acc);
        }
        function _methodReduce(xf, acc, obj) {
            return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
        }
        var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
        return function _reduce(fn, acc, list) {
            if (typeof fn === 'function') {
                fn = _xwrap(fn);
            }
            if (isArrayLike(list)) {
                return _arrayReduce(fn, acc, list);
            }
            if (typeof list.reduce === 'function') {
                return _methodReduce(fn, acc, list);
            }
            if (list[symIterator] != null) {
                return _iterableReduce(fn, acc, list[symIterator]());
            }
            if (typeof list.next === 'function') {
                return _iterableReduce(fn, acc, list);
            }
            throw new TypeError('reduce: list must be array or iterable');
        };
    }();

    /**
     * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
     * cyclical data structures.
     *
     * Dispatches symmetrically to the `equals` methods of both arguments, if
     * present.
     *
     * @func
     * @memberOf R
     * @since v0.15.0
     * @category Relation
     * @sig a -> b -> Boolean
     * @param {*} a
     * @param {*} b
     * @return {Boolean}
     * @example
     *
     *      R.equals(1, 1); //=> true
     *      R.equals(1, '1'); //=> false
     *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
     *
     *      var a = {}; a.v = a;
     *      var b = {}; b.v = b;
     *      R.equals(a, b); //=> true
     */
    var equals = _curry2(function equals(a, b) {
        return _equals(a, b, [], []);
    });

    /**
     * Returns a new list by pulling every item out of it (and all its sub-arrays)
     * and putting them in a new array, depth-first.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig [a] -> [b]
     * @param {Array} list The array to consider.
     * @return {Array} The flattened list.
     * @see R.unnest
     * @example
     *
     *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
     *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
     */
    var flatten = _curry1(_makeFlat(true));

    /**
     * Returns a new list, constructed by applying the supplied function to every
     * element of the supplied list.
     *
     * Note: `R.map` does not skip deleted or unassigned indices (sparse arrays),
     * unlike the native `Array.prototype.map` method. For more details on this
     * behavior, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Description
     *
     * Dispatches to the `map` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     *
     * Also treats functions as functors and will compose them together.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig Functor f => (a -> b) -> f a -> f b
     * @param {Function} fn The function to be called on every element of the input `list`.
     * @param {Array} list The list to be iterated over.
     * @return {Array} The new list.
     * @see R.transduce, R.addIndex
     * @example
     *
     *      var double = x => x * 2;
     *
     *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
     *
     *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
     */
    var map = _curry2(_dispatchable('map', _xmap, function map(fn, functor) {
        switch (Object.prototype.toString.call(functor)) {
        case '[object Function]':
            return curryN(functor.length, function () {
                return fn.call(this, functor.apply(this, arguments));
            });
        case '[object Object]':
            return _reduce(function (acc, key) {
                acc[key] = fn(functor[key]);
                return acc;
            }, {}, keys(functor));
        default:
            return _map(fn, functor);
        }
    }));

    /**
     * Like `mapObj`, but passes additional arguments to the predicate function.
     * The predicate function is passed three arguments: *(value, key, obj)*.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Object
     * @sig (v, k, {k: v} -> v) -> {k: v} -> {k: v}
     * @param {Function} fn A function called for each property in `obj`. Its return value will
     *        become a new property on the return object.
     * @param {Object} obj The object to iterate over.
     * @return {Object} A new object with the same keys as `obj` and values that are the result
     *         of running each property through `fn`.
     * @example
     *
     *      var values = { x: 1, y: 2, z: 3 };
     *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);
     *
     *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
     */
    var mapObjIndexed = _curry2(function mapObjIndexed(fn, obj) {
        return _reduce(function (acc, key) {
            acc[key] = fn(obj[key], key, obj);
            return acc;
        }, {}, keys(obj));
    });

    /**
     * Returns a single item by iterating through the list, successively calling
     * the iterator function and passing it an accumulator value and the current
     * value from the array, and then passing the result to the next call.
     *
     * The iterator function receives two values: *(acc, value)*. It may use
     * `R.reduced` to shortcut the iteration.
     *
     * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
     * arrays), unlike the native `Array.prototype.reduce` method. For more details
     * on this behavior, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
     *
     * Dispatches to the `reduce` method of the third argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig ((a, b) -> a) -> a -> [b] -> a
     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
     *        current element from the array.
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @see R.reduced, R.addIndex
     * @example
     *
     *      var numbers = [1, 2, 3];
     *      var add = (a, b) => a + b;
     *
     *      R.reduce(add, 10, numbers); //=> 16
     */
    var reduce = _curry3(_reduce);

    var _indexOf = function _indexOf(list, item, from) {
        var idx = from;
        while (idx < list.length) {
            if (equals(list[idx], item)) {
                return idx;
            }
            idx += 1;
        }
        return -1;
    };

    /**
     * Performs left-to-right function composition. The leftmost function may have
     * any arity; the remaining functions must be unary.
     *
     * In some libraries this function is named `sequence`.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
     * @param {...Function} functions
     * @return {Function}
     * @see R.compose
     * @example
     *
     *      var f = R.pipe(Math.pow, R.negate, R.inc);
     *
     *      f(3, 4); // -(3^4) + 1
     */
    var pipe = function pipe() {
        if (arguments.length === 0) {
            throw new Error('pipe requires at least one argument');
        }
        return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
    };

    /* globals Set */
    // manually crawl the list to distinguish between +0 and -0
    // non-zero numbers can utilise Set
    // all these types can utilise Set
    // null can utilise Set
    // other objects need R.equals for equality
    // anything else not covered above, defer to R.equals
    var _contains = typeof Set === 'undefined' ? function _contains(a, list) {
        return _indexOf(list, a, 0) >= 0;
    } : function _containsSet(a, list) {
        var idx, inf, item;
        switch (typeof a) {
        case 'number':
            if (a === 0) {
                // manually crawl the list to distinguish between +0 and -0
                idx = 0;
                inf = 1 / a;
                while (idx < list.length) {
                    item = list[idx];
                    if (item === 0 && 1 / item === inf) {
                        return true;
                    }
                    idx += 1;
                }
                return false;
            }
            // non-zero numbers can utilise Set
            return new Set(list).has(a);
        // all these types can utilise Set
        case 'string':
        case 'boolean':
        case 'function':
        case 'undefined':
            return new Set(list).has(a);
        case 'object':
            if (a === null) {
                // null can utilise Set
                return new Set(list).has(a);
            }
            // other objects need R.equals for equality
            return _indexOf(list, a, 0) >= 0;
        default:
            // anything else not covered above, defer to R.equals
            return _indexOf(list, a, 0) >= 0;
        }
    };

    /**
     * Performs right-to-left function composition. The rightmost function may have
     * any arity; the remaining functions must be unary.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
     * @param {...Function} functions
     * @return {Function}
     * @see R.pipe
     * @example
     *
     *      var f = R.compose(R.inc, R.negate, Math.pow);
     *
     *      f(3, 4); // -(3^4) + 1
     */
    var compose = function compose() {
        if (arguments.length === 0) {
            throw new Error('compose requires at least one argument');
        }
        return pipe.apply(this, reverse(arguments));
    };

    /**
     * Returns a new list containing only one copy of each element in the original
     * list, based upon the value returned by applying the supplied function to
     * each list element. Prefers the first item if the supplied function produces
     * the same value on two items. `R.equals` is used for comparison.
     *
     * @func
     * @memberOf R
     * @since v0.16.0
     * @category List
     * @sig (a -> b) -> [a] -> [a]
     * @param {Function} fn A function used to produce a value to use during comparisons.
     * @param {Array} list The array to consider.
     * @return {Array} The list of unique items.
     * @example
     *
     *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
     */
    /* globals Set */
    // distinguishing between +0 and -0 is not supported by Set
    /* falls through */
    // these types can all utilise Set
    // prevent scan for null by tracking as a boolean
    /* falls through */
    // scan through all previously applied items
    var uniqBy = _curry2(/* globals Set */
    typeof Set === 'undefined' ? function uniqBy(fn, list) {
        var idx = 0, applied = [], result = [], appliedItem, item;
        while (idx < list.length) {
            item = list[idx];
            appliedItem = fn(item);
            if (!_contains(appliedItem, applied)) {
                result.push(item);
                applied.push(appliedItem);
            }
            idx += 1;
        }
        return result;
    } : function uniqBySet(fn, list) {
        var set = new Set(), applied = [], appliedItem, item, prevSetSize = 0, newSetSize, result = [], nullExists = false, negZeroExists = false, idx = 0;
        while (idx < list.length) {
            item = list[idx];
            appliedItem = fn(item);
            switch (typeof appliedItem) {
            case 'number':
                // distinguishing between +0 and -0 is not supported by Set
                if (appliedItem === 0 && !negZeroExists && 1 / appliedItem === -Infinity) {
                    negZeroExists = true;
                    result.push(item);
                    break;
                }
            /* falls through */
            case 'string':
            case 'boolean':
            case 'function':
            case 'undefined':
                // these types can all utilise Set
                set.add(appliedItem);
                newSetSize = set.size;
                if (newSetSize > prevSetSize) {
                    result.push(item);
                    prevSetSize = newSetSize;
                }
                break;
            case 'object':
                if (appliedItem === null) {
                    if (!nullExists) {
                        // prevent scan for null by tracking as a boolean
                        nullExists = true;
                        result.push(null);
                    }
                    break;
                }
            /* falls through */
            default:
                // scan through all previously applied items
                if (!_contains(appliedItem, applied)) {
                    applied.push(appliedItem);
                    result.push(item);
                }
            }
            idx += 1;
        }
        return result;
    });

    /**
     * Returns a new list containing only one copy of each element in the original
     * list. `R.equals` is used to determine equality.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig [a] -> [a]
     * @param {Array} list The array to consider.
     * @return {Array} The list of unique items.
     * @example
     *
     *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
     *      R.uniq([1, '1']);     //=> [1, '1']
     *      R.uniq([[42], [42]]); //=> [[42]]
     */
    var uniq = uniqBy(identity);

    var R = {
        compose: compose,
        equals: equals,
        flatten: flatten,
        isNil: isNil,
        map: map,
        mapObjIndexed: mapObjIndexed,
        pickBy: pickBy,
        reject: reject,
        uniq: uniq,
        values: values
    };

  /* TEST_ENTRY_POINT */

  if (typeof exports === 'object') {
    module.exports = R;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return R; });
  } else {
    this.R = R;
  }

}.call(this));
