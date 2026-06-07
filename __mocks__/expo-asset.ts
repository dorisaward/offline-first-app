export const Asset = {
  fromModule: jest.fn().mockReturnValue({
    downloadAsync: jest.fn().mockResolvedValue({
      localUri: "file:///mock-asset.db",
    }),
  }),
}
