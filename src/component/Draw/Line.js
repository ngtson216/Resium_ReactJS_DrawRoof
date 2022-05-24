import takeDegreeFromLine from "../Algorithm/takeDegreeFromLine";
import AjaxXML from "../AjaxXML";
import { Cartesian3, Color } from "cesium";
import { Entity, PolylineGraphics } from "resium";

function line() {
    var arrLine = []
    for (var i = 0; i < AjaxXML().li.length; i++) {
        var sD = takeDegreeFromLine(AjaxXML().li[i].attributes[1].value);
        var posLine = Cartesian3.fromDegreesArrayHeights([sD.slDr1.longitude, sD.slDr1.latitude, sD.slDr1.height, sD.slDr2.longitude, sD.slDr2.latitude, sD.slDr2.height]);
        arrLine.push(posLine);
    }
    return (
        arrLine.map((pos, index) => {
            return (
                <Entity key={index}>
                    <PolylineGraphics
                        positions={pos}
                        width={2}
                        material={Color.YELLOW}
                    />
                </Entity>
            )
        })
    )
}

export default line;