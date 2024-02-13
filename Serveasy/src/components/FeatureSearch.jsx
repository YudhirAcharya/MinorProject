import { AiOutlineSearch } from "react-icons/ai";
import { useFilterContext } from "../context/filterContext";
const FeatureSearch = () => {
  const {
    filters: { text },
    updateFilterValues,
  } = useFilterContext();

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex bg-transparent flex-row mx-0 my-0 p-0 gap-4"
    >
      <input
        type="text"
        name="text"
        value={text}
        onChange={updateFilterValues}
        className="w-[10rem] p-4 md:w-[30rem] vsm:w-[30rem]"
        placeholder="Search Food"
      />
      <button className="text-[2rem]" onClick={updateFilterValues}>
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default FeatureSearch;
