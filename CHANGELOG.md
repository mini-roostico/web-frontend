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
