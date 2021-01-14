import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import HomeDefault from '../../pages/homeDefault/HomeDefault';

describe('<HomeDefault/>', () => {
  test('Render del componente Home default', () => {
    const componente = shallow(
      <ProviderMock>
        <HomeDefault/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
