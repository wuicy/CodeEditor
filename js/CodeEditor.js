// Create date by 2018.10.07.
// Contact email wujinji@agree.com.cn if you have questions.
;(function(global,factory){

	var DuplicateNamespaceError = function(message){
		this.name = 'DuplicateNamespaceError';
		this.message = message;
		this.stack = (new Error()).stack;
	}

	DuplicateNamespaceError.prototype = Object.create(Error.prototype);
	DuplicateNamespaceError.prototype.constructor = DuplicateNamespaceError;

	if(typeof exports === 'object' && typeof module != undefined) {
		module.exports = factory()
	}else if(typeof define === 'function' && define.amd) {
		define(factory)
	}else {
		if('CodeEditor' in global) throw new DuplicateNamespaceError('The namespace "CodeEditor" is already exist!');
		global.CodeEditor = factory();
	}

})(this,function(){

	function classTest(cls) { 
		return new RegExp('(^|\\s)' + cls + '(?:$|\\s)\\s*')
	}

	// Support for chain calls.
	function addClass(node, cls) {
	    var current = node.className;
	    if (!classTest(cls).test(current)) node.className += (current ? ' ' : '') + cls;
	    return node;
	}

	var rmClass = function(node, cls) {
		var current = node.className;
		var match = classTest(cls).exec(current);
		if (match) {
		    var after = current.slice(match.index + match[0].length);
		    node.className = current.slice(0, match.index) + (after ? match[1] + after : '');
		}
		return node;
	}

	function undef(value) {
		return value === undefined || value === null
	}

	function def(value) {
		return !undef(value)
	}

	function isTrue(value) {
		return value === true
	}

	function isFalse(value) {
		return value === false
	}

	function isBlank(value) {
		return undef(value) || value === ''
	}

	// Get the raw type name. eg:[object Object]
	var _toString = Object.prototype.toString;
	function toRawType(value) {
		return _toString.call(value).slice(8,-1)
	}

	function isObject(value) {
		return value !== null && typeof value === 'object'
 	}

 	function isArray(value) {
 		return typeof value === 'object' && value.constructor === Array
 	}

 	function isFunc(func) {
 		return typeof func === 'function'
 	}

	function toString(value) {
		return value == null ? '' :
			typeof value === 'object' ? JSON.stringify(value,null,2) :
			String(value)
	}

	function merge(_from, _to, deep) {
		if(!_to) return _from || {};
		for(var i in _to) {
			if(isTrue(deep) && typeof _to[i] === 'object') {
				_from[i] = (isArray(_to[i])?[]:{});
				merge(_from[i],_to[i],deep);
			}else {
				_from[i] = _to[i];
			}
		}
		return _from;
	}

	// The main constructor, initialize the options.
	var builder = function() {

		var _class = function(){
			_class.fn.init.call(this);
		}
		_class.prototype = _class.fn = {
			constructor:_class,
			version:'1.0',
			author:'wuinji',
		}
		_class.fn.init = function(){
			console.log('a instance is create.');
		}
		_class.extend = function(obj) {
			if(obj === undefined) return
			var extended = obj.extended;
			for(var i in obj) {
				if(obj.hasOwnProperty(i)) _class[i] = obj[i]
			}
			if(isFunc(obj.extended)) extended(_class)
		}
		_class.include = function(obj) {
			if(obj === undefined) return
			var included = obj.included;
			for(var i in obj) {
				if(obj.hasOwnProperty(i)) _class.fn[i] = obj[i]
			}
			if(isFunc(obj.included)) included(_class)
		}
		return _class;
	}

	return new builder;
})