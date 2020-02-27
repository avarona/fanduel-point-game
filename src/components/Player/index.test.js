import React from 'react';
import { mount } from 'enzyme';
import Player from './';
import { AppContextProvider } from '../../AppContext';
import * as Mocks from '../../mocks';

describe('Player Component', () => {
    describe('with winnerId as `undefined`', () => {
        const context = { selectPlayer: jest.fn(), winnerId: undefined };
        const wrapper = mount(
            <AppContextProvider value={context}>
                <Player details={Mocks.playerDetails} />
            </AppContextProvider>
        );

        it('renders', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        it('selectPlayer is called when image is clicked', () => {
            wrapper.find('img').simulate('click');
            expect(context.selectPlayer).toHaveBeenCalled();
        });

    });

    describe('with winnerId as `1`', () => {
        const context = { selectPlayer: jest.fn(), winnerId: 1 };
        const wrapper = mount(
            <AppContextProvider value={context}>
                <Player details={Mocks.playerDetails} />
            </AppContextProvider>
        );

        it('renders', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
