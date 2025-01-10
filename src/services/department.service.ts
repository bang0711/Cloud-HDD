import { t } from "elysia";
import prisma from "../lib/prisma";

const departmentLimit = t.Object({
  page: t.Number(),
  count: t.Number(),
  name: t.String(),
});

export const getAllDepartments = async ({
  page,
  count,
  name = "",
}: typeof departmentLimit.static) => {
  const skip = (page - 1) * count;
  const take = count;

  const [departments, total] = await Promise.all([
    prisma.department.findMany({
      skip,
      take,
      where: {
        name: {
          contains: name,
        },
      },
      include: {
        manager: true,
        _count: {
          select: {
            staffs: true,
          },
        },
      },
    }),

    prisma.department.count({
      where: {
        name: {
          contains: name,
        },
      },
    }),
  ]);
  return {
    data: departments,
    pagination: {
      total,
      page,
      count,
      totalPages: Math.ceil(total / count),
    },
  };
};

export const getDepartmentById = async (id: string) => {
  return await prisma.department.findUnique({
    where: {
      id,
    },
    include: {
      manager: true,
      staffs: true,
      _count: {
        select: {
          staffs: true,
        },
      },
    },
  });
};

export const getDepartmentList = async () => {
  return await prisma.department.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};
