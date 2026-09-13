import { InsightItem } from "./types";

export const initialInsights: InsightItem[] = [
  {
    id: "rahul-sharma-data-analyst",
    contributorName: "Rahul Sharma",
    contributorRole: "Senior Data Analyst",
    company: "Fintech Unicorn",
    experienceYears: "4.5 Years",
    linkedinUrl: "https://linkedin.com/in/",
    domain: "Data Analyst",
    title: "From Non-CS to Senior Data Analyst: The exact strategy that got me hired",
    summary: "Stop building titanic and iris dataset projects. Real recruiters want to see business metrics, data cleaning resilience, and storytelling with SQL & PowerBI.",
    isFeatured: true,
    theDos: [
      "Master Advanced SQL first: Window functions (RANK, DENSE_RANK, ROW_NUMBER), CTEs, self-joins, and query optimization.",
      "Understand business KPIs: Learn what Churn, CAC, LTV, Retention Rate, and Gross Margin mean before jumping into charts.",
      "Build end-to-end portfolio projects with messy real-world datasets (e.g., e-commerce clickstream or supply chain delays).",
      "Document your thought process: Write an executive summary answering 'What problem did this solve?' and 'What business decision resulted from this?'",
      "Get comfortable with Excel/Google Sheets: Pivot tables, VLOOKUP/XLOOKUP, and rapid ad-hoc summaries are still 30% of daily industry work."
    ],
    theDonts: [
      "Do NOT put generic Kaggle dataset projects (Titanic survival, Boston Housing) on your resume; recruiters skip them immediately.",
      "Do NOT spend 6 months learning Python machine learning if your goal is an entry-level Data Analyst job.",
      "Do NOT make cluttered dashboards with 20 charts on one page; simplicity and clear takeaways always win.",
      "Do NOT apply for jobs with just a 1-page resume without a clickable portfolio (GitHub, Tableau Public, or NovyPro).",
      "Never memorize SQL syntax without understanding execution order (FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY)."
    ],
    recommendedTools: [
      { name: "SQL (PostgreSQL / Snowflake / BigQuery)", level: "Essential", note: "The non-negotiable bread & butter. 70% of interviews test SQL live." },
      { name: "PowerBI or Tableau", level: "Essential", note: "Pick one and master DAX / calculated fields and data modeling (star schema)." },
      { name: "Excel / Google Sheets", level: "Essential", note: "Crucial for quick stakeholder discussions and ad-hoc validation." },
      { name: "Python (Pandas, Numpy)", level: "Good to Have", note: "Great for data cleaning and automation, but secondary to SQL for pure analyst roles." }
    ],
    interviewAdvice: "In live interviews, 90% of candidates fail not because of SQL syntax, but because they jump straight to writing code without clarifying edge cases. Always ask: 'Are there NULL values?', 'Is the user_id unique in both tables?', and 'What is the date format?' Speak your thought process out loud.",
    fullStory: `When I started preparing for a Data Analyst role from a mechanical engineering background, I was completely overwhelmed. Every YouTube video suggested learning 15 different tools: Python, R, Tableau, PowerBI, Hadoop, Spark, Machine Learning, and AWS.

Here is the honest truth from someone who conducts interviews now:
For an entry-level Data Analyst, we evaluate 3 core pillars:
1. **Can you query messy databases reliably?** (SQL proficiency)
2. **Can you present numbers in a way a business manager can act upon?** (BI & Storytelling)
3. **Can you think critically about metrics?** (Business acumen)

If you spend 6 weeks deeply mastering SQL (writing complex joins, aggregations, window queries), 3 weeks building 2 solid PowerBI dashboards with proper Star Schema data modeling, and document your projects on LinkedIn with short 1-minute video walkthroughs, you will get interview calls 10x faster than someone who just lists 20 tools on a resume.`,
    createdAt: "2024-09-01",
    readTime: "4 min read"
  },
  {
    id: "ananya-verma-data-scientist",
    contributorName: "Ananya Verma",
    contributorRole: "Lead Data Scientist",
    company: "Healthcare Analytics",
    experienceYears: "6 Years",
    linkedinUrl: "https://linkedin.com/in/",
    domain: "Data Scientist",
    title: "Why 80% of aspiring Data Scientists struggle to crack their first role",
    summary: "Machine learning algorithms are just 10% of a Data Scientist's job. Problem formulation, data quality verification, and experiment design (A/B testing) make the other 90%.",
    isFeatured: true,
    theDos: [
      "Develop rock-solid fundamentals in Applied Statistics: Hypothesis testing, p-values, Central Limit Theorem, confidence intervals, and bias-variance tradeoff.",
      "Learn how to formulate a fuzzy business problem into a measurable machine learning objective.",
      "Understand feature engineering and data leakage deeply; models fail in production because of subtle data leaks.",
      "Write clean, modular, and readable Python code with functions, type hints, and version control (Git).",
      "Learn model evaluation beyond just Accuracy: Precision, Recall, F1-Score, ROC-AUC, and cost-matrix evaluation."
    ],
    theDonts: [
      "Do NOT treat scikit-learn models like magic black boxes without knowing how loss functions and gradient descent work.",
      "Do NOT jump directly into Deep Learning and Generative AI before mastering classical algorithms (Logistic Regression, Random Forests, XGBoost).",
      "Do NOT ignore SQL; even senior data scientists spend hours extracting and prepping raw warehouse tables.",
      "Never present model accuracy alone without showing confusion matrices or class distribution imbalances.",
      "Do NOT submit Jupyter notebooks with 50 unorganized cells and no markdown explanation as your portfolio."
    ],
    recommendedTools: [
      { name: "Python (Pandas, Scikit-Learn, Statsmodels)", level: "Essential", note: "The primary environment for experiments and modeling." },
      { name: "SQL", level: "Essential", note: "Extracting training sets from large data warehouses." },
      { name: "Git & GitHub", level: "Essential", note: "Collaborative code versioning and reproducible research." },
      { name: "XGBoost / LightGBM", level: "Good to Have", note: "The gold standard for tabular business data." },
      { name: "Docker / FastAPI", level: "Good to Have", note: "Deploying your model as an inference microservice." }
    ],
    interviewAdvice: "Expect machine learning system design questions. An interviewer might ask: 'How would you build a fraud detection system for a payment app?' Start by asking about transaction volume, latency requirements, false positive tolerance, and feature availability before naming any algorithm.",
    fullStory: `Many freshers message me saying: 'I have completed 5 courses on Deep Learning and LLMs, but I am not getting interview calls.'

The industry reality: 90% of business problems in companies are solved with well-engineered features and tree-based algorithms like XGBoost or Logistic Regression, combined with rigorous A/B testing.

When hiring freshers or junior data scientists, we test:
- Can you explain why you chose a specific metric? (e.g., why Recall is critical in fraud/medical diagnostics instead of Accuracy).
- Can you write clean Python code that does not crash on unseen missing values?
- Can you explain how your model actually produces its output to a non-technical stakeholder?

Focus on deep mathematical intuition of simple models rather than shallow knowledge of 50 complex neural networks.`,
    createdAt: "2024-09-05",
    readTime: "5 min read"
  },
  {
    id: "vikram-singh-data-engineer",
    contributorName: "Vikram Singh",
    contributorRole: "Staff Data Engineer",
    company: "Cloud Scale SaaS",
    experienceYears: "7+ Years",
    linkedinUrl: "https://linkedin.com/in/",
    domain: "Data Engineer",
    title: "The Data Engineering Roadmap: What actually matters in production",
    summary: "Data Engineering is not just about Spark and Kafka. It is software engineering applied to data pipelines: idempotency, data quality tests, orchestration, and schema management.",
    isFeatured: true,
    theDos: [
      "Build strong software engineering habits: OOP in Python or Java/Scala, unit testing (pytest), Git, and CI/CD pipelines.",
      "Understand Data Modeling: dimensional modeling (Kimball methodology), Fact vs Dimension tables, slowly changing dimensions (SCD Type 1 & 2).",
      "Ensure pipeline idempotency: if a pipeline runs twice for the same date, it must not duplicate rows or corrupt data.",
      "Learn an orchestrator like Apache Airflow or Prefect to manage DAG dependencies, retries, and alert alerting.",
      "Implement data quality tests at every step (using Great Expectations or dbt tests) before data reaches analysts."
    ],
    theDonts: [
      "Do NOT start learning 10 big data tools simultaneously (Hadoop, Kafka, Spark, Flink, Cassandra); master one solid stack first.",
      "Never hardcode credentials or database connections in pipeline scripts; always use environment variables and secrets managers.",
      "Do NOT ignore Linux and Docker; modern data pipelines run in containers in cloud environments.",
      "Avoid writing giant, monolithic SQL scripts that nobody can debug when a failure happens at 2 AM.",
      "Do NOT underestimate cloud fundamentals (IAM roles, S3/GCS storage tiers, network security)."
    ],
    recommendedTools: [
      { name: "Python / PySpark", level: "Essential", note: "The industry standard for data transformations and pipeline scripts." },
      { name: "SQL & Data Warehouses (Snowflake/BigQuery/Redshift)", level: "Essential", note: "Understanding partition pruning, clustering, and cost optimization." },
      { name: "dbt (data build tool)", level: "Essential", note: "The standard for modular in-warehouse transformation and testing." },
      { name: "Apache Airflow", level: "Good to Have", note: "Industry leading workflow orchestrator." },
      { name: "Docker", level: "Good to Have", note: "Containerizing pipelines for reliable cloud execution." }
    ],
    interviewAdvice: "Be ready for data pipeline architecture questions. Interviewers love to ask: 'Our hourly batch pipeline is taking 3 hours to finish. How do you identify bottlenecks and optimize it?' Discuss partitioning, indexing, query execution plans, parallel processing, and caching.",
    fullStory: `Data Engineering is one of the highest paying and fastest growing domains in tech right now, but beginner materials are often cluttered with legacy technologies.

If you are starting today, forget Hadoop MapReduce. Focus on modern cloud-native data architecture:
1. **Ingestion**: How data lands into object storage (S3/GCS/Azure Blob).
2. **Transformation**: Using dbt and SQL or PySpark to clean, deduplicate, and model data into clean dimensional schemas.
3. **Orchestration**: Running Airflow DAGs that notify Slack/Teams if a job fails.
4. **Data Quality**: Making sure corrupt records are quarantined instead of contaminating dashboards.

Build one portfolio project where you extract an API (e.g. OpenWeather or GitHub public events), ingest it into DuckDB or PostgreSQL, run dbt transformations, and schedule it with GitHub Actions or Airflow. That alone puts you ahead of 90% of applicants.`,
    createdAt: "2024-09-08",
    readTime: "6 min read"
  },
  {
    id: "priya-nair-bi-engineer",
    contributorName: "Priya Nair",
    contributorRole: "BI Solutions Architect",
    company: "Global Retail Analytics",
    experienceYears: "5 Years",
    linkedinUrl: "https://linkedin.com/in/",
    domain: "BI & Analytics",
    title: "Mastering Data Storytelling: How to make dashboards executives actually use",
    summary: "Most dashboards fail because they show raw data instead of actionable insights. Learn how to design user-centric BI tools with Star Schema and DAX.",
    isFeatured: false,
    theDos: [
      "Always design with the 5-second rule: Can an executive glance at your dashboard and tell if the business is winning or losing in 5 seconds?",
      "Master Star Schema modeling in PowerBI: Never build reports directly on one giant flat Excel table.",
      "Use consistent color palettes: Reserve alert colors (red/green) strictly for positive/negative KPI indicators.",
      "Interview business stakeholders before building: Understand what business decisions they need to make every Monday morning.",
      "Add context to numbers: A revenue of $500K means nothing unless compared to Target ($600K) or Previous Month ($450K)."
    ],
    theDonts: [
      "Do NOT use pie charts with more than 3 slices or 3D charts under any circumstances.",
      "Avoid using 10 different colors on one report page; choose 1 primary theme and 1 accent color.",
      "Never deliver a dashboard without testing performance on large datasets; slow load times kill adoption.",
      "Do NOT assume business users understand technical jargon like standard deviations or quantile bands.",
      "Avoid burying key metrics at the bottom of the page; follow the F-pattern reading flow."
    ],
    recommendedTools: [
      { name: "Power BI & DAX", level: "Essential", note: "Master CALCULATE, FILTER, time-intelligence, and relationship management." },
      { name: "SQL", level: "Essential", note: "Writing performant views and data aggregation queries." },
      { name: "Figma / UI Mockups", level: "Good to Have", note: "Wireframing dashboard layout before writing any code." },
      { name: "Tableau", level: "Good to Have", note: "Great alternative in enterprise ecosystems." }
    ],
    interviewAdvice: "When presenting a portfolio dashboard in an interview, do not explain what chart types you chose. Explain the business problem: 'The sales team was losing track of churned accounts, so I created this alerting view which highlights accounts inactive for >60 days.'",
    fullStory: `Early in my career, I built what I thought was an incredible dashboard with 12 complex charts, drill-throughs, and animated visuals. When the VP of Sales opened it, he looked confused, closed it, and asked me for an Excel sheet instead.

That was my biggest learning: Dashboards are not art exhibits; they are decision-making tools.

A great Business Intelligence professional is 50% technical and 50% product designer. When you understand the metrics that drive revenue and costs for a company, you become an indispensable partner to leadership.`,
    createdAt: "2024-09-10",
    readTime: "4 min read"
  }
];
