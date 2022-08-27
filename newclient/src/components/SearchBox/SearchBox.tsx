import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { datesAtom, destinationAtom, Options, optionsAtom } from "../searchbar/SearchBar";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Lodging } from "../FeaturedProperties/FeaturedProperties";
import { useAtom } from "jotai";

interface SearchBoxProps {
  handleSearch: React.Dispatch<React.SetStateAction<Lodging[]>>;
}

async function getPropertySearchResult(destination: string, min: number = 0, max: number) {
  const response = await axios.get(`/lodgings?city=${destination}&min=${min}&max=${max}`);
  return response.data;
}

const SearchBox = ({ handleSearch }: SearchBoxProps) => {
  const [destination, setDestination] = useAtom(destinationAtom);
  const [options, setOptions] = useAtom(optionsAtom);
  const [dates, setDates] = useAtom(datesAtom);

  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();

  const { refetch } = useQuery(
    [`/lodgings`, destination, min, max],
    () => getPropertySearchResult(destination, min, max || 99999),
    {
      onSuccess(data: Lodging[]) {
        handleSearch(data);
      }
    }
  );

  const handleOption = (name: Options, operation: string) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1
      };
    });
  };

  return (
    <>
      <div className="sticky top-2 h-max rounded-md bg-sun p-2">
        <h2 className="mb-2 text-xl text-gray-500">Search</h2>
        <div className="g-1 mb-2 flex flex-col">
          <label className="text-xs" htmlFor="destination"></label>
          <input
            className="p-1"
            type="text"
            id="destination"
            placeholder={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="g-1 relative mb-2 flex flex-col">
          <label className="text-xs">Check-in Date</label>
          <span
            className="relative flex cursor-pointer items-center bg-white px-2 py-1"
            onClick={() => setOpenDate(!openDate)}
          >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
          {openDate && (
            <DateRange
              onChange={(item: any) => setDates([item.selection])}
              minDate={new Date()}
              ranges={dates}
              className="absolute top-14"
            />
          )}
        </div>

        <div className="g-1 mb-2 flex flex-col">
          <label className="text-xs">Options</label>
          <div className="p-2">
            <div className="mb-2 flex justify-between text-xs text-gray-500">
              <span>
                Min price <small>per night</small>
              </span>
              <input type="number" className="w-16 p-1" onChange={(e) => setMin(Number(e.target.value))} />
            </div>
            <div className="mb-2 flex justify-between text-xs text-gray-500">
              <span>
                Max price <small>per night</small>
              </span>
              <input type="number" className="w-16 p-1" onChange={(e) => setMax(Number(e.target.value))} />
            </div>
            <div className="mb-2 flex justify-between text-xs text-gray-500">
              <span>Adult</span>
              <input
                type="number"
                min={1}
                className="w-16 p-1"
                placeholder={options.adult.toString()}
                onClick={() => handleOption("room", "i")}
              />
            </div>
            <div className="mb-2 flex justify-between text-xs text-gray-500">
              <span>Children</span>
              <input
                type="number"
                min={0}
                className="w-16 p-1"
                placeholder={options.children.toString()}
                onClick={() => handleOption("room", "i")}
              />
            </div>
            <div className="mb-2 flex justify-between text-xs text-gray-500">
              <span>Room</span>
              <input
                type="number"
                min={1}
                className="w-16 p-1"
                placeholder={options.room.toString()}
                onClick={() => handleOption("room", "i")}
              />
            </div>
          </div>
        </div>
        <button className="w-full bg-lightblue p-2 text-white" onClick={() => refetch()}>
          Search
        </button>
      </div>
    </>
  );
};
export default SearchBox;
