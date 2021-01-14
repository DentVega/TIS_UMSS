import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import NewSchoolPage from '../../pages/schools/NewSchoolPage';

describe('<NewSchoolPage/>', () => {
  test('Render del componente NewSchoolPage', () => {
    const componente = shallow(
      <ProviderMock>
        <NewSchoolPage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
