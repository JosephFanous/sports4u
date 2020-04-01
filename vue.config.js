module.exports = {
  lintOnSave: false,  // disable annoying linting on save
  css: {              // enable bulma variables for use everywhere
    loaderOptions: {
      sass: {
        prependData: `
            @import "~bulma/sass/utilities/_all";
          `
      }
    }
  }
}