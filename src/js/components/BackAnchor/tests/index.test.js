import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { spy } from 'sinon';
import BackAnchor from '../index';
import props from './__mocks__/backAnchorMocks';

describe('<BackAnchor />', () => {
  it('should render with default props', () => {
    const mockOnClick = spy();
    const wrapper = shallow(
      <BackAnchor
        {...props}
        onClick={mockOnClick}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
