import { StudentData } from "~/routes/students"
type PropData={
  studentData : {
    data:StudentData[]
  }
}
function StudentDetails({studentData}:PropData) {
  console.log(studentData.data[0]);
  
  return (
    <div>StudentDetails</div>
  )
}

export default StudentDetails