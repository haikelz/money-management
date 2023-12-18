import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { serverSession } from "~lib/utils/server-session";

export default async function Page() {
  const session = (await serverSession()) as Session;

  if (session) return redirect("/");

  return (
    <section className="w-full flex justify-center items-center">
      <div className="w-full">
        <p>Create your account</p>
      </div>
    </section>
  );
}
