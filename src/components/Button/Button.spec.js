// react library
import React from 'react';

// third-party library
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

// component
import Button from './';

describe('Button component', () => {
  let wrapper;
  const props = {
    name: 'TestName',
    type: 'text',
    classes: 'TestClass'
  }

  beforeEach(() => {
   wrapper = mount(<Button {...props}/>)
  })
  it('should render button correctly', () => {
    const button = wrapper.find('button');

    expect(button.length).toBe(1);
    expect(button.props().type).toBe('text');
    expect(toJson(wrapper)).toMatchSnapshot();
  })
})