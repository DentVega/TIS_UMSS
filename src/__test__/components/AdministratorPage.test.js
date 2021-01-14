import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import AdministratorPage from '../../pages/AdministratorPage';

describe('<AdministratorPage/>', () => {
  test('Render del componente AdministratorPage', () => {
    const componente = shallow(
      <ProviderMock>
        <AdministratorPage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
