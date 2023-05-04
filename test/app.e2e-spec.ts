import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { UserDto } from 'src/user/dto/user.dto'

describe('UserController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('/api/users (POST)', () => {
    it('should create a new user', async () => {
      const createUserDto: UserDto = {
        id: 7,
        email: 'john.doe@example.com',
        first_name: 'John',
        last_name: 'Doe',
        avatar: 'https://example.com/avatar.jpg',
      }

      const res = await request(app.getHttpServer())
        .post('/api/users')
        .send(createUserDto)
        .expect(201)

      expect(res.body).toHaveProperty('id')
      expect(res.body.email).toEqual(createUserDto.email)
      expect(res.body.first_name).toEqual(createUserDto.first_name)
      expect(res.body.last_name).toEqual(createUserDto.last_name)
      expect(res.body.avatar).toEqual(createUserDto.avatar)
    })
  })

  describe('/api/user/:userId (GET)', () => {
    it('should return the user by ID', async () => {
      const createUserDto: UserDto = {
        id: 10,
        email: 'byron.fields@reqres.in',
        first_name: 'Byron',
        last_name: 'Fields',
        avatar: 'https://reqres.in/img/faces/10-image.jpg',
      }
      const userId = 10

      const getUserRes = await request(app.getHttpServer())
        .get(`/api/user/${userId}`)
        .expect(200)

      expect(getUserRes.body).toHaveProperty('id')
      expect(getUserRes.body.email).toEqual(createUserDto.email)
      expect(getUserRes.body.first_name).toEqual(createUserDto.first_name)
      expect(getUserRes.body.last_name).toEqual(createUserDto.last_name)
      expect(getUserRes.body.avatar).toEqual(createUserDto.avatar)
    })
  })

  describe('/api/user/:userId/avatar (GET)', () => {
    it('should return the user avatar by ID', async () => {
      const userId = 10

      const getUserAvatarRes = await request(app.getHttpServer())
        .get(`/api/user/${userId}/avatar`)
        .expect(200)
      expect(getUserAvatarRes.status).toEqual(200)
    })
  })
  describe('', () => {
    it('/api/user/:userId/avatar (DELETE)', async () => {
      const userId = 10

      await request(app.getHttpServer()).get(`/api/user/${userId}/avatar`)

      const responseDelete = await request(app.getHttpServer())
        .delete(`/api/user/${userId}/avatar`)
        .expect(200)

      expect(responseDelete.text).toBe('')
    })
  })
})
