import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import EditarMateria from '../../pages/materias/EditarMateria';

describe('<EditarMateria/>', () => {
  test('Render del componente EditarMateria', () => {
    const componente = shallow(
      <ProviderMock>
        <EditarMateria/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
