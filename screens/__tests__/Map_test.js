import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Map from '../../components/Map.js';

it('renders correctly', () => {
    const tree = renderer.create(<Map>Snapshot test</Map>).toJSON();
    expect(tree).toMatchSnapshot();
});
