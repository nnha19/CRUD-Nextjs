import connectDB from "../../../connectDB";

import Posts from "../../../models/Posts";
import checkAuthorization from "../../../middlewares/checkAuthorization";

const handler = async (req, res, next) => {
  connectDB();
  if (req.method === "POST") {
    checkAuthorization(req, res, next);
    const { title, description, creator } = req.body;
    const newPost = await Posts.create({
      creator,
      title,
      description,
      likes: [],
      comments: [],
      createdAt: new Date(),
    });
    console.log(newPost);
    res.status(200).json({ newPost });
  } else if (req.method === "GET") {
    const allPosts = await Posts.find({});
    res.status(200).json(allPosts);
  } else {
    res.status(500).json({ msg: "This http request method is not supported." });
  }
};

export default handler;
