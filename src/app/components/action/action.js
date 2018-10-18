import React, { Component } from "react";
import { StyledButton } from "./action.style";

const action = props => {
  return (
    <StyledButton bsStyle="primary" onClick={props.actionHandler} bsSize="xsmall">      
      {props.text}
    </StyledButton>
  );
};
export default action;
