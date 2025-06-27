const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Load users
const users = JSON.parse(fs.readFileSync("users.json"));

// Login API
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    console.log("Login Attempt:", { username, password });

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        console.log("✅ Login successful");
        res.json({ success: true });
    } else {
        console.log("❌ Invalid login");
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
