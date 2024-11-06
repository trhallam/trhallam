import clsx from 'clsx';

interface SecretLinkProps {
    name: string;
    secrets: Object;
    className: any;
}

export function SecretLink({ name, secrets, className = "" }: SecretLinkProps): JSX.Element {
    const query = `?name=${name}&key=${secrets["key"]}&secret=${secrets["pairing"]}&iv=${secrets["nonce"]}`;
    // Construct the link URL
    const base_url = window.location.origin;
    const path = window.location.pathname;
    const link = new URL("who", base_url + "/trhallam/super-secret-santa/");
    // Components are table rows with two columns Participant Name and Link to Secret
    return (
        <tr className={clsx(className)} key={name}>
            <td >{name}</td>
            <td ><a data-name={name} href={link.href + query} target='_blank'>{link.href + query}</a></td>
        </tr>
    )
}
