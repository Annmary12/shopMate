import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  const routes = wrapper.find('Routes');

  expect(routes.length).toBe(1);
});
