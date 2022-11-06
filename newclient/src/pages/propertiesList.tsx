import { useState } from "react";
import PropertyList from "../components/PropertyList/PropertyList";
import SearchBox from "../components/SearchBox/SearchBox";
import { Lodging } from "../Models/Lodging";

const PropertiesList = () => {
  const [properties, setProperties] = useState<Lodging[]>([]);
  return (
    <div className="mx-auto mt-5 flex max-w-content">
      <SearchBox handleSearch={setProperties} />
      <PropertyList properties={properties} />
    </div>
  );
};

export default PropertiesList;
