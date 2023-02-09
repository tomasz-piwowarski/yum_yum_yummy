import {
  IngredientsFieldsInterface,
  StepsFieldsInterface,
  TagsFieldsInterface,
} from "../../../types";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { CreatePostInput, CreatePostTextArea } from "./Inputs";
import Error from "./Error";

export function TagsFields({
  register,
  fieldArray,
  errors,
  defaultValue,
}: TagsFieldsInterface) {
  return (
    <div className="relative flex w-full flex-col p-2 xl:w-2/5">
      <div className="mb-1 flex w-full flex-row items-center justify-between">
        <label htmlFor="steps">Tags</label>
        <button type="button" onClick={() => fieldArray.append(defaultValue)}>
          <AddOutlinedIcon />
        </button>
      </div>
      <div className="flex h-full w-full flex-col overflow-x-hidden overflow-y-scroll">
        {fieldArray.fields.map((field, i) => (
          <div key={field.id} className="flex flex-col pr-2">
            <section className="flex flex-row" key={field.id}>
              <CreatePostInput
                register={register}
                inputName={`tags.${i}.tag` as const}
                placeholder="Tag"
                additionalClasses="mr-2"
              />
              <button type="button" onClick={() => fieldArray.remove(i)}>
                <CloseOutlinedIcon />
              </button>
            </section>
            <Error
              condition={!!errors?.tags?.[i]}
              text={errors?.tags?.[i]?.tag?.message}
            />
          </div>
        ))}
        <Error
          condition={!!errors?.tags?.message}
          text={errors?.tags?.message}
        />
      </div>
    </div>
  );
}

export function IngredientsFields({
  register,
  fieldArray,
  errors,
  defaultValue,
}: IngredientsFieldsInterface) {
  return (
    <div className="relative flex w-full flex-col p-2">
      <div className="mb-1 flex w-full flex-row items-center justify-between">
        <label htmlFor="steps">Ingredients</label>
        <button type="button" onClick={() => fieldArray.append(defaultValue)}>
          <AddOutlinedIcon />
        </button>
      </div>
      <div className="mb-12 w-full">
        {fieldArray.fields.map((field, i) => (
          <div key={field.id} className="mb-1">
            <section
              className="flex w-full flex-row items-center justify-between"
              key={field.id}
            >
              <div className="flex w-full flex-row items-center">
                <p className="mr-2"> {i + 1}: </p>
                <div className="mr-1 w-1/2">
                  <CreatePostInput
                    register={register}
                    inputName={`ingredients.${i}.ingredient` as const}
                    placeholder="ingredient"
                    additionalClasses="mr-1 mb-1"
                  />
                </div>
                <div className="mr-1 w-1/6">
                  <CreatePostInput
                    register={register}
                    inputName={`ingredients.${i}.value` as const}
                    placeholder="value"
                    additionalClasses="mr-1 mb-1"
                  />
                </div>
                <div className="w-1/6">
                  <CreatePostInput
                    register={register}
                    inputName={`ingredients.${i}.unit` as const}
                    placeholder="unit"
                    additionalClasses="mr-1 mb-1"
                  />
                </div>
              </div>
              <button type="button" onClick={() => fieldArray.remove(i)}>
                <CloseOutlinedIcon />
              </button>
            </section>
            <div className="flex flex-col">
              <Error
                condition={!!errors?.ingredients?.[i]}
                text={errors?.ingredients?.[i]?.ingredient?.message}
              />
              <Error
                condition={!!errors?.ingredients?.[i]}
                text={errors?.ingredients?.[i]?.value?.message}
              />
              <Error
                condition={!!errors?.ingredients?.[i]}
                text={errors?.ingredients?.[i]?.unit?.message}
              />
            </div>
          </div>
        ))}
        <Error
          condition={!!errors?.ingredients?.message}
          text={errors?.ingredients?.message}
        />
      </div>
    </div>
  );
}

export function StepsFields({
  register,
  fieldArray,
  errors,
  defaultValue,
}: StepsFieldsInterface) {
  return (
    <div className="relative flex w-full flex-col p-2">
      <div className="mb-1 flex w-full flex-row items-center justify-between">
        <label htmlFor="steps">Steps</label>

        <button type="button" onClick={() => fieldArray.append(defaultValue)}>
          <AddOutlinedIcon />
        </button>
      </div>
      <div className="mb-12">
        {fieldArray.fields.map((field, i) => (
          <div key={field.id}>
            <section
              className="mb-1 flex flex-row items-center justify-between"
              key={field.id}
            >
              <p className="mr-2">{i + 1}: </p>
              <CreatePostTextArea
                register={register}
                inputName={`steps.${i}.step` as const}
                placeholder={`Step ${i + 1}`}
                additionalClasses="h-32 w-full mb-2 mr-2"
              />
              <button type="button" onClick={() => fieldArray.remove(i)}>
                <CloseOutlinedIcon />
              </button>
            </section>
            <Error
              condition={!!errors?.steps?.[i]}
              text={errors?.steps?.[i]?.step?.message}
            />
          </div>
        ))}
        <Error
          condition={!!errors?.steps?.message}
          text={errors?.steps?.message}
        />
      </div>
    </div>
  );
}
