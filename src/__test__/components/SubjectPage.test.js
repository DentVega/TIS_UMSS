import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import SubjectPage from '../../pages/materias/SubjectsPage';

describe('<SubjectPage/>', () => {
  test('Render del componente SubjectPage', () => {
    const componente = shallow(
      <ProviderMock>
        <SubjectPage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
