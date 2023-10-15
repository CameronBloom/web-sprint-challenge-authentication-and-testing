const app = require("./server")
const supertest = require("supertest")    // for server calls
const request = supertest(app)
const db = require("../data/dbConfig") // for database calls

const User = require("./users/users-model")

const user1 = { username: 'tom', password: '1234' }

// clear out the database every time
beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db("users").truncate()
})

afterAll(async () => {
  await db.destroy()
})

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

describe("users model function", () => {
  describe("create user", () => {
    it("adds user to the db", async () => {
      let users
      await User.add(user1)
      users = await db("users")
      expect(users).toHaveLength(1)
    })
  })
  describe("[POST] register endpoint", () => {
    it("...", async () => {
      const addedUser = await request
        .post('/api/auth/register')
        .send({
          "username": "Captain Marvel",
          "password": "foobar",
        })
      expect(addedUser.body.username).toBe("Captain Marvel")
    })
  })
  describe("[POST] login endpoint", () => {
    it("...", async () => {

    })
  })
  describe("[GET] jokes endpoint", () => {
    it("tries to access jokes without logging in", async () => {
      const jokes = await request.get('/api/jokes')
      expect(jokes.body.message).toBe("token required")
    })
  })
})