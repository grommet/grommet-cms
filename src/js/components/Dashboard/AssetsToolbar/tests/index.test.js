import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Toolbar from '../toolbar';
import AssetsToolbar from '../index';

describe('<AssetsToolbar />', () => {
  const wrapper = shallow(
    <AssetsToolbar onClick={jest.fn()} />
  );

  it('should create a snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should have a Toolbar component', () => {
    expect(wrapper.find(Toolbar).length).toBe(1);
  });

  it('should have a Button component', () => {
    expect(wrapper.find(Button).length).toBe(1);
  });

  it('should have a Box component', () => {
    expect(wrapper.find(Box).length).toBe(1);
  });
});
