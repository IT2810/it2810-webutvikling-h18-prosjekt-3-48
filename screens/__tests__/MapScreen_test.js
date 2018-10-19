import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MapScreen from '../MapScreen.js';

it('renders correctly', () => {
    const tree = renderer.create(<MapScreen>Snapshot test</MapScreen>).toJSON();
    expect(tree).toMatchSnapshot();
});
