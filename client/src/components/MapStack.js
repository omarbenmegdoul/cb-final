import React from 'react';
import styled from 'styled-components';
import SubdivisionContext from './Context/SubdivisionsContext';
import MapBgBlock from './Map';
import MapGrid from './MapGrid';
const MapStack = () => {
    const { selectedSubdivisions } = React.useContext(SubdivisionContext);
    const [showHeatMap, setShowHeatmap] = React.useState(false);
    // const handleFilterSave = () => {
    //     fetch;
    // };
    return (
        <>
            <MetaWrapper>
                <button>Save this area</button> &middot;{' '}
                <button>Save these filters</button> &middot;
                <button onClick={() => setShowHeatmap((prev) => !prev)}>{`${
                    showHeatMap ? 'Hide' : 'Show'
                } heatmap for filters`}</button>
                <Wrapper>
                    <MapGrid showHeatMap={showHeatMap} />
                    <MapBgBlock />
                </Wrapper>
            </MetaWrapper>
        </>
    );
};
const Wrapper = styled.div`
    position: relative;
    margin: 0;
    margin: 0 20px;
`;
const MetaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content:center; */
    align-items: center;
`;
export default MapStack;
