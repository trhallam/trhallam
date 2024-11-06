import clsx from "clsx";
import styles from "./styles.module.css";

export function Row({ children, className = "" }): JSX.Element {
    return (
        <div className={clsx(styles.row, "row", className)}>
            {children}
        </div>
    )
}