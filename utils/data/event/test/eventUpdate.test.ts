import { eventUpdate } from "../eventUpdate";
import { createServerClient } from "@supabase/ssr";

jest.mock("@supabase/ssr", () => ({
  createServerClient: jest.fn(() => ({
    from: jest.fn(() => ({
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn().mockResolvedValue({ data: [{ id: "1", title: "Updated Event" }], error: null }),
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

describe("eventUpdate", () => {
  it("should update an event and return updated data", async () => {
    const result = await eventUpdate({
      eventId: "1",
      userId: "user-1",
      title: "Updated Event",
    });

    expect(result.data).toEqual([{ id: "1", title: "Updated Event" }]);
  });
});