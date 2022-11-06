import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { mapRatingToString } from "../components/FeaturedProperties/FeaturedProperties";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { datesAtom, destinationAtom, optionsAtom } from "../components/searchbar/SearchBar";
import { useAtom } from "jotai";
import { useState } from "react";
import { userAtom } from "./login";
import ReserveModal from "../components/ReserveModal/ReserveModal";
import { Lodging } from "../Models/Lodging";

async function getLodgingDetails(id?: string): Promise<Lodging> {
  if (!id) return {} as Lodging;
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

  const { data } = useQuery(["getLodgingDetails", lodgingId], () => getLodgingDetails(lodgingId));
  const dateRange = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleClick = () => {
    user ? setOpenModal(true) : navigate("/login");
  };

  if (!data) return <div>Loading...</div>;
  // data.photos = [...data.photos, data.photos[0]];

  return (
    <div className="mt-5 flex flex-col items-center">
      <div className="relative flex w-full max-w-content flex-col gap-2">
        <button className="absolute right-0 top-2 rounded-md bg-lightblue py-2 px-4 font-bold text-white">
          Reserve or Book Now!
        </button>
        <h2 className="text-2xl">{data.name}</h2>
        <div className="flex items-center gap-2 text-xs">
          <FontAwesomeIcon icon={faLocationDot} />
          <span>Elton St 125 New york</span>
        </div>
        <span className="font-medium text-lightblue">Excellent location – {data.distance}m from center</span>
        <span className="font-medium text-green-700">
          Book a stay over ${data.cheapestPrice * 3} at this property and get a free airport taxi
        </span>
        <div className="flex flex-wrap gap-2">
          {data.photos?.map((photo, i) => (
            <div className="max-w-[30%] flex-grow" key={i}>
              <img src={photo} alt="" className="w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-between gap-5">
          <div className="flex-[3]">
            <p className="">{data.description}</p>
            <p className="mt-4 text-sm">
              <b>Currency exchange</b>: Need local currency? This property offers currency exchange on site.
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-5 bg-sky-100 p-5">
            <h2 className="text-lg text-gray-600">Perfect for a {dateRange}-night stay!</h2>
            <span className="text-sm">
              This property has an {mapRatingToString(data.rating)?.toLocaleLowerCase()} score of{" "}
              <b>{data.rating}</b>
            </span>
            <span className="font-light">
              <b>${dateRange * data.cheapestPrice * options.room}</b> ({dateRange} nights)
            </span>
            <button className="fontbold rounded-md bg-lightblue py-2 px-5 text-white" onClick={handleClick}>
              Reserve or Book Now!
            </button>
          </div>
        </div>
      </div>
      {openModal && <ReserveModal setOpen={setOpenModal} lodgingId={lodgingId!} />}
    </div>
  );
};

function dayDifference(date1: Date, date2: Date) {
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const timediff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(timediff / MILLISECONDS_PER_DAY);
  return diffDays;
}

export default PropertyDetails;
