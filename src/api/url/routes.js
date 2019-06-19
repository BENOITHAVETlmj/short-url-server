const express = require("express");
const router = express.Router();
const Url = require("./model");
const uid2 = require("uid2");
const validUrl = require("valid-url");

router.get("/", async (req, res) => {
  try {
    const urlList = await Url.find();
    res.json(urlList);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

router.post("/create/url", async (req, res) => {
  // console.log(req.body.originalUrl);
  //Verifier si l'Url est valide
  console.log(validUrl.isUri(req.body.originalUrl));

  try {
    if (validUrl.isUri(req.body.originalUrl)) {
      //L'adresse existe t'elle déjà?
      const urlExists = await Url.findOne({
        originalUrl: req.body.originalUrl
      });

      if (urlExists) {
        res.status(406).json({
          error: { message: "This Url already exists in the list" }
        });
      } else {
        const randomString = uid2(5);
        // vérifier que l'Url short n'existe pas
        const shortURlExist = await Url.findOne({
          shortUrl: randomString
        });

        if (shortURlExist) {
          randomString = uid2(5);
          //On recréé une random string
        }
        const newUrl = new Url({
          originalUrl: req.body.originalUrl,
          shortUrl: randomString
        });
        await newUrl.save();
        return res.status(201).json(newUrl);
      }
    } else {
      return res.status(401).json("This URL is not a valid URL!");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

router.get("/:url", async (req, res) => {
  try {
    const shortenUrl = req.params.url;
    const getUrl = await Url.findOne({ shortUrl: shortenUrl });
    const originalUrl = getUrl.originalUrl;

    getUrl.visits += 1;
    await getUrl.save();
    return res.redirect(originalUrl);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
