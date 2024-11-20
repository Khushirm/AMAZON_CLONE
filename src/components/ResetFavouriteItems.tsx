
import { resetFavouriteData } from "@/store/nextSlice";
import { useDispatch } from "react-redux";
// import { resetFavouriteData } from "../../Redux/slices/CartSlice";

const ResetFavouriteItems = () => {
  const dispatch = useDispatch();
  const handleResetFavourites = () => {
    const confirmReset = window.confirm(
      "Are you sure to reset your items from the favourites?"
    );
    if (confirmReset) {
      dispatch(resetFavouriteData());
    }
  };
  return (
    <button
      onClick={handleResetFavourites}
      className="w-44 h-10 text-black font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white duration-300"
    >
      Reset Favourites
    </button>
  );
};

export default ResetFavouriteItems;