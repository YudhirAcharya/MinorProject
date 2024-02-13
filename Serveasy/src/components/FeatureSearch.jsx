import { useFilterContext } from "../context/filterContext";
const FeatureSearch = () => {
  const {
    filters: { text },
    updateFilterValues,
  } = useFilterContext();

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex bg-transparent flex-row mx-0 my-0 "
    >
      <input
        type="text"
        name="text"
        value={text}
        onChange={updateFilterValues}
        className="w-[200px] p-2"
        placeholder="Search Food"
      />
    </form>
  );
};

export default FeatureSearch;
