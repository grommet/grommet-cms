import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { BlockCardForm } from 'grommet-cms-content-blocks';
import { Assets } from 'grommet-cms/containers';

export class CardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: props.image || '',
      content: props.card && props.card.content || '',
      heading: props.card && props.card.heading || '',
      label: props.card && props.card.label || '',
      linkText: props.card && props.card.linkText || '',
      linkUrl: props.card && props.card.linkUrl || ''
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

  _onAssetSelect(asset) {
    this.setState({ image: asset });
  }

  _validateForm({ image, content }) {
    if (image !== '' && content !== '') { return true; }

    return false;
  }

  _onSubmit(event) {
    event.preventDefault();
    const state = Object.assign({}, this.state);
    const formData = {
      image: state.image,
      card: {
        content: state.content,
        heading: state.heading,
        label: state.label,
        linkText: state.linkText,
        linkUrl: state.linkUrl
      }
    };

    this.props.onSubmit(formData);
  }

  render() {
    const submit = (this._validateForm(this.state))
      ? this._onSubmit
      : undefined;

    return (
      <BlockCardForm
        {...this.state}
        url={this.props.url}
        onSubmit={submit}
        onChange={this._onChange}
      >
        <Assets
          onAssetSelect={this._onAssetSelect}
        />
      </BlockCardForm>
    );
  }
}

CardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object,
  url: PropTypes.string
};

function mapStateToProps(state, props) {
  const { url } = state.fileUpload;
  return { url };
}

export default connect(mapStateToProps)(CardForm);
