import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 09", () => {
  const result = main(TEST_FILE);

  it("should return an array with length equals to 2", () => {
    expect(result?.length).toBe(2);
  });

  it("the risk level should be equal to 15", () => {
    expect(result && result[0]).toBe(15);
  });

  it("the value of most important areas to avoid should be equal to 1134", () => {
    expect(result && result[1]).toBe(1134);
  });
});
