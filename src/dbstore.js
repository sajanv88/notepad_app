export const DBConfig = {
  name: "Notepad",
  version: 1,
  objectStoresMeta: [
    {
      store: "notes",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
        {
          name: "descriptions",
          keypath: "descriptions",
          options: { unique: false },
        },
        { name: "date", keypath: "date", options: { unique: false } },
      ],
    },
  ],
};
