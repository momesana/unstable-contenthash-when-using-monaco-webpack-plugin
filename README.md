## Problem
This minimal example reproduces the issue of deviating **contenthashes** for the chunks containing the monaco-editor code when using webpack in conjunction with the `monaco-webpack-plugin problem` on linux vs. windows.

### links:
- github bug report for monaco-webpack-plugin: https://github.com/microsoft/monaco-editor/issues/3021
- question asked on webpack disussions forum: https://github.com/webpack/webpack/discussions/15504

## Details
The issue is likely caused by the monaco-webpack-plugin and not by webpack itself.

Once built both under windows and linux via `npm run build` there are only two sets of chunks with non-matching hashes in the `dist` folder:

**windows:**
```
594.990f43d1632048ca16e1.chunk.js // contains the monaco-editor chunk
594.990f43d1632048ca16e1.chunk.js.LICENSE.txtt
main.3e9baec4388838c4a569.js
main.3e9baec4388838c4a569.js.LICENSE.txt
```

**linux or mac:**
```
594.ae364e61732aa00da899.chunk.js // contains the monaco-editor chunk
594.ae364e61732aa00da899.chunk.js.LICENSE.tx
main.69cf259c81fb831bb4e6.js
main.69cf259c81fb831bb4e6.js.LICENSE.txt
```

The license files are identical and yield the same md5sum and the only difference in the `main.*.js` files once formatted is the hash of the referenced monaco-chunk:

```diff
1c1
< /*! For license information please see main.3e9baec4388838c4a569.js.LICENSE.txt */
---
> /*! For license information please see main.69cf259c81fb831bb4e6.js.LICENSE.txt */
6097c6097
<         594: "990f43d1632048ca16e1",
---
>         594: "ae364e61732aa00da899",
```

The chunks containing the monaco code itself however do deviate but only in the order in which two attributes appear in the code. Apart from that they are identical:
 ```diff
 1c1
< /*! For license information please see 594.ae364e61732aa00da899.chunk.js.LICENSE.txt */
---
> /*! For license information please see 594.990f43d1632048ca16e1.chunk.js.LICENSE.txt */
178c178
<     }, 9565: (e, t, i) => {
---
>     }, 4444: (e, t, i) => {
182c182
<         r.push([e.id, "/*---------------------------------------------------------------------------------------------\n *  Copyright (c) Microsoft Corporation. All rights reserved.\n *  Licensed under the MIT License. See License.txt in the project root for license information.\n *--------------------------------------------------------------------------------------------*/\n\n/* Uncomment to see lines flashing when they're painted */\n/*.monaco-editor .view-lines > .view-line {\n\tbackground-color: none;\n\tanimation-name: flash-background;\n\tanimation-duration: 800ms;\n}\n@keyframes flash-background {\n\t0%   { background-color: lightgreen; }\n\t100% { background-color: none }\n}*/\n\n.mtkcontrol {\n\tcolor: rgb(255, 255, 255) !important;\n\tbackground: rgb(150, 0, 0) !important;\n}\n\n.monaco-editor.no-user-select .lines-content,\n.monaco-editor.no-user-select .view-line,\n.monaco-editor.no-user-select .view-lines {\n\tuser-select: none;\n\t-webkit-user-select: none;\n\t-ms-user-select: none;\n}\n\n.monaco-editor .view-lines {\n\twhite-space: nowrap;\n}\n\n.monaco-editor .view-line {\n\tposition: absolute;\n\twidth: 100%;\n}\n\n.monaco-editor .mtkz {\n\tdisplay: inline-block;\n}\n\n/* TODO@tokenization bootstrap fix */\n/*.monaco-editor .view-line > span > span {\n\tfloat: none;\n\tmin-height: inherit;\n\tmargin-left: inherit;\n}*/\n", ""]);
---
>         r.push([e.id, "/*---------------------------------------------------------------------------------------------\n *  Copyright (c) Microsoft Corporation. All rights reserved.\n *  Licensed under the MIT License. See License.txt in the project root for license information.\n *--------------------------------------------------------------------------------------------*/\n.monaco-editor .lines-decorations {\n\tposition: absolute;\n\ttop: 0;\n\tbackground: white;\n}\n\n/*\n\tKeeping name short for faster parsing.\n\tcldr = core lines decorations rendering (div)\n*/\n.monaco-editor .margin-view-overlays .cldr {\n\tposition: absolute;\n\theight: 100%;\n}", ""]);
184c184
<     }, 4444: (e, t, i) => {
---
>     }, 9565: (e, t, i) => {
188c188
<         r.push([e.id, "/*---------------------------------------------------------------------------------------------\n *  Copyright (c) Microsoft Corporation. All rights reserved.\n *  Licensed under the MIT License. See License.txt in the project root for license information.\n *--------------------------------------------------------------------------------------------*/\n.monaco-editor .lines-decorations {\n\tposition: absolute;\n\ttop: 0;\n\tbackground: white;\n}\n\n/*\n\tKeeping name short for faster parsing.\n\tcldr = core lines decorations rendering (div)\n*/\n.monaco-editor .margin-view-overlays .cldr {\n\tposition: absolute;\n\theight: 100%;\n}", ""]);
---
>         r.push([e.id, "/*---------------------------------------------------------------------------------------------\n *  Copyright (c) Microsoft Corporation. All rights reserved.\n *  Licensed under the MIT License. See License.txt in the project root for license information.\n *--------------------------------------------------------------------------------------------*/\n\n/* Uncomment to see lines flashing when they're painted */\n/*.monaco-editor .view-lines > .view-line {\n\tbackground-color: none;\n\tanimation-name: flash-background;\n\tanimation-duration: 800ms;\n}\n@keyframes flash-background {\n\t0%   { background-color: lightgreen; }\n\t100% { background-color: none }\n}*/\n\n.mtkcontrol {\n\tcolor: rgb(255, 255, 255) !important;\n\tbackground: rgb(150, 0, 0) !important;\n}\n\n.monaco-editor.no-user-select .lines-content,\n.monaco-editor.no-user-select .view-line,\n.monaco-editor.no-user-select .view-lines {\n\tuser-select: none;\n\t-webkit-user-select: none;\n\t-ms-user-select: none;\n}\n\n.monaco-editor .view-lines {\n\twhite-space: nowrap;\n}\n\n.monaco-editor .view-line {\n\tposition: absolute;\n\twidth: 100%;\n}\n\n.monaco-editor .mtkz {\n\tdisplay: inline-block;\n}\n\n/* TODO@tokenization bootstrap fix */\n/*.monaco-editor .view-line > span > span {\n\tfloat: none;\n\tmin-height: inherit;\n\tmargin-left: inherit;\n}*/\n", ""]);
```
