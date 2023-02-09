import ReactSelect from "react-select";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { SearchFormInterface } from "../../types";
import Button from "../Common/Button";

const regionOptions = [
  { value: "african", label: "African" },
  { value: "american", label: "American" },
  { value: "european", label: "European" },
  { value: "asian", label: "Asian" },
  { value: "oceanic", label: "Oceanic" },
];

const categoryOptions = [
  { value: "east_african", label: "East African" },
  { value: "west_african", label: "West African" },
  { value: "north_african", label: "North African" },
  { value: "south_african", label: "South African" },
  { value: "central_asian", label: "Central Asian" },
  { value: "east_asian", label: "East Asian" },
  { value: "middle_east", label: "Middle East" },
  { value: "north_asian", label: "North Asian" },
  { value: "south_asian", label: "South Asian" },
  { value: "southeast_asian", label: "Southeast Asian" },
  { value: "carribean", label: "Carribean" },
  { value: "central_american", label: "Central American" },
  { value: "north_american", label: "North American" },
  { value: "south_american", label: "South American" },
  { value: "australasian", label: "Australasian" },
  { value: "melanesian", label: "Melanesian" },
  { value: "micronesian", label: "Micronesian" },
  { value: "polynesian", label: "Polynesian" },
  { value: "central_european", label: "Central European" },
  { value: "eastern_european", label: "Eastern European" },
  { value: "northern_european", label: "Northern European" },
  { value: "southern_european", label: "Southern European" },
  { value: "western_european", label: "Western European" },
];

export default function PostSearchForm({
  register,
  handleSubmit,
  search,
  control,
}: SearchFormInterface) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const handleAdvanced = () => setShowAdvanced(!showAdvanced);

  return (
    <div className="h-full w-full rounded-xl bg-white lg:w-1/3 lg:overflow-y-scroll">
      <form className="w-full p-4" onSubmit={handleSubmit(search)}>
        <div className="mb-4 border-b-2 border-gray-300 text-lg">
          Search posts
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="searchText">Title:</label>
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border focus:border-black"
            id="searchText"
            type="text"
            {...register("title")}
          />
        </div>
        <div
          onClick={handleAdvanced}
          className="mb-4 flex w-full cursor-pointer justify-between border-b border-gray-300 py-2"
        >
          <span>Advanced recipes search</span>
          {showAdvanced ? (
            <CloseOutlinedIcon />
          ) : (
            <KeyboardArrowDownOutlinedIcon />
          )}
        </div>
        <div
          className={`flex flex-col overflow-hidden transition-all duration-100 ease-in ${
            showAdvanced ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="mb-3 flex w-full flex-col">
            <label htmlFor="region" className="mb-px">
              Region:{" "}
            </label>
            <Controller
              control={control}
              name="region"
              render={({ field: { onChange, value, name } }) => (
                <ReactSelect
                  options={regionOptions}
                  isMulti
                  onChange={onChange}
                  value={value}
                  name={name}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                />
              )}
            />
          </div>
          <div className="mb-3 flex w-full flex-col">
            <label htmlFor="region" className="mb-px">
              Category:{" "}
            </label>
            <Controller
              control={control}
              name="category"
              render={({ field: { onChange, value, name } }) => (
                <ReactSelect
                  options={categoryOptions}
                  isMulti
                  onChange={onChange}
                  value={value}
                  name={name}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                />
              )}
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label htmlFor="searchText">Tags:</label>
            <input
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border focus:border-black"
              id="searchText"
              type="text"
              {...register("tags")}
              placeholder="eg. #Chicken #Winter #Family"
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label htmlFor="searchText">Ingredients:</label>
            <input
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border focus:border-black"
              id="searchText"
              type="text"
              {...register("ingredients")}
              placeholder="eg. Chicken Potato Cheese"
            />
          </div>
        </div>
        <Button additionalClasses="w-full py-2" type="submit">
          Search
        </Button>
      </form>
    </div>
  );
}
