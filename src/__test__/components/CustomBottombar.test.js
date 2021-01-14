import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import CustomBottombar from '../../components/toolbar/CustomBottombar';

describe('<CustomBottomBar/>', () => {
  test('Render el componente CustomBottombar', () => {
    const bottomBar = shallow(
      <ProviderMock>
        <CustomBottombar/>
      </ProviderMock>
    );
    expect(bottomBar.length).toEqual(1);
  });
});
