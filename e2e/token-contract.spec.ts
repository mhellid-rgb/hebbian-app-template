import fs from "node:fs";
import path from "node:path";

import { test, expect } from "@playwright/test";
import { runTokenContractTest } from "@hebbian/dna/e2e/token-contract";

test.use({
  launchOptions: {
    args: ["--host-resolver-rules=MAP hebbian.systems 127.0.0.1,MAP hebbian.org 127.0.0.1"],
  },
});

function resolvePkgCss(file: string) {
  const p = path.join(process.cwd(), "node_modules/@hebbian/dna/dist", file);
  if (!fs.existsSync(p)) {
    throw new Error(`@hebbian/dna CSS not found: ${p}`);
  }
  return p;
}

test("DNA token contract", async ({ page }, testInfo) => {
  await runTokenContractTest(
    page,
    {
      cssPaths: [resolvePkgCss("dna.css"), resolvePkgCss("brands.css")],
      hosts: [
        { key: "hs", host: "hebbian.systems", brandRoot: "hs" },
        { key: "hebbian", host: "hebbian.org", brandRoot: "hebbian" },
      ],
      surfaces: [
        { name: "home", route: "/", elementSelector: null },
        { name: "login", route: "/login", elementSelector: null },
      ],
      snapshot: {
        brandKey: "hebbian",
        surfaceName: "home",
        path: path.join(__dirname, "__snapshots__", "token-contract-hebbian.json"),
      },
    },
    testInfo,
    expect
  );
});
