export const personalInfo = {
  name: "Prabod Jayasinghe",
  title: "Software Engineer",
  tagline: "I build things for the web.",
  description:
    "I'm a results-oriented software engineer specializing in full-stack development, cloud architecture, and AI-powered applications. Currently focused on building accessible, human-centered products that make a difference.",
  email: "shanprabodh@icloud.com",
  whatsapp: "+94723169847",
  github: "https://github.com/PRABO",
  linkedin: "https://linkedin.com/in/prabodjayasinghe",
  twitter: "https://twitter.com/prabodjayasinghe",
  resume: "/resume.pdf",
  location: "Sri Lanka",
};

export const aboutMe = {
  paragraphs: [
    "Hello! I'm Prabod Jayasinghe, a passionate software engineer based in Sri Lanka. I enjoy creating things that live on the internet and crafting experiences that delight users.",
    "My interest in web development started back in 2020 when I decided to try building custom web experiences — turns out hacking together HTML, CSS & JavaScript was incredibly fun!",
    "Fast-forward to today, and I've had the privilege of working on diverse projects spanning startups, agencies, and enterprise clients. My main focus is building accessible, inclusive products and digital experiences."
  ],
  skills: [
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python"
  ]
};

export const experiences = [
  {
    company: "Tech Company",
    role: "Senior Software Engineer",
    period: "2023 — Present",
    description:
      "Led development of AI-powered features using modern cloud services. Reduced infrastructure costs by 40% through serverless architecture migration. Mentored junior developers and conducted code reviews.",
    technologies: ["TypeScript", "Next.js", "AWS", "Node.js"],
  },
  {
    company: "Startup Co.",
    role: "Full Stack Developer",
    period: "2021 — 2023",
    description:
      "Built real-time communication features using WebRTC. Developed cross-platform desktop applications with Electron. Implemented CI/CD pipelines and improved deployment frequency by 3x.",
    technologies: ["React", "Node.js", "WebRTC", "Electron"],
  },
  {
    company: "Dev Agency",
    role: "Junior Developer",
    period: "2020 — 2021",
    description:
      "Developed responsive web applications and REST APIs. Collaborated with design team to implement pixel-perfect UI components. Contributed to open-source libraries and improved performance by 60%.",
    technologies: ["JavaScript", "Python", "Django", "PostgreSQL"],
  },
];

export const projects = [
  {
    title: "AI Chat Platform",
    description:
      "A production-grade AI chat application powered by modern LLMs. Features real-time streaming, conversation history, and multi-model support with a sleek and responsive UI.",
    image: "/images/profile.png",
    github: "https://github.com/PRABO/ai-chat",
    live: "https://ai-chat-demo.vercel.app",
    technologies: ["Next.js", "TypeScript", "OpenAI", "Prisma"],
  },
  {
    title: "Video Conference App",
    description:
      "Real-time video conferencing application with screen sharing, recording, and breakout rooms. Built with WebRTC and Socket.io for seamless peer-to-peer connections.",
    image: "/images/profile.png",
    github: "https://github.com/PRABO/video-app",
    live: "https://video-app-demo.vercel.app",
    technologies: ["React", "WebRTC", "Socket.io", "Node.js"],
  },
  {
    title: "Serverless Dashboard",
    description:
      "Cost-effective serverless monitoring dashboard. Provides real-time metrics, alerts, and cost analysis with an intuitive visualization layer built on Chart.js.",
    image: "/images/profile.png",
    github: "https://github.com/PRABO/serverless-dashboard",
    live: "https://dashboard-demo.vercel.app",
    technologies: ["Next.js", "AWS Lambda", "DynamoDB", "Chart.js"],
  },
  {
    title: "Task Manager Desktop",
    description:
      "Cross-platform desktop application for task management with offline support, drag-and-drop, and real-time team collaboration features using Electron.",
    image: "/images/profile.png",
    github: "https://github.com/PRABO/task-manager",
    live: "https://task-manager-demo.vercel.app",
    technologies: ["Electron", "React", "SQLite", "TypeScript"],
  },
];

export const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "Go"],
  frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "NestJS", "Express", "GraphQL"],
  cloud: ["AWS", "Serverless", "Docker", "Kubernetes"],
  ai: ["LangChain", "OpenAI API", "Hugging Face", "TensorFlow"],
  tools: ["Git", "CI/CD", "Linux", "Figma"],
};
