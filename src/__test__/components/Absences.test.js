import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import Absences from '../../pages/userAbsences/Absences';

describe('<Absences/>', () => {
  test('Render del componente Absences', () => {
    const componente = shallow(
      <ProviderMock>
        <Absences/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
