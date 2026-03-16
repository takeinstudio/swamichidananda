import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { CreditCard, CheckCircle } from "lucide-react";
import { addPaymentRecord, getSiteData } from "@/lib/siteData";

const paymentCategories = [
  "Admission Fees",
  "Semester Fees",
  "Seminar Registration Fees",
  "Workshop Fees",
  "Certification Course Fees",
  "None / Other",
];

const Payments = () => {
  const [programs, setPrograms] = useState<string[]>([]);
  const [step, setStep] = useState<"details" | "transaction" | "success">("details");
  const [formData, setFormData] = useState({
    studentName: "",
    rollNumber: "",
    program: "",
    category: "",
    amount: "",
    transactionId: "",
  });

  useEffect(() => {
    const availablePrograms = getSiteData().programs.map((program) => program.name);
    setPrograms(availablePrograms);
  }, []);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("transaction");
  };

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPaymentRecord({
      studentName: formData.studentName.trim(),
      rollNumber: formData.rollNumber.trim(),
      program: formData.program,
      category: formData.category,
      amount: Number(formData.amount),
      transactionId: formData.transactionId.trim(),
    });
    setStep("success");
  };

  const resetForm = () => {
    setStep("details");
    setFormData({
      studentName: "",
      rollNumber: "",
      program: "",
      category: "",
      amount: "",
      transactionId: "",
    });
  };

  return (
    <section id="payments" className="section-padding">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Payment Portal</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-6">
              Online <span className="gradient-text">Payment</span>
            </h2>
            <p className="text-muted-foreground text-lg">Secure and convenient online fee payment for students.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-5xl mx-auto glass-card p-6 sm:p-8 lg:p-10">
            {step === "success" ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                <h3 className="font-heading font-bold text-foreground text-xl mb-2">Payment Recorded Successfully</h3>
                <p className="text-muted-foreground text-sm mb-5">Your payment details have been saved. Keep your transaction ID for verification.</p>
                <div className="max-w-md mx-auto text-left bg-muted/60 border border-border rounded-xl p-4">
                  <p className="text-sm text-foreground mb-1"><span className="text-muted-foreground">Student:</span> {formData.studentName}</p>
                  <p className="text-sm text-foreground mb-1"><span className="text-muted-foreground">Program:</span> {formData.program}</p>
                  <p className="text-sm text-foreground mb-1"><span className="text-muted-foreground">Amount:</span> ₹{formData.amount}</p>
                  <p className="text-sm text-foreground"><span className="text-muted-foreground">Transaction ID:</span> {formData.transactionId}</p>
                </div>
                <button type="button" onClick={resetForm} className="btn-secondary mt-6">Make Another Payment</button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem] gap-8 items-start">
                {step === "details" && (
                  <form onSubmit={handleDetailsSubmit} className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Student Name</label>
                      <input required value={formData.studentName} onChange={(e) => updateField("studentName", e.target.value)} placeholder="Enter full name" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Roll Number</label>
                      <input required value={formData.rollNumber} onChange={(e) => updateField("rollNumber", e.target.value)} placeholder="Enter roll number" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Program</label>
                      <select required value={formData.program} onChange={(e) => updateField("program", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Select available program</option>
                        {programs.map((program) => (
                          <option key={program} value={program}>{program}</option>
                        ))}
                        <option value="None / Other">None / Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Payment Category</label>
                      <select required value={formData.category} onChange={(e) => updateField("category", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Select category</option>
                        {paymentCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1.5">Amount (₹)</label>
                      <input required type="number" min="1" value={formData.amount} onChange={(e) => updateField("amount", e.target.value)} placeholder="Enter amount" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <button type="submit" className="btn-secondary w-full md:w-auto px-8">
                        <CreditCard className="w-4 h-4 mr-2" /> Pay Now
                      </button>
                      <p className="text-muted-foreground text-xs">Scan the QR and complete payment, then enter your transaction ID in the next step.</p>
                    </div>
                  </form>
                )}

                {step === "transaction" && (
                  <form onSubmit={handleTransactionSubmit} className="space-y-4">
                    <div className="rounded-2xl border border-border bg-muted/40 p-5">
                      <h3 className="font-heading font-bold text-foreground text-lg mb-1">Confirm Successful Payment</h3>
                      <p className="text-sm text-muted-foreground mb-4">After paying via QR code, enter your transaction ID below to complete the payment submission.</p>
                      <div className="grid sm:grid-cols-2 gap-3 text-xs text-muted-foreground mb-4">
                        <p><span className="text-foreground">Student:</span> {formData.studentName}</p>
                        <p><span className="text-foreground">Roll:</span> {formData.rollNumber}</p>
                        <p><span className="text-foreground">Program:</span> {formData.program}</p>
                        <p><span className="text-foreground">Amount:</span> ₹{formData.amount}</p>
                      </div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Payment Transaction ID</label>
                      <input
                        required
                        value={formData.transactionId}
                        onChange={(e) => updateField("transactionId", e.target.value)}
                        placeholder="Enter transaction ID"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button type="button" onClick={() => setStep("details")} className="px-5 py-3 rounded-xl border border-border text-foreground hover:bg-muted transition-colors">Back</button>
                      <button type="submit" className="btn-secondary">Submit Transaction Details</button>
                    </div>
                  </form>
                )}

                <div className="w-full max-w-[18rem] mx-auto lg:mx-0 aspect-square rounded-2xl border-2 border-dashed border-border bg-muted/40 flex flex-col items-center justify-center text-center p-4">
                  <img
                    src="/qr.png"
                    alt="Swami Chidananda Institute of Social Sciences payment QR code"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Payments;
