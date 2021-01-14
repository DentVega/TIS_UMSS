import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import NewMateria from '../../pages/materias/NewMateria';

describe('<NewMateria/>', () => {
  test('Render del componente NewMateria', () => {
    const componente = shallow(
      <ProviderMock>
        <NewMateria/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
