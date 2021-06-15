import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return <Wrapper>
      <div>
        <h1>Better Filters for Kijiji</h1>
        <p>{"super-granular search diameters + at-a-glance attributes & photos"}</p>
      </div>
    </Wrapper>;
};
const Wrapper = styled.div`
width:100%;
height:var(--header-height);
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
