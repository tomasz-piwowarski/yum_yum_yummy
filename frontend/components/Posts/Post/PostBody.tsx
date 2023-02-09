import { PostBodyInterface } from "../../../types";

export default function PostBody({
  title,
  description,
  short,
  type,
  ingredients,
  steps,
  region,
  category,
}: PostBodyInterface) {
  return (
    <div className="px-6 py-4">
      <div className="mb-px break-all text-xl font-bold">{title}</div>
      <div className="mb-2 text-sm font-light capitalize">
        {region} - {category?.replace("_", " ")}
      </div>
      <p className="break-all text-base text-gray-700">{description}</p>
      {!short && type === "recipe" ? (
        <>
          <div className="my-4">
            <p className="text-l mb-2 font-bold">Ingredients:</p>
            {ingredients?.map((ingredient, i) => (
              <p
                key={ingredient + i.toString()}
                className="flex justify-between border-t border-gray-300 py-2 text-base text-gray-700"
              >
                <span>{ingredient.ingredient}</span>
                <span>
                  {ingredient.value} {ingredient.unit}
                </span>
              </p>
            ))}
          </div>
          <div>
            <p className="text-l mb-2 font-bold">Steps:</p>
            {steps?.map((step, i) => (
              <p
                className="break-all py-2 text-base text-gray-700"
                key={step.step + i.toString()}
              >
                {`${i + 1}: ${step.step}`}
              </p>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
