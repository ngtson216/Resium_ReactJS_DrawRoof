function sliceLine(linePath) {
    var po1, po2;
    for (var i = 0; i < linePath.length; i++) {
        if (linePath[i] === ',') {
            po1 = linePath.slice(0, i);
            po2 = linePath.slice(i + 2, linePath.length);
            break;
        }
    }
    return {
        point1: po1,
        point2: po2,
    }
}

export default sliceLine;