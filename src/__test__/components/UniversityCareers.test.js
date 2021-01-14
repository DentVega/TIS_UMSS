import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import UniversityCareers from '../../pages/universityCareers/UniversityCareers';

describe('<UniversityCareers/>', () => {
  test('Render del componente UniversityCareers', () => {
    const componente = shallow(
      <ProviderMock>
        <UniversityCareers/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
