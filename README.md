# Business Analyst Portfolio

A static portfolio website for Taiwo Michael Odejobi, Business Analyst.

It is built with plain HTML, CSS and JavaScript. There is nothing to install and nothing to build: no Node.js, no npm, no React, no Next.js. Upload the files and the site works.

## Before you publish: 3 things to replace

| What | Where | Why |
| --- | --- | --- |
| **Your CV** | `assets/documents/resume.pdf` | The file there now is a placeholder page, not your CV. |
| **Project thumbnails** | `assets/images/project-01.svg` and `project-02.svg` | These are generic illustrations. Swap in your own thumbnails. |
| **Missing case study stage** | `projects/data-analysis-dashboards.html` | "Business impact" is hidden because no information was provided. |

## What's in the folder

```
business-analyst-portfolio/
├── index.html                 The main page (start here)
├── README.md                  This guide
├── PORTFOLIO-INPUT.md         A questionnaire for collecting future updates
├── .gitignore
├── favicon.ico                The small icon in the browser tab
├── assets/
│   ├── css/style.css          All colours, fonts and layout
│   ├── js/data.js             Your contact details and links (edit this first)
│   ├── js/script.js           Menu, theme switch, contact form
│   ├── images/                Photo, project thumbnails, icons
│   └── documents/resume.pdf   Your CV
└── projects/
    ├── health-tech-business-analysis.html   Case study 1
    └── data-analysis-dashboards.html        Case study 2
```

## How to upload it to GitHub

1. Sign in at [github.com](https://github.com) and click **New repository**.
2. Give it a name, for example `portfolio`. Set it to **Public**. Click **Create repository**.
3. On the next page click **uploading an existing file**.
4. Open the `business-analyst-portfolio` folder on your computer, select **everything inside it**, and drag it into the browser window. Drag the contents, not the folder itself.
5. Check that `index.html` appears at the top level of the list (the repository root), not inside another folder.
6. Click **Commit changes**.

## How to turn on GitHub Pages

1. In your repository, open **Settings**.
2. In the left menu, click **Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose **main** and **/ (root)**, then click **Save**.
5. Wait a minute or two, then refresh. Your address appears at the top of the page, in the form `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

GitHub Pages uses `index.html` as the entry page automatically.

Tip: if you name the repository `deeanalyst.github.io` (your username followed by `.github.io`), the address becomes simply `https://deeanalyst.github.io/`.

Once you know your address, open `index.html`, find `[YOUR WEBSITE ADDRESS]` near the top, paste your address in, and remove the `<!--` and `-->` around those two lines. This helps link previews on LinkedIn.

## How to update your information

To edit a file on GitHub: click the file, click the pencil icon, make your change, click **Commit changes**.

| To change | Edit this file | Look for |
| --- | --- | --- |
| Name, email, location, LinkedIn, GitHub | `assets/js/data.js` | The matching line |
| CV file and button text | `assets/js/data.js` | `resume` and `resumeButtonText` |
| Formspree endpoint | `assets/js/data.js` | `formspreeEndpoint` |
| Headline, title and short bio | `index.html` | The `HERO` comment |
| Long bio and headline figures | `index.html` | The `ABOUT` comment |
| Skills | `index.html` | The `CORE COMPETENCIES` comment |
| Experience | `index.html` | The `EXPERIENCE` comment |
| Projects | `index.html` | The `PROJECTS` comment |
| Case study text | The files in `projects/` | Each stage has its own heading |
| Google and link-preview text | `index.html` | The `SEO` comment at the top |

Details in `data.js` are filled into every page automatically. If you set one to `""` (empty), the buttons and links that use it are hidden.

When editing HTML, change only the words between the tags. For example, in `<li>Gap analysis</li>` change `Gap analysis` and leave `<li>` and `</li>` alone.

### Add a skill

In `index.html`, find the group you want and copy one line such as `<li>Jira</li>`. Paste it below and change the text.

### Add a job

In `index.html`, copy one whole block from `<li class="tl-item reveal">` to its closing `</li>`. Paste it where it belongs (newest first) and change the text. The class `is-current` gives your present role a filled dot.

## How to add images

Put images in `assets/images/`.

- **Profile photo:** replace `profile.jpg` with a new file of the same name. A portrait shape (4:5) works best.
- **Project thumbnails:** add your image, for example `project-01.jpg`, then in `index.html` change `assets/images/project-01.svg` to `assets/images/project-01.jpg`. Do the same in the matching case study page, where the path starts with `../`. A landscape shape (3:2, about 1200 × 800 pixels) works best.
- Keep each image under about 300 KB so the site loads quickly. [squoosh.app](https://squoosh.app) can shrink them for free.

## How to add your CV

1. Save your CV as a PDF named `resume.pdf`.
2. Upload it to `assets/documents/`, replacing the placeholder.

To use a different file name, change the `resume` line in `assets/js/data.js`, for example `resume: "assets/documents/Taiwo-Odejobi-CV.pdf"`. Avoid spaces in the file name.

## How to add a project

1. **Add the card.** In `index.html`, copy one whole block from `<article class="project reveal">` to `</article>`, paste it below the last one, and change the text, image and links.
2. **Add the case study page.** In the `projects/` folder, make a copy of an existing case study file and rename it, for example `inventory-analysis.html`. Change the text under each stage.
3. **Link them.** Point the card's **View case study** button at your new file, for example `projects/inventory-analysis.html`.

Each case study follows eight stages: Business problem, Objective, Approach, Analysis, Findings, Recommendations, Outcome, Business impact. To leave a stage out, delete its `<section class="cs-stage">` block and the matching line in the `cs-steps` list.

## How to change colours

Open `assets/css/style.css`. The colours are at the very top, under `1. DESIGN TOKENS`. The first group is the light theme and the second is the dark theme.

The one you are most likely to change is `--accent`, which controls buttons, links and highlights. If you change it, change it in both themes and check that text is still easy to read.

## How to change fonts

The site uses [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) from Google Fonts. To change it:

1. Choose a font at [fonts.google.com](https://fonts.google.com) and copy its `<link>` code.
2. In `index.html` and both files in `projects/`, replace the line that starts `<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans`.
3. In `assets/css/style.css`, change the font name on the `--font` line near the top.

Text sizes are set in the same file under `2. BASE`.

## The favicon

The browser tab icon is `favicon.ico` in the root folder (your initials on green), with a sharper version at `assets/images/favicon.svg`. To use your own, replace both files, keeping the same names. [favicon.io](https://favicon.io) makes them for free.

## The contact form

The form sends messages through [Formspree](https://formspree.io) to the endpoint in `assets/js/data.js`. No password or private key is stored in this site: the endpoint is public by design.

After publishing, send yourself one test message. Formspree may ask you to confirm your email address the first time.

## Other hosts

The same files work on Netlify and Vercel (drag the folder in, no build command) and by double-clicking `index.html` on your computer.
