function StudentList({ students, deleteStudent }) {
  if (students.length === 0) {
    return <p>No students registered yet.</p>;
  }

  return (
    <div>
      {students.map((student) => (
        <div className="card" key={student.id}>
          <h3>{student.name}</h3>
          <p>{student.course}</p>

          <button onClick={() => deleteStudent(student.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default StudentList;