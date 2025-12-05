import { compileMarkdown } from '$lib/server/content';
import type { PageServerLoad } from './$types';

const testMarkdown = `
# Test Markdown Rendering

This is a **test** to see if markdown is properly rendered.

## Features

- **Bold text**
- *Italic text*  
- \`Inline code\`
- [Links](https://example.com)

### Lists

1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3

### Blockquotes

> This is a blockquote
> It can span multiple lines

### Code blocks

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`
`;

export const load: PageServerLoad = async () => {
  const compiledContent = await compileMarkdown(testMarkdown);
  return { compiledContent };
};
