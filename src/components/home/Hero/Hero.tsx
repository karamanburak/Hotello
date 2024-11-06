import { IoCalendarNumberSharp } from "react-icons/io5";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-start h-[500px] w-[80%] ml-52">
        <div className="text-xl">
          <p>
            WELCOME TO
            <span className="block text-6xl tracking-widest">
              HOTELLO
            </span>
            <span className="block text-2xl tracking-wider">
              HOTELS
            </span>
            <span className="block mt-4 w-[350px]">
              Book your stay and enjoy Luxury redefined at the most affordable rates.
            </span>
          </p>
        </div>
      </div>
      <div className="">
        <button className="m-auto flex gap-2 bg-light-bookingButton px-4 py-2.5 rounded-md -mt-10 font-semibold">
          <IoCalendarNumberSharp className="mt-1 text-lg" /> BOOK NOW
        </button>
      </div>
    </>
  );
};

export default Hero;
