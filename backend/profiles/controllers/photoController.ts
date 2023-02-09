import { Request, Response, NextFunction, Express } from "express";
import multer from "multer";
import Jimp from "jimp";
import { v4 as uuidv4 } from "uuid";

const multerOptions: multer.Options = {
	storage: multer.memoryStorage(),
	fileFilter(_req: any, file: Express.Multer.File, cb: any) {
		if (file.mimetype.startsWith("image/")) {
			cb(null, true);
		} else {
			cb({ message: "That filetype is not allowed!" }, false);
		}
	},
};

export const upload = multer(multerOptions).single("profilePicture");

export const resizeAndSave = async (
	req: Request,
	_res: Response,
	next: NextFunction
): Promise<void> => {
	if (!req.file) {
		delete req.body.profilePicture;
		return next();
	}

	const id = uuidv4();

	const extension = req.file.mimetype.split("/")[1];
	const fileName = `${id}.${extension}`;

	const photo = await Jimp.read(req.file.buffer);

	photo.resize(160, Jimp.AUTO);
	photo.write(`./static/photos/${fileName}`);

	req.body.profilePicture = fileName;

	next();
};
