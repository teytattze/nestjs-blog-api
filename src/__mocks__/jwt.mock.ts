import { IJwtUser } from 'src/modules/auth/jwt/jwt.interface';
import { mockAccounts } from './accounts.mock';

const { id, firstName, lastName, email, username, role, verified } =
  mockAccounts[0];

export const mockJwtUser: IJwtUser = {
  id,
  firstName,
  lastName,
  email,
  username,
  role,
  verified,
};

export const MOCK_EXPIRED_JWT_TOKEN =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjUifQ.eyJ1c2VyIjp7ImlkIjoiNjIxMDYwY2YtZDI5YS00ZTIxLWIyOTMtNWNhODRhM2E4ODU3IiwiZmlyc3ROYW1lIjoiVGF0IFR6ZSIsImxhc3ROYW1lIjoiVGV5IiwidXNlcm5hbWUiOiJ0ZXl0YXR0emUiLCJlbWFpbCI6InRhdHR6ZXRleUBnbWFpbC5jb20iLCJyb2xlIjoibWVtYmVyIiwidmVyaWZpZWQiOmZhbHNlfSwiZXhwIjoxNjMyNTg3MTU3fQ.njUAeYp9pqGX_USfmC_0TogRhNfjMm7TEApSEK8JWeGrG_GwsaNoB7pTJRzL9VZYbRNpnirzb4e8GYSLB3p4xWDkFt-JteQyjr-DtHjYu24nqLgsNczfI9ncC008VtZvgv59VESR8fGbwdInapXGCXseKpWzIrfDzq0Sm7QFhO1ZdLdfAu3ln5tEK92Lg8ft5ViTJv8UfVBHV3-W7W6d_ghMQdcnyCNNFxstUVlrtlez4I2osez045wjkOaYPkuwNhHvCX78mh0VKcfEuR7zfTo3WuUXjCwT4MErxWavc1375_pm-xXBXb__HiAsRkQ3ZaW8SfCTb6n6uO6jBeWDOQ';
export const MOCK_INVALID_JWT_TOKEN = 'ImtpZCI6IjU';
