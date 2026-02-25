# DOMAIN CUTOVER PLAN — `portal.bigstarblockchain.com` → Vercel

## 1) Add custom domain in Vercel (exact command)
From repo/workspace root (where `secrets/vercel.env` exists):

```bash
set -a && source secrets/vercel.env && set +a
vercel project add-domain bsla-investor-portal portal.bigstarblockchain.com --scope trader318 --token "$VERCEL_TOKEN"
```

Expected outcome: Vercel shows `portal.bigstarblockchain.com` attached to project `bsla-investor-portal` and waiting for DNS verification.

---

## 2) Cloudflare DNS change (exact record)
In Cloudflare DNS for `bigstarblockchain.com`, update/create:

- **Type:** `CNAME`
- **Name:** `portal`
- **Target/Content:** `cname.vercel-dns.com`
- **Proxy status:** **DNS only** (gray cloud) during validation/cutover
- **TTL:** Auto (or 300s if manually setting)

> This replaces the current `portal` record pointing at the VPS.

---

## 3) SSL/TLS considerations
- **Use Vercel auto-SSL** for `portal.bigstarblockchain.com` (issued after domain + DNS verify).
- In Cloudflare SSL/TLS mode, use **Full (strict)** (preferred) or **Full**.
- **Do NOT use Flexible** (causes origin/http mismatch patterns and is not needed with Vercel).
- Keep Cloudflare proxy **off (DNS only)** until cert is active and endpoint is verified, then proxy can be enabled later if desired.

---

## 4) Rollback plan (if anything breaks)
1. In Cloudflare DNS, revert `portal` CNAME back to prior VPS target (or restore prior A/CNAME record).
2. Purge Cloudflare cache for `portal.bigstarblockchain.com` (if proxy had been enabled).
3. Confirm VPS nginx + Node app on `:3040` is healthy.
4. Verify rollback externally:
   - `dig +short portal.bigstarblockchain.com`
   - `curl -I https://portal.bigstarblockchain.com`
5. Leave Vercel domain attached (optional) for next attempt, or remove later if needed:
   ```bash
   vercel project remove-domain bsla-investor-portal portal.bigstarblockchain.com --scope trader318 --token "$VERCEL_TOKEN"
   ```

---

## 5) Pre-cutover checklist
- [ ] Vercel deployment is production-ready and tested on `https://bsla-investor-portal.vercel.app`.
- [ ] Critical routes tested (login/auth, dashboard/deal room pages, API calls, redirects).
- [ ] Env vars in Vercel production are complete and correct.
- [ ] No hard-coded hostnames pointing to old VPS domain/origin.
- [ ] Current DNS record(s) for `portal` documented (screenshot or exported values).
- [ ] Rollback DNS values prepared and copy/paste ready.
- [ ] Team aware of cutover window and expected DNS propagation delay.

---

## 6) Post-cutover verification
After DNS update, run:

```bash
dig +short portal.bigstarblockchain.com
curl -I https://portal.bigstarblockchain.com
```

Validate:
- `dig` resolves to Vercel edge (not VPS IP).
- HTTPS responds successfully (200/301/302 expected, no TLS errors).
- Vercel dashboard domain status = **Valid/Configured**.
- Browser test passes for key user flows (fresh session + authenticated session).
- Check app logs/analytics for 4xx/5xx spikes.

If any critical failure persists beyond expected DNS propagation, execute rollback steps above.
