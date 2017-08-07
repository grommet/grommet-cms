import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import Article from 'grommet/components/Article';
import PageTypesPresentation from './presentation';
import * as actionCreators from './actions';
import { diff } from './swapItemOrder';
import { selectData, selectIsLoading, selectError, selectLayer, selectItemToDelete } from './selectors';

class PageTypes extends Component {
  constructor() {
    super();
    this._handleMenuItemClick = this._handleMenuItemClick.bind(this);
    this._handleSubmitLayer = this._handleSubmitLayer.bind(this);
    this._handleClosingLayer = this._handleClosingLayer.bind(this);
  }

  componentWillReceiveProps({ pageTypes }) {
    if (pageTypes && this.props.pageTypes && pageTypes !== this.props.pageTypes) {
      const changed = diff(this.props.pageTypes, pageTypes);
      changed.forEach((pt) => {
        this.props.actions.submitPageType(pt);
      });
    }
  }
  
  componentWillMount() {
    this.props.actions.loadData();
  }

  _handleEditAction = (index) => {
    const { pageTypes } = this.props;
    const selectedItem = pageTypes[index];
    if (selectedItem) {
      browserHistory.push(`/dashboard/pageType/${selectedItem._id}`);
    }
  }

  _handleDeleteAction = (index) => {
    this.props.actions.confirmDeletion(index);
  }

  _handleMoveAction = (direction, index) => {
    this.props.actions.reorderPageType(index, direction);
  }
  
  _handleMenuItemClick(type, index) {
    switch(type) {
      case 'EDIT':
        this._handleEditAction(index);
        break;
      case 'DELETE':
        this._handleDeleteAction(index);
        break;
      case 'MOVE_UP':
        this._handleMoveAction('UP', index);
        break;
      case 'MOVE_DOWN':
        this._handleMoveAction('DOWN', index);
        break;
    }
  }
  
  _handleClosingLayer() {
    this.props.actions.cancelDeletion();
  }

  _handleSubmitLayer() {
    const { itemToDelete } = this.props;
    if (itemToDelete !== null) {
      this.props.actions.deletePageType(itemToDelete._id);
    }
  }

  render() {
    return (
      <Article
        align="center"
        style={{ maxHeight: 'calc(100vh - 122px)', overflow: 'auto' }}
      >
        <PageTypesPresentation
          {...this.props}
          onSubmitLayer={this._handleSubmitLayer}
          onCloseLayer={this._handleClosingLayer}
          onMenuItemClick={this._handleMenuItemClick}
          onClearError={this.props.actions.clearError}
        />
      </Article>
    );
  }
}

const mapStateToProps = state => ({
  pageTypes: selectData(state),
  isLoading: selectIsLoading(state),
  error: selectError(state),
  itemToDelete: selectItemToDelete(state),
  layer: selectLayer(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { ...actionCreators },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageTypes);
