import React from 'react';
import styled from 'styled-components';
import Divider from '../Bits/Divider';
import * as mapmarker from '../../map-marker-1.png';

const deJSONizeValue = (x)=>{
  const quoteWrapped = x[0]==='\u0022' && x[x.length-1]==='"';
  return quoteWrapped ? x.slice(1,x.length-1) : x
}

const valueIsBinary = (x)=>{return [0,1].includes(parseInt(x))}

const niceKeys = {
    accessiblewashroomsinsuite_s: 'Has accessible washroom',

    agreementtype_s: 'Agreement',

    airconditioning_s: 'A/C',

    areainfeet_i: 'Area',

    audioprompts_s: 'Audio Prompts',

    balcony_s: 'Balcony',

    barrierfreeentrancesandramps_s: 'Barrier-free Entrance & Ramps',

    bicycleparking_s: 'Bicycle Parking',

    braillelabels_s: 'Braille Labels',

    cabletv_s: 'Cable TV',

    concierge_s: 'Concierge',

    dateavailable_tdt: 'Date Available',

    dishwasher_s: 'Dishwasher',

    elevator_s: 'Elevator',

    forrentbyhousing_s: 'Leased By',

    fridgefreezer_s: 'Fridge & Freezer',

    furnished_s: 'Furnished',

    gym_s: 'Gym',

    heat_s: 'Heat Included',

    hydro_s: 'Hydro Included',

    internet_s: 'Internet Included',

    laundryinbuilding_s: 'Laundry room',

    laundryinunit_s: 'Laundry in unit',

    numberbathrooms_s: 'Bathrooms',

    numberbedrooms_s: 'Bedrooms',

    numberparkingspots_s: 'Parking Spots',

    petsallowed_s: 'Pets',

    pool_s: 'Pool',

    prc: 'Price',

    smokingpermitted_s: 'Smoking',

    storagelocker_s: 'Storage locker',

    twentyfourhoursecurity_s: '24/7 Security',

    unittype_s: 'Type',

    visualaids_s: 'Visual Aids',

    water_s: 'Water included',

    wheelchairaccessible_s: 'Wheelchair Accessible',

    yard_s: 'Yard',
};

const Listing = (props) => {
    return (
        <>
            {/* <p>
                {Object.keys(props).map((x) => {
                    return x + ' - ';
                })}
            </p>
            <p>-</p>
            <p>
                {Object.keys(props.cntxt).map((x) => {
                    return x + ' / ';
                })}
            </p>
            <p>-</p>
            <p>
                {Object.keys(props.cntxt.d).map((x) => {
                    return <p>{x + ':"",'}</p>;
                })}
            </p> */}
            <Wrapper>
                <h2>{`${props.title} \u22C5 $${
                    parseInt(props.cntxt.d.prc) / 100
                }`}</h2>
                <SubWrapper>
                  <TextWrapper>
                      <DescQuoteWrapper>
                          {props.cntxt.map.mapAddress} | {props.cntxt.timeposted}
                      </DescQuoteWrapper>
                      <DescQuoteWrapper>
                          <CurlyQuote>{'Description'}</CurlyQuote>
                          <Description>{props.cntxt.description}</Description>
                      </DescQuoteWrapper>
                  </TextWrapper>
                  <DataTray>
                      {Object.keys(props.cntxt.d).map((key) => {
                        const val = deJSONizeValue(props.cntxt.d[key])
                        console.log(`❗ Listing.js:125 'val' <${typeof val}>`,val);
                        return <RentalAttribute className={!valueIsBinary(val) ? "" : parseInt(val)===0 ? "false-binary-attribute" : "true-binary-attribute"}>
                              {valueIsBinary(val)?
                              niceKeys[key] :
                              niceKeys[key]+": "+val
                            }
                          </RentalAttribute>
                      })}
                  </DataTray>
                  <ThumbnailTray>
                      {props.cntxt.imgs.map((x) => (
                          <img src={x.href}></img>
                      ))}
                      <img className="map-marker" src="http://simpleicon.com/wp-content/uploads/map-marker-1.png" />
                  </ThumbnailTray>
                </SubWrapper>
            </Wrapper>
        </>
    );
};
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    background-color: var(--blackSecondary);
    border-radius:5px;
    padding:0 40px;
`;

const TextWrapper = styled.div`
    
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border-radius: 5px 5px 0px 0px;
`;
const DescQuoteWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding: 5px;
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
    background-color: var(--black);
    border-radius: 5px;
    width: calc(100% - 100px);
    max-height: 150px;
    overflow-y: auto;
    margin: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ThumbnailTray = styled.div`
    margin: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    img {
        max-height: 100px;
        border-radius: 5px;
        margin: 0 5px;
    }
    .map-marker {
        filter: invert(100%);
        border: 2px rgba(0,0,0,0.5) solid;
        padding:30px;
    }
`;
const DataTray = styled.div`
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
`;
const RentalAttribute = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;

    margin: 3px;
    padding: 8px;
    border-radius: 1000px;
    background-color: var(--whiteLight);
    border:2px var(--white-500) solid;

    &.true-binary-attribute {
      border:2px var(--green-500) solid;
    }
    &.false-binary-attribute {
      border:2px var(--red-500) solid;
    }
`;

export default Listing;
