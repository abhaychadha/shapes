import React, { Component } from "react";

const Draggable = InnerComponent => class DraggableComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            x: this.props.x,
            y: this.props.y            
        }
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }
  render() {
    return <div draggable="true" onDrag={this.onMouseMove} onDragEnd={this.onDrop}>
     <InnerComponent {...this.state} 
    />
    </div>
  }

  componentDidUpdate(prevProps, prevState){
      if (this.props.updateHandler && prevState.x !== this.state.x && prevState.y !== this.state.y ){
          this.props.updateHandler(this.state, prevProps, prevState);
      }
  }

  onMouseMove(event) {
    if (event.button !== 0) 
        return;
    const { clientX, clientY } = event;
    this.setState({
        x: clientX,
        y: clientY
    })
    event.preventDefault();
  }
  onDrop(event) {
      if (event.button !== 0) 
        return;
    
    const { clientX, clientY } = event;
    this.setState({
        x: clientX,
        y: clientY
    })
  } 
}
export default Draggable;
