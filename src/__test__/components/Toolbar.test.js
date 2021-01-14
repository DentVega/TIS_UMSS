import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import Toolbar from '@material-ui/core/Toolbar';

describe('<Toolbar/>', () => {
  test('Render del componente Toolbar', () => {
    const componente = shallow(
      <ProviderMock>
        <Toolbar/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
