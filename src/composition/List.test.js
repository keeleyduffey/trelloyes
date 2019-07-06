import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import renderer from 'react-test-renderer';
import STORE from '../store';


describe('Messages component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<List cards={STORE.lists} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<List cards={STORE.lists} />)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });

});
