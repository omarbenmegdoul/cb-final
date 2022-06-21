import React from 'react';
import styled from 'styled-components';
import Listing from '../Listing/Listing.js';
import FilterContext from '../Context/FilterContext.js';
import SubdivisionContext from '../Context/SubdivisionsContext.js';
import ScrollContext from '../Context/ScrollProgressContext.js';

const SearchResults = () => {
    const {
        searchResults,
        collapsedFilterControls,
        searchPending,
        starAndBlacklistSettings,
    } = React.useContext(FilterContext);
    const { allowedListings } = React.useContext(SubdivisionContext);
    const scrollAnchor = React.useRef(null);
    const [listingObserver, setListingObserver] = React.useState(null);
    const { scrollProgress, setScrollProgress } =
        React.useContext(ScrollContext);

    React.useEffect(() => {
        scrollAnchor.current.scrollIntoView({ behavior: 'smooth' });
    }, [searchPending]);

    const validResultsCount = searchResults?.filter(
        (sR) => !allowedListings.length || allowedListings.includes(sR.id)
    )?.length;

    const filterStarredAndHidden = (listing) => {
        const conditions = {};
        if (starAndBlacklistSettings.excludeUnstarred) {
            conditions.excludeUnstarred = listing.starred;
        }
        if (starAndBlacklistSettings.excludeStarred) {
            conditions.excludeStarred = !listing.starred;
        }
        if (starAndBlacklistSettings.excludeUnhidden) {
            conditions.excludeUnhidden = listing.hidden;
        }
        if (starAndBlacklistSettings.excludeHidden) {
            conditions.excludeUnhidden = !listing.hidden;
        }
        return Object.values(conditions).length
            ? Object.values(conditions).every((x) => !!x)
            : true;
    };

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                console.log(observer);
                console.log(entries);
                entries.forEach((entryForWhichToLoadMap, currentEntryIndex) => {
                    if (!entryForWhichToLoadMap.intersectionRatio) {
                        return;
                    } else {
                        console.log(
                            `❗ SearchResults.js:27 'entryForWhichToLoadMap.target'`,
                            entryForWhichToLoadMap.target
                        );
                    }

                    const listingId =
                        entryForWhichToLoadMap.target.id.split('listing_')[1];
                    // TODO REIMPLEMENT MAPS
                    // const map = document
                    //     .getElementById(`${listingId}_map`)
                    //     .querySelector('iframe');
                    // map.src = map.dataset.src;

                    //for logging
                    const iframes = Array.from(
                        document.querySelectorAll('iframe')
                    ).map((iframe) => iframe.src);
                    // console.log(`❗ SearchResults.js:30 'iframes'`, iframes);

                    const entriesForWhichToLoadImages = entries.filter(
                        (entry, index) => {
                            return index < currentEntryIndex + 10;
                        }
                    );
                    // console.log(
                    //     `❗ SearchResults.js:31 'entriesForWhichToLoadImages'`,
                    //     entriesForWhichToLoadImages
                    // );

                    entriesForWhichToLoadImages.forEach((entry) => {
                        Array.from(
                            entry.target.querySelectorAll(
                                '.defer-img-display img:not(.map-marker)'
                            )
                        ).forEach((img) => (img.src = img.dataset.src));
                        entry.target
                            .querySelector('.defer-img-display')
                            ?.classList?.remove('defer-img-display');

                        Array.from(
                            document.querySelectorAll('.full-img-wrapper')
                        )
                            .filter((node) => node.id.includes(listingId + '_'))
                            .forEach((node) => {
                                const img = node.querySelector('img');
                                img.src = img.dataset.src;
                                node.classList.remove('.full-img-wrapper');
                            });
                    });

                    observer.unobserve(entryForWhichToLoadMap.target);
                    const seenListingIndex = parseInt(
                        entryForWhichToLoadMap.target.dataset.index
                    );
                    console.log(
                        `❗ SearchResults.js:89 'seenListingIndex'`,
                        seenListingIndex
                    );
                    setScrollProgress((previousState) => {
                        return previousState >= seenListingIndex
                            ? previousState
                            : seenListingIndex;
                    });
                });
            },
            {
                rootMargin: '100% 0px 100% 0px',
                threshold: [0.0001, 0.25, 0.5, 0.75, 1],
            }
        );
        setListingObserver(observer);
        return () => {
            observer.disconnect();
        };
    }, []);
    // console.log(
    //     '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>SearchResults>SearchResults.js:148 "filtered search results"',
    //     searchResults
    //         .filter((sR) => !allowedListings || allowedListings.includes(sR.id))
    //         .filter((sR, index) => {
    //             return (
    //                 index < scrollProgress + 15 && filterStarredAndHidden(sR)
    //             );
    //         })
    // );
    // console.log(
    //     '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>SearchResults>SearchResults.js:143 "allowedListings"',
    //     allowedListings
    // );
    console.log(
        '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>SearchResults>SearchResults.js:147 "searchResults"',
        searchResults
    );
    const results = searchResults
        ?.filter((sR) => {
            return !allowedListings.length || allowedListings.includes(sR.id);
        })
        ?.filter((sR, index) => {
            return index < scrollProgress + 15;
            //  && filterStarredAndHidden(sR);
        });
    console.log(
        '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>SearchResults>SearchResults.js:159 "results"',
        results
    );
    console.log(
        '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>SearchResults>SearchResults.js:163 "searchPending || searchResults"',
        searchPending || searchResults
    );
    console.log(
        '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>SearchResults>SearchResults.js:167 "validResultsCount"',
        validResultsCount
    );
    return (
        (searchPending || searchResults) && (
            <MetaWrapper
                ref={scrollAnchor}
                className={collapsedFilterControls ? 'expanded' : ''}
                testId="abcde"
            >
                <h1>
                    {searchPending
                        ? 'Searching...'
                        : validResultsCount
                        ? `${validResultsCount} results found`
                        : 'No results found'}
                </h1>
                <Wrapper>
                    {!searchPending &&
                        results.map((sR, index) => {
                            const props = {
                                ...sR,
                                listingIndex: index,
                                key: index,
                                observer: listingObserver,
                            };
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
    min-height: 100vh;
    & h1 {
        margin: 1em 0 0;
    }
`;
export default SearchResults;
