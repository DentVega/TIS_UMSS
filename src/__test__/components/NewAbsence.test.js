import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import NewAbsence from '../../pages/userAbsences/NewAbsence';


describe('<NewAbsence/>', () => {
  test('Render del componente NewAbsence', () => {
    const componente = shallow(
      <ProviderMock>
        <NewAbsence/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});

