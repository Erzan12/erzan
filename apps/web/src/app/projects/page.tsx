"use client";

import { useState, useMemo } from "react"; //added useMemo for performance
import { motion } from "framer-motion";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { ArrowLeft, Search, X } from "lucide-react"; // for search bar icons
import { SystemCardSkeleton } from "@/components/core/system-design/system-card-skeleton";
import SystemCard from "@/components/core/system-design/system-card";
import Link from "next/link";

//define how many items per page (3 columns x 3 rows = 9)
const ITEMS_PER_PAGE = 9;

export default function ProjectsPage() {
  //github api call or query
  const { repos, loading } = useGithubRepos();
  //add state for the current page
  const [currentPage, setCurrentPage] = useState(1);
  //search handler
  const [ searchQuery, setSearchQuery ] = useState(""); // search state
  //for category
  const [activeCategory, setActiveCategory] = useState("All");
  //define category for sort
  const CATEGORIES = ["All", "React", "NextJS", "TypeScript", "PHP", "Laravel", "HTML"];

  const techColors: Record<string, string> = {
      React: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
      NextJS: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
      TypeScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
      NestJS: "bg-red-100 text-red-800 dark:bg-red-100 dark:text-red-100",
      Prisma: "bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100",
      PostgreSQL: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
      Docker: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
      Docusaurus: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
      Tailwind: "bg-sky-100 text-sky-800 dark:bg-sky-800 dark:text-sky-100",
      PHP: "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
      Laravel: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
      CodeIgniter: "bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-50",
  };

  // const sortedRepos = repos 
  //   ? [...repos].sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
  //   : [];

  //filter and sort logic
  const filteredRepos = useMemo(() => {
    if (!repos) return [];

    return repos
      .filter((repo) => {
        //category Filter
        const categoryMatch = 
          activeCategory === "All" || 
          repo.language === activeCategory || 
          repo.name.toLowerCase().includes(activeCategory.toLowerCase());

        //search Filter
        const searchTerm = searchQuery.toLowerCase();
        const searchMatch = 
          repo.name.toLowerCase().includes(searchTerm) || 
          (repo.description?.toLowerCase().includes(searchTerm) ?? false);

        //return true only if BOTH match
        return categoryMatch && searchMatch;
      })
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  }, [repos, searchQuery, activeCategory]);

  //pagination Math
  const totalPages = Math.ceil(filteredRepos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  //slice the array to only get the 9 items for the current page
  const paginatedRepos = filteredRepos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  //reset to page 1 when searching
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  //handlers for button clicks
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <main className="min-h-screen pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header with search bar */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-card-foreground font-sans tracking-tight">
              Projects
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl font-sans leading-relaxed">
              This section highlights all my development projects.
            </p>
          </div>

          {/* search input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-2 rounded-full border border-border bg-card/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => {setSearchQuery(""); setCurrentPage(1);}}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* back button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-sans text-sm group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        {/*added sorting category section for tech stack used*/}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1); //always reset to page 1!
              }}
              className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? "text-white" 
                  : "text-muted-foreground hover:text-foreground bg-secondary/50"
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
          {loading ? (
            Array.from({ length: 9 }).map((_, i) => (
              <SystemCardSkeleton key={`skeleton-${i}`} />
            ))
          ) : paginatedRepos.length > 0 ? (
            paginatedRepos.map((repo) => (
              <motion.div
                key={repo.id}
                layout //smoothly animate grid shifts
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SystemCard
                  title={repo.name}
                  description={repo.description ?? "No description provided"}
                  stars={repo.stargazers_count}
                  forks={repo.forks_count}
                  language={repo.language}
                  last_update={repo.pushed_at}
                  link={repo.html_url}
                  showArchitectureLink={false}
                  showRepositoryLink={true}
                  techColors={techColors}
                />
              </motion.div>
            ))
          ) : (
            /* no result state */
            <div className="col-span-full py-20 text-center">
              <p className="text-muted-foreground">No projects found matching &quot;{searchQuery}&quot;</p>
            </div>
          )}
        </div>

        {/* pagination controls */}
        {!loading && totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition-colors"
            >
              Previous
            </button>
            
            <span className="text-sm font-medium text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition-colors"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </main>
  );
}