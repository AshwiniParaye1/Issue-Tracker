# Issue-Tracker

## 📝 Description

This project is a web application that analyzes GitHub repository issues to provide insights into repository health and issue trends. It fetches issues from a specified GitHub repository, calculates various metrics, and presents them in a user-friendly dashboard. The application is built using React and TypeScript, leveraging Tailwind CSS for styling.

## ✨ Features

- **Issue Summary:** Provides a high-level overview of the total number of issues, open issues, closed issues.
- **Weekly Metrics:** Calculates and displays weekly issue counts, closure rates, and the ratio of new to closed issues.
- **Average Closure Rate:** Shows the average percentage of issues closed per week.
- **Issue Table:** Allows users to view all issues in a sortable table with details such as status, author, and creation/closure dates.
- **Repository Input:** Enables users to enter a GitHub repository name (e.g., `facebook/react`) to analyze its issues.
- **Error Handling:** Displays error messages for invalid repository formats or failed API requests.
- **Loading State:** Indicates when the application is fetching and analyzing data.

## 🔧 Technologies Used

- TypeScript
- Tailwind CSS
- React
- Date-fns

## 📦 Installation

Follow these steps to set up the project locally:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Start the development server:**

    ```bash
    npm start
    # or
    yarn start
    # or
    pnpm start
    ```

    The application will be accessible at `http://localhost:5173` (or the port specified by your environment).

## 📂 Project Structure

```
├── index.html
├── package.json
├── public
├── src
│   ├── App.tsx
│   ├── assets
│   ├── components
│   │   ├── Dashboard.tsx
│   │   ├── Header.tsx
│   │   ├── IssuesTable.tsx
│   │   ├── RepoForm.tsx
│   │   ├── metrics
│   │   │   ├── AverageClosureMetric.tsx
│   │   │   ├── ClosureRateMetric.tsx
│   │   │   ├── RatioMetric.tsx
│   │   │   ├── StatusMetric.tsx
│   │   │   ├── WeeklyCountMetric.tsx
│   ├── hooks
│   │   ├── useGitHubIssues.ts
│   ├── index.css
│   ├── main.tsx
│   ├── services
│   │   ├── github.ts
│   ├── types
│   │   ├── index.ts
│   ├── utils
│   │   ├── dateUtils.ts
│   ├── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts

```

## 🚀 How to Use

1.  **Enter a GitHub Repository:**
    - In the input field, enter the name of the GitHub repository you want to analyze. Use the format `owner/repo` (e.g., `facebook/react`) or a full GitHub URL.
2.  **Analyze Issues:**
    - Click the "Analyze Issues" button. The application will fetch and analyze the issues from the repository. A loading indicator will be displayed while the data is being fetched.
3.  **View the Dashboard:**
    - Once the analysis is complete, the dashboard will display the key metrics and issue summary. You can explore the different sections to gain insights into the repository's issue trends.
4.  **View All Issues:**
    - Click the "View All Issues" button in the Issue Summary section to open a modal containing a sortable table of all issues.

## 🤝 Contribution

We welcome contributions! Here's how you can contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your fork.
5.  Submit a pull request.

## ❤️ Support

Thank you for checking out Issue-Tracker! If you find it useful, consider giving it a star on GitHub!
