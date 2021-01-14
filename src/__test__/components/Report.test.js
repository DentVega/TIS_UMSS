import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import Report from '../../pages/reports/Report';

describe('<Report/>', () => {
  test('Render del componente Report', () => {
    const componente = shallow(
      <ProviderMock>
        <Report/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
