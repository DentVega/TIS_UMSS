import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import Reports from '../../pages/reports/Reports';

describe('<Reports/>', () => {
  test('Render del componente Reports', () => {
    const componente = shallow(
      <ProviderMock>
        <Reports/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
