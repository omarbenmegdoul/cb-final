import React from 'react';
import styled from 'styled-components';
import FilterContext from '../Context/FilterContext';
import {
  attributeDisplay,
  keyGroupings,
  prettyKeyGroupings,
} from '../Filters/FilterConfig';
const AttrDisplayCtrlButton = ({ group }) => {
  
    const {
        attrHidingSettings,
        attrHidingSettingsDispatch,
        collapsedFilterControls,
        setCollapsedFilterControls,
    } = React.useContext(FilterContext);
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

export default AttrDisplayCtrlButton;
