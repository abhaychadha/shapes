import styled from "styled-components";
 
export const StlyledMarker = styled.div`
    width: 11px;
    height: 11px;
    border: 1px solid red;
    display: inline-block;
    position: fixed;
    left: ${props=>props.x - 5.5}px;
    top: ${props=>props.y-5.5}px;
    border-radius: 50%;
`
