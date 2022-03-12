import express, { Request, Response } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
const app = express();
const port = 2784;
app.use(bodyParser.json());
app.use(morgan('tiny')); //Add in logging to record when images are processed or accessed.

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello From Egypt! :D');
});

app.use((_req: Request, res: Response): void => {
  res.status(404).send("ops! can't find what you are looking for :(");
});
// in case the user requested the wrong link
app.listen(port, () => {
  console.log(`server is up and running :D on port ${port}`);
});
