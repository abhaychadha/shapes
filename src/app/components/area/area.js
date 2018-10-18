import React, { Component } from "react";
import { Row, Col, Label, Panel } from "react-bootstrap"


const Area = props => {
  return (    
    <Panel>
    <Row>
      <p>
        <Label>Area</Label> (parallelogram and circle)
      </p>
     </Row>
     <Row className="text-info"> 
      <Col md={6}>
        {props.area}
      </Col>
    </Row>
    </Panel>
  );
};
export default Area;
