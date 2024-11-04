import { useEffect, useState } from 'react';
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useLocation } from "@docusaurus/router";
import React from "react";

function MsgBox({ children }): JSX.Element {
    return (
        <div className="who-wrapper">
            <div className="who-content">
                {children}
            </div >
        </div>
    )
}

function MsgMatch({ name, match }): JSX.Element {
    return (
        <MsgBox>
            <div className="who-title">
                Hi <span id="name">{name}</span>! You've been paired with
            </div>
            <div className="who-pairing">
                <div className="who-pairing-name">{match}</div>
                <div className="who-pairing-details"></div>
            </div>
            <div className="who-title">Good luck!</div>
        </ MsgBox >
    )
}

function MsgError({ error }) {
    return (
        <MsgBox>
            <div className="who-title">
                <strong>Error: </strong>{error}
            </div>
        </ MsgBox >
    )
}

function render(): JSX.Element {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [wasm, setWasm] = useState(null);
    let who = "Unknown";

    useEffect(() => {
        import("@trhallam/super-secret-santa").then(setWasm);
    }, [])

    if (wasm) {
        try {
            let key = params.get('key');
            let iv = params.get('iv');
            let secret = params.get('secret');
            who = wasm.decrypt_secret_santa(key, iv, secret);
        } catch (e) {
            console.log(e);
            return <MsgError error="Could not decode url query!" />
        }
    }
    return (<MsgMatch match={who} name={params.get('name')}></MsgMatch>)
}

export const WhoMsg: React.FC = () => {
    return (
        <BrowserOnly fallback={<div>Loading...</div>}>
            {() => { return render() }}
        </BrowserOnly>
    )
}