import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import RolePage from '../../pages/role/RolePage';

describe('<RolePage/>', () => {
  test('Render del componente RolePage', () => {
    const componente = shallow(
      <ProviderMock>
        <RolePage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
