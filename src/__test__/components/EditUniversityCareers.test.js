import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import EditUniversityCareers from '../../pages/universityCareers/EditUniversityCareers';

describe('<Toolbar/>', () => {
  test('Render del componente EditUniversityCareers', () => {
    const componente = shallow(
      <ProviderMock>
        <EditUniversityCareers/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
