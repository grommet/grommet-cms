import React, { Component, PropTypes } from 'react';
import { Assets } from 'grommet-cms/containers';
import { BlockParagraphCTAsForm } from 'grommet-cms-content-blocks';

class ParagraphCTAsForm extends Component {
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
      <BlockParagraphCTAsForm
        {...this.props}
        onSubmit={this._onSubmit}
        assetNode={assetNode}
      />
    );
  }
};

ParagraphCTAsForm.propTypes = {
  onSubmit: PropTypes.func
};

export default ParagraphCTAsForm;
