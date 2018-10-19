import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SearchScreen from '../SearchScreen.js';

it('renders correctly', () => {
    const tree = renderer.create(<SearchScreen>Snapshot test</SearchScreen>).toJSON();
    expect(tree).toMatchSnapshot();
});
