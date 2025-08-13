import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { SignedIn } from "@clerk/clerk-react"
import { House, Library, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton"
import { useEffect } from "react"
import { useMusicStore } from "@/stores/useMusicStore"

const LeftLayout = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();

	useEffect(() => {
		fetchAlbums();
	}, [fetchAlbums]);

	console.log({ albums });

  return (
    <>
      <div className="bg-zinc-900/75 rounded-lg flex flex-col gap-1 py-5 pl-4">

        {/* Home Link */}
        <div className="flex gap-2 items-start">
          <Link
            to="/"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-[90%] justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <House />
            <span className="hidden md:inline">Home</span>
          </Link>
        </div>
        <SignedIn>
        {/* Messages */}
        <div className="flex gap-2 items-start">
          <Link
            to="/chat"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-[90%] justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <MessageCircle />
            <span className="hidden md:inline">Messages</span>
          </Link>
        </div>
        </SignedIn>
      </div>
      
      {/* Library section */}
			<div className='flex-1 h-[calc(100vh-180px)] rounded-lg bg-zinc-900 p-4 mt-2 '>
				<div className='flex items-center justify-between mb-4'>
					<div className='flex items-center text-white px-2'>
						<Library className='size-5 mr-2' />
						<span className='hidden md:inline'>Playlists</span>
					</div>
				</div>

				<ScrollArea className='h-[calc(100vh-300px)]'>
					<div className='space-y-2'>
						{isLoading ? (
							<PlaylistSkeleton />
						) : (
							albums.map((album) => (
								<Link
									to={`/albums/${album._id}`}
									key={album._id}
									className='p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer'
								>
									<img
										src={album.imageUrl}
										alt='Playlist img'
										className='size-12 rounded-md flex-shrink-0 object-cover'
									/>

									<div className='flex-1 min-w-0 hidden md:block'>
										<p className='font-medium truncate'>{album.title}</p>
										<p className='text-sm text-zinc-400 truncate'>Album • {album.artist}</p>
									</div>
								</Link>
							))
						)}
					</div>
				</ScrollArea>
			</div>

    </>
  )
}

export default LeftLayout
