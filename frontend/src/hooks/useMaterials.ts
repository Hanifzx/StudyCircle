import { useState } from 'react';
import { materialsApi } from '../api/materials.api';
import type { Material } from '../types';

export function useMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroupMaterials = async (groupId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await materialsApi.getGroupMaterials(groupId);
      setMaterials(res.data || []);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch materials');
    } finally {
      setLoading(false);
    }
  };

  const uploadMaterial = async (groupId: string, formData: FormData) => {
    await materialsApi.uploadMaterial(groupId, formData);
  };

  const downloadMaterial = async (materialId: string) => {
    const response = await materialsApi.downloadMaterial(materialId);
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'download';
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?(.+?)"?$/);
      if (match) filename = match[1];
    }
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const deleteMaterial = async (materialId: string) => {
    await materialsApi.deleteMaterial(materialId);
  };

  return { materials, loading, error, fetchGroupMaterials, uploadMaterial, downloadMaterial, deleteMaterial };
}
