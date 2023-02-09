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

export const upload = multer(multerOptions).array("files");

export const resizeAndSave = async (
	req: Request,
	_res: Response,
	next: NextFunction
): Promise<void> => {
	if (!req.files) {
		return next();
	}
	const photos: { photo: string }[] = [];
	await Promise.all(
		Object.values(req.files).map(async (file: any) => {
			const id = uuidv4();

			const extension = file.mimetype.split("/")[1];
			const fileName = `${id}.${extension}`;

			const photo = await Jimp.read(file.buffer);

			photo.resize(800, Jimp.AUTO);
			photo.write(`./static/photos/${fileName}`);

			photos.push({ photo: fileName });
		})
	);

	const oldPhotos = req.body.photos
		? [...JSON.parse(req.body.photos)]
		: undefined;

	req.body.photos = [...(oldPhotos || []), ...photos];
	req.body.ingredients = JSON.parse(req.body.ingredients);
	req.body.steps = JSON.parse(req.body.steps);
	req.body.tags = JSON.parse(req.body.tags);

	next();
};
