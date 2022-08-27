import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getPropertyCountByType(): Promise<{ type: string; count: number }[]> {
  const response = await axios.get("/lodgings/countByType");
  return response.data;
}

const PropertyTypeList = () => {
  const { data, isLoading } = useQuery(["propertyCountByType"], getPropertyCountByType);

  const imagesMap = new Map([
    [
      "hotels",
      "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
    ],
    [
      "apartments",
      "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
    ],
    [
      "villas",
      "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
    ],
    [
      "resorts",
      "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
    ],
    [
      "inns",
      "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
    ]
  ]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mx-auto mb-12 w-full max-w-content">
      <h2 className="mb-4 text-xl font-bold">Browse by property type</h2>
      <div className="flex w-full justify-between gap-5">
        {data?.length &&
          data.map((typeObj, i) => (
            <div className="flex-1 cursor-pointer overflow-hidden rounded-lg" key={i}>
              <img src={imagesMap.get(typeObj.type)} alt="" className="h-40 w-full object-cover" />
              <div>
                <h1 className="text-lg font-bold capitalize text-gray-600">{typeObj.type}</h1>
                <h2 className="text-sm">
                  {typeObj.count} {typeObj.type}
                </h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default PropertyTypeList;
