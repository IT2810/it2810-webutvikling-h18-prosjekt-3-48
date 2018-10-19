import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ListScreen from '../ListScreen.js';


it('renders correctly', () => {
    const tree = renderer.create(<ListScreen>Snapshot test</ListScreen>).toJSON();
    expect(tree).toMatchSnapshot();
});
