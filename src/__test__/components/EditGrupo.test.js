import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import EditGrupo from '../../pages/grupos/EditGrupo';

describe('<EditGrupo/>', () => {
  test('Render del componente EditGrupo', () => {
    const componente = shallow(
      <ProviderMock>
        <EditGrupo/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
