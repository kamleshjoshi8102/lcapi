const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
const fetch = import("node-fetch");

let lc = require("../lc");

app.get("/", (req, res) => {
  res.send(`
      <div style="text-align: center; background-color: #f9f9f9; padding: 20px; margin-top: 10%; font-family: Arial, sans-serif;">
        <h1 style="color: #ff6f00; margin-bottom: 20px;">👋 Hey there!</h1>
        <p style="font-size: 18px; color: #424242; margin-bottom: 10px;">You can get your LeetCode data by visiting the following link:</p>
        <p style="font-size: 24px; color: #00bcd4; margin: 10px 0; word-wrap: break-word; font-weight: bold;">API URL: https://lcapi.cyclic.app//lcUsername</p>
        <p style="font-size: 18px; color: #424242;">Just replace "yourLeetcodeUsername" with your actual LeetCode username, and you'll be able to access your LeetCode information through the API. Happy coding! 😊</p>
        
        <hr style="margin: 20px 0;">
        
        <footer style="text-align: center; margin-top: 20px; background-color: #f9f9f9; padding: 10px; font-family: Arial, sans-serif;">
        <h2 style="color: #ff6f00; margin-bottom: 10px;">KAMLESH JOSHI</h2>
        <p>Software Development Engineer</p>
        <p style="color: #1E90FF;">🌐 <b>Portfolio</b>: <a href="http://kamlesh-joshi.vercel.app" target="_blank" style="color: #1E90FF; text-decoration: none;">kamlesh-joshi.vercel.app</a></p>
        <p style="color: #FF4500;">📧 <b>Email Id</b>: j.kamlesh8102@gmail.com</p>
        <p style="color: #333;">🐱 <b>GitHub</b>: <a href="https://github.com/kamleshjoshi8102" target="_blank" style="color: #333; text-decoration: none;">kamleshjoshi8102</a></p>
        <p style="color: #1DA1F2;">🐦 <b>Twitter</b>: <a href="https://twitter.com/spyd3r17" target="_blank" style="color: #1DA1F2; text-decoration: none;">@spyd3r17</a></p>
        <p style="color: #000080;">📞 <b>Phone</b>: +917088354111</p>
        
      </div>
  
      </footer>
    `);
});

app.get("/:id", lc.leetcode);

app.listen(PORT, () => {
  console.log(`Cool Now App is running on port ${PORT}`);
});
 