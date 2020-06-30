"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.anuncio_auto = void 0;
var anuncio = /** @class */ (function () {
    function anuncio(obj) {
        this.id = obj.id;
        this.titulo = obj.titulo;
        this.transaccion = obj.transaccion;
        this.descripcion = obj.descripcion;
        this.precio = obj.precio;
    }
    return anuncio;
}());
var anuncio_auto = /** @class */ (function (_super) {
    __extends(anuncio_auto, _super);
    function anuncio_auto(obj) {
        var _this = _super.call(this, obj) || this;
        _this.num_puertas = obj.num_puertas;
        _this.num_KMs = obj.num_KMs;
        _this.potencia = obj.potencia;
        return _this;
    }
    return anuncio_auto;
}(anuncio));
exports.anuncio_auto = anuncio_auto;
