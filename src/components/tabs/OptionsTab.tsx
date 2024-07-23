import Selector from "@/components/Selector";
import {
  BackgroundType,
  Direction,
  Font,
  ImageFilter,
  Position,
  Sort,
} from "@/redux/state";
import {
  exportState,
  importState,
  restart,
  setBackgroundColor1,
  setBackgroundColor2,
  setBackgroundOpacity,
  setBackgroundType,
  setImageFilter,
  setBorderColor,
  setBorderRadius,
  setBorderSize,
  setColumns,
  setFeatured,
  setFont,
  setFontSize,
  setGap,
  setGradientDirection,
  setIsCircle,
  setPreset,
  setRows,
  setShowNumbers,
  setShowEloRating,
  setShowShadows,
  setShowTitles,
  setTextColor,
  setTitle,
  setTitlesPosition,
  setSort,
  makeSortDefault,
  removeDuplicateItems,
} from "@/redux/store";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Button from "../Button";

const OptionsTab = ({
  darkTheme,
  toggleTheme,
  dispatch,
  rows,
  columns,
  featured,
  title,
  showTitles,
  showNumbers,
  showEloRating,
  font,
  fontSize,
  textColor,
  titlesPosition,
  backgroundType,
  imageFilter,
  gradientDirection,
  backgroundOpacity,
  backgroundColor1,
  backgroundColor2,
  borderSize,
  borderRadius,
  isCircle,
  borderColor,
  gap,
  showShadows,
  sort,
}: {
  darkTheme: boolean;
  toggleTheme: () => void;
  dispatch: any;
  rows: number;
  columns: number;
  featured: number;
  title: string;
  showTitles: boolean;
  showNumbers: boolean;
  showEloRating: boolean;
  font: string;
  fontSize: number;
  textColor: string;
  titlesPosition: string;
  backgroundType: string;
  imageFilter: ImageFilter;
  gradientDirection: string;
  backgroundOpacity: number;
  backgroundColor1: string;
  backgroundColor2: string;
  borderSize: number;
  borderRadius: number;
  isCircle: boolean;
  borderColor: string;
  gap: number;
  showShadows: boolean;
  sort: Sort;
}) => {
  return (
    <div className={`animate-opacity`}>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Theme</label>
          <div className={styles.values}>
            <Selector
              options={[
                {
                  id: "dark",
                  name: "Dark",
                  icon: "/icons/moon.svg",
                },
                {
                  id: "light",
                  name: "Light",
                  icon: "/icons/sun.svg",
                },
              ]}
              selected={[darkTheme ? "dark" : "light"]}
              onChange={(value) => value !== darkTheme && toggleTheme()}
            ></Selector>
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div style={{ height: "88px" }} className={styles.input}>
          <label className={styles["input-label"]}>Data</label>
          <div className={styles.values}>
            <div
              style={{
                display: "flex",
                gap: "8px",
                maxWidth: "100%",
                overflow: "hidden",
                flexWrap: "wrap",
              }}
            >
              <label htmlFor="file" className={styles["file-upload"]}>
                Import
              </label>
              <input
                id="file"
                className={styles.value}
                onChange={(e: any) => {
                  let reader = new FileReader();
                  reader.onload = (ev: any) => {
                    dispatch(importState(ev));
                    e.target.value = "";
                  };
                  reader.readAsText(e.target?.files?.[0]);
                }}
                type="file"
              ></input>
              <Button
                onClick={() => {
                  dispatch(exportState());
                }}
              >
                Export
              </Button>
              <Button
                onClick={() => {
                  confirm("Are you sure you want to remove all duplicates?") &&
                    dispatch(removeDuplicateItems());
                }}
              >
                Remove Dupes
              </Button>
              <Button
                onClick={() => {
                  confirm("Are you sure you want to start over?") &&
                    dispatch(restart());
                }}
              >
                Restart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Presets</label>
          <div className={styles.values}>
            <Selector
              options={[
                { id: "Topsters", name: "Topsters" },
                { id: "Museum", name: "Museum" },
                { id: "Mega List", name: "Mega List" },
              ]}
              selected={[]}
              onChange={(value) => dispatch(setPreset(value))}
            ></Selector>
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Sort</label>
          <div className={styles.values}>
            <Selector
              options={[
                { id: Sort.default, name: Sort.default },
                { id: Sort.elo, name: Sort.elo },
              ]}
              selected={[sort]}
              onChange={(value) => dispatch(setSort(value))}
            ></Selector>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Save Layout</label>
          <div className={styles.values}>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                onClick={() => {
                  confirm(
                    "Are you sure you want to overwrite your default list with the current list?"
                  ) && dispatch(makeSortDefault());
                }}
              >
                Save As Default
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Rows</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setRows(parseInt(value.target.value)));
              }}
              min={1}
              max={10}
              value={rows}
              className={styles.value}
              type="range"
            ></input>
            <span className={styles["range-value"]}>{rows}</span>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Columns</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setColumns(parseInt(value.target.value)));
              }}
              min={1}
              max={10}
              value={columns}
              className={styles.value}
              type="range"
            ></input>
            <span className={styles["range-value"]}>{columns}</span>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Featured</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setFeatured(parseInt(value.target.value)));
              }}
              min={0}
              max={(rows * columns) / 2}
              value={featured}
              step={Math.floor(columns / 2)}
              className={styles.value}
              type="range"
            ></input>
            <span className={styles["range-value"]}>{featured}</span>
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Title</label>
          <div className={styles.values}>
            <input
              onChange={(e) => dispatch(setTitle(e.target.value))}
              className={styles.value}
              value={title}
              placeholder="Set a title..."
              type="text"
            ></input>
          </div>
        </div>
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
        <div className={styles.input}>
          <label className={styles["input-label"]}>Numbers</label>
          <div className={styles.values}>
            <Button
              selected={showNumbers}
              onClick={() => dispatch(setShowNumbers(!showNumbers))}
            >
              {showNumbers ? (
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
        <div className={styles.input}>
          <label className={styles["input-label"]}>Show ELO</label>
          <div className={styles.values}>
            <Button
              selected={showEloRating}
              onClick={() => dispatch(setShowEloRating(!showEloRating))}
            >
              {showEloRating ? (
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
        <div className={styles.input}>
          <label className={styles["input-label"]}>Color</label>
          <div className={styles.values}>
            <input
              onChange={(value) => dispatch(setTextColor(value.target.value))}
              className={styles.value}
              value={textColor}
              type="color"
            ></input>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Position</label>
          <div className={styles.values}>
            <Selector
              options={[
                { id: Position.side, name: Position.side },
                { id: Position.cover, name: Position.cover },
              ]}
              selected={[titlesPosition]}
              onChange={(value) => dispatch(setTitlesPosition(value))}
            ></Selector>
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Background</label>
          <div className={styles.values}>
            <Selector
              options={[
                {
                  id: BackgroundType.color,
                  name: BackgroundType.color,
                },
                {
                  id: BackgroundType.gradient,
                  name: BackgroundType.gradient,
                },
                {
                  id: BackgroundType.radialGradient,
                  name: "Radial",
                },
              ]}
              selected={[backgroundType]}
              onChange={(value) => dispatch(setBackgroundType(value))}
            ></Selector>
          </div>
        </div>
        {backgroundType !== BackgroundType.color && (
          <div style={{ height: "136px" }} className={styles.input}>
            <label className={styles["input-label"]}>Direction</label>
            <div style={{ justifyContent: "center" }} className={styles.values}>
              <Selector
                label="Gradient direction"
                options={[
                  {
                    id: Direction.topLeft,
                    name: "topLeft",
                    hideLabel: true,
                    icon: "/icons/upleft.svg",
                  },
                  {
                    id: Direction.top,
                    name: "top",
                    hideLabel: true,
                    icon: "/icons/up.svg",
                  },
                  {
                    id: Direction.topRight,
                    name: "topRight",
                    hideLabel: true,
                    icon: "/icons/upright.svg",
                  },
                  {
                    id: Direction.left,
                    name: "left",
                    hideLabel: true,
                    icon: "/icons/left.svg",
                  },
                  {
                    id: Direction.center,
                    name: "center",
                    hideLabel: true,
                    icon: "/icons/center.svg",
                  },
                  {
                    id: Direction.right,
                    name: "right",
                    hideLabel: true,
                    icon: "/icons/right.svg",
                  },
                  {
                    id: Direction.bottomLeft,
                    name: "bottomLeft",
                    hideLabel: true,
                    icon: "/icons/downleft.svg",
                  },
                  {
                    id: Direction.bottom,
                    name: "bottom",
                    hideLabel: true,
                    icon: "/icons/down.svg",
                  },
                  {
                    id: Direction.bottomRight,
                    name: "bottomRight",
                    hideLabel: true,
                    icon: "/icons/downright.svg",
                  },
                ]}
                selected={[gradientDirection]}
                onChange={(value) => dispatch(setGradientDirection(value))}
              ></Selector>
            </div>
          </div>
        )}
        <div className={styles.input}>
          <label className={styles["input-label"]}>Opacity</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setBackgroundOpacity(parseInt(value.target.value)));
              }}
              className={styles.value}
              type="range"
              value={backgroundOpacity}
              min={0}
              max={16}
            ></input>
            <span className={styles["range-value"]}>{backgroundOpacity}</span>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Color</label>
          <div className={styles.values}>
            <div>
              <input
                onChange={(value) =>
                  dispatch(setBackgroundColor1(value.target.value))
                }
                value={backgroundColor1}
                className={styles.value}
                type="color"
              ></input>
              {backgroundType !== BackgroundType.color && (
                <input
                  onChange={(value) =>
                    dispatch(setBackgroundColor2(value.target.value))
                  }
                  value={backgroundColor2}
                  className={styles.value}
                  type="color"
                ></input>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Border</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setBorderSize(parseInt(value.target.value)));
              }}
              className={styles.value}
              type="range"
              value={borderSize}
              min={0}
              max={20}
            ></input>
            <span className={styles["range-value"]}>{borderSize}</span>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Radius</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setBorderRadius(parseInt(value.target.value)));
              }}
              className={styles.value}
              type="range"
              value={borderRadius}
              min={0}
              max={20}
            ></input>
            <span className={styles["range-value"]}>{borderRadius}</span>
          </div>
        </div>
        <div style={{ height: "88px" }} className={styles.input}>
          <label className={styles["input-label"]}>Filter</label>
          <div className={styles.values}>
            <Selector
              options={[
                {
                  id: ImageFilter.normal,
                  name: ImageFilter.normal,
                },
                {
                  id: ImageFilter.grayscale,
                  name: ImageFilter.grayscale,
                },
                {
                  id: ImageFilter.hueRotate,
                  name: ImageFilter.hueRotate,
                },
                {
                  id: ImageFilter.invert,
                  name: ImageFilter.invert,
                },
                {
                  id: ImageFilter.sepia,
                  name: ImageFilter.sepia,
                },
                {
                  id: ImageFilter.saturate,
                  name: ImageFilter.saturate,
                },
              ]}
              selected={[imageFilter]}
              onChange={(value) => dispatch(setImageFilter(value))}
            ></Selector>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Circle</label>
          <div className={styles.values}>
            <Button
              selected={isCircle}
              onClick={() => dispatch(setIsCircle(!isCircle))}
            >
              {isCircle ? (
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
        <div className={styles.input}>
          <label className={styles["input-label"]}>Color</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setBorderColor(value.target.value));
              }}
              className={styles.value}
              value={borderColor}
              type="color"
            ></input>
          </div>
        </div>
      </div>
      <div className={styles["input-group"]}>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Gap</label>
          <div className={styles.values}>
            <input
              onChange={(value) => {
                dispatch(setGap(parseInt(value.target.value)));
              }}
              min={0}
              max={50}
              value={gap}
              className={styles.value}
              type="range"
            ></input>
            <span className={styles["range-value"]}>{gap}</span>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles["input-label"]}>Shadows</label>
          <div className={styles.values}>
            <Button
              selected={showShadows}
              onClick={() => dispatch(setShowShadows(!showShadows))}
            >
              {showShadows ? (
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
    </div>
  );
};

export default OptionsTab;
