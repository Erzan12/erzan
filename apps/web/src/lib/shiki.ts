import { createHighlighter, type Highlighter } from "shiki";

// In Shiki v1+, it's often easier to store the highlighter instance itself
// or the promise of the instance.
let highlighterPromise: Promise<Highlighter> | null = null;

function getShikiHighlighter() {
  if (!highlighterPromise) {
    // getHighlighter -> createHighlighter
    highlighterPromise = createHighlighter({
      themes: ["one-dark-pro"], // Note: 'themes' (plural)
      langs: ["typescript", "javascript", "tsx", "php", "sql"],
    });
  }
  return highlighterPromise;
}

export async function highlight(code: string, lang: string) {
  const highlighter = await getShikiHighlighter();
  
  // .codeToHtml is still used, but the options structure is slightly different
  return highlighter.codeToHtml(code, { 
    lang, 
    theme: "one-dark-pro" 
  });
}