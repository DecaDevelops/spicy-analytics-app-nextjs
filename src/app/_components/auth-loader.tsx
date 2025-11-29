import { LoaderCircle } from "lucide-react";

export function AuthLoader() {
  return (
    <div className="absolute z-999 w-screen h-screen bg-black/60">
      <div className="grid w-full h-full  place-items-center">
        <div className="flex flex-col items-center justify-center">
          <span className="spinner animate-spin">
            <LoaderCircle />
          </span>
          <h1 className="text-xl">Checking if you are logged-in</h1>
          <div className="flex flex-col justify-start my-2">
            <span className="">
              If a browser opens, follow these instruction:
            </span>
            <ul className="font-bold">
              <li>1. Log in with your spicychat account</li>
              <li>2. Navigate to my chatbots</li>
              <li>3. The browser should close on its own now</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
