import { downloadImage } from "@/components/utils";
import { BackgroundType, Direction, Font, Item, Position } from "@/redux/state";
import { removeItem } from "@/redux/store";
import styles from "@/styles/Home.module.css";
import { UnknownAction } from "@reduxjs/toolkit";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const Workspace = ({
  setIsDownloading,
  isDownloading,
  title,
  showTitles,
  rows,
  columns,
  backgroundType,
  backgroundColor1,
  backgroundColor2,
  backgroundOpacity,
  gradientDirection,
  gap,
  borderColor,
  isCircle,
  borderSize,
  borderRadius,
  showNumbers,
  showShadows,
  font,
  textColor,
  titlesPosition,
  items,
  draggingItem,
  hoverItem,
  setDraggingItem,
  setHoverItem,
  onDrop,
  resetDrag,
  dispatch,
  hasData,
}: {
  setIsDownloading: Dispatch<SetStateAction<boolean>>;
  isDownloading: boolean;
  title: string;
  showTitles: boolean;
  rows: number;
  columns: number;
  backgroundType: BackgroundType;
  backgroundColor1: string;
  backgroundColor2: string;
  backgroundOpacity: number;
  gradientDirection: Direction;
  gap: number;
  borderColor: string;
  isCircle: boolean;
  borderSize: number;
  borderRadius: number;
  showNumbers: boolean;
  showShadows: boolean;
  font: Font | string;
  textColor: string;
  titlesPosition: Position;
  items: Item[];
  draggingItem: {
    item: Item;
    index: number;
    origin: string;
  };
  hoverItem: number;
  setDraggingItem: (value: {
    item: Item;
    index: number;
    origin: "add" | "collection" | "";
  }) => void;
  setHoverItem: Dispatch<SetStateAction<number>>;
  onDrop: (i: number) => void;
  resetDrag: () => void;
  dispatch: Dispatch<UnknownAction>;
  hasData: (item: Item) => boolean;
}) => {
  return (
    <div className={styles.workspace}>
      <div
        className={`${styles["workspace-container"]} ${styles["section-container"]}`}
      >
        <div
          style={{ justifyContent: "space-between" }}
          className={styles["section-title"]}
        >
          <div className={styles.collection}>
            <div
              style={{ cursor: "unset" }}
              className={`${styles.tab} ${styles["selected-tab"]}`}
            >
              <h2>{!!title ? title : "Untitled"}</h2>
            </div>
          </div>
          <div>
            <div
              onClick={() => {
                setIsDownloading(true);
                downloadImage(title).then(() => setIsDownloading(false));
              }}
              className={styles.tab}
            >
              <h2>
                Download
                <Image
                  width={10}
                  height={10}
                  className={`${styles.icon} ${
                    isDownloading && styles.loading
                  }`}
                  src="/icons/download.svg"
                  alt="Download"
                ></Image>
              </h2>
            </div>
          </div>
        </div>
        <div className={`${styles["workspace-content"]} ${styles.section} `}>
          <div className={styles.checkerboard}>
            <div
              id="imageContainer"
              className={styles.content}
              style={{
                padding: gap + "px",
                backgroundColor:
                  backgroundType === BackgroundType.color
                    ? backgroundColor1 +
                      Math.max(backgroundOpacity * 16 - 1, 0)
                        .toString(16)
                        .padStart(2, "0")
                    : "unset",
                backgroundImage:
                  backgroundType === BackgroundType.gradient
                    ? `linear-gradient(to ${gradientDirection}, ${
                        backgroundColor1 +
                        Math.max(backgroundOpacity * 16 - 1, 0)
                          .toString(16)
                          .padStart(2, "0")
                      }, ${
                        backgroundColor2 +
                        Math.max(backgroundOpacity * 16 - 1, 0)
                          .toString(16)
                          .padStart(2, "0")
                      })`
                    : backgroundType === BackgroundType.radialGradient
                    ? `radial-gradient(at ${gradientDirection}, ${
                        backgroundColor1 +
                        Math.max(backgroundOpacity * 16 - 1, 0)
                          .toString(16)
                          .padStart(2, "0")
                      }, ${
                        backgroundColor2 +
                        Math.max(backgroundOpacity * 16 - 1, 0)
                          .toString(16)
                          .padStart(2, "0")
                      })`
                    : "unset",
              }}
            >
              {title && (
                <div
                  className={styles.title}
                  style={{
                    textShadow: `${showShadows ? "black 1px 1px 1px" : ""}`,
                    fontFamily: font,
                    color: textColor,
                    gap: gap,
                  }}
                >
                  {title}
                </div>
              )}
              <div className={styles["workspace-covers-container"]}>
                <div
                  style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: gap,
                    padding: gap,
                  }}
                  className={styles["workspace-covers"]}
                >
                  {items
                    .filter((_item, i) => i < rows * columns)
                    .map((item, i) => (
                      <div
                        key={i}
                        className={`${styles["workspace-cover"]} ${
                          [draggingItem.index, hoverItem].includes(i) &&
                          styles.dragging
                        }`}
                        style={{
                          minHeight: "100px",
                          height: `${
                            titlesPosition === Position.side ? "100px" : "unset"
                          }`,
                          borderRadius: borderRadius,
                        }}
                        onDrop={() => onDrop(i)}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setHoverItem(i);
                        }}
                        draggable={hasData(item)}
                        onDragStart={() => {
                          setDraggingItem({
                            item: { ...item },
                            index: i,
                            origin: "collection",
                          });
                        }}
                        onClick={(e: any) => {
                          if (e?.target?.id !== "remove") {
                            if (draggingItem.index === -1) {
                              if (hasData(item)) {
                                setDraggingItem({
                                  item: { ...item },
                                  index: i,
                                  origin: "collection",
                                });
                              }
                            } else {
                              onDrop(i);
                            }
                          }
                        }}
                        onDragEnd={() => resetDrag()}
                      >
                        {!hasData(item) && (
                          <div
                            style={{
                              backgroundColor: `#ccc`,
                              height: "100px",
                              borderRadius: isCircle ? "100%" : borderRadius,
                              boxShadow: `${
                                showShadows ? "black 3px 3px 10px 0px" : "unset"
                              }`,
                              border: `${borderSize}px solid ${borderColor} `,
                            }}
                            className={`${styles.cover} ${styles["no-items"]}`}
                          >
                            <span style={{ color: "black" }}>{i + 1}</span>
                          </div>
                        )}
                        {hasData(item) && draggingItem.index === -1 && (
                          <>
                            <div
                              id="remove"
                              onClick={() => {
                                dispatch(removeItem(i));
                                resetDrag();
                              }}
                              className={styles.delete}
                            >
                              <img
                                id="remove"
                                className={styles.icon}
                                src="/icons/remove.svg"
                              ></img>
                            </div>
                            <div
                              onClick={(e: any) => {
                                if (e?.target?.id !== "remove") {
                                  if (draggingItem.index === -1) {
                                    if (hasData(item)) {
                                      setDraggingItem({
                                        item: { ...item },
                                        index: i,
                                        origin: "collection",
                                      });
                                    }
                                  } else {
                                    onDrop(i);
                                  }
                                }
                              }}
                              className={styles.move}
                            >
                              <img
                                className={styles.icon}
                                src="/icons/drag.svg"
                              ></img>
                            </div>
                          </>
                        )}
                        {hasData(item) && (
                          <>
                            <img
                              className={styles.cover}
                              style={{
                                borderRadius: isCircle ? "100%" : borderRadius,
                                height: `${isCircle ? "100px" : "unset"}`,
                                maxHeight: "100px",
                                maxWidth: "100px",
                                border: `${borderSize}px solid ${borderColor}`,
                                boxShadow: `${
                                  showShadows
                                    ? "black 3px 3px 10px 0px"
                                    : "unset"
                                }`,
                              }}
                              src={"https:" + item.cover}
                              alt="Cover"
                              width={isCircle ? 100 : "unset"}
                            ></img>
                            {showTitles &&
                              titlesPosition === Position.cover && (
                                <div
                                  className={styles["cover-titles"]}
                                  style={{
                                    fontFamily: font,
                                    color: textColor,
                                    textShadow: `${
                                      showShadows ? "black 1px 1px 1px" : ""
                                    }`,
                                  }}
                                >
                                  <div>
                                    {`${showNumbers ? `${i + 1}. ` : ""}` +
                                      item.title}
                                  </div>
                                </div>
                              )}
                          </>
                        )}
                      </div>
                    ))}
                </div>
                {showTitles && titlesPosition === Position.side && (
                  <div
                    className={styles["side-titles"]}
                    style={{
                      fontFamily: font,
                      color: textColor,
                      textShadow: `${showShadows ? "black 1px 1px 1px" : ""}`,
                      padding: gap,
                    }}
                  >
                    {!items.some((item) => hasData(item)) && (
                      <div className={styles["no-items"]}>
                        <Image
                          width={100}
                          height={100}
                          className={`${styles.icon} ${styles["big-icon"]}`}
                          src={"/icons/picture.svg"}
                          alt={"No items"}
                        ></Image>

                        <span>Nothing here... yet!</span>
                      </div>
                    )}
                    {items
                      .filter((_item, i) => i < rows * columns)
                      .map((item, i) => {
                        const number = showNumbers ? `${i + 1}. ` : "";
                        const br = (i + 1) % columns === 0 ? <br></br> : "";
                        const res = hasData(item) ? (
                          <div key={i}>
                            <div>{number + item.title}</div>
                            {br}
                          </div>
                        ) : (
                          <div key={i}>{br}</div>
                        );
                        return res;
                      })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
