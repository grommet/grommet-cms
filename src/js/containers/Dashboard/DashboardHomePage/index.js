import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import { PageHeader, PostDashboardList, WithLoading, NoneFound } from 'grommet-cms/components';
import * as actionCreators from './actions';

export class DashboardHomePage extends Component {
  constructor() {
    super();
    this.onSelectItem = this.onSelectItem.bind(this);
  }
  componentWillMount() {
    this.props.actions.getData();
  }
  onSelectItem(_, index) {
    const { _id: id } = this.props.posts[index];
    this.context.router.push(`/dashboard/post/${id}`);
  }
  render() {
    const { request, posts } = this.props;
    return (
      <WithLoading fullHeight isLoading={request}>
        <Box 
          primary 
          direction="column"
          full="horizontal"
          style={{ maxHeight: 'calc(100vh - 80px)' }}
        >
          <PageHeader
            title="Recently Updated Pages"
          />
          {posts.length ?
            <PostDashboardList
              showControls={false}
              onMenuItemClick={this.onSelectItem}
              list={posts}
            />
          :
            <NoneFound />
          }
        </Box>
      </WithLoading>
    );
  }
};

DashboardHomePage.contextTypes = {
  router: PropTypes.object.isRequired
};

DashboardHomePage.propTypes = {
  actions: PropTypes.objectOf(
    PropTypes.func
  )
};

function mapStateToProps(state, props) {
  return {
    posts: state.dashboardHomepage.data,
    request: state.dashboardHomepage.request
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      actionCreators,
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHomePage);
