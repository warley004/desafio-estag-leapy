/// <reference types="vitest" />

import { fetchTalentsPage } from "../directus";
import { vi } from "vitest";

const buildMockResponse = (payload: unknown, ok = true) => ({
  ok,
  json: async () => payload,
  text: async () => JSON.stringify(payload),
});

describe("fetchTalentsPage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns enriched talent data when the API succeeds", async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValueOnce(
        buildMockResponse({
          data: [
            {
              id: "tal1",
              user_id: "user-1",
              department: "Design",
              current_status: "ACTIVE",
              orchestrator_state: "ONBOARDING",
              pdi_plan_ready: true,
              leader_id: 11,
              target_role_id: 3,
              start_date: "2025-01-10",
              end_date: "2025-08-10",
              date_updated: "2025-08-12T10:00:00Z",
            },
          ],
          meta: { filter_count: 1 },
        })
      )
      .mockResolvedValueOnce(
        buildMockResponse({
          data: [
            { id: 11, user_id: "leader-user", position: "Lead", department: "Design" },
          ],
        })
      )
      .mockResolvedValueOnce(
        buildMockResponse({
          data: [{ id: 3, name: "UX Designer" }],
        })
      )
      .mockResolvedValueOnce(
        buildMockResponse({
          data: [
            {
              id: "user-1",
              email: "talent@example.com",
              first_name: "Talent",
              last_name: "Tester",
            },
            {
              id: "leader-user",
              email: "leader@example.com",
              first_name: "Leader",
              last_name: "Manager",
            },
          ],
        })
      );

    vi.stubGlobal("fetch", mockFetch);

    const result = await fetchTalentsPage({ page: 1, limit: 4 });

    expect(result.total).toBe(1);
    expect(result.talents).toHaveLength(1);
    expect(result.talents[0]).toMatchObject({
      user_email: "talent@example.com",
      leader_name: "Leader Manager",
      target_role_name: "UX Designer",
    });
    expect(mockFetch).toHaveBeenCalledTimes(4);
  });

  it("throws when the talents request fails", async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce(buildMockResponse({ error: "boom" }, false));
    vi.stubGlobal("fetch", mockFetch);

    await expect(fetchTalentsPage({ page: 1 })).rejects.toThrow("Falha ao buscar talentos");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
