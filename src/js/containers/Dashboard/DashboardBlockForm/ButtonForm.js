import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Assets } from 'grommet-cms/containers';
import { BlockButtonForm } from 'grommet-cms-content-blocks';

export class ButtonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: props.asset || '',
      label: props.label || '',
      primary: props.primary || 'True',
      buttonType: props.buttonType || 'Button',
      icon: props.icon || 'primary',
      path: props.path || '',
      href: props.href || '',
      assetType: props.assetType || 'path'
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onAssetSelect = this._onAssetSelect.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.asset !== this.props.url && this.props.url !== '') {
      this.setState({
        asset: `${this.props.url}`
      });
    }
  }

  _onChange({ target, option }) {
    const key = target.id;
    let val = option || target.value;

    let obj  = {};
    obj[key] = val;

    this.setState(obj);
  }

  _onSubmit(event) {
    event.preventDefault();
    const formData = Object.assign({}, this.state);
    this.props.onSubmit(formData);
  }

  _onAssetSelect(asset) {
    this.setState({ asset: asset });
  }

  render() {

    return (
      <BlockButtonForm
        url={this.props.url}
        onSubmit={this._onSubmit}
        onChange={this._onChange}
        {...this.state}
      >
        <Assets
          assetType=""
          onAssetSelect={this._onAssetSelect}
        />
      </BlockButtonForm>
    );
  }
};

ButtonForm.propTypes = {
  onSubmit: PropTypes.func,
  url: PropTypes.string
};

function mapStateToProps(state, props) {
  const { url } = state.fileUpload;
  return { url };
}

export default connect(mapStateToProps)(ButtonForm);
