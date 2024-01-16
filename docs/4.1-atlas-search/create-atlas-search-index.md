---
sidebar_position: 1
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Create Atlas Vector Search Index

Lets move back to the **Data Services** and **Database** tab.

### Atlas search index creation

1. First navigate to your cluster "Atlas Search" section and press the "Create Index" button.

<img
      alt="Delete record prerequistes.  "
      src={useBaseUrl('/img/chapter-5-atlas-search/createIndexStart1.png')}
      width="700"
      style={{boxShadow: '5px 5px 5px #ccc'}}
      border="1px"
  />

1. Click **Create Search Index**.
1. Chose the Atlas Vector Search Index and click "Next".
1. Select the "bedrock" database and "products" collection.
1. Paste the following index definition:
```
{
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 1024,
      "similarity": "dotProduct"
    }
  ]
}
```
1. Click **Create** and wait for the index to be created.
1. The index is going to go through a build phase and will appear "Active" eventually



 


Now you are ready to write `$search` aggregations for Atlas Search.