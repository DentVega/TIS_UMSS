import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import NewUniversityCareers from '../../pages/universityCareers/NewUniversityCareers';

describe('<NewUniversityCareers/>', () => {
  test('Render del componente NewUniversityCareers', () => {
    const componente = shallow(
      <ProviderMock>
       <NewUniversityCareers/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
