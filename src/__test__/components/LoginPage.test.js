import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import LoginPage from '../../pages/LoginPage';

describe('<LoginPage/>', () => {
  test('Render del componente LoginPage', () => {
    const componente = shallow(
      <ProviderMock>
        <LoginPage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
