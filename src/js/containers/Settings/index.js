import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import * as actionCreators from './actions';
import SettingsPresentation from './presentation';
import { submitAsset } from 'grommet-cms/containers/Dashboard/Assets/actions';
import { selectSettingsForm, selectMessage, selectSubmission, selectError, selectIsLoading } from './selectors';

class Settings extends Component {
  constructor() {
    super();
    this._handleFormChange = this._handleFormChange.bind(this);
    this._handleFormSubmission = this._handleFormSubmission.bind(this);
    this._handleClearingErrors = this._handleClearingErrors.bind(this);
    this._handleAssetSelect = this._handleAssetSelect.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadData();
  }

  _handleAssetSelect(asset, type) {
    this.props.actions.formInput(type, 'logo', asset);
  }

  _handleFormChange(e) {
    const { value, id } = e.target;
    const parts = id.split('-');
    const type = parts[0];
    const field = parts[1];
    this.props.actions.formInput(type, field, value);
  }

  _handleFormSubmission(e) {
    e.preventDefault();

    this.props.actions.submitData(this.props.submissionData).then(() => {
      this.props.actions.loadData();
    });
  }

  _handleClearingErrors() {
    this.props.actions.clearError();
  }

  render() {
    return (
      <Article
        align="center"
        style={{ maxHeight: 'calc(100vh - 122px)', overflow: 'auto' }}
      >
        <Box pad="medium" align="center">
          <SettingsPresentation
            {...this.props}
            onRemoveLogo={this.props.actions.removeLogo}
            onClearMessage={this.props.actions.clearMessage}
            onAssetSelect={this._handleAssetSelect}
            onClearErrors={this._handleClearingErrors}
            onSubmit={this._handleFormSubmission}
            onChange={this._handleFormChange}
          />
        </Box>
      </Article>
    );
  }
}

const mapStateToProps = state => ({
  form: selectSettingsForm(state),
  submissionData: selectSubmission(state),
  isLoading: selectIsLoading(state),
  error: selectError(state),
  message: selectMessage(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { ...actionCreators, submitAsset },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
