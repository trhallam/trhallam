// Docusaurus and React
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import { Explanation, SecretSantaForm } from "@site/src/components/SuperSecretSanta";

// Styling
import styles from './index.module.css';

export default function SecretSanta(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    const page = (
        <Layout
            title={`Super Secret Santa`}
            description="Generate your secret santa pairings.">
            {
                <div>
                    <div className={styles.main}>
                        <Explanation />
                        <SecretSantaForm></SecretSantaForm>
                    </div>
                </div>
            }
        </Layout >
    );
    return page;
}