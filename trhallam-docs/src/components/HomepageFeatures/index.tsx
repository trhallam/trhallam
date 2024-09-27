import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Png: string;
  description: JSX.Element;
  linkto: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Gists',
    Png: require('@site/static/img/code.png').default,
    description: (
      <>
        Some Gists and snippets of code that capture key ideas and templates from
        my work, explanations where necessary or linked to the Blog or Projects.
      </>
    ),
    linkto: './docs/gists/gist-intro',
  },
  {
    title: 'Projects',
    Png: require('@site/static/img/projects.png').default,
    description: (
      <>
        Some of the projects I've worked on over the years.
      </>
    ),
    linkto: './docs/projects/overview'
  },
  {
    title: 'Blog',
    Png: require('@site/static/img/blog.png').default,
    description: (
      <>
        Posts about my areas of interest and solutions to development and configuration
        challenges.
      </>
    ),
    linkto: './blog'
  },
];

function Feature({ title, Png, description, linkto }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <a href={linkto}><img className={styles.featureSvg} role="img" src={Png} /></a>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
