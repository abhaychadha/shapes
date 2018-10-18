import React from "react";
import {render} from 'react-dom'
import Shapes from "./containers/shapes";

class App extends React.Component{
    render() {
        return(
            <div className="content-container">            
                <Shapes />
            </div>            
        );
    }
}

render(<App/>, window.document.getElementById("app"));