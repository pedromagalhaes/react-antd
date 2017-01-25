import React, { Component } from 'react';

export default class App extends Component {

    // only job is to show any children component (check routes.js)
    render() {
        return (
            <div>{ this.props.children }</div>
        );
    }
}