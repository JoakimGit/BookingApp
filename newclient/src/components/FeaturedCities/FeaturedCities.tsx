import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getPropertiesByCities(): Promise<number[]> {
  const response = await axios.get("/lodgings/countByCity?cities=london,copenhagen,paris");
  return response.data;
}

const FeaturedCities = () => {
  const { data, isLoading } = useQuery(["propertiesByCity"], getPropertiesByCities);

  const featuredCities = [
    {
      city: "London",
      alt: "london",
      src: "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
    },
    {
      city: "Copenhagen",
      alt: "copenhagen",
      src: "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
    },
    {
      city: "Paris",
      alt: "paris",
      src: "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
    }
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mx-auto mb-8 flex w-full max-w-content justify-between gap-5">
      {data?.map((amount, i) => (
        <CityCard key={i} amount={amount} city={featuredCities[i]} />
      ))}
    </div>
  );
};

const CityCard = ({ amount, city }: { amount: number; city: { city: string; alt: string; src: string } }) => {
  return (
    <div className="relative h-64 flex-1 overflow-hidden rounded-lg bg-white">
      <img src={city.src} alt={city.alt} className="h-full w-full object-cover" />
      <div className="absolute bottom-5 left-5 text-white">
        <h1 className="text-xl font-semibold">{city.city}</h1>
        <h2>{amount} properties</h2>
      </div>
    </div>
  );
};

export default FeaturedCities;
