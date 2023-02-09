import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

export async function getProfile(id: string, cookie?: string) {
  const { data } = await request.get(
    `/profile/${id}`,
    cookie
      ? {
          headers: {
            Cookie: cookie,
          },
        }
      : undefined
  );

  return data;
}

export async function getPost(id: string, cookie?: string) {
  const { data } = await request.get(
    `/post/single/${id}`,
    cookie
      ? {
          headers: {
            Cookie: cookie,
          },
        }
      : undefined
  );

  return data;
}

export async function getSearchPosts(queries?: string) {
  const { data } = await request.get(`/post/search/?${queries}`);

  return data;
}

export async function getPreferencesPosts(cookie?: string) {
  const { data } = await request.get(
    `/post/preferencesPosts`,
    cookie
      ? {
          headers: {
            Cookie: cookie,
          },
        }
      : undefined
  );

  return data;
}

export default request;
