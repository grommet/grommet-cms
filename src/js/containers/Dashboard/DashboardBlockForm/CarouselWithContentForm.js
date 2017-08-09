import React, { Component, PropTypes } from 'react';
import { Assets } from 'grommet-cms/containers';
import { BlockCarouselWithContentForm } from 'grommet-cms-content-blocks';

class CarouselWithContentForm extends Component {
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
      <BlockCarouselWithContentForm
        {...this.props}
        onSubmit={this._onSubmit}
        assetNode={assetNode}
      />
    );
  }
}

CarouselWithContentForm.propTypes = {
  onSubmit: PropTypes.func
};

export default CarouselWithContentForm;
