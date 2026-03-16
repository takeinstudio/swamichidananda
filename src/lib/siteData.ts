export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  specialization: string;
  experience: string;
  email: string;
  photoUrl?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  speaker: string;
  desc: string;
  type: string;
}

export interface ProgramItem {
  id: string;
  name: string;
}

export interface PaymentRecord {
  id: string;
  studentName: string;
  rollNumber: string;
  program: string;
  category: string;
  amount: number;
  transactionId: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  whatsappNumber: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface SiteData {
  faculties: FacultyMember[];
  events: EventItem[];
  programs: ProgramItem[];
  paymentRecords: PaymentRecord[];
  contactMessages: ContactMessage[];
  analytics: {
    visitors: number;
  };
}

const STORAGE_KEY = "sciss_site_data_v1";
const VISITOR_SESSION_KEY = "sciss_visitor_tracked";
export const ADMIN_SESSION_KEY = "sciss_admin_authenticated";

const defaultData: SiteData = {
  faculties: [
    {
      id: "fac-1",
      name: "Dr. Rajesh Kumar Panda",
      designation: "Professor & HOD",
      qualification: "PhD in Political Science",
      specialization: "Indian Politics & Governance",
      experience: "18 Years",
      email: "rajesh@syvacademy.com",
      photoUrl: "",
    },
    {
      id: "fac-2",
      name: "Dr. Sunita Mohanty",
      designation: "Associate Professor",
      qualification: "PhD in Sociology",
      specialization: "Gender Studies & Social Change",
      experience: "14 Years",
      email: "sunita@syvacademy.com",
      photoUrl: "",
    },
    {
      id: "fac-3",
      name: "Prof. Anil Kumar Sahoo",
      designation: "Assistant Professor",
      qualification: "M.Phil in Economics",
      specialization: "Development Economics",
      experience: "10 Years",
      email: "anil@syvacademy.com",
      photoUrl: "",
    },
    {
      id: "fac-4",
      name: "Dr. Priya Mishra",
      designation: "Associate Professor",
      qualification: "PhD in Social Work",
      specialization: "Community Development",
      experience: "12 Years",
      email: "priya@syvacademy.com",
      photoUrl: "",
    },
    {
      id: "fac-5",
      name: "Dr. Manoj Kumar Das",
      designation: "Assistant Professor",
      qualification: "PhD in History",
      specialization: "Modern Indian History",
      experience: "8 Years",
      email: "manoj@syvacademy.com",
      photoUrl: "",
    },
    {
      id: "fac-6",
      name: "Prof. Lipsa Rath",
      designation: "Assistant Professor",
      qualification: "MPhil in Sociology",
      specialization: "Urban Sociology",
      experience: "6 Years",
      email: "lipsa@syvacademy.com",
      photoUrl: "",
    },
  ],
  events: [
    {
      id: "evt-1",
      title: "National Seminar on Social Policy",
      date: "March 28, 2026",
      speaker: "Dr. A.K. Sharma, JNU",
      desc: "Exploring contemporary social policy frameworks in India.",
      type: "Seminar",
    },
    {
      id: "evt-2",
      title: "Workshop on Research Methodology",
      date: "April 10, 2026",
      speaker: "Prof. S. Rao",
      desc: "Hands-on workshop covering qualitative and quantitative methods.",
      type: "Workshop",
    },
    {
      id: "evt-3",
      title: "Guest Lecture: Future of Social Sciences",
      date: "April 22, 2026",
      speaker: "Dr. Meera Nanda",
      desc: "An insightful lecture on the evolving landscape of social sciences.",
      type: "Lecture",
    },
  ],
  programs: [
    { id: "prog-1", name: "BA in Political Science" },
    { id: "prog-2", name: "BA in Sociology" },
    { id: "prog-3", name: "BA in Economics" },
    { id: "prog-4", name: "BA in History" },
    { id: "prog-5", name: "MA in Political Science" },
    { id: "prog-6", name: "MA in Sociology" },
    { id: "prog-7", name: "MA in Social Work" },
    { id: "prog-8", name: "MA in Economics" },
    { id: "prog-9", name: "PhD in Social Sciences" },
    { id: "prog-10", name: "PhD in Political Science" },
    { id: "prog-11", name: "PhD in Sociology" },
    { id: "prog-12", name: "Diploma in Social Work" },
    { id: "prog-13", name: "Certificate in Human Rights" },
    { id: "prog-14", name: "Diploma in Rural Development" },
  ],
  paymentRecords: [],
  contactMessages: [],
  analytics: {
    visitors: 0,
  },
};

const safeStorageAvailable = () => typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const generateId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

export const getSiteData = (): SiteData => {
  if (!safeStorageAvailable()) {
    return defaultData;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<SiteData>;
    return {
      faculties: parsed.faculties ?? defaultData.faculties,
      events: parsed.events ?? defaultData.events,
      programs: parsed.programs ?? defaultData.programs,
      paymentRecords: parsed.paymentRecords ?? defaultData.paymentRecords,
      contactMessages: parsed.contactMessages ?? defaultData.contactMessages,
      analytics: {
        visitors: parsed.analytics?.visitors ?? 0,
      },
    };
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
};

export const saveSiteData = (data: SiteData) => {
  if (!safeStorageAvailable()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const updateSiteData = (updater: (current: SiteData) => SiteData): SiteData => {
  const current = getSiteData();
  const next = updater(current);
  saveSiteData(next);
  return next;
};

export const trackVisitorOncePerSession = () => {
  if (typeof window === "undefined" || typeof window.sessionStorage === "undefined") {
    return;
  }

  const alreadyTracked = window.sessionStorage.getItem(VISITOR_SESSION_KEY);
  if (alreadyTracked) {
    return;
  }

  updateSiteData((current) => ({
    ...current,
    analytics: {
      visitors: current.analytics.visitors + 1,
    },
  }));

  window.sessionStorage.setItem(VISITOR_SESSION_KEY, "true");
};

export const addPaymentRecord = (record: Omit<PaymentRecord, "id" | "createdAt">): PaymentRecord => {
  const paymentRecord: PaymentRecord = {
    ...record,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };

  updateSiteData((current) => ({
    ...current,
    paymentRecords: [paymentRecord, ...current.paymentRecords],
  }));

  return paymentRecord;
};

export const addContactMessage = (message: Omit<ContactMessage, "id" | "createdAt">): ContactMessage => {
  const contactMessage: ContactMessage = {
    ...message,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };

  updateSiteData((current) => ({
    ...current,
    contactMessages: [contactMessage, ...current.contactMessages],
  }));

  return contactMessage;
};

export const isAdminAuthenticated = (): boolean => {
  if (typeof window === "undefined" || typeof window.sessionStorage === "undefined") {
    return false;
  }
  return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
};

export const setAdminAuthenticated = (authenticated: boolean) => {
  if (typeof window === "undefined" || typeof window.sessionStorage === "undefined") {
    return;
  }
  if (authenticated) {
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
  } else {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }
};
