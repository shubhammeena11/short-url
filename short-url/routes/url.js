const express = require("express");
const {handelGenrateNewShortUrl, handelGet, handelDelete,handelDeleteById, handelGetById, shortId, handelAnalytic,port} = require ("../controllers/url");

const router = express.Router();

router.post("/",handelGenrateNewShortUrl);
router.get("/",handelGet);
router.delete("/",handelDelete);
router.get("/port",port);
router.delete("/:id",handelDeleteById); 
router.get("/:id",handelGetById);
router.get("/redirect/:shortId",shortId);
router.get("/analytic/:shortId",handelAnalytic)

module.exports = router;
