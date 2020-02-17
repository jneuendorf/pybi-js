"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

module.exports = function (classmethod) {
  var _class;

  return _class =
  /*#__PURE__*/
  function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "clsMethod",
      value: function clsMethod(cls) {
        return cls;
      }
    }, {
      key: "instanceMethod",
      value: function instanceMethod() {
        return this;
      }
    }]);

    return _class;
  }(), (_applyDecoratedDescriptor(_class.prototype, "clsMethod", [classmethod], Object.getOwnPropertyDescriptor(_class.prototype, "clsMethod"), _class.prototype)), _class;
};

/*
babel 7.8.4

module.exports = function(classmethod) {
    return class {
        @classmethod
        clsMethod(cls) {
            return cls
        }

        instanceMethod() {
            return this
        }
    }
}


https://babeljs.io/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=LYewJgrgNgpgdDAHgBxAJwC4GcAEBeHAMwgDsBjDASxBIAoyoBDLLYGDAC3AEocBvAFABINOwhoSOBs1yCc8hfIAC0lm07hhQhlgCy7LmHpQsvQUIuiM4yToGKhAXwFbKJLBkbkY-jUbNaImISOJyUWFrOTgLOAkA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Cstage-0&prettier=false&targets=&version=7.8.4&externalPlugins=
*/
