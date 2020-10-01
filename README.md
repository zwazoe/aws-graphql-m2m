# Description

- Create many to many relations with AWS Grapqhl

# Install

```
npm i aws-graphql-m2m
```

# Usage

```
import {AWSM2M} from 'aws-graphql-m2m';
import {createCheckbox} from '../../graphql/mutations

// call the initial graphql item.
const res = await API.graphql(
    graphqlOperation(createCheckbox, { input })
);

await AWSM2M({
    product: res.data.createChecbox,
    to_connect,
    page,
});


```
