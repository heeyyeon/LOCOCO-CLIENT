import { Button } from "@lococo/ui/button";

export default function Home() {
  return (
    <div>
      <ol className="bg-gray-200">
        <li>
          Get started by editing <code>apps/web/app/page.tsx</code>
        </li>
        <li>Save and see your changes instantly.</li>
      </ol>
      <Button appName="web" className="bg-pink-500 w-30 h-20">
        ui 컴포넌트 핑크 버튼
      </Button>
      <Button appName="web" className="text-black">
        ui 컴포넌트 일반 버튼
      </Button>
      <Button appName="web" className="text-pink-500 w-30 h-20">
        ui 컴포넌트 핑크 버튼
      </Button>
      <Button appName="web" className="bg-blue">
        ui 컴포넌트 핑크 버튼
      </Button>
    </div>
  );
}
