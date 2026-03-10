import React, { useState } from "react";
import axios from "axios";
import { useLanguage } from '@/contexts/LanguageContext';

const TokenForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    landArea: "",
    email: "",
    Crop: "",
  });

  const [phone, setPhone] = useState("");
  const [statusData, setStatusData] = useState<{ status: string; allottedDate: string } | null>(null);
  const [message, setMessage] = useState("");

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for adding a new token (farmer entry)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://iiit-naya-raipur-hakathon.vercel.app/api/tokens", formData);
      setMessage(`✅ ${t("tokenAdded")}`);
      setFormData({ name: "", contact: "", landArea: "", email: "", Crop: "" });
    } catch (error) {
      setMessage(`❌ ${t("tokenError")}`);
    }
  };

  // Fetch status by phone number
  const checkStatus = async () => {
    try {
      const response = await axios.get(`https://iiit-naya-raipur-hakathon.vercel.app/api/tokens/status/${phone}`);
      setStatusData(response.data);
      setMessage("");
    } catch (error) {
      setStatusData(null);
      setMessage(`❌ ${t("noRecordFound")}`);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>🌱 {t("tokenRegistration")}</h2>

        {/* Token Registration Form */}
        <form onSubmit={handleSubmit} style={formStyle}>
          <input type="text" name="name" placeholder={t("enterName")} value={formData.name} onChange={handleChange} required style={inputStyle} />
          <input type="text" name="contact" placeholder={t("enterContactNumber")} value={formData.contact} onChange={handleChange} required style={inputStyle} />
          <input type="number" name="landArea" placeholder={t("landAreaInAcres")} value={formData.landArea} onChange={handleChange} required style={inputStyle} />
          <input type="email" name="email" placeholder={t("enterEmail")} value={formData.email} onChange={handleChange} required style={inputStyle} />
          <input type="text" name="Crop" placeholder={t("cropOptional")} value={formData.Crop} onChange={handleChange} style={inputStyle} />

          <button type="submit" style={buttonStyle}>🚜 {t("submit")}</button>
        </form>

        {message && <p style={messageStyle}>{message}</p>}

        <hr style={dividerStyle} />

        {/* Check Status by Phone Number */}
        <h3 style={headingStyle}>📞 {t("checkStatus")}</h3>
        <input type="text" placeholder={t("enterContactNumber")} value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
        <button onClick={checkStatus} style={buttonStyle}>🔍 {t("checkStatus")}</button>

        {statusData && (
          <div style={statusBoxStyle}>
            <p style={statusTextStyle}><strong style={{ color: "black" }}>{t("status")}</strong> {statusData.status}</p>
            {statusData.status === "Approved" && (
              <p style={statusTextStyle}><strong style={{ color: "black" }}>{t("allottedDate")}</strong> {new Date(statusData.allottedDate).toLocaleDateString()}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const pageStyle = {
  background: "white",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const containerStyle = {
  width: "90%",
  maxWidth: "500px",
  padding: "20px",
  background: "white",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
  textAlign: "center",
};

const headingStyle = {
  fontSize: "22px",
  color: "black",
  fontWeight: "bold",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const inputStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "16px",
  color: "black",
  background: "#f8f8f8",
};

const buttonStyle = {
  padding: "12px",
  background: "#007BFF",
  color: "white",
  fontSize: "16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.3s",
};

const messageStyle = {
  color: "black",
  textAlign: "center",
  fontWeight: "bold",
};

const dividerStyle = {
  margin: "20px 0",
  border: "1px solid #ddd",
};

const statusBoxStyle = {
  marginTop: "10px",
  padding: "10px",
  background: "#f0f0f0",
  borderRadius: "6px",
  textAlign: "center",
};

const statusTextStyle = {
  color: "black",
};

export default TokenForm;
