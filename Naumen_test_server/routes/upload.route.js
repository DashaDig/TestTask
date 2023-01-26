const { Router } = require("express");
const fileMiddleware = require("../middleware/file");

const router = Router();

router.post("/upload-file", fileMiddleware.single("file"), (req, res) => {
    try{
        res.json(req.file);
    } catch (error){
        console.log(error)
    }
});


module.exports = router