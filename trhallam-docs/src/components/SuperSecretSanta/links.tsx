import styles from './styles.module.css';

interface SecretLinkProps {
    name: string;
    secrets: Object;
}

export function SecretLink({ name, secrets }: SecretLinkProps): JSX.Element {
    const query = `?name=${name}&key=${secrets["key"]}&secret=${secrets["pairing"]}&iv=${secrets["nonce"]}`;
    // Construct the link URL
    const base_url = window.location.origin;
    const path = window.location.pathname;
    const link = new URL("who", base_url + "/trhallam/super-secret-santa/");
    // Components are table rows with two columns Participant Name and Link to Secret
    return (
        <tr className={styles.result_row} key={name}>
            <td className={styles.result_name}>{name}</td>
            <td className={styles.result_link}><a data-name={name} href={link.href + query} target='_blank'>{link.href}</a></td>
        </tr>
    )
}