import React, { Component } from "react";
import { Container, ShapeSection, InfoSection } from "./shapes.style";
import Marker from "../../components/marker";
import { Row } from "react-bootstrap";
import Parallelogram from "../../components/Parallelogram";
import Info from "../../components/Info";
import Action from "../../components/action";
import About from "../../components/about";
import getInitialState from "../../initialState";

class Shapes extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();

    // binding context to the methods
    this.markPoints = this.markPoints.bind(this);
    this.createParallelogram = this.createParallelogram.bind(this);
    this.createCircle = this.createCircle.bind(this);
    this.updateMarker = this.updateMarker.bind(this);
    this.reset = this.reset.bind(this);
    this.showAbout = this.showAbout.bind(this);
    this.hideAbout = this.hideAbout.bind(this);
  }

  getPoints(markers) {
    // getting markers for creating parallelogram
    return `${markers[0].x},${markers[0].y} ${markers[1].x},${markers[1]
      .y} ${markers[2].x},${markers[2].y} ${markers[3].x},${markers[3].y}`;
  }
  createParallelogram(event) {
  // creating parallelogram
    if (this.state.markers.length != 3) return;
    let x4, y4, { markers } = this.state;
    x4 = markers[0].x + markers[2].x - markers[1].x;
    y4 = markers[0].y + markers[2].y - markers[1].y;
    markers.push({
      x: x4,
      y: y4,
      key: new Date().getTime()
    });
    this.setState({
      markers: markers,
      cog: {},
      radius: 0
    });
  }

  markPoints(event) {
    // mark coordinates on the screen
    let { markers, addMarkers } = this.state;
    const { clientX, clientY } = event;
    if (addMarkers) {
      markers.push({
        x: clientX,
        y: clientY,
        key: new Date().getTime()
      });
      this.setState({ markers: markers });
    }
    this.state.addMarkers = markers.length === 3 ? false : true;
  }

  updateMarker(newMarkerPos, markerProps) {
    // callback for updating marker when dragged
    const { markers } = this.state,
      currMarker = {
        x: markers[markerProps.index].x,
        y: markers[markerProps.index].y
      };
    markers[markerProps.index].x = newMarkerPos.x;
    markers[markerProps.index].y = newMarkerPos.y;
    if (markers.length == 4) {
      this.updateParallelogram(markers, currMarker, markerProps.index);
    } else {
      this.setState({ markers: markers });
    }
  }

  updateParallelogram(markers, currMarker, index) {
    // updating the parallelogram and circle when marker is dragged
    const oppIndex = index + 2 > 3 ? index - 2 : index + 2;
    markers[oppIndex] = {
      x: markers[oppIndex].x - (markers[index].x - currMarker.x),
      y: markers[oppIndex].y - (markers[index].y - currMarker.y),
      key: new Date().getTime()
    };
    this.setState({ markers: markers });
    this.createCircle();
  }

  calculatePolyArea() {
    // calculating the area
    const { markers } = this.state;
    let arrX = [],
      arrY = [],
      area = 0, // Accumulates area in the loop ;
      j = 3; // The last vertex is the 'previous' one to the first
    markers.forEach(marker => {
      arrX.push(marker.x);
      arrY.push(marker.y);
    });
    for (let i = 0; i < 4; i++) {
      area = area + (arrX[j] + arrX[i]) * (arrY[j] - arrY[i]);
      j = i; //j is previous vertex to i
    }
    return Math.abs(area / 2);
  }

  getCOG() {
    // getting center of mass for parallelogram
    const { markers } = this.state,
      midX = markers[0].x + (markers[2].x - markers[0].x) * 0.5,
      midY = markers[0].y + (markers[2].y - markers[0].y) * 0.5;
    return {
      x: midX,
      y: midY
    };
  }

  createCircle() {
    // creating circle
    if (this.state.markers.length != 4) return;
    const area = this.calculatePolyArea();
    const cog = this.getCOG();
    const radius = Math.sqrt(area / 3.14);

    this.setState({ cog: cog, radius: radius, area: area });
  }
  reset() {
    this.setState(getInitialState());
  }

  showAbout() {
    this.setState({ showAbout: true });
  }
  hideAbout() {
    this.setState({ showAbout: false });
  }
  render() {
    const { markers } = this.state;
    return (
      <Container>
        <ShapeSection onClick={this.markPoints}>
          {this.state.markers.map((marker, index) => {
            return (
              <Marker
                key={marker.key}
                x={marker.x}
                y={marker.y}
                updateHandler={this.updateMarker}
                index={index}
              />
            );
          })}
          {markers.length === 4 ? (
            <svg width="1000" height="600">
              <polygon
                points={this.getPoints(markers)}
                style={{
                  stroke: "blue",
                  strokeWidth: 2,
                  fill: "transparent"
                }}
              />
              <circle
                cx={this.state.cog.x}
                cy={this.state.cog.y}
                r= {3}
                style={{
                  stroke: "red",
                  strokeWidth: 2,
                  fill: "transparent"
                }}
              />
              {/*circle with area as same as parallelogram and center and
               center of mass as same that of the parallelogram*/}
              <circle
                cx={this.state.cog.x}
                cy={this.state.cog.y}
                r={this.state.radius}
                style={{
                  stroke: "yellow",
                  strokeWidth: 2,
                  fill: "transparent"
                }}
              />
            </svg>
          ) : (
            ""
          )}
        </ShapeSection>
        <InfoSection>
          <Info
            markers={this.state.markers}
            createParallelogram={this.createParallelogram}
            createCircle={this.createCircle}
            reset={this.reset}
            area={this.state.area}
            showAbout={this.showAbout}
          />
        </InfoSection>
        <About show={this.state.showAbout} hideAbout={this.hideAbout} />
      </Container>
    );
  }
}

export default Shapes;
