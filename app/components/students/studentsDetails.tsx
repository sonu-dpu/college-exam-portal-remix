import { StudentData } from "~/routes/students";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

function StudentDetails({ studentData }: { studentData: StudentData[] }) {
  return (
    <div className="px-5 flex justify-center mx-auto border rounded-md">
      <Table className="w-full  mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-gray-900">Id</TableHead>
            <TableHead className="font-bold text-gray-900">Name</TableHead>
            <TableHead className="font-bold text-gray-900">Email</TableHead>
            <TableHead className="font-bold text-gray-900">Course</TableHead>
            <TableHead className="font-bold text-gray-900">Semester</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentData &&
            studentData.map((student, idx) => {
              const bgColor = idx%2==0?"bg-zinc-100":""
              return (
                <TableRow className={`${bgColor} p-2`} key={student.student_id}>
                  <TableCell>{student.student_id}</TableCell>
                  <TableCell>{student.student_name}</TableCell>
                  <TableCell>{student.student_email}</TableCell>
                  <TableCell>{student.course_name}</TableCell>
                  <TableCell className="text-center">
                    {student.student_semester}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}

export default StudentDetails;
