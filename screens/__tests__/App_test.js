import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../App.js';

it('renders correctly', () => {
    const tree = renderer.create(<App>Snapshot test</App>).toJSON();
    expect(tree).toMatchSnapshot();
});
