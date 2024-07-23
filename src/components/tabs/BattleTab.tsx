import Selector from "@/components/Selector";
import { Font, ImageFilter } from "@/redux/state";
import {
  setFont,
  setFontSize,
  setShowTitles,
  setNumberBattleItems,
  setLockWinner,
} from "@/redux/store";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Button from "../Button";

const BattleTab = ({
  dispatch,
  showTitles,
  lockWinner,
  font,
  fontSize,
  numberBattleItems,
}: {
  dispatch: any;
  showTitles: boolean;
  lockWinner: boolean;
  font: string;
  fontSize: number;
  numberBattleItems: number;
}) => {
  return (
    <div className={`animate-opacity`}>
      <div className={styles.about}>
        <p>
          Welcome to Battle Mode! Battle Mode is a fun way to determine what
          deserves the top spot! Just click on the item you think is better and
          see who wins!
        </p>
        <p>
          Over time, the ELO ratings will reflect your true feelings about your
          list!
        </p>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Battle Items</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setNumberBattleItems(parseInt(value.target.value)));
              }}
              min={2}
              max={9}
              value={numberBattleItems}
              className={styles.value}
              type="range"
            ></input>
            <span className={styles["range-value"]}>{numberBattleItems}</span>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Lock Winner</label>
          <div className={styles.values}>
            <Button
              selected={lockWinner}
              onClick={() => dispatch(setLockWinner(!lockWinner))}
            >
              {lockWinner ? (
                <Image
                  width={10}
                  height={10}
                  className={styles.icon}
                  src="/icons/check.svg"
                  alt="Check"
                ></Image>
              ) : (
                <Image
                  width={10}
                  height={10}
                  className={styles.icon}
                  src="/icons/cancel.svg"
                  alt="Cancel"
                ></Image>
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Titles</label>
          <div className={styles.values}>
            <Button
              selected={showTitles}
              onClick={() => dispatch(setShowTitles(!showTitles))}
            >
              {showTitles ? (
                <Image
                  width={10}
                  height={10}
                  className={styles.icon}
                  src="/icons/check.svg"
                  alt="Check"
                ></Image>
              ) : (
                <Image
                  width={10}
                  height={10}
                  className={styles.icon}
                  src="/icons/cancel.svg"
                  alt="Cancel"
                ></Image>
              )}
            </Button>
          </div>
        </div>
        <div style={{ height: "88px" }} className={styles.input}>
          <label className={styles["input-label"]}>Font</label>
          <div className={styles.values}>
            <Selector
              options={[
                { id: Font.monospace, name: Font.monospace },
                { id: Font.lato, name: Font.lato },
              ]}
              selected={[font]}
              onChange={(value) => {
                dispatch(setFont(value));
              }}
            ></Selector>
            <input
              onChange={(e) => dispatch(setFont(e.target.value))}
              className={styles.value}
              value={font}
              placeholder="Set a font..."
              type="text"
            ></input>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Font Size</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setFontSize(parseInt(value.target.value)));
              }}
              min={6}
              max={24}
              value={fontSize}
              className={styles.value}
              type="range"
            ></input>
            <span className={styles["range-value"]}>{fontSize}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleTab;
