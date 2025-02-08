import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import StudentDetails from "~/components/students/studentsDetails";
import { CardHeader, CardTitle } from "~/components/ui/card";
import authService from "~/utils/server/auth.services";
import dbService from "~/utils/server/db.services";
export type StudentData = {
  student_id: string;
  student_name: string;
  student_email: string;
  student_semester: string;
  course_name: string;
};
function Students() {
  const studentData = useLoaderData<{ data: StudentData[] }>();
  return (
    <div>
      <CardHeader><CardTitle>Students</CardTitle></CardHeader>
      <StudentDetails studentData={studentData.data} />
    </div>
  );
}

export default Students;



export async function loader({ request }: LoaderFunctionArgs) {
  const { user } = await authService.checkUserSession(request);
  if (!user) {
    return redirect("/login");
  }
  const { data, error } = await dbService.getDB(request).from("students")
    .select(`
    student_id:id,
    student_name:name,
    student_email:email,
    student_semester:semester,
    ...courses!inner(
      course_name:name
    )
  `);

  if (error) {
    return Response.json({ error }, { status: 401 });
  }
  return Response.json({ data });
}
