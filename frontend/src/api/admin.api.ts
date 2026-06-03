import { axiosInstance } from './axiosInstance';

export const adminApi = {
  getStats: async () => {
    const response = await axiosInstance.get('/admin/stats');
    return response.data.data;
  },
  getUsers: async () => {
    const response = await axiosInstance.get('/admin/users');
    return response.data.data;
  },
  deleteUser: async (userId: string) => {
    const response = await axiosInstance.delete(`/admin/users/${userId}`);
    return response.data;
  },
  getGroups: async () => {
    const response = await axiosInstance.get('/admin/groups');
    return response.data.data;
  },
  deleteGroup: async (groupId: string) => {
    const response = await axiosInstance.delete(`/admin/groups/${groupId}`);
    return response.data;
  }
};
