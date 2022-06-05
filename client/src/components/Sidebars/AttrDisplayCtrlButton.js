import React from 'react';
import FilterContext from '../Context/FilterContext';
import {
    prettyKeyGroupings,
    prettyStarWhitelistGroupings,
} from '../Filters/FilterConfig';
const AttrDisplayCtrlButton = ({ group }) => {
    const { attrHidingSettings, attrHidingSettingsDispatch } =
        React.useContext(FilterContext);
    const selected = !attrHidingSettings[group];
    return (
        <button
            onClick={() => {
                const action = {
                    type: 'selectedOne',
                    key: group,
                    value: selected,
                };
                attrHidingSettingsDispatch(action);
            }}
            className={`attribute-selection fat ${
                selected ? 'selected' : 'excluded'
            }`}
        >
            {prettyKeyGroupings[group]}
        </button>
    );
};

const StarBlacklistControlButton = ({ group }) => {
    const { starAndBlacklistSettings, starAndBlacklistSettingsDispatch } =
        React.useContext(FilterContext);

    return (
        <button
            onClick={() => {
                const action = {
                    type: prettyStarWhitelistGroupings[group].type,
                };
                starAndBlacklistSettingsDispatch(action);
            }}
            className={`attribute-selection fat ${
                starAndBlacklistSettings[group] ? 'selected' : 'excluded'
            }`}
        >
            {prettyStarWhitelistGroupings[group].nice}
        </button>
    );
};

export { AttrDisplayCtrlButton, StarBlacklistControlButton };
