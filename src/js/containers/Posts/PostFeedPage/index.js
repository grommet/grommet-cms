/* @flow */
import React from 'react';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import {
  WithLoading,
  ErrorNotification,
  PostFeedItem
} from 'grommet-cms/components';
import * as PostFeedPageActionCreators from './actions';
import { selectPosts, selectError, selectIsLoading } from './selectors';
import type { PostFeedPageProps } from './flowTypes';

class PostFeedPage extends React.Component {
  props: PostFeedPageProps;
  constructor() {
    super();
    (this:any).renderError = this.renderError.bind(this);
  }
  componentDidMount() {
    this.props.actions.getPosts();
  }
  renderError() {
    const { loadingError } = this.props;
    if (loadingError) {
      return (
        <ErrorNotification
          errors={[loadingError]}
          onClose={this.props.actions.clearErrors}
        />
      );
    }
    return null;
  }
  render() {
    const {
      posts,
      isLoading,
      loadingError
    } = this.props;
    return (
      <WithLoading isLoading={isLoading} fullHeight>
        <Helmet title="Post Feed" />
        <Section full="horizontal" pad="none">
          {posts && posts.length ? posts.map((item, i) => 
            <PostFeedItem
              key={i}
              colorIndex={['grey-1-a', 'grey-2-a', 'grey-3-a', 'grey-4-a'][i % 4]}
              post={item}
              postPath="/post/"
            />
          )
        :
          <Box full pad="large">
            <Heading align="center">
              No posts
            </Heading>
          </Box>
        }
        </Section>
        {this.renderError(loadingError)}
      </WithLoading>
    );
  }
}

function mapStateToProps(state) {
  return {
    loadingError: selectError(state),
    isLoading: selectIsLoading(state),
    posts: selectPosts(state)
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(
      PostFeedPageActionCreators,
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFeedPage);
