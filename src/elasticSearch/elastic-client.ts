import { Client } from "@elastic/elasticsearch";

const elasticClient = new Client({
  cloud: {
    id: "deneme:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDQ4NzJhN2NkNTliZTQxYzE4MWM2ZWRlZTI3NjcyYWE4JDU3ZGY5MWRmYjc0YTRjNjI5NDU1NWNmYzlkOGE2ZDcz",
  },
  auth: {
    username: "elastic",
    password: "NOlhiYWP9pdeeTpvh0HsEqnV",
  },
});

export default elasticClient;
