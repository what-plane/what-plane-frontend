# WhatPlane React Frontend

Static React frontend for WhatPlane, using Typescript. Deployed on Azure Static
Web Apps. Built using Grommet and React Dropzone.

[WhatPlane](https://whatplaneis.it) to view the app.

## Architecture:

![WhatPlane Architecture](public/images/WhatPlane-Azure.png)

## Services

- `storage.ts`: Service that connects to Azure Blob Storage to upload images.
- `predictions.ts`: Service that sends the image to the WhatPlane API and
  receives the prediction.
- `classes.ts`: Service that receives the up-to-date class names from the
  WhatPlane
- `api/ImageSAS/`: API that connects to Azure and generates authentication and
  UUID for each image upload
