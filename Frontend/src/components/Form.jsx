import React from 'react'

export const Form = ({
    addLead,
    loading,
    formData,
    handleChange,
    emailError
}) => {
  return (
    <form
    className="lead-form"
    onSubmit={(e) => {
      e.preventDefault();
      addLead();
    }}
  >
    <fieldset>
      <legend className="lead-form-legend">Add New Lead</legend>

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
      <p>{emailError && <span className="error-message">{emailError}</span>}</p>
      <button loading={loading} type="submit">{loading?"Adding Lead...":"Add Lead"}</button>
    </fieldset>
  </form>
  )
}