export const profile = {
  name: "Jereldavin Igvander",
  // Shown under the name in the hero.
  role: "Data & AI",
  // One line. Say what you do and who it is for.
  tagline:
    "Data Science student working across data engineering, analytics, and AI, turning raw data into pipelines, analyses, and models people can use.",
  // Leave empty ("") to keep the initials monogram.
  // Set to "/photo.jpg" (or your file name) after adding the photo to public/.
  photo: "/photo.png",
  initials: "JI",
  location: "Jakarta, Indonesia",
  // Public link to the CV PDF (Muse file storage — the link expires, so
  // re-upload the file and update this URL when it lapses).
  cv: "https://muse.ai/files/1324075710795009/29476267622007883/kvhhdvyxrbbt9s8sbywn6lho/Jereldavin_Igvander_CV.pdf",
};

export const about = {
  heading: "About",
  // Short, plain paragraphs. Replace these with your own story.
  paragraphs: [
    "I'm a Data Science student at Binus University, working across data engineering, analytics, and AI. I like turning raw data into something people can use: a pipeline, an analysis, or a model.",
    "Right now I'm building foundations in data engineering and machine learning, and learning AI engineering (LLMs and RAG) on top of them.",
  ],
};

export type SkillGroup = {
  title: string;
  note?: string;
  skills: { name: string; learning?: boolean }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Data Engineering",
    skills: [
      { name: "Python" },
      { name: "SQL" },
      { name: "Apache Airflow" },
      { name: "dbt" },
      { name: "ETL & Data Pipelines" },
      { name: "PostgreSQL" },
    ],
  },
  {
    title: "Data Science & Analytics",
    skills: [
      { name: "Machine Learning" },
      { name: "Keras" },
      { name: "TensorFlow" },
      { name: "scikit-learn" },
      { name: "Pandas" },
      { name: "Data Analysis" },
      { name: "Data Visualization" },
    ],
  },
  {
    title: "AI",
    note: "Learning",
    skills: [
      { name: "LLMs", learning: true },
      { name: "RAG", learning: true },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Docker" },
      { name: "Git" },
      { name: "MLflow" },
      { name: "Streamlit" },
      { name: "9router" },
      { name: "Nous Hermes" },
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  // A link to the repo or a live demo. Leave empty ("") for placeholders.
  link: string;
  // Set to false once the project is real.
  placeholder: boolean;
  // Show the bronze → silver → gold flow on the right side instead of a metric.
  medallionFlow?: boolean;
  // Optional result shown as a metric block. Leave out to hide it.
  // `from` is the old value, shown struck through next to the new one.
  // `count` makes the value count up when it scrolls into view.
  metric?: {
    label: string;
    value: string;
    caption: string;
    from?: string;
    count?: { to: number; decimals?: number; prefix?: string; suffix?: string };
  };
};

// Five real project cards (Olist pipeline, medallion architecture, NYC
// Taxi ETL, term deposit, disaster classification). The last one stays a
// placeholder until the user says otherwise. Olist link stays empty until
// the user sends the repo link.
export const projects: Project[] = [
  {
    title: "Olist E-Commerce Pipeline with Airflow, Postgres and Metabase",
    description:
      "Daily Airflow pipeline on real Brazilian e-commerce data (Olist, ~100k orders, 2016–2018): loads raw CSVs into PostgreSQL, cleans and transforms them, and builds daily revenue and delivery performance tables, with data quality checks gating each run and a Metabase dashboard on top.",
    tags: ["Apache Airflow", "PostgreSQL", "Docker", "Metabase"],
    link: "",
    placeholder: false,
    metric: {
      label: "Orders processed",
      value: "~100K",
      caption: "Brazilian e-commerce orders, 2016–2018",
      count: { to: 100, prefix: "~", suffix: "K" },
    },
  },
  {
    title: "Airflow E-Commerce Medallion Architecture",
    description:
      "Three-layer medallion design for e-commerce analytics: bronze keeps raw CSVs untouched, silver holds cleaned and typed tables, gold serves daily revenue and delivery performance, with quality checks gating every layer.",
    tags: ["Apache Airflow", "PostgreSQL", "Medallion Architecture"],
    link: "",
    placeholder: false,
    medallionFlow: true,
  },
  {
    title: "NYC Taxi ETL with Airflow",
    description:
      "ETL pipeline for New York City Yellow Taxi trip records into PostgreSQL, orchestrated with Airflow 3 TaskFlow API inside Docker, using XCom for inter-task metadata and Pandas for transformation.",
    tags: ["Apache Airflow", "PostgreSQL", "Docker", "Pandas"],
    link: "https://github.com/Jereldavin/NYC-ETL-Airflow",
    placeholder: false,
  },
  {
    title: "Term Deposit Subscription Prediction",
    description:
      "Machine learning model that predicts whether a client will subscribe to a term deposit from the UCI Bank Marketing dataset, with class imbalance handled through SMOTE. Final model Random Forest reaches F1 0.5201 and AUC 0.7531 on the test set.",
    tags: ["Python", "scikit-learn", "Random Forest", "SMOTE"],
    link: "https://github.com/Jereldavin/Term-Deposit-Subscription-Prediction",
    placeholder: false,
    metric: {
      label: "Test AUC",
      value: "0.7531",
      caption: "Random Forest with SMOTE",
      count: { to: 0.7531, decimals: 4 },
    },
  },
  {
    title: "Disaster Image Classification",
    description:
      "Convolutional neural network that classifies disaster images into earthquake, landslide, urban fire, and water disaster, with MobileNetV2 transfer learning reaching 0.88 test accuracy.",
    tags: ["Python", "TensorFlow", "CNN", "Transfer Learning"],
    link: "https://github.com/Jereldavin/Disaster-Classification",
    placeholder: false,
    metric: {
      label: "Test accuracy",
      value: "0.88",
      caption: "MobileNetV2 vs custom CNN",
      from: "0.72",
      count: { to: 0.88, decimals: 2 },
    },
  },
  {
    title: "Project title",
    description: "More details coming soon.",
    tags: [],
    link: "",
    placeholder: true,
  },
];

export type TimelineEntry = {
  period: string;
  title: string;
  place: string;
  description: string;
  placeholder: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    period: "Present",
    title: "Data Science, Undergraduate",
    place: "Binus University",
    description:
      "Studying Data Science, focused on data engineering, analytics, and AI.",
    placeholder: false,
  },
];

export const contact = {
  heading: "Contact",
  github: "https://github.com/Jereldavin",
  githubLabel: "github.com/Jereldavin",
  email: "jereldavinigvander@gmail.com",
  linkedin: "https://www.linkedin.com/in/jereldavin",
};

export const nav = {
  links: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
};
