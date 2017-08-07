/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Paragraph from 'grommet/components/Paragraph';
import Select from 'grommet/components/Select';
// import * as EmailActionCreators from '../Email/actions';
import * as SyncActionCreators from './actions';
import { selectPageTypesList as selectPageTypes } from '../PageTypes/selectors';
import { ConfirmLayer, SyncLayer } from 'grommet-cms/components';
import { loadData as loadPageTypes } from 'grommet-cms/containers/PageTypes/actions';
import type { SyncProps, SyncState } from './flowTypes';

export class Sync extends Component {
  props: SyncProps
  state: {
    action: {
      label: string,
      value: string
    },
    resourceType: {
      label: string,
      value: string,
    },
    pageType: {
      label: string,
      value: string
    },
    page: {
      label: string,
      value: string
    },
    searchValue: string,
    layer: boolean,
    syncLayer: boolean
  }

  constructor(props: SyncProps) {
    super(props);

    this.state = {
      action: {
        label: 'Push',
        value: 'push'
      },
      resourceType: {
        label: '',
        value: ''
      },
      pageType: {
        label: '',
        value: ''
      },
      page: {
        label: '',
        value: ''
      },
      searchValue: '',
      layer: false,
      syncLayer: false
    };

    (this:any)._isValid = this._isValid.bind(this);
    (this:any)._onChange = this._onChange.bind(this);
    (this:any)._onLayerClose = this._onLayerClose.bind(this);
    (this:any)._onSearch = this._onSearch.bind(this);
    (this:any)._onSubmit = this._onSubmit.bind(this);
    (this:any)._renderConfirmLayer = this._renderConfirmLayer.bind(this);
    (this:any)._renderPageList = this._renderPageList.bind(this);
    (this:any)._syncData = this._syncData.bind(this);
  }

  componentDidMount() {
    // this.props.routeActions.getRoutes();
    if (this.props.pageTypes.length === 0) {
      this.props.actions.loadPageTypes();
    }
  }

  _renderPageList(routes: Array<Object>, pageType: string, searchValue: string) {
    const regexp = new RegExp(searchValue, 'i');
    let pageList = routes.filter(
      page => page._type === pageType && regexp.test(page.title)
    );

    return pageList.map(page => ({ label: page.title, value: page._id }));
  }

  _onChange(data: any) {
    let newState = {
      [data.target.id]: data.value || data.target.value
    };

    // Reset the page when a new Page Type is set.
    if (data.target.id === 'pageType') {
      newState = {
        ...newState,
        page: {
          label: '',
          value: ''
        }
      };
    }

    // Resets page data so it's not passed to the server.
    if (data.target.id === 'resourceType') {
      newState = {
        ...newState,
        pageType: {
          label: '',
          value: ''
        },
        page: {
          label: '',
          value: ''
        }
      };
    }

    this.setState(newState);
  }

  _onLayerClose() {
    this.props.syncActions.resetData();
    this.setState({ layer: false, syncLayer: false });
  }

  _onSearch(data: any) {
    this.setState({ searchValue: data.target.value });
  }

  _onSubmit(data: any) {
    this.setState({ layer: true });
  }

  _isValid(formData: SyncState) {
    const { action, pageType, page, resourceType } = formData;

    if (action.value && pageType.value === 'all') {
      return true;
    }
    
    if (resourceType.value === 'notifications' || resourceType.value === 'assets') {
      return true;
    }

    if (action.value && pageType.value && page.value) {
      return true;
    } else {
      return false;
    }
  }

  _renderConfirmLayer({ action, pageType, page, resourceType }: SyncState) {
    let confirmNote = (action.label === 'Pull')
      ? 'This action will overwrite all local assets'
      : 'This action will overwrite all remote assets';

    if (pageType.value === 'all') {
      confirmNote = ` ${confirmNote} and all pages.`;
    } else {
      confirmNote = ` ${confirmNote} and the ${page.label} page`;
    }

    return (
      <ConfirmLayer 
        action="sync"
        name="this data"
        note={<Paragraph margin="none">{confirmNote}</Paragraph>}
        onClose={this._onLayerClose}
        onSubmit={this._syncData.bind(this, { action, pageType, page, resourceType })}
      />
    );
  }

  _syncData({action, pageType, page, resourceType}: SyncState) {
    this.setState({
      layer: false,
      syncLayer: true
    });

    this.props.syncActions.sync({action, pageType, page, resourceType});
  }

  render() {
    const { action, layer, pageType, searchValue, syncLayer, resourceType } = this.state;
    const { routes, syncError, syncSuccess, syncRequest, pageTypes } = this.props;
    const onFormSubmit = (this._isValid(this.state))
      ? this._onSubmit.bind(this, this.state)
      : undefined;
    const confirmLayerNode = (layer)
      ? this._renderConfirmLayer(this.state)
      : undefined;
    const syncLayerNode = (syncLayer)
      ? (<SyncLayer
          request={syncRequest}
          error={syncError}
          success={syncSuccess}
          onClose={this._onLayerClose}
        />)
      : undefined;

    const pageSelect = (this.state.pageType.value 
      && routes 
      && routes.length > 0
      && pageType.value !== 'all')
      ? (<FormField label="Page">
          <Select
            id="page"
            placeholder="Select a page type..."
            options={this._renderPageList(routes, pageType.value, searchValue)}
            onChange={this._onChange}
            onSearch={this._onSearch}
            /* Strange flow bug where we have to define the object keys explicitily */
            value={{ label: this.state.page.label, value: this.state.page.value }}
          />
        </FormField>)
      : undefined;

    return (
      <Box pad="medium" align="center">
        {confirmLayerNode}
        {syncLayerNode}
        <Box pad="medium">
          <Form>
            <FormFields>
              <FormField label="Sync Action">
                <Select
                  id="action"
                  placeholder="Select a sync action..."
                  options={[
                    {
                      label: 'Push',
                      value: 'push'
                    },{
                      label: 'Pull',
                      value: 'pull'
                    }
                  ]}
                  onChange={this._onChange}
                  value={{ label: action.label, value: action.value }}
                />
              </FormField>
              <FormField label="Resource Type">
                <Select
                  id="resourceType"
                  placeholder="Select a resource type..."
                  options={[
                    {
                      label: 'Assets',
                      value: 'assets'
                    },
                    {
                      label: 'Notifications',
                      value: 'notifications'
                    },
                    {
                      label: 'Pages',
                      value: 'pages'
                    }
                  ]}
                  onChange={this._onChange}
                  value={{ label: resourceType.label, value: resourceType.value }}
                />
              </FormField>
              { resourceType.value === 'pages'
                && <FormField label="Page Type">
                  <Select
                    id="pageType"
                    placeholder="Select a page type..."
                    options={[ ...pageTypes, { label: 'All', value: 'all' } ]}
                    onChange={this._onChange}
                    value={{ label: pageType.label, value: pageType.value }}
                  />
                </FormField>
              }
              {pageSelect}
            </FormFields>
            <Box pad="small" />
            <Button
              primary
              label="Sync"
              onClick={onFormSubmit}
            />
          </Form>
        </Box>
      </Box>
    );
  }
};

const mapStateToProps = state => ({
  isRoutesLoading: state.email.isLoading,
  routes: state.email.routes,
  syncError: state.sync.error,
  syncSuccess: state.sync.success,
  syncRequest: state.sync.isLoading,
  pageTypes: selectPageTypes(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  /* routeActions: bindActionCreators(
    EmailActionCreators,
    dispatch
  ), */
  syncActions: bindActionCreators(
    SyncActionCreators,
    dispatch
  ),
  actions: bindActionCreators(
    { loadPageTypes },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sync);
