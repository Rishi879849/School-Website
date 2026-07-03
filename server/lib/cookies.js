// Cookie helpers for HTTP-only session + refresh tokens.
// - `Secure` is enabled in production only (Vite dev over http://localhost can't set Secure cookies).
// - `SameSite=Lax` in dev so the Vite proxy (localhost:5173) can carry cookies to the API (localhost:3001).
//   `SameSite=Strict` would block the cross-port request entirely. In prod, both are on the same
//   origin behind a TLS proxy, so `Lax` is correct and `Strict` is unnecessary.

const isProd = process.env.NODE_ENV === 'production';

const baseOpts = {
  httpOnly: true,
  sameSite: isProd ? 'lax' : 'lax',
  secure: isProd,
  path: '/',
};

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export function setSessionCookie(res, token) {
  res.cookie('session_token', token, { ...baseOpts, maxAge: SEVEN_DAYS });
}

export function setRefreshCookie(res, token) {
  res.cookie('refresh_token', token, { ...baseOpts, maxAge: THIRTY_DAYS });
}

export function clearAuthCookies(res) {
  res.clearCookie('session_token', baseOpts);
  res.clearCookie('refresh_token', baseOpts);
}
