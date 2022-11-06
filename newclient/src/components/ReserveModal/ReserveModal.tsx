import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAtom } from "jotai";
import { useState } from "react";
import { Room, RoomNumber } from "../../Models/Room";
import { datesAtom } from "../searchbar/SearchBar";

interface ReserverModalProps {
  lodgingId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

async function getLodgingRooms(lodgingId: string): Promise<Room[]> {
  const response = await axios.get(`/lodgings/room/${lodgingId}`);
  return response.data;
}

const ReserveModal = ({ setOpen, lodgingId }: ReserverModalProps) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [dates, setDates] = useAtom(datesAtom);
  const { data } = useQuery(["/lodgings/room/", lodgingId], () => getLodgingRooms(lodgingId));

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value = e.target.value;
    /* setSelectedRooms(
      checked ? [...selectedRooms, value] : selectedRooms.filter((roomId) => roomId !== value)
    ); */
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const res = await axios.put(`/rooms/availability/${roomId}`, { dates: allDates });
          return res.data;
        })
      );
      setOpen(false);
    } catch (error) {}
  };

  const getDatesInRange = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let dates = [];

    while (start <= end) {
      dates.push(new Date(start).getTime());
      start.setDate(start.getDate() + 1);
    }
    return dates;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber: RoomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => allDates.includes(new Date(date).getTime()));

    return !isFound;
  };

  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/40">
      <div className="relative bg-white p-5">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="absolute top-2 right-2 cursor-pointer text-lg"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data?.map((room) => (
          <div className="flex items-center gap-12 p-5">
            <div className="flex flex-col gap-1">
              <div className="font-medium">{room.title}</div>
              <div className="font-light">{room.description}</div>
              <div className="text-xs">
                Max people <b>{room.maxPeople}</b>{" "}
              </div>
              <div className="font-medium">{room.price}</div>
            </div>
            <div className="flex flex-wrap gap-1 text-xs text-gray-400">
              {room.roomNumbers.map((roomNumber) => (
                <div className="flex flex-col">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          className="mt-5 w-full rounded-md bg-lightblue py-2 px-5 font-bold text-white"
          onClick={handleClick}
        >
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default ReserveModal;
