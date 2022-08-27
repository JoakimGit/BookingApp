const Footer = () => {
  return (
    <div className="">
      <div className="mb-6 flex w-full flex-col items-center bg-darkblue p-12 text-white">
        <h2 className="mb-1 text-3xl font-bold">Save time, save money!</h2>
        <span className="mb-6 text-gray-300">Sign up and we'll send the best deals to you</span>
        <div>
          <input type="text" placeholder="Your Email" className="mr-3 h-12 w-72 rounded-md p-3 text-black" />
          <button className="h-12 rounded-md bg-lightblue px-10">Subscribe</button>
        </div>
      </div>

      <div className="mx-auto mb-4 flex max-w-content justify-between text-xs">
        <ul>
          <li className="mb-3 cursor-pointer text-darkblue">Countries</li>
          <li className="mb-3 cursor-pointer text-darkblue">Regions</li>
          <li className="mb-3 cursor-pointer text-darkblue">Cities</li>
          <li className="mb-3 cursor-pointer text-darkblue">Districts</li>
          <li className="mb-3 cursor-pointer text-darkblue">Airports</li>
          <li className="mb-3 cursor-pointer text-darkblue">Hotels</li>
        </ul>
        <ul>
          <li className="mb-3 cursor-pointer text-darkblue">Homes </li>
          <li className="mb-3 cursor-pointer text-darkblue">Apartments </li>
          <li className="mb-3 cursor-pointer text-darkblue">Resorts </li>
          <li className="mb-3 cursor-pointer text-darkblue">Villas</li>
          <li className="mb-3 cursor-pointer text-darkblue">Hostels</li>
          <li className="mb-3 cursor-pointer text-darkblue">Guest houses</li>
        </ul>
        <ul>
          <li className="mb-3 cursor-pointer text-darkblue">Unique places to stay </li>
          <li className="mb-3 cursor-pointer text-darkblue">Reviews</li>
          <li className="mb-3 cursor-pointer text-darkblue">Unpacked: Travel articles </li>
          <li className="mb-3 cursor-pointer text-darkblue">Travel communities </li>
          <li className="mb-3 cursor-pointer text-darkblue">Seasonal and holiday deals </li>
        </ul>
        <ul>
          <li className="mb-3 cursor-pointer text-darkblue">Car rental </li>
          <li className="mb-3 cursor-pointer text-darkblue">Flight Finder</li>
          <li className="mb-3 cursor-pointer text-darkblue">Restaurant reservations </li>
          <li className="mb-3 cursor-pointer text-darkblue">Travel Agents </li>
        </ul>
        <ul>
          <li className="mb-3 cursor-pointer text-darkblue">Curtomer Service</li>
          <li className="mb-3 cursor-pointer text-darkblue">Partner Help</li>
          <li className="mb-3 cursor-pointer text-darkblue">Careers</li>
          <li className="mb-3 cursor-pointer text-darkblue">Sustainability</li>
          <li className="mb-3 cursor-pointer text-darkblue">Press center</li>
          <li className="mb-3 cursor-pointer text-darkblue">Safety Resource Center</li>
          <li className="mb-3 cursor-pointer text-darkblue">Investor relations</li>
          <li className="mb-3 cursor-pointer text-darkblue">Terms & conditions</li>
        </ul>
      </div>
      <div className="mx-auto max-w-content text-sm">
        Copyright © 2022{" "}
        <a className="font-semibold text-darkblue" href="https://github.com/JoakimGit">
          Joakim Olsen
        </a>
      </div>
    </div>
  );
};

export default Footer;
