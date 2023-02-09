import { FieldsInterface } from "../../../types";
import {
  CreatePostInput,
  CreatePostSelect,
  CreatePostTextArea,
} from "./Inputs";
import { CategoryOptions, RegionOptions } from "../../Common/SelectOptions";

export function Type({ register, errors }: FieldsInterface) {
  return (
    <div className="flex w-full flex-col p-2 xl:w-1/5">
      <label className="mb-1" htmlFor="type">
        Type
      </label>
      <CreatePostSelect register={register} inputName="type" placeholder="Type">
        <>
          <option value="post">Post</option>
          <option value="recipe">Recipe</option>
        </>
      </CreatePostSelect>
      {errors.type && (
        <span className="font-medium text-red-600">{errors.type?.message}</span>
      )}
    </div>
  );
}

export function Title({ register, errors }: FieldsInterface) {
  return (
    <div className="flex w-full flex-col p-2">
      <label className="mb-1" htmlFor="title">
        Title
      </label>
      <CreatePostInput
        register={register}
        inputName="title"
        placeholder="Title"
        options={{ required: true }}
      />
      {errors.title && (
        <span className="font-medium text-red-600">
          {errors.title?.message}
        </span>
      )}
    </div>
  );
}

export function Region({ register, errors }: FieldsInterface) {
  return (
    <div className="flex w-full flex-col p-2">
      <label className="mb-1" htmlFor="region">
        Region
      </label>
      <CreatePostSelect
        register={register}
        inputName="region"
        placeholder="Region"
      >
        <RegionOptions />
      </CreatePostSelect>
      {errors.region && (
        <span className="font-medium text-red-600">
          {errors.region?.message}
        </span>
      )}
    </div>
  );
}

interface CategoryInterface extends FieldsInterface {
  region?: string;
}

export function Category({ register, errors, region }: CategoryInterface) {
  return (
    <div className="flex w-full flex-col p-2">
      <label className="mb-1" htmlFor="Category">
        Category
      </label>
      <CreatePostSelect
        register={register}
        inputName="category"
        placeholder="Category"
      >
        <>{region && <CategoryOptions category={region} />}</>
      </CreatePostSelect>
      {errors.category && (
        <span className="font-medium text-red-600">
          {errors.category?.message}
        </span>
      )}
    </div>
  );
}

export function Description({ register, errors }: FieldsInterface) {
  return (
    <div className="flex h-64 w-full flex-col p-2 xl:h-full">
      <label className="mb-1" htmlFor={"description"}>
        Description
      </label>
      <CreatePostTextArea
        register={register}
        inputName="description"
        placeholder="Description"
      />
      {errors.description && (
        <span className="font-medium text-red-600">
          {errors.description?.message}
        </span>
      )}
    </div>
  );
}
