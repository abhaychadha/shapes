import React, { Component } from "react";
import MarkerInfo from "../markerInfo/markerInfo";
import Area from "../area/Area";
import Action from "../action";
import { Grid, Row, Col, Button } from "react-bootstrap";
const Info = props => {
  return (
    <div>
      <Row>
        <nav className="navbar navbar-inverse">
          <Col md={12} className="navbar-brand">
            Shapes
            <Button bsStyle="link" onClick={props.showAbout} className="float-left">click here for App info</Button>
          </Col>
        </nav>
        
      </Row>
      <Row>
        <Action
          actionHandler={props.createParallelogram}
          text="Parallelogram"
        />
        <Action actionHandler={props.createCircle} text="Circle" />
        <Action actionHandler={props.reset} text="Reset" />
      </Row>
      {props.markers.map((marker, index) => {
        return (
          <MarkerInfo x={marker.x} y={marker.y} index={index + 1} key={index} />
        );
      })}
      {props.area > 0 ? <Area area={props.area} /> : ""}
    </div>
  );
};

export default Info;
