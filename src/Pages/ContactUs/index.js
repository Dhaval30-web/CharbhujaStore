import { useState } from "react";
import "./style.css";
import Logo from "../../Assets/Images/Logo.png";

const API_BASE_URL = "http://localhost:5000";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setErrorMsg("Please fill all fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save message.");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact submit error:", err);
      setStatus("error");
      setErrorMsg("Message can not send, Please try again.");
    }
  };

  const infoItems = [
    { icon: "📍", title: "Our Address", lines: ["Charbhuja Store", "Ahmedabad, Gujarat, India"] },
    { icon: "📞", title: "Phone / WhatsApp", lines: ["+91 74359 90900", "Mon–Sat, 9 AM – 9 PM"] },
    { icon: "✉️", title: "Email", lines: ["dhavalpra96@gmail.com", "Reply within 24 hours"] },
  ];

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-bg" />
        <div className="contact-logo-row">
          <div className="contact-logo-icon">
            <img src={Logo} alt="logo" className="w-100" />
          </div>
          <span className="contact-logo-text">CHARBHUJA STORE</span>
        </div>
        <h1 className="contact-hero-title">Contact Us</h1>
        <p className="contact-hero-sub">
          Have any questions, feedback or order inquires - We're here to help.
        </p>
      </div>

      <div className="contact-cards-row">
        {infoItems.map((item, i) => (
          <div key={i} className="contact-info-card">
            <div className="contact-info-icon-wrap">{item.icon}</div>
            <div className="contact-info-title">{item.title}</div>
            {item.lines.map((line, j) => (
              <div key={j} className="contact-info-sub">{line}</div>
            ))}
          </div>
        ))}
      </div>

      <div className="contact-form-section">
        <div className="contact-form-card">
          <h2 className="contact-section-title">Send Message</h2>
          <p className="contact-section-sub">Fill-up the form and We will reply quickly.</p>
          <hr className="contact-divider" />

          <form onSubmit={handleSubmit}>
            <div className="contact-row">
              <div className="contact-field-wrap">
                <label className="contact-label">Your Name *</label>
                <input
                  className="contact-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Like: Swati Prajapati"
                />
              </div>
              <div className="contact-field-wrap">
                <label className="contact-label">Your Email *</label>
                <input
                  className="contact-input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="xyz123@email.com"
                />
              </div>
            </div>

            <div className="contact-field-wrap">
              <label className="contact-label">Subject *</label>
              <input
                className="contact-input"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Like: Any questions, feedback or order inquires"
              />
            </div>

            <div className="contact-field-wrap">
              <label className="contact-label">Enter Your Message *</label>
              <textarea
                className="contact-textarea"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your question or feedback here..."
              />
            </div>

            <button className="contact-btn" type="submit" disabled={status === "loading"}>
              {status === "loading" ? <>⏳ Sending...</> : <>✉️ Send Message</>}
            </button>
          </form>

          {status === "success" && (
            <div className="contact-success-box">
              ✅ Your message has been successfully sent. We will reply shortly. Thank You! 🙏
            </div>
          )}
          {status === "error" && errorMsg && (
            <div className="contact-error-box">⚠️ {errorMsg}</div>
          )}
        </div>
      </div>
    </div>
  );
}