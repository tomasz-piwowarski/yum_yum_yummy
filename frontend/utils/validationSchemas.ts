import * as yup from "yup";

export const createPostSchema = yup
  .object({
    type: yup.string().required("Type is required."),
    title: yup.string().required("String is required."),
    description: yup.string().required("Description is required."),
    region: yup.string().required("Region is required."),
    category: yup.string().required("Category is required."),
    ingredients: yup.array().when("type", {
      is: "recipe",
      then: yup
        .array()
        .of(
          yup.object().shape({
            ingredient: yup
              .string()
              .required("Ingredient is required.")
              .min(2, "Ingredient must be minimum 3 digits."),
            value: yup.string().required("Value is required."),
            unit: yup
              .string()
              .required("Unit is required.")
              .min(1, "Unit must be minimum 1 digit."),
          })
        )
        .min(1, "Ingredients cannot be empty.")
        .required("Ingredients are required."),
    }),
    steps: yup.array().when("type", {
      is: "recipe",
      then: yup
        .array()
        .of(
          yup.object().shape({
            step: yup
              .string()
              .required("Step is required.")
              .min(2, "Step must be minimum 3 digits."),
          })
        )
        .min(1, "Steps cannot be empty.")
        .required("Steps are required."),
    }),
    tags: yup
      .array()
      .min(1, "Tags cannot be empty.")
      .of(
        yup.object().shape({
          tag: yup
            .string()
            .required("Tag is required.")
            .min(2, "Tag must be minimum 2 digits."),
        })
      )
      .required("Tags are required."),
  })
  .required();
