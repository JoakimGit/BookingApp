import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Lodging } from "../../Models/Lodging";

async function getFeaturedProperties(): Promise<Lodging[]> {
  const response = await axios.get("/lodgings?featured=true&limit=4");
  return response.data;
}

const FeaturedProperties = () => {
  const { data, isLoading } = useQuery(["featuredProperties"], getFeaturedProperties);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mx-auto mb-12 flex w-full max-w-content justify-between gap-5">
      {data?.map((item) => (
        <div className="flex flex-1 flex-col text-sm" key={item._id}>
          <img src={item.photos[0]} alt="" className="h-64 w-full object-cover" />
          <span className="text-gray-800">{item.name}</span>
          <span className="mb-2 text-gray-500">{item.city}</span>
          <span className="mb-2 font-semibold">Starting from ${item.cheapestPrice}</span>
          {item.rating && (
            <div className="">
              <button className="mr-2 bg-darkblue p-1 font-bold text-white">{item.rating}</button>
              <span className="">{mapRatingToString(item.rating)}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export function mapRatingToString(rating: number) {
  if (rating < 0 || rating > 5) return "Unexpected Rating";
  if (rating < 1) return "Bad";
  if (rating < 2) return "Poor";
  if (rating < 3) return "Decent";
  if (rating < 4) return "Good";
  if (rating < 4.6) return "Excellent";
  if (rating < 5) return "Superb";
}

export default FeaturedProperties;
