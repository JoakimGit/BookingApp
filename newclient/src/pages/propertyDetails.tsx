import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Lodging } from "../components/FeaturedProperties/FeaturedProperties";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { datesAtom, destinationAtom, optionsAtom } from "../components/searchbar/SearchBar";
import { useAtom } from "jotai";
import { useState } from "react";
import { userAtom } from "./login";

async function getLodgingDetails(id: string): Promise<Lodging> {
  const response = await axios.get(`/lodgings/${id}`);
  return response.data;
}

const PropertyDetails = () => {
  const { lodgingId } = useParams<{ lodgingId: string }>();
  const [options, setOptions] = useAtom(optionsAtom);
  const [dates, setDates] = useAtom(datesAtom);
  const [user] = useAtom(userAtom);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const { data } = useQuery(["getLodgingDetails", lodgingId], () => getLodgingDetails(lodgingId as string), {
    enabled: false
  });
  const dateRange = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {!data ? (
        <div>Loading...</div>
      ) : (
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Elton St 125 New york</span>
          </div>
          <span className="hotelDistance">Excellent location – {data.distance}m from center</span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img src={photo} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <p className="hotelDesc">{data.description}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {dateRange}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an excellent location score of 9.8!
              </span>
              <h2>
                <b>${dateRange * data.cheapestPrice * options.room}</b> ({dateRange} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function dayDifference(date1: Date, date2: Date) {
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const timediff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(timediff / MILLISECONDS_PER_DAY);
  return diffDays;
}

export default PropertyDetails;
