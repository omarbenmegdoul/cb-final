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
      setAllowedListings(combinedListingsBySelectedSubdivisions);
  }, [selectedSubdivisions])
  return (
    <SubdivisionContext.Provider
        value={{
            selectedSubdivisions,
            setSelectedSubdivisions,
            subdivisionData,
            setSubdivisionData,
            allowedListings
        }}
    >
        {children}
    </SubdivisionContext.Provider>
);}

export default SubdivisionContext;