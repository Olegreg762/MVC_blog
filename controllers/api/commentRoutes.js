const router = require("express").Router;
const {Comment} = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
        res.status(200).json(commentData);
        }catch (err){
            res.status(400).json(err);
        } 
});

router.get("/:id", async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {id: req.params.id}
        });
        res.status(200).json(commentData)
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", async (req,res) => {
    try{
        const commentData = await Comment.update(
            {
                comment_body: req.body.comment_body
            },
            {
                where: {id: req.params.id}
            }
        )
    }catch (err) {
        res.status(400).json(err)
    }
});

router.delete("/:id", async (req,res) => {
    try {
        const commentId = await Comment.destroy({
            where: {id: req.params.id}
        })
    }catch {
        res.status(400).json(err)
    }
});