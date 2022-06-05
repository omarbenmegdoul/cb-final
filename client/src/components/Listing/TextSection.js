import React from 'react';
import styled from 'styled-components';
import StarHideControls from './StarHideControls';
const TextSection = (props) => {
    const desc =
        1 + props.description.indexOf('<p>')
            ? props.description
            : props.description
                  .split('\n')
                  .filter((line) => line !== '')
                  .map((line) => `<p>${line}</p>`)
                  .join('');

    return (
        <TextWrapper>
            <DescQuoteWrapper>
                <div>
                    {props.map.mapAddress} | {props.timeposted}
                </div>
                <StarHideControls {...props} />
            </DescQuoteWrapper>
            <DescQuoteWrapper>
                <CurlyQuote>{'Description'}</CurlyQuote>
                <Description>
                    {/* TODO-high research alternative to dangerouslySetInnerHTML */}
                    <div
                        dangerouslySetInnerHTML={{
                            __html: desc.split('style=').join('='),
                        }}
                    ></div>
                </Description>
            </DescQuoteWrapper>
        </TextWrapper>
    );
};
const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border-radius: 5px 5px 0px 0px;
`;

const CurlyQuote = styled.div`
    position: relative;
    font-size: 1.2em;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
`;

const Description = styled.div`
    & a {
        text-decoration: underline;
    }
    font-weight: 300;
    overflow-wrap: anywhere;
    line-height: 1.5em;
    background-color: var(--black);
    border-radius: 5px;
    width: calc(100% - 100px);
    max-height: 150px;
    overflow-y: auto;
    margin: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    & > div {
        margin: auto;
    }
    & p {
        line-height: 1.4em;
    }
    & p:not(:last-child) {
        margin-bottom: 0.75em;
    }
`;

const DescQuoteWrapper = styled.div`
    max-width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding: 5px;
`;

export default TextSection;
