import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from 'grommet/components/Button';
import Image from 'grommet/components/icons/base/Image';
import { FileInsertLayer } from 'grommet-cms/components';
import { fileInsert, fileUpload, fileError } from './actions';

export class DashboardFileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: ''
    };

    this._onUploadFileClick = this._onUploadFileClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onLayerClose = this._onLayerClose.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onUploadFileClick() {
    this.props.dispatch(fileInsert(true));
  }

  _onLayerClose() {
    this.props.dispatch(fileInsert(false));
  }

  _onChange() {
    this.setState({ file: event.target.files[0] });
  }

  _onSubmit() {
    if (this.state.file !== '') {
      const formData = { file: this.state.file };
      this.props.dispatch(fileUpload(formData));
      if (typeof this.props.onImgPost === 'function') {
        this.props.onImgPost();
      }
    } else {
      this.props.dispatch(fileError('A file must be selected.'));
    }
  }

  render() {
    const layer = (this.props.insertRequest)
      ? <FileInsertLayer
        onLayerClose={this._onLayerClose}
        onSubmit={this._onSubmit}
        error={this.props.error}
        onChange={this._onChange}
        request={this.props.uploadRequest}
      />
      : null;

    return (
      <div>
        {layer}
        <Button onClick={this._onUploadFileClick} icon={<Image />}>Add File</Button>
      </div>
    );
  }
}

DashboardFileUpload.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onImgPost: PropTypes.func
};

function mapStateToProps(state) {
  const { insertRequest, uploadRequest, error, url } = state.fileUpload;

  return {
    insertRequest,
    uploadRequest,
    error,
    url
  };
}

export default connect(mapStateToProps)(DashboardFileUpload);
