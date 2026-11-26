import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

/**
 * StateEra 300-VU Capacity & Load Test Suite (k6)
 *
 * IMPORTANT:
 * - Run ONLY against a staging environment or with explicit owner authorization.
 * - Do NOT run against production without owner approval.
 * - Does NOT generate 300 real accounts or send verification emails.
 *
 * Usage:
 *   k6 run -e BASE_URL=https://staging.stateera.example -e API_URL=https://staging-api.stateera.example scripts/load-test-300vu.js
 */

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const API_URL = __ENV.API_URL || 'https://stateera-backend-production.up.railway.app';

const errorRate = new Rate('http_error_rate');
const pageLatency = new Trend('page_latency_ms');
const apiLatency = new Trend('api_latency_ms');

export const options = {
  stages: [
    { duration: '1m', target: 50 },   // Warm-up
    { duration: '2m', target: 150 },  // Ramp-up
    { duration: '2m', target: 300 },  // Peak ramp to 300 VUs
    { duration: '5m', target: 300 },  // Sustained 300-VU load
    { duration: '2m', target: 0 },    // Graceful ramp-down
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],          // < 1% HTTP errors
    http_error_rate: ['rate<0.01'],
    http_req_duration: ['p(95)<1500', 'p(99)<3000'],
    page_latency_ms: ['p(50)<500', 'p(95)<1500', 'p(99)<3000'],
    api_latency_ms: ['p(50)<300', 'p(95)<800', 'p(99)<1500'],
  },
};

export default function runLoadTest() {
  // Realistic read-heavy user journey (80% public/browse, 15% auth/guard checks, 5% backend health)
  const roll = Math.random();

  if (roll < 0.80) {
    group('Public & Property Discovery Journey', () => {
      const homeRes = http.get(`${BASE_URL}/`);
      pageLatency.add(homeRes.timings.duration);
      const okHome = check(homeRes, {
        'home status 200': (r) => r.status === 200,
      });
      errorRate.add(!okHome);

      sleep(1);

      const exploreRes = http.get(`${BASE_URL}/explore`);
      pageLatency.add(exploreRes.timings.duration);
      const okExplore = check(exploreRes, {
        'explore status 200': (r) => r.status === 200,
      });
      errorRate.add(!okExplore);

      sleep(1);

      const loginRes = http.get(`${BASE_URL}/login`);
      pageLatency.add(loginRes.timings.duration);
      const okLogin = check(loginRes, {
        'login status 200': (r) => r.status === 200,
      });
      errorRate.add(!okLogin);
    });
  } else if (roll < 0.95) {
    group('Protected Route Fail-Closed Guard Check', () => {
      const adminRes = http.get(`${BASE_URL}/admin`, { redirects: 0 });
      pageLatency.add(adminRes.timings.duration);
      const okGuard = check(adminRes, {
        'admin unauth redirects (307/302)': (r) => r.status === 307 || r.status === 302,
      });
      errorRate.add(!okGuard);
    });
  } else {
    group('Railway Backend Health Check', () => {
      const healthRes = http.get(`${API_URL}/health`);
      apiLatency.add(healthRes.timings.duration);
      const okHealth = check(healthRes, {
        'backend health 200': (r) => r.status === 200,
      });
      errorRate.add(!okHealth);
    });
  }

  sleep(Math.random() * 2 + 1);
}
