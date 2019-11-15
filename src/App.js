import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
      counter: 0,
      warning: false
    }

    this.incrementCounter = this.incrementCounter.bind(this)
    this.decrementCounter = this.decrementCounter.bind(this)
  }

  incrementCounter(){
    if (this.state.warning) {
      this.setState({ warning: false })
    }
    this.setState({ counter: this.state.counter + 1 })
  }

  decrementCounter(){
    if (this.state.counter > 0) {
      this.setState({ counter: this.state.counter - 1} )
      }
      else {
        this.setState({ warning: true })
      }
    }

  render (){
    return (
      <div data-test="component-app">
        <h1 data-test="display">The counter is {this.state.counter}</h1>
        <h2 data-test="warning">{this.state.warning ? 'You cannot go below zero' : ''}</h2>
        <button data-test="button" onClick={this.incrementCounter}
          >Increment</button>
        <button data-test="decrement-button" onClick={this.decrementCounter}>
          Decrement counter
        </button>
      </div>
    );
  }
}

export default App;
