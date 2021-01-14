import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import NewHorario from '../../pages/horarios/NewHorario';

describe('<NewHorario/>', () => {
  test('Render del componente NewHorario', () => {
    const componente = shallow(
      <ProviderMock>
        <NewHorario/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
