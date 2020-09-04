import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './src/components/NavBar';

describe ('NavBar component', () => {

    it('renders navbar', () => {
       const wrapper = shallow(<NavBar/>);
  
       expect(wrapper.length).toEqual(1); 
    }); 
  });



describe('My Test Suite', () => {
    it('My Test Case', () => {
      expect(true).toEqual(true);
    });
  });
