(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('solid-js/web'), require('solid-js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'solid-js/web', 'solid-js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.bundle = {}, global.web, global.solidJs));
})(this, (function (exports, web, solidJs) { 'use strict';

    var _a = solidJs.createSignal({
      width: 0,
      height: 0
    }),
        size = _a[0],
        setSize = _a[1];

    const _tmpl$$1 = web.template(`<div></div>`, 2);

    var Canvas = function (props) {
      solidJs.createEffect(function () {
        setTimeout(function () {
          setSize({
            width: window.innerWidth,
            height: window.innerHeight
          });
        }, 0);
      }, []);
      return (() => {
        const _el$ = _tmpl$$1.cloneNode(true);

        web.insert(_el$, () => props.children);

        web.effect(_p$ => {
          const _v$ = "".concat(size().width, "px"),
                _v$2 = "".concat(size().height, "px");

          _v$ !== _p$._v$ && _el$.style.setProperty("width", _p$._v$ = _v$);
          _v$2 !== _p$._v$2 && _el$.style.setProperty("height", _p$._v$2 = _v$2);
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined
        });

        return _el$;
      })();
    };

    var CanvasContext = solidJs.createContext(null);

    const _tmpl$ = web.template(`<canvas>您的浏览器不支持Canvas</canvas>`, 2);

    var Layer = function (props) {
      var canvas;

      var _a = solidJs.createSignal(null),
          state = _a[0],
          setState = _a[1];

      var ctx = solidJs.useContext(CanvasContext);
      console.log(ctx);
      solidJs.createEffect(function () {
        if (!canvas) return;
        var ctx = canvas.getContext("2d");
        setState(ctx);
        console.log(state());
      }, [canvas]);
      return web.createComponent(CanvasContext.Provider, {
        get value() {
          return state();
        },

        get children() {
          return [(() => {
            const _el$ = _tmpl$.cloneNode(true);

            const _ref$ = canvas;
            typeof _ref$ === "function" ? _ref$(_el$) : canvas = _el$;

            web.effect(_p$ => {
              const _v$ = size().width,
                    _v$2 = size().height;
              _v$ !== _p$._v$ && web.setAttribute(_el$, "width", _p$._v$ = _v$);
              _v$2 !== _p$._v$2 && web.setAttribute(_el$, "height", _p$._v$2 = _v$2);
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });

            return _el$;
          })(), web.memo(() => props.children)];
        }

      });
    };

    var Shape = function (props) {
      var draw = props.draw;
      var ctx = solidJs.useContext(CanvasContext);
      solidJs.createEffect(function () {
        if (ctx != null) {
          draw(ctx);
        }
      }, [ctx]);
      return null;
    };

    exports.Canvas = Canvas;
    exports.Layer = Layer;
    exports.Shape = Shape;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
