function sliceDegree(degree) {
    var longitude, latitude, height, checki;
    for (var i = 0; i < degree.length; i++) {
        if (degree[i] === ',') {
            longitude = degree.slice(0, i);
            checki = i;
            break;
        }
    }
    for (var j = checki + 2; j < degree.length; j++) {
        if (degree[j] === ',') {
            latitude = degree.slice(checki + 2, j);
            height = degree.slice(j + 2, degree.length);
            break;
        }
    }
    return {
        longitude: +longitude,
        latitude: +latitude,
        height: +height,
    }
}

export default sliceDegree;