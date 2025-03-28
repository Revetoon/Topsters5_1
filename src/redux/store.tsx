import { createSlice, configureStore } from "@reduxjs/toolkit";
import {
  AppState,
  BackgroundType,
  Direction,
  Font,
  ImageFilter,
  Item,
  Position,
  Sort,
  State,
} from "./state";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const maxItems = 105;
const itemArray = [];
for (let i = 0; i < maxItems; ++i) {
  itemArray.push({ title: "", cover: "", elo: 0 });
}

const copy = (targetState: State, sourceState: State) => {
  targetState.title = sourceState.title;
  targetState.showTitles = sourceState.showTitles;
  targetState.rows = sourceState.rows;
  targetState.columns = sourceState.columns;
  targetState.featured = sourceState.featured;
  targetState.backgroundType = sourceState.backgroundType;
  targetState.sort = sourceState.sort;
  targetState.imageFilter = sourceState.imageFilter;
  targetState.backgroundColor1 = sourceState.backgroundColor1;
  targetState.backgroundColor2 = sourceState.backgroundColor2;
  targetState.backgroundOpacity = sourceState.backgroundOpacity;
  targetState.gradientDirection = sourceState.gradientDirection;
  targetState.gap = sourceState.gap;
  targetState.borderColor = sourceState.borderColor;
  targetState.isCircle = sourceState.isCircle;
  targetState.borderSize = sourceState.borderSize;
  targetState.borderRadius = sourceState.borderRadius;
  targetState.showNumbers = sourceState.showNumbers;
  targetState.showEloRating = sourceState.showEloRating;
  targetState.showShadows = sourceState.showShadows;
  targetState.font = sourceState.font;
  targetState.fontSize = sourceState.fontSize;
  targetState.textColor = sourceState.textColor;
  targetState.titlesPosition = sourceState.titlesPosition;
  targetState.numberBattleItems = sourceState.numberBattleItems;
  targetState.lockWinner = sourceState.lockWinner;
};

const copyItems = (targetState: State, sourceState: State) => {
  targetState.items = sourceState.items;
  targetState.sortedItems = sourceState.sortedItems;
  targetState.battleItems = sourceState.battleItems;
  targetState.sort = sourceState.sort;
};

const initialState: AppState = {
  title: "",
  showTitles: true,
  rows: 5,
  columns: 5,
  featured: 0,
  backgroundType: BackgroundType.color,
  sort: Sort.default,
  lockWinner: false,
  imageFilter: ImageFilter.normal,
  backgroundColor1: "#000000",
  backgroundColor2: "#000000",
  backgroundOpacity: 16,
  gradientDirection: Direction.right,
  gap: 20,
  borderColor: "#cccccc",
  isCircle: false,
  borderSize: 0,
  borderRadius: 0,
  showNumbers: false,
  showEloRating: false,
  showShadows: false,
  font: Font.monospace,
  fontSize: 10,
  textColor: "#ffffff",
  titlesPosition: Position.side,
  items: itemArray,
  sortedItems: itemArray,
  battleItems: [],
  numberBattleItems: 2,
  lists: [],
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setTitle: (state, value: { payload: string }) => {
      state.title = value.payload;
    },
    setShowTitles: (state, value: { payload: boolean }) => {
      state.showTitles = value.payload;
    },
    setRows: (state, value: { payload: number }) => {
      state.rows = value.payload;
    },
    setColumns: (state, value: { payload: number }) => {
      state.columns = value.payload;
      // Set featured to 0 if columns change
      state.featured = 0;
    },
    setSort: (state, value: { payload: Sort }) => {
      state.sort = value.payload;
      switch (value.payload) {
        case Sort.elo:
          state.sortedItems = state.items.slice().sort((a, b) => b.elo - a.elo);
          break;
        case Sort.default:
          state.sortedItems = state.items;
          break;
      }
    },
    // Make the current sort method the default order of items
    makeSortDefault: (state) => {
      state.sort = Sort.default;
      state.items = state.sortedItems;
    },
    setLockWinner: (state, value: { payload: boolean }) => {
      state.lockWinner = value.payload;
    },
    setBattleItems: (state, value: { payload: number[] }) => {
      state.battleItems = value.payload;
    },
    setNumberBattleItems: (state, value: { payload: number }) => {
      state.numberBattleItems = value.payload;
    },
    setFeatured: (state, value: { payload: number }) => {
      state.featured = value.payload;
    },
    setImageFilter: (state, value: { payload: ImageFilter }) => {
      state.imageFilter = value.payload;
    },
    setBackgroundType: (state, value: { payload: BackgroundType }) => {
      state.backgroundType = value.payload;
    },
    setBackgroundColor1: (state, value: { payload: string }) => {
      state.backgroundColor1 = value.payload;
    },
    setBackgroundColor2: (state, value: { payload: string }) => {
      state.backgroundColor2 = value.payload;
    },
    setBackgroundOpacity: (state, value: { payload: number }) => {
      state.backgroundOpacity = value.payload;
    },
    setGradientDirection: (state, value: { payload: Direction }) => {
      state.gradientDirection = value.payload;
    },
    setGap: (state, value: { payload: number }) => {
      state.gap = value.payload;
    },
    setBorderColor: (state, value: { payload: string }) => {
      state.borderColor = value.payload;
    },
    setIsCircle: (state, value: { payload: boolean }) => {
      state.isCircle = value.payload;
    },
    setBorderSize: (state, value: { payload: number }) => {
      state.borderSize = value.payload;
    },
    setBorderRadius: (state, value: { payload: number }) => {
      state.borderRadius = value.payload;
    },
    setShowNumbers: (state, value: { payload: boolean }) => {
      state.showNumbers = value.payload;
    },
    setShowEloRating: (state, value: { payload: boolean }) => {
      state.showEloRating = value.payload;
    },
    setShowShadows: (state, value: { payload: boolean }) => {
      state.showShadows = value.payload;
    },
    setFont: (state, value: { payload: Font | string }) => {
      state.font = value.payload;
    },
    setFontSize: (state, value: { payload: number }) => {
      state.fontSize = value.payload;
    },
    setTextColor: (state, value: { payload: string }) => {
      state.textColor = value.payload;
    },
    setTitlesPosition: (state, value: { payload: Position }) => {
      state.titlesPosition = value.payload;
    },
    addItem: (
      state,
      value: { payload: { item: Item; destinationIndex: number } }
    ) => {
      if (value.payload.destinationIndex === -1) {
        const firstIndex = state.items.findIndex((item) => !item.cover) ?? 0;
        state.items[firstIndex] = {
          ...value.payload.item,
          elo: 1000,
        };
      } else
        state.items[value.payload.destinationIndex] = {
          ...value.payload.item,
          elo: 1000,
        };
      state.sort = Sort.default;
    },
    addMultipleItems: (state, value: { payload: { items: Item[] } }) => {
      // Pad items with empty items
      for (let i = 0; i < maxItems; ++i) {
        if (!value.payload.items[i]) {
          value.payload.items[i] = { title: "", cover: "", elo: 0 };
        }
      }
      state.items = value.payload.items;
      state.sortedItems = value.payload.items;
      state.battleItems = [];
      state.sort = Sort.default;
    },
    swapItem: (
      state,
      value: {
        payload: {
          item: Item;
          sourceIndex: number;
          destinationIndex: number;
        };
      }
    ) => {
      switch (state.sort) {
        case Sort.default:
          const toMove = state.items[value.payload.sourceIndex];
          state.items[value.payload.sourceIndex] =
            state.items[value.payload.destinationIndex];
          state.items[value.payload.destinationIndex] = toMove;
          break;
        case Sort.elo:
          const toMoveElo = state.sortedItems[value.payload.sourceIndex];
          state.sortedItems[value.payload.sourceIndex] =
            state.sortedItems[value.payload.destinationIndex];
          state.sortedItems[value.payload.destinationIndex] = toMoveElo;
          state.sort = Sort.none;
          break;
      }
    },
    removeItem: (state, value: { payload: number }) => {
      state.items[value.payload] = { title: "", cover: "", elo: 0 };
      state.sort = Sort.default;
    },
    removeDuplicateItems: (state) => {
      const newItems = state.items.map((item, index, self) =>
        self.findIndex((t) => t.cover === item.cover) === index
          ? item
          : { ...item, cover: "", elo: 0 }
      );
      state.items = newItems;
      state.sortedItems = newItems;
      state.battleItems = [];
      state.sort = Sort.default;
    },
    updateElo: (
      state,
      value: { payload: { winner: number; losers: number[] } }
    ) => {
      const winnerItem = state.items[value.payload.winner];
      const loserItems = value.payload.losers.map(
        (index) => state.items[index]
      );
      const k = 32;
      const expectedScores = loserItems.map(
        (loser) => 1 / (1 + 10 ** ((loser.elo - winnerItem.elo) / 400))
      );
      const newElo =
        winnerItem.elo + k * (1 - expectedScores.reduce((a, b) => a * b));
      winnerItem.elo = Math.round(newElo);
      loserItems.forEach((loser) => {
        const newElo =
          loser.elo - k * (1 - expectedScores.reduce((a, b) => a * b));
        loser.elo = Math.round(newElo);
      });

      state.items[value.payload.winner] = winnerItem;
      value.payload.losers.forEach(
        (index, i) => (state.items[index] = loserItems[i])
      );
      // If sorting by elo, resort items
      if (state.sort === Sort.elo) {
        state.sortedItems = state.items.slice().sort((a, b) => b.elo - a.elo);
      }
    },
    setPreset: (state, value: { payload: string }) => {
      switch (value.payload) {
        case "Topsters":
          state.rows = 5;
          state.columns = 5;
          state.featured = 0;
          state.showTitles = true;
          state.backgroundType = BackgroundType.color;
          state.imageFilter = ImageFilter.normal;
          state.backgroundColor1 = "#000000";
          state.backgroundOpacity = 16;
          state.gap = 20;
          state.borderSize = 0;
          state.borderRadius = 0;
          state.isCircle = false;
          state.showNumbers = true;
          state.showShadows = false;
          state.font = Font.monospace;
          state.fontSize = 10;
          state.textColor = "#ffffff";
          state.titlesPosition = Position.side;
          break;
        case "Museum":
          state.rows = 3;
          state.columns = 8;
          state.featured = 0;
          state.showTitles = true;
          state.backgroundType = BackgroundType.gradient;
          state.imageFilter = ImageFilter.normal;
          state.gradientDirection = Direction.topRight;
          state.backgroundColor1 = "#000000";
          state.backgroundColor2 = "#2c313a";
          state.backgroundOpacity = 16;
          state.gap = 20;
          state.borderSize = 0;
          state.borderRadius = 8;
          state.isCircle = false;
          state.showNumbers = true;
          state.showShadows = true;
          state.font = Font.lato;
          state.fontSize = 10;
          state.textColor = "#ffffff";
          state.titlesPosition = Position.cover;
          break;
        case "Mega List":
          state.rows = 10;
          state.columns = 10;
          state.featured = 10;
          state.showTitles = true;
          state.backgroundType = BackgroundType.color;
          state.imageFilter = ImageFilter.normal;
          state.backgroundColor1 = "#000000";
          state.backgroundOpacity = 16;
          state.gap = 10;
          state.borderSize = 0;
          state.borderRadius = 0;
          state.isCircle = false;
          state.showNumbers = true;
          state.showShadows = false;
          state.font = Font.monospace;
          state.fontSize = 8;
          state.textColor = "#ffffff";
          state.titlesPosition = Position.side;
      }
    },
    importState: (state, value: { payload: any }) => {
      const fromFile = JSON.parse(value.payload.target.result);
      copy(state, fromFile);
      // Add elo to items if not present
      state.items = state.items.map((item) => {
        if (!item.elo) {
          item.elo = 1000;
        }
        return item;
      });
      state.items = fromFile.items;
      state.sortedItems = fromFile.items;
      state.battleItems = [];
      state.sort = Sort.default;
    },
    exportState: (state) => {
      var dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(state));
      var downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute(
        "download",
        !!state.title ? state.title : "untitled" + ".json"
      );
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
    createNewList: (state) => {
      let lists = state.lists;
      if (!lists) {
        lists = [];
      }
      let stateCopy = JSON.parse(JSON.stringify(state)); // Step 1: Deep copy
      delete stateCopy.lists; // Step 2: Omit 'lists' by deleting it from the copy

      copy(state, initialState);

      lists.push(stateCopy);
      state.lists = lists;
      const itemArray = [];
      for (let i = 0; i < maxItems; ++i) {
        itemArray.push({ title: "", cover: "", elo: 0 });
      }
      state.items = itemArray;
      state.sortedItems = itemArray;
      state.battleItems = [];
      state.sort = Sort.default;
    },
    selectList: (state, value: { payload: number }) => {
      // Check if valid list
      if (value.payload < 0 || value.payload >= state.lists.length) {
        return;
      }
      // Swap current state with selected list
      const current = JSON.parse(JSON.stringify(state));
      delete current.lists;
      const selected = JSON.parse(JSON.stringify(state.lists[value.payload]));
      copy(state, selected);
      copyItems(state, selected);
      state.lists[value.payload] = current;
    },
    deleteList: (state, value: { payload?: number }) => {
      // Delete the given list or if no payload, delete the current list
      if (value.payload !== undefined) {
        if (value.payload < 0 || value.payload >= state.lists.length) {
          return;
        }
        state.lists.splice(value.payload, 1);
      } else {
        // Set the state to the first list in lists
        if (state.lists.length > 0) {
          const selected = JSON.parse(JSON.stringify(state.lists[0]));
          copy(state, selected);
          copyItems(state, selected);
          // Remove the first list
          state.lists.shift();
        } else {
          // Reset to initial state if no lists
          const itemArray = [];
          for (let i = 0; i < maxItems; ++i) {
            itemArray.push({ title: "", cover: "", elo: 0 });
          }
          copy(state, initialState);
          state.items = itemArray;
          state.sortedItems = itemArray;
          state.battleItems = [];
          state.sort = Sort.default;
        }
      }
    },
    restart: (state) => {
      const itemArray = [];
      for (let i = 0; i < maxItems; ++i) {
        itemArray.push({ title: "", cover: "", elo: 0 });
      }
      copy(state, initialState);
      state.items = itemArray;
      state.sortedItems = itemArray;
      state.battleItems = [];
      state.sort = Sort.default;
    },
  },
});

export const {
  setTitle,
  setShowTitles,
  setRows,
  setColumns,
  setBattleItems,
  setNumberBattleItems,
  setLockWinner,
  setFeatured,
  setImageFilter,
  setBackgroundType,
  setBackgroundColor1,
  setBackgroundColor2,
  setBackgroundOpacity,
  setGradientDirection,
  setGap,
  setBorderColor,
  setIsCircle,
  setBorderSize,
  setBorderRadius,
  setShowNumbers,
  setShowEloRating,
  setShowShadows,
  setFont,
  setFontSize,
  setTextColor,
  setTitlesPosition,
  setSort,
  addItem,
  addMultipleItems,
  swapItem,
  removeItem,
  updateElo,
  setPreset,
  exportState,
  importState,
  restart,
  makeSortDefault,
  removeDuplicateItems,
  createNewList,
  selectList,
  deleteList,
} = stateSlice.actions;

const persistConfig = {
  key: "root",
  storage,
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, stateSlice.reducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export const persistor = persistStore(store);
