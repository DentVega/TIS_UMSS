import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import UserslogViewPage from '../../pages/userslog/UserslogViewPage';


describe('<UserslogViewPage/>', () => {
  test('Render del componente UserslogViewPage', () => {
    const componente = shallow(
      <ProviderMock>
        <UserslogViewPage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
