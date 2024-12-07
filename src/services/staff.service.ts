import { t } from "elysia";
import prisma from "../lib/prisma";

// Define types for request bodies
const staffLimit = t.Object({
  page: t.Number(),
  count: t.Number(),
  name: t.String(),
});

const staffInput = t.Object({
  firstName: t.String(),
  lastName: t.String(),
  dob: t.String(),
  jobType: t.String(),
  salary: t.Number(),
  hiredDate: t.String(),
  departmentId: t.String(),
  managerId: t.Optional(t.String()),
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
const getAllStaff = async ({ page, count, name }: StaffLimit) => {
  const skip = (page - 1) * count;
  const take = count;

  const where = name
    ? {
        OR: [
          { firstName: { contains: name } },
          { lastName: { contains: name } },
        ],
      }
    : {};

  const [staff, total] = await Promise.all([
    prisma.staff.findMany({
      skip,
      take,
      where,
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
        firstName: "asc",
      },
    }),
    prisma.staff.count({ where }),
  ]);

  return {
    data: staff,
    meta: {
      total,
      page,
      count,
    },
  };
};

// Function to get a staff member by ID with all related data
const getStaffById = async (id: string) => {
  return await prisma.staff.findUnique({
    where: { id },
    include: {
      department: true,
      manageDepartment: true,
      qualifications: true,
      employmentHistories: true,
      shifts: {
        include: {
          shift: true,
        },
      },
    },
  });
};

// Function to create a new staff member
const createStaff = async (data: StaffInput) => {
  return await prisma.staff.create({
    data: {
      ...data,
      dob: new Date(data.dob),
      hiredDate: new Date(data.hiredDate),
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
      ...(data.hiredDate && { hiredDate: new Date(data.hiredDate) }),
    },
    include: {
      department: true,
    },
  });
};

// Function to delete a staff member
const deleteStaff = async (id: string) => {
  const staff = await getStaffById(id);
  if (!staff) {
    throw new Error("Staff member not found");
  }

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

// Function to add employment history
const addEmploymentHistory = async (
  staffId: string,
  data: EmploymentHistoryInput
) => {
  const staff = await getStaffById(staffId);
  if (!staff) {
    throw new Error("Staff member not found");
  }

  return await prisma.employmentHistory.create({
    data: {
      ...data,
      appliedDate: new Date(data.appliedDate),
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
  addEmploymentHistory,
  assignShift,
  removeShiftAssignment,
  // Types
  staffLimit,
  staffInput,
  qualificationInput,
  employmentHistoryInput,
  shiftAssignmentInput,
};
