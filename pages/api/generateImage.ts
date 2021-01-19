import { generateImage } from '@/Services/HtmlToImage';

export default async (req: any, res: any) => {
  try {
    const image = await generateImage();
    if (!image) {
      res.statusCode = 500;
      res.end();
      return;
    }

    res.end(image, 'binary');
    return;
  } catch (error) {
    res.statusCode = 500;
    res.end();
    return;
  }
};
