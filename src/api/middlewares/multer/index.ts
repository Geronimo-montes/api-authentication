import images from "./image.middleware"
import video from "./video.middleware"

const multerMiddleware = {
  images,
  video,
};

export default multerMiddleware;


/**
    import { Router } from "express";
    import path from "path";

    // GET https://sharks.com/gallery/shark-image.jpg
    const route = Router();

    export default (app: Router) => {
      app.use('/gallery', route);

      route
        .get(
          '/:fileName',
          (req, res, next) => {
            var options = { root: path.join(__dirname, 'public') };

            res.sendFile(
              req.params.fileName, options,
              (err) => {
                if (err) next(err);
              });
          }
        )
        .get(
          '/:fileName',
          (req, res) => {
            const file = `${__dirname}/public/${req.params.fileName}`;
            res.download(file);
          }
        )
    }
 */