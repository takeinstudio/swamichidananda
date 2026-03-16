import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  EventItem,
  FacultyMember,
  getSiteData,
  isAdminAuthenticated,
  setAdminAuthenticated,
  updateSiteData,
} from "@/lib/siteData";
import { CalendarDays, GraduationCap, LogOut, MessageCircle, Plus, Trash2, Users, Wallet } from "lucide-react";

const emptyFacultyForm = {
  id: "",
  name: "",
  designation: "",
  qualification: "",
  specialization: "",
  experience: "",
  email: "",
  photoUrl: "",
};

const emptyEventForm = {
  id: "",
  title: "",
  date: "",
  speaker: "",
  desc: "",
  type: "",
};

const newId = () => `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(getSiteData());
  const [facultyForm, setFacultyForm] = useState(emptyFacultyForm);
  const [eventForm, setEventForm] = useState(emptyEventForm);

  const stats = useMemo(
    () => [
      { label: "Total Visitors", value: data.analytics.visitors, icon: Users },
      { label: "Payment Records", value: data.paymentRecords.length, icon: Wallet },
      { label: "Faculty Members", value: data.faculties.length, icon: GraduationCap },
      { label: "Contact Messages", value: data.contactMessages.length, icon: MessageCircle },
    ],
    [data],
  );

  const buildWhatsAppReplyLink = (phone: string, name: string, subject: string) => {
    const normalizedPhone = phone.replace(/[^\d]/g, "");
    const text = encodeURIComponent(`Hello ${name}, thank you for contacting Swami Chidananda Institute of Social Sciences regarding "${subject || "your message"}". We are here to help.`);
    return `https://wa.me/${normalizedPhone}?text=${text}`;
  };

  const refreshData = () => {
    setData(getSiteData());
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    navigate("/admin-login", { replace: true });
  };

  const saveFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: FacultyMember = {
      id: facultyForm.id || newId(),
      name: facultyForm.name.trim(),
      designation: facultyForm.designation.trim(),
      qualification: facultyForm.qualification.trim(),
      specialization: facultyForm.specialization.trim(),
      experience: facultyForm.experience.trim(),
      email: facultyForm.email.trim(),
      photoUrl: facultyForm.photoUrl.trim(),
    };

    updateSiteData((current) => {
      const hasExisting = current.faculties.some((f) => f.id === payload.id);
      const faculties = hasExisting
        ? current.faculties.map((f) => (f.id === payload.id ? payload : f))
        : [payload, ...current.faculties];
      return { ...current, faculties };
    });

    setFacultyForm(emptyFacultyForm);
    refreshData();
  };

  const handleFacultyPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setFacultyForm((prev) => ({ ...prev, photoUrl: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const editFaculty = (faculty: FacultyMember) => {
    setFacultyForm({
      id: faculty.id,
      name: faculty.name,
      designation: faculty.designation,
      qualification: faculty.qualification,
      specialization: faculty.specialization,
      experience: faculty.experience,
      email: faculty.email,
      photoUrl: faculty.photoUrl || "",
    });
  };

  const deleteFaculty = (id: string) => {
    updateSiteData((current) => ({
      ...current,
      faculties: current.faculties.filter((faculty) => faculty.id !== id),
    }));
    refreshData();
    if (facultyForm.id === id) {
      setFacultyForm(emptyFacultyForm);
    }
  };

  const saveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: EventItem = {
      id: eventForm.id || newId(),
      title: eventForm.title.trim(),
      date: eventForm.date.trim(),
      speaker: eventForm.speaker.trim(),
      desc: eventForm.desc.trim(),
      type: eventForm.type.trim(),
    };

    updateSiteData((current) => {
      const hasExisting = current.events.some((event) => event.id === payload.id);
      const events = hasExisting
        ? current.events.map((event) => (event.id === payload.id ? payload : event))
        : [payload, ...current.events];
      return { ...current, events };
    });

    setEventForm(emptyEventForm);
    refreshData();
  };

  const editEvent = (event: EventItem) => {
    setEventForm({
      id: event.id,
      title: event.title,
      date: event.date,
      speaker: event.speaker,
      desc: event.desc,
      type: event.type,
    });
  };

  const deleteEvent = (id: string) => {
    updateSiteData((current) => ({
      ...current,
      events: current.events.filter((event) => event.id !== id),
    }));
    refreshData();
    if (eventForm.id === id) {
      setEventForm(emptyEventForm);
    }
  };

  const deleteContactMessage = (id: string) => {
    updateSiteData((current) => ({
      ...current,
      contactMessages: current.contactMessages.filter((message) => message.id !== id),
    }));
    refreshData();
  };

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container-max space-y-8">
          <div className="glass-card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-secondary uppercase tracking-wider">Admin Panel</p>
                <h1 className="text-3xl font-heading font-bold text-foreground">Premium Website Management</h1>
              </div>
              <button onClick={handleLogout} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-muted text-foreground hover:bg-muted/70 transition-colors">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="glass-card p-5">
                <div className="w-10 h-10 rounded-xl gradient-primary-bg flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <section className="grid xl:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h2 className="text-xl font-heading font-bold text-foreground mb-4">Manage Faculty</h2>
              <form onSubmit={saveFaculty} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <input required value={facultyForm.name} onChange={(e) => setFacultyForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Name" className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm" />
                <input required value={facultyForm.designation} onChange={(e) => setFacultyForm((prev) => ({ ...prev, designation: e.target.value }))} placeholder="Designation" className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm" />
                <input required value={facultyForm.qualification} onChange={(e) => setFacultyForm((prev) => ({ ...prev, qualification: e.target.value }))} placeholder="Qualification" className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm" />
                <input required value={facultyForm.specialization} onChange={(e) => setFacultyForm((prev) => ({ ...prev, specialization: e.target.value }))} placeholder="Specialization" className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm" />
                <input required value={facultyForm.experience} onChange={(e) => setFacultyForm((prev) => ({ ...prev, experience: e.target.value }))} placeholder="Experience (e.g. 10 Years)" className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm" />
                <input required type="email" value={facultyForm.email} onChange={(e) => setFacultyForm((prev) => ({ ...prev, email: e.target.value }))} placeholder="Email" className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm" />
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-foreground">Browse and upload photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFacultyPhotoUpload}
                    className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground file:cursor-pointer"
                  />
                  {facultyForm.photoUrl && (
                    <div className="flex items-center justify-between gap-2 rounded-md border border-border bg-muted/40 px-3 py-2">
                      <p className="text-xs text-muted-foreground">Photo selected</p>
                      <button
                        type="button"
                        onClick={() => setFacultyForm((prev) => ({ ...prev, photoUrl: "" }))}
                        className="text-xs text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
                <div className="sm:col-span-2 flex gap-2">
                  <button type="submit" className="btn-secondary text-sm px-5 py-2.5">
                    <Plus className="w-4 h-4 mr-1" /> {facultyForm.id ? "Update Faculty" : "Add Faculty"}
                  </button>
                  {facultyForm.id && (
                    <button type="button" onClick={() => setFacultyForm(emptyFacultyForm)} className="px-4 py-2.5 rounded-md bg-muted text-sm">
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              <div className="space-y-2 max-h-[360px] overflow-auto pr-1">
                {data.faculties.map((faculty) => (
                  <div key={faculty.id} className="border border-border rounded-xl p-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{faculty.name}</p>
                      <p className="text-xs text-muted-foreground">{faculty.designation}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => editFaculty(faculty)} className="px-3 py-1.5 text-xs rounded-md bg-primary text-primary-foreground">Edit</button>
                      <button type="button" onClick={() => deleteFaculty(faculty.id)} className="px-2 py-1.5 text-xs rounded-md bg-red-600 text-white">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-xl font-heading font-bold text-foreground mb-4">Manage Upcoming Events</h2>
              <form onSubmit={saveEvent} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <input required value={eventForm.title} onChange={(e) => setEventForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="Event title" className="sm:col-span-2 w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm" />
                <input required value={eventForm.type} onChange={(e) => setEventForm((prev) => ({ ...prev, type: e.target.value }))} placeholder="Type (Seminar/Workshop)" className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm" />
                <input required value={eventForm.date} onChange={(e) => setEventForm((prev) => ({ ...prev, date: e.target.value }))} placeholder="Date" className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm" />
                <input required value={eventForm.speaker} onChange={(e) => setEventForm((prev) => ({ ...prev, speaker: e.target.value }))} placeholder="Speaker" className="sm:col-span-2 w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm" />
                <textarea required value={eventForm.desc} onChange={(e) => setEventForm((prev) => ({ ...prev, desc: e.target.value }))} placeholder="Event description" className="sm:col-span-2 w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm min-h-[90px]" />
                <div className="sm:col-span-2 flex gap-2">
                  <button type="submit" className="btn-secondary text-sm px-5 py-2.5">
                    <Plus className="w-4 h-4 mr-1" /> {eventForm.id ? "Update Event" : "Add Event"}
                  </button>
                  {eventForm.id && (
                    <button type="button" onClick={() => setEventForm(emptyEventForm)} className="px-4 py-2.5 rounded-md bg-muted text-sm">
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              <div className="space-y-2 max-h-[360px] overflow-auto pr-1">
                {data.events.map((event) => (
                  <div key={event.id} className="border border-border rounded-xl p-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.date} | {event.type}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => editEvent(event)} className="px-3 py-1.5 text-xs rounded-md bg-primary text-primary-foreground">Edit</button>
                      <button type="button" onClick={() => deleteEvent(event.id)} className="px-2 py-1.5 text-xs rounded-md bg-red-600 text-white">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="glass-card p-6">
            <h2 className="text-xl font-heading font-bold text-foreground mb-4">Payment Transactions</h2>
            <div className="overflow-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="text-left border-b border-border">
                    <th className="py-2 pr-3">Student</th>
                    <th className="py-2 pr-3">Roll No</th>
                    <th className="py-2 pr-3">Program</th>
                    <th className="py-2 pr-3">Category</th>
                    <th className="py-2 pr-3">Amount</th>
                    <th className="py-2 pr-3">Transaction ID</th>
                    <th className="py-2 pr-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.paymentRecords.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-5 text-muted-foreground">No payment records yet.</td>
                    </tr>
                  )}
                  {data.paymentRecords.map((payment) => (
                    <tr key={payment.id} className="border-b border-border/70">
                      <td className="py-2 pr-3">{payment.studentName}</td>
                      <td className="py-2 pr-3">{payment.rollNumber}</td>
                      <td className="py-2 pr-3">{payment.program}</td>
                      <td className="py-2 pr-3">{payment.category}</td>
                      <td className="py-2 pr-3">Rs. {payment.amount}</td>
                      <td className="py-2 pr-3 font-medium">{payment.transactionId}</td>
                      <td className="py-2 pr-3 text-muted-foreground">{new Date(payment.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="glass-card p-6">
            <h2 className="text-xl font-heading font-bold text-foreground mb-4">Contact Messages</h2>
            <div className="space-y-3">
              {data.contactMessages.length === 0 && (
                <p className="text-sm text-muted-foreground">No messages received yet.</p>
              )}
              {data.contactMessages.map((message) => (
                <div key={message.id} className="border border-border rounded-xl p-4 bg-muted/30">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{message.name}</p>
                      <p className="text-xs text-muted-foreground">WhatsApp: {message.whatsappNumber}</p>
                      <p className="text-xs text-muted-foreground">{new Date(message.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={buildWhatsAppReplyLink(message.whatsappNumber, message.name, message.subject)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md gradient-secondary-bg text-secondary-foreground text-sm font-semibold"
                      >
                        <MessageCircle className="w-4 h-4" /> Reply on WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => deleteContactMessage(message.id)}
                        className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                        aria-label="Delete message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-foreground mt-3"><span className="text-muted-foreground">Subject:</span> {message.subject || "No subject"}</p>
                  <p className="text-sm text-muted-foreground mt-1">{message.message || "No message content provided."}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Admin;
