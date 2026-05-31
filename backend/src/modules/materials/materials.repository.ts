import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class MaterialsRepository {
  async createMaterial(data: Prisma.MaterialCreateInput) {
    return prisma.material.create({ data });
  }

  async findMaterialById(materialId: string) {
    return prisma.material.findUnique({
      where: { id: materialId },
      include: {
        studyGroup: true,
      }
    });
  }

  async findMaterialsByGroupId(groupId: string) {
    return prisma.material.findMany({
      where: { studyGroupId: groupId },
      orderBy: { uploadedAt: 'desc' },
      include: {
        uploader: {
          select: {
            id: true,
            fullName: true,
            username: true,
          }
        }
      }
    });
  }

  async deleteMaterial(materialId: string) {
    return prisma.material.delete({
      where: { id: materialId },
    });
  }
}
