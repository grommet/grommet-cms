// @flow
import React from 'react';
import Footer from 'grommet/components/Footer';
import Section from 'grommet/components/Section';
import ImageIcon from 'grommet/components/icons/base/Image';
import VideoIcon from 'grommet/components/icons/base/Video';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import DashboardAssetsLayer from
  'grommet-cms/containers/Dashboard/DashboardAssetsLayer';
import type { Asset } from './flowTypes';

type AssetUploadState = {
  assetLayer: boolean
};

type AssetUploadProps = {
  onAssetSelect: (asset: Asset) => void,
  onAssetsSelect: (assets: Asset[]) => void,
  assetType: 'video' | 'image',
};

export default class AssetUpload extends React.Component {
  state: AssetUploadState;
  static defaultProps = {
    assetType: 'image'
  };
  props: AssetUploadProps;
  constructor() {
    super();
    (this:any)._toggleAssetsLayer = this._toggleAssetsLayer.bind(this);
    (this:any)._renderAssetLayer = this._renderAssetLayer.bind(this);
    (this:any)._onAssetSelect = this._onAssetSelect.bind(this);
    this._onAssetsSelect = this._onAssetsSelect.bind(this);
    this.state = {
      assetLayer: false
    };
  }

  _renderAssetLayer() {
    if (this.state.assetLayer) {
      return (
        <DashboardAssetsLayer
          onAssetsSelect={typeof this.props.onAssetsSelect !== 'undefined' ? this._onAssetsSelect : undefined}
          onAssetSelect={this._onAssetSelect}
          onClose={this._toggleAssetsLayer}
        />
      );
    }
    return null;
  }

  _toggleAssetsLayer() {
    this.setState({
      assetLayer: !this.state.assetLayer
    });
  }

  _onAssetSelect(asset: Asset) {
    this.props.onAssetSelect(asset);
    this.setState({ assetLayer: false });
  }

  _onAssetsSelect: (assets: Asset[]) => void;
  _onAssetsSelect(assets: Asset[]) {
    this.props.onAssetsSelect(assets);
    this.setState({ assetLayer: false });
  }

  render() {
    const { assetType } = this.props;
    const type = assetType || 'asset';
    return (
      <Section>
        {this._renderAssetLayer()}
        <Footer
          className="dashboard__post-form__button-row"
          align="center"
          pad={{ horizontal: 'medium' }}
        >
          <Box align="start">
            <Button
              icon={assetType === 'video' ? <VideoIcon /> : <ImageIcon />}
              onClick={this._toggleAssetsLayer}
            >
              {`Select ${type}`}
            </Button>
          </Box>
        </Footer>
      </Section>
    );
  }
};
