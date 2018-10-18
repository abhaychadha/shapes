import React, { Component } from "react";
import { Row, Col, Label } from "react-bootstrap";
import { StyledPanel } from "./markerInfo.style";

const MarkerInfo = props => {
  return (    
    <StyledPanel>
    <Row>
      <p>
        <Label>Marker No {props.index}</Label>
      </p>
     </Row>
     <Row className="text-info"> 
      <Col md={6}>
        <b>X:</b> {props.x}
      </Col>
      <Col md={6}>
        <b>Y:</b> {props.y}
      </Col>
    </Row>
    </StyledPanel>
  );
};
export default MarkerInfo;
