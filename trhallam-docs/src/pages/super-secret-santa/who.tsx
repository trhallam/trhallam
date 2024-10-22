import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useHistory, useLocation } from '@docusaurus/router';
import Layout from '@theme/Layout';

import { decrypt_secret_santa } from '@site/static/super-secret-santa/super_secret_santa';


import './who.module.css';

function WhoMsg() {

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const who = decrypt_secret_santa(params.get('key'), params.get('iv'), params.get('secret'));
    console.log(who);
    return (
        <div className="who-wrapper">
            <div className="who-content">
                <div className="who-title">Hi <span id="name">{params.get('name')}</span>! You've been paired with</div>
                <div className="who-pairing">
                    <div className="who-pairing-name">{who}</div>
                    <div className="who-pairing-details"></div>
                </div>

                <div className="who-title">Good luck!</div>
            </div ></div>
    )
}

export default function Home(): JSX.Element {
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    console.log(search.keys());
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
