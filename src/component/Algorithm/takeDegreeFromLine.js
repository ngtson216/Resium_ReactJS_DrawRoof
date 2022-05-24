import sliceLine from "./sliceLine";
import sliceDegree from "./sliceDegree";
import pointInLine from "./pointInLine";

function takeDegreeFromLine(linePath) {
    var takePo = sliceLine(linePath);
    var tkPoDegree = pointInLine(takePo.point1, takePo.point2);
    return {
        slDr1: sliceDegree(tkPoDegree.poDe1),
        slDr2: sliceDegree(tkPoDegree.poDe2),
    }
}

export default takeDegreeFromLine;