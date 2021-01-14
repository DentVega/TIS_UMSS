import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import HomePage from '../../pages/HomePage';

describe('<HomePage/>', () => {
  test('Render del componente HomePage', () => {
    const componente = shallow(
      <ProviderMock>
        <HomePage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
