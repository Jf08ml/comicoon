import Comic from "../models/comic";
import User from "../models/users";
import Serie from "../models/serie";

async function postSerie(req, res) {
  const {
    serie: { name, description, frontPage, artist, contentType, keywords },
  } = req.body;

  try {
    // Asegurar existencia del usuario, descomentar las siguientes líneas
    /*
    const userExists = await User.exists({ _id: req.userId });
    if (!userExists) {
      return res.status(404).json({ result: "error", message: "User not found" });
    }
    */

    const serie = new Serie({
      userId: req.userId,
      name,
      description,
      artist,
      frontPage,
      contentType,
      keywords,
    });

    await serie.save();
    return res.status(200).json({ result: "success", serie_id: serie._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      result: "error",
      message: "An error occurred while saving the series.",
    });
  }
}

async function putComicInSerie(req, res) {
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

async function getUserSeries(req, res) {
  try {
    const userId = req.userId;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const skipIndex = (page - 1) * limit;

    // Obtener las series del usuario
    const userSeriesQuery = Serie.find({ userId: userId })
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skipIndex);
    const userSeries = await userSeriesQuery.exec();

    // Obtener el total de registros
    const totalCountQuery = Serie.countDocuments({ userId: userId });
    const totalCount = await totalCountQuery.exec();
    const total = Math.ceil(totalCount / limit);

    return res.status(200).json({
      series: userSeries,
      totalCount: total,
    });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function getUserSerie(req, res) {
  const { id } = req.params;
  try {
    const mainSerie = await Serie.findById(id);

    return res.status(200).json(mainSerie);
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function assignScoreSerie(req, res) {
  try {
    const { serieId } = req.body;
    const serie = await Serie.findById(serieId);
    if (!serie) {
      // Manejar el caso cuando la serie no existe
      return res
        .status(404)
        .json({ result: "error", message: "Serie not found" });
    }
    const rates = await Comic.find({ serie: serie._id });
    const filteredRates = rates.filter((currentRate) => currentRate.score > 0);
    const sum = rates.reduce((accumulator, currentRate) => {
      if (currentRate.score > 0) {
        return accumulator + currentRate.score;
      }
      return accumulator;
    }, 0);
    const count = filteredRates.length;

    let score = sum / count;

    score = Number(score.toFixed(2));

    serie.score = score;

    await serie.save();

    return res
      .status(200)
      .json({ result: "success", message: "Qualification sent successfully" });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function countViewsSerie(req, res) {
  try {
    const { serieId } = req.body;
    const serie = await Serie.findById(serieId);
    const comics = await Comic.find({ serie: serie._id });
    const views = comics.reduce((accumulator, comic) => {
      return accumulator + comic.views;
    }, 0);

    serie.views = views;

    await serie.save();

    return res
      .status(200)
      .json({ result: "success", message: "Views update successfully" });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function getAzarSeries(req, res) {
  try {
    const response = await Serie.aggregate([{ $sample: { size: 6 } }]);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function getSeriesData(req, res) {
  const { type, queryType } = req.params; // queryType puede ser 'mostviews', 'newer', 'popular', 'artists'
  const validTypes = ["Animated", "Real", "All"];
  const validQueryTypes = ["mostviews", "newer", "popular", "artists"];

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    if (!validTypes.includes(type) || !validQueryTypes.includes(queryType)) {
      return res
        .status(400)
        .json({ result: "error", message: "Invalid parameters" });
    }

    let filter = type === "All" ? {} : { typeContent: type };
    let series;

    switch (queryType) {
      case "mostviews":
        series = await Serie.find(filter).limit(limit).skip(skipIndex);
        series.sort((a, b) => b.views - a.views);
        break;
      case "newer":
        series = await Serie.find(filter)
          .sort({ uploadData: -1 })
          .limit(limit)
          .skip(skipIndex);
        break;
      case "popular":
        series = await Serie.find(filter).limit(limit).skip(skipIndex);
        series = series.map((serie) => {
          const clonedSerie = serie.toObject();
          clonedSerie.popularity = (clonedSerie.views + clonedSerie.score) / 2;
          return clonedSerie;
        });
        series.sort((a, b) => b.popularity - a.popularity);
        break;
      case "artists":
        series = await Serie.find(filter);
        const artists = [];
        series.forEach((serie) => {
          const existingArtist = artists.find(
            (artist) => artist.name === serie.artist
          );
          if (!existingArtist) {
            artists.push({
              name: serie.artist,
              views: serie.views,
              score: serie.score,
            });
          } else {
            existingArtist.views += serie.views;
            existingArtist.score += serie.score;
          }
        });
        artists.forEach((artist) => {
          artist.popularity = (artist.views + artist.score) / 2;
        });
        artists.sort((a, b) => b.popularity - a.popularity);
        return res
          .status(200)
          .json({ result: "success", top10Artists: artists.slice(0, 10) });
    }

    const totalCount = await Serie.countDocuments(filter);
    const total = Math.ceil(totalCount / limit);

    return res
      .status(200)
      .json({ result: "success", series, totalCount: total });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error.message });
  }
}

async function getArtistSeries(req, res) {
  const { artist } = req.params;

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    const series = await Serie.find({ artist: artist })
      .limit(limit)
      .skip(skipIndex);

    const totalCount = await Serie.countDocuments({ artist: artist });
    const total = Math.ceil(totalCount / limit);

    return res
      .status(200)
      .json({ result: "success", series: series, totalCount: total });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function searchSerie(req, res) {
  const { nameSerie } = req.params;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    const SeriesFound = await Serie.find({
      nameSerie: { $regex: nameSerie, $options: "i" },
    })
      .limit(limit)
      .skip(skipIndex);

    const totalCount = await Serie.countDocuments({
      nameSerie: { $regex: nameSerie, $options: "i" },
    });
    const total = Math.ceil(totalCount / limit);

    if (SeriesFound.length > 0) {
      return res
        .status(200)
        .json({ result: "success", series: SeriesFound, totalCount: total });
    } else {
      return res.status(200).json({ value: false, message: "Serie not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error searching serie" });
  }
}

async function getSeriesToInscribe(req, res) {
  try {
    const userId = req.userId;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const skipIndex = (page - 1) * limit;

    const userSeriesQuery = Serie.find({
      userId: userId,
      $or: [{ inscribed: false }, { inscribed: { $exists: false } }],
    })
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skipIndex);
    const userSeries = await userSeriesQuery.exec();

    const totalCountQuery = Serie.countDocuments({
      userId: userId,
      $or: [{ inscribed: false }, { inscribed: { $exists: false } }],
    });
    const totalCount = await totalCountQuery.exec();
    const total = Math.ceil(totalCount / limit);

    return res.status(200).json({
      series: userSeries,
      totalCount: total,
    });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function enteredSeries(req, res) {
  const { serie } = req.params;
  try {
    const serieFound = await Serie.findById(serie);
    if (!serieFound) {
      return res
        .status(404)
        .json({ result: "error", message: "Serie not found" });
    }

    // Actualizar todos los cómics en serieFound.partsSerie en una sola operación
    await Comic.updateMany(
      { _id: { $in: serieFound.partsSerie } },
      { $set: { inscribed: true } }
    );

    serieFound.inscribed = true;
    await serieFound.save();

    return res
      .status(200)
      .json({ result: "success", message: "Inscribed success" });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error.message });
  }
}

export {
  postSerie,
  putComicInSerie,
  getUserSeries,
  getUserSerie,
  assignScoreSerie,
  countViewsSerie,
  getAzarSeries,
  getSeriesData,
  getArtistSeries,
  searchSerie,
  getSeriesToInscribe,
  enteredSeries,
};
