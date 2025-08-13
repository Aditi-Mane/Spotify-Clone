import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftLayout from "./components/LeftLayout"
import FriendsActivity from "./components/FriendsActivity"
import AudioPlayer from "./components/AudioPlayer"


const MainLayout = () => {
  const isMobile=false
  return (
    
    <ResizablePanelGroup direction={"horizontal"} className="flex-1 flex overflow-hidden h-full p-2">
      <AudioPlayer/>
      <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10 } maxSize={30}>
        <LeftLayout/>
      </ResizablePanel>

      <ResizableHandle className="w-2 bg-black rounded-lg transition-colors"/>

      <ResizablePanel defaultSize={isMobile? 80 : 60}>
        <Outlet/>
      </ResizablePanel>

      <ResizableHandle className="w-2 bg-black rounded-lg transition-colors"/>

      <ResizablePanel defaultSize={20} minSize={0} maxSize={30} collapsedSize={0}>
        <FriendsActivity/>
      </ResizablePanel>

    </ResizablePanelGroup>
  )
}

export default MainLayout
