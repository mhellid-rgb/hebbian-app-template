# hebbian-app-template

Minimal **Next.js 16** starter with [`@hebbian/dna`](https://github.com/mhellid-rgb/hebbian-dna) wired: proxy brand resolution, `data-brand-root` layout, DNA CSS, contract checks, and Playwright token test.

No product code. No L2 namespace. No marketing surfaces.

## Use this template

1. **GitHub:** *Use this template* → create a new repository.
2. Clone your new repo:

```bash
git clone git@github.com:<you>/<your-app>.git
cd <your-app>
npm ci
npm run build
```

3. Optional full gate (same as CI):

```bash
npm run release:check
```

## What is included

| Piece | Role |
|---|---|
| `proxy.ts` | `applyBrandRootToRequest` → `x-brand-root` |
| `app/layout.tsx` | `resolveBrandRootFromHeader`, fallback `hebbian` |
| `app/globals.css` | `@import` `dna.css` + `brands.css` |
| `e2e/token-contract.spec.ts` | `runTokenContractTest` from `@hebbian/dna` |
| `scripts/egress-allowlist.json` | Empty allowlist for egress audit |
| `.github/workflows/ci.yml` | Security checks, build, e2e |

## Customize

- Add routes under `app/`.
- Extend `scripts/egress-allowlist.json` when you add allowed HTTPS endpoints.
- Pin `@hebbian/dna` to a semver tag in `package.json`.

## Versioning

Follow [`@hebbian/dna` semver](https://github.com/mhellid-rgb/hebbian-dna#versioning-semver): DNA value change = minor; removed/renamed token = major.
