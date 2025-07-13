import ProjectPage from '@/components/ProjectPage';
import TopBar from '@/components/TopBar';

const page = () => {


  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden bg-gradient-to-br from-blue-100 to-white  ">
      <TopBar />
      <ProjectPage />
    </div>
  )
}

export default page