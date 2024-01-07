import React from 'react';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Website({httpEndpoint}) {

  const [rows, setRows] = useState([])

   // Load initial data
    useEffect(() => {
       console.log('httpEndpoint', httpEndpoint)
        getResults();
    }, []);
   
    // Run search
    function runSearch()
    {
       
        const searchTerm = document.getElementById('search-term').value;
        getResults(searchTerm);
    }

    // Get results
    function getResults(term)
    {

        // If no URL, set to empty string
        if (httpEndpoint === '')
        {
            setRows([ {"_id" : 1,"name" : "EMPTY URL", "address" : {"market" : "EMPTY URL"},"description" : "EMPTY URL","flights" : 0}])
            return;
        }
        
        setRows([ {"_id" : 1,"name" : "Loading...", "address" : {"market" : "Loading..."},"description" : "Loading...","flights" : 0}])
        // Try to fetch the relevant search term from the webhooks endpoint
        axios({method: 'get',
        url: `${httpEndpoint}?term=${term}`})
        .then(response => {
           console.log('response', response.data)
            setRows(response.data)
       
        })
        .catch(error => {
            setRows([ {"_id" : 1,"name" : "BAD URL , ERROR 404", "address" : {"market" : "BAD URL , ERROR 404"},"description" : "BAD URL , ERROR 404","flights" : 0}])
            
          console.error(error);
        });

    }

    function highlightedDescription(description, highlights) {
        if (!highlights || highlights.length === 0) return description;
      
        const highlightColor = 'yellow';
      
        let highlightedText = description;
      
        highlights.forEach((highlight) => {
          const { path, texts } = highlight;
      
          texts.forEach((textObj) => {
            if (textObj.type === 'hit') {
              const highlightedWord = `<span style="background-color: ${highlightColor}">${textObj.value}</span>`;
              highlightedText = highlightedText.replace(textObj.value, highlightedWord);
            }
          });
        });
      
        return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
      }

  return (
    // Simple search form
   <div className="container">
    <form>
        <input type="text" id="search-term" name="search-term" placeholder='Search...'/>
        <button onClick={()=> {runSearch()}} type="button" id="search-btn">Search</button>
        <hr></hr>
    </form>
    <table id="results-table">
        <thead>
        <tr>
            <th>Name</th>
            <th>City</th>
            <th>Summary</th>
            <th>No. Flights</th>
        </tr>
        </thead>
            {
                rows.map((row, index) => (
                    <tr key={index}>
                      <td>{row.name}</td>
                      <td>{row.address.market}</td>
                      <td>{highlightedDescription(row.description, row.highlights)}</td>
                      <td>{row.flights.length}</td>
                    </tr>
                  ))
            }
        <tbody>

        </tbody>
    </table>
  </div>
  );
}