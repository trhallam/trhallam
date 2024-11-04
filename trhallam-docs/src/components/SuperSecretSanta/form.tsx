// Docusaurus and React
import React, { useEffect, useState } from 'react';

// Secret Santa modules
// import { get_secret_santas } from 'super-secret-santa/super_secret_santa';
// import { get_secret_santas } from 'super_secret_santa';

import { SecretLink } from '@site/src/components/SuperSecretSanta/links';

// Styling
import styles from './styles.module.css';
import BrowserOnly from '@docusaurus/BrowserOnly';

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

const emptyForm = (onSubmit, instructions) => {
    return (
        <form id={formID} method="post" onSubmit={onSubmit} className={styles.part}>
            <h3>Secret Santa Instructions</h3>
            <textarea
                name="input"
                id="input"
                className={styles.input}
                placeholder={default_text.replace(/^[ \t]+/gm, '')}
                defaultValue={instructions}
                autoFocus>
            </textarea>
            <button type='submit' className={styles.generate}>Generate Pairings</button>
        </form>
    )
}

const filledForm = (onAlter, instructions, links) => {
    return (
        <div className={styles.part} >
            <h3>Secret Santa Instructions</h3>
            <textarea
                className={styles.input}
                defaultValue={instructions}
                disabled>
            </textarea>
            {/* Put the generated pairings in the next div. */}
            <div className={styles.result}>
                <h3>The Pairings</h3>
                <table className={styles.result_table}>
                    {links}
                </table>
            </div>
            <button onClick={() => onAlter()} className={styles.generate}>
                Amend pairings</button>
        </div>
    )
}


function render(): JSX.Element {
    const [isGen, setIsGen] = useState(false);
    const [instructions, setInstructions] = useState("");
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

        // pass formJson.input
        setInstructions(instr)
        const pair_map = wasm.get_secret_santas(instr);
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
            return emptyForm(handleSubmit, instructions);
        } else {
            const pair_map = Array.from(
                pairs.keys()).map(
                    (n, index) => (
                        <SecretLink name={n.valueOf()} secrets={pairs.get(n)} />
                    )
                );
            return (filledForm(handleAlter, instructions, pair_map))
        }
    }

    return (
        renderInputOutput()
    )
}


export const SecretSantaForm: React.FC = () => {
    return (
        <BrowserOnly fallback={<div>Loading...</div>}>
            {() => { return render() }}
        </BrowserOnly>
    )
}