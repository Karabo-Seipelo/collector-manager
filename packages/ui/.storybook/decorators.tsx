import type { Decorator } from "@storybook/react-vite";

export function withWidth(width: string): Decorator {
  return (Story) => (
    <div style={{ width }}>
      <Story />
    </div>
  );
}
