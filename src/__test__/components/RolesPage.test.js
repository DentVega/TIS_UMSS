import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import RolesPage from '../../pages/role/RolesPage';

describe('<RolesPage/>', () => {
  test('Render del componente RolesPage', () => {
    const componente = shallow(
      <ProviderMock>
        <RolesPage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
