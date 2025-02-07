## [1.3.1](https://github.com/mini-roostico/web-frontend/compare/1.3.0...1.3.1) (2025-02-07)

### Dependency updates

* **deps:** update dependency vite to v6.1.0 ([335a131](https://github.com/mini-roostico/web-frontend/commit/335a1317fca8f396007e712a8cc8304889b01189))
* **deps:** update eslint monorepo to v9.19.0 ([9f8ba96](https://github.com/mini-roostico/web-frontend/commit/9f8ba96ccde696b164db4892de5e1252cbb8b0cd))

### Bug Fixes

* **deps:** update dependency highlight.js to v11.11.1 ([b0fc65a](https://github.com/mini-roostico/web-frontend/commit/b0fc65a768a3e4726af2ad582565c7c87b0b0932))

### Refactoring

* added endpoints to nginx and replaced them inside globals.ts ([7b30416](https://github.com/mini-roostico/web-frontend/commit/7b304168eb9929341c90794c8530ca9c0697480a))

## [1.3.0](https://github.com/mini-roostico/web-frontend/compare/1.2.0...1.3.0) (2025-02-01)

### Features

* updated footer and AboutView.vue ([ffd3db6](https://github.com/mini-roostico/web-frontend/commit/ffd3db6419a82ac603e1d84f8c448e94900c5568))

### Bug Fixes

* fixed incorrect alert type ([cdf5d72](https://github.com/mini-roostico/web-frontend/commit/cdf5d72f19686e717c13c37b05e1680691c60292))
* fixed page not warning for unsaved changes when adding values through forms ([8d55047](https://github.com/mini-roostico/web-frontend/commit/8d55047b59abbc6b170a236b47f2b74236ef26d2))

### Documentation

* added documentation inside components files ([fc91eaa](https://github.com/mini-roostico/web-frontend/commit/fc91eaa7140f93d7ac1ed4c133bb40146d53e9a7))
* added documentation inside secondary files ([2ca39ab](https://github.com/mini-roostico/web-frontend/commit/2ca39ab9361037caf2412b772f5023457744293a))
* added documentation inside views ([e194f86](https://github.com/mini-roostico/web-frontend/commit/e194f8625568ccefbaa7fea2b7c18b08cd65c2b7))
* corrected spelling mistake ([6aac6d1](https://github.com/mini-roostico/web-frontend/commit/6aac6d1994b8aa8cbec937c97bae7047e98a0780))

### Refactoring

* changed YamlEditor.vue default theme ([2327bb2](https://github.com/mini-roostico/web-frontend/commit/2327bb242a914954bbb9c27ad30925e4d3859e36))
* extracted alert type to utils.ts ([5a0c6ac](https://github.com/mini-roostico/web-frontend/commit/5a0c6acf611c42401165f99cdbdf26431af98e6e))
* extracted interfaces related to the model to model.ts ([43eead7](https://github.com/mini-roostico/web-frontend/commit/43eead79d8e07991a59de942756680fc7e20df09))
* made the alert disappear on a successful generation ([be7e585](https://github.com/mini-roostico/web-frontend/commit/be7e585e5cf13dbf154e4e70f8f8ea095ce52f18))
* moved files from 'scripts' to 'commons' ([f38ae5f](https://github.com/mini-roostico/web-frontend/commit/f38ae5f24ffe2e3d4de197c201928620072bb6e8))
* refactored alert inside SuiteView.vue using new component ([5d6fad0](https://github.com/mini-roostico/web-frontend/commit/5d6fad0a75271b1a36915d0058e60a833c4c51e8))
* switched using AlertComponent inside Login and Sources views ([d3b1533](https://github.com/mini-roostico/web-frontend/commit/d3b15334ae330dca807805a9a38c6c6ed1c29024))

## [1.2.0](https://github.com/mini-roostico/web-frontend/compare/1.1.0...1.2.0) (2025-01-31)

### Features

* added a simple download button ([82b8032](https://github.com/mini-roostico/web-frontend/commit/82b8032ddfdeb9c79d4a79410dc33f326bf5b0cf))
* added simple saving guard for suite editor ([8a11767](https://github.com/mini-roostico/web-frontend/commit/8a117678a0d682466bfd1bae64c7cc35cbf45d24))
* added source saving and generation capabilities (first version) ([1b1165e](https://github.com/mini-roostico/web-frontend/commit/1b1165e8b94dc677e097f7ab5a51de18e8961c66))
* implemented a simple result display system that switches between text and code format ([c8dd5ad](https://github.com/mini-roostico/web-frontend/commit/c8dd5ad3b31e1da53edef7a880bdbede7fa985df))
* implemented an initial sourceStore with placeholders ([a4f5e02](https://github.com/mini-roostico/web-frontend/commit/a4f5e020d5ecd03936827e070f1ceb949cea74d6))
* introduced working generation and saving into SuiteView.vue ([7b04a6f](https://github.com/mini-roostico/web-frontend/commit/7b04a6f971fbfa687f8b574e454e289b9adf3071))
* started skeleton for sources store ([3e5793e](https://github.com/mini-roostico/web-frontend/commit/3e5793e6cb2cc65b60fabcde42e143a05b0ca01f))

### Bug Fixes

* fixed graph bug not re-arranging elements after first generation ([5031436](https://github.com/mini-roostico/web-frontend/commit/5031436742de43af390339fbe2cd4c681e273b27))
* fixed parameter to layoutGraph function ([ab5c96a](https://github.com/mini-roostico/web-frontend/commit/ab5c96add96c0785f77eae0fe3f2d44d78896fbf))

### Build and continuous integration

* temporarily added subjekt to test generations ([efe5da9](https://github.com/mini-roostico/web-frontend/commit/efe5da95110d7b1b6f6c46a7347833aebaf60ab1))
* updated subjekt version ([3bb054b](https://github.com/mini-roostico/web-frontend/commit/3bb054bcee579c506e77b9bc208a91c8b7a8c06f))
* updated tsconfig.json causing problems with '@' imports ([9d263be](https://github.com/mini-roostico/web-frontend/commit/9d263be9ef7f132d023ee8f27ad142fa5bcf1945))

### General maintenance

* deleted unused file ([70be57b](https://github.com/mini-roostico/web-frontend/commit/70be57b8fb319a8c7c2ff2eca44a687ea9f65d0e))
* removed log ([44f9809](https://github.com/mini-roostico/web-frontend/commit/44f9809ed58675d320351b54055e45e32f1a8a2d))

## [1.1.0](https://github.com/mini-roostico/web-frontend/compare/1.0.1...1.1.0) (2025-01-28)

### Features

* imported files from old project ([9daa2fe](https://github.com/mini-roostico/web-frontend/commit/9daa2fe98894aee26fc51d4c2b0a834cdba50dc3))
* switched to new authentication system using stores ([068c265](https://github.com/mini-roostico/web-frontend/commit/068c2659b93132f51713bc0019efe1a6c67ab6b0))

### Build and continuous integration

* added pinia and axios ([c544c8b](https://github.com/mini-roostico/web-frontend/commit/c544c8bcd85aafefa833dd99a1bc588e41c4898b))

## [1.0.1](https://github.com/mini-roostico/web-frontend/compare/1.0.0...1.0.1) (2025-01-28)

### Bug Fixes

* fixed suite name not being correlated between editors in SuiteView.vue ([b88b12c](https://github.com/mini-roostico/web-frontend/commit/b88b12cc68fd1ae802211c14a25f99612c5cf124))

### Build and continuous integration

* added typescript ([583de1c](https://github.com/mini-roostico/web-frontend/commit/583de1c7890b4362d2c9b0289276723458b93923))
* configured eslint for typescript and vue ([5ff4866](https://github.com/mini-roostico/web-frontend/commit/5ff48661f39280709e0211b857fa67669d10769a))

### General maintenance

* deleted unused components ([1f9bd09](https://github.com/mini-roostico/web-frontend/commit/1f9bd09c4182800892dcfc56e70839b0d37293f8))

### Style improvements

* fixed style issues inside components ([e6df98e](https://github.com/mini-roostico/web-frontend/commit/e6df98e0545c6f4a49a21a9879d67be59a9b0315))

### Refactoring

* converted main components to typescript ([1658de9](https://github.com/mini-roostico/web-frontend/commit/1658de952d9c7682138edfb2338a34460b4c8d2a))
* converted main js files to ts ([4604da7](https://github.com/mini-roostico/web-frontend/commit/4604da7da1eb68d1a680c7a37aa4001e077fe4b4))
* converted view files to TypeScript ([8933ae8](https://github.com/mini-roostico/web-frontend/commit/8933ae8f4470967fde115d8339375891603f2814))

## 1.0.0 (2025-01-26)

### Features

* added alert to SourcesView.vue ([3acfc88](https://github.com/mini-roostico/web-frontend/commit/3acfc88898d6ebc954444cf1070dc87140779f5a))
* added an alert and extracted suite name form ([76c2d99](https://github.com/mini-roostico/web-frontend/commit/76c2d992b2b764d988f822d86ee8c1bc53a46919))
* added details on the main page ([fa3f91d](https://github.com/mini-roostico/web-frontend/commit/fa3f91d67cd47b768d49f63fc66bf4bdf2c8d3a4))
* added files created with vue-create ([a4bee24](https://github.com/mini-roostico/web-frontend/commit/a4bee24f6949e77bed8c29fc5747c8f8312a4999))
* added files from old project ([4ba3265](https://github.com/mini-roostico/web-frontend/commit/4ba3265cab2719afc34e0163771716e9ec1fe83a))
* added forms to generation page ([92bb2e4](https://github.com/mini-roostico/web-frontend/commit/92bb2e49ee34997b869a03be19e7c7eb53338fc1))
* added generation data extraction from SuiteForms.vue and dynamic YAML generation ([5092507](https://github.com/mini-roostico/web-frontend/commit/509250720f7102175be2d2b821166b5863cfd9d8))
* added GraphViewer.vue to show the generation graph on the generation page ([cd56740](https://github.com/mini-roostico/web-frontend/commit/cd5674034e5b110d78a2d5e89dd99c0a203a251d))
* added loading system to the generation ([ca71dfd](https://github.com/mini-roostico/web-frontend/commit/ca71dfd0f7eee81c7e8aea5b8fc0dad0039d5e43))
* added login requirement to SourcesView.vue ([e561927](https://github.com/mini-roostico/web-frontend/commit/e561927c064cfad9cf7700aaf6846f5eee3a573b))
* added placeholder for registration logic ([0492789](https://github.com/mini-roostico/web-frontend/commit/0492789bb484b70ce17c30bd3dbea3e0898fd972))
* added simple login system using cookies and localStorage ([822a14f](https://github.com/mini-roostico/web-frontend/commit/822a14ffa99438b02f3d414c557191f366b9252e))
* added simple password equality check ([a8c406f](https://github.com/mini-roostico/web-frontend/commit/a8c406f438688c19f53087c30a14f0283b4bd9a2))
* added source creation modal inside SourcesView.vue ([6d1ff48](https://github.com/mini-roostico/web-frontend/commit/6d1ff489542749df5c31b3b2379035d3f7dd7f9e))
* added temporary registration logic placeholder ([156175b](https://github.com/mini-roostico/web-frontend/commit/156175b9fef9b921fe70d8e595a01f31d7de952f))
* created functional navbar dropdown that depends on the login status ([6471d33](https://github.com/mini-roostico/web-frontend/commit/6471d330581bf520c4ea289408320da7af46d79c))
* implemented simple modal to handle confirmation of actions inside SourcesView.vue ([99d47af](https://github.com/mini-roostico/web-frontend/commit/99d47af901d37aa5c4367884a663ff480dc3e3a4))
* implemented YAML parsing error fallback ([a6b5bae](https://github.com/mini-roostico/web-frontend/commit/a6b5bae9acf57a6804a9358cfc03c397db9945ca))
* improved footer floating in short pages ([372a408](https://github.com/mini-roostico/web-frontend/commit/372a408843ebcf86b3257f4ecc4b377ce8ddcd19))
* improved home page ([1b6286b](https://github.com/mini-roostico/web-frontend/commit/1b6286b28952b3e9bd953f9bbf7f3389a854837c))
* simple login/register page ([bd8302e](https://github.com/mini-roostico/web-frontend/commit/bd8302ef905554136245b5ee1e47d352168f4848))
* simple sources page ([35113f9](https://github.com/mini-roostico/web-frontend/commit/35113f9bea8a0fcea3dd287f282552914f491df3))
* started working on the Generation page ([b6ba5ff](https://github.com/mini-roostico/web-frontend/commit/b6ba5ff1511994781867247f99b5f59a4a09f11d))

### Bug Fixes

* added check for login already done inside login page ([cfddb71](https://github.com/mini-roostico/web-frontend/commit/cfddb71eb673a481e0edec6b2cb1d8dff4a14c30))
* adjusted links in the dropdown ([58099ae](https://github.com/mini-roostico/web-frontend/commit/58099aecbf5e79d03ceb0350676e71743c269928))
* fixed broken links using 'a' tag instead of router-links ([f2341af](https://github.com/mini-roostico/web-frontend/commit/f2341af3bef3767f65bab41731641921ff489202))
* fixed job dependency ([f1c0040](https://github.com/mini-roostico/web-frontend/commit/f1c0040627ff73da4093d14c9f4989552e2017d4))
* fixed job needs ([05195fd](https://github.com/mini-roostico/web-frontend/commit/05195fd0511a734816a8d154df5b0bac6c436ba6))
* fixed link ([3c1ad79](https://github.com/mini-roostico/web-frontend/commit/3c1ad79f84b3ac0cd90e628af8f0051cd9448b40))
* removed comment ([97f6973](https://github.com/mini-roostico/web-frontend/commit/97f6973d49717cefd588d7a27311215add9204c1))
* updated environment for job ([f723341](https://github.com/mini-roostico/web-frontend/commit/f723341f43e6f9804c43eca665385a7b367f481c))
* updated job permission in ci ([583dbbf](https://github.com/mini-roostico/web-frontend/commit/583dbbf2a9a1ac012c570358f55f119451508e80))
* updated needs for release ci ([554020b](https://github.com/mini-roostico/web-frontend/commit/554020bf22e6ac802f06277acb18f923a3690460))
* updated permissions of the release job ([95d4e6f](https://github.com/mini-roostico/web-frontend/commit/95d4e6f5762dfb4d5b3ffe4ccd99543c54491503))

### Build and continuous integration

* add release.config.mjs and preconfigured-conventional-commits ([758056d](https://github.com/mini-roostico/web-frontend/commit/758056dea10c75278fbe4593cab2d0b5ac5742b9))
* added check on deploy-to-registry action to trigger when should release ([ddceb5c](https://github.com/mini-roostico/web-frontend/commit/ddceb5c6b309499feff55f63cbea9926664c748c))
* added configurations for building, checking and deploying project ([71c0c03](https://github.com/mini-roostico/web-frontend/commit/71c0c036cf92c6e8f6adf80c2fd5c229f33b7086))
* added mergify config ([6913e65](https://github.com/mini-roostico/web-frontend/commit/6913e654f5bac1b3986368046b7b7f5ac4ec1032))
* added node version to package.json ([8879abc](https://github.com/mini-roostico/web-frontend/commit/8879abcd94a780e6a69cd45bbfe3cf4266fbfa6d))
* added pre-commit hook ([2314b82](https://github.com/mini-roostico/web-frontend/commit/2314b829acb12c61ce4dd772a2daea3a726e1623))
* first docker configuration ([894bc3c](https://github.com/mini-roostico/web-frontend/commit/894bc3cef6b5e546fb3466cb3b84a8bc84dc1c26))
* fixed ci extension ([02d347f](https://github.com/mini-roostico/web-frontend/commit/02d347f8ccc9511411f344f08c1ae36854d2125d))
* fixed ci name ([70239ec](https://github.com/mini-roostico/web-frontend/commit/70239ec0e66a994de47a44fba4e51a0980fae9fb))
* fixed step id ([fc43759](https://github.com/mini-roostico/web-frontend/commit/fc43759183fcffab78095dc3a2393ecff73cd7ee))
* renamed build parts ([668b367](https://github.com/mini-roostico/web-frontend/commit/668b3677ea44dc338c3e1c38e6475e68d3b32016))
* used steps from github packages tutorial ([a1f9a1a](https://github.com/mini-roostico/web-frontend/commit/a1f9a1a74b7c12b88e89be951efea79dfb11dc40))

### General maintenance

* removed comment ([0df8add](https://github.com/mini-roostico/web-frontend/commit/0df8add128aed4a642c403c50e7a749c365f5702))

### Style improvements

* fixed style ([10c2f9b](https://github.com/mini-roostico/web-frontend/commit/10c2f9b9d04a3e378e649aa0dcede0d69f98e199))
* fixed style inside LoginRegister.vue ([52ab3a2](https://github.com/mini-roostico/web-frontend/commit/52ab3a2978e72592a894c46782269ac55e4b3d52))
* fixed unused vars ([1c8b535](https://github.com/mini-roostico/web-frontend/commit/1c8b535d75d3b7a8a52a1a4f2927669de9706ed8))
* run formatting ([ca46f54](https://github.com/mini-roostico/web-frontend/commit/ca46f54fac34351a560938a2a3c99c8588b4e9ac))

### Refactoring

* deleted external file for automatic graph layout ([70e799a](https://github.com/mini-roostico/web-frontend/commit/70e799a3a3260ad97288d8a7eb172436453a81b3))
* made Subject name form disabled ([abe7cab](https://github.com/mini-roostico/web-frontend/commit/abe7cabe3d9f5f1dc2d2fbf7edcaff0adeea3e72))
* made Yaml text inside YamlEditor.vue customizable from the outside ([bfc4909](https://github.com/mini-roostico/web-frontend/commit/bfc4909f0cff321c5e369783ef819a4340809e0d))
