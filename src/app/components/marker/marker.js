import React, {Component} from "react";
import {StlyledMarker} from "./marker.style";
import Draggable from "../../utils/draggable";
const Marker = props => {
   
    return <StlyledMarker x={props.x} y={props.y} />
    
}

export default Draggable(Marker);