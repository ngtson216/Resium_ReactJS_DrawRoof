function getLineFromPolygon(polygonPath) {
    var p = 0;
    var arrPlg = [];
    for (var i = 0; i < polygonPath.length; i++) {
        if (polygonPath[i] === ',') {
            var a = polygonPath.slice(p, i);
            p = i + 1;
            arrPlg.push(a);
        }
        if (i === polygonPath.length - 1 && polygonPath[i] !== ',') {
            var b = polygonPath.slice(p, polygonPath.length);
            arrPlg.push(b);
        }
    }
    return arrPlg
}

export default getLineFromPolygon;