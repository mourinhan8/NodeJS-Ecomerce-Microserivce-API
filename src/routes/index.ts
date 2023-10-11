import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const strCompress = 'Hello world';

  res.status(200).json({
    message: 'Hello World',
    metadata: strCompress.repeat(10000),
  });
});

export default router;