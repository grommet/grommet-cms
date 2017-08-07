import React, { Component } from 'react';
import { ContentLayoutEngine, BlockTypeMap } from 'grommet-cms-content-blocks';

export default class ContentBlocks extends Component {
  _renderBlocks(blocks) {
    return blocks.map((block, index) => {
      return (!block.edit) 
        ? React.cloneElement(
          BlockTypeMap[block.blockType].element,
          {
            ...block,
            key: `block-${index}`
          }) 
        : undefined;
    });
  }

  render() {
    const blocks = (this.props.blocks)
      ? this._renderBlocks(this.props.blocks)
      : undefined;

    return (
      <ContentLayoutEngine
        layout={this.props.layout}
        blocks={this.props.blocks}
      >
        {blocks}
      </ContentLayoutEngine>
    );
  }
};

ContentBlocks.propTypes = {
  blocks: React.PropTypes.array,
  layout: React.PropTypes.array
};
