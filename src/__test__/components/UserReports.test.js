import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import UserReports from '../../pages/reports/UserReports';

describe('<UserReports/>', () => {
  test('Render del componente UserReports', () => {
    const componente = shallow(
      <ProviderMock>
        <UserReports/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
