import React from 'react';

import { useEffect, useState } from 'react';
import Website from './website';

export default function WebsiteWrapper() {

  const [httpEndpoint, setHttpEndpoint] = useState('')

  return (
    <div className="container">
        Place HTTP endpoint here : <input style={{width: '100%'}} placeholder="https://xxxx.aws.data.mongodb-api.com/app/<APP-ID>/endpoint/getSearch" type="text" value={httpEndpoint} onChange={(e) => setHttpEndpoint(e.target.value)}></input>
        <br/>
        Once you have entered the HTTP endpoint, click the button below to see the results.
        <hr></hr>
        <Website httpEndpoint={httpEndpoint}/>
    </div>
  );
}