export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Lango",
      };
      return h.view("about-view", viewData);
    },
  },
};
