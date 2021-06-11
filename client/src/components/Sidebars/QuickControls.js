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
    const {
        attrHidingSettings,
        attrHidingSettingsDispatch,
        collapsedFilterControls,
        setCollapsedFilterControls,
    } = React.useContext(FilterContext);
    console.log(
        `❗ QuickControls.js:13 'attrHidingSettings'`,
        attrHidingSettings
    );
    return (
        <Sidebar>
            <Heading>
                <h2>View settings</h2>
                <h2
                    onClick={() =>
                        setCollapsedFilterControls(!collapsedFilterControls)
                    }
                >
                    {collapsedFilterControls ? '\u9650' : '\u9668'}
                </h2>
            </Heading>
            {Object.keys(prettyKeyGroupings).map((key) => {
                const selected = !attrHidingSettings[key];
                return (
                    <button
                        onClick={() => {
                            const action = {
                                type: 'selectedOne',
                                key: key,
                                value: selected,
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

const Heading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transition:all 0.1s  ease-out;
    /* background-color:#f00; */
    width:15vh;
    min-width:100%;
    white-space:no-wrap;
    & h2 {
      white-space:no-wrap;
      margin:0 5px;
    }
`;

export default QuickControls;
