import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import PostFeedItem from '../index';
import props from './__mocks__/postFeedItemProps';

describe('<PostFeedItem />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <PostFeedItem {...props} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
