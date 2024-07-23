import styles from "@/styles/Button.module.css";
export default function Button(props: {
  onClick: any;
  selected?: boolean;
  children: any;
  style?: any;
}) {
  return (
    <>
      <button
        onClick={() => props.onClick()}
        className={`${styles.button} ${props.selected && styles.selected}`}
        style={props.style}
      >
        {props.children}
      </button>
    </>
  );
}
