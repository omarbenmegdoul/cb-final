import React from 'react';

const SubdivisionContext = React.createContext({});

export const SubdivisionProvider = ({ children }) => {
    const [subdivisionData, setSubdivisionData] = React.useState([]);
    const [selectedSubdivisions, setSelectedSubdivisions] = React.useState([]);
    const [allowedListings, setAllowedListings] = React.useState(null);
    React.useEffect(() => {
        const combinedListingsBySelectedSubdivisions =
            selectedSubdivisions.reduce((accum, subd) => {
                return [...accum, ...subdivisionData[subd]];
            }, []);
        console.log(
            '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>Context>SubdivisionsContext.js:14 "subdivisionData"',
            subdivisionData
        );
        console.log(
            '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>Context>SubdivisionsContext.js:18 "Object.values(subdivisionData).reduce((accum, element"=>accum+element.length,0)',
            Object.values(subdivisionData).reduce(
                (accum, element) => accum + element.length,
                0
            )
        );
        setAllowedListings(combinedListingsBySelectedSubdivisions);
    }, [selectedSubdivisions]);
    return (
        <SubdivisionContext.Provider
            value={{
                selectedSubdivisions,
                setSelectedSubdivisions,
                subdivisionData,
                setSubdivisionData,
                allowedListings,
            }}
        >
            {children}
        </SubdivisionContext.Provider>
    );
};

export default SubdivisionContext;
