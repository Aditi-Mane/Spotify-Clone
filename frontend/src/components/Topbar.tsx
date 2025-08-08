import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

const Topbar = () => {
  const admin = false;
  return (
    <>
    <div className="topbar border-2 top-0 flex items-center justify-between p-4 sticky rounded-[5px] bg-zinc-900/75">
     
      <div className="left_topbar flex gap-1 items-center justify-center">
        <img width="30px" src="/logo.png" alt="Spotify_logo"/>
        <div className="text-1.5xl">Spotify</div>
      </div>
      <div className="right_topbar">
        {admin && (
          <Link to={"/admin"}>
            <LayoutDashboardIcon className="size-4 border-4 mr-2"/>
            Admin Dashboard
          </Link>
        )}
        <SignedIn>
          <SignOutButton/>
        </SignedIn>
        <SignedOut>
          <GoogleLogin/>
        </SignedOut>
      </div>
    </div>
    </>
  )
}

export default Topbar
