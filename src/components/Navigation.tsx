import { Code2 } from "lucide-react";
import AuthButton from "./AuthButton";
export default function Nav(){
    return (
        <nav className="bg-white shadow-sm">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex justify-between items-center h-16">
    <div className="flex items-center">
      <Code2 className="h-8 w-8 text-blue-600" />
      <span className="ml-2 text-xl font-bold text-gray-900">HackVerse</span>
    </div>
    <div className="flex items-center gap-3">
    <AuthButton />
    </div>
  </div>
</div>
</nav>
    )
}
