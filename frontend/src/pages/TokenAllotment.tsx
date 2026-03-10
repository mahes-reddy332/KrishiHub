import React, { useState } from "react";
import axios from "axios";
import { useLanguage } from '@/contexts/LanguageContext';

const TokenAllotment: React.FC = () => {
  const { t } = useLanguage();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [phone, setPhone] = useState("");
  const [allottedDate, setAllottedDate] = useState("");
  const [status, setStatus] = useState("Approved");
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle updating the token status and allotted date
  const handleUpdate = async () => {
    if (credentials.username !== "admin" || credentials.password !== "admin") {
      setMessage(`❌ ${t("accessDenied")}`);
      return;
    }
  
    try {
      await axios.put("https://iiit-naya-raipur-hakathon.vercel.app/api/tokens/update", {
        phone,
        allottedDate,  // Ensure this matches backend field "Alloteddate"
      });
  
      setMessage(`✅ ${t("statusUpdated")}`);
      setPhone("");
      setAllottedDate("");
    } catch (error) {
      setMessage(`❌ ${t("tokenUpdateError")}`);
    }
  };
  

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>📅 {t("tokenAllotment")}</h2>

        {/* Admin Login */}
        <input type="text" name="username" placeholder={t("adminUsername")} value={credentials.username} onChange={handleInputChange} style={inputStyle} />
        <input type="password" name="password" placeholder={t("adminPassword")} value={credentials.password} onChange={handleInputChange} style={inputStyle} />

        <hr style={dividerStyle} />

        {/* Token Update Form */}
        <input type="text" placeholder={t("farmersPhone")} value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
        <input type="date" value={allottedDate} onChange={(e) => setAllottedDate(e.target.value)} style={inputStyle} />
        
        <button onClick={handleUpdate} style={buttonStyle}>✅ {t("updateStatus")}</button>

        {message && <p style={messageStyle}>{message}</p>}
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
  maxWidth: "400px",
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

const inputStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "16px",
  color: "black",
  background: "#f8f8f8",
  width: "100%",
  marginBottom: "10px",
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
  width: "100%",
};

const messageStyle = {
  color: "black",
  textAlign: "center",
  fontWeight: "bold",
  marginTop: "10px",
};

const dividerStyle = {
  margin: "20px 0",
  border: "1px solid #ddd",
};

export default TokenAllotment;
