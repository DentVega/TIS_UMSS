import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import GroupsPage from '../../pages/grupos/GroupsPage';

describe('<GroupsPage/>', () => {
  test('Render del componente GroupsPage', () => {
    const componente = shallow(
      <ProviderMock>
        <GroupsPage/>
      </ProviderMock>
    );
    expect(componente.length).toEqual(1);
  });
});
