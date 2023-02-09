import {
  CreatePostInputInterface,
  CreatePostSelectInterface,
} from "../../../types";

export function CreatePostTextArea({
  register,
  inputName,
  placeholder,
  options,
  additionalClasses,
}: CreatePostInputInterface) {
  return (
    <textarea
      id={inputName}
      className={`h-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border focus:border-black ${additionalClasses}`}
      placeholder={placeholder}
      {...register(inputName, options)}
    />
  );
}

export function CreatePostInput({
  register,
  inputName,
  placeholder,
  options,
  additionalClasses,
}: CreatePostInputInterface) {
  return (
    <input
      id={inputName}
      className={`mb-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border focus:border-black ${additionalClasses}`}
      type="text"
      placeholder={placeholder}
      {...register(inputName, options)}
    />
  );
}

export function CreatePostSelect({
  register,
  inputName,
  placeholder,
  options,
  children,
}: CreatePostSelectInterface) {
  return (
    <select
      id={inputName}
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border focus:border-black"
      {...register(inputName, options)}
    >
      {children}
    </select>
  );
}
