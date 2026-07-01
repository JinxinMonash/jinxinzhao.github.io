import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const data = JSON.parse(readFileSync(path.join(root, "src/site-data.json"), "utf8"));
const outDir = path.join(root, "docs");

mkdirSync(path.join(outDir, "assets"), { recursive: true });
copyFileSync(path.join(root, "src/site-data.json"), path.join(outDir, "site-data.json"));

const esc = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const absolute = (url) => (/^https?:|^mailto:/.test(url) ? url : url);

const nav = `
  <nav class="nav" aria-label="Primary navigation">
    <a class="brand" href="./">${esc(data.shortName)}</a>
    <div class="nav-links">
      <a href="#research">Research</a>
      <a href="#publications">Publications</a>
      <a href="#grants">Grants</a>
      <a href="#contact">Contact</a>
    </div>
  </nav>`;

const linkList = data.links
  .map((link) => `<a class="pill-link" href="${esc(absolute(link.url))}">${esc(link.label)}</a>`)
  .join("");

const stats = data.stats
  .map(
    (stat) => `
      <div class="stat">
        <strong>${esc(stat.value)}</strong>
        <span>${esc(stat.label)}</span>
      </div>`
  )
  .join("");

const roles = data.currentRoles
  .map(
    (role) => `
      <li>
        <span>${esc(role.period)}</span>
        <strong>${esc(role.title)}</strong>
        <em>${esc(role.place)}</em>
      </li>`
  )
  .join("");

const intro = data.intro.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("");

const researchCards = data.researchThemes
  .map(
    (theme) => `
      <article class="card">
        <h3>${esc(theme.title)}</h3>
        <p>${esc(theme.summary)}</p>
      </article>`
  )
  .join("");

const projectCards = data.projects
  .map(
    (project) => `
      <article class="project">
        <div>
          <h3>${esc(project.title)}</h3>
          <p>${esc(project.summary)}</p>
        </div>
        <ul class="tags">
          ${project.tags.map((tag) => `<li>${esc(tag)}</li>`).join("")}
        </ul>
      </article>`
  )
  .join("");

const publications = data.selectedPublications
  .map(
    (publication) => `
      <li>
        <p>${esc(publication.citation)}</p>
        <span>${esc(publication.venue)}</span>
      </li>`
  )
  .join("");

const grants = data.grants
  .map(
    (grant) => `
      <li>
        <div>
          <strong>${esc(grant.title)}</strong>
          <span>${esc(grant.funder)} | ${esc(grant.role)} | ${esc(grant.period)}</span>
        </div>
        <em>${esc(grant.amount)}</em>
      </li>`
  )
  .join("");

const awards = data.awards.map((award) => `<li>${esc(award)}</li>`).join("");

const talks = data.talks
  .map(
    (talk) => `
      <li>
        <strong>${esc(talk.title)}</strong>
        <span>${esc(talk.venue)} | ${esc(talk.date)}</span>
      </li>`
  )
  .join("");

const education = data.education
  .map(
    (item) => `
      <li>
        <strong>${esc(item.degree)}</strong>
        <span>${esc(item.place)} | ${esc(item.period)}</span>
      </li>`
  )
  .join("");

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(data.name)} | Antimicrobial Systems Pharmacology</title>
  <meta name="description" content="${esc(data.metaDescription)}">
  <meta property="og:title" content="${esc(data.name)}">
  <meta property="og:description" content="${esc(data.metaDescription)}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${esc(data.heroImage)}">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="preload" href="${esc(data.heroImage)}" as="image">
  <link rel="stylesheet" href="assets/site.css">
</head>
<body>
  ${nav}
  <main>
    <header class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${esc(data.affiliation)}</p>
        <h1>${esc(data.name)}</h1>
        <p class="tagline">${esc(data.tagline)}</p>
        <div class="hero-actions">
          ${linkList}
          <a class="pill-link primary" href="${esc(data.cvPath)}">Download CV</a>
        </div>
      </div>
      <figure class="hero-visual" aria-label="Biomedical systems pharmacology illustration">
        <img src="${esc(data.heroImage)}" alt="Abstract bacterial genomics and antimicrobial systems pharmacology visual">
      </figure>
    </header>

    <section class="intro-grid" aria-label="Profile summary">
      <div class="intro-text">
        <h2>Hi, I am Jinxin.</h2>
        ${intro}
      </div>
      <div class="stats-panel">
        ${stats}
      </div>
    </section>

    <section class="section split" id="research">
      <div class="section-heading">
        <p class="eyebrow">Research</p>
        <h2>Computational and experimental antimicrobial science.</h2>
      </div>
      <div class="card-grid">
        ${researchCards}
      </div>
    </section>

    <section class="section">
      <div class="section-heading compact">
        <p class="eyebrow">Current Work</p>
        <h2>Roles and selected projects</h2>
      </div>
      <div class="work-grid">
        <ol class="timeline">${roles}</ol>
        <div class="projects">${projectCards}</div>
      </div>
    </section>

    <section class="section split" id="publications">
      <div class="section-heading">
        <p class="eyebrow">Publications</p>
        <h2>Selected first, co-first and corresponding-author work.</h2>
        <p>See the full publication list on <a href="${esc(data.links[0].url)}">Google Scholar</a>.</p>
      </div>
      <ol class="publication-list">${publications}</ol>
    </section>

    <section class="section split" id="grants">
      <div class="section-heading">
        <p class="eyebrow">Funding</p>
        <h2>Selected research grants.</h2>
      </div>
      <ol class="grant-list">${grants}</ol>
    </section>

    <section class="section two-column">
      <div>
        <div class="section-heading compact">
          <p class="eyebrow">Recognition</p>
          <h2>Awards</h2>
        </div>
        <ul class="simple-list">${awards}</ul>
      </div>
      <div>
        <div class="section-heading compact">
          <p class="eyebrow">Seminars</p>
          <h2>Invited talks</h2>
        </div>
        <ul class="talk-list">${talks}</ul>
      </div>
    </section>

    <section class="section two-column contact-section" id="contact">
      <div>
        <div class="section-heading compact">
          <p class="eyebrow">Training</p>
          <h2>Education</h2>
        </div>
        <ul class="talk-list">${education}</ul>
      </div>
      <div class="contact-panel">
        <p class="eyebrow">Contact</p>
        <h2>Let us talk antimicrobial pharmacology, omics and modelling.</h2>
        <p>${esc(data.location)}</p>
        <a class="email-link" href="mailto:${esc(data.email)}">${esc(data.email)}</a>
      </div>
    </section>
  </main>

  <footer class="footer">
    <span>&copy; ${new Date().getFullYear()} ${esc(data.name)}</span>
    <span>Built as a static GitHub Pages site.</span>
  </footer>
</body>
</html>
`;

writeFileSync(path.join(outDir, "index.html"), html);
writeFileSync(path.join(outDir, ".nojekyll"), "");
writeFileSync(path.join(outDir, "CNAME"), "home.jinxinzhao.org\n");

const notFound = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page not found | ${esc(data.name)}</title>
  <meta name="description" content="The requested page is not available.">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/site.css">
</head>
<body>
  ${nav}
  <main>
    <section class="section not-found">
      <p class="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The page you requested is not available. Return to <a href="./">the homepage</a>.</p>
    </section>
  </main>
  <footer class="footer">
    <span>&copy; ${new Date().getFullYear()} ${esc(data.name)}</span>
    <span>Built as a static GitHub Pages site.</span>
  </footer>
</body>
</html>
`;
writeFileSync(path.join(outDir, "404.html"), notFound);

console.log("Built docs/index.html");
