import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import NewGrupo from '../../pages/grupos/NewGrupos';

describe('<NewGrupo/>', () => {
  test('Render del componente NewGrupo', () => {
    const componente = shallow(
      <ProviderMock>
        <NewGrupo/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
