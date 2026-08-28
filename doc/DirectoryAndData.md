## Project Directory and Data Structure

### Project Directory Structure
```
├── assets                        // Static resources
│   ├── fonts                     // Online font files
│   └── styles                    // Styles
│       ├── antd.scss             // antd default style overrides
│       ├── font.scss             // Online font definitions
│       ├── global.scss           // General global styles
│       ├── mixin.scss            // scss global mixins
│       ├── variable.scss         // scss global variables
│       └── prosemirror.scss      // ProseMirror rich text default styles
├── components                    // Generic components unrelated to business logic
├── configs                       // Configuration files, e.g. canvas size, fonts, animation configuration, shortcut configuration, preset shapes, preset lines, etc.
├── hooks                         // Hook methods used by multiple components (modules)
├── mocks                         // Mock data
├── plugins                       // Custom Vue plugins
├── services                      // API methods
├── types                         // Type definition files
├── store                         // Pinia store, reference: https://pinia.vuejs.org/
├── utils                         // Common utility methods
└── views                         // Business component directory, divided into the `editor` and `player` parts.
    ├── components                // Shared business components
    ├── Editor                    // Editor module
    ├── Screen                    // Player module
    └── Mobile                    // Mobile module
```


### Data
The slide data is mainly stored in `src/store/slides.ts`.
> In other words, in an actual production environment, you generally need to save (part of) the state data in that file to a database.

It includes:
- `title` slide title/file name
- `slides` slide page data, including each page's ID, element content, notes, background, animations, page transition methods, etc.
- `theme` slide theme data, including background color, theme color, font color, fonts, etc.
- `viewportSize` the width base of the slide visible area (default 1000, i.e. a 1000×562.5 canvas)
- `viewportRatio` the visible area ratio (width:height) of the slide, default 16:9
- `templates` slide templates

For the specific type definitions, see: [Complete Data Type Definition](https://github.com/pipipi-pikachu/PPTist/blob/master/src/types/slides.ts)