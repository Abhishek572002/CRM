import { useState, useEffect, useCallback } from "react";
import Table from "./Table";
import { Form } from "./Form";
// import axios from "axios";

const API_URL = "http://localhost:5000/contacts";

const AllLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    isContacted: false,
  });
  const [emailError, setEmailError] = useState("");

  // Fetch all leads
  useEffect(() => {
    const fetchLeads = async () => {

      try {

        const res = await fetch(API_URL, {
          method: "GET",
        });
        // setLeads(res.);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const allLeads = await res.json(); // Correctly parse the response
        setLeads(allLeads);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  // Handle input changes
  const handleChange = useCallback((e) => {
    if (e.target.name === 'email') {
      setEmailError('');
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }, [formData, setFormData, setEmailError]);

  // Add a new lead
  const addLead = useCallback(async () => {
    if (leads.some((lead) => lead.email === formData.email)) {
      setEmailError('This Email already exists');
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const newLead = await res.json();
      setLeads([...leads, { ...newLead }]);
      setFormData({ name: "", phoneNo: "", email: "" });
      setLoading(false);
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  }, [formData, leads, setLeads, setEmailError]);

  // Mark as contacted
  const markAsContacted = async (id, currentIsContacted) => {
    // try {
    const res = await fetch(`${API_URL}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isContacted: !currentIsContacted }),
      }
    );
    if (res.ok) {
      const updatedLeads = leads.map((lead) =>
        lead._id === id ? { ...lead, isContacted: !currentIsContacted } : lead
      );
      setLeads([...updatedLeads]);
    }


  };

  return (
    <div className="container">
      <h1>Sales CRM</h1>
      <Form 
        addLead={addLead} 
        loading={loading} 
        formData={formData} 
        handleChange={handleChange} 
        emailError={emailError} 
      />
      <h2>Leads</h2>
     <Table leads={leads} markAsContacted={markAsContacted} />
      


    </div>
  );
};

export default AllLeads;