import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import UserAddClasses from '../../pages/additionalClass/UserAddClasses';

describe('<UserAddClasses/>', () => {
  test('Render del componente UserAddClasses', () => {
    const componente = shallow(
      <ProviderMock>
        <UserAddClasses/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
