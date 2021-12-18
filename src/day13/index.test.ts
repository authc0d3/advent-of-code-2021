import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 13", () => {
  const result = main(TEST_FILE);

  it("should return an array with length equals to 2", () => {
    expect(result?.length).toBe(2);
  });

  it("total points after one fold should be equal to 17", () => {
    expect(result && result[0]).toBe(17);
  });

  it("total points after folds should be equal to 16", () => {
    expect(result && result[1]).toBe(16);
  });
});
