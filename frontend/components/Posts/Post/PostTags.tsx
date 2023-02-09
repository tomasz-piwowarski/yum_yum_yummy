import { PostTagsInterface } from "../../../types";

export default function PostTags({ tags, short }: PostTagsInterface) {
  const tagsToShow = short ? tags?.slice(0, 3) : tags;

  return (
    <div className="px-6 pt-4 pb-2">
      {tagsToShow &&
        tagsToShow.map((tag, i) => (
          <span
            key={tag.tag + i.toString()}
            className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
          >
            {tag.tag}
          </span>
        ))}
    </div>
  );
}
