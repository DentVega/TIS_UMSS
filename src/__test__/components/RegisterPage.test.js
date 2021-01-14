import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import RegisterPage from '../../pages/users/RegistrationPage';

describe('<RegisterPage/>', () => {
  test('Render del componente RegisterPage', () => {
    const componente = shallow(
      <ProviderMock>
        <RegisterPage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
