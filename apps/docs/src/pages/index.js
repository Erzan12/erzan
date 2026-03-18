import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

const HomepageHeader = () => {
  return (
    <header className="hero hero--primary">
      <div className="container">
        <h1 className="hero__title">
          Erzan Engineering Documentation
        </h1>

        <p className="hero__subtitle">
          Architecture, design decisions, and development process
          behind my projects and developer platform.
        </p>

        <div>
          <Link
            className="button button--secondary button--lg"
            to="/docs/introduction"
          >
            Explore Documentation
          </Link>
        </div>
      </div>
    </header>
  );
};

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
