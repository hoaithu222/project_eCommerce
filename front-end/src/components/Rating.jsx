import { PiStarFill, PiStarThin } from "react-icons/pi";

const Rating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5 ">
      {[...Array(5)].map((_, index) => (
        <span key={index} className="">
          {index < rating ? (
            <PiStarFill className="text-yellow-400" />
          ) : (
            <PiStarThin />
          )}
        </span>
      ))}
    </div>
  );
};
export default Rating;
