"use strict";(self.webpackChunkaws_bedrock_mongodb_atlas_workshop=self.webpackChunkaws_bedrock_mongodb_atlas_workshop||[]).push([[244],{8429:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var s=t(5893),r=t(1151),i=t(9524);const o={sidebar_position:3},a="Setup the backend logic",c={id:"3.1-app-services /create-app-webhook",title:"Setup the backend logic",description:"Our main functionality will relay on a user HTTP endpoint which will orcestrate the logic of the game. The input from the user will be turned into a MultiModel embedding via AWS Titan multi model AI and will be passed to Atlas search to find the relevant document.",source:"@site/docs/3.1-app-services /create-app-webhook.mdx",sourceDirName:"3.1-app-services ",slug:"/3.1-app-services /create-app-webhook",permalink:"/atlas-bedrock-crime-story-workshop/docs/3.1-app-services /create-app-webhook",draft:!1,unlisted:!1,editUrl:"https://github.com/mongodb-developer/atlas-bedrock-crime-story-workshop/blob/main/docs/3.1-app-services /create-app-webhook.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Create Values & Secrets",permalink:"/atlas-bedrock-crime-story-workshop/docs/3.1-app-services /create-app-components"},next:{title:"Add atlas search vector index - Crime Story",permalink:"/atlas-bedrock-crime-story-workshop/docs/category/add-atlas-search-vector-index---crime-story"}},d={},l=[{value:"Create application search http endpoint",id:"create-application-search-http-endpoint",level:2},{value:"Import data into Atlas",id:"import-data-into-atlas",level:2},{value:"Create an endpoint to register users/ save and retrieve chats",id:"create-an-endpoint-to-register-users-save-and-retrieve-chats",level:2}];function h(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"setup-the-backend-logic",children:"Setup the backend logic"}),"\n",(0,s.jsx)(n.p,{children:"Our main functionality will relay on a user HTTP endpoint which will orcestrate the logic of the game. The input from the user will be turned into a MultiModel embedding via AWS Titan multi model AI and will be passed to Atlas search to find the relevant document.\nThe document will be returned to the user along with a prompt that will engenieer a RAG response from Cohere LLM."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsxs)(n.em,{children:["Cohere LLM ",(0,s.jsx)(n.code,{children:"cohere.command-light-text-v14"})," is part of the AWS Bedrock base model suite."]})}),"\n",(0,s.jsx)(n.h2,{id:"create-application-search-http-endpoint",children:"Create application search http endpoint"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["On the ",(0,s.jsx)(n.strong,{children:"App Services"})," application navigate to ",(0,s.jsx)(n.strong,{children:"HTTPS Endpoints"})," section."]}),"\n",(0,s.jsxs)(n.li,{children:["Create a new POST endpoint by clicking ",(0,s.jsx)(n.strong,{children:"Add An Endpoint"})," with a path of ",(0,s.jsx)(n.code,{children:"/getSearch"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Important!"})," toggle the ",(0,s.jsx)(n.strong,{children:"Response With Result"})," to ",(0,s.jsx)(n.strong,{children:"On"}),"."]}),"\n",(0,s.jsx)(n.li,{children:'The logic of this endpoint will get a "term" from the query string and search for that term, if no term is provided it will return first 15 results'}),"\n"]}),"\n",(0,s.jsx)("img",{alt:"Security quickstart page highlighting the 'Database' tab in the left-hand menu",src:(0,i.Z)("/img/chapter-2-app-services/httpSearchConfig.png"),width:"700",border:"1"}),"\n",(0,s.jsxs)(n.ol,{start:"4",children:["\n",(0,s.jsxs)(n.li,{children:["Add under ",(0,s.jsx)(n.strong,{children:"Function"})," and ",(0,s.jsx)(n.strong,{children:"New Function"})," (name : ",(0,s.jsx)(n.code,{children:"getProducts"}),") the following function logic:"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'// Function Name : getProducts\nexports = async function({ body }, response) {\n  \n  // Import required SDKs and initialize AWS BedrockRuntimeClient\n  const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");\n  const client = new BedrockRuntimeClient({\n    region: \'us-east-1\',\n    credentials: {\n      accessKeyId: context.values.get(\'AWS_ACCESS_KEY\'), \n      secretAccessKey: context.values.get(\'AWS_SECRET_KEY\')\n    }\n  });\n  \n  // MongoDB and AWS SDK service setup\n  const serviceName = "mongodb-atlas";\n  const dbName = "bedrock";\n  const collName = "products";\n  const collection = context.services.get(serviceName).db(dbName).collection(collName);\n\n\n  // Function to run AWS model command\n  async function runModel(command, body) {\n    command.body = JSON.stringify(body);\n    const listCmd = new InvokeModelCommand(command);\n    const listResponse = await client.send(listCmd);\n    return JSON.parse(Buffer.from(listResponse.body));\n  }\n  \n  // Function to generate list query for text input\nfunction generateListQuery(text) {\n  const listDescPrompt = `Please build a json only list (can be 1 item) eg. {productList : [{"product" : "<NAME>" , "quantity" : <NUMBER>}]} stop output after json fully generated. \n      The list for ${text}. Complete {productList : `;\n  return {\n    "prompt": listDescPrompt,\n    "temperature": 0\n  };\n}\n\n// Function to process list items\nasync function processListItems(productList, embedCmd) {\n  let retDocuments = [];\n  for (const product of productList) {\n    const embedBody = { \'inputText\': product.product };\n    const resEmbedding = await runModel(embedCmd, embedBody);\n    const items = await collection.aggregate([\n      vectorSearchQuery(resEmbedding.embedding), {"$project" : {"embedding" : 0}}\n    ]).toArray();\n    retDocuments.push(items[0]);\n  }\n  return retDocuments;\n}\n\n// Function to process a single item\nasync function processSingleItem(doc) {\n  const items = await collection.aggregate([\n    vectorSearchQuery(doc.embedding), {"$project" : {"embedding" : 0}}]).toArray();\n  return items;\n}\n\n// Function to create vector search query\nfunction vectorSearchQuery(embedding) {\n  return {\n    "$vectorSearch": {\n      "queryVector": embedding,\n      "index": "vector_index",\n      "path": "embedding",\n      "numCandidates": 15,\n      "limit": 1\n    }\n  };\n}\n\n  // Parsing input data\n  const { image, text } = JSON.parse(body.text());\n\n  try {\n    let embedCmd = {\n      "modelId": "amazon.titan-embed-image-v1",\n      "contentType": "application/json",\n      "accept": "*/*"\n    };\n    \n    // Process text input\n    if (text) {\n      const genList = generateListQuery(text);\n      const listResult = await runModel({ "modelId": "cohere.command-light-text-v14", "contentType": "application/json",\n      "accept": "*/*" }, genList);\n      const list = JSON.parse(listResult.generations[0].text);\n      console.log(\'list\', JSON.stringify(list));\n\n      let retDocuments = await processListItems(list.productList, embedCmd);\n      console.log(\'retDocuments\', JSON.stringify(retDocuments));\n       let prompt, success = true;\n       prompt = `In one simple sentence explain how the retrieved docs: ${JSON.stringify(retDocuments)} \n       assisting in locating/creating: ${text}  `;\n  \n      // Generate text based on the prompt\n         genQuery = {\n          "prompt": prompt,\n          "temperature": 0\n        };\n    \n         textGenInput = {\n          "modelId": "cohere.command-light-text-v14",\n          "contentType": "application/json",\n          "accept": "*/*"\n        };\n      \n        const assistantResponse = await runModel(textGenInput, genQuery);\n        console.log(\'assistant\', JSON.stringify(assistantResponse));\n         retDocuments[0].assistant = assistantResponse.generations[0].text;\n      \n      return retDocuments;\n    }\n\n    // Process image or other inputs\n    if (image) {\n      const doc = await runModel(embedCmd, { inputImage: image });\n      return await processSingleItem(doc);\n    }\n\n  } catch (err) {\n    console.error("Error: ", err);\n    throw err;\n  }\n};\n\n\n\n\n'})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.em,{children:"Please be aware that this logic will not fully work yet, as we need to setup the Atlas search index in the next section"})}),"\n",(0,s.jsxs)(n.p,{children:["Click ",(0,s.jsx)(n.strong,{children:"Save Draft"})," and follow the ",(0,s.jsx)(n.strong,{children:"Review Draft & Deploy"})," process."]}),"\n",(0,s.jsxs)(n.p,{children:["Make sure to keep the http ",(0,s.jsx)(n.strong,{children:"callback URL"})," as we will use it in our final chapter when consuming the data from the front end application."]}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsxs)(n.p,{children:["The url will usually look something like: ",(0,s.jsx)(n.code,{children:"https://us-east-1.aws.data.mongodb-api.com/app/<APP-ID>/endpoint/getSearch"})]})}),"\n",(0,s.jsx)(n.p,{children:'Make sure that the function created (eg. getProducts) is on "SYSTEM" privilege for this demo.'}),"\n",(0,s.jsx)("img",{alt:"Security quickstart page highlighting the 'Database' tab in the left-hand menu",src:(0,i.Z)("/img/chapter-1-mongodb-atlas/httpEndpoint.png"),width:"700",border:"1"}),"\n",(0,s.jsxs)(n.p,{children:["This page can be accessed by going to the ",(0,s.jsx)(n.strong,{children:"Functions"})," tab and looking at ",(0,s.jsx)(n.strong,{children:"Settings"})," tab of the relevant function."]}),"\n",(0,s.jsx)(n.h2,{id:"import-data-into-atlas",children:"Import data into Atlas"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Now we will import the data into Atlas from our ",(0,s.jsx)(n.a,{href:"https://github.com/mongodb-developer/atlas-bedrock-crime-story-demo",children:"github repo"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["On the ",(0,s.jsx)(n.strong,{children:"Data Services"})," main tab click your cluster name."]}),"\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.strong,{children:"Collections"})," tab."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:'We will start by going into "bedrock" databse and importing the "products" collection.'}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:['Click "Insert Dumcument" or "Add My Own Data" (if present) and switch to the document view. Paste the content of the ',(0,s.jsx)(n.a,{href:"https://raw.githubusercontent.com/mongodb-developer/atlas-bedrock-crime-story-demo/main/data/products.json",children:'"products.json"'}),' file from the "data" folder in the repository.']}),"\n",(0,s.jsxs)(n.li,{children:['Click "Insert" and wait for the data to be imported.',"\n",(0,s.jsx)("img",{alt:"Insert data into the evidence collection",src:(0,i.Z)("/img/chapter-2-app-services/insertDocs.png"),width:"700",border:"1"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"create-an-endpoint-to-register-users-save-and-retrieve-chats",children:"Create an endpoint to register users/ save and retrieve chats"}),"\n",(0,s.jsx)(n.p,{children:"We will use the app services to create an endpoint to register users/ save and retrieve chats."}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"/registerUser"})," - will register a user and save it to the database"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Navigate to the ",(0,s.jsx)(n.strong,{children:"Endpoints"})," section and click ",(0,s.jsx)(n.strong,{children:"Add an Endpoint"})," by following this configuration:"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Endpoint"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Name"}),": ",(0,s.jsx)(n.code,{children:"registerUser"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Path"}),": ",(0,s.jsx)(n.code,{children:"/registerUser"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Method"}),": ",(0,s.jsx)(n.code,{children:"POST"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Resonse with Result"}),": ",(0,s.jsx)(n.code,{children:"Yes"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Function"})}),"\n",(0,s.jsxs)(n.p,{children:["Name : ",(0,s.jsx)(n.code,{children:"registerUser"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'// This function is the endpoint\'s request handler.\nexports = async function({ query, headers, body}, response) {\n    // Data can be extracted from the request as follows:\n\n\n    // Raw request body (if the client sent one).\n    // This is a binary object that can be accessed as a string using .text()\n    const user = JSON.parse(body.text());\n    \n\n \n    // Querying a mongodb service:\n    const registration = await context.services.get("mongodb-atlas").db("bedrock").collection("players").updateOne({player: user.player},\n    {$set : {\n      player : user.player,\n      email : user.email\n    }, $setOnInsert : {stage: 0, retry: 0}},{upsert: true});\n\n\n    return registration;\n};\n'})}),"\n",(0,s.jsxs)(n.ol,{start:"2",children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"/getChats"})," - will save a chat to the database"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Endpoint"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Name"}),": ",(0,s.jsx)(n.code,{children:"getChats"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Path"}),": ",(0,s.jsx)(n.code,{children:"/getChats"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Method"}),": ",(0,s.jsx)(n.code,{children:"GET"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Resonse with Result"}),": ",(0,s.jsx)(n.code,{children:"Yes"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Function"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'// This function is the endpoint\'s request handler.\nexports = async function({ query, headers, body}, response) {\n    // Data can be extracted from the request as follows:\n\n  \n    const {player } = query;\n\n    // Querying a mongodb service:\n     const doc = await context.services.get("mongodb-atlas").db("bedrock").collection("players").findOne({"player" : player}, {messages : 1})\n\n    return doc;\n\n};\n'})}),"\n",(0,s.jsxs)(n.ol,{start:"3",children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"/saveChats"})," - will save a chat to the database"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Endpoint"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Name"}),": ",(0,s.jsx)(n.code,{children:"saveChats"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Path"}),": ",(0,s.jsx)(n.code,{children:"/saveChats"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Method"}),": ",(0,s.jsx)(n.code,{children:"POST"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Resonse with Result"}),": ",(0,s.jsx)(n.code,{children:"Yes"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Function"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'// This function is the endpoint\'s request handler.\nexports = async function({ query, headers, body}, response) {\n    // Data can be extracted from the request as follows:\n\n\n    // Headers, e.g. {"Content-Type": ["application/json"]}\n    const contentTypes = headers["Content-Type"];\n\n\n    const {player , messages } = JSON.parse(body.text());\n\n\n    // Querying a mongodb service:\n    const doc = await context.services.get("mongodb-atlas").db("bedrock").collection("players").findOneAndUpdate({player : player}, {$set : {messages : messages}}, {returnNewDocument : true});\n    \n\n\n   return doc;\n};\n'})}),"\n",(0,s.jsx)(n.p,{children:'Make sure that all the functions created (eg. registerUser) is on "SYSTEM" privilege for this demo.'}),"\n",(0,s.jsx)("img",{alt:"Security quickstart page highlighting the 'Database' tab in the left-hand menu",src:(0,i.Z)("/img/chapter-1-mongodb-atlas/httpEndpoint.png"),width:"700",border:"1"}),"\n",(0,s.jsxs)(n.p,{children:["This page can be accessed by going to the ",(0,s.jsx)(n.strong,{children:"Functions"})," tab and looking at ",(0,s.jsx)(n.strong,{children:"Settings"})," tab of the relevant function."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Finaly"})," click ",(0,s.jsx)(n.strong,{children:"Save Draft"})," and follow the ",(0,s.jsx)(n.strong,{children:"Review Draft & Deploy"})," process."]}),"\n",(0,s.jsxs)(n.p,{children:["By the end of this chapter you should have the following endpoints:\n",(0,s.jsx)(n.strong,{children:'Ignore "Generate Medal"'})]}),"\n",(0,s.jsx)("img",{alt:"Security quickstart page highlighting the 'Database' tab in the left-hand menu",src:(0,i.Z)("/img/chapter-2-app-services/finalEndpoints.png"),width:"700",border:"1"})]})}function p(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>o});var s=t(7294);const r={},i=s.createContext(r);function o(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);