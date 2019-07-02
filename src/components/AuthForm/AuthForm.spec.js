// react library
import React from 'react';

// third-party library
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '../../store';

// component
import AuthForm from './';


describe('AuthForm component', () => {
  let wrapper;
  const props = {
    formType: 'login',
    onChangeFormState: jest.fn()
  }

  // beforeEach(() => {
  //  wrapper = shallow(
  //   // <Provider store={store}>
  //     {/* <MemoryRouter> */}
  //       <AuthForm { ...props } />
  //     {/* </MemoryRouter> */}
  //   // </Provider>
  //   )
  // })
  it('should render correctly', () => {
    wrapper = shallow(<AuthForm.WrappedComponent { ...props } />);
    // console.log(wrapper.debug());
    expect(toJson(wrapper)).toMatchSnapshot();
  })
})