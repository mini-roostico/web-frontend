<script>
import hljs from 'highlight.js';
import CodeEditor from "simple-code-editor";
import { ref } from "vue";
import 'highlight.js/styles/default.css';
import yaml from 'highlight.js/lib/languages/yaml';

hljs.registerLanguage('yaml', yaml);

const initialText = `
name: "My Suite"

subjects:
  - name: "Example Subject"
    content: "Hello, world!"
`;

export default {
  components: {
    CodeEditor,
  },
  setup() {
    const text = ref(initialText);

    const highlightCode = (code) => {
      // Create a new highlighting instance each time
      return hljs.highlight(code, { language: 'yaml' }).value;
    };

    return {
      text,
      highlightCode
    };
  }
};
</script>

<template>
  <div>
    <CodeEditor
      theme="androidstudio"
      :read-only="false"
      :languages="[['yaml', 'YAML']]"
      :wrap="false"
      v-model="text"
      width="100%"
      height="500px"
      :highlight="highlightCode"
    >
    </CodeEditor>
  </div>
</template>
