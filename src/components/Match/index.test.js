import React from 'react';
import { mount } from 'enzyme';
import Match from './';
import * as Mocks from '../../mocks';
import { AppContextProvider } from '../../AppContext';

describe('Match Component', () => {
    describe('renders', () => {
        it('with default props', () => {
            const context = { winnerId: undefined };
            const wrapper = mount(
                <AppContextProvider value={context}>
                    <Match players={Mocks.matchPlayers} />
                </AppContextProvider>
            );

            expect(wrapper.html()).toMatchSnapshot();
        });
    
        it('the `next` button when game is played', () => {
            const context = { winnerId: undefined };
            const wrapper = mount(
                <AppContextProvider value={context}>
                    <Match players={Mocks.matchPlayers} />
                </AppContextProvider>
            );

            expect(wrapper.html()).toMatchSnapshot();
        });
    
        it('the end game status when game finishes', () => {
            const context = { winnerId: 1, correctGuessCount: 10 };
            const wrapper = mount(
                <AppContextProvider value={context}>
                    <Match players={Mocks.matchPlayers} />
                </AppContextProvider>
            );

            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
