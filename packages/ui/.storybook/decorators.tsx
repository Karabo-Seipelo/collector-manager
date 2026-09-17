import type { Decorator } from "@storybook/react-vite";

export function withWidth(width: string): Decorator {
  const WithWidth: Decorator = (Story, context) => (
    <div style={{ width }}>
      <Story {...context.args} />
    </div>
  );

  return WithWidth;
}
