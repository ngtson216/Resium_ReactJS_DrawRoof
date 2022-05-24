import sliceDegree from "../Algorithm/sliceDegree";
import AjaxXML from "../AjaxXML";
import { Cartesian3, Color } from "cesium";
import { Entity } from "resium";

function point() {
    var arr = []
    for (var i = 0; i < AjaxXML().po.length; i++) {
        var takeDegree = sliceDegree(AjaxXML().po[i].attributes[0].value);
        var pos = Cartesian3.fromDegrees(takeDegree.longitude, takeDegree.latitude, takeDegree.height)
        arr.push(pos)
    }
    return (
        arr.map((pos, index) => {
            return (
                <Entity key={index} position={pos} point={{
                    pixelSize: 10,
                    color: Color.RED,
                }} />
            )
        })
    )
}

export default point;