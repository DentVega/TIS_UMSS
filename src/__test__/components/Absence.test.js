import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import Absence from '../../pages/userAbsences/Absence';


describe('<Absence/>', () => {
  test('Render del componente Absence', () => {
    const componente = shallow(
      <ProviderMock>
        <Absence/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
