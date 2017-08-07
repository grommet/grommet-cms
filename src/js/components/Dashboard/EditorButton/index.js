import React, { Component } from 'react';

class EditorButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'richeditor__style-button';
    if (this.props.active) {
      className += ' richeditor__style-button--active';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

export default EditorButton;
