"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function (classmethod) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "instanceMethod",
      value: function instanceMethod() {
        return this;
      }
    }]);

    return _class;
  }(), _defineProperty(_class, "clsMethod", classmethod(function (cls) {
    return cls;
  })), _temp;
};

/*
babel 7.8.4

module.exports = function(classmethod) {
    return class {
        static clsMethod = classmethod(function(cls) {
            return cls
        })

        instanceMethod() {
            return this
        }
    }
}

https://babeljs.io/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=LYewJgrgNgpgdDAHgBxAJwC4GcAEBeHAMwgDsBjDASxBIAoyoBDLLYGDAC3AEocBvAFABINOwhoSOBs1yChQrBkZUyUqFgCy7LmHxqZbTuFrFyVGvXW8580RnGSGWATlc4hAX24DhQyiUVGchgtIzBaa18RMQkcTkpneQ9hZOSBIA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Cstage-0&prettier=false&targets=&version=7.8.4&externalPlugins=
*/
