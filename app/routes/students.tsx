import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import StudentDetails from "~/components/students/studentsDetails";
import authService from "~/utils/server/auth.services";
import dbService from "~/utils/server/db.services";
export type StudentData = {
  id: string;
  name: string;
  email: string;
  semester: 4;
  course_id:string;
  user_id: null;
};
function Students() {
  const studentData = useLoaderData<{data:StudentData[]}>();
  console.log(studentData);
  return (
    <div>
      Students
      <StudentDetails studentData={studentData} />
    </div>
  );
}

export default Students;

export async function loader({ request }: LoaderFunctionArgs) {
  const { user } = await authService.checkUserSession(request);
  if (!user) {
    return redirect("/login");
  }
  const result = await dbService.getTableData(request, "students");
  if (result.error) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: result.status,
    });
  }
  const {data} = result;
   return Response.json({data});
}
