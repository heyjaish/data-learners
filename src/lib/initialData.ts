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
    title: "Realistic Advice for Freshers Entering Data Analytics in 2024",
    summary: "Stop building generic Titanic and Iris dataset projects. Recruiters want to see how you clean messy data, calculate business KPIs, and communicate with SQL & PowerBI.",
    content: `When I transitioned into Data Analytics from a mechanical background, I wasted almost six months following bad YouTube advice that told me to learn Python, Machine Learning, Deep Learning, Tableau, PowerBI, Big Data, and Cloud all at once.

Here is the honest reality of what we actually look for when interviewing entry-level analysts:

1. Advanced SQL is 70% of the game:
You don't need to know every database trick, but you must be rock-solid with CTEs (Common Table Expressions), Window Functions (ROW_NUMBER, DENSE_RANK, LEAD/LAG), self joins, and grouping. If an interviewer asks you to calculate 7-day rolling revenue or identify duplicate transactions, you shouldn't hesitate.

2. Learn Business Metrics, not just Chart Types:
A dashboard full of colorful pie charts and gauge meters is useless if it doesn't answer a business question. Understand what Customer Acquisition Cost (CAC), Lifetime Value (LTV), Churn Rate, and MoM Growth actually mean. When explaining a project in an interview, never say 'I made a bar chart'. Say 'I built an alerting view that identified accounts with a 40% drop in weekly activity.'

3. Portfolio Projects with Messy Data:
Kaggle's cleaned CSVs do not impress anyone anymore. Instead, take an uncleaned dataset from government data portals, open APIs, or scrapers. Show how you handled NULL values, bad date formats, currency mismatches, and duplicate records. Write a clean README explaining what problem your analysis solved.

4. Excel is Still King in Every Meeting:
Don't look down on Excel. VLOOKUP/XLOOKUP, Pivot Tables, and quick ad-hoc analysis are still what business stakeholders use 30% of the day.

Stay focused on SQL + 1 BI tool (PowerBI or Tableau) + Excel. Master these three deeply before worrying about complex Python machine learning models.`,
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
    title: "Why Most Aspiring Data Scientists Struggle to Crack Their First Role",
    summary: "Algorithms are only 15% of a Data Scientist's day. Problem formulation, data quality, and business experimentation (A/B testing) make up the other 85%.",
    content: `I regularly review resumes and conduct interviews for Junior Data Scientist candidates, and the biggest gap I see is that people treat Machine Learning as a set of magical Python functions rather than mathematical intuition and business problem-solving.

Here are a few key insights I always share with freshers:

1. Stop relying only on 'model.fit()' and 'model.predict()':
Anyone can copy three lines of scikit-learn code. What separates a hired candidate from a rejected one is knowing: Why did you choose this loss function? How did you handle data leakage between train and test sets? Why is Recall more important than Accuracy for this specific use case?

2. Statistics & Experimentation (A/B Testing):
In real companies, business stakeholders want to know whether a product change made a statistically significant impact. Learn hypothesis testing, p-values, sample size estimation, and confidence intervals. A candidate who understands A/B testing will always stand out over someone who only knows neural networks.

3. Feature Engineering Wins Over Complex Models:
A simple Logistic Regression or Random Forest model with well-engineered, domain-relevant features almost always outperforms a fancy neural network trained on noisy, poorly cleaned data. Spend time learning how to engineer signals from timestamps, text lengths, categorical ratios, and interaction terms.

4. Write Modular, Production-Grade Python:
Ditch the 80-cell messy Jupyter notebook with variables named 'df1', 'df2', and 'temp'. Learn to write Python with clean functions, type hints, docstrings, and Git version control.

Focus on statistical fundamentals, solid SQL, and practical ML on tabular data.`,
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
    title: "Data Engineering in Practice: What Truly Matters in Production",
    summary: "Data Engineering is software engineering applied to data pipelines: idempotency, data modeling, testing, orchestration, and cost optimization.",
    content: `A common myth among freshers is that Data Engineering requires mastering 15 different distributed computing systems like Hadoop, Kafka, Flink, Spark, Cassandra, and Kubernetes right out of college.

The reality is that companies want engineers who understand software engineering fundamentals applied to data:

1. Idempotency & Data Reliability:
If your daily pipeline fails midway and runs again, does it duplicate rows or produce corrupt totals? Designing pipelines that can safely rerun without manual intervention (idempotent pipelines) is the single most important skill.

2. Dimensional Data Modeling:
Don't skip Kimball methodology. Learn Fact tables, Dimension tables, surrogate keys, and Slowly Changing Dimensions (SCD Type 1 and 2). Understanding how data should be organized in Snowflake, BigQuery, or Redshift so analysts can query it cheaply is vital.

3. The Modern Data Stack:
Today, dbt (data build tool) and SQL have taken over a huge chunk of traditional ETL work. A fresher who knows how to write clean, modular dbt models with data tests and documentation has an immediate advantage.

4. Python & Workflow Orchestration:
Learn basic object-oriented Python, error handling, logging, and an orchestrator like Apache Airflow or Prefect to manage DAG schedules and dependency alerts.

Build one clean pipeline where you pull data from a free public API, load it into PostgreSQL or DuckDB, transform it with dbt, and schedule it with GitHub Actions. Put that on your resume and you'll get noticed.`,
    createdAt: "2024-09-08",
    readTime: "5 min read"
  },
  {
    id: "priya-nair-bi-engineer",
    contributorName: "Priya Nair",
    contributorRole: "BI Solutions Architect",
    company: "Global Retail Analytics",
    experienceYears: "5 Years",
    linkedinUrl: "https://linkedin.com/in/",
    domain: "BI & Analytics",
    title: "How to Build Dashboards That Business Stakeholders Actually Use",
    summary: "Most BI dashboards get abandoned after two weeks because they show charts without context. Learn user-centric dashboard design, star schema modeling, and DAX.",
    content: `Early in my career, I built what I thought was an incredible dashboard with 12 complex charts, drill-throughs, and animated visuals. When the VP of Sales opened it, he looked confused, closed it, and asked me for an Excel sheet instead.

That taught me the most important lesson in Business Intelligence: Dashboards are not art exhibits; they are decision-making tools.

1. The 5-Second Rule:
An executive should be able to look at your report header and immediately know whether the business is hitting its targets or in trouble. Keep your primary KPIs at the top-left with clear indicators (e.g. Revenue: $4.2M (+8% vs target)).

2. Master Star Schema Modeling:
Never build PowerBI reports on top of one giant flat table. Always model your data into dimension tables (Date, Customer, Product) and fact tables (Sales, Orders). This ensures fast filter performance and clean DAX calculations.

3. Restrict Your Color Palette:
Never use 10 different colors on a single page. Use a neutral palette (white, light slate, charcoal text) and reserve alert colors (green/red) strictly for positive and negative performance indicators.

4. Always Interview Stakeholders First:
Before opening PowerBI or Tableau, talk to the manager who will use it: What is the first question you need answered on Monday morning? What decision will you make based on this metric?

A great BI developer is 50% data modeler and 50% product designer. Master this balance, and you will always be in high demand.`,
    createdAt: "2024-09-10",
    readTime: "4 min read"
  }
];
