import express, { Request, Response, Application } from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.static("dist"));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`Skyloft server listening on port ${port}`);
});
