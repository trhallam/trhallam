// Docusaurus and React
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

import { Explanation, SecretSantaForm } from "@site/src/components/SuperSecretSanta";
import { Page, Row, Column } from "@site/src/components/Common";

// Styling
import styles from './index.module.css';

export default function SecretSanta(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    const page = (
        <Layout
            title={`Super Secret Santa`}
            description="Generate your secret santa pairings.">
            {
                <Page className={styles.page}>
                    <Column className={styles.text}>
                        <Row>
                            <h1>
                                <img src={useBaseUrl('img/secretsanta/mistletoe.png')}
                                    style={{ verticalAlign: "middle", padding: "10px" }}
                                />
                                Super Secret Santa Generator
                                <img src={useBaseUrl('img/secretsanta/mistletoe.png')}
                                    style={{ verticalAlign: "middle", padding: "10px", transform: "scaleX(-1)" }}
                                />
                            </h1>
                        </Row>
                        <Row >
                            <Column ><Explanation /></Column>
                            <Column ><SecretSantaForm className={styles.form} /></Column>
                        </Row>
                    </Column>
                </Page>
            }
        </Layout >
    );
    return page;
}