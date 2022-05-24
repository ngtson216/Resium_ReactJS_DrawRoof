import AjaxXML from "../AjaxXML/index";

function pointInLine(point1, point2) {
    var poDegree1, poDegree2;
    for (var i = 0; i < AjaxXML().po.length; i++) {
        if (AjaxXML().po[i].attributes[1].value === point1) {
            poDegree1 = AjaxXML().po[i].attributes[0].value;
        }
        if (AjaxXML().po[i].attributes[1].value === point2) {
            poDegree2 = AjaxXML().po[i].attributes[0].value;
        }
    }
    return {
        poDe1: poDegree1,
        poDe2: poDegree2,
    }
}

export default pointInLine;