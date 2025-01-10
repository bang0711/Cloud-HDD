import { t } from "elysia";
import prisma from "../lib/prisma";

// Define types for request bodies
const staffLimit = t.Object({
  page: t.Number(),
  count: t.Number(),
  name: t.String(),
  department: t.Optional(t.String()),
});

const staffInput = t.Object({
  firstName: t.String(),
  lastName: t.String(),
  dob: t.String(),
  jobType: t.String(),
  salary: t.Number(),
  departmentId: t.String(),
});

const qualificationInput = t.Object({
  name: t.String(),
  provider: t.String(),
  issueDate: t.String(),
});

const employmentHistoryInput = t.Object({
  previousDepartmentId: t.String(),
  currentDepartmentId: t.String(),
  previousSalary: t.Number(),
  currentSalary: t.Number(),
  previousJobTitle: t.String(),
  currentJobTitle: t.String(),
  appliedDate: t.String(),
});

const shiftAssignmentInput = t.Object({
  shiftId: t.String(),
});

type StaffLimit = typeof staffLimit.static;
type StaffInput = typeof staffInput.static;
type QualificationInput = typeof qualificationInput.static;
type EmploymentHistoryInput = typeof employmentHistoryInput.static;
type ShiftAssignmentInput = typeof shiftAssignmentInput.static;

// Function to get all staff with pagination
const getAllStaff = async ({ page, count, name, department }: StaffLimit) => {
  const skip = (page - 1) * count;
  const take = count;

  const [staff, total] = await Promise.all([
    prisma.staff.findMany({
      skip,
      take,
      where: {
        AND: {
          OR: [
            { firstName: { contains: name, mode: "insensitive" } },
            { lastName: { contains: name, mode: "insensitive" } },
          ],
          department: {
            name: {
              contains: department === "All" ? "" : department,
              mode: "insensitive",
            },
          },
        },
      },
      include: {
        department: {
          select: {
            name: true,
            id: true,
            manager: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                jobType: true,
                dob: true,
              },
            },
          },
        },
        manageDepartment: {
          select: {
            name: true,
            id: true,
          },
        },
        qualifications: true,
        shifts: {
          include: {
            shift: true,
          },
        },
      },
      orderBy: {
        hiredDate: "desc",
      },
    }),

    prisma.staff.count({
      where: {
        OR: [
          { firstName: { contains: name, mode: "insensitive" } },
          { lastName: { contains: name, mode: "insensitive" } },
        ],
        department: {
          name: { contains: department, mode: "insensitive" },
        },
      },
    }),
  ]);

  return {
    data: staff,
    pagination: {
      total,
      page,
      count,
      totalPages: Math.ceil(total / count),
    },
  };
};

// Function to get a staff member by ID with all related data
const getStaffById = async (id: string) => {
  const staff = await prisma.staff.findUnique({
    where: { id },
    include: {
      department: true,
      manageDepartment: true,
      qualifications: true,
      shifts: {
        select: {
          shift: {
            select: {
              dayOfWeek: true,
              time: true,
            },
          },
        },
      },
    },
  });

  // Format the shifts data and add it as a new property
  const shifts = staff?.shifts.map((shift) => ({
    dayOfWeek: shift.shift.dayOfWeek,
    time: shift.shift.time,
  }));

  return {
    ...staff,
    shifts,
  };
};

// Function to create a new staff member
const createStaff = async (data: StaffInput) => {
  return await prisma.staff.create({
    data: {
      ...data,
      dob: new Date(data.dob),
    },
    include: {
      department: true,
    },
  });
};

// Function to update a staff member
const updateStaff = async (id: string, data: Partial<StaffInput>) => {
  const staff = await getStaffById(id);
  if (!staff) {
    throw new Error("Staff member not found");
  }

  return await prisma.staff.update({
    where: { id },
    data: {
      ...data,
      ...(data.dob && { dob: new Date(data.dob) }),
    },
    include: {
      department: true,
    },
  });
};

// Function to delete a staff member
// Function to delete a staff member and related data
const deleteStaff = async (id: string) => {
  const staff = await prisma.staff.findUnique({
    where: { id },
    include: {
      qualifications: true,
      shifts: true,
      manageDepartment: true,
    },
  });

  if (!staff) {
    throw new Error("Staff member not found");
  }

  // Delete related data first
  await prisma.qualification.deleteMany({
    where: { staffId: id },
  });

  await prisma.shiftStaff.deleteMany({
    where: { staffId: id },
  });

  // If the staff member is a manager, unset the managerId in their department
  if (staff.manageDepartment) {
    await prisma.department.update({
      where: { id: staff.manageDepartment.id },
      data: { managerId: null },
    });
  }

  // Finally, delete the staff member
  return await prisma.staff.delete({
    where: { id },
  });
};

// Function to add qualification to staff
const addStaffQualification = async (
  staffId: string,
  data: QualificationInput
) => {
  const staff = await getStaffById(staffId);
  if (!staff) {
    throw new Error("Staff member not found");
  }

  return await prisma.qualification.create({
    data: {
      ...data,
      issueDate: new Date(data.issueDate),
      staffId,
    },
  });
};

// Function to remove qualification from staff
const removeStaffQualification = async (
  staffId: string,
  qualificationId: string
) => {
  const staff = await getStaffById(staffId);
  if (!staff) {
    throw new Error("Staff member not found");
  }

  return await prisma.qualification.delete({
    where: {
      id: qualificationId,
      staffId,
    },
  });
};

// Function to assign shift to staff
const assignShift = async (staffId: string, data: ShiftAssignmentInput) => {
  const staff = await getStaffById(staffId);
  if (!staff) {
    throw new Error("Staff member not found");
  }

  return await prisma.shiftStaff.create({
    data: {
      staffId,
      shiftId: data.shiftId,
    },
    include: {
      shift: true,
    },
  });
};

// Function to remove shift assignment
const removeShiftAssignment = async (staffId: string, shiftId: string) => {
  const staff = await getStaffById(staffId);
  if (!staff) {
    throw new Error("Staff member not found");
  }

  return await prisma.shiftStaff.delete({
    where: {
      staffId_shiftId: {
        staffId,
        shiftId,
      },
    },
  });
};

// Export all functions and types
export {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  addStaffQualification,
  removeStaffQualification,
  assignShift,
  removeShiftAssignment,
  // Types
  staffLimit,
  staffInput,
  qualificationInput,
  employmentHistoryInput,
  shiftAssignmentInput,
};
