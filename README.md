<h1 align="center">
    <img alt="project" title="#About" src="./assets/banner.jpg" />
</h1>

<h1 align="center">
  <a href="#">Session insights</a>
</h1>

<p align="center">

  <!-- Stars -->
  <a href="https://github.com/Willi0t/siwiDashboard">
    <img alt="Stars" src="https://img.shields.io/github/stars/Willi0t/siwiDashboard?style=social">
  </a>

  <!-- Last commit -->
  <a href="https://github.com/Willi0t/siwiDashboard/commits">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Willi0t/siwiDashboard">
  </a>

  <!-- Made by William Sinclair -->
  <a href="https://github.com/Willi0t">
    <img alt="Made by William Sinclair" src="https://img.shields.io/badge/made%20by-William%20Sinclair-0078ff">
  </a>

</p>


<h4 align="center"> 
	 Status: Finished
</h4>

<p align="center">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#csv-format-requirements">CSV Format Requirements</a> •
 <a href="#how-it-works">How it works</a> • 
 <a href="#running-the-web-application-frontend">Running the web application</a> •
 <a href="#tech-stack">Tech Stack</a> •  
 <a href="#author">Author</a> • 
 <a href="#license">License</a>
</p>


## About

PROJECT - SIWi Chat Viewer was created to solve a missing gap in our workflow: there was no tool to read or review Copilot chat transcripts. Our AI trainers needed a clear way to analyze conversations and identify areas for improvement. This project provides a simple, fast, and dedicated interface for exploring session data, reviewing messages, and supporting continuous quality improvements of our internal Copilot chatbot.

---

## Features


- [x] CSV Import for Copilot Conversations
Upload a raw Copilot chat export (CSV). The app parses the file and extracts all sessions with valid data.

- [x] Automatic Session Filtering
Only sessions that contain a transcript and exceed a configurable message threshold are shown.
This helps AI trainers focus on meaningful conversations.

- [x] Adjustable Message Threshold
Change the minimum number of messages required for a session to be included in the list — directly from the UI.

- [x] Session Categorization: New & Reviewed
Sessions can be marked as Reviewed, and the app automatically organizes them into:

- New sessions

- Reviewed sessions

- [x] Detailed Conversation Viewer
Each session displays:

- Session ID

- Start date/time

- Message count

- Outcome

- Complete transcript, visually separated into User and Bot messages

---
## CSV Format Requirements

To work correctly, SIWi Chat Viewer requires a CSV file exported from Copilot with a specific structure.  
These columns must exist in the header row, and their names must match **exactly**.


### **Required Columns**

| Column Name            | Description |
|------------------------|-------------|
| **SessionId**          | Unique ID for the chat session. Must not be empty. |
| **StartDateTime(UTC)** | Timestamp (UTC) for when the chat started. |
| **Turns**              | Total number of messages exchanged in the session. Used for filtering. |
| **ChatTranscript**     | Full conversation transcript in Copilot format (`Bot says:` / `User says:`). Must not be empty. |
| **SessionOutcome**     | Outcome label from Copilot (e.g., *Unengaged*, *Completed*, etc.). |

---

**Optional Columns**  
(These may exist in the file, but the viewer ignores them.)

- InitialUserMessage  
- TopicName  
- OutcomeReason  
- TopicId  
- Channel  
- CSAT  
- Comments  

The app simply skips these fields.

##Minimum Required Structure

Your CSV must contain **at least** these columns:

---

**Example row (shortened):**


Rules Your CSV Must Follow

1. **SessionId must not be empty**  
   Sessions without an ID are skipped.

2. **ChatTranscript must contain text**  
   Empty transcripts are filtered out automatically.

3. **Turns must be a valid number**  
   Determines whether a session passes the message-threshold filter.

4. **ChatTranscript must use Copilot’s standard formatting**  
   The viewer parses messages based on the following structure:


---

## How it works

SIWi Chat Viewer is a lightweight React application designed to load, filter, and display Copilot chat sessions.  
Everything runs locally in the browser — no backend or external services required.


### **1. Upload a CSV file**

Start by clicking **“Import CSV”** in the header.  
You select a Copilot-exported CSV file containing session data.

The app then:

- Reads the file in the browser  
- Parses each row  
- Extracts required fields (`SessionId`, `StartDateTime(UTC)`, `Turns`, `ChatTranscript`, `SessionOutcome`)  
- Filters out invalid or empty entries

---

### **2. Automatic session filtering**

Once the CSV is loaded, the viewer automatically:

- Removes rows with empty `SessionId`
- Removes sessions with no `ChatTranscript`
- Shows only sessions with a `Turns` value above a configurable threshold
- "Turns" are the actuall messages, and the amout displayed can be st to a value

This ensures trainers only see conversations that contain meaningful interaction.

---

### **3. Adjustable message threshold**

In the header, you can set a **minimum number of messages** required before a session is shown.  
For example: “Show only conversations with more than 3 messages.”

<img width="701" height="59" alt="Screenshot 2025-12-02 at 11 08 27" src="https://github.com/user-attachments/assets/000da050-4950-4faf-a889-49f5c844fb6c" />

The session list updates instantly as the threshold changes.

---

### **4. Browse sessions in the sidebar**

All filtered sessions appear in a scrollable list.  
Each row shows:

- Session ID  
- Start time  
- Message count  
- Outcome  

Clicking a session loads its full details on the right-hand side.

---


### **5. View the full conversation**

The main panel displays:

- Metadata about the session  
- A fully formatted chat view

The transcript is split into individual messages using Copilot’s built-in format:

---

#### Running the web application (Frontend)

```bash

#### Running the web application (Frontend)

# 1. Install dependencies
# Before running the application, make sure you have Node.js (LTS recommended) and npm installed on your system.
# Then install all required packages by running:
$ npm install
# This command installs all dependencies listed in the package.json file.

# 2. Start the development server
# To launch the application in development mode, run:
$ npm run dev
# Vite will start a local development server, usually available at:
# http://localhost:5173
# Open this URL in your browser to use the application during development.

# 3. One-click start scripts (optional)
# For ease of use, the project includes helper scripts that automatically install dependencies and start the development server.

# macOS:
$ ./start-siwi-mac.command
# This script will install dependencies if needed, start the Vite server, and automatically open the application in your browser.

# Windows:
$ start-siwi-windows.bat
# This script will run npm install (if required), start the development server, and open the application in your default browser at http://localhost:5173.

# 4. Build for production (optional)
# To generate an optimized production build of the application, run:
$ npm run build
# This will output production-ready files into the dist/ directory.

# To preview the production build locally, use:
$ npm run preview
# This simulates how the application will behave when deployed to a production environment.


```

---

## Tech Stack

The following tools were used in the construction of the project:

#### **Platform** ([React](https://react.dev/) + [Vite](https://vitejs.dev/))

- **[React](https://react.dev/)**
- **[React DOM](https://react.dev/reference/react-dom)**
- **[@vitejs/plugin-react](https://github.com/vitejs/vite/tree/main/packages/plugin-react)**
- **[Vite](https://vitejs.dev/)**

#### **Styling**

- **[Sass](https://sass-lang.com/)**

#### **Linting & Dev Tools**

- **[ESLint](https://eslint.org/)**
- **[@eslint/js](https://www.npmjs.com/package/@eslint/js)**
- **[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)**
- **[eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh)**
- **[globals](https://www.npmjs.com/package/globals)**

#### **Build & Scripts**

- **[Node.js](https://nodejs.org/)**
- **[npm](https://www.npmjs.com/)**

> See the file `package.json` for the full list of dependencies.


---

## Author

<a href="https://www.linkedin.com/in/william-sinclair/](https://www.linkedin.com/in/william-sinclair-2bab18153">
 <img style="border-radius: 50%;" src="https://media.licdn.com/dms/image/v2/D4D03AQG8AGYQBQOjZQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1708626809092?e=1742428800&v=beta&t=aJjC3LbvnnrjXVTkhzlr2JYDwDGBq6vIk4n3N0m5hvQ" width="70px;" alt="William Sinclair"/>
 <br />
 <p><b>William Sinclair</b></p></a>


---

## License

This project is internal and not published under an open-source license.  
Use is restricted to internal workflows and tooling.

---

## Learn More

This project was built with [Vite](https://vitejs.dev/) and [React](https://react.dev/).

You can learn more in the official documentation:

- [React Documentation](https://react.dev/learn)
- [Vite Documentation](https://vitejs.dev/guide/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/) for general web development

---


