import { describe, expect, it } from "vitest";
import { oauthReturnPath } from "./oauth-return-path";

describe("OAuth return paths", () => {
  it("preserves consent authorization and fragment", () => {
    expect(oauthReturnPath("/.lovable/oauth/consent?authorization_id=abc#review")).toBe("/.lovable/oauth/consent?authorization_id=abc#review");
  });
  it.each(["//outside.invalid", "/\\outside.invalid", "https://outside.invalid", "/\n/evil", null])("rejects unsafe return %s", (value) => {
    expect(oauthReturnPath(value)).toBe("/");
  });
});