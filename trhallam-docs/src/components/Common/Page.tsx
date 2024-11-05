import clsx from "clsx";
import styles from "./styles.module.css";

export function Page({ children }): JSX.Element {
    return (
        <div className={clsx(styles.main_wrapper, "main-wrapper")}>
            <main className={clsx("container container--fluid margin-vert--lg")}>
                {children}
            </main>
        </div>
    )
}