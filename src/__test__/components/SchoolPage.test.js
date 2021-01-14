import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import SchoolPage from '../../pages/schools/SchoolPage';

describe('<SchoolPage/>', () => {
  test('Render del componente SchoolPage', () => {
    const componente = shallow(
      <ProviderMock>
        <SchoolPage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
