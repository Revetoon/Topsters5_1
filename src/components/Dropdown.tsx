import styles from "@/styles/Selector.module.css";
import Image from "next/image";

interface Props {
  options: {
    id: number | string;
    name: string;
    icon?: string;
    action?: () => void;
  }[];
  selected: number | string;
  onChange: (id: any) => void | {};
}

const Dropdown: React.FC<Props> = ({ options, selected, onChange }) => {
  return (
    <div style={{ width: "144px" }} className={styles.options}>
      <select
        value={selected}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={styles.select}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.icon && (
              <Image
                src={option.icon}
                alt={option.name}
                width={20}
                height={20}
              />
            )}
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
