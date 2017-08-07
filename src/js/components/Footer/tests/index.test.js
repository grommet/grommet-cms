import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import Footer from '../index';
import props from './__mocks__/footerProps';

describe('<Footer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <Footer {...props} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
