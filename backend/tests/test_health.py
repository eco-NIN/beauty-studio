from unittest import IsolatedAsyncioTestCase

import httpx

from app.main import app


class HealthEndpointTests(IsolatedAsyncioTestCase):
    async def test_returns_the_response_expected_by_the_mini_program(self):
        async with httpx.AsyncClient(
            transport=httpx.ASGITransport(app=app),
            base_url="http://testserver",
        ) as client:
            response = await client.get("/api/health")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})
