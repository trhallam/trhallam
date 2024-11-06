import clsx from "clsx";
import styles from "./styles.module.css";

export function Page({ children, className = "" }): JSX.Element {
    return (
        <div className={clsx(styles.main_wrapper, "main-wrapper", className)}>
            <main className={clsx("container container--fluid margin-vert--lg")}>
                {children}
            </main>
        </div>
    )
}