import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import AccountPage from '../../pages/AccountPage';


describe('<AccountPage/>', () => {
  test('Render del componente AccountPage', () => {
    const componente = shallow(
      <ProviderMock>
        <AccountPage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
