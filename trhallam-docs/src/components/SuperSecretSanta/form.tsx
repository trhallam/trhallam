// Docusaurus and React
import React, { useEffect, useState } from 'react';

import { SecretLink } from '@site/src/components/SuperSecretSanta/links';

// Styling
import styles from './styles.module.css';
import BrowserOnly from '@docusaurus/BrowserOnly';

import { Column } from "@site/src/components/Common";

const formID: string = "santaForm";
const default_text: string = (
    `# You can add a user by adding a line
            Santa

            # You can add some details if you want to, using parentheses after the name
            Nicholas (the elf)

            # You can prevent someone from being paired with someone else
            Maël !Aurélie
            Aurélie !Maël

            # You can also exclude someone from being paired with multiple people
            # Careful: too many exclusion rules can make your secret santa less interesting!
            Rudolph !Santa !Nicholas (the elf)

            # You can also cheat a bit and force someone to be paired with another
            Nicholas (the saint) =Nicholas (the elf)
            `)

const emptyForm = (onSubmit, instructions, className) => {
    return (
        <form id={formID} method="post" onSubmit={onSubmit} className={className}>
            <h2>Secret Santa Instructions</h2>
            <textarea
                name="input"
                id="input"
                placeholder={default_text.replace(/^[ \t]+/gm, '')}
                defaultValue={instructions}
                autoFocus>
            </textarea>
            <button type='submit'>Generate Pairings</button>
        </form>
    )
}

const filledForm = (onAlter, instructions, links, className) => {
    return (
        <div className={className}>
            <h2>Secret Santa Instructions</h2>
            <textarea
                defaultValue={instructions}
                disabled>
            </textarea>
            {/* Put the generated pairings in the next div. */}
            <Column>
                <h2>The Pairings</h2>
                <table>
                    <thead>
                        <tr key="header">
                            <th> Name</th>
                            <th> Secret Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {links}
                    </tbody>
                </table>
            </Column>
            <button onClick={() => onAlter()}>
                Amend Pairings</button>
        </div>
    )
}


function render({ className }): JSX.Element {
    const [isGen, setIsGen] = useState(false);
    const [instructions, setInstructions] = useState(localStorage.getItem("secret-santa"));
    const [pairs, setPairs] = useState<Map<String, Object>>(new Map());
    const [wasm, setWasm] = useState(null);



    useEffect(() => {
        import("@trhallam/super-secret-santa").then(setWasm);
    }, [])

    function handleSubmit(query): void {
        // Prevent the browser from reloading the page
        query.preventDefault();

        // Read the form data
        const form = query.target;
        const formData = new FormData(form);

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        const instr = formJson.input.toString();
        let pair_map = new Map();
        // pass formJson.input
        setInstructions(instr);
        localStorage.setItem("secret-santa", instr);
        try {
            pair_map = wasm.get_secret_santas(instr);
        } catch (e) {
            console.log(e);
            console.log("Could not generate pairings.")
            return null;
        }
        // const pair_map = new Map;
        // console.log("pair map", pair_map);
        // console.log(pairs.entries());
        setPairs(pair_map);
        setIsGen(true);
        return null;
    }

    function handleAlter(): void {
        setIsGen(false);
        return null;
    }

    const renderInputOutput = () => {
        if (!isGen) {
            return emptyForm(handleSubmit, instructions, className);
        } else {
            const pair_map = Array.from(
                pairs.keys()).map(
                    (n, index) => (
                        <SecretLink name={n.valueOf()} secrets={pairs.get(n)} className={""} />
                    )
                );
            return (filledForm(handleAlter, instructions, pair_map, className))
        }
    }

    return (
        renderInputOutput()
    )
}


export function SecretSantaForm({ className = "" }): JSX.Element {
    return (
        <BrowserOnly fallback={<div>Loading...</div>}>
            {() => { return render({ className }) }}
        </BrowserOnly>
    )
}