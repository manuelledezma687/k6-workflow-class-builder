

export interface LoginPayload {
    email: string;
    password: string
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: string;
  email: string;
  role: string;
}

export interface ForgotPassword {
    email: string;
}

export interface BlogPost {
      id: string;
      title: string;
      slug: string;
      content: string;
      excerpt: string;
      featured_image: string;
      status: string;
      seo_title: string;
      seo_description: string;
      seo_keywords: string;
      published_at: string;
      created_at: string;
      updated_at: string;
}

export interface Environment {
    BASE_URL: string;
    TEST_USER_EMAIL: string;
    TEST_USER_PASSWORD: string;
}