# @thienguyen-ui

`https://www.npmjs.com/package/thienguyen-ui`

A modern UI library for React, built with Tailwind CSS and TypeScript.

## Installation

```bash
npm install thienguyen-ui
# or
yarn add thienguyen-ui
```

## Components

### Button

A versatile Button component with multiple variants and sizes.

```tsx
import { Button } from "thienguyen-ui";

<Button variant="primary" size="md">
  Click me
</Button>;
```

### Input

A flexible Input component with validation support and customizable styling.

```tsx
import { Input } from "thienguyen-ui";

<Input
  placeholder="Enter your name"
  onChange={(e) => console.log(e.target.value)}
/>;
```

### Select

A Select component with search functionality and custom styling options.

```tsx
import { Select } from "thienguyen-ui";

<Select
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ]}
  onChange={(value) => console.log(value)}
/>;
```

### Popover

A customizable Popover component with position control and content flexibility.

```tsx
import { Popover } from "thienguyen-ui";

<Popover content="Popover content" placement="top">
  <Button>Hover me</Button>
</Popover>;
```

### Tooltip

A simple and easy-to-use Tooltip component.

```tsx
import { Tooltip } from "thienguyen-ui";

<Tooltip content="Tooltip content">
  <span>Hover me</span>
</Tooltip>;
```

### Portal

A Portal component for rendering content outside the current DOM tree.

```tsx
import { Portal } from "thienguyen-ui";

<Portal>
  <div>Portal content</div>
</Portal>;
```

## Requirements

- React >= 18.0.0
- React DOM >= 18.0.0
- Tailwind CSS >= 3.0.0

## License

MIT © [Thien Nguyen](https://github.com/thiennh2298)
