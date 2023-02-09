import { body } from "express-validator";

export const validateProfileEdit = [body("username").trim().escape()];
