import React from 'react'

const Table = ({leads,markAsContacted = () => {}}) => {

    
  return (
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
                // disabled={lead.isContacted}
                onClick={(e) => { e.preventDefault(); markAsContacted(lead._id, lead.isContacted) }}
              >
                {lead.isContacted ? "Contacted" : "Mark as Contacted"}
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
  )
}

export default Table