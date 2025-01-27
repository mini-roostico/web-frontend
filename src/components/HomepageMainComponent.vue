<script setup>
import CodeEditor from 'simple-code-editor'
import { onMounted, ref } from 'vue'
import 'highlight.js/styles/default.css'
import yaml from 'highlight.js/lib/languages/yaml'
import hljs from 'highlight.js'
import { EventBus } from '@/scripts/EventBus.ts'
import { AuthService } from '@/scripts/AuthService.ts'

hljs.registerLanguage('yaml', yaml)
const isLogged = ref(AuthService.isAuthenticated())
const yamlText = ref(
  `name: "Home page suite"

macros:
  - def: my_macro(arg)
    bodies:
    - "Hello \${{ arg }}!"
    - "Goodbye \${{ arg }}!"

parameters:
  - name: my_number
    values:
    - "1"
    - "2"

subjects:
  - name: "MySubject-\${{ my_number }}"
    code: |-
      From subject MySubject
      {{ my_macro(my_number) }}
      End of subject`,
)

const highlightCode = (code) => {
  return hljs.highlight(code, { language: 'yaml' }).value
}

function refreshButton() {
  isLogged.value = AuthService.isAuthenticated()
}

onMounted(() => {
  EventBus.$on('refresh-navbar', () => {
    refreshButton()
  })
})
</script>

<template>
  <div class="text-white min-h-screen flex flex-col items-center">
    <header class="py-6 text-center mt-4">
      <img
        src="@/assets/logo.png"
        alt="Subjekt logo"
        class="logo mx-auto mb-5"
        style="max-width: 450px"
      />
    </header>

    <main class="w-full px-4 md:px-8 flex-grow flex flex-col items-center">
      <div class="card shadow-lg rounded-2xl w-full p-6">
        <div class="row p-2">
          <div class="p-4 col mb-3">
            <h5 class="text-lg font-semibold mb-2 text-white">YAML Configuration</h5>
            <CodeEditor
              theme="vs2015"
              :read-only="true"
              :languages="[['yaml', 'YAML']]"
              :wrap="false"
              v-model="yamlText"
              width="100%"
              height="100%"
              :highlight="highlightCode"
            ></CodeEditor>
          </div>
          <div class="p-4 col justify-center text-center">
            <h5 class="text-lg font-semibold mb-2 text-white">Results</h5>

            <div class="row m-4">
              <div class="card rounded-2xl result-card">
                <div class="card-body">
                  <h5 class="card-title">MySubject-1</h5>
                  <p class="card-text">
                    From subject MySubject<br />
                    Hello 1!<br />
                    End of subject
                  </p>
                </div>
              </div>
            </div>
            <div class="row m-4">
              <div class="card rounded-2xl result-card">
                <div class="card-body">
                  <h5 class="card-title">MySubject-2</h5>
                  <p class="card-text">
                    From subject MySubject<br />
                    Hello 2!<br />
                    End of subject
                  </p>
                </div>
              </div>
            </div>
            <div class="row m-4">
              <div class="card rounded-2xl result-card">
                <div class="card-body">
                  <h5 class="card-title">MySubject-1</h5>
                  <p class="card-text">
                    From subject MySubject<br />
                    Goodbye 1!<br />
                    End of subject
                  </p>
                </div>
              </div>
            </div>
            <div class="row m-4">
              <div class="card rounded-2xl result-card">
                <div class="card-body">
                  <h5 class="card-title">MySubject-2</h5>
                  <p class="card-text">
                    From subject MySubject<br />
                    Goodbye 2!<br />
                    End of subject
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <router-link :to="isLogged ? '/sources' : '/login'" custom> </router-link>
      </div>
    </main>
    <footer class="w-full m-4 p-6">
      <div class="card shadow-lg rounded-2xl w-full text-white text-start">
        <h3 class="text-lg font-bold mt-3 mb-2 p-4">
          {{ isLogged ? 'Go generate now!' : 'Join Subjekt now' }}
        </h3>
        <div class="card-body flex justify-center space-x-4 p-6">
          <router-link
            v-if="!isLogged"
            to="/register"
            class="btn btn-primary px-6 m-2 rounded-lg shadow hover:shadow-lg transition"
          >
            Sign Up
          </router-link>
          <router-link
            v-if="!isLogged"
            to="/login"
            class="btn btn-primary px-6 m-2 rounded-lg shadow hover:shadow-lg transition"
          >
            Sign In
          </router-link>
          <router-link
            v-if="!isLogged"
            to="/about"
            class="btn btn-secondary px-6 m-2 rounded-lg shadow hover:shadow-lg transition"
          >
            Learn More
          </router-link>
          <router-link
            v-else
            to="/sources"
            class="btn btn-primary px-6 m-2 rounded-lg shadow hover:shadow-lg transition"
          >
            Generate
          </router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.btn-primary {
  background-color: #cf29ab;
  border-color: #cf29ab;
}

.btn-primary:hover {
  background-color: #c226a0;
}

.btn-secondary {
  background-color: #4a4a4a;
  border-color: #4a4a4a;
  color: #ffffff;
}

.btn-secondary:hover {
  background-color: #5a5a5a;
}

.logo {
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.card {
  background-color: #1a1a1a;
  border: none;
}

.result-card {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.95);
}

footer {
  min-height: 100px;
}
</style>
