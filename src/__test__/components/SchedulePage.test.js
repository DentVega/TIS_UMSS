import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import SchedulePage from '../../pages/horarios/SchedulePage';

describe('<SchedulePage/>', () => {
  test('Render del componente SchedulePage', () => {
    const componente = shallow(
      <ProviderMock>
        <SchedulePage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
