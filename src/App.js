import { Cartesian3, Color, defined } from "cesium";
import { Viewer, Camera, CameraFlyTo } from "resium";
import { createWorldTerrain } from "cesium";
import Point from "./component/Draw/Point";
import Line from "./component/Draw/Line";
import Polygon from "./component/Draw/Polygon";

function App() {
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
        <Camera />
        <CameraFlyTo
          destination={Cartesian3.fromDegrees(-93.62033081054688, 42.01864242553711, 378.75982666015625)}
          duration={0}
        />
        <Point />
        <Line />
        <Polygon />
      </Viewer>
    </div>
  );
}

export default App;