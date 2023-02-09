import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function SearchBar({ handleOpen }: { handleOpen: () => void }) {
  return (
    <div
      className="flex w-56 cursor-pointer items-center gap-2 rounded-lg bg-neutral-200 px-4 py-1.5"
      onClick={handleOpen}
    >
      <SearchOutlinedIcon className="h-5 w-5 text-gray-400" />
      <div className="w-full bg-transparent focus:outline-none">Search</div>
    </div>
  );
}
