import React from 'react';
import classnames from 'classnames';
import { concatFullName, roundNumber } from '../../utils';
import styles from './styles.module.css';
import { CHECK_ICON, X_ICON } from '../../constants';
import { AppContext } from '../../AppContext';

const WinOrFail = (winnerId, selectId) => (
    winnerId === selectId
    ? <img className={styles.winnerIcon} alt="check mark" src={CHECK_ICON} />
    : <img className={styles.winnerIcon} alt="x mark" src={X_ICON} />
)

const Player = ({ details }) => {
    const fullName = concatFullName(details.first_name, details.last_name);
    const score = roundNumber(details.fppg);
    const { url } = details.images.default;
    const { id } = details;

    return (
        <AppContext.Consumer>
            {({ selectPlayer, winnerId, selectId }) => (
                <div className={classnames(styles.playerContainer, { [styles.disabled]: winnerId })} onClick={() => selectPlayer(id)}>
                    <img 
                        className={classnames(styles.image, { [styles.winnerSelected]: winnerId })}
                        src={url}
                        alt={fullName}
                    />
                    <span className={styles.name}>{fullName}</span>
                    
                    {/* show score only when a winner is determined */}
                    {winnerId && <span className={styles.score}>{score}</span>}

                    {/* render an icon for the winner/loser */}
                    {selectId === id ? WinOrFail(winnerId, id) : null}
                </div>
            )}
        </AppContext.Consumer>
    )
};

export default Player;