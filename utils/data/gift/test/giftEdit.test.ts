import { giftEdit } from "../giftEdit";
import { createServerClient } from "@supabase/ssr";

jest.mock("@supabase/ssr", () => ({
  createServerClient: jest.fn(() => ({
    from: jest.fn(() => ({
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          eq: jest.fn(() => ({
            select: jest.fn(() => ({
              single: jest.fn().mockResolvedValue({ data: { id: "1", name: "Updated Gift" }, error: null }),
            })),
          })),
        })),
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

describe("giftEdit", () => {
  it("should update a gift and return updated data", async () => {
    const result = await giftEdit({
      eventId: "event-1",
      giftId: "1",
      giftData: { name: "Updated Gift" },
    });

    expect(result.data).toEqual({ id: "1", name: "Updated Gift" });
  });
});