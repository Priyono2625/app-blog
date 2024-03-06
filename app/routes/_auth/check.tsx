import { redirect } from "@remix-run/node";

import { useUser } from "~/utils";

export default function MenujuMenu(){
  const user = useUser();
  
  if (user.type == "prio") {
    return redirect("/superadmin")
  }
  if (user.type == "umum") {
    return redirect("/notes")
  }
}