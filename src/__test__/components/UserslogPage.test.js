import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import UserslogPage from '../../pages/UserslogPage';

describe('<UserslogPage/>', () => {
  test('Render del componente UserslogPage', () => {
    const componente = shallow(
      <ProviderMock>
        <UserslogPage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
