import { eventCreate } from "../eventCreate";
import { createServerClient } from "@supabase/ssr";

jest.mock("@supabase/ssr", () => ({
  createServerClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          insert: jest.fn(() => ({
            select: jest.fn().mockResolvedValue({ data: [{ id: "1", title: "Test Event" }], error: null }),
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

jest.mock('nanoid', () => ({
  customAlphabet: () => () => 'abcde',
}));

describe("eventCreate", () => {
  it("should create a new event and return data", async () => {
    const result = await eventCreate({
      title: "Test Event",
      description: "Description",
      location: "Location",
      eventDate: "2023-12-31",
      userId: "user-1",
    });

    expect(result.data).toEqual([{ id: "1", title: "Test Event" }]);
  });

  it("should handle error when generating unique short code", async () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    const mockSupabase = createServerClient('SUPABASE_URL', 'SUPABASE_KEY', { cookies: {} });
    mockSupabase.from('event').select().eq('short_code', 'abcde');

    await expect(eventCreate({
      title: "Test Event",
      description: "Description",
      location: "Location",
      eventDate: "2023-12-31",
      userId: "user-1",
    })).rejects.toThrow("Nie udało się wygenerować unikalnego kodu");

    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it("should return error if insert fails", async () => {
    const mockSupabase = createServerClient('SUPABASE_URL', 'SUPABASE_KEY', { cookies: {} });
    //mockSupabase.from('event').insert().select().mockResolvedValueOnce({ data: null, error: { code: "insert_error" } });

    const result = await eventCreate({
      title: "Test Event",
      description: "Description",
      location: "Location",
      eventDate: "2023-12-31",
      userId: "user-1",
    });

    expect(result.error).toEqual({ code: "insert_error" });
  });
});