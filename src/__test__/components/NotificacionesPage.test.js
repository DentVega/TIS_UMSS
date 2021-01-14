import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import NotificacionesPage from '../../pages/NotificacionesPage';


describe('<NotificacionesPage/>', () => {
  test('Render del componente NotificacionesPage', () => {
    const componente = shallow(
      <ProviderMock>
        <NotificacionesPage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
