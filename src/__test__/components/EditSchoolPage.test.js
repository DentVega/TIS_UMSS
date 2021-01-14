import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import EditSchoolPage from '../../pages/schools/EditSchoolPage';

describe('<EditSchoolPage/>', () => {
  test('Render del componente EditSchoolPage', () => {
    const componente = shallow(
      <ProviderMock>
        <EditSchoolPage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
