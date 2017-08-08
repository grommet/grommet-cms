import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
import CloseIcon from 'grommet/components/icons/base/Close';
import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import { BlockSelector, PreviewHeader } from 'grommet-cms-content-blocks';
import { BlockTypeMap, PageHeader, ConfirmLayer } from 'grommet-cms/components';
import { toggleBoxLayoutForm } from 'grommet-cms/containers/Dashboard/DashboardPostPage/actions';
import {
  blockEdit,
  blockRemove,
  blockType,
  blockSubmit,
  blockMoveUp,
  blockMoveDown,
  blockDuplicate
} from '../DashboardContentBlocks/actions';

export class DashboardContentBlock extends Component {
  constructor(props) {
    super(props);

    this._onBlockSelectClick = this._onBlockSelectClick.bind(this);
    this._onBlockSubmit = this._onBlockSubmit.bind(this);
    this._onEditClick = this._onEditClick.bind(this);
    this._onLayoutClick = this._onLayoutClick.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onDuplicate = this._onDuplicate.bind(this);
    this._confirmDelete = this._confirmDelete.bind(this);
    this._onLayerClose = this._onLayerClose.bind(this);
    this._onDeleteSubmit = this._onDeleteSubmit.bind(this);
    this.state = {
      contentBlockToDelete: null,
      layer: false
    };
  }

  componentDidMount() {
    const { edit } = this.props;
    if (edit) {
      const node = findDOMNode(this.blockSelector);
      if (node) {
        node.scrollIntoView();
      }
    }
  }

  _onCloseClick(id) {
    this.props.dispatch(blockRemove(id));
  }

  _onLayerClose() {
    this.setState({
      layer: false,
      contentBlockToDelete: null
    });
  }

  _confirmDelete(id) {
    this.setState({
      layer: true,
      contentBlockToDelete: id
    });
  }

  _onDeleteSubmit(event) {
    event.preventDefault();
    this._onCloseClick(this.state.contentBlockToDelete);
    this.setState({
      layer: false,
      contentBlockToDelete: null
    });
  }

  _onDuplicate(id) {
    this.props.dispatch(blockDuplicate(id));
  }

  _onEditClick(id) {
    this.props.dispatch(blockEdit(id));
  }

  _onBlockSelectClick(id, type) {
    this.props.dispatch(blockType(id, type));
  }

  _onBlockSubmit(id, formData) {
    this.props.dispatch(blockSubmit(id, formData));
  }

  _onBlockMove(id, direction) {
    if (direction === 'up') { this.props.dispatch(blockMoveUp(id)); }
    if (direction === 'down') { this.props.dispatch(blockMoveDown(id)); }
  }

  _onLayoutClick(id) {
    this.props.dispatch(toggleBoxLayoutForm(id));
  }

  render() {
    const { blockType, edit, id } = this.props; // eslint-disable-line

    // Show block selector when editing and no block type is defined.
    const blockSelector = (edit && !blockType)
      ? (
        <Layer
          flush
          align="center"
          hidden={false}
          onClose={this._onCloseClick.bind(this, id)}
        >
          <Box>
            <PageHeader
              title="Select Content Block Type"
              controls={
                <Anchor
                  onClick={this._onCloseClick.bind(this, id)}
                  icon={<CloseIcon />}
                />
              }
            />
            <Box
              style={{ maxWidth: 777 }}
              pad="large"
              ref={selector => this.blockSelector = selector}
            >
              <Article style={{ overflow: 'scroll' }}>
                <BlockSelector
                  onClick={this._onBlockSelectClick.bind(this, id)}
                  blockMap={BlockTypeMap}
                />
              </Article>
            </Box>
          </Box>
        </Layer>
      ) : undefined;

    // Once a block is selected show content form based on block type.
    const form = (edit && blockType)
      ? (
        <Box pad="medium">
          {React.cloneElement(
            BlockTypeMap[blockType].form,
            {
              onSubmit: this._onBlockSubmit.bind(this, id),
              ...this.props
            }
          )}
        </Box>
      ) : undefined;


    // Show block preview when editing/creating is complete.
    const preview = (!edit && blockType)
      ? (
        <Box pad="small" colorIndex="light-1">
          {React.cloneElement(
            BlockTypeMap[blockType].preview,
            {
              ...this.props
            }
          )}
        </Box>
      ) : undefined;

    // Set box title.
    const title = (blockType)
      ? BlockTypeMap[blockType].name
      : 'New Block';

    // Highlight box when user is editing.
    const color = (edit)
      ? 'neutral-1'
      : 'light-2';

    const layer = (this.state.layer)
      ? <ConfirmLayer onSubmit={this._onDeleteSubmit} onClose={this._onLayerClose} />
      : null;

    return (
      <Box
        full="horizontal"
        colorIndex={color}
        pad="small"
      >
        <PreviewHeader
          title={title}
          edit={edit}
          onDuplicateClick={this._onDuplicate.bind(this, id)}
          onLayoutClick={this._onLayoutClick.bind(this, id)}
          onClose={this._confirmDelete.bind(this, id)}
          onMove={this._onBlockMove.bind(this, id)}
          onEdit={this._onEditClick.bind(this, id)}
        />
        {preview}
        {blockSelector}
        {form}
        {layer}
      </Box>
    );
  }
}

DashboardContentBlock.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  const blockIndex = state.contentBlocks.findIndex(
    block => block.id === props.id
  );
  const block = state.contentBlocks[blockIndex];
  if (block) {
    const {
      ...allProps
    } = block;
    return {
      ...allProps
    };
  }
  return {};
}

export default connect(mapStateToProps)(DashboardContentBlock);
