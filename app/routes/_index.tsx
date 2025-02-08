import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { User } from "@supabase/supabase-js";
import LogoutBtn from "~/components/logoutBtn";
import authService from "~/utils/server/auth.services";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const actionData = useLoaderData<User>();
  return (
    <div className="h-screen">
      {actionData.email}
      <Form method="post" action="/logout">
        <LogoutBtn></LogoutBtn>
      </Form>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { user, headers } = await authService.checkUserSession(request);
  if (!user) {
    return redirect("/login");
  }
  return Response.json(user, { headers });
}
