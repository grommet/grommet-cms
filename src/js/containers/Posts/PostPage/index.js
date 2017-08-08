import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Label from 'grommet/components/Label';
import { getPost } from 'grommet-cms/containers/Posts/PostPage/actions';
import { SectionLayoutRenderer } from 'grommet-cms-content-blocks';
import { WithLoading } from 'grommet-cms/components';

export class PostPage extends Component {
  componentWillMount() {
    this.props.dispatch(getPost(undefined, this.props.params.slug));
  }

  render() {
    const { post, request } = this.props;
    const { sections } = post;
    const subtitle = (post && post.subtitle)
      ? post.subtitle
      : null;
    const title = (post && post.title)
      ? post.title
      : 'Post';
    const image = (post && post.image)
      ? post.image.path
      : undefined;

    return (
      <WithLoading isLoading={request} fullHeight>
        <Box primary className="labs" align="center">
          <Helmet title={title} />
          <Box
            texture={image}
            full="horizontal"
            size={{ height: 'medium' }}
            colorIndex="grey-1"
            justify="center"
            align="center"
          >
            <Headline size="medium" margin="none" strong>
              {title}
            </Headline>
            <Label className="post-feed-item--subtitle">
              {subtitle}
            </Label>
          </Box>
          <Box full>
            {sections && sections.map((item, i) =>
              <SectionLayoutRenderer
                key={i}
                section={item}
              />
            )}
          </Box>
        </Box>
      </WithLoading>
    );
  }
}

function mapStateToProps(state) {
  const { post, error, request } = state.posts;
  return {
    post,
    error,
    request
  };
}

export default connect(mapStateToProps)(PostPage);
