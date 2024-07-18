import { Category, Item, Period, State } from "@/redux/state";
import { addItem, addMultipleItems, swapItem } from "@/redux/store";
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

export default function Home() {
  const hasData = (item: Item) => {
    return !!item?.title && !!item?.cover;
  };

  const resetDrag = () => {
    setHoverItem(-1);
    setDraggingItem({
      item: {
        title: "",
        cover: "",
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
          dispatch(addMultipleItems({ items: response.data }));
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
          setSearchedItems(response.data);
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
    item: { title: "", cover: "" },
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
  const rows = useSelector((state: State) => state.rows);
  const columns = useSelector((state: State) => state.columns);
  const backgroundType = useSelector((state: State) => state.backgroundType);
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
  const [searchedItems, setSearchedItems] = useState<
    { title: string; cover: string }[]
  >([]);
  return (
    <>
      <Head>
        <title>Zopsters</title>
        <meta name="description" content="Zopsters" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
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
                    Add items
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
                    showTitles={showTitles}
                    rows={rows}
                    columns={columns}
                    backgroundType={backgroundType}
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
                {tab === "about" && <AboutTab />}
              </div>
            </div>
          </div>
          <Workspace
            items={items}
            draggingItem={draggingItem}
            hoverItem={hoverItem}
            onDrop={onDrop}
            setHoverItem={setHoverItem}
            setDraggingItem={setDraggingItem}
            title={title}
            setIsDownloading={setIsDownloading}
            isDownloading={isDownloading}
            showTitles={showTitles}
            rows={rows}
            columns={columns}
            backgroundType={backgroundType}
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
        </div>
      </main>
    </>
  );
}
