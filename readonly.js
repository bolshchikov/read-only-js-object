/**
 * @author bolshchikov
 */
(function (global) {
	function readOnly(target){
		var _readOnly = function (target, acc) {

			// acc is passed into the function to be used for observer
			var _defineProperty = function (propName, target, acc) {
				var i, len;

				// operation to be performed when add occurred
				var addOp = function (cArg) {
					// have to define the added item
					_defineProperty(cArg.name, cArg.object, acc[propName]);
				};

				// operation to be performed when add delete
				var delOp = function (cArg) {
					if (_.isPlainObject(cArg.object)) {
						delete acc[propName][cArg.name];
					}
					if (_.isArray(cArg.object)) {
						// this fixes the array
						acc[propName].unshift(acc[propName].shift());

						// when splice occurs, there's no
						// clear indication what has been removed
						// so, we need to find the diff, and clear acc
//						var args = _.difference(acc[propName], cArg.object);

						var args = (function (arr1, arr2) {
							var runner, shorter;
							// identify the longest and the shortest arrays
							if (arr1.length > arr2.length) {
								runner = arr1;
								shorter = arr2;
							}
							else {
								runner = arr2;
								shorter = arr1;
							}
							return runner.filter(function (item1) {
								return !shorter.some(function (item2) {
									return JSON.stringify(item1) === JSON.stringify(item2);
								})
							});
						})(acc[propName], cArg.object);

						args.unshift(acc[propName]);
						_.pull.apply(null, args);
					}
				};

				// function that is called when any change in the property happens
				var observeFn = function (changes) {
					for (i = 0, len = changes.length; i < len; i += 1) {
						switch(changes[i].type) {
							case 'new':
								addOp(changes[i]);
								break;
							case 'deleted':
								delOp(changes[i]);
								break;
							default:
								continue;
						}
					}
				};

				if (_.isArray(target[propName])) {
					Object.defineProperty(acc, propName, {
						configurable: true,
						enumerable: true,
						value: []
					});
					Object.observe(target[propName], observeFn);
					_readOnly(target[propName], acc[propName]);
				}
				else if (_.isPlainObject(target[propName])) {
					Object.defineProperty(acc, propName, {
						configurable: true,
						enumerable: true,
						value: {}
					});
					Object.observe(target[propName], observeFn);
					_readOnly(target[propName], acc[propName]);
				}
				// value is the primitive one
				else {
					Object.defineProperty(acc, propName, {
						configurable: true,
						enumerable: true,
						get: function () {
							return target[propName];
						}
					});
				}
			};

			// target is an array
			_.forEach(target, function (val, key) {
				_defineProperty(key, target, acc);
			});

			return acc;
		};
		if (Array.isArray(target)) {
			return _readOnly(target, []);
		}
		else {
			return _readOnly(target, {});
		}
	}
	global.readOnly = readOnly;
})(window);
