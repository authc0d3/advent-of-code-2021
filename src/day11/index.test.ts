import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 11", () => {
  const result = main(TEST_FILE);

  it("should return an array with length equals to 2", () => {
    expect(result?.length).toBe(2);
  });

  it("the total flashes after 100 steps should be equal to 1656", () => {
    expect(result && result[0]).toBe(1656);
  });

  it("the synchro flash step should be equal to 195", () => {
    expect(result && result[1]).toBe(195);
  });
});
