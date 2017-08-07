/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';
import AssetForm from 'grommet-cms/containers/Dashboard/DashboardAssetPage';
import { PageHeader } from 'grommet-cms/components';
import type { Asset } from 'grommet-cms/containers/Dashboard/Assets/flowTypes';
import { getAssets } from 'grommet-cms/containers/Dashboard/Assets/actions';
import { DashboardAssetsList } from 'grommet-cms/containers';

type Props = {
  dispatch: Function,
  error: string,
  assets: Array<Asset>,
  request: boolean,
  onAssetSelect: Function,
  onAssetsSelect: ?Function
};

export class DashboardAssetsLayer extends Component {
  state: {
    addNewAsset: boolean
  };

  _onAssetFormSubmit: () => void;
  _onAddAssetClick: () => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      addNewAsset: false
    };

    this._onAssetFormSubmit = this._onAssetFormSubmit.bind(this);
    (this:any)._onAssetFormCancel = this._onAssetFormCancel.bind(this);
    (this:any)._onAddAssetClick = this._onAddAssetClick.bind(this);
  }

  _onAssetFormSubmit() {
    // Refresh Assets list.
    this.props.dispatch((getAssets()))
      .then(() => {
        this.setState({ addNewAsset: false });
      });
  }

  _onAddAssetClick() {
    this.setState({ addNewAsset: true });
  }

  _onAssetFormCancel() {
    this.setState({ addNewAsset: false });
  }

  render() {
    const onAssetFormSubmit = (!this.props.request) ? this._onAssetFormSubmit : undefined;
    const assetForm = (this.state.addNewAsset)
      ?
      <Article
          full
          align="center"
          justify="center"
          style={{ overflow: 'scroll' }}
        >
          <AssetForm
          isLayer
          hasHeader={false}
          params={{ id: 'create' }}
          onCancel={this._onAssetFormCancel}
          onSubmit={onAssetFormSubmit}
        />
        </Article>
      : undefined;


    return (
      <Layer align="center" flush onClose={this.props.onClose}>
        <PageHeader
          title="Assets"
          controls={
            <Box direction="row" pad={{ between: 'medium' }} responsive={false}>
              <Button onClick={this._onAddAssetClick}>
                Add Asset
              </Button>
              <Button onClick={this.props.onClose}>
                Exit
              </Button>
            </Box>
          }
        />
        {!this.state.addNewAsset &&
          <DashboardAssetsList
            isInLayer
            allowMultiSelect={typeof this.props.onAssetsSelect !== 'undefined'}
            tileSize="medium"
            showControls={false}
            onAssetSelect={this.props.onAssetSelect}
            onAssetsSelect={this.props.onAssetsSelect}
          />
        }
        {assetForm}
      </Layer>
    );
  }
}

function mapStateToProps(state, props) {
  const { error, request } = state.assets;
  return {
    error,
    request
  };
}

export default connect(mapStateToProps)(DashboardAssetsLayer);

