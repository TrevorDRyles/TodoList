import React from 'react';
import renderer from 'react-test-renderer';
// import TodoAdd from './TodoAdd';
import TodoAdd from "./TodoAdd";

test('renders without crashing', () => {
    const component = renderer.create(<TodoAdd/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});