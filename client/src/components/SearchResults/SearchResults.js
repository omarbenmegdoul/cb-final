import React from 'react';
import styled from 'styled-components';
import Listing from '../Listing/Listing.js';
import FilterContext from '../Context/FilterContext.js';
import SubdivisionContext from '../Context/SubdivisionsContext.js';

const SearchResults = () => {
    const { searchResults, collapsedFilterControls } =
        React.useContext(FilterContext);
      const { allowedListings} =
        React.useContext(SubdivisionContext);
    const scrollAnchor = React.useRef(null);
    React.useEffect(() => {
        scrollAnchor.current.scrollIntoView({ behavior: 'smooth' });
    }, [searchResults]);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entryForWhichToLoadMap, currentEntryIndex) => {
                    if (entryForWhichToLoadMap.intersectionRatio <= 0) {
                        return;
                    }
                    
                    const listingId =
                        entryForWhichToLoadMap.target.id.split('listing_')[1];
                    const map = document
                        .getElementById(`${listingId}_map`)
                        .querySelector('iframe');
                    map.src = map.dataset.src;
                    const iframes = Array.from(
                        document.querySelectorAll('iframe')
                    ).map((iframe) => iframe.src);
                    console.log(`❗ SearchResults.js:30 'iframes'`, iframes);
                    const entriesForWhichToLoadImages = entries.filter(
                        (entry, index) => {
                            return index < currentEntryIndex + 5;
                        }
                    );
                    console.log(
                        `❗ SearchResults.js:31 'entriesForWhichToLoadImages'`,
                        entriesForWhichToLoadImages
                    );
                    entriesForWhichToLoadImages.forEach((entry) => {
                        Array.from(
                            entry.target.querySelectorAll(
                                '.defer-img-display img'
                            )
                        ).forEach((img) => (img.src = img.dataset.src));
                        entry.target.querySelector(".defer-img-display")?.classList?.remove("defer-img-display")


                        Array.from(
                            document.querySelectorAll('.full-img-wrapper')
                        )
                            .filter((node) => node.id.includes(listingId + '_'))
                            .forEach((node) => {
                                const img = node.querySelector('img');
                                img.src = img.dataset.src;
                                node.classList.remove(".full-img-wrapper")
                            });
                    });

                    observer.unobserve(entryForWhichToLoadMap.target);
                });
            },
            { rootMargin: '100% 0px 100% 0px', threshold: 0.0001 }
        );
        document.querySelectorAll('.listing-observe').forEach((entry) => {
            observer.observe(entry);
        });

        return () => {
            observer.disconnect();
        };
    }, []);
    return (
        searchResults && (
            <MetaWrapper
                ref={scrollAnchor}
                className={collapsedFilterControls ? 'expanded' : ''}
            >
                <h1>{`${
                    searchResults.filter(
                        (sR) =>
                            !allowedListings || allowedListings.includes(sR.id)
                    ).length
                } found`}</h1>
                <Wrapper>
                    {searchResults
                        .filter(
                            (sR) =>
                                !allowedListings ||
                                allowedListings.includes(sR.id)
                        )
                        .map((sR, index) => {
                            const props = { ...sR, listingIndex: index };
                            return <Listing {...props}></Listing>;
                        })}
                    {/* <Listing {...searchResults[0]}/> */}
                </Wrapper>
            </MetaWrapper>
        )
    );
};

const Wrapper = styled.div`
    width: 90%;
`;
const MetaWrapper = styled.div`
    background-color: var(--blackPurple);
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.expanded {
        width: calc(70% - 50px);
    }
`;
export default SearchResults;
