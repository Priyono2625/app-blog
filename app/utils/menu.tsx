import { Link } from "@remix-run/react";


export default function menuType(type: string){
  if (type == "prio") {
    return (
      <Link to="/superadmin" className="block p-4 text-xl text-blue-500">Dashboard</Link>
    )
  }
}