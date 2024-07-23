import {
  BackgroundType,
  Direction,
  Font,
  ImageFilter,
  Item,
  Position,
} from "@/redux/state";
import { setBattleItems, updateElo } from "@/redux/store";
import styles from "@/styles/Home.module.css";
import { UnknownAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "./Button";

const Battlespace = ({
  battleItems,
  title,
  backgroundType,
  imageFilter,
  backgroundColor1,
  backgroundColor2,
  backgroundOpacity,
  gradientDirection,
  gap,
  borderColor,
  isCircle,
  borderSize,
  borderRadius,
  showShadows,
  showTitles,
  showEloRating,
  font,
  textColor,
  items,
  dispatch,
  hasData,
  hasItems,
  getNumberItems,
  numberBattleItems,
  lockWinner,
}: {
  battleItems: number[];
  title: string;
  showTitles: boolean;
  showEloRating: boolean;
  rows: number;
  columns: number;
  featured: number;
  backgroundType: BackgroundType;
  imageFilter: ImageFilter;
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
  dispatch: Dispatch<UnknownAction>;
  hasData: (item: Item) => boolean;
  hasItems: (items: Item[]) => boolean;
  getNumberItems: () => number;
  numberBattleItems: number;
  lockWinner: boolean;
}) => {
  const chooseRandomItemForBattle = () => {
    let itemIndex;
    while (itemIndex === undefined || !hasData(items[itemIndex])) {
      itemIndex = Math.floor(Math.random() * items.length);
    }
    return itemIndex;
  };

  const cycleBattleItems = (winner?: number) => {
    const newBattleItems = [];
    // Generate min(numberBattleItems, getNumberItems) random items
    const numItems = Math.min(numberBattleItems, getNumberItems());
    if (numItems === 0) {
      dispatch(setBattleItems([]));
      return;
    }
    for (let i = 0; i < numItems; i++) {
      newBattleItems[i] = chooseRandomItemForBattle();
      // Make sure the same item is not selected twice
      while (newBattleItems.slice(0, i).includes(newBattleItems[i])) {
        newBattleItems[i] = chooseRandomItemForBattle();
      }
    }
    // Get index of the winner and put it back in the battle items where it was
    if (lockWinner && winner !== undefined) {
      const winnerIndex = battleItems.indexOf(winner);
      if (newBattleItems.includes(winner)) {
        // Swap to keep the winner in the same position
        const otherItem = newBattleItems[winnerIndex];
        newBattleItems[winnerIndex] = winner;
        newBattleItems[newBattleItems.indexOf(winner)] = otherItem;
      } else if (winnerIndex !== -1) {
        newBattleItems[winnerIndex] = winner;
      }
    }
    dispatch(setBattleItems(newBattleItems));
  };

  // The index i wins the battle, update elo
  const battleWinner = (winner: number) => {
    // Only count the first numberBattleItems items
    const inTheBattle = [...battleItems].slice(0, numberBattleItems);
    // Losers are all battle items except the winner
    const losers = inTheBattle.filter((i) => i !== winner);
    dispatch(updateElo({ winner: winner, losers: losers }));
    cycleBattleItems((winner = winner));
  };

  const cols = Math.min(numberBattleItems * 2, 6);

  const getSize = () => "200px";
  const getFilter = () => {
    switch (imageFilter) {
      case ImageFilter.grayscale:
        return "grayscale(1)";
      case ImageFilter.sepia:
        return "sepia(1)";
      case ImageFilter.saturate:
        return "saturate(8)";
      case ImageFilter.hueRotate:
        return "hue-rotate(180deg)";
      case ImageFilter.invert:
        return "invert(1)";
      default:
        return "none";
    }
  };
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
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gap: gap,
                    padding: gap,
                  }}
                  className={styles["workspace-covers"]}
                >
                  {battleItems.length === 0 || !hasItems(items) ? (
                    <div
                      style={{
                        gridColumn: "span 10",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                        maxWidth: "50vw",
                      }}
                    >
                      <p style={{ textAlign: "left" }}>
                        In Battle Mode, choose your favorite to win the battle.
                        The winner will gain ELO points and the losers will lose
                        ELO points. The items will be randomly selected from
                        your collection. Over time, the ELO rating will reflect
                        the ranking of your collection.
                      </p>
                      {!hasItems(items) ? (
                        <h2>
                          Add items to your collection to start the battle mode.
                        </h2>
                      ) : (
                        <Button
                          style={{ fontSize: "1.5rem", padding: "1rem 2rem" }}
                          onClick={() => {
                            cycleBattleItems();
                          }}
                        >
                          Start Battle
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        gridColumn: `span ${cols}`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: font,
                        color: textColor,
                        textShadow: `${showShadows ? "black 1px 1px 1px" : ""}`,
                      }}
                    >
                      <h2 style={{ width: "100%", textAlign: "center" }}>
                        Choose Your Favorite
                      </h2>
                    </div>
                  )}
                  {battleItems
                    .filter((_item, i) => i < numberBattleItems)
                    .map(
                      (itemIndex, i) =>
                        hasData(items[itemIndex]) && (
                          <div
                            key={i}
                            className={`${styles["workspace-cover"]}`}
                            style={{
                              minHeight: getSize(),
                              height: "unset",
                              width: getSize(),
                              gridColumn: "span 2",
                              borderRadius: borderRadius,
                            }}
                            onClick={() => {
                              battleWinner(itemIndex);
                            }}
                          >
                            <img
                              className={styles.cover}
                              style={{
                                borderRadius: isCircle ? "100%" : borderRadius,
                                height: getSize(),
                                width: getSize(),
                                maxHeight: getSize(),
                                maxWidth: getSize(),
                                border: `${borderSize}px solid ${borderColor}`,
                                filter: getFilter(),
                                boxShadow: `${
                                  showShadows
                                    ? "black 3px 3px 10px 0px"
                                    : "unset"
                                }`,
                              }}
                              src={"https:" + items[itemIndex].cover}
                              alt="Cover"
                              width={isCircle ? 100 : "unset"}
                            ></img>
                            <div
                              className={styles["cover-titles"]}
                              style={{
                                fontFamily: font,
                                fontSize: "1rem",
                                color: textColor,
                                textShadow: `${
                                  showShadows ? "black 1px 1px 1px" : ""
                                }`,
                              }}
                            >
                              {showTitles && (
                                <div
                                  style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    lineHeight: "1.5rem",
                                    height: "3rem",
                                    width: getSize(),
                                  }}
                                >
                                  {items[itemIndex].title}
                                </div>
                              )}
                              {showEloRating && (
                                <div>{items[itemIndex].elo}</div>
                              )}
                            </div>
                          </div>
                        )
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Battlespace;
