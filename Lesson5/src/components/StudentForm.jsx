import { useState } from "react";

function StudentForm({ addStudent }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "" || course.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    addStudent({
      id: Date.now(),
      name,
      course,
    });

    setName("");
    setCourse("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <button type="submit">
        Add Student
      </button>
    </form>
  );
}

export default StudentForm;