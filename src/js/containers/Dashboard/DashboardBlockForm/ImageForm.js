import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Assets } from 'grommet-cms/containers';
import { BlockImageForm } from 'grommet-cms-content-blocks';

export class ImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image || '',
      content: props.content || '',
      alt: props.alt || '',
      imageSize: props.imageSize || 'Large',
      borderColor: props.borderColor || 'none'
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onAssetSelect = this._onAssetSelect.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url && this.props.url !== '') {
      this.setState({ // eslint-disable-line
        image: `${this.props.url}`
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

  _validateForm({ image }) {
    if (image !== '') { return true; }

    return false;
  }

  _onSubmit(event) {
    event.preventDefault();
    const formData = Object.assign({}, this.state);
    this.props.onSubmit(formData);
  }

  _onAssetSelect(asset) {
    this.setState({ image: asset });
  }

  render() {
    const submit = (this._validateForm(this.state))
      ? this._onSubmit
      : undefined;

    return (
      <BlockImageForm
        {...this.state}
        url={this.props.url}
        onSubmit={submit}
        onChange={this._onChange}
      >
        <Assets onAssetSelect={this._onAssetSelect} />
      </BlockImageForm>
    );
  }
}

ImageForm.propTypes = {
  onSubmit: PropTypes.func,
  url: PropTypes.string
};

function mapStateToProps(state) {
  const { url } = state.fileUpload;
  return { url };
}

export default connect(mapStateToProps)(ImageForm);
