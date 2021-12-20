import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 14", () => {
  const result = main(TEST_FILE);

  it("should return an array with length equals to 2", () => {
    expect(result?.length).toBe(2);
  });

  it("most and least common element subtraction after 10 steps should be equal to 1588", () => {
    expect(result && result[0]).toBe(1588);
  });

  it("most and least common element subtraction after 40 steps should be equal to 2188189693529", () => {
    expect(result && result[1]).toBe(2188189693529);
  });
});
