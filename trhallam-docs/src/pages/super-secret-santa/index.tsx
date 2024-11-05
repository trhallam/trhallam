// Docusaurus and React
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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
                <Page >
                    <Row>
                        <Column><Explanation /></Column>
                        <Column><SecretSantaForm /></Column>
                    </Row>
                </Page>
            }
        </Layout >
    );
    return page;
}