import React, { Component, PropTypes } from 'react';
import { Assets } from 'grommet-cms/containers';
import { BlockImageGalleryForm } from 'grommet-cms-content-blocks';

class CarouselForm extends Component {
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
      <BlockImageGalleryForm
        {...this.props}
        onSubmit={this._onSubmit}
        assetNode={assetNode}
      />
    );
  }
};

CarouselForm.propTypes = {
  onSubmit: PropTypes.func
};

export default CarouselForm;
