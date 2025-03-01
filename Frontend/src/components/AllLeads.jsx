import { useState, useEffect, useCallback } from "react";
// import axios from "axios";

const API_URL = "http://localhost:5000/contacts";

const AllLeads = () => {
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    isContacted: false,
  });

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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add a new lead
  const addLead = useCallback(async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setLeads([...leads, { ...res }]);
      setFormData({ name: "", phoneNo: "", email: "" });
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  }, [formData, leads]);

  // Mark as contacted
  const markAsContacted = async () => {
    // try {
    //   const res = await fetch.put(${API_URL}/${id});
    //   setLeads(leads.map((lead) => (lead._id === id ? res.data : lead)));
    // } catch (error) {
    //   console.error("Error updating lead:", error);
    // }
  };

  return (
    <div className="container">
      <h1>Sales CRM</h1>

      {/* Add Lead Form */}
      {/* <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent the default form submission behavior
          addLead();
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNo"
          placeholder="Phone Number"
          value={formData.phoneNo}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Lead</button>
      </form> */}
          <form
          className="lead-form"
          onSubmit={(e) => {
            e.preventDefault();
            addLead();
          }}
        >
          <fieldset>
            <legend>Add New Lead</legend>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phoneNo"
              placeholder="Phone Number"
              value={formData.phoneNo}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <button type="submit">Add Lead</button>
          </fieldset>
        </form>
      {/* Leads List */}
      <h2>Leads</h2>
      {/* <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads
            .sort((a, b) => a.isContacted === b.isContacted ? 0 : a.isContacted ? -1 : 1) // Sorting logic
            .map((lead) => (
              <tr key={lead._id}>
                <td><strong>{lead.name}</strong></td>
                <td>{lead.phoneNo}</td>
                <td>{lead.email}</td>
                <td>
                  <button
                    disabled={lead.isContacted}
                    onClick={() => markAsContacted(lead._id)}
                  >
                    {lead.isContacted ? "Contacted" : "Mark as Contacted"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table> */}
      <table className="lead-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads
            .sort((a, b) => a.isContacted === b.isContacted ? 0 : a.isContacted ? -1 : 1) // Sorting logic
            .map((lead) => (
              <tr key={lead._id} className={lead.isContacted ? "contacted-row" : "non-contacted-row"}>
                <td className={lead.isContacted ? "contacted-text" : "non-contacted-text"}>
                  <strong>{lead.name}</strong>
                </td>
                <td className={lead.isContacted ? "contacted-text" : "non-contacted-text"}>
                  {lead.phoneNo}
                </td>
                <td className={lead.isContacted ? "contacted-text" : "non-contacted-text"}>
                  {lead.email}
                </td>
                <td>
                  <button
                    className="status-button"
                    disabled={lead.isContacted}
                    onClick={() => markAsContacted(lead._id)}
                  >
                    {lead.isContacted ? "Contacted" : "Mark as Contacted"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>


    </div>
  );
};

export default AllLeads;
