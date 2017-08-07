import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import { Assets } from 'grommet-cms/containers';
import { BlockVideoForm } from 'grommet-cms-content-blocks';

export class VideoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image || '',
      content: props.content || '',
      video: props.video || '',
      label: props.label || '',
      borderColor: props.borderColor || 'none'
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onAssetSelect = this._onAssetSelect.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url !== this.props.url && this.props.url !== '') {
      this.setState({
        image: `${this.props.url}`
      });
    }
  }

  _onChange({ target }) {
    const key = target.id;
    const val = target.value;

    const obj = {};
    obj[key] = val;

    this.setState(obj);
  }

  _onAssetSelect(asset, key = 'image') {
    this.setState({ [`${key}`]: asset });
  }

  _validateForm({ image }) {
    if (image !== '') { return true; }

    return false;
  }

  _onSubmit(event) {
    event.preventDefault();
    const formData = Object.assign({}, this.state);
    this.props.onSubmit(formData);
  }

  render() {
    const submit = (this._validateForm(this.state))
      ? this._onSubmit
      : undefined;

    return (
      <BlockVideoForm
        url={this.props.url}
        onSubmit={submit}
        onChange={this._onChange}
        {...this.state}
      >
        <Box direction="row" align="center">
          <Assets
            assetType="video"
            onAssetSelect={asset => this._onAssetSelect(asset, 'video')}
          />
          <Assets
            assetType="image"
            onAssetSelect={asset => this._onAssetSelect(asset, 'image')}
          />
        </Box>
      </BlockVideoForm>
    );
  }
}

VideoForm.propTypes = {
  onSubmit: PropTypes.func,
  url: PropTypes.string
};

function mapStateToProps(state, props) {
  const { url } = state.fileUpload;
  return { url };
}

export default connect(mapStateToProps)(VideoForm);
