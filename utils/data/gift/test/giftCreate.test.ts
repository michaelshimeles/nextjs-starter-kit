import { giftCreate } from "../giftCreate";
import { createServerClient } from "@supabase/ssr";

jest.mock("@supabase/ssr", () => ({
  createServerClient: jest.fn(() => ({
    from: jest.fn(() => ({
      insert: jest.fn(() => ({
        select: jest.fn().mockResolvedValue({ data: [{ id: "1", name: "Gift" }], error: null }),
      })),
    })),
  })),
}));

jest.mock('next/headers', () => ({
    cookies: jest.fn(() => ({
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    })),
  }));

describe("giftCreate", () => {
  it("should create a new gift and return data", async () => {
    const price = 100;
    const result = await giftCreate({
      name: "Gift",
      price: parseFloat(price.toString()),
      store: "Store",
      event_id: "event-1",
    });

    expect(result.data).toEqual([{ id: "1", name: "Gift" }]);
  });
});