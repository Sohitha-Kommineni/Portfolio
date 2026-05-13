import { useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const projects = [
  {
    name: "AI Research Assistant",
    tagline: "Real-time AI chat that accelerates literature review and answers.",
    image: "/project-ai-research.png",
    problem:
      "Researchers waste hours collecting sources and synthesizing insights across multiple tools.",
    stack: ["FastAPI", "PostgreSQL", "SQLAlchemy", "React", "Docker"],
    highlights: [
      "Streaming RAG pipeline with source citations",
      "Secure auth + role-based access",
      "Configurable embeddings and model routing"
    ],
    impact: "Showcases AI/LLM expertise with production-ready full-stack delivery.",
    links: {
      github: "https://github.com/Sohitha-Kommineni/AI-Research-Assistant.git"
    }
  },
  {
    name: "Streaming Platform",
    tagline: "Full-stack Django platform for curated streaming experiences.",
    image: "/project-streaming.png",
    problem:
      "Needed a clean demo to showcase movie listings, categories, and detail pages.",
    stack: ["Python", "Django", "HTML/CSS", "SQLite"],
    highlights: [
      "Browsing by categories with detailed movie pages",
      "Local in-memory data for quick setup",
      "Server-rendered pages for smooth content display"
    ],
    impact: "Demonstrates clean backend + frontend integration with Django.",
    links: {
      github: "https://github.com/Sohitha-Kommineni/Streaming-Platform.git"
    }
  },
  {
    name: "AUTH Vault",
    tagline: "Security-first authentication backend for modern apps.",
    image: "/project-auth-vault.png",
    problem:
      "Teams lacked a centralized auth service with fine-grained access control and audit logs.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "JWT"],
    highlights: [
      "Role-based access control with audit-ready events",
      "JWT refresh + rotation strategy",
      "Hardened data layer with rate limiting"
    ],
    impact: "Highlights backend security and API architecture expertise.",
    links: {
      github: "https://github.com/Sohitha-Kommineni/Auth-Identity-Service.git"
    }
  }
];

const skills = [
  {
    category: "Frontend Engineering",
    items: ["React.js", "JavaScript", "HTML", "CSS"]
  },
  {
    category: "Backend & API Engineering",
    items: [
      "Python",
      "FastAPI",
      "Django",
      "Django REST Framework",
      "Flask",
      "REST APIs",
      "WebSocket",
      "Pydantic",
      "SQLAlchemy"
    ]
  },
  {
    category: "AI & Intelligent Systems",
    items: [
      "OpenAI",
      "Anthropic",
      "RAG",
      "pgvector",
      "Vector Search",
      "Prompt Engineering",
      "LLM Integration"
    ]
  },
  {
    category: "Data & Workflow Systems",
    items: [
      "PostgreSQL",
      "Snowflake",
      "Redis",
      "SQL",
      "Pandas",
      "NumPy",
      "PySpark",
      "Dask",
      "Apache Airflow"
    ]
  },
  {
    category: "Cloud, DevOps & Observability",
    items: ["AWS", "Docker", "Jenkins", "GitHub Actions", "CI/CD", "Splunk"]
  },
  {
    category: "Testing & Developer Tools",
    items: [
      "pytest",
      "Postman",
      "Swagger",
      "Git",
      "Jupyter Notebook",
      "Cursor",
      "Claude",
      "GitHub Copilot"
    ]
  }
];

export default function App() {
  const canvasRef = useRef(null);
  const heroStats = useMemo(
    () => [
      { label: "IN PRODUCT DEV", value: "4+" },
      { label: "CONCURRENT SESSIONS", value: "50+" },
      { label: "INDEXED DATA POINTS", value: "2K+" }
    ],
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let width = 0;
    let height = 0;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * window.devicePixelRatio);
      canvas.height = Math.floor(height * window.devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const nodeCount = 60;
    const nodes = Array.from({ length: nodeCount }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 2 + Math.random() * 1.5
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(9, 12, 24, 0.7)";
      ctx.fillRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0 || node.x >= width) node.vx *= -1;
        if (node.y <= 0 || node.y >= height) node.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const alpha = 1 - dist / 140;
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.25 * alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    setSize();
    window.addEventListener("resize", setSize);
    draw();

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-ink text-white">
      <canvas ref={canvasRef} className="live-canvas" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-0 gradient-ring opacity-40" />
      <div className="pointer-events-none fixed inset-0 z-0 pulse-orbs opacity-35" />
      <div className="relative z-10">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <span className="text-lg font-semibold tracking-wide">
              Sohitha Kommineni
            </span>
            <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
              <a className="hover:text-white" href="#about">
                About
              </a>
              <a className="hover:text-white" href="#skills">
                Skills
              </a>
              <a className="hover:text-white" href="#education">
                Education
              </a>
              <a className="hover:text-white" href="#projects">
                Projects
              </a>
              <a className="hover:text-white" href="#contact">
                Contact
              </a>
            </nav>
            <a
              href="#contact"
              className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-white/40"
            >
              Let&apos;s talk
            </a>
          </div>
        </header>

        <main>
          <section id="hero" className="relative overflow-hidden border-b border-white/10">
            <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1.2fr_0.8fr] md:py-28">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="space-y-6 text-center"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                  {"FULL STACK DEVELOPER · BACKEND & AI SYSTEMS"}
                </p>
                <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                  Sohitha Kommineni
                </h1>
                <p className="text-lg text-white/80">
                  I build scalable software systems that combine backend
                  engineering, AI-powered workflows, data-driven architecture, and
                  clean user experiences.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="#projects"
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink shadow-glow"
                  >
                    See My Work
                  </a>
                  <a
                    href="#contact"
                    className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:border-white/60"
                  >
                    Contact Me
                  </a>
                </div>
                <div className="grid gap-4 pt-6 md:grid-cols-3">
                  {heroStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                    >
                      <p className="text-2xl font-semibold">{stat.value}</p>
                      <p className="text-xs uppercase tracking-wide text-white/60">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="order-first flex w-full items-start justify-center md:order-none md:mt-4 md:justify-center"
              >
                <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full border-2 border-purple-400/40 shadow-[0_0_60px_rgba(124,58,237,0.35)]">
                  <img
                    src={`${import.meta.env.BASE_URL}sohitha-profile.png`}
                    alt="Sohitha Kommineni profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          <section id="about" className="mx-auto max-w-6xl px-6 py-20 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-5xl font-semibold text-teal-200">About Me</h2>
              <p className="mx-auto max-w-3xl text-center text-white/70">
                I am a Full Stack Developer who builds where software is moving
                next: AI-native, data-rich, real-time, and production-ready. My
                work spans backend platforms, React interfaces, scalable APIs,
                workflow engines, LLM integrations, cloud deployments, data
                pipelines, and intelligent applications designed to turn complex
                business logic into software that feels simple, fast, and reliable.
              </p>
              <p className="mx-auto max-w-3xl text-center text-white/70">
                I like solving problems that go beyond standard feature
                development: streaming AI responses, designing clean API contracts,
                building resilient processing pipelines, optimizing latency,
                modeling data for scale, and creating interfaces that make
                sophisticated systems easy to use. I bring the mindset of an
                engineer who can understand the product, shape the architecture,
                and ship secure, maintainable software that works in the real world.
              </p>
            </motion.div>
          </section>

          <section
            id="skills"
            className="border-t border-white/10 bg-gradient-to-br from-white/5 via-purple-500/10 to-cyan-500/10"
          >
            <div className="mx-auto max-w-6xl px-6 py-20 text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h2 className="text-5xl font-semibold text-teal-200">Skills</h2>
                <p className="text-white/70">
                  A production-focused toolkit for building scalable full-stack
                  platforms, AI workflows, and data-driven systems.
                </p>
              </motion.div>
              <div className="mt-10 grid gap-6 md:grid-cols-2 md:justify-items-center">
                {skills.map((skill) => (
                  <motion.div
                    key={skill.category}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="glass w-full rounded-2xl p-6 text-center"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {skill.category}
                    </h3>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="education"
            className="border-t border-white/10 bg-gradient-to-br from-amber-500/10 via-white/5 to-rose-500/10"
          >
            <div className="mx-auto max-w-6xl px-6 py-20 text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h2 className="text-5xl font-semibold text-teal-200">Education</h2>
              </motion.div>
              <div className="mt-8 grid gap-6 md:grid-cols-2 md:justify-items-center">
                <div className="glass w-full rounded-3xl p-6 text-center">
                  <p className="text-sm text-white/60">Graduate Program</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    M.S. Computer and Information Sciences
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    University of North Texas
                  </p>
                </div>
                <div className="glass w-full rounded-3xl p-6 text-center">
                  <p className="text-sm text-white/60">Undergraduate Program</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    B.Tech. in Computer Science and Engineering
                  </p>
                  <p className="mt-2 text-sm text-white/70">JNTUK</p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="projects"
            className="border-y border-white/10 bg-gradient-to-br from-blue-500/10 via-white/5 to-purple-500/10"
          >
            <div className="mx-auto max-w-6xl px-6 py-20 text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h2 className="text-5xl font-semibold text-teal-200">Projects</h2>
                <p className="text-white/70">
                  “Highlighting personal projects that demonstrate full-stack
                  development and AI integration.”
                </p>
              </motion.div>

              <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:justify-items-center">
                {projects.map((project) => (
                  <motion.article
                    key={project.name}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="glass flex h-full flex-col gap-4 rounded-3xl p-6 text-center"
                  >
                    <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                      <img
                        src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, "")}`}
                        alt={`${project.name} preview`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-sm text-white/70">
                        {project.tagline}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/50">
                        Problem solved
                      </p>
                      <p className="mt-2 text-sm text-white/70">{project.problem}</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ul className="space-y-2 text-sm text-white/70">
                      {project.highlights.map((feature) => (
                        <li key={feature} className="flex justify-center gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-purple-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-white/70">{project.impact}</p>
                    <div className="mt-auto flex justify-center gap-3 text-sm">
                      <a
                        href={project.links.github}
                        className="rounded-full bg-white px-4 py-2 text-ink"
                      >
                        GitHub
                      </a>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="contact"
            className="border-t border-white/10 bg-gradient-to-br from-ink via-blue-900/40 to-emerald-900/40"
          >
            <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 text-center md:grid-cols-[1fr_1.1fr]">
              <div className="space-y-4">
                <h2 className="text-5xl font-semibold text-teal-200">
                  Let&apos;s connect
                </h2>
                <p className="text-white/70">
                  Reach out for AI product builds, full-stack collaboration, or
                  consulting on LLM integration.
                </p>
                <div className="space-y-3 text-sm text-white/70">
                  <div className="flex flex-wrap justify-center gap-4">
                    <a
                      className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-base font-semibold hover:border-white/50"
                      href="https://www.linkedin.com"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="currentColor"
                      >
                        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM0 8h5v16H0V8Zm7.5 0H12v2.2h.08C12.8 8.9 14.4 7.5 16.8 7.5 21.6 7.5 24 10.4 24 15.1V24h-5v-8c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.1V24h-5V8Z" />
                      </svg>
                      LinkedIn
                    </a>
                    <a
                      className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-base font-semibold hover:border-white/50"
                      href="https://github.com/sohitha-kommineni"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.37 0 0 5.5 0 12.3c0 5.4 3.44 10 8.2 11.6.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.2-1.8-1.2-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.4-5.3-6 0-1.3.4-2.4 1.1-3.2-.1-.3-.5-1.6.1-3.4 0 0 .9-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.4-1.6 3.3-1.2 3.3-1.2.6 1.8.2 3.1.1 3.4.7.8 1.1 1.9 1.1 3.2 0 4.6-2.7 5.7-5.3 6 .4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.8-1.6 8.2-6.2 8.2-11.6C24 5.5 18.63 0 12 0Z" />
                      </svg>
                      GitHub
                    </a>
                    <a
                      className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-base font-semibold text-ink hover:opacity-90"
                      href="mailto:komminenisohitha@gmail.com"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="currentColor"
                      >
                        <path d="M2 6.5C2 5.12 3.12 4 4.5 4h15C20.88 4 22 5.12 22 6.5v11c0 1.38-1.12 2.5-2.5 2.5h-15C3.12 20 2 18.88 2 17.5v-11Zm2.2-.5 7.8 5.2 7.8-5.2H4.2Zm15.8 2.9-7.5 5c-.32.22-.73.22-1.05 0l-7.5-5V17.5c0 .28.22.5.5.5h15a.5.5 0 0 0 .5-.5V8.9Z" />
                      </svg>
                      Gmail
                    </a>
                  </div>
                  <p className="text-sm text-white/60">
                    Prefer email? Send a quick note via Gmail.
                  </p>
                </div>
              </div>

              <div className="glass rounded-3xl p-6 text-left">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Open to opportunities
                  </h3>
                  <p className="text-sm text-white/70">
                    If you have relevant opportunities, please email me with role
                    details, location, and expected start date. I appreciate the
                    outreach and will respond promptly.
                  </p>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    Availability: Open for full-stack + AI product collaborations.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 py-8 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Sohitha Kommineni. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
