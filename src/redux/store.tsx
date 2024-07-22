import { createSlice, configureStore } from "@reduxjs/toolkit";
import {
  BackgroundType,
  Direction,
  Font,
  ImageFilter,
  Item,
  Position,
  State,
} from "./state";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const itemArray = [];
for (let i = 0; i < 105; ++i) {
  itemArray.push({ title: "", cover: "" });
}

const copy = (targetState: State, sourceState: State) => {
  targetState.title = sourceState.title;
  targetState.showTitles = sourceState.showTitles;
  targetState.rows = sourceState.rows;
  targetState.columns = sourceState.columns;
  targetState.featured = sourceState.featured;
  targetState.imageFilter = sourceState.imageFilter;
  targetState.backgroundType = sourceState.backgroundType;
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
  targetState.showShadows = sourceState.showShadows;
  targetState.font = sourceState.font;
  targetState.fontSize = sourceState.fontSize;
  targetState.textColor = sourceState.textColor;
  targetState.titlesPosition = sourceState.titlesPosition;
};

const initialState: State = {
  title: "",
  showTitles: true,
  rows: 5,
  columns: 5,
  featured: 0,
  backgroundType: BackgroundType.color,
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
  showShadows: false,
  font: Font.monospace,
  fontSize: 10,
  textColor: "#ffffff",
  titlesPosition: Position.side,
  items: itemArray,
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
        state.items[firstIndex] = value.payload.item;
      } else state.items[value.payload.destinationIndex] = value.payload.item;
    },
    addMultipleItems: (state, value: { payload: { items: Item[] } }) => {
      state.items = value.payload.items;
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
      const toMove = state.items[value.payload.sourceIndex];
      state.items[value.payload.sourceIndex] =
        state.items[value.payload.destinationIndex];
      state.items[value.payload.destinationIndex] = toMove;
    },
    removeItem: (state, value: { payload: number }) => {
      state.items[value.payload] = { title: "", cover: "" };
    },
    setPreset: (state, value: { payload: string }) => {
      switch (value.payload) {
        case "Topsters":
          state.rows = 5;
          state.columns = 5;
          state.featured = 0;
          state.showTitles = true;
          state.backgroundType = BackgroundType.color;
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
      state.items = fromFile.items;
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
    restart: (state) => {
      const itemArray = [];
      for (let i = 0; i < 105; ++i) {
        itemArray.push({ title: "", cover: "" });
      }
      copy(state, initialState);
      state.items = itemArray;
    },
  },
});

export const {
  setTitle,
  setShowTitles,
  setRows,
  setColumns,
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
  setShowShadows,
  setFont,
  setFontSize,
  setTextColor,
  setTitlesPosition,
  addItem,
  addMultipleItems,
  swapItem,
  removeItem,
  setPreset,
  exportState,
  importState,
  restart,
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
