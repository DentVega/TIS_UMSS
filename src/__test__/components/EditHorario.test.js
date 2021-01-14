import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import EditHorario from '../../pages/horarios/EditHorario';

describe('<EditHorario/>', () => {
  test('Render del componente EditHorario', () => {
    const componente = shallow(
      <ProviderMock>
        <EditHorario/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
