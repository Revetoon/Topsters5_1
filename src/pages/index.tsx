import { Category, Item, Period, State } from "@/redux/state";
import {
  addItem,
  addMultipleItems,
  setBattleItems,
  swapItem,
} from "@/redux/store";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Workspace from "@/components/Workspace";
import AddTab from "@/components/tabs/AddTab";
import OptionsTab from "@/components/tabs/OptionsTab";
import AboutTab from "@/components/tabs/AboutTab";
import Battlespace from "@/components/Battlespace";
import BattleTab from "@/components/tabs/BattleTab";

export default function Home() {
  const hasData = (item: Item) => {
    return !!item?.title && !!item?.cover;
  };

  const hasItems = (items: Item[]) => {
    // Check if there are any valid items in the array
    for (let i = 0; i < items.length; i++) {
      if (hasData(items[i])) return true;
    }
    return false;
  };

  const getNumberItems = () => {
    // Get the number of valid items in the array
    let count = 0;
    for (let i = 0; i < items.length; i++) {
      if (hasData(items[i])) count++;
    }
    return count;
  };

  const resetDrag = () => {
    setHoverItem(-1);
    setDraggingItem({
      item: {
        title: "",
        cover: "",
        elo: 0,
      },
      index: -1,
      origin: "",
    });
  };

  const onDrop = (destinationIndex: number) => {
    const dragitem = draggingItem.item;
    if (hasData(dragitem)) {
      if (draggingItem.origin === "add")
        dispatch(
          addItem({ item: dragitem, destinationIndex: destinationIndex })
        );
      else {
        dispatch(
          swapItem({
            item: {
              ...dragitem,
            },
            sourceIndex: draggingItem.index,
            destinationIndex,
          })
        );
      }
      resetDrag();
    }
  };

  const generateItem = () => {
    if (!!itemForm.title && !!itemForm.url) {
      setSearchedItems([
        {
          title: itemForm.title,
          cover: itemForm.url.replace(/(^\w+:|^)\/\//, ""),
          elo: 1000,
        },
      ]);
    }
  };

  const importItems = () => {
    if (!!lastfmUser) {
      setIsSearching(true);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/endpoints?category=${category}&name=${lastfmUser}&period=${period}`
        )
        .then((response) => {
          const items = response.data.map((item: Item) => ({
            ...item,
            elo: 1000,
          }));
          dispatch(addMultipleItems({ items: items }));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsSearching(false);
        });
    }
  };

  const searchItems = () => {
    if (!!search) {
      setIsSearching(true);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/endpoints?category=${category}&name=${search}`
        )
        .then((response) => {
          setSearchedItems(
            response.data.map((item: Item) => ({ ...item, elo: 1000 }))
          );
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsSearching(false);
        });
    }
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    darkTheme
      ? document.getElementsByTagName("html")[0].removeAttribute("dark")
      : document.getElementsByTagName("html")[0].setAttribute("dark", "true");
  };

  const prefersDarkTheme = () => {
    const a =
      window &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return a;
  };

  useEffect(() => {
    if (!prefersDarkTheme()) toggleTheme();
    else document.getElementsByTagName("html")[0].setAttribute("dark", "true");
  }, []);

  const [draggingItem, setDraggingItem] = useState<{
    item: Item;
    index: number;
    origin: "add" | "collection" | "";
  }>({
    item: { title: "", cover: "", elo: 0 },
    index: -1,
    origin: "",
  });
  const [hoverItem, setHoverItem] = useState(-1);

  const [darkTheme, setDarkTheme] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [itemForm, setItemForm] = useState({ title: "", url: "" });
  const [category, setCategory] = useState(Category.music);
  const [period, setPeriod] = useState(Period.overall);
  const [search, setSearch] = useState("");
  const [lastfmUser, setLastfmUser] = useState("");
  const [tab, setTab] = useState("add");
  const dispatch = useDispatch();
  const title = useSelector((state: State) => state.title);
  const showTitles = useSelector((state: State) => state.showTitles);
  const showEloRating = useSelector((state: State) => state.showEloRating);
  const rows = useSelector((state: State) => state.rows);
  const columns = useSelector((state: State) => state.columns);
  const featured = useSelector((state: State) => state.featured);
  const backgroundType = useSelector((state: State) => state.backgroundType);
  const imageFilter = useSelector((state: State) => state.imageFilter);
  const backgroundColor1 = useSelector(
    (state: State) => state.backgroundColor1
  );
  const backgroundColor2 = useSelector(
    (state: State) => state.backgroundColor2
  );
  const backgroundOpacity = useSelector(
    (state: State) => state.backgroundOpacity
  );
  const gradientDirection = useSelector(
    (state: State) => state.gradientDirection
  );
  const gap = useSelector((state: State) => state.gap);
  const borderColor = useSelector((state: State) => state.borderColor);
  const isCircle = useSelector((state: State) => state.isCircle);
  const borderSize = useSelector((state: State) => state.borderSize);
  const borderRadius = useSelector((state: State) => state.borderRadius);
  const showNumbers = useSelector((state: State) => state.showNumbers);
  const showShadows = useSelector((state: State) => state.showShadows);
  const font = useSelector((state: State) => state.font);
  const fontSize = useSelector((state: State) => state.fontSize);
  const textColor = useSelector((state: State) => state.textColor);
  const titlesPosition = useSelector((state: State) => state.titlesPosition);
  const items = useSelector((state: State) => state.items);
  const sortedItems = useSelector((state: State) => state.sortedItems);
  const battleItems = useSelector((state: State) => state.battleItems);
  const numberBattleItems = useSelector(
    (state: State) => state.numberBattleItems
  );
  const sort = useSelector((state: State) => state.sort);
  const lockWinner = useSelector((state: State) => state.lockWinner);
  const [searchedItems, setSearchedItems] = useState<
    { title: string; cover: string; elo: 1000 }[]
  >([]);
  return (
    <>
      <Head>
        <title>Zopsters</title>
        <meta name="description" content="Zopsters" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/zopsters.png" />
      </Head>
      <main className={`${styles.main}`}>
        <div className={styles.container}>
          <div className={styles["left-panel"]}>
            <div
              className={`${styles["section-container"]} ${styles["app-header"]}`}
            >
              <div className={`${styles.section} ${styles.header}`}>
                <h1>Zopsters</h1>
              </div>
            </div>
            <div className={`${styles["section-container"]} ${styles.toolbar}`}>
              <div className={styles["section-title"]}>
                <div
                  onClick={() => setTab("add")}
                  className={`${styles.tab} ${
                    tab === "add" && styles["selected-tab"]
                  }`}
                >
                  <h2>
                    <Image
                      width={10}
                      height={10}
                      className={styles.icon}
                      src="/icons/add.svg"
                      alt={"Add"}
                    ></Image>
                    Add
                  </h2>
                </div>
                <div
                  onClick={() => setTab("options")}
                  className={`${styles.tab} ${
                    tab === "options" && styles["selected-tab"]
                  }`}
                >
                  <h2>
                    <Image
                      width={10}
                      height={10}
                      className={styles.icon}
                      src="/icons/settings.svg"
                      alt="Settings"
                    ></Image>
                    Options
                  </h2>
                </div>
                <div
                  onClick={() => {
                    setTab("battle");
                    dispatch(setBattleItems([]));
                  }}
                  className={`${styles.tab} ${
                    tab === "battle" && styles["selected-tab"]
                  }`}
                >
                  <h2>
                    <Image
                      width={10}
                      height={10}
                      className={styles.icon}
                      src="/icons/controller.svg"
                      alt="Battle"
                    ></Image>
                    Battle
                  </h2>
                </div>
                <div
                  onClick={() => setTab("about")}
                  className={`${styles.tab} ${
                    tab === "about" && styles["selected-tab"]
                  }`}
                >
                  <h2>
                    <Image
                      width={10}
                      height={10}
                      className={styles.icon}
                      src="/icons/about.svg"
                      alt="About"
                    ></Image>
                    About
                  </h2>
                </div>
              </div>
              <div className={`${styles.section} ${styles["add-items"]}`}>
                {tab === "add" && (
                  <AddTab
                    category={category}
                    setCategory={setCategory}
                    period={period}
                    setPeriod={setPeriod}
                    setSearch={setSearch}
                    setLastfmUser={setLastfmUser}
                    isSearching={isSearching}
                    searchedItems={searchedItems}
                    itemForm={itemForm}
                    setItemForm={setItemForm}
                    generateItem={generateItem}
                    importItems={importItems}
                    searchItems={searchItems}
                    resetDrag={resetDrag}
                    setDraggingItem={setDraggingItem}
                    dispatch={dispatch}
                    hasData={hasData}
                  />
                )}
                {tab === "options" && (
                  <OptionsTab
                    darkTheme={darkTheme}
                    sort={sort}
                    showTitles={showTitles}
                    showEloRating={showEloRating}
                    rows={rows}
                    columns={columns}
                    featured={featured}
                    backgroundType={backgroundType}
                    imageFilter={imageFilter}
                    backgroundColor1={backgroundColor1}
                    backgroundColor2={backgroundColor2}
                    backgroundOpacity={backgroundOpacity}
                    gradientDirection={gradientDirection}
                    gap={gap}
                    borderColor={borderColor}
                    isCircle={isCircle}
                    borderSize={borderSize}
                    borderRadius={borderRadius}
                    showNumbers={showNumbers}
                    showShadows={showShadows}
                    font={font}
                    fontSize={fontSize}
                    textColor={textColor}
                    titlesPosition={titlesPosition}
                    dispatch={dispatch}
                    toggleTheme={toggleTheme}
                    title={title}
                  />
                )}
                {tab === "battle" && (
                  <BattleTab
                    dispatch={dispatch}
                    showTitles={showTitles}
                    numberBattleItems={numberBattleItems}
                    lockWinner={lockWinner}
                    showEloRating={showEloRating}
                  />
                )}
                {tab === "about" && <AboutTab />}
              </div>
            </div>
          </div>
          {tab === "battle" ? (
            <Battlespace
              battleItems={battleItems}
              lockWinner={lockWinner}
              items={items}
              title={title}
              showTitles={showTitles}
              showEloRating={showEloRating}
              rows={rows}
              columns={columns}
              featured={featured}
              backgroundType={backgroundType}
              imageFilter={imageFilter}
              backgroundColor1={backgroundColor1}
              backgroundColor2={backgroundColor2}
              backgroundOpacity={backgroundOpacity}
              gradientDirection={gradientDirection}
              gap={gap}
              borderColor={borderColor}
              isCircle={isCircle}
              borderSize={borderSize}
              borderRadius={borderRadius}
              showNumbers={showNumbers}
              showShadows={showShadows}
              font={font}
              textColor={textColor}
              titlesPosition={titlesPosition}
              dispatch={dispatch}
              hasData={hasData}
              hasItems={hasItems}
              getNumberItems={getNumberItems}
              numberBattleItems={numberBattleItems}
            />
          ) : (
            <Workspace
              items={items}
              sortedItems={sortedItems}
              sort={sort}
              draggingItem={draggingItem}
              hoverItem={hoverItem}
              onDrop={onDrop}
              setHoverItem={setHoverItem}
              setDraggingItem={setDraggingItem}
              title={title}
              setIsDownloading={setIsDownloading}
              isDownloading={isDownloading}
              showTitles={showTitles}
              showEloRating={showEloRating}
              rows={rows}
              columns={columns}
              featured={featured}
              backgroundType={backgroundType}
              imageFilter={imageFilter}
              backgroundColor1={backgroundColor1}
              backgroundColor2={backgroundColor2}
              backgroundOpacity={backgroundOpacity}
              gradientDirection={gradientDirection}
              gap={gap}
              borderColor={borderColor}
              isCircle={isCircle}
              borderSize={borderSize}
              borderRadius={borderRadius}
              showNumbers={showNumbers}
              showShadows={showShadows}
              font={font}
              fontSize={fontSize}
              textColor={textColor}
              titlesPosition={titlesPosition}
              resetDrag={resetDrag}
              dispatch={dispatch}
              hasData={hasData}
            />
          )}
        </div>
      </main>
    </>
  );
}
