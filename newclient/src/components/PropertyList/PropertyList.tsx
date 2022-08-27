import { Link } from "react-router-dom";
import { Lodging, mapRatingToString } from "../FeaturedProperties/FeaturedProperties";

interface PropertyListProps {
  properties: Lodging[];
}

const PropertyList = ({ properties }: PropertyListProps) => {
  return (
    <div className="flex flex-col gap-4 px-4">
      {properties?.map((property) => (
        <div className="flex gap-4 border p-4" key={property._id}>
          <img src={property.photos[0]} alt="" className="h-[200px] w-[200px]" />

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-lightblue">{property.name}</h2>

            <div className="flex items-center gap-x-1 text-xs">
              <p className="whitespace-nowrap text-lightblue underline">{property.address}</p>
              <p>-</p>
              <p>{property.distance} m from centre</p>
            </div>

            <p className="text-sm">{property.description}</p>

            <div className="text-xs text-green-700">
              <p>
                <b>FREE</b> cancellation
              </p>
              <p>You can cancel later, so lock in this great price today!</p>
            </div>
          </div>

          <div className="text-right">
            <div className="mb-8">
              <span className="mr-2">{mapRatingToString(property.rating)}</span>
              <span className="rounded-tl rounded-br bg-darkblue p-[5px] text-sm text-white">
                {property.rating}
              </span>
            </div>

            <div className="mb-6 leading-none">
              <p className="text-xl">
                <span className="text-base font-bold">From</span> {property.cheapestPrice}$
              </p>
              <span className="whitespace-nowrap text-xs text-gray-500">Includes taxes and fees</span>
            </div>

            <Link
              to={`/lodgings/${property._id}`}
              className="flex items-center gap-x-2 whitespace-nowrap bg-lightblue py-2 px-4 text-white"
            >
              <button>Show more</button>
              <svg
                className="h-3 w-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 98.148 98.148"
                xmlSpace="preserve"
                fill="currentColor"
              >
                <path
                  d="M33.458,97.562L80.531,50.49c0.75-0.75,0.75-2.078,0-2.828L33.456,0.586C33.081,0.211,32.572,0,32.042,0
                      c-0.53,0-1.039,0.211-1.414,0.586L17.641,13.573c-0.391,0.391-0.586,0.902-0.586,1.414c0,0.512,0.195,1.023,0.586,1.414
                      l32.674,32.674L17.642,81.75c-0.751,0.75-0.75,2.078,0,2.828l12.987,12.984C31.411,98.344,32.677,98.344,33.458,97.562z"
                />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PropertyList;
