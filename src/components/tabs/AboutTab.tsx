import styles from "@/styles/Home.module.css";
import Image from "next/image";

const AboutTab = () => {
  return (
    <div className={`animate-opacity ${styles["input-group"]}`}>
      <div className={styles.about}>
        <p>
          Forked from{" "}
          <a target="_blank" href="https://github.com/roselcost/topsters">
            Topsters 4
          </a>{" "}
          which was created by roselcost.
        </p>
        <p>This project is just for fun.</p>
        <p>
          Some features I have added/finished:
          <ul>
            <li>- Import from last.fm</li>
            <li>- More customization options</li>
          </ul>
        </p>
        <h2>Data sources</h2>
        <br></br>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
          }}
        >
          <a
            className={styles["link-button"]}
            target="_blank"
            href="https://igdb.com"
          >
            <div className={styles["link-icon"]}>
              <Image
                width={10}
                height={10}
                className={styles.icon}
                src={"/icons/controller.svg"}
                alt={"controller"}
              ></Image>
            </div>
            <span>IGDB</span>
          </a>
          <a
            className={styles["link-button"]}
            target="_blank"
            href="https://last.fm"
          >
            <div className={styles["link-icon"]}>
              <Image
                width={10}
                height={10}
                className={styles.icon}
                src={"/icons/music.svg"}
                alt={"music"}
              ></Image>
            </div>
            <span>Last.fm</span>
          </a>
          <a
            className={styles["link-button"]}
            target="_blank"
            href="https://www.themoviedb.org"
          >
            <div className={styles["link-icon"]}>
              <Image
                width={10}
                height={10}
                className={styles.icon}
                src={"/icons/tv.svg"}
                alt={"tv"}
              ></Image>
            </div>
            <span>The Movie Database</span>
          </a>
          <a
            className={styles["link-button"]}
            target="_blank"
            href="https://openlibrary.org"
          >
            <div className={styles["link-icon"]}>
              <Image
                width={10}
                height={10}
                className={styles.icon}
                src={"/icons/book.svg"}
                alt={"book"}
              ></Image>
            </div>
            <span>Open Library</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
