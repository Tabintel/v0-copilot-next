"use client";
import { useState } from "react";
import {
  CopilotTask,
  
  useCopilotContext,
  useMakeCopilotReadable,
} from "@copilotkit/react-core";
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
import { Input } from "@/components/ui/input";

export default function Home() {
  const [code, setCode] = useState<string[]>([
    `<h1 class="text-red-500">Hello World</h1>`,
  ]);
  const [codeToDisplay, setCodeToDisplay] = useState<string>(code[0] || "");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [codeCommand, setCodeCommand] = useState<string>("");

  const readableCode = useMakeCopilotReadable(codeToDisplay);

  const generateCode = new CopilotTask({
    instructions: codeCommand,
    actions: [
      {
        name: "generateCode",
        description: "Create Code Snippet with React.js, tailwindcss.",
        parameters: [
          {
            name: "code",
            type: "string",
            description: "Code to be generated",
            required: true,
          },
        ],
        handler: async ({ code }) => {
          setCode((prev) => [...prev, code]);
          setCodeToDisplay(code);
        },
      },
    ],
  });

  const context = useCopilotContext();
  
  return (
    <>
      <main className="bg-white min-h-screen px-4">
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
            <PreviewScreen html_code={codeToDisplay || ""} />
          </div>
        </div>
        <div className="w-8/12 mx-auto p-1 rounded-full bg-primary flex my-4 outline-0">
          <Input
            type="text"
            placeholder="Enter your code command"
            className="w-10/12 p-6 rounded-l-full  outline-0 bg-primary text-white"
            value={codeCommand}
            onChange={(e) => setCodeCommand(e.target.value)}
          />
          <button
            className="w-2/12 bg-white text-primary rounded-r-full"
            onClick={() => generateCode.run(context)}
          >
            Generate
          </button>
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
              {readableCode}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}