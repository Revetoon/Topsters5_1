import Selector from "@/components/Selector";
import { Category, Item, Period } from "@/redux/state";
import { addItem } from "@/redux/store";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Button from "../Button";
import { Dispatch, SetStateAction } from "react";
import { UnknownAction } from "@reduxjs/toolkit";

const AddTab = ({
  category,
  setCategory,
  setSearch,
  searchItems,
  isSearching,
  setItemForm,
  itemForm,
  generateItem,
  setLastfmUser,
  importItems,
  setPeriod,
  period,
  searchedItems,
  resetDrag,
  setDraggingItem,
  dispatch,
  hasData,
}: {
  category: Category;
  setCategory: Dispatch<SetStateAction<Category>>;
  setSearch: Dispatch<SetStateAction<string>>;
  searchItems: () => void;
  isSearching: boolean;
  setItemForm: Dispatch<
    SetStateAction<{
      title: string;
      url: string;
    }>
  >;
  itemForm: {
    title: string;
    url: string;
  };
  generateItem: () => void;
  setLastfmUser: Dispatch<SetStateAction<string>>;
  importItems: () => void;
  setPeriod: Dispatch<SetStateAction<Period>>;
  period: Period;
  searchedItems: { title: string; cover: string; elo: 1000 }[];
  resetDrag: () => void;
  setDraggingItem: Dispatch<
    SetStateAction<{
      item: Item;
      index: number;
      origin: "add" | "collection" | "";
    }>
  >;
  dispatch: Dispatch<UnknownAction>;
  hasData: (item: Item) => boolean;
}) => {
  return (
    <div className={`animate-opacity ${styles.search}`}>
      <div className={styles["input-group"]}>
        <div className={`${styles.input} ${styles.categories}`}>
          <Selector
            label="categories"
            options={[
              {
                id: Category.music,
                name: Category.music,
                icon: "/icons/music.svg",
                hideLabel: true,
              },
              {
                id: Category.lastfm,
                name: Category.lastfm,
                icon: "/icons/lastfm.svg",
                hideLabel: true,
              },
              {
                id: Category.games,
                name: Category.games,
                icon: "/icons/controller.svg",
                hideLabel: true,
              },
              {
                id: Category.movies,
                name: Category.movies,
                icon: "/icons/movie.svg",
                hideLabel: true,
              },
              {
                id: Category.tvshows,
                name: Category.tvshows,
                icon: "/icons/tv.svg",
                hideLabel: true,
              },
              {
                id: Category.books,
                name: Category.books,
                icon: "/icons/book.svg",
                hideLabel: true,
              },
              // {
              //   id: Category.pictures,
              //   name: Category.pictures,
              //   icon: "/icons/picture.svg",
              //   hideLabel: true,
              // },
            ]}
            selected={[category]}
            onChange={(value) => setCategory(value)}
          ></Selector>
        </div>
      </div>
      <div className={styles["input-group"]}>
        {category !== Category.pictures && category !== Category.lastfm && (
          <div className={`${styles.input} ${styles["search-input"]}`}>
            <input
              onChange={(e) => setSearch(e.target.value)}
              className={styles.value}
              type="text"
              placeholder={`Search ${category}...`}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  searchItems();
                }
              }}
            ></input>
            <Button onClick={() => searchItems()}>
              <Image
                width={10}
                height={10}
                className={`${styles.icon} ${isSearching && styles.loading}`}
                src="/icons/search.svg"
                alt="Search"
              ></Image>
            </Button>
          </div>
        )}
        {category === Category.pictures && (
          <>
            <div className={`${styles.input} ${styles["search-button"]}`}>
              <h3>Generate new item</h3>
            </div>
            <div className={styles.input}>
              <label className={styles["input-label"]}>Link</label>
              <div className={styles.values}>
                <input
                  onChange={(e) =>
                    setItemForm({
                      ...itemForm,
                      url: e.target.value,
                    })
                  }
                  className={styles.value}
                  type="text"
                  placeholder={"Image link"}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      generateItem();
                    }
                  }}
                ></input>
              </div>
            </div>
            <div className={styles.input}>
              <label className={styles["input-label"]}>Title</label>
              <div className={styles.values}>
                <input
                  onChange={(e) =>
                    setItemForm({
                      ...itemForm,
                      title: e.target.value,
                    })
                  }
                  className={styles.value}
                  type="text"
                  placeholder={`Title`}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      generateItem();
                    }
                  }}
                ></input>
              </div>
            </div>
            <div className={`${styles.input} ${styles["search-button"]}`}>
              <Button onClick={() => generateItem()}>Generate</Button>
            </div>
          </>
        )}
        {category === Category.lastfm && (
          <>
            <div className={`${styles.input} ${styles["search-button"]}`}>
              <h3>Import from Last.fm</h3>
            </div>
            <div className={`${styles.input} `}>
              <label className={styles["input-label"]}>Username</label>
              <div className={styles.values}>
                <input
                  onChange={(e) => setLastfmUser(e.target.value)}
                  className={styles.value}
                  type="text"
                  placeholder={`Username`}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      importItems();
                    }
                  }}
                ></input>
              </div>
            </div>
            <div style={{ height: "88px" }} className={styles.input}>
              <label className={styles["input-label"]}>Period</label>
              <div className={styles.values}>
                <Selector
                  options={[
                    { id: Period.overall, name: "Overall" },
                    { id: Period.week, name: "Week" },
                    { id: Period.month, name: "Month" },
                    { id: Period.threeMonths, name: "3 months" },
                    { id: Period.sixMonths, name: "6 months" },
                    { id: Period.year, name: "Year" },
                  ]}
                  selected={[period]}
                  onChange={(value) => setPeriod(value)}
                ></Selector>
              </div>
            </div>
            <div className={`${styles.input} ${styles["search-button"]}`}>
              <Button onClick={() => importItems()}>Import</Button>
            </div>
          </>
        )}
      </div>

      <div
        style={
          category === Category.lastfm
            ? { display: "none" }
            : category === Category.pictures
            ? { height: "unset" }
            : {}
        }
        className={`${styles["input-group"]} ${styles.items}`}
      >
        {!searchedItems.length && (
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
        {!!searchedItems.length && (
          <div className={styles.covers}>
            {searchedItems
              .filter((item) => hasData(item))
              .map((item, i) => {
                return (
                  <div key={i + item.title} className={styles.cover}>
                    <Image
                      draggable={true}
                      onDragStart={() => {
                        setDraggingItem({
                          item: { ...item },
                          index: -1,
                          origin: "add",
                        });
                      }}
                      onDragEnd={() => resetDrag()}
                      onClick={(e) => {
                        dispatch(
                          addItem({
                            item,
                            destinationIndex: -1,
                          })
                        );
                        const ref = e.currentTarget.parentElement;
                        ref?.classList.add("added");
                        setTimeout(() => {
                          ref?.classList.remove("added");
                        }, 500);
                      }}
                      src={
                        "https:" +
                        item.cover.replace("t_cover_big", "t_cover_small_2x")
                      }
                      alt="Cover"
                      width={80}
                      height={0}
                      priority
                    />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTab;
