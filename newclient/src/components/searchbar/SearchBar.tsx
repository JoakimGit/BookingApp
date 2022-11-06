import { faBed, faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { atom, useAtom } from "jotai";

export type Options = "adult" | "children" | "room";
export const optionsAtom = atom({ adult: 1, children: 0, room: 1 });
export const destinationAtom = atom("");
export const datesAtom = atom([
  { startDate: new Date(), endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), key: "selection" }
]);

const SearchBar = () => {
  const [options, setOptions] = useAtom(optionsAtom);
  const [destination, setDestination] = useAtom(destinationAtom);
  const [dates, setDates] = useAtom(datesAtom);

  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const navigate = useNavigate();

  const handleOption = (name: Options, operation: string) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1
      };
    });
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/lodgings");
  };

  return (
    <>
      <div className="relative flex flex-col items-center bg-darkblue">
        <div className=" w-full max-w-content space-y-2 pt-14 pb-20 text-white">
          <h1 className="text-5xl font-bold">Find your next stay</h1>
          <p className="text-2xl">Search low prices on hotels, homes and much more...</p>
        </div>
        <form
          onSubmit={handleSearch}
          className="absolute -bottom-7 flex h-14 w-full max-w-content items-center justify-around rounded-md border-2 border-orange-300 bg-white"
        >
          <div className="flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faBed} className="text-gray-300" />
            <input
              className="focus:outline-none"
              type="text"
              placeholder="Where are you going?"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faCalendarDays} className="text-gray-300" />
            <span onClick={() => setOpenDate(!openDate)} className="cursor-pointer text-gray-300">{`${format(
              dates[0].startDate,
              "MM/dd/yyyy"
            )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item: any) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="absolute top-12 z-10"
                minDate={new Date()}
              />
            )}
          </div>

          <div className="flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faPerson} className="text-gray-300" />
            <span onClick={() => setOpenOptions(!openOptions)} className="cursor-pointer text-gray-300">
              {`${options.adult} adult · ${options.children} children · ${options.room} room`}
            </span>
            {openOptions && <SearchOptions options={options} handleOption={handleOption} />}
          </div>

          <div className="flex justify-center gap-2">
            <button type="submit" className="bg-lightblue py-2 px-4 text-white">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="mb-16"></div>
    </>
  );
};

interface SearchOptionsProps {
  options: { adult: number; children: number; room: number };
  handleOption: (name: Options, operation: string) => void;
}

const SearchOptions = ({ options, handleOption }: SearchOptionsProps) => {
  return (
    <div className="absolute top-12 z-10 rounded-md bg-white text-gray-400 shadow-inner">
      <div className="m-2 flex w-48 justify-between">
        <span>Adult</span>
        <div className="flex items-center gap-2 text-sm text-black">
          <button type="button" disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")}>
            -
          </button>
          <span>{options.adult}</span>
          <button
            type="button"
            className="h-7 w-7 border border-blue-600 bg-white"
            onClick={() => handleOption("adult", "i")}
          >
            +
          </button>
        </div>
      </div>
      <div className="m-2 flex w-48 justify-between">
        <span>Children</span>
        <div className="flex items-center gap-2 text-sm text-black">
          <button
            type="button"
            disabled={options.children <= 0}
            onClick={() => handleOption("children", "d")}
          >
            -
          </button>
          <span>{options.children}</span>
          <button
            type="button"
            className="h-7 w-7 border border-blue-600 bg-white"
            onClick={() => handleOption("children", "i")}
          >
            +
          </button>
        </div>
      </div>
      <div className="m-2 flex w-48 justify-between">
        <span>Room</span>
        <div className="flex items-center gap-2 text-sm text-black">
          <button type="button" disabled={options.room <= 1} onClick={() => handleOption("room", "d")}>
            -
          </button>
          <span>{options.room}</span>
          <button
            type="button"
            className="h-7 w-7 border border-blue-600 bg-white"
            onClick={() => handleOption("room", "i")}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
