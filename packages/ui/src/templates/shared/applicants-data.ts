export type ApplicantStatus = "approved" | "on_hold" | "rejected" | "pending";

export interface ApplicantRow {
  id: string;
  name: string;
  role: string;
  email: string;
  dateApplied: string;
  status: ApplicantStatus;
}

export const applicants: ApplicantRow[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Designer",
    email: "j.smith@practical-ui.com",
    dateApplied: "5 Dec 2023",
    status: "approved",
  },
  {
    id: "2",
    name: "Brooklyn Sims",
    role: "UX designer",
    email: "b.sims@practical-ui.com",
    dateApplied: "3 Dec 2023",
    status: "approved",
  },
  {
    id: "3",
    name: "Tony Jones",
    role: "Copywriter",
    email: "t.jones@practical-ui.com",
    dateApplied: "2 Dec 2023",
    status: "on_hold",
  },
  {
    id: "4",
    name: "Tina Wong",
    role: "Developer",
    email: "t.wong@practical-ui.com",
    dateApplied: "24 Nov 2023",
    status: "rejected",
  },
  {
    id: "5",
    name: "Jane Smith",
    role: "Developer",
    email: "j.smith@practical-ui.com",
    dateApplied: "22 Nov 2023",
    status: "pending",
  },
  {
    id: "6",
    name: "Theresa Webb",
    role: "Business analyst",
    email: "t.webb@practical-ui.com",
    dateApplied: "5 Dec 2023",
    status: "approved",
  },
  {
    id: "7",
    name: "Guy Kim",
    role: "E-commerce manager",
    email: "g.kim@practical-ui.com",
    dateApplied: "3 Dec 2023",
    status: "approved",
  },
  {
    id: "8",
    name: "Marvin McKinney",
    role: "Marketing manager",
    email: "m.mckinney@practical-ui.com",
    dateApplied: "2 Dec 2023",
    status: "on_hold",
  },
  {
    id: "9",
    name: "Arlene McCoy",
    role: "Head of digital",
    email: "a.mccoy@practical-ui.com",
    dateApplied: "24 Nov 2023",
    status: "rejected",
  },
  {
    id: "10",
    name: "Cody Fisher",
    role: "Product manager",
    email: "c.fisher@practical-ui.com",
    dateApplied: "22 Nov 2023",
    status: "pending",
  },
];
