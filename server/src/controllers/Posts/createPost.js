import posts from "../../schema/posts.js"
import { postFormater } from "../../utils/PostFormater.js";


export const createPost = async (req, res) => {
      console.log(req.body);

      const owner = req.user._id;
      const { message } = req.body;

      try {
            if (!message) {
                  return res.status(400).send({ status: 400, message: "Message is required" });
            }

            let base64Image = null;

            if (req.file) {
                  const mimeType = req.file.mimetype;
                  const base64 = req.file.buffer.toString("base64");
                  base64Image = `data:${mimeType};base64,${base64}`;
            }


            const newPost = new posts({
                  owner,
                  message,
                  image: base64Image,
            });


            await newPost.save();
            const savedPost = await posts.findById(newPost._id).lean();
            const responseData = await postFormater([savedPost], req.user);

            console.log(responseData);


            return res.status(201).send({
                  status: 201,
                  ok: true,
                  message: "Post created successfully",
                  data: responseData,
            });
      } catch (error) {
            return res.status(500).send({
                  status: 500,
                  message: "Server error",
                  error: error.message,
            });
      }
};

