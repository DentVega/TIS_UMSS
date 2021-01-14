import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import UsersList from '../../pages/reports/UsersList';

describe('<UsersList/>', () => {
  test('Render del componente UsersList', () => {
    const componente = shallow(
      <ProviderMock>
        <UsersList/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
