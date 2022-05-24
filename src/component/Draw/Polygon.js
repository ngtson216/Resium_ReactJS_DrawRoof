import AjaxXML from "../AjaxXML";
import { Cartesian3, Color, ColorMaterialProperty, CallbackProperty } from "cesium";
import { Entity, PolygonGraphics } from "resium";
import getPoDegree from "../Algorithm/getPoDegree";
import getLineFromPolygon from "../Algorithm/getLineFromPolygon";

function polygon() {
    var arrPolygon = []
    var colors = new Color(1, 0, 0, 0.5);
    for (var i = 0; i < AjaxXML().plg.length; i++) {
        var arrPoDegree;
        var arrPoDg = [];
        var spl = AjaxXML().plg[i].attributes[1].value.split(" ").join("");
        arrPoDegree = getPoDegree(getLineFromPolygon(spl))
        for (var j = 0; j < arrPoDegree.length; j++) {
            arrPoDg.push(+arrPoDegree[j].slDr1.longitude,
                +arrPoDegree[j].slDr1.latitude,
                +arrPoDegree[j].slDr1.height,
                +arrPoDegree[j].slDr2.longitude,
                +arrPoDegree[j].slDr2.latitude,
                +arrPoDegree[j].slDr2.height)
        }
        var posi = Cartesian3.fromDegreesArrayHeights(arrPoDg)
        arrPolygon.push(posi)
    }

    return (
        arrPolygon.map((pos, index) => {
            var colorProperty;
            colorProperty = new ColorMaterialProperty();
            colorProperty.color = colors;
            colorProperty.color = new CallbackProperty(function () {
                return colors;
            }, false);
            return (
                <Entity key={index} name={'Polygon'}>
                    <PolygonGraphics
                        hierarchy={pos}
                        perPositionHeight={true}
                        material={colorProperty}
                        outline={true}
                    />
                </Entity>
            )
        })
    )
}

export default polygon;