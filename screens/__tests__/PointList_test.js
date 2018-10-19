import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PointList from '../../components/PointList.js';

it('renders correctly', () => {
    const tree = renderer.create(<PointList>Snapshot test</PointList>).toJSON();
    expect(tree).toMatchSnapshot();
});
