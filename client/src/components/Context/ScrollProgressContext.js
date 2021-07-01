import React from 'react';
const ScrollContext = React.createContext({})
export const ScrollProvider = ({children}) => {
const [scrollProgress, setScrollProgress] = React.useState(0);
return (
  <ScrollContext.Provider value={{
    scrollProgress,
    setScrollProgress,
  }}>
    {children}
  </ScrollContext.Provider>
)};
export default ScrollContext;