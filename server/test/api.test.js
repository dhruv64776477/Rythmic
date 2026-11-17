import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";
import { app } from "../src/app.js";

const startServer = async () => {
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");

  return {
    url: `http://127.0.0.1:${server.address().port}/api/v1`,
    close: () =>
      new Promise((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      }),
  };
};

test("health endpoint returns a successful JSON response", async () => {
  const server = await startServer();

  try {
    const response = await fetch(`${server.url}/healthcheck`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.equal(body.data.status, "ok");
  } finally {
    await server.close();
  }
});

test("unknown API routes return a JSON 404", async () => {
  const server = await startServer();

  try {
    const response = await fetch(`${server.url}/not-a-route`);
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.equal(body.success, false);
    assert.match(body.message, /Route not found/);
  } finally {
    await server.close();
  }
});

test("audio endpoints validate ids and queries before querying MongoDB", async () => {
  const server = await startServer();

  try {
    const invalidPage = await fetch(`${server.url}/audios?page=0`);
    const invalidAudioId = await fetch(`${server.url}/audios/not-an-object-id`);
    const invalidSearch = await fetch(
      `${server.url}/audios?search=first&search=second`
    );

    assert.equal(invalidPage.status, 400);
    assert.equal(invalidAudioId.status, 400);
    assert.equal(invalidSearch.status, 400);
  } finally {
    await server.close();
  }
});

test("audio uploads require authentication", async () => {
  const server = await startServer();

  try {
    const response = await fetch(`${server.url}/audios`, { method: "POST" });
    const body = await response.json();

    assert.equal(response.status, 401);
    assert.equal(body.success, false);
  } finally {
    await server.close();
  }
});

test("recording a play requires authentication", async () => {
  const server = await startServer();

  try {
    const response = await fetch(
      `${server.url}/audios/507f1f77bcf86cd799439011/play`,
      { method: "POST" }
    );
    assert.equal(response.status, 401);
  } finally {
    await server.close();
  }
});
