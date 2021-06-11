import React from 'react';
import styled from 'styled-components';
import FilterContext from '../Context/FilterContext';
import {
    attributeDisplay,
    keyGroupings,
    prettyKeyGroupings,
} from '../Filters/FilterConfig';
import Sidebar from './Sidebar';
const QuickControls = ({ Props }) => {
    const { attrHidingSettings, attrHidingSettingsDispatch } =
        React.useContext(FilterContext);
        console.log(`❗ QuickControls.js:13 'attrHidingSettings'`,attrHidingSettings);
    return (
        <Sidebar>
            <h2>Display attributes:</h2>
            {Object.keys(prettyKeyGroupings).map((key) => {
                const selected = !attrHidingSettings[key];
                return (
                    <button
                        onClick={() => {
                            const action = {
                                type: 'one',
                                key: key,
                                value: selected
                            };
                            attrHidingSettingsDispatch(action);
                        }}
                        className={`attribute-selection fat ${
                            selected ? 'selected' : 'excluded'
                        }`}
                    >
                        {prettyKeyGroupings[key]}
                    </button>
                );
            })}
        </Sidebar>
    );
};

export default QuickControls;
