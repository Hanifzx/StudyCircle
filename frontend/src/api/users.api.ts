import { axiosInstance } from './axiosInstance';

export const usersApi = {
  getProfile: async () => {
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data: { name?: string; bio?: string }) => {
    const response = await axiosInstance.put('/users/profile', data);
    return response.data;
  },

  updateLearningStyle: async (data: { learningStyle: string }) => {
    const response = await axiosInstance.put('/users/learning-style', data);
    return response.data;
  },

  getLeaderboard: async (limit: number = 10) => {
    const response = await axiosInstance.get(`/users/leaderboard?limit=${limit}`);
    return response.data;
  },
};
