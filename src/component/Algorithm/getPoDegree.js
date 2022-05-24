import takeDegreeFromLine from "./takeDegreeFromLine";
import AjaxXML from "../AjaxXML";

function getPoDegree(arrOfLine) {
    var arrOfPo = [];
    for (var i = 0; i < arrOfLine.length; i++) {
        for (var j = 0; j < AjaxXML().li.length; j++) {
            if (arrOfLine[i] === AjaxXML().li[j].attributes[0].value) {
                var a = takeDegreeFromLine(AjaxXML().li[j].attributes[1].value);
                arrOfPo.push(a);
            }
        }
    }
    return arrOfPo
}

export default getPoDegree;