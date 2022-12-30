### 0.4: New note

Browser->Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
Browser->Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
Server-->Browser: notes
Browser->Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
Server-->Browser: main.css	
Browser->Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
Server-->Browser: main.js	
Browser->Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server-->Browser: data.json

### 0.5: Single Page App

Browser->Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
Server-->Browser: spa
Browser->Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
Server-->Browser: main.css	
Browser->Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
Server-->Browser: spa.js	
Browser->Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server-->Browser: data.json

### 0.6: New note SPA

Browser->Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
Server-->Browser: new_note_spa

Notes are redrawn if post request returns status 200