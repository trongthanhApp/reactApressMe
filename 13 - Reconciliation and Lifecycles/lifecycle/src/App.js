import React, { Component } from 'react';
//import { Message } from "./Message";
import { DirectionDisplay } from './DirectionDisplay';
import { List } from './List';
import { Message } from './Message';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    changeCounter = (val) => {
        this.setState({ counter: this.state.counter + val })
    }

    incrementCounter = () => {
        this.setState({counter: this.state.counter + 1});
    }

    render() {
        console.log("Render App Component");
        return <div className="container text-center">
            <div className="row p-2">
                <div className="col-6">
                    <Message message={`Counter: ${this.state.counter}`}
                        callback={this.incrementCounter}
                        text="Increment Counter" />
                </div>
                <div className="col-6">
                    <List />
                </div>
            </div>
        </div>
    }
}
