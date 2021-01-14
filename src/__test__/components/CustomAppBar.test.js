import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import CustomAppBar from '../../components/appBar/CustomAppBar';

describe('<CustomAppBar/>', () => {
  test('Render del componente CustomAppBar', () => {
    const appBar = shallow(
      <ProviderMock>
        <CustomAppBar/>
      </ProviderMock>
    );
    expect(appBar.length).toEqual(1);
  });
});
