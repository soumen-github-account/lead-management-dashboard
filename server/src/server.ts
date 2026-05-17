import app from "./app.js"
import connectDb from "./config/db.js";
import logger from "./utils/logger.js";
const PORT = process.env.PORT || 5000;

connectDb()

app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`);
  logger.info(`Server running on port ${PORT}`);
});