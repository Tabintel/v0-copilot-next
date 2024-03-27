"use client";
import { useState } from "react";
import { useCopilotAction } from "@copilotkit/react-core";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import PreviewScreen from "@/components/preview-screen";

export default function Home() {
  const [code, setCode] = useState<string[]>([
    `<h1 class="text-red-500">Hello World</h1>`,
  ]);
  const [codeToDisplay, setCodeToDisplay] = useState<string>(code[0] || "");
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useCopilotAction({
    name: "generateCode",
    description: "Create Code Snippet in React.js",
    parameters: [
      {
        name: "code",
        type: "string",
        description: "Code to be generated",
      },
    ],
    handler: async (params) => {
      setCode((prev) => [...prev, params.code]);
      setCodeToDisplay(params.code);
    }
  });

  return (
    <>
      <main className="bg-white min-h-screen text-black px-4">
        <Header openCode={() => setShowDialog(true)} />
        <div className="w-full h-full min-h-[70vh] flex justify-between gap-x-1 ">
          <Sidebar>
            <div className="space-y-2">
              {code.map((c, i) => (
                <div
                  key={i}
                  className="w-full h-20 p-1 rounded-md bg-white border border-blue-600"
                  onClick={() => setCodeToDisplay(c)}
                >
                  v{i}
                </div>
              ))}
            </div>
          </Sidebar>

          <div className="w-10/12">
            <PreviewScreen html_code={codeToDisplay} />
          </div>
        </div>
      </main>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Code.</DialogTitle>
            <DialogDescription>
              You can use the following code to start integrating into your
              application.
            </DialogDescription>
            <div className="p-4 rounded bg-primary text-white my-2">
              {codeToDisplay}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
