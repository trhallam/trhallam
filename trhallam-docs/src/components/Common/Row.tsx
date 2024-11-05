import clsx from "clsx";
import styles from "./styles.module.css";

export function Row({ children }): JSX.Element {
    return (
        <div className={clsx(styles.row, "row")}>
            {children}
        </div>
    )
}