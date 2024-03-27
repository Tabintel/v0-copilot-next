"use client"
import { CopilotTextarea } from "@copilotkit/react-textarea";
import { useState } from "react";

export function CopilotTextareaComponent() {
  const [text, setText] = useState("");

  return (
    <div className="size-[700px] my-4">
      <CopilotTextarea
        className="px-4 py-4"
        value={text}
        onValueChange={(value: string) => setText(value)}
        placeholder="What are your plans for your vacation?"
        autosuggestionsConfig={{
          textareaPurpose: "Travel notes from the user's previous vacations. Likely written in a colloquial style, but adjust as needed.",
          chatApiConfigs: {
            suggestionsApiConfig: {
              forwardedParams: {
                max_tokens: 20,
                stop: [".", "?", "!"],
              },
            },
          },
        }}
      />
    </div>
  );
}
