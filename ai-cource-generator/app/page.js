import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">AI Course Generator</h1>
        <ThemeToggle />
      </div>
      <Button > hi  </Button>
    </div>
  );
}
