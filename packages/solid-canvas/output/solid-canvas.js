(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('solid-js/web'), require('solid-js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'solid-js/web', 'solid-js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.bundle = {}, global.web, global.solidJs));
})(this, (function (exports, web, solidJs) { 'use strict';

    const _tmpl$ = web.template(`<canvas>当前浏览器不支持Canvas</canvas>`, 2);

    var _a = solidJs.createSignal({
      width: 0,
      height: 0
    }),
        size = _a[0],
        setSize = _a[1];

    var Canvas = function () {
      solidJs.createEffect(function () {
        console.log(window);
        setSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, []);
      return (() => {
        const _el$ = _tmpl$.cloneNode(true);

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
      })();
    };

    exports.Canvas = Canvas;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
