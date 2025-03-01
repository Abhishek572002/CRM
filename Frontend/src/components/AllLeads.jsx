import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/contacts";

function AllLeads() {
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({ name: "", phoneNo: "", email: "" });

  // Fetch all leads
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get(API_URL);
        setLeads(res.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };
    fetchLeads();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add a new lead
  const addLead = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, { ...formData, isContacted: false });
      setLeads([...leads, res.data]);
      setFormData({ name: "", phoneNo: "", email: "" });
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  };

  // Mark as contacted
  const markAsContacted = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`);
      setLeads(leads.map((lead) => (lead._id === id ? res.data : lead)));
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  return (
    <div className="container">
      <h1>Sales CRM</h1>

      {/* Add Lead Form */}
      <form onSubmit={addLead}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <button type="submit">Add Lead</button>
      </form>

      {/* Leads List */}
      <h2>Leads</h2>
      <ul>
        {leads.map((lead) => (
          <li key={lead._id}>
            <strong>{lead.name}</strong> - {lead.phoneNo} - {lead.email}
            <button disabled={lead.isContacted} onClick={() => markAsContacted(lead._id)}>
              {lead.isContacted ? "Contacted" : "Mark as Contacted"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllLeads;
