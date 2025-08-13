import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { useAuthStore } from "@/stores/useAuthStore";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const Topbar = () => {
  const {admin} = useAuthStore();
  console.log({ admin })
  return (
    <>
    <div className="topbar top-0 flex items-center justify-between px-4 py-3.5 sticky bg-zinc-900/75">
     
      <div className="left_topbar flex gap-1 items-center justify-center">
        <img width="30px" src="/logo.png" alt="Spotify_logo"/>
        <div className="text-1.5xl">Spotify</div>
      </div>
      <div className='flex items-center gap-4'>
				{admin && (
					<Link to={"/admin"} className={cn(buttonVariants({ variant: "outline" }))}>
						<LayoutDashboardIcon className='size-4  mr-2' />
						Admin Dashboard
					</Link>
				)}
        
        <SignedOut>
          <GoogleLogin/>
        </SignedOut>

        <UserButton/>
      </div>
    </div>
    </>
  )
}

export default Topbar
