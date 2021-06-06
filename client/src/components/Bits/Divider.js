import React from 'react';
import styled from 'styled-components';
const Divider = ({ vertical = false, margin = true }) => {
    return <Wrapper margin className={vertical?"vertical":"horizontal"}></Wrapper>;
};
const Wrapper = styled.div`
border:1px var(--white) solid;

margin:${props=>props.margin?"10px":"0"};

&.horizontal {
  width: 90%;
  border-width:1px 0px 0px 0px;
}
&.vertical {
  height: 90%;
  border-width:0px 1px 0px 0px;
}

`;

export default Divider;
