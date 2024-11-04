import Layout from '@theme/Layout';

import { WhoMsg } from '@site/src/components/SuperSecretSanta';

import './who.module.css';

export default function Home(): JSX.Element {
    return (
        <Layout
            title={`Super Secret Santa (Who?)`}
            description="Your secret santa is revealed.">
            {
                <div className="who-main">
                    <WhoMsg />
                </div>
            }
        </Layout >
    );
}
