import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return <Wrapper>
      <div>
        <h1>Better Filters for Kijiji</h1>
        <p>{"super-granular search diameters \u22C5 at-a-glance attributes & photos \u22C5 no duplicates \u22C5 no apartment swaps \u22C5 no offices"}</p>
      </div>
    </Wrapper>;
};
const Wrapper = styled.div`
width:100%;
height:100px;
background-color:var(--black);
display:flex;
flex-direction:row;
justify-content:flex-start;
align-items:center;
padding:20px;
&>div {
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  height:100%;
}
`;
export default Header;
