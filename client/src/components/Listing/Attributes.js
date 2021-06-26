import React from 'react';
import { deJSONizeValue } from '../../utils';
import FilterContext from '../Context/FilterContext';
import {
  attributeDisplay,
  keyGroupings, prettyKeyGroupings,
  specialAttributePrettyize
} from '../Filters/FilterConfig';
const valueIsBinary = (x) => {
  return [0, 1].includes(parseInt(x));
};

const Attributes = (props) => {
  const { attrHidingSettings } = React.useContext(FilterContext);
  return Object.keys(keyGroupings).map((key) => {
      if (attrHidingSettings[key]) {
          return null;
      }
      const expandedProps = { ...props, group: key };
      return <AttributeGroup {...expandedProps} />;
  });
};

const AttributeGroup = (props) => {
  return (
      <div className="rounded-container-with-label lite">
          <span className="filter-name">
              {prettyKeyGroupings[props.group]}
          </span>
          {keyGroupings[props.group].map((key) => {
              const val = props[key];
              const className =
                  'attribute-selection ' +
                  (!valueIsBinary(deJSONizeValue(val))
                      ? ''
                      : parseInt(deJSONizeValue(val)) === 0
                      ? 'excluded'
                      : 'selected');
              return (
                  <div className={className}>
                      {valueIsBinary(deJSONizeValue(val))
                          ? attributeDisplay[key].pretty
                          : attributeDisplay[key].pretty +
                            ': ' +
                            (attributeDisplay[key].prettyValues[val] ||
                                specialAttributePrettyize(key, val))}
                  </div>
              );
          })}
      </div>
  );
};

export default Attributes;