import { useState, useEffect, useId } from "react";
import { AnimatePresence, motion } from "motion/react";

interface Project {
  title: string;
  images: string[];
  bullets: string[];
  tech: string[];
  status: string;
}

export default function ExpandableProjects({ projects }: { projects: Project[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [imgIndex, setImgIndex] = useState(0);
  const uid = useId();

  useEffect(() => {
    setImgIndex(0);
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const images = projects[openIndex].images;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setImgIndex((n) => (n + 1) % images.length);
      if (e.key === "ArrowLeft") setImgIndex((n) => (n - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openIndex, projects]);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-6">
      {projects.map((project, i) => {
        const layoutId = `${uid}-project-${i}`;
        return (
          <motion.div
            key={layoutId}
            layoutId={layoutId}
            onClick={() => setOpenIndex(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpenIndex(i);
              }
            }}
            className="content-card cursor-pointer w-full max-w-sm sm:w-80 flex flex-col p-0 overflow-hidden"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="flex items-center gap-1.5 px-3 h-7 bg-primary-50 border-b border-primary-200 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-primary-300" aria-hidden="true"></span>
              <span className="w-2 h-2 rounded-full bg-accent-300" aria-hidden="true"></span>
              <span className="w-2 h-2 rounded-full bg-text-300" aria-hidden="true"></span>
            </div>
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary-100 via-background-300 to-primary-200 flex-shrink-0">
              <img
                src={project.images[0]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              {project.status === "In Progress" && (
                <span className="pill-tag absolute top-2 right-2">In Progress</span>
              )}
            </div>
            <div className="p-4">
              <motion.h3 layoutId={`${layoutId}-title`} className="text-lg font-bold text-text-500 leading-snug mb-2">
                {project.title}
              </motion.h3>
              <div className="flex flex-wrap items-center gap-1.5 mb-3">
                {project.tech.slice(0, 3).map((techItem) => (
                  <span key={techItem} className="px-2 py-0.5 bg-primary-50 text-primary-700 text-sm rounded-md border border-primary-200">
                    {techItem}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-sm text-text-500/50">+{project.tech.length - 3}</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-accent-600">
                View details
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.div>
        );
      })}

      <AnimatePresence>
        {openIndex !== null && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-text-900/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpenIndex(null)}
              aria-hidden="true"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId={`${uid}-project-${openIndex}`}
                className="pointer-events-auto w-full max-w-xl max-h-[85vh] overflow-y-auto bg-background-50 border border-accent-400 rounded-2xl shadow-2xl"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="relative flex-shrink-0">
                  <div className="relative w-full aspect-[16/9] rounded-t-2xl overflow-hidden bg-gradient-to-br from-primary-100 via-background-300 to-primary-200">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.img
                        key={imgIndex}
                        src={projects[openIndex].images[imgIndex]}
                        alt=""
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>

                    {projects[openIndex].images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const len = projects[openIndex].images.length;
                            setImgIndex((n) => (n - 1 + len) % len);
                          }}
                          aria-label="Previous image"
                          className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background-50/90 text-text-500 hover:bg-background-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const len = projects[openIndex].images.length;
                            setImgIndex((n) => (n + 1) % len);
                          }}
                          aria-label="Next image"
                          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background-50/90 text-text-500 hover:bg-background-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                          {projects[openIndex].images.map((src, di) => (
                            <button
                              key={src}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setImgIndex(di);
                              }}
                              aria-label={`Go to image ${di + 1}`}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${di === imgIndex ? "bg-background-50 w-4" : "bg-background-50/50"}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(null)}
                    aria-label="Close project details"
                    className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-background-50/90 text-text-500 hover:text-text-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-8">
                  <motion.h3 layoutId={`${uid}-project-${openIndex}-title`} className="text-2xl font-bold text-text-500 mb-5">
                    {projects[openIndex].title}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    <ul className="list-disc list-inside space-y-2 text-text-500/80 leading-relaxed mb-6">
                      {projects[openIndex].bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>

                    <h4 className="text-sm font-bold uppercase tracking-wider text-text-500/60 mb-2">
                      Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[openIndex].tech.map((techItem) => (
                        <span key={techItem} className="px-2.5 py-1 bg-primary-50 text-primary-700 text-sm rounded-md border border-primary-200">
                          {techItem}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
