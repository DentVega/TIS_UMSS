import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import CampusPage from '../../pages/users/CampusPage';

describe('<CampusPage/>', () => {
  test('Render del componente CampusPage', () => {
    const componente = shallow(
      <ProviderMock>
        <CampusPage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
