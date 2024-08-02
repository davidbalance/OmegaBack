import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { UserManagementService } from '@/user/user/services/user-management.service';

describe('User Management Controller (e2e)', () => {
  let app: INestApplication;
  let userService: UserManagementService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    userService = moduleFixture.get<UserManagementService>(UserManagementService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('users');
      });
  });

  it('/users/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/user')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('dni');
        expect(res.body).toHaveProperty('email');
      });
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ dni: '123', email: 'test@example.com', name: 'Test', lastname: 'User' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.dni).toBe('123');
        expect(res.body.email).toBe('test@example.com');
      });
  });

  it('/users/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/users/1')
      .send({ name: 'Updated' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Updated');
      });
  });

  it('/users/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/users/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({});
      });
  });
});
