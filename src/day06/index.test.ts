import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 06", () => {
  const result = main(TEST_FILE);

  it("should return an array with length equals to 2", () => {
    expect(result?.length).toBe(2);
  });

  it("the number of lanternfish after 80 days should be equals to 5.934", () => {
    expect(result && result[0]).toBe(5934);
  });

  it("the number of lanternfish after 256 days should be equals to 26.984.457.539", () => {
    expect(result && result[1]).toBe(26984457539);
  });
});
