import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import TextInput from 'grommet/components/TextInput';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import { WithLoading, ErrorNotification } from 'grommet-cms/components';
import { formInput, getPageType, clearForm, submitPageType, clearError } from './actions';
import { selectForm, selectFormSubmission, selectIsLoading, selectError } from './selectors';

class PageTypeForm extends Component {
  constructor() {
    super();
    this._handleFormInput = this._handleFormInput.bind(this);
    this._loadPageType = this._loadPageType.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
    this._handleSubmission = this._handleSubmission.bind(this);
  }

  componentWillMount() {
    this._loadPageType();
  }

  componentWillUnmount() {
    this.props.actions.clearForm();
  }

  _loadPageType() {
    if (this.props.params && this.props.params.id) {
      const { id } = this.props.params;
      this.props.actions.getPageType(id);
    }
  }

  _handleSubmission(e) {
    e.preventDefault();
    const { formSubmission } = this.props;
    this.props.actions.submitPageType(formSubmission);
  }

  _handleFormInput(e) {
    const { value, id } = e.target;
    this.props.actions.formInput(id, value);
  }

  _handleCancel() {
    browserHistory.push('/dashboard/pageTypes');
  }

  render() {
    const { form, action, error, isLoading } = this.props;
    return (
      <WithLoading isLoading={isLoading}>
        <Box style={{ paddingBottom: 100 }}>
          <Form>
            <Box align="center" pad="medium">
              <Header pad={{ vertical: 'medium' }}>
                <Heading align="center">{action} Page Type</Heading>
              </Header>
            </Box>
            <FormFields>
              <FormField label="Title" htmlFor="title">
                <TextInput
                  id="title"
                  name="title"
                  onDOMChange={this._handleFormInput}
                  {...form.title}
                />
              </FormField>
              <FormField label="Description" htmlFor="description">
                <textarea
                  rows={3}
                  cols={40}
                  id="description"
                  name="description"
                  onChange={this._handleFormInput}
                  {...form.description}
                />
              </FormField>
            </FormFields>
            <Footer align="center" pad={{ vertical: 'medium' }}>
              <Button
                onClick={this._handleSubmission}
                primary
                type="submit"
                label="submit"
              />
              <Button
                className="grommetux-button--critical"
                style={{ marginLeft: 5 }}
                label="cancel"
                onClick={this._handleCancel}
                primary={false}
              />
            </Footer>
            {error &&
              <ErrorNotification
                onClose={this.props.actions.clearError}
                errors={typeof error === 'string' ? [{ message: error }] : [error]}
              />
            }
          </Form>
        </Box>
      </WithLoading>
    );
  }
}

const mapStateToProps = (state, props) => ({
  form: selectForm(state),
  isLoading: selectIsLoading(state),
  error: selectError(state),
  formSubmission: selectFormSubmission(state, props)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      formInput,
      getPageType,
      clearForm,
      submitPageType,
      clearError
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageTypeForm);
