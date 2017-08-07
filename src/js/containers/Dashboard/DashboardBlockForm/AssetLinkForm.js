import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Assets } from 'grommet-cms/containers';
import { BlockAssetLinkForm } from 'grommet-cms-content-blocks';

export class AssetLinkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: props.asset || '',
      content: props.content || ''
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onAssetSelect = this._onAssetSelect.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url !== this.props.url && this.props.url !== '') {
      this.setState({
        asset: `${this.props.url}`
      });
    }
  }

  _onChange({ target, option }) {
    const key = target.id;
    const val = option || target.value;

    const obj = {};
    obj[key] = val;

    this.setState(obj);
  }

  _validateForm({ asset }) {
    if (asset.path !== '') { return true; }

    return false;
  }

  _onSubmit(event) {
    event.preventDefault();
    const formData = Object.assign({}, this.state);
    this.props.onSubmit(formData);
  }

  _onAssetSelect(asset) {
    this.setState({ asset });
  }

  render() {
    const submit = (this._validateForm(this.state))
      ? this._onSubmit
      : undefined;

    return (
      <BlockAssetLinkForm
        url={this.props.url}
        onSubmit={submit}
        onChange={this._onChange}
        {...this.state}
      >
        <Assets
          assetType=""
          onAssetSelect={this._onAssetSelect}
        />
      </BlockAssetLinkForm>
    );
  }
}

AssetLinkForm.propTypes = {
  onSubmit: PropTypes.func,
  url: PropTypes.string
};

function mapStateToProps(state, props) {
  const { url } = state.fileUpload;
  return { url };
}

export default connect(mapStateToProps)(AssetLinkForm);
