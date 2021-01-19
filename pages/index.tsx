import { useState } from 'react';

export default function Index() {
  const [showImage, setShowImage] = useState<boolean>(false);

  return (
    <div>
      <h3>The application has 3 pages.</h3>
      <ul>
        <li>
          <a href="/">This page</a>
        </li>
        <li>
          <a href="/image/example">
            An html page designed to be used as an image
          </a>
        </li>
        <li>
          <a href="/api/generateImage">
            An api endpoint that uses Puppeteer to screenshot and return the
            above page
          </a>
        </li>
      </ul>

      <br />
      <h4>
        Press the button below to execute the API route, and display the
        resultant screenshot
      </h4>
      <button onClick={() => setShowImage(true)}>Render and show image</button>
      {showImage && <img src="/api/generateImage" />}
    </div>
  );
}
