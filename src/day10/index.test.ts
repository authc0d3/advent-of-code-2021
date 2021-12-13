import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 10", () => {
  const result = main(TEST_FILE);

  it("should return an array with length equals to 2", () => {
    expect(result?.length).toBe(2);
  });

  it("the total syntax error score should be equal to 26397", () => {
    expect(result && result[0]).toBe(26397);
  });

  it("the middle autocomplete score should be equal to 288957", () => {
    expect(result && result[1]).toBe(288957);
  });
});
