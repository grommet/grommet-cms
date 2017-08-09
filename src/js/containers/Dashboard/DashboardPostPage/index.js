import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  dashboardSetLeftNavAnchor
} from 'grommet-cms/containers/Dashboard/DashboardContainer/actions';
import {
  blockAdd,
  blockSetContentBlockLayout
} from 'grommet-cms/containers/Dashboard/DashboardContentBlocks/actions';
import {
  getPost,
  submitPost,
  setPost,
  postDeleteSection,
  postDuplicateSection,
  postEditOrAddSection,
  postMoveSectionUp,
  postMoveSectionDown,
  postClearError,
  postSetContentBlocks,
  postRemoveUnusedContentBlocksFromSection
} from 'grommet-cms/containers/Posts/PostPage/actions';
import { debounce } from 'grommet-cms/utils';
import { unslugify } from 'grommet-cms/utils';
import {
  toggleSectionForm,
  postSectionFormInput,
  postSectionFormReset,
  postSectionSetToastMessage,
  postSectionClearToastMessage,
  postBoxLayoutFormReset,
  postBoxLayoutFormInput,
  toggleBoxLayoutForm,
  postToggleAdvancedLayout,
  postToggleHelp,
  confirmDeletion,
  cancelDeletion
} from './actions';
import {
  selectPostSectionFormSubmission,
  selectBoxLayoutFormSubmission,
  selectAdvancedLayoutOptions,
  selectLayer
} from './selectors';
import propTypes from './propTypes';
import DashboardPostPagePresentation from './presentation';

export class DashboardPostPage extends Component {
  constructor(props) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
    this._onPostChange = this._onPostChange.bind(this);
    this._onCreatePost = this._onCreatePost.bind(this);
    this._onClearError = this._onClearError.bind(this);
    this._onSectionMenuItemClick = this._onSectionMenuItemClick.bind(this);
    this._onAddSection = this._onAddSection.bind(this);
    this._onSelectSection = this._onSelectSection.bind(this);
    this._setDefaultLeftAnchor = this._setDefaultLeftAnchor.bind(this);
    this._onSubmitSectionForm = this._onSubmitSectionForm.bind(this);
    this._onCreateBlock = this._onCreateBlock.bind(this);
    this._loadPost = this._loadPost.bind(this);
    this._onChangeSectionForm = this._onChangeSectionForm.bind(this);
    this._onSetSectionFormValues = this._onSetSectionFormValues.bind(this);
    this._onUpdateContentBlocks = this._onUpdateContentBlocks.bind(this);
    this._removeUnusedContentBlocks = this._removeUnusedContentBlocks.bind(this);
    this._checkForUnusedContentBlocks = this._checkForUnusedContentBlocks.bind(this);
    this._onCloseToast = this._onCloseToast.bind(this);
    this._onChangeBoxLayoutForm = this._onChangeBoxLayoutForm.bind(this);
    this._onSetBoxLayoutFormValues = this._onSetBoxLayoutFormValues.bind(this);
    this._onSubmitBoxLayoutForm = this._onSubmitBoxLayoutForm.bind(this);
    this._onBackToMasterView = this._onBackToMasterView.bind(this);
    this._onToggleSectionOptions = this._onToggleSectionOptions.bind(this);
    this._onToggleHelp = this._onToggleHelp.bind(this);
    this._handleSubmitLayer = this._handleSubmitLayer.bind(this);
    this._handleClosingLayer = this._handleClosingLayer.bind(this);
    this.state = {
      selectedSection: null,
      shouldAnimate: false
    };
  }

  componentWillMount() {
    this._loadPost();
  }

  componentDidMount() {
    this._setDefaultLeftAnchor();
    if (this.state.shouldAnimate === false) {
      setTimeout(() => {
        this.setState({
          shouldAnimate: true
        });
      }, 1000);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(
      dashboardSetLeftNavAnchor({
        label: null,
        onClick: null
      })
    );
  }

  componentWillReceiveProps({ post, contentBlocks, boxLayoutForm }) {
    if (post !== this.props.post && !this.props.request) {
      debounce(
        this._onSubmit(post),
        1000,
        true
      );
    }
    if (contentBlocks !== this.props.contentBlocks) {
      if (post && this.state.selectedSection !== null) {
        if (contentBlocks.length) {
          this._onUpdateContentBlocks(contentBlocks);
        } else {
          this._onUpdateContentBlocks([]);
        }
      }
    }
    if ((boxLayoutForm.selectedContentBlockId && boxLayoutForm.isVisible) &&
      (!this.props.boxLayoutForm.selectedContentBlockId)
    ) {
      this._onSetBoxLayoutFormValues(boxLayoutForm.selectedContentBlockId);
    }
  }

  _loadPost() {
    const { id } = this.props.params;
    if (id && id !== 'create') {
      this.props.dispatch(getPost(id));
    }
  }

  _onSubmit(post = this.props.post) {
    if (!this.props.request) {
      this.props.dispatch(submitPost(post));
    }
  }

  _onUpdateContentBlocks(contentBlocks = this.props.contentBlocks) {
    const i = this.state.selectedSection;
    this.props.dispatch(postSetContentBlocks(contentBlocks, i));
  }

  _onClearError() {
    this.props.dispatch(postClearError());
  }

  _onSectionMenuItemClick(name, i) {
    switch (name) {
      case 'DUPLICATE':
        this.props.dispatch(postDuplicateSection(i));
        break;
      case 'DELETE':
        this.props.dispatch(confirmDeletion(i));
        break;
      case 'MOVE_UP':
        this.props.dispatch(postMoveSectionUp(i));
        break;
      case 'MOVE_DOWN':
        this.props.dispatch(postMoveSectionDown(i));
        break;
      case 'EDIT_SECTION':
        this._onSetSectionFormValues(i);
        this.props.dispatch(toggleSectionForm(i));
        break;
      case 'EDIT_CONTENT':
        this._onSelectSection(i);
        break;
      default: break;
    }
  }

  _onAddSection() {
    this.props.dispatch(toggleSectionForm(null));
  }

  _setDefaultLeftAnchor() {
    const { post } = this.props;
    this.props.dispatch(
      dashboardSetLeftNavAnchor({
        label: `${post ? unslugify(post._type) : 'All'} Pages`,
        onClick: () => this.context.router.goBack()
      })
    );
  }

  _onSelectSection(i) {
    this.props.dispatch(
      dashboardSetLeftNavAnchor({
        label: this.props.post.title,
        onClick: this._onBackToMasterView
      })
    );
    this.setState({
      selectedSection: i
    });
  }

  _onCreatePost(post) {
    this.props.dispatch(setPost(post));
  }

  _onCreateBlock() {
    if (!this._checkForUnusedContentBlocks()) {
      this.props.dispatch(blockAdd());
    } else {
      const message = 'You can only add one new block at a time.';
      this.props.dispatch(postSectionSetToastMessage(message));
    }
  }

  _onPostChange({ target, option }) {
    const { post } = this.props;
    const key = target.id;
    const val = option || target.value;
    let newPost;
    if (post) {
      newPost = {
        ...post,
        [key]: post.key != null ? `${post[key]}${val}` : val
      };
    } else {
      newPost = {
        [key]: val
      };
    }
    this.props.dispatch(setPost(newPost));
  }

  _onSetSectionFormValues(index = null) {
    if (index != null) {
      const section = this.props.post.sections[index];
      this._onChangeSectionForm({ name: 'name', value: section.name });
      if (section.layout && section.layout.length) {
        section.layout.forEach((item) => {
          this._onChangeSectionForm({ name: item.name, value: item.value });
        });
      }
    } else {
      this.props.dispatch(toggleSectionForm(null));
      this.props.dispatch(postSectionFormReset());
    }
  }

  _onChangeSectionForm({ name, value }) {
    this.props.dispatch(postSectionFormInput(name, value));
  }

  _onSubmitSectionForm(close = true) {
    const { postSectionLayoutSubmission, dispatch, sectionLayoutForm } = this.props;
    postEditOrAddSection(
      postSectionLayoutSubmission,
      sectionLayoutForm.selectedSection
    )(dispatch);
    if (close) {
      this._onSetSectionFormValues();
    }
  }

  _onToggleSectionOptions() {
    this.props.dispatch(postToggleAdvancedLayout());
  }

  _onToggleHelp(type) {
    switch (type) {
      case 'BOX':
        this.props.dispatch(postToggleHelp('boxLayoutForm'));
        break;
      default:
        this.props.dispatch(postToggleHelp('sectionLayoutForm'));
        break;
    }
  }

  _onSetBoxLayoutFormValues(id = null) {
    if (id != null) {
      const selectedBlock = this.props.contentBlocks
        .filter(item => item.id === id)[0];
      if (selectedBlock && selectedBlock.layout) {
        const layoutItems = selectedBlock.layout;
        layoutItems.forEach((item) => {
          this._onChangeBoxLayoutForm({ name: item.name, value: item.value });
        });
      }
    } else {
      this.props.dispatch(toggleBoxLayoutForm(null));
      this.props.dispatch(postBoxLayoutFormReset());
    }
  }

  _onChangeBoxLayoutForm({ name, value }) {
    this.props.dispatch(postBoxLayoutFormInput(name, value));
  }

  _onSubmitBoxLayoutForm(close = true) {
    const { boxLayoutFormSubmission, boxLayoutForm } = this.props;
    this.props.dispatch(
      blockSetContentBlockLayout(
        boxLayoutForm.selectedContentBlockId,
        boxLayoutFormSubmission
      )
    );
    if (close) {
      this._onSetBoxLayoutFormValues();
    }
  }

  _onBackToMasterView() {
    this._removeUnusedContentBlocks();
    this._setDefaultLeftAnchor();
    this.setState({
      selectedSection: null
    });
  }

  _onCloseToast() {
    this.props.dispatch(postSectionClearToastMessage());
  }

  _removeUnusedContentBlocks() {
    this.props.dispatch(
      postRemoveUnusedContentBlocksFromSection(this.state.selectedSection)
    );
  }

  _checkForUnusedContentBlocks() {
    if (this.state.selectedSection) {
      if (this.props.post) {
        const section = this.props.post.sections[this.state.selectedSection];
        if (section.contentBlocks && section.contentBlocks.length) {
          return section.contentBlocks
            .filter(item => item.edit === true).length > 0;
        }
      }
    }
    return false;
  }

  _handleClosingLayer() {
    this.props.dispatch(cancelDeletion());
  }

  _handleSubmitLayer() {
    const { itemToDelete } = this.props.layer;
    if (itemToDelete !== null) {
      this.props.dispatch(cancelDeletion());
      this.props.dispatch(postDeleteSection(itemToDelete));
    }
  }

  render() {
    const {
      post,
      error,
      sectionLayoutForm,
      boxLayoutForm,
      toastMessage,
      request,
      showSectionLayoutOptions,
      layer
    } = this.props;
    return (
      <DashboardPostPagePresentation
        {...this.state}
        layer={layer}
        onSubmitLayer={this._handleSubmitLayer}
        onCloseLayer={this._handleClosingLayer}
        post={post}
        error={error}
        sectionLayoutForm={sectionLayoutForm}
        boxLayoutForm={boxLayoutForm}
        toastMessage={toastMessage}
        showSectionLayoutOptions={showSectionLayoutOptions}
        request={request}
        onSubmitBoxLayoutForm={this._onSubmitBoxLayoutForm}
        onToggleHelp={this._onToggleHelp}
        onChangeBoxLayoutForm={this._onChangeBoxLayoutForm}
        onSetBoxLayoutFormValues={this._onSetBoxLayoutFormValues}
        onToggleSectionOptions={this._onToggleSectionOptions}
        onChangeSectionForm={this._onChangeSectionForm}
        onSubmitSectionForm={this._onSubmitSectionForm}
        onSetSectionFormValues={this._onSetSectionFormValues}
        onSectionMenuItemClick={this._onSectionMenuItemClick}
        onBackToMasterView={this._onBackToMasterView}
        onCreateBlock={this._onCreateBlock}
        onSelectSection={this._onSelectSection}
        onAddSection={this._onAddSection}
        onClearError={this._onClearError}
        onCloseToast={this._onCloseToast}
      />
    );
  }
}

DashboardPostPage.propTypes = propTypes;

DashboardPostPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { post, error, request } = state.posts;
  const { sectionLayoutForm, boxLayoutForm, toastMessage } = state.dashboardPost;
  const { contentBlocks } = state;
  const { url } = state.fileUpload;
  return {
    post,
    error,
    request,
    url,
    sectionLayoutForm,
    boxLayoutForm,
    contentBlocks,
    toastMessage,
    layer: selectLayer(state),
    postSectionLayoutSubmission: selectPostSectionFormSubmission(state),
    boxLayoutFormSubmission: selectBoxLayoutFormSubmission(state),
    showSectionLayoutOptions: selectAdvancedLayoutOptions(state)
  };
}

export default connect(mapStateToProps)(DashboardPostPage);
