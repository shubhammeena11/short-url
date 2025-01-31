const {nanoid} = require("nanoid");
const URL = require("../models/url")


async function handelGet(req, res){
    const all = await URL.find({});  
    return res.json(all); 
}
async function port(req, res){
    res.json({ port : process.env.PORT });
}

async function handelDelete (req, res){
    try {
      const result = await URL.deleteMany({});
      res.json({
        message: 'All documents have been successfully deleted.',
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      console.error('Error deleting documents:', error);
      res.status(500).json({ error: 'An error occurred while deleting documents.' });
    }
  };
  

async function handelGenrateNewShortUrl(req, res){
    const {url} = req.body;
    if(!url){
        return res.status(404).json({message : "url is required"})
    }
    shortID = nanoid(8);
    await URL.create({
        shortId : shortID,
        redirectURL : url,
        visitHistory : []
    });
    return res.json({id : shortID})
}

async function handelDeleteById(req, res){
    await URL.findByIdAndDelete(req.params.id);
    if ((req.params.id).length !== 24){
            return res.status(404).json({ status: "error", message: "url not found" });
        }

        // Send success response
        return res.status(200).json({ status: "success", message: "url deleted successfully" });
}

async function handelGetById(req, res){
    if((req.params.id).length !== 24){
        console.log("urlId length must be 24")
        return res.status(404).json({Error : "url not found"});
    }
    else{
        const data = await URL.findById(req.params.id); 
        return res.status(200).json(data);
    }
}

async function shortId(req, res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push : {
            visitHistory : {
                timestamp : Date.now()
            }
        }
    });
    console.log(`entry${entry}`)
    res.redirect(entry.redirectURL)
}
async function handelAnalytic(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});

    return res.json(
       { totalClicks : result.visitHistory.length,
        analytic : result.visitHistory}
    )

}

module.exports = {
    handelGenrateNewShortUrl,
    handelDeleteById,
    handelGetById,
    shortId,
    handelAnalytic,
    handelGet,
    handelDelete,
    port
}