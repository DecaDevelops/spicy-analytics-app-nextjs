import { BatteryWarningIcon, LoaderCircle, Meh } from "lucide-react";
type props = {
  NotLoggedIn?: true;
};
export function AuthLoader({ NotLoggedIn }: props) {
  if (NotLoggedIn) {
    return (
      <div className="absolute z-999 w-screen h-screen bg-black/60">
        <div className="w-screen h-screen grid place-items-center my-2">
          <div>
            <div className="flex flex-col items-center">
              <span>
                <Meh size={96} />
              </span>
              <h1 className="text-4xl">
                Hmm... it appears you are not logged in
              </h1>
            </div>
            <h1 className="text-center text-xl font-bold">
              If a browser opens, follow these instruction:
            </h1>
            <ul className="font-bold text-center">
              <li>1. Log in with your spicychat account</li>
              <li>2. Navigate to my chatbots</li>
              <li>3. The browser should close on its own now</li>
              <li>4. refresh the page</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute z-999 w-screen h-screen bg-black/60">
      <div className="grid w-full h-full  place-items-center">
        <div className="flex flex-col items-center justify-center">
          <span className="spinner animate-spin">
            <LoaderCircle />
          </span>
          <h1 className="text-xl">Checking if you are logged-in</h1>
        </div>
      </div>
    </div>
  );
}
