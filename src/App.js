import { Ion, Cartesian3, Color, ColorMaterialProperty, CallbackProperty, defined } from "cesium";
import { Viewer, Entity, PolygonGraphics, PolylineGraphics } from "resium";
import xmlF from './squaw_creek_container_info.xml';
import { createWorldTerrain } from "cesium";

function App() {
  Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3Yjg0MDg0Ny03ZjhhLTRjYTYtYTZkYy0wN2I2NmQxMDI5MzEiLCJpZCI6NzU0ODgsImlhdCI6MTYzODY3NDIzMX0.YgUxCvWMj0vQRZVspSIzkDAbfwziosVYq9gLWDaRjAI';
  var myAjax = new XMLHttpRequest();
  myAjax.open("GET", xmlF, false);
  myAjax.setRequestHeader("Content-Type", "text/xml");
  myAjax.send(null);
  var xmlDocument = myAjax.responseXML;
  var po = xmlDocument.getElementsByTagName("POINT");
  var li = xmlDocument.getElementsByTagName("LINE");
  var plg = xmlDocument.getElementsByTagName("POLYGON");

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

  function pointInLine(point1, point2) {
    var poDegree1, poDegree2;
    for (var i = 0; i < po.length; i++) {
      if (po[i].attributes[1].value === point1) {
        poDegree1 = po[i].attributes[0].value;
      }
      if (po[i].attributes[1].value === point2) {
        poDegree2 = po[i].attributes[0].value;
      }
    }
    return {
      poDe1: poDegree1,
      poDe2: poDegree2,
    }
  }

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

  function getPoDegree(arrOfLine) {
    var arrOfPo = [];
    for (var i = 0; i < arrOfLine.length; i++) {
      for (var j = 0; j < li.length; j++) {
        if (arrOfLine[i] === li[j].attributes[0].value) {
          var a = takeDegreeFromLine(li[j].attributes[1].value);
          arrOfPo.push(a);
        }
      }
    }
    return arrOfPo
  }

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

  function takeDegreeFromLine(linePath) {
    var takePo = sliceLine(linePath);
    var tkPoDegree = pointInLine(takePo.point1, takePo.point2);
    return {
      slDr1: sliceDegree(tkPoDegree.poDe1),
      slDr2: sliceDegree(tkPoDegree.poDe2),
    }
  }

  var arr = []
  const point = () => {
    for (var i = 0; i < po.length; i++) {
      var takeDegree = sliceDegree(po[i].attributes[0].value);
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
  var arrLine = []
  const line = () => {
    for (var i = 0; i < li.length; i++) {
      var sD = takeDegreeFromLine(li[i].attributes[1].value);
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
  var arrPolygon = []
  var colors = new Color(1, 0, 0, 0.5);
  const polygon = () => {
    for (var i = 0; i < plg.length; i++) {
      var arrPoDegree;
      var arrPoDg = [];
      var spl = plg[i].attributes[1].value.split(" ").join("");
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
  return (
    <div>
      <Viewer full terrainProvider={createWorldTerrain()} onSelectedEntityChange={(selectedEntity) => {
        if (defined(selectedEntity)) {
          if (selectedEntity.name === 'Polygon') {
            if (!Color.equals(selectedEntity.polygon.material.color.getValue(), Color.RED.withAlpha(0.5))) {
              selectedEntity.polygon.material.color.setCallback(function () {
                return Color.RED.withAlpha(0.5);
              }, false)
            }
            else if (!Color.equals(selectedEntity.polygon.material.color.getValue(), Color.GREEN.withAlpha(0.5))) {
              selectedEntity.polygon.material.color.setCallback(function () {
                return Color.GREEN.withAlpha(0.5);
              }, false)
            }
          }
        }
      }} >
        {point()}
        {line()}
        {polygon()}
      </Viewer>
    </div>
  );
}

export default App;