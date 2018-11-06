# Sass and Webpack

This repo shows how to handle a Sass environment using webpack.

Automated processing of Sass files

#### Tools:

The main build tool used is **Webpack V4** (^4.23.1), our config uses the following loaders
* sass-loader (^7.1.0) (NodeSass ^4.9.4)
* sass-resources-loader (^1.3.4)
* postcss-loader (PostCss ^3.0.0)
  * browserslist (included in postcss)
  * autoprefixer (^9.3.1)
  * cssnano (^4.1.7)
* css-loader (^1.0.1)
* MiniCssExtractPlugin.loader (^0.4.4)

**sass-loader**

Used to parse Scss and transform it into css.

**sass-resources-loader**

Used to prepend utilities files, which contain variables and different helpers.
NB. The util files must not contain normal css, otherwise it will be outputted before each bundles file.

**postcss-loader**

PostCss is a css postprocessor that allows operations like prefixing, linting and more. Its use is tied with browserslist.
Configured with a postcss.config.js.

**browserslist**

Used to specify the browsers we decide to support. The list can be found here.
To specify the browsers we use a .browserlistrc in the src folder.

**autoprefixer**

PostCss plugin that adds prefixes to css properties as per Caniuse and our browser list.

**cssnano**

Used to minify as much as possible our css files.
TBD Find the right config to be sure not to break the file.

**css-loader**

Used to parse css @import and url().

 **MiniCssExtractPlugin.loader**

Used to extract css from the otherwise js output of Webpack.

## Pipeline
1. sass-resource-loader

Prepends our files imported in utilities.js

1. sass-loader

Transforms Scss in Css, using NodeSass.

1. postcss-loader

Postprocesses css doing the following:

  1. autoprefixer

Adds the prefixes as per browserslist

  1. cssnano (PRODUCTION only)

Minifies the css, depending on config in postcss.config.js

1. css-loader

Parses the @import and url() in the css

1. MiniCssExtractPlugin.loader

Extracts the css from the webpack parsed js