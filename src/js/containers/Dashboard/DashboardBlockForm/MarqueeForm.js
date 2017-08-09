import React, { Component, PropTypes } from 'react';
import { Assets } from 'grommet-cms/containers';
import { BlockMarqueeForm } from 'grommet-cms-content-blocks';

class MarqueeForm extends Component {
  constructor() {
    super();
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(data) {
    if (this.props.onSubmit) {
      this.props.onSubmit(data);
    }
  }
  render() {
    const assetNode = (
      <Assets />
    );
    return (
      <BlockMarqueeForm
        {...this.props}
        onSubmit={this._onSubmit}
        assetNode={assetNode}
      />
    );
  }
}

MarqueeForm.propTypes = {
  onSubmit: PropTypes.func
};

export default MarqueeForm;

