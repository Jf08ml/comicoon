import Comic from "../models/comic";
import User from "../models/users";
import Serie from "../models/serie";
import Rate from "../models/score";

async function postComic(req, res) {
  const { title, imagesPost, comicPart, serie } = req.body.postComplete;
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    const comic = new Comic({
      user: user._id,
      title: title,
      imagesPost: imagesPost,
      serie: comicPart ? comicPart : serie,
    });

    await comic.save();
    return res
      .status(200)
      .json({ result: "success", message: "Comic save", comic: comic });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function getUserComics(req, res) {
  try {
    const userId = req.userId;
    const userComics = await Comic.find({ user: userId });
    return res.status(200).json(userComics);
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function getUserComic(req, res) {
  const { id } = req.params;
  try {
    const mainComic = await Comic.findById(id); // Busca el cómic principal por su ID

    return res.status(200).json(mainComic); // Retorna los cómics relacionados
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function getAzarComics(req, res) {
  try {
    const response = await Comic.aggregate([{ $sample: { size: 6 } }]);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function putComic(req, res) {
  const { serie, _id, imagesPost } = req.body.comicLoaded;
  try {
    const serieFound = await Serie.findById(serie);
    if (!serieFound) {
      return res
        .status(404)
        .json({ result: "error", message: "Serie not found" });
    }

    serieFound.frontPage = serieFound.frontPage
      ? serieFound.frontPage
      : imagesPost[0];

    if (!serieFound.partsSerie.includes(_id)) {
      serieFound.partsSerie.push(_id);
    }

    await serieFound.save({ timestamps: false });
    return res
      .status(200)
      .json({ result: "success", message: "success updated" });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function postRateComic(req, res) {
  try {
    const { rate, comicId } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);

    const comic = await Comic.findById(comicId);
    const rates = await Rate.find({ comicId: comic._id, userId: user.id });

    if (comic.user.equals(user._id)) {
      return res
        .status(409)
        .json({ result: "error", message: "You can't rate your own comic" });
    }

    if (rates.length > 0) {
      return res
        .status(409)
        .json({ result: "error", message: "Already qualified" });
    }

    const score = new Rate({
      userId: user.id,
      comicId,
      rate,
    });

    await score.save();
    return res
      .status(200)
      .json({ result: "success", message: "Rate save", score: score });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function assignScore(req, res) {
  try {
    const { comicId } = req.body;
    const comic = await Comic.findById(comicId);
    const rates = await Rate.find({ comicId: comic._id });
    const sum = rates.reduce(
      (accumulator, currentRate) => accumulator + currentRate.rate,
      0
    );
    let score = sum / rates.length;

    score = Number(score.toFixed(2));

    comic.score = score;

    await comic.save();

    return res
      .status(200)
      .json({ result: "success", message: "Qualification sent successfully" });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function countViews(req, res) {
  try {
    const { comicId } = req.body;
    const comic = await Comic.findById(comicId);

    comic.views += 1;

    await comic.save();

    return res
      .status(200)
      .json({ result: "success", message: "View sent successfully" });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

export {
  postComic,
  getUserComics,
  getUserComic,
  getAzarComics,
  putComic,
  postRateComic,
  assignScore,
  countViews,
};
