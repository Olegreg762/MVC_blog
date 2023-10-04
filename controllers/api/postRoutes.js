const router = require("express").Router();
const {Post, User} = require("../../models");
const withAuth = require("../../utils/auth");

router.get('/', async (res,req) => {
    try{
        const postData = await Post.findAll({
            attributes: ["id", "title", "content", "created_at"],
            order: [["created_at", "DESC"]],
            include: [
                {model: User, attributes:["username"]},
                {
                    model: Comment,
                    attributes:[
                        "id",
                        "comment_text",
                        "post_id",
                        "user_id",
                        "creeated_at"
                    ],
                    include: {
                        model: User,
                        attributes: ["username"]
                    }
                },
            ]
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get("/:id", async (req, res) =>{
    try{
        const postData = await Post.findOne({
            attributes: ["id", "title", "content", "created_at"],
            include: [
                {model: User, attributes:["username"]},
                {
                    model: Comment,
                    attributes:[
                        "id",
                        "comment_text",
                        "post_id",
                        "user_id",
                        "creeated_at"
                    ],
                    include: {
                        model: User,
                        attributes: ["username"]
                    }
                },
            ]
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/", withAuth, async (req,res) =>{
    try{
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.id
        });
        res.status(200).json(postData)
    }catch (err) {
        res.status(400).json(err)
    }
});

router.put("/:id", withAuth, async (req, res) => {
    try{
        const postData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {id: req.params.id}
            }
        )
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(postData)
    }
});

router.delete("/:id", withAuth, async (req,res) => {
    try{
        const postData = await Post.destroy({
            where: req.params.id
        })
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;