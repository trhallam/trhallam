import clsx from "clsx";
import styles from "./styles.module.css";

export function Column({ children }): JSX.Element {
    return (
        <div className={clsx(styles.column, "column")}>
            {children}
        </div>
    )
}
