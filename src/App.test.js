import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });


/**
 * Factory function to create a shallow wrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 */

const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />)
  if (state) wrapper.setState(state);
  return wrapper
};

/**
 * Function to return ShallowWrapper containing nodes with the given
 * data value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} value - Value of data-test attribute
 * @returns {ShallowWrapper}
 */

 const findByTestAttr = (wrapper, value) => {
   return wrapper.find(`[data-test='${value}']`)
 };

it('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

it('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'button');
  expect(button.length).toBe(1);
});

it('renders the decrement button', () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  expect(decrementButton.length).toBe(1);
})

it('renders counter display', () => {
  const wrapper = setup();
  const display = findByTestAttr(wrapper, 'display');
  expect(display.length).toBe(1);
});

it('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0)
});

it('clicking button increments counter display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, 'button');
  button.simulate('click');

  const display = findByTestAttr(wrapper, 'display');
  expect(display.text()).toContain(counter + 1);
});

it('clicking decrement button lowers counter', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  const display = findByTestAttr(wrapper, 'display')
  expect(display.text()).toContain(counter - 1);
});

describe('counter is zero and decrement is clicked', () => {
  let wrapper

  beforeEach(() => {
    wrapper = setup();

    const decrementButton = findByTestAttr(wrapper, 'decrement-button');
    decrementButton.simulate('click');
    wrapper.update();
  })

  it('deoes not decrement below zero', () => {
    const decrementButton = findByTestAttr(wrapper, 'decrement-button');
    decrementButton.simulate('click');

    const display = findByTestAttr(wrapper, 'display')
    expect(display.text()).toContain(0);
  });

  it('displays a warning if trying to decrement below zero', () => {
    const warning = findByTestAttr(wrapper, 'warning');
    expect(warning.text()).not.toBe('');
  });
});

it('incrementing removes the warning', () => {
  const wrapper = setup();
  const warning = findByTestAttr(wrapper, 'warning');
  const button = findByTestAttr(wrapper, 'button');
  button.simulate('click');

  expect(warning.text()).toBe('');
})
