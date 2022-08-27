import FeaturedCities from "../components/FeaturedCities/FeaturedCities";
import FeaturedProperties from "../components/FeaturedProperties/FeaturedProperties";
import PropertyTypeList from "../components/PropertyTypesList/PropertyTypeList";
import SearchBar from "../components/searchbar/SearchBar";

const Home = () => {
  return (
    <>
      <SearchBar />
      <FeaturedCities />
      <PropertyTypeList />
      <FeaturedProperties />
    </>
  );
};

export default Home;
