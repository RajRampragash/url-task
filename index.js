console.log("URL Shortener");
import express from "express"
import dotenv from "dotenv";
import cors from "cors";
// import { userRouter } from "./Routes/user.js";
// import { urlRouter } from "./Routes/url.js";
// import { isAuthenticated } from "./Authendication/useAuth.js";
// import { getURL } from './Controll/url.js';

import { userRouter } from "./Routes/user.js";
import { urlRouter } from "./Routes/url.js";
import { isAuthenticated } from "./Authendicationn/useAuth.js";
import { getURL } from "./Controll/url.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();

//application middleware 
app.use(express.json());
app.use(cors());

//user is the base route 
app.use("/user", userRouter);
app.use("/url", isAuthenticated, urlRouter);

app.get("/", (req, res) => {
    res.send({ msg: "connection working - URL shortener app" });
})

// To get URL redirection from short URL 
app.get('/:urlID', async (req, res) => {
    try {
        const url = await getURL({ urlID: req.params.urlID })
        if (url) {
            console.log("redirecting");
            return res.status(200).json({ longURL: url.longURL })
            //return res.redirect(url.longURL)
        }
        else {
            return res.status(404).json({ message: 'No URL Found' })
        }
    }
    catch (err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
})

app.listen(PORT, () => console.log(`Server started at localhost:${PORT}`))