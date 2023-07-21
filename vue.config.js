module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/helpers/_variables.scss";
          @import "@/assets/scss/helpers/_mixins.scss";
        `,
      },
    },
  },
};
