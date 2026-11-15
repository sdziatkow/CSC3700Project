const express = require('express'); // Framework.
const bodyParser = require('body-parser'); // Parses the body of incoming http requests.
const cors = require('cors');

// Custom routes.
const courseRoutes = require('./routes/courses');
const completionRoutes = require('./routes/completions');

const app = express();
app.use(cors({origin: process.env.CLIENT_ORIGIN}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", courseRoutes);
app.use("/api", completionRoutes);
app.use("/", (req, res) => {
    res.status(404).json({error: "Route Not Found"});
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
