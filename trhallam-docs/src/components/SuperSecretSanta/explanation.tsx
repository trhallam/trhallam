import clsx from 'clsx';

export function Explanation({ className = "" }) {
    return (
        <div className={clsx(className)}>
            <p>This application is a shameless copy of another
                <a href="https://github.com/arcanis/secretsanta"> open-source project </a>
                but ported to TypeScript and implemented using a WASM compiled Rust library 🦀.
                The front end is broadly similar but the internals are quite different. If you want to know more
                about this project, please read the <a href="./blog/super-secret-santa-1">blog post</a>.
            </p>

            <h2>Guide</h2>
            <p>No sign up, no email, no unnecessary interactions with a third party. Just a straightforward
                open-source tool to help you generate your secret santa pairings.</p>
            <p>In the most common case (no exclusion rules, pair each guest with another at random), enter the name
                of your guests one line at a time. Once done, press "generate" and you're all set: send the generated
                links to your guests (by mail, chat, whatever floats your boat) and their pairing will be revealed to
                them (and only them) once they open the link.</p>

            <h2>How does it work?</h2>
            <p>The secret santa pairings are worked out in the background and then encoded in a non human readable
                query string for the pairing page. When your participants open their link, they will be shown their
                name and who they have been paired with. Of course, anyone can open another person's link but where
                is the fun in that?
            </p>
        </div>
    )
}