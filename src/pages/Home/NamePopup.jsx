import React from "react";
import TextInput from "../../components/TextInput";
import "./styles/NamePopup.css";
import Button from "../../components/Button";

function NamePopup(props) {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = React.useState({
    firstName: "",
    lastName: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((oldFormData) => ({
      ...oldFormData,
      [name]: value,
    }));

    setErrors((oldErrors) => ({
      ...oldErrors,
      [name]: "",
    }));
  }

  console.log(formData);
  console.log("Errors", errors);

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.firstName) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        firstName: "Please enter your first name",
      }));
    } else if (!formData.lastName) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        lastName: "Please enter your last name",
      }));
    } else {
      props.onSubmit(formData.firstName, formData.lastName);
    }
  }

  return (
    <div className="name-popup">
      <h1 className="title">One last thing...</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          title="First name"
          error={errors.firstName}
        />
        <TextInput
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          title="Last name"
          error={errors.lastName}
        />
        <Button
          text="Submit"
          type="accent"
          bold={true}
          styles={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          }}
        />
      </form>
    </div>
  );
}

export default NamePopup;
