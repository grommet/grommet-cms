import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Anchor from 'grommet/components/Anchor';
import AddIcon from 'grommet/components/icons/base/Add';
import { PageHeader, AddPostForm, PostDashboardList, ConfirmLayer, LoadingIndicator, NoneFound } from 'grommet-cms/components';
import { getPosts, deletePost, submitPost, setPost, updatePost } from
  'grommet-cms/containers/Posts/PostPage/actions';
import { blockAddList } from
  'grommet-cms/containers/Dashboard/DashboardContentBlocks/actions';
import { toggleAddPostFormVisibility, addPostRedirect, incrementCurrentPage } from './actions';
import { unslugify } from 'grommet-cms/utils';

export class DashboardPostsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layer: false,
      orderLayer: false,
      pageHeader: {
        title: 'Pages'
      },
      postToDelete: null
    };
    this._confirmDelete = this._confirmDelete.bind(this);
    this._onDeleteSubmit = this._onDeleteSubmit.bind(this);
    this._onLayerClose = this._onLayerClose.bind(this);
    this._onToggleAddPostForm = this._onToggleAddPostForm.bind(this);
    this._onCreatePost = this._onCreatePost.bind(this);
    this._onSubmitPost = this._onSubmitPost.bind(this);
    this._onCancelPost = this._onCancelPost.bind(this);
    this._onCreatePost = this._onCreatePost.bind(this);
    this._onPostChange = this._onPostChange.bind(this);
    this._onFetchPosts = this._onFetchPosts.bind(this);
    this._onMenuItemClick = this._onMenuItemClick.bind(this);
    this._onMovePostOrderUp = this._onMovePostOrderUp.bind(this);
    this._onMovePostOrderDown = this._onMovePostOrderDown.bind(this);
    this._onMore = this._onMore.bind(this);
    this._setPageHeaderTitle = this._setPageHeaderTitle.bind(this);
  }

  componentWillMount() {
    // Reset content block list.
    // TODO: avoid resetting content list here. Possibly route middleware.
    this.props.dispatch(blockAddList([]));
    this._onFetchPosts();
    this._setPageHeaderTitle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.posts !== prevProps.posts && this.props.request === false)
      this.setState({orderLayer: false});
  }

  componentWillReceiveProps({ request, posts, redirect, params, currentPage }) {
    if (!request && request !== this.props.request) {
      if (redirect) {
        this.props.dispatch(addPostRedirect());
        this._onToggleAddPostForm();
        this._onFetchPosts();
      }
    }
    if (params.type !== this.props.params.type) {
      this._onFetchPosts(currentPage, params.type);
      this._setPageHeaderTitle(params.type);
    }
    if (currentPage > this.props.currentPage) {
      this._onFetchPosts(currentPage, this.props.params.type);
    }
  }

  _setPageHeaderTitle(type = this.props.params.type) {
    if (type) {
      const title = unslugify(type);
      this.state = {
        pageHeader: {
          title: `Pages  |  ${title}`
        }
      };
    }
  }

  _onSubmitPost() {
    const { newPost, params, addPostForm, request } = this.props;
    if(!request && newPost) {
      let post = newPost;
      if (addPostForm.selectedPostIndex === null) {
        post = {
          ...newPost,
          _type: params.type,
          sections: []
        };
      }
      this.props.dispatch(addPostRedirect());
      this.props.dispatch(submitPost(post));
    }
  }

  _onFetchPosts(page = this.props.currentPage, type = this.props.params.type) {
    this.props.dispatch(getPosts(page, type));
  }

  _onCancelPost() {
    this.props.dispatch(setPost());
    this._onToggleAddPostForm();
  }

  _onCreatePost() {
    const newPost = {
      _id: '',
      date: new Date()
    };
    this.props.dispatch(setPost(newPost));
  }

  _onPostChange({ target, option }) {
    const { newPost } = this.props;
    const key = target.id;
    let val = option || target.value;
    let updatedPost;
    if (newPost) {
      updatedPost = {
        ...newPost,
        [key]: newPost.key != null
          ? `${newPost[key]}${val}`
          : val
      };
    } else {
      const { selectedPostIndex } = this.props.addPostForm;
      const post = this.props.posts[selectedPostIndex];
      updatedPost = {
        ...post,
        [key]: val
      };
    }
    this.props.dispatch(setPost(updatedPost));
  }

  _onToggleAddPostForm() {
    if (!this.props.addPostForm.isVisible && !this.props.newPost) {
      this._onCreatePost();
    }
    this.props.dispatch(toggleAddPostFormVisibility(null));
  }

  _onOrderClick() {
    this.setState({ orderLayer: true });
  }

  _onLayerClose() {
    this.setState({
      layer: false,
      orderLayer: false,
      postToDelete: null
    });
  }

  _confirmDelete(id) {
    this.setState({
      layer: true,
      postToDelete: id
    });
  }

  _onMenuItemClick(type, index) {
    const { _id: id } = this.props.posts[index];
    switch(type) {
      case 'EDIT_PAGE': {
        this.props.dispatch(toggleAddPostFormVisibility(index));
        break;
      }
      case 'EDIT_CONTENT': {
        this.context.router.push(`/dashboard/post/${id}`);
        break;
      }
      case 'DELETE': {
        this._confirmDelete(id);
        break;
      }
      case 'MOVE_UP':
        this._onMovePostOrderUp(index);
        break;
      case 'MOVE_DOWN':
        this._onMovePostOrderDown(index);
        break;
      default: break;
    }
  }

  _onMovePostOrderUp(index) {
    const post = this.props.posts[index];
    const swappedPost = this.props.posts[index - 1];
    if (post) {
      const sortOrder = Math.max(0, post.sortOrder - 1);
      const newPost = {
        ...post,
        sortOrder
      };
      this.props.dispatch(updatePost(newPost));
    }
    if (swappedPost) {
      const sortOrder = swappedPost.sortOrder + 1;
      const newPost = {
        ...swappedPost,
        sortOrder
      };
      this.props.dispatch(updatePost(newPost));
    }
  }

  _onMovePostOrderDown(index) {
    const post = this.props.posts[index];
    const swappedPost = this.props.posts[index + 1];
    if (post) {
      const sortOrder = post.sortOrder + 1;
      const newPost = {
        ...post,
        sortOrder
      };
      this.props.dispatch(updatePost(newPost));
    }
    if (swappedPost) {
      const sortOrder = Math.max(0, swappedPost.sortOrder - 1);
      const newPost = {
        ...swappedPost,
        sortOrder
      };
      this.props.dispatch(updatePost(newPost));
    }
  }

  _onMore() {
    // useful for pagination if we need it, but not currently used
    this.props.dispatch(incrementCurrentPage());
  }

  _onDeleteSubmit(event) {
    event.preventDefault();
    const post = this.props.posts.filter(i => i._id === this.state.postToDelete)[0];
    this.props.dispatch(deletePost(post));
    this.setState({
      layer: false,
      postToDelete: null
    });
  }

  _renderLoader(request) {
    return (request)
      ? <Box full align="center" justify="center">
          <LoadingIndicator />
        </Box>
      : <NoneFound message="Click 'Add Page' to add one." />;
  }

  render() {
    const { posts, request, addPostForm, url, newPost } = this.props;
    const { selectedPostIndex } = addPostForm;
    const selectedPost = selectedPostIndex !== null
      ? this.props.posts[selectedPostIndex]
      : null;
    const { title } = this.state.pageHeader;
    const layer = (this.state.layer)
      ?
        <ConfirmLayer
          onSubmit={this._onDeleteSubmit}
          onClose={this._onLayerClose}
        />
      : null;

    const list = (Array.isArray(posts) && posts.length > 0 && !request)
      ? <PostDashboardList
          list={this.props.posts}
          onMenuItemClick={this._onMenuItemClick} 
        />
      : this._renderLoader(request);

    return (
      <Box 
        primary 
        direction="column"
        full="horizontal"
        style={{ maxHeight: 'calc(100vh - 80px)' }}
      >
        <AddPostForm
          isVisible={addPostForm.isVisible}
          onClose={this._onToggleAddPostForm}
          isEditing={selectedPost !== null}
          form={{
            onSubmit: this._onSubmitPost,
            post: newPost || selectedPost || {},
            url: url,
            onCancel: this._onCancelPost,
            onChange: this._onPostChange
          }}
        />
        {layer}
        <PageHeader
          title={title}
          controls={
            <Anchor
              icon={<AddIcon size="small" />}
              label="Add Page"
              onClick={this._onToggleAddPostForm}
            />
          }
        />
        <Article
          align="center"
          style={{ maxHeight: 'calc(100vh - 80px)', overflow: 'auto' }}
        >
          {list}
        </Article>
      </Box>
    );
  }
};

DashboardPostsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  request: PropTypes.bool,
  addPostForm: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired,
    selectedPostIndex: PropTypes.number
  }).isRequired,
  newPost: PropTypes.object,
  redirect: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    type: PropTypes.string.isRequired
  }),
  currentPage: PropTypes.number.isRequired
};

DashboardPostsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps (state, props) {
  const { request, error, posts, post } = state.posts;
  const { addPostForm, redirect, currentPage } = state.dashboardPosts;
  const { url } = state.fileUpload;
  return {
    request,
    url,
    redirect,
    error,
    posts,
    newPost: post,
    currentPage,
    addPostForm
  };
};

export default connect(mapStateToProps)(DashboardPostsPage);
